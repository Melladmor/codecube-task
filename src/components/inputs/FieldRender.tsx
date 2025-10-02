import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import type { InputT } from "./type";

type FieldProps = InputT & {
  label?: string;
  fieldType: "text" | "password";
};

const FieldRender = ({ fieldType = "text", ...rest }: FieldProps) => {
  if (fieldType === "password") {
    return <PasswordInput {...rest} />;
  }
  return <TextInput {...rest} />;
};

export default FieldRender;
