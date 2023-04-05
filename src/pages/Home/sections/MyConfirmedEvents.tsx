import {
  Card,
  CardHeader,
  Chip,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import { useMyConfirmedEventsQuery } from "generated/graphql";
import useLocales from "hooks/useLocales";
import { EventDetailsModal } from "pages/Clubs/sections/event";
import { FC, useState } from "react";
import { fDateTime } from "utils/formatTime";

interface MyConfirmedEventsProps {}

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const MyConfirmedEvents: FC<MyConfirmedEventsProps> = ({}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const { translate } = useLocales();
  const [event, setEvent] = useState(null);

  const { data: myConfirmedEvents, refetch } = useMyConfirmedEventsQuery({
    fetchPolicy: "no-cache",
  });

  const data =
    myConfirmedEvents?.myEvents?.totalCount > 0
      ? myConfirmedEvents?.myEvents?.results?.filter(
          (item) => item.myConfirmedCount > 0
        )
      : [];
  if (!data || data.length === 0) return null;

  const renderGeneral = (event) => {
    const { address, time, myConfirmedCount } = event;
    return (
      <div>
        <Stack spacing={1} sx={{ px: 3, pb: 3 }}>
          <Stack direction="row">
            <IconStyle icon={"ic:baseline-how-to-vote"} />
            <Typography variant="body2">
              {translate("club.event.details.my_vote_count")}: &nbsp;
              <b>{myConfirmedCount}</b>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"clarity:alarm-clock-solid"} />
            <Typography variant="body2">
              {translate("club.event.details.time")}: &nbsp;
              <b> {fDateTime(time)}</b>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"eva:pin-fill"} />
            <Typography variant="body2">
              {translate("club.event.details.address")}: &nbsp;
              <b> {address}</b>
            </Typography>
          </Stack>
        </Stack>
      </div>
    );
  };

  return (
    <Card
      sx={{
        color: (theme: any) => theme.palette["primary"].darker,
        bgcolor: (theme: any) => theme.palette["primary"].lighter,
      }}
    >
      <CardHeader
        title={translate("activity.my_confirmed_event.title")}
        subheader={translate("activity.my_confirmed_event.subtitle")}
        action={<Chip label={data.length} />}
      />
      <Stack spacing={2} sx={{ p: 2 }}>
        {data?.map((item) => {
          return (
            <Card key={item.id}>
              <CardHeader
                title={item.title}
                action={
                  <IconButton
                    onClick={() => {
                      setEvent(item);
                      setIsDetailsOpen(true);
                    }}
                  >
                    <Iconify
                      icon={"akar-icons:info-fill"}
                      width={20}
                      height={20}
                    />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              />
              {renderGeneral(item)}
            </Card>
          );
        })}
      </Stack>

      <EventDetailsModal
        open={isDetailsOpen}
        eventId={event?.id}
        onClose={() => {
          setIsDetailsOpen(false);
        }}
        refetchStats={() => {
          refetch();
        }}
      />
    </Card>
  );
};

export default MyConfirmedEvents;
