"use client";

import { Button } from "@/components/ui/button";
import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} from "agora-rtc-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Basics = ({
  isCamOn,
  isMicOn,
  setIsCamOn,
  setIsMicOn,
  meetingId,
}: {
  isCamOn: boolean;
  isMicOn: boolean;
  setIsCamOn: any;
  setIsMicOn: any;
  meetingId: string;
}) => {
  // Define state variables
  const [calling, setCalling] = useState(true);

  // prefs before joining the room

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(isMicOn);
  const { localCameraTrack } = useLocalCameraTrack(isCamOn);

  usePublish([localMicrophoneTrack, localCameraTrack]);
  const remoteUsers = useRemoteUsers();

  const rtr = useRouter();

  useJoin(
    {
      appid: process.env.NEXT_PUBLIC_AGORA_APP_ID as string,
      channel: "temp",
      token: process.env.NEXT_PUBLIC_TOKEN
        ? process.env.NEXT_PUBLIC_TOKEN
        : null,
    },
    calling
  );

  return (
    <>
      <div className="">
        <div className="">
          <div className="local-user-video">
            <LocalUser
              audioTrack={localMicrophoneTrack}
              cameraOn={isCamOn}
              micOn={isMicOn}
              videoTrack={localCameraTrack}
              cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
            >
              <samp className="user-name">You</samp>
            </LocalUser>
          </div>

          <div>
            {remoteUsers.map((user) => (
              <div className="remote-user-video" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                  className=""
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>

          <div className="left-control">
            <Button className="btn" onClick={() => setIsMicOn((a: any) => !a)}>
              {isMicOn ? "Mute" : "Unmute"}
            </Button>

            <Button className="btn" onClick={() => setIsCamOn((a: any) => !a)}>
              {isCamOn ? "Stop Video" : "Start Video"}
            </Button>
          </div>
          <Button
            onClick={() => {
              setCalling((a) => !a);
            }}
          >
            {calling ? <span>Leave Channel</span> : <span>Join Channel</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Basics;
