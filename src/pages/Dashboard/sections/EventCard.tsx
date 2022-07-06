import {
  Card,
  CardHeader,
  Container,
  Divider,
  Link,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { ApexOptions } from "apexcharts";
import { BaseOptionChart } from "components/chart";
import Iconify from "components/Iconify";
import { differenceInHours } from "date-fns";
import { useEventVoteChangedSubscriptionSubscription } from "generated/graphql";
import useCountdown from "hooks/useCountdown";
import merge from "lodash/merge";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fNumber } from "utils/formatNumber";
import { fDateTime } from "utils/formatTime";
import EventActions from "./EventActions";
interface EventCardProps {
  event: ClubEvent;
  hideInfo?: boolean;
}

const CountdownStyle = styled("div")({
  display: "flex",
  justifyContent: "center",
});
const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const SeparatorStyle = styled(Typography)(({ theme }: { theme: any }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(0, 0.5),
  },
}));
const RenderCountdown = ({ date, onEnd }) => {
  const countdown = useCountdown(new Date(date));
  useEffect(() => {
    const now = new Date();
    if (now > new Date(date)) {
      onEnd();
    }
  }, [countdown]);
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
const EventCard: FC<EventCardProps> = ({ event, hideInfo }) => {
  const { title, start, end, id, voteCount, slot, status, price } = event;

  const theme: any = useTheme();
  const [eventVoteCount, setEventVoteCount] = useState<number>(voteCount);
  const [isClose, setIsClose] = useState<boolean>(new Date() > new Date(end));

  const { data: voteCountData } = useEventVoteChangedSubscriptionSubscription({
    variables: {
      eventId: id,
      status: 1,
    },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const renderGeneral = () => {
    if (hideInfo) return null;
    const { address, time, maxVote, description } = event;
    return (
      <div>
        <Stack spacing={2} sx={{ px: 3, pb: 3 }}>
          <Typography variant="body2">{description}</Typography>
          <Stack direction="row">
            <IconStyle icon={"ic:baseline-how-to-vote"} />
            <Typography variant="body2">
              Max vote: &nbsp;
              <b>{maxVote}</b>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"clarity:alarm-clock-solid"} />
            <Typography variant="body2">
              Time: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {fDateTime(time)}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"eva:pin-fill"} />
            <Typography variant="body2">
              Address: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {address}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"bxs:dollar-circle"} />
            <Typography variant="body2">
              Price: &nbsp;
              <b>{fNumber(price || 0)} VND</b>
            </Typography>
          </Stack>
          <Divider />
        </Stack>
      </div>
    );
  };

  useEffect(() => {
    if (voteCountData?.voteChanged) {
      setEventVoteCount(voteCountData.voteChanged.voteCount || 0);
    }
  }, [voteCountData]);

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

  const renderCountDown = () => {
    if (isClose) return null;
    if (status === 2) return null;

    if (
      differenceInHours(new Date(end), currentDate) > 24 ||
      differenceInHours(new Date(end), currentDate) < 0
    )
      return null;
    if (start < currentDate.toISOString()) {
      return (
        <Stack>
          <span>End after </span>{" "}
          <RenderCountdown
            date={end}
            onEnd={() => {
              setIsClose(true);
            }}
          />
        </Stack>
      );
    }
  };

  return (
    <Card>
      <CardHeader title={title} action={renderCountDown()} sx={{ mb: 2 }} />
      {renderGeneral()}
      <div style={{ position: "relative", marginBottom: 12 }}>
        <ReactApexChart
          type="radialBar"
          series={[chartSeries]}
          options={chartOptions}
          height={310}
        />
        <Box
          sx={{
            flexGrow: 1,
            position: "absolute",
            top: "calc(50% + 15px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h3">
            {`${fNumber(eventVoteCount)}/${fNumber(slot)}`}
          </Typography>
        </Box>
      </div>

      <Container sx={{ p: 3 }}>
        <EventActions
          event={event}
          isFull={eventVoteCount >= event.slot}
          isClose={isClose}
        />
      </Container>
    </Card>
  );
};

// interface LegendProps {
//   item: any;
//   isVoted?: boolean;
// }
// function Legend({ item, isVoted }: LegendProps) {
//   const theme: any = useTheme();
//   return (
//     <Stack direction="row" alignItems="center" justifyContent="space-between">
//       <Stack direction="row" alignItems="center" spacing={1}>
//         <Box
//           sx={{
//             width: 16,
//             height: 16,
//             borderRadius: 0.75,
//             bgcolor: "primary.main",
//             color: isVoted && theme.palette["primary"].darker,
//           }}
//         />

//         <Typography
//           variant="subtitle2"
//           sx={{
//             color: isVoted ? theme.palette["primary"].darker : "text.secondary",
//           }}
//         >
//           {item.label}
//         </Typography>
//       </Stack>

//       <Typography variant="subtitle1"> {item.value} Slots</Typography>
//     </Stack>
//   );
// }

export default EventCard;
