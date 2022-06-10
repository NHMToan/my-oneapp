// @mui
import { Card, Container } from "@mui/material";
import { useEffect } from "react";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import { ChatSidebar, ChatWindow } from "./sections";

// ----------------------------------------------------------------------

export default function Chat() {
  const { themeStretch } = useSettings();

  useEffect(() => {}, []);

  return (
    <Page title="Chat">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Card sx={{ height: "72vh", display: "flex" }}>
          <ChatSidebar />
          <ChatWindow />
        </Card>
      </Container>
    </Page>
  );
}
