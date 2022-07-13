import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, RHFTextField } from "components/hook-form";
import Iconify from "components/Iconify";
import useAuth from "hooks/useAuth";
import useIsMountedRef from "hooks/useIsMountedRef";
import useLocales from "hooks/useLocales";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { PATH_AUTH } from "Router/paths";
import * as Yup from "yup";
// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login } = useAuth();

  const isMountedRef = useIsMountedRef();
  const { translate } = useLocales();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const defaultValues: any = {
    email: "",
    password: "",
    remember: true,
    afterSubmit: "",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      reset();
      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message: error || "Server error" });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">
            {errors.afterSubmit.message || "Error"}
          </Alert>
        )}

        <RHFTextField name="email" label={translate("auth.login.form.email")} />

        <RHFTextField
          name="password"
          label={translate("auth.login.form.password")}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Typography variant="body2" align="center">
          <Link
            variant="subtitle2"
            component={RouterLink}
            to={PATH_AUTH.register}
          >
            {translate("auth.login.form.register_now")}
          </Link>
        </Typography>
        <Link
          component={RouterLink}
          variant="subtitle2"
          to={PATH_AUTH.resetPassword}
        >
          {translate("auth.login.form.forgot_password")}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        {translate("auth.login.form.login")}
      </LoadingButton>
    </FormProvider>
  );
}
