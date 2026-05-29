import CoreForm from "./CoreForm";

const BOOK_CHAPTERS = [
  {
    chapter: 1,
    title: "The Employment Gap",
    problem: "Youth unemployment — over 60% of graduates enter informal work",
    aiSolution: "AI-powered job matching between students and SMEs",
    venture: "TalentBridge MX",
  },
  {
    chapter: 2,
    title: "The SME Talent Crisis",
    problem: "SMEs can't afford HR departments or recruitment agencies",
    aiSolution: "Automated talent screening and candidate ranking",
    venture: "TalentBridge MX",
  },
  {
    chapter: 3,
    title: "The Skills Mismatch",
    problem: "University degrees don't align with real market demand",
    aiSolution: "Skills gap analysis and AI-recommended upskilling paths",
    venture: "SkillMap MX",
  },
  {
    chapter: 4,
    title: "The Rural Divide",
    problem: "Rural communities lack access to economic opportunities",
    aiSolution: "Remote-work matching and digital onboarding for rural talent",
    venture: "CampoTech",
  },
  {
    chapter: 5,
    title: "The Healthcare Access Gap",
    problem: "Millions of Mexicans can't reach basic healthcare in time",
    aiSolution: "AI triage via WhatsApp/SMS routing to nearest care",
    venture: "SaludBot MX",
  },
  {
    chapter: 6,
    title: "The Financial Exclusion",
    problem: "60%+ of Mexicans are unbanked; informal workers have no credit history",
    aiSolution: "Alternative credit scoring using behavioral and transactional data",
    venture: "CréditoJusto",
  },
  {
    chapter: 7,
    title: "The Invisible Artisan",
    problem: "Mexican artisans can't access urban or global markets",
    aiSolution: "AI product discovery and cross-border marketplace matching",
    venture: "Artesanía Digital",
  },
  {
    chapter: 8,
    title: "The Education Quality Gap",
    problem: "Public school students get no personalized attention",
    aiSolution: "Adaptive AI tutoring aligned to SEP curriculum",
    venture: "TutorMX",
  },
  {
    chapter: 9,
    title: "The Food Supply Chain",
    problem: "Food waste and inefficiency from farm to urban table",
    aiSolution: "Demand forecasting and logistics optimization for small producers",
    venture: "AgriLink MX",
  },
  {
    chapter: 10,
    title: "The Public Safety Trust Deficit",
    problem: "Citizens distrust institutions; reporting crime feels futile",
    aiSolution: "Anonymous AI-powered incident reporting with pattern analysis for authorities",
    venture: "SeguroMX",
  },
];

const CORE_FIELDS = [
  {
    label: "Problem",
    content:
      "Mexican university students lack structured access to entry-level jobs and internships at SMEs, while small businesses lack affordable talent acquisition infrastructure. Over 60% of young graduates enter the informal economy — not because they lack skills, but because the matching infrastructure doesn't exist.",
  },
  {
    label: "User",
    content:
      "Primary: Mexican university students aged 18–24 seeking their first formal employment. Secondary: SME owners and managers at businesses with 5–100 employees who need talent but can't afford recruiters or HR software.",
  },
  {
    label: "Slice",
    content:
      "AI-powered job and internship matching between Mexican university students and vetted small businesses — focused exclusively on the first-time formal employment moment.",
  },
  {
    label: "Technology",
    content:
      "LLM-based bilingual profile builder, skills extraction from CVs and transcripts, semantic matching engine, automated Spanish/English outreach, and a lightweight applicant tracking system for SMEs.",
  },
  {
    label: "Value",
    content:
      "Students land their first formal job in days, not months. SMEs fill roles without a recruiter. Both sides get a trusted, AI-verified intermediary that reduces hiring friction from weeks to hours.",
  },
  {
    label: "Business Logic",
    content:
      "Freemium for students (free matching; premium for interview prep + salary benchmarks). SME subscription: MXN $799/month for 3 active roles, $1,999/month unlimited. Revenue share from partnered bootcamps and upskilling providers.",
  },
  {
    label: "Impact",
    content:
      "10,000 students placed in formal employment in Year 1. Reduce informal youth employment rate at partner universities by 15%. 500 SMEs with structured hiring pipelines. Long-term goal: make first formal employment the default outcome for Mexican university graduates.",
  },
  {
    label: "Risk",
    content:
      "Adoption friction from students unfamiliar with formal platforms. Trust gap: SMEs skeptical of AI-sourced candidates. Mitigation: university career center partnerships as distribution channels. Regulatory: IMSS and labor law compliance built-in from day one.",
  },
];

const CORE_LISTS = [
  {
    label: "Core Principles",
    items: [
      "Mobile-first — most Mexican students access the internet via phone",
      "Bilingual by default — Spanish primary, English for global-ready roles",
      "Trust through transparency — verified profiles, honest job descriptions",
      "Inclusive design — accessible to first-generation university students",
      "Privacy-first — students own their data and can delete at any time",
    ],
  },
  {
    label: "Use Cases",
    items: [
      "Student uploads CV → AI extracts skills → ranked job matches in 60 seconds",
      "SME posts a role → AI screens applicants → top 5 candidates delivered daily",
      "Student applies → auto-generated cover letter in their voice → one-click send",
      "Student gets rejected → AI suggests 3 upskilling paths to qualify next time",
      "SME hires → platform triggers automated onboarding checklist",
    ],
  },
];

export default function CorePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 space-y-24">
      {/* ── Hero ── */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          Week 1 — Generative Core
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          TalentBridge{" "}
          <span className="text-indigo-600 dark:text-indigo-400">MX</span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-500 dark:text-gray-400">
          An AI-powered platform that connects Mexican university students with
          jobs and internships at small businesses — turning informal pathways
          into formal careers.
        </p>
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-8 text-left grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { stat: "60%+", label: "of Mexican graduates enter informal work" },
            { stat: "4.1M", label: "SMEs in Mexico with no HR infrastructure" },
            {
              stat: "< 48h",
              label: "target time from application to first interview",
            },
          ].map(({ stat, label }) => (
            <div key={stat} className="text-center">
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {stat}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Book Architecture ── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            10-Chapter Book Architecture
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Ten Mexican societal problems, ten AI-powered venture opportunities.
          </p>
        </div>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400 w-8">
                  #
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                  Chapter
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                  Mexican Problem
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                  AI Solution
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-500 dark:text-gray-400">
                  Venture
                </th>
              </tr>
            </thead>
            <tbody>
              {BOOK_CHAPTERS.map(
                ({ chapter, title, problem, aiSolution, venture }, i) => (
                  <tr
                    key={chapter}
                    className={`border-b border-gray-100 dark:border-gray-800 ${
                      venture === "TalentBridge MX"
                        ? "bg-indigo-50 dark:bg-indigo-950/30"
                        : i % 2 === 0
                        ? "bg-white dark:bg-gray-950"
                        : "bg-gray-50/50 dark:bg-gray-900/50"
                    }`}
                  >
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-400 dark:text-gray-500">
                      {String(chapter).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                      {title}
                      {venture === "TalentBridge MX" && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                          selected
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-400">
                      {problem}
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-400">
                      {aiSolution}
                    </td>
                    <td className="px-4 py-3.5 text-gray-500 dark:text-gray-500 whitespace-nowrap text-xs font-mono">
                      {venture}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Selected Venture ── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Why TalentBridge MX?
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            How and why this venture was selected from the 10-chapter landscape.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Largest addressable problem",
              body: "Youth informal employment is Mexico's most pervasive economic failure. Every other chapter is downstream — if people can't get formal work, they can't access credit, healthcare benefits, or professional networks.",
            },
            {
              title: "Both sides have acute pain",
              body: "Unlike most two-sided markets, both students and SMEs actively feel the problem today. Students spend months sending CVs into silence. SMEs make bad hires because they have no tools to evaluate candidates.",
            },
            {
              title: "AI has decisive leverage",
              body: "Matching, screening, profile building, and outreach are all language tasks. LLMs can do in seconds what a recruiter takes days to do — and do it bilingually, at scale, for a fraction of the cost.",
            },
            {
              title: "University distribution is built-in",
              body: "University career centers are an underused distribution channel. A single partnership with UNAM or Tec de Monterrey unlocks hundreds of thousands of warm users — students who are already in job-search mode.",
            },
            {
              title: "Clear, fast path to revenue",
              body: "SMEs will pay for qualified candidates. The freemium model for students drives supply; the subscription model for SMEs drives revenue. No chicken-and-egg problem because the university partnership seeds the supply side first.",
            },
            {
              title: "Regulatory tailwinds",
              body: "The Mexican government has been pushing formalization of youth employment. Any platform that demonstrably converts informal workers to formal IMSS-registered employees aligns with federal priorities and opens doors to public procurement.",
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Generative Core ── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Generative Core
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            The structured foundation of TalentBridge MX across all 10
            dimensions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CORE_FIELDS.map(({ label, content }) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                {label}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {content}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CORE_LISTS.map(({ label, items }) => (
            <div
              key={label}
              className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">
                {label}
              </p>
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-indigo-400 mt-0.5 shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interactive Form ── */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Generate Your Venture Core
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your own venture idea and get a structured generative core
            output across all 10 dimensions.
          </p>
        </div>
        <CoreForm />
      </section>
    </div>
  );
}
