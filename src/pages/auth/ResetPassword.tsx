import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
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
  return (
    <Page title="Reset Password">
      <LogoOnlyLayout />

      <Container>
        <ContentStyle sx={{ textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            Forgot your password?
          </Typography>

          <Typography sx={{ color: "text.secondary", mb: 5 }}>
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </Typography>

          <ResetPasswordForm />

          <Button
            fullWidth
            size="large"
            component={RouterLink}
            to={PATH_AUTH.login}
            sx={{ mt: 1 }}
          >
            Back
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
