import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogTitle, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormProvider, RHFUploadAvatar } from "components/hook-form";
import { AuthContext } from "contexts/JWTContext";
import { useUpdateProfileMutation } from "generated/graphql";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { fData } from "utils/formatNumber";
import * as Yup from "yup";
const SettingsForm = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { translate } = useLocales();
  const [updateProfile] = useUpdateProfileMutation();
  const { refreshUser } = useContext(AuthContext);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [isValid, setIsValid] = useState<boolean>(false);
  const UpdateUserSchema = Yup.object().shape({});
  const defaultValues = {
    avatarFile: "",
  };

  useEffect(() => {
    if (
      user &&
      (!user.avatar || user.avatar.includes("platform-lookaside.fbsbx.com"))
    ) {
      setIsOpen(true);
    }
  }, [user]);
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
      if (typeof values.avatarFile === "string") {
        delete values.avatarFile;
      }

      const res = await updateProfile({
        variables: {
          updateProfileInput: {
            ...values,
          },
        },
      });
      if (res.data?.updateProfile?.success) {
        enqueueSnackbar("Update success!");
        setIsOpen(false);
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
        setIsValid(true);
      }
    },
    [setValue]
  );
  return (
    <Dialog open={isOpen} maxWidth="xs">
      <DialogTitle>{translate("user.setting_form_modal.title")}</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 3 }}>
          <RHFUploadAvatar
            name="avatarFile"
            accept={"image/*" as any}
            maxSize={3145728}
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
                  values={{ size: fData(3145728) }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Trans>
              </Typography>
            }
            sx={{ mt: 2 }}
          />
        </Box>
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            size="large"
            disabled={!isValid}
            fullWidth
            disableRipple
          >
            {translate("common.btn.save")}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default SettingsForm;
