import {
  CardHeader,
  Stack,
  Card,
  Avatar,
  Box,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";
import { ClubEvent, VoteData } from "pages/Clubs/data.t";
import { FC } from "react";
import _mock from "_mock";
import Iconify from "components/Iconify";
import { fDateTime } from "utils/formatTime";
import DropdownMenu from "components/DropdownMenu";
import { useGetVotesQuery } from "generated/graphql";
import { SkeletonCommon } from "components/skeleton";

interface EventWaitingListProps {
  event: ClubEvent;
}
const EventWaitingList: FC<EventWaitingListProps> = ({ event }) => {
  const { data, loading } = useGetVotesQuery({
    fetchPolicy: "no-cache",
    skip: !event,
    variables: { status: 2, limit: 100, offset: 0, eventId: event.id },
  });

  const renderList = () => {
    if (loading) return <SkeletonCommon />;

    if (!data || !data.getVotes || data?.getVotes?.totalCount === 0)
      return (
        <Typography sx={{ p: 3, color: "text.secondary" }}>
          No waiting vote found
        </Typography>
      );

    return (
      <Stack spacing={3} sx={{ p: 3 }}>
        {data?.getVotes?.results.map((vote, index) => (
          <Voter
            key={vote.id}
            vote={vote as any}
            index={index}
            isAdmin={event.isAdmin}
          />
        ))}
      </Stack>
    );
  };
  return (
    <Card>
      <CardHeader title="Waiting List" />

      {renderList()}
    </Card>
  );
};

interface VoterProps {
  index: any;
  vote: VoteData;
  isAdmin: boolean;
}

function Voter({ vote, index, isAdmin }: VoterProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar
        alt={vote.member.profile.displayName}
        src={vote.member.profile.avatar}
      />

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">
          {vote.member.profile.displayName} ({vote.value})
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
        <DropdownMenu
          actions={
            <>
              <MenuItem onClick={async () => {}}>
                <Iconify icon={"eva:checkmark-circle-2-fill"} />
                Set to vote
              </MenuItem>

              <Divider sx={{ borderStyle: "dashed" }} />

              <MenuItem sx={{ color: "error.main" }} onClick={async () => {}}>
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
            </>
          }
        />
      )}
    </Stack>
  );
}

export default EventWaitingList;
