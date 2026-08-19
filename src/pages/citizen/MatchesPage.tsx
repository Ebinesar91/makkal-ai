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

export function MatchesPage() {
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
            {isTa ? 'AI வாய்ப்புகள்' : 'AI Profile Matches'}
          </h1>
          <LangPill />
        </div>

        <p className="font-manrope text-[13px] text-muted">
          {isTa ? `${session.profile.name} அவர்களுக்கான பரிந்துரைக்கப்பட்ட திட்டங்கள்` : `All state schemes and opportunities ranked for ${session.profile.name}`}
        </p>

        <div className="flex flex-col gap-3">
          {matches.map(({ opportunity, score, missingItems, missing }) => {
            const items = missingItems || missing || []
            return (
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
                {items.length > 0 ? (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-700">
                    <span>⚠</span>
                    <span>{items[0]}</span>
                  </div>
                ) : (
                  <span className="font-manrope text-[11px] font-semibold text-[#15803d]">
                    {isTa ? '✓ அனைத்து தேவைகளும் பூர்த்தி செய்யப்பட்டன' : '✓ All prerequisites satisfied'}
                  </span>
                )}
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
