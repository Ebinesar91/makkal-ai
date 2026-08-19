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

export function CoursesPage() {
  const navigate = useNavigate()

  const courses = [
    { title: 'Advanced Python & AI Coding', desc: 'Self-paced 6 weeks • Naan Mudhalvan Free', match: '94% Match' },
    { title: 'English Communication Skills', desc: 'Live labs 4 weeks • Free Certificate', match: '89% Match' },
    { title: 'SQL & Data Science Fundamentals', desc: 'Self-paced 8 weeks • Govt Certification', match: '91% Match' },
  ]

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.STUDENT.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">வகுப்புகள் / Free Courses</h1>
          <LangPill />
        </div>

        <div className="flex flex-col gap-3">
          {courses.map((c) => (
            <div
              key={c.title}
              onClick={() => navigate(ROUTES.STUDENT.CERTIFICATES)}
              className="flex cursor-pointer flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-teal"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-manrope text-[15px] font-bold text-ink">{c.title}</h3>
                  <p className="font-inter text-[12px] text-muted">{c.desc}</p>
                </div>
                <span className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 font-manrope text-[11px] font-bold text-[#15803d]">
                  {c.match}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-line pt-2 text-[11px]">
                <span className="font-manrope font-bold text-teal">Enroll Free →</span>
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
