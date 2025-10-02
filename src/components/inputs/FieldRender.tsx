import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";
import TextAreaInput from "./TextAreaInput";
import type { InputT, TextAreaT } from "./type";

type FieldProps =
  | ((InputT & { fieldType: "text" }) | { fieldType: "number" })
  | (InputT & { fieldType: "password" })
  | (TextAreaT & { fieldType: "textarea" });

const FieldRender = (props: FieldProps) => {
  const { fieldType, ...rest } = props as any;

  switch (fieldType) {
    case "password":
      return <PasswordInput {...(rest as InputT)} />;
    case "textarea":
      return <TextAreaInput {...(rest as TextAreaT)} />;
    case "number":
      return <TextInput {...(rest as InputT)} type="number" />;
    default:
      return <TextInput {...(rest as InputT)} />;
  }
};

export default FieldRender;
