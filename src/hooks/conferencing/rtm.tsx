"use client";

import { createClient, createChannel, RtmMessage } from "agora-rtm-react";

export const useAgoraRTM = (channelName = "temp") => {
  const agoraAppId = process.env.NEXT_PUBLIC_AGORA_APP_ID;

  const useClient = createClient(agoraAppId!);
  const useChannel = createChannel(channelName);

  const client = useClient();
  const channel = useChannel(client);

  const login = async (uid: string) => {
    await client.login({
      uid: uid,
    });
    await channel.join();
  };

  const sendMsg = async (text: string) => {
    const message = client.createMessage({ text, messageType: "TEXT" });
    await channel.sendMessage(message);
  };

  return {
    client,
    channel,
    login,
    sendMsg,
  };
};
