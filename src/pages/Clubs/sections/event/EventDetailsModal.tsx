import {
  Container,
  Dialog,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { SimpleSkeleton } from "components/skeleton";
import { useEventQuery } from "generated/graphql";
import { FC } from "react";
import EventChart from "./EventChart";
import EventVoteList from "./EventVoteList";
import EventWaitingList from "./EventWaitingList";

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

  const { title, description } = data.getEvent;

  return (
    <>
      <DialogTitle>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          {description}
        </Typography>
      </DialogTitle>
      <Container sx={{ px: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
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
