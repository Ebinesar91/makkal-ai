import { useNavigate, useParams } from 'react-router-dom'
import {
  BackButton,
  HomeIndicator,
  LangPill,
  PhoneShell,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { OPPORTUNITIES } from '../../lib/catalog'
import { useApp } from '../../state/AppState'

export function ApplicationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { session } = useApp()

  const app = session.applications.find((a) => a.id === id) || session.applications[0]
  const opp = OPPORTUNITIES.find((o) => o.id === app?.opportunityId)

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-5 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.APPLICATIONS} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">விண்ணப்ப நிலை / Status</h1>
          <LangPill />
        </div>

        {/* Application Header */}
        <div className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-inter text-[12px] font-bold text-teal">ID: {app.id}</p>
              <h2 className="font-manrope text-[18px] font-extrabold text-navy">{opp?.title ?? 'Service Application'}</h2>
            </div>
            <span className={`rounded-full px-3 py-1 font-manrope text-[12px] font-bold ${
              app.status === 'approved' ? 'bg-[#dcfce7] text-[#15803d]' : app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber text-gold'
            }`}>
              {app.status}
            </span>
          </div>
          <p className="font-inter text-[12px] text-muted">{opp?.department} • Submitted {app.submittedAt}</p>
        </div>

        {/* Timeline Status */}
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-5">
          <h3 className="font-manrope text-[15px] font-bold text-navy border-b border-line pb-2">
            செயல்முறை நிலை / Timeline Tracker
          </h3>
          <div className="flex flex-col gap-4 pl-2">
            <div className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-teal text-white font-bold text-[12px]">✓</div>
              <div>
                <p className="font-manrope text-[13px] font-bold text-ink">Application Submitted</p>
                <p className="font-inter text-[11px] text-muted">Aadhaar verified submission</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-teal text-white font-bold text-[12px]">✓</div>
              <div>
                <p className="font-manrope text-[13px] font-bold text-ink">Document Verification</p>
                <p className="font-inter text-[11px] text-muted">All required attachments checked by AI engine</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`flex size-6 items-center justify-center rounded-full font-bold text-[12px] ${
                app.status === 'under-review' ? 'bg-amber text-gold animate-pulse' : 'bg-mist text-muted'
              }`}>
                ●
              </div>
              <div>
                <p className="font-manrope text-[13px] font-bold text-ink">Officer Decision Pending</p>
                <p className="font-inter text-[11px] text-muted">Under review by assigned officer (SLA {app.slaDays} Days)</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(ROUTES.CITIZEN.APPLICATIONS)}
          className="rounded-xl border border-teal py-3.5 font-manrope text-[14px] font-bold text-teal hover:bg-mist"
        >
          ← Back to All Applications
        </button>
      </div>

      <HomeIndicator />
    </PhoneShell>
  )
}
