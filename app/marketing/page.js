'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const TONES = ['Professional/Trustworthy', 'Bold/Energetic', 'Friendly/Approachable']
const CHANNELS = ['Instagram', 'LinkedIn', 'TikTok', 'Email', 'University Partnerships']
const OBJECTIVES = ['Student signups', 'SME signups', 'Brand awareness']

const INITIAL = {
  productName: 'TalentBridge MX',
  targetUser: 'Mexican university students & SMEs',
  problem: '',
  valueProp: '',
  tone: 'Professional/Trustworthy',
  cta: 'Connect With Top Talent',
  channel: 'LinkedIn',
  objective: 'Student signups',
}

// ── Template generation ──────────────────────────────────────────────────────

function toneAttrs(tone) {
  if (tone === 'Bold/Energetic')
    return { adj: 'game-changing', energy: 'obliterates', mood: 'bold', opener: 'Stop waiting.' }
  if (tone === 'Friendly/Approachable')
    return { adj: 'exciting', energy: 'transforms', mood: 'warm', opener: 'We get it.' }
  return { adj: 'proven', energy: 'addresses', mood: 'professional', opener: 'The data is clear.' }
}

function generateBrand(name, vp, tone) {
  const t = toneAttrs(tone)
  const taglines = {
    'Professional/Trustworthy': `${name}: Bridging talent and opportunity across Mexico.`,
    'Bold/Energetic': `${name}: Where ${t.adj} careers are built.`,
    'Friendly/Approachable': `${name}: Your career journey starts here. ¡Vamos!`,
  }
  return { name, tagline: taglines[tone] }
}

function generatePersona(targetUser, objective, productName) {
  if (objective === 'Student signups') {
    return `Meet Sofía, 21 — a final-year Business Administration student at UNAM, passionate about marketing and sustainability. She's brilliant and motivated, but struggling to land her first formal interview. She's been applying on traditional job boards for months with no callbacks. A campus ambassador introduces her to ${productName}. She creates a verified profile in under three minutes, completes a skills assessment, and receives her first AI-matched job offer within 24 hours. She starts her career within the month.`
  }
  if (objective === 'SME signups') {
    return `Meet Carlos, 38 — founder of a 20-person fintech consultancy in Guadalajara. He needs three junior analysts but can't afford a traditional recruiter's MXN $30,000 placement fee. A LinkedIn post about ${productName} catches his eye. He posts his first role in eight minutes, gets five AI-matched, university-verified candidates in his inbox by the next morning, and makes two hires within two weeks. He only pays when the hire is confirmed.`
  }
  return `Meet Ana, 45 — Dean of Career Services at Tecnológico de Monterrey. She manages employment outcomes for 3,000 graduates per year and is under increasing institutional pressure to improve placement rates. She discovers ${productName} at a higher-education conference, negotiates a bulk institutional partnership, and integrates the platform into her career center's workflow within a semester. Graduate placement rates improve by 18%.`
}

function generateValuePromise(name, prob, vp, tone) {
  const t = toneAttrs(tone)
  if (tone === 'Bold/Energetic') {
    return `${name} doesn't just solve the problem of ${prob} — it ${t.energy} it entirely. While others are still sifting through mountains of unqualified CVs or refreshing empty inboxes, ${name} deploys AI to create instant, intelligent connections between raw talent and real opportunity. ${vp || 'Our platform combines 200+ skill dimensions, university-verified credentials, and a commission-only model that aligns every incentive toward one goal: successful hires.'} The result? Mexico's fastest talent marketplace — 48-hour match-to-interview, guaranteed.`
  }
  if (tone === 'Friendly/Approachable') {
    return `Finding the right job — or the right person for the job — shouldn't feel like navigating a maze. At ${name}, we've built something simple: a place where ${prob} gets solved through real human connections powered by smart technology. ${vp || 'We match university students (who are incredible but often overlooked) with the SMEs that need them most — using AI to do the heavy lifting so both sides can focus on what matters.'} No complicated fees. No endless waiting. Just real connections, made fast.`
  }
  return `${name} ${t.energy} the challenge of ${prob} through a structured, AI-powered marketplace purpose-built for the Mexican labor market. ${vp || 'By combining university-verified academic credentials, intelligent skills-to-role matching across 200+ categories, and a commission-only model aligned with successful outcomes, the platform reduces hiring friction while accelerating career development for Mexico\'s next generation of professionals.'} ${t.opener} The data shows that informal employment costs the Mexican economy billions annually — ${name} is the structured alternative.`
}

function generateLandingPage(name, targetUser, prob, vp, cta, tone) {
  const headlines = {
    'Professional/Trustworthy': `${name}: Mexico's Verified Talent Marketplace`,
    'Bold/Energetic': `Stop Posting. Start Hiring. ${name} Changes Everything.`,
    'Friendly/Approachable': `Your Next Opportunity Is Waiting at ${name}`,
  }
  const subheadlines = {
    'Professional/Trustworthy': `AI-powered matching between ${targetUser}, built on verified credentials and institutional trust.`,
    'Bold/Energetic': `We match ${targetUser} in 48 hours — or your listing stays free.`,
    'Friendly/Approachable': `Join thousands of students and businesses who found each other through ${name}.`,
  }
  const body = `${prob ? `The challenge of ${prob} has held back Mexico's talent market for too long.` : "Mexico's talent market holds enormous potential — but access has always been the bottleneck."} ${vp || name + ' bridges that gap with AI matching, university-verified profiles, and a platform designed for real results on both sides of the market.'} Whether you're a student looking for your breakthrough role or an SME ready to grow your team with the next generation of talent — ${cta.toLowerCase()} and discover why Mexico's fastest-growing companies choose ${name}.`
  return { headline: headlines[tone], subheadline: subheadlines[tone], body }
}

function generateSocialPosts(name, targetUser, vp, cta, tone, channel) {
  const hashtags = {
    Instagram: '#TalentBridgeMX #CarrerasMexico #PrimerEmpleo #Empleo',
    LinkedIn: '',
    TikTok: '#CareerTok #MexicoTalent #TalentBridge #UniversitariosMX',
    Email: '',
    'University Partnerships': '',
  }
  const tag = hashtags[channel] || ''
  const isTikTok = channel === 'TikTok'
  const isLinkedIn = channel === 'LinkedIn'

  const posts = [
    // 1 — problem awareness
    tone === 'Bold/Energetic'
      ? `60% of Mexican university graduates take their first job in the informal economy.\n\nThat's not a talent problem. That's a connection problem.\n\n${name} fixes it — AI-matched, university-verified, 48 hours.\n\n${cta}. ${tag}`
      : tone === 'Friendly/Approachable'
      ? `Here's something we don't talk about enough:\n\n60%+ of Mexican students start their careers in informal work — not because they aren't talented, but because the right door was never opened for them.\n\n${name} is that door. ${tag}`
      : `Market insight: over 60% of Mexican university graduates enter informal employment upon graduation.\n\n${name} addresses this structural gap with AI-powered matching, verified credentials, and a platform built for Mexico's labor market reality.\n\n${cta}. ${tag}`,

    // 2 — solution intro
    `${isTikTok ? 'POV: ' : ''}You just created your ${name} profile.\n\n→ University-verified in 2 minutes\n→ AI skills assessment complete\n→ 3 matched opportunities in your inbox\n\nThis is what the future of hiring in Mexico looks like.\n\n${cta}. ${tag}`,

    // 3 — student social proof
    `"I applied everywhere for six months. With ${name}, I had three interviews in one week."\n\n— Sofía, Marketing student, UNAM\n\n${isLinkedIn ? '\nThe best junior talent in Mexico is available right now. The question is whether you can reach them.' : ''}\n\n${cta}. ${tag}`,

    // 4 — SME value
    `Traditional recruiting for SMEs in Mexico:\n✗ MXN $15,000–30,000 placement fee\n✗ 2–3 months to fill a role\n✗ 40% first-year attrition\n\n${name}:\n✓ Pay only when you hire\n✓ 48-hour match guarantee\n✓ University-verified candidates\n\n${cta}. ${tag}`,

    // 5 — feature: AI matching
    `🤖 How does ${name} match talent?\n\n1. Student completes a verified profile + skills assessment\n2. AI maps skills across 200+ categories\n3. Top matches surface in the SME's dashboard\n4. Interview scheduled in one click\n\nNo CVs to sift through. No guesswork. Just matches.\n\n${cta}. ${tag}`,

    // 6 — feature: verified profiles
    `Trust is the hardest thing to build in a hiring platform.\n\nSo we built it in:\n\n✅ University-issued credential verification\n✅ CURP identity validation\n✅ LFPDPPP-compliant data handling\n✅ Skills micro-assessments\n\n${name} — where trust is infrastructure. ${tag}`,

    // 7 — urgency / FOMO
    `${isTikTok ? 'Story time: ' : ''}Mexico has 3.5 million university students.\n\nThe ones who will define the next decade of Mexican business are looking for their first opportunity right now.\n\n${name} is where they find it — and where SMEs find them first.\n\n${cta} before your competitors do. ${tag}`,

    // 8 — educational tip
    `Quick tip for SME owners posting jobs:\n\nThe best hire isn't always the one with the most experience — it's the one with the right skills and the highest learning velocity.\n\n${name}'s AI assessment scores both. ${isLinkedIn ? '\n\nWhat metric do you use to evaluate junior candidates? Drop it in the comments.' : ''}\n\n${tag}`,

    // 9 — human story
    `${name} was built because we watched too many brilliant students graduate into jobs that had nothing to do with what they studied — and too many great SMEs fail to find the talent that was right in front of them.\n\nWe built the bridge. You cross it.\n\n${cta}. ${tag}`,

    // 10 — community
    tone === 'Friendly/Approachable'
      ? `To every student grinding through exams, building portfolios, and dreaming about what comes next:\n\nYour first big opportunity is closer than you think.\n\n${name} is rooting for you — and we've got the AI to prove it. 💪\n\n${cta}. ${tag}`
      : `${targetUser} — you represent Mexico's economic future.\n\n${name} is the infrastructure that connects your talent with the companies that need it most.\n\nLet's build something great. ${cta}. ${tag}`,
  ]
  return posts
}

function generateVideoScripts(name, targetUser, prob, vp, cta, tone) {
  const prob2 = prob || 'the gap between university and the real workforce'
  return [
    {
      title: 'The Problem We\'re Solving',
      duration: '30 seconds',
      beats: [
        '[0–5s] OPEN: Wide shot of a packed lecture hall at a Mexican university. Students take notes, unaware of what\'s waiting outside. Voiceover: "Mexico produces 400,000 university graduates per year."',
        `[6–12s] PROBLEM: Quick cuts — a student refreshing an empty inbox, an SME founder drowning in unread CVs, a job board listing with "400+ applicants." Voiceover: "But ${prob2} is costing everyone."`,
        `[13–20s] SOLUTION: Clean UI reveal of ${name} on a laptop and mobile. AI match animation. Voiceover: "${vp || (name + ' uses AI to connect the right student with the right company — in 48 hours.')}"`,
        `[21–28s] CTA: Logo lockup on dark background. Text on screen: "${cta}." URL fades in: talentbridgemx.com`,
        `[29–30s] TAG: "${name} — Where talent meets opportunity in Mexico."`,
      ],
    },
    {
      title: 'Student Success Story',
      duration: '45 seconds',
      beats: [
        '[0–6s] HOOK: Close-up of a phone screen. A push notification appears: "New match: Junior Data Analyst @ Grupo Bimbo." A hand picks up the phone. Cut to a young woman\'s face — she smiles slowly.',
        `[7–15s] BACKSTORY: Voiceover over B-roll of a campus at golden hour: "Sofía spent six months applying to jobs with no callbacks. She had the skills. Just not the right platform."`,
        `[16–25s] PROCESS: Quick screen recording — ${name} profile creation (2 min), skills assessment progress bar, AI match notification appears with 3 company cards.`,
        '[26–35s] RESULT: Sofía in a bright modern office setting, presenting to a small team. She looks confident, at home. Voiceover: "She had three interviews in one week. She started her career in 30 days."',
        `[36–43s] SOCIAL PROOF: Text card animation — "12,000+ students matched · 4.8★ average rating · 48-hour match SLA"`,
        `[44–45s] CTA: "${cta} — free for students." talentbridgemx.com/students`,
      ],
    },
    {
      title: 'SME Value Pitch',
      duration: '60 seconds',
      beats: [
        '[0–8s] HOOK: A business owner stares at a stack of printed CVs on a cluttered desk. He sighs. Text overlay fades in: "You shouldn\'t have to read 200 CVs to find one good hire."',
        '[9–18s] AGITATE: Voiceover: "Traditional recruiting costs Mexican SMEs an average of MXN $20,000 per hire and takes 10–12 weeks. And 35% of those hires don\'t make it past 90 days."',
        `[19–30s] INTRODUCE: ${name} logo animates in. Clean product UI. Voiceover: "${name} flips the model — AI-matched, university-verified candidates, delivered to your hiring dashboard."`,
        '[31–42s] DEMO: Screen walkthrough at 1.5x speed. Post a job in 3 minutes → AI shortlists top 5 candidates → candidate cards appear with match score, skills, university badge → "Schedule Interview" button click.',
        '[43–50s] MODEL: Bold text on dark background, one line at a time: "Pay only when you hire." / "No subscription." / "No listing fee." Voiceover: "You\'re not paying to look. You\'re paying for results."',
        '[51–57s] TESTIMONIAL: Quote card with company logo: "We hired 3 designers in 2 weeks. Game changer." — Carlos, Consultoría Fintech, Guadalajara.',
        `[58–60s] CTA: "${cta}. Post your first role free." talentbridgemx.com/employers`,
      ],
    },
  ]
}

function generateCalendar(name, channel, objective) {
  const channelMap = {
    Instagram: ['Instagram Feed', 'Instagram Stories', 'Instagram Reels'],
    LinkedIn: ['LinkedIn Post', 'LinkedIn Article', 'LinkedIn Poll'],
    TikTok: ['TikTok Video', 'TikTok Duet/Stitch', 'TikTok Live'],
    Email: ['Email Newsletter', 'Email Drip Sequence', 'Email Re-engagement'],
    'University Partnerships': ['Campus Ambassador', 'Email to Career Centers', 'Campus Event'],
  }
  const platforms = channelMap[channel] || ['LinkedIn Post', 'Instagram Feed', 'Email Newsletter']

  const phases = [
    { phase: 'Awareness', days: [1, 2, 3] },
    { phase: 'Education', days: [4, 5, 6, 7] },
    { phase: 'Social Proof', days: [8, 9, 10, 11] },
    { phase: 'Conversion', days: [12, 13, 14] },
  ]

  const ideas = [
    `Launch announcement: Introduce ${name} to your audience with a data-led hook and a clear value statement.`,
    `"Did you know?" statistic about Mexico's talent gap — position ${name} as the answer.`,
    `Problem-awareness post: describe the hiring pain point your audience knows all too well.`,
    `"How it works" explainer: 3-step visual breakdown of the ${name} matching process.`,
    `Feature spotlight: AI matching — how it saves SMEs 80% of screening time with a real example.`,
    `Feature spotlight: verified profiles — why trust is the most important thing in a talent marketplace.`,
    `Student testimonial carousel or quote graphic — emotion-first, data to support.`,
    `Engagement poll: "What's your biggest hiring challenge?" with 4 answer options.`,
    `SME success story: before/after hiring journey — specific numbers preferred.`,
    `Educational tip: "5 signals a student is ready for their first professional role."`,
    `Video drop: The Problem We're Solving (30s) — awareness-optimized format.`,
    `University partner spotlight: name a partner institution and their placement stats.`,
    `Urgency CTA: "Free job listing this week for new SME signups — claim yours."`,
    `Campaign wrap-up: share a week-1 metric or milestone, tease the next campaign phase.`,
  ]

  const types = [
    'Awareness Post', 'Awareness Post', 'Awareness Post',
    'Educational Content', 'Feature Spotlight', 'Feature Spotlight', 'Engagement',
    'Engagement', 'Social Proof', 'Social Proof', 'Video Content',
    'Social Proof', 'CTA / Conversion', 'Recap & Tease',
  ]

  return Array.from({ length: 14 }, (_, i) => ({
    day: i + 1,
    platform: platforms[i % platforms.length],
    contentType: types[i],
    idea: ideas[i],
  }))
}

function generateVisualPrompts(name, targetUser, tone) {
  const style =
    tone === 'Bold/Energetic'
      ? 'vibrant high-contrast composition, bold graphic typography overlay, electric indigo and citrus color palette, editorial energy'
      : tone === 'Friendly/Approachable'
      ? 'warm natural light, soft pastel gradients, diverse and inclusive cast, documentary photography style, inviting and human'
      : 'clean modern minimalist, deep navy and white palette, crisp corporate photography, authoritative but approachable'

  return [
    `A diverse group of Mexican university students collaborating around laptops in a bright modern campus common area, ${style}, golden hour light through large windows, subtle network-graph overlay suggesting AI matching, shot on 35mm`,
    `A confident young professional shaking hands with a business owner across a clean glass-topped desk in a modern office, ${style}, warm expression of mutual trust, natural side lighting, shallow depth of field on the handshake`,
    `Split-screen hero composition: left half shows UNAM campus architecture in Mexico City, right half shows a modern SME open-plan office in Guadalajara — connected at center by a glowing indigo data bridge, ${style}`,
    `Extreme close-up of a smartphone screen displaying the ${name} "New Match Found" notification card, surrounded by soft-focus bokeh of office lights, ${style}, held in a young woman's hand, 3:4 portrait format`,
    `Aerial drone shot of Paseo de la Reforma at sunrise, city alive with commuters, text overlay in clean sans-serif: "${name}" — representing ambition, scale, and urban opportunity in Mexico, ${style}`,
    `A young woman in graduation cap and gown looking at her phone with a joyful expression, abstract data streams and glowing network nodes in the background as a composite layer, ${style}, sense of achievement and future possibility`,
    `Abstract hero banner illustration: flowing network of nodes connecting student avatar icons to company logo hexagons across a deep dark background, indigo-to-emerald gradient lines, ${style}, suitable for web hero or OOH advertising`,
    `Flat-lay lifestyle graphic on a clean white surface: MacBook Air, Moleskine notebook open to a filled career goals page, UNAM-branded pen, a small Mexican ceramic, coffee cup — with ${name} interface visible on the MacBook screen, ${style}`,
  ]
}

function generateABTest(cta, tone, name) {
  const shortCta =
    cta.split(' ').length > 4
      ? cta.split(' ').slice(0, 3).join(' ') + ' →'
      : cta + ' →'

  const versionB =
    tone === 'Bold/Energetic'
      ? `Launch Your Career — ${cta} Today`
      : tone === 'Friendly/Approachable'
      ? `Join ${name} — ${cta}`
      : `Get Started: ${cta}`

  return {
    versionA: {
      text: shortCta,
      rationale:
        'Shorter and more urgent — strips friction words and adds a directional cue. Higher click-through rate in mobile and paid-ad contexts where attention is scarce.',
    },
    versionB: {
      text: versionB,
      rationale:
        'Warmer and more descriptive — sets emotional context before the action verb. Better for cold audiences who need social proof or brand familiarity before converting.',
    },
  }
}

function generateContent(inputs) {
  const { productName, targetUser, problem, valueProp, tone, cta, channel, objective } = inputs
  const prob = problem || 'the disconnect between university education and quality employment'
  const vp = valueProp || ''
  return {
    brand: generateBrand(productName, vp, tone),
    persona: generatePersona(targetUser, objective, productName),
    valuePromise: generateValuePromise(productName, prob, vp, tone),
    landingPage: generateLandingPage(productName, targetUser, prob, vp, cta, tone),
    socialPosts: generateSocialPosts(productName, targetUser, vp, cta, tone, channel),
    videoScripts: generateVideoScripts(productName, targetUser, prob, vp, cta, tone),
    campaignCalendar: generateCalendar(productName, channel, objective),
    visualPrompts: generateVisualPrompts(productName, targetUser, tone),
    abTest: generateABTest(cta, tone, productName),
  }
}

function contentToText(g, inputs) {
  const lines = []
  lines.push(`=== CAMPAIGN: ${inputs.productName} ===`)
  lines.push(`Generated: ${new Date().toLocaleString('es-MX')}\n`)
  lines.push(`🏷️  BRAND NAME & TAGLINE`)
  lines.push(`Name: ${g.brand.name}`)
  lines.push(`Tagline: ${g.brand.tagline}\n`)
  lines.push(`🎯  TARGET PERSONA`)
  lines.push(g.persona + '\n')
  lines.push(`🧲  VALUE PROMISE`)
  lines.push(g.valuePromise + '\n')
  lines.push(`🧾  LANDING PAGE COPY`)
  lines.push(`Headline: ${g.landingPage.headline}`)
  lines.push(`Subheadline: ${g.landingPage.subheadline}`)
  lines.push(`Body: ${g.landingPage.body}\n`)
  lines.push(`📱  SOCIAL POSTS (10)`)
  g.socialPosts.forEach((post, i) => {
    lines.push(`\n[Post ${i + 1}]`)
    lines.push(post)
  })
  lines.push(`\n🎬  VIDEO SCRIPTS (3)`)
  g.videoScripts.forEach((script, i) => {
    lines.push(`\n[Video ${i + 1}] ${script.title} · ${script.duration}`)
    script.beats.forEach((b) => lines.push(b))
  })
  lines.push(`\n📅  14-DAY CAMPAIGN CALENDAR`)
  lines.push('Day | Platform | Content Type | Post Idea')
  g.campaignCalendar.forEach((r) =>
    lines.push(`${r.day} | ${r.platform} | ${r.contentType} | ${r.idea}`)
  )
  lines.push(`\n🎨  VISUAL PROMPT PACK (8)`)
  g.visualPrompts.forEach((p, i) => lines.push(`\n[Prompt ${i + 1}]\n${p}`))
  lines.push(`\n⚗️  A/B TEST`)
  lines.push(`Version A: ${g.abTest.versionA.text}`)
  lines.push(`Rationale: ${g.abTest.versionA.rationale}`)
  lines.push(`Version B: ${g.abTest.versionB.text}`)
  lines.push(`Rationale: ${g.abTest.versionB.rationale}`)
  return lines.join('\n')
}

// ── UI Components ────────────────────────────────────────────────────────────

function Card({ icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-base font-bold text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </section>
  )
}

const inputClass =
  'w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors'

const labelClass = 'text-xs font-semibold uppercase tracking-widest text-slate-400'

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MarketingPage() {
  const [inputs, setInputs] = useState(INITIAL)
  const [generated, setGenerated] = useState(null)
  const [abWinner, setAbWinner] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setGenerated(generateContent(inputs))
    setAbWinner(null)
    setSaved(false)
    setSaveError(null)
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      const { error } = await supabase.from('marketing_outputs').insert([{
        product_name: inputs.productName,
        inputs,
        brand: generated.brand,
        social_posts: generated.socialPosts,
        video_scripts: generated.videoScripts,
        calendar: generated.campaignCalendar,
        visual_prompts: generated.visualPrompts,
        ab_test: { ...generated.abTest, winner: abWinner },
      }])
      if (error) throw error
      setSaved(true)
    } catch (err) {
      setSaveError(err.message || 'Save failed. Check your Supabase table.')
    } finally {
      setSaving(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contentToText(generated, inputs))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-10">

        {/* ── Page header ── */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Week 4 — Marketing Engine
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Marketing Engine &amp; Content System
          </h1>
          <p className="mx-auto max-w-2xl text-slate-400 leading-relaxed">
            Fill in your campaign details and generate a full strategy — social
            posts, video scripts, a 14-day calendar, and visual prompts —
            tailored to your inputs.
          </p>
        </section>

        {/* ── Campaign Input Form ── */}
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-bold">Campaign Inputs</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="space-y-1.5">
              <label className={labelClass}>Product Name</label>
              <input name="productName" value={inputs.productName} onChange={handleChange}
                className={inputClass} placeholder="TalentBridge MX" />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Target User</label>
              <input name="targetUser" value={inputs.targetUser} onChange={handleChange}
                className={inputClass} placeholder="Mexican university students & SMEs" />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className={labelClass}>Problem Being Solved</label>
              <textarea name="problem" value={inputs.problem} onChange={handleChange}
                rows={2} className={inputClass + ' resize-none'}
                placeholder="e.g. Mexican university students lack access to formal employment opportunities despite having strong skills…" />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className={labelClass}>Value Proposition</label>
              <textarea name="valueProp" value={inputs.valueProp} onChange={handleChange}
                rows={2} className={inputClass + ' resize-none'}
                placeholder="e.g. AI-powered matching that connects verified talent with the right companies in 48 hours, commission-only…" />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Tone of Voice</label>
              <select name="tone" value={inputs.tone} onChange={handleChange} className={inputClass}>
                {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Call to Action</label>
              <input name="cta" value={inputs.cta} onChange={handleChange}
                className={inputClass} placeholder="Connect With Top Talent" />
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Marketing Channel</label>
              <select name="channel" value={inputs.channel} onChange={handleChange} className={inputClass}>
                {CHANNELS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>Campaign Objective</label>
              <select name="objective" value={inputs.objective} onChange={handleChange} className={inputClass}>
                {OBJECTIVES.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button type="submit"
                className="w-full rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors">
                Generate Campaign Content ✨
              </button>
            </div>
          </form>
        </section>

        {/* ── Generated Output ── */}
        {generated && (
          <>
            {/* Save / Export bar */}
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={handleSave} disabled={saving}
                className="rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50">
                {saving ? 'Saving…' : '💾 Save Campaign'}
              </button>
              <button onClick={handleCopy}
                className="rounded-full border border-slate-600 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors">
                {copied ? '✓ Copied!' : '📋 Copy All'}
              </button>
              {saved && (
                <span className="text-sm font-semibold text-emerald-400">
                  ✓ Campaign saved to Supabase!
                </span>
              )}
              {saveError && (
                <span className="text-sm text-red-400">{saveError}</span>
              )}
            </div>

            {/* 🏷️ Brand */}
            <Card icon="🏷️" title="Brand Name & Tagline">
              <p className="text-2xl font-bold text-white">{generated.brand.name}</p>
              <p className="text-lg text-indigo-400 mt-1 italic">{generated.brand.tagline}</p>
            </Card>

            {/* 🎯 Persona */}
            <Card icon="🎯" title="Target Persona">
              <p className="text-slate-300 leading-relaxed">{generated.persona}</p>
            </Card>

            {/* 🧲 Value promise */}
            <Card icon="🧲" title="Value Promise">
              <p className="text-slate-300 leading-relaxed">{generated.valuePromise}</p>
            </Card>

            {/* 🧾 Landing page copy */}
            <Card icon="🧾" title="Landing Page Copy">
              <div className="space-y-5">
                <div>
                  <p className={labelClass + ' mb-1'}>Headline</p>
                  <p className="text-xl font-bold text-white">{generated.landingPage.headline}</p>
                </div>
                <div>
                  <p className={labelClass + ' mb-1'}>Subheadline</p>
                  <p className="text-base text-indigo-300">{generated.landingPage.subheadline}</p>
                </div>
                <div>
                  <p className={labelClass + ' mb-1'}>Body Paragraph</p>
                  <p className="text-slate-300 leading-relaxed">{generated.landingPage.body}</p>
                </div>
              </div>
            </Card>

            {/* 📱 Social posts */}
            <Card icon="📱" title="10 Social Posts">
              <div className="space-y-4">
                {generated.socialPosts.map((post, i) => (
                  <div key={i} className="rounded-xl bg-slate-800 border border-slate-700 p-4 space-y-1.5">
                    <p className={labelClass}>Post {i + 1}</p>
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{post}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* 🎬 Video scripts */}
            <Card icon="🎬" title="3 Video Scripts">
              <div className="space-y-6">
                {generated.videoScripts.map((script, i) => (
                  <div key={i} className="rounded-xl bg-slate-800 border border-slate-700 p-5 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-bold text-white">{script.title}</h3>
                      <span className="shrink-0 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 px-2.5 py-0.5 text-xs font-semibold">
                        {script.duration}
                      </span>
                    </div>
                    <div className="space-y-2.5 border-t border-slate-700 pt-4">
                      {script.beats.map((beat, j) => (
                        <p key={j} className="text-sm text-slate-400 leading-relaxed">{beat}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* 📅 Campaign calendar */}
            <Card icon="📅" title="14-Day Campaign Calendar">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[560px]">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left pb-2 pr-4 text-slate-500 font-semibold uppercase tracking-widest text-xs w-10">Day</th>
                      <th className="text-left pb-2 pr-4 text-slate-500 font-semibold uppercase tracking-widest text-xs">Platform</th>
                      <th className="text-left pb-2 pr-4 text-slate-500 font-semibold uppercase tracking-widest text-xs">Content Type</th>
                      <th className="text-left pb-2 text-slate-500 font-semibold uppercase tracking-widest text-xs">Post Idea</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generated.campaignCalendar.map((row) => (
                      <tr key={row.day} className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors">
                        <td className="py-2.5 pr-4 font-bold text-indigo-400">{row.day}</td>
                        <td className="py-2.5 pr-4 text-slate-300 font-medium whitespace-nowrap">{row.platform}</td>
                        <td className="py-2.5 pr-4">
                          <span className="rounded-full bg-slate-700 px-2.5 py-0.5 text-xs text-slate-300 whitespace-nowrap">
                            {row.contentType}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-400 text-xs leading-relaxed">{row.idea}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* 🎨 Visual prompts */}
            <Card icon="🎨" title="Visual Prompt Pack — 8 Image-Generation Prompts">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {generated.visualPrompts.map((prompt, i) => (
                  <div key={i} className="rounded-xl bg-slate-800 border border-slate-700 p-4 space-y-1.5">
                    <p className={labelClass}>Prompt {i + 1}</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{prompt}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* ⚗️ A/B Tester */}
            <Card icon="⚗️" title="A/B Headline / CTA Tester">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['A', 'B'].map((version) => {
                  const v = version === 'A' ? generated.abTest.versionA : generated.abTest.versionB
                  const isWinner = abWinner === version
                  return (
                    <div key={version}
                      className={`rounded-xl border p-5 space-y-3 transition-all ${
                        isWinner
                          ? 'border-emerald-500/60 bg-emerald-500/10'
                          : 'border-slate-700 bg-slate-800'
                      }`}>
                      <p className={`text-xs font-bold uppercase tracking-widest ${isWinner ? 'text-emerald-400' : 'text-slate-500'}`}>
                        Version {version}{isWinner ? ' 🏆 Winner' : ''}
                      </p>
                      <p className="text-lg font-bold text-white leading-snug">{v.text}</p>
                      <p className="text-xs text-slate-400 italic leading-relaxed">{v.rationale}</p>
                      <button
                        onClick={() => setAbWinner(version)}
                        className={`w-full rounded-full py-2 text-xs font-semibold transition-colors ${
                          isWinner
                            ? 'bg-emerald-600 text-white'
                            : 'border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white'
                        }`}>
                        {isWinner ? '✓ Selected as Winner' : `Pick Version ${version}`}
                      </button>
                    </div>
                  )
                })}
              </div>
              {abWinner && (
                <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-3.5 text-center">
                  <p className="text-sm text-emerald-400 font-semibold">
                    Version {abWinner} selected — this will be saved with your campaign.
                  </p>
                </div>
              )}
            </Card>

            {/* Bottom save bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 pb-8">
              <button onClick={handleSave} disabled={saving}
                className="rounded-full bg-emerald-600 px-7 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50">
                {saving ? 'Saving…' : '💾 Save Campaign to Supabase'}
              </button>
              <button onClick={handleCopy}
                className="rounded-full border border-slate-600 px-7 py-3 text-sm font-semibold text-slate-300 hover:border-slate-400 hover:text-white transition-colors">
                {copied ? '✓ Copied!' : '📋 Copy All as Text'}
              </button>
              {saved && (
                <span className="text-sm font-semibold text-emerald-400">✓ Saved!</span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
