import { Divider, IconButton, Input, Stack } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { useState } from "react";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  minHeight: 56,
  display: "flex",
  position: "relative",
  alignItems: "center",
  paddingLeft: theme.spacing(2),
}));

// ----------------------------------------------------------------------

interface ChatMessageInputProps {
  onSend: (value?: any) => void;
  disabled?: boolean;
}
export default function ChatMessageInput({
  disabled,
  onSend,
}: ChatMessageInputProps) {
  const [message, setMessage] = useState("");

  // const handleAttach = () => {
  //   fileInputRef.current?.click();
  // };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return "";
    }
    if (onSend) {
      onSend(message);
    }
    setMessage("");

    return;
  };
  // const handleRemove = (file) => {
  //   const filteredItems = images?.filter((_file) => _file !== file);
  //   setImages(filteredItems);
  // };

  return (
    <RootStyle>
      <Input
        disabled={disabled}
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Type a message"
        endAdornment={
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ flexShrink: 0, mr: 1.5 }}
          >
            {/* <MultiFilePreview
              files={images}
              showPreview={true}
              onRemove={handleRemove}
            />
            <div>
              <IconButton
                disabled={disabled}
                size="small"
                onClick={handleAttach}
              >
                <Iconify
                  icon="ic:round-add-photo-alternate"
                  width={22}
                  height={22}
                />
              </IconButton>
            </div> */}
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>
    </RootStyle>
  );
}
