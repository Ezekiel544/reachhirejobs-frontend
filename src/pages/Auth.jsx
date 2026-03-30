import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import styles from './Auth.module.css'

// const GoogleIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24">
//     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//   </svg>
// )

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5001'

export default function Auth({ defaultTab = 'login', onLogin, onBack }) {
  const [tab, setTab] = useState(defaultTab)
  const [googleLoading, setGoogleLoading] = useState(false)
  const { showToast } = useToast()

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')

  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPass, setSignupPass] = useState('')


  function handleSignup() {
    if (!signupName || !signupEmail || !signupPass) { showToast('Please fill in all fields', 'error'); return }
    if (!signupEmail.includes('@')) { showToast('Enter a valid email address', 'error'); return }
    if (signupPass.length < 8) { showToast('Password must be at least 8 characters', 'error'); return }
    onLogin({ name: signupName, email: signupEmail })
  }

  function handleGoogle() {
    setGoogleLoading(true)
    setTimeout(() => {
      window.location.href = `${BACKEND_URL}/api/auth/google`
    }, 1500)
  }

  if (googleLoading) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#fff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, gap: 20,
      }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a' }}>
          Reach<span style={{ color: 'var(--blue)' }}>HireJobs</span>
        </div>
        <div style={{
          width: 44, height: 44, border: '4px solid #e2e8f0',
          borderTop: '4px solid var(--blue)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <div style={{ fontSize: 15, color: '#64748b', fontWeight: 500 }}>
          Redirecting to Google...
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>RJobto<span>Mail</span></div>
        <div className={styles.tagline}>Get your CV to 1,223+ tech companies across Africa</div>

        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'login' ? styles.active : ''}`} onClick={() => setTab('login')}>Sign In</button>
          <button className={`${styles.tab} ${tab === 'signup' ? styles.active : ''}`} onClick={() => setTab('signup')}>Sign Up</button>
        </div>

        {tab === 'login' ? (
          <div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={loginPass} onChange={e => setLoginPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
            <button className={styles.authBtn} onClick={handleLogin}>Sign In →</button>
            <div className={styles.divider}>or continue with</div>
            <button className={styles.googleBtn} onClick={handleGoogle}><GoogleIcon /> Google</button>
          </div>
        ) : (
          <div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input className="form-input" type="text" placeholder="John Doe" value={signupName} onChange={e => setSignupName(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input className="form-input" type="password" placeholder="Min. 8 characters" value={signupPass} onChange={e => setSignupPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSignup()} />
            </div>
            <button className={styles.authBtn} onClick={handleSignup}>Create Account →</button>
            <div className={styles.divider}>or continue with</div>
            <button className={styles.googleBtn} onClick={handleGoogle}><GoogleIcon /> Google</button>
          </div>
        )}

        <span className={styles.backLink} onClick={onBack}>← Back to homepage</span>
      </div>
    </div>
  )
}