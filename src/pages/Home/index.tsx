import { Container } from "@mui/material";
import { Box } from "@mui/system";
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
        <Box sx={{ py: 2 }}>
          <Welcome />
        </Box>
        <MyNotes />
      </Container>
    </Page>
  );
}
