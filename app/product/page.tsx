import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product — TalentBridge MX",
  description: "Platform architecture, features, and pricing tiers for TalentBridge MX.",
};

const FEATURES = [
  {
    icon: "🤖",
    title: "AI Skill Matching",
    color: "indigo",
    tagline: "48-hour match-to-interview pipeline",
    details: [
      "NLP matching across 200+ skill categories",
      "Bias-reduced algorithmic screening",
      "Real-time candidate ranking for SMEs",
      "Skills gap analysis per job listing",
      "Auto-suggested roles based on student profile",
    ],
  },
  {
    icon: "✅",
    title: "Verified Profiles",
    color: "emerald",
    tagline: "Trust infrastructure for the Mexican talent market",
    details: [
      "University-verified academic credentials",
      "CURP identity validation layer",
      "Skills assessments and micro-certifications",
      "LFPDPPP-compliant data handling",
      "Employer trust score per candidate",
    ],
  },
  {
    icon: "📊",
    title: "Smart Analytics",
    color: "violet",
    tagline: "Data-driven hiring for SMEs and institutions",
    details: [
      "Real-time hiring funnel dashboards",
      "University placement rate tracking",
      "Industry-level skills gap reports",
      "AI-powered salary benchmarking (MXN)",
      "Cohort success analytics for universities",
    ],
  },
];

const TIERS = [
  {
    name: "Básico",
    price: "MXN 0",
    commission: "8% per hire",
    color: "slate",
    badge: "Free to Start",
    features: [
      "Up to 5 active job listings",
      "Basic AI candidate matching",
      "Standard candidate profiles",
      "Email support",
      "Hiring analytics (30-day window)",
    ],
  },
  {
    name: "Pro",
    price: "MXN 999/mo",
    commission: "12% per hire",
    color: "indigo",
    badge: "Most Popular",
    features: [
      "Unlimited job listings",
      "Priority AI matching queue",
      "Pre-screened candidate shortlists",
      "Dedicated account manager",
      "Full analytics dashboard",
      "University partner access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    commission: "18% per hire",
    color: "violet",
    badge: "Institutional",
    features: [
      "Bulk university partnerships",
      "White-label branding option",
      "API integration & webhooks",
      "SLA guarantee (99.9% uptime)",
      "Custom compliance reporting",
      "Dedicated integration engineer",
    ],
  },
];

const SEGMENTS = [
  {
    icon: "🎓",
    title: "University Students",
    subtitle: "Free access",
    color: "emerald",
    description:
      "Mexican university students aged 18–24 seeking their first formal employment or internship. Zero cost, zero friction.",
    perks: [
      "AI-powered job & internship discovery",
      "University-verified profile badge",
      "Career path recommendations",
      "Skills assessment library",
      "Mobile-first experience (3G optimized)",
    ],
    price: "MXN 0 — always free",
  },
  {
    icon: "🏢",
    title: "SMEs",
    subtitle: "Pay per hire",
    color: "indigo",
    description:
      "Small and medium enterprises with 5–100 employees. No monthly fee — you only pay when you hire a verified candidate.",
    perks: [
      "Post unlimited job listings",
      "Pre-screened candidate queue",
      "Commission-only model (no upfront cost)",
      "IMSS-ready onboarding flow",
      "CoDi / OXXO / SPEI payment options",
    ],
    price: "8–18% commission per successful hire",
  },
  {
    icon: "🏛️",
    title: "Universities",
    subtitle: "Institutional",
    color: "violet",
    description:
      "Career centers and academic institutions seeking to improve placement rates and demonstrate graduate employability.",
    perks: [
      "Placement rate dashboard",
      "Bulk student cohort onboarding",
      "Partnership branding & co-marketing",
      "Industry employer network access",
      "Annual impact report generation",
    ],
    price: "Custom institutional licensing",
  },
];

const FEATURE_COLORS: Record<string, { border: string; bg: string; text: string; tag: string }> = {
  indigo: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    tag: "bg-indigo-500/20 border border-indigo-500/30 text-indigo-400",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    tag: "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400",
  },
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    tag: "bg-violet-500/20 border border-violet-500/30 text-violet-400",
  },
  slate: {
    border: "border-slate-600/50",
    bg: "bg-slate-800",
    text: "text-slate-300",
    tag: "bg-slate-700 border border-slate-600 text-slate-300",
  },
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-24">

        {/* Hero */}
        <section className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Week 3 — Product Architecture
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            TalentBridge MX —{" "}
            <span className="text-indigo-400">Product Architecture</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            An AI-powered platform connecting Mexican university students with
            SMEs — built on verified trust, intelligent matching, and a
            commission model that aligns incentives.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              href="/pricing"
              className="rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Revenue Simulator →
            </Link>
            <Link
              href="/research"
              className="rounded-full border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
            >
              Market Research
            </Link>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "4.1M", label: "SMEs in Mexico" },
            { value: "60%+", label: "Youth informal employment" },
            { value: "48h", label: "Match-to-interview target" },
            { value: "3", label: "Revenue streams" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-5 text-center space-y-1"
            >
              <p className="text-3xl font-bold text-indigo-400">{value}</p>
              <p className="text-xs text-slate-400 font-medium">{label}</p>
            </div>
          ))}
        </section>

        {/* Feature Map */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Core Platform Features</h2>
            <p className="text-slate-400 text-sm">
              Three technical pillars that create defensible value for every side of the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {FEATURES.map((f) => {
              const c = FEATURE_COLORS[f.color];
              return (
                <div
                  key={f.title}
                  className={`rounded-2xl border ${c.border} bg-slate-900 p-6 space-y-4 hover:${c.bg} transition-colors`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-3xl">{f.icon}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.tag}`}>
                      Core
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${c.text}`}>{f.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{f.tagline}</p>
                  </div>
                  <ul className="space-y-2">
                    {f.details.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-slate-400">
                        <span className={`${c.text} mt-0.5 shrink-0`}>→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pricing Tiers */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Pricing Tiers</h2>
            <p className="text-slate-400 text-sm">
              Commission-first model — SMEs pay only when they successfully hire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TIERS.map((t) => {
              const c = FEATURE_COLORS[t.color];
              const isPopular = t.name === "Pro";
              return (
                <div
                  key={t.name}
                  className={`rounded-2xl border ${isPopular ? "border-indigo-500/60" : c.border} bg-slate-900 p-6 space-y-5 relative ${isPopular ? "ring-1 ring-indigo-500/30" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-xl font-bold ${c.text}`}>{t.name}</h3>
                      {!isPopular && (
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.tag}`}>
                          {t.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-white mt-2">{t.price}</p>
                    <p className={`text-sm font-semibold ${c.text} mt-0.5`}>{t.commission}</p>
                  </div>

                  <ul className="space-y-2 border-t border-slate-800 pt-4">
                    {t.features.map((feat) => (
                      <li key={feat} className="flex gap-2 text-sm text-slate-400">
                        <span className={`${c.text} shrink-0 font-bold`}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/pricing"
                    className={`block text-center rounded-full py-2.5 text-sm font-semibold transition-colors ${
                      isPopular
                        ? "bg-indigo-600 text-white hover:bg-indigo-500"
                        : "border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white"
                    }`}
                  >
                    Simulate Revenue →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Customer Segments */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Customer Segments</h2>
            <p className="text-slate-400 text-sm">
              Three distinct buyer groups with aligned incentives across the talent marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SEGMENTS.map((s) => {
              const c = FEATURE_COLORS[s.color];
              return (
                <div
                  key={s.title}
                  className={`rounded-2xl border ${c.border} bg-slate-900 p-6 space-y-4`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{s.icon}</span>
                    <div>
                      <h3 className={`font-bold text-base ${c.text}`}>{s.title}</h3>
                      <span className={`text-xs font-semibold ${c.text}`}>{s.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">{s.description}</p>

                  <ul className="space-y-2">
                    {s.perks.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-slate-400">
                        <span className={`${c.text} mt-0.5 shrink-0`}>→</span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className={`rounded-xl ${c.bg} border ${c.border} px-4 py-2.5`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${c.text} mb-0.5`}>
                      Pricing
                    </p>
                    <p className="text-sm font-semibold text-white">{s.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Architecture Summary */}
        <section className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center">Platform Architecture Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                label: "Supply Side",
                value: "Students + Universities",
                note: "Free acquisition via institutional partnerships",
                color: "text-emerald-400",
              },
              {
                label: "Intelligence Layer",
                value: "AI Matching Engine",
                note: "Skills mapping, ranking, and gap analysis",
                color: "text-indigo-400",
              },
              {
                label: "Demand Side",
                value: "4.1M SMEs",
                note: "Commission model — pay only on successful hire",
                color: "text-violet-400",
              },
            ].map(({ label, value, note, color }) => (
              <div key={label} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {label}
                </p>
                <p className={`text-lg font-bold ${color}`}>{value}</p>
                <p className="text-xs text-slate-500">{note}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/pricing"
              className="inline-flex rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Model Revenue Scenarios →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
