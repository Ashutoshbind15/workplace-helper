import { Button } from "@/components/ui/button";
import { DeviceSettings, useCall } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const MeetingSetup = ({ setIsSetupComplete }: any) => {
  const call = useCall();

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [isMicCamToggled, call.camera, call.microphone]);

  if (!call) return <p>Loading...</p>;
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
