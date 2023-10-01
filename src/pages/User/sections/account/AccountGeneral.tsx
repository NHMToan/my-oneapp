import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import {
  FormProvider,
  RHFDatePicker,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFUploadSingleFile,
} from "components/hook-form";

import { genders } from "_mock";
import { AuthContext } from "contexts/JWTContext";
import { useUpdateProfileMutation } from "generated/graphql";
import useAuth from "hooks/useAuth";
import { useSnackbar } from "notistack";
import { useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { IProfile } from "types/user";
import { fData } from "utils/formatNumber";
import * as Yup from "yup";
// ----------------------------------------------------------------------
interface IAccountGeneral {
  profile: IProfile;
}

export default function AccountGeneral({ profile }: IAccountGeneral) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateProfile] = useUpdateProfileMutation();
  const { user } = useAuth();
  const { refreshUser } = useContext(AuthContext);
  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required("Name is required"),
  });

  const defaultValues = {
    avatarFile: profile?.avatar || "",
    coverFile: profile?.cover || "",
    displayName: profile?.displayName || "",
    gender: profile?.gender || "",
    phoneNumber: profile?.phoneNumber || "",
    country: profile?.country || "",
    about: profile?.about || "",
    school: profile?.school || "",
    company: profile?.company || "",
    position: profile?.position || "",
    role: profile?.role || "",
    dob: profile?.dob || null,
    isPublic: user?.isPublic || false,
  };

  const methods: any = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      if (typeof values.coverFile === "string") {
        delete values.coverFile;
      }
      if (typeof values.avatarFile === "string") {
        delete values.avatarFile;
      }

      delete values.isPublic;

      const res = await updateProfile({
        variables: {
          updateProfileInput: {
            ...values,
          },
        },
      });
      if (res.data?.updateProfile?.success) {
        enqueueSnackbar("Update success!");

        refreshUser();
      } else {
        enqueueSnackbar(res.data.updateProfile.message || "Internal error", {
          variant: "error",
        });
        throw res.data.updateProfile.message;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarFile",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const handleCoverDrop = useCallback(
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ textAlign: "center" }}>
            <RHFUploadSingleFile
              name="coverFile"
              accept="image/*"
              maxSize={1572864}
              onDrop={handleCoverDrop}
            />

            <RHFUploadAvatar
              name="avatarFile"
              accept={"image/*" as any}
              maxSize={1572864}
              onDrop={handleAvatarDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  <Trans
                    i18nKey="form.validation.max_file_size"
                    values={{ size: fData(1572864) }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(1572864)}
                  </Trans>
                </Typography>
              }
              sx={{ mt: 2 }}
            />
            <RHFSwitch
              name="isPublic"
              labelPlacement="start"
              label="Public Profile"
              sx={{ mt: 5 }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField name="displayName" label="Name" />

              <RHFSelect name="gender" label="Gender" placeholder="Gender">
                {genders.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="phoneNumber" label="Phone Number" />

              <RHFDatePicker name="dob" label="Date of birth" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />
            </Stack>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
