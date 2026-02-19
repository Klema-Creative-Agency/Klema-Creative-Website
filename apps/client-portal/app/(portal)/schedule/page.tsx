import { auth } from "@/auth";
import { Card } from "@/components/ui/Card";

export default async function SchedulePage() {
  const session = await auth();

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-bold text-text">Schedule</h1>

      <Card className="text-center py-16">
        <div className="mb-4">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-text-dim mx-auto"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <h2 className="text-[18px] font-semibold text-text mb-2">Your Next Call</h2>
        <p className="text-[14px] text-text-dim mb-6">
          Schedule or view your upcoming calls with your account manager.
        </p>
        <div className="bg-surface border border-border rounded-xl p-6 max-w-sm mx-auto">
          <p className="text-[13px] text-text-dim mb-1">Next scheduled call</p>
          <p className="text-[18px] font-semibold text-accent">To be scheduled</p>
          <p className="text-[12px] text-text-muted mt-2">
            Your account manager will set up your next check-in call.
          </p>
        </div>
      </Card>
    </div>
  );
}
