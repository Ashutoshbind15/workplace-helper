import { StreamClient } from "@stream-io/node-sdk";

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_SECRET_KEY;

export const client = new StreamClient(API_KEY!, API_SECRET!);
