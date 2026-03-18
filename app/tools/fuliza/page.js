"use client";

import { useState } from "react";
import { getFulizaCost } from "@/data/mpesa-rates";

export default function FulizaCalculator() {
  const [amount, setAmount]       = useState("");
  const [mode, setMode]           = useState("plan");   // "plan" | "owe"
  const [days, setDays]           = useState(7);
  const [borrowDate, setBorrowDate] = useState(new Date().toISOString().split("T")[0]);
  const [result, setResult]       = useState(null);
  const [error, setError]         = useState("");
  const [toast, setToast]         = useState(false);
  const [showCrb, setShowCrb]     = useState(false);

  function calculate() {
    setError(""); setResult(null);
    const value = Number(amount);

    if (!amount || isNaN(value) || value < 1) {
      setError("Please enter a valid amount."); return;
    }
    if (value > 70000) {
      setError("Maximum Fuliza amount is KES 70,000."); return;
    }

    let daysElapsed = days;

    if (mode === "owe") {
      const borrowed = new Date(borrowDate);
      const today    = new Date();
      daysElapsed    = Math.max(1, Math.floor((today - borrowed) / (1000 * 60 * 60 * 24)) + 1);
if (daysElapsed > 30) {
  setError("You will not have access to your Fuliza limit if you have any unpaid balance after Day 30. Repay your full balance to restore your limit — or call Safaricom on 100.");
  return;
}
    }

    const calc = getFulizaCost(value, daysElapsed);
    if (!calc) { setError("Amount outside supported range."); return; }
    setResult({ amount: value, days: daysElapsed, ...calc });
  }

function share() {
  const daysLeft = result ? 30 - result.days : 0;
  const text = mode === "owe"
    ? `I have ${daysLeft} day${daysLeft === 1 ? "" : "s"} left to repay my Fuliza — calculate yours at hesabu.co.ke/tools/fuliza`
    : `Calculate what your Fuliza will cost you → hesabu.co.ke/tools/fuliza`;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text);
  } else {
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.focus();
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }
  setToast(true);
  setTimeout(() => setToast(false), 2500);
}
  return (
    <div style={{ minHeight: "100vh", background: "var(--page-bg)", padding: "0 0 60px" }}>
      <style>{`
        :root {
          --page-bg:        #ffffff;
          --topbar-bg:      #C8952A;
          --topbar-sub:     #fff3d6;
          --card-bg:        #ffffff;
          --label-color:    #8a6200;
          --text-primary:   #3d2c00;
          --text-muted:     #8a6200;
          --input-border:   rgba(200,149,42,0.3);
          --input-focus:    #C8952A;
          --btn-bg:         #C8952A;
          --btn-text:       #ffffff;
          --active-bg:      #C8952A;
          --active-text:    #ffffff;
          --idle-bg:        #ffffff;
          --idle-text:      #8a6200;
          --idle-border:    rgba(200,149,42,0.25);
          --receipt-hdr:    #C8952A;
          --receipt-dot:    #1A7A4A;
          --receipt-border: #C8952A;
          --receipt-bg:     #ffffff;
          --receipt-divider:rgba(200,149,42,0.15);
          --free-bg:        #fffbf0;
          --free-dot:       #C8952A;
          --total-color:    #3d2c00;
          --warn-color:     #c0392b;
          --source-color:   #b8923a;
          --crb-bg:         #fff5f5;
          --crb-border:     rgba(192,57,43,0.2);
          --error-bg:       #fff0f0;
          --error-text:     #c0392b;
          --error-border:   #f5c6c6;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --page-bg:        #0f0c00;
            --topbar-bg:      #7a5800;
            --topbar-sub:     #f0c96a;
            --card-bg:        #1a1500;
            --label-color:    #e0a830;
            --text-primary:   #f5e6b0;
            --text-muted:     #c8a050;
            --input-border:   rgba(200,149,42,0.25);
            --input-focus:    #e0a830;
            --btn-bg:         #C8952A;
            --active-bg:      #C8952A;
            --active-text:    #ffffff;
            --idle-bg:        #1a1500;
            --idle-text:      #c8a050;
            --idle-border:    rgba(200,149,42,0.2);
            --receipt-hdr:    #7a5800;
            --receipt-border: rgba(200,149,42,0.35);
            --receipt-bg:     #1a1500;
            --receipt-divider:rgba(200,149,42,0.12);
            --free-bg:        #140f00;
            --total-color:    #f5e6b0;
            --source-color:   #8a6200;
            --crb-bg:         #1a0a0a;
            --crb-border:     rgba(248,113,113,0.15);
            --error-bg:       #1a0a0a;
            --error-text:     #f87171;
            --error-border:   rgba(248,113,113,0.2);
          }
        }
        .fuliza-input {
          width:100%; padding:14px 14px 14px 56px;
          border-radius:12px; border:1.5px solid var(--input-border);
          background:var(--card-bg); color:var(--text-primary);
          font-size:20px; font-weight:500; outline:none; font-family:inherit;
          transition:border-color 0.15s;
        }
        .fuliza-input:focus { border-color:var(--input-focus); }
        .mode-btn {
          flex:1; padding:12px 8px;
          border-radius:10px;
          border:1.5px solid var(--idle-border);
          background:var(--idle-bg); color:var(--idle-text);
          font-size:13px; font-weight:500;
          cursor:pointer; font-family:inherit;
          transition:all 0.15s; text-align:center; line-height:1.4;
        }
        .mode-btn.active {
          border-color:var(--btn-bg); border-width:2px;
          background:var(--active-bg); color:var(--active-text);
          font-weight:700;
        }
        .day-btn {
          padding:10px 4px; border-radius:8px;
          border:1.5px solid var(--idle-border);
          background:var(--idle-bg); color:var(--idle-text);
          font-size:13px; font-weight:500;
          cursor:pointer; font-family:inherit; transition:all 0.15s;
        }
        .day-btn.active {
          border-color:var(--btn-bg); border-width:2px;
          background:var(--active-bg); color:var(--active-text);
          font-weight:700;
        }
        .fuliza-btn {
          width:100%; padding:15px; background:var(--btn-bg); color:var(--btn-text);
          border:none; border-radius:12px; font-size:15px; font-weight:600;
          cursor:pointer; font-family:inherit; transition:opacity 0.15s;
        }
        .fuliza-btn:active { opacity:0.85; }
        .share-btn {
          width:100%; margin-top:12px; padding:11px;
          border-radius:10px; border:1.5px solid var(--receipt-border);
          background:transparent; color:var(--label-color);
          font-size:13px; font-weight:600; cursor:pointer; font-family:inherit;
        }
        .date-input {
          width:100%; padding:14px;
          border-radius:12px; border:1.5px solid var(--input-border);
          background:var(--card-bg); color:var(--text-primary);
          font-size:16px; outline:none; font-family:inherit;
          transition:border-color 0.15s;
        }
        .date-input:focus { border-color:var(--input-focus); }
        .crb-toggle {
          width:100%; padding:12px 16px;
          border-radius:10px;
          border:1px solid var(--crb-border);
          background:var(--crb-bg);
          color:var(--warn-color);
          font-size:13px; font-weight:600;
          cursor:pointer; font-family:inherit;
          text-align:left; display:flex;
          justify-content:space-between; align-items:center;
        }
        @keyframes slideUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .receipt-animate { animation: slideUp 0.25s ease; }
      `}</style>

      {/* Topbar */}
      <div style={{ background: "var(--topbar-bg)", padding: "28px 20px 32px" }}>
        <div style={{ fontSize: "11px", color: "var(--topbar-sub)", letterSpacing: "0.8px", marginBottom: "6px" }}>HESABU</div>
        <div style={{ fontSize: "24px", fontWeight: "700", color: "#ffffff", marginBottom: "4px" }}>Fuliza Calculator</div>
        <div style={{ fontSize: "12px", color: "var(--topbar-sub)", fontStyle: "italic" }}>
          Because "acha ni Fulize" has a price — let's find out what it is.
        </div>
      </div>

      {/* Card */}
      <div style={{ maxWidth: "480px", margin: "-16px auto 0", background: "var(--card-bg)", borderRadius: "20px 20px 0 0", padding: "24px 20px" }}>

        {/* Mode toggle */}
        <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--label-color)", letterSpacing: "0.6px", marginBottom: "10px" }}>
          WHAT DO YOU WANT TO KNOW?
        </div>
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          <button
            className={`mode-btn${mode === "plan" ? " active" : ""}`}
            onClick={() => { setMode("plan"); setResult(null); setError(""); }}
          >
            Planning to Fuliza
            <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>
              What will it cost me?
            </div>
          </button>
          <button
            className={`mode-btn${mode === "owe" ? " active" : ""}`}
            onClick={() => { setMode("owe"); setResult(null); setError(""); }}
          >
            Already Fuliza'd
            <div style={{ fontSize: "11px", opacity: 0.8, marginTop: "2px" }}>
              What do I owe today?
            </div>
          </button>
        </div>

        {/* Amount */}
        <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--label-color)", letterSpacing: "0.6px", marginBottom: "10px" }}>
          {mode === "plan" ? "AMOUNT TO FULIZA (KES)" : "AMOUNT YOU FULIZA'D (KES)"}
        </div>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", pointerEvents: "none" }}>KES</span>
          <input
  className="fuliza-input"
  type="number"
  min="1"
  value={amount}
  placeholder="1 – 70,000"
  onChange={e => {
    const val = e.target.value;
    if (val === "" || Number(val) >= 0) {
      setAmount(val);
      setResult(null);
      setError("");
    }
  }}
  onKeyDown={e => e.key === "Enter" && calculate()}
/>
        </div>

{/* Plan mode — days selector */}
{mode === "plan" && (
  <>
    <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"10px" }}>
      HOW MANY DAYS TO REPAY?
      <span style={{ float:"right", fontSize:"13px", color:"var(--text-primary)", fontWeight:"700" }}>
        {days} {days === 1 ? "day" : "days"}
      </span>
    </div>
    <div style={{ position:"relative", marginBottom:"20px" }}>
      <input
        type="number"
        min="1"
        max="30"
        value={days}
        onChange={e => {
          const val = Math.min(30, Math.max(1, Number(e.target.value)));
          setDays(val);
          setResult(null);
        }}
        style={{
          width:"100%",
          padding:"14px 60px 14px 14px",
          borderRadius:"12px",
          border:"1.5px solid var(--input-border)",
          background:"var(--card-bg)",
          color:"var(--text-primary)",
          fontSize:"20px",
          fontWeight:"500",
          outline:"none",
          fontFamily:"inherit",
        }}
      />
      <span style={{ position:"absolute", right:"14px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", color:"var(--text-muted)", pointerEvents:"none" }}>
        / 30 max
      </span>
    </div>
  </>
)}

        {/* Owe mode — date picker */}
        {mode === "owe" && (
          <>
<div style={{ fontSize: "11px", fontWeight: "600", color: "var(--label-color)", letterSpacing: "0.6px", marginBottom: "6px" }}>
  WHEN DID YOU FULIZA?
</div>
<div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px" }}>
  Format follows your device's date setting
</div>
            <input
  type="date"
  className="date-input"
  value={borrowDate}
  max={new Date().toISOString().split("T")[0]}
  onChange={e => { setBorrowDate(e.target.value); setResult(null); setError(""); }}
  style={{
    marginBottom: "20px",
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1.5px solid var(--input-border)",
    background: "var(--card-bg)",
    color: "var(--text-primary)",
    fontSize: "16px",
    outline: "none",
    fontFamily: "inherit",
    colorScheme: "dark",
  }}
/>
          </>
        )}

        {/* Error */}
        {error && (
          <div style={{ padding: "10px 14px", borderRadius: "10px", marginBottom: "16px", background: "var(--error-bg)", color: "var(--error-text)", border: "1px solid var(--error-border)", fontSize: "13px" }}>
            {error}
          </div>
        )}

        <button className="fuliza-btn" onClick={calculate}>
          {mode === "plan" ? "Calculate Fuliza cost" : "Calculate what I owe"}
        </button>

        {/* Toast */}
        {toast && (
          <div style={{ position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)", background: "#3d2c00", color: "#fff", padding: "10px 20px", borderRadius: "20px", fontSize: "13px", fontWeight: "500", zIndex: 999, whiteSpace: "nowrap" }}>
            ✓ Copied to clipboard
          </div>
        )}

        {/* Result receipt */}
        {result && (
          <div className="receipt-animate" style={{ marginTop: "24px", border: "1.5px solid var(--receipt-border)", borderRadius: "16px", overflow: "hidden", background: "var(--receipt-bg)" }}>
            <div style={{ background: "var(--receipt-hdr)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--receipt-dot)" }} />
              <span style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff", letterSpacing: "0.3px" }}>
                {mode === "owe"
                  ? `DAY ${result.days} OF 30 — ${30 - result.days} DAYS LEFT`
                  : `FULIZA · KES ${result.amount.toLocaleString()} · ${result.days} DAYS`
                }
              </span>
            </div>
            <div style={{ padding: "16px" }}>
              {[
                { label: "Amount",                value: `KES ${result.amount.toLocaleString()}` },
                { label: "Access fee (1%)",       value: `KES ${result.accessFee.toLocaleString()}` },
                { label: "Grace days",            value: result.graceDays > 0 ? `${result.graceDays} days free` : "None", green: result.graceDays > 0 },
                { label: `Daily fee × ${result.chargeableDays} days`, value: result.dailyTotal === 0 ? "Free" : `KES ${result.dailyTotal.toLocaleString()}`, green: result.dailyTotal === 0 },
                { label: "Total cost",            value: `KES ${result.totalCost.toLocaleString()}`, red: true },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "0.5px solid var(--receipt-divider)" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{row.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: row.green ? "#1A7A4A" : row.red ? "var(--warn-color)" : "var(--text-primary)" }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", marginTop: "4px", borderTop: "1.5px dashed var(--receipt-divider)" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>You repay</span>
                <span style={{ fontSize: "24px", fontWeight: "700", color: "var(--total-color)" }}>KES {result.totalRepay.toLocaleString()}</span>
              </div>

              {/* Days left warning for owe mode */}
              {mode === "owe" && (30 - result.days) <= 5 && (
                <div style={{ marginTop: "12px", padding: "10px 12px", borderRadius: "8px", background: "var(--error-bg)", border: "1px solid var(--error-border)" }}>
                  <span style={{ fontSize: "12px", color: "var(--error-text)", fontWeight: "600" }}>
                    ⚠️ Only {30 - result.days} days left — repay now to avoid CRB listing.
                  </span>
                </div>
              )}

              <button className="share-btn" onClick={share}>Share result</button>
            </div>
          </div>
        )}

        {/* How Fuliza works */}
        <div style={{ marginTop: "28px", padding: "16px", background: "var(--free-bg)", borderRadius: "12px" }}>
          <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--label-color)", letterSpacing: "0.6px", marginBottom: "10px" }}>HOW FULIZA WORKS</div>
          {[
            "Fuliza covers your M-Pesa shortfall automatically",
            "1% access fee charged on every drawdown",
            "KES 0–100: completely free, no daily fee",
            "KES 101–1,000: free for first 3 days, small daily fee after",
            "KES 1,001+: daily fee starts immediately from Day 2",
            "Any money received auto-repays your balance",
            "Unpaid after 30 days? Your Fuliza limit is frozen",
            "Unpaid after 120 days? You get listed on CRB",
          ].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "8px", padding: "4px 0" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--free-dot)", flexShrink: 0, marginTop: "5px" }} />
              <span style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>

        {/* CRB section — expandable */}
        <div style={{ marginTop: "12px" }}>
          <button className="crb-toggle" onClick={() => setShowCrb(!showCrb)}>
            <span>⚠️ What happens if you're listed on CRB?</span>
            <span style={{ fontSize: "16px" }}>{showCrb ? "↑" : "↓"}</span>
          </button>

          {showCrb && (
            <div className="receipt-animate" style={{ padding: "16px", background: "var(--crb-bg)", border: "1px solid var(--crb-border)", borderTop: "none", borderRadius: "0 0 10px 10px" }}>
              {[
                { emoji: "✅", title: "Positive listing", desc: "You pay on time. This builds your credit score and helps you access better loans, higher limits and lower interest rates in future." },
                { emoji: "❌", title: "Negative listing", desc: "You defaulted. Lenders see this and will reject your loan applications, offer worse terms or charge higher interest. This stays on your record for up to 5 years." },
                { emoji: "📵", title: "What gets blocked", desc: "Bank loans, mobile credit (M-Shwari, KCB M-Pesa, Tala, Branch), business tenders and in some cases even employment opportunities." },
                { emoji: "🔓", title: "How to clear it", desc: "Pay off the outstanding Fuliza balance. Once settled, the negative listing is removed. You can also dispute incorrect listings directly with the CRB." },
                { emoji: "📋", title: "Your rights", desc: "You're entitled to one free credit report per year. If a listing is wrong, you can dispute it in writing with the bureau within 30 days." },
              ].map(item => (
                <div key={item.title} style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--warn-color)", marginBottom: "2px" }}>{item.title}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize: "11px", color: "var(--source-color)", marginTop: "8px", borderTop: "0.5px solid var(--crb-border)", paddingTop: "8px" }}>
                Source: Central Bank of Kenya · Fuliza Key Facts Document
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: "11px", color: "var(--source-color)", marginTop: "20px" }}>
          Safaricom/NCBA official Fuliza tariffs · Updated per Key Facts Document
        </p>
      </div>
    </div>
  );
}