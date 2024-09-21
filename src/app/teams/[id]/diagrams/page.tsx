import dynamic from "next/dynamic";

// Since client components get prerenderd on server as well hence importing
// the excalidraw stuff dynamically with ssr false

const ClientWrapper = dynamic(
  async () => (await import("./ClientWrapper")).default,
  {
    ssr: false,
  }
);

export default function Page() {
  return <ClientWrapper />;
}
