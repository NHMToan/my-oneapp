import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useLocales from "hooks/useLocales";
import { Link as RouterLink } from "react-router-dom";
import { PATH_AUTH } from "Router/paths";
import Page from "../../components/Page";
import LogoOnlyLayout from "../../layouts/LogoOnlyLayout";
import { ResetPasswordForm } from "../../sections/auth/reset-password";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { translate } = useLocales();
  return (
    <Page title="Reset Password">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            {translate("auth.forgot_password.title")}
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            {translate("auth.forgot_password.sub_title")}
          </Typography>

          <ResetPasswordForm />

          <Button
            fullWidth
            size="large"
            component={RouterLink}
            to={PATH_AUTH.login}
            sx={{ mt: 1 }}
          >
            {translate("common.btn.back")}
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
