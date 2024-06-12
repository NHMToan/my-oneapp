import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import { SimpleSkeleton } from "components/skeleton";
import { useGetEventHistoryQuery } from "generated/graphql";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC } from "react";
import { Trans } from "react-i18next";
import { fDateTime } from "utils/formatTime";

interface EventHistoryProps {
  event: ClubEvent;
  sx?: SxProps;
}

function applySortFilter({ tableData }) {
  return tableData;
}

const EventHistory: FC<EventHistoryProps> = ({ event, sx }) => {
  const { data, loading, refetch } = useGetEventHistoryQuery({
    fetchPolicy: "no-cache",
    skip: !event,
    variables: { limit: 200, offset: 0, eventId: event.id },
  });
  const dataFiltered = applySortFilter({
    tableData: data?.getEventHistory?.results || [],
  });

  const renderList = () => {
    if (loading)
      return (
        <Stack spacing={3} sx={{ p: 3 }}>
          <SimpleSkeleton />
        </Stack>
      );

    if (dataFiltered.length === 0)
      return (
        <Typography sx={{ p: 3, color: "text.secondary" }}>
          No activities found
        </Typography>
      );

    return (
      <Timeline>
        {dataFiltered.map((item, index) => (
          <OrderItem
            key={item.id}
            item={item}
            isLast={index === dataFiltered.length - 1}
          />
        ))}{" "}
      </Timeline>
    );
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        title="Event history activities"
        action={
          <IconButton onClick={() => refetch()}>
            <Iconify icon={"ci:refresh-02"} width={20} height={20} />
          </IconButton>
        }
      />
      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
          ...sx,
        }}
      >
        {renderList()}
      </CardContent>
    </Card>
  );
};

function OrderItem({ item, isLast }) {
  const { createdAt } = item;
  const { icon, title } = renderContent(item);

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color="primary" variant="outlined">
          <Iconify icon={icon} />
        </TimelineDot>
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDateTime(createdAt)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

// ----------------------------------------------------------------------

function renderContent(activity) {
  const { type, object, objectString, member } = activity;

  const actor_name = member.profile.displayName;
  let action_object = null;

  if (type === "remove_tag") {
    if (objectString) {
      const newObject = JSON.parse(objectString);

      action_object = `[${newObject.value}] ${newObject.user} (${fDateTime(
        newObject.createdAt
      )})`;
    } else if (object) {
      action_object = `[${object.value}] ${
        object.member.profile.displayName
      } (${fDateTime(object.createdAt)})`;
    }
    return {
      icon: "mdi:tag-remove",
      title: (
        <Typography component="span" variant="body2">
          <Trans
            i18nKey={`event_history.key.${type}`}
            values={{ actor_name, action_object }}
          >
            <strong>{actor_name}</strong> remove tag for the vote of
            <strong>{action_object}</strong>
          </Trans>
        </Typography>
      ),
    };
  }
  if (type === "add_note") {
    if (objectString) {
      const newObject = JSON.parse(objectString);

      action_object = `[${newObject.value}] ${newObject.user} (${fDateTime(
        newObject.createdAt
      )})`;
    } else if (object) {
      action_object = `[${object.value}] ${
        object.member.profile.displayName
      } (${fDateTime(object.createdAt)})`;
    }
    return {
      icon: "clarity:note-solid",
      title: (
        <Typography component="span" variant="body2">
          <Trans
            i18nKey={`event_history.key.${type}`}
            values={{ actor_name, action_object }}
          >
            <strong>{actor_name}</strong> added note to
            <strong>{action_object}</strong>
          </Trans>
        </Typography>
      ),
    };
  }
  if (type === "delete_vote") {
    let count = 0;
    if (objectString) {
      const newObject = JSON.parse(objectString);

      count = newObject.value;
    }
    return {
      icon: "material-symbols:delete",
      title: (
        <Typography component="span" variant="body2">
          <Trans
            i18nKey={`event_history.key.${type}`}
            values={{ actor_name, count }}
          >
            <strong>{actor_name}</strong> deteled
            <strong>{count}</strong> slot(s)
          </Trans>
        </Typography>
      ),
    };
  }

  if (objectString) {
    const newObject = JSON.parse(objectString);

    action_object = `[${newObject.value}] ${newObject.user} (${fDateTime(
      newObject.createdAt
    )})`;
  } else if (object) {
    action_object = `[${object.value}] ${
      object.member.profile.displayName
    } (${fDateTime(object.createdAt)})`;
  }

  const title = (
    <>
      <Typography component="span" variant="body2">
        <Trans
          i18nKey={`event_history.key.${type}`}
          values={{ actor_name, action_object }}
        >
          <strong>{actor_name}</strong> requested to join club
          <strong>{action_object}</strong>
        </Trans>
      </Typography>
    </>
  );

  return {
    icon: "solar:dollar-bold",
    title: title,
  };
}

export default EventHistory;
