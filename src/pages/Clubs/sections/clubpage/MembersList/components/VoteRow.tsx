import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DropdownMenu, { DropdownMenuRef } from "components/DropdownMenu";
import Iconify from "components/Iconify";
import PopConfirm from "components/PopConfirm";
import {
  useNoteVoteMutation,
  useVoteChangePaidMutation,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { PAID_STATUS } from "pages/Clubs/consts";
import { VoteData } from "pages/Clubs/data.t";
import { FC, useRef, useState } from "react";
import { fDateTime } from "utils/formatTime";

interface VoteRowProps {
  vote: VoteData;
  isAdmin: any;
  postActions: () => void;
}
const VoteRow: FC<VoteRowProps> = ({ vote, isAdmin, postActions }) => {
  const dropdownRef = useRef<DropdownMenuRef>();
  const { translate } = useLocales();

  const [onChangePaid] = useVoteChangePaidMutation({ fetchPolicy: "no-cache" });
  const [onNoteVote] = useNoteVoteMutation({ fetchPolicy: "no-cache" });

  const { enqueueSnackbar } = useSnackbar();

  const [openNote, setOpenNote] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };
  const onNote = async () => {
    try {
      const res = await onNoteVote({
        variables: { voteId: vote.id, note: message },
      });

      if (res?.data?.noteVote?.success) {
        postActions();
        setOpenNote(false);
        setMessage("");
      } else {
        enqueueSnackbar("Error", { variant: "error" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onPaidChange = async (status) => {
    try {
      const res = await onChangePaid({
        variables: { voteId: vote.id, payStatus: status },
      });

      if (res?.data?.voteChangePaid?.success) {
        dropdownRef?.current?.close();
        postActions();
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <Iconify
              icon={"ant-design:calendar-filled"}
              sx={{ width: 16, height: 16, mr: 0.5 }}
            />
            {fDateTime(vote.createdAt)}
          </Typography>
          {vote.paid && PAID_STATUS[vote.paid]}
        </Stack>
      </Box>
      {isAdmin && (
        <DropdownMenu
          ref={dropdownRef}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onPaidChange("cash");
                }}
              >
                <Iconify icon={"bxs:dollar-circle"} color="#54D62C" />
                {translate(
                  "club.event.details.tab_vote_info.confirm_list.cash"
                )}
              </MenuItem>

              <MenuItem
                onClick={() => {
                  onPaidChange("momo");
                }}
              >
                <Iconify icon={"bxs:dollar-circle"} color="#ad006c" />
                {translate(
                  "club.event.details.tab_vote_info.confirm_list.momo"
                )}
              </MenuItem>

              <MenuItem
                onClick={async () => {
                  onPaidChange("bank");
                }}
              >
                <Iconify icon={"bxs:dollar-circle"} color="#826AF9" />
                {translate(
                  "club.event.details.tab_vote_info.confirm_list.bank"
                )}
              </MenuItem>

              <MenuItem
                onClick={async () => {
                  onPaidChange("prepaid");
                }}
              >
                <Iconify icon={"bxs:dollar-circle"} color="#1890FF" />
                {translate(
                  "club.event.details.tab_vote_info.confirm_list.prepaid"
                )}
              </MenuItem>

              <MenuItem
                onClick={async () => {
                  onPaidChange("");
                }}
              >
                <Iconify icon={"mdi:dollar-off"} color="#f50" />
                Remove tag
              </MenuItem>

              {isAdmin && <Divider sx={{ borderStyle: "dashed" }} />}
              {isAdmin && (
                <PopConfirm
                  open={openNote}
                  onClose={() => {
                    setMessage("");
                    setOpenNote(false);
                  }}
                  title={
                    <TextField
                      fullWidth
                      multiline
                      minRows={2}
                      maxRows={8}
                      value={message}
                      placeholder="Type a note"
                      onChange={handleChangeMessage}
                    />
                  }
                  actions={
                    <>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => {
                          setMessage("");
                          setOpenNote(false);
                        }}
                      >
                        {translate("common.btn.cancel")}
                      </Button>
                      <Button
                        variant="contained"
                        disabled={!message}
                        onClick={() => {
                          try {
                            onNote();
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                      >
                        {translate("common.btn.save")}
                      </Button>
                    </>
                  }
                >
                  <MenuItem
                    onClick={() => {
                      setOpenNote(true);
                      setMessage(vote.note || "");
                    }}
                  >
                    {translate("common.btn.note")}
                  </MenuItem>
                </PopConfirm>
              )}
            </>
          }
        />
      )}
    </Stack>
  );
};

export default VoteRow;
