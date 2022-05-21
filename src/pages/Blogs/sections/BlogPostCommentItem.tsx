// @mui
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DropdownMenu from "components/DropdownMenu";
import Iconify from "components/Iconify";
import {
  useDeleteCommentMutation,
  useReplyCommentMutation,
} from "generated/graphql";
import useAuth from "hooks/useAuth";
import { useState } from "react";
// utils
import { fDate } from "../../../utils/formatTime";

// ----------------------------------------------------------------------

interface BlogPostCommentItemProps {
  name: string;
  authorId: string;
  avatarUrl?: string;
  message: string;
  tagUser?: string;
  postedAt: string;
  hasReply?: boolean;
  commentId?: string;
  refetch?: () => void;
}
export default function BlogPostCommentItem({
  name,
  authorId,
  avatarUrl,
  message,
  tagUser,
  postedAt,
  hasReply,
  commentId,
  refetch,
}: BlogPostCommentItemProps) {
  const [openReply, setOpenReply] = useState(false);
  const [value, setValue] = useState<string>("");
  const { user } = useAuth();
  const [onDelete] = useDeleteCommentMutation();
  const [replyComment] = useReplyCommentMutation();

  const handleOpenReply = () => {
    setOpenReply(true);
  };

  const onDeleteComment = async () => {
    try {
      const res = await onDelete({
        variables: {
          id: commentId,
        },
      });
      if (res?.data?.deleteComment?.code === 200) {
        refetch();
      } else {
        throw res?.data?.deleteComment?.message || "Server error";
      }
    } catch (error) {
      console.error(error);
    }
  };
  const renderActions = () => {
    if (user?.id === authorId) {
      return (
        <DropdownMenu
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteComment();
                }}
                sx={{ color: "error.main" }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Delete
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <Iconify icon={"eva:edit-fill"} />
                Edit
              </MenuItem>
            </>
          }
          sx={{
            mr: -1,
            opacity: 0,
            transition: "0.2s",
          }}
        />
      );
    }
  };
  const onReply = async () => {
    try {
      const res = await replyComment({
        variables: {
          replyCommentInput: {
            commentId,
            content: value,
          },
        },
      });
      if (res?.data?.replyComment?.code === 200) {
        setOpenReply(false);
        refetch();
      } else {
        throw res?.data?.replyComment?.message || "Server error";
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: "flex-start",
          py: 3,
          ...(hasReply && {
            ml: "auto",
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }),
          "&:hover, &:focus": { "& button": { opacity: 1 } },
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: "subtitle1" }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: "block",
                  color: "text.disabled",
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                <strong>{tagUser}</strong> {message}
              </Typography>
            </>
          }
        />
        <Stack direction="row">
          {renderActions()}
          {!hasReply && (
            <Button size="small" onClick={handleOpenReply}>
              Reply
            </Button>
          )}
        </Stack>
      </ListItem>

      {!hasReply && openReply && (
        <Box
          sx={{
            mb: 3,
            ml: "auto",
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Write comment"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: (theme) =>
                  `${theme.palette.grey[500_32]} !important`,
              },
            }}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <Button
            size="small"
            sx={{ position: "absolute", right: 0 }}
            style={{ marginTop: 4 }}
            disabled={!value}
            onClick={() => {
              onReply();
            }}
          >
            Send
          </Button>
        </Box>
      )}

      <Divider
        sx={{
          ml: "auto",
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </>
  );
}
