// @mui
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PATH_DASHBOARD } from "Router/paths";
import Avatar from "components/Avatar";
import DropdownMenu from "components/DropdownMenu";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import PopConfirm from "components/PopConfirm";
import { SimpleSkeleton } from "components/skeleton";
import {
  useChangeAdminMutation,
  useClubMembersQuery,
  useDeleteClubMemberMutation,
  useSetRoleMutation,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { ClubData, ClubMemberData } from "pages/Clubs/data.t";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberVotesModal from "./MembersList/components/MemberVotesModal";
// ----------------------------------------------------------------------

interface ClubAdminsProps {
  club: ClubData;
}
export default function ClubAdmins({ club }: ClubAdminsProps) {
  const { data, loading, error, refetch } = useClubMembersQuery({
    variables: { clubId: club?.id, status: 2, role: 2, limit: 50, offset: 0 },
    fetchPolicy: "no-cache",
    skip: !club,
  });
  const { translate } = useLocales();

  if (loading) return <SimpleSkeleton />;
  if (!data) return <p>{error.message}</p>;
  return (
    <Box sx={{ mt: 5 }}>
      <HeaderBreadcrumbs
        heading={translate("club.details.members.list_admin_title")}
        action={
          <IconButton onClick={() => refetch()}>
            <Iconify icon={"ci:refresh-02"} width={20} height={20} />
          </IconButton>
        }
      />

      <Grid container spacing={3}>
        <Grid key="admin" item xs={12} md={4}>
          <AdminCard
            member={{ profile: club.admin }}
            isAdmin
            refetch={refetch}
            isSubAdmin={club.isSubAdmin}
          />
        </Grid>
        {data?.clubmembers?.results
          ?.filter((member) => member.profile.id !== club.admin.id)
          .map((member) => (
            <Grid key={member.id} item xs={12} md={4}>
              <AdminCard
                member={member as any}
                refetch={refetch}
                showAction={club.isAdmin}
                clubId={club?.id}
                isSubAdmin={club.isSubAdmin}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
interface RootStyleProps {
  theme?: any;
  isAdmin?: any;
}
const RootStyle = styled(Card)<RootStyleProps>(({ theme, isAdmin }) => ({
  textAlign: "center",
  backgroundColor: isAdmin
    ? theme.palette.error.lighter
    : theme.palette.warning.lighter,
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

interface AdminCardProps {
  member: ClubMemberData;
  isAdmin?: boolean;
  showAction?: boolean;
  refetch: any;
  clubId?: string;
  isSubAdmin: boolean;
}
function AdminCard({
  member,
  isAdmin,
  showAction,
  refetch,
  clubId,
  isSubAdmin,
}: AdminCardProps) {
  const {
    profile: { displayName, avatar },
    id,
  } = member;
  const [openChangeAdmin, setOpenChangeAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const [onSetRole] = useSetRoleMutation({ fetchPolicy: "no-cache" });
  const [onRemove] = useDeleteClubMemberMutation({ fetchPolicy: "no-cache" });
  const [onSetAdmin] = useChangeAdminMutation({ fetchPolicy: "no-cache" });
  const { enqueueSnackbar } = useSnackbar();
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const handleChangeAdmin = async () => {
    try {
      const res = await onSetAdmin({
        variables: { memberId: id, clubId: clubId },
      });
      if (res?.data?.changeAdmin?.success) {
        enqueueSnackbar("Club delete successfully!");
        navigate(PATH_DASHBOARD.club.root);
      } else {
        enqueueSnackbar(res?.data?.changeAdmin?.message || "Internal error");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <RootStyle
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1.5,
      }}
      isAdmin={isAdmin}
    >
      <MemberVotesModal
        open={openInfo}
        onClose={() => {
          setOpenInfo(false);
        }}
        member={member}
        isAdmin={isAdmin || isSubAdmin}
      />
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
              onClick={() => {
                setOpenInfo(true);
              }}
            >
              {displayName}
            </Link>
          </Typography>
        </Box>
      </Box>

      {showAction && (
        <DropdownMenu
          sx={{ top: 8, right: 8, position: "absolute" }}
          actions={
            <>
              <MenuItem
                onClick={async () => {
                  try {
                    const res = await onSetRole({
                      variables: {
                        clubMemId: id,
                        role: 1,
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
                Set to member
              </MenuItem>
              <Divider sx={{ borderStyle: "dashed" }} />
              {clubId && (
                <PopConfirm
                  open={openChangeAdmin}
                  onClose={() => setOpenChangeAdmin(false)}
                  title={
                    <Typography>
                      Are you sure you want to change the club admin to{" "}
                      {displayName}?
                    </Typography>
                  }
                  actions={
                    <>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setOpenChangeAdmin(false)}
                      >
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={handleChangeAdmin}>
                        Change
                      </Button>
                    </>
                  }
                >
                  <MenuItem
                    onClick={() => {
                      setOpenChangeAdmin(true);
                    }}
                  >
                    <Iconify icon={"clarity:administrator-solid"} />
                    Set to Admin
                  </MenuItem>
                </PopConfirm>
              )}
              <Divider sx={{ borderStyle: "dashed" }} />

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
    </RootStyle>
  );
}
