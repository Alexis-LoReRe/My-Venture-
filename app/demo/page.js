import Link from 'next/link'

const PAGES = [
  {
    href: '/core',
    title: 'Core Agent',
    description: 'Define the venture — Generative Core, 10-chapter architecture, and saved outputs.',
    color: 'border-violet-500/30 hover:border-violet-500/60',
    badge: 'text-violet-400',
  },
  {
    href: '/research',
    title: 'Research Agent',
    description: 'Competitive landscape, market risks, key opportunities, and saved research records.',
    color: 'border-sky-500/30 hover:border-sky-500/60',
    badge: 'text-sky-400',
  },
  {
    href: '/product',
    title: 'Product',
    description: 'Platform features, student and SME value propositions, and integration overview.',
    color: 'border-indigo-500/30 hover:border-indigo-500/60',
    badge: 'text-indigo-400',
  },
  {
    href: '/pricing',
    title: 'Pricing',
    description: 'Live revenue simulator — model commission tiers and growth scenarios in real time.',
    color: 'border-amber-500/30 hover:border-amber-500/60',
    badge: 'text-amber-400',
  },
  {
    href: '/marketing',
    title: 'Marketing Engine',
    description: 'Generate full campaigns: social posts, video scripts, 14-day calendar, visual prompts.',
    color: 'border-pink-500/30 hover:border-pink-500/60',
    badge: 'text-pink-400',
  },
  {
    href: '/chat',
    title: 'Chat Assistant',
    description: 'Guided intake assistant with guardrail detection, feedback collection, and Supabase logging.',
    color: 'border-emerald-500/30 hover:border-emerald-500/60',
    badge: 'text-emerald-400',
  },
  {
    href: '/dashboard',
    title: 'Dashboard',
    description: 'Live data from all five Supabase tables — total activity across the entire venture system.',
    color: 'border-cyan-500/30 hover:border-cyan-500/60',
    badge: 'text-cyan-400',
  },
  {
    href: '/docs',
    title: 'Docs',
    description: 'Prompt library, build timeline, and architecture notes for the full six-week build.',
    color: 'border-slate-500/30 hover:border-slate-400/60',
    badge: 'text-slate-400',
  },
]

const FLOW_STEPS = [
  { label: 'Homepage', href: '/' },
  { label: 'Core Agent', href: '/core' },
  { label: 'Research', href: '/research' },
  { label: 'Product', href: '/product' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Marketing', href: '/marketing' },
  { label: 'Chat Assistant', href: '/chat' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Docs', href: '/docs' },
  { label: 'Demo', href: '/demo' },
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-20">

        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Week 6 — Final Demo
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl leading-tight">
            TalentBridge <span className="text-indigo-400">MX</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-400 leading-relaxed">
            An AI-powered platform connecting Mexican university students with SMEs for jobs and internships — built in six weeks as a fully integrated venture system.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/core"
              className="rounded-full bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Start with Core Agent →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-slate-600 px-8 py-3.5 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </section>

        {/* Agent Map */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Agent Map</h2>
            <p className="text-slate-500 text-sm">The full venture system — from idea to integrated platform.</p>
          </div>

          {/* Flow — horizontal scroll on mobile, wraps on larger screens */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-0">
              {FLOW_STEPS.map((step, i) => (
                <div key={step.href} className="flex items-center">
                  <Link
                    href={step.href}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold text-center transition-all whitespace-nowrap ${
                      step.href === '/demo'
                        ? 'bg-indigo-600 text-white'
                        : 'border border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-500/60 hover:bg-indigo-500/10 hover:text-indigo-300'
                    }`}
                  >
                    {step.label}
                  </Link>
                  {i < FLOW_STEPS.length - 1 && (
                    <span className="mx-1.5 text-slate-600 text-sm select-none">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Page Grid */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Explore Every Module</h2>
            <p className="text-slate-500 text-sm">Each page is a live, functional part of the venture system.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAGES.map((page) => (
              <div
                key={page.href}
                className={`group rounded-2xl border bg-slate-900 p-6 space-y-3 transition-all ${page.color}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className={`font-bold text-base ${page.badge}`}>{page.title}</h3>
                  <Link
                    href={page.href}
                    className="text-xs font-semibold text-slate-500 hover:text-white transition-colors"
                  >
                    Visit →
                  </Link>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{page.description}</p>
                <div>
                  <Link
                    href={page.href}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:border-slate-500 hover:text-white transition-all group-hover:border-slate-600"
                  >
                    Open {page.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing statement */}
        <section>
          <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-10 text-center space-y-5">
            <h2 className="text-2xl font-bold leading-snug">
              This is a live, connected AI-powered venture system,<br className="hidden sm:block" />
              not a set of disconnected pages.
            </h2>
            <p className="text-slate-400 mx-auto max-w-2xl leading-relaxed">
              Every module saves real data to Supabase. The dashboard reads it all back. The prompt library documents how it was built. Six weeks, six modules, one integrated platform — TalentBridge MX.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/dashboard"
                className="rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
              >
                View Live Dashboard →
              </Link>
              <Link
                href="/docs"
                className="rounded-full border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors"
              >
                Read the Docs
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
