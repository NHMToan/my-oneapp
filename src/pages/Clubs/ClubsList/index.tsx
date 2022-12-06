import { Button, Container, Grid } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import Page from "components/Page";
import { SkeletonPostItem } from "components/skeleton";
import { useClubsQuery } from "generated/graphql";
import useLocales from "hooks/useLocales";
import useSettings from "hooks/useSettings";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import ClubCard from "../sections/ClubCard";
// ----------------------------------------------------------------------

export default function CLubsList() {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const { data: dataclubs, loading } = useClubsQuery({
    variables: { limit: 50, offset: 0 },
  });

  const clubs = dataclubs?.clubs?.results || [];
  return (
    <Page title="Club: List">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={translate("club.list.title")}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.club.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              {translate("club.list.btn_new_club")}
            </Button>
          }
        />
        <Grid container spacing={3}>
          {(loading ? [...Array(12)] : clubs).map((club, index) =>
            club ? (
              <Grid key={club.id} item xs={12} sm={6} md={6}>
                <ClubCard club={club} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </Page>
  );
}
