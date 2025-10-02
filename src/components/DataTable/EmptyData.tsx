import style from "./style.module.css";
import type { EmptyDataProps } from "./type";

export function EmptyData({
  colSpan,
  message = "No data available",
}: EmptyDataProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={style.empty_cell}>
        <div className={style.empty_content}>
          <span>{message}</span>
        </div>
      </td>
    </tr>
  );
}
