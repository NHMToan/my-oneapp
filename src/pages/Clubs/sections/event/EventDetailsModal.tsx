import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import DropdownMenu from "components/DropdownMenu";
import Iconify from "components/Iconify";
import Label from "components/Label";
import PopConfirm from "components/PopConfirm";
import { SimpleSkeleton } from "components/skeleton";
import {
  useChangeEventStatusMutation,
  useDeleteEventMutation,
  useEventQuery,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import useTabs from "hooks/useTabs";
import { useSnackbar } from "notistack";
import { ClubEvent } from "pages/Clubs/data.t";
import EventCard from "pages/Dashboard/sections/EventCard";
import { FC, useState } from "react";
import { fNumber } from "utils/formatNumber";
import { fDateTime } from "utils/formatTime";
import EventDetailsVotesTab from "./EventDetailsVotesTab";
import EventForm from "./EventForm";
const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

interface EventDetailsContentProps {
  eventId: string;
  onClose: () => void;
  onRefreshList?: () => void;
}
const Content: FC<EventDetailsContentProps> = ({
  eventId,
  onRefreshList,
  onClose,
}) => {
  const { data, loading, refetch } = useEventQuery({
    variables: { id: eventId },
    fetchPolicy: "no-cache",
    skip: !eventId,
  });
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [onDelete] = useDeleteEventMutation({ fetchPolicy: "no-cache" });

  const { currentTab, onChangeTab } = useTabs("general");
  const { translate } = useLocales();
  const [onChangeStatus] = useChangeEventStatusMutation({
    fetchPolicy: "no-cache",
  });
  const { enqueueSnackbar } = useSnackbar();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (loading) return <SimpleSkeleton />;
  if (!data) return null;

  const eventData: ClubEvent = data.getEvent as any;
  const { title, status, isAdmin } = data.getEvent;

  const renderGeneral = () => {
    const { description, start, end, address, time, maxVote, price } =
      data.getEvent;
    return (
      <Card>
        <CardHeader title={translate("club.event.details.event_info")} />

        <Stack spacing={2} sx={{ p: "12px 24px 24px" }}>
          <Typography variant="body2">{description}</Typography>

          <Stack direction="row">
            <IconStyle icon={"fluent:clock-48-filled"} />

            <Typography variant="body2">
              {translate("club.event.details.vote_start_at")}: &nbsp;
              <b>{fDateTime(start)}</b>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"fluent:clock-dismiss-20-filled"} />

            <Typography variant="body2">
              {translate("club.event.details.vote_end_at")}: &nbsp;
              <b>{fDateTime(end)}</b>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"ic:baseline-how-to-vote"} />
            <Typography variant="body2">
              {translate("club.event.details.max_vote")}: &nbsp;
              <b>{maxVote}</b>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"clarity:alarm-clock-solid"} />
            <Typography variant="body2">
              {translate("club.event.details.time")}: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {fDateTime(time)}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"eva:pin-fill"} />
            <Typography variant="body2">
              {translate("club.event.details.address")}: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {address}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"bxs:dollar-circle"} />
            <Typography variant="body2">
              {translate("club.event.details.price")}: &nbsp;
              <b>{fNumber(price || 0)} VND</b>
            </Typography>
          </Stack>
        </Stack>
      </Card>
    );
  };

  const TABS = [
    {
      title: translate("club.event.details.tab_general.title"),
      value: "general",
      icon: <Iconify icon={"fluent:info-24-filled"} width={20} height={20} />,
      component: (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderGeneral()}
          </Grid>
          <Grid item xs={12} md={6}>
            <EventCard event={eventData} hideInfo />
          </Grid>
        </Grid>
      ),
    },
    {
      title: translate("club.event.details.tab_vote_info.title"),
      value: "vote_info",
      icon: (
        <Iconify
          icon={"fluent:task-list-square-person-20-filled"}
          width={20}
          height={20}
        />
      ),
      component: <EventDetailsVotesTab event={eventData} />,
    },
  ];

  if (isEditing)
    return (
      <>
        <CardHeader
          title={translate("club.event.form.edit_title")}
          sx={{ p: "12px 24px 12px" }}
        />
        <EventForm
          event={data.getEvent as any}
          onCancel={() => {
            setIsEditing(false);
          }}
          onPostSave={() => {
            setIsEditing(false);
            refetch();
          }}
        />
      </>
    );
  const renderActions = () => {
    if (!onRefreshList) return null;
    if (!isAdmin) return null;

    return (
      <DropdownMenu
        actions={
          <>
            <MenuItem
              onClick={async () => {
                setIsEditing(true);
              }}
              key="edit"
            >
              <Iconify icon={"bxs:pencil"} />
              {translate("common.btn.edit")}
            </MenuItem>

            <MenuItem
              onClick={async () => {
                try {
                  if (status === 1) {
                    const res = await onChangeStatus({
                      variables: { id: eventData.id, status: 2 },
                    });
                    if (res.data.changeEventStatus.success) {
                      enqueueSnackbar(
                        translate("club.event.form.update_success")
                      );
                      refetch();
                    }
                  }

                  if (status === 2) {
                    const res = await onChangeStatus({
                      variables: { id: eventData.id, status: 1 },
                    });
                    if (res.data.changeEventStatus.success) {
                      enqueueSnackbar(
                        translate("club.event.form.update_success")
                      );
                      refetch();
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
              }}
              key="setShow"
            >
              <Iconify icon={"bxs:hide"} />
              {status === 1 ? "Hide event" : "Show Event"}
            </MenuItem>

            <Divider sx={{ borderStyle: "dashed" }} />
            <PopConfirm
              open={openDelete}
              onClose={() => {}}
              title={
                <Typography>
                  {translate("club.event.delete.confirmation")}
                </Typography>
              }
              actions={
                <>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => setOpenDelete(false)}
                  >
                    {translate("common.btn.cancel")}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={async () => {
                      try {
                        const res = await onDelete({
                          variables: { id: eventData.id },
                        });
                        if (res.data.deleteEvent.success) {
                          enqueueSnackbar(
                            translate("club.event.delete.success")
                          );
                          onClose();
                          onRefreshList();
                        }
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    {translate("common.btn.delete")}
                  </Button>
                </>
              }
            >
              <MenuItem
                sx={{ color: "error.main" }}
                key="delete"
                onClick={() => {
                  setOpenDelete(true);
                }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                {translate("common.btn.delete")}
              </MenuItem>
            </PopConfirm>
          </>
        }
      />
    );
  };
  return (
    <>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4">{title}</Typography>
            {status === 2 && (
              <Label
                color="error"
                sx={{
                  textTransform: "uppercase",
                }}
              >
                {translate("club.event.status.hidden")}
              </Label>
            )}
          </Stack>
        }
        sx={{ p: "12px 24px 6px" }}
        action={
          <Stack direction="row" spacing={1}>
            {renderActions()}
            <IconButton
              onClick={() => {
                onClose();
              }}
            >
              <Iconify icon={"akar-icons:cross"} width={20} height={20} />
            </IconButton>
          </Stack>
        }
      />

      <Container sx={{ px: 2 }}>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.title}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Box sx={{ mb: 2 }} />

        {TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </>
  );
};
interface EventDetailsModalProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
  onRefreshList?: () => void;
}

const EventDetailsModal: FC<EventDetailsModalProps> = ({
  eventId,
  open,
  onClose,
  onRefreshList,
}) => {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <Stack sx={{ p: 2 }}>
        <Content
          eventId={eventId}
          onRefreshList={onRefreshList}
          onClose={onClose}
        />
      </Stack>
    </Dialog>
  );
};

export default EventDetailsModal;
