import { Box, Card, Container, Divider, Stack } from "@mui/material";
import Page from "components/Page";
import useSettings from "hooks/useSettings";

import { FC, useState } from "react";
import ChatMessageInput from "./sections/ChatMessageInput";
import ChatMessageList from "./sections/ChatMessageList";
interface ChatBotProps {}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}
const ChatBot: FC<ChatBotProps> = (props) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { themeStretch } = useSettings();

  async function generateText(prompt) {
    setLoading(true);
    setMessages([
      ...messages,
      { sender: "me", content: prompt, id: generateUniqueId() },
      { sender: "bot", content: "", loading: true, id: generateUniqueId() },
    ]);

    let messagePromt: string[] = messages.map((item) => item.content);
    messagePromt.push(prompt);
    const response = await fetch(`${process.env.REACT_APP_API_URL}chatbot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: messagePromt.join("\n\n\n "),
      }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.message.trim(); // trims any trailing spaces/'\n'
      setLoading(false);
      setMessages([
        ...messages,
        { sender: "me", content: prompt, id: generateUniqueId() },
        { sender: "bot", content: parsedData, id: generateUniqueId() },
      ]);
    } else {
      const err = await response.text();

      setLoading(false);
      setMessages([
        ...messages,
        { sender: "me", content: prompt, id: generateUniqueId() },
        {
          sender: "bot",
          content: "Something is wrong!",
          id: generateUniqueId(),
        },
      ]);
      alert(err);
    }
  }
  return (
    <Page title="Chatbot">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Card sx={{ height: "72vh", display: "flex" }}>
          <Stack sx={{ flexGrow: 1, minWidth: "1px" }}>
            <Box sx={{ flexGrow: 1, display: "flex", overflow: "hidden" }}>
              <Stack sx={{ flexGrow: 1 }}>
                <ChatMessageList messages={messages} />

                <Divider />

                <ChatMessageInput onSend={generateText} disabled={loading} />
              </Stack>
            </Box>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default ChatBot;
