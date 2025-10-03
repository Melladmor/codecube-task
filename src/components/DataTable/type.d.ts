export interface Column<T = any> {
  field: keyof T;
  headerName: string;
  width?: number;
  sortable?: boolean;
  renderCell?: (params: { row: T; value: any }) => React.ReactNode;
}

export interface DataGridProps<T = any> {
  rows?: T[];
  columns: Column<T>[];
  pageSize?: number;
  page?: number;
  url?: string;
  onRowClick?: (row: T) => void;
  addAction?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export interface DataTableRef {
  refetch: () => void | Promise<void>;
}

export interface HeaderCellProps<T> {
  column: Column<T>;
  sortField: keyof T | null;
  sortDirection: "asc" | "desc";
  onSort: (field: keyof T, sortable?: boolean) => void;
  hasActions?: boolean;
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
  onClick?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export interface SkeletonRowProps<T = any> {
  columns: Column<T>[];
  rowCount?: number;
}

export interface ErrorDataProps {
  colSpan: number;
  onRetry?: () => void;
}

export interface EmptyDataProps {
  colSpan: number;
  message?: string;
}
