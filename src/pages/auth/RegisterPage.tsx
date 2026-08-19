import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BackButton,
  HomeIndicator,
  Icon,
  LangPill,
  PrimaryButton,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { useApp } from '../../state/AppState'

const roles = [
  ['மாணவர்', 'Student'],
  ['பணிபுரிபவர்', 'Working'],
  ['வேலை தேடுபவர்', 'Looking for a job'],
  ['விவசாயி', 'Farmer'],
  ['குடும்பத்தலைவி', 'Homemaker'],
  ['முதியவர்', 'Senior citizen'],
  ['சுயதொழில்', 'Self-employed'],
  ['மற்றவை', 'Other'],
]

const interests = [
  ['கல்வி / Education', false],
  ['வேலைவாய்ப்பு / Jobs', true],
  ['அரசு உதவிகள் / Government benefits', true],
  ['தொழில் / Business', false],
  ['திறன் பயிற்சி / Skills', false],
  ['கல்வித்தொகை / Scholarships', false],
  ['பயிற்சி வேலை / Internships', true],
] as const

function Header({ step }: { step: number }) {
  const pct = step * 25
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between">
        <BackButton to={step === 1 ? ROUTES.LANDING : ROUTES.REGISTER.STEP(step - 1)} />
        <p className="font-inter text-[14px] font-bold text-teal">மக்கள AI • Makkal AI</p>
        <LangPill />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-[12px]">
          <p className="font-inter font-bold uppercase text-teal">STEP {step} OF 4</p>
          <p className="font-inter font-medium text-faint">{pct}% Complete</p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-xl bg-line">
          <div className="h-full bg-teal transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

export function RegisterPage() {
  const { step: rawStep } = useParams()
  const step = Math.max(1, Math.min(4, Number(rawStep) || 1))
  const navigate = useNavigate()
  const { login, completeRegister } = useApp()

  const [form, setForm] = useState({
    name: 'Selvam Murugan',
    dob: '14 / 09 / 1998',
    district: 'மதுரை / Madurai',
    occupation: 'Farmer',
    interests: ['Jobs', 'Government benefits', 'Internships'],
    shareProfile: true,
    notifications: true,
    terms: true,
  })

  const finishRegistration = () => {
    login('citizen')
    completeRegister({
      name: form.name,
      phone: '9876543210',
      dob: form.dob,
      age: 26,
      district: form.district,
      location: form.district,
      occupation: form.occupation,
      education: 'Higher Secondary',
      income: 120000,
      incomeYear: 120000,
      skills: ['Python', 'Excel'],
      interests: form.interests,
      careerInterest: 'Data Analytics',
      documents: {
        Aadhaar: 'verified',
        Marksheet: 'uploaded',
        'Income Certificate': 'missing',
        'Community Certificate': 'uploaded',
        'College ID': 'uploaded',
        Resume: 'missing',
      },
      consentShare: form.shareProfile,
      consentNotify: form.notifications,
      consentTerms: form.terms,
      shareProfileConsent: form.shareProfile,
      notificationsConsent: form.notifications,
    })
    navigate(ROUTES.CITIZEN.DASHBOARD)
  }

  return (
    <div className="min-h-svh flex flex-col justify-between bg-cream px-4 py-6 sm:px-8 sm:py-12">
      {/* Mobile status bar indicator */}
      <div className="mx-auto w-full max-w-md sm:hidden">
        <StatusBar />
      </div>

      <div className="mx-auto w-full max-w-md sm:max-w-xl lg:max-w-2xl">
        <div className="flex flex-col gap-6 rounded-3xl border-0 bg-transparent p-0 sm:border sm:border-line sm:bg-white sm:p-8 sm:shadow-xl">
          <Header step={step} />

          {step === 1 ? (
            <div className="flex flex-col gap-6 text-left">
              <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-navy sm:text-[28px]">
                உங்களைப் பற்றி கூறுங்கள் / Tell us about yourself
              </h1>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-2 font-manrope text-[14px] font-bold text-ink">
                  முழு பெயர் / Full Name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-xl border-[1.5px] border-line bg-white p-4 font-inter text-[15px] font-medium text-ink outline-none focus:border-teal transition-all"
                  />
                </label>
                <div className="flex flex-col gap-2 font-manrope text-[14px] font-bold text-ink">
                  <label htmlFor="dob-input" className="cursor-pointer">
                    பிறந்த தேதி / Date of Birth
                  </label>
                  <div className="relative flex items-center justify-between rounded-xl border-[1.5px] border-line bg-white p-4 focus-within:border-teal transition-all">
                    <input
                      id="dob-input"
                      type="text"
                      aria-label="Date of Birth"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      placeholder="DD / MM / YYYY"
                      className="w-full bg-transparent font-inter text-[15px] font-medium text-ink outline-none"
                    />
                    <div className="relative flex items-center shrink-0">
                      <input
                        type="date"
                        aria-label="Pick Date of Birth from calendar"
                        value={(() => {
                          const parts = form.dob.split('/').map((s) => s.trim())
                          if (parts.length === 3 && parts[2]?.length === 4) {
                            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
                          }
                          return '1998-09-14'
                        })()}
                        onChange={(e) => {
                          if (e.target.value) {
                            const [y, m, d] = e.target.value.split('-')
                            setForm({ ...form, dob: `${d} / ${m} / ${y}` })
                          }
                        }}
                        className="absolute inset-0 size-full opacity-0 cursor-pointer"
                      />
                      <button type="button" aria-label="Open calendar" className="pointer-events-none text-muted">
                        <Icon name="calendar.svg" className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
                <label className="flex flex-col gap-2 font-manrope text-[14px] font-bold text-ink">
                  மாவட்டம் / Location District
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="rounded-xl border-[1.5px] border-line bg-white p-4 font-inter text-[15px] font-medium text-ink outline-none focus:border-teal transition-all"
                  >
                    <option>மதுரை / Madurai</option>
                    <option>சென்னை / Chennai</option>
                    <option>கோவை / Coimbatore</option>
                    <option>திருச்சி / Trichy</option>
                  </select>
                </label>
              </div>
              <PrimaryButton to={ROUTES.REGISTER.STEP(2)}>
                <span>தொடரவும் / Continue</span>
                <Icon name="arrow-right.svg" className="size-4" />
              </PrimaryButton>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="flex flex-col gap-6 text-left">
              <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-navy sm:text-[28px]">
                நீங்கள் யார்? / What describes you best?
              </h1>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {roles.map(([ta, en]) => {
                  const sel = form.occupation === en
                  return (
                    <button
                      key={en}
                      type="button"
                      onClick={() => setForm({ ...form, occupation: en })}
                      className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                        sel ? 'border-teal bg-[#e6f4f8] shadow-sm' : 'border-line bg-white hover:border-teal/50'
                      }`}
                    >
                      <div className={`flex size-6 items-center justify-center rounded-full ${sel ? 'bg-teal text-white' : 'bg-mist'}`}>
                        {sel ? '✓' : ''}
                      </div>
                      <div>
                        <p className="font-manrope text-[14px] font-extrabold text-navy sm:text-[15px]">{ta}</p>
                        <p className="font-inter text-[11px] font-medium text-muted sm:text-[12px]">{en}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
              <PrimaryButton to={ROUTES.REGISTER.STEP(3)}>
                <span>தொடரவும் / Continue</span>
                <Icon name="arrow-right.svg" className="size-4" />
              </PrimaryButton>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="flex flex-col gap-6 text-left">
              <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-navy sm:text-[28px]">
                உங்கள் ஆர்வங்கள் என்ன? / What are you interested in?
              </h1>
              <div className="flex flex-wrap gap-2.5">
                {interests.map(([label]) => {
                  const key = label.split(' / ')[1]
                  const sel = form.interests.includes(key)
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => {
                        const next = sel ? form.interests.filter((i) => i !== key) : [...form.interests, key]
                        setForm({ ...form, interests: next })
                      }}
                      className={`flex items-center gap-2 rounded-full border px-4 py-3 font-manrope text-[14px] font-bold transition-all ${
                        sel ? 'border-teal bg-teal text-white shadow-sm' : 'border-line bg-white text-ink hover:bg-mist'
                      }`}
                    >
                      <span>{label}</span>
                      <span>{sel ? '✓' : '+'}</span>
                    </button>
                  )
                })}
              </div>
              <PrimaryButton to={ROUTES.REGISTER.STEP(4)}>
                <span>தொடரவும் / Continue</span>
                <Icon name="arrow-right.svg" className="size-4" />
              </PrimaryButton>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="flex flex-col gap-6 text-left">
              <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-navy sm:text-[28px]">
                இன்னும் ஒரு படி தான்! / Almost there!
              </h1>
              <div className="flex flex-col gap-4">
                {[
                  ['விவரங்களை பகிர ஒப்புக்கொள்கிறேன்', 'Share profile for matched state recommendations.', 'shareProfile'],
                  ['புதிய அறிவிப்புகளைப் பெறுகிறேன்', 'Send updates about opportunities & matching schemes.', 'notifications'],
                  ['நிபந்தனைகளை ஏற்கிறேன்', 'Accept Terms & Conditions and Privacy Policy of TN Govt.', 'terms'],
                ].map(([ta, en, key]) => (
                  <label key={key} className="flex items-start gap-3 rounded-xl border border-line bg-white p-4 cursor-pointer hover:border-teal/50 transition-all">
                    <input
                      type="checkbox"
                      checked={form[key as keyof typeof form] as boolean}
                      onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                      className="mt-1 size-5 rounded border-line text-teal"
                    />
                    <div>
                      <p className="font-manrope text-[14px] font-bold text-navy">{ta}</p>
                      <p className="font-inter text-[12px] font-medium text-muted">{en}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 rounded-xl border border-line bg-cream p-4">
                <Icon name="shield.svg" className="size-5 shrink-0 text-navy" />
                <p className="font-manrope text-[12px] font-medium leading-[1.4] text-muted">
                  <span className="font-bold text-navy">🛡️ பாதுகாப்பானது / Privacy First:</span> Your personal data stays fully encrypted and is never shared outside state agencies.
                </p>
              </div>

              <button
                type="button"
                onClick={finishRegistration}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90 transition-all"
              >
                <span>பயன்படுத்த தொடங்க / Create My Profile & Enter Portal</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-md sm:hidden">
        <HomeIndicator />
      </div>
    </div>
  )
}
