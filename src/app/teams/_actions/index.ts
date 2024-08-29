"use server";

import { validateRequest } from "@/lib/auth/validator";
import {
  changeUserRoleUseCase,
  createTeamUseCase,
  isTeamAdminUseCase,
} from "@/use-cases/team";
import { revalidatePath } from "next/cache";

export const emptyAction = async () => {};

export const addTeamAction = async (
  title: string,
  description: string,
  members: string[]
) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const curruid = user.id;
  members.push(curruid);

  await createTeamUseCase(title, description, members, curruid);
  revalidatePath("/teams");
};

export const changeUserRoleAction = async (
  teamid: string,
  userid: string,
  role: string
) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const isAdmin = await isTeamAdminUseCase(teamid, user.id);

  if (!isAdmin) {
    return {
      error: "You are not allowed to change user role",
    };
  }

  await changeUserRoleUseCase(user.id, teamid, userid, role);
  revalidatePath(`/teams/${teamid}`);
  revalidatePath("/teams");
};
