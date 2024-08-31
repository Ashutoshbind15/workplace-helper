import { validateRequest } from "@/lib/auth/validator";
import {
  getTeamUseCase,
  isTeamAdminUseCase,
  isTeamMemberUseCase,
} from "@/use-cases/team";
import RoleChanger from "./_components/change-role-button";
import { Button } from "@/components/ui/button";
import { SettingsIcon, ViewIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import AddProjectForm from "./projects/add-project";
import SideNav from "./_components/SideNav";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) => {
  const { id } = params;
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
    <>
      <div className="flex px-2 py-2 border-b-2 border-slate-500 items-center justify-between">
        <div>
          <p className="text-lg font-bold mb-3">{team.title}</p>
          <p className="font-light">{team.description}</p>
        </div>
        <div className="flex items-center gap-x-2">
          {isTeamAdmin && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>New Project</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new Project</DialogTitle>
                  <DialogDescription>
                    Team Admins can add in new projects...
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <AddProjectForm teamId={id} />
                </div>
              </DialogContent>
            </Dialog>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button>{isTeamAdmin ? <SettingsIcon /> : <ViewIcon />}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Team Members</DialogTitle>
                <DialogDescription>
                  The members present in the team
                </DialogDescription>
              </DialogHeader>

              <ul>
                {team.members.map(
                  (member: {
                    user: {
                      email: string;
                      _id: string;
                    };
                    role: string;
                  }) => (
                    <li
                      key={member.user.email}
                      className="flex items-center mb-1 py-2 border-y-2 border-slate-200"
                    >
                      <div className="flex-1">
                        <p className="font-semibold">{member.user.email}</p>
                        <p>{member.role}</p>
                      </div>
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
        <SideNav id={id} />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
};

export default Layout;
