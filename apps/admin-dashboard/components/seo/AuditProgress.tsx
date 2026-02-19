"use client";

import { useEffect, useState } from "react";

export function AuditProgress({
  auditId,
  onComplete,
}: {
  auditId: string;
  onComplete: () => void;
}) {
  const [status, setStatus] = useState<string>("queued");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/seo/audits/${auditId}/status`);
        if (!res.ok) return;
        const data = await res.json();
        setStatus(data.status);

        if (data.status === "completed" || data.status === "failed") {
          clearInterval(interval);
          onComplete();
        }
      } catch { /* retry next tick */ }
    }, 3000);

    return () => clearInterval(interval);
  }, [auditId, onComplete]);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(dotInterval);
  }, []);

  const label = status === "queued"
    ? "Queued — waiting to start"
    : status === "running"
      ? "Auditing — crawling pages and analyzing"
      : status === "completed"
        ? "Complete!"
        : "Failed";

  const isActive = status === "queued" || status === "running";

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      {isActive && (
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-[3px] border-border" />
          <div className="absolute inset-0 rounded-full border-[3px] border-t-accent animate-spin" />
        </div>
      )}
      <p className="text-[15px] font-medium text-text">
        {label}{isActive ? dots : ""}
      </p>
      <p className="text-[13px] text-text-dim">
        This typically takes 30–90 seconds depending on site size.
      </p>
    </div>
  );
}
