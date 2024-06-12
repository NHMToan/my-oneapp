import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import Image from "components/Image";
import Markdown from "components/Markdown";
import { useVoteCandidateMutation } from "generated/graphql";
import { useSnackbar } from "notistack";
import { RatingCandidateData, RatingData } from "pages/Admin/Rating/data.t";
import { FC } from "react";

interface CandidateModalProps {
  open: boolean;
  onClose: () => void;
  data: RatingCandidateData;
  isVoted?: boolean;
  voteFor?: RatingCandidateData;
  rating: RatingData;
  postVoted: any;
  isClose: boolean;
  isHidden: boolean;
  avatarKey: number;
}
const CandidateModal: FC<CandidateModalProps> = ({
  onClose,
  open,
  data,
  isHidden,
  isClose,
  rating,
  postVoted,
  avatarKey,
  isVoted,
}) => {
  const { photo1, name, bio, video } = data;
  const { enqueueSnackbar } = useSnackbar();
  const [onVote] = useVoteCandidateMutation();

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      {video ? (
        <iframe
          width="100%" // Adjust the width as needed
          height="415px" // Adjust the height as needed
          src={video}
          title="YouTube Video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <Box sx={{ p: 1, position: "relative" }}>
          <Image
            alt="cover"
            src={photo1}
            ratio="1/1"
            sx={{ borderRadius: 1.5 }}
            clickable
          />
        </Box>
      )}
      <Stack spacing={2.5} sx={{ p: 2, pt: 2.5 }}>
        <Stack direction="column" spacing={1}>
          <div>
            <Stack direction="row">
              <Typography variant="h6" color="">
                {name}
              </Typography>
            </Stack>
          </div>

          <div>
            <Markdown children={bio} />
          </div>
          <Button
            fullWidth
            variant="contained"
            disabled={isClose || isVoted || isHidden}
            onClick={async () => {
              try {
                const res = await onVote({
                  variables: {
                    ratingId: rating.id,
                    candidateId: data.id,
                  },
                });
                if (res?.data?.voteCandidate?.success) {
                  enqueueSnackbar("Thanks for your vote!");
                  postVoted();
                } else {
                  enqueueSnackbar(res?.data?.voteCandidate?.message, {
                    variant: "error",
                  });
                }
              } catch (e) {
                console.error(e);
              }
            }}
          >
            {isVoted ? "Voted" : "Vote"}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default CandidateModal;
