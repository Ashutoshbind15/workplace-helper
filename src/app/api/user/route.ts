import { User } from "@/db/models/User";
import { validateRequest } from "@/lib/auth/validator";
import { NextResponse } from "next/server";

export const GET = async () => {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uid = user.id;

  const dbUser = await User.findById(uid).select("-password");

  return NextResponse.json({
    id: dbUser._id,
    email: dbUser.email,
  });
};
