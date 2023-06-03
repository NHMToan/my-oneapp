import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Page from "components/Page";
import useLocales from "hooks/useLocales";
import { useState } from "react";
import AuthSocial from "sections/auth/AuthSocial";
import { LoginForm } from "sections/auth/login";
import PolicyModal from "../components/PolicyModal";
import TOSModal from "../components/TOSModal";
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

export default function Login() {
  const { translate } = useLocales();
  const [openPP, setOpenPP] = useState<boolean>(false);
  const [openTOS, setOpenTOS] = useState<boolean>(false);

  const onOpenPP = () => {
    setOpenPP(true);
  };
  const onOpenTOS = () => {
    setOpenTOS(true);
  };
  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  {translate("auth.login.title")}
                </Typography>
              </Box>
            </Stack>

            <AuthSocial />

            <LoginForm />

            <Typography
              component="div"
              sx={{
                color: "text.secondary",
                mt: 3,
                typography: "caption",
                textAlign: "center",
              }}
            >
              {"By signing in, I agree to "}
              <Link underline="always" color="text.primary" onClick={onOpenTOS}>
                Terms of Service
              </Link>
              {" and "}
              <Link underline="always" color="text.primary" onClick={onOpenPP}>
                Privacy Policy
              </Link>
              .
            </Typography>

            <PolicyModal open={openPP} onClose={() => setOpenPP(false)} />
            <TOSModal open={openTOS} onClose={() => setOpenTOS(false)} />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
