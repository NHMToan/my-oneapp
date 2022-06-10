// @mui
import { LoadingButton } from "@mui/lab";
import { Avatar, Box, Card, Grid, Stack, Typography } from "@mui/material";
import { SkeletonCommon } from "components/skeleton";
import {
  useAcceptJoinClubMutation,
  useClubMembersQuery,
  useDeleteClubMemberMutation,
} from "generated/graphql";
import { ClubData, ClubMemberData } from "pages/Clubs/data.t";
import { useState } from "react";
import { fDateTime } from "utils/formatTime";
import Iconify from "../../../../components/Iconify";

// ----------------------------------------------------------------------

interface ClubRequestsProps {
  club: ClubData;
}
export default function ClubRequests({ club }: ClubRequestsProps) {
  const { data, loading, error, refetch } = useClubMembersQuery({
    variables: { clubId: club?.id, status: 1, limit: 50, offset: 0 },
    fetchPolicy: "no-cache",
    skip: !club,
  });
  if (loading) return <SkeletonCommon />;
  if (!data) return <p>{error.message}</p>;
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Members requests
      </Typography>

      <Grid container spacing={3}>
        {data?.clubmembers?.results?.map((member) => (
          <Grid key={member.id} item xs={12} md={4}>
            <RequestMemberCard member={member as any} refresh={refetch} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

interface RequestMemberCardProps {
  member: ClubMemberData;
  refresh: () => void;
}
function RequestMemberCard({ member, refresh }: RequestMemberCardProps) {
  const { profile, createdAt, id } = member;

  const [onAccept] = useAcceptJoinClubMutation({ fetchPolicy: "no-cache" });
  const [onRemove] = useDeleteClubMemberMutation({ fetchPolicy: "no-cache" });
  const [submiting, setSubmitting] = useState<boolean>(false);

  return (
    <Card sx={{ display: "flex", alignItems: "center" }}>
      <Stack spacing={2} sx={{ position: "relative", p: 3, width: "100%" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={profile.displayName} src={profile.avatar} />
          <div>
            <Typography variant="subtitle2">{profile.displayName}</Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", mt: 0.5, display: "block" }}
            >
              Sent at {fDateTime(createdAt)}
            </Typography>
          </div>
        </Stack>

        <Stack
          direction="row"
          spacing={2}
          alignItems="flex-end"
          sx={{ flexGrow: 1 }}
        >
          <LoadingButton
            loading={submiting}
            fullWidth
            variant="contained"
            endIcon={<Iconify icon={"eva:checkmark-circle-2-fill"} />}
            onClick={async () => {
              try {
                setSubmitting(true);
                const res = await onAccept({
                  variables: {
                    clubMemId: id,
                  },
                });
                if (res.data.acceptJoin.success) {
                  refresh();
                }
                setSubmitting(false);
              } catch (e) {
                console.log(e);
                setSubmitting(false);
              }
            }}
          >
            Accept
          </LoadingButton>

          <LoadingButton
            loading={submiting}
            fullWidth
            variant="contained"
            color="error"
            endIcon={<Iconify icon={"eva:close-circle-fill"} />}
            onClick={async () => {
              try {
                setSubmitting(true);
                const res = await onRemove({
                  variables: {
                    clubMemId: id,
                  },
                });
                if (res.data.deleteClubMember.success) {
                  refresh();
                }
                setSubmitting(false);
              } catch (e) {
                console.log(e);
                setSubmitting(false);
              }
            }}
          >
            Reject
          </LoadingButton>
        </Stack>
      </Stack>
    </Card>
  );
}
