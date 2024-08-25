import { createUser, findUserByEmail } from "@/db-access/user";
import { generateEmailVerificationCode } from "@/lib/auth/emailAuth";
import { hashPassword } from "@/lib/auth/utils";
import { mailSender } from "@/lib/email";
import { generateIdFromEntropySize } from "lucia";

export const isUserWithEmailExists = async (email: string) => {
  const user = await findUserByEmail(email);
  if (!user) return false;
  return user;
};

export const getUser = async (email: string) => {
  return await findUserByEmail(email);
};

export const createNewUser = async (email: string, password: string) => {
  const doesUserExist = await isUserWithEmailExists(email);

  if (doesUserExist) {
    throw new Error("User already exists");
  }

  const passwordHash = await hashPassword(password);
  const userId = generateIdFromEntropySize(10); // 16 characters long

  await createUser(email, passwordHash, userId);

  const code = await generateEmailVerificationCode(userId, email);
  const name = email.split("@")[0];
  await mailSender(code, "Verify your email", email);

  return userId;
};
