import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tienda CID Fetcher — Licencias Microsoft para Revendedores";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "rgba(59,130,246,0.2)",
              border: "2px solid rgba(59,130,246,0.4)",
              borderRadius: "16px",
              padding: "12px 24px",
              color: "#93c5fd",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Bot CID Fetcher gratis con 30+ unidades
          </div>
        </div>

        <div
          style={{
            fontSize: "72px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          Licencias Microsoft
          <br />
          <span style={{ color: "#3b82f6" }}>para Revendedores</span>
        </div>

        <div
          style={{
            fontSize: "28px",
            color: "#94a3b8",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          Windows · Office · Server · Visio · Project
        </div>

        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {[
            { value: "Desde $1.50 USDT", label: "precio unitario" },
            { value: "Hasta 77%", label: "descuento por volumen" },
            { value: "Entrega inmediata", label: "sin esperas" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "12px",
                padding: "20px 28px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span style={{ color: "#ffffff", fontSize: "22px", fontWeight: 700 }}>
                {stat.value}
              </span>
              <span style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "32px",
            color: "#475569",
            fontSize: "18px",
          }}
        >
          cidfetcher.de
        </div>
      </div>
    ),
    { ...size }
  );
}
