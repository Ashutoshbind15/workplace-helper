"use client";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useEffect, useRef, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const clientsidetoken = process.env.NEXT_PUBLIC_STREAM_CLIENT_TOKEN;

const userId = "Padm__Amidala";
const user: User = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const [clientInitter, setClientInitter] = useState<StreamVideoClient>();

  useEffect(() => {
    const client = new StreamVideoClient({
      apiKey: apiKey as string,
      user,
      token: clientsidetoken as string,
    });

    setClientInitter(client);
  }, []);

  if (!clientInitter) return <p>Loading initter...</p>;

  return <StreamVideo client={clientInitter}>{children}</StreamVideo>;
};

export default Wrapper;
