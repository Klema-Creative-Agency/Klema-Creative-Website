"use client";

import RevealOnScroll from "@/app/components/RevealOnScroll";
import type { Problem } from "@/app/data/niches";

/** Grid of 4 problem cards for a niche service page */
export default function ProblemCards({ problems }: { problems: Problem[] }) {
  return (
    <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
      {problems.map((p, i) => (
        <RevealOnScroll key={i}>
          <div className="accent-line-hover bg-surface border border-border rounded-[20px] p-8 transition-all duration-400 hover:border-border-hover hover:bg-[#121212] h-full">
            <div className="text-3xl mb-4">{p.icon}</div>
            <h3 className="text-[17px] font-bold mb-2.5 tracking-[-0.2px]">
              {p.title}
            </h3>
            <p className="text-sm text-text-dim leading-[1.7]">{p.body}</p>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  );
}
