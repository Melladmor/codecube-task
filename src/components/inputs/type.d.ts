import { ChangeEventHandler, Ref } from "react";

export type InputT = {
  id?: string;
  name?: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export type TextAreaT = {
  id?: string;
  name?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  label?: string;
  type?: "text" | "password";
  placeholder?: string;
  ref?: Ref<HTMLTextAreaElement>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};
