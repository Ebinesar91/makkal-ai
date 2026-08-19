import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../state/AppState'
import {
  BackButton,
  HomeIndicator,
  Icon,
  LangPill,
  PhoneShell,
  PrimaryButton,
  StatusBar,
} from '../components/chrome'

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
        <BackButton to={step === 1 ? '/' : `/register/${step - 1}`} />
        <p className="font-inter text-[14px] font-bold text-teal">மக்கள AI • Makkal AI</p>
        <LangPill />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between text-[12px]">
          <p className="font-inter font-bold uppercase text-teal">STEP {step} OF 4</p>
          <p className="font-inter font-medium text-faint">{pct}% Complete</p>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-xl bg-line">
          <div className="h-full bg-teal" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

export default function RegisterPages() {
  const { step = '1' } = useParams()
  const n = Number(step)
  const navigate = useNavigate()
  const [name, setName] = useState('Priya Lakshmi')
  const [dob, setDob] = useState('14 / 09 / 1998')
  const [role, setRole] = useState('Farmer')
  const [picked, setPicked] = useState<string[]>(['வேலைவாய்ப்பு / Jobs', 'அரசு உதவிகள் / Government benefits', 'பயிற்சி வேலை / Internships'])

  const { login, completeRegister, session } = useApp()

  const handleFinish = () => {
    login('citizen')
    completeRegister({
      ...session.profile,
      name,
      dob,
      occupation: role,
      interests: picked,
    })
    navigate('/citizen')
  }

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <StatusBar />
      <div className={`flex w-full flex-col px-6 py-4 ${n === 2 ? 'gap-7' : n === 4 ? 'gap-6' : 'gap-8'}`}>
        <Header step={n} />
        {n === 1 && (
          <>
            <p className="font-manrope text-[22px] font-extrabold leading-[1.3] text-ink">
              உங்களைப் பற்றி கூறுங்கள் / Tell us about yourself
            </p>
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-manrope text-[14px] font-bold text-ink">முழு பெயர் / Full Name</span>
                <div className="rounded-xl border-[1.5px] border-line bg-white p-4 focus-within:border-teal transition-all">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent font-inter text-[15px] font-medium text-ink outline-none"
                  />
                </div>
              </label>
              <div className="flex flex-col gap-2 font-manrope text-[14px] font-bold text-ink">
                <label htmlFor="mobile-dob-input" className="cursor-pointer">
                  பிறந்த தேதி / Date of Birth
                </label>
                <div className="relative flex items-center justify-between rounded-xl border-[1.5px] border-line bg-white p-4 focus-within:border-teal transition-all">
                  <input
                    id="mobile-dob-input"
                    type="text"
                    aria-label="Date of Birth"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="DD / MM / YYYY"
                    className="w-full bg-transparent font-inter text-[15px] font-medium text-ink outline-none"
                  />
                  <div className="relative flex items-center shrink-0">
                    <input
                      type="date"
                      aria-label="Pick Date of Birth from calendar"
                      value={(() => {
                        const parts = dob.split('/').map((s) => s.trim())
                        if (parts.length === 3 && parts[2]?.length === 4) {
                          return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`
                        }
                        return '1998-09-14'
                      })()}
                      onChange={(e) => {
                        if (e.target.value) {
                          const [y, m, d] = e.target.value.split('-')
                          setDob(`${d} / ${m} / ${y}`)
                        }
                      }}
                      className="absolute inset-0 size-full opacity-0 cursor-pointer"
                    />
                    <button type="button" aria-label="Open calendar" className="pointer-events-none text-muted">
                      <Icon name="calendar.svg" className="size-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
              <label className="flex flex-col gap-2">
                <span className="font-manrope text-[14px] font-bold text-ink">மாவட்டம் / Location District</span>
                <div className="flex items-center justify-between rounded-xl border-[1.5px] border-line bg-white p-4">
                  <p className="font-inter text-[15px] font-medium text-ink">தமிழ்நாடு / Tamil Nadu</p>
                  <Icon name="chevron-down.svg" className="size-[18px]" />
                </div>
              </label>
            </div>
            <PrimaryButton to="/register/2">
              <span className="font-manrope text-[16px] font-bold">தொடரவும் / Continue</span>
              <Icon name="arrow-right.svg" className="size-4" />
            </PrimaryButton>
          </>
        )}
        {n === 2 && (
          <>
            <p className="font-manrope text-[22px] font-extrabold leading-[1.3] text-ink">நீங்கள் யார்? / What describes you?</p>
            <div className="grid grid-cols-2 gap-3">
              {roles.map(([ta, en]) => {
                const on = role === en
                return (
                  <button
                    key={en}
                    type="button"
                    onClick={() => setRole(en)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-4 ${on ? 'border-2 border-teal bg-mist' : 'border border-line bg-white'}`}
                  >
                    <div className={`flex size-6 items-center justify-center rounded-full ${on ? 'bg-teal' : 'bg-line'}`}>
                      {on ? <Icon name="check.svg" className="size-3 text-white" /> : null}
                    </div>
                    <p className="font-manrope text-[14px] font-bold text-ink">{ta}</p>
                    <p className="font-inter text-[12px] font-medium text-muted">{en}</p>
                  </button>
                )
              })}
            </div>
            <PrimaryButton to="/register/3">
              <span className="font-manrope text-[16px] font-bold">தொடரவும் / Continue</span>
              <Icon name="arrow-right.svg" className="size-4" />
            </PrimaryButton>
          </>
        )}
        {n === 3 && (
          <>
            <p className="font-manrope text-[22px] font-extrabold leading-[1.3] text-ink">
              உங்கள் ஆர்வங்கள் என்ன? / What are you interested in?
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map(([label]) => {
                const on = picked.includes(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() =>
                      setPicked((prev) => (prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]))
                    }
                    className={`flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-3 ${on ? 'border-teal bg-teal text-white' : 'border-line bg-white text-ink'}`}
                  >
                    <span className="font-manrope text-[14px] font-semibold">{label}</span>
                    <Icon name={on ? 'check.svg' : 'plus.svg'} className="size-3.5" />
                  </button>
                )
              })}
            </div>
            <PrimaryButton to="/register/4">
              <span className="font-manrope text-[16px] font-bold">தொடரவும் / Continue</span>
              <Icon name="arrow-right.svg" className="size-4" />
            </PrimaryButton>
          </>
        )}
        {n === 4 && (
          <>
            <p className="font-manrope text-[22px] font-extrabold leading-[1.3] text-ink">இன்னும் ஒரு படி தான்! / Almost there!</p>
            <div className="flex flex-col gap-[18px]">
              {[
                ['விவரங்களை பகிர ஒப்புக்கொள்கிறேன்', 'Share profile for matched state recommendations.'],
                ['புதிய அறிவிப்புகளைப் பெறுகிறேன்', 'Send updates about opportunities & matching schemes.'],
                ['நிபந்தனைகளை ஏற்கிறேன்', 'Accept Terms & Conditions and Privacy Policy of TN Govt.'],
              ].map(([ta, en]) => (
                <div key={ta} className="flex items-center gap-4">
                  <Icon name="toggle.svg" className="h-[26px] w-12" />
                  <div>
                    <p className="font-manrope text-[13px] font-bold text-ink">{ta}</p>
                    <p className="font-inter text-[11px] font-medium text-muted">{en}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 rounded-xl border border-line bg-cream p-4">
              <Icon name="shield.svg" className="size-4" />
              <p className="font-manrope text-[11px] font-medium leading-[1.4] text-muted">
                <span className="font-bold">🛡️ பாதுகாப்பானது / Privacy First:</span> Your personal data stays fully
                encrypted and is never shared outside state agencies.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleFinish}
                className="w-full rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90"
              >
                பயன்படுத்த தொடங்கு / Create My Profile
              </button>
              <button type="button" className="p-3 font-manrope text-[14px] font-bold text-teal" onClick={() => navigate('/register/3')}>
                முந்தைய பக்கம் / Go Back
              </button>
            </div>
          </>
        )}
      </div>
      <HomeIndicator />
    </PhoneShell>
  )
}

