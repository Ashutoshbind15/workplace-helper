import { validateRequest } from "@/lib/auth/validator";
import { getProjectsUseCase } from "@/use-cases/project";
import AddProjectForm from "./add-project";

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
    console.log(projects);
  } catch (error) {
    return "Error fetching projects";
  }

  return (
    <div>
      <AddProjectForm teamId={id} />

      <h1>Projects</h1>

      {projects.map((project: any) => {
        return (
          <div key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectPage;
