// @mui
import { Avatar, Box, Card, Grid, Link, Typography } from "@mui/material";
import { SkeletonCommon } from "components/skeleton";
import { useGetFriendsQuery } from "generated/graphql";
import SocialsButton from "pages/People/sections/SocialsButton";
import UserCardActions from "pages/People/sections/UserCardActions";
import { IProfile } from "types/user";

// ----------------------------------------------------------------------

interface ProfileFriendsProps {
  profile: IProfile;
}
export default function ProfileFriends({ profile }: ProfileFriendsProps) {
  const { data, loading, error } = useGetFriendsQuery({
    variables: { profileId: profile.id, limit: 50, offset: 0 },
    fetchPolicy: "no-cache",
  });
  if (loading) return <SkeletonCommon />;
  if (!data) return <p>{error.message}</p>;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Friends
      </Typography>

      <Grid container spacing={3}>
        {data.getFriends.results.map((friend) => (
          <Grid key={friend.id} item xs={12} md={4}>
            <FriendCard friend={friend as any} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface FriendCardProps {
  friend: IProfile;
}
function FriendCard({ friend }: FriendCardProps) {
  const {
    displayName,
    role,
    avatar,
    facebookLink,
    portfolioLink,
    linkedinLink,
    twitterLink,
  } = friend;
  const SOCIALS = [
    {
      name: "FaceBook",
      icon: "eva:facebook-fill",
      socialColor: "#1877F2",
      path: facebookLink,
    },
    {
      name: "Portfolio",
      icon: "bxs:user-rectangle",
      socialColor: "#E02D69",
      path: portfolioLink,
    },
    {
      name: "Linkedin",
      icon: "eva:linkedin-fill",
      socialColor: "#007EBB",
      path: linkedinLink,
    },
    {
      name: "Twitter",
      icon: "eva:twitter-fill",
      socialColor: "#00AAEC",
      path: twitterLink,
    },
  ];
  return (
    <Card
      sx={{
        py: 5,
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        alt={displayName}
        src={avatar}
        sx={{ width: 64, height: 64, mb: 3 }}
      />
      <Link variant="subtitle1" color="text.primary">
        {displayName}
      </Link>

      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
        {role || "-"}
      </Typography>
      <Box sx={{ top: 8, right: 8, position: "absolute" }}>
        <SocialsButton initialColor links={SOCIALS} />
      </Box>
      <UserCardActions profile={friend} />
    </Card>
  );
}
