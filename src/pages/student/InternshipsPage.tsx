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

export function InternshipsPage() {
  const navigate = useNavigate()

  const internships = [
    { id: 'int-1', title: 'Junior React Dev Intern', stipend: '₹15,000 / month', loc: 'Madurai / Remote', match: 91, req: 'React, TypeScript' },
    { id: 'int-2', title: 'Data Analytics Trainee', stipend: '₹18,000 / month', loc: 'Chennai', match: 94, req: 'Python, SQL, Excel' },
  ]

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.STUDENT.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">பயிற்சி வேலை / Internships</h1>
          <LangPill />
        </div>

        <div className="flex flex-col gap-3">
          {internships.map((int) => (
            <div key={int.id} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-manrope text-[15px] font-bold text-ink">{int.title}</h3>
                  <p className="font-inter text-[12px] text-muted">{int.stipend} • {int.loc}</p>
                </div>
                <MatchBadge score={int.match} />
              </div>
              <p className="font-inter text-[12px] text-faint">Required: {int.req}</p>
              <button
                type="button"
                onClick={() => navigate(ROUTES.CITIZEN.SCHEME_DETAIL('int-data'))}
                className="mt-1 rounded-xl bg-teal py-2.5 font-manrope text-[13px] font-bold text-white shadow-sm hover:bg-teal/90"
              >
                Apply for Internship →
              </button>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
