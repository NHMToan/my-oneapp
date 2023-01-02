import { Container } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import useSettings from "hooks/useSettings";
import RatingFormContent from "./sections/RatingFormContent";

// ----------------------------------------------------------------------

export default function ClubForm() {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <HeaderBreadcrumbs heading={"Create a new Rating"} />

      <RatingFormContent />
    </Container>
  );
}
