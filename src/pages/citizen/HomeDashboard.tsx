import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  BottomNav,
  BrandMini,
  HomeIndicator,
  Icon,
  LangPill,
  MatchBadge,
  PhoneShell,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { OPPORTUNITIES } from '../../lib/catalog'
import { recommend } from '../../lib/engine'
import { useApp } from '../../state/AppState'

export function HomeDashboard() {
  const navigate = useNavigate()
  const { session } = useApp()

  const isTa = session.lang === 'ta'
  const matches = session.profile ? recommend(session.profile, OPPORTUNITIES) : []
  const topMatches = matches.slice(0, 4)

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-6 pb-20">
        <StatusBar />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-line/40 pb-4">
          <div className="flex items-center gap-3">
            {!session.registered ? <BackButton to={ROUTES.LANDING} /> : null}
            <BrandMini />
          </div>
          <div className="flex items-center gap-3">
            {!session.registered ? (
              <button
                type="button"
                onClick={() => navigate(ROUTES.LANDING)}
                className="rounded-full border border-teal/40 bg-teal/10 px-3 py-1 font-manrope text-[11px] font-bold text-teal hover:bg-teal/20 transition-all"
              >
                {isTa ? '← முகப்பு' : '← Landing Page'}
              </button>
            ) : null}
            <LangPill size="sm" />
            <button
              type="button"
              onClick={() => navigate(ROUTES.CITIZEN.PROFILE)}
              className="flex size-10 items-center justify-center rounded-full bg-mist font-manrope font-bold text-navy text-[14px] hover:bg-line transition-all"
              title="Profile & Sign Out"
            >
              {session.profile.name[0]}
            </button>
          </div>
        </div>

        {/* Responsive Grid Layout for Desktop vs Mobile */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Left Column (Greeting, AI Guide, Quick Actions) */}
          <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
            {/* Greeting Banner */}
            <div className="rounded-3xl bg-navy p-6 sm:p-8 text-white shadow-md">
              <p className="font-manrope text-[12px] font-bold tracking-wider uppercase text-gold">
                {isTa ? 'வணக்கம்' : 'WELCOME'}
              </p>
              <h2 className="mt-1 font-manrope text-[24px] sm:text-[28px] font-extrabold">{session.profile.name}</h2>
              <p className="mt-1 font-inter text-[13px] sm:text-[14px] text-mist">
                {session.profile.district || session.profile.location} • {session.profile.occupation}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="font-manrope text-[13px] text-gold">
                  {isTa ? 'AI இயந்திர பொருத்தம்' : 'AI Engine Match Check'}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 font-manrope text-[12px] font-bold text-white">
                  {isTa ? `${matches.length} வாய்ப்புகள்` : `${matches.length} Matches Found`}
                </span>
              </div>
            </div>

            {/* AI Guide Prompt Card */}
            <button
              type="button"
              onClick={() => navigate(ROUTES.CITIZEN.AI_GUIDE)}
              className="flex items-center justify-between rounded-2xl border border-teal/30 bg-[#e6f4f8] p-5 text-left shadow-sm hover:border-teal transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-teal text-white shadow-sm">
                  <Icon name="cpu-teal.svg" className="size-6" />
                </div>
                <div>
                  <p className="font-manrope text-[16px] font-extrabold text-navy sm:text-[18px]">
                    {isTa ? 'AI வழிகாட்டியிடம் கேளுங்கள்' : 'Ask AI Guide Assistant'}
                  </p>
                  <p className="font-inter text-[13px] font-semibold text-teal">
                    {isTa ? 'தமிழ் அல்லது ஆங்கிலத்தில் துரித பதில்கள்' : 'Ask AI Assistant in Tamil / English'}
                  </p>
                </div>
              </div>
              <span className="text-[20px] font-bold text-teal">→</span>
            </button>

            {/* Quick Action Grid */}
            <div className="flex flex-col gap-3">
              <h3 className="font-manrope text-[16px] font-extrabold text-navy sm:text-[18px]">
                {isTa ? 'விரைவு சேவைகள்' : 'Quick Portals & Services'}
              </h3>
              <div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                {[
                  { label: 'திட்டங்கள்', en: 'Schemes', icon: '📜', path: ROUTES.CITIZEN.SCHEMES },
                  { label: 'சேவைகள்', en: 'Services', icon: '🏛️', path: ROUTES.CITIZEN.SERVICES },
                  { label: 'விண்ணப்பம்', en: 'Applications', icon: '📋', path: ROUTES.CITIZEN.APPLICATIONS },
                  { label: 'மாணவர்', en: 'Student', icon: '🎓', path: ROUTES.STUDENT.DASHBOARD },
                ].map((item) => (
                  <button
                    key={item.en}
                    type="button"
                    onClick={() => navigate(item.path)}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-teal hover:shadow-md transition-all"
                  >
                    <span className="text-[24px] sm:text-[28px]">{item.icon}</span>
                    <span className="font-manrope text-[12px] sm:text-[13px] font-bold text-ink">
                      {isTa ? item.label : item.en}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Top AI Scheme Matches) */}
          <div className="flex flex-col gap-4 lg:col-span-5 xl:col-span-4">
            <div className="flex items-center justify-between">
              <h3 className="font-manrope text-[16px] font-extrabold text-navy sm:text-[18px]">
                {isTa ? 'உங்களுக்கான வாய்ப்புகள்' : 'Top Profile Matches'}
              </h3>
              <button
                type="button"
                onClick={() => navigate(ROUTES.CITIZEN.MATCHES)}
                className="font-manrope text-[13px] font-bold text-teal hover:underline"
              >
                {isTa ? `அனைத்தையும் காண்க (${matches.length}) →` : `View All (${matches.length}) →`}
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {topMatches.map(({ opportunity, score, missingItems, missing }) => {
                const items = missingItems || missing || []
                return (
                  <div
                    key={opportunity.id}
                    onClick={() => navigate(ROUTES.CITIZEN.SCHEME_DETAIL(opportunity.id))}
                    className="flex cursor-pointer flex-col gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm hover:border-teal hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-manrope text-[15px] sm:text-[16px] font-bold text-ink">
                          {isTa && opportunity.tamil ? opportunity.tamil : opportunity.title}
                        </h4>
                        <p className="font-inter text-[12px] font-medium text-muted">{opportunity.department}</p>
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
        </div>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
