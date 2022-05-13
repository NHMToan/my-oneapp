import { Card, Divider, Stack, Typography } from "@mui/material";
import { fNumber } from "utils/formatNumber";

// ----------------------------------------------------------------------

interface IProfileFollowInfo {
  profile: any;
}
export default function ProfileFollowInfo({ profile }: IProfileFollowInfo) {
  const { follower, following } = profile;

  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(follower)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Follower
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(following)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Following
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
