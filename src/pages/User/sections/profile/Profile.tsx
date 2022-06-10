import { Grid, Stack } from "@mui/material";
import useAuth from "hooks/useAuth";
import UserCardActions from "pages/People/sections/UserCardActions";
import { IProfile } from "types/user";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowInfo from "./ProfileFollowInfo";
import ProfilePostInput from "./ProfilePostInput";
import ProfileSocialInfo from "./ProfileSocialInfo";

// ----------------------------------------------------------------------

interface ProfileProps {
  profile: IProfile;
}
export default function Profile({ profile }: ProfileProps) {
  const { user } = useAuth();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          {user.profile.id !== profile.id && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <UserCardActions profile={profile} />
            </div>
          )}
          <ProfileFollowInfo profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileSocialInfo profile={profile} />
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
