"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

// ── Constants ─────────────────────────────────────────────────────────────────

const COMMISSION_DEFAULTS: Record<string, number> = {
  Básico: 8,
  Pro: 12,
  Enterprise: 18,
};

const SCENARIO_MULTIPLIERS: Record<string, number> = {
  Conservative: 0.6,
  Expected: 1.0,
  Aggressive: 1.4,
};

// Average first-month salary assumption for MX entry-level talent (MXN)
const BASE_SALARY_MXN = 15_000;

const SEGMENTS = ["SME", "University", "Student"];
const TIERS = ["Básico", "Pro", "Enterprise"];
const SCENARIOS = ["Conservative", "Expected", "Aggressive"] as const;

type ScenarioKey = (typeof SCENARIOS)[number];

type PricingScenario = {
  id?: number;
  created_at?: string;
  segment: string;
  tier: string;
  monthly_hires: number;
  commission_pct: number;
  scenario: string;
  monthly_revenue: number;
  annual_revenue: number;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatMXN(value: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 }).format(value);
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [segment, setSegment] = useState("SME");
  const [tier, setTier] = useState("Básico");
  const [monthlyHires, setMonthlyHires] = useState(5);
  const [commissionPct, setCommissionPct] = useState(8);
  const [conversionRate, setConversionRate] = useState(20);
  const [scenario, setScenario] = useState<ScenarioKey>("Expected");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [savedScenarios, setSavedScenarios] = useState<PricingScenario[]>([]);
  const [loadingScenarios, setLoadingScenarios] = useState(true);

  // Auto-fill commission when tier changes
  useEffect(() => {
    setCommissionPct(COMMISSION_DEFAULTS[tier]);
  }, [tier]);

  // Revenue calculations (live)
  const revenuePerHire = (commissionPct / 100) * BASE_SALARY_MXN;
  const multiplier = SCENARIO_MULTIPLIERS[scenario];
  const monthlyRevenue = monthlyHires * revenuePerHire * multiplier;
  const annualRevenue = monthlyRevenue * 12;
  const effectiveReach =
    conversionRate > 0 ? monthlyHires / (conversionRate / 100) : 0;

  const loadScenarios = useCallback(async () => {
    setLoadingScenarios(true);
    const { data } = await supabase
      .from("pricing_scenarios")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setSavedScenarios(data as PricingScenario[]);
    setLoadingScenarios(false);
  }, []);

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    const { error } = await supabase.from("pricing_scenarios").insert({
      segment,
      tier,
      monthly_hires: monthlyHires,
      commission_pct: commissionPct,
      scenario,
      monthly_revenue: monthlyRevenue,
      annual_revenue: annualRevenue,
    });
    if (error) {
      setSaveError(error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      loadScenarios();
    }
    setSaving(false);
  }

  const scenarioColors: Record<ScenarioKey, string> = {
    Conservative: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    Expected: "border-indigo-500/40 bg-indigo-500/10 text-indigo-400",
    Aggressive: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  };

  const activeScenarioColor: Record<ScenarioKey, string> = {
    Conservative: "bg-amber-600 text-white border-amber-600",
    Expected: "bg-indigo-600 text-white border-indigo-600",
    Aggressive: "bg-emerald-600 text-white border-emerald-600",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-16">

        {/* Hero */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
            Week 3 — Revenue Modeling
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Pricing &amp;{" "}
            <span className="text-amber-400">Revenue Simulator</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Model revenue scenarios for TalentBridge MX across customer
            segments, pricing tiers, and growth assumptions.
          </p>
        </section>

        {/* Calculator + Output */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Inputs */}
          <div className="lg:col-span-3 rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold">Calculator Inputs</h2>
              <p className="text-slate-400 text-sm mt-0.5">Adjust any field — results update instantly.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Segment */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Customer Segment
                </label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                >
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Tier */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Pricing Tier
                </label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                >
                  {TIERS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Monthly Hires */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Monthly Hires
                </label>
                <input
                  type="number"
                  min={0}
                  value={monthlyHires}
                  onChange={(e) => setMonthlyHires(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                />
              </div>

              {/* Commission % */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Commission %{" "}
                  <span className="text-slate-500 normal-case">(auto-fills by tier)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={commissionPct}
                    onChange={(e) => setCommissionPct(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">
                    %
                  </span>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Conversion Rate %
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    step={1}
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Math.min(100, Math.max(1, Number(e.target.value))))}
                    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-semibold">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Scenario Toggle */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Growth Scenario
              </label>
              <div className="flex gap-2 flex-wrap">
                {SCENARIOS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setScenario(s)}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-all ${
                      scenario === s
                        ? activeScenarioColor[s]
                        : "border-slate-600 text-slate-400 hover:border-slate-400 hover:text-white"
                    }`}
                  >
                    {s}
                    <span className="ml-1.5 text-xs opacity-70">
                      ×{SCENARIO_MULTIPLIERS[s].toFixed(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Output */}
          <div className="lg:col-span-2 space-y-4">
            <div className={`rounded-2xl border p-6 space-y-5 ${scenarioColors[scenario]}`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-70">
                  {scenario} Scenario
                </p>
                <p className="text-sm text-slate-400 mt-0.5">
                  {segment} · {tier} · {commissionPct}% commission
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-slate-950/50 p-4 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Monthly Revenue
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {formatMXN(monthlyRevenue)}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950/50 p-4 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    Annual Revenue
                  </p>
                  <p className="text-3xl font-bold text-white">
                    {formatMXN(annualRevenue)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-slate-950/50 p-3 space-y-0.5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Per Hire
                    </p>
                    <p className="text-lg font-bold text-white">
                      {formatMXN(revenuePerHire)}
                    </p>
                  </div>
                  <div className="rounded-xl bg-slate-950/50 p-3 space-y-0.5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Reach Needed
                    </p>
                    <p className="text-lg font-bold text-white">
                      {formatNumber(effectiveReach)}
                    </p>
                    <p className="text-xs text-slate-600">contacts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5 space-y-3">
              <div>
                <p className="font-semibold text-white text-sm">Save Scenario</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Persist this configuration to Supabase.
                </p>
              </div>
              {saveError && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {saveError}
                </p>
              )}
              <button
                onClick={handleSave}
                disabled={saving || saved}
                className={`w-full rounded-full py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
                  saved
                    ? "bg-emerald-900/50 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-600 text-white hover:bg-amber-500 disabled:opacity-50"
                }`}
              >
                {saved ? "Saved ✓" : saving ? "Saving…" : "Save Scenario"}
              </button>
            </div>
          </div>
        </section>

        {/* Assumptions Table */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Model Assumptions</h2>
            <p className="text-slate-400 text-sm">
              Underlying parameters used in all revenue calculations.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900">
                  {["Parameter", "Value", "Notes"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  {
                    param: "Base salary (first month)",
                    value: "MXN 15,000",
                    note: "Entry-level talent in Mexico — staffing commission basis",
                  },
                  {
                    param: "Commission — Básico",
                    value: "8%",
                    note: "MXN 1,200 per successful hire",
                  },
                  {
                    param: "Commission — Pro",
                    value: "12%",
                    note: "MXN 1,800 per successful hire",
                  },
                  {
                    param: "Commission — Enterprise",
                    value: "18%",
                    note: "MXN 2,700 per successful hire",
                  },
                  {
                    param: "Conversion rate baseline",
                    value: "20%",
                    note: "Candidates contacted → hired; adjust per segment",
                  },
                  {
                    param: "Conservative multiplier",
                    value: "×0.6",
                    note: "Slower adoption, high churn, lower match quality",
                  },
                  {
                    param: "Expected multiplier",
                    value: "×1.0",
                    note: "Baseline projection — no adjustments applied",
                  },
                  {
                    param: "Aggressive multiplier",
                    value: "×1.4",
                    note: "Strong university partnerships, viral student adoption",
                  },
                  {
                    param: "Target market size",
                    value: "4.1M SMEs",
                    note: "INEGI 2023 — Mexico SME census",
                  },
                ].map(({ param, value, note }) => (
                  <tr key={param} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-300 whitespace-nowrap">
                      {param}
                    </td>
                    <td className="px-5 py-3.5 font-bold text-amber-400 whitespace-nowrap">
                      {value}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Saved Scenarios */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Saved Scenarios</h2>
              <p className="text-slate-400 text-sm">Last 5 configurations saved to Supabase.</p>
            </div>
            <button
              onClick={loadScenarios}
              disabled={loadingScenarios}
              className="text-xs font-semibold text-slate-400 hover:text-white transition-colors disabled:opacity-50"
            >
              {loadingScenarios ? "Loading…" : "↻ Refresh"}
            </button>
          </div>

          {loadingScenarios ? (
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center text-slate-500 text-sm">
              Loading saved scenarios…
            </div>
          ) : savedScenarios.length === 0 ? (
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center text-slate-500 text-sm">
              No scenarios saved yet. Configure the calculator above and click &quot;Save Scenario&quot;.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-700">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-900">
                    {["Segment", "Tier", "Scenario", "Hires/mo", "Commission", "Monthly Rev", "Annual Rev"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {savedScenarios.map((sc, i) => (
                    <tr
                      key={sc.id ?? i}
                      className="hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-medium text-slate-300 whitespace-nowrap">
                        {sc.segment}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                        {sc.tier}
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            sc.scenario === "Conservative"
                              ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              : sc.scenario === "Aggressive"
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                          }`}
                        >
                          {sc.scenario}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-400">
                        {sc.monthly_hires}
                      </td>
                      <td className="px-4 py-3.5 text-amber-400 font-semibold">
                        {sc.commission_pct}%
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-white whitespace-nowrap">
                        {formatMXN(sc.monthly_revenue)}
                      </td>
                      <td className="px-4 py-3.5 font-semibold text-white whitespace-nowrap">
                        {formatMXN(sc.annual_revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
