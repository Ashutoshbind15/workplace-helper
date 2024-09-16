import { Button } from "@/components/ui/button";

const Setup = ({
  isCamOn,
  setIsCamOn,
  isMicOn,
  setIsMicOn,
  setisSetup,
}: any) => {
  return (
    <div>
      <Button onClick={() => setIsCamOn(!isCamOn)}>
        {isCamOn ? "Turn off camera" : "Turn on camera"}
      </Button>
      <Button onClick={() => setIsMicOn(!isMicOn)}>
        {isMicOn ? "Turn off mic" : "Turn on mic"}
      </Button>

      <Button
        onClick={() => {
          console.log("Joining room");
          setisSetup(true);
        }}
      >
        Join
      </Button>
    </div>
  );
};

export default Setup;
