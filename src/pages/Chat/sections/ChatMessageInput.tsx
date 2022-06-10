import {
  Divider,
  IconButton,
  Input,
  InputAdornment,
  Stack,
} from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { MultiFilePreview } from "components/upload";
import { useRef, useState } from "react";
import EmojiPicker from "../../../components/EmojiPicker";
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
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<any[]>([]);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message && (!images || images.length === 0)) {
      return "";
    }
    if (onSend) {
      onSend({
        message,
        images,
      });
    }
    setMessage("");
    setImages([]);
    return;
  };
  const handleRemove = (file) => {
    const filteredItems = images?.filter((_file) => _file !== file);
    setImages(filteredItems);
  };

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
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker
              disabled={disabled}
              value={message}
              setValue={setMessage}
            />
          </InputAdornment>
        }
        endAdornment={
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ flexShrink: 0, mr: 1.5 }}
          >
            <MultiFilePreview
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
            </div>
          </Stack>
        }
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message && (!images || images.length === 0)}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Iconify icon="ic:round-send" width={22} height={22} />
      </IconButton>

      <input
        accept="image/*"
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => {
          const files = [];

          for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files.item(i);

            Object.assign(file, {
              preview: URL.createObjectURL(file),
            });
            files.push(file);
          }
          console.log(files);
          setImages(files);
        }}
      />
    </RootStyle>
  );
}
