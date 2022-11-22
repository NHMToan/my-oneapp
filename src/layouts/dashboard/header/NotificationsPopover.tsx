import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import EmptyContent from "components/EmptyContent";
import {
  useGetNotificationsQuery,
  useGetNotiUnreadCountQuery,
  useNewNotificationSubscription,
  useReadAllNotificationMutation,
} from "generated/graphql";
import useAuth from "hooks/useAuth";
import { NotificationItem } from "pages/Notification";
import { useEffect, useState } from "react";
import { Trans } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { IconButtonAnimate } from "../../../components/animate";
import Iconify from "../../../components/Iconify";
import MenuPopover from "../../../components/MenuPopover";
import Scrollbar from "../../../components/Scrollbar";
// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const { user } = useAuth();

  const [readALl] = useReadAllNotificationMutation({ fetchPolicy: "no-cache" });

  const {
    data: notifications,
    loading,
    refetch: refetchNoti,
  } = useGetNotificationsQuery({
    variables: { limit: 5, offset: 0 },
    fetchPolicy: "no-cache",
  });
  const { data: unreadCount, refetch: refetchCount } =
    useGetNotiUnreadCountQuery({
      fetchPolicy: "no-cache",
    });
  const { data: newNoti } = useNewNotificationSubscription({
    variables: {
      profileId: user.profile.id,
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (newNoti?.newNotification) {
      refetchNoti();
      refetchCount();
    }
  }, [newNoti]);

  const totalUnRead = unreadCount?.getUnreadCount || 0;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    readALl().then(() => {
      refetchNoti();
      refetchCount();
    });
  };

  const renderList = () => {
    if (loading)
      return (
        <>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      );
    if (notifications?.getNotifications?.results.length > 0)
      return (
        <>
          <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">
                <Trans i18nKey="notification.title" />
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                <Trans
                  i18nKey="notification.unread_subtitle"
                  count={totalUnRead}
                  values={{ count: totalUnRead }}
                />
              </Typography>
            </Box>

            {totalUnRead > 0 && (
              <Tooltip
                title={<Trans i18nKey="notification.btn.mark_all_read" />}
              >
                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                  <Iconify icon="eva:done-all-fill" width={20} height={20} />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
            <List disablePadding>
              {notifications?.getNotifications?.results?.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </List>
          </Scrollbar>

          <Divider sx={{ borderStyle: "dashed" }} />

          <Box sx={{ p: 1 }}>
            <Button
              fullWidth
              disableRipple
              component={RouterLink}
              to={PATH_DASHBOARD.notification}
            >
              <Trans i18nKey="notification.btn.view_all" />
            </Button>
          </Box>
        </>
      );

    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              <Trans i18nKey="notification.title" />
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <EmptyContent />
      </>
    );
  };
  return (
    <>
      <IconButtonAnimate
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        {renderList()}
      </MenuPopover>
    </>
  );
}
