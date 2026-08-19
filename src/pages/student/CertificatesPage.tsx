import { useState } from 'react'
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

export function CertificatesPage() {
  const { session, uploadCertificate } = useApp()
  const [certName, setCertName] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    if (!certName.trim()) return
    setUploading(true)
    setTimeout(() => {
      uploadCertificate(certName)
      setCertName('')
      setUploading(false)
    }, 600)
  }

  return (
    <PhoneShell className="min-h-[844px] justify-between">
      <div className="flex w-full flex-col gap-5 px-6 py-4 pb-20">
        <StatusBar />

        <div className="flex items-center justify-between">
          <BackButton to={ROUTES.STUDENT.DASHBOARD} />
          <h1 className="font-manrope text-[18px] font-extrabold text-navy">சான்றிதழ் / Certificate Intelligence</h1>
          <LangPill />
        </div>

        {/* Upload Box */}
        <form onSubmit={handleUpload} className="flex flex-col gap-3 rounded-2xl border border-teal/40 bg-[#e6f4f8] p-4">
          <h3 className="font-manrope text-[14px] font-bold text-navy">
            📤 AI OCR Skill Extraction / Upload Certificate
          </h3>
          <input
            type="text"
            value={certName}
            onChange={(e) => setCertName(e.target.value)}
            placeholder="Certificate Name (e.g. Python & SQL Basics)"
            className="rounded-xl border border-line bg-white p-3 font-inter text-[13px] text-ink outline-none"
            required
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded-xl bg-teal py-3 font-manrope text-[13px] font-bold text-white shadow-sm hover:bg-teal/90"
          >
            {uploading ? 'Extracting Skills via AI OCR...' : 'Upload & Extract Skills'}
          </button>
        </form>

        {/* Existing Certificates */}
        <div className="flex flex-col gap-3">
          <h3 className="font-manrope text-[15px] font-bold text-navy">Extracted Certificates & Skills</h3>
          {session.certificates.map((cert) => (
            <div key={cert.id} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-manrope text-[15px] font-bold text-ink">{cert.title}</h4>
                  <p className="font-inter text-[12px] text-muted">{cert.issuer} • {cert.uploadedAt}</p>
                </div>
                <span className="rounded-full bg-[#dcfce7] px-2.5 py-0.5 font-manrope text-[11px] font-bold text-[#15803d]">
                  ✓ Verified OCR
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cert.extractedSkills.map((sk) => (
                  <span key={sk} className="rounded-md bg-teal/10 px-2 py-0.5 font-manrope text-[11px] font-bold text-teal">
                    +{sk}
                  </span>
                ))}
              </div>
              <div className="border-t border-line pt-2 text-[11px] text-muted">
                Aligned Career: <span className="font-bold text-navy">{cert.alignedCareers.join(', ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
      <HomeIndicator />
    </PhoneShell>
  )
}
