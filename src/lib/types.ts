export type Role = 'citizen' | 'student' | 'operator' | 'officer' | 'admin' | 'super-admin'

export type Lang = 'en' | 'ta'

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under-review'
  | 'docs-requested'
  | 'forwarded'
  | 'approved'
  | 'rejected'

export type OpportunityKind = 'scheme' | 'scholarship' | 'course' | 'internship' | 'job' | 'service' | 'healthcare'

export interface Profile {
  name: string
  phone: string
  dob?: string
  district?: string
  incomeYear?: number
  age: number
  location: string
  education: string
  occupation: string
  income: number
  skills: string[]
  interests: string[]
  careerInterest: string
  documents: Record<string, 'missing' | 'uploaded' | 'verified'>
  consentShare: boolean
  consentNotify: boolean
  consentTerms: boolean
  shareProfileConsent?: boolean
  notificationsConsent?: boolean
}

export interface Opportunity {
  id: string
  kind: OpportunityKind
  title: string
  tamil?: string
  department: string
  dept?: string
  summary: string
  benefit: string
  slaDays: number
  rules: {
    minAge?: number
    maxAge?: number
    locations?: string[]
    occupations?: string[]
    educationIncludes?: string[]
    maxIncome?: number
    requiredSkills?: string[]
    requiredDocs: string[]
  }
}

export interface MatchResult {
  opportunity: Opportunity
  score: number
  matched: string[]
  missing: string[]
  missingItems?: string[]
  possible: boolean
}

export interface Application {
  id: string
  opportunityId: string
  citizenName: string
  status: ApplicationStatus
  submittedAt: string
  daysPending: number
  slaDays: number
  form: Record<string, string>
  verified: boolean
}

export interface Notice {
  id: string
  title: string
  body: string
  at: string
  read: boolean
}

export interface CertificateDoc {
  id: string
  title: string
  issuer?: string
  extractedSkills: string[]
  recommendedNext: string[]
  alignedCareers: string[]
  uploadedAt: string
  status: 'processing' | 'extracted' | 'verified'
}

export interface OperatorSession {
  id: string
  citizenName: string
  citizenPhone: string
  phone?: string
  age: number
  occupation: string
  district: string
  startedAt: string
  status: 'active' | 'completed'
  notes?: string
}

export interface AuditLog {
  id: string
  actor: string
  role: Role
  action: string
  details: string
  timestamp: string
}

export interface SlaRule {
  opportunityId: string
  serviceName: string
  slaDays: number
  reminderDay: number
  warningDay: number
  breachDay: number
}
