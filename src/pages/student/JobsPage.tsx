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

export function JobsPage() {
  const navigate = useNavigate()

  const jobs = [
    { title: 'TNPSC Group IV Free Coaching Path', dept: 'State Coaching Board', match: 88, tag: 'Government Seat' },
    { title: 'Naan Mudhalvan Placement Drive', dept: 'TNeGA Campus Link', match: 92, tag: 'Campus Placement' },
  ]

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.STUDENT.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">வேலைவாய்ப்பு / Job Matching</h1>
          <LangPill />
        </div>

        <div className="flex flex-col gap-3">
          {jobs.map((j) => (
            <div key={j.title} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-manrope text-[15px] font-bold text-ink">{j.title}</h3>
                  <p className="font-inter text-[12px] text-muted">{j.dept}</p>
                </div>
                <MatchBadge score={j.match} />
              </div>
              <div className="flex items-center justify-between border-t border-line pt-2 text-[11px]">
                <span className="font-manrope text-teal font-bold">{j.tag}</span>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop'))}
                  className="font-manrope font-bold text-teal hover:underline"
                >
                  View Placement Details →
                </button>
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
