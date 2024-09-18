"use client";

import dynamic from "next/dynamic";
const DynamicMain = dynamic(() => import("./components/Main"));

const Page = ({
  params,
}: {
  params: {
    mid: string;
    id: string;
  };
}) => {
  return <DynamicMain params={params} />;
};

export default Page;
