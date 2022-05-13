import { Box, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import Image from "components/Image";
import MyAvatar from "components/MyAvatar";
import { userName } from "consts";
import useAuth from "hooks/useAuth";
import cssStyles from "utils/cssStyles";

// ----------------------------------------------------------------------
interface IRootStyle {
  theme?: any;
}
const RootStyle = styled("div")<IRootStyle>(({ theme }) => ({
  "&:before": {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  marginTop: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

interface IProfileCover {
  myProfile: any;
}
export default function ProfileCover({ myProfile }: IProfileCover) {
  const { user } = useAuth();

  const { position, cover } = myProfile;

  return (
    <RootStyle>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: "auto",
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "common.white",
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{userName(user)}</Typography>
          <Typography sx={{ opacity: 0.72 }}>{position}</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src={cover}
        sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </RootStyle>
  );
}
