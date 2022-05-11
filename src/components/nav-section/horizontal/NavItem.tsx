// @mui
import { Box, Link } from "@mui/material";
import { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { isExternalLink } from "..";
// config
import { ICON } from "../../../config";
// guards
import RoleBasedGuard from "../../../guards/RoleBasedGuard";
// hooks
import useLocales from "../../../hooks/useLocales";
//
import Iconify from "../../Iconify";
import { IListItemStyle, ListItemStyle } from "./style";

// ----------------------------------------------------------------------

// HANDLE SHOW ITEM BY ROLE
interface IListItem extends IListItemStyle {
  roles?: string[];
  component?: any;
  href?: string;
  target?: string;
  rel?: string;
  to?: string;
}
const ListItem = forwardRef((props: IListItem, ref: any) => (
  <RoleBasedGuard roles={props.roles}>
    <ListItemStyle {...props} ref={ref}>
      {props.children}
    </ListItemStyle>
  </RoleBasedGuard>
));
interface IItem {
  children: any[];
  icon: any;
  path: string;
  title: string;
  disabled: boolean;
  roles: string[];
}
interface INavItemRoot {
  item?: IItem;
  active?: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
export const NavItemRoot = forwardRef(
  ({ item, active, open, onMouseEnter, onMouseLeave }: INavItemRoot, ref) => {
    const { translate } = useLocales();

    const { title, path, icon, children, disabled, roles } = item;

    if (children) {
      return (
        <ListItem
          ref={ref}
          open={open}
          activeRoot={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          disabled={disabled}
          roles={roles}
        >
          <NavItemContent
            icon={icon}
            title={translate(title)}
            children={children}
          />
        </ListItem>
      );
    }

    return isExternalLink(path) ? (
      <ListItem
        component={Link}
        href={path}
        target="_blank"
        rel="noopener"
        disabled={disabled}
        roles={roles}
      >
        <NavItemContent
          icon={icon}
          title={translate(title)}
          children={children}
        />
      </ListItem>
    ) : (
      <ListItem
        component={RouterLink}
        to={path}
        activeRoot={active}
        disabled={disabled}
        roles={roles}
      >
        <NavItemContent
          icon={icon}
          title={translate(title)}
          children={children}
        />
      </ListItem>
    );
  }
);

// ----------------------------------------------------------------------
interface INavItemSub {
  item?: IItem;
  active?: boolean;
  open?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}
export const NavItemSub = forwardRef(
  ({ item, active, open, onMouseEnter, onMouseLeave }: INavItemSub, ref) => {
    const { translate } = useLocales();

    const { title, path, icon, children, disabled, roles } = item;

    if (children) {
      return (
        <ListItem
          ref={ref}
          subItem
          disableRipple
          open={open}
          activeSub={active}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          disabled={disabled}
          roles={roles}
        >
          <NavItemContent
            icon={icon}
            title={translate(title)}
            children={children}
            subItem
          />
        </ListItem>
      );
    }

    return isExternalLink(path) ? (
      <ListItem
        subItem
        href={path}
        disableRipple
        rel="noopener"
        target="_blank"
        component={Link}
        disabled={disabled}
        roles={roles}
      >
        <NavItemContent
          icon={icon}
          title={translate(title)}
          children={children}
          subItem
        />
      </ListItem>
    ) : (
      <ListItem
        disableRipple
        component={RouterLink}
        to={path}
        activeSub={active}
        subItem
        disabled={disabled}
        roles={roles}
      >
        <NavItemContent
          icon={icon}
          title={translate(title)}
          children={children}
          subItem
        />
      </ListItem>
    );
  }
);

// ----------------------------------------------------------------------

interface INavItemContent {
  title?: string;
  subItem?: boolean;
  icon: any;
  children?: any[];
}
function NavItemContent({ icon, title, children, subItem }: INavItemContent) {
  const { translate } = useLocales();

  return (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
            "& svg": { width: "100%", height: "100%" },
          }}
        >
          {icon}
        </Box>
      )}

      {translate(title)}

      {children && (
        <Iconify
          icon={subItem ? "eva:chevron-right-fill" : "eva:chevron-down-fill"}
          sx={{
            ml: 0.5,
            width: ICON.NAVBAR_ITEM_HORIZONTAL,
            height: ICON.NAVBAR_ITEM_HORIZONTAL,
          }}
        />
      )}
    </>
  );
}
