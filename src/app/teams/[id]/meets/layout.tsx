"use client";

import dynamic from "next/dynamic";

const DynamicWrapper = dynamic(() => import("./components/VideoWrapper"));
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <DynamicWrapper>{children}</DynamicWrapper>;
};

export default Layout;
