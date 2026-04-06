import { NextResponse } from "next/server";

import { createPlacementTask } from "@/lib/mockPlacementStore";
import type { PlacementAnswer, PlacementSubmitResponse } from "@/types/placement";

type SubmitBody = {
  answers?: PlacementAnswer[];
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitBody;

    if (!Array.isArray(body.answers) || body.answers.length === 0) {
      return NextResponse.json(
        { error: "Answers are required." },
        { status: 400 },
      );
    }

    const hasInvalidEntry = body.answers.some(
      (answer) => !answer.questionId || !answer.answerId,
    );

    if (hasInvalidEntry) {
      return NextResponse.json(
        { error: "Each answer must include questionId and answerId." },
        { status: 400 },
      );
    }

    const taskId = createPlacementTask(body.answers);
    const payload: PlacementSubmitResponse = {
      taskId,
      state: "processing",
    };

    return NextResponse.json(payload, { status: 202 });
  } catch {
    return NextResponse.json(
      { error: "Malformed request payload." },
      { status: 400 },
    );
  }
}
