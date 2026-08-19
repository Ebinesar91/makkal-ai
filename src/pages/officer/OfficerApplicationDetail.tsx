import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Icon, LangPill } from '../../components/chrome'
import { OFFICER_SIDEBAR_NAV } from '../../config/navigation'
import { ROUTES } from '../../config/routes'
import { useApp } from '../../state/AppState'

export function OfficerApplicationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { session, logout } = useApp()

  const app = session.applications.find((a) => a.id === id) || session.applications[0]

  return (
    <div className="flex min-h-svh flex-col bg-cream lg:flex-row">
      <aside className="flex w-full flex-col justify-between bg-navy p-6 lg:w-[260px]">
        <div>
          <p className="font-manrope text-[18px] font-extrabold text-white">AI Citizen</p>
          <p className="font-manrope text-[11px] font-bold uppercase text-gold">OFFICER PORTAL</p>
          <nav className="mt-6 flex flex-col gap-2">
            {OFFICER_SIDEBAR_NAV.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => navigate(it.path)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left font-manrope text-[13px] font-bold transition-all ${
                  location.pathname === it.path ? 'bg-white text-navy shadow-sm' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon name={it.icon} className="size-4" />
                <span>{session.lang === 'ta' ? it.ta : it.label}</span>
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
        <h1 className="font-manrope text-[24px] font-extrabold text-navy">
          Application Detail — {app?.id ?? 'A10231'}
        </h1>
        <p className="mt-1 font-inter text-[13px] text-muted">
          Citizen: {app?.citizenName ?? 'Priya Lakshmi'} • Submitted {app?.submittedAt ?? '2026-08-09'}
        </p>

        <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h3 className="font-manrope text-[16px] font-bold text-navy border-b border-line pb-3">
            Detailed Officer Inspection & Form Values
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 font-manrope text-[13px]">
            <div>
              <p className="text-muted">Applicant Name:</p>
              <p className="font-bold text-ink">{app?.citizenName}</p>
            </div>
            <div>
              <p className="text-muted">Current Status:</p>
              <p className="font-bold text-teal capitalize">{app?.status}</p>
            </div>
            <div>
              <p className="text-muted">SLA Commitment:</p>
              <p className="font-bold text-ink">{app?.slaDays} Days</p>
            </div>
            <div>
              <p className="text-muted">Document Verification:</p>
              <p className="font-bold text-[#15803d]">✓ Aadhaar Verified</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTES.OFFICER.DASHBOARD)}
          className="mt-6 rounded-xl border border-teal px-5 py-2.5 font-manrope text-[13px] font-bold text-teal hover:bg-mist"
        >
          ← Back to Officer Queue
        </button>
      </main>
    </div>
  )
}
