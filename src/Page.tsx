import React, { ReactElement } from "react";

import "./Page.scss";

interface PageProps {
  className?: string;
  children?: ReactElement;
}

function Page({ className, children }: PageProps) {
  return (
    <div className={`page${className ? ` ${className}` : ""}`}>{children}</div>
  );
}

export default Page;
