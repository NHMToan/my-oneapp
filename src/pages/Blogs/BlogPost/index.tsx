import {
  Box,
  Card,
  Container,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import { paramCase } from "change-case";
import DropdownMenu from "components/DropdownMenu";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import Markdown from "components/Markdown";
import Page from "components/Page";
import { SkeletonPost } from "components/skeleton";
import { AuthContext } from "contexts/JWTContext";
import { usePostQuery, usePostsQuery } from "generated/graphql";
import useSettings from "hooks/useSettings";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { PostData } from "types/post";
import { BlogPostHero, BlogPostRecent, BlogPostTags } from "../sections";
import BlogPostCommentList from "../sections/BlogPostCommentList";
// ----------------------------------------------------------------------

export default function BlogPost() {
  const { themeStretch } = useSettings();
  const { user } = useContext(AuthContext);
  const { id: postID } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = usePostQuery({
    variables: { id: postID },
    fetchPolicy: "no-cache",
  });

  const { data: recentPosts } = usePostsQuery({
    variables: { limit: 50, offset: 0 },
    fetchPolicy: "no-cache",
  });
  const onDeletePost = () => {};

  const onEditPost = () => {
    navigate(PATH_DASHBOARD.blog.edit(paramCase(postID)));
  };
  const renderContent = () => {
    if (loading) return <SkeletonPost />;
    if (!data && error)
      return <Typography variant="h6">404 {error.message}!</Typography>;
    if (data.post) {
      const { post }: any = data;
      return (
        <Card>
          <BlogPostHero post={post} />

          <Box sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h6" sx={{ mb: 5 }}>
              {post.description}
            </Typography>

            <Markdown children={post.content} />

            <Box sx={{ my: 5 }}>
              <Divider />
              <BlogPostTags post={post} refreshPost={refetch} />
            </Box>
            {post.allowComments && <BlogPostCommentList post={post} />}
          </Box>
        </Card>
      );
    }
  };

  return (
    <Page title="Blog: Post Details">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Post Details"
          action={
            user?.id === data?.post?.author?.id && (
              <DropdownMenu
                actions={
                  <>
                    <MenuItem
                      onClick={() => {
                        onDeletePost();
                      }}
                      sx={{ color: "error.main" }}
                    >
                      <Iconify icon={"eva:trash-2-outline"} />
                      Delete
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        onEditPost();
                      }}
                    >
                      <Iconify icon={"eva:edit-fill"} />
                      Edit
                    </MenuItem>
                  </>
                }
              />
            )
          }
        />
        {renderContent()}
        <BlogPostRecent
          posts={(recentPosts?.posts?.results as PostData[]) || []}
        />
      </Container>
    </Page>
  );
}
