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

export function ProfilePage() {
  const navigate = useNavigate()
  const { session, logout } = useApp()
  const { profile } = session
  const isTa = session.lang === 'ta'

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-5 px-6 py-4 pb-20">
        <StatusBar />

        {/* Top Header */}
        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">
            {isTa ? 'சுயவிவரம்' : 'User Profile'}
          </h1>
          <LangPill />
        </div>

        {/* User Card */}
        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 border border-line shadow-sm">
          <div className="flex size-14 items-center justify-center rounded-full bg-navy text-[20px] font-black text-white">
            {profile.name[0]}
          </div>
          <div>
            <h2 className="font-manrope text-[18px] font-extrabold text-ink">{profile.name}</h2>
            <p className="font-inter text-[13px] text-muted">{profile.district || profile.location} • {profile.occupation}</p>
            <span className="mt-1 inline-block rounded-full bg-[#dcfce7] px-2.5 py-0.5 font-manrope text-[11px] font-bold text-[#15803d]">
              {isTa ? '✓ சரிபார்க்கப்பட்ட ஆதார் அடையாளம்' : '✓ Verified Aadhaar Identity'}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 border border-line">
          <h3 className="font-manrope text-[15px] font-bold text-navy border-b border-line pb-2">
            {isTa ? 'தகவல்கள்' : 'Personal Details'}
          </h3>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <p className="font-inter text-muted">{isTa ? 'பிறந்த தேதி' : 'Date of Birth'}</p>
              <p className="font-manrope font-bold text-ink">{profile.dob || '14 / 09 / 1998'}</p>
            </div>
            <div>
              <p className="font-inter text-muted">{isTa ? 'கல்வித் தகுதி' : 'Education'}</p>
              <p className="font-manrope font-bold text-ink">{profile.education}</p>
            </div>
            <div>
              <p className="font-inter text-muted">{isTa ? 'ஆண்டு வருமானம்' : 'Annual Income'}</p>
              <p className="font-manrope font-bold text-ink">₹{(profile.incomeYear || profile.income || 120000).toLocaleString()} {isTa ? '/ ஆண்டு' : '/ year'}</p>
            </div>
            <div>
              <p className="font-inter text-muted">{isTa ? 'பங்கு தளம்' : 'Role Portal'}</p>
              <p className="font-manrope font-bold text-teal capitalize">{session.role}</p>
            </div>
          </div>
        </div>

        {/* Document Status */}
        <div className="flex flex-col gap-3 rounded-2xl bg-white p-5 border border-line">
          <h3 className="font-manrope text-[15px] font-bold text-navy border-b border-line pb-2">
            {isTa ? 'சான்றிதழ்கள்' : 'Document Status'}
          </h3>
          <div className="flex flex-col gap-2 text-[13px]">
            {Object.entries(profile.documents).map(([doc, status]) => (
              <div key={doc} className="flex items-center justify-between py-1">
                <span className="font-manrope text-ink">{doc}</span>
                <span className={`rounded-md px-2 py-0.5 font-manrope text-[11px] font-bold ${
                  status === 'verified' ? 'bg-teal/10 text-teal' : status === 'uploaded' ? 'bg-amber text-gold' : 'bg-red-50 text-red-600'
                }`}>
                  {isTa ? (status === 'verified' ? 'சரிபார்க்கப்பட்டது' : status === 'uploaded' ? 'பதிவேற்றப்பட்டது' : 'விடுபட்டுள்ளது') : status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => navigate(ROUTES.CITIZEN.APPLICATIONS)}
            className="flex items-center justify-between rounded-xl border border-line bg-white p-4 font-manrope text-[14px] font-bold text-navy hover:bg-mist"
          >
            <span>📋 {isTa ? 'என் விண்ணப்பங்கள்' : 'My Applications'}</span>
            <span>→</span>
          </button>
          <button
            type="button"
            onClick={() => navigate(ROUTES.STUDENT.CERTIFICATES)}
            className="flex items-center justify-between rounded-xl border border-line bg-white p-4 font-manrope text-[14px] font-bold text-navy hover:bg-mist"
          >
            <span>📜 {isTa ? 'சான்றிதழ் மேலாண்மை' : 'Certificate Management'}</span>
            <span>→</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => { logout(); navigate(ROUTES.LANDING) }}
          className="rounded-xl border border-red-200 bg-red-50 py-3.5 font-manrope text-[14px] font-bold text-red-600 hover:bg-red-100"
        >
          {isTa ? 'வெளியேறு' : 'Sign Out'}
        </button>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
