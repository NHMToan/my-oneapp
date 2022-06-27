import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import Markdown from "components/Markdown";
import {
  useCancelRequestClubMutation,
  useRequestJoinClubMutation,
} from "generated/graphql";
import { ClubData } from "pages/Clubs/data.t";
import { useState } from "react";
import { fNumber } from "utils/formatNumber";

interface ClubGeneralProps {
  club: ClubData;
  refreshClub: any;
}
export default function ClubGeneral({ club, refreshClub }: ClubGeneralProps) {
  const {
    description,
    isMember,
    isRequesting,
    isAdmin,
    isSubAdmin,
    id,
    memberCount,
  } = club;
  const [submiting, setSubmitting] = useState<boolean>(false);

  const [onRequest] = useRequestJoinClubMutation();
  const [onCancel] = useCancelRequestClubMutation();

  const renderAction = () => {
    if (isAdmin)
      return (
        <Button
          fullWidth
          variant="contained"
          endIcon={<Iconify icon={"eva:checkmark-circle-2-fill"} />}
          color="warning"
        >
          Admin
        </Button>
      );
    if (isSubAdmin)
      return (
        <Button
          fullWidth
          variant="contained"
          endIcon={<Iconify icon={"eva:checkmark-circle-2-fill"} />}
          color="warning"
        >
          Sub-admin
        </Button>
      );
    if (isRequesting)
      return (
        <LoadingButton
          fullWidth
          variant="outlined"
          color="error"
          endIcon={<Iconify icon={"eva:close-circle-fill"} />}
          loading={submiting}
          onClick={async () => {
            try {
              setSubmitting(true);
              const res = await onCancel({
                variables: {
                  clubId: id,
                },
              });
              if (res.data.cancelRequestClub.success) {
                refreshClub();
              }
              setSubmitting(false);
            } catch (e) {
              console.log(e);
              setSubmitting(false);
            }
          }}
        >
          Cancel requesting?
        </LoadingButton>
      );
    if (isMember)
      return (
        <Button
          fullWidth
          variant="contained"
          endIcon={<Iconify icon={"eva:checkmark-circle-2-fill"} />}
        >
          Member
        </Button>
      );
    return (
      <LoadingButton
        variant="contained"
        loading={submiting}
        onClick={async () => {
          try {
            setSubmitting(true);
            const res = await onRequest({
              variables: {
                clubId: id,
              },
            });
            if (res.data.requestJoinClub.success) {
              refreshClub();
            }
            setSubmitting(false);
          } catch (e) {
            console.log(e);
            setSubmitting(false);
          }
        }}
      >
        Join club?
      </LoadingButton>
    );
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          {renderAction()}

          <Card sx={{ py: 3 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Stack width={1} textAlign="center">
                <Typography variant="h4">{fNumber(memberCount)}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Members
                </Typography>
              </Stack>

              <Stack width={1} textAlign="center">
                <Typography variant="h4">{fNumber(1000)}</Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Following
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card>
            <CardHeader title="About" />

            <Stack spacing={2} sx={{ p: 3 }}>
              <Markdown children={description} />
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}
