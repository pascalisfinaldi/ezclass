import type { PlacementQuestion } from "@/types/placement";

type QuestionCardProps = {
  index: number;
  question: PlacementQuestion;
  selectedAnswerId?: string;
  showError?: boolean;
  onChange: (questionId: string, answerId: string) => void;
};

export function QuestionCard({
  index,
  question,
  selectedAnswerId,
  showError,
  onChange,
}: QuestionCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium text-emerald-700">Question {index + 1}</p>
      <h3 className="mt-1 text-base font-semibold text-slate-900">{question.prompt}</h3>

      <fieldset className="mt-3 grid gap-2">
        {question.options.map((option) => {
          const checked = selectedAnswerId === option.id;

          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition ${checked ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-slate-200 text-slate-700 hover:border-slate-300"}`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={checked}
                onChange={() => onChange(question.id, option.id)}
                className="h-4 w-4 accent-emerald-600"
              />
              {option.label}
            </label>
          );
        })}
      </fieldset>

      {showError && (
        <p className="mt-2 text-xs font-medium text-red-600">
          Please select one answer for this question.
        </p>
      )}
    </article>
  );
}
