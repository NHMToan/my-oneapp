import {
  Button,
  Card,
  Container,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from "@mui/material";
import Iconify from "components/Iconify";
import Scrollbar from "components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from "components/table";
import TablePaginationCustom from "components/table/TablePaginationCustom";
import { useClubMembersQuery } from "generated/graphql";
import useSettings from "hooks/useSettings";
import useTable, { emptyRows, getComparator } from "hooks/useTable";
import { ClubData } from "pages/Clubs/data.t";
import { useState } from "react";
import { searchVietnameseName } from "utils/search";
import VoteRow from "./components/MemberRow";
import MemberVotesModal from "./components/MemberVotesModal";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "member", label: "Member", align: "left" },
  { id: "createdAt", label: "Created at", align: "left" },
  { id: "" },
];

interface MembersListProps {
  club: ClubData;
}
export default function MembersList({ club }: MembersListProps) {
  const { themeStretch } = useSettings();
  const { data, loading, refetch } = useClubMembersQuery({
    variables: {
      clubId: club?.id,
      status: 2,
      limit: 1000,
      offset: 0,
      ordering: "-role",
    },
    skip: !club,
  });

  const [filterName, setFilterName] = useState("");

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
    setPage,
  } = useTable({ defaultDense: true });

  const [selectedMem, setSelectedMem] = useState<any>(null);
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  const dataFiltered = applySortFilter({
    inputData: data?.clubmembers?.results || [],
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const isFiltered = filterName !== "";

  const denseHeight = dense ? 52 : 72;

  const isNotFound = !dataFiltered.length && !!filterName;

  const renderList = () => {
    return (
      <Card>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ py: 2.5, px: 3 }}
        >
          <TextField
            fullWidth
            value={filterName}
            onChange={handleFilterName}
            placeholder="Search name..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon="eva:search-fill"
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              ),
            }}
          />
          {isFiltered && (
            <Button
              color="error"
              sx={{ flexShrink: 0 }}
              onClick={() => {}}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Clear
            </Button>
          )}
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: "relative" }}>
            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data?.clubmembers?.totalCount}
                numSelected={selected.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <VoteRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      refetch={refetch}
                      club={club as any}
                      onSelectMember={(member) => {
                        setSelectedMem(member);
                        setOpenInfo(true);
                      }}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(
                    page,
                    rowsPerPage,
                    data?.clubmembers?.totalCount
                  )}
                />
                {loading ? (
                  <TableSkeleton />
                ) : (
                  <TableNoData isNotFound={isNotFound} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
            rowsPerPageOptions={[10, 30, 50, 100]}
          />
        </Scrollbar>

        <MemberVotesModal
          open={openInfo}
          onClose={() => {
            setSelectedMem(null);
            setOpenInfo(false);
          }}
          member={selectedMem}
          isAdmin={club.isAdmin || club.isSubAdmin}
        />
      </Card>
    );
  };

  return (
    <Container maxWidth={themeStretch ? false : "xl"}>{renderList()}</Container>
  );
}
function applySortFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
  if (filterName) {
    inputData = inputData.filter((item) =>
      searchVietnameseName(item.profile.displayName, filterName)
    );
  }
  return inputData;
}
