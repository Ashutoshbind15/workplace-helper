import { connectDB } from "@/db";
import { User } from "@/db/models/User";

export const findUserByEmail = async (email: string) => {
  await connectDB();

  const user = await User.findOne({
    email,
  });

  return user;
};

export const createUser = async (
  email: string,
  hashedPassword: string,
  id: string
) => {
  await connectDB();

  await User.create({
    _id: id,
    email,
    password_hash: hashedPassword,
  });
};
