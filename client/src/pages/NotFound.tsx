import { AlertCircle, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-green-dark)]">
      <div className="text-center px-6 max-w-lg">
        <div className="flex justify-center mb-6">
          <AlertCircle className="h-16 w-16 text-[var(--brand-lime)]" />
        </div>

        <h1 className="text-white font-display font-extrabold text-5xl mb-3">404</h1>
        <h2 className="text-white/80 font-display font-bold text-xl mb-5">
          Page Not Found
        </h2>
        <p className="text-white/55 font-body text-base mb-8 leading-[1.7]">
          Sorry, the page you are looking for doesn't exist.
          <br />
          It may have been moved or deleted.
        </p>

        <button
          onClick={() => setLocation("/")}
          className="btn-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>
    </div>
  );
}
