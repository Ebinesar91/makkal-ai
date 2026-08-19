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
import { useApp } from '../../state/AppState'

export function SkillGapPage() {
  const navigate = useNavigate()
  const { session } = useApp()

  const skills = [
    { name: 'Python Programming', current: 'Intermediate', gap: 'Low Gap', status: 'Ready for Internships' },
    { name: 'SQL & Database Queries', current: 'Basic', gap: 'Medium Gap', status: 'Recommended Practice' },
    { name: 'React Frontend', current: 'Intermediate', gap: 'Low Gap', status: 'Ready for Junior Dev' },
  ]

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.STUDENT.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">திறன் இடைவெளி / Skill Gap</h1>
          <LangPill />
        </div>

        <p className="font-manrope text-[13px] text-muted">
          AI analysis comparing your profile skills ({session.profile.skills.join(', ')}) vs state job demand
        </p>

        <div className="flex flex-col gap-3">
          {skills.map((s) => (
            <div key={s.name} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-manrope text-[15px] font-bold text-ink">{s.name}</h3>
                  <p className="font-inter text-[12px] text-muted">Current level: {s.current}</p>
                </div>
                <span className="rounded-full bg-teal/10 px-2.5 py-0.5 font-manrope text-[11px] font-bold text-teal">
                  {s.gap}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-2 text-[11px]">
                <span className="font-manrope font-semibold text-navy">{s.status}</span>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.STUDENT.INTERNSHIPS)}
                  className="font-manrope font-bold text-teal hover:underline"
                >
                  View Internships →
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
