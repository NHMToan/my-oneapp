import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import { SkeletonCommon } from "components/skeleton";
import { useGetVotesQuery } from "generated/graphql";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC } from "react";
import { fDateTime } from "utils/formatTime";

interface EventVoteListProps {
  event: ClubEvent;
}

const EventVoteList: FC<EventVoteListProps> = ({ event }) => {
  const { data, loading } = useGetVotesQuery({
    fetchPolicy: "no-cache",
    skip: !event,
    variables: { status: 1, limit: 100, offset: 0, eventId: event.id },
  });

  const renderList = () => {
    if (loading) return <SkeletonCommon />;

    if (!data || !data.getVotes || data?.getVotes?.totalCount === 0)
      return (
        <Typography sx={{ p: 3, color: "text.secondary" }}>
          No confirmed vote found
        </Typography>
      );

    return (
      <Stack spacing={3} sx={{ p: 3 }}>
        {data?.getVotes?.results.map((vote, index) => (
          <Voter
            key={vote.id}
            vote={vote}
            index={index}
            isAdmin={event.isAdmin}
          />
        ))}
      </Stack>
    );
  };
  return (
    <Card>
      <CardHeader title="Confirmed List" />

      {renderList()}
    </Card>
  );
};

interface VoterProps {
  index: any;
  vote: any;
  isAdmin: any;
}

function Voter({ vote, index, isAdmin }: VoterProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={vote.name} src={vote.avatar} />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">
          {vote.name} ({vote.value})
        </Typography>

        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Iconify
            icon={"ant-design:calendar-filled"}
            sx={{ width: 16, height: 16, mr: 0.5 }}
          />
          {fDateTime(vote.createdAt)}
        </Typography>
      </Box>

      {isAdmin && (
        <Button color="error" variant="contained">
          Delete
        </Button>
      )}
    </Stack>
  );
}

export default EventVoteList;
