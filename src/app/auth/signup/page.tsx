import { getLucia } from "@/lib/auth";
import { createNewUser } from "@/use-cases/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  return (
    <>
      <h1>Create an account</h1>
      <form action={emailsignup}>
        <label htmlFor="email">email</label>
        <input name="email" id="email" type="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}

async function emailsignup(formData: FormData) {
  "use server";

  const lucia = await getLucia();

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

  const userId = await createNewUser(email, password);

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/");
}
