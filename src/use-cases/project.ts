import { createProject, getProjects } from "@/db-access/project";
import { isTeamAdminUseCase, isTeamMemberUseCase } from "./team";

export const getProjectsUseCase = async (userid: string, teamId: string) => {
  // todo: check if user is a member of the team and return projects in which the user is a member

  const isMember = await isTeamMemberUseCase(teamId, userid);

  if (!isMember) {
    throw new Error("Unauthorized");
  }

  return await getProjects(userid, teamId);
};

export const createProjectUseCase = async (
  title: string,
  description: string,
  teamId: string,
  userid: string
) => {
  const isTeamAdmin = await isTeamAdminUseCase(teamId, userid);

  if (!isTeamAdmin) {
    throw new Error("Unauthorized");
  }

  await createProject(title, description, teamId);
};
