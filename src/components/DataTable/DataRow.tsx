import { DataCell } from "./DataCell";
import type { DataRowProps } from "./type";
import style from "./style.module.css";
export function DataRow<T extends { id: number | string }>({
  row,
  columns,
  isSelected,
  checkboxSelection,
  onSelect,
  onClick,
}: DataRowProps<T>) {
  const handleRowClick = () => {
    if (onClick) onClick(row);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <tr className={isSelected ? "selected" : ""} onClick={handleRowClick}>
      {checkboxSelection && (
        <td className={style.checkbox_cell} onClick={handleCheckboxClick}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(row.id)}
          />
        </td>
      )}
      {columns.map((column) => (
        <DataCell key={String(column.field)} column={column} row={row} />
      ))}
    </tr>
  );
}
