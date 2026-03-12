import "./globals.css";

export const metadata = {
  title: {
    default: "Hesabu — Free Kenyan Financial Tools",
    template: "%s | Hesabu",
  },
  description: "Free, accurate calculators for Kenyans — M-Pesa fees, salary tax, data bundles and more. Because Safaricom thought a 4-page PDF was the best way to tell you what sending KES 500 costs.",
  keywords: ["M-Pesa calculator", "Kenya salary calculator", "PAYE calculator", "Kenya tax", "hesabu"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{
  background: "rgba(13, 74, 46, 0.85)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  padding: "16px 24px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 100,
  borderBottom: "1px solid rgba(255,255,255,0.08)",
}}>
          <a href="/" style={{
            color: "white",
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: "bold",
            letterSpacing: "-0.5px",
          }}>
            He<span style={{ color: "var(--gold)" }}>sabu</span>
          </a>
          <div style={{ display: "flex", gap: "24px" }}>
            <a href="/" style={{ color: "#a8d5b8", textDecoration: "none", fontSize: "14px" }}>Tools</a>
            <a href="/about" style={{ color: "#a8d5b8", textDecoration: "none", fontSize: "14px" }}>About</a>
          </div>
        </nav>

        <main>{children}</main>

        <footer style={{
  borderTop: "1px solid rgba(26,122,74,0.2)",
  padding: "20px 24px",
  textAlign: "center",
  marginTop: "40px",
  background: "var(--dark)",
}}>
  <p style={{ fontSize: "12px", color: "#a8d5b8" }}>
    © {new Date().getFullYear()}{" "}
    <a href="/" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600" }}>
      Hesabu
    </a>
    {" "}· Built with ❤️ in Kenya
  </p>
  
  <a
    href="https://portfolio-website-sepia-rho.vercel.app/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "inline-block",
      marginTop: "6px",
      fontSize: "12px",
      color: "#C8952A",
      textDecoration: "none",
      fontWeight: "500",
    }}
  >
    Made by Susan →
  </a>
</footer>
      </body>
    </html>
  );
}