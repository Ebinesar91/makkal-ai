export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot-password',
  REGISTER: {
    ROOT: '/register',
    STEP: (step: number | string) => `/register/${step}`,
  },

  CITIZEN: {
    DASHBOARD: '/citizen',
    AI_GUIDE: '/citizen/ai',
    SCHEMES: '/citizen/schemes',
    SCHEME_DETAIL: (id: string = ':id') => `/citizen/schemes/${id}`,
    SERVICES: '/citizen/services',
    MATCHES: '/citizen/matches',
    APPLICATIONS: '/citizen/applications',
    APPLICATION_DETAIL: (id: string = ':id') => `/citizen/applications/${id}`,
    PROFILE: '/citizen/profile',
    HEALTHCARE: '/citizen/healthcare',
    LIFE_EVENTS: '/citizen/life-events',
    LIFE_RESULTS: '/citizen/life-results',
  },

  STUDENT: {
    DASHBOARD: '/student',
    SCHOLARSHIPS: '/student/scholarships',
    COURSES: '/student/courses',
    CERTIFICATES: '/student/certificates',
    SKILLS: '/student/skills',
    INTERNSHIPS: '/student/internships',
    JOBS: '/student/jobs',
  },

  OPERATOR: {
    DASHBOARD: '/operator',
    ASSISTED: '/operator/assisted',
  },

  OFFICER: {
    DASHBOARD: '/officer',
    APPLICATIONS: '/officer/applications',
    APPLICATION_DETAIL: (id: string = ':id') => `/officer/applications/${id}`,
    AI_FILTER: '/officer/ai-filter',
    SLA: '/officer/sla',
    ACCOUNTABILITY: '/officer/accountability',
    SLA_BREACH: '/officer/sla-breach',
  },

  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    SCHEMES: '/admin/schemes',
    OFFICERS: '/admin/officers',
    AUDIT: '/admin/audit',
  },

  SUPER_ADMIN: {
    DASHBOARD: '/super-admin',
    RBAC: '/super-admin/rbac',
    DEPARTMENTS: '/super-admin/departments',
    SECURITY: '/super-admin/security',
  },

  EASY: {
    MODE: '/easy-mode',
    VOICE: '/easy-voice',
  },
} as const
