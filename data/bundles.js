// Source: Official provider websites + verified 2026 market rates
// Safaricom Go Monthly revamp + Airtel Data ImeData campaign
// ⚠️ Verify monthly — Kenyan telco prices change frequently
// Last verified: March 2026

export const bundles = [
  // ─── DAILY ───────────────────────────────────────────────────────
  { provider:"Safaricom", validity:"daily",   price:20,   dataMB:100,   label:"100MB"  },
  { provider:"Safaricom", validity:"daily",   price:50,   dataMB:500,   label:"500MB"  },
  { provider:"Safaricom", validity:"daily",   price:99,   dataMB:1000,  label:"1GB"    },
  { provider:"Airtel",    validity:"daily",   price:20,   dataMB:100,   label:"100MB"  },
  { provider:"Airtel",    validity:"daily",   price:50,   dataMB:350,   label:"350MB"  },
  { provider:"Airtel",    validity:"daily",   price:99,   dataMB:2000,  label:"2GB"    },
  { provider:"Telkom",    validity:"daily",   price:20,   dataMB:200,   label:"200MB"  },
  { provider:"Telkom",    validity:"daily",   price:50,   dataMB:700,   label:"700MB"  },

  // ─── WEEKLY ──────────────────────────────────────────────────────
  { provider:"Safaricom", validity:"weekly",  price:50,   dataMB:100,   label:"100MB"  },
  { provider:"Safaricom", validity:"weekly",  price:99,   dataMB:350,   label:"350MB"  },
  { provider:"Safaricom", validity:"weekly",  price:250,  dataMB:1000,  label:"1GB"    },
  { provider:"Safaricom", validity:"weekly",  price:500,  dataMB:3000,  label:"3GB"    },
  { provider:"Airtel",    validity:"weekly",  price:50,   dataMB:200,   label:"200MB"  },
  { provider:"Airtel",    validity:"weekly",  price:250,  dataMB:2000,  label:"2GB"    },
  { provider:"Airtel",    validity:"weekly",  price:500,  dataMB:6000,  label:"6GB"    },
  { provider:"Telkom",    validity:"weekly",  price:99,   dataMB:1000,  label:"1GB"    },
  { provider:"Telkom",    validity:"weekly",  price:250,  dataMB:3000,  label:"3GB"    },

  // ─── MONTHLY ─────────────────────────────────────────────────────
  { provider:"Safaricom", validity:"monthly", price:250,  dataMB:500,   label:"500MB"  },
  { provider:"Safaricom", validity:"monthly", price:500,  dataMB:1500,  label:"1.5GB"  },
  { provider:"Safaricom", validity:"monthly", price:1000, dataMB:8000,  label:"8GB"    },
  { provider:"Safaricom", validity:"monthly", price:2000, dataMB:17000, label:"17GB"   },
  { provider:"Safaricom", validity:"monthly", price:3000, dataMB:25000, label:"25GB"   },
  { provider:"Airtel",    validity:"monthly", price:250,  dataMB:1000,  label:"1GB"    },
  { provider:"Airtel",    validity:"monthly", price:500,  dataMB:3000,  label:"3GB"    },
  { provider:"Airtel",    validity:"monthly", price:1000, dataMB:12000, label:"12GB"   },
  { provider:"Airtel",    validity:"monthly", price:2000, dataMB:30000, label:"30GB"   },
  { provider:"Telkom",    validity:"monthly", price:500,  dataMB:3000,  label:"3GB"    },
  { provider:"Telkom",    validity:"monthly", price:1000, dataMB:15000, label:"15GB"   },
  { provider:"Telkom",    validity:"monthly", price:2000, dataMB:18000, label:"18GB"   },

  // ─── NO EXPIRY (Safaricom only) ───────────────────────────────────
  { provider:"Safaricom", validity:"noexpiry", price:50,   dataMB:50,    label:"50MB"   },
  { provider:"Safaricom", validity:"noexpiry", price:100,  dataMB:200,   label:"200MB"  },
  { provider:"Safaricom", validity:"noexpiry", price:250,  dataMB:500,   label:"500MB"  },
  { provider:"Safaricom", validity:"noexpiry", price:500,  dataMB:1000,  label:"1GB"    },
  { provider:"Safaricom", validity:"noexpiry", price:1000, dataMB:2500,  label:"2.5GB"  },
];

export const useCases = [
  { id:"social",    emoji:"📱", label:"Social Media",     desc:"WhatsApp, Instagram, TikTok",  mbPerHour:150 },
  { id:"streaming", emoji:"🎬", label:"Streaming",        desc:"Netflix, YouTube, Showmax",    mbPerHour:700 },
  { id:"sports",    emoji:"⚽", label:"Sports & Live TV", desc:"Premier League, AFCON, live",  mbPerHour:500 },
  { id:"work",      emoji:"💼", label:"Working",          desc:"Zoom, emails, Google Drive",   mbPerHour:300 },
  { id:"music",     emoji:"🎵", label:"Music",            desc:"Spotify, Boomplay",            mbPerHour:60  },
];

export const durations = [
  { id:"1hr",  label:"1 hour",   hours:1 },
  { id:"2hr",  label:"2 hours",  hours:2 },
  { id:"3hr",  label:"3 hours",  hours:3 },
  { id:"day",  label:"Full day", hours:8 },
];

export function costPerGB(bundle) {
  const gb = bundle.dataMB / 1024;
  return Math.round(bundle.price / gb);
}

export function getRecommendations(useCase, duration, validity) {
  const neededMB = useCase.mbPerHour * duration.hours;
  return ["Safaricom", "Airtel", "Telkom"].map(provider => {
    const covering = bundles
      .filter(b => b.provider === provider && b.validity === validity && b.dataMB >= neededMB)
      .sort((a, b) => a.price - b.price);

    const largest = bundles
      .filter(b => b.provider === provider && b.validity === validity)
      .sort((a, b) => b.dataMB - a.dataMB)[0] || null;

    return {
      provider,
      bundle:   covering[0] || largest,
      covers:   covering.length > 0,
      neededMB,
    };
  });
}