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
    navigate(ROUTES.LOGIN)
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
            <BackButton to={ROUTES.LOGIN} />
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-navy font-black text-[11px] text-white">
                AI
              </div>
              <p className="font-manrope text-[15px] font-extrabold text-navy">மக்கள AI • Makkal AI</p>
            </div>
            <LangPill />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-1.5 text-left">
            <h1 className="font-manrope text-[24px] font-extrabold leading-[1.3] text-navy sm:text-[28px]">
              கடவுச்சொல் மீட்பு / Reset Password
            </h1>
            <p className="font-manrope text-[13px] font-medium text-muted sm:text-[14px]">
              {step === 1 ? 'Enter your registered phone number to receive verification OTP' : 'Enter OTP and your new password'}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRequestOtp} className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="font-manrope text-[14px] font-bold text-ink">
                  பதிவுசெய்த தொலைபேசி எண் / Registered Phone Number
                </span>
                <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white p-3.5 focus-within:border-teal transition-all">
                  <span className="text-[18px]">📱</span>
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

              <div className="flex gap-3 rounded-xl border border-line bg-cream p-4">
                <Icon name="shield.svg" className="size-5 shrink-0 text-navy" />
                <p className="font-manrope text-[12px] font-medium leading-[1.4] text-muted">
                  <span className="font-bold text-navy">🛡️ பாதுகாப்பானது / Security Check:</span> OTP will be sent to your Aadhaar-linked mobile number for identity verification.
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90 transition-all"
              >
                <span>OTP பெறுக / Send Reset OTP</span>
                <Icon name="arrow-right.svg" className="size-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="font-manrope text-[14px] font-bold text-ink">4-Digit OTP / OTP குறியீடு</span>
                <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white p-3.5 focus-within:border-teal transition-all">
                  <span className="text-[18px]">🔑</span>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full font-inter text-[15px] font-medium text-ink outline-none"
                    placeholder="Enter 4-digit OTP"
                    required
                  />
                </div>
                <span className="font-manrope text-[11px] font-semibold text-[#15803d]">✓ OTP sent to +91 {phone}</span>
              </label>

              <label className="flex flex-col gap-2">
                <span className="font-manrope text-[14px] font-bold text-ink">புதிய கடவுச்சொல் / New Password</span>
                <div className="flex items-center gap-3 rounded-xl border-[1.5px] border-line bg-white p-3.5 focus-within:border-teal transition-all">
                  <span className="text-[18px]">🔒</span>
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
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90 transition-all"
              >
                <span>கடவுச்சொல்லை மாற்று / Reset Password & Sign In</span>
                <Icon name="arrow-right.svg" className="size-4" />
              </button>
            </form>
          )}

          <div className="flex flex-col items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => navigate(ROUTES.LOGIN)}
              className="font-manrope text-[14px] font-bold text-teal hover:underline"
            >
              ← உள்நுழைவு பக்கத்திற்கு செல்ல / Back to Sign In
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
