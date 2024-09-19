import { StreamChat } from "stream-chat";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_SECRET_KEY;

export const serverClient = StreamChat.getInstance(API_KEY!, API_SECRET!);
