import { useState, useEffect } from 'react'
import { ToastProvider } from './context/ToastContext'
import LandingPage   from './pages/LandingPage'
import AuthPage      from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'

function AppContent() {
  const [page,    setPage]    = useState('landing')
  const [authTab, setAuthTab] = useState('login')
  const [user,    setUser]    = useState(null)

  // Handle Google OAuth redirect — token comes back to the root URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token  = params.get('token')
    const userParam = params.get('user')
    const error  = params.get('error')

    if (error) {
      window.history.replaceState({}, '', '/')
      return
    }

    if (token && userParam) {
      try {
        localStorage.setItem('rh_token', token)
        const parsedUser = JSON.parse(decodeURIComponent(userParam))
        window.history.replaceState({}, '', '/')
        setUser(parsedUser)
        setPage('dashboard')
      } catch {
        window.history.replaceState({}, '', '/')
      }
    }

    // Auto-login if token already exists
    const savedToken = localStorage.getItem('rh_token')
    const savedUser  = localStorage.getItem('rh_user')
    if (savedToken && savedUser && !token) {
      try {
        setUser(JSON.parse(savedUser))
        setPage('dashboard')
      } catch {
        localStorage.clear()
      }
    }
  }, [])

  function goAuth(tab = 'signup') {
    setAuthTab(tab); setPage('auth'); window.scrollTo(0,0)
  }
  function goLanding() {
    localStorage.removeItem('rh_token')
    localStorage.removeItem('rh_user')
    setUser(null); setPage('landing'); window.scrollTo(0,0)
  }
  function goDashboard(userData) {
    localStorage.setItem('rh_user', JSON.stringify(userData))
    setUser(userData); setPage('dashboard'); window.scrollTo(0,0)
  }

  return (
    <>
      {page === 'landing'   && <LandingPage   onGetStarted={goAuth} />}
      {page === 'auth'      && <AuthPage      defaultTab={authTab} onLogin={goDashboard} onBack={goLanding} />}
      {page === 'dashboard' && <DashboardPage user={user} onLogout={goLanding} />}
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  )
}
