// @mui
import { TableCell, TableRow, Typography } from "@mui/material";
import { PAID_STATUS } from "pages/Clubs/consts";
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
  } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2" noWrap>
          {title}
        </Typography>
      </TableCell>

      <TableCell align="left">{fDate(createdAt)}</TableCell>

      <TableCell align="left">{note}</TableCell>

      <TableCell align="left">{paid && PAID_STATUS[paid]}</TableCell>
    </TableRow>
  );
}
