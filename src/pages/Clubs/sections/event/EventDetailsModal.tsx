import {
  Card,
  CardHeader,
  Container,
  Dialog,
  Divider,
  Grid,
  Link,
  MenuItem,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import DropdownMenu from "components/DropdownMenu";
import Iconify from "components/Iconify";
import { SimpleSkeleton } from "components/skeleton";
import { useEventQuery } from "generated/graphql";
import { FC } from "react";
import { fDateTime } from "utils/formatTime";
import EventChart from "./EventChart";
import EventVoteList from "./EventVoteList";
import EventWaitingList from "./EventWaitingList";
const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

interface EventDetailsModalProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
}
const Content = ({ eventId }) => {
  const { data, loading } = useEventQuery({
    variables: { id: eventId },
    fetchPolicy: "no-cache",
    skip: !eventId,
  });

  if (loading) return <SimpleSkeleton />;
  if (!data) return null;

  const { title, status } = data.getEvent;

  const renderGeneral = () => {
    const { description, start, end, address, time } = data.getEvent;
    return (
      <Card>
        <CardHeader title="Event info" />

        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant="body2">{description}</Typography>

          <Stack direction="row">
            <Tooltip title="Vote start at">
              <IconStyle icon={"fluent:clock-48-filled"} />
            </Tooltip>
            <Typography variant="body2">
              <Typography variant="subtitle2">{fDateTime(start)}</Typography>
            </Typography>
          </Stack>
          <Stack direction="row">
            <Tooltip title="Vote end at">
              <IconStyle icon={"fluent:clock-dismiss-20-filled"} />
            </Tooltip>
            <Typography variant="body2">
              <Typography variant="subtitle2">{fDateTime(end)}</Typography>
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
        </Stack>
      </Card>
    );
  };
  return (
    <>
      <CardHeader
        title={title}
        sx={{ p: "12px 24px 24px" }}
        action={
          <DropdownMenu
            actions={
              <>
                <MenuItem
                  onClick={async () => {
                    try {
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  key="edit"
                >
                  <Iconify icon={"bxs:pencil"} />
                  Edit
                </MenuItem>

                <MenuItem
                  onClick={async () => {
                    try {
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  key="setShow"
                >
                  <Iconify icon={"bxs:hide"} />
                  {status === 1 ? "Hide event" : "Show Event"}
                </MenuItem>

                <Divider sx={{ borderStyle: "dashed" }} />

                <MenuItem
                  sx={{ color: "error.main" }}
                  onClick={async () => {
                    try {
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                  key="delete"
                >
                  <Iconify icon={"eva:trash-2-outline"} />
                  Delete
                </MenuItem>
              </>
            }
          />
        }
      />

      <Container sx={{ px: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderGeneral()}
          </Grid>
          <Grid item xs={12} md={6}>
            <EventChart event={data.getEvent as any} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EventVoteList event={data.getEvent as any} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EventWaitingList event={data.getEvent as any} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
const EventDetailsModal: FC<EventDetailsModalProps> = ({
  eventId,
  open,
  onClose,
}) => {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <Stack sx={{ p: 2 }}>
        <Content eventId={eventId} />
      </Stack>
    </Dialog>
  );
};

export default EventDetailsModal;
