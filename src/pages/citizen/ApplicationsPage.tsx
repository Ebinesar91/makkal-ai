import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  BottomNav,
  HomeIndicator,
  LangPill,
  PhoneShell,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { OPPORTUNITIES } from '../../lib/catalog'
import { useApp } from '../../state/AppState'

export function ApplicationsPage() {
  const navigate = useNavigate()
  const { session } = useApp()
  const isTa = session.lang === 'ta'

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">
            {isTa ? 'என் விண்ணப்பங்கள்' : 'My Applications'}
          </h1>
          <LangPill />
        </div>

        <p className="font-manrope text-[13px] text-muted">
          {isTa ? 'உங்கள் விண்ணப்பங்களின் தற்போதைய நிலை மற்றும் முன்னேற்றம்' : 'Track real-time status & SLA progress for your applications'}
        </p>

        <div className="flex flex-col gap-3">
          {session.applications.map((app) => {
            const opp = OPPORTUNITIES.find((o) => o.id === app.opportunityId)
            const title = isTa && opp?.tamil ? opp.tamil : (opp?.title ?? app.id)
            const statusLabel = isTa
              ? (app.status === 'approved' ? 'ஒப்புதல் அளிக்கப்பட்டது' : app.status === 'rejected' ? 'நிராகரிக்கப்பட்டது' : 'பரிசீலனையில்')
              : app.status.toUpperCase()

            return (
              <div
                key={app.id}
                onClick={() => navigate(ROUTES.CITIZEN.APPLICATION_DETAIL(app.id))}
                className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-teal"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-manrope text-[15px] font-bold text-ink">{title}</h3>
                    <p className="font-inter text-[12px] text-muted">
                      {isTa ? `சமர்ப்பிக்கப்பட்ட நாள்: ${app.submittedAt}` : `Submitted on ${app.submittedAt}`}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 font-manrope text-[11px] font-bold ${
                    app.status === 'approved' ? 'bg-[#dcfce7] text-[#15803d]' : app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber text-gold'
                  }`}>
                    {statusLabel}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-line pt-2 text-[11px]">
                  <span className="font-manrope text-faint">ID: {app.id}</span>
                  <span className="font-manrope font-bold text-teal">
                    {isTa ? 'காலவரிசையைக் காண்க →' : 'View Timeline →'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
