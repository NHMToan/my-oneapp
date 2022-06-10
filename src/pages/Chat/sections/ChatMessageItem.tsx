import { Avatar, Box, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { formatDistanceToNowStrict } from "date-fns";
import useAuth from "hooks/useAuth";
// components
import Image from "../../../components/Image";
import { ConversationData, MessageData } from "../data.t";

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

const InfoStyle = styled(Typography)(({ theme }: { theme?: any }) => ({
  display: "flex",
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

// ----------------------------------------------------------------------

interface ChatMessageItemProps {
  message: MessageData;
  conversation: ConversationData;
  onOpenLightbox: (value: any) => void;
}
export default function ChatMessageItem({
  message,
  conversation,
  onOpenLightbox,
}: ChatMessageItemProps) {
  const { user } = useAuth();
  const { sender } = message;
  const senderDetails =
    message.sender.id === user.profile.id
      ? { type: "me" }
      : { avatar: sender?.avatar, name: sender?.displayName };

  const isMe = senderDetails.type === "me";
  const isImage = message.contentType === "image";
  const firstName = senderDetails.name && senderDetails.name.split(" ")[0];

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
        {senderDetails.type !== "me" && (
          <Avatar
            alt={senderDetails.name}
            src={senderDetails.avatar}
            sx={{ width: 32, height: 32, mr: 2 }}
          />
        )}

        <div>
          <InfoStyle
            variant="caption"
            sx={{
              ...(isMe && { justifyContent: "flex-end" }),
            }}
          >
            {!isMe && `${firstName},`}&nbsp;
            {formatDistanceToNowStrict(new Date(message.createdAt), {
              addSuffix: true,
            })}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && { color: "grey.800", bgcolor: "primary.lighter" }),
              ...(isImage && { p: 0 }),
            }}
          >
            {isImage ? (
              <Image
                alt="attachment"
                src={message.content}
                onClick={() => onOpenLightbox(message.content)}
                sx={{
                  borderRadius: 1,
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
              />
            ) : (
              <Typography variant="body2">{message.content}</Typography>
            )}
          </ContentStyle>
        </div>
      </Box>
    </RootStyle>
  );
}
