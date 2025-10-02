import React, { Suspense } from "react";

const LazyWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default LazyWrapper;
