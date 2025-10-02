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
type LoginVaule = {
  username: string;
  password: string;
};

type LoginErrors = { username?: string; password?: string };

const LoginComponent = () => {
  const { loading, success, data, getData } = useAuth<UserT[]>();

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
      console.log(data);
      if (success && result) {
        setLocalStorageItem("token", result?.token);
        setLocalStorageItem("user", result);

        navigate("/user", { replace: true });
      } else {
        console.log("Invalid credentials");
      }
    }
  };

  useMemo(() => {
    if (data) {
      handleAuthRedirection();
    }
  }, [data]);

  return (
    <form className={style.login_container} onSubmit={handleSubmit}>
      <h1 className={style.login_title}>Welcome Back</h1>

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

      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginComponent;
