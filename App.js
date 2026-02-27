/* ═══════════════════════════════════════════════════
   AGRIVISION AI — APPLICATION JAVASCRIPT
   Modular, event-driven architecture
═══════════════════════════════════════════════════ */

'use strict';

// ─── TRANSLATIONS ────────────────────────────────
const TRANSLATIONS = {
  en: { appName:"AgriVision AI", tagline:"Smart Farming", dashboard:"Dashboard", weather:"Weather", crops:"Crop Planning", cropCare:"Crop Care", schemes:"Gov. Schemes", marketing:"Market Prices", upload:"Crop Doctor", expert:"Expert Chat", news:"Agri News", community:"Farm Voice" },
  hi: { appName:"एग्रीविज़न AI", tagline:"स्मार्ट फार्मिंग", dashboard:"डैशबोर्ड", weather:"मौसम", crops:"फसल योजना", cropCare:"फसल देखभाल", schemes:"सरकारी योजनाएं", marketing:"बाजार भाव", upload:"फसल डॉक्टर", expert:"विशेषज्ञ", news:"कृषि समाचार", community:"किसान मंच" },
  te: { appName:"అగ్రివిజన్ AI", tagline:"స్మార్ట్ వ్యవసాయం", dashboard:"డాష్‌బోర్డ్", weather:"వాతావరణం", crops:"పంట ప్రణాళిక", cropCare:"పంట సంరక్షణ", schemes:"ప్రభుత్వ పథకాలు", marketing:"మార్కెట్ ధరలు", upload:"పంట డాక్టర్", expert:"నిపుణుడు", news:"వ్యవసాయ వార్తలు", community:"రైతు వేదిక" },
  ta: { appName:"அக்ரிவிஷன் AI", tagline:"ஸ்மார்ட் விவசாயம்", dashboard:"டாஷ்போர்டு", weather:"வானிலை", crops:"பயிர் திட்டம்", cropCare:"பயிர் பராமரிப்பு", schemes:"அரசு திட்டங்கள்", marketing:"சந்தை விலைகள்", upload:"பயிர் மருத்துவர்", expert:"நிபுணர்", news:"வேளாண் செய்திகள்", community:"விவசாயி மன்றம்" },
  kn: { appName:"ಅಗ್ರಿವಿಷನ್ AI", tagline:"ಸ್ಮಾರ್ಟ್ ಕೃಷಿ", dashboard:"ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", weather:"ಹವಾಮಾನ", crops:"ಬೆಳೆ ಯೋಜನೆ", cropCare:"ಬೆಳೆ ಆರೈಕೆ", schemes:"ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು", marketing:"ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು", upload:"ಬೆಳೆ ವೈದ್ಯ", expert:"ತಜ್ಞರು", news:"ಕೃಷಿ ಸುದ್ದಿ", community:"ರೈತ ವೇದಿಕೆ" },
  mr: { appName:"अॅग्रीविजन AI", tagline:"स्मार्ट शेती", dashboard:"डॅशबोर्ड", weather:"हवामान", crops:"पीक नियोजन", cropCare:"पीक काळजी", schemes:"सरकारी योजना", marketing:"बाजार भाव", upload:"पीक डॉक्टर", expert:"तज्ञ", news:"कृषी बातम्या", community:"शेतकरी मंच" },
};

// ─── DATA ────────────────────────────────────────
const CROP_DATA = {
  Wheat:     { icon:"🌾", sowing:"Oct – Nov (Rabi)", soil:"Loamy, Well-drained", water:"450 – 650 mm", fertilizer:"NPK 120:60:40 kg/ha", harvest:"120 – 150 days", ai:"Ideal for Punjab & Haryana. Current weather patterns favor strong germination. Expect 15–20% above average yield this season. Sow early November for best results." },
  Rice:      { icon:"🍚", sowing:"Jun – Jul (Kharif)", soil:"Clayey, Water-retentive", water:"1000 – 2000 mm", fertilizer:"NPK 100:60:60 kg/ha", harvest:"90 – 150 days", ai:"Best suited for West Bengal & Andhra Pradesh. IMD forecasts 8% above normal rainfall. SRI method recommended — can improve yield by 25% with 30% less water." },
  Maize:     { icon:"🌽", sowing:"Jun – Jul (Kharif)", soil:"Sandy loam to loam", water:"500 – 800 mm", fertilizer:"NPK 120:60:40 kg/ha", harvest:"70 – 90 days", ai:"Karnataka and MP showing strong poultry feed demand. Futures prices up 6%. Consider contract farming with local processors for guaranteed pricing." },
  Cotton:    { icon:"🌿", sowing:"Apr – May (Kharif)", soil:"Black cotton soil", water:"700 – 1200 mm", fertilizer:"NPK 80:40:40 kg/ha", harvest:"150 – 180 days", ai:"Maharashtra Vidarbha region optimal. Monitor for bollworm (Bt varieties recommended). Export prices strengthening — good season to maximize acreage." },
  Sugarcane: { icon:"🎋", sowing:"Feb – Mar (Spring)", soil:"Deep loamy, pH 6.5–7.5", water:"1500 – 2500 mm", fertilizer:"NPK 150:60:60 kg/ha", harvest:"10 – 12 months", ai:"UP & Maharashtra FRP increased by ₹10/quintal. New varieties like Co-0238 giving 15% more sugar recovery. Plant ratoon to reduce input costs by 40%." },
  Soybean:   { icon:"🫘", sowing:"Jun – Jul (Kharif)", soil:"Well-drained loam", water:"450 – 700 mm", fertilizer:"NPK 25:60:40 kg/ha", harvest:"90 – 110 days", ai:"MP and Rajasthan showing strong demand. International prices rising due to South America drought. Excellent export opportunity this season." },
  Groundnut: { icon:"🥜", sowing:"Jun – Jul (Kharif)", soil:"Sandy loam, well-drained", water:"500 – 600 mm", fertilizer:"NPK 20:60:0 kg/ha", harvest:"100 – 130 days", ai:"Gujarat and AP optimal zones. Oil content in pods expected to be high due to dry spell in August. Maintain uniform pod moisture for quality premium." },
  Onion:     { icon:"🧅", sowing:"Oct – Nov (Rabi)", soil:"Well-drained sandy loam", water:"350 – 550 mm", fertilizer:"NPK 100:50:50 kg/ha", harvest:"90 – 120 days", ai:"Nashik arrivals expected 20% lower this year. Prices likely to firm up from February. Store well-dried bulbs in ventilated godowns for maximum returns." },
};

const DISEASES = {
  Wheat: [
    { name:"Yellow Rust (Stripe Rust)", type:"Fungal Disease", icon:"🟡", symptoms:"Yellow-orange stripes along leaf veins; pustules in rows; affected leaves dry up and die.", prevention:"Use resistant varieties like GW 322. Apply balanced nitrogen. Avoid dense planting. Scout fields regularly from tillering stage.", treatment:"Apply Propiconazole 25 EC @ 0.1% at first sign. Repeat after 15 days. Spray in morning to maximize absorption. Follow up with Tebuconazole if severe." },
    { name:"Powdery Mildew", type:"Fungal Disease", icon:"⬜", symptoms:"White powdery coating on upper leaf surface. Leaves turn yellow, then brown. Severe cases stunt grain filling.", prevention:"Maintain spacing of 22.5cm between rows. Avoid excess nitrogen. Plant resistant varieties. Ensure good air circulation.", treatment:"Sulfur 80WP @ 3 g/L or Hexaconazole 5 EC @ 1 ml/L. Spray 2–3 times at 10-day intervals starting at boot stage." },
    { name:"Loose Smut", type:"Seed-borne Fungal", icon:"⚫", symptoms:"Entire ear head replaced by black powder (teliospores). Affects grain completely. Spreads via wind during flowering.", prevention:"Use certified disease-free seeds. Treat seeds with Carboxin 37.5% + Thiram 37.5% WS @ 3 g/kg seed before sowing.", treatment:"No field treatment effective once infected. Remove and destroy smutted ears. Hot water seed treatment at 52°C for 10 minutes preventively." },
  ],
  Rice: [
    { name:"Blast Disease", type:"Fungal Disease", icon:"💥", symptoms:"Diamond-shaped lesions with gray centers and brown borders on leaves. Neck rot causes panicle death (dead heart). Can cause 30–70% yield loss.", prevention:"Balanced nitrogen fertilization. Avoid waterlogging. Use blast-resistant varieties like BPT 5204, IR 64. Maintain 5cm water during heading.", treatment:"Tricyclazole 75 WP @ 0.6 g/L water. Or Isoprothiolane 40 EC @ 1.5 ml/L. Apply at first sign and repeat after 10 days. Spray in early morning." },
    { name:"Brown Plant Hopper", type:"Insect Pest", icon:"🦗", symptoms:"Hopper burn — plants turn brown from base up. Circular patches of wilting. Heavy honeydew deposit causes sooty mold. Worst pest of rice.", prevention:"Avoid excessive nitrogen. Maintain alternating wet-dry irrigation. Conserve natural enemies (spiders). Avoid broad-spectrum insecticides.", treatment:"Imidacloprid 17.8 SL @ 0.5 ml/L or Buprofezin 25 SC @ 1 ml/L. Drain field before spraying. Direct spray at base of plants." },
  ],
  Cotton: [
    { name:"American Bollworm", type:"Insect Pest", icon:"🐛", symptoms:"Circular entry holes in bolls. Greenish caterpillars feed inside. Shedding of squares, flowers and young bolls. Drastic yield reduction.", prevention:"Install pheromone traps @ 5/acre. Use Bt cotton varieties. Encourage natural predators. Timely picking of affected bolls and destroying them.", treatment:"Chlorantraniliprole 18.5 SC @ 0.4 ml/L or Spinosad 45 SC @ 0.4 ml/L. Rotate chemicals to prevent resistance. Spray in evening." },
    { name:"Cotton Leaf Curl Virus", type:"Viral Disease", icon:"🍂", symptoms:"Upward curling of leaves, cup-shaped leaves. Dark green vein thickening. Enations on underside of leaves. Severe stunting. No treatment once infected.", prevention:"Control whitefly vector using yellow sticky traps. Plant CLCuV-resistant varieties. Avoid late planting. Rogue out infected plants early.", treatment:"No cure for infected plants. Control whitefly with Acetamiprid @ 0.3 g/L. Spray neem-based insecticides as preventive measure." },
  ],
  Maize: [
    { name:"Fall Army Worm", type:"Insect Pest", icon:"🪲", symptoms:"Ragged holes in leaves, shot-hole appearance. Frass (excrement) in whorls. Scraped leaf surface. Young plants can die completely.", prevention:"Early planting. Intercrop with beans or cowpea. Monitor regularly at whorl stage. Egg mass collection and destruction.", treatment:"Spinetoram 11.7 SC @ 0.5 ml/L directed into whorls. Emamectin benzoate 5 SG @ 0.4 g/L. Chlorantraniliprole 18.5 SC also effective." },
    { name:"Maize Streak Virus", type:"Viral Disease", icon:"〰️", symptoms:"Broken streaks of creamy white on green leaf background. Narrow parallel streaks. Stunted plants. Reduced ear size and grain number.", prevention:"Use streak-resistant hybrids. Control leafhopper vector using insecticides. Rogue infected plants before 3-leaf stage.", treatment:"No cure — rogue infected plants. Apply Imidacloprid 17.8 SL seed treatment @ 5 ml/kg seed. Control leafhoppers in nurseries." },
  ],
};

const SCHEMES = [
  { id:1, name:"PM-KISAN", fullName:"Pradhan Mantri Kisan Samman Nidhi", icon:"💰", colorHex:"#16a34a", cat:"Income Support", desc:"Direct income support scheme providing ₹6,000 per year to eligible small and marginal landholding farmers across India.", elig:"All landholding farmer families with cultivable land. Excludes institutional landholders, income tax payers, professionals, and serving/retired govt employees.", benefit:"₹6,000/year paid in 3 installments of ₹2,000 directly to bank account via DBT. 17th installment recently credited to 9.4 crore farmers." },
  { id:2, name:"PMFBY", fullName:"Pradhan Mantri Fasal Bima Yojana", icon:"🛡️", colorHex:"#2563eb", cat:"Crop Insurance", desc:"Comprehensive crop insurance providing financial support to farmers who suffer crop loss due to unforeseen events.", elig:"All farmers growing notified crops in notified areas. Compulsory for loanee farmers, voluntary for others.", benefit:"Premium: 2% for Kharif, 1.5% for Rabi, 5% for cash crops. Covers natural calamity, pests, post-harvest losses. Sum insured up to scale of finance." },
  { id:3, name:"Soil Health Card", fullName:"Soil Health Card Scheme", icon:"🌱", colorHex:"#d97706", cat:"Soil Health", desc:"Issues soil health cards to farmers containing soil nutrient status and fertilizer recommendations for each plot.", elig:"All farmers across India with agricultural land. Free of charge.", benefit:"Free soil testing at government labs. Crop-wise fertilizer recommendations. Helps reduce fertilizer cost by 8–10%. Issued every 2 years." },
  { id:4, name:"eNAM", fullName:"Electronic National Agriculture Market", icon:"📊", colorHex:"#7c3aed", cat:"Market Access", desc:"Pan-India electronic trading portal linking 1,361 mandis, creating a unified national market for agricultural commodities.", elig:"Farmers, FPOs, traders registered on eNAM portal. Any APMC-regulated mandi can join.", benefit:"Better price discovery. Direct payment to farmers within 24 hours. No deductions. Reduced transportation costs. Over 1.8 crore farmers registered." },
  { id:5, name:"PMKSY", fullName:"Pradhan Mantri Krishi Sinchayee Yojana", icon:"💧", colorHex:"#0891b2", cat:"Irrigation", desc:"Aims to achieve 'Har Khet Ko Pani' and 'More Crop Per Drop' through improved water use efficiency.", elig:"All farmers with agricultural land. Priority to water-scarce areas and drought-prone districts.", benefit:"55% subsidy on drip/sprinkler systems for general category, 70% for SC/ST/small farmers. Water-saving of 40–50%. Yield improvement of 15–20%." },
  { id:6, name:"KCC", fullName:"Kisan Credit Card Scheme", icon:"💳", colorHex:"#dc2626", cat:"Credit", desc:"Provides farmers with adequate and timely credit for agricultural and allied activities at affordable interest rates.", elig:"All farmers, tenant farmers, sharecroppers, oral lessees, SHGs, and JLGs engaged in agriculture.", benefit:"Credit up to ₹3 lakh at 4% interest (with interest subvention). Flexible repayment. Accidental insurance cover of ₹2 lakh. No processing fee." },
];

const NEWS_DATA = [
  { id:1, title:"MSP for Kharif 2025 hiked by record 8.5% — Cabinet approves historic revision", cat:"Policy", date:"Dec 10, 2024", icon:"📜", summary:"The Union Cabinet approved a significant increase in Minimum Support Price for 14 Kharif crops, including paddy, jowar, bajra and cotton, benefiting over 11 crore farmers." },
  { id:2, title:"IMD forecasts above-normal monsoon 2025 — 106% of Long Period Average", cat:"Weather", date:"Dec 9, 2024", icon:"🌧️", summary:"India Meteorological Department's first advance forecast indicates a favorable monsoon season, raising hopes for bumper agricultural output across major growing states." },
  { id:3, title:"Onion prices crash 40% in Nashik and Kolar mandis as surplus floods market", cat:"Market", date:"Dec 8, 2024", icon:"📉", summary:"Wholesale onion prices tumbled to ₹600–800 per quintal as arrivals from Maharashtra and Karnataka surge. Farmers demand storage support and export facilitation." },
  { id:4, title:"PM-KISAN 17th Installment: ₹20,000 crore disbursed to 9.4 crore farmers", cat:"Policy", date:"Dec 7, 2024", icon:"💰", summary:"Prime Minister released the 17th installment of PM-KISAN, with funds credited directly to beneficiary accounts through Direct Benefit Transfer mechanism." },
  { id:5, title:"FCI raises wheat procurement target 15% ahead of Rabi 2025 harvest season", cat:"Market", date:"Dec 6, 2024", icon:"🌾", summary:"Food Corporation of India sets an ambitious 35 million tonne procurement target for Rabi 2025, supported by rising production estimates from Punjab and Haryana." },
  { id:6, title:"Drone spraying regulations finalized — 100 districts to get certified operators by March", cat:"Policy", date:"Dec 5, 2024", icon:"🚁", summary:"Agriculture Ministry issues final guidelines for commercial drone spraying, expected to reduce pesticide use by 30% and labor costs by 50% in covered districts." },
];

const COMMUNITY_DATA = [
  { id:1, user:"Rajesh Patel", avatar:"👨‍🌾", loc:"Nashik, Maharashtra", time:"2h ago", text:"My tomato crop leaves are showing unusual yellowing with some browning edges. Applied zinc sulfate last week but no improvement. Soil pH tested 6.8. Anyone faced this? Any suggestion for treatment? 🙏", tags:["Crop","Disease"], likes:23, comments:8, liked:false },
  { id:2, user:"Sunita Devi", avatar:"👩‍🌾", loc:"Amritsar, Punjab", time:"5h ago", text:"Wheat prices at Amritsar mandi touched ₹2,180/quintal today! Best rate in 3 seasons 🎉 For everyone who was waiting — this is the time to sell. Transporters are also offering better rates this week.", tags:["Market","Wheat"], likes:67, comments:31, liked:true },
  { id:3, user:"Venkat Reddy", avatar:"🧑‍🌾", loc:"Guntur, Andhra Pradesh", time:"1d ago", text:"Finally received my Soil Health Card after 6 months. Phosphorus critically low at 12 kg/ha. Starting DAP treatment next week. Will update progress over next 2 months for everyone's reference.", tags:["Soil","Crop"], likes:14, comments:5, liked:false },
  { id:4, user:"Harpreet Singh", avatar:"👨‍🌾", loc:"Ludhiana, Punjab", time:"2d ago", text:"KCC loan approved in just 7 working days at SBI! Documents needed: land ownership proof, Aadhaar, bank statement, passport photo. Sharing the complete list in comments. Apply now at 4% interest!", tags:["Schemes","Finance"], likes:89, comments:42, liked:false },
];

const EXPERT_MSGS = [
  { id:1, sender:"farmer", text:"My cotton crop leaves are turning yellow and falling off. What should I do?", time:"10:30 AM" },
  { id:2, sender:"expert", name:"Dr. A. Sharma", text:"Hello Rajesh! This sounds like it could be Verticillium wilt or magnesium deficiency. Could you tell me how old the crop is and when this started?", time:"10:32 AM" },
  { id:3, sender:"farmer", text:"The crop is 45 days old. Started 5 days ago, mainly in the lower leaves first.", time:"10:34 AM" },
  { id:4, sender:"expert", name:"Dr. A. Sharma", text:"Based on your description — lower leaves first, spreading upward, on a 45-day cotton crop — this is classic Magnesium deficiency causing interveinal chlorosis.\n\n✅ Apply Magnesium Sulphate @ 10 g/liter as foliar spray this evening. Repeat after 7 days.\n✅ Also check soil pH — it should be 6.5–7.5 for optimal Mg absorption.\n✅ If no improvement in 10 days, get a soil test done.", time:"10:37 AM" },
];

// ─── UTILITY FUNCTIONS ────────────────────────────
function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function fmt(n) { return n.toLocaleString('en-IN'); }

function generatePriceHistory(crop) {
  const bases = { Wheat:2200, Rice:2800, Cotton:6500, Maize:1850, Sugarcane:320, Soybean:4100, Groundnut:5200, default:2000 };
  const base = bases[crop] || bases.default;
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (29 - i));
    const label = d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    const noise = (Math.random() - 0.45) * base * 0.04;
    return { label, price: Math.round(base + noise * (i + 1) * 0.28) };
  });
}

function generateWeatherData(state) {
  const baseTempMap = { Rajasthan:38, Punjab:24, Maharashtra:30, 'Andhra Pradesh':33, Karnataka:29, 'Uttar Pradesh':26, 'Tamil Nadu':32, 'West Bengal':28 };
  const base = baseTempMap[state] || 28;
  const icons = ['☀️','⛅','🌤️','🌧️','⛈️'];
  const descs = ['Clear Sky','Partly Cloudy','Mostly Sunny','Light Rain','Thunderstorms'];
  const iconIdx = rnd(0, 4);
  return {
    temp: base + rnd(-2, 4),
    humidity: rnd(45, 85),
    wind: rnd(8, 28),
    rain: rnd(10, 75),
    rainfall: rnd(0, 18),
    icon: icons[iconIdx],
    desc: descs[iconIdx],
    risk: ['Low','Medium','High'][rnd(0,2)],
    forecast: Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i);
      const fi = rnd(0, 4);
      return {
        day: i === 0 ? 'Today' : d.toLocaleDateString('en-IN', { weekday: 'short' }),
        icon: icons[fi],
        high: base + rnd(-3, 5),
        low: base - rnd(4, 9),
        rain: rnd(5, 70),
      };
    })
  };
}

// ─── CHART INSTANCES ────────────────────────────
const charts = {};

function destroyChart(id) {
  if (charts[id]) { charts[id].destroy(); delete charts[id]; }
}

function createLineChart(canvasId, labels, data, color = '#22c55e') {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  const gradient = ctx.createLinearGradient(0, 0, 0, 220);
  gradient.addColorStop(0, color + '30');
  gradient.addColorStop(1, color + '00');

  charts[canvasId] = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        data,
        borderColor: color,
        borderWidth: 2.5,
        fill: true,
        backgroundColor: gradient,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#0c1628',
        pointHoverBorderWidth: 2,
      }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f1e35',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          titleColor: '#94a3b8',
          bodyColor: '#f0f6ff',
          titleFont: { family: 'JetBrains Mono', size: 10 },
          bodyFont: { family: 'JetBrains Mono', size: 12, weight: '600' },
          padding: 10,
          callbacks: {
            label: ctx => ` ₹ ${fmt(ctx.parsed.y)}`
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#475569', font: { family: 'JetBrains Mono', size: 10 }, maxTicksLimit: 8 },
          border: { display: false }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#475569', font: { family: 'JetBrains Mono', size: 10 }, callback: v => `₹${fmt(v)}` },
          border: { display: false }
        }
      },
      animation: { duration: 900, easing: 'easeInOutQuart' }
    }
  });
}

function createAreaChart(canvasId, forecast) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  charts[canvasId] = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: forecast.map(d => d.day),
      datasets: [
        {
          type: 'line',
          label: 'High °C',
          data: forecast.map(d => d.high),
          borderColor: '#f97316',
          borderWidth: 2.5,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#f97316',
          fill: false,
          yAxisID: 'y',
        },
        {
          type: 'line',
          label: 'Low °C',
          data: forecast.map(d => d.low),
          borderColor: '#3b82f6',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#3b82f6',
          fill: false,
          yAxisID: 'y',
        },
        {
          label: 'Rain %',
          data: forecast.map(d => d.rain),
          backgroundColor: 'rgba(59,130,246,0.18)',
          borderColor: 'rgba(59,130,246,0.5)',
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: 'y2',
        }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#94a3b8', font: { size: 11 }, boxWidth: 12, padding: 16 }
        },
        tooltip: {
          backgroundColor: '#0f1e35',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          titleColor: '#94a3b8',
          bodyColor: '#f0f6ff',
          padding: 10,
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#475569', font: { size: 11 } },
          border: { display: false }
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#475569', font: { size: 10 }, callback: v => v + '°C' },
          border: { display: false }
        },
        y2: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { color: '#475569', font: { size: 10 }, callback: v => v + '%' },
          border: { display: false },
          min: 0, max: 100,
        }
      },
      animation: { duration: 900, easing: 'easeInOutQuart' }
    }
  });
}

function createDonutChart(canvasId) {
  destroyChart(canvasId);
  const ctx = document.getElementById(canvasId)?.getContext('2d');
  if (!ctx) return;

  const crops = ['Wheat','Rice','Cotton','Maize','Others'];
  const areas = [35, 28, 15, 14, 8];
  const colors = ['#22c55e','#3b82f6','#f59e0b','#a78bfa','#64748b'];

  charts[canvasId] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: crops,
      datasets: [{ data: areas, backgroundColor: colors, borderWidth: 0, hoverOffset: 6 }]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0f1e35',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          titleColor: '#94a3b8',
          bodyColor: '#f0f6ff',
          padding: 10,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      },
      animation: { animateRotate: true, duration: 1000, easing: 'easeInOutQuart' }
    }
  });

  // Legend
  const legend = document.getElementById('donut-legend');
  if (legend) {
    legend.innerHTML = crops.map((c, i) => `
      <div class="donut-legend-item">
        <div class="donut-legend-dot" style="background:${colors[i]}"></div>
        <span>${c} ${areas[i]}%</span>
      </div>
    `).join('');
  }
}

// ─── BACKGROUND CANVAS ────────────────────────────
function initBgCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.5 + 0.3,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    alpha: Math.random() * 0.4 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(34,197,94,${p.alpha})`;
      ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}

// ─── NAVIGATION ────────────────────────────────
function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');
  const pageTitle = document.getElementById('page-title');

  const titles = {
    dashboard: 'Dashboard', weather: 'Weather Intelligence',
    crops: 'Crop Planning', cropcare: 'Crop Care',
    schemes: 'Government Schemes', marketing: 'Market Intelligence',
    upload: 'Crop Doctor', expert: 'Expert Chat',
    news: 'Agriculture News', community: 'Farm Voice',
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const sec = item.dataset.section;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      sections.forEach(s => s.classList.remove('active'));
      const target = document.getElementById('section-' + sec);
      if (target) {
        target.classList.add('active');
        triggerDelayedAnimations(target);
      }
      if (pageTitle) pageTitle.textContent = titles[sec] || sec;
      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('mobile-overlay').classList.remove('show');
      document.getElementById('menu-toggle').classList.remove('open');
    });
  });
}

function triggerDelayedAnimations(container) {
  const items = container.querySelectorAll('[data-delay]');
  items.forEach(el => {
    el.classList.remove('visible');
    void el.offsetWidth; // reflow
    el.classList.add('visible');
  });
}

// ─── MOBILE MENU ────────────────────────────────
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');

  toggle?.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
    overlay.classList.toggle('show', isOpen);
    toggle.classList.toggle('open', isOpen);
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    toggle.classList.remove('open');
  });
}

// ─── COUNTER ANIMATION ────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  if (isNaN(target)) return;
  let start = 0; const duration = 1200;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(ease * target);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ─── DASHBOARD ────────────────────────────────
function initDashboard() {
  // Date
  const el = document.getElementById('current-date');
  if (el) {
    const now = new Date();
    el.innerHTML = `<div>${now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}</div>`;
  }

  // Counter animations
  document.querySelectorAll('.counter').forEach(animateCounter);

  // Main price chart
  const hist = generatePriceHistory('Wheat');
  createLineChart('dash-chart', hist.map(h => h.label), hist.map(h => h.price));

  // Donut chart
  createDonutChart('donut-chart');

  // Activity feed
  const activities = [
    { icon:'💰', text:'PM-KISAN installment of ₹2,000 credited to your account', time:'2h ago', meta:'+₹2,000' },
    { icon:'🌧️', text:'Weather alert: Light rain expected in Punjab tomorrow evening', time:'5h ago', meta:'Low Risk' },
    { icon:'📈', text:'Wheat prices at Amritsar mandi up 3.2% from yesterday', time:'1d ago', meta:'+3.2%' },
    { icon:'🌱', text:'Soil health card analysis completed — Phosphorus low detected', time:'2d ago', meta:'Action needed' },
    { icon:'🛡️', text:'PMFBY crop insurance renewal reminder — 12 days left', time:'3d ago', meta:'⏰ Reminder' },
  ];

  const feed = document.getElementById('activity-feed');
  if (feed) {
    feed.innerHTML = activities.map(a => `
      <div class="activity-item">
        <div class="activity-icon">${a.icon}</div>
        <div>
          <div class="activity-text">${a.text}</div>
          <div class="activity-time">${a.time}</div>
        </div>
        <div class="activity-meta">
          <div class="activity-time" style="color:var(--green)">${a.meta}</div>
        </div>
      </div>
    `).join('');
  }

  // Trigger animations
  triggerDelayedAnimations(document.getElementById('section-dashboard'));
}

// ─── WEATHER ────────────────────────────────────
function initWeather() {
  const stateSelect = document.getElementById('weather-state');
  const districtSelect = document.getElementById('weather-district');
  const fetchBtn = document.getElementById('fetch-weather');

  const districtMap = {
    Punjab: ['Amritsar','Ludhiana','Patiala','Bathinda','Jalandhar'],
    Maharashtra: ['Pune','Nashik','Nagpur','Aurangabad','Solapur'],
    'Andhra Pradesh': ['Vijayawada','Visakhapatnam','Guntur','Nellore','Kurnool'],
    Karnataka: ['Bengaluru','Mysuru','Hubli','Belagavi','Shivamogga'],
    'Uttar Pradesh': ['Lucknow','Kanpur','Agra','Varanasi','Meerut'],
    Rajasthan: ['Jaipur','Jodhpur','Bikaner','Udaipur','Kota'],
    'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Trichy','Salem'],
    'West Bengal': ['Kolkata','Howrah','Durgapur','Siliguri','Asansol'],
  };

  stateSelect?.addEventListener('change', () => {
    const state = stateSelect.value;
    const districts = districtMap[state] || ['District A','District B','District C'];
    districtSelect.innerHTML = districts.map(d => `<option>${d}</option>`).join('');
    loadWeather(state);
  });

  fetchBtn?.addEventListener('click', () => loadWeather(stateSelect.value));

  function loadWeather(state) {
    const data = generateWeatherData(state);
    const district = districtSelect.value;

    // Update sidebar mini weather
    const mini = document.getElementById('sidebar-weather');
    if (mini) {
      mini.querySelector('.weather-mini-icon').textContent = data.icon;
      mini.querySelector('.weather-mini-temp').textContent = `${data.temp}°C`;
      mini.querySelector('.weather-mini-loc').textContent = district || state;
    }

    // Main weather card
    document.getElementById('w-icon').textContent = data.icon;
    document.getElementById('w-temp').textContent = `${data.temp}°C`;
    document.getElementById('w-desc').textContent = data.desc;
    document.getElementById('w-loc').textContent = `${district}, ${state}`;
    document.getElementById('w-humidity').textContent = `${data.humidity}%`;
    document.getElementById('w-wind').textContent = `${data.wind} km/h`;
    document.getElementById('w-rain').textContent = `${data.rain}%`;
    document.getElementById('w-rainfall').textContent = `${data.rainfall} mm`;

    // Risk card
    const riskCard = document.getElementById('weather-risk-card');
    const riskVal = document.getElementById('risk-value');
    const riskTip = document.getElementById('risk-tip');
    const rings = document.querySelectorAll('.risk-ring');

    const riskConfig = {
      Low: { color:'#22c55e', tip:'Weather conditions favorable. Low risk of crop damage. Proceed with planned farm activities.' },
      Medium: { color:'#f59e0b', tip:'Moderate weather risk detected. Monitor daily and prepare drainage systems. Delay irrigation.' },
      High: { color:'#ef4444', tip:'High risk alert! Unseasonal weather expected. Protect crops, harvest mature produce, activate insurance.' },
    };

    const cfg = riskConfig[data.risk];
    riskVal.textContent = data.risk;
    riskVal.style.color = cfg.color;
    riskTip.textContent = cfg.tip;
    rings.forEach(r => { r.className = 'risk-ring'; r.classList.add(r.classList[0]); });
    rings.forEach(r => {
      r.style.borderColor = cfg.color + '25';
      r.style.animation = `orbitSpin ${8 + Math.random()*6}s linear infinite`;
    });

    // 7-day grid
    const grid = document.getElementById('forecast-grid');
    if (grid) {
      grid.innerHTML = data.forecast.map((d, i) => `
        <div class="forecast-day ${i === 0 ? 'today' : ''}">
          <div class="fd-name">${d.day}</div>
          <div class="fd-icon">${d.icon}</div>
          <div class="fd-high">${d.high}°</div>
          <div class="fd-low">${d.low}°</div>
          <div class="fd-rain">💧${d.rain}%</div>
        </div>
      `).join('');
    }

    // Chart
    createAreaChart('weather-chart', data.forecast);
  }

  loadWeather('Punjab');
}

// ─── CROP PLANNING ────────────────────────────
function initCropPlanning() {
  const cropSel = document.getElementById('crop-select');
  const regionSel = document.getElementById('crop-region');

  function renderCrop() {
    const crop = cropSel.value;
    const info = CROP_DATA[crop] || Object.values(CROP_DATA)[0];
    const grid = document.getElementById('crop-grid');
    const aiText = document.getElementById('crop-ai-text');

    const items = [
      { icon:'📅', label:'Best Sowing Time', value:info.sowing, bg:'rgba(34,197,94,0.1)', border:'rgba(34,197,94,0.2)' },
      { icon:'🪨', label:'Soil Type Required', value:info.soil, bg:'rgba(245,158,11,0.1)', border:'rgba(245,158,11,0.2)' },
      { icon:'💧', label:'Water Requirement', value:info.water, bg:'rgba(59,130,246,0.1)', border:'rgba(59,130,246,0.2)' },
      { icon:'🧪', label:'Fertilizer Dosage', value:info.fertilizer, bg:'rgba(167,139,250,0.1)', border:'rgba(167,139,250,0.2)' },
      { icon:'⏱️', label:'Harvest Duration', value:info.harvest, bg:'rgba(239,68,68,0.1)', border:'rgba(239,68,68,0.2)' },
      { icon:'📊', label:'Crop Symbol', value:info.icon + ' ' + crop, bg:'rgba(14,165,233,0.1)', border:'rgba(14,165,233,0.2)' },
    ];

    if (grid) {
      grid.innerHTML = items.map(item => `
        <div class="crop-info-card">
          <div class="crop-info-icon" style="background:${item.bg}; border:1px solid ${item.border}">${item.icon}</div>
          <div>
            <div class="crop-info-label">${item.label}</div>
            <div class="crop-info-value">${item.value}</div>
          </div>
        </div>
      `).join('');
    }
    if (aiText) aiText.textContent = info.ai;
  }

  cropSel?.addEventListener('change', renderCrop);
  regionSel?.addEventListener('change', renderCrop);
  renderCrop();
}

// ─── CROP CARE ────────────────────────────────
function initCropCare() {
  const sel = document.getElementById('care-crop-select');

  function renderDiseases() {
    const crop = sel.value;
    const list = DISEASES[crop] || DISEASES.Wheat;
    const container = document.getElementById('disease-list');
    if (!container) return;

    container.innerHTML = list.map((d, i) => `
      <div class="disease-card" id="dcard-${i}">
        <div class="disease-header" onclick="toggleDisease(${i})">
          <div class="disease-icon">${d.icon}</div>
          <div>
            <div class="disease-name">${d.name}</div>
            <div class="disease-type">${d.type}</div>
          </div>
          <div class="badge ${d.type.includes('Fungal') ? 'badge-amber' : d.type.includes('Insect') ? 'badge-red' : 'badge-blue'}" style="margin-left:auto; margin-right:12px">
            ${d.type.split(' ')[0]}
          </div>
          <div class="disease-toggle">▾</div>
        </div>
        <div class="disease-body">
          <div class="disease-section">
            <div class="disease-section-label" style="color:#f59e0b">🔍 Symptoms</div>
            <div class="disease-section-text">${d.symptoms}</div>
          </div>
          <div class="disease-section">
            <div class="disease-section-label" style="color:#22c55e">🛡️ Prevention</div>
            <div class="disease-section-text">${d.prevention}</div>
          </div>
          <div class="disease-section">
            <div class="disease-section-label" style="color:#3b82f6">💊 Treatment</div>
            <div class="disease-section-text">${d.treatment}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  sel?.addEventListener('change', renderDiseases);
  renderDiseases();
}

window.toggleDisease = function(i) {
  const card = document.getElementById('dcard-' + i);
  if (!card) return;
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.disease-card').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
};

// ─── SCHEMES ────────────────────────────────────
function initSchemes() {
  let activeCategory = 'All';
  const cats = ['All','Income Support','Crop Insurance','Soil Health','Market Access','Irrigation','Credit'];

  const catContainer = document.getElementById('scheme-cats');
  if (catContainer) {
    catContainer.innerHTML = cats.map(c => `
      <button class="scheme-cat-btn ${c === 'All' ? 'active' : ''}" data-cat="${c}">${c}</button>
    `).join('');
    catContainer.querySelectorAll('.scheme-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        catContainer.querySelectorAll('.scheme-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.cat;
        renderSchemes();
      });
    });
  }

  function renderSchemes() {
    const grid = document.getElementById('schemes-grid');
    if (!grid) return;
    const filtered = SCHEMES.filter(s => activeCategory === 'All' || s.cat === activeCategory);

    grid.innerHTML = filtered.map((s, i) => `
      <div class="scheme-card" style="animation-delay:${i*80}ms; animation: cardIn 0.4s ease ${i*80}ms both">
        <style>
          .scheme-card:nth-child(${i+1})::after { background: linear-gradient(90deg, ${s.colorHex}, ${s.colorHex}88); }
        </style>
        <div class="scheme-top">
          <div class="scheme-icon-wrap" style="background:${s.colorHex}18; border:1px solid ${s.colorHex}33">
            ${s.icon}
          </div>
          <div>
            <div class="scheme-name">${s.name}</div>
            <div class="scheme-full-name">${s.fullName}</div>
          </div>
          <span class="badge badge-blue" style="margin-left:auto; flex-shrink:0">${s.cat}</span>
        </div>
        <p class="scheme-desc">${s.desc}</p>
        <div class="scheme-details">
          <div class="scheme-detail">
            <div class="scheme-detail-label">✅ Eligibility</div>
            <div class="scheme-detail-text">${s.elig}</div>
          </div>
          <div class="scheme-detail">
            <div class="scheme-detail-label">🎁 Benefits</div>
            <div class="scheme-detail-text">${s.benefit}</div>
          </div>
        </div>
        <button class="av-btn-primary" style="width:100%; justify-content:center">Apply Now →</button>
      </div>
    `).join('');
  }

  renderSchemes();
}

// ─── MARKETING ────────────────────────────────
let mktChart = null;

function initMarketing() {
  const cropSel = document.getElementById('mkt-crop');
  const mandiSel = document.getElementById('mkt-mandi');
  const fetchBtn = document.getElementById('fetch-market');

  fetchBtn?.addEventListener('click', loadMarket);
  cropSel?.addEventListener('change', loadMarket);

  function loadMarket() {
    const crop = cropSel.value;
    const mandi = mandiSel.value;
    const hist = generatePriceHistory(crop);
    const prices = hist.map(h => h.price);
    const currentPrice = prices[prices.length - 1];
    const firstPrice = prices[0];
    const trendPct = (((currentPrice - firstPrice) / firstPrice) * 100).toFixed(1);
    const forecastPrice = Math.round(currentPrice * (1 + parseFloat(trendPct) / 180));
    const score = rnd(28, 92);
    const risks = ['Low','Medium','High'];
    const risk = risks[rnd(0, 2)];
    const recs = [
      { action:'SELL', color:'#22c55e', text:'Strong demand surge detected at ' + mandi + ' mandi. Price near seasonal peak. Capitalize now for maximum returns.' },
      { action:'HOLD', color:'#f59e0b', text:'Market showing consolidation. Prices likely to rise another 4–6% in next 7 days. Hold for optimal exit.' },
      { action:'WAIT', color:'#3b82f6', text:'Volatility detected. Monitor for 3 more days. Set price alerts at ₹' + fmt(Math.round(currentPrice * 1.04)) + ' for action trigger.' },
    ];
    const rec = recs[rnd(0, 2)];

    // Stats
    const statsEl = document.getElementById('mkt-stats');
    if (statsEl) {
      const riskColor = risk === 'Low' ? 'badge-green' : risk === 'Medium' ? 'badge-amber' : 'badge-red';
      statsEl.innerHTML = [
        { label:'Current Price', value:`₹ ${fmt(currentPrice)}`, sub:'Per quintal', color:'var(--text-primary)' },
        { label:'Forecast Price (7D)', value:`₹ ${fmt(forecastPrice)}`, sub:'AI projection', color:'#22c55e' },
        { label:'30-Day Trend', value:`${parseFloat(trendPct) >= 0 ? '↑' : '↓'} ${Math.abs(trendPct)}%`, sub:'Price movement', color: parseFloat(trendPct) >= 0 ? '#22c55e' : '#ef4444' },
        { label:'Market Risk', value:risk, sub:'Crop risk level', badge:riskColor },
      ].map(s => `
        <div class="mkt-stat">
          <div class="mkt-stat-label">${s.label}</div>
          <div class="mkt-stat-value" style="color:${s.color || 'inherit'}">
            ${s.badge ? `<span class="badge ${s.badge}">${s.value}</span>` : s.value}
          </div>
          <div class="mkt-stat-sub">${s.sub}</div>
        </div>
      `).join('');
    }

    // Chart
    const title = document.getElementById('mkt-chart-title');
    if (title) title.textContent = `Price Trend — ${crop} · ${mandi}`;

    createLineChart('mkt-chart', hist.map(h => h.label), prices,
      parseFloat(trendPct) >= 0 ? '#22c55e' : '#ef4444');

    // Trend badge
    const badge = document.getElementById('mkt-trend-badge');
    if (badge) {
      const isUp = parseFloat(trendPct) >= 0;
      badge.innerHTML = `<span class="badge ${isUp ? 'badge-green' : 'badge-red'}">${isUp ? '↑' : '↓'} ${Math.abs(trendPct)}% 30D</span>`;
    }

    // Rec card
    const recCard = document.getElementById('rec-card');
    if (recCard) {
      recCard.innerHTML = `
        <div style="font-family:var(--font-mono); font-size:0.62rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:10px">AI Recommendation</div>
        <div class="rec-action-tag" style="color:${rec.color}; border-color:${rec.color}44; background:${rec.color}12">${rec.action}</div>
        <p class="rec-text">${rec.text}</p>
      `;
    }

    // Neg card
    const negCard = document.getElementById('neg-card');
    if (negCard) {
      const scoreColor = score >= 70 ? '#22c55e' : score >= 45 ? '#f59e0b' : '#ef4444';
      const hint = score >= 70 ? 'Strong leverage. Push for premium rates or forward contracts.' :
                   score >= 45 ? 'Moderate position. Negotiate with 2–3 buyers simultaneously.' :
                                  'Weak position. Accept market rate or delay sale by 1 week.';
      negCard.innerHTML = `
        <div class="neg-label">Negotiation Score</div>
        <div class="neg-score-row">
          <span class="neg-score-num" style="color:${scoreColor}">${score}</span>
          <span class="neg-score-denom">/100</span>
        </div>
        <div class="neg-bar-track">
          <div class="neg-bar-fill" style="width:0%; background:${scoreColor}; box-shadow:0 0 12px ${scoreColor}66" id="neg-bar"></div>
        </div>
        <div class="neg-bar-labels"><span>Weak</span><span>Strong</span></div>
        <p class="neg-hint">${hint}</p>
      `;
      setTimeout(() => {
        const bar = document.getElementById('neg-bar');
        if (bar) bar.style.width = score + '%';
      }, 100);
    }
  }

  loadMarket();
}

// ─── CROP DOCTOR ────────────────────────────────
function initCropDoctor() {
  const zone = document.getElementById('upload-zone');
  const input = document.getElementById('file-input');
  const preview = document.getElementById('upload-preview');
  const idle = document.getElementById('upload-idle');
  const analyzeBtn = document.getElementById('analyze-btn');
  const panel = document.getElementById('analysis-panel');

  zone?.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone?.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone?.addEventListener('drop', e => {
    e.preventDefault(); zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  input?.addEventListener('change', () => { if (input.files[0]) handleFile(input.files[0]); });

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = e => {
      preview.src = e.target.result;
      preview.classList.remove('hidden');
      idle.classList.add('hidden');
      analyzeBtn.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  analyzeBtn?.addEventListener('click', () => {
    analyzeBtn.textContent = '🔍 Analyzing...';
    analyzeBtn.disabled = true;
    panel.innerHTML = `
      <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:40px">
        <div style="position:relative">
          <div style="width:60px;height:60px;border:3px solid rgba(34,197,94,0.15);border-top-color:#22c55e;border-radius:50%;animation:av-spin 0.8s linear infinite"></div>
        </div>
        <p style="color:var(--text-muted); font-size:0.85rem; text-align:center">AI scanning crop image...<br>Identifying disease patterns</p>
        <div style="font-family:var(--font-mono); font-size:0.65rem; color:var(--green); letter-spacing:0.1em">ANALYZING LEAF TEXTURE • CHECKING COLOR PATTERNS</div>
      </div>
      <style>@keyframes av-spin { to { transform:rotate(360deg); } }</style>
    `;

    setTimeout(() => {
      analyzeBtn.innerHTML = '<span>🤖</span> Analyze with AI';
      analyzeBtn.disabled = false;
      panel.innerHTML = `
        <div class="analysis-result">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px; flex-wrap:wrap">
            <span style="font-family:var(--font-mono); font-size:0.62rem; color:var(--green); text-transform:uppercase; letter-spacing:0.1em">✅ Analysis Complete</span>
            <span class="badge badge-amber">Moderate Severity</span>
          </div>
          <div class="analysis-disease">Early Blight (Alternaria solani)</div>
          <div style="margin:16px 0">
            <div class="analysis-confidence">
              <span class="conf-label">Confidence</span>
              <div class="conf-bar-track"><div class="conf-bar-fill" style="width:87%"></div></div>
              <span class="conf-pct">87%</span>
            </div>
            <div class="analysis-confidence">
              <span class="conf-label">Severity</span>
              <div class="conf-bar-track"><div class="conf-bar-fill" style="width:52%; background:linear-gradient(90deg,#d97706,#f59e0b)"></div></div>
              <span class="conf-pct" style="color:#f59e0b">52%</span>
            </div>
          </div>
          <div class="analysis-sections">
            <div class="analysis-section" style="background:rgba(239,68,68,0.05); border-color:rgba(239,68,68,0.2)">
              <div class="as-label" style="color:#ef4444">🔍 Symptoms Detected</div>
              <div class="as-text">Circular brown spots with concentric rings (target-board pattern). Yellow halo around lesions. Lower leaves affected first. Lesions coalescing in advanced stage.</div>
            </div>
            <div class="analysis-section" style="background:rgba(59,130,246,0.05); border-color:rgba(59,130,246,0.2)">
              <div class="as-label" style="color:#3b82f6">💊 Recommended Treatment</div>
              <div class="as-text">Apply Mancozeb 75 WP @ 2.5 g/L. Spray in evening hours. Repeat after 7–10 days. Remove severely infected leaves. Ensure canopy is not overcrowded.</div>
            </div>
            <div class="analysis-section" style="background:rgba(34,197,94,0.05); border-color:rgba(34,197,94,0.2)">
              <div class="as-label" style="color:#22c55e">🛡️ Prevention for Next Season</div>
              <div class="as-text">Crop rotation with non-solanaceous crops. Use disease-free certified seeds. Avoid overhead irrigation. Maintain proper plant spacing for air circulation.</div>
            </div>
          </div>
          <button class="av-btn-secondary" style="width:100%; justify-content:center; margin-top:16px">📞 Talk to Expert</button>
        </div>
      `;
    }, 2800);
  });
}

// ─── EXPERT CHAT ────────────────────────────────
function initExpertChat() {
  const chatMsgs = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  function renderMessages(msgs) {
    if (!chatMsgs) return;
    chatMsgs.innerHTML = msgs.map(m => `
      <div class="chat-msg ${m.sender}">
        ${m.sender === 'expert' ? `<div class="msg-avatar expert-av">👨‍⚕️</div>` : `<div class="msg-avatar farmer-av">👨‍🌾</div>`}
        <div>
          ${m.sender === 'expert' ? `<span class="msg-name">${m.name || 'Expert'}</span>` : ''}
          <div class="msg-bubble">${m.text.replace(/\n/g, '<br>')}</div>
          <span class="msg-time">${m.time}</span>
        </div>
      </div>
    `).join('');
    chatMsgs.scrollTop = chatMsgs.scrollHeight;
  }

  renderMessages(EXPERT_MSGS);

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    const now = new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' });
    const newMsg = { id: Date.now(), sender:'farmer', text, time: now };
    EXPERT_MSGS.push(newMsg);
    renderMessages(EXPERT_MSGS);

    // Typing indicator
    setTimeout(() => {
      const typing = document.createElement('div');
      typing.className = 'chat-msg expert';
      typing.id = 'typing-indicator';
      typing.innerHTML = `
        <div class="msg-avatar expert-av">👨‍⚕️</div>
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      chatMsgs.appendChild(typing);
      chatMsgs.scrollTop = chatMsgs.scrollHeight;

      setTimeout(() => {
        document.getElementById('typing-indicator')?.remove();
        const replies = [
          'I understand. Based on what you\'ve described, this is a common issue this season. Let me give you a detailed treatment plan.',
          'Thank you for the information. I\'d recommend getting a soil test first before applying any treatment. Can you share your soil pH?',
          'This sounds like a nutrient deficiency. Apply 10g Zinc Sulphate + 10g Urea per liter as foliar spray this evening.',
        ];
        const reply = { id: Date.now(), sender:'expert', name:'Dr. A. Sharma', text: replies[rnd(0, replies.length-1)], time: new Date().toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit' }) };
        EXPERT_MSGS.push(reply);
        renderMessages(EXPERT_MSGS);
      }, 1800);
    }, 600);
  }

  chatSend?.addEventListener('click', sendMessage);
  chatInput?.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) sendMessage(); });

  // Expert selector
  document.querySelectorAll('.expert-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.expert-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// ─── NEWS ────────────────────────────────────────
function initNews() {
  let activeCat = 'All';
  const cats = ['All','Policy','Weather','Market'];
  const catColors = { Policy:'badge-blue', Weather:'badge-amber', Market:'badge-green' };

  const catContainer = document.getElementById('news-cats');
  if (catContainer) {
    catContainer.innerHTML = cats.map(c => `
      <button class="news-cat-btn ${c === 'All' ? 'active' : ''}" data-cat="${c}">${c}</button>
    `).join('');
    catContainer.querySelectorAll('.news-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        catContainer.querySelectorAll('.news-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.dataset.cat;
        renderNews();
      });
    });
  }

  function renderNews() {
    const grid = document.getElementById('news-grid');
    if (!grid) return;
    const filtered = NEWS_DATA.filter(n => activeCat === 'All' || n.cat === activeCat);
    grid.innerHTML = filtered.map((n, i) => `
      <div class="news-card" style="animation:cardIn 0.4s ease ${i*80}ms both">
        <div class="news-icon-wrap">${n.icon}</div>
        <div style="flex:1; min-width:0">
          <div class="news-meta">
            <span class="badge ${catColors[n.cat] || 'badge-blue'}">${n.cat}</span>
            <span class="news-date">${n.date}</span>
          </div>
          <div class="news-title">${n.title}</div>
          <div class="news-summary">${n.summary}</div>
          <button class="news-read-btn">Read Full Article →</button>
        </div>
      </div>
    `).join('');
  }

  renderNews();
}

// ─── COMMUNITY ────────────────────────────────
function initCommunity() {
  const tags = ['Crop','Market','Weather','Soil','Schemes','Finance','Livestock'];
  let activeTag = '';
  let posts = [...COMMUNITY_DATA];

  // Tag buttons
  const tagsEl = document.getElementById('post-tags');
  if (tagsEl) {
    tagsEl.innerHTML = tags.map(t => `
      <button class="post-tag-btn" data-tag="${t}">#${t}</button>
    `).join('');
    tagsEl.querySelectorAll('.post-tag-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        activeTag = btn.classList.contains('active') ? btn.dataset.tag : '';
        tagsEl.querySelectorAll('.post-tag-btn').forEach(b => { if (b !== btn) b.classList.remove('active'); });
      });
    });
  }

  // Submit
  document.getElementById('submit-post')?.addEventListener('click', () => {
    const input = document.getElementById('post-input');
    const text = input?.value.trim();
    if (!text) return;
    const newPost = {
      id: Date.now(), user:'You', avatar:'🧑‍🌾', loc:'Your Farm', time:'Just now',
      text, tags:[activeTag || 'Crop'], likes:0, comments:0, liked:false,
    };
    posts.unshift(newPost);
    input.value = '';
    renderPosts();
  });

  function renderPosts() {
    const list = document.getElementById('posts-list');
    if (!list) return;
    list.innerHTML = posts.map(p => `
      <div class="post-card">
        <div class="post-header">
          <div class="post-user-avatar">${p.avatar}</div>
          <div>
            <span class="post-user-name">${p.user}</span>
            <span class="post-user-loc">📍 ${p.loc}</span>
          </div>
          <span class="post-time">${p.time}</span>
        </div>
        <div class="post-content">${p.text}</div>
        <div class="post-tags-row">${p.tags.map(t => `<span class="post-tag-display">#${t}</span>`).join('')}</div>
        <div class="post-actions">
          <button class="post-action-btn ${p.liked ? 'liked' : ''}" onclick="toggleLike(${p.id})">
            ${p.liked ? '❤️' : '🤍'} ${p.likes}
          </button>
          <button class="post-action-btn">💬 ${p.comments} Comments</button>
          <button class="post-action-btn" style="margin-left:auto">↗ Share</button>
        </div>
      </div>
    `).join('');
  }

  window.toggleLike = function(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      renderPosts();
    }
  };

  // Trending
  const trending = [
    { tag:'#WheatMSP2025', count:'2.3k posts' },
    { tag:'#MonsoonForecast', count:'1.8k posts' },
    { tag:'#PMKISANInstallment', count:'1.2k posts' },
    { tag:'#CottonPrices', count:'980 posts' },
    { tag:'#SoilHealthCard', count:'756 posts' },
  ];
  const trendEl = document.getElementById('trending-list');
  if (trendEl) {
    trendEl.innerHTML = trending.map(t => `
      <div class="trending-item">
        <span class="trending-tag">${t.tag}</span>
        <span class="trending-count">${t.count}</span>
      </div>
    `).join('');
  }

  // Stats
  const statsEl = document.getElementById('comm-stats');
  if (statsEl) {
    statsEl.innerHTML = [
      ['Active Farmers', '2,41,856'],
      ['Posts Today', '3,492'],
      ['Questions Answered', '98.4%'],
      ['Expert Responses', '1,234'],
    ].map(([l, v]) => `
      <div class="comm-stat-row">
        <span class="comm-stat-label">${l}</span>
        <span class="comm-stat-val">${v}</span>
      </div>
    `).join('');
  }

  renderPosts();
}

// ─── LANGUAGE ────────────────────────────────────
function initLanguage() {
  const sel = document.getElementById('lang-select');
  sel?.addEventListener('change', () => {
    const lang = sel.value;
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    document.querySelectorAll('[data-t]').forEach(el => {
      const key = el.dataset.t;
      if (t[key]) el.textContent = t[key];
    });
  });
}

// ─── LOADER ─────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('page-loader');
  const app = document.getElementById('app');
  setTimeout(() => {
    loader?.classList.add('fade-out');
    app?.classList.remove('hidden');
    setTimeout(() => {
      loader?.remove();
      initDashboard();
      triggerDelayedAnimations(document.getElementById('section-dashboard'));
    }, 600);
  }, 2200);
}

// ─── MAIN INIT ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initBgCanvas();
  initNavigation();
  initMobileMenu();
  initLanguage();
  initLoader();
  initWeather();
  initCropPlanning();
  initCropCare();
  initSchemes();
  initMarketing();
  initCropDoctor();
  initExpertChat();
  initNews();
  initCommunity();
});