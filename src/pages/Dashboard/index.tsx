import { Container } from "@mui/material";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import EventList from "./sections/EventList";

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <EventList />
      </Container>
    </Page>
  );
}
