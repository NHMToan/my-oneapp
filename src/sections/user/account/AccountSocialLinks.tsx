import { LoadingButton } from "@mui/lab";
// @mui
import { Card, InputAdornment, Stack } from "@mui/material";
import { FormProvider, RHFTextField } from "components/hook-form";
// components
import Iconify from "components/Iconify";
import { useUpdateProfileMutation } from "generated/graphql";
import { useSnackbar } from "notistack";
// form
import { useForm } from "react-hook-form";
import { IProfile } from "types/user";

// ----------------------------------------------------------------------

const SOCIAL_LINKS = [
  {
    value: "facebookLink",
    icon: <Iconify icon={"eva:facebook-fill"} width={24} height={24} />,
  },
  {
    value: "instagramLink",
    icon: (
      <Iconify icon={"ant-design:instagram-filled"} width={24} height={24} />
    ),
  },
  {
    value: "linkedinLink",
    icon: <Iconify icon={"eva:linkedin-fill"} width={24} height={24} />,
  },
  {
    value: "twitterLink",
    icon: <Iconify icon={"eva:twitter-fill"} width={24} height={24} />,
  },
  {
    value: "portfolioLink",
    icon: <Iconify icon={"bxs:user-rectangle"} width={24} height={24} />,
  },
];

// ----------------------------------------------------------------------

interface IAccountSocialLinks {
  profile: IProfile;
}
export default function AccountSocialLinks({ profile }: IAccountSocialLinks) {
  const { enqueueSnackbar } = useSnackbar();
  const [updateProfile, _] = useUpdateProfileMutation();
  const defaultValues = {
    facebookLink: profile.facebookLink,
    instagramLink: profile.instagramLink,
    linkedinLink: profile.linkedinLink,
    twitterLink: profile.twitterLink,
    portfolioLink: profile.portfolioLink,
  };

  const methods: any = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    try {
      const res = await updateProfile({
        variables: { updateProfileInput: values, avatarFile: null },
      });
      if (res.data?.updateProfile?.success) {
        enqueueSnackbar("Update success!");
      } else {
        throw res.data.updateProfile.message;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          {SOCIAL_LINKS.map((link) => (
            <RHFTextField
              key={link.value}
              name={link.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                ),
              }}
            />
          ))}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
