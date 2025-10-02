import style from "./style.module.css";
import type { Toast } from "./type";

type Props = {
  toasts: Toast[];
};
const Toaster = ({ toasts }: Props) => {
  return (
    <div className={style.toaster_container}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${style.toast} ${style[toast.type || "info"]}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toaster;
