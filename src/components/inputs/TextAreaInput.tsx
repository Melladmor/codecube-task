import { forwardRef } from "react";
import type { TextAreaT } from "./type";
import style from "./style.module.css";

type Props = TextAreaT & {
  rows?: number;
  cols?: number;
};

const TextAreaInput = forwardRef<HTMLTextAreaElement, Props>(
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
      rows = 4,
      cols,
    },
    ref
  ) => {
    return (
      <div className={`${className ? className : ""} ${style.input_group}`}>
        {label && (
          <label htmlFor={id}>
            {label} {required && "*"}
          </label>
        )}
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          ref={ref}
          required={required}
          rows={rows}
          cols={cols}
          className={style.input_field}
        />
        {error && <span className={style.error_input_field}>{error}</span>}
      </div>
    );
  }
);

export default TextAreaInput;
