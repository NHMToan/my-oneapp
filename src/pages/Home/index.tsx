import { Container, Stack } from "@mui/material";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import MyNotes from "./sections/MyNotes";
import Welcome from "./sections/Welcome";
// ----------------------------------------------------------------------

export default function Rating() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Stack spacing={2}>
          <Welcome />
          <MyNotes />
        </Stack>
      </Container>
    </Page>
  );
}
