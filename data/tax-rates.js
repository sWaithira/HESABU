// Source: KRA Finance Act 2023, NSSF Act 2013 Phase 4 (Feb 2026)
// SHIF replaces NHIF effective October 2024 — managed by SHA
// SHIF + Housing Levy are tax-deductible before PAYE (Dec 2024)
// Last verified: March 2026

export const payeBands = [
  { min: 0,      max: 24000,  rate: 0.10 },
  { min: 24001,  max: 32333,  rate: 0.25 },
  { min: 32334,  max: 500000, rate: 0.30 },
  { min: 500001, max: 800000, rate: 0.325 },
  { min: 800001, max: null,   rate: 0.35 },
];

export const personalRelief  = 2400;   // KES/month
export const housingLevyRate = 0.015;  // 1.5% of gross
export const shifRate        = 0.0275; // 2.75% of gross, min KES 300
export const shifMin         = 300;    // minimum SHIF contribution

// NSSF Phase 4 — effective February 2026
export const nssfTier1Limit  = 9000;
export const nssfTier2Limit  = 108000;
export const nssfRate        = 0.06;
export const nssfMaxEmployee = 6480;

export function calcNSSF(gross) {
  const tier1 = Math.min(gross, nssfTier1Limit) * nssfRate;
  const tier2 = gross > nssfTier1Limit
    ? Math.min(gross - nssfTier1Limit, nssfTier2Limit - nssfTier1Limit) * nssfRate
    : 0;
  return Math.min(Math.round(tier1 + tier2), nssfMaxEmployee);
}

export function calcSHIF(gross) {
  return Math.max(shifMin, Math.round(gross * shifRate));
}

export function calcHousingLevy(gross) {
  return Math.round(gross * housingLevyRate);
}

export function calcPAYE(gross, nssf, shif, housing) {
  // SHIF + Housing Levy deductible before PAYE (Tax Laws Amendment Act 2024)
  // NSSF also deductible
  const taxable = Math.max(0, gross - nssf - shif - housing);
  let tax = 0;
  let remaining = taxable;

  for (const band of payeBands) {
    if (remaining <= 0) break;
    const bandTop  = band.max ?? Infinity;
    const bandSize = bandTop - band.min + 1;
    const chunk    = Math.min(remaining, bandSize);
    tax     += chunk * band.rate;
    remaining -= chunk;
  }

  return Math.max(0, Math.round(tax - personalRelief));
}

export function calculateNetSalary(gross) {
  const nssf    = calcNSSF(gross);
  const shif    = calcSHIF(gross);
  const housing = calcHousingLevy(gross);
  const paye    = calcPAYE(gross, nssf, shif, housing);
  const total   = nssf + shif + housing + paye;
  const net     = gross - total;

  return {
    gross,
    nssf,
    shif,
    housing,
    paye,
    totalDeductions: total,
    net,
    effectiveRate: Math.round((total / gross) * 100),
  };
}