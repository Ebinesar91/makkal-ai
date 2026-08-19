import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon, LangPill } from '../../components/chrome'
import { OFFICER_SIDEBAR_NAV } from '../../config/navigation'
import { ROUTES } from '../../config/routes'
import { parseOfficerFilter } from '../../lib/engine'
import type { Application } from '../../lib/types'
import { useApp } from '../../state/AppState'

export function OfficerDashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session, setAppStatus, logout } = useApp()

  const [searchQuery, setSearchQuery] = useState('')
  const [reviewApp, setReviewApp] = useState<Application | null>(null)
  const parsed = searchQuery ? parseOfficerFilter(searchQuery) : null

  let filteredApps = session.applications
  if (parsed?.breachedOnly) {
    filteredApps = filteredApps.filter((a) => a.daysPending > a.slaDays * 0.7)
  }
  if (parsed?.daysPendingMin) {
    filteredApps = filteredApps.filter((a) => a.daysPending >= (parsed.daysPendingMin ?? 0))
  }

  return (
    <div className="flex min-h-svh flex-col bg-cream lg:flex-row">
      {/* Sidebar */}
      <aside className="flex w-full flex-col justify-between bg-navy p-6 lg:w-[260px]">
        <div>
          <p className="font-manrope text-[18px] font-extrabold text-white">AI Citizen</p>
          <p className="font-manrope text-[11px] font-bold uppercase text-gold">OFFICER PORTAL</p>

          <nav className="mt-6 flex flex-col gap-2">
            {OFFICER_SIDEBAR_NAV.map((it) => {
              const active = location.pathname === it.path
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => navigate(it.path)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-manrope text-[13px] font-bold transition-all ${
                    active ? 'bg-white text-navy shadow-sm' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <Icon name={it.icon} className="size-4" />
                  <span>{session.lang === 'ta' ? it.ta : it.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <LangPill />
          <button
            type="button"
            onClick={() => { logout(); navigate(ROUTES.LANDING) }}
            className="rounded-lg bg-white/10 px-3 py-2 text-left font-manrope text-[12px] font-bold text-white hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="min-w-0 flex-1 p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-manrope text-[24px] font-extrabold text-navy">
              அதிகாரி கட்டுப்பாட்டகம் / Officer Queue
            </h1>
            <p className="font-inter text-[13px] text-muted">
              Higher Education & State Welfare Officer Review Portal (K. Rajendran, IAS)
            </p>
          </div>
        </div>

        {/* Natural Language AI Filter */}
        <div className="mb-6 rounded-2xl border border-line bg-white p-5 shadow-sm">
          <label className="flex flex-col gap-2">
            <span className="font-manrope text-[13px] font-bold text-navy">
              🤖 Natural Language AI Query Filter:
            </span>
            <div className="flex items-center gap-2 rounded-xl border border-line bg-cream p-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. 'Show applications pending for more than 5 days' or 'SLA breached'"
                className="flex-1 px-2 font-inter text-[14px] text-ink outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setSearchQuery('Show applications pending for more than 5 days')}
                className="rounded-lg bg-teal px-3 py-1.5 font-manrope text-[12px] font-bold text-white"
              >
                Sample Query
              </button>
            </div>
          </label>

          {parsed && parsed.summary.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
              <span className="font-manrope text-[11px] font-bold text-faint">Active Filters:</span>
              {parsed.summary.map((s) => (
                <span key={s} className="rounded-full bg-teal/10 px-2.5 py-0.5 font-manrope text-[11px] font-bold text-teal">
                  {s}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {/* Queue Table */}
        <div className="overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
          <table className="w-full text-left font-manrope text-[13px]">
            <thead className="border-b border-line bg-mist text-[12px] font-extrabold uppercase text-muted">
              <tr>
                <th className="p-4">App ID</th>
                <th className="p-4">Citizen</th>
                <th className="p-4">Status</th>
                <th className="p-4">Days Pending</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id} className="border-b border-line hover:bg-mist/50">
                  <td className="p-4 font-bold text-navy">{app.id}</td>
                  <td className="p-4 font-semibold text-ink">{app.citizenName}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-0.5 font-manrope text-[11px] font-bold ${
                      app.status === 'approved' ? 'bg-[#dcfce7] text-[#15803d]' : app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber text-gold'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-muted">{app.daysPending} / {app.slaDays} days</td>
                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => setReviewApp(app)}
                      className="rounded-lg bg-teal px-3 py-1.5 font-manrope text-[12px] font-bold text-white shadow-sm hover:bg-teal/90"
                    >
                      Review & Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Review Modal */}
        {reviewApp ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm">
            <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <h3 className="font-manrope text-[18px] font-extrabold text-navy">
                  Application Review — {reviewApp.id}
                </h3>
                <button type="button" onClick={() => setReviewApp(null)} className="font-bold text-muted">✕</button>
              </div>

              <div className="flex flex-col gap-2 text-[13px]">
                <p>Citizen: <span className="font-bold">{reviewApp.citizenName}</span></p>
                <p>Status: <span className="font-bold text-teal capitalize">{reviewApp.status}</span></p>
                <p>Rule Engine Evaluation: <span className="font-bold text-[#15803d]">3/4 prerequisites verified</span></p>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => { setAppStatus(reviewApp.id, 'rejected'); setReviewApp(null) }}
                  className="rounded-xl bg-red-100 px-4 py-2 font-manrope text-[13px] font-bold text-red-700 hover:bg-red-200"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => { setAppStatus(reviewApp.id, 'approved'); setReviewApp(null) }}
                  className="rounded-xl bg-[#15803d] px-5 py-2 font-manrope text-[13px] font-bold text-white shadow-md hover:bg-[#15803d]/90"
                >
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
