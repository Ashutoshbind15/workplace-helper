import { Lucia } from "lucia";
import { getAdapter } from "./adapter";

export const getLucia = async () => {
  const adapter = await getAdapter();

  const lucia = new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        // set to `true` when using HTTPS
        secure: process.env.NODE_ENV === "production",
      },
    },
    getUserAttributes: (attr) => {
      return {
        email: attr.email,
      };
    },
  });

  return lucia;
};

export type LuciaType = Awaited<ReturnType<typeof getLucia>>;

declare module "lucia" {
  interface Register {
    Lucia: LuciaType;
    DatabaseUserAttributes: {
      email: string;
    };
  }
}
