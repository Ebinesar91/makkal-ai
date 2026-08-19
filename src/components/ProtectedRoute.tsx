import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import type { Role } from '../lib/types'
import { useApp } from '../state/AppState'

interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles: Role[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { session } = useApp()

  if (!session.role) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (!allowedRoles.includes(session.role)) {
    // Redirect unauthorized user to their respective allowed dashboard
    if (session.role === 'officer') return <Navigate to={ROUTES.OFFICER.DASHBOARD} replace />
    if (session.role === 'operator') return <Navigate to={ROUTES.OPERATOR.DASHBOARD} replace />
    if (session.role === 'admin') return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />
    if (session.role === 'super-admin') return <Navigate to={ROUTES.SUPER_ADMIN.DASHBOARD} replace />
    if (session.role === 'student') return <Navigate to={ROUTES.STUDENT.DASHBOARD} replace />
    return <Navigate to={ROUTES.CITIZEN.DASHBOARD} replace />
  }

  return <>{children}</>
}
