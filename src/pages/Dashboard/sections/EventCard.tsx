import {
  Card,
  CardHeader,
  Container,
  Divider,
  IconButton,
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
import {
  useEventVoteChangedSubscriptionSubscription,
  useGetVoteStatsQuery,
} from "generated/graphql";
import useCountdown from "hooks/useCountdown";
import useLocales from "hooks/useLocales";
import merge from "lodash/merge";
import { ClubEvent } from "pages/Clubs/data.t";
import { EventDetailsModal } from "pages/Clubs/sections/event";
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

  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const theme: any = useTheme();
  const [eventVoteCount, setEventVoteCount] = useState<number>(voteCount);
  const [isClose, setIsClose] = useState<boolean>(new Date() > new Date(end));
  const { translate } = useLocales();
  const { data: statsData, refetch: refetchStats } = useGetVoteStatsQuery({
    fetchPolicy: "no-cache",
    variables: { eventId: event.id },
    skip: !event,
  });

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
              {translate("club.event.details.max_vote")}: &nbsp;
              <Link component="span" variant="subtitle2">
                {maxVote}{" "}
              </Link>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"clarity:alarm-clock-solid"} />
            <Typography variant="body2">
              {translate("club.event.details.time")}: &nbsp;
              <Link component="span" variant="subtitle2">
                {fDateTime(time)}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"eva:pin-fill"} />
            <Typography variant="body2">
              {translate("club.event.details.address")}: &nbsp;
              <Link component="span" variant="subtitle2">
                {address}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"bxs:dollar-circle"} />
            <Typography variant="body2">
              {translate("club.event.details.price")}: &nbsp;
              <Link component="span" variant="subtitle2">
                {fNumber(price || 0)} VND
              </Link>
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
            label: translate("club.event.details.slot"),
          },
        },
      },
    },
  });

  const renderCountDown = () => {
    if (isClose) return null;
    if (status === 2) return null;

    if (
      // differenceInHours(new Date(end), currentDate) > 24 ||
      differenceInHours(new Date(end), currentDate) < 0
    )
      return null;

    if (start < currentDate.toISOString()) {
      return (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            flexGrow: 1,
            position: "absolute",
            top: "calc(50% + 48px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
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
    <Card
      sx={
        statsData?.getVoteStats?.confirmed && {
          color: (theme: any) => theme.palette["primary"].darker,
          bgcolor: (theme: any) => theme.palette["primary"].lighter,
        }
      }
    >
      <CardHeader
        title={title}
        action={
          <>
            {!hideInfo && (
              <IconButton
                onClick={() => {
                  setIsDetailsOpen(true);
                }}
              >
                <Iconify icon={"akar-icons:info-fill"} width={20} height={20} />
              </IconButton>
            )}
          </>
        }
        sx={{ mb: 2 }}
      />
      {renderGeneral()}
      <div style={{ position: "relative", marginBottom: 12 }}>
        {renderCountDown()}
        <ReactApexChart
          type="radialBar"
          series={[chartSeries]}
          options={chartOptions}
          height={300}
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
          refetchStats={refetchStats}
          statsData={statsData}
        />
      </Container>

      {!hideInfo && (
        <EventDetailsModal
          open={isDetailsOpen}
          eventId={event.id}
          onClose={() => {
            setIsDetailsOpen(false);
          }}
          refetchStats={refetchStats}
        />
      )}
    </Card>
  );
};

export default EventCard;
