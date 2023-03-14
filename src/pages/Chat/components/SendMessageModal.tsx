import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PopConfirm from "components/PopConfirm";
import { useAddConversationMutation } from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { FC, useState } from "react";
import { IProfile } from "types/user";

interface SendMessageButtonProps {
  to: IProfile;
}
const SendMessageButton: FC<SendMessageButtonProps> = ({ to }) => {
  const [openNote, setOpenNote] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const [onAddConver] = useAddConversationMutation();
  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };
  const { translate } = useLocales();

  const onNote = async () => {
    try {
      const params = {
        content: message,
        members: [to.id],
      };
      const res = await onAddConver({ variables: { input: params } });
      if (res?.data?.addNewConversation?.conversation?.id) {
        enqueueSnackbar("Message is sent!");
        setOpenNote(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PopConfirm
      open={openNote}
      onClose={() => {
        setMessage("");
        setOpenNote(false);
      }}
      title={
        <Stack direction="column" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={to.displayName} src={to.avatar} />

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">{to.displayName}</Typography>
            </Box>
          </Stack>
          <TextField
            fullWidth
            multiline
            minRows={2}
            maxRows={8}
            value={message}
            placeholder="Message"
            onChange={handleChangeMessage}
          />
        </Stack>
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
            {translate("common.btn.send")}
          </Button>
        </>
      }
    >
      <MenuItem
        onClick={() => {
          setOpenNote(true);
          setMessage("");
        }}
      >
        {translate("common.btn.send_message")}
      </MenuItem>
    </PopConfirm>
  );
};

export default SendMessageButton;
