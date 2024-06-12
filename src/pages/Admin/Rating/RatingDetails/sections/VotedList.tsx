import {
  Box,
  CardHeader,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Avatar from "components/Avatar";
import Iconify from "components/Iconify";
import { SkeletonCommon } from "components/skeleton";
import {
  useChangeStatusRatingVoteMutation,
  useGetRatingVoteQuery,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { FC } from "react";
import { fSDateTime } from "utils/formatTime";
import { RatingCandidateData } from "../../data.t";

interface VotedListProps {
  candidate: RatingCandidateData;
  open: boolean;
  onClose: any;
}
const VotedList: FC<VotedListProps> = ({ open, candidate, onClose }) => {
  const { data, loading, refetch } = useGetRatingVoteQuery({
    fetchPolicy: "no-cache",
    skip: !candidate || !open,
    variables: { candidateId: candidate?.id },
  });
  const [onChangeStatus] = useChangeStatusRatingVoteMutation();

  const { enqueueSnackbar } = useSnackbar();
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
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle2">
                  {vote.voter.displayName}
                </Typography>
                {vote?.status === 2 ? (
                  <Iconify
                    color="#f50"
                    icon={"gridicons:cross-circle"}
                    fontSize={18}
                  />
                ) : (
                  <Iconify
                    color="#00AB55"
                    icon={"lets-icons:check-fill"}
                    fontSize={18}
                  />
                )}
              </Stack>
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
            <IconButton aria-label="delete">
              {vote?.status === 1 ? (
                <Iconify
                  icon={"gridicons:cross-circle"}
                  fontSize={24}
                  onClick={async () => {
                    try {
                      const changeStatusRes = await onChangeStatus({
                        variables: {
                          id: vote.id,
                          status: 2,
                        },
                      });
                      if (
                        changeStatusRes?.data?.changeStatusRatingVote?.success
                      ) {
                        enqueueSnackbar(
                          "Rating hidden is changed successfully!"
                        );
                        refetch();
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                />
              ) : (
                <Iconify
                  icon={"lets-icons:check-fill"}
                  fontSize={24}
                  onClick={async () => {
                    try {
                      const changeStatusRes = await onChangeStatus({
                        variables: {
                          id: vote.id,
                          status: 1,
                        },
                      });
                      if (
                        changeStatusRes?.data?.changeStatusRatingVote?.success
                      ) {
                        enqueueSnackbar(
                          "Rating vote status is changed successfully!"
                        );
                        refetch();
                      }
                    } catch (e) {
                      console.error(e);
                    }
                  }}
                />
              )}
            </IconButton>
          </Stack>
        ))}
      </Stack>
    );
  };
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack sx={{ p: 2 }}>
        <CardHeader
          title={`${candidate?.name} (${
            data?.getRatingVotes?.results?.filter((item) => item.status === 1)
              .length
          })`}
        />

        {renderContent()}
      </Stack>
    </Dialog>
  );
};

export default VotedList;
