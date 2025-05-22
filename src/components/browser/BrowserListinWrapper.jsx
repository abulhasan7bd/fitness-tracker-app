import React, { lazy, Suspense } from "react";
import Loading from "../../pages/Loading";

const List = lazy(() => import("./List"));
const BrowserListinWrapper = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <List />
      </Suspense>
    </div>
  );
};

export default BrowserListinWrapper;
