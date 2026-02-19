"use client";

function scoreColor(score: number): string {
  if (score >= 90) return "text-accent";
  if (score >= 70) return "text-info";
  if (score >= 50) return "text-warning";
  return "text-danger";
}

function strokeColor(score: number): string {
  if (score >= 90) return "#4ade80";
  if (score >= 70) return "#3b82f6";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}

export function ScoreRing({
  score,
  grade,
  size = 160,
}: {
  score: number;
  grade: string;
  size?: number;
}) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = strokeColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle
          cx="100" cy="100" r={radius}
          fill="none" strokeWidth="8"
          className="stroke-border"
        />
        <circle
          cx="100" cy="100" r={radius}
          fill="none" strokeWidth="8"
          stroke={color}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-[2.5rem] font-extrabold leading-none tracking-tight ${scoreColor(score)}`}>
          {score}
        </span>
        <span className="text-[14px] font-semibold text-text-dim mt-1">{grade}</span>
      </div>
    </div>
  );
}
