import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          AI-Powered Talent Marketplace · Mexico
        </div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl leading-tight">
          Connecting Mexico&apos;s{" "}
          <span className="text-indigo-400">Future Talent</span>{" "}
          with Growing Businesses
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-400 leading-relaxed">
          TalentBridge MX matches verified university students with SMEs across
          Mexico — eliminating the friction of informal hiring and giving
          students their first real career opportunity.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/product"
            className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Connect With Top Talent →
          </Link>
          <Link
            href="/research"
            className="rounded-full border border-slate-600 px-8 py-3.5 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
          >
            View Market Research
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "4.1M", label: "SMEs in Mexico" },
            { value: "3.5M", label: "University students" },
            { value: "48h", label: "Match-to-interview" },
            { value: "60%+", label: "Youth in informal work" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-700 bg-slate-900 p-5 text-center space-y-1"
            >
              <p className="text-3xl font-bold text-indigo-400">{value}</p>
              <p className="text-xs text-slate-400 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="mx-auto max-w-5xl px-6 pb-20 space-y-6">
        <h2 className="text-2xl font-bold text-center">Why TalentBridge MX?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-900 p-6 space-y-3">
            <span className="text-3xl">🤖</span>
            <h3 className="font-bold text-indigo-400">AI-Powered Matching</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our engine analyzes 200+ skill dimensions to surface the right
              candidates in hours, not weeks.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-6 space-y-3">
            <span className="text-3xl">✅</span>
            <h3 className="font-bold text-emerald-400">Verified Credentials</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every student profile is validated by their university — CURP
              verification and LFPDPPP-compliant data handling.
            </p>
          </div>
          <div className="rounded-2xl border border-violet-500/30 bg-slate-900 p-6 space-y-3">
            <span className="text-3xl">💰</span>
            <h3 className="font-bold text-violet-400">Pay on Results</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              SMEs pay only when they successfully hire. No subscriptions, no
              upfront fees — pure incentive alignment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-10 text-center space-y-5">
          <h2 className="text-3xl font-bold">Ready to Bridge the Gap?</h2>
          <p className="text-slate-400 mx-auto max-w-xl">
            Whether you&apos;re a student seeking your first role or an SME ready to
            grow your team, TalentBridge MX is built for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/product"
              className="rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Explore the Platform →
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
