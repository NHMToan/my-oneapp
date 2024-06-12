import {
  Box,
  Button,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "components/Image";
import Markdown from "components/Markdown";
import { SkeletionComment } from "components/skeleton";
import { useGetCandidatesQuery } from "generated/graphql";
import { RatingCandidateData, RatingData } from "pages/Admin/Rating/data.t";
import { FC, useState } from "react";
import CandidateModal from "./CandidateModal";

interface CandidatesProps {
  rating: RatingData;
  postVoted: any;
}

const Candidates: FC<CandidatesProps> = ({ rating, postVoted }) => {
  const { data, loading, refetch } = useGetCandidatesQuery({
    variables: { ratingId: rating?.id },
    skip: !rating,
  });
  const { status, hidden } = rating;
  if (!data || !data.getCandidates.results.length) return null;

  let list = [...data?.getCandidates?.results];

  // // Check if the list is not null and contains items
  // if (list && list.length > 0) {
  //   list.sort((a, b) => b.votedCount - a.votedCount);

  //   list = list.map((candidate, index) => ({
  //     ...candidate,
  //     votedCount: candidate.votedCount || 0,
  //     rank: index + 1,
  //   }));
  // }

  return (
    <Box>
      <CardHeader
        title={<>{rating.name}</>}
        subheader={<Markdown children={rating.description} />}
        sx={{
          p: 0,
          mb: 3,
          "& .MuiCardHeader-action": { alignSelf: "center" },
        }}
      />

      {loading ? (
        <SkeletionComment />
      ) : (
        <Grid container spacing={[1, 1]}>
          {list?.map((item: any, index) => (
            <Grid key={item.id} item xs={6} sm={3}>
              <CandidateCard
                key={item.id}
                avatarKey={index + 1}
                data={item as any}
                isVoted={rating?.votedFor?.id === item.id}
                voteFor={rating?.votedFor}
                rating={rating}
                postVoted={() => {
                  refetch();
                  postVoted();
                }}
                isClose={status === 1 && hidden}
                isHidden={hidden}
                rank={item.rank}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

interface CandidateCardProps {
  data: RatingCandidateData;
  isVoted?: boolean;
  voteFor?: RatingCandidateData;
  rating: RatingData;
  postVoted: any;
  isClose: boolean;
  isHidden: boolean;
  avatarKey: number;
  rank: number;
}
const CandidateCard: FC<CandidateCardProps> = ({
  data,
  isVoted,
  voteFor,
  rating,
  postVoted,
  isClose,
  isHidden,
  avatarKey,
  rank,
}) => {
  const { photo1, name } = data;
  const [open, setOpen] = useState<boolean>(false);

  // const renderRating =
  //   rank > 3 ? null : (
  //     <Stack
  //       direction="row"
  //       alignItems="center"
  //       sx={{
  //         top: 15,
  //         right: 18,
  //         zIndex: 9,
  //         borderRadius: 1,
  //         position: "absolute",
  //         p: "2px 6px 2px 4px",
  //         typography: "subtitle2",
  //         bgcolor: "warning.lighter",
  //       }}
  //     >
  //       <Iconify
  //         icon="eva:star-fill"
  //         sx={{ color: "warning.main", mr: 0.25 }}
  //       />{" "}
  //       {rank}
  //     </Stack>
  //   );

  return (
    <Paper
      sx={{
        borderRadius: 2,
        bgcolor: isVoted
          ? (theme: any) => theme.palette["primary"].lighter
          : "background.neutral",
      }}
    >
      <Box flexGrow={1} sx={{ p: 1, position: "relative" }}>
        <Image
          alt="cover"
          src={photo1}
          ratio="1/1"
          sx={{ borderRadius: 1.5 }}
          clickable
        />
      </Box>
      <Stack spacing={2.5} sx={{ p: 2, pt: 2.5 }}>
        <Stack direction="column" spacing={1}>
          <div>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">{name}</Typography>
            </Stack>
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              setOpen(true);
            }}
          >
            Show info
          </Button>
          <CandidateModal
            open={open}
            onClose={() => setOpen(false)}
            key={data.id}
            avatarKey={avatarKey}
            data={data}
            isVoted={isVoted}
            voteFor={voteFor}
            rating={rating}
            postVoted={postVoted}
            isClose={isClose}
            isHidden={isHidden}
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Candidates;
