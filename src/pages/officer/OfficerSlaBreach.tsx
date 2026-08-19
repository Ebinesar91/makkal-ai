import { useLocation, useNavigate } from 'react-router-dom'
import { Icon, LangPill } from '../../components/chrome'
import { OFFICER_SIDEBAR_NAV } from '../../config/navigation'
import { ROUTES } from '../../config/routes'
import { useApp } from '../../state/AppState'

export function OfficerSlaBreach() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session, logout } = useApp()

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
        <h1 className="font-manrope text-[24px] font-extrabold text-navy">மீறல் மேலாண்மை / Audit Management</h1>
        <p className="mt-1 font-inter text-[13px] text-muted">
          Escalation workflow for breached files & TNeGA audit logs
        </p>
        <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
          <p className="font-manrope text-[14px] leading-[1.6] text-ink">
            Escalation workflow for breached files: auto-assign to District Collector, notify citizen via SMS, and log corrective action with TNeGA audit trail.
          </p>
        </div>
      </main>
    </div>
  )
}
