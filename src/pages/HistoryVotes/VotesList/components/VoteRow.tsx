// @mui
import {
  Avatar,
  Box,
  IconButton,
  Popover,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Iconify from "components/Iconify";
import { PAID_STATUS } from "pages/Clubs/consts";
import { useState } from "react";
import { fDate } from "utils/formatTime";
// components

// ----------------------------------------------------------------------

interface VoteRowProps {
  row: any;
  selected: boolean;
  postDeleted: any;
}
export default function VoteRow({ row, selected, postDeleted }: VoteRowProps) {
  const {
    createdAt,
    note,
    paid,
    member: {
      club: { title },
    },
    value,
    id,
  } = row;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ width: "250px" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ width: 24, height: 24 }}>{value}</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">{fDate(createdAt)}</Typography>

            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              {title}
            </Typography>
          </Box>
        </Stack>
      </TableCell>
      <TableCell sx={{ width: "160px" }} align="left">
        {paid && PAID_STATUS[paid]}
        {note && (
          <>
            <IconButton onClick={handleClick}>
              <Iconify icon={"ic:baseline-sticky-note-2"} />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography sx={{ p: 1 }}> {note}</Typography>
            </Popover>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
