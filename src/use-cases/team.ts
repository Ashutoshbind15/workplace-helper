import {
  changeUserRole,
  createTeam,
  getTeam,
  getTeams,
  isTeamAdmin,
  isTeamMember,
} from "@/db-access/team";

export const changeUserRoleUseCase = async (
  cuserid: string,
  teamid: string,
  userid: string,
  role: string
) => {
  const isAdmin = await isTeamAdmin(teamid, cuserid);

  if (!isAdmin) {
    throw new Error("You are not allowed to change user role");
  }

  await changeUserRole(teamid, userid, role);
};

export const createTeamUseCase = async (
  title: string,
  desc: string,
  userids: string[],
  adminid: string
) => {
  const team = await createTeam(title, desc, userids, adminid);

  return {
    id: team._id,
    title: team.title,
    description: team.description,
    members: team.members,
  };
};

export const getTeamsUseCase = async (userId: string) => {
  const teams = await getTeams(userId);

  return teams.map((team) => ({
    id: team._id,
    title: team.title,
    description: team.description,
    members: team.members,
  }));
};

export const getTeamUseCase = async (teamId: string) => {
  const team = await getTeam(teamId);

  return {
    id: JSON.parse(JSON.stringify(team._id)),
    title: team.title,
    description: team.description,
    members: team.members,
  };
};

export const isTeamAdminUseCase = async (teamId: string, userId: string) => {
  return isTeamAdmin(teamId, userId);
};

export const isTeamMemberUseCase = async (teamId: string, userId: string) => {
  return isTeamMember(teamId, userId);
};
