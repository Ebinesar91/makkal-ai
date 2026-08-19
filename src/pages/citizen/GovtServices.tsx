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

export function GovtServices() {
  const navigate = useNavigate()
  const { session } = useApp()
  const isTa = session.lang === 'ta'

  const services = [
    { id: '1', title: isTa ? 'சாதிச் சான்றிதழ்' : 'Community Certificate', dept: isTa ? 'வருவாய்த்துறை' : 'Revenue Dept', tag: isTa ? '3 நாட்கள்' : 'Fast-track 3 days', path: ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop') },
    { id: '2', title: isTa ? 'வருமானச் சான்றிதழ்' : 'Income Certificate', dept: isTa ? 'வருவாய்த்துறை' : 'Revenue Dept', tag: isTa ? 'ஆண்டு புதுப்பித்தல்' : 'Annual renewal', path: ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop') },
    { id: '3', title: isTa ? 'இருப்பிடச் சான்றிதழ்' : 'Nativity Certificate', dept: isTa ? 'இ-சேவை மையம்' : 'e-Sevai Portal', tag: isTa ? 'ஆன்லைன் சரிபார்ப்பு' : 'Online Verification', path: ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop') },
    { id: '4', title: isTa ? 'முதலமைச்சரின் காப்பீட்டு அட்டை' : 'CMCHIS Health Card', dept: isTa ? 'சுகாதாரத் துறை' : 'Health Dept', tag: isTa ? 'குடும்பக் காப்பீடு' : 'Family entitlement', path: ROUTES.CITIZEN.HEALTHCARE },
  ]

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-4 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">
            {isTa ? 'அரசு சேவைகள்' : 'Government Services'}
          </h1>
          <LangPill />
        </div>

        <div className="flex flex-col gap-3">
          {services.map((s) => (
            <div
              key={s.id}
              onClick={() => navigate(s.path)}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-teal"
            >
              <div>
                <h3 className="font-manrope text-[15px] font-bold text-ink">{s.title}</h3>
                <p className="font-inter text-[12px] text-muted">{s.dept}</p>
              </div>
              <span className="rounded-full bg-mist px-3 py-1 font-manrope text-[11px] font-bold text-teal">
                {s.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
