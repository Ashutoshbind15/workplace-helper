import { connectDB } from "@/db";
import { Team } from "@/db/models/Team";

export const createTeam = async (
  title: string,
  desc: string,
  userids: string[],
  adminid: string
) => {
  await connectDB();

  const team = await Team.create({
    title,
    description: desc,
    members: userids.map((id) => ({
      user: id,
      role: id === adminid ? "admin" : "member",
    })),
  });

  return team;
};

export const changeUserRole = async (
  teamid: string,
  userid: string,
  role: string
) => {
  await connectDB();

  await Team.updateOne(
    { _id: teamid, "members.user": userid },
    { $set: { "members.$.role": role } }
  );
};

export const isTeamAdmin = async (teamId: string, userId: string) => {
  await connectDB();

  const team = await Team.findOne({
    _id: teamId,
    "members.user": userId,
    "members.role": "admin",
  });

  return !!team;
};

export const getTeams = async (userId: string) => {
  await connectDB();

  const teams = await Team.find({ "members.user": userId }).populate([
    {
      path: "members",
      populate: {
        path: "user",
        select: "email",
      },
    },
  ]);

  return teams;
};

export const getTeam = async (teamId: string) => {
  await connectDB();

  const team = await Team.findById(teamId).populate([
    {
      path: "members",
      populate: {
        path: "user",
        select: "email",
      },
    },
  ]);

  return team;
};

export const isTeamMember = async (teamId: string, userId: string) => {
  await connectDB();

  const team = await Team.findOne({
    _id: teamId,
    "members.user": userId,
  });

  return !!team;
};
