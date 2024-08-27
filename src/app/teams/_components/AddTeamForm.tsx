"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import AddMember from "./AddMember";
import { addTeamAction } from "../_actions";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AddTeamForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>AddTeamForm</CardTitle>
        </CardHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await addTeamAction(title, description, members);
            setDescription("");
            setTitle("");
            setMembers([]);
          }}
        >
          <CardContent>
            <Label htmlFor="title">Title</Label>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
            />

            <Label htmlFor="description">Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
            />

            <AddMember selectedUsers={members} setSelectedUsers={setMembers} />
          </CardContent>
          <CardFooter>
            <Button type="submit">Add Team</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddTeamForm;
