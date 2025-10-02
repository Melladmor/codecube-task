export interface Column<T = any> {
  field: keyof T;
  headerName: string;
  width?: number;
  sortable?: boolean;
  renderCell?: (params: { row: T; value: any }) => React.ReactNode;
}

export interface DataGridProps<T = any> {
  rows: T[];
  columns: Column<T>[];
  pageSize?: number;
  checkboxSelection?: boolean;
  onRowClick?: (row: T) => void;
  onSelectionChange?: (selectedRows: T[]) => void;
}

export interface HeaderCellProps<T> {
  column: Column<T>;
  sortField: keyof T | null;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof T, sortable?: boolean) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export interface DataRowProps<T> {
  row: T & { id: number | string };
  columns: Column<T>[];
  isSelected: boolean;
  checkboxSelection: boolean;
  onSelect: (id: number | string) => void;
  onClick?: (row: T) => void;
}
