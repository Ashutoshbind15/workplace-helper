"use client";

import { useGetCallById } from "@/hooks/conferencing/calls";
import {
  StreamCall,
  StreamTheme,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
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
  const { mid, id } = params;
  const { call, isCallLoading } = useGetCallById(mid);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  useEffect(() => {
    if (!isCallLoading && call) {
      call.get();
    }

    return () => {
      if (!isCallLoading && call) {
        call.leave();
      }
    };
  }, [call, isCallLoading]);

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
