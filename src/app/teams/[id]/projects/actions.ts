"use server";

import { validateRequest } from "@/lib/auth/validator";
import { createProjectUseCase } from "@/use-cases/project";
import { isTeamAdminUseCase } from "@/use-cases/team";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createProjectAction = async (
  prevState: any,
  formData: FormData
) => {
  const { user } = await validateRequest();

  if (!user) {
    return {
      message: "You need to be logged in to add a project",
    };
  }

  const title = formData.get("title");
  const description = formData.get("description");
  const teamId = formData.get("teamId");
  const userid = user.id;

  const schema = z.object({
    title: z.string(),
    description: z.string(),
    teamId: z.string(),
    userid: z.string(),
  });

  const res = schema.safeParse({
    title: title,
    description: description,
    teamId: teamId,
    userid: userid,
  });

  if (!res.success) {
    return {
      message: "Invalid form data",
    };
  }

  try {
    await createProjectUseCase(
      res.data.title,
      res.data.description,
      res.data.teamId,
      res.data.userid
    );
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else if (typeof error === "string") {
      return {
        message: error,
      };
    }

    return {
      message: "An error occurred",
    };
  }

  revalidatePath(`/teams/${teamId}/projects`);

  return {
    message: "Project added",
  };
};
