import { useEffect, useRef } from "react";
//
import Scrollbar from "../../../components/Scrollbar";
import ChatMessageItem from "./ChatMessageItem";

// ----------------------------------------------------------------------

interface ChatMessageListProps {
  messages: any[];
}
export default function ChatMessageList({ messages }: ChatMessageListProps) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [messages]);

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{ ref: scrollRef }}
        sx={{ p: 3, height: 1 }}
      >
        {messages?.map((message: any) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
      </Scrollbar>
    </>
  );
}
