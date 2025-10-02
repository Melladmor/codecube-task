import { forwardRef } from "react";
import type { InputT } from "./type";
import style from "./style.module.css";
type Props = InputT;

const TextInput = forwardRef<HTMLInputElement, Props>(
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
    return (
      <div className={`${className} ${style.input_group}`}>
        {label && (
          <label htmlFor={id}>
            {label} {required && "*"}
          </label>
        )}
        <input
          id={id}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          required={required}
          className={style.input_field}
        />
        {error && <span className={style.error_input_field}>{error}</span>}
      </div>
    );
  }
);

export default TextInput;
