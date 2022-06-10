import {
  Avatar,
  Box,
  Card,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "components/Image";
import SvgIconStyle from "components/SvgIconStyle";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { IProfile } from "types/user";
import cssStyles from "utils/cssStyles";
import { fShortenNumber } from "utils/formatNumber";
import UserCardActions from "./UserCardActions";
// ----------------------------------------------------------------------

const OverlayStyle = styled("div")(({ theme }: { theme: any }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
  top: 0,
  zIndex: 8,
  content: "''",
  width: "100%",
  height: "100%",
  position: "absolute",
}));

// ----------------------------------------------------------------------

interface UserCardProps {
  profile: IProfile;
}
export default function UserCard({ profile }: UserCardProps) {
  const { displayName, cover, role, follower, avatar, friend, following, id } =
    profile;

  // const SOCIALS = [
  //   {
  //     name: "FaceBook",
  //     icon: "eva:facebook-fill",
  //     socialColor: "#1877F2",
  //     path: facebookLink,
  //   },
  //   {
  //     name: "Portfolio",
  //     icon: "bxs:user-rectangle",
  //     socialColor: "#E02D69",
  //     path: portfolioLink,
  //   },
  //   {
  //     name: "Linkedin",
  //     icon: "eva:linkedin-fill",
  //     socialColor: "#007EBB",
  //     path: linkedinLink,
  //   },
  //   {
  //     name: "Twitter",
  //     icon: "eva:twitter-fill",
  //     socialColor: "#00AAEC",
  //     path: twitterLink,
  //   },
  // ];
  return (
    <Card sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative" }}>
        <SvgIconStyle
          src="https://minimal-assets-api-dev.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: "auto",
            position: "absolute",
            color: "background.paper",
          }}
        />
        <Avatar
          alt={displayName}
          src={avatar}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: "auto",
            position: "absolute",
          }}
        />
        {!cover && <OverlayStyle />}
        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6 }}>
        <Link to={PATH_DASHBOARD.user.profile(id)} component={RouterLink}>
          {displayName}
        </Link>
      </Typography>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {role || "-"}
      </Typography>

      <Stack alignItems="center" sx={{ my: 1, mb: 2 }}>
        <UserCardActions profile={profile} />
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Box
        sx={{ py: 3, display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Follower
          </Typography>
          <Typography variant="subtitle1">
            {fShortenNumber(follower)}
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Following
          </Typography>
          <Typography variant="subtitle1">
            {fShortenNumber(following)}
          </Typography>
        </div>

        <div>
          <Typography
            variant="caption"
            component="div"
            sx={{ mb: 0.75, color: "text.disabled" }}
          >
            Friends
          </Typography>
          <Typography variant="subtitle1">{fShortenNumber(friend)}</Typography>
        </div>
      </Box>
    </Card>
  );
}
