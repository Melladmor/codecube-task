import {
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import type { DataGridProps, DataTableRef } from "./type";
import { HeaderCell } from "./HeaderCell";
import { DataRow } from "./DataRow";
import style from "./style.module.css";
import { Pagination } from "./Pagination";
import { useFetch } from "../../hooks/userFetch";
import { SkeletonRow } from "./SkeletonRow";
import { ErrorData } from "./ErrorData";
import { EmptyData } from "./EmptyData";
import FieldRender from "../inputs/FieldRender";
import { useDebouncedInput } from "../../hooks/useDebouncedInput";
import Button from "../Buttons/Button";

function DataTableInner<T extends { id: number | string }>(
  {
    rows = [],
    columns,
    pageSize = 5,
    page,
    url,
    onRowClick,
    addAction,
    onDelete,
    onEdit,
  }: DataGridProps<T>,
  ref: React.Ref<DataTableRef>
) {
  const { value, debouncedValue, handleChange } = useDebouncedInput("", 500);

  const { data, loading, error, refetch } = useFetch<T[]>(
    `${url}?search=${debouncedValue}`
  );

  const tableData: T[] = data && data.length !== 0 ? data : rows;
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(page ? page : 1);

  const totalPages = Math.ceil(tableData?.length / pageSize);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentPageRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return tableData.slice(start, start + pageSize);
  }, [tableData, currentPage, pageSize]);

  const sortedRows = useMemo(() => {
    if (!sortField) return currentPageRows;

    return [...currentPageRows].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [currentPageRows, sortField, sortDirection]);

  const paginatedRows = sortedRows;

  const handleSort = (field: keyof T, sortable?: boolean) => {
    if (sortable === false) return;

    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      refetch,
    }),
    [refetch]
  );

  return (
    <div className={style.data_grid_container}>
      <div
        className={`${style.search_field} ${
          addAction ? style.search_field_withAction : ""
        }`}>
        <FieldRender
          fieldType="text"
          value={value}
          onChange={handleChange}
          placeholder="Search..."
          className={addAction ? style.search_field_input : ""}
        />
        {addAction && (
          <Button type="button" onClick={addAction}>
            Add +
          </Button>
        )}
      </div>
      <div className={style.data_grid_wrapper}>
        <table className={style.data_grid}>
          <thead>
            <tr>
              {columns.map((column) => (
                <HeaderCell
                  key={String(column.field)}
                  column={column}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                  hasActions={!!(onDelete || onEdit)}
                />
              ))}
              {!!(onDelete || onEdit) && (
                <th className={style.actions_cell}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRow columns={columns} rowCount={pageSize} />
            ) : error ? (
              <ErrorData colSpan={columns?.length} onRetry={refetch} />
            ) : paginatedRows.length === 0 ? (
              <EmptyData
                colSpan={columns?.length}
                message="No data available"
              />
            ) : (
              paginatedRows.map((row) => (
                <DataRow
                  key={row.id}
                  row={row}
                  columns={columns}
                  onClick={onRowClick}
                  onDelete={onDelete}
                  onEdit={onEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={tableData?.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

const DataTable = forwardRef(DataTableInner) as <
  T extends { id: number | string }
>(
  props: DataGridProps<T> & { ref?: React.Ref<DataTableRef> }
) => ReturnType<typeof DataTableInner>;

export default DataTable;
