import { useState, useRef } from 'react'
import { useToast } from '../context/ToastContext'
import { calcPrice, fmtNaira } from '../utils/pricing'
import styles from './Dashboard.module.css'

const NICHES = ['🏦 Fintech','💻 SaaS','🤖 AI/ML','🏥 Health','🌾 Agritech','🛒 E-comm']
const ROLES = ['Frontend Developer','Backend Developer','Full Stack Developer','Data Scientist / Analyst','Product Manager','UI/UX Designer','DevOps / Cloud Engineer','Mobile Developer','QA Engineer']
const LOCATIONS = ['Nigeria Only','Pan-African (All Countries)','Global Remote Only','All (Africa + Remote)']

const NAV_ITEMS = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '🚀', label: 'New Blast' },
  { icon: '📋', label: 'My Orders' },
  { icon: '📄', label: 'My Documents' },
  { icon: '⚙️', label: 'Settings' },
]

export default function Dashboard({ user, onLogout }) {
  const { showToast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')

  // Blast form state
  const [cvFile, setCvFile] = useState(null)
  const [clFile, setClFile] = useState(null)
  const [role, setRole] = useState('')
  const [location, setLocation] = useState('')
  const [activeNiches, setActiveNiches] = useState(['🏦 Fintech'])
  const [count, setCount] = useState(200)

  const cvInputRef = useRef()
  const clInputRef = useRef()

  const firstName = user?.name?.split(' ')[0] || 'there'
  const cap = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  const avatarLetter = cap.charAt(0)

  const { total } = calcPrice(count)

  function handleSlider(e) { setCount(Number(e.target.value)) }
  function handleNumInput(e) {
    let v = Number(e.target.value)
    if (isNaN(v)) return
    if (v < 10) { showToast('Minimum is 10 companies', 'error'); v = 10 }
    v = Math.min(v, 20000)
    setCount(v)
  }
  function toggleNiche(n) {
    setActiveNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])
  }
  function handleCvUpload(e) {
    const f = e.target.files[0]
    if (f) { setCvFile(f); showToast('CV uploaded! 📄', 'success') }
  }
  function handleClUpload(e) {
    const f = e.target.files[0]
    if (f) { setClFile(f); showToast('Cover letter uploaded! ✉️', 'success') }
  }
  function handlePayment() {
    if (!role) { showToast('Please select your role', 'error'); return }
    if (!location) { showToast('Please select your preferred location', 'error'); return }
    showToast('Initialising payment... ⚡', 'info')
    setTimeout(() => showToast('Complete your bank transfer or card payment', 'info'), 1800)
    setTimeout(() => {
      showToast('Payment confirmed! 🎉', 'success')
      setTimeout(() => showToast(`Blasting your CV to ${count.toLocaleString()} companies now 🚀`, 'success'), 1000)
    }, 4500)
  }

  return (
    <div className={styles.layout}>
      {/* Mobile topbar */}
      <div className={styles.topbar}>
        <span className={styles.topbarLogo}>Reach<span>Hire</span></span>
        <button
          className={`${styles.hamburger} ${sidebarOpen ? styles.open : ''}`}
          onClick={() => setSidebarOpen(o => !o)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sbLogo}>Reach<span>Hire</span></div>
        <nav className={styles.sbNav}>
          {NAV_ITEMS.map(item => (
            <div
              key={item.label}
              className={`${styles.snItem} ${activeNav === item.label ? styles.snActive : ''}`}
              onClick={() => { setActiveNav(item.label); setSidebarOpen(false) }}
            >
              <span className={styles.snIcon}>{item.icon}</span>
              {item.label}
            </div>
          ))}
          <div className={`${styles.snItem} ${styles.snLogout}`} onClick={onLogout}>
            <span className={styles.snIcon}>🚪</span> Logout
          </div>
        </nav>
        <div className={styles.sbUser}>
          <div className={styles.sbAvatar}>{avatarLetter}</div>
          <div>
            <div className={styles.sbName}>{user?.name || 'User'}</div>
            <div className={styles.sbEmail}>{user?.email || ''}</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        <div className={styles.dashHeader}>
          <div>
            <div className={styles.dashTitle}>Welcome back, {cap} 👋</div>
            <div className={styles.dashSub}>Ready to blast your CV to more companies?</div>
          </div>
          <button className="btn-primary" onClick={() => showToast('Scroll down to create a new blast!', 'info')}>
            + New Blast
          </button>
        </div>

        {/* Stats */}
        <div className={styles.statsRow}>
          {[
            { icon: '📤', val: '847', lbl: 'CVs Sent' },
            { icon: '🏢', val: '12',  lbl: 'Blasts Made' },
            { icon: '💬', val: '3',   lbl: 'Responses' },
            { icon: '💰', val: '₦47k',lbl: 'Total Spent' },
          ].map(s => (
            <div key={s.lbl} className={styles.statCard}>
              <div className={styles.scIcon}>{s.icon}</div>
              <div className={styles.scVal}>{s.val}</div>
              <div className={styles.scLbl}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.dashGrid}>
          {/* Blast Form */}
          <div className={styles.dCard}>
            <div className={styles.dCardTitle}>🚀 New CV Blast</div>

            {/* CV Upload */}
            <div className={styles.uploadLabel}>Your CV</div>
            {!cvFile ? (
              <div className="upload-zone" onClick={() => cvInputRef.current.click()}>
                <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display:'none' }} onChange={handleCvUpload} />
                <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
                <div className={styles.uzText}>Drop CV here or click to browse</div>
                <div className={styles.uzSub}>PDF, DOC, DOCX · Max 5MB</div>
              </div>
            ) : (
              <div className={styles.uploadedFile}>
                <span>📄</span>
                <span className={styles.ufName}>{cvFile.name}</span>
                <span className={styles.ufRm} onClick={() => setCvFile(null)}>✕</span>
              </div>
            )}

            {/* Cover Letter Upload */}
            <div className={styles.uploadLabel}>Cover Letter</div>
            {!clFile ? (
              <div className="upload-zone" onClick={() => clInputRef.current.click()}>
                <input ref={clInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display:'none' }} onChange={handleClUpload} />
                <div style={{ fontSize: 32, marginBottom: 8 }}>✉️</div>
                <div className={styles.uzText}>Drop cover letter here or click</div>
                <div className={styles.uzSub}>PDF, DOC, DOCX · Max 5MB</div>
              </div>
            ) : (
              <div className={styles.uploadedFile}>
                <span>✉️</span>
                <span className={styles.ufName}>{clFile.name}</span>
                <span className={styles.ufRm} onClick={() => setClFile(null)}>✕</span>
              </div>
            )}

            {/* Role + Location */}
            <select className={`form-select ${styles.selectGap}`} value={role} onChange={e => setRole(e.target.value)}>
              <option value="">🎯 Select your role...</option>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
            <select className="form-select" value={location} onChange={e => setLocation(e.target.value)}>
              <option value="">🌍 Preferred location...</option>
              {LOCATIONS.map(l => <option key={l}>{l}</option>)}
            </select>

            {/* Industries */}
            <div className={styles.nicheLbl}>Industries</div>
            <div className={styles.nicheTags}>
              {NICHES.map(n => (
                <button key={n} className={`ntag ${activeNiches.includes(n) ? 'active' : ''}`} onClick={() => toggleNiche(n)}>{n}</button>
              ))}
            </div>

            {/* Slider */}
            <div className={styles.sliderWrap}>
              <div className={styles.sliderTop}>
                <div>
                  <div className={styles.sliderLbl}>Companies to reach</div>
                  <div className={styles.sliderCount}>{count.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className={styles.sliderLbl}>Total</div>
                  <div className={styles.sliderPrice}>{fmtNaira(total)}</div>
                </div>
              </div>
              <input type="range" min="10" max="20000" step="10" value={count} onChange={handleSlider} style={{ width:'100%', margin: '12px 0' }} />
              <div className={styles.inputRow}>
                <span className={styles.inputLbl}>Or type a number:</span>
                <input type="number" className="company-num-input" min="10" max="20000" value={count} onChange={handleNumInput} />
              </div>
            </div>

            <button className={styles.sendBtn} onClick={handlePayment}>
              Proceed to Payment ⚡
            </button>
          </div>

          {/* Right column */}
          <div className={styles.rightCol}>
            {/* Progress */}
            <div className={styles.dCard}>
              <div className={styles.dCardTitle}>📊 Latest Blast Progress</div>
              {[
                { lbl: '🇳🇬 Nigeria',       val: '245 / 478', pct: 51 },
                { lbl: '🌍 Global Remote',   val: '210 / 277', pct: 76 },
                { lbl: '🇰🇪 Kenya',          val: '72 / 88',   pct: 82 },
                { lbl: '🇿🇦 South Africa',   val: '48 / 91',   pct: 53 },
              ].map(p => (
                <div key={p.lbl} className={styles.progItem}>
                  <div className={styles.progHead}>
                    <span className={styles.progLbl}>{p.lbl}</span>
                    <span className={styles.progVal}>{p.val}</span>
                  </div>
                  <div className="prog-bar">
                    <div className="prog-fill" style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Orders */}
            <div className={styles.dCard}>
              <div className={styles.dCardTitle}>📋 Recent Orders</div>
              {[
                { icon:'🚀', name:'Blast #12 — Fintech Focus',  meta:'500 companies · ₦75,000 · Today',     status:'sending', statusTxt:'Sending...' },
                { icon:'📤', name:'Blast #11 — SaaS & Remote',  meta:'200 companies · ₦30,000 · 3 days ago',status:'sent',    statusTxt:'Sent ✓' },
                { icon:'📤', name:'Blast #10 — Nigeria Only',   meta:'100 companies · ₦15,000 · 1 week ago',status:'sent',    statusTxt:'Sent ✓' },
                { icon:'📤', name:'Blast #9 — All Africa',      meta:'50 companies · ₦7,500 · 2 weeks ago', status:'sent',    statusTxt:'Sent ✓' },
              ].map(o => (
                <div key={o.name} className={styles.orderItem}>
                  <div className={styles.oIcon}>{o.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div className={styles.oName}>{o.name}</div>
                    <div className={styles.oMeta}>{o.meta}</div>
                  </div>
                  <div className={`o-status ${o.status}`}>{o.statusTxt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
