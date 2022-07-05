import { Grid, Stack } from "@mui/material";
import { IProfile } from "types/user";
import ProfileAbout from "./ProfileAbout";
import ProfileSocialInfo from "./ProfileSocialInfo";

// ----------------------------------------------------------------------

interface ProfileProps {
  profile: IProfile;
}
export default function Profile({ profile }: ProfileProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
        </Stack>
      </Grid>
    </Grid>
  );
}
