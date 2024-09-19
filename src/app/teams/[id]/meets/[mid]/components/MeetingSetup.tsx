import { Button } from "@/components/ui/button";
import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const MeetingSetup = ({ setIsSetupComplete }: any) => {
  const call = useCall();
  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  const { useParticipants, useParticipantCount } = useCallStateHooks();
  const participants = useParticipants();
  const pcount = useParticipantCount();

  useEffect(() => {
    if (call) {
      if (isMicCamToggled) {
        call.camera.disable();
        call.microphone.disable();
      } else {
        call.camera.enable();
        call.microphone.enable();
      }
    }
  }, [isMicCamToggled, call]);

  if (!call) return <p>Call not found...</p>;
  return (
    <div>
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <div className="my-6">
        <span>{pcount}</span>
      </div>

      <div className="my-3">
        {participants.map((p) => (
          <div key={p.userId}>
            <p>{p.name}</p>
            <p>
              {p.joinedAt ? "Joined at " + p.joinedAt.toString() : "Not joined"}
            </p>

            <p>{p.isSpeaking ? "Speaking" : "Not speaking"}</p>

            <p>
              {p.screenShareStream ? "Screen sharing" : "Not screen sharing"}
              ``
            </p>
          </div>
        ))}
      </div>

      <Button
        className=""
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
