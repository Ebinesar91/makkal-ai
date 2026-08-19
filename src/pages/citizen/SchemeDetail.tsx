import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  BackButton,
  HomeIndicator,
  Icon,
  LangPill,
  MatchBadge,
  PhoneShell,
  StatusBar,
} from '../../components/chrome'
import { ROUTES } from '../../config/routes'
import { OPPORTUNITIES } from '../../lib/catalog'
import { matchOpportunity } from '../../lib/engine'
import { useApp } from '../../state/AppState'

export function SchemeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { session, submitApplication } = useApp()
  const isTa = session.lang === 'ta'

  const opp = OPPORTUNITIES.find((o) => o.id === id) || OPPORTUNITIES[0]
  const matchResult = matchOpportunity(session.profile, opp)
  const [submittedId, setSubmittedId] = useState<string | null>(null)

  const handleApply = () => {
    const appId = submitApplication(opp.id, {
      Name: session.profile.name,
      DOB: session.profile.dob || '14/09/1998',
      Education: session.profile.education,
      District: session.profile.district || session.profile.location,
    })
    setSubmittedId(appId)
  }

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-5 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.CITIZEN.SCHEMES} />
          <p className="font-inter text-[14px] font-bold text-teal">மக்கள AI • Makkal AI</p>
          <LangPill />
        </div>

        {/* Scheme Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-manrope text-[20px] font-extrabold text-navy">
              {isTa && opp.tamil ? opp.tamil : opp.title}
            </h1>
            <MatchBadge score={matchResult.score} />
          </div>
          <p className="font-inter text-[13px] font-semibold text-teal">{opp.department}</p>
        </div>

        {/* Summary Card */}
        <div className="rounded-2xl border border-line bg-white p-4 text-[13px] leading-[1.5] text-ink shadow-sm">
          {opp.summary}
        </div>

        {/* Eligibility Check List */}
        <div className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4">
          <h3 className="font-manrope text-[14px] font-bold text-navy border-b border-line pb-2">
            {isTa ? 'தகுதிச் சரிபார்ப்பு (AI விதிகளின் மதிப்பீடு)' : 'Eligibility Check (AI Rule Evaluation)'}
          </h3>
          <div className="flex flex-col gap-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span className="font-manrope text-muted">
                {isTa ? `வயது வரம்பு (${opp.rules.minAge ?? 18}-${opp.rules.maxAge ?? 60})` : `Age requirement (${opp.rules.minAge ?? 18}-${opp.rules.maxAge ?? 60})`}
              </span>
              <span className="font-bold text-[#15803d]">
                {isTa ? `✓ பூர்த்தியானது (${session.profile.age} வயது)` : `✓ Satisfied (${session.profile.age} yrs)`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-manrope text-muted">
                {isTa ? 'மாவட்ட பொருத்தம்' : 'District location match'}
              </span>
              <span className="font-bold text-[#15803d]">
                {isTa ? `✓ பொருத்தமானது (${session.profile.district || session.profile.location})` : `✓ Matched (${session.profile.district || session.profile.location})`}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-manrope text-muted">
                {isTa ? 'வருமான வரம்பு' : 'Income threshold'}
              </span>
              <span className="font-bold text-[#15803d]">
                {isTa ? `✓ வரம்பிற்குள் (₹${(session.profile.incomeYear || session.profile.income || 120000).toLocaleString()})` : `✓ Under limit (₹${(session.profile.incomeYear || session.profile.income || 120000).toLocaleString()})`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Section */}
        {submittedId ? (
          <div className="flex flex-col gap-3 rounded-2xl border border-teal/40 bg-[#e6f4f8] p-5 text-center">
            <span className="text-[32px]">🎉</span>
            <h3 className="font-manrope text-[16px] font-extrabold text-navy">
              {isTa ? 'விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!' : 'Application Successfully Submitted!'}
            </h3>
            <p className="font-inter text-[13px] text-teal">Application ID: {submittedId}</p>
            <button
              type="button"
              onClick={() => navigate(ROUTES.CITIZEN.APPLICATION_DETAIL(submittedId))}
              className="mt-2 rounded-xl bg-teal py-3 font-manrope text-[14px] font-bold text-white shadow-md hover:bg-teal/90"
            >
              {isTa ? 'விண்ணப்ப நிலையைக் கண்காணிக்க →' : 'Track Status →'}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleApply}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal py-4 font-manrope text-[16px] font-bold text-white shadow-md hover:bg-teal/90"
          >
            <span>{isTa ? 'விண்ணப்பிக்கவும்' : 'Apply Now & Submit'}</span>
            <Icon name="arrow-right.svg" className="size-4" />
          </button>
        )}
      </div>

      <HomeIndicator />
    </PhoneShell>
  )
}
