import {
  Card,
  Container,
  Dialog,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Scrollbar from "components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from "components/table";
import useTable, { emptyRows, getComparator } from "hooks/useTable";
import { FC, useState } from "react";
import ClubNoteCard from "./ClubNoteCard";
import ClubNoteRow from "./ClubNoteRow";

interface ClubNotesListProps {
  notes: any[];
  loading: boolean;
  refetch: () => void;
  onEdit: (row: any) => void;
}
const TABLE_HEAD = [
  { id: "id", label: "Id", align: "left" },
  { id: "isPublic", label: "Status", align: "left" },
  { id: "" },
];
const ClubNotesList: FC<ClubNotesListProps> = ({
  notes = [],
  loading,
  refetch,
  onEdit,
}) => {
  const { page, order, orderBy, rowsPerPage, onSort } = useTable();
  const [openInfo, setOpenInfo] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<any>();

  const dataFiltered = applySortFilter({
    tableData: notes || [],
    comparator: getComparator(order, orderBy),
  });

  const renderList = () => {
    return (
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 400, position: "relative" }}>
            <Table size={"small"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={notes?.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <ClubNoteRow
                      key={row.id}
                      row={row}
                      postDeleted={refetch}
                      onOpenInfo={(row) => {
                        setOpenInfo(true);
                        setSelectedRow(row);
                      }}
                      onEdit={onEdit}
                    />
                  ))}

                <TableEmptyRows
                  height={52}
                  emptyRows={emptyRows(page, rowsPerPage, notes)}
                />
                {loading ? (
                  <TableSkeleton />
                ) : (
                  <TableNoData isNotFound={!notes || notes.length === 0} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    );
  };

  return (
    <Container maxWidth="xl">
      {renderList()}

      <Dialog
        fullWidth
        maxWidth="xs"
        open={openInfo}
        onClose={() => setOpenInfo(false)}
      >
        <ClubNoteCard note={selectedRow} />
      </Dialog>
    </Container>
  );
};
function applySortFilter({ tableData, comparator }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  return tableData;
}

export default ClubNotesList;
