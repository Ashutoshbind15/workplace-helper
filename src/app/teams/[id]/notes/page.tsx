import dynamic from "next/dynamic";

const ClientWrapper = dynamic(() => import("./ClientWrapper"), {
  ssr: false,
});

const PageTemp = () => {
  return <ClientWrapper />;
};

export default PageTemp;
