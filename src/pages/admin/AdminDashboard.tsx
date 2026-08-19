import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LangPill } from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { OPPORTUNITIES } from '../../lib/catalog'
import { useApp } from '../../state/AppState'

export function AdminDashboard() {
  const navigate = useNavigate()
  const { session, logout } = useApp()
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'schemes' | 'officers' | 'audit'>('overview')

  return (
    <div className="flex min-h-svh flex-col bg-cream lg:flex-row">
      <aside className="flex w-full flex-col justify-between bg-navy p-6 lg:w-[260px]">
        <div>
          <p className="font-manrope text-[18px] font-extrabold text-white">AI Citizen</p>
          <p className="font-manrope text-[11px] font-bold uppercase text-gold">ADMIN CONSOLE</p>

          <nav className="mt-6 flex flex-col gap-2">
            {[
              ['overview', '📊 Overview'],
              ['users', '👥 User Directory'],
              ['schemes', '📜 Schemes & Rules'],
              ['officers', '🛡️ Officer Workload'],
              ['audit', '🔒 Security Audit'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-manrope text-[13px] font-bold transition-all ${
                  activeTab === id ? 'bg-white text-navy shadow-sm' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <LangPill />
          <button type="button" onClick={() => { logout(); navigate(ROUTES.LANDING) }} className="rounded-lg bg-white/10 px-3 py-2 text-left font-manrope text-[12px] font-bold text-white">
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-6 sm:p-8">
        <h1 className="font-manrope text-[24px] font-extrabold text-navy capitalize">
          Admin Portal — {activeTab}
        </h1>
        <p className="mt-1 font-inter text-[13px] text-muted">
          Tamil Nadu e-Governance Platform Management & System Controls
        </p>

        {activeTab === 'overview' ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p className="font-inter text-[12px] font-bold text-muted">TOTAL CITIZENS</p>
              <p className="mt-1 font-manrope text-[28px] font-extrabold text-navy">45,21,980</p>
              <p className="mt-1 font-inter text-[11px] text-[#15803d]">↑ +12% this month</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p className="font-inter text-[12px] font-bold text-muted">ACTIVE SCHEMES</p>
              <p className="mt-1 font-manrope text-[28px] font-extrabold text-teal">124</p>
              <p className="mt-1 font-inter text-[11px] text-muted">Across 18 state depts</p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p className="font-inter text-[12px] font-bold text-muted">AI MATCH ACCURACY</p>
              <p className="mt-1 font-manrope text-[28px] font-extrabold text-gold">98.4%</p>
              <p className="mt-1 font-inter text-[11px] text-[#15803d]">Rule Engine Healthy</p>
            </div>
          </div>
        ) : null}

        {activeTab === 'schemes' ? (
          <div className="mt-6 flex flex-col gap-3">
            {OPPORTUNITIES.map((opp) => (
              <div key={opp.id} className="flex items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-sm">
                <div>
                  <h3 className="font-manrope text-[15px] font-bold text-ink">{opp.title}</h3>
                  <p className="font-inter text-[12px] text-muted">{opp.dept} • SLA {opp.slaDays} Days</p>
                </div>
                <button type="button" className="rounded-lg bg-teal/10 px-3 py-1.5 font-manrope text-[12px] font-bold text-teal">
                  Edit Rules
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === 'audit' ? (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white shadow-sm">
            <table className="w-full text-left font-manrope text-[13px]">
              <thead className="border-b border-line bg-mist text-[12px] font-extrabold uppercase text-muted">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {session.auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-line">
                    <td className="p-4 text-muted">{log.timestamp}</td>
                    <td className="p-4 font-bold text-navy">{log.actor}</td>
                    <td className="p-4 font-semibold text-teal">{log.action}</td>
                    <td className="p-4 text-ink">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </main>
    </div>
  )
}
