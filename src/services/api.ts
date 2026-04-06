const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");

const buildApiUrl = (path: string) => `${API_BASE_URL}${path}`;

const submitPlacementTest = (answers: Record<string, string>) => fetch(buildApiUrl("/api/placement-test/submit"), {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    answers: Object.entries(answers).map(([questionId, answerId]) => ({
      questionId,
      answerId,
    })),
  }),
});

const getPlacementResult = (taskId: string) => fetch(buildApiUrl(`/api/placement-test/result/${taskId}`), {
  method: "GET",
  cache: "no-store",
});

export { submitPlacementTest, getPlacementResult };