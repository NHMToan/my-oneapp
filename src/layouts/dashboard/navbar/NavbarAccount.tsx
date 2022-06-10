import { Box, Link, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
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
          <Typography variant="body2" noWrap sx={{ color: "text.secondary" }}>
            {user?.role}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
