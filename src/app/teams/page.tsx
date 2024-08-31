import { getTeamsUseCase } from "@/use-cases/team";
import { emptyAction } from "./_actions";
import AddTeamForm from "./_components/AddTeamForm";
import { validateRequest } from "@/lib/auth/validator";
import TeamCard from "./_components/TeamCard";

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
    <div className="flex items-center flex-col pt-4">
      <div
        className="flex flex-wrap
       gap-4 items-center justify-around mb-4"
      >
        {teams.map((team: any) => (
          <TeamCard team={JSON.parse(JSON.stringify(team))} key={team.id} />
        ))}
      </div>
      <AddTeamForm />
    </div>
  );
};

export default TeamPage;
