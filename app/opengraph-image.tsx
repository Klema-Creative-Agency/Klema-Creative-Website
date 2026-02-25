import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Klema Creative — Marketing Engines for Local Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#050505",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "#f0eeeb",
              letterSpacing: "-2px",
            }}
          >
            K
          </span>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#4ade80",
              marginLeft: 4,
              marginBottom: 6,
              boxShadow: "0 0 24px rgba(74, 222, 128, 0.6)",
            }}
          />
        </div>

        {/* Brand name */}
        <span
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#f0eeeb",
            letterSpacing: "-1px",
            marginBottom: 16,
          }}
        >
          Klema Creative
        </span>

        {/* Tagline */}
        <span
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.45)",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Marketing engines that generate and convert leads for local service businesses.
        </span>

        {/* Accent line */}
        <div
          style={{
            width: 64,
            height: 3,
            borderRadius: 2,
            background: "#4ade80",
            marginTop: 40,
            boxShadow: "0 0 20px rgba(74, 222, 128, 0.4)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
