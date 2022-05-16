import { Container } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Page from "components/Page";
import { usePostQuery } from "generated/graphql";
import useSettings from "hooks/useSettings";
import { useLocation, useParams } from "react-router-dom";
import { BlogNewPostForm } from "../sections";

// ----------------------------------------------------------------------

export default function BlogNewPost() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes("edit");

  const { data } = usePostQuery({
    skip: !id,
    variables: { id },
    fetchPolicy: "no-cache",
  });

  const renderContent = () => {
    if (!isEdit) {
      return <BlogNewPostForm />;
    }
    if (isEdit && data?.post)
      return <BlogNewPostForm isEdit={isEdit} currentPost={data.post as any} />;
  };
  return (
    <Page title="Blog: New Post">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={!isEdit ? "Create a new post" : "Edit post"}
        />

        {renderContent()}
      </Container>
    </Page>
  );
}
