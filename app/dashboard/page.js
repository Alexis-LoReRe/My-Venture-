'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleString('es-MX', {
    timeZone: 'America/Mexico_City',
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

function fmtMXN(val) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(val)
}

function TableCard({ title, tableName, badgeColor, loading, count, children }) {
  const badgeStyles = {
    violet: 'bg-violet-500/15 border-violet-500/30 text-violet-400',
    sky: 'bg-sky-500/15 border-sky-500/30 text-sky-400',
    amber: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
    pink: 'bg-pink-500/15 border-pink-500/30 text-pink-400',
    emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
  }
  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold text-white">{title}</h2>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold font-mono ${badgeStyles[badgeColor]}`}>
            {tableName}
          </span>
        </div>
        {!loading && (
          <span className="text-xs text-slate-500">
            {count} {count === 1 ? 'record' : 'records'} total
          </span>
        )}
      </div>
      <div className="p-6">
        {loading ? (
          <p className="text-sm text-slate-500 italic">Loading…</p>
        ) : count === 0 ? (
          <p className="text-sm text-slate-500 italic">No data yet.</p>
        ) : (
          children
        )}
      </div>
    </section>
  )
}

export default function DashboardPage() {
  const [core, setCore] = useState({ count: 0, rows: [], loading: true })
  const [research, setResearch] = useState({ count: 0, rows: [], loading: true })
  const [pricing, setPricing] = useState({ count: 0, rows: [], loading: true })
  const [marketing, setMarketing] = useState({ count: 0, rows: [], loading: true })
  const [chat, setChat] = useState({ count: 0, rows: [], loading: true })

  useEffect(() => {
    async function fetchAll() {
      const [c, r, p, m, ch] = await Promise.all([
        supabase
          .from('Core_Outputs')
          .select('id, created_at, idea, Output', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('research_outputs')
          .select('id, created_at, venture_idea, target_user', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('pricing_scenarios')
          .select('id, created_at, segment, tier, scenario, monthly_revenue', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('marketing_outputs')
          .select('id, created_at, product_name, brand', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(5),
        supabase
          .from('chat_logs')
          .select('id, created_at, message, guardrail_triggered, feedback', { count: 'exact' })
          .order('created_at', { ascending: false })
          .limit(5),
      ])

      setCore({ count: c.count ?? 0, rows: c.data ?? [], loading: false })
      setResearch({ count: r.count ?? 0, rows: r.data ?? [], loading: false })
      setPricing({ count: p.count ?? 0, rows: p.data ?? [], loading: false })
      setMarketing({ count: m.count ?? 0, rows: m.data ?? [], loading: false })
      setChat({ count: ch.count ?? 0, rows: ch.data ?? [], loading: false })
    }
    fetchAll()
  }, [])

  const allLoaded = !core.loading && !research.loading && !pricing.loading && !marketing.loading && !chat.loading
  const totalRows = core.count + research.count + pricing.count + marketing.count + chat.count

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 space-y-10">

        {/* Header */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            Week 6 — Final Integration
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Venture <span className="text-indigo-400">Dashboard</span>
          </h1>
          <p className="mx-auto max-w-2xl text-slate-400 leading-relaxed">
            Live data across all TalentBridge MX modules — everything your AI venture system has generated and saved to Supabase.
          </p>
        </section>

        {/* Project Status Strip */}
        <section className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
                Overall Venture Activity
              </p>
              <p className="text-5xl font-bold text-white">
                {allLoaded ? totalRows : <span className="text-slate-600">…</span>}
              </p>
              <p className="text-sm text-slate-400 mt-1.5">
                total records saved across 5 Supabase tables
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Core', count: core.count, color: 'text-violet-400', loading: core.loading },
                { label: 'Research', count: research.count, color: 'text-sky-400', loading: research.loading },
                { label: 'Pricing', count: pricing.count, color: 'text-amber-400', loading: pricing.loading },
                { label: 'Marketing', count: marketing.count, color: 'text-pink-400', loading: marketing.loading },
                { label: 'Chat', count: chat.count, color: 'text-emerald-400', loading: chat.loading },
              ].map(({ label, count, color, loading }) => (
                <div
                  key={label}
                  className="rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-center min-w-16"
                >
                  <p className={`text-2xl font-bold ${color}`}>
                    {loading ? <span className="text-slate-600 text-lg">…</span> : count}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Outputs */}
        <TableCard
          title="Core Outputs"
          tableName="Core_Outputs"
          badgeColor="violet"
          loading={core.loading}
          count={core.count}
        >
          <div className="space-y-3">
            {core.rows.map((row) => (
              <div key={row.id} className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 space-y-1.5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <p className="text-sm font-semibold text-white leading-snug flex-1 min-w-0">
                    {row.idea || <span className="italic text-slate-500">No idea text</span>}
                  </p>
                  <span className="text-xs text-slate-500 font-mono shrink-0">{fmtDate(row.created_at)}</span>
                </div>
                {row.Output && (
                  <p className="text-xs text-slate-500 truncate">
                    {(typeof row.Output === 'string' ? row.Output : JSON.stringify(row.Output)).slice(0, 140)}…
                  </p>
                )}
              </div>
            ))}
          </div>
        </TableCard>

        {/* Research Records */}
        <TableCard
          title="Research Records"
          tableName="research_outputs"
          badgeColor="sky"
          loading={research.loading}
          count={research.count}
        >
          <div className="space-y-3">
            {research.rows.map((row) => (
              <div key={row.id} className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 space-y-1">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-sm font-semibold text-white flex-1 truncate">
                    {row.venture_idea || <span className="italic text-slate-500">—</span>}
                  </p>
                  <span className="text-xs text-slate-500 font-mono shrink-0">{fmtDate(row.created_at)}</span>
                </div>
                {row.target_user && (
                  <p className="text-xs text-slate-400">
                    <span className="text-slate-600 mr-1">target user:</span>
                    {row.target_user}
                  </p>
                )}
              </div>
            ))}
          </div>
        </TableCard>

        {/* Pricing Scenarios */}
        <TableCard
          title="Pricing Scenarios"
          tableName="pricing_scenarios"
          badgeColor="amber"
          loading={pricing.loading}
          count={pricing.count}
        >
          <div className="space-y-3">
            {pricing.rows.map((row) => (
              <div key={row.id} className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3">
                <div className="flex flex-wrap items-center gap-2 justify-between">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{row.segment}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-sm text-slate-300">{row.tier}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold border ${
                      row.scenario === 'Conservative'
                        ? 'bg-amber-500/20 border-amber-500/30 text-amber-400'
                        : row.scenario === 'Aggressive'
                        ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                        : 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400'
                    }`}>
                      {row.scenario}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-bold text-amber-400">
                      {fmtMXN(row.monthly_revenue)}
                      <span className="text-xs font-normal text-slate-500">/mo</span>
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{fmtDate(row.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TableCard>

        {/* Marketing Campaigns */}
        <TableCard
          title="Marketing Campaigns"
          tableName="marketing_outputs"
          badgeColor="pink"
          loading={marketing.loading}
          count={marketing.count}
        >
          <div className="space-y-3">
            {marketing.rows.map((row) => (
              <div key={row.id} className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 space-y-1">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <p className="text-sm font-semibold text-white">
                    {row.product_name || 'TalentBridge MX'}
                  </p>
                  <span className="text-xs text-slate-500 font-mono shrink-0">{fmtDate(row.created_at)}</span>
                </div>
                {row.brand?.tagline && (
                  <p className="text-xs text-pink-300 italic">{row.brand.tagline}</p>
                )}
              </div>
            ))}
          </div>
        </TableCard>

        {/* Chat Logs */}
        <TableCard
          title="Chat Test Logs"
          tableName="chat_logs"
          badgeColor="emerald"
          loading={chat.loading}
          count={chat.count}
        >
          <div className="space-y-3">
            {chat.rows.map((log) => (
              <div key={log.id} className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs text-slate-500 font-mono">{fmtDate(log.created_at)}</span>
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
                      <span className="text-sm">{log.feedback === 'positive' ? '👍' : '👎'}</span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-300 truncate">
                  <span className="text-slate-600 text-xs mr-1">msg:</span>
                  {log.message || <span className="italic text-slate-600">—</span>}
                </p>
              </div>
            ))}
          </div>
        </TableCard>

      </div>
    </div>
  )
}
