import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_PROFILE, OPPORTUNITIES } from '../lib/catalog'
import { extractCertificateSkills, recommend } from '../lib/engine'
import type { Application, AuditLog, CertificateDoc, Lang, Notice, OperatorSession, Profile, Role } from '../lib/types'

interface Session {
  role: Role | null
  registered: boolean
  profile: Profile
  applications: Application[]
  notices: Notice[]
  certificates: CertificateDoc[]
  operatorSession: OperatorSession | null
  auditLogs: AuditLog[]
  lang: Lang
  easyMode: boolean
}

const seedApps: Application[] = [
  {
    id: 'A10231',
    opportunityId: 'sch-vidyalaxmi',
    citizenName: 'Priya Lakshmi',
    status: 'under-review',
    submittedAt: '2026-08-09',
    daysPending: 10,
    slaDays: 15,
    form: { Name: 'Priya Lakshmi', DOB: '14/09/1998', Education: 'B.E CSE', Income: '150000', Phone: '9876543210' },
    verified: true,
  },
  {
    id: 'A10208',
    opportunityId: 'scheme-laptop',
    citizenName: 'Priya Lakshmi',
    status: 'submitted',
    submittedAt: '2026-08-17',
    daysPending: 2,
    slaDays: 20,
    form: { Name: 'Priya Lakshmi', Education: 'B.E CSE' },
    verified: true,
  },
]

const seedNotices: Notice[] = [
  { id: 'n1', title: 'Application submitted', body: 'A10231 Scholarship is under review.', at: '2 hours ago', read: false },
  { id: 'n2', title: 'Income certificate required', body: 'Upload to complete possible scholarship matches.', at: '1 day ago', read: false },
  { id: 'n3', title: 'New internship alignment', body: 'Junior Data Analyst internship aligns with Python + Excel.', at: '2 days ago', read: true },
]

const seedCerts: CertificateDoc[] = [
  {
    id: 'cert-1',
    title: 'Python Programming Certificate',
    issuer: 'Naan Mudhalvan',
    extractedSkills: ['Python', 'Functions', 'File Handling'],
    recommendedNext: ['SQL', 'Pandas', 'Data Analysis'],
    alignedCareers: ['Data Analyst'],
    uploadedAt: '2026-08-10',
    status: 'extracted',
  },
]

const seedAuditLogs: AuditLog[] = [
  { id: 'l1', actor: 'System AI', role: 'admin', action: 'Rule Engine Execution', details: 'Scanned 12 opportunities for profile Priya Lakshmi', timestamp: '2026-08-19 10:30' },
  { id: 'l2', actor: 'Officer K. Rajendran', role: 'officer', action: 'Application Status Update', details: 'A10231 set to under-review', timestamp: '2026-08-19 11:15' },
]

const Ctx = createContext<{
  session: Session
  login: (role: Role) => void
  logout: () => void
  completeRegister: (profile: Profile) => void
  updateProfile: (patch: Partial<Profile>) => void
  submitApplication: (opportunityId: string, form: Record<string, string>) => string
  setAppStatus: (id: string, status: Application['status']) => void
  uploadCertificate: (name: string) => void
  startOperatorSession: (citizenName: string, phone: string) => void
  endOperatorSession: () => void
  addAuditLog: (action: string, details: string) => void
  setLang: (lang: Lang) => void
  setEasyMode: (v: boolean) => void
  addNotice: (title: string, body: string) => void
} | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>({
    role: 'citizen',
    registered: true,
    profile: {
      ...DEFAULT_PROFILE,
      skills: [...DEFAULT_PROFILE.skills],
      interests: [...DEFAULT_PROFILE.interests],
      documents: { ...DEFAULT_PROFILE.documents },
    },
    applications: seedApps,
    notices: seedNotices,
    certificates: seedCerts,
    operatorSession: null,
    auditLogs: seedAuditLogs,
    lang: 'en',
    easyMode: false,
  })

  const api = useMemo(
    () => ({
      session,
      login: (role: Role) => setSession((s) => ({ ...s, role, registered: role !== 'citizen' && role !== 'student' ? true : s.registered })),
      logout: () => setSession((s) => ({ ...s, role: 'citizen' })),
      completeRegister: (profile: Profile) =>
        setSession((s) => ({
          ...s,
          registered: true,
          role: profile.occupation === 'Student' ? 'student' : 'citizen',
          profile,
          notices: [
            { id: crypto.randomUUID(), title: 'Profile created', body: 'AI analysed your profile for possible matches.', at: 'just now', read: false },
            ...s.notices,
          ],
        })),
      updateProfile: (patch: Partial<Profile>) => setSession((s) => ({ ...s, profile: { ...s.profile, ...patch } })),
      submitApplication: (opportunityId: string, form: Record<string, string>) => {
        const opp = OPPORTUNITIES.find((o) => o.id === opportunityId)
        const id = `A${Math.floor(10000 + Math.random() * 90000)}`
        setSession((s) => ({
          ...s,
          applications: [
            {
              id,
              opportunityId,
              citizenName: s.profile.name,
              status: 'submitted',
              submittedAt: new Date().toISOString().slice(0, 10),
              daysPending: 0,
              slaDays: opp?.slaDays ?? 15,
              form,
              verified: true,
            },
            ...s.applications,
          ],
          notices: [
            { id: crypto.randomUUID(), title: 'Application submitted', body: `${id} · ${opp?.title ?? 'Service'}`, at: 'just now', read: false },
            ...s.notices,
          ],
          auditLogs: [
            { id: crypto.randomUUID(), actor: s.profile.name, role: s.role ?? 'citizen', action: 'Submit Application', details: `Submitted ${id} for ${opp?.title}`, timestamp: new Date().toLocaleString() },
            ...s.auditLogs,
          ],
        }))
        return id
      },
      setAppStatus: (id: string, status: Application['status']) =>
        setSession((s) => ({
          ...s,
          applications: s.applications.map((a) => (a.id === id ? { ...a, status } : a)),
          notices: [
            { id: crypto.randomUUID(), title: 'Application update', body: `${id} status changed to ${status.replace('-', ' ').toUpperCase()}.`, at: 'just now', read: false },
            ...s.notices,
          ],
          auditLogs: [
            { id: crypto.randomUUID(), actor: s.role === 'officer' ? 'Officer K. Rajendran' : 'Operator Assist', role: s.role ?? 'officer', action: 'Update Application Status', details: `Application ${id} marked as ${status}`, timestamp: new Date().toLocaleString() },
            ...s.auditLogs,
          ],
        })),
      uploadCertificate: (name: string) => {
        const cert = extractCertificateSkills(name)
        setSession((s) => ({
          ...s,
          certificates: [cert, ...s.certificates],
          profile: {
            ...s.profile,
            skills: [...new Set([...s.profile.skills, ...cert.extractedSkills])],
          },
          notices: [
            { id: crypto.randomUUID(), title: 'Certificate Extracted', body: `Extracted skills: ${cert.extractedSkills.join(', ')}. Updated profile.`, at: 'just now', read: false },
            ...s.notices,
          ],
        }))
      },
      startOperatorSession: (citizenName: string, phone: string) => {
        const sess: OperatorSession = {
          id: `SESS-${Math.floor(1000 + Math.random() * 9000)}`,
          citizenName,
          citizenPhone: phone,
          age: 22,
          occupation: 'Student',
          district: 'Madurai',
          startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'active',
        }
        setSession((s) => ({ ...s, operatorSession: sess }))
      },
      endOperatorSession: () => setSession((s) => ({ ...s, operatorSession: null })),
      addAuditLog: (action: string, details: string) =>
        setSession((s) => ({
          ...s,
          auditLogs: [
            { id: crypto.randomUUID(), actor: s.role ?? 'system', role: s.role ?? 'admin', action, details, timestamp: new Date().toLocaleString() },
            ...s.auditLogs,
          ],
        })),
      setLang: (lang: Lang) => setSession((s) => ({ ...s, lang })),
      setEasyMode: (easyMode: boolean) => setSession((s) => ({ ...s, easyMode })),
      addNotice: (title: string, body: string) =>
        setSession((s) => ({
          ...s,
          notices: [{ id: crypto.randomUUID(), title, body, at: 'just now', read: false }, ...s.notices],
        })),
    }),
    [session],
  )

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useApp() {
  const v = useContext(Ctx)
  if (!v) throw new Error('AppState missing')
  return v
}

export function useMatches() {
  const { session } = useApp()
  return recommend(session.profile)
}

