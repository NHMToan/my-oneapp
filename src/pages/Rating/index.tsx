import { Container } from "@mui/material";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import RatingList from "./sections/RatingList";
// ----------------------------------------------------------------------

export default function Rating() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Rating">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <RatingList />
      </Container>
    </Page>
  );
}
