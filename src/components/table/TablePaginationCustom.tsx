import {
  Box,
  FormControlLabel,
  Switch,
  SxProps,
  TablePagination,
  TablePaginationProps
} from "@mui/material";
import React, { FC } from "react";

interface TablePaginationCustomProps {
  dense?: boolean;
  onChangeDense?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  rowsPerPageOptions?: number[];
}

const TablePaginationCustom: FC<TablePaginationCustomProps & TablePaginationProps> = ({
  dense,
  onChangeDense,
  rowsPerPageOptions = [5, 10, 25],
  sx,
  ...other
}) => {
  return (
    <Box sx={{ position: "relative", ...sx }}>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        {...(other as any)}
      />

      {onChangeDense && (
        <FormControlLabel
          label="Dense"
          control={<Switch checked={dense} onChange={onChangeDense} />}
          sx={{
            pl: 2,
            py: 1.5,
            top: 0,
            position: {
              sm: "absolute",
            },
          }}
        />
      )}
    </Box>
  );
};
export default TablePaginationCustom;
