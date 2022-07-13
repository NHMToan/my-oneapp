import { Container } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import useSettings from "hooks/useSettings";
import { ClubFormContent } from "../sections";

// ----------------------------------------------------------------------

export default function ClubForm() {
  const { themeStretch } = useSettings();

  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <HeaderBreadcrumbs heading={"Create a new Club"} />

      <ClubFormContent />
    </Container>
  );
}
