import UserFetcher from "@/components/auth/UserFetcher";
import { getLucia } from "@/lib/auth";
import { validateUserPassword } from "@/lib/auth/utils";
import { getUser } from "@/use-cases/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <form action={emaillogin}>
        <label htmlFor="email">email</label>
        <input name="email" id="email" type="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>

      <UserFetcher />
    </>
  );
}

async function emaillogin(formData: FormData) {
  "use server";

  const lucia = await getLucia();

  // todo: use some validation library

  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || typeof email !== "string") {
    return new Response("Invalid email", {
      status: 400,
    });
  }

  if (!password || typeof password !== "string") {
    return new Response("Invalid password", {
      status: 400,
    });
  }

  const user = await getUser(email);

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const validPassword = await validateUserPassword(user, password);
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/profile?redirect=loggedin");
}
