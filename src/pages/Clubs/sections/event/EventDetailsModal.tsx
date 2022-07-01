import {
  Card,
  CardHeader,
  Container,
  Dialog,
  DialogTitle,
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

  const { title } = data.getEvent;

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
      <DialogTitle>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
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
              >
                <Iconify icon={"eva:checkmark-circle-2-fill"} />
                Set sub-admin
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
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
            </>
          }
        />
      </DialogTitle>

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
