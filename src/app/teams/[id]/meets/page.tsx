"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MeetPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();

  const startRoom = async () => {};

  return (
    <div>
      <h1>Team Meetings</h1>

      <Button
        onClick={() => {
          startRoom();
        }}
      >
        Start Team Meeting
      </Button>
    </div>
  );
};

export default MeetPage;
