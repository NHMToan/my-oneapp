import { Container } from "@mui/material";
import { SeoIllustration } from "assets";
import useAuth from "hooks/useAuth";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import { AppWelcome } from "./sections";
import EventList from "./sections/EventList";

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <AppWelcome
          title={`Welcome back! \n ${user?.displayName}`}
          description=""
          img={
            <SeoIllustration
              sx={{
                p: 3,
                width: 360,
                margin: { xs: "auto", md: "inherit" },
              }}
            />
          }
        />
        <EventList />
      </Container>
    </Page>
  );
}
