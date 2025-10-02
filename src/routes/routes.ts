import type { RoutesI } from "./type";

import { lazy } from "react";

const Login = lazy(() => import("../pages/Auth/Login"));
const Products = lazy(() => import("../pages/Products/Products"));

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
    path: "/products",
    title: "Products",
    element: Products,
  },
];
