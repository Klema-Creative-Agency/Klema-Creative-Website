import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050505",
          borderRadius: 40,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "#f0eeeb",
            letterSpacing: "-3px",
            marginRight: -4,
          }}
        >
          K
        </span>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#4ade80",
            marginTop: 30,
            boxShadow: "0 0 16px rgba(74, 222, 128, 0.6)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
