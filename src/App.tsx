import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ROUTES } from './config/routes'

// Modular Page Imports
import LandingPage from './pages/LandingPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'

import { ApplicationDetail } from './pages/citizen/ApplicationDetail'
import { ApplicationsPage } from './pages/citizen/ApplicationsPage'
import { AiGuideChat } from './pages/citizen/AiGuideChat'
import { GovtServices } from './pages/citizen/GovtServices'
import { HomeDashboard } from './pages/citizen/HomeDashboard'
import { MatchesPage } from './pages/citizen/MatchesPage'
import { ProfilePage } from './pages/citizen/ProfilePage'
import { SchemeDetail } from './pages/citizen/SchemeDetail'
import { SchemesListing } from './pages/citizen/SchemesListing'

import { CertificatesPage } from './pages/student/CertificatesPage'
import { CoursesPage } from './pages/student/CoursesPage'
import { InternshipsPage } from './pages/student/InternshipsPage'
import { JobsPage } from './pages/student/JobsPage'
import { ScholarshipsPage } from './pages/student/ScholarshipsPage'
import { SkillGapPage } from './pages/student/SkillGapPage'
import { StudentDashboard } from './pages/student/StudentDashboard'

import { OperatorDashboard } from './pages/operator/OperatorDashboard'

import { OfficerAccountability } from './pages/officer/OfficerAccountability'
import { OfficerAiFilter } from './pages/officer/OfficerAiFilter'
import { OfficerApplicationDetail } from './pages/officer/OfficerApplicationDetail'
import { OfficerDashboard } from './pages/officer/OfficerDashboard'
import { OfficerSlaBreach } from './pages/officer/OfficerSlaBreach'
import { OfficerSlaMonitoring } from './pages/officer/OfficerSlaMonitoring'

import { AdminDashboard } from './pages/admin/AdminDashboard'
import { SuperAdminDashboard } from './pages/admin/SuperAdminDashboard'

import { EasyMode, EasyVoice } from './pages/easy/EasyMode'
import { AppStateProvider } from './state/AppState'

export default function App() {
  return (
    <AppStateProvider>
      <BrowserRouter>
        <div className="min-h-svh flex flex-col bg-cream">
          <div className="flex-1">
            <Routes>
              {/* Public Entry Points */}
              <Route path={ROUTES.LANDING} element={<LandingPage />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
              <Route path={ROUTES.REGISTER.ROOT} element={<Navigate to={ROUTES.REGISTER.STEP(1)} replace />} />
              <Route path="/register/:step" element={<RegisterPage />} />

              {/* Citizen Routes */}
              <Route path={ROUTES.CITIZEN.DASHBOARD} element={<HomeDashboard />} />
              <Route path={ROUTES.CITIZEN.AI_GUIDE} element={<AiGuideChat />} />
              <Route path={ROUTES.CITIZEN.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.CITIZEN.SCHEMES} element={<SchemesListing />} />
              <Route path="/citizen/schemes/:id" element={<SchemeDetail />} />
              <Route path={ROUTES.CITIZEN.SERVICES} element={<GovtServices />} />
              <Route path={ROUTES.CITIZEN.MATCHES} element={<MatchesPage />} />
              <Route path={ROUTES.CITIZEN.APPLICATIONS} element={<ApplicationsPage />} />
              <Route path="/citizen/applications/:id" element={<ApplicationDetail />} />

              {/* Student Routes */}
              <Route path={ROUTES.STUDENT.DASHBOARD} element={<StudentDashboard />} />
              <Route path={ROUTES.STUDENT.SCHOLARSHIPS} element={<ScholarshipsPage />} />
              <Route path={ROUTES.STUDENT.COURSES} element={<CoursesPage />} />
              <Route path={ROUTES.STUDENT.CERTIFICATES} element={<CertificatesPage />} />
              <Route path={ROUTES.STUDENT.SKILLS} element={<SkillGapPage />} />
              <Route path={ROUTES.STUDENT.INTERNSHIPS} element={<InternshipsPage />} />
              <Route path={ROUTES.STUDENT.JOBS} element={<JobsPage />} />

              {/* Protected Operator Routes */}
              <Route
                path={ROUTES.OPERATOR.DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['operator', 'admin', 'super-admin']}>
                    <OperatorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path={ROUTES.OPERATOR.ASSISTED} element={<Navigate to={ROUTES.OPERATOR.DASHBOARD} replace />} />

              {/* Protected Officer Routes */}
              <Route
                path={ROUTES.OFFICER.DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['officer', 'admin', 'super-admin']}>
                    <OfficerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/officer/applications/:id"
                element={
                  <ProtectedRoute allowedRoles={['officer', 'admin', 'super-admin']}>
                    <OfficerApplicationDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.OFFICER.AI_FILTER}
                element={
                  <ProtectedRoute allowedRoles={['officer', 'admin', 'super-admin']}>
                    <OfficerAiFilter />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.OFFICER.SLA}
                element={
                  <ProtectedRoute allowedRoles={['officer', 'admin', 'super-admin']}>
                    <OfficerSlaMonitoring />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.OFFICER.ACCOUNTABILITY}
                element={
                  <ProtectedRoute allowedRoles={['officer', 'admin', 'super-admin']}>
                    <OfficerAccountability />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.OFFICER.SLA_BREACH}
                element={
                  <ProtectedRoute allowedRoles={['officer', 'admin', 'super-admin']}>
                    <OfficerSlaBreach />
                  </ProtectedRoute>
                }
              />

              {/* Protected Admin & Super Admin Routes */}
              <Route
                path={ROUTES.ADMIN.DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.SUPER_ADMIN.DASHBOARD}
                element={
                  <ProtectedRoute allowedRoles={['super-admin']}>
                    <SuperAdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Easy Mode Routes */}
              <Route path={ROUTES.EASY.MODE} element={<EasyMode />} />
              <Route path={ROUTES.EASY.VOICE} element={<EasyVoice />} />

              {/* Legacy Flat Route Redirects for Compatibility */}
              <Route path="/home" element={<Navigate to={ROUTES.CITIZEN.DASHBOARD} replace />} />
              <Route path="/ai-guide" element={<Navigate to={ROUTES.CITIZEN.AI_GUIDE} replace />} />
              <Route path="/profile" element={<Navigate to={ROUTES.CITIZEN.PROFILE} replace />} />
              <Route path="/schemes" element={<Navigate to={ROUTES.CITIZEN.SCHEMES} replace />} />
              <Route path="/scheme-detail" element={<Navigate to={ROUTES.CITIZEN.SCHEME_DETAIL('scheme-laptop')} replace />} />
              <Route path="/services" element={<Navigate to={ROUTES.CITIZEN.SERVICES} replace />} />
              <Route path="/matches" element={<Navigate to={ROUTES.CITIZEN.MATCHES} replace />} />
              <Route path="/applications" element={<Navigate to={ROUTES.CITIZEN.APPLICATIONS} replace />} />
              <Route path="/application-detail" element={<Navigate to={ROUTES.CITIZEN.APPLICATION_DETAIL('A10231')} replace />} />
              <Route path="/scholarships" element={<Navigate to={ROUTES.STUDENT.SCHOLARSHIPS} replace />} />
              <Route path="/courses" element={<Navigate to={ROUTES.STUDENT.COURSES} replace />} />
              <Route path="/certificates" element={<Navigate to={ROUTES.STUDENT.CERTIFICATES} replace />} />
              <Route path="/skill-gap" element={<Navigate to={ROUTES.STUDENT.SKILLS} replace />} />
              <Route path="/internships" element={<Navigate to={ROUTES.STUDENT.INTERNSHIPS} replace />} />
              <Route path="/jobs" element={<Navigate to={ROUTES.STUDENT.JOBS} replace />} />
              <Route path="/officer-application" element={<Navigate to={ROUTES.OFFICER.APPLICATION_DETAIL('A10231')} replace />} />
              <Route path="/assisted-operator" element={<Navigate to={ROUTES.OPERATOR.DASHBOARD} replace />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppStateProvider>
  )
}
