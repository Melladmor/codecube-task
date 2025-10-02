import style from "./style.module.css";
import type { ErrorDataProps } from "./type";

export function ErrorData({ colSpan, onRetry }: ErrorDataProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={style.error_cell}>
        <div className={style.error_content}>
          <span className={style.error_message}>Something went wrong</span>
          {onRetry && (
            <button onClick={onRetry} className={style.retry_button}>
              Try Again
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
