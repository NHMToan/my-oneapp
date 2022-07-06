import { Box, Divider, Stack } from "@mui/material";
import { SimpleSkeleton } from "components/skeleton";
import {
  useAddConversationMutation,
  useConversationQuery,
  useCreateMessageMutation,
} from "generated/graphql";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { IProfile } from "types/user";
import ChatHeaderCompose from "./ChatHeaderCompose";
import ChatHeaderDetail from "./ChatHeaderDetail";
import ChatMessageInput from "./ChatMessageInput";
import ChatMessageList from "./ChatMessageList";
import ChatRoom from "./ChatRoom";

// ----------------------------------------------------------------------

export default function ChatWindow() {
  const { conversationKey } = useParams();
  const [onAddConver] = useAddConversationMutation();
  const [onAddMessage] = useCreateMessageMutation();
  const navigate = useNavigate();

  const { data, loading, refetch } = useConversationQuery({
    variables: {
      id: conversationKey,
    },
    skip: !conversationKey,
  });
  const [members, setMembers] = useState<IProfile[]>([]);
  const mode = conversationKey ? "DETAIL" : "COMPOSE";

  const handleSendMessage = async (value) => {
    if (mode === "COMPOSE") {
      try {
        const params = {
          content: value.message,
          members: members?.map((item) => item.id),
        };
        const res = await onAddConver({ variables: { input: params } });
        if (res?.data?.addNewConversation?.conversation?.id) {
          navigate(
            PATH_DASHBOARD.chat.view(
              res?.data?.addNewConversation?.conversation?.id
            )
          );
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (mode === "DETAIL") {
      try {
        const res = await onAddMessage({
          variables: {
            messageInput: {
              conversationId: conversationKey,
              content: value.message,
              image: (value.images?.length > 0 && value.images[0]) || null,
            },
          },
        });
        if (res?.data?.addNewMessage) {
          refetch();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Stack sx={{ flexGrow: 1, minWidth: "1px" }}>
      {mode === "DETAIL" ? (
        <ChatHeaderDetail participants={[]} />
      ) : (
        <ChatHeaderCompose
          onAddRecipients={(profiles) => {
            setMembers(profiles);
          }}
        />
      )}

      <Divider />

      <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
        <Stack sx={{ flexGrow: 1 }}>
          {loading ? (
            <SimpleSkeleton />
          ) : (
            <ChatMessageList conversation={data?.getConversation as any} />
          )}

          <Divider />

          <ChatMessageInput
            onSend={handleSendMessage}
            disabled={
              (mode === "COMPOSE" && (!members || members.length === 0)) ||
              loading
            }
          />
        </Stack>

        {mode === "DETAIL" && (
          <ChatRoom conversation={data?.getConversation as any} />
        )}
      </Box>
    </Stack>
  );
}
