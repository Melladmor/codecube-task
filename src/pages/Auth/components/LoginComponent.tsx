import { useMemo, useState } from "react";
import FieldRender from "../../../components/inputs/FieldRender";
import style from "./style.module.css";
import Button from "../../../components/Buttons/Button";
import {
  setLocalStorageItem,
  validatePassword,
  validateUsername,
} from "../../../utils";
import { useAuth } from "../../../hooks/useAuth";
import type { UserT } from "./type";
import { useNavigate } from "react-router-dom";
import { useToaster } from "../../../context/ToasterProvider";
import Spinner from "../../../components/Spinner/Spinner";
type LoginVaule = {
  username: string;
  password: string;
};

type LoginErrors = { username?: string; password?: string };

const LoginComponent = () => {
  const { loading, success, data, error, getData } = useAuth<UserT[]>();
  const toaster = useToaster();
  const navigate = useNavigate();
  const [loginValues, setLoginValues] = useState<LoginVaule>({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginErrors>({
    username: "",
    password: "",
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;
    setLoginValues((prev: LoginVaule) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "username")
      setErrors((prev) => ({ ...prev, username: validateUsername(value) }));
    if (name === "password")
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
  };

  const validateAll = () => {
    const userErr = validateUsername(loginValues.username);
    const passErr = validatePassword(loginValues.password);
    setErrors((prev) => ({ ...prev, username: userErr, password: passErr }));
    return !userErr && !passErr;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors((prev) => ({ ...prev }));
    if (!validateAll()) return;
    await getData("users");
  };
  const handleAuthRedirection = () => {
    if (data) {
      const result = data.find(
        (user: UserT) =>
          user.username === loginValues.username &&
          user.password === loginValues.password
      );
      if (success && result) {
        setLocalStorageItem("token", result?.token);
        setLocalStorageItem("user", result);
        toaster("Login Success", "success");
        navigate("/products", { replace: true });
      } else {
        toaster("Invalid credentials", "error");
      }
    }
  };

  useMemo(() => {
    if (data && success) {
      handleAuthRedirection();
    }
  }, [data, success, error]);

  return (
    <form className={style.login_container} onSubmit={handleSubmit}>
      <h1 className={style.login_title}>Welcome Back</h1>

      <div className={style.inputs_conatiner}>
        <FieldRender
          fieldType="text"
          label="User Name"
          placeholder="Enter User Name"
          id="username"
          name="username"
          value={loginValues?.username}
          onChange={handleOnchange}
          error={errors?.username}
        />

        <FieldRender
          fieldType="password"
          label="Password"
          placeholder="Enter Your Password"
          id="password"
          name="password"
          value={loginValues?.password}
          onChange={handleOnchange}
          error={errors?.password}
        />
        <Button type="submit" disabled={loading} className={style.form_button}>
          {loading ? <Spinner /> : "Login"}
        </Button>
      </div>
    </form>
  );
};

export default LoginComponent;
