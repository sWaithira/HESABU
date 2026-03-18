"use client";

import { useState, useMemo } from "react";
import { useCases, durations, getRecommendations, bundles } from "@/data/bundles";

const VALIDITIES = ["daily", "weekly", "monthly", "noexpiry"];
const PROVIDERS   = ["Safaricom", "Airtel", "Telkom"];

const PROVIDER_COLORS = {
  Safaricom: { color:"#1A7A4A", bg:"#E8F5EE", dark:"#0D4A2E", light:"#c8e6d4" },
  Airtel:    { color:"#CC0000", bg:"#FFF0F0", dark:"#7a0000", light:"#f5c6c6" },
  Telkom:    { color:"#0066CC", bg:"#E6F1FB", dark:"#003d7a", light:"#b5d4f4" },
};

export default function BundleComparator() {
  const [mode, setMode]         = useState("usecase");
  const [useCase, setUseCase]   = useState(useCases[0]);
  const [duration, setDuration] = useState(durations[1]);
  const [validity, setValidity] = useState("weekly");
  const [toast, setToast]       = useState(false);
  const [showGbHelp, setShowGbHelp] = useState(false); 

  const recommendations = useMemo(
    () => getRecommendations(useCase, duration, validity),
    [useCase, duration, validity]
  );

  const browseBundles = useMemo(() => {
    const result = {};
    PROVIDERS.forEach(p => {
      result[p] = bundles
        .filter(b => b.provider === p && b.validity === validity)
        .sort((a, b) => a.price - b.price);
    });
    return result;
  }, [validity]);

function share() {
  const text =  `Find the best data bundle in Kenya → hesabu.co.ke/tools/bundles`
  
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
    <div style={{ minHeight:"100vh", background:"var(--page-bg)", paddingBottom:"60px" }}>
      <style>{`
        :root {
          --page-bg:      #ffffff;
          --topbar-bg:    #26215C;
          --topbar-sub:   #AFA9EC;
          --label-color:  #534AB7;
          --text-primary: #1a1a2e;
          --text-muted:   #534AB7;
          --input-border: rgba(83,74,183,0.25);
          --card-bg:      #ffffff;
          --idle-bg:      #ffffff;
          --idle-text:    #534AB7;
          --idle-border:  rgba(83,74,183,0.2);
          --active-bg:    #534AB7;
          --active-text:  #ffffff;
          --free-bg:      #EEEDFE;
          --source-color: #7F77DD;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --page-bg:      #0a0912;
            --topbar-bg:    #1a1730;
            --topbar-sub:   #AFA9EC;
            --label-color:  #AFA9EC;
            --text-primary: #e8e6ff;
            --text-muted:   #AFA9EC;
            --card-bg:      #14121f;
            --idle-bg:      #14121f;
            --idle-text:    #AFA9EC;
            --idle-border:  rgba(175,169,236,0.15);
            --active-bg:    #534AB7;
            --active-text:  #ffffff;
            --free-bg:      #0d0b1a;
            --source-color: #7F77DD;
          }
        }
        .pill-btn {
          padding:9px 14px; border-radius:20px;
          border:1.5px solid var(--idle-border);
          background:var(--idle-bg); color:var(--idle-text);
          font-size:13px; font-weight:500;
          cursor:pointer; font-family:inherit;
          transition:all 0.15s; white-space:nowrap;
        }
        .pill-btn.active {
          border-color:var(--active-bg);
          background:var(--active-bg);
          color:var(--active-text);
          font-weight:700;
        }
        .flat-btn {
          flex:1; padding:10px 8px;
          border-radius:10px;
          border:1.5px solid var(--idle-border);
          background:var(--idle-bg); color:var(--idle-text);
          font-size:13px; font-weight:500;
          cursor:pointer; font-family:inherit;
          transition:all 0.15s; text-align:center;
          text-transform:capitalize;
        }
        .flat-btn.active {
          border-color:var(--active-bg); border-width:2px;
          background:var(--active-bg); color:var(--active-text);
          font-weight:700;
        }
        .usecase-btn {
          display:flex; flex-direction:column;
          align-items:center; gap:4px;
          padding:12px 8px;
          border-radius:12px;
          border:1.5px solid var(--idle-border);
          background:var(--idle-bg); color:var(--idle-text);
          font-size:12px; font-weight:500;
          cursor:pointer; font-family:inherit;
          transition:all 0.15s; text-align:center;
          line-height:1.3;
        }
        .usecase-btn.active {
          border-color:var(--active-bg); border-width:2px;
          background:var(--free-bg); color:var(--label-color);
          font-weight:700;
        }
        .provider-card {
          border-radius:14px;
          border:1.5px solid var(--idle-border);
          background:var(--card-bg);
          overflow:hidden;
          flex:1;
          min-width:0;
        }
        .provider-card.covers {
          border-width:2px;
        }
        .mode-tab {
          flex:1; padding:11px;
          border:none; border-bottom:2px solid transparent;
          background:transparent; color:var(--text-muted);
          font-size:13px; font-weight:500;
          cursor:pointer; font-family:inherit;
          transition:all 0.15s;
        }
        .mode-tab.active {
          color:var(--label-color);
          border-bottom-color:var(--label-color);
        }
        @keyframes slideUp {
          from{opacity:0;transform:translateY(8px);}
          to{opacity:1;transform:translateY(0);}
        }
        .animate { animation:slideUp 0.2s ease; }
      `}</style>

      {/* Topbar */}
      <div style={{ background:"var(--topbar-bg)", padding:"28px 20px 32px" }}>
        <div style={{ fontSize:"11px", color:"var(--topbar-sub)", letterSpacing:"0.8px", marginBottom:"6px" }}>HESABU</div>
        <div style={{ fontSize:"24px", fontWeight:"700", color:"#ffffff", marginBottom:"4px" }}>Data Bundle Comparator</div>
        <div style={{ fontSize:"12px", color:"var(--topbar-sub)", fontStyle:"italic" }}>
          Who gives you the most data for your money in Kenya?
        </div>
      </div>

      <div style={{ maxWidth:"560px", margin:"-16px auto 0", background:"var(--card-bg)", borderRadius:"20px 20px 0 0", padding:"0 0 24px" }}>

        {/* Mode tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid var(--idle-border)" }}>
          <button className={`mode-tab${mode==="usecase"?" active":""}`} onClick={() => setMode("usecase")}>
            By use case
          </button>
          <button className={`mode-tab${mode==="browse"?" active":""}`} onClick={() => setMode("browse")}>
            Browse all bundles
          </button>
        </div>

        <div style={{ padding:"20px" }}>

          {/* Period selector — shared between both modes */}
          <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"10px" }}>
            BUNDLE PERIOD
          </div>
          <div style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
            {VALIDITIES.map(v => (
        <button
            key={v}
            className={`flat-btn${validity===v?" active":""}`}
            onClick={() => setValidity(v)}
            style={{ flex: v === "noexpiry" ? "1.5" : "1" }}
        > 
             {v === "noexpiry" ? "No Expiry" : v}
        </button>
))}
          </div>

          {/* ── USE CASE MODE ── */}
          {mode === "usecase" && (
            <>
              {/* Use case selector */}
              <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"10px" }}>
                WHAT ARE YOU USING DATA FOR?
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:"6px", marginBottom:"20px" }}>
                {useCases.map(uc => (
                  <button
                    key={uc.id}
                    className={`usecase-btn${useCase.id===uc.id?" active":""}`}
                    onClick={() => setUseCase(uc)}
                  >
                    <span style={{ fontSize:"20px" }}>{uc.emoji}</span>
                    <span>{uc.label.split(" ")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Use case detail */}
              <div style={{ padding:"10px 14px", borderRadius:"10px", background:"var(--free-bg)", marginBottom:"20px", fontSize:"13px", color:"var(--text-muted)" }}>
                <strong style={{ color:"var(--label-color)" }}>{useCase.emoji} {useCase.label}</strong> — {useCase.desc}<br/>
                <span style={{ fontSize:"12px" }}>Uses approx. {useCase.mbPerHour}MB per hour</span>
              </div>

              {/* Duration selector */}
              <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"10px" }}>
                HOW LONG PER SESSION?
              </div>
              <div style={{ display:"flex", gap:"6px", marginBottom:"24px", flexWrap:"wrap" }}>
                {durations.map(d => (
                  <button
                    key={d.id}
                    className={`pill-btn${duration.id===d.id?" active":""}`}
                    onClick={() => setDuration(d)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {/* Needed MB */}
              <div style={{ textAlign:"center", marginBottom:"20px", padding:"12px", background:"var(--free-bg)", borderRadius:"10px" }}>
                <span style={{ fontSize:"13px", color:"var(--text-muted)" }}>You need at least </span>
                <span style={{ fontSize:"18px", fontWeight:"700", color:"var(--label-color)" }}>
                  {recommendations[0]?.neededMB >= 1024
                    ? `${(recommendations[0].neededMB/1024).toFixed(1)}GB`
                    : `${recommendations[0]?.neededMB}MB`
                  }
                </span>
                <span style={{ fontSize:"13px", color:"var(--text-muted)" }}> for {duration.label} of {useCase.label.toLowerCase()}</span>
              </div>

              {/* Provider recommendations side by side */}
              <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"10px" }}>
                CHEAPEST BUNDLE THAT COVERS YOU
              </div>
              <div className="animate" style={{ display:"flex", gap:"8px", marginBottom:"20px" }}>
                {recommendations.map(rec => {
                  const pc = PROVIDER_COLORS[rec.provider];
                  return (
                    <div
                      key={rec.provider}
                      className={`provider-card${rec.covers?" covers":""}`}
                      style={{ borderColor: rec.covers ? pc.color : "var(--idle-border)" }}
                    >
                      {/* Provider header */}
                      <div style={{ background:pc.bg, padding:"10px 10px 8px", textAlign:"center" }}>
                        <div style={{ fontSize:"12px", fontWeight:"700", color:pc.dark }}>{rec.provider}</div>
                        {rec.covers
                          ? <div style={{ fontSize:"9px", color:pc.color, marginTop:"2px", fontWeight:"600" }}>COVERS YOU ✓</div>
                          : <div style={{ fontSize:"9px", color:"#888", marginTop:"2px" }}>NOT ENOUGH</div>
                        }
                      </div>

                      {/* Bundle details */}
                      {rec.bundle ? (
                        <div style={{ padding:"12px 10px", textAlign:"center" }}>
                          <div style={{ fontSize:"20px", fontWeight:"700", color:rec.covers ? pc.color : "#888" }}>
                            {rec.bundle.label}
                          </div>
                          <div style={{ fontSize:"16px", fontWeight:"700", color:"var(--text-primary)", marginTop:"4px" }}>
                            KES {rec.bundle.price}
                          </div>
                          <div style={{ fontSize:"10px", color:"var(--text-muted)", marginTop:"4px" }}>
                            {rec.bundle.validity}
                          </div>
                          {!rec.covers && (
                            <div style={{ fontSize:"10px", color:"#c0392b", marginTop:"6px", lineHeight:1.4 }}>
                              Largest available — may not be enough
                            </div>
                          )}
                        </div>
                      ) : (
                        <div style={{ padding:"12px", textAlign:"center", fontSize:"12px", color:"#888" }}>
                          No bundle available
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Share */}
              <button
                onClick={share}
                style={{
                  width:"100%", padding:"11px",
                  borderRadius:"10px",
                  border:"1.5px solid var(--idle-border)",
                  background:"transparent", color:"var(--label-color)",
                  fontSize:"13px", fontWeight:"600",
                  cursor:"pointer", fontFamily:"inherit",
                  marginBottom:"20px",
                }}
              >
                Share this tool →
              </button>
            </>
          )}

          {/* ── BROWSE MODE ── */}
          {mode === "browse" && (
            <>
              <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"12px" }}>
                ALL {validity.toUpperCase()} BUNDLES
              </div>

              {/* Three provider columns */}
              <div className="animate" style={{ display:"flex", gap:"8px" }}>
                {PROVIDERS.map(provider => {
                  const pc = PROVIDER_COLORS[provider];
                  const list = browseBundles[provider] || [];
                  return (
                    <div key={provider} className="provider-card" style={{ borderColor:pc.light }}>
                      {/* Header */}
                      <div style={{ background:pc.bg, padding:"10px 8px", textAlign:"center", borderBottom:`1px solid ${pc.light}` }}>
                        <div style={{ fontSize:"13px", fontWeight:"700", color:pc.dark }}>{provider}</div>
                      </div>
                      {/* Bundle rows */}
                      {list.map((b, i) => (
                        <div key={i} style={{
                          padding:"10px 8px",
                          borderBottom:`0.5px solid var(--idle-border)`,
                          textAlign:"center",
                        }}>
                          <div style={{ fontSize:"15px", fontWeight:"700", color:pc.color }}>{b.label}</div>
                          <div style={{ fontSize:"13px", fontWeight:"600", color:"var(--text-primary)", marginTop:"2px" }}>KES {b.price}</div>
{/* Find best value in this column and badge it */}
{(() => {
  const cpg = Math.round(b.price / (b.dataMB / 1024));
  const allCpg = list.map(x => Math.round(x.price / (x.dataMB / 1024)));
  const isBest = cpg === Math.min(...allCpg);
  return isBest ? (
    <div style={{
      fontSize:"10px", marginTop:"3px",
      padding:"1px 6px", borderRadius:"4px",
      display:"inline-block",
      background: pc.bg,
      color: pc.color,
      fontWeight:"700",
    }}>
      🔥 Best value
    </div>
  ) : (
    <div style={{ fontSize:"10px", color:"var(--text-muted)", marginTop:"3px" }}>
      KES {cpg}/GB
    </div>
  );
})()}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              <p style={{ textAlign:"center", fontSize:"11px", color:"var(--source-color)", marginTop:"16px" }}>
                Tap a period above to switch between daily, weekly and monthly
              </p>
            </>
          )}

{/* KES/GB explainer */}
<div style={{ marginTop:"20px", marginBottom:"12px" }}>
  <button
    onClick={() => setShowGbHelp(!showGbHelp)}
    style={{
      width:"100%", padding:"12px 16px",
      borderRadius:"10px",
      border:"1px solid var(--idle-border)",
      background:"var(--free-bg)",
      color:"var(--label-color)",
      fontSize:"13px", fontWeight:"600",
      cursor:"pointer", fontFamily:"inherit",
      textAlign:"left",
      display:"flex", justifyContent:"space-between", alignItems:"center",
    }}
  >
    <span>What does KES/GB mean?</span>
    <span>{showGbHelp ? "↑" : "↓"}</span>
  </button>

  {showGbHelp && (
    <div className="animate" style={{ padding:"16px", background:"var(--free-bg)", border:"1px solid var(--idle-border)", borderTop:"none", borderRadius:"0 0 10px 10px", fontSize:"13px", color:"var(--text-muted)", lineHeight:1.8 }}>
      <p style={{ marginBottom:"12px" }}>
        <strong style={{ color:"var(--label-color)" }}>KES per GB</strong> tells you how much you pay for every gigabyte of data. Lower = better deal.
      </p>
      <p style={{ marginBottom:"12px" }}>
        Think of it like buying unga — you don't just look at the total price, you check the price per kilo. Same logic here.
      </p>
      <div style={{ background:"var(--card-bg)", borderRadius:"8px", padding:"12px", marginBottom:"8px" }}>
        <div style={{ fontWeight:"600", color:"var(--label-color)", marginBottom:"6px", fontSize:"12px" }}>Example:</div>
        <div style={{ fontSize:"12px", lineHeight:2 }}>
          Safaricom KES 250 → 500MB = <strong style={{ color:"var(--paye-color)" }}>KES 512/GB</strong><br/>
          Airtel KES 250 → 1GB = <strong style={{ color:"#1A7A4A" }}>KES 250/GB</strong> ← better deal<br/>
          Same price. Airtel gives you twice the data.
        </div>
      </div>
      <p style={{ fontSize:"12px" }}>
        1GB = 1,024MB. So we divide the price by (MB ÷ 1,024) to get KES per GB.
      </p>
    </div>
  )}
</div>

          {/* Info */}
          <div style={{ padding:"16px", background:"var(--free-bg)", borderRadius:"12px", marginTop:"8px" }}>
            <div style={{ fontSize:"11px", fontWeight:"600", color:"var(--label-color)", letterSpacing:"0.6px", marginBottom:"10px" }}>GOOD TO KNOW</div>
            {[
              "Bundle prices change — we verify these monthly",
              "Free WhatsApp bundles don't count toward your main data",
              "Streaming and live sports use the most data",
              "Music uses the least — even 200MB lasts hours",
              "Telkom coverage may be limited outside major towns",
              "Safaricom No Expiry bundles never expire — great if you use data lightly",
            ].map(item => (
              <div key={item} style={{ display:"flex", gap:"8px", padding:"3px 0", alignItems:"flex-start" }}>
                <div style={{ width:"5px", height:"5px", borderRadius:"50%", background:"#534AB7", flexShrink:0, marginTop:"6px" }} />
                <span style={{ fontSize:"13px", color:"var(--text-muted)", lineHeight:1.5 }}>{item}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign:"center", fontSize:"11px", color:"var(--source-color)", marginTop:"16px" }}>
            Data from official provider websites · Verified March 2026
          </p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position:"fixed", bottom:"24px", left:"50%", transform:"translateX(-50%)", background:"#26215C", color:"#fff", padding:"10px 20px", borderRadius:"20px", fontSize:"13px", fontWeight:"500", zIndex:999, whiteSpace:"nowrap" }}>
          ✓ Copied to clipboard
        </div>
      )}
    </div>
  );
}