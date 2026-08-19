import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  HomeIndicator,
  Icon,
  LangPill,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import type { Role } from '../../lib/types'
import { useApp } from '../../state/AppState'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, setEasyMode } = useApp()
  const [phone, setPhone] = useState('9876543210')
  const [password, setPassword] = useState('123456')
  const [selectedRole, setSelectedRole] = useState<Role>('citizen')
  const [loginMode, setLoginMode] = useState<'password' | 'otp'>('password')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setEasyMode(false)
    login(selectedRole)
    if (selectedRole === 'officer') {
      navigate(ROUTES.OFFICER.DASHBOARD)
    } else if (selectedRole === 'operator') {
      navigate(ROUTES.OPERATOR.DASHBOARD)
    } else if (selectedRole === 'admin') {
      navigate(ROUTES.ADMIN.DASHBOARD)
    } else if (selectedRole === 'super-admin') {
      navigate(ROUTES.SUPER_ADMIN.DASHBOARD)
    } else if (selectedRole === 'student') {
      navigate(ROUTES.STUDENT.DASHBOARD)
    } else {
      navigate(ROUTES.CITIZEN.DASHBOARD)
    }
  }

  return (
    <div className="min-h-svh flex flex-col justify-between bg-cream px-4 py-6 sm:px-8 sm:py-12">
      {/* Mobile status bar indicator */}
      <div className="mx-auto w-full max-w-md sm:hidden">
        <StatusBar />
      </div>

      <div className="mx-auto w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="flex flex-col gap-6 rounded-3xl border-0 bg-transparent p-0 sm:border sm:border-line sm:bg-white sm:p-8 sm:shadow-xl">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-line/50 pb-4">
            <BackButton to={ROUTES.LANDING} />
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-navy font-black text-[11px] text-white">
                AI
              </div>
              <p className="font-manrope text-[15px] font-extrabold text-navy">மக்கள AI • Makkal AI</p>
            </div>
            <LangPill />
          </div>

          {/* Form Title */}
          <div className="flex flex-col gap-1.5 text-left">
            <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-navy sm:text-[28px]">
              உள்நுழைவு / Sign In
            </h1>
            <p className="font-manrope text-[13px] font-medium text-muted sm:text-[14px]">
              Access personalized public services, scholarships & government schemes
            </p>
          </div>

          {/* Login Mode Toggle Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-mist p-1.5">
            <button
              type="button"
              onClick={() => { setLoginMode('password'); setOtpSent(false) }}
              className={`rounded-lg py-2.5 font-manrope text-[13px] font-bold transition-all sm:text-[14px] ${
                loginMode === 'password' ? 'bg-white text-navy shadow-sm' : 'text-muted hover:text-navy'
              }`}
            >
              Password / கடவுச்சொல்
            </button>
            <button
              type="button"
              onClick={() => setLoginMode('otp')}
              className={`rounded-lg py-2.5 font-manrope text-[13px] font-bold transition-all sm:text-[14px] ${
                loginMode === 'otp' ? 'bg-white text-navy shadow-sm' : 'text-muted hover:text-navy'
              }`}
            >
              OTP Sign In
            </button>
          </div>

          {/* Quick Role Selection */}
          <div className="flex flex-col gap-2">
            <span className="font-manrope text-[12px] font-bold uppercase tracking-wider text-faint">Select Role Portal:</span>
            <div className="flex flex-wrap gap-2">
              {[
                ['citizen', '👤 Citizen'],
                ['student', '🎓 Student'],
                ['operator', '🖥️ Operator'],
                ['officer', '🛡️ Officer'],
              ].map(([r, label]) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r as Role)}
                  className={`rounded-full border px-3.5 py-1.5 font-manrope text-[12px] font-bold transition-all sm:text-[13px] ${
                    selectedRole === r ? 'border-teal bg-teal text-white shadow-sm' : 'border-line bg-white text-ink hover:bg-mist'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="font-manrope text-[14px] font-bold text-ink">
                தொலைபேசி எண் அல்லது ஆதார் / Phone / Aadhaar ID
              </span>
              <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white p-3.5 focus-within:border-teal transition-all">
                <span className="text-[18px]">📱</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                  placeholder="Enter 10-digit phone or Aadhaar"
                  required
                />
              </div>
            </label>

            {loginMode === 'password' ? (
              <label className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-manrope text-[14px] font-bold text-ink">கடவுச்சொல் / Password</span>
                  <button
                    type="button"
                    onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
                    className="font-manrope text-[12px] font-bold text-teal hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white p-3.5 focus-within:border-teal transition-all">
                  <span className="text-[18px]">🔒</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </label>
            ) : (
              <div className="flex flex-col gap-3">
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={() => setOtpSent(true)}
                    className="rounded-xl border border-teal bg-mist py-3.5 font-manrope text-[14px] font-bold text-teal hover:bg-teal/10 transition-all"
                  >
                    Send OTP to Registered Phone / OTP அனுப்பு
                  </button>
                ) : (
                  <label className="flex flex-col gap-2">
                    <span className="font-manrope text-[14px] font-bold text-ink">4-Digit OTP / OTP குறியீடு</span>
                    <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white p-3.5 focus-within:border-teal transition-all">
                      <span className="text-[18px]">🔑</span>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                        placeholder="Enter OTP (e.g. 4821)"
                      />
                    </div>
                    <span className="font-manrope text-[11px] font-semibold text-[#15803d]">✓ OTP sent to +91 {phone}</span>
                  </label>
                )}
              </div>
            )}

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90 transition-all"
            >
              <span>உள்நுழையவும் / Sign In</span>
              <Icon name="arrow-right.svg" className="size-4" />
            </button>
          </form>

          <div className="flex flex-col items-center gap-2 border-t border-line pt-4">
            <p className="font-manrope text-[13px] font-medium text-muted">Don&apos;t have an account?</p>
            <button
              type="button"
              onClick={() => navigate(ROUTES.REGISTER.STEP(1))}
              className="font-manrope text-[14px] font-bold text-teal hover:underline"
            >
              புதிய கணக்கு தொடங்க / Register New Account →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-md sm:hidden">
        <HomeIndicator />
      </div>
    </div>
  )
}
