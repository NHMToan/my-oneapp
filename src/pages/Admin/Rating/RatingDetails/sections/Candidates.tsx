import { Box, Button, CardHeader, Stack, useTheme } from "@mui/material";
import Carousel, { CarouselArrows } from "components/carousel";
import { SkeletionComment } from "components/skeleton";
import { useGetCandidatesQuery } from "generated/graphql";
import { FC, useRef, useState } from "react";
import { RatingCandidateData, RatingData } from "../../data.t";
import CandidateCard from "./CandidateCard";
import CandidateFormModal from "./CandidateFormModal";
interface CandidatesProps {
  rating: RatingData;
}
const Candidates: FC<CandidatesProps> = ({ rating }) => {
  const theme = useTheme();
  const [selectedCandidate, setSelectedCandidate] =
    useState<RatingCandidateData>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const { data, loading, refetch } = useGetCandidatesQuery({
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
    <Box sx={{ p: 2 }}>
      <CardHeader
        title={"Candidates"}
        action={
          <Stack direction="row" spacing={3}>
            {data?.getCandidates?.totalCount > 0 && (
              <CarouselArrows onNext={handleNext} onPrevious={handlePrev} />
            )}
            <Button
              variant="contained"
              onClick={() => {
                setOpenForm(true);
              }}
            >
              Add candidate
            </Button>
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
              postDeleted={refetch}
              onEdit={() => {
                setOpenForm(true);
                setSelectedCandidate(item);
              }}
            />
          ))}
        </Carousel>
      )}

      <CandidateFormModal
        isOpen={openForm}
        rating={rating}
        candidate={selectedCandidate}
        onClose={() => {
          setOpenForm(false);
          setSelectedCandidate(null);
        }}
        onPostSave={() => {
          refetch();
          setOpenForm(false);
        }}
      />
    </Box>
  );
};

export default Candidates;
