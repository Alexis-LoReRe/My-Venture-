export default function DocsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 space-y-16">

        {/* Header */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Week 6 — Final Integration
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Build <span className="text-indigo-400">Docs</span>
          </h1>
          <p className="text-slate-400 leading-relaxed">
            Prompt library, build log, and architecture notes for TalentBridge MX — a six-week AI venture built with Claude Code.
          </p>
        </section>

        {/* ── Prompt Library ── */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white">Prompt Library</h2>
            <p className="text-sm text-slate-500 mt-1">Key prompts used across all course modules.</p>
          </div>

          {/* Core Agent */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400">
              Module 1 — Core Agent
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Generate 10-Chapter Book Architecture</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;You are my disciplined AI-101 thinking partner. Help me create a 10-chapter book architecture around AI, emerging technology, and Mexican societal problems. Each chapter must include: title, problem, user, slice, technology, venture idea, who pays, impact, and risk. Ask me questions before recommending. I am the decision-maker.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Select Strongest Chapter Idea</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;Compare all 10 chapter ideas. Which one has the largest addressable problem, the most specific slice, the clearest AI leverage, and the most realistic path to a 6-week prototype? Give me a ranked comparison with reasoning. I will make the final decision.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Extract Generative Core</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;Take my selected venture TalentBridge MX and compress it into a Generative Core with 10 dimensions: problem, user, slice, technology, value, core principles, use cases, venture direction, business logic, impact, and risk.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Build the /core Page</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;Build a /core page for my Next.js project. It must include: a 10-chapter book architecture table, a selected venture section, a Generative Core display with 10 dimensions, a user intake form, a Generate Core button, a Save button that stores to Supabase table Core_Outputs with columns id, created_at, idea, and Output.&rdquo;
              </p>
            </div>
          </div>

          {/* Research Agent */}
          <div className="space-y-4 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
              Module 2 — Research Agent
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Competitive Landscape Analysis</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;[Placeholder] Research the competitive landscape for a student-to-SME job matching platform in Mexico. Identify direct competitors, analogous platforms in other markets, and key differentiators. Evaluate each by SME focus, Mexico presence, and threat level. Return as a structured table.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Market Assumptions Validator</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;[Placeholder] Given the venture idea TalentBridge MX, what are the three most important assumptions that must be true for this to work? For each, suggest a quick validation experiment that could be run in under one week with no budget.&rdquo;
              </p>
            </div>
          </div>

          {/* Pricing Logic */}
          <div className="space-y-4 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Module 3 — Pricing Logic
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Revenue Model Design</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;[Placeholder] Build a commission-based revenue model for TalentBridge MX. Include three pricing tiers (Básico, Pro, Enterprise) with commission percentages ranging from 8–18% of first-month salary. Model monthly and annual revenue across Conservative, Expected, and Aggressive growth scenarios. Base salary assumption: MXN 15,000.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Build the /pricing Page</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;[Placeholder] Build a /pricing page with a live revenue calculator. Inputs: customer segment, tier, monthly hires, commission %, conversion rate, growth scenario. Outputs: monthly revenue, annual revenue, revenue per hire, reach needed. Auto-fill commission when tier changes. Save configurations to Supabase table pricing_scenarios.&rdquo;
              </p>
            </div>
          </div>

          {/* Marketing Engine */}
          <div className="space-y-4 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-pink-400">
              Module 4 — Marketing Engine
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Full Campaign Generation</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;[Placeholder] Generate a complete marketing campaign for TalentBridge MX. Output: brand name and tagline, target persona story, value promise, landing page copy (headline, subheadline, body), 10 social posts, 3 video scripts, a 14-day content calendar, 8 visual prompts, and an A/B test pair. Tone: Professional/Trustworthy.&rdquo;
              </p>
            </div>
          </div>

          {/* Chat Assistant */}
          <div className="space-y-4 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
              Module 5 — Chat Assistant
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Guided Intake Assistant Design</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;[Placeholder] Build a guided chat assistant for TalentBridge MX that walks users through 3 intake questions (field of study, opportunity type, has a profile) then generates a personalized next-step recommendation. Include a guardrail that detects complaint/dispute keywords and redirects to human support. Log all interactions to Supabase chat_logs table with feedback collection.&rdquo;
              </p>
            </div>
          </div>

          {/* Debugging */}
          <div className="space-y-4 pt-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Debugging
            </p>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Debug Supabase Save Error</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;My save button shows Saved ✓ but nothing appears in Supabase. The console shows 400 errors on Core_Outputs. My table has columns: id, created_at, idea, Output. My code uses lowercase &apos;output&apos;. Help me find and fix the mismatch.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-2">
              <p className="text-sm font-semibold text-white">Fix Supabase API Key Error</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                &ldquo;[Placeholder] My Supabase client is throwing &ldquo;Invalid API key&rdquo; in production but works locally. Walk me through verifying that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correctly set as environment variables in my Vercel deployment, and how to confirm they&apos;re being picked up at build time.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ── Build Log ── */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white">Build Log</h2>
            <p className="text-sm text-slate-500 mt-1">Week-by-week timeline of the TalentBridge MX build.</p>
          </div>

          <div className="relative space-y-0">
            {[
              {
                week: 'Week 1',
                label: 'Core Agent',
                description: 'Built the /core page with Generative Core generator, 10-chapter book architecture, and Supabase save to Core_Outputs.',
                status: 'done',
              },
              {
                week: 'Week 2',
                label: 'Research Agent',
                description: 'Built the /research page with competitive landscape table, risk analysis, market opportunities, and Supabase save to research_outputs.',
                status: 'done',
              },
              {
                week: 'Week 3',
                label: 'Product & Pricing',
                description: 'Built the /product page and /pricing revenue simulator with scenario modeling and Supabase save to pricing_scenarios.',
                status: 'done',
              },
              {
                week: 'Week 4',
                label: 'Marketing Engine',
                description: 'Built the /marketing page generating full campaigns: social posts, video scripts, 14-day calendar, visual prompts, A/B tests, saved to marketing_outputs.',
                status: 'done',
              },
              {
                week: 'Week 5',
                label: 'Chat Assistant',
                description: 'Built the /chat page with guided intake assistant, guardrail detection, feedback collection, and logging to chat_logs.',
                status: 'done',
              },
              {
                week: 'Week 6',
                label: 'Final Integration',
                description: 'Built /dashboard (live data from all 5 tables), /docs (this page), and /demo — tying the full venture system together.',
                status: 'done',
              },
            ].map((item, i, arr) => (
              <div key={item.week} className="flex gap-5">
                {/* Timeline spine */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 mt-1.5 shrink-0 ring-4 ring-indigo-500/20" />
                  {i < arr.length - 1 && (
                    <div className="w-px flex-1 bg-slate-800 mt-1" />
                  )}
                </div>
                <div className="pb-8 space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">{item.week}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-sm font-bold text-white">{item.label}</span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                      ✓ Complete
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Architecture Notes ── */}
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-white">Architecture Notes</h2>
            <p className="text-sm text-slate-500 mt-1">How the modules connect. Fill in with your own observations.</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Stack</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                [Placeholder] Next.js 16 App Router · React 19 · Tailwind CSS v4 · Supabase (PostgreSQL) · Deployed on Vercel. All AI logic runs client-side as deterministic template generation — no external LLM API calls in the current build.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Data Flow</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                [Placeholder] Each module page is a standalone client component that generates output locally and writes to its own Supabase table on save. The /dashboard page is the only page that reads across all tables simultaneously using parallel Supabase queries. There is no server-side rendering for data — all Supabase calls use the browser client with the public anon key.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Module Connections</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                [Placeholder] The Generative Core from /core is the conceptual seed for all downstream modules — the problem, user, and value proposition defined there inform the research hypotheses, pricing model, marketing tone, and chat assistant logic. In the current build this connection is conceptual; a future version would pass the saved Core Output as context into each subsequent module.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Key Design Decisions</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                I chose a client-side guardrail check over a live AI API call for /chat because it needed to work reliably and instantly without depending on API billing being resolved. I structured the chat intake as fixed button choices instead of free typing for the first 3 questions because it keeps the data structured and easy to save to Supabase, while still allowing a free-text box for anything unstructured. I reused the same Supabase client across every module instead of creating a new one per page, which also meant a bug fixed in Week 4 stayed fixed for every module after it.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">What I Would Build Next</p>
              <p className="text-sm text-slate-300 leading-relaxed">
                In a Version 2, I'd connect the real Anthropic API now that billing is resolved, so /core, /research, /marketing, and /chat generate live AI output instead of simulated templates. I'd also add a real student authentication and profile system, since right now there's no persistent user account connecting someone's chat session to their actual profile or saved matches. Finally, I'd add response variation to the chat assistant so repeat testers don't see identical wording, based on real user testing feedback.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
