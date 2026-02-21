"use client";

import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function ScannerTeaser() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleScan = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    router.push(`/tools/ai-visibility?url=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") handleScan();
  };

  return (
    <div className="flex gap-2.5 max-md:flex-col">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter your website URL (e.g. mybusiness.com)"
        className="flex-1 min-w-0 px-6 py-4 rounded-full border border-border bg-[#050505] text-text text-[15px] font-sans outline-none transition-colors duration-300 focus:border-accent-border-dim placeholder:text-text-dim/50"
      />
      <button
        onClick={handleScan}
        className="px-8 py-4 rounded-full border-none bg-accent text-black text-[15px] font-bold font-sans tracking-[-0.01em] cursor-pointer transition-all duration-300 btn-primary-hover whitespace-nowrap"
      >
        Scan Now
      </button>
    </div>
  );
}
