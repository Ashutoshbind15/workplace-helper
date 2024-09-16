"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Basics from "./[mid]/components/Basics";

const MeetPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const router = useRouter();

  return (
    <div>
      <Button
        onClick={() => {
          router.push(`/teams/${params.id}/meets/${params.id}`);
        }}
      >
        Join team meeting
      </Button>
    </div>
  );
};

export default MeetPage;
