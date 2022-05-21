import { Container } from "@mui/material";
import { SeoIllustration } from "../../assets";
import Page from "../../components/Page";
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
import { AppWelcome } from "./sections";

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  const { themeStretch } = useSettings();

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
      </Container>
    </Page>
  );
}
