import React, { Suspense } from "react";
import PageSpinner from "../components/Spinner/PageSpinner";

const LazyWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="lazywarpper">
          <PageSpinner />
        </div>
      }>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
