import { Card, CardHeader, Stack, Typography } from "@mui/material";
// @mui
import { styled } from "@mui/material/styles";
// components
import Iconify from "components/Iconify";
import { IProfile } from "types/user";
import { fDate } from "utils/formatTime";

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

interface IProfileAbout {
  profile: IProfile;
}
export default function ProfileAbout({ profile }: IProfileAbout) {
  const { about, dob, phoneNumber, gender } = profile;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{about}</Typography>

        <Stack direction="row">
          <IconStyle icon={"tabler:gender-transgender"} />
          <Typography variant="body2">
            Gender: &nbsp;
            <b>{gender || "-"}</b>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={"icon-park-solid:birthday-cake"} />
          <Typography variant="body2">
            Date of birth: &nbsp;
            <b>{dob ? fDate(dob, "dd MMMM yyyy") : "-"}</b>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={"bi:phone-fill"} />
          <Typography variant="body2">
            Phone: &nbsp;
            <b>{phoneNumber || "-"}</b>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
