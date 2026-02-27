import { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// ─── Mock Data Generator ────────────────────────────────────────────────────
const CROPS = ["Wheat", "Rice", "Maize", "Soybeans", "Cotton", "Sugarcane"];
const REGIONS = ["Punjab", "Maharashtra", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan", "Haryana"];

function generatePriceHistory(basePrice) {
  const today = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (29 - i));
    const noise = (Math.random() - 0.45) * basePrice * 0.04;
    return {
      date: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      price: Math.round(basePrice + noise * (i + 1) * 0.3),
    };
  });
}

function getMockData(crop, region) {
  const seed = (crop.length + region.length) % 5;
  const basePrices = { Wheat: 2200, Rice: 2800, Maize: 1850, Soybeans: 4100, Cotton: 6500, Sugarcane: 320 };
  const base = basePrices[crop] || 2000;
  const trend = [4.2, -1.8, 6.7, -3.1, 8.9][seed];
  const score = [72, 45, 88, 31, 61][seed];
  const risks = ["Low", "Medium", "High", "Low", "Medium"];
  const recs = [
    "Strong upward trend detected. Consider selling within the next 7–10 days to capitalize on peak pricing.",
    "Market showing mild volatility. Hold current stock and monitor for 5 more days before deciding.",
    "Exceptional demand surge in your region. Sell now to lock in above-average profits.",
    "Risk indicators elevated. Hold and hedge positions; consult local mandi data before transacting.",
    "Stable outlook with moderate growth. Partial sell-off (50%) recommended to balance risk and reward.",
  ];
  const history = generatePriceHistory(base);
  const forecastPrice = Math.round(base * (1 + trend / 100));
  return {
    trend_percentage: trend,
    forecast_price: forecastPrice,
    negotiation_score: score,
    risk_level: risks[seed],
    recommendation: recs[seed],
    price_history: history,
    current_price: base,
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value" style={{ color: accent || "var(--green)" }}>
        {value}
      </p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  );
}

function NegotiationMeter({ score }) {
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";
  return (
    <div className="meter-card">
      <div className="meter-header">
        <span className="card-title">Negotiation Score</span>
        <span className="meter-score" style={{ color }}>{score}/100</span>
      </div>
      <div className="meter-track">
        <div
          className="meter-fill"
          style={{
            width: `${score}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>
      <div className="meter-labels">
        <span>Weak</span><span>Moderate</span><span>Strong</span>
      </div>
      <p className="meter-hint">
        {score >= 70
          ? "You hold strong leverage. Push for better rates."
          : score >= 40
          ? "Moderate position. Negotiate carefully."
          : "Weak position. Consider delaying negotiations."}
      </p>
    </div>
  );
}

function RiskIndicator({ level }) {
  const config = {
    Low: { color: "#22c55e", glow: "#22c55e44", icon: "▼", label: "Low Risk" },
    Medium: { color: "#f59e0b", glow: "#f59e0b44", icon: "◆", label: "Medium Risk" },
    High: { color: "#ef4444", glow: "#ef444444", icon: "▲", label: "High Risk" },
  }[level];

  return (
    <div className="risk-card">
      <span className="card-title">Price Risk</span>
      <div className="risk-badge" style={{ borderColor: config.color, boxShadow: `0 0 20px ${config.glow}` }}>
        <span className="risk-icon" style={{ color: config.color }}>{config.icon}</span>
        <span className="risk-label" style={{ color: config.color }}>{config.label}</span>
      </div>
      <div className="risk-dots">
        {["Low", "Medium", "High"].map((r) => (
          <div
            key={r}
            className="risk-dot"
            style={{
              background: r === level ? config.color : "var(--surface-2)",
              boxShadow: r === level ? `0 0 8px ${config.color}` : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation, trend }) {
  const isSell = recommendation.toLowerCase().includes("sell");
  const isHold = recommendation.toLowerCase().includes("hold");
  const action = isSell ? "SELL" : isHold ? "HOLD" : "WATCH";
  const actionColor = isSell ? "#22c55e" : isHold ? "#f59e0b" : "#60a5fa";

  return (
    <div className="rec-card">
      <div className="rec-header">
        <span className="card-title">AI Recommendation</span>
        <span className="rec-action" style={{ color: actionColor, borderColor: actionColor }}>
          {action}
        </span>
      </div>
      <p className="rec-body">{recommendation}</p>
      <div className="rec-footer">
        <span className="rec-trend" style={{ color: trend >= 0 ? "#22c55e" : "#ef4444" }}>
          {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% forecasted {trend >= 0 ? "gain" : "loss"}
        </span>
        <span className="rec-timestamp">Updated just now</span>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-date">{label}</p>
        <p className="tooltip-price">₹ {payload[0].value.toLocaleString("en-IN")}</p>
      </div>
    );
  }
  return null;
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AgriIntelDashboard() {
  const [crop, setCrop] = useState("Wheat");
  const [region, setRegion] = useState("Punjab");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = (c, r) => {
    setLoading(true);
    setTimeout(() => {
      setData(getMockData(c, r));
      setLoading(false);
    }, 600);
  };

  useEffect(() => { fetchData(crop, region); }, [crop, region]);

  const handleCrop = (e) => { setCrop(e.target.value); };
  const handleRegion = (e) => { setRegion(e.target.value); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Sora:wght@300;400;600;700&display=swap');

        :root {
          --bg: #050d15;
          --surface: #0a1628;
          --surface-2: #0f2040;
          --border: #1a3050;
          --green: #22c55e;
          --green-dim: #16a34a;
          --blue: #1e40af;
          --blue-bright: #3b82f6;
          --text: #e2eaf4;
          --text-muted: #6b8aaa;
          --mono: 'DM Mono', monospace;
          --sans: 'Sora', sans-serif;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: var(--sans);
          min-height: 100vh;
        }

        .dashboard {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 80% 50% at 10% 0%, #0f2d5010 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 90% 100%, #16a34a0a 0%, transparent 60%),
            var(--bg);
          padding: 0 0 60px;
        }

        /* Header */
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 40px;
          border-bottom: 1px solid var(--border);
          background: var(--surface);
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--green-dim), var(--green));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }

        .logo-text {
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }

        .logo-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: var(--mono);
        }

        .header-badge {
          background: #22c55e18;
          border: 1px solid #22c55e44;
          color: var(--green);
          font-size: 0.72rem;
          font-family: var(--mono);
          padding: 4px 10px;
          border-radius: 20px;
          letter-spacing: 0.05em;
        }

        /* Controls */
        .controls {
          padding: 28px 40px 0;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .control-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: var(--mono);
        }

        select {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: var(--sans);
          font-size: 0.9rem;
          padding: 10px 36px 10px 14px;
          border-radius: 8px;
          appearance: none;
          cursor: pointer;
          min-width: 180px;
          transition: border-color 0.2s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b8aaa' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
        }

        select:hover, select:focus {
          border-color: var(--green-dim);
          outline: none;
        }

        .fetch-btn {
          margin-top: 22px;
          background: linear-gradient(135deg, var(--green-dim), var(--green));
          color: #000;
          font-weight: 600;
          font-family: var(--sans);
          font-size: 0.88rem;
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.1s;
          letter-spacing: 0.02em;
        }

        .fetch-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .fetch-btn:active { transform: translateY(0); }

        /* Grid */
        .grid {
          padding: 28px 40px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .col-span-2 { grid-column: span 2; }
        .col-span-3 { grid-column: span 3; }

        /* Cards */
        .stat-card, .meter-card, .risk-card, .rec-card, .chart-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          transition: border-color 0.2s;
        }

        .stat-card:hover, .meter-card:hover, .risk-card:hover, .rec-card:hover, .chart-card:hover {
          border-color: #1e4060;
        }

        .stat-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: var(--mono);
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: -0.03em;
          font-family: var(--mono);
        }

        .stat-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .card-title {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: var(--mono);
        }

        /* Meter */
        .meter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .meter-score {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: var(--mono);
        }

        .meter-track {
          height: 8px;
          background: var(--surface-2);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .meter-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .meter-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: var(--text-muted);
          font-family: var(--mono);
          margin-bottom: 10px;
        }

        .meter-hint {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.5;
          padding-top: 8px;
          border-top: 1px solid var(--border);
        }

        /* Risk */
        .risk-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .risk-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid;
          border-radius: 10px;
          padding: 12px 24px;
          width: 100%;
          justify-content: center;
          transition: all 0.3s;
        }

        .risk-icon { font-size: 1rem; }
        .risk-label { font-weight: 600; font-size: 1.1rem; letter-spacing: 0.02em; }

        .risk-dots {
          display: flex;
          gap: 8px;
        }

        .risk-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          transition: all 0.3s;
        }

        /* Recommendation */
        .rec-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .rec-action {
          font-family: var(--mono);
          font-weight: 600;
          font-size: 0.85rem;
          border: 1px solid;
          border-radius: 6px;
          padding: 3px 10px;
          letter-spacing: 0.08em;
        }

        .rec-body {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--text);
          margin-bottom: 14px;
        }

        .rec-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding-top: 10px;
          font-size: 0.75rem;
        }

        .rec-trend { font-family: var(--mono); font-weight: 500; }
        .rec-timestamp { color: var(--text-muted); }

        /* Chart */
        .chart-card { padding: 24px; }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .chart-title {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .chart-meta {
          font-family: var(--mono);
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .chart-tooltip {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 14px;
          box-shadow: 0 8px 24px #00000044;
        }

        .tooltip-date { font-size: 0.72rem; color: var(--text-muted); font-family: var(--mono); }
        .tooltip-price { font-size: 1rem; font-weight: 600; color: var(--green); font-family: var(--mono); }

        /* Loading */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          z-index: 200;
          opacity: 1;
          transition: opacity 0.3s;
        }

        .spinner {
          width: 36px;
          height: 36px;
          border: 3px solid var(--border);
          border-top-color: var(--green);
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .loading-text {
          font-family: var(--mono);
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .fade-in {
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 900px) {
          .header { padding: 16px 20px; }
          .controls { padding: 20px 20px 0; }
          .grid { padding: 20px; grid-template-columns: 1fr 1fr; }
          .col-span-2 { grid-column: span 2; }
          .col-span-3 { grid-column: span 2; }
        }

        @media (max-width: 600px) {
          .grid { grid-template-columns: 1fr; }
          .col-span-2, .col-span-3 { grid-column: span 1; }
        }
      `}</style>

      <div className="dashboard">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">🌾</div>
            <div>
              <div className="logo-text">AgriIntel</div>
              <div className="logo-sub">Agricultural Market Intelligence</div>
            </div>
          </div>
          <span className="header-badge">● LIVE MARKET DATA</span>
        </header>

        {/* Controls */}
        <div className="controls">
          <div className="control-group">
            <label className="control-label">Crop</label>
            <select value={crop} onChange={handleCrop}>
              {CROPS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="control-group">
            <label className="control-label">Region</label>
            <select value={region} onChange={handleRegion}>
              {REGIONS.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <button className="fetch-btn" onClick={() => fetchData(crop, region)}>
            Analyze Market →
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <p className="loading-text">FETCHING MARKET DATA...</p>
          </div>
        )}

        {/* Dashboard Grid */}
        {data && !loading && (
          <div className="grid fade-in">
            {/* Stat Cards Row */}
            <StatCard
              label="Current Price"
              value={`₹ ${data.current_price.toLocaleString("en-IN")}`}
              sub={`Per quintal · ${crop}`}
              accent="#e2eaf4"
            />
            <StatCard
              label="Forecast Price"
              value={`₹ ${data.forecast_price.toLocaleString("en-IN")}`}
              sub="7-day projection"
              accent={data.trend_percentage >= 0 ? "#22c55e" : "#ef4444"}
            />
            <StatCard
              label="Market Trend"
              value={`${data.trend_percentage >= 0 ? "+" : ""}${data.trend_percentage}%`}
              sub={data.trend_percentage >= 0 ? "Upward momentum" : "Downward pressure"}
              accent={data.trend_percentage >= 0 ? "#22c55e" : "#ef4444"}
            />

            {/* Chart */}
            <div className="chart-card col-span-3">
              <div className="chart-header">
                <span className="chart-title">30-Day Price History — {crop} · {region}</span>
                <span className="chart-meta">₹ per quintal</span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={data.price_history} margin={{ left: 0, right: 16, top: 4, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#1e40af" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a3050" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b8aaa", fontSize: 11, fontFamily: "DM Mono" }}
                    tickLine={false}
                    axisLine={false}
                    interval={4}
                  />
                  <YAxis
                    tick={{ fill: "#6b8aaa", fontSize: 11, fontFamily: "DM Mono" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `₹${v}`}
                    width={72}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={data.current_price}
                    stroke="#22c55e33"
                    strokeDasharray="4 4"
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="url(#lineGrad)"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: "#22c55e", stroke: "#050d15", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Meter */}
            <div className="col-span-2">
              <NegotiationMeter score={data.negotiation_score} />
            </div>

            {/* Risk */}
            <RiskIndicator level={data.risk_level} />

            {/* Recommendation */}
            <div className="col-span-3">
              <RecommendationCard
                recommendation={data.recommendation}
                trend={data.trend_percentage}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
