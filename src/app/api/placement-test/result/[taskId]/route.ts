import { NextResponse } from "next/server";

import { getPlacementTaskResult } from "@/lib/mockPlacementStore";

type Params = {
  params: Promise<{
    taskId: string;
  }>;
};

export async function GET(_: Request, { params }: Params) {
  const { taskId } = await params;
  const result = getPlacementTaskResult(taskId);

  if (!result) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }

  return NextResponse.json(result, { status: 200 });
}
