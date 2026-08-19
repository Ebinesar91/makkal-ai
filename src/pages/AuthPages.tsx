import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BackButton,
  HomeIndicator,
  Icon,
  LangPill,
  PhoneShell,
  StatusBar,
} from '../components/chrome'
import type { Role } from '../lib/types'
import { useApp } from '../state/AppState'

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
      navigate('/officer')
    } else if (selectedRole === 'operator') {
      navigate('/operator')
    } else if (selectedRole === 'admin') {
      navigate('/admin')
    } else if (selectedRole === 'super-admin') {
      navigate('/super-admin')
    } else if (selectedRole === 'student') {
      navigate('/student')
    } else {
      navigate('/home')
    }
  }

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-6 px-6 py-4">
        <StatusBar />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <BackButton to="/" />
          <p className="font-inter text-[14px] font-bold text-teal">மக்கள AI • Makkal AI</p>
          <LangPill />
        </div>

        {/* Form Title */}
        <div className="flex flex-col gap-1.5">
          <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-ink">
            உள்நுழைவு / Sign In
          </h1>
          <p className="font-manrope text-[13px] font-medium text-muted">
            Access personalized public services & schemes
          </p>
        </div>

        {/* Login Mode Toggle Tabs */}
        <div className="grid grid-cols-2 rounded-xl bg-mist p-1">
          <button
            type="button"
            onClick={() => { setLoginMode('password'); setOtpSent(false) }}
            className={`rounded-lg py-2 font-manrope text-[13px] font-bold transition-all ${
              loginMode === 'password' ? 'bg-white text-navy shadow-sm' : 'text-muted'
            }`}
          >
            Password / கடவுச்சொல்
          </button>
          <button
            type="button"
            onClick={() => setLoginMode('otp')}
            className={`rounded-lg py-2 font-manrope text-[13px] font-bold transition-all ${
              loginMode === 'otp' ? 'bg-white text-navy shadow-sm' : 'text-muted'
            }`}
          >
            OTP Sign In
          </button>
        </div>

        {/* Quick Role Selection */}
        <div className="flex flex-col gap-2">
          <span className="font-manrope text-[12px] font-bold uppercase text-faint">Select Role Portal:</span>
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
                className={`rounded-full px-3 py-1 font-manrope text-[12px] font-bold border transition-all ${
                  selectedRole === r ? 'border-teal bg-teal text-white' : 'border-line bg-white text-ink'
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
            <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-white p-3.5">
              <span className="text-[16px]">📱</span>
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
                  onClick={() => navigate('/forgot-password')}
                  className="font-manrope text-[12px] font-bold text-teal hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-white p-3.5">
                <span className="text-[16px]">🔒</span>
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
                  className="rounded-xl border border-teal bg-mist py-3 font-manrope text-[13px] font-bold text-teal hover:bg-teal/10"
                >
                  Send OTP to Registered Phone / OTP அனுப்பு
                </button>
              ) : (
                <label className="flex flex-col gap-2">
                  <span className="font-manrope text-[14px] font-bold text-ink">4-Digit OTP / OTP குறியீடு</span>
                  <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-white p-3.5">
                    <span className="text-[16px]">🔑</span>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                      placeholder="Enter OTP (e.g. 4821)"
                    />
                  </div>
                  <span className="font-manrope text-[11px] text-[#15803d] font-semibold">✓ OTP sent to +91 {phone}</span>
                </label>
              )}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90"
          >
            <span>உள்நுழையவும் / Sign In</span>
            <Icon name="arrow-right.svg" className="size-4" />
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 border-t border-line pt-4">
          <p className="font-manrope text-[13px] font-medium text-muted">Don&apos;t have an account?</p>
          <button
            type="button"
            onClick={() => navigate('/register/1')}
            className="font-manrope text-[14px] font-bold text-teal hover:underline"
          >
            புதிய கணக்கு தொடங்க / Register New Account →
          </button>
        </div>
      </div>

      <HomeIndicator />
    </PhoneShell>
  )
}

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [phone, setPhone] = useState('9876543210')
  const [step, setStep] = useState<1 | 2>(1)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Password reset successfully! Please sign in with your new password.')
    navigate('/login')
  }

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-6 px-6 py-4">
        <StatusBar />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <BackButton to="/login" />
          <p className="font-inter text-[14px] font-bold text-teal">மக்கள AI • Makkal AI</p>
          <LangPill />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-ink">
            கடவுச்சொல் மீட்பு / Reset Password
          </h1>
          <p className="font-manrope text-[13px] font-medium text-muted">
            {step === 1 ? 'Enter your registered phone number to receive OTP' : 'Enter OTP and your new password'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="font-manrope text-[14px] font-bold text-ink">
                பதிவுசெய்த தொலைபேசி எண் / Registered Phone Number
              </span>
              <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-white p-3.5">
                <span className="text-[16px]">📱</span>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                  placeholder="9876543210"
                  required
                />
              </div>
            </label>

            <div className="flex gap-2.5 rounded-xl border border-line bg-cream p-4">
              <Icon name="shield.svg" className="size-4 shrink-0" />
              <p className="font-manrope text-[11px] font-medium leading-[1.4] text-muted">
                <span className="font-bold">🛡️ பாதுகாப்பானது / Security Check:</span> OTP will be sent to your Aadhaar-linked mobile number for identity verification.
              </p>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90"
            >
              <span>OTP பெறுக / Send Reset OTP</span>
              <Icon name="arrow-right.svg" className="size-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <span className="font-manrope text-[14px] font-bold text-ink">4-Digit OTP / OTP குறியீடு</span>
              <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-white p-3.5">
                <span className="text-[16px]">🔑</span>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                  placeholder="Enter 4-digit OTP"
                  required
                />
              </div>
              <span className="font-manrope text-[11px] text-[#15803d] font-semibold">✓ OTP sent to +91 {phone}</span>
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-manrope text-[14px] font-bold text-ink">புதிய கடவுச்சொல் / New Password</span>
              <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-line bg-white p-3.5">
                <span className="text-[16px]">🔒</span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                  placeholder="Enter new password"
                  required
                />
              </div>
            </label>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90"
            >
              <span>கடவுச்சொல்லை மாற்று / Reset Password & Sign In</span>
              <Icon name="arrow-right.svg" className="size-4" />
            </button>
          </form>
        )}

        <div className="flex flex-col items-center gap-2 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-manrope text-[14px] font-bold text-teal hover:underline"
          >
            ← உள்நுழைவு பக்கத்திற்கு செல்ல / Back to Sign In
          </button>
        </div>
      </div>

      <HomeIndicator />
    </PhoneShell>
  )
}
