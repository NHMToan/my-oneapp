import { DatePicker } from "@mui/lab";
import {
  Button,
  Card,
  Container,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TextField,
} from "@mui/material";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import Scrollbar from "components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from "components/table";
import TablePaginationCustom from "components/table/TablePaginationCustom";
import { useGetMyHistoryVotesQuery } from "generated/graphql";
import useLocales from "hooks/useLocales";
import useTable, { emptyRows, getComparator } from "hooks/useTable";
import { useState } from "react";
import { fTimestamp } from "utils/formatTime";
import Page from "../../../components/Page";
import useSettings from "../../../hooks/useSettings";
import VoteRow from "./components/VoteRow";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "clubName", label: "Club", align: "left" },
  { id: "paid", label: "Paid status", align: "left" },
];
const INPUT_WIDTH = 160;

export default function VotesList() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { data, loading, refetch } = useGetMyHistoryVotesQuery({
    variables: { limit: 50, offset: 0 },
    fetchPolicy: "no-cache",
  });

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterClub, setFilterClub] = useState("all");

  const isFiltered =
    filterClub !== "all" || (!!filterStartDate && !!filterEndDate);

  var clubNamesSet = new Set(
    data?.getMyHistoryVotes?.results?.map(function (vote) {
      return vote.member.club.title;
    })
  );

  // Converting the Set back to an array
  var clubNames = Array.from(clubNamesSet);

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
  } = useTable({ defaultRowsPerPage: 50, defaultDense: true });
  const dataFiltered = applySortFilter({
    inputData: data?.getMyHistoryVotes?.results || [],
    comparator: getComparator(order, orderBy),
    filterStartDate,
    filterEndDate,
    filterClub,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound = false;

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
            select
            label="Clubs"
            value={filterClub}
            onChange={(event) => {
              setPage(0);
              setFilterClub(event.target.value);
            }}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  sx: { maxHeight: 220 },
                },
              },
            }}
            sx={{
              maxWidth: { md: INPUT_WIDTH },
              textTransform: "capitalize",
            }}
          >
            {["all", ...clubNames].map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  mx: 1,
                  borderRadius: 0.75,
                  typography: "body2",
                  textTransform: "capitalize",
                }}
              >
                {option}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label="Start date"
            value={filterStartDate}
            onChange={(newValue) => {
              setFilterStartDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH },
                }}
              />
            )}
          />

          <DatePicker
            label="End date"
            value={filterEndDate}
            onChange={(newValue) => {
              setFilterEndDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                sx={{
                  maxWidth: { md: INPUT_WIDTH },
                }}
              />
            )}
          />
          {isFiltered && (
            <Button
              color="error"
              sx={{ flexShrink: 0 }}
              onClick={() => {
                setFilterClub("all");
                setFilterEndDate(null);
                setFilterStartDate(null);
              }}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Clear
            </Button>
          )}
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ position: "relative" }}>
            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data?.getMyHistoryVotes?.totalCount}
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
                      postDeleted={refetch}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(
                    page,
                    rowsPerPage,
                    data?.getMyHistoryVotes?.totalCount
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
            rowsPerPageOptions={[20, 30, 50, 100]}
          />
        </Scrollbar>
      </Card>
    );
  };

  return (
    <Page title="Rating">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs heading={translate("history.list.title")} />

        {renderList()}
      </Container>
    </Page>
  );
}
function applySortFilter({
  inputData,
  comparator,
  filterStartDate,
  filterEndDate,
  filterClub,
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterClub !== "all") {
    inputData = inputData.filter(
      (vote) => vote.member.club.title === filterClub
    );
  }

  if (filterStartDate && filterEndDate) {
    inputData = inputData.filter(
      (vote) =>
        fTimestamp(vote.createdAt) >= fTimestamp(filterStartDate) &&
        fTimestamp(vote.createdAt) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
}
