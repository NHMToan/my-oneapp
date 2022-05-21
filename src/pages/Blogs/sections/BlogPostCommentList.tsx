// @mui
import { Box, Divider, List, Pagination, Typography } from "@mui/material";
import { SkeletionComment } from "components/skeleton";
import { useCommentsQuery } from "generated/graphql";
import { useState } from "react";
import { IPostData } from "../data.t";
import BlogPostCommentForm from "./BlogPostCommentForm";
//
import BlogPostCommentItem from "./BlogPostCommentItem";

// ----------------------------------------------------------------------

interface BlogPostCommentListProps {
  post: IPostData;
}
export default function BlogPostCommentList({
  post,
}: BlogPostCommentListProps) {
  const [page, setPage] = useState<number>(1);

  const { data, loading, refetch } = useCommentsQuery({
    variables: {
      postId: post?.id,
      offset: (page - 1) * 10,
      limit: 10,
    },
    skip: !post,
  });
  if (loading) return <SkeletionComment />;

  if (data?.comments?.totalCount > 0) {
    const { totalCount, results } = data.comments;

    return (
      <>
        <Divider />
        <Box sx={{ display: "flex", mb: 2 }}>
          <Typography variant="h4">Comments</Typography>
          <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
            ({totalCount})
          </Typography>
        </Box>

        {totalCount > 0 && (
          <List disablePadding>
            {results?.map((comment) => {
              const {
                id,
                author: { displayName, avatar, id: authorId },
                createdAt,
                content,
                replyComments,
              } = comment;

              const hasReply = replyComments?.length > 0;

              return (
                <Box key={id} sx={{}}>
                  <BlogPostCommentItem
                    name={displayName}
                    avatarUrl={avatar}
                    postedAt={createdAt}
                    message={content}
                    hasReply={false}
                    commentId={id}
                    refetch={refetch}
                    authorId={authorId}
                  />
                  {hasReply &&
                    replyComments.map((reply) => {
                      const {
                        id,
                        author: { displayName, avatar, id: authorId },
                        createdAt,
                        content,
                      } = reply;

                      return (
                        <BlogPostCommentItem
                          key={id}
                          message={content}
                          postedAt={createdAt}
                          name={displayName}
                          avatarUrl={avatar}
                          hasReply
                          authorId={authorId}
                          refetch={refetch}
                          commentId={id}
                        />
                      );
                    })}
                </Box>
              );
            })}
          </List>
        )}
        {totalCount > 10 && (
          <Box
            sx={{
              mb: 5,
              mt: 3,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Pagination
              page={page}
              count={~~(totalCount / 10) + 1}
              color="primary"
              onChange={(e, p) => {
                setPage(p);
              }}
            />
          </Box>
        )}

        <BlogPostCommentForm post={post} postSuccess={refetch} />
      </>
    );
  }
}
