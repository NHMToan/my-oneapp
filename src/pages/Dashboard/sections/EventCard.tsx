import {
  Button,
  Card,
  CardHeader,
  Container,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { ApexOptions } from "apexcharts";
import { BaseOptionChart } from "components/chart";
import Iconify from "components/Iconify";
import {
  useCreateVoteEventMutation,
  useEventVoteChangedSubscriptionSubscription,
  useUnVoteEventMutation,
} from "generated/graphql";
import useCountdown from "hooks/useCountdown";
import merge from "lodash/merge";
import { useSnackbar } from "notistack";
import { ClubEvent, VoteData } from "pages/Clubs/data.t";
import { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fNumber } from "utils/formatNumber";
import VotePopConfirm from "./VotePopConfirm";
interface EventCardProps {
  event: ClubEvent;
}

const CountdownStyle = styled("div")({
  display: "flex",
  justifyContent: "center",
});

let myInterval,
  disableOTPmilliseconds = 5000;

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(0, 0.5),
  },
}));
const RenderCountdown = ({ date }) => {
  const countdown = useCountdown(new Date(date));
  return (
    <CountdownStyle>
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
  );
};
const EventCard: FC<EventCardProps> = ({ event }) => {
  const {
    title,
    description,
    start,
    end,
    id,
    vote,
    voteCount,
    waitingCount,
    slot,
  } = event;

  const theme: any = useTheme();
  const [eventVoted, setEventVoted] = useState<VoteData>(vote);
  const [eventVoteCount, setEventVoteCount] = useState<number>(voteCount);
  const [eventWaitingCount, setEventWaitingCount] =
    useState<number>(waitingCount);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isVoteWaiting, setIsVoteWaiting] = useState<boolean>(false);

  const [disableTimer, setDisableTimer] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const { data: voteCountData } = useEventVoteChangedSubscriptionSubscription({
    variables: {
      eventId: id,
      status: 1,
    },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const { data: waitingCountData } =
    useEventVoteChangedSubscriptionSubscription({
      variables: {
        eventId: id,
        status: 2,
      },
      skip: !id,
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    if (voteCountData?.voteChanged) {
      setEventVoteCount(voteCountData.voteChanged.voteCount || 0);
    }
  }, [voteCountData]);

  useEffect(() => {
    if (waitingCountData?.voteChanged) {
      setEventWaitingCount(waitingCountData.voteChanged.waitingCount || 0);
    }
  }, [waitingCountData]);

  const [unVote] = useUnVoteEventMutation({ fetchPolicy: "no-cache" });
  const [onVote] = useCreateVoteEventMutation({ fetchPolicy: "no-cache" });

  const currentDate = new Date();
  const colors = [[theme.palette.primary.light, theme.palette.primary.main]];
  const baseOptions: any = BaseOptionChart();

  const chartSeries = (eventVoteCount / slot) * 100;
  const chartOptions: ApexOptions = merge(baseOptions, {
    legend: { show: false },
    grid: {
      padding: { top: -32, bottom: -32 },
    },
    fill: {
      type: "gradient",
      gradient: {
        colorStops: colors.map((colors) => [
          { offset: 0, color: colors[0] },
          { offset: 100, color: colors[1] },
        ]),
      },
    },
    plotOptions: {
      radialBar: {
        hollow: { size: "64%" },
        dataLabels: {
          showOn: "always",
          name: { offsetY: -16 },
          value: {
            offsetY: 8,
            show: false,
          },
          total: {
            label: "Slots",
          },
        },
      },
    },
  });
  const data = [
    { label: "Vote", value: eventVoteCount },
    { label: "Waiting", value: eventWaitingCount },
  ];

  const handleDisableButton = () => {
    setIsDisabled(true);

    myInterval = setInterval(() => {
      return setDisableTimer((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      setIsDisabled(false);
      setDisableTimer(disableOTPmilliseconds / 1000); // using disableOTPmilliseconds variable to define or change the milliseconds.

      clearInterval(myInterval);
    }, disableOTPmilliseconds);
  };
  const handleUnVoteSave = async () => {
    handleDisableButton();
    try {
      const unVoteRes = await unVote({ variables: { eventId: id } });
      if (unVoteRes.data.unVoteEvent.success) {
        enqueueSnackbar(`Unvote successfully`);
        setEventVoted(unVoteRes.data.unVoteEvent.event.vote as any);
      } else {
        throw unVoteRes.data.unVoteEvent.message;
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleVoteSave = async (value) => {
    handleDisableButton();
    try {
      if (isVoteWaiting) {
        const waitingVoteRes = await onVote({
          variables: {
            createVoteInput: {
              value: ~~value,
              eventId: id,
              status: 2,
            },
          },
        });

        if (waitingVoteRes.data.voteEvent.success) {
          enqueueSnackbar(`You voted for ${value} waiting slot(s)`);
          setEventVoted(waitingVoteRes.data.voteEvent.event.vote as any);
        } else {
          throw waitingVoteRes.data.voteEvent.message;
        }
      } else {
        const waitingVoteRes = await onVote({
          variables: {
            createVoteInput: {
              value: ~~value,
              eventId: id,
              status: 1,
            },
          },
        });

        if (waitingVoteRes.data.voteEvent.success) {
          enqueueSnackbar(`You voted for ${value} slot(s)`);
          setEventVoted(waitingVoteRes.data.voteEvent.event.vote as any);
        } else {
          throw waitingVoteRes.data.voteEvent.message;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderActions = () => {
    if (eventVoted) {
      return (
        <Button
          fullWidth
          variant="contained"
          color="error"
          endIcon={<Iconify icon={"eva:close-circle-fill"} />}
          onClick={handleUnVoteSave}
          disabled={isDisabled}
        >
          You have voted for {eventVoted.value}{" "}
          {eventVoted.status === 1 ? "" : "waiting"} slots. Wanna unvote?{" "}
          {isDisabled && `(${disableTimer})`}
        </Button>
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
          disabled={
            eventVoteCount === slot ||
            start > currentDate.toISOString() ||
            isDisabled
          }
        >
          Vote {isDisabled && `(${disableTimer})`}
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
          disabled={start > currentDate.toISOString() || isDisabled}
        >
          Waiting {isDisabled && `(${disableTimer})`}
        </Button>
      </Stack>
    );
  };

  const renderCountDown = () => {
    if (start > currentDate.toISOString()) {
      return (
        <Stack>
          <span>Start in </span> <RenderCountdown date={start} />
        </Stack>
      );
    }
    return (
      <Stack>
        <span>End in </span> <RenderCountdown date={end} />
      </Stack>
    );
  };

  return (
    <Card
      sx={{
        color: eventVoted && theme.palette["primary"].darker,
        bgcolor: eventVoted && theme.palette["primary"].lighter,
      }}
    >
      <CardHeader
        title={title}
        subheader={description}
        sx={{ mb: 8 }}
        action={renderCountDown()}
      />

      <div>
        <ReactApexChart
          type="radialBar"
          series={[chartSeries]}
          options={chartOptions}
          height={310}
        />
        <Typography
          variant="h3"
          sx={{
            flexGrow: 1,
            position: "absolute",
            top: "calc(50% - 10px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {`${fNumber(eventVoteCount)}/${fNumber(slot)}`}
        </Typography>
      </div>
      <Stack spacing={2} sx={{ p: 3 }}>
        {data.map((item) => (
          <Legend key={item.label} item={item} isVoted={!!eventVoted} />
        ))}
      </Stack>

      <Container sx={{ p: 3 }}>{renderActions()}</Container>
      <VotePopConfirm
        isOpen={isFormOpen}
        event={null}
        onClose={() => {
          setIsFormOpen(false);
        }}
        onPostSave={handleVoteSave}
        isWaiting={isVoteWaiting}
      />
    </Card>
  );
};

interface LegendProps {
  item: any;
  isVoted?: boolean;
}
function Legend({ item, isVoted }: LegendProps) {
  const theme: any = useTheme();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0.75,
            bgcolor: "primary.main",
            color: isVoted && theme.palette["primary"].darker,
          }}
        />

        <Typography
          variant="subtitle2"
          sx={{
            color: isVoted ? theme.palette["primary"].darker : "text.secondary",
          }}
        >
          {item.label}
        </Typography>
      </Stack>

      <Typography variant="subtitle1"> {item.value} Slots</Typography>
    </Stack>
  );
}

export default EventCard;
