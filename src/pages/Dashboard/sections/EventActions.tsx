import {
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import {
  useCreateVoteEventMutation,
  useGetVoteStatsQuery,
} from "generated/graphql";
import useCountdown from "hooks/useCountdown";
import { useSnackbar } from "notistack";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC, useEffect, useState } from "react";
import { fNumber } from "utils/formatNumber";
import ChangeVoteModal from "./ChangeVoteModal";
import VotePopConfirm from "./VotePopConfirm";

interface EventActionsProps {
  event: ClubEvent;
  isFull: boolean;
  isClose?: boolean;
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
const EventActions: FC<EventActionsProps> = ({ event, isFull, isClose }) => {
  const current = new Date();
  const { data: statsData, refetch } = useGetVoteStatsQuery({
    fetchPolicy: "no-cache",
    variables: { eventId: event.id },
    skip: !event,
  });

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isFormChangeOpen, setIsFormChangeOpen] = useState<boolean>(false);
  const [isVoteWaiting, setIsVoteWaiting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const [renderCountDown, setRenderCountDown] = useState<boolean>(
    event.start > current.toISOString()
  );

  const [onVote] = useCreateVoteEventMutation({ fetchPolicy: "no-cache" });

  const isChangeVote = statsData?.getVoteStats?.confirmed > 0;
  const isChangeWaitingVote = statsData?.getVoteStats?.waiting > 0;

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
        enqueueSnackbar(voteRes?.data?.voteEvent?.message || "Internal error", {
          variant: "error",
        });
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
          px: 2,
          boxShadow: 0,
          color: (theme: any) => theme.palette["info"].darker,
          bgcolor: (theme: any) => theme.palette["info"].lighter,
        }}
      >
        <CountdownStyle>
          <Typography sx={{ marginRight: "6px" }}>
            Registration will be open in
          </Typography>
          <div>
            <Typography>{countdown.hours}</Typography>
          </div>
          <SeparatorStyle>:</SeparatorStyle>
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
  if (isClose || event.end < current.toISOString() || event.status === 2)
    return (
      <>
        <Stack direction="column" spacing={2}>
          <Card
            sx={{
              p: 1,
              boxShadow: 0,
              textAlign: "center",
              color: (theme: any) => theme.palette["info"].darker,
              bgcolor: (theme: any) => theme.palette["info"].lighter,
              borderRadius: 2,
            }}
            key="stats"
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Stack width={1} direction="row" justifyContent="center">
                <Typography variant="body2" sx={{ color: "text.success" }}>
                  Confirmed:{" "}
                  <b>{fNumber(statsData?.getVoteStats?.confirmed || 0)}</b>
                </Typography>
              </Stack>

              <Stack
                width={1}
                direction="row"
                textAlign="center"
                justifyContent="center"
              >
                <Typography variant="body2" sx={{ color: "text.info" }}>
                  Waiting:{" "}
                  <b>{fNumber(statsData?.getVoteStats?.waiting || 0)}</b>
                </Typography>
              </Stack>
            </Stack>
          </Card>
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
            Voting is closed!
          </Card>
        </Stack>
      </>
    );
  if (renderCountDown) return <RenderCountdown />;

  return (
    <Grid container spacing={1.5}>
      <Grid item xs={12}>
        <Card
          sx={{
            p: 1,
            boxShadow: 0,
            textAlign: "center",
            color: (theme: any) => theme.palette["info"].darker,
            bgcolor: (theme: any) => theme.palette["info"].lighter,
            borderRadius: 2,
          }}
          key="message"
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Stack width={1} direction="row" justifyContent="center">
              <Typography variant="body2" sx={{ color: "text.success" }}>
                Confirmed:{" "}
                <b>{fNumber(statsData?.getVoteStats?.confirmed || 0)}</b>
              </Typography>
            </Stack>

            <Stack
              width={1}
              direction="row"
              textAlign="center"
              justifyContent="center"
            >
              <Typography variant="body2" sx={{ color: "text.info" }}>
                Waiting: <b>{fNumber(statsData?.getVoteStats?.waiting || 0)}</b>
              </Typography>
            </Stack>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12}>
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
              if (statsData?.getVoteStats?.confirmed) {
                setIsFormChangeOpen(true);
                setIsVoteWaiting(false);
              } else {
                setIsFormOpen(true);
                setIsVoteWaiting(false);
              }
            }}
            disabled={!isChangeVote && isFull}
          >
            {isChangeVote ? `Change` : "Register"}
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="info"
            endIcon={<Iconify icon={"fluent:people-queue-20-filled"} />}
            onClick={() => {
              if (statsData?.getVoteStats?.waiting) {
                setIsFormChangeOpen(true);
                setIsVoteWaiting(true);
              } else {
                setIsFormOpen(true);
                setIsVoteWaiting(true);
              }
            }}
            disabled={
              !isChangeWaitingVote &&
              statsData?.getVoteStats?.total >= event.maxVote
            }
          >
            {isChangeWaitingVote ? `Change` : "Queue"}
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
          <ChangeVoteModal
            isOpen={isFormChangeOpen}
            event={event}
            onClose={() => {
              setIsFormChangeOpen(false);
              setIsVoteWaiting(false);
            }}
            postActions={() => {
              refetch();
            }}
            isWaiting={isVoteWaiting}
            currentVoteCount={
              isVoteWaiting
                ? statsData?.getVoteStats?.waiting
                : statsData?.getVoteStats?.confirmed
            }
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default EventActions;
