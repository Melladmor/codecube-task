import type { HeaderCellProps } from "./type";
import style from "./style.module.css";
export function HeaderCell<T>({
  column,
  sortField,
  sortDirection,
  onSort,
  hasActions,
}: HeaderCellProps<T>) {
  const isSortable = column.sortable !== false;
  const isActive = sortField === column.field;

  return (
    <>
      <th
        style={{ width: column.width }}
        className={isSortable ? "sortable" : ""}
        onClick={() => onSort(column.field, column.sortable)}>
        <div className={style.header_content}>
          <span>{column.headerName}</span>
          {isSortable && (
            <span className={style.sort_icon}>
              {isActive ? (sortDirection === "asc" ? "▲" : "▼") : "⇅"}
            </span>
          )}
        </div>
      </th>
      {hasActions && column.field === Object.keys(column)[0] && (
        <th className={style.actions_cell}>Actions</th>
      )}
    </>
  );
}
