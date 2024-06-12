import { Grid, SxProps } from "@mui/material";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC } from "react";
import EventVoteList from "./EventVoteList";
import EventWaitingList from "./EventWaitingList";

interface EventDetailsVotesTabProps {
  event: ClubEvent;
  refetchStats?: () => void;
  isOneCol?: boolean;
  sx?: SxProps;
  compact?: boolean;
}
const EventDetailsVotesTab: FC<EventDetailsVotesTabProps> = ({
  event,
  refetchStats,
  isOneCol,
  sx,
  compact,
}) => {
  return (
    <Grid container spacing={3} sx={{ pb: 2 }}>
      <Grid item xs={12} md={isOneCol ? 12 : 6}>
        <EventVoteList
          event={event}
          refetchStats={refetchStats}
          sx={sx}
          compact={compact}
        />
      </Grid>
      {!compact && (
        <Grid item xs={12} md={isOneCol ? 12 : 6}>
          <EventWaitingList event={event} refetchStats={refetchStats} sx={sx} />
        </Grid>
      )}
    </Grid>
  );
};

export default EventDetailsVotesTab;
