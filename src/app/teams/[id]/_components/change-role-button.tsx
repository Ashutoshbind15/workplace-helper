"use client";

import { Button } from "@/components/ui/button";
import { changeUserRoleAction } from "../../_actions";

const RoleChanger = ({
  member,
  id,
}: {
  member: {
    user: {
      _id: string;
    };
    role: string;
  };
  id: string;
}) => {
  return (
    <Button
      onClick={async () => {
        if (member.role === "manager") {
          await changeUserRoleAction(id, member.user._id, "member");
        } else {
          await changeUserRoleAction(id, member.user._id, "manager");
        }
      }}
    >
      Change Role
    </Button>
  );
};

export default RoleChanger;
