import {
  Button,
  Card,
  CardHeader,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import DropdownMenu from "components/DropdownMenu";
import Iconify from "components/Iconify";
import PopConfirm from "components/PopConfirm";
import {
  useChangeEventVoteMutation,
  useUnVoteEventMutation,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { ClubEvent, VoteData } from "pages/Clubs/data.t";
import { FC, useState } from "react";
import { fDate } from "utils/formatTime";
import ChangeVoteConfirm from "./ChangeVoteConfirm";

interface ConfirmedVoteProps {
  vote: VoteData;
  postActions: () => void;
  event: ClubEvent;
}
const ConfirmedVote: FC<ConfirmedVoteProps> = ({
  vote,
  postActions,
  event,
}) => {
  const [onDeleteVote] = useUnVoteEventMutation({ fetchPolicy: "no-cache" });
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const [onChangeVote] = useChangeEventVoteMutation({
    fetchPolicy: "no-cache",
  });
  const [openChange, setOpenChange] = useState<boolean>(false);

  return (
    <Card
      sx={{
        px: 2,
        py: 1,
        boxShadow: 0,
        color: (theme: any) => theme.palette["success"].darker,
        bgcolor: (theme: any) => theme.palette["success"].lighter,
        width: "100%",
        borderRadius: 1,
      }}
    >
      <CardHeader
        title={
          <Typography>
            Confirmed <b>{vote.value}</b> slot(s) at{" "}
            <b>{fDate(vote.createdAt, "eeee HH:mm")}</b>
          </Typography>
        }
        sx={{
          p: 0,
        }}
        action={
          <DropdownMenu
            actions={
              <>
                {vote.value > 1 && (
                  <MenuItem
                    onClick={() => {
                      setOpenChange(true);
                    }}
                  >
                    <Iconify icon={"eva:checkmark-circle-2-fill"} />
                    Change
                  </MenuItem>
                )}

                {vote.value > 1 && <Divider sx={{ borderStyle: "dashed" }} />}
                <PopConfirm
                  open={openDelete}
                  onClose={() => setOpenDelete(false)}
                  title={
                    <CardHeader
                      title="Are you sure to unvote this confirmed slot(s)?"
                      subheader="If the event is FULL, it may be full-filled by waiting list after this action!"
                    />
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
                            const deleteVoteRes = await onDeleteVote({
                              variables: {
                                voteId: vote.id,
                                eventId: event.id,
                                eventSlot: event.slot,
                              },
                            });
                            if (deleteVoteRes?.data?.unVoteEvent?.success) {
                              enqueueSnackbar("Unvote slot successfully!");
                              postActions();
                            }
                          } catch (e) {
                            console.error(e);
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

      <ChangeVoteConfirm
        isOpen={openChange}
        onClose={() => {
          setOpenChange(false);
        }}
        currentVoteCount={vote.value}
        onPostSave={async (value) => {
          try {
            const changeRes = await onChangeVote({
              variables: {
                eventId: event.id,
                voteId: vote.id,
                eventSlot: event.slot,
                newValue: value,
              },
            });

            if (changeRes?.data?.changeEventVote?.success) {
              enqueueSnackbar("Vote's slot is changed!");
              postActions();
            } else {
              enqueueSnackbar(
                changeRes?.data?.changeEventVote?.message ||
                  "Internal error server",
                { variant: "error" }
              );
            }
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </Card>
  );
};
export default ConfirmedVote;
