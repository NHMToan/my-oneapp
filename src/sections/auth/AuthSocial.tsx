// material
import { Button, Divider, Stack, Typography } from "@mui/material";
// component
import IconBox from "../../components/IconBox";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useFbLoginMutation } from "generated/graphql";
import useAuth from "hooks/useAuth";

// ----------------------------------------------------------------------

export default function AuthSocial() {
  const [onFBLogin] = useFbLoginMutation();
  const { postLogin } = useAuth();
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
          appId="573224731075564"
          fields="name,email,picture"
          callback={responseFacebook}
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

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <IconBox
            icon="eva:google-fill"
            color="#DF3E30"
            width={22}
            height={22}
          />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          OR
        </Typography>
      </Divider>
    </>
  );
}
