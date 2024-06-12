import { useState } from "react";
// @mui
import {
  Button,
  CardHeader,
  Divider,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
// components
import { PATH_DASHBOARD } from "Router/paths";
import Label from "components/Label";
import PopConfirm from "components/PopConfirm";
import {
  useChangeHiddenRatingMutation,
  useChangeStatusRatingMutation,
  useDeleteRatingMutation,
} from "generated/graphql";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { TableMoreMenu } from "../../../../../components/table";

// ----------------------------------------------------------------------

interface RatingRowProps {
  row: any;
  selected: boolean;
  postDeleted: any;
}
export default function RatingRow({
  row,
  selected,
  postDeleted,
}: RatingRowProps) {
  const { name, hidden, status, id } = row;
  const theme = useTheme();
  const [openMenu, setOpenMenuActions] = useState(null);
  const navigate = useNavigate();
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const [onDelete] = useDeleteRatingMutation();

  const [onChangeHidden] = useChangeHiddenRatingMutation();
  const [onChangeStatus] = useChangeStatusRatingMutation();

  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();
  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={hidden ? "error" : "success"}
          sx={{ textTransform: "capitalize" }}
        >
          {hidden ? "Closed" : "Open"}
        </Label>
      </TableCell>
      <TableCell align="left">
        <Label
          variant={theme.palette.mode === "light" ? "ghost" : "filled"}
          color={status === 1 ? "success" : "error"}
          sx={{ textTransform: "capitalize" }}
        >
          {status === 1 ? "Active" : "Inactive"}
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
                  navigate(PATH_DASHBOARD.adminRating.view(id));
                }}
                key="details"
              >
                Details
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(PATH_DASHBOARD.adminRating.edit(id));
                }}
                key="edit"
              >
                Edit
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={async () => {
                  try {
                    const changeHiddenRes = await onChangeHidden({
                      variables: {
                        id: row.id,
                        hidden: !hidden,
                      },
                    });
                    if (changeHiddenRes?.data?.changeHiddenRating?.success) {
                      enqueueSnackbar("Rating hidden is changed successfully!");
                      postDeleted();
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }}
                key="hidden"
              >
                {hidden ? "Open" : "Close"}
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  try {
                    const changeStatusRes = await onChangeStatus({
                      variables: {
                        id: row.id,
                        status: status === 1 ? 2 : 1,
                      },
                    });
                    if (changeStatusRes?.data?.changeStatusRating?.success) {
                      enqueueSnackbar("Rating hidden is changed successfully!");
                      postDeleted();
                    }
                  } catch (e) {
                    console.error(e);
                  }
                }}
                key="hidden"
              >
                {status === 1 ? "Inactivate" : "Activate"}
              </MenuItem>
              <Divider />
              <PopConfirm
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                title={
                  <CardHeader
                    title="Are you sure to delete the Rating?"
                    subheader="The data related to the rating will be deleted also!"
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
                          if (deleteRes?.data?.deleteRating?.success) {
                            enqueueSnackbar("Rating is deleted successfully!");
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
  );
}
