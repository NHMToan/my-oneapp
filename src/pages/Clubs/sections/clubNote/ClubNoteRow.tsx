import { useState } from "react";
// @mui
import {
  Button,
  CardHeader,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
// components
import Label from "components/Label";
import PopConfirm from "components/PopConfirm";
import { useDeleteClubNoteMutation } from "generated/graphql";
import { useSnackbar } from "notistack";
import { TableMoreMenu } from "../../../../components/table";

// ----------------------------------------------------------------------

interface ClubNoteRowProps {
  row: any;
  postDeleted: any;
  onOpenInfo: (row: any) => void;
  onEdit: (row: any) => void;
}
export default function ClubNoteRow({
  row,
  postDeleted,
  onOpenInfo,
  onEdit,
}: ClubNoteRowProps) {
  const { id, isPublic } = row;
  const theme = useTheme();
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const [onDelete] = useDeleteClubNoteMutation();

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle2" noWrap>
            {`${id.slice(0, 8)}`}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={isPublic ? "success" : "error"}
            sx={{ textTransform: "capitalize" }}
          >
            {isPublic ? "Active" : "Inactive"}
          </Label>
        </TableCell>
        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onOpenInfo(row);
                  }}
                  key="details"
                >
                  Details
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onEdit(row);
                  }}
                  key="edit"
                >
                  Edit
                </MenuItem>

                <PopConfirm
                  open={openDelete}
                  onClose={() => setOpenDelete(false)}
                  title={
                    <CardHeader
                      title="Delete Note"
                      subheader="Are you sure to delete the note"
                    />
                  }
                  actions={
                    <>
                      <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setOpenDelete(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                          try {
                            const deleteRes = await onDelete({
                              variables: {
                                id: row.id,
                              },
                            });
                            if (deleteRes?.data?.deleteClubNote?.success) {
                              enqueueSnackbar("Note is deleted successfully!");
                              postDeleted();
                            }
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  }
                >
                  <MenuItem
                    sx={{ color: "error.main" }}
                    onClick={() => {
                      setOpenDelete(true);
                    }}
                  >
                    Delete
                  </MenuItem>
                </PopConfirm>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
