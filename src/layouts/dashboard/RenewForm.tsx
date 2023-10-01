import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import Iconify from "components/Iconify";
import { FormProvider, RHFTextField } from "components/hook-form";
import { AuthContext } from "contexts/JWTContext";
import { useUpdateUserMutation } from "generated/graphql";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
const RenewForm = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { translate } = useLocales();
  const [updateUser] = useUpdateUserMutation();
  const { refreshUser } = useContext(AuthContext);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const defaultValues = {};
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user && !isNaN(Number(user.email))) {
      setIsOpen(true);
    }
  }, [user]);
  const methods: any = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      const res = await updateUser({
        variables: {
          input: values,
        },
      });
      if (res.data?.updateUser?.success) {
        enqueueSnackbar("Update success!");
        setIsOpen(false);
        refreshUser();
      } else {
        enqueueSnackbar(res.data.updateUser.message || "Internal error", {
          variant: "error",
        });
        throw res.data.updateUser.message;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} maxWidth="xs">
      <DialogTitle sx={{ m: 0, p: 2, minWidth: "350px" }}>
        Update profile
      </DialogTitle>
      <Divider />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 2 }}>
          <Stack spacing={3}>
            <Alert severity="info">
              Vì một số lý do liên quan đến chính sách của facebook nên hiện tại
              website sẽ ngừng hoạt động với liên kết facebook.
              <br />
              Vui lòng cung cấp thông tin bên dưới để chuyển đổi sang tài khoản
              của website. Sau khi lưu thành công, bạn có thể đăng nhập bằng
              thông tin cung cấp bên dưới.
            </Alert>
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
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Box>
        <DialogActions sx={{ justifyContent: "center" }}>
          <LoadingButton
            type="submit"
            loading={isSubmitting}
            size="large"
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

export default RenewForm;
