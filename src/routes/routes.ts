import type { RoutesI } from "./type";

import { lazy } from "react";

const Login = lazy(() => import("../pages/Auth/Login"));
const User = lazy(() => import("../pages/User/User"));

export const routes: RoutesI[] = [
  {
    id: 1,
    path: "/login",
    title: "Login",
    element: Login,
    isPublic: true,
  },
  {
    id: 2,
    path: "/user",
    title: "User",
    element: User,
  },
];
