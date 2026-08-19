import { useNavigate } from 'react-router-dom'
import { LangPill } from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { useApp } from '../../state/AppState'

export function SuperAdminDashboard() {
  const navigate = useNavigate()
  const { logout } = useApp()

  return (
    <div className="flex min-h-svh flex-col bg-cream lg:flex-row">
      <aside className="flex w-full flex-col justify-between bg-navy p-6 lg:w-[260px]">
        <div>
          <p className="font-manrope text-[18px] font-extrabold text-white">AI Citizen</p>
          <p className="font-manrope text-[11px] font-bold uppercase text-gold">SUPER ADMIN MASTER</p>
          <nav className="mt-6 flex flex-col gap-2 font-manrope text-[13px] font-bold text-white">
            <div className="rounded-lg bg-white/20 px-3 py-2.5">⚡ Master RBAC Matrix</div>
            <div className="rounded-lg bg-white/10 px-3 py-2.5">🏛️ Department Provisioning</div>
            <div className="rounded-lg bg-white/10 px-3 py-2.5">🔒 Infrastructure Security</div>
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
          Super Admin Architecture Controls
        </h1>
        <p className="mt-1 font-inter text-[13px] text-muted">
          Master access control, RBAC policy overrides, and infrastructure health monitoring
        </p>

        <div className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h3 className="font-manrope text-[16px] font-bold text-navy border-b border-line pb-3">
            Role-Based Access Control (RBAC) Enforcement
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-4 font-manrope text-[13px]">
            <div className="rounded-xl border border-line p-4">
              <p className="font-bold text-navy">Citizen Portal</p>
              <p className="text-[12px] text-muted">Access: Self-registration & AI scheme matching</p>
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="font-bold text-navy">Officer Portal</p>
              <p className="text-[12px] text-muted">Access: Queue evaluation, approval & SLA tracking</p>
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="font-bold text-navy">Operator Console</p>
              <p className="text-[12px] text-muted">Access: Walk-in counter sessions & assisted entry</p>
            </div>
            <div className="rounded-xl border border-line p-4">
              <p className="font-bold text-navy">Admin / Super Admin</p>
              <p className="text-[12px] text-muted">Access: Full rule management & audit log inspect</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
