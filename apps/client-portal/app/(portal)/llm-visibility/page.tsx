import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getTierPortalFeatures } from "@klema/shared";
import { queryOne } from "@klema/db";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";

interface LlmScore {
  overall_score: number;
  chatgpt_score: number;
  gemini_score: number;
  claude_score: number;
  perplexity_score: number;
  copilot_score: number;
  test_date: string;
}

const LLM_MODELS = [
  { key: "chatgpt_score", name: "ChatGPT", color: "#10a37f" },
  { key: "gemini_score", name: "Gemini", color: "#4285f4" },
  { key: "claude_score", name: "Claude", color: "#cc785c" },
  { key: "perplexity_score", name: "Perplexity", color: "#20b2aa" },
  { key: "copilot_score", name: "Copilot", color: "#6366f1" },
];

export default async function LlmVisibilityPage() {
  const session = await auth();
  if (!session?.user?.clientId) redirect("/login");

  const features = getTierPortalFeatures(session.user.tierId ?? 1);
  if (!features.llmVisibility) {
    redirect("/dashboard");
  }

  const score = await queryOne<LlmScore>(
    "SELECT * FROM llm_visibility_scores WHERE client_id = $1 ORDER BY test_date DESC LIMIT 1",
    [session.user.clientId],
  );

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-bold text-text">LLM Visibility</h1>

      {!score ? (
        <Card className="py-12 text-center">
          <p className="text-[14px] text-text-dim">No visibility data yet. Your first scan will run soon.</p>
        </Card>
      ) : (
        <>
          {/* Overall Score */}
          <Card className="text-center py-8">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-[6px] border-accent/30 mb-4 relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle
                  cx="64" cy="64" r="58"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="6"
                  strokeDasharray={`${(score.overall_score / 100) * 364.4} 364.4`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[36px] font-bold text-accent">{score.overall_score}%</span>
            </div>
            <p className="text-[16px] font-medium text-text">Overall Visibility Score</p>
            <p className="text-[13px] text-text-dim mt-1">
              Last tested: {new Date(score.test_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </Card>

          {/* Per-LLM Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LLM_MODELS.map((model) => {
              const value = score[model.key as keyof LlmScore] as number;
              if (value == null) return null;
              return (
                <Card key={model.key}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: model.color }}
                      />
                      <span className="text-[14px] font-medium text-text">{model.name}</span>
                    </div>
                    <span className="text-[20px] font-bold text-text">{value}%</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${value}%`, backgroundColor: model.color }}
                    />
                  </div>
                  <p className="text-[11px] text-text-dim mt-2">
                    {value >= 75 ? "Strong" : value >= 50 ? "Moderate" : "Needs improvement"}
                  </p>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
