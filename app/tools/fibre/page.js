"use client";

import { useState, useMemo } from "react";
import { providers, budgets } from "@/data/fibre";

export default function FibreComparator() {
  const [budget, setBudget] = useState(budgets[1]);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(false);

  const filtered = useMemo(() => {
    return providers
      .map((provider) => {
        const matching = provider.packages
          .filter((p) => p.price <= budget.max)
          .sort((a, b) => b.speed - a.speed);
        return matching.length > 0 ? { provider, package: matching[0] } : null;
      })
      .filter(Boolean)
      .sort(
        (a, b) =>
          b.package.speed / b.package.price - a.package.speed / a.package.price,
      );
  }, [budget]);

  function share() {
    const text = `Compare home fibre providers in Kenya → hesabu.co.ke/tools/fibre`;
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
    <div
      style={{
        minHeight: "100vh",
        background: "var(--page-bg)",
        paddingBottom: "60px",
      }}
    >
      <style>{`
        :root {
          --page-bg:     #ffffff;
          --topbar-bg:   #042C53;
          --topbar-sub:  #85B7EB;
          --card-bg:     #ffffff;
          --label-color: #185FA5;
          --text-primary:#042C53;
          --text-muted:  #185FA5;
          --idle-border: rgba(24,95,165,0.2);
          --idle-bg:     #ffffff;
          --idle-text:   #185FA5;
          --active-bg:   #185FA5;
          --active-text: #ffffff;
          --free-bg:     #E6F1FB;
          --divider:     rgba(24,95,165,0.1);
          --source-color:#378ADD;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --page-bg:     #020c18;
            --topbar-bg:   #020c18;
            --topbar-sub:  #85B7EB;
            --card-bg:     #071628;
            --label-color: #85B7EB;
            --text-primary:#E6F1FB;
            --text-muted:  #85B7EB;
            --idle-border: rgba(133,183,235,0.15);
            --idle-bg:     #071628;
            --idle-text:   #85B7EB;
            --active-bg:   #185FA5;
            --active-text: #ffffff;
            --free-bg:     #040f1f;
            --divider:     rgba(133,183,235,0.08);
            --source-color:#378ADD;
          }
        }
        .budget-btn {
          padding:10px 14px; border-radius:20px;
          border:1.5px solid var(--idle-border);
          background:var(--idle-bg); color:var(--idle-text);
          font-size:13px; font-weight:500;
          cursor:pointer; font-family:inherit;
          transition:all 0.15s; white-space:nowrap;
          width:100%;
        }
        .budget-btn.active {
          border-color:var(--active-bg); border-width:2px;
          background:var(--active-bg); color:var(--active-text);
          font-weight:700;
        }
        .provider-card {
          border-radius:14px;
          border:1.5px solid var(--idle-border);
          background:var(--card-bg);
          overflow:hidden;
          transition:border-color 0.15s;
          cursor:pointer;
        }
        .pkg-row {
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:8px 16px;
          border-top:0.5px solid var(--divider);
          font-size:12px;
        }
        .pkg-row.active-pkg {
          background:var(--free-bg);
        }
        .reliability {
          display:flex; gap:3px; align-items:center;
        }
        .rel-dot {
          width:7px; height:7px; border-radius:50%;
        }
        .share-btn {
          width:100%; margin-top:16px; padding:11px;
          border-radius:10px;
          border:1.5px solid var(--idle-border);
          background:transparent; color:var(--label-color);
          font-size:13px; font-weight:600;
          cursor:pointer; font-family:inherit;
        }
        @keyframes slideUp {
          from{opacity:0;transform:translateY(8px);}
          to{opacity:1;transform:translateY(0);}
        }
        .animate { animation:slideUp 0.2s ease; }
      `}</style>

      {/* Topbar */}
      <div
        style={{ background: "var(--topbar-bg)", padding: "28px 20px 32px" }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div
            style={{
              fontSize: "11px",
              color: "var(--topbar-sub)",
              letterSpacing: "0.8px",
              marginBottom: "6px",
            }}
          >
            HESABU
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#ffffff",
              marginBottom: "4px",
            }}
          >
            Home Fibre Comparator
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--topbar-sub)",
              fontStyle: "italic",
            }}
          >
            Find the best internet for your home and budget in Kenya.
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "560px",
          margin: "-16px auto 0",
          background: "var(--card-bg)",
          borderRadius: "20px 20px 0 0",
          padding: "24px 20px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Budget selector */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: "var(--label-color)",
            letterSpacing: "0.6px",
            marginBottom: "12px",
          }}
        >
          MONTHLY BUDGET
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          {budgets.map((b) => (
            <button
              key={b.id}
              className={`budget-btn${budget.id === b.id ? " active" : ""}`}
              onClick={() => {
                setBudget(b);
                setSelected(null);
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: "600",
            color: "var(--label-color)",
            letterSpacing: "0.6px",
            marginBottom: "12px",
          }}
        >
          {filtered.length} PROVIDER{filtered.length !== 1 ? "S" : ""} WITHIN
          YOUR BUDGET
          <span
            style={{
              float: "right",
              fontSize: "11px",
              color: "var(--text-muted)",
              fontWeight: "400",
              letterSpacing: "0",
            }}
          >
            Tap a card for all packages
          </span>
        </div>

        {/* Provider cards */}
        {filtered.length === 0 ? (
          <div
            style={{
              padding: "32px",
              textAlign: "center",
              background: "var(--free-bg)",
              borderRadius: "12px",
              color: "var(--text-muted)",
              fontSize: "14px",
            }}
          >
            No providers match this budget.
            <br />
            <span
              style={{ fontSize: "12px", marginTop: "6px", display: "block" }}
            >
              Try increasing your budget.
            </span>
          </div>
        ) : (
          <div
            className="animate"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {filtered.map((rec, i) => {
              const p = rec.provider;
              const isSelected = selected === p.name;
              const isBest = i === 0;
              return (
                <div
                  key={p.name}
                  className="provider-card"
                  style={{
                    borderColor:
                      isSelected || isBest ? p.color : "var(--idle-border)",
                    borderWidth: isSelected || isBest ? "2px" : "1.5px",
                  }}
                  onClick={() => setSelected(isSelected ? null : p.name)}
                >
                  {/* Provider header */}
                  <div style={{ background: p.bg, padding: "12px 16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "6px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: "700",
                            color: p.dark,
                          }}
                        >
                          {p.name}
                        </div>
                        {isBest && (
                          <div
                            style={{
                              fontSize: "9px",
                              fontWeight: "700",
                              background: p.color,
                              color: "#fff",
                              padding: "2px 7px",
                              borderRadius: "8px",
                              display: "inline-block",
                              marginTop: "4px",
                            }}
                          >
                            BEST VALUE
                          </div>
                        )}
                      </div>
                      <div className="reliability">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <div
                            key={n}
                            className="rel-dot"
                            style={{
                              background:
                                n <= p.reliable
                                  ? p.color
                                  : "var(--idle-border)",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: p.color,
                        fontWeight: "600",
                      }}
                    >
                      {rec.provider.contract}
                    </div>
                  </div>

                  {/* Best package */}
                  <div
                    style={{
                      padding: "14px 16px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "0.5px solid var(--divider)",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text-muted)",
                          marginBottom: "3px",
                        }}
                      >
                        Best in budget
                      </div>
                      <div
                        style={{
                          fontSize: "26px",
                          fontWeight: "700",
                          color: p.color,
                          lineHeight: 1,
                        }}
                      >
                        {rec.package.speed}{" "}
                        <span style={{ fontSize: "14px", fontWeight: "500" }}>
                          Mbps
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "var(--text-muted)",
                          marginTop: "3px",
                        }}
                      >
                        {p.installation}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: "700",
                          color: "var(--text-primary)",
                        }}
                      >
                        KES {rec.package.price.toLocaleString()}
                      </div>
                      <div
                        style={{ fontSize: "11px", color: "var(--text-muted)" }}
                      >
                        /month
                      </div>
                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "11px",
                          color: p.color,
                          fontWeight: "600",
                        }}
                      >
                        {isSelected ? "↑ tap to close" : "↓ see all packages"}
                      </div>
                    </div>
                  </div>

                  {/* Expanded — all packages */}
                  {isSelected && (
                    <div style={{ borderTop: "0.5px solid var(--divider)" }}>
                      <div
                        style={{
                          padding: "8px 16px 4px",
                          fontSize: "10px",
                          fontWeight: "600",
                          color: "var(--label-color)",
                          letterSpacing: "0.4px",
                        }}
                      >
                        ALL PACKAGES
                      </div>
                      {p.packages.map((pkg) => {
                        const inBudget = pkg.price <= budget.max;
                        const isRec = pkg.name === rec.package.name;
                        return (
                          <div
                            key={pkg.name}
                            className={`pkg-row${isRec ? " active-pkg" : ""}`}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: "600",
                                  color: inBudget
                                    ? "var(--text-primary)"
                                    : "var(--text-muted)",
                                  fontSize: "13px",
                                }}
                              >
                                {pkg.speed} Mbps
                              </span>
                              <span
                                style={{
                                  fontSize: "11px",
                                  color: "var(--text-muted)",
                                }}
                              >
                                {pkg.name}
                              </span>
                              {isRec && (
                                <span
                                  style={{
                                    fontSize: "9px",
                                    color: p.color,
                                    fontWeight: "700",
                                  }}
                                >
                                  ✓ recommended
                                </span>
                              )}
                              {!inBudget && (
                                <span
                                  style={{ fontSize: "9px", color: "#c0392b" }}
                                >
                                  over budget
                                </span>
                              )}
                            </div>
                            <span
                              style={{
                                fontWeight: "600",
                                color: inBudget
                                  ? "var(--text-primary)"
                                  : "var(--text-muted)",
                                fontSize: "13px",
                                flexShrink: 0,
                              }}
                            >
                              KES {pkg.price.toLocaleString()}
                            </span>
                          </div>
                        );
                      })}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          borderTop: "0.5px solid var(--divider)",
                        }}
                      >
                        <div
                          style={{
                            padding: "10px 16px",
                            fontSize: "12px",
                            borderRight: "0.5px solid var(--divider)",
                          }}
                        >
                          <div
                            style={{
                              color: "var(--text-muted)",
                              marginBottom: "2px",
                            }}
                          >
                            Installation
                          </div>
                          <div
                            style={{
                              color: "var(--text-primary)",
                              fontWeight: "500",
                            }}
                          >
                            {p.installation}
                          </div>
                        </div>
                        <div style={{ padding: "10px 16px", fontSize: "12px" }}>
                          <div
                            style={{
                              color: "var(--text-muted)",
                              marginBottom: "2px",
                            }}
                          >
                            Coverage
                          </div>
                          <div
                            style={{
                              color: "var(--text-primary)",
                              fontWeight: "500",
                              fontSize: "11px",
                              lineHeight: 1.4,
                            }}
                          >
                            {p.coverage}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Starlink note */}
        {budget.id !== "budget" && (
          <div
            style={{
              marginTop: "16px",
              padding: "14px 16px",
              borderRadius: "12px",
              background: "#EEEDFE",
              border: "1px solid rgba(83,74,183,0.2)",
              fontSize: "13px",
              color: "#26215C",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ display: "block", marginBottom: "4px" }}>
              ⚡ Starlink — anywhere in Kenya
            </strong>
            Unlike fibre providers, Starlink works in rural areas and upcountry.
            One-time equipment cost of approx. KES 45,000 — no monthly contract.
          </div>
        )}

        {/* Quick comparison table */}
        <div style={{ marginTop: "20px" }}>
          <div
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "var(--label-color)",
              letterSpacing: "0.6px",
              marginBottom: "12px",
            }}
          >
            QUICK COMPARISON
          </div>
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "0.5px solid var(--idle-border)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 0.8fr 1fr",
                background: "var(--free-bg)",
                padding: "8px 12px",
              }}
            >
              {["Provider", "Speed", "Price/mo"].map((h) => (
                <div
                  key={h}
                  style={{
                    fontSize: "10px",
                    fontWeight: "600",
                    color: "var(--label-color)",
                    letterSpacing: "0.4px",
                  }}
                >
                  {h}
                </div>
              ))}
            </div>
            {filtered.map((rec, i) => (
              <div
                key={rec.provider.name}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr 1fr",
                  padding: "10px 12px",
                  borderTop: "0.5px solid var(--divider)",
                  background: i === 0 ? "var(--free-bg)" : "var(--card-bg)",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: rec.provider.color,
                  }}
                >
                  {rec.provider.name}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-primary)",
                    fontWeight: "500",
                  }}
                >
                  {rec.package.speed} Mbps
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-primary)",
                    fontWeight: "500",
                  }}
                >
                  KES {(rec.package.price / 1000).toFixed(1)}K
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Good to know */}
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "var(--free-bg)",
            borderRadius: "12px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "var(--label-color)",
              letterSpacing: "0.6px",
              marginBottom: "10px",
            }}
          >
            GOOD TO KNOW
          </div>
          {[
            "Advertised speeds are 'up to' — real speeds depend on your area and time of day",
            "Always confirm coverage at your specific address before signing up",
            "Starlink is the only provider with true nationwide rural coverage",
            "Poa! Internet focuses on affordable access in Nairobi informal settlements",
            "Most providers offer free installation — always ask before signing",
          ].map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                gap: "8px",
                padding: "3px 0",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#185FA5",
                  flexShrink: 0,
                  marginTop: "6px",
                }}
              />
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>

        <button className="share-btn" onClick={share}>
          Share this tool →
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "var(--source-color)",
            marginTop: "16px",
          }}
        >
          Data from official provider websites · Verified March 2026
        </p>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#042C53",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "500",
            zIndex: 999,
            whiteSpace: "nowrap",
          }}
        >
          ✓ Copied to clipboard
        </div>
      )}
    </div>
  );
}
