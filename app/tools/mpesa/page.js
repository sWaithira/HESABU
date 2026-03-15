"use client";

import { useState } from "react";
import { sendMoney, withdrawAgent, withdrawATM, sendUnregistered, freeTransactions, getFee } from "@/data/mpesa-rates";

const transactionTypes = [
  { id: "send",         label: "Send to M-Pesa",      icon: "📤", table: sendMoney,        min: 1,   max: 250000, senderPays: true  },
  { id: "unregistered", label: "Send unregistered",   icon: "📵", table: sendUnregistered, min: 50,  max: 70000,  senderPays: true  },
  { id: "agent",        label: "Agent withdraw",      icon: "🏪", table: withdrawAgent,    min: 50,  max: 250000, senderPays: false },
  { id: "atm",          label: "ATM withdraw",        icon: "🏧", table: withdrawATM,      min: 200, max: 35000,  senderPays: false },
];

export default function MpesaCalculator() {
  const [amount, setAmount]   = useState("");
  const [txType, setTxType]   = useState(transactionTypes[0]);
  const [result, setResult]   = useState(null);
  const [error, setError]     = useState("");
  const [toast, setToast]     = useState(false);

  function calculate() {
    setError("");
    setResult(null);
    const value = Number(amount);
    if (!amount || isNaN(value) || value <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (value < txType.min || value > txType.max) {
      setError(`Amount must be between KES ${txType.min.toLocaleString()} and KES ${txType.max.toLocaleString()}.`);
      return;
    }
    const fee = getFee(value, txType.table);
    if (fee === null) { setError("Amount outside supported range."); return; }
    setResult({ amount: value, fee, total: value + fee, label: txType.label });
  }

  function handleType(id) {
    setTxType(transactionTypes.find(t => t.id === id));
    setResult(null);
    setError("");
    setAmount("");
  }

  function shareResult() {
  navigator.clipboard.writeText(
    `Calculate your M-Pesa charges instantly → hesabu.co.ke/tools/mpesa`
  );
  setToast(true);
  setTimeout(() => setToast(false), 2500);
}

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--page-bg)",
      padding: "0 0 60px",
    }}>
      <style>{`
        :root {
  --page-bg:            #ffffff;
  --topbar-bg:          #1A7A4A;
  --topbar-text:        #ffffff;
  --topbar-sub:         #a8d5b8;
  --card-bg:            #ffffff;
  --card-border:        rgba(26,122,74,0.2);
  --label-color:        #1A7A4A;
  --text-primary:       #0D4A2E;
  --text-muted:         #4a7a60;
  --input-border:       rgba(26,122,74,0.3);
  --input-focus:        #1A7A4A;
  --btn-bg:             #1A7A4A;
  --btn-text:           #ffffff;
  --type-active-bg:     #1A7A4A;
  --type-active-text:   #ffffff;
  --type-active-border: #1A7A4A;
  --type-idle-bg:       #ffffff;
  --type-idle-text:     #4a7a60;
  --type-idle-border:   rgba(26,122,74,0.25);
  --receipt-header-bg:  #1A7A4A;
  --receipt-header-text:#ffffff;
  --receipt-dot:        #C8952A;
  --receipt-border:     #1A7A4A;
  --receipt-bg:         #ffffff;
  --receipt-divider:    rgba(26,122,74,0.15);
  --free-bg:            #f0faf4;
  --free-dot:           #1A7A4A;
  --total-color:        #0D4A2E;
  --fee-color:          #c0392b;
  --free-color:         #1A7A4A;
  --source-color:       #7aaa90;
  --error-bg:           #fff0f0;
  --error-text:         #c0392b;
  --error-border:       #f5c6c6;
}

@media (prefers-color-scheme: dark) {
  :root {
    --page-bg:            #0a0f0c;
    --topbar-bg:          #0D4A2E;
    --topbar-sub:         #6db890;
    --card-bg:            #111a14;
    --card-border:        rgba(255,255,255,0.08);
    --label-color:        #6db890;
    --text-primary:       #e8f5ee;
    --text-muted:         #8abfa0;
    --input-border:       rgba(255,255,255,0.12);
    --input-focus:        #3FB950;
    --btn-bg:             #1A7A4A;
    --btn-text:           #ffffff;
    --type-active-bg:     #1A7A4A;
    --type-active-text:   #ffffff;
    --type-active-border: #1A7A4A;
    --type-idle-bg:       #111a14;
    --type-idle-text:     #8abfa0;
    --type-idle-border:   rgba(255,255,255,0.1);
    --receipt-header-bg:  #0D4A2E;
    --receipt-border:     rgba(63,185,80,0.3);
    --receipt-bg:         #111a14;
    --receipt-divider:    rgba(255,255,255,0.08);
    --free-bg:            #0d1f14;
    --total-color:        #a8d5b8;
    --source-color:       #4a7a60;
    --error-bg:           #1a0a0a;
    --error-text:         #f87171;
    --error-border:       rgba(248,113,113,0.2);
  }
}

.mpesa-type-btn {
  padding: 10px 6px;
  border-radius: 10px;
  border: 1.5px solid var(--type-idle-border);
  background: var(--type-idle-bg);
  color: var(--type-idle-text);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  line-height: 1.4;
  transition: all 0.15s;
  font-family: inherit;
}
.mpesa-type-btn.active {
  border-color: var(--type-active-border);
  background: var(--type-active-bg);
  color: var(--type-active-text);
}
.mpesa-amount-input {
  width: 100%;
  padding: 14px 14px 14px 56px;
  border-radius: 12px;
  border: 1.5px solid var(--input-border);
  background: var(--card-bg);
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 500;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}
.mpesa-amount-input:focus {
  border-color: var(--input-focus);
}
.mpesa-calc-btn {
  width: 100%;
  padding: 15px;
  background: var(--btn-bg);
  color: var(--btn-text);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: opacity 0.15s;
}
.mpesa-calc-btn:active { opacity: 0.85; }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.receipt-animate { animation: slideUp 0.25s ease; }
      `}</style>

      {/* Topbar */}
      <div style={{
        background: "var(--topbar-bg)",
        padding: "28px 20px 32px",
      }}>
        <div style={{ fontSize: "11px", color: "var(--topbar-sub)", letterSpacing: "0.8px", marginBottom: "6px" }}>
          HESABU
        </div>
        <div style={{ fontSize: "24px", fontWeight: "700", color: "var(--topbar-text)", marginBottom: "4px" }}>
          M-Pesa Calculator
        </div>
        <div style={{ fontSize: "12px", color: "var(--topbar-sub)", fontStyle: "italic" }}>
          Because a 4-page PDF is not a calculator.
        </div>
      </div>

      {/* Card */}
      <div style={{
        maxWidth: "480px",
        margin: "-16px auto 0",
        background: "var(--card-bg)",
        borderRadius: "20px 20px 0 0",
        padding: "24px 20px",
      }}>

        {/* Type selector */}
        <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--label-color)", letterSpacing: "0.6px", marginBottom: "10px" }}>
          TRANSACTION TYPE
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "24px" }}>
          {transactionTypes.map(t => (
            <button
              key={t.id}
              className={`mpesa-type-btn${txType.id === t.id ? " active" : ""}`}
              onClick={() => handleType(t.id)}
            >
              <span style={{ fontSize: "18px", display: "block", marginBottom: "4px" }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Amount input */}
        <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--label-color)", letterSpacing: "0.6px", marginBottom: "10px" }}>
          AMOUNT (KES)
        </div>
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", pointerEvents: "none",
          }}>KES</span>
          <input
            className="mpesa-amount-input"
            type="number"
            value={amount}
            placeholder={`${txType.min.toLocaleString()} – ${txType.max.toLocaleString()}`}
            onChange={e => { setAmount(e.target.value); setResult(null); setError(""); }}
            onKeyDown={e => e.key === "Enter" && calculate()}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{
            padding: "10px 14px", borderRadius: "10px", marginBottom: "16px",
            background: "var(--error-bg)", color: "var(--error-text)",
            border: "1px solid var(--error-border)", fontSize: "13px",
          }}>
            {error}
          </div>
        )}

        {/* Button */}
        <button className="mpesa-calc-btn" onClick={calculate}>
          Calculate fee
        </button>

{/* Toast */}
{toast && (
  <div style={{
    position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
    background: "#0D4A2E", color: "#fff", padding: "10px 20px",
    borderRadius: "20px", fontSize: "13px", fontWeight: "500",
    zIndex: 999, whiteSpace: "nowrap",
    animation: "slideUp 0.2s ease",
  }}>
    ✓ Copied to clipboard
  </div>
)}

{/* Receipt result */}
{result && (
  <div className="receipt-animate" style={{
    marginTop: "24px",
    border: "1.5px solid var(--receipt-border)",
    borderRadius: "16px",
    overflow: "hidden",
    background: "var(--receipt-bg)",
  }}>
    <div style={{
      background: "var(--receipt-header-bg)",
      padding: "12px 16px",
      display: "flex", alignItems: "center", gap: "8px",
    }}>
      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--receipt-dot)" }} />
      <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--receipt-header-text)", letterSpacing: "0.3px", flex: 1 }}>
        {result.label.toUpperCase()}
      </span>
    </div>

    <div style={{ padding: "16px" }}>
      {/* Amount row */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid var(--receipt-divider)" }}>
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Amount</span>
        <span style={{ fontSize: "14px", fontWeight: "600" }}>KES {result.amount.toLocaleString()}</span>
      </div>

      {/* Fee row */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid var(--receipt-divider)" }}>
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Safaricom fee</span>
        <span style={{ fontSize: "14px", fontWeight: "600", color: result.fee === 0 ? "var(--free-color)" : "var(--fee-color)" }}>
          {result.fee === 0 ? "Free" : `KES ${result.fee.toLocaleString()}`}
        </span>
      </div>

      {/* Recipient gets — only for send transactions */}
      {txType.senderPays && (
        <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "0.5px solid var(--receipt-divider)" }}>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Recipient gets</span>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--free-color)" }}>
            KES {result.amount.toLocaleString()}
          </span>
        </div>
      )}

      {/* Total row */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingTop: "14px", marginTop: "4px",
        borderTop: "1.5px dashed var(--receipt-divider)",
      }}>
        <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>
          {txType.senderPays ? "You send" : "You lose"}
        </span>
        <span style={{ fontSize: "24px", fontWeight: "700", color: "var(--total-color)" }}>
          KES {result.total.toLocaleString()}
        </span>
      </div>

      {/* Share button */}
      <button
        onClick={shareResult}
        style={{
          width: "100%", marginTop: "16px",
          padding: "11px", borderRadius: "10px",
          border: "1.5px solid var(--receipt-border)",
          background: "transparent", color: "var(--label-color)",
          fontSize: "13px", fontWeight: "600",
          cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
        }}
      >
        Share result
      </button>
    </div>
  </div>
)}

        {/* Free transactions */}
        <div style={{
          marginTop: "28px", padding: "16px",
          background: "var(--free-bg)", borderRadius: "12px",
        }}>
          <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--label-color)", letterSpacing: "0.6px", marginBottom: "10px" }}>
            ALWAYS FREE
          </div>
          {["All deposits into M-Pesa", "Buying airtime via M-Pesa", "Balance enquiry", "PIN change", "M-Pesa registration"].map(item => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--free-dot)", flexShrink: 0 }} />
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Source */}
        <p style={{ textAlign: "center", fontSize: "11px", color: "var(--source-color)", marginTop: "20px" }}>
          Safaricom official tariffs · Updated May 2024
        </p>
      </div>
    </div>
  );
}