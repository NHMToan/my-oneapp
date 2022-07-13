import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { useForgotpasswordMutation } from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { PATH_AUTH } from "Router/paths";
import * as Yup from "yup";
import { FormProvider, RHFTextField } from "../../../components/hook-form";

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [onResetPassword] = useForgotpasswordMutation();
  const { translate } = useLocales();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const res = await onResetPassword({ variables: { email: data.email } });

      if (res?.data?.forgotPassword.success) {
        sessionStorage.setItem("email-recovery", data.email);
        navigate(PATH_AUTH.newPassword);
      } else {
        throw res.data?.forgotPassword?.message || "Server error";
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField
          name="email"
          label={translate("auth.forgot_password.email")}
        />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {translate("auth.forgot_password.btn_send")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
