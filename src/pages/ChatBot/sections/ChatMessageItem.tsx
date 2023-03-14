import { Avatar, Box, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
// components

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }: { theme?: any }) => ({
  display: "flex",
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled("div")(({ theme }: { theme?: any }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

interface ChatMessageItemProps {
  message: any;
}
export default function ChatMessageItem({ message }: ChatMessageItemProps) {
  const { sender, content } = message;
  const [text, setText] = useState("");

  useEffect(() => {
    if (sender === "bot") {
      let index = 0;
      const message = content;
      const typing = () => {
        setText(message.slice(0, index + 1));
        index++;
        if (index > message.length) {
          clearInterval(timer);
        }
      };
      const timer = setInterval(typing, 20);
      return () => clearInterval(timer);
    } else {
      setText(content);
    }
  }, []);
  const isMe = sender === "me";
  const renderContent = () => {
    if (message.loading) return <Typography variant="body2">...</Typography>;
    return <Typography variant="body2">{text}</Typography>;
  };
  return (
    <RootStyle>
      <Box
        sx={{
          display: "flex",
          ...(isMe && {
            ml: "auto",
          }),
        }}
      >
        {sender === "bot" && (
          <Avatar
            src={`/assets/icons/apps/logo192.png`}
            sx={{ width: 32, height: 32, mr: 2, mt: 1 }}
          />
        )}

        <div>
          <ContentStyle
            sx={{
              ...(isMe && { color: "grey.800", bgcolor: "primary.lighter" }),
            }}
          >
            {renderContent()}
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  );
}
