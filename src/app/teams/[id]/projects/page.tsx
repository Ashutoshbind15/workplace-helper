import { validateRequest } from "@/lib/auth/validator";
import { getProjectsUseCase } from "@/use-cases/project";
import ProjectCard from "./project-card";

const ProjectPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { id } = params;
  const { user } = await validateRequest();

  if (!user) {
    return "Unauthorized";
  }

  let projects;

  try {
    projects = await getProjectsUseCase(user.id, id);
  } catch (error) {
    return "Error fetching projects";
  }

  return (
    <div>
      <h1>Projects</h1>

      {projects.map((project: any) => {
        return <ProjectCard key={project.id} project={project} />;
      })}
    </div>
  );
};

export default ProjectPage;
