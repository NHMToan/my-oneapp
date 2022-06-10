import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import { PostData } from "types/post";
import * as Yup from "yup";
import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from "../../../components/hook-form";
import BlogNewPostPreview from "./BlogNewPostPreview";

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  "Toy Story 3",
  "Logan",
  "Full Metal Jacket",
  "Dangal",
  "The Sting",
  "2001: A Space Odyssey",
  "Singin' in the Rain",
  "Toy Story",
  "Bicycle Thieves",
  "The Kid",
  "Inglourious Basterds",
  "Snatch",
  "3 Idiots",
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
interface BlogNewPostFormProps {
  isEdit?: boolean;
  currentPost?: PostData;
}
export default function BlogNewPostForm({
  isEdit,
  currentPost,
}: BlogNewPostFormProps) {
  const navigate = useNavigate();

  const [createPost] = useCreatePostMutation({ fetchPolicy: "no-cache" });
  const [updatePost] = useUpdatePostMutation({ fetchPolicy: "no-cache" });

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    content: Yup.string().min(1000).required("Content is required"),
    coverFile: Yup.mixed().required("Cover is required"),
  });
  const defaultValues: any = useMemo(
    () => ({
      title: currentPost?.title || "",
      description: currentPost?.description || "",
      content: currentPost?.content || "",
      coverFile: currentPost?.cover || "",
      tags: currentPost?.tags || [],
      publish: currentPost?.publish || true,
      allowComments: currentPost?.allowComments || true,
      metaTitle: currentPost?.metaTitle || "",
      metaDescription: currentPost?.metaDescription || "",
      metaKeywords: currentPost?.metaKeywords || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPost]
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentPost) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPost]);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      if (isEdit) {
        if (typeof values.coverFile === "string") {
          delete values.coverFile;
        }

        updatePost({
          variables: {
            id: currentPost.id,
            updatePostInput: values,
          },
        })
          .then((response) => {
            if (response?.data?.updatePost?.success) {
              reset();
              handleClosePreview();
              enqueueSnackbar("Updated success!");
              navigate(PATH_DASHBOARD.blog.posts);
            } else {
              throw response?.data?.updatePost?.message || "Unexpected error!";
            }
          })
          .catch((e) => {});
      } else {
        createPost({
          variables: {
            createPostInput: values,
          },
        })
          .then((response) => {
            if (response?.data?.createPost?.success) {
              reset();
              handleClosePreview();
              enqueueSnackbar("Create success!");
              navigate(PATH_DASHBOARD.blog.posts);
            } else {
              throw response?.data?.createPost?.message || "Unexpected error!";
            }
          })
          .catch((e) => {});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "coverFile",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Post Title" />

                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={3}
                />

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor simple name="content" />
                </div>

                <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile
                    name="coverFile"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                  />
                </div>
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="publish"
                    label="Publish"
                    labelPlacement="start"
                    sx={{
                      mb: 1,
                      mx: 0,
                      width: 1,
                      justifyContent: "space-between",
                    }}
                  />

                  <RHFSwitch
                    name="allowComments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: "space-between" }}
                  />
                </div>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField label="Tags" {...params} />
                      )}
                    />
                  )}
                />

                <RHFTextField name="metaTitle" label="Meta title" />

                <RHFTextField
                  name="metaDescription"
                  label="Meta description"
                  fullWidth
                  multiline
                  rows={3}
                />

                <Controller
                  name="metaKeywords"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField label="Meta keywords" {...params} />
                      )}
                    />
                  )}
                />
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOpenPreview}
              >
                Preview
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {!isEdit ? "Post" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      <BlogNewPostPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
