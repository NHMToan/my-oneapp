// @mui
import { Grid, Skeleton } from "@mui/material";

// ----------------------------------------------------------------------

export default function SkeletonCommon() {
  return (
    <Grid container spacing={8}>
      <Grid item xs>
        <Skeleton variant="circular" width={80} height={80} />
      </Grid>
      <Grid item xs>
        <Skeleton variant="text" height={240} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
    </Grid>
  );
}
