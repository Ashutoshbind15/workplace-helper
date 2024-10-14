"use client";

import { useTeam, useUser } from "@/hooks/queries/user";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  useCreateChatClient,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

// todo: use a custom implementation instead of the createchatclient hook to support loading in the userid before hand and avoiding errors till then

const tokenProvider = async () => {
  const { data } = await axios.get("/api/chat/token");
  return data.token;
};

function ChatComponent({ userdata, memIds, teamId }: any) {
  const [channel, setChannel] = useState<any>(null);

  const client = useCreateChatClient({
    apiKey: API_KEY!,
    tokenOrProvider: tokenProvider,
    userData: { id: userdata.id, name: userdata.email },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", teamId, {
      name: "Team Chat",
      members: memIds,
    });

    setChannel(channel);
  }, [client, memIds, teamId]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client}>
      {channel && (
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      )}
    </Chat>
  );
}

function UserInitializer() {
  return <div>Waiting for user data...</div>;
}

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { isUserError, isUserLoading, userError, userdata } = useUser();
  const { id: teamId } = params;
  const { isTeamError, isTeamLoading, teamError, teamdata } = useTeam(teamId);

  if (isUserLoading || isTeamLoading) return <div>Loading user data...</div>;
  if (isUserError || isTeamError)
    return <div>Error loading user data: {userError?.message}</div>;
  if (!userdata) return <UserInitializer />;
  if (!teamdata) return <div>Team not found</div>;

  return (
    <ChatComponent
      userdata={userdata}
      teamId={teamId}
      memIds={teamdata.members.map((mem: any) => mem.user._id)}
    />
  );
}
