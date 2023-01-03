import { Container } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import { useRatingQuery } from "generated/graphql";
import useSettings from "hooks/useSettings";
import { useLocation, useParams } from "react-router-dom";
import RatingFormContent from "./sections/RatingFormContent";

// ----------------------------------------------------------------------

export default function ClubForm() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { id } = useParams();
  const isEdit = pathname.includes("edit");

  const { data } = useRatingQuery({
    skip: !id,
    variables: { id },
    fetchPolicy: "no-cache",
  });

  const renderContent = () => {
    if (!isEdit) {
      return <RatingFormContent />;
    }
    if (isEdit && data?.rating)
      return <RatingFormContent isEdit={isEdit} currentRating={data?.rating} />;
  };
  return (
    <Container maxWidth={themeStretch ? false : "lg"}>
      <HeaderBreadcrumbs heading={"Create a new Rating"} />

      {renderContent()}
    </Container>
  );
}
