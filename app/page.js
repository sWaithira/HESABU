import Link from "next/link";

const tools = [
  {
    slug:     "mpesa",
    emoji:    "📱",
    title:    "M-Pesa Calculator",
    desc:     "Instantly see what Safaricom charges for sending or withdrawing — no more scrolling a 4-page PDF.",
    color:    "#1A7A4A",
    bg:       "#E8F5EE",
    textColor:"#0D4A2E",
    ready:    true,
    category: "Money & Payments",
  },
  {
    slug:     "fuliza",
    emoji:    "💳",
    title:    "Fuliza Calculator",
    desc:     "Find out what 'acha ni Fulize' will cost you — access fee, daily charges, total repayment.",
    color:    "#C8952A",
    bg:       "#FFF5E8",
    textColor:"#3d2c00",
    ready:    true,
    category: "Money & Payments",
  },
  {
    slug:     "salary",
    emoji:    "💰",
    title:    "Salary & PAYE Calculator",
    desc:     "Enter your gross salary and see exactly what lands in your pocket after KRA is done with it.",
    color:    "#378ADD",
    bg:       "#E6F1FB",
    textColor:"#0C447C",
    ready:    false,
    category: "Salary & Tax",
  },
  {
    slug:     "bundles",
    emoji:    "📶",
    title:    "Data Bundle Comparator",
    desc:     "Find out which provider gives you the most MBs for your money across Safaricom, Airtel and Telkom.",
    color:    "#7F77DD",
    bg:       "#EEEDFE",
    textColor:"#26215C",
    ready:    true,
    category: "Telecom",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "#0D4A2E",
        padding: "24px 20px 20px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "1px",
          color: "#a8d5b8",
          background: "rgba(255,255,255,0.08)",
          padding: "4px 12px",
          borderRadius: "20px",
          marginBottom: "16px",
        }}>
          FREE · ACCURATE · KENYAN
        </div>
        <h1 style={{
          fontSize: "clamp(24px, 6vw, 42px)",
          fontWeight: "800",
          color: "#ffffff",
          lineHeight: 1.2,
          marginBottom: "14px",
          letterSpacing: "-0.5px",
        }}>
          Stop guessing.<br />
          <span style={{ color: "#C8952A" }}>Start calculating.</span>
        </h1>
        <p style={{
          fontSize: "16px",
          color: "#a8d5b8",
          maxWidth: "420px",
          margin: "0 auto 18px",
          lineHeight: 1.6,
        }}>
          Kenyan financial tools that actually make sense — because understanding your money shouldn't feel like solving a puzzle.
        </p>
      </section>

      {/* Tools */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 20px" }}>
        <h2 style={{
          fontSize: "20px",
          fontWeight: "700",
          color: "#0D4A2E",
          marginBottom: "8px",
        }}>
          All Tools
        </h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "28px" }}>
          Built for real Kenyan financial situations.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "16px",
        }}>
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={tool.ready ? `/tools/${tool.slug}` : "#"}
              style={{
                display: "block",
                textDecoration: "none",
                borderRadius: "16px",
                border: `1.5px solid ${tool.ready ? tool.color + "40" : "#e5e5e5"}`,
                background: tool.ready ? tool.bg : "#fafafa",
                padding: "20px",
                opacity: tool.ready ? 1 : 0.6,
                cursor: tool.ready ? "pointer" : "default",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
            >
              {/* Category badge */}
              <div style={{
                display: "inline-block",
                fontSize: "10px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                color: tool.ready ? tool.color : "#999",
                background: tool.ready ? tool.color + "18" : "#f0f0f0",
                padding: "3px 8px",
                borderRadius: "6px",
                marginBottom: "12px",
                textTransform: "uppercase",
              }}>
                {tool.category}
              </div>

              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{tool.emoji}</div>

              <h3 style={{
                fontSize: "16px",
                fontWeight: "700",
                color: tool.ready ? tool.textColor : "#333",
                marginBottom: "6px",
              }}>
                {tool.title}
              </h3>

              <p style={{
                fontSize: "13px",
                color: tool.ready ? tool.color : "#888",
                lineHeight: 1.6,
                marginBottom: "14px",
              }}>
                {tool.desc}
              </p>

              {tool.ready ? (
                <span style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: tool.color,
                }}>
                  Open tool →
                </span>
              ) : (
                <span style={{ fontSize: "12px", color: "#aaa" }}>Coming soon</span>
              )}
            </Link>
          ))}
        </div>
      </section>

     {/* Trust strip — slim version */}
      <section style={{
        borderTop: "1px solid #e5e5e5",
        borderBottom: "1px solid #e5e5e5",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
        flexWrap: "wrap",
        background: "#fafafa",
      }}>
        {[
          { icon: "✓", text: "Official data sources" },
          { icon: "✓", text: "No login required" },
          { icon: "✓", text: "Mobile friendly" },
        ].map(item => (
          <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#1A7A4A", fontWeight: "700", fontSize: "14px" }}>{item.icon}</span>
            <span style={{ fontSize: "13px", color: "#555" }}>{item.text}</span>
          </div>
        ))}
      </section>

      {/* Bottom CTA */}
      <section style={{
        maxWidth: "500px",
        margin: "0 auto",
        padding: "40px 20px 60px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.8, marginBottom: "16px" }}>
          Built in Kenya. Every tool uses official data from Safaricom, KRA and NCBA — updated when rates change.
        </p>
        <Link href="/about" style={{
          fontSize: "13px",
          color: "#1A7A4A",
          fontWeight: "600",
          textDecoration: "none",
          borderBottom: "1px solid #1A7A4A",
          paddingBottom: "2px",
        }}>
          Read the story behind Hesabu →
        </Link>
      </section>
    </div>
  );
}