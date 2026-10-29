import { ImageResponse } from "next/og";
import { FREE_TRIAL } from "@/config/plans";
import { site } from "@/config/site";

export const alt = `${site.name} – cloud backup for India`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Avoid the rupee sign here: the default OG font may not include the glyph.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #bfdbfe 0%, #ddd6fe 50%, #a5f3fc 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "64px 80px",
            borderRadius: 48,
            background: "rgba(255,255,255,0.7)",
            border: "2px solid rgba(255,255,255,0.9)",
            boxShadow: "0 24px 80px rgba(49,46,129,0.25)",
          }}
        >
          <div style={{ fontSize: 84, fontWeight: 800, color: "#0B1220" }}>{site.name}</div>
          <div style={{ marginTop: 16, fontSize: 40, color: "#334155" }}>Secure cloud backup for India</div>
          <div
            style={{
              marginTop: 36,
              display: "flex",
              alignSelf: "flex-start",
              padding: "14px 32px",
              borderRadius: 999,
              background: "linear-gradient(90deg, #0B57CC, #4F46E5)",
              color: "white",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            {FREE_TRIAL.durationDays} days free · {FREE_TRIAL.storageGB} GB
          </div>
        </div>
      </div>
    ),
    size,
  );
}
