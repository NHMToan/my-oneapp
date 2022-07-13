import { Container, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import Page from "components/Page";
import useLocales from "hooks/useLocales";
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
  const { translate } = useLocales();
  return (
    <Page title="Register">
      <RootStyle>
        <Container>
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              {translate("auth.register.title")}
            </Typography>
            <AuthSocial />

            <RegisterForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
