/*
 * DashboardPage.jsx — full Paystack + email blast integration
 */
import { useState, useRef, useEffect } from 'react'
import { useToast } from '../context/ToastContext'
import { calcPrice, fmtNaira } from '../utils/pricing'
import { ordersAPI, profileAPI, paymentAPI } from '../utils/api'
import Emailicon from './images/spent.png'
import Blasticon from './images/blastmade.png'
import Usericon from './images/usericon.png'
import Moneyicon from './images/money.png'
import Dateicon from './images/date.png'
import Refreshicon from './images/reload.png'
import Dashboardicon from './images/dashboard.png'
import Companyicon from './images/company.svg'
import Editicon from './images/editicon.png'
import Linkdlnicon from './images/linkdln.svg'
import Outgoingicon from './images/outgoing.svg'
import SettingsPage from './SettingsPage'
import './DashboardPage.css'

const NAV_ITEMS = [
  { icon: <img src={Dashboardicon} alt="dashboard" width={18} height={18} className='mt-12'/>, label: 'Dashboard' },
  { icon: <img src={Usericon} alt="cv builder" width={18} height={18} className='mt-12'/>, label: 'CV Builder', soon: true },
  { icon: <img src={Linkdlnicon} alt="linkedin" width={24} height={24} className='mt-12'/>, label: 'LI Blaster', soon: true },
  { icon: '⚙️', label: 'Settings' },
]
const ROLES = [
  'Frontend Developer','Backend Developer','Full Stack Developer',
  'Data Scientist / Analyst','Product Manager','UI/UX Designer',
  'DevOps / Cloud Engineer','Mobile Developer','QA Engineer',
]
const LOCATIONS = [
  'Nigeria Only','Pan-African (All Countries)',
  'Global Remote Only','All (Africa + Remote)',
]
const NICHES = [' Fintech','SaaS',' AI/ML',' Health',' Agritech',' E-comm',' Tech/Software',' Insurtech',' Marketing',' Telecom',' Media',' HR Tech',' Crypto',' Cloud/DevOps',' GovTech',' CleanTech']

function StatusBadge({ status }) {
  const map = {
    pending: { cls:'badge-pending', txt:'Pending Payment' },
    paid:    { cls:'badge-sending', txt:'Paid ✓' },
    sending: { cls:'badge-sending', txt: <span style={{display:'flex',alignItems:'center',gap:4}}>Sending... </span> },
    sent:    { cls:'badge-sent',    txt:'Sent ✓' },
    failed:  { cls:'badge-pending', txt:'Failed' },
  }
  const b = map[status] || map.pending
  return <span className={b.cls}>{b.txt}</span>
}

function timeAgo(dateStr) {
  const diff  = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days  = Math.floor(diff / 86400000)
  if (mins  < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days === 1) return 'Yesterday'
  if (days  <  7) return `${days} days ago`
  return new Date(dateStr).toLocaleDateString()
}

export default function DashboardPage({ user, onLogout }) {
  const { showToast } = useToast()
  const [sidebarOpen,    setSidebarOpen]    = useState(false)
  const [activeNav,      setActiveNav]      = useState('Dashboard')
  const [profile,        setProfile]        = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [stats,          setStats]          = useState(null)
  const [orders,         setOrders]         = useState([])
  const [loadingStats,   setLoadingStats]   = useState(true)
  const [loadingOrders,  setLoadingOrders]  = useState(true)
  const [cvFile,         setCvFile]         = useState(null)
  const [clFile,         setClFile]         = useState(null)
  const [role,           setRole]           = useState('')
  const [location,       setLocation]       = useState('')
  const [activeNiches,   setActiveNiches]   = useState(['🏦 Fintech'])
  const [count,          setCount]          = useState(20)
  const [submitting,     setSubmitting]     = useState(false)
  const [companyCount,   setCompanyCount]   = useState(1223)
  const [pendingRef,     setPendingRef]     = useState(null)
  const [resumeOrder,    setResumeOrder]    = useState(null)
  const ordersScrollRef = useRef()
  const cvRef = useRef()
  const clRef = useRef()

  const firstName = (user?.name || 'there').split(' ')[0]
  const cap       = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  const { total } = calcPrice(count)

  useEffect(() => {
    loadAll()
    const saved = localStorage.getItem('rh_pending_ref')
    if (saved) setPendingRef(saved)
  }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updated = await ordersAPI.getAll()
        setOrders(updated)
        const active = updated.some(o => o.status === 'sending' || o.status === 'paid')
        if (active) {
          const s = await ordersAPI.getStats()
          setStats(s)
        }
      } catch {}
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function retryPendingVerify() {
      const pending = localStorage.getItem('pending_verify')
      if (!pending) return
      try {
        const { reference, orderId } = JSON.parse(pending)
        await paymentAPI.verify(reference, orderId)
        localStorage.removeItem('pending_verify')
        showToast('Payment verified! Blast starting 🚀', 'success')
        await fetchOrders()
        await fetchStats()
        startPolling()
      } catch (err) {
        console.log('Retry verify failed:', err.message)
      }
    }
    retryPendingVerify()
    window.addEventListener('focus', retryPendingVerify)
    return () => window.removeEventListener('focus', retryPendingVerify)
  }, [])

  async function loadAll() {
    await Promise.all([loadProfile(), fetchStats(), fetchOrders(), fetchCompanyCount()])
  }

  async function fetchCompanyCount() {
    try {
      const { count } = await ordersAPI.getCompanyCount()
      setCompanyCount(count)
    } catch { setCompanyCount(1223) }
  }

  async function loadProfile() {
    try {
      setProfileLoading(true)
      const data = await profileAPI.get()
      setProfile(data)
      if (data.role)               setRole(data.role)
      if (data.location)           setLocation(data.location)
      if (data.industries?.length) setActiveNiches(data.industries)
    } catch { setProfile(null) }
    finally  { setProfileLoading(false) }
  }

  async function fetchStats() {
    try {
      setLoadingStats(true)
      const data = await ordersAPI.getStats()
      setStats(data)
    } catch { setStats({ totalCVsSent:0, totalBlasts:0, totalSpent:0 }) }
    finally  { setLoadingStats(false) }
  }

  async function fetchOrders() {
    try {
      setLoadingOrders(true)
      const data = await ordersAPI.getAll()
      setOrders(data)
    } catch { setOrders([]) }
    finally  { setLoadingOrders(false) }
  }

  function scrollOrdersToTop() {
    ordersScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSlider(e) { setCount(Number(e.target.value)) }
  function handleNumInput(e) {
    let v = Number(e.target.value)
    if (isNaN(v)) return
    if (v < 20) { showToast('Minimum is 20 companies', 'error'); v = 20 }
    if (v > companyCount) { showToast(`Maximum is ${companyCount.toLocaleString()} companies (all we have)`, 'info'); v = companyCount }
    setCount(Math.min(v, companyCount))
  }
  function toggleNiche(n) {
    setActiveNiches(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  }
  function handleCvUpload(e) { const f = e.target.files[0]; if (f) { setCvFile(f); showToast('CV uploaded! 📄', 'success') } }
  function handleClUpload(e) { const f = e.target.files[0]; if (f) { setClFile(f); showToast('Cover letter uploaded! ✉️', 'success') } }

  const effectiveCv     = cvFile ? cvFile.name : profile?.cvOriginalName || null
  const effectiveCl     = clFile ? clFile.name : profile?.clOriginalName || null
  const profileComplete = profile?.profileComplete

  function startPolling() {
    scrollOrdersToTop()
    const poll = setInterval(async () => {
      try {
        const updated = await ordersAPI.getAll()
        setOrders(updated)
        const stillRunning = updated.some(o => o.status === 'sending' || o.status === 'paid')
        if (!stillRunning) { clearInterval(poll); fetchStats() }
      } catch { clearInterval(poll) }
    }, 4000)
    setTimeout(() => clearInterval(poll), 600000)
  }

  async function handleConfirmBlast() {
    const ref = pendingRef || localStorage.getItem('rh_pending_ref')
    if (!ref) { showToast('No pending payment found', 'error'); return }
    try {
      setSubmitting(true)
      showToast('Verifying payment...', 'info')
      const result = await paymentAPI.verifyByReference(ref)
      setPendingRef(null)
      localStorage.removeItem('rh_pending_ref')
      showToast('🎉 Your CV is being blasted now!', 'success')
      await fetchOrders()
      await fetchStats()
      startPolling()
    } catch (err) {
      showToast(err.message || 'Verification failed', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  function openPaystack({ email, amount, orderId, publicKey }) {
    scrollOrdersToTop()
    const oid = String(orderId)
    const ref = `rh_${oid}_${Date.now()}`

    localStorage.setItem('rh_pending_ref', ref)
    localStorage.setItem('rh_pending_oid', oid)
    setPendingRef(ref)

    const handler = window.PaystackPop.setup({
      key:      publicKey,
      email,
      amount,
      currency: 'NGN',
      ref,
      metadata: { orderId: oid },
      onSuccess: (transaction) => {
        verifyPayment(transaction.reference || ref)
      },
      onCancel: () => {
        showToast('Payment cancelled — your order is saved, pay anytime', 'info')
        fetchOrders()
      },
    })
    handler.openIframe()

    let pollCount = 0
    const pollPayment = setInterval(async () => {
      pollCount++
      try {
        const result = await paymentAPI.verifyByReference(ref)
        if (result.message === 'Payment verified!') {
          clearInterval(pollPayment)
          setPendingRef(null)
          localStorage.removeItem('rh_pending_ref')
          localStorage.removeItem('rh_pending_oid')
          showToast('🎉 Your CV is being blasted to companies!', 'success')
          fetchOrders()
          fetchStats()
          startPolling()
        }
      } catch {}
      if (pollCount >= 40) clearInterval(pollPayment)
    }, 3000)
  }

  async function verifyPayment(ref) {
    try {
      const result = await paymentAPI.verifyByReference(ref)
      setPendingRef(null)
      localStorage.removeItem('rh_pending_ref')
      localStorage.removeItem('rh_pending_oid')
      showToast('🎉 Your CV is being blasted to companies!', 'success')
      fetchOrders()
      fetchStats()
      startPolling()
    } catch (err) {
      console.log('Verify error (will retry via poll):', err.message)
    }
  }

  async function handlePayment() {
    if (!profile?.intro) {
      showToast('Please complete your profile in Settings first', 'error')
      setActiveNav('Settings'); return
    }
    if (!role)        { showToast('Please select your role', 'error');                 return }
    if (!location)    { showToast('Please select your preferred location', 'error');   return }
    if (!effectiveCv) { showToast('Please upload your CV in Settings first', 'error'); setActiveNav('Settings'); return }

    try {
      setSubmitting(true)
      showToast('Creating your order...', 'info')

      const formData = new FormData()
      if (cvFile) formData.append('cv', cvFile)
      else        formData.append('useProfileCv', 'true')
      if (clFile) formData.append('coverLetter', clFile)
      else if (profile?.clFilePath) formData.append('useProfileCl', 'true')
      formData.append('companiesCount', count)
      formData.append('amount',         total)
      formData.append('role',           role)
      formData.append('location',       location)
      formData.append('industries',     JSON.stringify(activeNiches))

      const { order } = await ordersAPI.create(formData)
      showToast('Order created! Opening payment... ', 'info')
      scrollOrdersToTop()

      const payData = await paymentAPI.initialize(String(order._id))
      openPaystack(payData)

    } catch (err) {
      showToast(err.message || 'Failed to create order', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const latestOrder = orders.find(o => ['paid','sending','sent'].includes(o.status))
  const showBanner  = !profileLoading && !profileComplete

  return (
    <div className="dp-layout">
      <div className="dp-topbar">
        <span className="dp-topbar-logo">Swifty<span>Apply</span></span>
        <button className={`dp-hamburger ${sidebarOpen ? 'dp-ham-open' : ''}`}
          onClick={() => setSidebarOpen(o => !o)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </div>

      {sidebarOpen && <div className="dp-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`dp-sidebar ${sidebarOpen ? 'dp-sidebar-open' : ''}`}>
        <div className="dp-sb-logo">Swiftly<span>Apply</span></div>
        <nav className="dp-sb-nav">
          {NAV_ITEMS.filter(i => i.label !== 'Settings').map(item => (
            <div key={item.label}
              className={`dp-sn-item ${activeNav === item.label ? 'dp-sn-active' : ''} ${item.soon ? 'dp-sn-disabled' : ''}`}
              onClick={() => { if (!item.soon) { setActiveNav(item.label); setSidebarOpen(false) } }}>
              <span className="dp-sn-icon">{item.icon}</span>
              {item.label}
              {item.soon && <span className="dp-sn-soon">Coming Soon</span>}
            </div>
          ))}
          <div
            className={`dp-sn-item ${activeNav === 'Settings' ? 'dp-sn-active' : ''}`}
            style={{ marginTop: 'auto' }}
            onClick={() => { setActiveNav('Settings'); setSidebarOpen(false) }}>
            <span className="dp-sn-icon">⚙️</span> Settings
          </div>
        </nav>
        <div className="dp-sb-user">
          <div className="dp-sb-avatar">{cap.charAt(0)}</div>
          <div>
            <div className="dp-sb-name">{user?.name || 'User'}</div>
            <div className="dp-sb-email">{user?.email || ''}</div>
          </div>
        </div>
      </aside>

      <main className="dp-main">

        {activeNav === 'Settings' && (
          <SettingsPage user={user} onLogout={onLogout} onProfileUpdate={(updated) => {
            setProfile(updated)
            if (updated.role)               setRole(updated.role)
            if (updated.location)           setLocation(updated.location)
            if (updated.industries?.length) setActiveNiches(updated.industries)
          }} />
        )}

        {activeNav !== 'Settings' && (
          <>
            <div className="dp-header">
              <div>
                <div className="dp-title">Welcome back, {cap} 👋</div>
                <div className="dp-sub">Ready to blast your CV to more companies?</div>
              </div>
            </div>

            {showBanner && (
              <div className="dp-banner">
                <span className="dp-banner-icon">⚠️</span>
                <div className="dp-banner-text">
                  <strong>Your profile is incomplete</strong> — add your CV, role, and introduction to start blasting.
                </div>
                <button className="dp-banner-btn" onClick={() => setActiveNav('Settings')}>
                  Complete Profile →
                </button>
              </div>
            )}

            <div className="dp-stats-row">
              {[
                { icon:<img src={Emailicon} alt="email" width={50} height={50} />, val: loadingStats ? '...' : (stats?.totalCVsSent  || 0).toLocaleString(), lbl:'CVs Sent' },
                { icon:<img src={Dateicon} alt="blast" width={35} height={35} />, val: loadingStats ? '...' : (stats?.totalBlasts   || 0).toLocaleString(), lbl:'Blasts Made' },
                { icon:<img src={Companyicon} alt="company" width={45} height={45} />, val: loadingStats ? '...' : (stats?.totalCVsSent || 0).toLocaleString(), lbl:'CVs Delivered' },
                { icon:<img src={Moneyicon} alt="spent" width={45} height={45} />, val: loadingStats ? '...' : fmtNaira(stats?.totalSpent || 0), lbl:'Total Spent' },
              ].map(s => (
                <div key={s.lbl} className="dp-stat-card">
                  <div className="dp-sc-icon">{s.icon}</div>
                  <div className="dp-sc-val">{s.val}</div>
                  <div className="dp-sc-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            <div className="dp-grid">
              <div className="dp-card">
                <div className="dp-card-title"> New CV Blast</div>

                <div className="dp-upload-lbl">Your CV *</div>
                {!cvFile && effectiveCv ? (
                  <div className="dp-uploaded-file">
                    <span>📄</span>
                    <span className="dp-uf-name">{effectiveCv} <span className="dp-saved-tag">saved</span></span>
                    <span className="dp-uf-rm" onClick={() => cvRef.current.click()}><img src={Editicon} alt="edit" width={21} height={21} /></span>
                  </div>
                ) : !cvFile ? (
                  <div className="upload-zone" onClick={() => cvRef.current.click()}>
                    <div style={{ fontSize:32, marginBottom:8 }}>📄</div>
                    <div className="dp-uz-text">Drop CV here or click to browse</div>
                    <div className="dp-uz-sub">PDF, DOC, DOCX · Max 5MB</div>
                  </div>
                ) : (
                  <div className="dp-uploaded-file">
                    <span>📄</span><span className="dp-uf-name">{cvFile.name}</span>
                    <span className="dp-uf-rm" onClick={() => setCvFile(null)}>✕</span>
                  </div>
                )}
                <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" style={{ display:'none' }} onChange={handleCvUpload} />

                <div className="dp-upload-lbl">Cover Letter (optional)</div>
                {!clFile && effectiveCl ? (
                  <div className="dp-uploaded-file">
                    <span>✉️</span>
                    <span className="dp-uf-name">{effectiveCl} <span className="dp-saved-tag">saved</span></span>
                    <span className="dp-uf-rm" onClick={() => clRef.current.click()}><img src={Editicon} alt="edit" width={21} height={21} /></span>
                  </div>
                ) : !clFile ? (
                  <div className="upload-zone" onClick={() => clRef.current.click()}>
                    <div style={{ fontSize:32, marginBottom:8 }}>✉️</div>
                    <div className="dp-uz-text">Drop cover letter or click</div>
                    <div className="dp-uz-sub">PDF, DOC, DOCX · Max 5MB</div>
                  </div>
                ) : (
                  <div className="dp-uploaded-file">
                    <span>✉️</span><span className="dp-uf-name">{clFile.name}</span>
                    <span className="dp-uf-rm" onClick={() => setClFile(null)}>✕</span>
                  </div>
                )}
                <input ref={clRef} type="file" accept=".pdf,.doc,.docx" style={{ display:'none' }} onChange={handleClUpload} />

                <div className="sp-select-wrap">
                  <select className="rh-select dp-select-gap" value={role} onChange={e => setRole(e.target.value)}>
                    <option value="">Select your role...</option>
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                  <span className="sp-select-arrow">▾</span>
                </div>
                <div className="sp-select-wrap">
                  <select className="rh-select" value={location} onChange={e => setLocation(e.target.value)}>
                    <option value="">Preferred location...</option>
                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                  </select>
                  <span className="sp-select-arrow">▾</span>
                </div>

                <div className="dp-niche-lbl">Industries</div>
                <div className="dp-niche-tags">
                  {NICHES.map(n => (
                    <button key={n} className={`ntag ${activeNiches.includes(n) ? 'active' : ''}`}
                      onClick={() => toggleNiche(n)}>{n}</button>
                  ))}
                </div>

                <div className="dp-slider-wrap">
                  <div className="dp-slider-top">
                    <div>
                      <div className="dp-slider-lbl">Companies to reach <span style={{fontSize:11,color:"var(--gray-400)"}}>/ {companyCount.toLocaleString()} available</span></div>
                      <div className="dp-slider-count">{count.toLocaleString()}</div>
                    </div>
                    <div style={{ textAlign:'right' }}>
                      <div className="dp-slider-lbl">Total <span style={{fontSize:11,color:"var(--gray-400)"}}>@ ₦250/company</span></div>
                      <div className="dp-slider-price">{fmtNaira(total)}</div>
                    </div>
                  </div>
                  <input className="rh-range" type="range" min="20" max={companyCount} step="1"
                    value={count} onChange={handleSlider} style={{ width:'100%', margin:'12px 0' }} />
                  <div className="dp-num-row">
                    <span className="dp-num-lbl">Or type a number:</span>
                    <input className="rh-num-input" type="number" min="20" max={companyCount} value={count} onChange={handleNumInput} />
                  </div>
                </div>

                <button className="dp-send-btn" onClick={handlePayment} disabled={submitting}>
                  {submitting ? 'Processing...' : `Pay ${fmtNaira(total)} & Blast `}
                </button>
              </div>

              <div className="dp-right-col">
                <div className="dp-card">
                  <div className="dp-card-title-row">
                    <div className="dp-card-title"> Latest Blast Progress</div>
                  </div>
                  {!latestOrder ? (
                    <div className="dp-empty">No active blast yet. Create one to get started!</div>
                  ) : (
                    <>
                      <div className="dp-prog-order-name">{latestOrder.role} · {latestOrder.location}</div>
                      {[
                        { lbl:'🇳🇬 Nigeria',     pct:45 },
                        { lbl:'🌍 Global Remote', pct:25 },
                        { lbl:'🇰🇪 Kenya',        pct:15 },
                        { lbl:'🇿🇦 South Africa', pct:10 },
                      ].map(p => {
                        const sent  = Math.round((latestOrder.emailsSent || 0) * (p.pct / 100))
                        const total = Math.round(latestOrder.companiesCount * (p.pct / 100))
                        const pct   = total > 0 ? Math.round((sent / total) * 100) : 0
                        return (
                          <div key={p.lbl} className="dp-prog-item">
                            <div className="dp-prog-head">
                              <span className="dp-prog-lbl">{p.lbl}</span>
                              <span className="dp-prog-val">{sent} / {total}</span>
                            </div>
                            <div className="prog-bar"><div className="prog-fill" style={{ width:`${pct}%` }} /></div>
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>

      <div className="dp-card">
  <div className="dp-card-title-row">
    <div className="dp-card-title"> Recent Orders</div>
    <button className="dp-refresh-btn"
      onAnimationEnd={(e) => e.currentTarget.classList.remove('spinning')}
      onClick={(e) => {
        const btn = e.currentTarget
        btn.classList.remove('spinning')
        requestAnimationFrame(() => requestAnimationFrame(() => btn.classList.add('spinning')))
        fetchOrders()
      }}
      title="Refresh">
      <img src={Refreshicon} alt="Refresh" width={20} height={20} />
    </button>
  </div>
  {loadingOrders ? (
    <div className="dp-empty">Loading orders...</div>
  ) : orders.length === 0 ? (
    <div className="dp-empty">No orders yet. Create your first blast!</div>
  ) : (
    <div className="dp-orders-scroll-wrap">
      <div className="dp-orders-scroll" ref={ordersScrollRef}>
        {[...orders]
          .sort((a, b) => {
            if (resumeOrder?._id === a._id) return -1
            if (resumeOrder?._id === b._id) return 1
            const priority = { sending: 0, paid: 1 }
            const aPri = priority[a.status] ?? 99
            const bPri = priority[b.status] ?? 99
            if (aPri !== bPri) return aPri - bPri
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
          .map(o => (
            <div key={o._id}
              className={`dp-order-item ${o.status === 'pending' ? 'dp-order-pending-click' : ''}`}
              onClick={() => {
                if (o.status === 'pending') {
                  scrollOrdersToTop()
                  setResumeOrder(o)
                }
              }}>
              <div className="dp-o-icon">
                {o.status === 'sending'
                  ? <img src={Outgoingicon} alt="outgoing" width={30} height={30} />
                  : <img src={Emailicon} alt="email" width={30} height={30} />}
              </div>
              <div style={{ flex:1 }}>
                <div className="dp-o-name">{o.role} · {o.location}</div>
                <div className="dp-o-meta">
                  {o.companiesCount.toLocaleString()} companies · {fmtNaira(o.amount)} · {timeAgo(o.createdAt)}
                </div>
              </div>
              <StatusBadge status={o.status} />
            </div>
          ))}
      </div>
      {orders.length > 3 && (
        <div className="dp-scroll-hint">
          <span>↓</span>
        </div>
      )}
    </div>
  )}
    </div>

                {/* Resume Payment Modal */}
                {resumeOrder && (
                  <div className="dp-modal-overlay" onClick={() => setResumeOrder(null)}>
                    <div className="dp-modal" onClick={e => e.stopPropagation()}>
                      <div className="dp-modal-title">⚠️ Incomplete Payment</div>
                      <div className="dp-modal-body">
                        You have a pending payment for <strong>{resumeOrder.role}</strong> — <strong>{fmtNaira(resumeOrder.amount)}</strong> for {resumeOrder.companiesCount.toLocaleString()} companies. Would you like to complete it?
                      </div>
                      <div className="dp-modal-btns">
                        <button className="dp-modal-cancel" onClick={() => setResumeOrder(null)}>Cancel</button>
                        <button className="dp-modal-confirm" onClick={async () => {
                          setResumeOrder(null)
                          scrollOrdersToTop()
                          try {
                            const payData = await paymentAPI.initialize(String(resumeOrder._id))
                            openPaystack(payData)
                          } catch (err) {
                            showToast(err.message || 'Failed to resume payment', 'error')
                          }
                        }}>Yes, Complete Payment </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}