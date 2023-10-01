import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
// @mui
import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
// form
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormProvider, RHFTextField } from "../../../components/hook-form";
// components
import Iconify from "../../../components/Iconify";
// hooks
import axios from "axios";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import ReCAPTCHA from "react-google-recaptcha";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const { translate } = useLocales();
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First name required"),
    lastName: Yup.string().required("Last name required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    recaptcha: Yup.string().required("Please complete the CAPTCHA"),
  });

  const defaultValues: any = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}verify-recaptcha`,
        { recaptcha: data.recaptcha }
      );

      if (response.data.success) {
        // CAPTCHA verification successful, proceed with registration
        await register(
          data.email,
          data.password,
          data.firstName,
          data.lastName
        );
      } else {
        enqueueSnackbar("CAPTCHA verification failed", { variant: "error" });
      }
    } catch (error) {
      console.error(error);
      reset();

      enqueueSnackbar("Server error", { variant: "error" });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField
            name="firstName"
            label={translate("auth.register.form.fist_name")}
          />
          <RHFTextField
            name="lastName"
            label={translate("auth.register.form.last_name")}
          />
        </Stack>

        <RHFTextField
          name="email"
          label={translate("auth.register.form.email")}
        />

        <RHFTextField
          name="password"
          label={translate("auth.register.form.password")}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <ReCAPTCHA
          sitekey="6LcTxEsmAAAAAAgU7klK1MTsFXK2hpCQLwR2HJoC"
          onChange={(value) => {
            methods.setValue("recaptcha", value); // Set the reCAPTCHA value in the form data
          }}
        />
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          {translate("auth.register.form.register")}
        </LoadingButton>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            {translate("auth.register.form.login_warning")}{" "}
            <Link variant="subtitle2" component={RouterLink} to="/auth/login">
              {translate("auth.register.form.login")}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
