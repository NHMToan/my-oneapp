// @mui
import {
  Button,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { PATH_DASHBOARD } from "Router/paths";
import Avatar from "components/Avatar";
import Iconify from "components/Iconify";
import PopConfirm from "components/PopConfirm";
import MenuPopover from "components/menu-popover";
import {
  useChangeAdminMutation,
  useDeleteClubMemberMutation,
  useSetRoleMutation,
} from "generated/graphql";
import useLocales from "hooks/useLocales";
import { useSnackbar } from "notistack";
import { ClubMemberData } from "pages/Clubs/data.t";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// components

// ----------------------------------------------------------------------

interface MemberRowProps {
  row: ClubMemberData;
  selected: boolean;
  refetch: any;
  club: any;
  onSelectMember: any;
}
export default function MemberRow({
  row,
  selected,
  refetch,
  club,
  onSelectMember,
}: MemberRowProps) {
  const {
    createdAt,
    role,
    profile: { displayName, avatar },
    id,
    isAdmin,
  } = row;
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [onSetRole] = useSetRoleMutation({ fetchPolicy: "no-cache" });
  const [onRemove] = useDeleteClubMemberMutation({ fetchPolicy: "no-cache" });
  const [onSetAdmin] = useChangeAdminMutation({ fetchPolicy: "no-cache" });
  const [openChangeAdmin, setOpenChangeAdmin] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleChangeAdmin = async () => {
    try {
      const res = await onSetAdmin({
        variables: { memberId: id, clubId: club?.id },
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
    <TableRow hover selected={selected}>
      <TableCell>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          onClick={() => {
            onSelectMember(row);
          }}
        >
          <Avatar
            alt={displayName}
            src={avatar}
            sx={{ width: 40, height: 40 }}
            clickable
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {displayName}
            </Typography>

            {role !== 1 && (
              <Link
                noWrap
                variant="body2"
                sx={{
                  color: isAdmin ? "#E02D69" : "#1877F2",
                  cursor: "pointer",
                }}
              >
                {isAdmin
                  ? translate("club.member.status.admin")
                  : translate("club.member.status.sub_admin")}
              </Link>
            )}
          </div>
        </Stack>
      </TableCell>

      {club.isAdmin && !isAdmin && (
        <TableCell align="right">
          <IconButton
            color={openPopover ? "inherit" : "default"}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      )}

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 160 }}
      >
        {role === 1 && (
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

        {role === 2 && (
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
        )}
        <Divider sx={{ borderStyle: "dashed" }} />
        {club.id && (
          <PopConfirm
            open={openChangeAdmin}
            onClose={() => setOpenChangeAdmin(false)}
            title={
              <Typography>
                Are you sure you want to change the club admin to {displayName}?
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
      </MenuPopover>
    </TableRow>
  );
}
