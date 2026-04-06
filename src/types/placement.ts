export type PlacementAnswer = {
  questionId: string;
  answerId: string;
};

export type PlacementQuestion = {
  id: string;
  prompt: string;
  options: Array<{
    id: string;
    label: string;
  }>;
};

export type FinalPlacementResult = {
  score: number;
  level: "Beginner" | "Elementary" | "Intermediate" | "Advanced";
  status: "Needs Review" | "Passed";
  certificateLink: string;
};

export type PlacementTaskState = "processing" | "completed" | "failed";

export type PlacementSubmitResponse = {
  taskId: string;
  state: "processing";
};

export type PlacementResultResponse =
  | {
      taskId: string;
      state: "processing";
    }
  | {
      taskId: string;
      state: "completed";
      result: FinalPlacementResult;
    }
  | {
      taskId: string;
      state: "failed";
      error: string;
    };
