import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CITIZEN_BOTTOM_NAV } from '../config/navigation'
import { ROUTES } from '../config/routes'
import { useApp } from '../state/AppState'

export function Icon({ name, className = 'size-6' }: { name: string; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 overflow-clip ${className}`}>
      <img src={`/assets/${name}`} alt="" className="size-full" />
    </span>
  )
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-xl bg-navy">
        <Icon name="cpu.svg" className="size-6" />
      </div>
      <div className="leading-normal">
        <p className="font-manrope text-[18px] font-extrabold text-navy">AI Citizen</p>
        {!compact ? <p className="font-inter text-[12px] font-bold text-gold">மக்கள AI</p> : null}
      </div>
    </div>
  )
}

export function RoleHeader() {
  return null
}

export function StatusBar() {
  return (
    <div className="flex h-[44px] items-center justify-between px-6 pt-3 text-[14px] font-semibold text-ink sm:hidden">
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[12px]">📶</span>
        <span className="text-[12px]">📡</span>
        <span className="text-[12px]">🔋</span>
      </div>
    </div>
  )
}

export function PhoneShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className="min-h-svh bg-cream text-ink px-4 py-4 sm:px-6 sm:py-8 lg:px-12 lg:py-10">
      <div className={`mx-auto flex w-full max-w-md sm:max-w-2xl lg:max-w-5xl xl:max-w-6xl flex-col bg-cream ${className}`}>
        {children}
      </div>
    </div>
  )
}

export function HomeIndicator() {
  return (
    <div className="flex h-5 items-center justify-center pb-2 sm:hidden">
      <div className="h-1 w-32 rounded-full bg-slate-400" />
    </div>
  )
}

export function BackButton({ to }: { to?: string }) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (to) {
      navigate(to)
    } else if (window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate(ROUTES.LANDING)
    }
  }

  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex size-9 items-center justify-center rounded-full bg-mist text-[14px] font-bold text-navy hover:bg-line cursor-pointer"
      aria-label="Go Back"
    >
      ←
    </button>
  )
}

export function BrandMini() {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate(ROUTES.LANDING)}>
      <div className="flex size-7 items-center justify-center rounded-lg bg-navy font-black text-[11px] text-white">
        AI
      </div>
      <p className="font-manrope text-[14px] font-extrabold text-navy">மக்கள AI</p>
    </div>
  )
}

export function LangPill({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { session, setLang } = useApp()
  return (
    <button
      type="button"
      onClick={() => setLang(session.lang === 'en' ? 'ta' : 'en')}
      className={`rounded-full border border-teal font-manrope font-bold text-teal ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-[11px]'
      }`}
    >
      {session.lang === 'en' ? 'EN / தமிழ்' : 'தமிழ் / EN'}
    </button>
  )
}

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { session } = useApp()

  return (
    <div className="grid grid-cols-4 border-t border-line bg-white py-2 text-center font-manrope text-[10px]">
      {CITIZEN_BOTTOM_NAV.map((it) => {
        const active = location.pathname === it.path
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => navigate(it.path)}
            className={`flex flex-col items-center gap-1 font-bold ${active ? 'text-teal' : 'text-muted'}`}
          >
            <span className="text-[16px]">{it.icon}</span>
            <span>{session.lang === 'ta' ? it.ta : it.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function PrimaryButton({ children, to, onClick }: { children: ReactNode; to?: string; onClick?: () => void }) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick()
        if (to) navigate(to)
      }}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[15px] font-bold text-white shadow-md hover:bg-teal/90"
    >
      {children}
    </button>
  )
}

export function PageTitle({ en, ta, sub }: { en: string; ta: string; sub?: string }) {
  const { session } = useApp()
  return (
    <div className="mb-6">
      <h1 className="font-manrope text-[22px] font-extrabold text-navy sm:text-[28px]">
        {session.lang === 'ta' ? ta : en}
      </h1>
      {sub ? <p className="mt-1 font-manrope text-[14px] text-muted">{sub}</p> : null}
    </div>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-white p-4 sm:p-5 ${className}`}>{children}</div>
}

export function MatchBadge({ score }: { score: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[#dcfce7] px-2 py-1 font-manrope text-[11px] font-bold text-[#15803d]">
      <Icon name="star.svg" className="size-3" />
      {score}% possible match
    </span>
  )
}
