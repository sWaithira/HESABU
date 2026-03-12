export default function HomePage() {
  const tools = [
    {
      emoji: "📱",
      title: "M-Pesa Fee Calculator",
      description: "Instantly see what Safaricom charges — no more scrolling through a 4-page PDF.",
      href: "/tools/mpesa",
      ready: true,
    },
    {
      emoji: "💰",
      title: "Salary & PAYE Calculator",
      description: "Enter your gross salary, see exactly what lands in your pocket after KRA is done with it.",
      href: "/tools/salary",
      ready: false,
    },
    {
      emoji: "📶",
      title: "Data Bundle Comparator",
      description: "Find out which provider gives you the most MBs for your money.",
      href: "/tools/bundles",
      ready: false,
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{
        background: "var(--dark)",
        color: "white",
        padding: "80px 24px",
        textAlign: "center",
      }}>
        <h1 style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "16px", lineHeight: 1.2 }}>
          Tools Built for <span style={{ color: "var(--gold)" }}>Kenya</span>
        </h1>
        <p style={{ fontSize: "18px", color: "#a8d5b8", maxWidth: "520px", margin: "0 auto" }}>
          Free, accurate, and fast — because financial clarity shouldn't require a finance degree.
        </p>
      </section>

      {/* Tools Grid */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "bold", color: "var(--dark)", marginBottom: "32px" }}>
          All Tools
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}>
          {tools.map((tool) => (
              <a
              key={tool.href}
              href={tool.ready ? tool.href : "#"}
              style={{
                display: "block",
                border: "1px solid #e5e5e5",
                borderRadius: "12px",
                padding: "28px",
                textDecoration: "none",
                color: "inherit",
                background: "white",
                opacity: tool.ready ? 1 : 0.6,
                cursor: tool.ready ? "pointer" : "default",
              }}
            >
              <span style={{ fontSize: "32px" }}>{tool.emoji}</span>
              <h3 style={{ fontWeight: "bold", color: "var(--dark)", margin: "12px 0 6px" }}>
                {tool.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.6 }}>
                {tool.description}
              </p>
              {tool.ready && (
                <span style={{ display: "inline-block", marginTop: "16px", fontSize: "13px", fontWeight: "600", color: "var(--green)" }}>
                  Open tool →
                </span>
              )}
              {!tool.ready && (
                <span style={{ display: "inline-block", marginTop: "16px", fontSize: "12px", color: "#aaa" }}>
                  Coming soon
                </span>
              )}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}