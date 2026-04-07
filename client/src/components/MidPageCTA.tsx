import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

export default function MidPageCTA() {
  const { ref, visible } = useReveal();

  return (
    <section className="darker-section py-12 sm:py-16 lg:py-20">
      <div
        ref={ref}
        className={`container text-center reveal-up ${visible ? "revealed" : ""}`}
      >
        <h2
          className="text-white font-extrabold mb-3 sm:mb-4"
          style={{ fontSize: "clamp(1.25rem, 3vw, 2.25rem)", letterSpacing: "-0.025em", lineHeight: 1.15 }}
        >
          Ready to See Where You're Losing Leads?
        </h2>
        <p className="text-white/60 font-body text-[0.875rem] sm:text-base mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
          Get a free, no-obligation audit of your online presence in San Antonio.
          We'll show you exactly what's costing you jobs.
        </p>
        <a href="#contact" className="btn-primary w-full sm:w-auto text-base">
          Get My Free Audit
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
