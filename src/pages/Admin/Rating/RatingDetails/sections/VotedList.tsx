import { Box, CardHeader, Dialog, Stack, Typography } from "@mui/material";
import Avatar from "components/Avatar";
import Iconify from "components/Iconify";
import { SkeletonCommon } from "components/skeleton";
import { useGetRatingVoteQuery } from "generated/graphql";
import { FC } from "react";
import { fSDateTime } from "utils/formatTime";
import { RatingCandidateData } from "../../data.t";

interface VotedListProps {
  candidate: RatingCandidateData;
  open: boolean;
  onClose: any;
}
const VotedList: FC<VotedListProps> = ({ open, candidate, onClose }) => {
  const { data, loading } = useGetRatingVoteQuery({
    fetchPolicy: "no-cache",
    skip: !candidate || !open,
    variables: { candidateId: candidate?.id },
  });
  const renderContent = () => {
    if (loading) return <SkeletonCommon />;
    if (!data || data.getRatingVotes.totalCount === 0)
      return (
        <Stack spacing={3} sx={{ p: 3 }}>
          No votes found
        </Stack>
      );
    return (
      <Stack spacing={3} sx={{ p: 3 }}>
        {data?.getRatingVotes?.results.map((vote, index) => (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={vote.voter.displayName}
              src={vote.voter.avatar}
              clickable
            />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">
                {vote.voter.displayName}
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
                {fSDateTime(vote.createdAt)}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    );
  };
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack sx={{ p: 2 }}>
        <CardHeader
          title={`Candidate voted list (${data?.getRatingVotes?.totalCount})`}
          subheader={candidate?.name}
        />

        {renderContent()}
      </Stack>
    </Dialog>
  );
};

export default VotedList;
