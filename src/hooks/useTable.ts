import { ChangeEvent, useState } from "react";

interface UseTableProps {
  defaultDense?: boolean;
  defaultOrderBy?: string;
  defaultOrder?: "asc" | "desc";
  defaultCurrentPage?: number;
  defaultRowsPerPage?: number;
  defaultSelected?: any[];
}

interface TableState {
  dense: boolean;
  order: "asc" | "desc";
  orderBy: string;
  page: number;
  rowsPerPage: number;
  selected: any[];
}

export default function useTable(props?: UseTableProps) {
  const [dense, setDense] = useState<boolean>(props?.defaultDense || false);
  const [orderBy, setOrderBy] = useState<string>(
    props?.defaultOrderBy || "name"
  );
  const [order, setOrder] = useState<"asc" | "desc">(
    props?.defaultOrder || "asc"
  );
  const [page, setPage] = useState<number>(props?.defaultCurrentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    props?.defaultRowsPerPage || 50
  );
  const [selected, setSelected] = useState<any[]>(props?.defaultSelected || []);

  const onSort = (id: string) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const onSelectRow = (id: any) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const onSelectAllRows = (checked: boolean, newSelecteds: any[]) => {
    if (checked) {
      setSelected(newSelecteds);
    } else {
      setSelected([]);
    }
  };

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return {
    dense,
    order,
    page,
    setPage,
    orderBy,
    rowsPerPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
  };
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
) {
  return (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => {
    return order === "desc"
      ? descendingComparator(b, a, orderBy)
      : descendingComparator(a, b, orderBy);
  };
}

export function emptyRows(
  page: number,
  rowsPerPage: number,
  arrayLength: number
) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
