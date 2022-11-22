// @mui
import {
  Box,
  Card,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Typography,
} from "@mui/material";
import Avatar from "components/Avatar";
import DropdownMenu from "components/DropdownMenu";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import { SimpleSkeleton } from "components/skeleton";
import {
  useClubMembersQuery,
  useDeleteClubMemberMutation,
  useSetIsAdvancedMutation,
  useSetRoleMutation,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import { ClubData, ClubMemberData } from "pages/Clubs/data.t";
import { Link as RouterLink } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";

// ----------------------------------------------------------------------

interface ClubMembersProps {
  club: ClubData;
}
export default function ClubMembers({ club }: ClubMembersProps) {
  const { data, loading, error, refetch } = useClubMembersQuery({
    variables: { clubId: club?.id, status: 2, role: 1, limit: 300, offset: 0 },
    fetchPolicy: "no-cache",
    skip: !club,
  });
  const { translate } = useLocales();

  if (loading) return <SimpleSkeleton />;
  if (!data) return <p>{error.message}</p>;
  return (
    <>
      <Box sx={{ mt: 5 }}>
        <HeaderBreadcrumbs
          heading={translate("club.details.members.list_member_title")}
          action={
            <IconButton onClick={() => refetch()}>
              <Iconify icon={"ci:refresh-02"} width={20} height={20} />
            </IconButton>
          }
        />

        <Grid container spacing={3}>
          {data?.clubmembers?.results.map((member) => (
            <Grid key={member.id} item xs={12} md={4}>
              <MemberCard
                member={member as any}
                refetch={refetch}
                isAuth={club.isAdmin || club.isSubAdmin}
                isAdmin={club.isAdmin}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

interface MemberCardProps {
  member: ClubMemberData;
  refetch?: any;
  isAuth: boolean;
  isAdmin?: boolean;
}
function MemberCard({ member, refetch, isAuth, isAdmin }: MemberCardProps) {
  const {
    profile: { displayName, avatar, id: userId },
    id,
    isAdvanced,
  } = member;
  const [onSetRole] = useSetRoleMutation({ fetchPolicy: "no-cache" });
  const [onSetIsAdvanced] = useSetIsAdvancedMutation({
    fetchPolicy: "no-cache",
  });
  const [onRemove] = useDeleteClubMemberMutation({ fetchPolicy: "no-cache" });
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 1.5 }}>
      <Avatar
        alt={displayName}
        src={avatar}
        sx={{ width: 40, height: 40 }}
        clickable
      />
      <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle2" noWrap>
            <Link
              to={PATH_DASHBOARD.user.profile(userId)}
              component={RouterLink}
            >
              {displayName}
            </Link>
          </Typography>
        </Box>
      </Box>
      {isAuth && (
        <DropdownMenu
          actions={
            <>
              {isAdmin && (
                <MenuItem
                  onClick={async () => {
                    try {
                      if (isAdvanced) {
                      }
                      const res = await onSetIsAdvanced({
                        variables: {
                          memberId: id,
                          isAdvanced: !isAdvanced,
                        },
                      });

                      if (res.data.setIsAdvanced.success) {
                        refetch();
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <Iconify
                    icon={"emojione:star"}
                    sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }}
                  />
                  {isAdvanced ? "Set not prepaid" : "Set prepaid"}
                </MenuItem>
              )}

              {isAdmin && (
                <MenuItem
                  onClick={async () => {
                    try {
                      const res = await onSetRole({
                        variables: {
                          clubMemId: id,
                          role: 2,
                        },
                      });
                      if (res.data.setRole.success) {
                        refetch();
                      }
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <Iconify icon={"eva:checkmark-circle-2-fill"} />
                  Set sub-admin
                </MenuItem>
              )}

              {isAdmin && <Divider sx={{ borderStyle: "dashed" }} />}

              <MenuItem
                sx={{ color: "error.main" }}
                onClick={async () => {
                  try {
                    const res = await onRemove({
                      variables: {
                        clubMemId: id,
                      },
                    });
                    if (res.data.deleteClubMember.success) {
                      refetch();
                    }
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <Iconify icon={"eva:trash-2-outline"} />
                Kick
              </MenuItem>
            </>
          }
        />
      )}
    </Card>
  );
}
