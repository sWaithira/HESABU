// Source: Safaricom Official Tariff Sheet — Last Updated May 28, 2024
// hesabu.co.ke — "We simplified this so you don't have to scroll a 4-page PDF"

export const sendMoney = [
  { min: 1,      max: 49,     fee: 0   },
  { min: 50,     max: 100,    fee: 0   },
  { min: 101,    max: 500,    fee: 7   },
  { min: 501,    max: 1000,   fee: 13  },
  { min: 1001,   max: 1500,   fee: 23  },
  { min: 1501,   max: 2500,   fee: 33  },
  { min: 2501,   max: 3500,   fee: 53  },
  { min: 3501,   max: 5000,   fee: 57  },
  { min: 5001,   max: 7500,   fee: 78  },
  { min: 7501,   max: 10000,  fee: 90  },
  { min: 10001,  max: 15000,  fee: 100 },
  { min: 15001,  max: 20000,  fee: 105 },
  { min: 20001,  max: 35000,  fee: 108 },
  { min: 35001,  max: 50000,  fee: 108 },
  { min: 50001,  max: 250000, fee: 108 },
];

export const sendUnregistered = [
  { min: 50,    max: 100,    fee: 0   },
  { min: 101,   max: 500,    fee: 45  },
  { min: 501,   max: 1000,   fee: 50  },
  { min: 1001,  max: 1500,   fee: 55  },
  { min: 1501,  max: 2500,   fee: 60  },
  { min: 2501,  max: 3500,   fee: 65  },
  { min: 3501,  max: 5000,   fee: 70  },
  { min: 5001,  max: 7500,   fee: 75  },
  { min: 7501,  max: 10000,  fee: 80  },
  { min: 10001, max: 15000,  fee: 85  },
  { min: 15001, max: 20000,  fee: 90  },
  { min: 20001, max: 35000,  fee: 95  },
  { min: 35001, max: 50000,  fee: 100 },
  { min: 50001, max: 70000,  fee: 105 },
];

export const withdrawAgent = [
  { min: 50,     max: 100,    fee: 11  },
  { min: 101,    max: 500,    fee: 29  },
  { min: 501,    max: 1000,   fee: 29  },
  { min: 1001,   max: 1500,   fee: 29  },
  { min: 1501,   max: 2500,   fee: 29  },
  { min: 2501,   max: 3500,   fee: 52  },
  { min: 3501,   max: 5000,   fee: 69  },
  { min: 5001,   max: 7500,   fee: 87  },
  { min: 7501,   max: 10000,  fee: 115 },
  { min: 10001,  max: 15000,  fee: 167 },
  { min: 15001,  max: 20000,  fee: 185 },
  { min: 20001,  max: 35000,  fee: 197 },
  { min: 35001,  max: 50000,  fee: 278 },
  { min: 50001,  max: 250000, fee: 309 },
];

export const withdrawATM = [
  { min: 200,   max: 2500,  fee: 35  },
  { min: 2501,  max: 5000,  fee: 69  },
  { min: 5001,  max: 10000, fee: 115 },
  { min: 10001, max: 35000, fee: 203 },
];

export const freeTransactions = [
  "All deposits into M-Pesa",
  "M-Pesa registration",
  "Buying airtime via M-Pesa",
  "Balance enquiry",
  "PIN change",
];

// The core lookup function — give it an amount + rate table, get back the fee
export function getFee(amount, rateTable) {
  const band = rateTable.find(r => amount >= r.min && amount <= r.max);
  return band ? band.fee : null;
}

// ─── FULIZA ───────────────────────────────────────────────────────────────────
// Source: Safaricom/NCBA Official Fuliza Key Facts Document
// ⚠️  Update this file if Safaricom revises Fuliza tariffs

export const fulizaDailyFee = [
  { min: 0,     max: 100,   dailyFee: 0,    graceDays: 0 },
  { min: 101,   max: 500,   dailyFee: 2.50, graceDays: 3 },
  { min: 501,   max: 1000,  dailyFee: 5,    graceDays: 3 },
  { min: 1001,  max: 1500,  dailyFee: 18,   graceDays: 0 },
  { min: 1501,  max: 2500,  dailyFee: 20,   graceDays: 0 },
  { min: 2501,  max: 70000, dailyFee: 25,   graceDays: 0 },
];

export function getFulizaCost(amount, days) {
  const band = fulizaDailyFee.find(r => amount >= r.min && amount <= r.max);
  if (!band) return null;

  const accessFee      = Math.ceil(amount * 0.01);
  const graceDays      = band.graceDays;
  const chargeableDays = Math.max(0, days - graceDays);
  const dailyTotal     = Math.ceil(band.dailyFee * chargeableDays);
  const totalCost      = accessFee + dailyTotal;

  return {
    accessFee,
    dailyFee: band.dailyFee,
    graceDays,
    chargeableDays,
    dailyTotal,
    totalCost,
    totalRepay: amount + totalCost,
  };
}