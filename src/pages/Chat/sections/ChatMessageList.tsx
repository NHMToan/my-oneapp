import { SkeletionComment } from "components/skeleton";
import {
  useGetMessagesQuery,
  useMessageSendSubscriptionSubscription,
} from "generated/graphql";
import { useEffect, useRef, useState } from "react";
import LightboxModal from "../../../components/LightboxModal";
//
import Scrollbar from "../../../components/Scrollbar";
import { ConversationData, MessageData } from "../data.t";
import ChatMessageItem from "./ChatMessageItem";

// ----------------------------------------------------------------------

interface ChatMessageListProps {
  conversation: ConversationData;
}
export default function ChatMessageList({
  conversation,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState<MessageData[]>([]);

  const { data: subscriptionData } = useMessageSendSubscriptionSubscription({
    variables: {
      conversationId: conversation?.id,
    },
    skip: !conversation,
  });

  const scrollRef = useRef(null);
  const { data, loading, error } = useGetMessagesQuery({
    variables: {
      conversationId: conversation?.id,
    },
    skip: !conversation,
    fetchPolicy: "no-cache",
  });

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [messages]);

  useEffect(() => {
    if (data?.getMessages?.results?.length > 0) {
      setMessages(data.getMessages.results as any);
    } else {
      setMessages([]);
    }
  }, [data]);

  useEffect(() => {
    if (subscriptionData?.newMessageSent) {
      setMessages([...messages, subscriptionData.newMessageSent as any]);
    }
  }, [subscriptionData]);

  if (loading)
    return (
      <Scrollbar
        scrollableNodeProps={{ ref: scrollRef }}
        sx={{ p: 3, height: 1 }}
      >
        <SkeletionComment />
        <SkeletionComment />
        <SkeletionComment />
        <SkeletionComment />
        <SkeletionComment />
      </Scrollbar>
    );
  if (error) return <p>{error.message}</p>;

  const imagesLightbox = messages
    ?.filter((messages) => messages.contentType === "image")
    .map((messages) => messages.content);

  const handleOpenLightbox = (url) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Scrollbar
        scrollableNodeProps={{ ref: scrollRef }}
        sx={{ p: 3, height: 1 }}
      >
        {messages?.map((message: any) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            conversation={conversation}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </Scrollbar>

      {imagesLightbox && (
        <LightboxModal
          images={imagesLightbox}
          mainSrc={imagesLightbox[selectedImage]}
          photoIndex={selectedImage}
          setPhotoIndex={setSelectedImage}
          isOpen={openLightbox}
          onCloseRequest={() => setOpenLightbox(false)}
        />
      )}
    </>
  );
}
