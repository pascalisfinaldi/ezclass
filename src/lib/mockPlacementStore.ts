import type {
  FinalPlacementResult,
  PlacementAnswer,
  PlacementResultResponse,
} from "@/types/placement";

const createTaskId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

type PlacementTask = {
  taskId: string;
  status: "processing" | "completed" | "failed";
  result?: FinalPlacementResult;
  error?: string;
};

const answerKey: Record<string, string> = {
  q1: "q1-b",
  q2: "q2-c",
  q3: "q3-a",
  q4: "q4-b",
  q5: "q5-c",
};

const tasks = new Map<string, PlacementTask>();

const toLevel = (score: number): FinalPlacementResult["level"] => {
  if (score >= 90) return "Advanced";
  if (score >= 70) return "Intermediate";
  if (score >= 50) return "Elementary";
  return "Beginner";
};

const toStatus = (score: number): FinalPlacementResult["status"] =>
  score >= 60 ? "Passed" : "Needs Review";

const createCertificateLink = (): string => {
  return `https://craftmypdf-gen.s3.ap-southeast-1.amazonaws.com/dbbe46a7-eaaf-4694-b1ae-9d6e05524f14/output.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6ENCBKJYLWJUD36X%2F20260406%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20260406T053037Z&X-Amz-Expires=1800&X-Amz-Signature=51d0e0725a2aa0c46c57c0538bf14d967ce0590bfcff5033d4f1cc52028c78eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject`;
};

const buildResult = (taskId: string, answers: PlacementAnswer[]): FinalPlacementResult => {
  const totalQuestions = Object.keys(answerKey).length;
  const correct = answers.reduce((sum, answer) => {
    return answerKey[answer.questionId] === answer.answerId ? sum + 1 : sum;
  }, 0);

  const score = Math.round((correct / totalQuestions) * 100);

  return {
    score,
    level: toLevel(score),
    status: toStatus(score),
    certificateLink: createCertificateLink(),
  };
};

export const createPlacementTask = (answers: PlacementAnswer[]) => {
  const taskId = createTaskId();
  const readyDelayMs = 4500 + Math.floor(Math.random() * 2500);
  console.log('p-log readyDelayMs', readyDelayMs)

  const task: PlacementTask = {
    taskId,
    status: "processing",
  };

  tasks.set(taskId, task);

  setTimeout(() => {
    const current = tasks.get(taskId);
    if (!current || current.status !== "processing") {
      return;
    }

    // Simulate occasional backend processing failures.
    if (Math.random() < 0.08) {
      tasks.set(taskId, {
        ...current,
        status: "failed",
        error: "The scoring service timed out. Please restart the test.",
      });
      return;
    }

    tasks.set(taskId, {
      ...current,
      status: "completed",
      result: buildResult(taskId, answers),
    });
  }, readyDelayMs);

  return taskId;
};

export const getPlacementTaskResult = (taskId: string): PlacementResultResponse | null => {
  const task = tasks.get(taskId);
  if (!task) {
    return null;
  }

  if (task.status === "processing") {
    return {
      taskId,
      state: "processing",
    };
  }

  if (task.status === "failed") {
    return {
      taskId,
      state: "failed",
      error: task.error ?? "Unknown processing error",
    };
  }

  return {
    taskId,
    state: "completed",
    result: task.result as FinalPlacementResult,
  };
};
