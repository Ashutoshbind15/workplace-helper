import { UserDoc } from "@/db/models/User";
import { hash, verify } from "@node-rs/argon2";

export const validateUserPassword = async (user: UserDoc, password: string) => {
  const validPassword = await verify(user.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });

  return validPassword;
};

export const hashPassword = async (password: string) => {
  return await hash(password, {
    // recommended minimum parameters
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
};
