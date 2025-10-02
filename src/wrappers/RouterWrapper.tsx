import React from "react";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import LazyWrapper from "./LazyWrapper";

type Props = {
  route: React.ReactNode;
  isPublic?: boolean;
};

const RouterWrapper = ({ route, isPublic }: Props) => {
  const wrapped = <LazyWrapper>{route}</LazyWrapper>;

  return isPublic ? (
    <PublicRoute>{wrapped}</PublicRoute>
  ) : (
    <ProtectedRoute>{wrapped}</ProtectedRoute>
  );
};

export default RouterWrapper;
