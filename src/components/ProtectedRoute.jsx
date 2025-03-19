import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ adminOnly = false }) {
  const { user, userProfile, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }
  
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  // If admin route but user is not admin
  if (adminOnly && userProfile?.user_type !== 'admin') {
    return <Navigate to="/" replace />
  }
  
  return <Outlet />
}