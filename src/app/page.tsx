"use client";

import { QuestionCard } from '@/components/placement/QuestionCard';
import { ResultView } from '@/components/placement/ResultView';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

import { questions } from '@/lib/mockQuestions';
import useTestQuestions from '@/hooks/useTestQuestions';

export default function Home() {
  const {
    answers,
    taskId,
    missingQuestionIds,
    submitError,
    submitState,
    answeredCount,
    onAnswerChange,
    submitTest,
    restart,
  } = useTestQuestions();


  return (
    <div className="relative flex min-h-screen w-full justify-center overflow-hidden px-4 py-10 sm:px-8">
      <main className="w-full max-w-4xl space-y-6">
        <header className="rounded-3xl border border-white/60 bg-white shadow-2xl p-6 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            AI Placement Test Simulation
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            Submit your test and retrieve a scored result
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            This mock flow mirrors a real async scoring system: answer the questions,
            submit to the API, and watch your result endpoint transition from processing
            to completed.
          </p>
        </header>

        {!taskId ? (
          <Card
            title="Test Submission"
            subtitle="Answer all 5 questions. Validation runs before request submission."
          >
            <div className="mb-4 flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              <span>Progress</span>
              <span className="font-semibold">
                {answeredCount}/{questions.length} answered
              </span>
            </div>

            <div className="grid gap-3">
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  index={index}
                  question={question}
                  selectedAnswerId={answers[question.id]}
                  showError={missingQuestionIds.includes(question.id)}
                  onChange={onAnswerChange}
                />
              ))}
            </div>

            {submitError && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                {submitError}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                onClick={submitTest}
                disabled={submitState === "processing"}
                variant="primary"
              >
                {submitState === "processing" ? "Submitting..." : "Submit Placement Test"}
              </Button>
              <Button
                variant="ghost"
                onClick={restart}
                disabled={submitState === "processing"}
              >
                Clear Answers
              </Button>
            </div>
          </Card>
        ) : (
          <ResultView taskId={taskId} onRestart={restart} />
        )}
      </main>
    </div>
  );
}
