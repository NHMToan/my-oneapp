import {
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useCreateVoteEventMutation } from "generated/graphql";
import useCountdown from "hooks/useCountdown";
import useLocales from "hooks/useLocales";
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
  refetchStats: any;
  statsData: any;
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
const EventActions: FC<EventActionsProps> = ({
  event,
  isFull,
  isClose,
  refetchStats,
  statsData,
}) => {
  const current = new Date();

  const { translate } = useLocales();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isFormChangeOpen, setIsFormChangeOpen] = useState<boolean>(false);
  const [isVoteWaiting, setIsVoteWaiting] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [renderCountDown, setRenderCountDown] = useState<boolean>(
    event.start > current.toISOString()
  );

  const [onVote] = useCreateVoteEventMutation({ fetchPolicy: "no-cache" });

  const handleVote = async (params) => {
    setSubmitting(true);
    try {
      const voteRes = await onVote({
        variables: {
          createVoteInput: {
            value: ~~params.value,
            eventId: event.id,
            status: 1,
            type: params?.type || "",
          },
        },
      });

      if (voteRes?.data?.voteEvent?.success) {
        refetchStats();
        enqueueSnackbar(
          translate("club.event.details.vote.confirmed_success", {
            count: params.value,
          })
        );
      } else {
        enqueueSnackbar(
          translate("club.event.details.vote.confirmed_full_message") ||
            "Internal error",
          {
            variant: "error",
          }
        );
        throw voteRes?.data?.voteEvent?.message || "Internal error";
      }
      setSubmitting(false);
    } catch (e) {
      console.error(e);
      setSubmitting(false);
    }
  };

  const handleWaitingVote = async (params) => {
    setSubmitting(true);
    try {
      const voteRes = await onVote({
        variables: {
          createVoteInput: {
            value: ~~params.value,
            eventId: event.id,
            status: 2,
            type: params.type || "",
          },
        },
      });

      if (voteRes?.data?.voteEvent?.success) {
        refetchStats();
        enqueueSnackbar(
          translate("club.event.details.vote.waiting_success", {
            count: params.value,
          })
        );
      } else {
        enqueueSnackbar(voteRes?.data?.voteEvent?.message || "Internal error", {
          variant: "error",
        });
      }
      setSubmitting(false);
    } catch (e) {
      console.error(e);
      setSubmitting(false);
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
            {translate("club.event.details.reg_will_open")}
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
                  {translate("club.event.details.confirmed")}:{" "}
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
                  {translate("club.event.details.waiting")}:{" "}
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
            {translate("club.event.details.vote_close")}
          </Card>
        </Stack>
      </>
    );
  if (renderCountDown) return <RenderCountdown />;

  if (statsData?.getVoteStats?.total >= event.maxVote) {
    return (
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
        {translate("club.event.details.vote_max")}
      </Card>
    );
  }
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
                {translate("club.event.details.confirmed")}:{" "}
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
                {translate("club.event.details.waiting")}:{" "}
                <b>{fNumber(statsData?.getVoteStats?.waiting || 0)}</b>
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
            onClick={() => {
              setIsFormOpen(true);
              setIsVoteWaiting(false);
            }}
            disabled={statsData?.getVoteStats?.total >= event.maxVote || isFull}
          >
            {translate("common.btn.register")}
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="info"
            onClick={() => {
              setIsFormOpen(true);
              setIsVoteWaiting(true);
            }}
            disabled={statsData?.getVoteStats?.total >= event.maxVote}
          >
            {translate("common.btn.queue")}
          </Button>
          <VotePopConfirm
            isOpen={isFormOpen}
            event={event}
            onClose={() => {
              setIsFormOpen(false);
            }}
            onPostSave={(params) => {
              if (isVoteWaiting) {
                handleWaitingVote(params);
              } else {
                handleVote(params);
              }
            }}
            isWaiting={isVoteWaiting}
            isSubmitting={submitting}
          />
          <ChangeVoteModal
            isOpen={isFormChangeOpen}
            event={event}
            onClose={() => {
              setIsFormChangeOpen(false);
              setIsVoteWaiting(false);
            }}
            postActions={() => {
              refetchStats();
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
