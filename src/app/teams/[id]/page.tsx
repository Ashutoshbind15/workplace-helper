import { validateRequest } from "@/lib/auth/validator";
import {
  getTeamUseCase,
  isTeamAdminUseCase,
  isTeamMemberUseCase,
} from "@/use-cases/team";
import { emptyAction } from "../_actions";
import RoleChanger from "./_components/change-role-button";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  await emptyAction();

  const { user } = await validateRequest();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  if (!isTeamMemberUseCase(id, user.id)) {
    return {
      error: "Unauthorized",
    };
  }

  const team = await getTeamUseCase(id);
  const isTeamAdmin = await isTeamAdminUseCase(id, user.id);

  return (
    <div>
      <p>{team.title}</p>
      <p>{team.description}</p>

      <ul>
        {team.members.map(
          (member: {
            user: {
              email: string;
              _id: string;
            };
            role: string;
          }) => (
            <li key={member.user.email}>
              <p>{member.user.email}</p>
              <p>{member.role}</p>

              {isTeamAdmin && (
                <RoleChanger
                  member={JSON.parse(JSON.stringify(member))}
                  id={id}
                />
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Page;
