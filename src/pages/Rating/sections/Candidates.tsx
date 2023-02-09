import {
  Box,
  Button,
  CardHeader,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Carousel, { CarouselArrows } from "components/carousel";
import Image from "components/Image";
import Markdown from "components/Markdown";
import PopConfirm from "components/PopConfirm";
import { SkeletionComment } from "components/skeleton";
import {
  useGetCandidatesQuery,
  useVoteCandidateMutation,
} from "generated/graphql";
import useCountdown from "hooks/useCountdown";
import { useSnackbar } from "notistack";
import { RatingCandidateData, RatingData } from "pages/Admin/Rating/data.t";
import { FC, useEffect, useRef, useState } from "react";

interface CandidatesProps {
  rating: RatingData;
  postVoted: any;
}
const CountdownStyle = styled("div")({
  display: "flex",
});

const SeparatorStyle = styled(Typography)(({ theme }: { theme: any }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up("sm")]: {
    margin: theme.spacing(0, 0.5),
  },
}));
const RenderCountdown = ({ date, onEnd }) => {
  const countdown = useCountdown(new Date(date));
  useEffect(() => {
    const now = new Date();
    if (now > new Date(date)) {
      onEnd();
    }
  }, [countdown]);
  return (
    <CountdownStyle>
      <div>
        <Typography>{countdown.hours}</Typography>
      </div>

      <SeparatorStyle>:</SeparatorStyle>

      <div>
        <Typography>{countdown.minutes}</Typography>
      </div>

      <SeparatorStyle>:</SeparatorStyle>

      <div>
        <Typography>{countdown.seconds}</Typography>
      </div>
    </CountdownStyle>
  );
};

const Candidates: FC<CandidatesProps> = ({ rating, postVoted }) => {
  const theme = useTheme();
  const [isClose, setIsClose] = useState<boolean>(
    new Date() > new Date(rating?.end)
  );
  const { data, loading } = useGetCandidatesQuery({
    variables: { ratingId: rating?.id },
    skip: !rating,
  });

  const carouselSettings = {
    dots: false,
    arrows: false,
    slidesToShow:
      data?.getCandidates?.totalCount < 4 ? data?.getCandidates?.totalCount : 4,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === "rtl"),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const carouselRef = useRef(null);
  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Box>
      <CardHeader
        title={
          <>
            {rating.name}{" "}
            {!isClose && (
              <RenderCountdown
                onEnd={() => {
                  setIsClose(true);
                }}
                date={rating.end}
              />
            )}
          </>
        }
        subheader={`${data?.getCandidates?.totalCount || 0} candidates`}
        action={
          <Stack direction="row" spacing={3}>
            {data?.getCandidates?.totalCount > 0 && (
              <CarouselArrows onNext={handleNext} onPrevious={handlePrev} />
            )}
          </Stack>
        }
        sx={{
          p: 0,
          mb: 3,
          "& .MuiCardHeader-action": { alignSelf: "center" },
        }}
      />

      {loading ? (
        <SkeletionComment />
      ) : (
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data?.getCandidates?.results?.map((item: any) => (
            <CandidateCard
              key={item.id}
              data={item as any}
              isVoted={rating?.votedFor?.id === item.id}
              voteFor={rating?.votedFor}
              rating={rating}
              postVoted={postVoted}
              isClose={isClose}
            />
          ))}
        </Carousel>
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
}
const CandidateCard: FC<CandidateCardProps> = ({
  data,
  isVoted,
  voteFor,
  rating,
  postVoted,
  isClose,
}) => {
  const { photo1, name, bio } = data;
  const [onVote] = useVoteCandidateMutation();
  const [openVote, setOpenVote] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Paper
      sx={{
        mx: 1,
        borderRadius: 2,
        bgcolor: isVoted
          ? (theme: any) => theme.palette["primary"].lighter
          : "background.neutral",
      }}
    >
      <Box sx={{ p: 1, position: "relative" }}>
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
              <Typography variant="subtitle2">{name}</Typography>
            </Stack>
          </div>
          <div>
            <Markdown children={bio} />
          </div>
          <div>
            <PopConfirm
              open={openVote}
              onClose={() => setOpenVote(false)}
              title={
                voteFor ? (
                  <CardHeader
                    title={`You have already voted for ${voteFor?.name}, do you want to change your vote to ${data.name}?`}
                  />
                ) : (
                  <CardHeader title={`Are you sure to vote for ${name}?`} />
                )
              }
              actions={
                <>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setOpenVote(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
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
                          setOpenVote(false);
                        }
                      } catch (e) {
                        console.error(e);
                      }
                    }}
                  >
                    Vote
                  </Button>
                </>
              }
            >
              <Button
                variant="contained"
                fullWidth
                disabled={isVoted || isClose}
                onClick={() => {
                  setOpenVote(true);
                }}
              >
                Vote
              </Button>
            </PopConfirm>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Candidates;
