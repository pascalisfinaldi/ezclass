import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { questions } from "@/lib/mockQuestions";
import { PlacementSubmitResponse, PlacementTaskState } from "@/types/placement";
import { submitPlacementTest } from "@/services/api";

const useTestQuestions = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [taskId, setTaskId] = useState<string | null>(null);
  const [missingQuestionIds, setMissingQuestionIds] = useState<string[]>([]);

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const submitMutation = useMutation({
    mutationFn: async () => {
      const response = await submitPlacementTest(answers);

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Unable to submit placement test.");
      }

      return (await response.json()) as PlacementSubmitResponse;
    },
    onSuccess: (payload) => {
      setTaskId(payload.taskId);
    },
  });

  const onAnswerChange = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
    setMissingQuestionIds((prev) => prev.filter((id) => id !== questionId));
  };

  const submitTest = async () => {
    const missing = questions
      .filter((question) => !answers[question.id])
      .map((question) => question.id);

    if (missing.length > 0) {
      setMissingQuestionIds(missing);
      submitMutation.reset();
      return;
    }

    await submitMutation.mutateAsync();
  };

  const restart = () => {
    setTaskId(null);
    setAnswers({});
    setMissingQuestionIds([]);
    submitMutation.reset();
  };

  const validationError =
    missingQuestionIds.length > 0
      ? "Please answer all questions before submitting."
      : null;

  const submitError =
    validationError ??
    (submitMutation.error instanceof Error
      ? submitMutation.error.message
      : submitMutation.error
        ? "Unexpected submission error."
        : null);

  const submitState: PlacementTaskState | "idle" = submitMutation.isPending
    ? "processing"
    : "idle";

  return {
    answers,
    taskId,
    missingQuestionIds,
    submitError,
    submitState,
    answeredCount,
    canSubmit: answeredCount === questions.length,
    onAnswerChange,
    submitTest,
    restart,
  };
};

export default useTestQuestions;
