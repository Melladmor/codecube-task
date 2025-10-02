import type { ButtonT } from "./type";
import style from "./style.module.css";

const Button = ({
  id,
  children,
  className,
  disabled,
  error,
  type = "button",
  onClick,
  ...rest
}: ButtonT) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${style.button} ${className ? className : ""}`}
      {...rest}>
      {children}
    </button>
  );
};

export default Button;
