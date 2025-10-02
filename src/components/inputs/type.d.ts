import { ChangeEventHandler, Ref } from "react";

export type InputT = {
  id: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  type?: "text" | "password";
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};
