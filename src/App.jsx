import { useState, useEffect } from "react";

const DATA = {
  kpis: { total_txn: 23074, matched: 5657, mismatched: 17417, success: 21380, refund: 1690, pending: 4, total_order: 174449508.0, total_surcharge_paid: 89760.65, total_surcharge_expected: 71014.96, surcharge_leakage: 18745.69, total_comm_received: 31876.63, total_comm_expected: 156616.40, comm_shortfall: -124739.77, match_rate: 24.5, overcharged_txns: 8924, undercharged_txns: 736 },
  products: [
    { code: "ASV", name: "AePS Bio Auth Fee", txn_count: 548, total_value: 0, actual_charge: 515.12, expected_charge: 0, actual_comm: 0, expected_comm: 0, matched: 548, mismatched: 0, charge_diff: 515.12, comm_diff: 0, match_pct: 100 },
    { code: "BAP", name: "Balance Enquiry (AePS)", txn_count: 1730, total_value: 0, actual_charge: 0, expected_charge: 0, actual_comm: 0, expected_comm: 0, matched: 1730, mismatched: 0, charge_diff: 0, comm_diff: 0, match_pct: 100 },
    { code: "DKV", name: "Aadhaar Demographic", txn_count: 49, total_value: 0, actual_charge: 57.82, expected_charge: 0, actual_comm: 0, expected_comm: 0, matched: 0, mismatched: 49, charge_diff: 57.82, comm_diff: 0, match_pct: 0 },
    { code: "DMI", name: "Remittance (Domestic)", txn_count: 838, total_value: 2225208, actual_charge: 0, expected_charge: 2190, actual_comm: 17090.61, expected_comm: 17801.66, matched: 619, mismatched: 219, charge_diff: -2190, comm_diff: -711.06, match_pct: 73.9 },
    { code: "DMK", name: "Remitter Onboarding Fee", txn_count: 21, total_value: 210, actual_charge: 0, expected_charge: 0, actual_comm: 0, expected_comm: 0, matched: 21, mismatched: 0, charge_diff: 0, comm_diff: 0, match_pct: 100 },
    { code: "DMV", name: "Bank Account Verification", txn_count: 13, total_value: 8, actual_charge: 15.34, expected_charge: 0, actual_comm: 0, expected_comm: 0, matched: 0, mismatched: 13, charge_diff: 15.34, comm_diff: 0, match_pct: 0 },
    { code: "DPN", name: "Money Sent via IMPS", txn_count: 9043, total_value: 37733243, actual_charge: 35786.81, expected_charge: 31906.5, actual_comm: 0, expected_comm: 21954.5, matched: 1306, mismatched: 7737, charge_diff: 3880.31, comm_diff: -21954.5, match_pct: 14.4 },
    { code: "PPN", name: "Money Sent via UPI", txn_count: 8696, total_value: 44518260, actual_charge: 51861, expected_charge: 29136.56, actual_comm: 0, expected_comm: 0, matched: 0, mismatched: 8696, charge_diff: 22724.44, comm_diff: 0, match_pct: 0 },
    { code: "SAP", name: "Mini Statement (AePS)", txn_count: 37, total_value: 0, actual_charge: 0, expected_charge: 0, actual_comm: 55.5, expected_comm: 0, matched: 37, mismatched: 0, charge_diff: 0, comm_diff: 55.5, match_pct: 100 },
    { code: "SPN", name: "Credit Card Payment", txn_count: 170, total_value: 8645679, actual_charge: 1524.56, expected_charge: 802.4, actual_comm: 0, expected_comm: 102019.01, matched: 0, mismatched: 170, charge_diff: 722.16, comm_diff: -102019.01, match_pct: 0 },
    { code: "WAP", name: "Cash Withdrawal (AePS)", txn_count: 1904, total_value: 5426900, actual_charge: 0, expected_charge: 6979.5, actual_comm: 14730.53, expected_comm: 14841.23, matched: 1371, mismatched: 533, charge_diff: -6979.5, comm_diff: -110.7, match_pct: 72 },
    { code: "YPN", name: "Money Received via Bank Transfer", txn_count: 25, total_value: 75900000, actual_charge: 0, expected_charge: 0, actual_comm: 0, expected_comm: 0, matched: 25, mismatched: 0, charge_diff: 0, comm_diff: 0, match_pct: 100 },
  ],
  top_mismatches: [
    { id: "1251202105909ZBGDZ", time: "2026-04-21 10:59:09", code: "DPN", name: "Money Sent via IMPS", value: 200000, actual_chg: 9.74, exp_chg: 7.5, chg_diff: 2.24, actual_comm: 0, exp_comm: 2.5, comm_diff: -2.5, status: "SUCCESS" },
    { id: "1251202105933NEHAG", time: "2026-04-21 10:59:33", code: "DPN", name: "Money Sent via IMPS", value: 200000, actual_chg: 9.74, exp_chg: 7.5, chg_diff: 2.24, actual_comm: 0, exp_comm: 2.5, comm_diff: -2.5, status: "SUCCESS" },
    { id: "1251202105955VGYVG", time: "2026-04-21 10:59:55", code: "DPN", name: "Money Sent via IMPS", value: 200000, actual_chg: 9.74, exp_chg: 7.5, chg_diff: 2.24, actual_comm: 0, exp_comm: 2.5, comm_diff: -2.5, status: "SUCCESS" },
    { id: "1251202110036QSQXU", time: "2026-04-21 11:00:36", code: "DPN", name: "Money Sent via IMPS", value: 200000, actual_chg: 9.74, exp_chg: 7.5, chg_diff: 2.24, actual_comm: 0, exp_comm: 2.5, comm_diff: -2.5, status: "SUCCESS" },
    { id: "1251202110142QVGYX", time: "2026-04-21 11:01:42", code: "DPN", name: "Money Sent via IMPS", value: 200000, actual_chg: 9.74, exp_chg: 7.5, chg_diff: 2.24, actual_comm: 0, exp_comm: 2.5, comm_diff: -2.5, status: "SUCCESS" },
    { id: "1251202105353QTTQS", time: "2026-04-21 10:53:53", code: "SPN", name: "Credit Card Payment", value: 99999, actual_chg: 11.8, exp_chg: 4.72, chg_diff: 7.08, actual_comm: 0, exp_comm: 1179.99, comm_diff: -1179.99, status: "SUCCESS" },
    { id: "1251202112845GQEBT", time: "2026-04-21 11:28:45", code: "SPN", name: "Credit Card Payment", value: 99999, actual_chg: 11.8, exp_chg: 4.72, chg_diff: 7.08, actual_comm: 0, exp_comm: 1179.99, comm_diff: -1179.99, status: "SUCCESS" },
    { id: "1251202122229LTJPT", time: "2026-04-21 12:22:29", code: "SPN", name: "Credit Card Payment", value: 99999, actual_chg: 11.8, exp_chg: 4.72, chg_diff: 7.08, actual_comm: 0, exp_comm: 1179.99, comm_diff: -1179.99, status: "SUCCESS" },
    { id: "1251202134553YXRQA", time: "2026-04-21 13:45:53", code: "SPN", name: "Credit Card Payment", value: 99000, actual_chg: 11.8, exp_chg: 4.72, chg_diff: 7.08, actual_comm: 0, exp_comm: 1168.2, comm_diff: -1168.2, status: "SUCCESS" },
    { id: "1251202184840HECAR", time: "2026-04-21 18:48:40", code: "SPN", name: "Credit Card Payment", value: 99000, actual_chg: 11.8, exp_chg: 4.72, chg_diff: 7.08, actual_comm: 0, exp_comm: 1168.2, comm_diff: -1168.2, status: "SUCCESS" },
  ],
};

const fmtINR = (n) => {
  n = Number(n);
  if (Math.abs(n) >= 10000000) return (n / 10000000).toFixed(2) + " Cr";
  if (Math.abs(n) >= 100000) return (n / 100000).toFixed(2) + " L";
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
};
const fmtNum = (n) => Number(n).toLocaleString("en-IN");
const fmtTime = (t) => new Date(t).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const PRODUCT_COLORS = { DPN: "#a855f7", PPN: "#00c6ff", WAP: "#00d68f", BAP: "#4a6fa5", DMI: "#ffaa00", SPN: "#ff4d6a", ASV: "#4a6fa5", DKV: "#4a6fa5", DMK: "#4a6fa5", DMV: "#4a6fa5", SAP: "#4a6fa5", YPN: "#4a6fa5" };
const PRODUCT_BG = { DPN: "#f3e8ff", PPN: "#e0f7ff", WAP: "#e6faf3", BAP: "#eef2f9", DMI: "#fff8e6", SPN: "#ffe8ed", ASV: "#eef2f9", DKV: "#eef2f9", DMK: "#eef2f9", DMV: "#eef2f9", SAP: "#eef2f9", YPN: "#eef2f9" };

const Badge = ({ code }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10.5, fontWeight: 700, background: PRODUCT_BG[code] || "#eef2f9", color: PRODUCT_COLORS[code] || "#4a6fa5", letterSpacing: 0.3 }}>{code}</span>
);

const StatusPill = ({ status }) => {
  const map = { MATCHED: { bg: "#e6faf3", color: "#00a870" }, MISMATCH: { bg: "#ffe8ed", color: "#ff4d6a" }, SUCCESS: { bg: "#e6faf3", color: "#00a870" }, REFUND: { bg: "#fff8e6", color: "#cc8800" }, PENDING: { bg: "#f0eeff", color: "#a855f7" } };
  const s = map[status] || map.PENDING;
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 20, fontSize: 10.5, fontWeight: 700, background: s.bg, color: s.color, whiteSpace: "nowrap" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, display: "inline-block" }} />{status}</span>;
};

const Card = ({ children, style }) => (
  <div style={{ background: "white", borderRadius: 10, border: "1px solid #e8ecf1", overflow: "hidden", ...style }}>{children}</div>
);
const CardHeader = ({ title, sub, right }) => (
  <div style={{ padding: "14px 20px", borderBottom: "1px solid #f0f2f5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <div><div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628" }}>{title}</div>{sub && <div style={{ fontSize: 11, color: "#627d98", marginTop: 2 }}>{sub}</div>}</div>
    {right}
  </div>
);

const KpiCard = ({ label, value, sub, subColor, accent }) => (
  <div style={{ background: "white", borderRadius: 10, border: "1px solid #e8ecf1", padding: "18px 20px", borderTop: `3px solid ${accent}`, flex: 1 }}>
    <div style={{ fontSize: 10, color: "#627d98", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 700, color: "#0a1628", lineHeight: 1.1 }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: "#627d98", marginTop: 6 }}><span style={{ color: subColor, fontWeight: 700 }}>{sub}</span></div>}
  </div>
);

const TH = ({ children }) => <th style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, fontWeight: 700, color: "#627d98", textTransform: "uppercase", letterSpacing: 0.5, background: "#fafbfc", borderBottom: "1px solid #e8ecf1", whiteSpace: "nowrap" }}>{children}</th>;
const TD = ({ children, style }) => <td style={{ padding: "10px 14px", fontSize: 12.5, borderBottom: "1px solid #f0f2f5", color: "#0a1628", ...style }}>{children}</td>;

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function Dashboard({ setScreen, modal }) {
  const maxTxn = Math.max(...DATA.products.map(p => p.txn_count));
  return (
    <div>
      {/* Banner */}
      <div style={{ background: "linear-gradient(135deg,#0a1628,#0f1f3a)", color: "white", padding: "16px 22px", borderRadius: 12, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Instantpay Reconciliation - 21 Apr 2026</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>23,074 transactions processed against Vendor Charges rulebook (v2026.04)</div>
          </div>
          <span style={{ background: "rgba(0,198,255,0.2)", color: "#00c6ff", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>VENDOR: INSTANTPAY</span>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        <KpiCard label="Total Transactions" value="23,074" sub="Volume: INR 17.44 Cr" subColor="#627d98" accent="#00c6ff" />
        <KpiCard label="Matched" value="5,657" sub="24.5% match rate" subColor="#00d68f" accent="#00d68f" />
        <KpiCard label="Mismatched" value="17,417" sub="75.5% needs review" subColor="#ff4d6a" accent="#ff4d6a" />
        <KpiCard label="Vendor Overcharge" value={<span style={{ color: "#ff4d6a" }}>₹18,746</span>} sub="8,924 txns affected" subColor="#ffaa00" accent="#ffaa00" />
        <KpiCard label="Commission Shortfall" value={<span style={{ color: "#ff4d6a" }}>₹1,24,740</span>} sub="vs expected per rules" subColor="#627d98" accent="#a855f7" />
      </div>

      {/* Leakage Box */}
      <div style={{ background: "linear-gradient(135deg,rgba(255,77,106,0.08),rgba(255,170,0,0.05))", border: "1px solid rgba(255,77,106,0.2)", borderRadius: 12, padding: 20, marginBottom: 22 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#ff4d6a", marginBottom: 10 }}>⚠ Financial Impact Analysis (21 Apr 2026)</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[["Charges Paid to Instantpay (Actual)", "INR 89,760.65", "#0a1628"], ["Charges Expected (per Rule Book)", "INR 71,014.96", "#0a1628"], ["Net Revenue Leakage", "INR 18,745.69", "#ff4d6a"]].map(([l, v, c]) => (
            <div key={l}><div style={{ fontSize: 11, color: "#486581", marginBottom: 4 }}>{l}</div><div style={{ fontSize: 20, fontWeight: 700, color: c }}>{v}</div></div>
          ))}
        </div>
      </div>

      {/* Chart + Donut */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 22 }}>
        <Card>
          <CardHeader title="Product-wise Reconciliation Status" sub="Matched vs Mismatched across 12 product types" />
          <div style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 200 }}>
              {DATA.products.filter(p => p.txn_count > 10).map(p => (
                <div key={p.code} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column-reverse", borderRadius: "4px 4px 0 0", overflow: "hidden", height: (p.txn_count / maxTxn) * 180 }}>
                    <div style={{ width: "100%", height: `${(p.matched / p.txn_count) * 100}%`, background: "#00d68f", minHeight: 1 }} />
                    <div style={{ width: "100%", height: `${(p.mismatched / p.txn_count) * 100}%`, background: "#ff4d6a", minHeight: 1 }} />
                  </div>
                  <div style={{ fontSize: 9, color: "#627d98", fontWeight: 600 }}>{p.code}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8, justifyContent: "center" }}>
              {[["#00d68f", "Matched"], ["#ff4d6a", "Mismatched"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#627d98" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />{l}
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <CardHeader title="Overall Match Rate" />
          <div style={{ padding: 20, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 140, height: 140, borderRadius: "50%", background: `conic-gradient(#00d68f 0% 24.5%, #ff4d6a 24.5% 100%)`, position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 28, background: "white", borderRadius: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#0a1628" }}>24.5%</div>
                <div style={{ fontSize: 10, color: "#627d98" }}>Matched</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[["#00d68f", "Matched", "5,657"], ["#ff4d6a", "Mismatched", "17,417"]].map(([c, l, v]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11.5, color: "#627d98" }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: c }} />{l}: <b style={{ color: "#0a1628" }}>{v}</b>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Top Mismatches Table */}
      <Card>
        <CardHeader title="Top 10 High-Value Mismatches" sub="Sorted by transaction value - require immediate review"
          right={<span style={{ color: "#00c6ff", fontWeight: 700, fontSize: 12, cursor: "pointer" }} onClick={() => setScreen("mismatches")}>View All 17,417 →</span>} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Order ID", "Time", "Product", "Order Value", "Actual Chg", "Expected Chg", "Diff", "Status", "Action"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {DATA.top_mismatches.slice(0, 10).map(r => (
                <tr key={r.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <TD><span style={{ fontFamily: "monospace", fontSize: 11.5 }}>{r.id.substring(0, 16)}...</span></TD>
                  <TD style={{ fontSize: 11 }}>{fmtTime(r.time)}</TD>
                  <TD><Badge code={r.code} /> <span style={{ fontSize: 11, marginLeft: 4 }}>{r.name.substring(0, 18)}</span></TD>
                  <TD style={{ fontWeight: 700 }}>{fmtINR(r.value)}</TD>
                  <TD>{r.actual_chg.toFixed(2)}</TD>
                  <TD>{r.exp_chg.toFixed(2)}</TD>
                  <TD style={{ color: r.chg_diff > 0 ? "#ff4d6a" : "#00d68f", fontWeight: 700 }}>{r.chg_diff.toFixed(2)}</TD>
                  <TD><StatusPill status="MISMATCH" /></TD>
                  <TD><span style={{ color: "#00c6ff", fontWeight: 700, fontSize: 12, cursor: "pointer" }} onClick={() => modal(r)}>Review</span></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function LeakageScreen() {
  return (
    <div>
      <div style={{ background: "#ffe8ed", border: "1px solid rgba(255,77,106,0.2)", borderRadius: 8, padding: "12px 16px", marginBottom: 18, fontSize: 13, fontWeight: 600, color: "#cc3355" }}>
        ⚠ Instantpay has overcharged INR 18,745.69 across 8,924 transactions. Recovery required.
      </div>
      <div style={{ display: "flex", gap: 14, marginBottom: 22 }}>
        <KpiCard label="Overcharged Txns" value="8,924" sub="Vendor billed more than rule allows" subColor="#ff4d6a" accent="#ff4d6a" />
        <KpiCard label="Undercharged Txns" value="736" sub="Vendor billed less (risk-adjusted)" subColor="#ffaa00" accent="#ffaa00" />
        <KpiCard label="Total Overcharge Value" value={<span style={{ color: "#ff4d6a" }}>₹18,746</span>} sub="Recoverable amount" subColor="#627d98" accent="#a855f7" />
        <KpiCard label="Commission Gap" value={<span style={{ color: "#ff4d6a" }}>₹1,24,740</span>} sub="Under-paid commission" subColor="#627d98" accent="#00c6ff" />
      </div>
      <Card>
        <CardHeader title="Product-wise Leakage Report" sub="Where the money is leaking" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Product", "Txns", "Order Value", "Actual Chg", "Expected Chg", "Chg Diff", "Actual Comm", "Expected Comm", "Comm Diff", "Match %"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {DATA.products.map(p => (
                <tr key={p.code} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <TD><Badge code={p.code} /> <span style={{ marginLeft: 4 }}>{p.name}</span></TD>
                  <TD>{fmtNum(p.txn_count)}</TD>
                  <TD style={{ fontWeight: 700 }}>{fmtINR(p.total_value)}</TD>
                  <TD>{p.actual_charge.toFixed(2)}</TD>
                  <TD>{p.expected_charge.toFixed(2)}</TD>
                  <TD style={{ color: p.charge_diff > 1 ? "#ff4d6a" : p.charge_diff < -1 ? "#00d68f" : undefined, fontWeight: 600 }}>{p.charge_diff.toFixed(2)}</TD>
                  <TD>{p.actual_comm.toFixed(2)}</TD>
                  <TD>{p.expected_comm.toFixed(2)}</TD>
                  <TD style={{ color: p.comm_diff < -1 ? "#ff4d6a" : p.comm_diff > 1 ? "#00d68f" : undefined, fontWeight: 600 }}>{p.comm_diff.toFixed(2)}</TD>
                  <TD>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 60, height: 6, background: "#e8ecf1", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${p.match_pct}%`, height: "100%", background: p.match_pct >= 90 ? "#00d68f" : p.match_pct >= 50 ? "#ffaa00" : "#ff4d6a", borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 11 }}>{p.match_pct}%</span>
                    </div>
                  </TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function TxnLedger({ modal }) {
  const [filterProd, setFilterProd] = useState("");
  const [filterRecon, setFilterRecon] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 15;

  const allRows = DATA.top_mismatches.map(r => ({ ...r, recon: "MISMATCH" }));
  const filtered = allRows.filter(r => (!filterProd || r.code === filterProd) && (!filterRecon || r.recon === filterRecon));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, background: "white", padding: "12px 14px", borderRadius: 10, border: "1px solid #e8ecf1", flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, color: "#627d98", fontWeight: 700 }}>Product:</span>
        <select value={filterProd} onChange={e => { setFilterProd(e.target.value); setPage(1); }} style={{ padding: "7px 11px", borderRadius: 6, border: "1px solid #dde3ec", fontSize: 12, fontFamily: "inherit" }}>
          <option value="">All</option>
          {["DPN", "PPN", "WAP", "BAP", "DMI", "SPN"].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ fontSize: 11, color: "#627d98", fontWeight: 700 }}>Recon:</span>
        <select value={filterRecon} onChange={e => { setFilterRecon(e.target.value); setPage(1); }} style={{ padding: "7px 11px", borderRadius: 6, border: "1px solid #dde3ec", fontSize: 12, fontFamily: "inherit" }}>
          <option value="">All</option>
          <option value="MATCHED">Matched</option>
          <option value="MISMATCH">Mismatched</option>
        </select>
        <button onClick={() => { setFilterProd(""); setFilterRecon(""); setPage(1); }} style={{ padding: "7px 14px", borderRadius: 6, border: "1px solid #dde3ec", background: "white", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}>Clear</button>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#627d98" }}>Showing {filtered.length} of 23,074 txns</span>
      </div>
      <Card>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Ipay Order ID", "Time", "Product", "Order Value", "Status", "Actual Chg", "Expected Chg", "Diff", "Recon"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {paged.map(r => (
                <tr key={r.id} style={{ cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <TD><span style={{ fontFamily: "monospace", fontSize: 11.5 }}>{r.id.substring(0, 16)}...</span></TD>
                  <TD style={{ fontSize: 11 }}>{fmtTime(r.time)}</TD>
                  <TD><Badge code={r.code} /></TD>
                  <TD style={{ fontWeight: 700 }}>{fmtINR(r.value)}</TD>
                  <TD><StatusPill status={r.status} /></TD>
                  <TD>{r.actual_chg.toFixed(2)}</TD>
                  <TD>{r.exp_chg.toFixed(2)}</TD>
                  <TD style={{ color: r.chg_diff > 0 ? "#ff4d6a" : "#00d68f", fontWeight: 700 }}>{r.chg_diff.toFixed(2)}</TD>
                  <TD><StatusPill status={r.recon} /></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderTop: "1px solid #f0f2f5" }}>
          <span style={{ fontSize: 11, color: "#627d98" }}>Page {page} of {Math.ceil(filtered.length / PAGE_SIZE)}</span>
          <div style={{ display: "flex", gap: 4 }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #dde3ec", background: "white", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>◀</button>
            <button onClick={() => setPage(p => Math.min(Math.ceil(filtered.length / PAGE_SIZE), p + 1))} style={{ width: 30, height: 30, borderRadius: 6, border: "1px solid #dde3ec", background: "white", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>▶</button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function MismatchScreen({ modal }) {
  return (
    <div>
      <div style={{ background: "#fff8e6", border: "1px solid rgba(255,170,0,0.2)", borderRadius: 8, padding: "12px 16px", marginBottom: 18, fontSize: 13, fontWeight: 600, color: "#9a6700" }}>
        ⚠ 17,417 transactions flagged for rule violation. Review and raise disputes with Instantpay.
      </div>
      <Card>
        <CardHeader title="All Mismatches" sub="Top 30 by value shown - full list in export"
          right={<button style={{ padding: "8px 14px", borderRadius: 8, background: "#ff4d6a", color: "white", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>Raise Bulk Dispute</button>} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Order ID", "Time", "Product", "Order Value", "Status", "Actual Chg", "Expected Chg", "Diff", "Action"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {DATA.top_mismatches.map(r => (
                <tr key={r.id} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <TD><span style={{ fontFamily: "monospace", fontSize: 11 }}>{r.id.substring(0, 16)}...</span></TD>
                  <TD style={{ fontSize: 11 }}>{fmtTime(r.time)}</TD>
                  <TD><Badge code={r.code} /></TD>
                  <TD style={{ fontWeight: 700 }}>{fmtINR(r.value)}</TD>
                  <TD><StatusPill status={r.status} /></TD>
                  <TD>{r.actual_chg.toFixed(2)}</TD>
                  <TD>{r.exp_chg.toFixed(2)}</TD>
                  <TD style={{ color: r.chg_diff > 0 ? "#ff4d6a" : "#00d68f", fontWeight: 700 }}>{r.chg_diff.toFixed(2)}</TD>
                  <TD><span style={{ color: "#00c6ff", fontWeight: 700, fontSize: 12, cursor: "pointer" }} onClick={() => modal(r)}>View</span></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ProductsScreen() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
      {DATA.products.map(p => (
        <Card key={p.code}>
          <div style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div><Badge code={p.code} /><div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628", marginTop: 6 }}>{p.name}</div></div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: p.match_pct >= 90 ? "#00d68f" : p.match_pct >= 50 ? "#ffaa00" : "#ff4d6a" }}>{p.match_pct}%</div>
                <div style={{ fontSize: 10, color: "#627d98" }}>match</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["Txn Count", fmtNum(p.txn_count), undefined], ["Volume", fmtINR(p.total_value), undefined], ["Matched", fmtNum(p.matched), "#00d68f"], ["Mismatched", fmtNum(p.mismatched), "#ff4d6a"]].map(([l, v, c]) => (
                <div key={l}><div style={{ fontSize: 10, color: "#627d98" }}>{l}</div><div style={{ fontSize: 14, fontWeight: 700, color: c || "#0a1628" }}>{v}</div></div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #f0f2f5", fontSize: 11 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#627d98" }}>Charge diff:</span><span style={{ color: p.charge_diff > 1 ? "#ff4d6a" : "#00d68f", fontWeight: 700 }}>{p.charge_diff.toFixed(2)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span style={{ color: "#627d98" }}>Comm diff:</span><span style={{ color: p.comm_diff < -1 ? "#ff4d6a" : "#00d68f", fontWeight: 700 }}>{p.comm_diff.toFixed(2)}</span></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function RulesScreen() {
  const [rules, setRules] = useState({
    r1: true, r2: true, r3: true, r4: true, r5: true, r6: true,
    r7: true, r8: true, r9: true, r10: true, r11: true, r12: true, r13: true
  });
  const toggle = (k) => setRules(r => ({ ...r, [k]: !r[k] }));
  const Toggle = ({ k }) => (
    <div onClick={() => toggle(k)} style={{ width: 40, height: 22, borderRadius: 11, background: rules[k] ? "#00d68f" : "#dde3ec", position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}>
      <div style={{ position: "absolute", top: 2, left: rules[k] ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "white", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
    </div>
  );
  const RuleRow = ({ k, icon, color, bg, name, desc }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", border: "1px solid #e8ecf1", borderRadius: 8, marginBottom: 8 }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: bg, color, fontWeight: 700, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>{name}</div><div style={{ fontSize: 11, color: "#627d98", marginTop: 2 }}>{desc}</div></div>
      <Toggle k={k} />
    </div>
  );
  return (
    <div>
      <div style={{ background: "rgba(0,198,255,0.08)", border: "1px solid rgba(0,198,255,0.2)", borderRadius: 8, padding: "12px 16px", marginBottom: 20, fontSize: 13, fontWeight: 500, color: "#0099cc" }}>ℹ All rules loaded from Vendor_Charges.xlsx. Enable/disable to test recon impact.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <CardHeader title="Instantpay Slab Rules" />
          <div style={{ padding: "14px 16px" }}>
            <RuleRow k="r1" icon="I" color="#a855f7" bg="rgba(168,85,247,0.1)" name="IMPS DMT (DPN): 100–1000" desc="Flat charge Rs.3.5 | Expected commission Rs.2" />
            <RuleRow k="r2" icon="I" color="#a855f7" bg="rgba(168,85,247,0.1)" name="IMPS DMT (DPN): 1001–25000" desc="Flat charge Rs.3.5 | Expected commission Rs.2.5" />
            <RuleRow k="r3" icon="I" color="#a855f7" bg="rgba(168,85,247,0.1)" name="IMPS DMT (DPN): Above 25001" desc="Flat charge Rs.7.5" />
            <RuleRow k="r4" icon="U" color="#00c6ff" bg="rgba(0,198,255,0.1)" name="UPI Payout (PPN): 100–1000" desc="Flat charge Rs.2.5 without GST" />
            <RuleRow k="r5" icon="U" color="#00c6ff" bg="rgba(0,198,255,0.1)" name="UPI Payout (PPN): 1001–25000" desc="Flat charge Rs.3.5 without GST" />
            <RuleRow k="r6" icon="U" color="#00c6ff" bg="rgba(0,198,255,0.1)" name="UPI Payout (PPN): Above 25001" desc="Flat charge Rs.7.5 / Rs.9.74 with GST" />
          </div>
        </Card>
        <Card>
          <CardHeader title="Other Product Rules" />
          <div style={{ padding: "14px 16px" }}>
            <RuleRow k="r7" icon="A" color="#00d68f" bg="rgba(0,214,143,0.1)" name="AEPS (WAP): 100–3000" desc="Commission 0.45% of txn value" />
            <RuleRow k="r8" icon="A" color="#00d68f" bg="rgba(0,214,143,0.1)" name="AEPS (WAP): 3001–10000" desc="Flat commission Rs.13.5" />
            <RuleRow k="r9" icon="C" color="#ff4d6a" bg="rgba(255,77,106,0.1)" name="Credit Card (SPN): NEFT" desc="Flat charge Rs.4.72 | Commission 11.8%" />
            <RuleRow k="r10" icon="R" color="#a855f7" bg="rgba(168,85,247,0.1)" name="Remittance (DMI): 100–1000" desc="Charge Rs.10 | Commission Rs.2" />
            <RuleRow k="r11" icon="R" color="#a855f7" bg="rgba(168,85,247,0.1)" name="Remittance (DMI): 1001–5000" desc="Commission Rs.2.5 | No additional charge" />
            <RuleRow k="r12" icon="T" color="#4a6fa5" bg="rgba(100,130,180,0.1)" name="Tolerance: Rs.1 charge / Rs.2 commission" desc="Mismatch flagged if variance exceeds tolerance" />
          </div>
        </Card>
      </div>
      <Card>
        <CardHeader title="Automation Rules" />
        <div style={{ padding: "14px 16px" }}>
          <RuleRow k="r13" icon="!" color="#ffaa00" bg="rgba(255,170,0,0.1)" name="Auto-flag overcharge > Rs.2" desc="Currently triggers on 8,924 transactions today" />
        </div>
      </Card>
    </div>
  );
}

function DisputesScreen() {
  const disputes = DATA.products.filter(p => p.mismatched > 0).map((p, i) => ({
    id: "DSP-IP-" + String(i + 1).padStart(4, "0"),
    code: p.code, name: p.name, count: p.mismatched,
    amount: (Math.abs(p.charge_diff) + Math.abs(p.comm_diff)).toFixed(2),
    priority: p.mismatched > 1000 ? "Critical" : p.mismatched > 100 ? "High" : "Medium"
  }));
  return (
    <div>
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e8ecf1", marginBottom: 20 }}>
        {[`Open (17,417)`, "In Progress (0)", "Resolved (0)"].map((t, i) => (
          <div key={t} style={{ padding: "10px 18px", fontSize: 12.5, fontWeight: 700, color: i === 0 ? "#00c6ff" : "#627d98", borderBottom: i === 0 ? "2px solid #00c6ff" : "2px solid transparent", marginBottom: -2, cursor: "pointer" }}>{t}</div>
        ))}
      </div>
      <Card>
        <CardHeader title="Dispute Queue - Auto-generated from Mismatches" sub="Grouped by product for bulk resolution" />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["Dispute ID", "Product", "Txn Count", "Total Overcharge", "Priority", "Age", "Status", "Action"].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
            <tbody>
              {disputes.map(d => (
                <tr key={d.id} onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"} onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <TD><span style={{ fontFamily: "monospace", fontSize: 11.5 }}>{d.id}</span></TD>
                  <TD><Badge code={d.code} /> {d.name.substring(0, 20)}</TD>
                  <TD style={{ fontWeight: 700 }}>{fmtNum(d.count)}</TD>
                  <TD style={{ fontWeight: 700 }}>INR {d.amount}</TD>
                  <TD><StatusPill status={d.priority === "Critical" ? "MISMATCH" : d.priority === "High" ? "REFUND" : "PENDING"} /></TD>
                  <TD style={{ fontSize: 11 }}>2h ago</TD>
                  <TD><StatusPill status="PENDING" /></TD>
                  <TD><span style={{ color: "#00c6ff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>Resolve</span></TD>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ReportsScreen() {
  const reports = [
    { icon: "📄", color: "#00c6ff", title: "Daily Recon Report", sub: "Complete txn ledger + diff analysis" },
    { icon: "💸", color: "#ff4d6a", title: "Leakage Report", sub: "Overcharge by product and vendor" },
    { icon: "💰", color: "#00d68f", title: "Commission Report", sub: "Expected vs received commission" },
    { icon: "⚠️", color: "#ffaa00", title: "Mismatch Drilldown", sub: "Transaction-level mismatch details" },
    { icon: "📊", color: "#a855f7", title: "Product Summary", sub: "Volume and match rate per product" },
    { icon: "🔄", color: "#0099cc", title: "Refund Tracker", sub: "1,690 refund txns - settlement status" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
      {reports.map(r => (
        <Card key={r.title} style={{ cursor: "pointer" }}>
          <div style={{ padding: 28, textAlign: "center" }} onMouseEnter={e => e.currentTarget.parentElement.style.borderColor = r.color} onMouseLeave={e => e.currentTarget.parentElement.style.borderColor = "#e8ecf1"}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{r.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#0a1628" }}>{r.title}</div>
            <div style={{ fontSize: 11, color: "#627d98", marginTop: 4 }}>{r.sub}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function TxnModal({ txn, onClose }) {
  if (!txn) return null;
  const fields = [
    ["Order ID", txn.id, { fontFamily: "monospace", fontSize: 11 }],
    ["Date/Time", txn.time],
    ["Product", `${txn.code} - ${txn.name}`],
    ["Status", txn.status],
    ["Order Value", `INR ${Number(txn.value).toLocaleString("en-IN")}`],
    ["Actual Surcharge", `INR ${txn.actual_chg.toFixed(2)}`, { color: "#ff4d6a" }],
    ["Expected Surcharge", `INR ${txn.exp_chg.toFixed(2)}`, { color: "#00a870" }],
    ["Surcharge Diff", `INR ${txn.chg_diff.toFixed(2)}`, { color: txn.chg_diff > 0 ? "#ff4d6a" : "#00a870" }],
    ["Actual Commission", `INR ${(txn.actual_comm || 0).toFixed(2)}`],
    ["Expected Commission", `INR ${(txn.exp_comm || 0).toFixed(2)}`],
    ["Commission Diff", `INR ${(txn.comm_diff || 0).toFixed(2)}`, { color: (txn.comm_diff || 0) < 0 ? "#ff4d6a" : "#00a870" }],
    ["Recon Status", "MISMATCH"],
  ];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(10,22,40,0.6)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: 14, width: 620, maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid #e8ecf1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0a1628" }}>Transaction: {txn.id.substring(0, 20)}</div>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 6, border: "none", background: "#f5f7fa", cursor: "pointer", fontSize: 16, color: "#627d98" }}>×</button>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {fields.map(([l, v, s]) => (
              <div key={l}><div style={{ fontSize: 10, color: "#627d98", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 }}>{l}</div><div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628", ...s }}>{v}</div></div>
            ))}
          </div>
        </div>
        <div style={{ padding: "14px 22px", borderTop: "1px solid #e8ecf1", display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #dde3ec", background: "white", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Close</button>
          <button style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "#ff4d6a", color: "white", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Raise Dispute</button>
          <button style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "#00d68f", color: "white", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Mark Resolved</button>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
const NAV = [
  { section: "Overview", items: [{ id: "dashboard", label: "Dashboard", badge: null }, { id: "leakage", label: "Leakage Analysis", badge: "!", badgeColor: "#ff4d6a" }] },
  { section: "Reconciliation", items: [{ id: "txn-ledger", label: "Txn Ledger" }, { id: "mismatches", label: "Mismatches", badge: "17,417", badgeColor: "#ff4d6a" }, { id: "products", label: "Products" }, { id: "workflow", label: "Workflow" }] },
  { section: "Management", items: [{ id: "vendors", label: "Vendors" }, { id: "rules", label: "Rules Engine" }, { id: "disputes", label: "Disputes" }, { id: "reports", label: "Reports" }] },
];

const SCREEN_TITLES = { dashboard: ["Reconciliation Dashboard", "Home / Dashboard"], leakage: ["Leakage Analysis", "Overview / Leakage"], "txn-ledger": ["Transaction Ledger", "Reconciliation / Ledger"], mismatches: ["Mismatches", "Reconciliation / Mismatches"], products: ["Product Breakdown", "Reconciliation / Products"], workflow: ["Transaction Workflows", "Reconciliation / Workflow"], vendors: ["Vendors", "Management / Vendors"], rules: ["Rules Engine", "Management / Rules"], disputes: ["Disputes", "Management / Disputes"], reports: ["Reports", "Management / Reports"] };

function WorkflowScreen() {
  const flows = [
    { title: "IMPS Money Transfer Flow (Product: DPN)", steps: [["done","1","Agent initiates at SPay portal"],["done","2","SPay wallet debit + fee"],["done","3","API call to Instantpay"],["done","4","IMPS routing to bank"],["active","5","Beneficiary credit + UTR"],["","6","Recon: Expected fee vs Charged"]] },
    { title: "AEPS Cash Withdrawal Flow (Product: WAP)", steps: [["done","1","Customer biometric at agent"],["done","2","Instantpay routes to NPCI"],["done","3","Issuer bank auth"],["done","4","Cash paid from agent float"],["active","5","Settlement to SPay wallet"],["","6","Commission (0.45%) credit check"]] },
    { title: "Reconciliation Logic Flow", steps: [["done","1","Receive Instantpay MIS file (daily)"],["done","2","Load Vendor Charges rulebook"],["done","3","Apply slab rules per product"],["done","4","Compute expected charge/commission"],["active","5","Compare with actual values"],["","6","Flag mismatches + auto dispute"]] },
  ];
  return (
    <div>
      {flows.map(f => (
        <Card key={f.title} style={{ marginBottom: 18 }}>
          <CardHeader title={f.title} />
          <div style={{ padding: "20px 30px 30px" }}>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {f.steps.map(([st, num, label], i) => (
                <div key={num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  {i < f.steps.length - 1 && <div style={{ position: "absolute", top: 20, left: "50%", right: "-50%", height: 2, background: st === "done" ? "#00d68f" : st === "active" ? "linear-gradient(90deg,#00c6ff,#dde3ec)" : "#dde3ec" }} />}
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: `2px solid ${st === "done" ? "#00d68f" : st === "active" ? "#00c6ff" : "#dde3ec"}`, background: st === "done" ? "#00d68f" : st === "active" ? "#00c6ff" : "white", display: "flex", alignItems: "center", justifyContent: "center", color: st ? "white" : "#9fb3c8", fontWeight: 700, fontSize: 14, zIndex: 2, boxShadow: st === "active" ? "0 0 0 4px rgba(0,198,255,0.2)" : "none" }}>{num}</div>
                  <div style={{ marginTop: 10, fontSize: 11, fontWeight: 600, color: st === "done" ? "#00a870" : st === "active" ? "#00c6ff" : "#627d98", textAlign: "center", maxWidth: 100 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function VendorsScreen() {
  const vendors = [
    { abbr: "IP", name: "Instantpay", type: "DMT, UPI, AEPS, Credit Card, Remittance", match: "24.5%", matchColor: "#ff4d6a", grad: "#0052cc,#4c9aff" },
    { abbr: "EM", name: "Easymudra", type: "DMT, Payout, Recharge", match: "-", matchColor: "#627d98", grad: "#00897b,#4db6ac" },
    { abbr: "PS", name: "Paysprit", type: "DMT", match: "-", matchColor: "#627d98", grad: "#6a1b9a,#9c27b0" },
    { abbr: "TR", name: "TRM", type: "Credit Card, PAN, DTH, mATM, AEPS", match: "-", matchColor: "#627d98", grad: "#d32f2f,#ef5350" },
    { abbr: "QP", name: "Quickpay PG", type: "Card/UPI Payment Gateway", match: "-", matchColor: "#627d98", grad: "#1a2980,#26d0ce" },
    { abbr: "RP", name: "Razorpay PG/QR", type: "Payment Gateway", match: "-", matchColor: "#627d98", grad: "#0052cc,#2684ff" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {vendors.map(v => (
        <div key={v.abbr} style={{ display: "flex", alignItems: "center", gap: 14, padding: 14, borderRadius: 8, border: "1px solid #e8ecf1", background: "white", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "#00c6ff"} onMouseLeave={e => e.currentTarget.style.borderColor = "#e8ecf1"}>
          <div style={{ width: 42, height: 42, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${v.grad})`, color: "white", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{v.abbr}</div>
          <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 700, color: "#0a1628" }}>{v.name}</div><div style={{ fontSize: 11, color: "#627d98", marginTop: 2 }}>{v.type}</div></div>
          <div style={{ textAlign: "right" }}><div style={{ fontSize: 14, fontWeight: 700, color: v.matchColor }}>{v.match}</div><div style={{ fontSize: 10, color: "#627d98" }}>Match Rate</div></div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("dashboard");
  const [modalTxn, setModalTxn] = useState(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setLive(l => l), 2000);
    return () => clearInterval(t);
  }, []);

  const [title, breadcrumb] = SCREEN_TITLES[screen] || ["Dashboard", "Home"];

  const renderScreen = () => {
    switch (screen) {
      case "dashboard": return <Dashboard setScreen={setScreen} modal={setModalTxn} />;
      case "leakage": return <LeakageScreen />;
      case "txn-ledger": return <TxnLedger modal={setModalTxn} />;
      case "mismatches": return <MismatchScreen modal={setModalTxn} />;
      case "products": return <ProductsScreen />;
      case "workflow": return <WorkflowScreen />;
      case "vendors": return <VendorsScreen />;
      case "rules": return <RulesScreen />;
      case "disputes": return <DisputesScreen />;
      case "reports": return <ReportsScreen />;
      default: return <Dashboard setScreen={setScreen} modal={setModalTxn} />;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", height: "100vh", overflow: "hidden", background: "#f5f7fa", fontSize: 14 }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: "#0a1628", display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", gap: 10 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#00c6ff,#0077ff)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: 14 }}>S</div>
          <div><div style={{ color: "white", fontWeight: 700, fontSize: 16 }}>SPay <span style={{ fontSize: 10, color: "#9fb3c8", letterSpacing: 1 }}>RECON</span></div></div>
        </div>
        <nav style={{ padding: "12px 0", flex: 1 }}>
          {NAV.map(({ section, items }) => (
            <div key={section} style={{ padding: "0 16px", marginBottom: 4 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#627d98", textTransform: "uppercase", letterSpacing: 1.2, padding: "12px 8px 6px" }}>{section}</div>
              {items.map(item => (
                <div key={item.id} onClick={() => setScreen(item.id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 8, cursor: "pointer", color: screen === item.id ? "#00c6ff" : "#9fb3c8", background: screen === item.id ? "rgba(0,198,255,0.1)" : "transparent", fontSize: 13, fontWeight: 600, marginBottom: 1, transition: "all 0.15s", borderLeft: screen === item.id ? "3px solid #00c6ff" : "3px solid transparent" }}>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && <span style={{ background: item.badgeColor, color: "white", fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 10 }}>{item.badge}</span>}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <header style={{ height: 64, background: "white", borderBottom: "1px solid #e8ecf1", display: "flex", alignItems: "center", padding: "0 28px", justifyContent: "space-between", flexShrink: 0, zIndex: 10 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0a1628" }}>{title}</div>
            <div style={{ fontSize: 12, color: "#627d98" }}>{breadcrumb}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#00d68f", fontWeight: 700 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00d68f", display: "inline-block", animation: "pulse 2s infinite" }} />LIVE DATA
            </div>
            <button style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid #dde3ec", background: "white", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Export</button>
            <button style={{ padding: "8px 14px", borderRadius: 8, border: "none", background: "#00c6ff", color: "white", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>Re-run Recon</button>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {renderScreen()}
        </main>
      </div>

      {/* Modal */}
      <TxnModal txn={modalTxn} onClose={() => setModalTxn(null)} />

      <style>{`
        @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,214,143,0.4)} 50%{box-shadow:0 0 0 6px rgba(0,214,143,0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #d0d7de; border-radius: 3px; }
      `}</style>
    </div>
  );
}