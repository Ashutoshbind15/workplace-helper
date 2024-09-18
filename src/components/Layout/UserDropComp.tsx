"use client";

import { useUser } from "@/hooks/queries/user";
import Link from "next/link";

const UserDropComp = () => {
  const { userdata, isUserLoading, isUserError, userError } = useUser();

  const username = userdata?.email.split("@")[0];

  if (!userdata) {
    return <Link href={"/auth/login"}>Login</Link>;
  }

  return <div>{username}</div>;
};

export default UserDropComp;
