import { List, ListProps } from "@mui/material";
import { SkeletonConversationItem } from "components/skeleton";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { ConversationData } from "../data.t";
//
import ChatConversationItem from "./ChatConversationItem";

// ----------------------------------------------------------------------

interface ChatConversationListProps extends ListProps {
  conversations?: ConversationData[];
  isOpenSidebar?: boolean;
  activeConversationId?: string;
  loading?: boolean;
  isPreview?: boolean;
}
export default function ChatConversationList({
  conversations = [],
  isOpenSidebar,
  activeConversationId,
  sx,
  loading,
  isPreview,
  ...other
}: ChatConversationListProps) {
  const navigate = useNavigate();
  const { conversationKey } = useParams();
  const handleSelectConversation = (conversationId) => {
    navigate(PATH_DASHBOARD.chat.view(conversationId));
  };

  return (
    <List disablePadding sx={sx} {...other}>
      {(loading ? [...Array(12)] : conversations).map(
        (conversation: ConversationData, index) =>
          conversation ? (
            <ChatConversationItem
              key={conversation.id}
              isOpenSidebar={isOpenSidebar}
              defaultConversation={conversation}
              isSelected={conversationKey === conversation.id}
              onSelectConversation={() => {
                handleSelectConversation(conversation.id);
              }}
            />
          ) : (
            <SkeletonConversationItem key={index} />
          )
      )}
    </List>
  );
}
