import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import {
  useGetNotificationsQuery,
  useGetNotiUnreadCountQuery,
  useReadAllNotificationMutation,
} from "generated/graphql";
import { useState } from "react";
import { Trans } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { fToNow } from "utils/formatTime";
const NotificationList = (props) => {
  const {
    data: notifications,
    loading,
    fetchMore,
    refetch: refetchNoti,
  } = useGetNotificationsQuery({
    variables: { limit: 30, offset: 0 },
  });
  const [readALl] = useReadAllNotificationMutation({ fetchPolicy: "no-cache" });
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const { data: unreadCount, refetch: refetchCount } =
    useGetNotiUnreadCountQuery({
      fetchPolicy: "no-cache",
    });

  const handleMarkAllAsRead = () => {
    readALl().then(() => {
      refetchNoti();
      refetchCount();
    });
  };

  const totalUnRead = unreadCount?.getUnreadCount || 0;

  const handleInfiniteOnLoad = (page) => {
    setLoadingMore(true);
    fetchMore({
      updateQuery: (pv, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return pv;
        }
        return {
          getNotifications: {
            __typename: "Notifications",
            results: [
              ...pv?.getNotifications?.results,
              ...fetchMoreResult?.getNotifications?.results,
            ],
            totalCount: pv.getNotifications.totalCount,
          },
        };
      },
      variables: {
        limit: 30,
        offset: page * 30,
      },
    })
      .then(() => {
        setLoadingMore(false);
      })
      .catch(() => {
        setLoadingMore(false);
      });
  };
  const hasMore =
    notifications?.getNotifications?.results?.length <
    notifications?.getNotifications?.totalCount;

  const renderList = () => {
    if (loading)
      return (
        <Box sx={{ p: 3 }}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </Box>
      );
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
            <Tooltip title={<Trans i18nKey="notification.btn.mark_all_read" />}>
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />
        <div
          style={{
            height: "calc(100vh - 320px)",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleInfiniteOnLoad}
            hasMore={hasMore}
            useWindow={false}
          >
            <List disablePadding>
              {notifications?.getNotifications?.results?.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </List>
            {loadingMore && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </InfiniteScroll>
        </div>
      </>
    );
  };

  return (
    <Container maxWidth="md" sx={{ pt: 1 }}>
      <Stack direction="column" justifyContent="center" spacing={4}>
        <Card>{renderList()}</Card>
      </Stack>
    </Container>
  );
};

// ----------------------------------------------------------------------

interface INotificationItem {
  notification?: any;
}
export function NotificationItem({ notification }: INotificationItem) {
  const { avatar, title } = renderContent(notification.notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(!notification.is_read && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-outline"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const { actor_name, action_object, messageKey, amount } = notification;
  const title = (
    <>
      <Typography component="span" variant="body2">
        <Trans
          i18nKey={`notification.key.${messageKey}`}
          count={notification.amount}
          values={{ actor_name, action_object }}
        >
          <strong>{actor_name}</strong> requested to join club
          <strong>{action_object}</strong>
        </Trans>
      </Typography>
    </>
  );

  if (messageKey === "accept_join_club") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/notification/ic_mail.svg"
        />
      ),
      title: (
        <Typography component="span" variant="body2">
          <Trans
            i18nKey={`notification.key.${messageKey}`}
            count={notification.amount}
            values={{ actor_name, action_object }}
          >
            You have been accepted to join club
            <strong>{action_object}</strong>
          </Trans>
        </Typography>
      ),
    };
  }
  if (messageKey === "remove_confirm_vote") {
    return {
      avatar: notification.actor_avatar ? (
        <img alt={notification.actor_name} src={notification.actor_avatar} />
      ) : null,
      title: (
        <Typography component="span" variant="body2">
          <Trans
            i18nKey={`notification.key.${messageKey}`}
            values={{ actor_name, action_object }}
            count={amount}
          >
            <strong>{actor_name}</strong> has removed <strong>{amount}</strong>
            from event <strong>{action_object}</strong>
          </Trans>
        </Typography>
      ),
    };
  }
  if (messageKey === "confirm_waiting_slot") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/assets/icons/notification/ic_mail.svg"
        />
      ),
      title: (
        <Typography component="span" variant="body2">
          <Trans
            i18nKey={`notification.key.${messageKey}`}
            values={{ actor_name, action_object }}
            count={amount}
          >
            You has been confirmed <strong>{amount}</strong>
            from activity <strong>{action_object}</strong>
          </Trans>
        </Typography>
      ),
    };
  }
  return {
    avatar: notification.actor_avatar ? (
      <img alt={notification.actor_name} src={notification.actor_avatar} />
    ) : null,
    title,
  };
}

export default NotificationList;
