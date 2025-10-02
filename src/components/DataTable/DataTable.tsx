import { useMemo, useState } from "react";
import type { DataGridProps } from "./type";
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
import { useNavigate } from "react-router-dom";

function DataTable<T extends { id: number | string }>({
  rows = [],
  columns,
  pageSize = 5,
  page,
  url,
  checkboxSelection = false,
  onRowClick,
  onSelectionChange,
  addAction,
}: DataGridProps<T>) {
  const { value, debouncedValue, handleChange } = useDebouncedInput("", 500);
  const { data, loading, error, refetch } = useFetch<T[]>(
    `${url}?search=${debouncedValue}`
  );
  const tableData: T[] = data && data.length !== 0 ? data : rows;

  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(page ? page : 1);
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );

  const totalPages = Math.ceil(tableData?.length / pageSize);

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

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(new Set(paginatedRows.map((row) => row.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id: number | string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);

    if (onSelectionChange) {
      const selected = tableData?.filter((row) => newSelected.has(row.id));
      onSelectionChange(selected);
    }
  };

  const allSelected =
    paginatedRows.length > 0 &&
    paginatedRows.every((row) => selectedRows.has(row.id));

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
              {checkboxSelection && (
                <th className={style.checkbox_cell}>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <HeaderCell
                  key={String(column.field)}
                  column={column}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRow
                columns={columns}
                checkboxSelection={checkboxSelection}
                rowCount={pageSize}
              />
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
                  isSelected={selectedRows.has(row.id)}
                  checkboxSelection={checkboxSelection}
                  onSelect={handleSelectRow}
                  onClick={onRowClick}
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

export default DataTable;
