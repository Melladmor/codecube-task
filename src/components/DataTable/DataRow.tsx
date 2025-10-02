// DataRow.tsx
import { DataCell } from "./DataCell";
import type { DataRowProps } from "./type";
import style from "./style.module.css";
import { MdDelete, MdEdit } from "react-icons/md";

export function DataRow<T extends { id: number | string }>({
  row,
  columns,
  isSelected,
  checkboxSelection,
  onSelect,
  onClick,
  onEdit,
  onDelete,
}: DataRowProps<T>) {
  const hasActions = onEdit || onDelete;

  const handleRowClick = () => {
    if (onClick) onClick(row);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(row);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) onDelete(row);
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
      {hasActions && (
        <td className={style.actions_cell} onClick={handleActionClick}>
          <div className={style.actions_buttons}>
            {onEdit && (
              <button
                onClick={handleEdit}
                className={style.action_button}
                title="Edit">
                <MdEdit size={16} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={handleDelete}
                className={style.action_button_delete}
                title="Delete">
                <MdDelete size={16} />
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );
}
