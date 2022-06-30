import { Container, Link, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import Page from "components/Page";
import AuthSocial from "sections/auth/AuthSocial";
import { RegisterForm } from "sections/auth/register";
// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

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

export default function Register() {
  return (
    <Page title="Register">
      <RootStyle>
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Register to join with us.
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Viet Sportmates Group
            </Typography>

            <AuthSocial />

            <RegisterForm />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: "text.secondary", mt: 3 }}
            >
              By registering, I agree to VSG&nbsp;
              <Link underline="always" color="text.primary" href="#">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link underline="always" color="text.primary" href="#">
                Privacy Policy
              </Link>
              .
            </Typography>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
