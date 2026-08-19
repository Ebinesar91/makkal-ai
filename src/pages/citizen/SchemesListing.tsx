import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  BottomNav,
  HomeIndicator,
  LangPill,
  MatchBadge,
  PhoneShell,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { OPPORTUNITIES } from '../../lib/catalog'
import { recommend } from '../../lib/engine'
import { useApp } from '../../state/AppState'

export function SchemesListing() {
  const navigate = useNavigate()
  const { session } = useApp()
  const isTa = session.lang === 'ta'
  const matches = recommend(session.profile, OPPORTUNITIES)

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">
            {isTa ? 'அரசு நலத்திட்டங்கள்' : 'State Government Schemes'}
          </h1>
          <LangPill />
        </div>

        <p className="font-manrope text-[13px] text-muted">
          {isTa ? 'உங்கள் சுயவிவரத்துடன் பொருந்திய அரசு வாய்ப்புகள்' : 'State government opportunities matched with your profile'}
        </p>

        <div className="flex flex-col gap-3">
          {matches.map(({ opportunity, score }) => (
            <div
              key={opportunity.id}
              onClick={() => navigate(ROUTES.CITIZEN.SCHEME_DETAIL(opportunity.id))}
              className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-teal"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-manrope text-[15px] font-bold text-ink">
                    {isTa && opportunity.tamil ? opportunity.tamil : opportunity.title}
                  </h3>
                  <p className="font-inter text-[12px] text-muted">{opportunity.department}</p>
                </div>
                <MatchBadge score={score} />
              </div>
              <p className="font-manrope text-[13px] text-muted line-clamp-2">{opportunity.summary}</p>
              <div className="flex items-center justify-between border-t border-line pt-2 text-[12px]">
                <span className="font-manrope text-faint">
                  {isTa ? `காலக்கெடு: ${opportunity.slaDays} நாட்கள்` : `SLA: ${opportunity.slaDays} Days`}
                </span>
                <span className="font-manrope font-bold text-teal">
                  {isTa ? 'விவரங்களை காண்க & விண்ணப்பிக்க →' : 'View & Apply →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
