// @mui
import { CardHeader, Skeleton } from "@mui/material";

// ----------------------------------------------------------------------

export default function SkeletionComment() {
  return (
    <CardHeader
      avatar={
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      }
      action={null}
      title={
        <Skeleton
          animation="wave"
          height={10}
          width="80%"
          style={{ marginBottom: 6 }}
        />
      }
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
    />
  );
}
