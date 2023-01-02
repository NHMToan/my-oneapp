import { Button, Container } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import Page from "../../components/Page";
import useSettings from "../../hooks/useSettings";
import RatingList from "./sections/RatingList";
// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { user } = useAuth();
  return (
    <Page title="Rating">
      <Container maxWidth={themeStretch ? false : "xl"}>
        {user.role === "admin" && (
          <HeaderBreadcrumbs
            heading={translate("rating.list.title")}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.rating.new}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                {translate("club.list.btn_new")}
              </Button>
            }
          />
        )}
        <RatingList />
      </Container>
    </Page>
  );
}
