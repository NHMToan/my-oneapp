// @mui
import { Box, Link, ListItemText, Tooltip, Typography } from "@mui/material";
import { forwardRef } from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { isExternalLink } from "..";
// guards
import RoleBasedGuard from "../../../guards/RoleBasedGuard";
// hooks
import useLocales from "../../../hooks/useLocales";
//
import Iconify from "../../Iconify";
import {
  IListItemStyle,
  ListItemIconStyle,
  ListItemStyle,
  ListItemTextStyle,
} from "./style";

// ----------------------------------------------------------------------

// HANDLE SHOW ITEM BY ROLE
interface ListItemProps extends IListItemStyle {
  roles?: string[];
  component?: any;
  href?: string;
  target?: string;
  rel?: string;
  to?: string;
}
const ListItem = forwardRef((props: ListItemProps, ref: any) => (
  <RoleBasedGuard roles={props.roles}>
    <ListItemStyle {...props} ref={ref}>
      {props.children}
    </ListItemStyle>
  </RoleBasedGuard>
));
interface ItemProps {
  children: any[];
  icon: any;
  info: any;
  path: string;
  title: string;
  disabled: boolean;
  caption: string;
  roles: string[];
}
interface INavItemRoot {
  active?: boolean;
  open?: boolean;
  isCollapse?: boolean;
  onOpen?: () => void;
  item?: ItemProps;
}
export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}: INavItemRoot) {
  const { translate } = useLocales();

  const { title, path, icon, info, children, disabled, caption, roles } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle
        disableTypography
        primary={translate(title)}
        secondary={
          <Tooltip title={translate(caption) || ""} arrow>
            <Typography
              noWrap
              variant="caption"
              component="div"
              sx={{ textTransform: "initial", color: "text.secondary" }}
            >
              {translate(caption)}
            </Typography>
          </Tooltip>
        }
        isCollapse={isCollapse}
      />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      <ListItem
        onClick={onOpen}
        activeRoot={active}
        disabled={disabled}
        roles={roles}
      >
        {renderContent}
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
      {renderContent}
    </ListItem>
  ) : (
    <ListItem
      component={RouterLink}
      to={path}
      activeRoot={active}
      disabled={disabled}
      roles={roles}
    >
      {renderContent}
    </ListItem>
  );
}

// ----------------------------------------------------------------------

interface NavItemSubProps {
  active?: boolean;
  open?: boolean;
  onOpen?: () => void;
  item?: ItemProps;
}
export function NavItemSub({
  item,
  open = false,
  active = false,
  onOpen,
}: NavItemSubProps) {
  const { translate } = useLocales();

  const { title, path, info, children, disabled, caption, roles } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText
        disableTypography
        primary={translate(title)}
        secondary={
          <Tooltip title={translate(caption) || ""} arrow>
            <Typography
              noWrap
              variant="caption"
              component="div"
              sx={{ textTransform: "initial", color: "text.secondary" }}
            >
              {translate(caption)}
            </Typography>
          </Tooltip>
        }
      />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItem
        onClick={onOpen}
        activeSub={active}
        subItem
        disabled={disabled}
        roles={roles}
      >
        {renderContent}
      </ListItem>
    );
  }

  return isExternalLink(path) ? (
    <ListItem
      component={Link}
      href={path}
      target="_blank"
      rel="noopener"
      subItem
      disabled={disabled}
      roles={roles}
    >
      {renderContent}
    </ListItem>
  ) : (
    <ListItem
      component={RouterLink}
      to={path}
      activeSub={active}
      subItem
      disabled={disabled}
      roles={roles}
    >
      {renderContent}
    </ListItem>
  );
}

// ----------------------------------------------------------------------

interface DotIconProps {
  active?: boolean;
}
export function DotIcon({ active }: DotIconProps) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "text.disabled",
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: "scale(2)",
            bgcolor: "primary.main",
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

interface ArrowIconProps {
  open?: boolean;
}
export function ArrowIcon({ open }: ArrowIconProps) {
  return (
    <Iconify
      icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
