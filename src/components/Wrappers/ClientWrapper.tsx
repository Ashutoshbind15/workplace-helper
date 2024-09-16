"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";

// dynamic import the videowrapper

const VideoWrapper = dynamic(() => import("./VideoWrapper"), { ssr: false });

const queryClient = new QueryClient();

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <VideoWrapper>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </VideoWrapper>
    </QueryClientProvider>
  );
};

export default ClientWrapper;
