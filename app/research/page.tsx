"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// ── Data ──────────────────────────────────────────────────────────────────────

const BENCHMARKS = [
  {
    flag: "🇺🇸",
    name: "Handshake",
    country: "USA",
    tag: "Student-first platform",
    description:
      "Dominates US campus recruiting. University partnerships are the core distribution moat. 10M+ students, 650K+ employers.",
  },
  {
    flag: "🇬🇧",
    name: "Milkround",
    country: "UK",
    tag: "Graduate career portal",
    description:
      "UK's leading graduate job board. Strong brand trust with universities. Monetizes via employer listings and premium student subscriptions.",
  },
  {
    flag: "🇧🇷",
    name: "Vagas.com",
    country: "Brazil",
    tag: "SME-friendly marketplace",
    description:
      "Largest job platform in Brazil with 30M+ monthly users. Proven that SMEs in LATAM will pay for qualified candidates. Strong mobile penetration.",
  },
  {
    flag: "🇮🇳",
    name: "Internshala",
    country: "India",
    tag: "Internship leader",
    description:
      "50M+ students. Internship-first model proved the wedge before expanding to jobs. Skills courses as upsell. Closest analog to TalentBridge MX.",
  },
  {
    flag: "🇩🇪",
    name: "Absolventa",
    country: "Germany",
    tag: "Young professionals niche",
    description:
      "Targets graduates and early-career professionals. Tight niche positioning drives high intent matching and premium employer willingness-to-pay.",
  },
];

const LOCALIZATION_TRANSFERS = [
  "University partnership model as primary student distribution channel",
  "Freemium for students / subscription for employers pricing architecture",
  "Skills-based matching over credential-only screening",
  "Mobile-first UX — smartphone is the primary access device",
  "AI-powered candidate ranking to reduce SME screening time",
];

const LOCALIZATION_DOES_NOT_TRANSFER = [
  "US-style background check infrastructure — IMSS compliance required instead",
  "High employer trust in AI-sourced candidates — requires relationship-based trust-building in MX",
  "Credit card payment assumption — OXXO, SPEI, and CoDi integration are essential",
  "English-only interfaces — Spanish primary, regional slang awareness needed",
  "High-speed broadband assumption — must support 3G and patchy connectivity",
];

type Competitor = {
  name: string;
  type: string;
  targetUser: string;
  smeFocus: string;
  mxPresence: string;
  threat: "High" | "Medium" | "Low";
};

const COMPETITORS: Competitor[] = [
  {
    name: "LinkedIn",
    type: "Professional Network",
    targetUser: "All professionals",
    smeFocus: "Low",
    mxPresence: "High",
    threat: "High",
  },
  {
    name: "OCC Mundial",
    type: "Job Board",
    targetUser: "Experienced workers",
    smeFocus: "Medium",
    mxPresence: "Very High",
    threat: "High",
  },
  {
    name: "Indeed MX",
    type: "Aggregator",
    targetUser: "All job seekers",
    smeFocus: "Medium",
    mxPresence: "High",
    threat: "High",
  },
  {
    name: "Computrabajo",
    type: "Job Board",
    targetUser: "Blue/white collar",
    smeFocus: "Medium",
    mxPresence: "High",
    threat: "Medium",
  },
  {
    name: "Glassdoor",
    type: "Reviews + Jobs",
    targetUser: "Professionals",
    smeFocus: "Low",
    mxPresence: "Medium",
    threat: "Medium",
  },
  {
    name: "WhatsApp Groups",
    type: "Informal Network",
    targetUser: "Students & workers",
    smeFocus: "High",
    mxPresence: "Very High",
    threat: "Medium",
  },
  {
    name: "University Boards",
    type: "Bulletin Board",
    targetUser: "Students",
    smeFocus: "Low",
    mxPresence: "High",
    threat: "Low",
  },
  {
    name: "Handshake",
    type: "Student Platform",
    targetUser: "University students",
    smeFocus: "Low",
    mxPresence: "Low",
    threat: "Low",
  },
];

type Risk = {
  level: "High" | "Medium" | "Low";
  title: string;
  description: string;
};

const RISKS: Risk[] = [
  {
    level: "High",
    title: "Student adoption friction",
    description:
      "Students default to informal channels — WhatsApp referrals and Facebook groups — because formal platforms feel bureaucratic or untrustworthy.",
  },
  {
    level: "High",
    title: "SME trust gap",
    description:
      "Small business owners are skeptical of AI-sourced candidates. Relationships and referrals dominate SME hiring culture in Mexico.",
  },
  {
    level: "Medium",
    title: "University procurement cycles",
    description:
      "Institutional partnerships at UNAM, Tec, or UDEM require committee approval and can take 6–18 months to close, delaying supply-side growth.",
  },
  {
    level: "Medium",
    title: "LFPDPPP data privacy compliance",
    description:
      "Mexico's data protection law requires explicit student consent for AI profiling and cross-border data flows, adding legal overhead.",
  },
  {
    level: "Low",
    title: "IMSS / labor law integration",
    description:
      "Formally compliant onboarding flows require IMSS employer registration data. Buildable, but adds engineering complexity in v1.",
  },
];

const OPPORTUNITIES = [
  "No student-first job platform exists in Mexico — the category is wide open",
  "4.1M Mexican SMEs have zero affordable HR tooling — a massive underserved buyer segment",
  "University career centers are distribution-ready and actively looking for placement partners",
  "AI can collapse 6-week hiring cycles to under 48 hours — defensible speed advantage",
  "Federal formalization agenda (IMSS coverage push) creates regulatory tailwind for formal placement",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const THREAT_COLORS: Record<string, string> = {
  High: "bg-red-500/20 text-red-400 border border-red-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Low: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
};

const RISK_DOT: Record<string, string> = {
  High: "bg-red-500",
  Medium: "bg-amber-400",
  Low: "bg-emerald-500",
};

const RISK_BORDER: Record<string, string> = {
  High: "border-red-500/30",
  Medium: "border-amber-500/30",
  Low: "border-emerald-500/30",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  // Intake form
  const [ventureIdea, setVentureIdea] = useState(
    "AI-powered platform connecting Mexican university students with jobs and internships at SMEs"
  );
  const [targetUser, setTargetUser] = useState(
    "Mexican university students aged 18–24 seeking first formal employment; SME owners with 5–100 employees"
  );
  const [marketContext, setMarketContext] = useState(
    "Mexico · EdTech + HRTech · 4.1M SMEs · 60%+ youth informal employment rate"
  );
  const [keyAssumption, setKeyAssumption] = useState(
    "University career centers will partner as primary distribution channels for student acquisition"
  );
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  // Table filter
  const [search, setSearch] = useState("");
  const [threatFilter, setThreatFilter] = useState("All");

  // Save
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  function handleRunAgent() {
    if (!ventureIdea.trim()) return;
    setRunning(true);
    setSaved(false);
    setTimeout(() => {
      setRunning(false);
      setHasRun(true);
    }, 1600);
  }

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase.from("research_outputs").insert({
      venture_idea: ventureIdea,
      target_user: targetUser,
      market: marketContext,
      assumption: keyAssumption,
    });
    if (!error) setSaved(true);
    setSaving(false);
  }

  const filtered = COMPETITORS.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      c.name.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q) ||
      c.targetUser.toLowerCase().includes(q);
    const matchThreat = threatFilter === "All" || c.threat === threatFilter;
    return matchSearch && matchThreat;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-20">

        {/* ── Hero ── */}
        <section className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-400">
            Week 2 — Research + Benchmarking
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Research &amp;{" "}
            <span className="text-emerald-400">Benchmarking</span> Agent
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Global benchmarks, competitive landscape analysis, risk mapping, and
            opportunity identification for{" "}
            <span className="text-white font-semibold">TalentBridge MX</span>.
          </p>
        </section>

        {/* ── Research Intake Form ── */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Research Intake</h2>
            <p className="text-slate-400 text-sm">
              Define the venture and context before running the agent.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Venture Idea
                </label>
                <textarea
                  value={ventureIdea}
                  onChange={(e) => setVentureIdea(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none transition"
                  placeholder="Describe your venture idea…"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Target User
                </label>
                <textarea
                  value={targetUser}
                  onChange={(e) => setTargetUser(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none transition"
                  placeholder="Who is this for?"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Market / Context
                </label>
                <input
                  type="text"
                  value={marketContext}
                  onChange={(e) => setMarketContext(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  placeholder="Geography, industry, market size…"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Key Assumption
                </label>
                <input
                  type="text"
                  value={keyAssumption}
                  onChange={(e) => setKeyAssumption(e.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                  placeholder="What must be true for this to work?"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-1">
              <button
                onClick={handleRunAgent}
                disabled={!ventureIdea.trim() || running}
                className="rounded-full bg-emerald-600 px-7 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {running ? "Running Agent…" : "Run Research Agent"}
              </button>
              {running && (
                <span className="text-sm text-slate-400 animate-pulse">
                  Analyzing global benchmarks and competitive landscape…
                </span>
              )}
              {hasRun && !running && (
                <span className="text-sm text-emerald-400 font-medium">
                  ✓ Research complete
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ── Global Benchmarks ── */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Global Benchmarks</h2>
            <p className="text-slate-400 text-sm">
              Five comparable platforms worldwide — what they built and what we
              can learn.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BENCHMARKS.map((b) => (
              <div
                key={b.name}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-5 space-y-3 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{b.flag}</span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                    {b.tag}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-white text-base">{b.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{b.country}</p>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Mexico Localization ── */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">🇲🇽 Mexico Localization</h2>
            <p className="text-slate-400 text-sm">
              What carries over from global models — and what requires a
              Mexico-specific rebuild.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
              <h3 className="font-bold text-emerald-400 flex items-center gap-2">
                <span className="text-lg">✓</span> What Transfers
              </h3>
              <ul className="space-y-3">
                {LOCALIZATION_TRANSFERS.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-emerald-500 mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6 space-y-4">
              <h3 className="font-bold text-red-400 flex items-center gap-2">
                <span className="text-lg">✗</span> What Does NOT Transfer
              </h3>
              <ul className="space-y-3">
                {LOCALIZATION_DOES_NOT_TRANSFER.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-red-500 mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Competitor Table ── */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Competitive Landscape</h2>
            <p className="text-slate-400 text-sm">
              Direct and indirect competitors in the Mexican talent market.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, type, or user…"
              className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
            <select
              value={threatFilter}
              onChange={(e) => setThreatFilter(e.target.value)}
              className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            >
              <option value="All">All threat levels</option>
              <option value="High">High threat</option>
              <option value="Medium">Medium threat</option>
              <option value="Low">Low threat</option>
            </select>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-900">
                  {["Name", "Type", "Target User", "SME Focus", "MX Presence", "Threat"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No competitors match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((c, i) => (
                    <tr
                      key={c.name}
                      className={`border-b border-slate-800 transition-colors hover:bg-slate-800/50 ${
                        i % 2 === 0 ? "bg-slate-900/50" : "bg-slate-950/50"
                      }`}
                    >
                      <td className="px-4 py-3.5 font-semibold text-white whitespace-nowrap">
                        {c.name}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                        {c.type}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400">{c.targetUser}</td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                        {c.smeFocus}
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                        {c.mxPresence}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            THREAT_COLORS[c.threat]
                          }`}
                        >
                          {c.threat}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {search || threatFilter !== "All" ? (
            <p className="text-xs text-slate-500 text-right">
              Showing {filtered.length} of {COMPETITORS.length} competitors
            </p>
          ) : null}
        </section>

        {/* ── Risk Map ── */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Risk Map</h2>
            <p className="text-slate-400 text-sm">
              Key execution and market risks for TalentBridge MX.
            </p>
          </div>

          <div className="space-y-3">
            {RISKS.map((r) => (
              <div
                key={r.title}
                className={`rounded-2xl border ${RISK_BORDER[r.level]} bg-slate-900 p-5 flex gap-4`}
              >
                <div className="mt-1 shrink-0">
                  <span
                    className={`block h-3 w-3 rounded-full ${RISK_DOT[r.level]} shadow-lg`}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-semibold text-white">{r.title}</p>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${THREAT_COLORS[r.level]}`}
                    >
                      {r.level}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {r.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Opportunity Gap ── */}
        <section className="space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Opportunity Gap</h2>
            <p className="text-slate-400 text-sm">
              Where the market is wide open for TalentBridge MX to win.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 space-y-4">
            {OPPORTUNITIES.map((opp, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold">
                  ✓
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">{opp}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Save ── */}
        <section className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <div>
            <p className="font-semibold text-white">Save Research Output</p>
            <p className="text-sm text-slate-400 mt-0.5">
              Persist this research session to Supabase for future reference.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`shrink-0 rounded-full px-7 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
              saved
                ? "bg-emerald-900/50 text-emerald-400 border border-emerald-500/30"
                : "bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50"
            }`}
          >
            {saved ? "Saved ✓" : saving ? "Saving…" : "Save Research Output"}
          </button>
        </section>
      </div>
    </div>
  );
}
