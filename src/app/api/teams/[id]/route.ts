import { validateRequest } from "@/lib/auth/validator";
import { getTeamUseCase } from "@/use-cases/team";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const team = await getTeamUseCase(params.id);

  return NextResponse.json(team, { status: 200 });
};
