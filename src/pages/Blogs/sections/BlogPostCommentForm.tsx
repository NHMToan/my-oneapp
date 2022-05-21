import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import { useCommentPostMutation } from "generated/graphql";
// form
import { useForm } from "react-hook-form";
import * as Yup from "yup";
// components
import { FormProvider, RHFTextField } from "../../../components/hook-form";

// ----------------------------------------------------------------------

const RootStyles = styled("div")(({ theme }: { theme: any }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------
interface BlogPostCommentFormProps {
  post: any;
  postSuccess?: () => void;
}
export default function BlogPostCommentForm({
  post,
  postSuccess,
}: BlogPostCommentFormProps) {
  const [onComment] = useCommentPostMutation();

  const CommentSchema = Yup.object().shape({
    content: Yup.string().required("Comment is required"),
  });

  const defaultValues = {
    content: "",
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      const res = await onComment({
        variables: {
          commentInput: {
            postId: post.id,
            content: values.content,
          },
        },
      });
      if (res?.data?.commentPost?.code === 200) {
        postSuccess();
        reset();
      } else {
        throw res?.data?.commentPost?.message || "Server error";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Add Comment
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="content" label="Comment *" multiline rows={3} />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Post comment
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyles>
  );
}
