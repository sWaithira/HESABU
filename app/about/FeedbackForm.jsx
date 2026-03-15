"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const data = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xlgpwoyr", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("done");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div style={{
        padding: "24px",
        borderRadius: "12px",
        background: "#E8F5EE",
        border: "1.5px solid #1A7A4A",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>✓</div>
        <div style={{ fontWeight: "700", color: "#0D4A2E", marginBottom: "4px" }}>
          Feedback received!
        </div>
        <div style={{ fontSize: "13px", color: "#1A7A4A" }}>
          Thank you — I read every message.
        </div>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "16px",
            background: "transparent",
            border: "none",
            color: "#1A7A4A",
            fontSize: "13px",
            fontWeight: "600",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <input
        type="text"
        name="name"
        placeholder="Your name (optional)"
        style={{
          width: "100%", padding: "12px 14px",
          borderRadius: "12px", border: "1.5px solid #e5e5e5",
          fontSize: "14px", fontFamily: "inherit", outline: "none",
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Your email (optional — if you want a reply)"
        style={{
          width: "100%", padding: "12px 14px",
          borderRadius: "12px", border: "1.5px solid #e5e5e5",
          fontSize: "14px", fontFamily: "inherit", outline: "none",
        }}
      />
      <textarea
        name="message"
        required
        placeholder="Your feedback, tool idea, or bug report..."
        rows={4}
        style={{
          width: "100%", padding: "14px",
          borderRadius: "12px", border: "1.5px solid #e5e5e5",
          fontSize: "14px", fontFamily: "inherit",
          outline: "none", resize: "vertical", lineHeight: 1.6,
        }}
      />
      {status === "error" && (
        <div style={{ fontSize: "13px", color: "#c0392b", padding: "10px 14px", background: "#fff0f0", borderRadius: "8px" }}>
          Something went wrong — try emailing hesabutools@gmail.com directly.
        </div>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          background: status === "sending" ? "#888" : "#1A7A4A",
          color: "#ffffff", padding: "14px 24px",
          borderRadius: "10px", fontSize: "14px",
          fontWeight: "700", border: "none",
          cursor: status === "sending" ? "not-allowed" : "pointer",
          fontFamily: "inherit",
          transition: "background 0.15s",
        }}
      >
        {status === "sending" ? "Sending..." : "Send feedback →"}
      </button>
    </form>
  );
}