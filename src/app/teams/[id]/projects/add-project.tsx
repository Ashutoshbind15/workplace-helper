"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createProjectAction } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AddProjectFormSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Adding project..." : "Add project"}
    </Button>
  );
};

const AddProjectForm = ({ teamId }: { teamId: string }) => {
  const initState = {
    message: "",
  };

  const [state, resAction] = useFormState(createProjectAction, initState);

  return (
    <form action={resAction}>
      <Label htmlFor="title">Title</Label>
      <Input name="title" placeholder="Title" id="title" />

      <Label htmlFor="description">Description</Label>
      <Input name="description" placeholder="Description" id="description" />

      <Input type="hidden" name="teamId" value={teamId} />

      {state.message && <p>{state.message}</p>}

      <AddProjectFormSubmitButton />
    </form>
  );
};

export default AddProjectForm;
