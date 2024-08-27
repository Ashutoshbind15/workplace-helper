import { connectDB } from "@/db";
import { User } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("q");

  await connectDB();

  const users = await User.find({
    email: { $regex: query, $options: "i" },
  }).limit(10);

  return NextResponse.json({
    users: users.map((user) => ({
      email: user.email,
      id: user._id,
    })),
  });
};
