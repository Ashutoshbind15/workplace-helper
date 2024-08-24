import { connectDB } from "@/db";
import { User } from "@/db/models/User";
import { lucia } from "@/lib/auth";
import { verify } from "@node-rs/argon2";
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
    </>
  );
}

async function emaillogin(formData: FormData) {
  "use server";
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

  await connectDB();

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  if (!password) {
    return {
      error: "Password is required",
    };
  }

  const validPassword = await verify(user.password_hash, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
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
  return redirect("/");
}
