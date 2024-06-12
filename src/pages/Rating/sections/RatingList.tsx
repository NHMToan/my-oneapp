import { Grid, Stack } from "@mui/material";
import { SkeletionComment } from "components/skeleton";
import { useMyRatingsQuery } from "generated/graphql";
import { FC } from "react";
import RatingCard from "./RatingCard";

interface RatingListProps {}
const RatingList: FC<RatingListProps> = (props) => {
  const { data, loading, refetch } = useMyRatingsQuery({
    fetchPolicy: "no-cache",
  });

  if (loading) return <SkeletionComment />;
  if (!data || data.myRatings.totalCount === 0) return <div>Empty</div>;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Stack direction="column" justifyContent="center" spacing={4}>
          {data.myRatings.results.map((item) => (
            <RatingCard data={item as any} postVoted={refetch} key={item.id} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default RatingList;
