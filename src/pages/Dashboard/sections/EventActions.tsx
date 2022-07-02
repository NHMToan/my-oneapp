import { Box, Button, Card, Stack, styled, Typography } from "@mui/material";
import Iconify from "components/Iconify";
import {
  useCreateVoteEventMutation,
  useGetMyVotesQuery,
} from "generated/graphql";
import useCountdown from "hooks/useCountdown";
import { useSnackbar } from "notistack";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC, useEffect, useState } from "react";
import ConfirmedVote from "./ConfirmedVote";
import VotePopConfirm from "./VotePopConfirm";
import WaitingVote from "./WaitingVote";

interface EventActionsProps {
  event: ClubEvent;
}
const CountdownStyle = styled("div")({
  display: "flex",
  justifyContent: "center",
});
const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(0, 0.5),
  },
}));
const EventActions: FC<EventActionsProps> = ({ event }) => {
  const current = new Date();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isVoteWaiting, setIsVoteWaiting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const [renderCountDown, setRenderCountDown] = useState<boolean>(
    event.start > current.toISOString()
  );
  const { data, refetch } = useGetMyVotesQuery({
    fetchPolicy: "no-cache",
    variables: { eventId: event.id },
    skip: renderCountDown,
  });

  const [onVote] = useCreateVoteEventMutation({ fetchPolicy: "no-cache" });

  const handleVote = async (value) => {
    try {
      const voteRes = await onVote({
        variables: {
          createVoteInput: { value: ~~value, eventId: event.id, status: 1 },
        },
      });

      if (voteRes?.data?.voteEvent?.success) {
        refetch();
        enqueueSnackbar(`Confirmed ${value} slot(s)`);
      } else {
        enqueueSnackbar(voteRes?.data?.voteEvent?.message || "Internal error", {
          variant: "error",
        });
        throw voteRes?.data?.voteEvent?.message || "Internal error";
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleWaitingVote = async (value) => {
    try {
      const voteRes = await onVote({
        variables: {
          createVoteInput: { value: ~~value, eventId: event.id, status: 2 },
        },
      });

      if (voteRes?.data?.voteEvent?.success) {
        refetch();
        enqueueSnackbar(`Waiting ${value} slot(s)`);
      } else {
        throw voteRes?.data?.voteEvent?.message || "Internal error";
      }
    } catch (e) {
      console.error(e);
    }
  };
  const RenderCountdown = () => {
    const countdown = useCountdown(
      event.start < current.toISOString() ? null : new Date(event.start)
    );
    useEffect(() => {
      const now = new Date();
      if (event.start < now.toISOString()) {
        setRenderCountDown(false);
      }
    }, [countdown]);
    return (
      <Card
        sx={{
          py: 2,
          boxShadow: 0,
          color: (theme: any) => theme.palette["info"].darker,
          bgcolor: (theme: any) => theme.palette["info"].lighter,
        }}
      >
        <CountdownStyle>
          <Typography sx={{ marginRight: "6px" }}>
            Polling will start after
          </Typography>
          <div>
            <Typography>{countdown.minutes}</Typography>
          </div>
          <SeparatorStyle>:</SeparatorStyle>
          <div>
            <Typography>{countdown.seconds}</Typography>
          </div>
        </CountdownStyle>
      </Card>
    );
  };
  if (event.end < current.toISOString() || event.status === 2)
    return (
      <>
        <Stack direction="column" spacing={2}>
          <Card
            sx={{
              p: 1,
              boxShadow: 0,
              textAlign: "center",
              color: (theme: any) => theme.palette["error"].darker,
              bgcolor: (theme: any) => theme.palette["error"].lighter,
              borderRadius: 2,
            }}
            key="message"
          >
            Event is closed!
          </Card>

          {data?.getMyVotes?.results?.map((vote: any, index) => {
            if (vote.status === 1) {
              return (
                <ConfirmedVote
                  vote={vote}
                  key={index}
                  postActions={() => {
                    refetch();
                  }}
                  event={event}
                />
              );
            }
            return (
              <WaitingVote
                vote={vote}
                key={index}
                postActions={() => {
                  refetch();
                }}
                event={event}
              />
            );
          })}
        </Stack>
      </>
    );
  if (renderCountDown) return <RenderCountdown />;

  if (data?.getMyVotes?.totalCount > 0) {
    const currentVoteCount = data.getMyVotes.results.reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue.value;
      },
      0
    );
    return (
      <Box>
        <Stack direction="column" spacing={2}>
          {data.getMyVotes.results.map((vote: any, index) => {
            if (vote.status === 1) {
              return (
                <ConfirmedVote
                  vote={vote}
                  key={index}
                  postActions={() => {
                    refetch();
                  }}
                  event={event}
                />
              );
            }
            return (
              <WaitingVote
                vote={vote}
                key={index}
                postActions={() => {
                  refetch();
                }}
                event={event}
              />
            );
          })}

          <Button
            fullWidth
            variant="contained"
            color="info"
            endIcon={<Iconify icon={"fluent:people-queue-20-filled"} />}
            onClick={() => {
              setIsFormOpen(true);
              setIsVoteWaiting(true);
            }}
          >
            Waiting
          </Button>
          <VotePopConfirm
            isOpen={isFormOpen}
            event={event}
            onClose={() => {
              setIsFormOpen(false);
            }}
            currentVoteCount={currentVoteCount}
            onPostSave={(value) => {
              if (isVoteWaiting) {
                handleWaitingVote(value);
              }
            }}
            isWaiting={isVoteWaiting}
          />
        </Stack>
      </Box>
    );
  }
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="flex-end"
      sx={{ flexGrow: 1 }}
    >
      <Button
        fullWidth
        variant="contained"
        endIcon={<Iconify icon={"eva:checkmark-circle-2-fill"} />}
        onClick={() => {
          setIsFormOpen(true);
          setIsVoteWaiting(false);
        }}
      >
        Vote
      </Button>

      <Button
        fullWidth
        variant="contained"
        color="info"
        endIcon={<Iconify icon={"fluent:people-queue-20-filled"} />}
        onClick={() => {
          setIsFormOpen(true);
          setIsVoteWaiting(true);
        }}
      >
        Waiting
      </Button>
      <VotePopConfirm
        isOpen={isFormOpen}
        event={event}
        onClose={() => {
          setIsFormOpen(false);
        }}
        onPostSave={(value) => {
          if (isVoteWaiting) {
            handleWaitingVote(value);
          } else {
            handleVote(value);
          }
        }}
        isWaiting={isVoteWaiting}
      />
    </Stack>
  );
};

export default EventActions;
