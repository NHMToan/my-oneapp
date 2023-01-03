import { Box, BoxProps, List, ListSubheader } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import useAuth from "hooks/useAuth";
import { ReactNode } from "react";
// hooks
import useLocales from "../../../hooks/useLocales";
//
import { NavListRoot } from "./NavList";

// ----------------------------------------------------------------------
type ListSubheaderStyleProps = {
  children: ReactNode;
};
export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))<ListSubheaderStyleProps>(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

interface NavSectionVerticalProps extends BoxProps {
  navConfig?: any[];
  isCollapse?: boolean;
}
export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}: NavSectionVerticalProps) {
  const { translate } = useLocales();
  const { user } = useAuth();
  return (
    <Box {...other}>
      {navConfig.map((group, key) => (
        <List key={key} disablePadding sx={{ px: 2 }}>
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {translate(group.subheader)}
          </ListSubheaderStyle>

          {group.items
            .filter(
              (item) =>
                (user.role !== "admin" && !item.isAdmin) ||
                user.role === "admin"
            )
            .map((list) => (
              <NavListRoot
                key={list.title + list.path}
                list={list}
                isCollapse={isCollapse}
              />
            ))}
        </List>
      ))}
    </Box>
  );
}
