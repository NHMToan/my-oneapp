import { Button, Container, Grid, Stack } from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import Page from "components/Page";
import { SkeletonPostItem } from "components/skeleton";
import { usePostsQuery } from "generated/graphql";
import useSettings from "hooks/useSettings";
import orderBy from "lodash/orderBy";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from "../sections";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === "latest") {
    return orderBy(posts, ["createdAt"], ["desc"]);
  }
  if (sortBy === "oldest") {
    return orderBy(posts, ["createdAt"], ["asc"]);
  }
  if (sortBy === "popular") {
    return orderBy(posts, ["view"], ["desc"]);
  }
  return posts;
};

export default function BlogPosts() {
  const { themeStretch } = useSettings();

  const { data: dataposts, loading } = usePostsQuery({
    variables: { limit: 50, offset: 0 },
    fetchPolicy: "no-cache",
  });

  const [filters, setFilters] = useState("latest");

  const sortedPosts = applySort(dataposts?.posts?.results || [], filters);

  const handleChangeSort = (value) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title="Blog: Posts">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Blog"
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.blog.new}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              New Post
            </Button>
          }
        />

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <BlogPostsSearch />
          <BlogPostsSort
            query={filters}
            options={SORT_OPTIONS}
            onSort={handleChangeSort}
          />
        </Stack>

        <Grid container spacing={3}>
          {(loading ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid
                key={post.id}
                item
                xs={12}
                sm={6}
                md={(index === 0 && 6) || 3}
              >
                <BlogPostCard post={post} index={index} />
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
