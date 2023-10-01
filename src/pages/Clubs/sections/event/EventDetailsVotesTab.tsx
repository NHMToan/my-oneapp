import { Grid } from "@mui/material";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC } from "react";
import EventVoteList from "./EventVoteList";
import EventWaitingList from "./EventWaitingList";

interface EventDetailsVotesTabProps {
  event: ClubEvent;
  refetchStats?: () => void;
}
const EventDetailsVotesTab: FC<EventDetailsVotesTabProps> = ({
  event,
  refetchStats,
}) => {
  return (
    <Grid container spacing={3} sx={{ pb: 2 }}>
      <Grid item xs={12} md={6}>
        <EventVoteList event={event} refetchStats={refetchStats} />
      </Grid>
      <Grid item xs={12} md={6}>
        <EventWaitingList event={event} refetchStats={refetchStats} />
      </Grid>
    </Grid>
  );
};

export default EventDetailsVotesTab;
