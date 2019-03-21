import React, { ReactElement } from "react";

import "./Page.scss";

interface PageProps {
  children?: ReactElement;
}

function Page({ children }: PageProps) {
  return <div className="page">{children}</div>;
}

export default Page;
