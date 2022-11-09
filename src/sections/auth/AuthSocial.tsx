// material
import { Button, Divider, Stack, Typography } from "@mui/material";
// component
import { useFbLoginMutation } from "generated/graphql";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import IconBox from "../../components/IconBox";

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const [onFBLogin] = useFbLoginMutation();
  const { postLogin } = useAuth();
  const { translate } = useLocales();
  const responseFacebook = async (res) => {
    try {
      const loginRes = await onFBLogin({
        variables: {
          fbLoginInput: {
            id: res.id,
            name: res.name,
            picture: res?.picture?.data?.url || "",
          },
        },
      });
      postLogin(loginRes.data.fbLogin);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FacebookLogin
          appId={process.env.REACT_APP_FB_DEV}
          fields="name,email,picture"
          callback={responseFacebook}
          disableMobileRedirect={true}
          render={(renderProps) => {
            return (
              <Button
                fullWidth
                size="large"
                color="inherit"
                variant="outlined"
                onClick={renderProps.onClick}
              >
                <IconBox
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={22}
                  height={22}
                />
              </Button>
            );
          }}
        />
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", textTransform: "uppercase" }}
        >
          {translate("common.word.prepositions.on")}
        </Typography>
      </Divider>
    </>
  );
}
