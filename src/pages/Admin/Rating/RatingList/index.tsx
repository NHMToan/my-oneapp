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
import { PATH_DASHBOARD } from "Router/paths";
import HeaderBreadcrumbs from "components/HeaderBreadcrumbs";
import Iconify from "components/Iconify";
import Scrollbar from "components/Scrollbar";
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from "components/table";
import { useRatingsQuery } from "generated/graphql";
import useAuth from "hooks/useAuth";
import useLocales from "hooks/useLocales";
import useTable, { emptyRows, getComparator } from "hooks/useTable";
import { Link as RouterLink } from "react-router-dom";
import Page from "../../../../components/Page";
import useSettings from "../../../../hooks/useSettings";
import RatingRow from "./sections/RatingRow";

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: "name", label: "Name", align: "left" },
  { id: "hidden", label: "Is hidden", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "" },
];
export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { translate } = useLocales();
  const { user } = useAuth();
  const { data, loading, refetch } = useRatingsQuery({
    variables: { limit: 1000, offset: 0 },
    fetchPolicy: "no-cache",
  });

  const { dense, page, order, orderBy, rowsPerPage, selected, onSort } =
    useTable();
  const dataFiltered = applySortFilter({
    tableData: data?.ratings?.results || [],
    comparator: getComparator(order, orderBy),
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
            placeholder="Search rating..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify
                    icon={"eva:search-fill"}
                    sx={{ color: "text.disabled", width: 20, height: 20 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: "relative" }}>
            <Table size={dense ? "small" : "medium"}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data?.ratings?.totalCount}
                numSelected={selected.length}
                onSort={onSort}
              />

              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <RatingRow
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
                    data?.ratings?.totalCount
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
        </Scrollbar>
      </Card>
    );
  };

  return (
    <Page title="Rating">
      <Container maxWidth={themeStretch ? false : "xl"}>
        {user.role === "admin" && (
          <HeaderBreadcrumbs
            heading={translate("rating.list.title")}
            action={
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_DASHBOARD.adminRating.new}
                startIcon={<Iconify icon={"eva:plus-fill"} />}
              >
                {translate("club.list.btn_new")}
              </Button>
            }
          />
        )}
        {renderList()}
      </Container>
    </Page>
  );
}
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
