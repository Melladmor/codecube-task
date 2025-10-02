import { forwardRef, useState } from "react";
import type { InputT } from "./type";
import style from "./style.module.css";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
type Props = InputT;

const PasswordInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      name,
      onChange,
      value,
      className,
      disabled,
      error,
      label,
      placeholder,
      required,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<"text" | "password">(
      "text"
    );

    const togglePassword = () =>
      setShowPassword((prev) => (prev === "password" ? "text" : "password"));

    return (
      <div className={`${className} ${style.input_group}`}>
        {label && (
          <label htmlFor={id}>
            {label} {required && "*"}
          </label>
        )}
        <div className={style.input_field_container}>
          <input
            id={id}
            name={name}
            type={showPassword}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref}
            required={required}
            className={style.input_field}
          />
          <div className={style.input_field_eye}>
            {showPassword === "text" ? (
              <FaRegEyeSlash onClick={togglePassword} />
            ) : (
              <FaRegEye onClick={togglePassword} />
            )}
          </div>
        </div>
        {error && <span className={style.error_input_field}>{error}</span>}
      </div>
    );
  }
);

export default PasswordInput;
