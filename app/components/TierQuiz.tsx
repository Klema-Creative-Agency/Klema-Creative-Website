"use client";

import { useState } from "react";

interface QuizQuestion {
  question: string;
  options: { label: string; scores: number[] }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    question: "What's your biggest challenge right now?",
    options: [
      { label: "I get leads but don't follow up fast enough", scores: [3, 1, 0, 0, 0] },
      { label: "I need to show up higher on Google", scores: [1, 3, 1, 0, 0] },
      { label: "My website doesn't reflect the quality of my work", scores: [0, 1, 3, 1, 0] },
      { label: "I don't have time for marketing at all", scores: [0, 0, 1, 3, 1] },
      { label: "I want someone handling everything — leads to close", scores: [0, 0, 0, 1, 3] },
    ],
  },
  {
    question: "How many leads do you get per month right now?",
    options: [
      { label: "Less than 20", scores: [3, 2, 0, 0, 0] },
      { label: "20–50", scores: [2, 3, 2, 0, 0] },
      { label: "50–100", scores: [0, 1, 3, 2, 1] },
      { label: "100+", scores: [0, 0, 1, 2, 3] },
    ],
  },
  {
    question: "Do you have a website you're happy with?",
    options: [
      { label: "No website at all", scores: [0, 0, 3, 2, 1] },
      { label: "I have one but it needs work", scores: [1, 1, 3, 1, 0] },
      { label: "It's decent, not a priority right now", scores: [2, 3, 0, 0, 0] },
      { label: "Yes, my website is solid", scores: [3, 2, 0, 1, 0] },
    ],
  },
  {
    question: "How much time do you spend on marketing each week?",
    options: [
      { label: "Zero — I don't have time", scores: [0, 0, 1, 3, 3] },
      { label: "A few hours here and there", scores: [1, 2, 2, 1, 0] },
      { label: "I actively manage it but want help", scores: [2, 3, 1, 0, 0] },
      { label: "I have someone on my team doing it", scores: [3, 1, 1, 0, 0] },
    ],
  },
  {
    question: "What's your annual revenue?",
    options: [
      { label: "Under $300K", scores: [3, 2, 0, 0, 0] },
      { label: "$300K – $1M", scores: [1, 3, 3, 1, 0] },
      { label: "$1M – $3M", scores: [0, 1, 2, 3, 2] },
      { label: "$3M+", scores: [0, 0, 1, 2, 3] },
    ],
  },
];

const TIERS = [
  { name: "Ignition", price: "$997/mo", description: "Lead conversion funnel and automation — stop losing the leads you already get." },
  { name: "Foundation", price: "$1,997/mo", description: "Everything in Ignition plus SEO, reputation management, and local visibility." },
  { name: "Accelerator", price: "$3,997/mo", description: "Custom website, paid ads, and a branded reporting dashboard — the full online presence." },
  { name: "Authority", price: "$7,500/mo", description: "Full marketing management — content, social, email, ads, and strategy. We run it all." },
  { name: "Dominator", price: "$12,000/mo", description: "Dedicated lead team, live hot transfers, appointment setting. Your phone only rings when someone is ready to book." },
];

export default function TierQuiz({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);
  const [result, setResult] = useState<number | null>(null);

  function handleAnswer(optionScores: number[]) {
    const newScores = scores.map((s, i) => s + optionScores[i]);

    if (step < QUESTIONS.length - 1) {
      setScores(newScores);
      setStep(step + 1);
    } else {
      setScores(newScores);
      const maxScore = Math.max(...newScores);
      const recommended = newScores.indexOf(maxScore);
      setResult(recommended);
    }
  }

  const progress = result !== null ? 100 : ((step) / QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-surface border border-border rounded-[20px] w-full max-w-[520px] overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-border">
          <div
            className="h-full bg-accent transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white-6 text-text-dim hover:text-text hover:bg-white-10 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8 pt-6">
          {result === null ? (
            <>
              {/* Question */}
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-3">
                Question {step + 1} of {QUESTIONS.length}
              </p>
              <h3 className="text-xl font-extrabold tracking-[-0.5px] mb-6 pr-8">
                {QUESTIONS[step].question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {QUESTIONS[step].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(opt.scores)}
                    className="text-left px-5 py-3.5 rounded-xl border border-border bg-white-6 text-[14px] text-text-mid font-medium transition-all duration-200 hover:border-accent-border hover:bg-accent-dim hover:text-text"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Result */}
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent-dim border border-accent-border flex items-center justify-center mx-auto mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent mb-2">
                  Our recommendation
                </p>
                <h3 className="text-2xl font-extrabold tracking-[-0.5px] mb-1">
                  {TIERS[result].name}
                </h3>
                <p className="text-lg font-bold text-accent mb-4">
                  {TIERS[result].price}
                </p>
                <p className="text-[14px] text-text-dim leading-[1.6] mb-8 max-w-[380px] mx-auto">
                  {TIERS[result].description}
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="/contact"
                    className="block w-full py-3.5 rounded-full text-[14px] font-bold text-center no-underline transition-all duration-300 bg-accent text-black hover:shadow-[0_0_32px_rgba(74,222,128,0.3)] hover:-translate-y-px"
                  >
                    Get Started with {TIERS[result].name} &rarr;
                  </a>
                  <button
                    onClick={() => {
                      setStep(0);
                      setScores([0, 0, 0, 0, 0]);
                      setResult(null);
                    }}
                    className="text-[13px] text-text-dim font-medium hover:text-text transition-colors"
                  >
                    Retake quiz
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
