import type { Column } from "./type";

export function DataCell<T>({ column, row }: { column: Column<T>; row: T }) {
  const value = row[column?.field];

  return (
    <td>
      {column.renderCell ? column.renderCell({ row, value }) : String(value)}
    </td>
  );
}
