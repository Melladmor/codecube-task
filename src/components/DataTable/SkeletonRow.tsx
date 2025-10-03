import type { SkeletonRowProps } from "./type";
import style from "./style.module.css";

export function SkeletonRow<T>({ columns, rowCount = 5 }: SkeletonRowProps<T>) {
  return (
    <>
      {[...Array(rowCount)].map((_, index) => (
        <tr key={`skeleton-${index}`} className={style.skeleton_row}>
          {columns?.map((column) => (
            <td key={String(column.field)}>
              <div
                className={style.skeleton_text}
                style={{
                  width: column.width ? `${column.width * 0.8}px` : "80%",
                }}></div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
