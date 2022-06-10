import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  useCreateClubMutation,
  useUpdateClubMutation,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import * as Yup from "yup";
import {
  FormProvider,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
  RHFUploadSingleFile,
} from "../../../components/hook-form";
import { ClubData } from "../data.t";
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------
interface ClubFormContentProps {
  isEdit?: boolean;
  currentClub?: ClubData;
}
export default function ClubFormContent({
  isEdit,
  currentClub,
}: ClubFormContentProps) {
  const navigate = useNavigate();

  const [createClub] = useCreateClubMutation({ fetchPolicy: "no-cache" });
  const [updateClub] = useUpdateClubMutation({ fetchPolicy: "no-cache" });

  const { enqueueSnackbar } = useSnackbar();

  const NewClubSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    key: Yup.string().required("Key is required"),
    coverFile: Yup.mixed().required("Cover is required"),
  });
  const defaultValues: any = useMemo(
    () => ({
      key: "",
      title: currentClub?.title || "",
      description: currentClub?.description || "",
      coverFile: currentClub?.cover || "",
      publish: currentClub?.publish || true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentClub]
  );

  const methods = useForm({
    resolver: yupResolver(NewClubSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentClub) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentClub]);

  const onSubmit = async (values) => {
    try {
      if (isEdit) {
        if (typeof values.coverFile === "string") {
          delete values.coverFile;
        }

        updateClub({
          variables: {
            id: currentClub.id,
            updateClubInput: values,
          },
        })
          .then((response) => {
            if (response?.data?.updateClub?.success) {
              reset();

              enqueueSnackbar("Updated success!");
              navigate(PATH_DASHBOARD.club.root);
            } else {
              throw response?.data?.updateClub?.message || "Unexpected error!";
            }
          })
          .catch((e) => {});
      } else {
        createClub({
          variables: {
            createClubInput: values,
          },
        })
          .then((response) => {
            if (response?.data?.createClub?.success) {
              reset();

              enqueueSnackbar("Create success!");
              navigate(PATH_DASHBOARD.club.root);
            } else {
              throw response?.data?.createClub?.message || "Unexpected error!";
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
                {!isEdit && (
                  <RHFTextField
                    name="key"
                    label="Club key (Only admin has it)"
                  />
                )}
                <RHFTextField name="title" label="Post Title" />

                <div>
                  <LabelStyle>Content</LabelStyle>
                  <RHFEditor simple name="description" />
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
                </div>
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting}
              >
                {!isEdit ? "Create" : "Save Changes"}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
