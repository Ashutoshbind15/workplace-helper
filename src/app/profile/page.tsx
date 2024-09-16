import UserFetcher from "@/components/auth/UserFetcher";
import { getLucia } from "@/lib/auth";
import { isVerifiedEmail, validateRequest } from "@/lib/auth/validator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const isUserAndEmailVerified = await isVerifiedEmail();

  if (!isUserAndEmailVerified) {
    return redirect("/auth/login");
  }

  const { user } = await validateRequest();

  if (!user) {
    return <p>Unauthorized...</p>;
  }

  return (
    <>
      <h1>Welcome, {user.email}!</h1>
      <form action={logout}>
        <button>Sign out</button>
      </form>

      <Suspense>
        <UserFetcher />
      </Suspense>
    </>
  );
}

async function logout() {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const lucia = await getLucia();

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/auth/login?redirect=loggedout");
}
