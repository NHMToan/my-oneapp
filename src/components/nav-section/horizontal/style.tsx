// @mui
import { Button, ButtonProps, Popover, PopoverProps } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
// config
import { NAVBAR } from "../../../config";

// ----------------------------------------------------------------------
export interface IListItemStyle extends ButtonProps {
  activeRoot?: boolean;
  activeSub?: boolean;
  subItem?: boolean;
  open?: boolean;
}
export const ListItemStyle = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== "activeRoot" &&
    prop !== "activeSub" &&
    prop !== "subItem" &&
    prop !== "open",
})<IListItemStyle>(({ activeRoot, activeSub, subItem, open, theme }) => {
  const isLight = theme.palette.mode === "light";

  const activeRootStyle = {
    color: theme.palette.grey[800],
    backgroundColor: theme.palette.common.white,
    boxShadow: `-2px 4px 6px 0 ${alpha(
      isLight ? theme.palette.grey[500] : theme.palette.common.black,
      0.16
    )}`,
  };

  return {
    ...theme.typography.body2,
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0, 1),
    color: theme.palette.text.secondary,
    height: NAVBAR.DASHBOARD_ITEM_HORIZONTAL_HEIGHT,
    "&:hover": {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
    // activeRoot
    ...(activeRoot && {
      ...theme.typography.subtitle2,
      ...activeRootStyle,
      "&:hover": { ...activeRootStyle },
    }),
    // activeSub
    ...(activeSub && {
      ...theme.typography.subtitle2,
      color: theme.palette.text.primary,
    }),
    // subItem
    ...(subItem && {
      width: "100%",
      margin: 0,
      paddingRight: 0,
      paddingLeft: theme.spacing(1),
      justifyContent: "space-between",
    }),
    // open
    ...(open &&
      !activeRoot && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
  };
});

// ----------------------------------------------------------------------
interface IPaperStyle extends PopoverProps {
  theme?: any;
}
export const PaperStyle = styled(Popover)<IPaperStyle>(({ theme }) => ({
  pointerEvents: "none",
  "& .MuiPopover-paper": {
    width: 160,
    pointerEvents: "auto",
    padding: theme.spacing(1),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: theme.customShadows.dropdown,
  },
}));
