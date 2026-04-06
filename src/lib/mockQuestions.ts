import { PlacementQuestion } from "@/types/placement";

export const questions: PlacementQuestion[] = [
  {
    id: "q1",
    prompt: "Which sentence is grammatically correct?",
    options: [
      { id: "q1-a", label: "He go to school every day." },
      { id: "q1-b", label: "He goes to school every day." },
      { id: "q1-c", label: "He going to school every day." },
    ],
  },
  {
    id: "q2",
    prompt: "Choose the best synonym for resilient.",
    options: [
      { id: "q2-a", label: "Fragile" },
      { id: "q2-b", label: "Unclear" },
      { id: "q2-c", label: "Adaptable" },
    ],
  },
  {
    id: "q3",
    prompt: "Which response is most suitable in a formal email?",
    options: [
      { id: "q3-a", label: "I look forward to your reply." },
      { id: "q3-b", label: "Hit me back soon." },
      { id: "q3-c", label: "Yo, update me." },
    ],
  },
  {
    id: "q4",
    prompt: "Pick the correct conditional sentence.",
    options: [
      { id: "q4-a", label: "If I will study, I pass." },
      { id: "q4-b", label: "If I study, I will pass." },
      { id: "q4-c", label: "If I study, I would passed." },
    ],
  },
  {
    id: "q5",
    prompt: "Choose the best transition word to show contrast.",
    options: [
      { id: "q5-a", label: "Therefore" },
      { id: "q5-b", label: "In addition" },
      { id: "q5-c", label: "However" },
    ],
  },
];