"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "./searchmemberhook";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddMember = ({
  selectedUsers,
  setSelectedUsers,
}: {
  selectedUsers: string[];
  setSelectedUsers: any;
}) => {
  const [search, setSearch] = useState("");
  const searchValue = useDebounce(search, 500);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`/api/users?q=${searchValue}`);
      setUsers(response.data.users);
    };

    if (searchValue.length > 0) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchValue]);

  return (
    <div>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users"
      />
      <div className="max-h-48 overflow-y-auto">
        {users?.map((user: { id: string; email: string }) => (
          <div
            key={user.id}
            className="flex items-center py-2 px-4 border-y-2 border-slate-300 mb-2"
          >
            <div className="flex-1">{user.email}</div>

            {!selectedUsers.includes(user.id) ? (
              <Button
                type="button"
                onClick={() => {
                  setSelectedUsers([...selectedUsers, user.id]);
                }}
              >
                Add User
              </Button>
            ) : (
              <Button
                type="button"
                onClick={() => {
                  setSelectedUsers(
                    selectedUsers.filter((id: string) => id !== user.id)
                  );
                }}
              >
                Remove User
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMember;
