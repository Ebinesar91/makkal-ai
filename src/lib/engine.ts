import { OPPORTUNITIES } from './catalog'
import type { CertificateDoc, MatchResult, Opportunity, Profile } from './types'

export function matchOpportunity(profile: Profile, opportunity: Opportunity): MatchResult {
  const matched: string[] = []
  const missing: string[] = []
  const r = opportunity.rules

  if (r.minAge != null) {
    if (profile.age >= r.minAge) matched.push('Age')
    else missing.push(`Minimum age ${r.minAge}`)
  }
  if (r.maxAge != null) {
    if (profile.age <= r.maxAge) matched.push('Age range')
    else missing.push(`Maximum age ${r.maxAge}`)
  }
  if (r.locations?.length) {
    if (r.locations.some((l) => profile.location.toLowerCase().includes(l.toLowerCase()))) matched.push('Location')
    else missing.push('Location')
  }
  if (r.occupations?.length) {
    if (r.occupations.some((o) => profile.occupation.toLowerCase().includes(o.toLowerCase()) || o.toLowerCase().includes(profile.occupation.toLowerCase())))
      matched.push('Occupation / education status')
    else missing.push('Occupation')
  }
  if (r.educationIncludes?.length) {
    if (r.educationIncludes.some((e) => profile.education.toLowerCase().includes(e.toLowerCase()))) matched.push('Education')
    else missing.push('Education')
  }
  if (r.maxIncome != null) {
    if (profile.income <= r.maxIncome) matched.push('Income band')
    else missing.push('Income limit')
  }
  if (r.requiredSkills?.length) {
    for (const s of r.requiredSkills) {
      if (profile.skills.some((p) => p.toLowerCase() === s.toLowerCase())) matched.push(s)
      else missing.push(`Skill: ${s}`)
    }
  }
  for (const doc of r.requiredDocs) {
    const state = profile.documents[doc]
    if (state === 'verified' || state === 'uploaded') matched.push(`Document: ${doc}`)
    else missing.push(`Document: ${doc}`)
  }

  const checks = matched.length + missing.length || 1
  const score = Math.round((matched.length / checks) * 100)
  return {
    opportunity: { ...opportunity, dept: opportunity.department },
    score,
    matched: [...new Set(matched)],
    missing,
    missingItems: missing,
    possible: score >= 50,
  }
}

export const evaluateMatch = matchOpportunity

export function recommend(profile: Profile, targetOrKind?: Opportunity['kind'] | Opportunity[]): MatchResult[] {
  const opps = Array.isArray(targetOrKind) ? targetOrKind : OPPORTUNITIES.filter((o) => !targetOrKind || o.kind === targetOrKind)
  return opps
    .map((o) => matchOpportunity(profile, o))
    .filter((m) => m.possible)
    .sort((a, b) => b.score - a.score)
}

export function slaStage(daysPending: number, slaDays: number) {
  const ratio = daysPending / slaDays
  if (daysPending > slaDays) return { label: 'SLA breached', tone: 'danger' as const, escalate: true }
  if (ratio >= 0.85) return { label: 'SLA warning', tone: 'warn' as const, escalate: false }
  if (ratio >= 0.65) return { label: 'Reminder due', tone: 'warn' as const, escalate: false }
  return { label: 'On track', tone: 'ok' as const, escalate: false }
}

export function extractCertificateSkills(name: string): CertificateDoc {
  const n = name.toLowerCase()
  if (n.includes('python')) {
    return {
      id: `cert-${Date.now()}`,
      title: name,
      issuer: 'Naan Mudhalvan / State Skill Board',
      extractedSkills: ['Python', 'Functions', 'File Handling'],
      recommendedNext: ['SQL', 'Pandas', 'Data Analysis'],
      alignedCareers: ['Data Analyst', 'Junior Software Developer'],
      uploadedAt: new Date().toISOString().slice(0, 10),
      status: 'extracted',
    }
  }
  if (n.includes('react') || n.includes('web')) {
    return {
      id: `cert-${Date.now()}`,
      title: name,
      issuer: 'Open Learning Portal',
      extractedSkills: ['JavaScript', 'React', 'Component Design'],
      recommendedNext: ['TypeScript', 'Next.js', 'State Management'],
      alignedCareers: ['Frontend Developer', 'UI Engineer'],
      uploadedAt: new Date().toISOString().slice(0, 10),
      status: 'extracted',
    }
  }
  return {
    id: `cert-${Date.now()}`,
    title: name,
    issuer: 'Recognized Institute',
    extractedSkills: ['Communication', 'Digital Literacy', 'Office Tools'],
    recommendedNext: ['Advanced Excel', 'Python Basics'],
    alignedCareers: ['Administrative Assistant', 'Data Entry Specialist'],
    uploadedAt: new Date().toISOString().slice(0, 10),
    status: 'extracted',
  }
}

export function parseOfficerFilter(query: string) {
  const q = query.toLowerCase()
  const summary: string[] = []
  let daysPendingMin: number | undefined
  let breachedOnly = false

  if (q.includes('scholarship')) {
    summary.push('Kind = Scholarship')
  }
  if (q.includes('pending') || q.includes('under review')) {
    summary.push('Status = Pending / Under Review')
  }
  if (q.includes('breached') || q.includes('sla')) {
    breachedOnly = true
    summary.push('Filter = SLA Breached / Warning')
  }
  const matchNum = q.match(/\d+/)
  if (matchNum && (q.includes('day') || q.includes('more than'))) {
    daysPendingMin = Number(matchNum[0])
    summary.push(`Days Pending > ${daysPendingMin}`)
  }
  if (!summary.length) {
    summary.push('Showing default filter context: All pending applications')
  }

  return { query, summary, daysPendingMin, breachedOnly }
}

export function detectLang(text: string): 'ta' | 'en' {
  return /[\u0B80-\u0BFF]/.test(text) ? 'ta' : 'en'
}

export function interpretGuide(text: string): { intent: 'scholarship' | 'career' | 'scheme' | 'course' | 'job' | 'general'; reply: string } {
  const t = text.toLowerCase()
  if (t.includes('scholarship') || t.includes('கல்வி') || t.includes('தொகை'))
    return { intent: 'scholarship', reply: 'Possible scholarship matches from your profile. This is not guaranteed eligibility.' }
  if (t.includes('python') || t.includes('next') || t.includes('course'))
    return { intent: 'course', reply: 'Based on a Python background, the next aligned skills are SQL, Pandas, and data analysis — not a job promise.' }
  if (t.includes('job') || t.includes('intern') || t.includes('வேலை'))
    return { intent: 'job', reply: 'Internships and jobs that align with your skills. Officers and employers decide outcomes.' }
  if (t.includes('scheme') || t.includes('திட்ட'))
    return { intent: 'scheme', reply: 'Government schemes that may apply. Always verify documents before applying.' }
  return { intent: 'general', reply: 'I can help you discover schemes, scholarships, courses, internships, and services. Ask in Tamil or English.' }
}
