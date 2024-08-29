import { validateRequest } from "@/lib/auth/validator";
import {
  getTeamUseCase,
  isTeamAdminUseCase,
  isTeamMemberUseCase,
} from "@/use-cases/team";
import { emptyAction } from "../_actions";
import RoleChanger from "./_components/change-role-button";
import { Button } from "@/components/ui/button";
import { GroupIcon, SettingsIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  console.log(user.id, id, isTeamAdmin);

  return (
    <div>
      <div className="flex px-2 py-2 border-b-2 border-black items-center justify-between">
        <div>
          <p className="text-lg font-bold mb-3">{team.title}</p>
          <p className="font-light">{team.description}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Button>New Project</Button>
          <Button>
            <SettingsIcon />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <GroupIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Team Members</DialogHeader>

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
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex">
        <div className="h-screen px-2 border-r-black"></div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Page;
