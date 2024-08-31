import { connectDB } from "@/db";
import { Project } from "@/db/models/Project";
import { User } from "@/db/models/User";

export const getProjects = async (userId: string, teamId: string) => {
  await connectDB();

  const projects = await Project.find({
    teamid: teamId,
  }).populate([
    {
      path: "members",
      select: "email",
      model: User,
    },
  ]);

  if (!projects || !projects.length) {
    return [];
  }

  const projectDTO = projects.map((project) => {
    return {
      id: JSON.parse(JSON.stringify(project._id)),
      title: project.title,
      description: project.description,
      members: project.members,
      teamId: JSON.parse(JSON.stringify(project.teamid)),
    };
  });

  return projectDTO;
};

export const createProject = async (
  title: string,
  description: string,
  teamId: string
) => {
  await connectDB();
  const project = new Project({
    title,
    description,
    teamid: teamId,
  });
  await project.save();
  return project;
};
