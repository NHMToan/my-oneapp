import { Grid, Stack } from "@mui/material";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowInfo from "./ProfileFollowInfo";
import ProfilePostInput from "./ProfilePostInput";
import ProfileSocialInfo from "./ProfileSocialInfo";

// ----------------------------------------------------------------------

interface IProfile {
  myProfile: any;
}
export default function Profile({ myProfile }: IProfile) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo profile={myProfile} />
          <ProfileAbout profile={myProfile} />
          <ProfileSocialInfo profile={myProfile} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <ProfilePostInput />
        </Stack>
      </Grid>
    </Grid>
  );
}
