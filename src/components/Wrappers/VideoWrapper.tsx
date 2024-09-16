"use client";

import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";

const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

const VideoWrapper = ({ children }: { children: React.ReactNode }) => {
  return <AgoraRTCProvider client={client}>{children}</AgoraRTCProvider>;
};

export default VideoWrapper;
