import { useState, useEffect } from 'react'
import { ToastProvider } from './context/ToastContext'
import LandingPage   from './pages/LandingPage'
import AuthPage      from './pages/AuthPage'
import DashboardPage from './pages/DashboardPage'
import TermsPage     from './pages/termspage'
import PrivacyPage   from './pages/privacypage'
import AboutPage     from './pages/aboutpage'

function AppContent() {
  const [page,       setPage]       = useState('landing')
  const [authTab,    setAuthTab]    = useState('login')
  const [user,       setUser]       = useState(null)
  const [aboutScroll, setAboutScroll] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token      = params.get('token')
    const userParam  = params.get('user')
    const error      = params.get('error')

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

    function handleNavigate(e) { setPage(e.detail) }
    window.addEventListener('navigate', handleNavigate)
    return () => window.removeEventListener('navigate', handleNavigate)
  }, [])

  function goAuth(tab = 'signup') {
    if (tab === 'terms' || tab === 'privacy') {
      setPage(tab); window.scrollTo(0, 0); return
    }
    if (tab === 'about' || tab === 'contact') {
      setAboutScroll(tab === 'contact' ? 'contact' : null)
      setPage('about'); window.scrollTo(0, 0); return
    }
    setAuthTab(tab); setPage('auth'); window.scrollTo(0, 0)
  }
  function goLanding() {
    localStorage.removeItem('rh_token')
    localStorage.removeItem('rh_user')
    setUser(null); setPage('landing'); window.scrollTo(0, 0)
  }
  function goDashboard(userData) {
    localStorage.setItem('rh_user', JSON.stringify(userData))
    setUser(userData); setPage('dashboard'); window.scrollTo(0, 0)
  }

  return (
    <>
      {page === 'landing'   && <LandingPage   onGetStarted={goAuth} />}
      {page === 'auth'      && <AuthPage      defaultTab={authTab} onLogin={goDashboard} onBack={goLanding} />}
      {page === 'dashboard' && <DashboardPage user={user} onLogout={goLanding} />}
      {page === 'terms'     && <TermsPage     onBack={goLanding} />}
      {page === 'privacy'   && <PrivacyPage   onBack={goLanding} />}
      {page === 'about'     && <AboutPage     onBack={goLanding} scrollTo={aboutScroll} />}
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