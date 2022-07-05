import { Box, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import Image from "components/Image";
import useResponsive from "hooks/useResponsive";
import { ClubData } from "pages/Clubs/data.t";
import cssStyles from "utils/cssStyles";

// ----------------------------------------------------------------------
interface IRootStyle {
  theme?: any;
  active?: "true" | "false";
}
const RootStyle = styled("div")<IRootStyle>(({ theme, active }) => ({
  "&:before":
    active === "true"
      ? {
          ...cssStyles().bgBlur({
            blur: 2,
            color: theme.palette.primary.darker,
          }),
          top: 0,
          zIndex: 9,
          content: "''",
          width: "100%",
          height: "87%",
          position: "absolute",
        }
      : {
          top: 0,
          zIndex: 9,
          content: "''",
          width: "100%",
          height: "87%",
          position: "absolute",
        },
}));

const InfoStyle = styled("div")(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: "absolute",
  bottom: theme.spacing(24),
  [theme.breakpoints.up("md")]: {
    right: "auto",
    display: "flex",
    alignItems: "center",
    left: theme.spacing(3),
    bottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

interface ClubCoverProps {
  club: ClubData;
}
export default function ClubCover({ club }: ClubCoverProps) {
  const { title, cover } = club;
  const isDesktop = useResponsive("up", "md");
  return (
    <RootStyle active="false">
      <InfoStyle>
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: isDesktop ? "common.dark" : "common.white",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography variant="h4">{title}</Typography>
        </Box>
      </InfoStyle>
      <Image
        alt="profile cover"
        src={cover}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          height: "87%",
        }}
      />
    </RootStyle>
  );
}
