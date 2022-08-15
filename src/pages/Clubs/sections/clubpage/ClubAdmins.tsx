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
import Avatar from "components/Avatar";
import DropdownMenu from "components/DropdownMenu";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import Label from "components/Label";
import PopConfirm from "components/PopConfirm";
import { SimpleSkeleton } from "components/skeleton";
import {
  useChangeAdminMutation,
  useClubMembersQuery,
  useDeleteClubMemberMutation,
  useSetRoleMutation,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { ClubData, ClubMemberData } from "pages/Clubs/data.t";
import SocialsButton from "pages/People/sections/SocialsButton";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
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

  if (loading) return <SimpleSkeleton />;
  if (!data) return <p>{error.message}</p>;
  return (
    <Box sx={{ mt: 5 }}>
      <HeaderBreadcrumbs
        heading="Admins"
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
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

interface AdminCardProps {
  member: ClubMemberData;
  isAdmin?: boolean;
  showAction?: boolean;
  refetch: any;
  clubId?: string;
}
function AdminCard({
  member,
  isAdmin,
  showAction,
  refetch,
  clubId,
}: AdminCardProps) {
  const {
    profile: {
      displayName,
      avatar,
      facebookLink,
      portfolioLink,
      linkedinLink,
      twitterLink,
      id: userId,
    },
    id,
  } = member;
  const [openChangeAdmin, setOpenChangeAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const [onSetRole] = useSetRoleMutation({ fetchPolicy: "no-cache" });
  const [onRemove] = useDeleteClubMemberMutation({ fetchPolicy: "no-cache" });
  const [onSetAdmin] = useChangeAdminMutation({ fetchPolicy: "no-cache" });
  const { enqueueSnackbar } = useSnackbar();

  const SOCIALS = [
    {
      name: "FaceBook",
      icon: "eva:facebook-fill",
      socialColor: "#1877F2",
      path: facebookLink,
    },
    {
      name: "Portfolio",
      icon: "bxs:user-rectangle",
      socialColor: "#E02D69",
      path: portfolioLink,
    },
    {
      name: "Linkedin",
      icon: "eva:linkedin-fill",
      socialColor: "#007EBB",
      path: linkedinLink,
    },
    {
      name: "Twitter",
      icon: "eva:twitter-fill",
      socialColor: "#00AAEC",
      path: twitterLink,
    },
  ];

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
    <Card
      sx={{
        py: 5,
        display: "flex",
        position: "relative",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar
        alt={displayName}
        src={avatar}
        sx={{ width: 64, height: 64, mb: 3 }}
        clickable
      />
      <Typography variant="subtitle2" noWrap>
        <Link to={PATH_DASHBOARD.user.profile(userId)} component={RouterLink}>
          {displayName}
        </Link>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          mb: 1,
          top: 12,
          left: 12,
          position: "absolute",
        }}
      >
        <Label variant="filled" color={isAdmin ? "error" : "success"}>
          {isAdmin ? "Admin" : "Sub-admin"}
        </Label>
      </Typography>

      <SocialsButton initialColor links={SOCIALS} />

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
    </Card>
  );
}
