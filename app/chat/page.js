'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

const QUESTIONS = [
  {
    question: "What's your field of study or area of interest?",
    key: 'field',
    options: ['Business', 'Engineering', 'Marketing', 'Design', 'Computer Science', 'Other'],
  },
  {
    question: 'What type of opportunity are you looking for?',
    key: 'opportunityType',
    options: ['Internship', 'Part-time job', 'Full-time job'],
  },
  {
    question: 'Have you already created a TalentBridge MX profile?',
    key: 'hasProfile',
    options: ['Yes', 'No'],
  },
]

const GUARDRAIL_KEYWORDS = [
  'complaint', 'bad experience', "didn't pay", 'scam', 'unfair',
  'problem with', 'dispute', 'fired', 'harassment', 'unsafe',
]

const TIPS = {
  Internship: (field) =>
    `make sure your profile highlights any coursework, projects, or extracurriculars relevant to ${field} — SMEs hiring interns value initiative over experience.`,
  'Part-time job': (field) =>
    `check that your availability hours are clearly set in your profile. SMEs hiring for part-time ${field} roles prioritize candidates who are upfront about their schedule.`,
  'Full-time job': (field) =>
    `add at least one skills assessment to your profile. Full-time ${field} candidates with verified skills get 2× more SME views on our platform.`,
}

function buildResponse(intake) {
  const { field, opportunityType, hasProfile } = intake
  if (hasProfile === 'No') {
    return `Great news — getting started on TalentBridge MX is quick and easy. Since you're interested in ${opportunityType.toLowerCase()} opportunities in ${field}, creating your profile is the best first step. It only takes about 2 minutes, and once it's live our AI matching engine will start surfacing relevant ${opportunityType.toLowerCase()} listings from SMEs in Mexico that are actively hiring ${field} talent. Head to the profile creation flow to get started.`
  }
  const tip = TIPS[opportunityType]?.(field) ?? `review your profile to reflect your latest ${field} skills and projects.`
  return `Since you already have a TalentBridge MX profile — nice work! Your next best step as a ${field} student looking for a ${opportunityType.toLowerCase()}: ${tip} You can also use the "Boost Visibility" feature in your dashboard to surface your profile to SMEs who've saved ${field} talent searches this week.`
}

function QAHistory({ intake }) {
  return (
    <>
      {QUESTIONS.filter((q) => intake[q.key]).map((q) => (
        <div key={q.key} className="space-y-2">
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm bg-slate-700 px-4 py-3 text-sm text-slate-200 max-w-xs">
              {q.question}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-3 text-sm text-white font-medium max-w-xs">
              {intake[q.key]}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default function ChatPage() {
  const [step, setStep] = useState(0)
  const [intake, setIntake] = useState({})
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState(null)
  const [guardrailTriggered, setGuardrailTriggered] = useState(false)
  const [feedbackConfirmed, setFeedbackConfirmed] = useState(false)
  const [logId, setLogId] = useState(null)
  const [recentLogs, setRecentLogs] = useState([])

  useEffect(() => { fetchRecentLogs() }, [])

  async function fetchRecentLogs() {
    const { data } = await supabase
      .from('chat_logs')
      .select('id, created_at, message, guardrail_triggered, feedback')
      .order('created_at', { ascending: false })
      .limit(5)
    if (data) setRecentLogs(data)
  }

  function handleAnswer(key, value) {
    setIntake((prev) => ({ ...prev, [key]: value }))
    setStep((s) => s + 1)
  }

  async function handleSend() {
    if (!message.trim()) return
    const lower = message.toLowerCase()
    const triggered = GUARDRAIL_KEYWORDS.some((kw) => lower.includes(kw))
    const resp = triggered
      ? "This sounds like something that needs a real person to look into rather than automated advice. I've flagged this for our support team, and they'll follow up with you directly within 24 hours."
      : buildResponse(intake)

    setResponse(resp)
    setGuardrailTriggered(triggered)
    setStep(4)

    const { data } = await supabase
      .from('chat_logs')
      .insert({ intake, message, response: resp, guardrail_triggered: triggered, feedback: null })
      .select('id')
      .single()
    if (data?.id) setLogId(data.id)
    fetchRecentLogs()
  }

  async function handleFeedback(value) {
    setFeedbackConfirmed(true)
    if (logId) {
      await supabase.from('chat_logs').update({ feedback: value }).eq('id', logId)
      fetchRecentLogs()
    }
  }

  function handleReset() {
    setStep(0)
    setIntake({})
    setMessage('')
    setResponse(null)
    setGuardrailTriggered(false)
    setFeedbackConfirmed(false)
    setLogId(null)
  }

  const currentQ = QUESTIONS[step]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-2xl px-6 py-16 space-y-12">

        {/* Header */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Week 5 — Guided Assistant
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            TalentBridge <span className="text-indigo-400">Assistant</span>
          </h1>
          <p className="text-slate-400 text-base">
            Answer three quick questions and get a personalized next step for your job or internship search.
          </p>
        </section>

        {/* Chat bubble area */}
        <div className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
          <div className="p-6 space-y-4 min-h-72">

            {/* Steps 0–2: intake questions */}
            {step < 3 && (
              <>
                <QAHistory intake={intake} />

                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-slate-700 px-4 py-3 text-sm text-slate-200 max-w-xs">
                    {currentQ.question}
                  </div>
                </div>

                <p className="text-xs text-slate-500 text-center">Question {step + 1} of 3</p>

                <div className="flex flex-wrap gap-2 justify-center pt-1">
                  {currentQ.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(currentQ.key, opt)}
                      className="rounded-full border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-slate-200 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-300 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 3: open text */}
            {step === 3 && (
              <>
                <QAHistory intake={intake} />
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-slate-700 px-4 py-3 text-sm text-slate-200 max-w-xs">
                    Anything else you&apos;d like to share or ask?
                  </div>
                </div>
              </>
            )}

            {/* Step 4: response */}
            {step === 4 && (
              <>
                <QAHistory intake={intake} />

                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-slate-700 px-4 py-3 text-sm text-slate-200 max-w-xs">
                    Anything else you&apos;d like to share or ask?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-3 text-sm text-white font-medium max-w-xs">
                    {message}
                  </div>
                </div>

                {/* Assistant response bubble */}
                <div className="flex justify-start">
                  <div
                    className={`rounded-2xl rounded-tl-sm px-4 py-3 text-sm max-w-sm leading-relaxed ${
                      guardrailTriggered
                        ? 'bg-amber-900/40 border border-amber-500/40 text-amber-200'
                        : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {guardrailTriggered && (
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
                        <span>🧑</span> Flagged for human review
                      </p>
                    )}
                    {response}
                  </div>
                </div>

                {/* Feedback */}
                <div className="flex justify-start pl-1">
                  {feedbackConfirmed ? (
                    <p className="text-xs text-emerald-400 font-medium">Thanks for the feedback!</p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Was this helpful?</span>
                      <button
                        onClick={() => handleFeedback('positive')}
                        className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm hover:border-emerald-500 hover:bg-emerald-500/10 transition-all"
                      >
                        👍
                      </button>
                      <button
                        onClick={() => handleFeedback('negative')}
                        className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm hover:border-red-500 hover:bg-red-500/10 transition-all"
                      >
                        👎
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleReset}
                    className="rounded-full border border-slate-600 px-5 py-2 text-xs text-slate-400 hover:border-slate-400 hover:text-slate-200 transition-all"
                  >
                    Start over
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Text input footer — only at step 3 */}
          {step === 3 && (
            <div className="border-t border-slate-700 p-4 flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message…"
                className="flex-1 rounded-xl border border-slate-600 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </button>
            </div>
          )}
        </div>

        {/* Recent Test Log */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-200">Recent Test Log</h2>
            <span className="text-xs text-slate-500">Last 5 interactions · chat_logs table</span>
          </div>

          {recentLogs.length === 0 ? (
            <p className="text-sm text-slate-500 italic">
              No interactions yet — complete a chat above to see entries here.
            </p>
          ) : (
            <div className="space-y-2">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(log.created_at).toLocaleString('es-MX', {
                        timeZone: 'America/Mexico_City',
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                    <div className="flex items-center gap-2">
                      {log.guardrail_triggered ? (
                        <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-xs font-semibold text-amber-400">
                          🧑 Flagged
                        </span>
                      ) : (
                        <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-xs font-semibold text-emerald-400">
                          ✓ Normal
                        </span>
                      )}
                      {log.feedback && (
                        <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
                          {log.feedback === 'positive' ? '👍' : '👎'}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 truncate">
                    <span className="text-slate-500 text-xs mr-1">msg:</span>
                    {log.message || <span className="italic text-slate-600">—</span>}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
