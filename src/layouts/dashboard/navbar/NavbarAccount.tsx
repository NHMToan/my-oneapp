import { Box, Link, Stack, Typography } from "@mui/material";
// @mui
import { styled, useTheme } from "@mui/material/styles";
import BadgeStatus from "components/BadgeStatus";
import Label from "components/Label";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
// components
import MyAvatar from "../../../components/MyAvatar";
// hooks
import useAuth from "../../../hooks/useAuth";
// routes

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

interface INavbarAccount {
  isCollapse?: boolean;
}
export default function NavbarAccount({ isCollapse }: INavbarAccount) {
  const { user } = useAuth();
  const theme = useTheme();

  const renderTag = () => {
    if (user.role === "admin")
      return (
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={"error"}
          sx={{ textTransform: "capitalize" }}
        >
          {user?.role}
        </Label>
      );

    return (
      <Stack direction="row" spacing={1} alignItems="center">
        <BadgeStatus size="large" status="online" />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Online
        </Typography>
      </Stack>
    );
  };
  return (
    <Link
      underline="none"
      color="inherit"
      component={RouterLink}
      to={PATH_DASHBOARD.user.profile(user.profile.id)}
    >
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: "transparent",
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create("width", {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {user?.displayName}
          </Typography>
          {!isCollapse && renderTag()}
        </Box>
      </RootStyle>
    </Link>
  );
}
