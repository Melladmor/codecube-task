import { useMemo, useState } from "react";
import type { DataGridProps } from "./type";
import { HeaderCell } from "./HeaderCell";
import { DataRow } from "./DataRow";
import style from "./style.module.css";
import { Pagination } from "./Pagination";
function DataTable<T extends { id: number | string }>({
  rows,
  columns,
  pageSize = 5,
  checkboxSelection = false,
  onRowClick,
  onSelectionChange,
}: DataGridProps<T>) {
  const [sortField, setSortField] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<number | string>>(
    new Set()
  );

  const sortedRows = useMemo(() => {
    if (!sortField) return rows;

    return [...rows].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [rows, sortField, sortDirection]);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRows.slice(start, start + pageSize);
  }, [sortedRows, currentPage, pageSize]);

  const totalPages = Math.ceil(rows.length / pageSize);

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
      const selected = rows.filter((row) => newSelected.has(row.id));
      onSelectionChange(selected);
    }
  };

  const allSelected =
    paginatedRows.length > 0 &&
    paginatedRows.every((row) => selectedRows.has(row.id));

  return (
    <div className={style.data_grid_container}>
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
            {paginatedRows.map((row) => (
              <DataRow
                key={row.id}
                row={row}
                columns={columns}
                isSelected={selectedRows.has(row.id)}
                checkboxSelection={checkboxSelection}
                onSelect={handleSelectRow}
                onClick={onRowClick}
              />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={rows.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default DataTable;
