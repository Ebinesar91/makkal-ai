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

export function ScholarshipsPage() {
  const navigate = useNavigate()

  const scholarships = [
    { title: 'Post-Matric Minority Scholarship', dept: 'NSP Portal', tag: 'Open', closing: 'Closes 30 Apr', to: ROUTES.CITIZEN.SCHEME_DETAIL('sch-vidyalaxmi') },
    { title: 'Pudhumai Penn Monthly Scheme', dept: 'Social Welfare Dept', tag: 'Eligible', closing: 'Ongoing', to: ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop') },
    { title: 'UGC First Gen Graduate Scholarship', dept: 'Higher Education', tag: 'Eligible', closing: 'Closes 12 May', to: ROUTES.CITIZEN.SCHEME_DETAIL('sch-vidyalaxmi') },
  ]

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.STUDENT.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">கல்வித்தொகை / Scholarships</h1>
          <LangPill />
        </div>

        <div className="flex flex-col gap-3">
          {scholarships.map((s) => (
            <div
              key={s.title}
              onClick={() => navigate(s.to)}
              className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-teal"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-manrope text-[15px] font-bold text-ink">{s.title}</h3>
                  <p className="font-inter text-[12px] text-muted">{s.dept}</p>
                </div>
                <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-manrope text-[11px] font-bold text-teal">
                  {s.tag}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-2 text-[11px]">
                <span className="font-manrope text-faint">{s.closing}</span>
                <span className="font-manrope font-bold text-teal">Apply Now →</span>
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
