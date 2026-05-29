"use client";

import { useState } from "react";

type GeneratedCore = {
  problem: string;
  user: string;
  slice: string;
  technology: string;
  value: string;
  corePrinciples: string[];
  useCases: string[];
  businessLogic: string;
  impact: string;
  risk: string;
};

const TALENTBRIDGE_CORE: GeneratedCore = {
  problem:
    "Mexican university students lack structured access to entry-level jobs and internships at SMEs, while small businesses lack affordable talent acquisition infrastructure. Result: ~60% of young graduates enter the informal economy.",
  user:
    "Primary — Mexican university students aged 18–24 seeking their first formal job or internship. Secondary — SME owners and HR managers at businesses with 5–100 employees who need talent but can't afford recruiters.",
  slice:
    "AI-powered job and internship matching between Mexican university students and vetted small businesses, focused on first-time formal employment.",
  technology:
    "LLM-based profile builder, skills extraction from CVs and transcripts, semantic matching engine, automated bilingual (ES/EN) outreach, and a lightweight applicant tracking system for SMEs.",
  value:
    "Students land their first formal job in days, not months. SMEs fill roles without a recruiter. Both sides get a trusted, AI-verified intermediary that reduces hiring friction from weeks to hours.",
  corePrinciples: [
    "Mobile-first — most Mexican students access the internet via phone",
    "Bilingual by default — Spanish primary, English for global-ready roles",
    "Trust through transparency — verified profiles, honest job descriptions",
    "Inclusive design — accessible to first-generation university students",
    "Privacy-first — students own their data and can delete at any time",
  ],
  useCases: [
    "Student uploads CV → AI extracts skills → ranked job matches surface in 60 seconds",
    "SME posts a role → AI screens applicants → top 5 candidates delivered daily",
    "Student applies → auto-generated cover letter in their voice → one-click send",
    "Student gets rejected → AI suggests 3 upskilling paths to qualify next time",
    "SME hires → platform triggers automated onboarding checklist",
  ],
  businessLogic:
    "Freemium for students (free matching, premium for interview prep + salary insights). SME subscription: MXN $799/month for up to 3 active roles, $1,999/month unlimited. Revenue share from partnered bootcamps and upskilling providers.",
  impact:
    "Target: 10,000 students placed in formal employment in Year 1, reducing informal youth employment rate in partner universities by 15%. SME side: 500 businesses with structured hiring pipelines. Long-term: formalize first employment as a norm across Mexico.",
  risk:
    "Adoption friction from students unfamiliar with formal job platforms. Trust gap: SMEs skeptical of AI-sourced candidates. Mitigation: university partnership pilots with career centers as distribution channels. Regulatory: IMSS and labor law compliance built-in from day one.",
};

function generateCoreFromIdea(idea: string): GeneratedCore {
  const lower = idea.toLowerCase();
  const isHealthcare = lower.includes("health") || lower.includes("salud") || lower.includes("medical");
  const isEducation = lower.includes("edu") || lower.includes("school") || lower.includes("learn");
  const isFinance = lower.includes("financ") || lower.includes("bank") || lower.includes("dinero") || lower.includes("pago");

  if (isHealthcare) {
    return {
      problem: "Millions of Mexicans lack timely access to basic healthcare, particularly in rural and peri-urban areas. The public system is overburdened and the private sector is unaffordable.",
      user: "Underserved patients in semi-urban Mexico (ages 25–55), and community health workers (promotores de salud) who act as first-line responders.",
      slice: "AI-powered health triage and telemedicine routing for underserved Mexican communities via WhatsApp and SMS.",
      technology: "Symptom-checker LLM, integration with IMSS appointment APIs, WhatsApp Business API, and a community health worker dashboard.",
      value: "Patients get the right care faster. Health workers get AI support to make better triage decisions. Fewer unnecessary ER visits.",
      corePrinciples: ["Accessible via basic smartphones", "Spanish and indigenous language support", "Privacy-compliant with LFPDPPP", "Human-in-the-loop for all diagnoses", "Zero cost to patients"],
      useCases: ["Patient texts symptoms → AI triages → books appointment or dispatches promotor", "Health worker gets AI-suggested protocol for top 20 common conditions", "Ministry of Health gets anonymized epidemiological dashboard"],
      businessLogic: "B2G contracts with state health ministries. Freemium for patients. Data analytics subscriptions for pharmaceutical partners.",
      impact: "Reduce preventable ER visits by 20% in pilot municipalities. Reach 50,000 patients in Year 1.",
      risk: "Regulatory approval from COFEPRIS. Liability for AI triage errors. Mitigation: human oversight layer and clear disclaimers.",
    };
  }

  if (isEducation) {
    return {
      problem: "Mexican students face a stark quality gap between public and private education. Teacher absenteeism and lack of personalized learning leave millions behind.",
      user: "Public school students ages 10–18 in Mexico City, Monterrey, and Guadalajara. Teachers with 30+ students per classroom.",
      slice: "AI tutoring assistant that adapts to each student's learning pace, delivered via tablet in public schools.",
      technology: "Adaptive learning LLM, curriculum-aligned content graph, teacher dashboard, offline-first PWA.",
      value: "Every student gets a patient, personalized tutor. Teachers get actionable insights on which students need intervention.",
      corePrinciples: ["Works offline — school internet is unreliable", "SEP curriculum-aligned", "Gamified to drive engagement", "Privacy-compliant for minors", "Teacher-augmenting, not replacing"],
      useCases: ["Student struggles with algebra → AI breaks it into micro-steps → adaptive practice", "Teacher sees 5 at-risk students flagged → gets suggested intervention activities", "Parent receives weekly progress report via WhatsApp"],
      businessLogic: "B2G: SEP and state government contracts. B2B: private school subscriptions. Hardware bundle with refurbished tablets.",
      impact: "Improve math and reading scores by 15% in pilot schools. Reduce teacher planning time by 30%.",
      risk: "SEP procurement cycles are slow (12–18 months). Mitigation: start with private schools to prove the product, use results to win government contracts.",
    };
  }

  if (isFinance) {
    return {
      problem: "Over 60% of Mexicans are unbanked or underbanked. Informal workers have no credit history and are excluded from formal financial products.",
      user: "Informal workers and micro-entrepreneurs ages 22–45 in Mexico, earning MXN $5,000–$15,000/month without formal employment contracts.",
      slice: "AI-powered alternative credit scoring and micro-loan origination for informal workers, using transactional and behavioral data.",
      technology: "Alternative data credit model (mobile payments, utility bills, marketplace sales), BNPL engine, CNBV-compliant KYC flow.",
      value: "First access to credit for workers invisible to traditional bureaus. Lenders get a reliable risk signal they couldn't compute before.",
      corePrinciples: ["CNBV and Banxico compliance from day one", "No predatory rates — APR capped at market benchmark", "Transparent terms in plain Spanish", "Data minimization", "Borrower education built-in"],
      useCases: ["Merchant submits 3 months of CoDi history → gets credit score in 5 minutes", "Approved borrower receives MXN $5,000 in 24 hours via SPEI", "Borrower completes repayment → score improves → unlocks larger loan"],
      businessLogic: "Interest income on loan book. Origination fee (2–3%). B2B API for fintechs and neobanks to license the scoring model.",
      impact: "100,000 loans originated in Year 2. Average loan size MXN $8,000. Default rate target <5%.",
      risk: "Regulatory risk with CNBV SOFOM license. Credit cycle risk in economic downturn. Mitigation: conservative LTV ratios and a loss reserve from day one.",
    };
  }

  return {
    ...TALENTBRIDGE_CORE,
    problem: `Based on your idea: "${idea.slice(0, 80)}${idea.length > 80 ? "…" : ""}" — this venture addresses a structural gap where AI can create outsized impact for underserved Mexican communities. Full analysis requires deeper specification of the target population and the specific failure in the current market.`,
  };
}

export default function CoreForm() {
  const [idea, setIdea] = useState("");
  const [generated, setGenerated] = useState<GeneratedCore | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleGenerate() {
    if (!idea.trim()) return;
    setLoading(true);
    setSaved(false);
    setTimeout(() => {
      setGenerated(generateCoreFromIdea(idea));
      setLoading(false);
    }, 1200);
  }

  function handleSave() {
    if (!generated) return;
    const entry = { idea, core: generated, savedAt: new Date().toISOString() };
    const existing = JSON.parse(localStorage.getItem("talentbridge_saves") ?? "[]");
    localStorage.setItem("talentbridge_saves", JSON.stringify([entry, ...existing]));
    setSaved(true);
  }

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Describe your venture idea
        </label>
        <textarea
          value={idea}
          onChange={(e) => { setIdea(e.target.value); setSaved(false); }}
          placeholder="e.g. A platform that connects rural artisans in Oaxaca with urban buyers using AI-powered product discovery…"
          rows={4}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 resize-none transition"
        />
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={!idea.trim() || loading}
            className="rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating…" : "Generate Core"}
          </button>
          {loading && (
            <span className="text-sm text-gray-400 animate-pulse">
              Analyzing your venture…
            </span>
          )}
        </div>
      </div>

      {/* Output */}
      {generated && (
        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Generated Venture Core
            </h3>
            <button
              onClick={handleSave}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                saved
                  ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 cursor-default"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {saved ? "Saved ✓" : "Save"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(
              [
                { key: "problem", label: "Problem" },
                { key: "user", label: "User" },
                { key: "slice", label: "Slice" },
                { key: "technology", label: "Technology" },
                { key: "value", label: "Value" },
                { key: "businessLogic", label: "Business Logic" },
                { key: "impact", label: "Impact" },
                { key: "risk", label: "Risk" },
              ] as const
            ).map(({ key, label }) => (
              <div
                key={key}
                className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1.5">
                  {label}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {generated[key]}
                </p>
              </div>
            ))}
          </div>

          {/* List fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                Core Principles
              </p>
              <ul className="space-y-1.5">
                {generated.corePrinciples.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 border border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">
                Use Cases
              </p>
              <ul className="space-y-1.5">
                {generated.useCases.map((u, i) => (
                  <li key={i} className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-indigo-400 mt-0.5">→</span>
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
