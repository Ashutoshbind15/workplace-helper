"use client";

import { useGetCallById } from "@/hooks/conferencing/calls";
import {
  CallingState,
  StreamCall,
  StreamTheme,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import MeetingSetup from "./MeetingSetup";
import MeetingRoom from "./MeetingRoom";

const Main = ({
  params,
}: {
  params: {
    mid: string;
    id: string;
  };
}) => {
  const callId = "JCLyYFY59w31";
  const { call, isCallLoading } = useGetCallById(callId);
  const { mid, id } = params;
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (isCallLoading) return <p>Loading ...</p>;

  return (
    <div>
      <p>Team: {id}</p>
      <p>Meet: {mid}</p>

      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
};

export default Main;
