"use client";
import { useUser } from "@/hooks/queries/user";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const tokenProvider = async () => {
  const response = await fetch("/api/conferencing/token");
  const data = await response.json();
  return data.token;
};

const fetchUsernameFromEmail = (email: string) => {
  return email.split("@")[0];
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [clientInitter, setClientInitter] = useState<StreamVideoClient>();
  const { userdata, isUserError, isUserLoading, userError } = useUser();

  useEffect(() => {
    if (!isUserLoading && !isUserError && userdata) {
      const client = new StreamVideoClient({
        apiKey: apiKey as string,
        user: {
          id: userdata?.id,
          name: fetchUsernameFromEmail(userdata?.email as string),
        },
        tokenProvider,
      });

      setClientInitter(client);

      return () => {
        client.disconnectUser();
        setClientInitter(undefined);
      };
    }
  }, [userdata, isUserError, isUserLoading]);

  if (!clientInitter) return <p>Loading initter...</p>;
  if (isUserError) return <p>{userError?.message}</p>;

  if (!userdata) {
    return <p>Not authenticated</p>;
  }

  return <StreamVideo client={clientInitter}>{children}</StreamVideo>;
};

export default Wrapper;
