import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { PlacementResultResponse } from "@/types/placement";
import { getPlacementResult } from "@/services/api";

const POLL_DELAY_MS = 2000;
const LOADING_STEP_MS = 1800;
const LOADING_STEPS = [
  "Scoring comprehension and grammar",
  "Mapping your ability level",
  "Preparing your certificate link",
];

const useTestResult = (taskId: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<PlacementResultResponse, Error>({
    queryKey: ["placement-result", taskId],
    queryFn: async () => {
      const resultResponse = await getPlacementResult(taskId);

      if (!resultResponse.ok) {
        const payload = (await resultResponse.json()) as { error?: string };
        throw new Error(payload.error ?? "Unable to retrieve test result.");
      }

      return (await resultResponse.json()) as PlacementResultResponse;
    },
    enabled: Boolean(taskId),
    initialData: {
      taskId,
      state: "processing",
    },
    refetchInterval: (queryRef) => {
      if (queryRef.state.status === "error") {
        return false;
      }

      return queryRef.state.data?.state === "processing" ? POLL_DELAY_MS : false;
    },
  });

  const response = query.data ?? { taskId, state: "processing" };
  const error = query.error ? query.error.message : null;
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    // Keep rotating status text while backend processing is in progress.
    if (response.state !== "processing") {
      return;
    }

    const timer = window.setInterval(() => {
      setStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, LOADING_STEP_MS);

    return () => window.clearInterval(timer);
  }, [response.state]);

  const loadingLabel = LOADING_STEPS[stepIndex];

  const fetchResult = async () => {
    queryClient.setQueryData<PlacementResultResponse>(["placement-result", taskId], {
      taskId,
      state: "processing",
    });

    return query.refetch();
  };

  return { response, error, loadingLabel, fetchResult };
};

export default useTestResult;
