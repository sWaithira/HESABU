export const providers = [
  {
    name:        "Safaricom",
    color:       "#1A7A4A",
    bg:          "#E8F5EE",
    dark:        "#0D4A2E",
    coverage:    "Urban — Nairobi, Mombasa, Kisumu, major towns",
    contract:    "30 days",
    installation:"Free",
    reliable:    5,
    packages: [
      { name:"Bronze",   speed:15,   price:2999  },
      { name:"Silver",   speed:30,   price:4100  },
      { name:"Gold",     speed:80,   price:6299  },
      { name:"Diamond",  speed:500,  price:12499 },
      { name:"Platinum", speed:1000, price:20000 },
    ]
  },
  {
    name:        "Zuku",
    color:       "#CC0000",
    bg:          "#FFF0F0",
    dark:        "#7a0000",
    coverage:    "Urban — Nairobi, Mombasa, Nakuru, Eldoret",
    contract:    "30 days",
    installation:"Free modem + router",
    reliable:    3,
    packages: [
      { name:"10Mbps",  speed:10,  price:2799 },
      { name:"20Mbps",  speed:20,  price:3499 },
      { name:"40Mbps",  speed:40,  price:4999 },
      { name:"100Mbps", speed:100, price:7999 },
      { name:"500Mbps", speed:500, price:14999 },
    ]
  },
  {
    name:        "Faiba (JTL)",
    color:       "#0066CC",
    bg:          "#E6F1FB",
    dark:        "#003d7a",
    coverage:    "Urban — Nairobi, Mombasa, select towns",
    contract:    "30 days",
    installation:"KES 2,000 installation",
    reliable:    4,
    packages: [
      { name:"15Mbps",  speed:15,  price:2000 },
      { name:"30Mbps",  speed:30,  price:3500 },
      { name:"70Mbps",  speed:70,  price:5000 },
      { name:"125Mbps", speed:125, price:8000 },
    ]
  },
  {
    name:        "Starlink",
    color:       "#534AB7",
    bg:          "#EEEDFE",
    dark:        "#26215C",
    coverage:    "Nationwide — including rural areas",
    contract:    "None — cancel anytime",
    installation:"KES 45,000 equipment (one-time)",
    reliable:    4,
    packages: [
      { name:"Lite",        speed:50,  price:1300  },
      { name:"Residential", speed:150, price:6500  },
      { name:"Priority",    speed:220, price:21000 },
    ]
  },
  {
    name:        "Poa! Internet",
    color:       "#0F6E56",
    bg:          "#E1F5EE",
    dark:        "#04342C",
    coverage:    "Urban informal settlements — Nairobi estates",
    contract:    "30 days",
    installation:"Free",
    reliable:    3,
    packages: [
      { name:"5Mbps",  speed:5,  price:1575 },
      { name:"10Mbps", speed:10, price:2100 },
      { name:"15Mbps", speed:15, price:2625 },
    ]
  },
  {
    name:        "Liquid Home",
    color:       "#C8952A",
    bg:          "#FFF5E8",
    dark:        "#3d2c00",
    coverage:    "Urban — Nairobi, Mombasa, Kisumu",
    contract:    "30 days",
    installation:"KES 3,000 installation",
    reliable:    4,
    packages: [
      { name:"40Mbps",  speed:40,  price:3799  },
      { name:"60Mbps",  speed:60,  price:4499  },
      { name:"100Mbps", speed:100, price:11999 },
    ]
  },
];

export const useCases = [
  { id:"basic",     emoji:"🌐", label:"Basic browsing",   desc:"News, social media, emails",      minSpeed:5  },
  { id:"streaming", emoji:"🎬", label:"Streaming",        desc:"Netflix, YouTube, Showmax",        minSpeed:25 },
  { id:"wfh",       emoji:"💼", label:"Work from home",   desc:"Zoom, Google Meet, large files",   minSpeed:30 },
  { id:"gaming",    emoji:"⚽", label:"Sports & gaming",  desc:"Live streams, online games",       minSpeed:50 },
  { id:"family",    emoji:"👨‍👩‍👧", label:"Family household", desc:"Multiple devices simultaneously", minSpeed:80 },
];

export const budgets = [
  { id:"budget",   label:"Under KES 3,000",  max:3000  },
  { id:"mid",      label:"KES 3,000–6,000",  max:6000  },
  { id:"premium",  label:"KES 6,000–10,000", max:10000 },
  { id:"unlimited",label:"No limit",         max:99999 },
];

export function getRecommendations(useCase, budget) {
  const results = [];
  providers.forEach(provider => {
    const suitable = provider.packages.filter(
      p => p.speed >= useCase.minSpeed && p.price <= budget.max
    ).sort((a, b) => a.price - b.price);

    if (suitable.length > 0) {
      results.push({
        provider,
        package:   suitable[0],
        valueScore: Math.round(suitable[0].speed / (suitable[0].price / 1000)),
      });
    }
  });
  return results.sort((a, b) => b.valueScore - a.valueScore);
}