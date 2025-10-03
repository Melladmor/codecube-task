import type { HeaderCellProps } from "./type";
import style from "./style.module.css";
import { FaSort } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
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
          <div>{column.headerName}</div>
          {isSortable && (
            <div className={style.sort_icon}>
              {isActive ? (
                sortDirection === "asc" ? (
                  <TiArrowSortedUp size={16} />
                ) : (
                  <TiArrowSortedDown size={16} />
                )
              ) : (
                <FaSort size={16} />
              )}
            </div>
          )}
        </div>
      </th>
      {hasActions && column.field === Object.keys(column)[0] && (
        <th className={style.actions_cell}>Actions</th>
      )}
    </>
  );
}
