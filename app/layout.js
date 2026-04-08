import "./globals.css";

export const metadata = {
  title: {
    default: "Hesabu — Free Kenyan Financial Tools",
    template: "%s | Hesabu",
  },
  verification: {
    google: "dplSoSL4n9N-kmNwzgWuIgeQIYjrI0EQQbKrrItlMwM",
  },
  openGraph: {
    url: "https://hesabu-pink.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <nav
          style={{
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
          }}
        >
          <a
            href="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "22px",
              fontWeight: "bold",
              letterSpacing: "-0.5px",
            }}
          >
            He<span style={{ color: "#C8952A" }}>sabu</span>
          </a>
          <div style={{ display: "flex", gap: "24px" }}>
            <a
              href="/"
              style={{
                color: "#a8d5b8",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Tools
            </a>
            <a
              href="/about"
              style={{
                color: "#a8d5b8",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              About
            </a>
          </div>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
