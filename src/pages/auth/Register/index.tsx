import { Container, Link, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
import Page from "components/Page";
import useLocales from "hooks/useLocales";
import { useState } from "react";
import AuthSocial from "sections/auth/AuthSocial";
import { RegisterForm } from "sections/auth/register";
import PolicyModal from "../components/PolicyModal";
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
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = () => {
    setOpen(true);
  };
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
            <Typography
              component="div"
              sx={{
                color: "text.secondary",
                mt: 3,
                typography: "caption",
                textAlign: "center",
              }}
            >
              {"By signing up, I agree to "}
              <Link underline="always" color="text.primary" onClick={onOpen}>
                Terms of Service
              </Link>
              {" and "}
              <Link underline="always" color="text.primary" onClick={onOpen}>
                Privacy Policy
              </Link>
              .
            </Typography>

            <PolicyModal open={open} onClose={() => setOpen(false)} />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
