import {
  Button,
  Card,
  CardHeader,
  Container,
  Dialog,
  Divider,
  Grid,
  Link,
  MenuItem,
  Stack,
  styled,
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
import { useSnackbar } from "notistack";
import { ClubEvent } from "pages/Clubs/data.t";
import { FC, useState } from "react";
import { fDateTime } from "utils/formatTime";
import EventChart from "./EventChart";
import EventForm from "./EventForm";
import EventVoteList from "./EventVoteList";
import EventWaitingList from "./EventWaitingList";
const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

interface EventDetailsModalProps {
  eventId: string;
  open: boolean;
  onClose: () => void;
  onRefreshList: () => void;
}

interface EventDetailsContentProps {
  eventId: string;
  onClose: () => void;
  onRefreshList: () => void;
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

  const [onChangeStatus] = useChangeEventStatusMutation({
    fetchPolicy: "no-cache",
  });
  const { enqueueSnackbar } = useSnackbar();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  if (loading) return <SimpleSkeleton />;
  if (!data) return null;

  const eventData: ClubEvent = data.getEvent as any;
  const { title, status } = data.getEvent;

  const renderGeneral = () => {
    const { description, start, end, address, time, maxVote } = data.getEvent;
    return (
      <Card>
        <CardHeader title="Event info" />

        <Stack spacing={2} sx={{ p: "12px 24px 24px" }}>
          <Typography variant="body2">{description}</Typography>

          <Stack direction="row">
            <IconStyle icon={"fluent:clock-48-filled"} />

            <Typography variant="body2">
              Start at: &nbsp;
              <b>{fDateTime(start)}</b>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"fluent:clock-dismiss-20-filled"} />

            <Typography variant="body2">
              End at: &nbsp;
              <b>{fDateTime(end)}</b>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"ic:baseline-how-to-vote"} />
            <Typography variant="body2">
              Max vote: &nbsp;
              <b>{maxVote}</b>
            </Typography>
          </Stack>

          <Stack direction="row">
            <IconStyle icon={"clarity:alarm-clock-solid"} />
            <Typography variant="body2">
              Time: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {fDateTime(time)}
              </Link>
            </Typography>
          </Stack>
          <Stack direction="row">
            <IconStyle icon={"eva:pin-fill"} />
            <Typography variant="body2">
              Address: &nbsp;
              <Link component="span" variant="subtitle2" color="text.primary">
                {address}
              </Link>
            </Typography>
          </Stack>
        </Stack>
      </Card>
    );
  };
  if (isEditing)
    return (
      <>
        <CardHeader title="Edit Event" sx={{ p: "12px 24px 12px" }} />
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
                Hidden
              </Label>
            )}
          </Stack>
        }
        sx={{ p: "12px 24px 24px" }}
        action={
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
                  Edit
                </MenuItem>

                <MenuItem
                  onClick={async () => {
                    try {
                      if (status === 1) {
                        const res = await onChangeStatus({
                          variables: { id: eventData.id, status: 2 },
                        });
                        if (res.data.changeEventStatus.success) {
                          enqueueSnackbar("Event changed to hidden!");
                          refetch();
                        }
                      }

                      if (status === 2) {
                        const res = await onChangeStatus({
                          variables: { id: eventData.id, status: 1 },
                        });
                        if (res.data.changeEventStatus.success) {
                          enqueueSnackbar("Event changed to visible!");
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
                      Are you sure you want to delete the event?
                    </Typography>
                  }
                  actions={
                    <>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setOpenDelete(false)}
                      >
                        Cancel
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
                              enqueueSnackbar("Event delete successfully!");
                              onClose();
                              onRefreshList();
                            }
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                      >
                        Delete
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
                    Delete
                  </MenuItem>
                </PopConfirm>
              </>
            }
          />
        }
      />

      <Container sx={{ px: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {renderGeneral()}
          </Grid>
          <Grid item xs={12} md={6}>
            <EventChart event={data.getEvent as any} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EventVoteList event={data.getEvent as any} />
          </Grid>
          <Grid item xs={12} md={6}>
            <EventWaitingList event={data.getEvent as any} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
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
