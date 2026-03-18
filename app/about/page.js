import Link from "next/link";
import FeedbackForm from "./FeedbackForm";

export const metadata = {
  title: "About",
  description: "Why Hesabu exists, who built it, and what it's trying to do for Kenyans.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>

      {/* Header */}
      <div style={{ marginBottom: "48px" }}>
        <div style={{
          display: "inline-block",
          fontSize: "11px",
          fontWeight: "600",
          letterSpacing: "1px",
          color: "#1A7A4A",
          background: "#E8F5EE",
          padding: "4px 12px",
          borderRadius: "20px",
          marginBottom: "16px",
        }}>
          ABOUT HESABU
        </div>
        <h1 style={{
          fontSize: "32px",
          fontWeight: "800",
          color: "#0D4A2E",
          lineHeight: 1.2,
          marginBottom: "12px",
          letterSpacing: "-0.5px",
        }}>
          Financial clarity shouldn't require a finance degree.
        </h1>
        <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.7 }}>
          Hesabu turns complicated financial rules into simple numbers — instantly.
        </p>
      </div>

      {/* Why I built it */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0D4A2E", marginBottom: "16px" }}>
          Why I built Hesabu
        </h2>
        <div style={{ fontSize: "15px", color: "#444", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>Hesabu started with a simple frustration: everyday financial calculations in Kenya are harder than they should be.</p>
          <p>
            In Kenya, understanding everyday financial costs often means digging through long PDFs, confusing fee tables or screenshots shared on WhatsApp. Whether it's calculating M-Pesa transaction fees, understanding salary deductions or estimating loan repayments — the information exists, but it's not easy to use.
          </p>
          <p>
            I built Hesabu to turn those complicated rules into simple tools. Instead of reading through pages of conditions, you enter a number and immediately see the result.
          </p>
          <p style={{ fontWeight: "600", color: "#0D4A2E" }}>
            Because understanding your money shouldn't feel like solving a puzzle.
          </p>
        </div>
      </div>
      {/* What you can do */}
<div style={{ marginBottom: "40px" }}>
  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0D4A2E", marginBottom: "8px" }}>
    What you can do with Hesabu
  </h2>
  <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px", lineHeight: 1.6 }}>
    First time here? Here's what Hesabu helps you figure out — instantly.
  </p>
  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    {[
      { emoji: "📱", title: "Calculate M-Pesa fees",        desc: "Know exactly what Safaricom charges before you send or withdraw — no surprises." },
      { emoji: "💳", title: "Understand Fuliza costs",      desc: "Find out what borrowing via Fuliza will actually cost you over time." },
      { emoji: "💰", title: "Break down your salary",       desc: "See your gross salary split into PAYE, NHIF, NSSF, housing levy — and your net pay." },
      { emoji: "🏦", title: "Estimate loan repayments",     desc: "Understand what a SACCO or bank loan will cost you monthly. Coming soon." },
    ].map(item => (
      <div key={item.title} style={{
        display: "flex",
        gap: "14px",
        padding: "14px 16px",
        borderRadius: "12px",
        background: "#f9f9f9",
        border: "0.5px solid #e5e5e5",
        alignItems: "flex-start",
      }}>
        <span style={{ fontSize: "20px", flexShrink: 0 }}>{item.emoji}</span>
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#0D4A2E", marginBottom: "3px" }}>{item.title}</div>
          <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
        </div>
      </div>
    ))}
  </div>
</div>

<div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      {/* Divider */}
      <div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      {/* About creator */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0D4A2E", marginBottom: "16px" }}>
          About the creator
        </h2>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
          padding: "16px",
          background: "#E8F5EE",
          borderRadius: "12px",
        }}>
          <div style={{
            width: "48px", height: "48px",
            borderRadius: "50%",
            background: "#1A7A4A",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "20px", fontWeight: "800", color: "#ffffff",
            flexShrink: 0,
          }}>
            S
          </div>
          <div>
            <div style={{ fontWeight: "700", color: "#0D4A2E", fontSize: "16px" }}>Susan Nyawira</div>
            <div style={{ fontSize: "13px", color: "#1A7A4A" }}>CS Student & Developer</div>
          </div>
        </div>
        <div style={{ fontSize: "15px", color: "#444", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "12px" }}>
          <p>
            I'm a computer science student and developer interested in building practical tools that solve real-world problems. I enjoy turning complex systems into simple, usable software — especially tools that make everyday life easier.
          </p>
          <p>
            My interests include backend systems, web development and cybersecurity. Lately I've been exploring how small web applications can simplify real financial decisions for people.
          </p>
          <p>
            Hesabu is also part of my journey as a developer — building useful software, learning from the public and improving one tool at a time.I'm currently looking for opportunities to collaborate, contribute to real-world projects and grow as a developer.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      {/* Connect */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0D4A2E", marginBottom: "8px" }}>
          Let's connect
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            { label: "GitHub",    href: "https://github.com/sWaithira", color: "#1A7A4A", bg: "#E8F5EE" },
            { label: "Portfolio", href: "https://portfolio-website-sepia-rho.vercel.app/", color: "#0C447C", bg: "#E6F1FB" },
            { label: "Email",     href: "mailto:hesabutools@gmail.com", color: "#3d2c00", bg: "#FFF5E8" },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                background: link.bg,
                color: link.color,
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              {link.label} →
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      {/* Feedback form */}
<div style={{ marginBottom: "40px" }}>
  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0D4A2E", marginBottom: "8px" }}>
    Share feedback
  </h2>
  <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px", lineHeight: 1.6 }}>
    Found a bug? Have a tool idea? Something not calculating right? Tell me — this is how Hesabu improves.
  </p>
  <FeedbackForm />
</div>

{/* DONATE SECTION
<div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

<div style={{ marginBottom: "40px" }}>
  <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#0D4A2E", marginBottom: "8px" }}>
    Support Hesabu
  </h2>
  <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px", lineHeight: 1.7 }}>
    Hesabu is free. But if a tool saved you time, money or a headache — and you want to say thanks — a small contribution goes a long way. It helps cover development time and keeps the tools accurate and running.
  </p>

  <div style={{
  padding: "18px 20px",
  borderRadius: "14px",
  background: "#E8F5EE",
  border: "1.5px solid #1A7A4A",
  marginBottom: "12px",
}}>
  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
    <span style={{ fontSize: "20px" }}>📱</span>
    <div style={{ fontWeight: "700", color: "#0D4A2E", fontSize: "15px" }}>M-Pesa</div>
  </div>
  <div style={{ fontSize: "13px", color: "#1A7A4A", lineHeight: 1.8 }}>
    Send via <strong>Pochi la Biashara</strong>:<br />
    <span style={{ fontWeight: "700", fontSize: "16px", color: "#0D4A2E" }}>
      0700 000 000
    </span>
    <br />
  </div>
</div>
  <p style={{ fontSize: "12px", color: "#aaa", marginTop: "12px", textAlign: "center" }}>
    No pressure at all. Using and sharing Hesabu is support enough. 🙏
  </p>
</div>
*/}

      {/* Footer note */}
      <div style={{
        padding: "20px",
        background: "#0D4A2E",
        borderRadius: "12px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "13px", color: "#a8d5b8", lineHeight: 1.8 }}>
          Hesabu is built one tool at a time — with the goal of making financial information simpler, clearer and accessible to everyone.
        </p>
        <p style={{ fontSize: "12px", color: "#6db890", marginTop: "8px" }}>
        &copy;2026
        </p>
      </div>

      {/* Back to tools */}
      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <Link href="/" style={{
          fontSize: "14px",
          color: "#1A7A4A",
          fontWeight: "600",
          textDecoration: "none",
        }}>
          ← Back to all tools
        </Link>
      </div>

    </div>
  );
}