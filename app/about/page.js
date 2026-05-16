import Link from "next/link";
import FeedbackForm from "./FeedbackForm";

export const metadata = {
  title: "About",
  description:
    "Hesabu - built by Susan Nyawira, a developer building practical financial tools for everyday Kenyans.",
};

export default function AboutPage() {
  return (
    <div
      style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}
    >
      <div style={{ marginBottom: "56px" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "1px",
            color: "#1A7A4A",
            background: "#E8F5EE",
            padding: "4px 12px",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          ABOUT HESABU
        </div>

        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 38px)",
            fontWeight: "800",
            color: "#0D4A2E",
            lineHeight: 1.15,
            marginBottom: "16px",
            letterSpacing: "-0.5px",
          }}
        >
          Financial clarity shouldn't require a finance degree.
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#555",
            lineHeight: 1.8,
            marginBottom: "24px",
          }}
        >
          Hesabu is my attempt to simplify everyday financial decisions through
          useful software and intelligent digital tools designed for real-world
          use in Kenya.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            padding: "20px",
            background: "#E8F5EE",
            borderRadius: "14px",
            border: "1px solid rgba(26,122,74,0.15)",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "#0D4A2E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "800",
              color: "#ffffff",
              flexShrink: 0,
            }}
          >
            S
          </div>
          <div>
            <div
              style={{
                fontWeight: "700",
                color: "#0D4A2E",
                fontSize: "17px",
                marginBottom: "3px",
              }}
            >
              Susan Nyawira
            </div>
            <div
              style={{ fontSize: "13px", color: "#1A7A4A", lineHeight: 1.5 }}
            >
              Developer building practical financial tools
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#0D4A2E",
            marginBottom: "16px",
          }}
        >
          What I'm building toward
        </h2>
        <p
          style={{
            fontSize: "15px",
            color: "#444",
            lineHeight: 1.8,
            marginBottom: "20px",
          }}
        >
          Hesabu explores how software can make financial systems more
          understandable, accessible and practical for everyday users. The goal
          isn't just to build calculators, it's to remove the friction between
          people and the financial information that affects their daily lives.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {[
            { icon: "fa-server", label: "Backend systems & APIs" },
            { icon: "fa-chart-line", label: "Financial intelligence tools" },
            { icon: "fa-mobile-screen", label: "Mobile money analytics" },
            {
              icon: "fa-shield-halved",
              label: "Cybersecurity & digital forensics",
            },
            { icon: "fa-code-branch", label: "Intelligent web applications" },
            { icon: "fa-earth-africa", label: "Practical African fintech" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#f9f9f9",
                border: "0.5px solid #e5e5e5",
              }}
            >
              <i
                className={`fa-solid ${item.icon}`}
                style={{
                  color: "#1A7A4A",
                  fontSize: "14px",
                  width: "16px",
                  textAlign: "center",
                }}
              ></i>
              <span
                style={{ fontSize: "13px", color: "#333", fontWeight: "500" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      <div style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#0D4A2E",
            marginBottom: "16px",
          }}
        >
          Why Hesabu?
        </h2>
        <div
          style={{
            fontSize: "15px",
            color: "#444",
            lineHeight: 1.8,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <p>
            Financial systems in Kenya are often confusing, fragmented and
            difficult to navigate. Understanding M-Pesa charges means scrolling
            a 4-page PDF. Understanding your salary means decoding a payslip
            nobody explained to you. Knowing whether Fuliza is worth it means
            doing mental math on the spot.
          </p>
          <p>
            Hesabu removes that friction. Enter a number, get a clear answer. No
            PDFs, no confusion, no finance degree required.
          </p>
          <p style={{ fontWeight: "600", color: "#0D4A2E" }}>
            Turning complex systems into simple usable software.
          </p>
        </div>
      </div>

      <div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      <div style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#0D4A2E",
            marginBottom: "8px",
          }}
        >
          What Hesabu does right now
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "20px",
            lineHeight: 1.6,
          }}
        >
          Four tools. All free. All built on official data sources.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {[
            {
              icon: "fa-mobile-screen",
              color: "#1A7A4A",
              bg: "#E8F5EE",
              title: "M-Pesa Fee Calculator",
              desc: "Know exactly what Safaricom charges before you send or withdraw across all transaction types.",
              href: "/tools/mpesa",
            },
            {
              icon: "fa-credit-card",
              color: "#C8952A",
              bg: "#FFF5E8",
              title: "Fuliza Cost Calculator",
              desc: "Find out what borrowing via Fuliza will actually cost you : planning mode and already-borrowed mode.",
              href: "/tools/fuliza",
            },
            {
              icon: "fa-coins",
              color: "#185FA5",
              bg: "#E6F1FB",
              title: "Salary & PAYE Calculator",
              desc: "See your gross salary broken down into PAYE, NSSF, SHIF, Housing Levy and your actual take-home.",
              href: "/tools/salary",
            },
            {
              icon: "fa-wifi",
              color: "#042C53",
              bg: "#E6F1FB",
              title: "Home Fibre Comparator",
              desc: "Compare Safaricom, Zuku, Faiba, Starlink and more : find the best internet for your budget.",
              href: "/tools/fibre",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  background: item.bg,
                  border: `0.5px solid ${item.color}30`,
                  alignItems: "flex-start",
                  transition: "opacity 0.15s",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={`fa-solid ${item.icon}`}
                    style={{ color: "#fff", fontSize: "15px" }}
                  ></i>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#0D4A2E",
                      marginBottom: "3px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      <div style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#0D4A2E",
            marginBottom: "16px",
          }}
        >
          Open to
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "24px",
          }}
        >
          {[
            { icon: "fa-handshake", label: "Collaborations" },
            { icon: "fa-laptop-code", label: "Real-world software projects" },
            {
              icon: "fa-building-columns",
              label: "Fintech & backend opportunities",
            },
            {
              icon: "fa-people-group",
              label: "Developer communities & hackathons",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 14px",
                borderRadius: "10px",
                background: "#f9f9f9",
                border: "0.5px solid #e5e5e5",
              }}
            >
              <i
                className={`fa-solid ${item.icon}`}
                style={{
                  color: "#1A7A4A",
                  fontSize: "14px",
                  width: "16px",
                  textAlign: "center",
                }}
              ></i>
              <span
                style={{ fontSize: "13px", color: "#333", fontWeight: "500" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {[
            {
              label: "GitHub",
              href: "https://github.com/sWaithira",
              icon: "fa-github",
              color: "#1A7A4A",
              bg: "#E8F5EE",
            },
            {
              label: "Portfolio",
              href: "https://portfolio-website-sepia-rho.vercel.app/",
              icon: "fa-globe",
              color: "#0C447C",
              bg: "#E6F1FB",
            },
            {
              label: "Email",
              href: "mailto:hesabutools@gmail.com",
              icon: "fa-envelope",
              color: "#3d2c00",
              bg: "#FFF5E8",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "10px",
                background: link.bg,
                color: link.color,
                fontSize: "14px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              <i
                className={`fa-brands ${link.icon === "fa-envelope" ? "fa-regular" : "fa-brands"} ${link.icon}`}
              ></i>
              {link.label} →
            </a>
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "#e5e5e5", margin: "32px 0" }} />

      <div style={{ marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#0D4A2E",
            marginBottom: "8px",
          }}
        >
          Share feedback
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            marginBottom: "20px",
            lineHeight: 1.6,
          }}
        >
          Found a bug? Have a tool idea? Something not calculating right? Tell
          me . This is how Hesabu improves.
        </p>
        <FeedbackForm />
      </div>

      {/* DONATE SECTION */}

      <div
        style={{
          padding: "24px",
          background: "#0D4A2E",
          borderRadius: "14px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            color: "#a8d5b8",
            lineHeight: 1.8,
            marginBottom: "8px",
          }}
        >
          Hesabu is built one tool at a time with the goal of making financial
          information simpler, clearer and accessible to everyone.
        </p>
        <p style={{ fontSize: "12px", color: "#6db890" }}>&copy; 2026</p>
      </div>

      <div style={{ textAlign: "center", marginTop: "32px" }}>
        <Link
          href="/"
          style={{
            fontSize: "14px",
            color: "#1A7A4A",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          ← Back to all tools
        </Link>
      </div>
    </div>
  );
}
