// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { SimpleSkeleton } from "components/skeleton";
import {
  useFollowUserMutation,
  useGetFollowersQuery,
  useUnFollowUserMutation,
} from "generated/graphql";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { IProfile } from "types/user";
import Iconify from "../../../../components/Iconify";
// ----------------------------------------------------------------------

interface ProfileFollowersProps {
  profile: IProfile;
}
export default function ProfileFollowers({ profile }: ProfileFollowersProps) {
  const { data, loading, error } = useGetFollowersQuery({
    variables: { profileId: profile?.id, limit: 50, offset: 0 },
    fetchPolicy: "no-cache",
  });
  if (loading) return <SimpleSkeleton />;
  if (!data) return <p>{error.message}</p>;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Followers
      </Typography>

      <Grid container spacing={3}>
        {data?.getFollowers?.results?.map((follower) => (
          <Grid key={follower.id} item xs={12} md={4}>
            <FollowerCard follower={follower as any} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface FollowerCardProps {
  follower: IProfile;
}
function FollowerCard({ follower }: FollowerCardProps) {
  const { displayName, country, avatar, isFollowing, id } = follower;

  const [toggle, setToogle] = useState(isFollowing);

  const [onFollow] = useFollowUserMutation();
  const [onUnFollow] = useUnFollowUserMutation();

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Avatar alt={displayName} src={avatar} sx={{ width: 48, height: 48 }} />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Typography variant="subtitle2" noWrap>
          <Link to={PATH_DASHBOARD.user.profile(id)} component={RouterLink}>
            {displayName}
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Iconify
            icon={"eva:pin-fill"}
            sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
          />
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {country}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        onClick={async () => {
          setToogle(!toggle);
          if (toggle) {
            await onUnFollow({
              variables: {
                profileId: id,
              },
            });
          } else {
            await onFollow({
              variables: {
                profileId: id,
              },
            });
          }
        }}
        variant={toggle ? "text" : "outlined"}
        color={toggle ? "primary" : "inherit"}
        startIcon={toggle && <Iconify icon={"eva:checkmark-fill"} />}
      >
        {toggle ? "Followed" : "Follow"}
      </Button>
    </Card>
  );
}
