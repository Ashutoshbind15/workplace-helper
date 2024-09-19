import { NextRequest, NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth/validator";
import { serverClient } from "@/lib/conferencing/stream";

export const GET = async (req: NextRequest) => {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const uid = user.id;
  const token = serverClient.createToken(uid);

  return NextResponse.json({ token }, { status: 200 });
};
