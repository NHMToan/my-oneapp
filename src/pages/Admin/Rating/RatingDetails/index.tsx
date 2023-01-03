import { Card, CardHeader, Container, Grid, Stack } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Markdown from "components/Markdown";
import Page from "components/Page";
import { SkeletionComment } from "components/skeleton";
import { useRatingQuery } from "generated/graphql";
import useLocales from "hooks/useLocales";
import useSettings from "hooks/useSettings";
import { FC } from "react";
import { useParams } from "react-router-dom";
import Candidates from "./sections/Candidates";

interface RatingDetailsProps {}
const RatingDetails: FC<RatingDetailsProps> = (props) => {
  const { id } = useParams();
  const { data, loading } = useRatingQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id,
    },
    skip: !id,
  });

  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  if (loading) return <SkeletionComment />;
  if (!data) return <div>User error</div>;
  const renderCard = () => {
    const { name, description } = data.rating;
    return (
      <Card>
        <CardHeader title={name} />
        <Stack spacing={2} sx={{ p: 3 }}>
          <Markdown children={description} />
        </Stack>
      </Card>
    );
  };
  return (
    <Page title="Rating">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs heading={translate("rating.details.title")} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {renderCard()}
          </Grid>
          <Grid item xs={12}>
            <Candidates rating={data?.rating as any} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default RatingDetails;
