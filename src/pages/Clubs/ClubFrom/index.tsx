import { Container } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Page from "components/Page";
import useSettings from "hooks/useSettings";
import { useLocation } from "react-router-dom";
import { ClubFormContent } from "../sections";

// ----------------------------------------------------------------------

export default function ClubForm() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const isEdit = pathname.includes("edit");

  const renderContent = () => {
    if (!isEdit) {
      return <ClubFormContent />;
    }
    if (isEdit) return <ClubFormContent isEdit={isEdit} />;
  };
  return (
    <Page title="Club: New Club">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Create a new Club" : "Edit club"}
        />

        {renderContent()}
      </Container>
    </Page>
  );
}
