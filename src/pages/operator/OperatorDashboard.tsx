import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, LangPill } from '../../components/chrome'
import { OPERATOR_SIDEBAR_NAV } from '../../config/navigation'
import { ROUTES } from '../../config/routes'
import { OPPORTUNITIES } from '../../lib/catalog'
import { useApp } from '../../state/AppState'

export function OperatorDashboard() {
  const navigate = useNavigate()
  const { session, startOperatorSession, endOperatorSession, logout } = useApp()
  const [nameInput, setNameInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')

  const handleStartSession = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameInput.trim()) return
    startOperatorSession(nameInput, phoneInput)
  }

  return (
    <div className="flex min-h-svh flex-col bg-cream lg:flex-row">
      {/* Operator Sidebar */}
      <aside className="flex w-full flex-col justify-between bg-navy p-6 lg:w-[260px]">
        <div>
          <p className="font-manrope text-[18px] font-extrabold text-white">AI Citizen</p>
          <p className="font-manrope text-[11px] font-bold uppercase text-gold">OPERATOR CONSOLE</p>

          <nav className="mt-6 flex flex-col gap-2">
            {OPERATOR_SIDEBAR_NAV.map((it) => (
              <button
                key={it.id}
                type="button"
                onClick={() => navigate(it.path)}
                className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-2.5 text-left font-manrope text-[13px] font-bold text-white hover:bg-white/20"
              >
                <Icon name={it.icon} className="size-4" />
                <span>{session.lang === 'ta' ? it.ta : it.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <LangPill />
          <button
            type="button"
            onClick={() => { logout(); navigate(ROUTES.LANDING) }}
            className="rounded-lg bg-white/10 px-3 py-2 text-left font-manrope text-[12px] font-bold text-white hover:bg-white/20"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-manrope text-[24px] font-extrabold text-navy">
              e-Sevai Counter Assist Console
            </h1>
            <p className="font-inter text-[13px] text-muted">
              Operator Assisted Mode for Walk-in Citizens (Madurai e-Sevai Centre #104)
            </p>
          </div>
          {session.operatorSession ? (
            <div className="flex items-center gap-3 rounded-xl border border-teal/40 bg-[#e6f4f8] px-4 py-2">
              <span className="text-[12px]">🟢 Active Session:</span>
              <span className="font-manrope font-bold text-navy">{session.operatorSession.citizenName}</span>
              <button
                type="button"
                onClick={endOperatorSession}
                className="rounded-md bg-red-100 px-2 py-1 font-manrope text-[11px] font-bold text-red-700 hover:bg-red-200"
              >
                End Session
              </button>
            </div>
          ) : null}
        </div>

        {/* Start Walk-in Citizen Session */}
        {!session.operatorSession ? (
          <div className="max-w-xl rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="font-manrope text-[16px] font-extrabold text-navy border-b border-line pb-3">
              Start Walk-in Citizen Assisted Session
            </h2>
            <form onSubmit={handleStartSession} className="mt-4 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 font-manrope text-[13px] font-bold text-ink">
                Citizen Name / பெயர்
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="e.g. Murugan S."
                  className="rounded-xl border border-line bg-cream p-3 font-inter text-[14px] outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5 font-manrope text-[13px] font-bold text-ink">
                Phone Number / தொலைபேசி
                <input
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="rounded-xl border border-line bg-cream p-3 font-inter text-[14px] outline-none"
                  required
                />
              </label>
              <button
                type="submit"
                className="rounded-xl bg-teal py-3 font-manrope text-[14px] font-bold text-white shadow-md hover:bg-teal/90"
              >
                Start Session & Pre-fill Profile →
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
              <h2 className="font-manrope text-[16px] font-extrabold text-navy">
                Assisting: {session.operatorSession.citizenName}
              </h2>
              <p className="mt-1 font-inter text-[13px] text-muted">
                Phone: {session.operatorSession.phone} • Demographic Sync Complete
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-manrope text-[16px] font-extrabold text-navy">
                Recommended Opportunities for Assisted Citizen
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {OPPORTUNITIES.slice(0, 4).map((opp) => (
                  <div key={opp.id} className="flex flex-col justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm">
                    <div>
                      <h4 className="font-manrope text-[15px] font-bold text-navy">{opp.title}</h4>
                      <p className="font-inter text-[12px] text-muted">{opp.dept}</p>
                      <p className="mt-2 font-manrope text-[12px] text-muted">{opp.summary}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(ROUTES.CITIZEN.SCHEME_DETAIL(opp.id))}
                      className="rounded-xl bg-teal py-2.5 font-manrope text-[13px] font-bold text-white shadow-sm hover:bg-teal/90"
                    >
                      Pre-fill Form & Submit →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
