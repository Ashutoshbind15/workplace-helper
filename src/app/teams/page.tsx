import { getTeamsUseCase } from "@/use-cases/team";
import { emptyAction } from "./_actions";
import AddTeamForm from "./_components/AddTeamForm";
import { validateRequest } from "@/lib/auth/validator";
import Link from "next/link";

const TeamPage = async () => {
  await emptyAction();

  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const teams = await getTeamsUseCase(user.id);

  return (
    <div>
      <AddTeamForm />

      <div>
        {teams.map((team) => (
          <div key={team.id}>
            <h1>{team.title}</h1>
            <p>{team.description}</p>

            <ul>
              {team?.members?.map((member: any) => (
                <li key={member?.user?.email}>
                  <p>{member?.user?.email}</p>
                  <p>{member?.role}</p>
                </li>
              ))}
            </ul>

            <Link href={`/teams/${team.id}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
