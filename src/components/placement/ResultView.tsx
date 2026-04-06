"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import useTestResult from "@/hooks/useTestResult";

type ResultViewProps = {
  taskId: string;
  onRestart: () => void;
};

export function ResultView({ taskId, onRestart }: ResultViewProps) {
  
  const { 
    response,
    error,
    loadingLabel,
    fetchResult,
  } = useTestResult(taskId);

  if (error) {
    return (
      <Card title="Result Retrieval Error" subtitle={error}>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => void fetchResult()}>
            Retry Fetch
          </Button>
          <Button variant="ghost" onClick={onRestart}>
            Restart Test
          </Button>
        </div>
      </Card>
    );
  }

  if (response.state === "processing") {
    return (
      <Card
        title="Evaluation in Progress"
        subtitle="Your placement test is being processed. This usually takes a few seconds."
      >
        <div className="space-y-4">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="loader-track h-full w-1/2 rounded-full bg-emerald-500" />
          </div>
          <p className="text-sm text-slate-600">{loadingLabel}</p>
          <Button variant="ghost" onClick={onRestart}>
            Cancel and Restart
          </Button>
        </div>
      </Card>
    );
  }

  if (response.state === "failed") {
    return (
      <Card title="Evaluation Failed" subtitle={response.error}>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" onClick={() => void fetchResult()}>
            Retry Fetch
          </Button>
          <Button variant="ghost" onClick={onRestart}>
            Restart Test
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      title="Placement Result Ready"
      subtitle="Here is your simulated result based on the submitted answers."
    >
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl bg-slate-100 p-3">
          <dt className="text-slate-500">Score</dt>
          <dd className="text-lg font-semibold text-slate-900">{response.result.score}/100</dd>
        </div>
        <div className="rounded-xl bg-slate-100 p-3">
          <dt className="text-slate-500">Level</dt>
          <dd className="text-lg font-semibold text-slate-900">{response.result.level}</dd>
        </div>
        <div className="rounded-xl bg-slate-100 p-3">
          <dt className="text-slate-500">Status</dt>
          <dd className="text-lg font-semibold text-slate-900">{response.result.status}</dd>
        </div>
        <div className="rounded-xl bg-slate-100 p-3">
          <dt className="text-slate-500">Certificate</dt>
          <dd className="truncate text-emerald-700">
            <a href={response.result.certificateLink} target="_blank" rel="noreferrer">
              Open Certificate Link
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <Button variant="secondary" onClick={onRestart}>
          Restart Test
        </Button>
      </div>
    </Card>
  );
}
