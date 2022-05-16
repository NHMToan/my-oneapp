// @mui
import { Grid, Typography } from "@mui/material";
import { PostData } from "types/post";
import BlogPostCard from "./BlogPostCard";

// ----------------------------------------------------------------------

interface BlogPostRecentProps {
  posts: PostData[];
}
export default function BlogPostRecent({ posts }: BlogPostRecentProps) {
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
        Recent posts
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={3}>
            <BlogPostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
