"use client";

import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/conferencing/calls";
import { useUser } from "@/hooks/queries/user";
import { useStreamVideoClient, CallState } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

const MeetPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const { id } = params;
  const { userdata: user, isUserError, isUserLoading, userError } = useUser();
  const { call } = useGetCallById(id);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", id);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/teams/${id}/meets/${id}?team=true`);
  };

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
