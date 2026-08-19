import { ROUTES } from './routes'

export interface NavItem {
  id: string
  label: string
  ta: string
  path: string
  icon: string
}

export const CITIZEN_BOTTOM_NAV: NavItem[] = [
  { id: 'home', label: 'Home', ta: 'முகப்பு', path: ROUTES.CITIZEN.DASHBOARD, icon: '🏠' },
  { id: 'schemes', label: 'Schemes', ta: 'திட்டங்கள்', path: ROUTES.CITIZEN.SCHEMES, icon: '📜' },
  { id: 'ai', label: 'AI Guide', ta: 'AI வழிகாட்டி', path: ROUTES.CITIZEN.AI_GUIDE, icon: '🤖' },
  { id: 'profile', label: 'Profile', ta: 'சுயவிவரம்', path: ROUTES.CITIZEN.PROFILE, icon: '👤' },
]

export const OFFICER_SIDEBAR_NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', ta: 'கட்டுப்பாட்டகம்', path: ROUTES.OFFICER.DASHBOARD, icon: 'chart-line.svg' },
  { id: 'applications', label: 'Applications', ta: 'விண்ணப்பங்கள்', path: ROUTES.OFFICER.APPLICATIONS, icon: 'file-text.svg' },
  { id: 'sla', label: 'SLA Monitoring', ta: 'SLA கண்காணிப்பு', path: ROUTES.OFFICER.SLA, icon: 'calendar.svg' },
  { id: 'accountability', label: 'Accountability', ta: 'பொறுப்புடைமை', path: ROUTES.OFFICER.ACCOUNTABILITY, icon: 'user.svg' },
  { id: 'sla-breach', label: 'Audit Management', ta: 'மீறல் மேலாண்மை', path: ROUTES.OFFICER.SLA_BREACH, icon: 'shield.svg' },
]

export const OPERATOR_SIDEBAR_NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', ta: 'கட்டுப்பாட்டகம்', path: ROUTES.OPERATOR.DASHBOARD, icon: 'chart-line.svg' },
  { id: 'assisted', label: 'Citizen Session', ta: 'உதவி சேவை', path: ROUTES.OPERATOR.ASSISTED, icon: 'user.svg' },
]
