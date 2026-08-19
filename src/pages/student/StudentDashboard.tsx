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

export function StudentDashboard() {
  const navigate = useNavigate()
  const { session } = useApp()

  const studentLinks = [
    { title: 'கல்வித்தொகை / Scholarships', body: 'Post-Matric, Pudhumai Penn, UGC Merit support', to: ROUTES.STUDENT.SCHOLARSHIPS, icon: '🎓' },
    { title: 'சான்றிதழ் / Certificate OCR', body: 'Extract skills automatically into your profile', to: ROUTES.STUDENT.CERTIFICATES, icon: '📜' },
    { title: 'திறன் இடைவெளி / Skill Analysis', body: 'Evaluate Python, SQL, React vs demand', to: ROUTES.STUDENT.SKILLS, icon: '⚡' },
    { title: 'வகுப்புகள் / Free Courses', body: 'Naan Mudhalvan AI & Python labs', to: ROUTES.STUDENT.COURSES, icon: '📚' },
    { title: 'பயிற்சி வேலை / Internships', body: 'Matched internships & stipends', to: ROUTES.STUDENT.INTERNSHIPS, icon: '💼' },
    { title: 'வேலைவாய்ப்பு / Job Openings', body: 'State campus placement & Group IV paths', to: ROUTES.STUDENT.JOBS, icon: '🚀' },
  ]

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-6 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between border-b border-line/40 pb-4">
          <BackButton to={ROUTES.LANDING} />
          <h1 className="font-manrope text-[20px] sm:text-[22px] font-extrabold text-navy">மாணவர் தளம் / Student Hub</h1>
          <LangPill />
        </div>

        {/* Student Status Summary */}
        <div className="rounded-3xl bg-navy p-6 sm:p-8 text-white shadow-md">
          <p className="font-manrope text-[12px] font-bold text-gold uppercase tracking-wider">STUDENT TRACKER</p>
          <h2 className="mt-1 font-manrope text-[22px] sm:text-[26px] font-extrabold">{session.profile.name}</h2>
          <p className="mt-1 font-inter text-[13px] sm:text-[14px] text-mist">{session.profile.education} • {session.profile.district || session.profile.location}</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-[#dcfce7] px-3 py-1 font-manrope text-[12px] font-bold text-[#15803d]">
              Attendance: 92% (Scheme Eligible)
            </span>
          </div>
        </div>

        {/* Responsive Grid for Student Modules */}
        <div className="flex flex-col gap-4">
          <h3 className="font-manrope text-[18px] font-extrabold text-navy">சேவைகள் & கருவிகள் / Student Modules</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studentLinks.map((item) => (
              <div
                key={item.title}
                onClick={() => navigate(item.to)}
                className="flex cursor-pointer flex-col justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-sm hover:border-teal hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-[32px]">{item.icon}</span>
                  <div>
                    <h3 className="font-manrope text-[16px] font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 font-inter text-[12px] text-muted leading-relaxed">{item.body}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end font-manrope text-[13px] font-bold text-teal">
                  Explore →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
