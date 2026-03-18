"use client";

import { useState } from "react";
import { calculateNetSalary } from "@/data/tax-rates";

export default function SalaryCalculator() {
  const [gross, setGross]   = useState("");
  const [result, setResult] = useState(null);
  const [error, setError]   = useState("");
  const [toast, setToast]   = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  function calculate() {
    setError(""); setResult(null);
    const value = Number(gross);
    if (!gross || isNaN(value) || value <= 0) {
      setError("Please enter a valid gross salary."); return;
    }
    if (value < 24001) {
      setResult({ ...calculateNetSalary(value), belowTax: true });
      return;
    }
    setResult(calculateNetSalary(value));
  }

function share() {
  const text = `Calculate your Kenyan net salary instantly → hesabu.co.ke/tools/salary`
  
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

  const fmt = n => Math.round(n).toLocaleString();
  const pct = (n, d) => ((n / d) * 100).toFixed(1) + "%";

  return (
    <div style={{ minHeight:"100vh", background:"var(--page-bg)", paddingBottom:"60px" }}>
      <style>{`
        :root {
          --page-bg:       #ffffff;
          --topbar-bg:     #0C447C;
          --topbar-sub:    #B5D4F4;
          --card-bg:       #ffffff;
          --label-color:   #185FA5;
          --text-primary:  #042C53;
          --text-muted:    #185FA5;
          --input-border:  rgba(24,95,165,0.25);
          --input-focus:   #378ADD;
          --btn-bg:        #185FA5;
          --btn-text:      #ffffff;
          --free-bg:       #E6F1FB;
          --receipt-hdr:   #0C447C;
          --receipt-dot:   #C8952A;
          --receipt-border:#185FA5;
          --receipt-bg:    #ffffff;
          --receipt-div:   rgba(24,95,165,0.12);
          --source-color:  #378ADD;
          --error-bg:      #fff0f0;
          --error-text:    #c0392b;
          --error-border:  #f5c6c6;
          --paye-color:    #c0392b;
          --nssf-color:    #8a6200;
          --shif-color:    #534AB7;
          --housing-color: #1A7A4A;
          --net-color:     #0C447C;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --page-bg:       #020c18;
            --topbar-bg:     #042C53;
            --topbar-sub:    #85B7EB;
            --card-bg:       #071628;
            --label-color:   #85B7EB;
            --text-primary:  #E6F1FB;
            --text-muted:    #85B7EB;
            --input-border:  rgba(133,183,235,0.2);
            --input-focus:   #378ADD;
            --btn-bg:        #185FA5;
            --free-bg:       #040f1f;
            --receipt-hdr:   #042C53;
            --receipt-border:rgba(55,138,221,0.35);
            --receipt-bg:    #071628;
            --receipt-div:   rgba(133,183,235,0.1);
            --source-color:  #378ADD;
            --error-bg:      #1a0a0a;
            --error-text:    #f87171;
            --error-border:  rgba(248,113,113,0.2);
          }
        }
        .salary-input {
          width:100%; padding:14px 14px 14px 56px;
          border-radius:12px; border:1.5px solid var(--input-border);
          background:var(--card-bg); color:var(--text-primary);
          font-size:20px; font-weight:500; outline:none;
          font-family:inherit; transition:border-color 0.15s;
        }
        .salary-input:focus { border-color:var(--input-focus); }
        .salary-btn {
          width:100%; padding:15px; background:var(--btn-bg);
          color:var(--btn-text); border:none; border-radius:12px;
          font-size:15px; font-weight:600; cursor:pointer;
          font-family:inherit; transition:opacity 0.15s;
        }
        .salary-btn:active { opacity:0.85; }
        .share-btn {
          width:100%; margin-top:12px; padding:11px;
          border-radius:10px; border:1.5px solid var(--receipt-border);
          background:transparent; color:var(--label-color);
          font-size:13px; font-weight:600; cursor:pointer;
          font-family:inherit;
        }
        .help-toggle {
          width:100%; padding:12px 16px;
          border-radius:10px;
          border:1px solid var(--input-border);
          background:var(--free-bg); color:var(--label-color);
          font-size:13px; font-weight:600; cursor:pointer;
          font-family:inherit; text-align:left;
          display:flex; justify-content:space-between;
          align-items:center;
        }
        @keyframes slideUp {
          from{opacity:0;transform:translateY(10px);}
          to{opacity:1;transform:translateY(0);}
        }
        .animate { animation:slideUp 0.25s ease; }
        .bar-wrap {
          height:8px; border-radius:4px;
          background:var(--receipt-div);
          margin-top:6px; overflow:hidden;
        }
        .bar-fill { height:100%; border-radius:4px; transition:width 0.4s ease; }
      `}</style>

      {/* Topbar */}
      <div style={{ background:"var(--topbar-bg)", padding:"28px 20px 32px" }}>
        <div style={{ fontSize:"11px", color:"var(--topbar-sub)", letterSpacing:"0.8px", marginBottom:"6px" }}>HESABU</div>
        <div style={{ fontSize:"24px", fontWeight:"700", color:"#ffffff", marginBottom:"4px" }}>Salary Calculator</div>
        <div style={{ fontSize:"12px", color:"var(--topbar-sub)", fontStyle:"italic" }}>
          See exactly what lands in your account — and where the rest goes.
        </div>
      </div>

      <div style={{ maxWidth:"480px", margin:"-16px auto 0", background:"var(--card-bg)", borderRadius:"20px 20px 0 0", padding:"24px 20px" }}>

        {/* Input */}
        <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"10px" }}>
          GROSS MONTHLY SALARY (KES)
        </div>
        <div style={{ position:"relative", marginBottom:"20px" }}>
          <span style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", fontSize:"13px", fontWeight:"600", color:"var(--text-muted)", pointerEvents:"none" }}>KES</span>
          <input
            className="salary-input"
            type="number"
            min="1"
            value={gross}
            placeholder="e.g. 80,000"
            onChange={e => { setGross(e.target.value); setResult(null); setError(""); }}
            onKeyDown={e => e.key === "Enter" && calculate()}
          />
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding:"10px 14px", borderRadius:"10px", marginBottom:"16px", background:"var(--error-bg)", color:"var(--error-text)", border:"1px solid var(--error-border)", fontSize:"13px" }}>
            {error}
          </div>
        )}

        <button className="salary-btn" onClick={calculate}>
          Calculate my take-home pay
        </button>

        {/* Below tax threshold note */}
        {result?.belowTax && (
          <div className="animate" style={{ marginTop:"16px", padding:"12px 14px", borderRadius:"10px", background:"var(--free-bg)", fontSize:"13px", color:"var(--label-color)", lineHeight:1.6 }}>
            ✓ Your salary is below the KES 24,001 PAYE threshold — you pay no income tax. NSSF, SHIF and Housing Levy still apply.
          </div>
        )}

        {/* Result receipt */}
        {result && (
          <div className="animate" style={{ marginTop:"24px", border:`1.5px solid var(--receipt-border)`, borderRadius:"16px", overflow:"hidden", background:"var(--receipt-bg)" }}>

            {/* Header */}
            <div style={{ background:"var(--receipt-hdr)", padding:"12px 16px", display:"flex", alignItems:"center", gap:"8px" }}>
              <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"var(--receipt-dot)" }} />
              <span style={{ fontSize:"12px", fontWeight:"600", color:"#ffffff", letterSpacing:"0.3px" }}>
                MONTHLY SALARY BREAKDOWN
              </span>
            </div>

            <div style={{ padding:"16px" }}>

              {/* Gross */}
              <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"0.5px solid var(--receipt-div)" }}>
                <span style={{ fontSize:"13px", color:"var(--text-muted)" }}>Gross salary</span>
                <span style={{ fontSize:"13px", fontWeight:"600", color:"var(--text-primary)" }}>KES {fmt(result.gross)}</span>
              </div>

              {/* Deductions */}
              {[
                { label:"PAYE (income tax)",      value: result.paye,    color:"var(--paye-color)",    pct: pct(result.paye, result.gross),    desc:"KRA income tax" },
                { label:"NSSF (pension)",         value: result.nssf,    color:"var(--nssf-color)",    pct: pct(result.nssf, result.gross),    desc:"Retirement savings" },
                { label:"SHIF (health)",          value: result.shif,    color:"var(--shif-color)",    pct: pct(result.shif, result.gross),    desc:"2.75% of gross" },
                { label:"Housing Levy",           value: result.housing, color:"var(--housing-color)", pct: pct(result.housing, result.gross), desc:"1.5% of gross" },
              ].map(row => (
                <div key={row.label} style={{ padding:"8px 0", borderBottom:"0.5px solid var(--receipt-div)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                    <div>
                      <span style={{ fontSize:"13px", color:"var(--text-muted)" }}>{row.label}</span>
                      <span style={{ fontSize:"11px", color:"var(--text-muted)", opacity:0.7, marginLeft:"6px" }}>{row.desc}</span>
                    </div>
                    <span style={{ fontSize:"13px", fontWeight:"600", color:row.color }}>
                      − KES {fmt(row.value)}
                    </span>
                  </div>
                  {/* Visual bar */}
                  <div className="bar-wrap">
                    <div className="bar-fill" style={{ width: pct(row.value, result.gross), background: row.color, opacity:0.7 }} />
                  </div>
                  <div style={{ fontSize:"10px", color:"var(--text-muted)", marginTop:"2px", textAlign:"right" }}>{row.pct} of gross</div>
                </div>
              ))}

              {/* Total deductions */}
              <div style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"0.5px solid var(--receipt-div)" }}>
                <span style={{ fontSize:"13px", fontWeight:"600", color:"var(--text-primary)" }}>Total deductions</span>
                <span style={{ fontSize:"13px", fontWeight:"600", color:"var(--paye-color)" }}>− KES {fmt(result.totalDeductions)}</span>
              </div>

              {/* Net pay */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"14px", marginTop:"4px", borderTop:"1.5px dashed var(--receipt-div)" }}>
                <div>
                  <div style={{ fontSize:"14px", fontWeight:"600", color:"var(--text-primary)" }}>Take-home pay</div>
                  <div style={{ fontSize:"11px", color:"var(--text-muted)", marginTop:"2px" }}>
                    {result.effectiveRate}% of your salary goes to deductions
                  </div>
                </div>
                <span style={{ fontSize:"26px", fontWeight:"700", color:"var(--net-color)" }}>
                  KES {fmt(result.net)}
                </span>
              </div>

              {/* Share */}
              <button className="share-btn" onClick={share}>Share this tool →</button>
            </div>
          </div>
        )}

        {/* What each deduction means */}
        <div style={{ marginTop:"28px" }}>
          <button className="help-toggle" onClick={() => setShowHelp(!showHelp)}>
            <span>What are these deductions?</span>
            <span>{showHelp ? "↑" : "↓"}</span>
          </button>
          {showHelp && (
            <div className="animate" style={{ padding:"16px", background:"var(--free-bg)", border:"1px solid var(--input-border)", borderTop:"none", borderRadius:"0 0 10px 10px" }}>
              {[
                { emoji:"🏛️", name:"PAYE",         color:"var(--paye-color)",    desc:"Pay As You Earn — income tax collected by KRA. The more you earn, the higher the rate (10% to 35%). You get a KES 2,400 personal relief every month." },
                { emoji:"🏦", name:"NSSF",         color:"var(--nssf-color)",    desc:"National Social Security Fund — your pension savings. 6% of your salary up to KES 9,000, then 6% on the next tier. You'll get this back when you retire." },
                { emoji:"🏥", name:"SHIF",         color:"var(--shif-color)",    desc:"Social Health Insurance Fund — replaced NHIF in October 2024. 2.75% of your gross salary. Covers you and your dependants for medical care at accredited facilities." },
                { emoji:"🏠", name:"Housing Levy", color:"var(--housing-color)", desc:"Affordable Housing Levy — 1.5% of gross salary. Goes toward the government's affordable housing program. Your employer also contributes 1.5% on your behalf." },
              ].map(item => (
                <div key={item.name} style={{ display:"flex", gap:"10px", marginBottom:"14px" }}>
                  <span style={{ fontSize:"18px", flexShrink:0 }}>{item.emoji}</span>
                  <div>
                    <div style={{ fontSize:"13px", fontWeight:"600", color:item.color, marginBottom:"2px" }}>{item.name}</div>
                    <div style={{ fontSize:"12px", color:"var(--text-muted)", lineHeight:1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ fontSize:"11px", color:"var(--source-color)", marginTop:"8px", borderTop:"0.5px solid var(--input-border)", paddingTop:"8px" }}>
                Source: KRA Finance Act 2023 · NSSF Act 4th Schedule Feb 2026 · SHIF Oct 2024
              </div>
            </div>
          )}
        </div>

        {/* HELB + SACCO note */}
        <div style={{ marginTop:"12px", padding:"14px 16px", borderRadius:"10px", background:"var(--free-bg)", fontSize:"13px", color:"var(--text-muted)", lineHeight:1.7 }}>
          <strong style={{ color:"var(--label-color)", display:"block", marginBottom:"4px" }}>Other possible deductions</strong>
          HELB loan repayments, SACCO contributions, and insurance premiums vary per person and employer — they're not included here since they differ for everyone.
        </div>

        <p style={{ textAlign:"center", fontSize:"11px", color:"var(--source-color)", marginTop:"20px" }}>
          Based on KRA Finance Act 2023 · NSSF 4th Schedule · SHIF 2024 · Updated March 2026
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:"24px", left:"50%", transform:"translateX(-50%)", background:"#042C53", color:"#fff", padding:"10px 20px", borderRadius:"20px", fontSize:"13px", fontWeight:"500", zIndex:999, whiteSpace:"nowrap" }}>
          ✓ Copied to clipboard
        </div>
      )}
    </div>
  );
}