/*
 * SettingsPage.jsx — user profile + intro paragraph
 */
import { useState, useEffect, useRef } from 'react'
import { useToast } from '../context/ToastContext'
import { profileAPI } from '../utils/api'
import Editicon from './images/editicon.png'
import Logouticon from './images/logout.png'
import './SettingsPage.css'

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


// const INTRO_PLACEHOLDER = `E.g: I am a passionate Frontend Developer with 3 years of experience building scalable web applications using React, TypeScript, and Node.js. I have delivered products used by thousands of users across Africa and I am eager to bring this energy to your team.`

export default function SettingsPage({ user, onProfileUpdate, onLogout }) {
  const { showToast } = useToast()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [loading,     setLoading]     = useState(true)
  const [saving,      setSaving]      = useState(false)
  const [name,        setName]        = useState('')
  const [phone,       setPhone]       = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [role,        setRole]        = useState('')
  const [location,    setLocation]    = useState('')
  const [industries,  setIndustries]  = useState([])
  const [intro,       setIntro]       = useState('')
  const [cvName,      setCvName]      = useState('')
  const [clName,      setClName]      = useState('')
  const [uploadingCv, setUploadingCv] = useState(false)
  const [uploadingCl, setUploadingCl] = useState(false)
  const cvRef = useRef()
  const clRef = useRef()

  // Profile completeness check
  const introWords = intro.trim().split(/\s+/).filter(Boolean).length
  const complete   = role && location && cvName && intro.trim().length > 20

  useEffect(() => {
    async function load() {
      try {
        const data = await profileAPI.get()
        setName(data.name           || '')
        setPhone(data.phone         || '')
        setLinkedinUrl(data.linkedinUrl || '')
        setRole(data.role           || '')
        setLocation(data.location   || '')
        setIndustries(data.industries || [])
        setIntro(data.intro         || '')
        setCvName(data.cvOriginalName || '')
        setClName(data.clOriginalName || '')
      } catch { showToast('Failed to load profile', 'error') }
      finally  { setLoading(false) }
    }
    load()
  }, [])

  function toggleIndustry(n) {
    setIndustries(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  }

  async function handleSave() {
    if (!name)  { showToast('Name is required', 'error'); return }
    if (!role)  { showToast('Please select your role', 'error'); return }
    if (!location) { showToast('Please select your preferred location', 'error'); return }
    if (!intro.trim()) { showToast('Please write your introduction', 'error'); return }
    try {
      setSaving(true)
      const { user: updated } = await profileAPI.update({
        name, phone, linkedinUrl, role, location, intro,
        industries: JSON.stringify(industries),
      })
      showToast('Profile saved! ', 'success')
      onProfileUpdate(updated)
    } catch (err) {
      showToast(err.message || 'Failed to save profile', 'error')
    } finally { setSaving(false) }
  }

  async function handleCvUpload(e) {
    const f = e.target.files[0]; if (!f) return
    try {
      setUploadingCv(true)
      const data = await profileAPI.uploadCV(f)
      setCvName(data.cvOriginalName)
      showToast('CV uploaded! 📄', 'success')
    } catch (err) { showToast(err.message || 'CV upload failed', 'error') }
    finally { setUploadingCv(false) }
  }

  async function handleClUpload(e) {
    const f = e.target.files[0]; if (!f) return
    try {
      setUploadingCl(true)
      const data = await profileAPI.uploadCL(f)
      setClName(data.clOriginalName)
      showToast('Cover letter uploaded! ✉️', 'success')
    } catch (err) { showToast(err.message || 'Upload failed', 'error') }
    finally { setUploadingCl(false) }
  }

  if (loading) return <div className="sp-loading">Loading your profile...</div>

  return (
    <div className="sp-wrap">
     <div className="sp-header">
  <div className="sp-title-row">
    <div>
      <div className="sp-title">⚙️ Settings</div>
      <div className="sp-sub">Your saved info pre-fills every blast — update anytime</div>
    </div>
  <button className="sp-logout-btn logoutbtn" onClick={() => setShowLogoutConfirm(true)} style={{ background: 'transparent', border: 'none' }}>
  <img src={Logouticon} alt="logout" width={23} height={23} />
</button>
  </div>
  {/* Completeness bar */}
  <div className="sp-progress-wrap">
    <div className="sp-progress-label">
      Profile {complete ? '100% complete ' : 'incomplete — fill all fields to start blasting'}
    </div>
    <div className="sp-progress-bar">
      <div className="sp-progress-fill" style={{ width: complete ? '100%' :
        `${[name,role,location,cvName,intro.trim().length > 20 ? 'ok' : ''].filter(Boolean).length / 5 * 100}%`
      }} />
    </div>
  </div>
</div>

      <div className="sp-grid">

        {/* Personal Info */}
        <div className="sp-card">
          <div className="sp-card-title">👤 Personal Information</div>
          <div className="sp-group">
            <label className="sp-label">Full Name</label>
            <input className="rh-input" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="sp-group">
            <label className="sp-label">Email Address</label>
            <input className="rh-input" type="email" value={user?.email || ''} disabled
              style={{ background:'var(--gray-50)', color:'var(--gray-400)', cursor:'not-allowed' }} />
            <span className="sp-hint">Email cannot be changed · Companies reply to this address</span>
          </div>
          <div className="sp-group">
            <label className="sp-label">Phone Number</label>
            <input className="rh-input" type="tel" placeholder="+234 800 000 0000" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div className="sp-group">
            <label className="sp-label">LinkedIn URL</label>
            <input className="rh-input" type="url" placeholder="https://linkedin.com/in/yourname" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)} />
          </div>
        </div>

        {/* Job Preferences */}
        <div className="sp-card">
          <div className="sp-card-title">🎯 Job Preferences</div>
         <div className="sp-group">
  <label className="sp-label">Your Role *</label>
  <div className="sp-select-wrap">
    <select className="rh-select" value={role} onChange={e => setRole(e.target.value)}>
      <option value="">Select your role...</option>
      {ROLES.map(r => <option key={r}>{r}</option>)}
    </select>
    <span className="sp-select-arrow">▾</span>
  </div>
</div>
          <div className="sp-group">
            <label className="sp-label">Preferred Location *</label>
           <div className="sp-select-wrap">
  <select className="rh-select" value={location} onChange={e => setLocation(e.target.value)}>
    <option value="">Select location...</option>
    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
  </select>
  <span className="sp-select-arrow">▾</span>
</div>
          </div>
          <div className="sp-group">
            <label className="sp-label">Industries</label>
            <div className="sp-niche-tags">
              {NICHES.map(n => (
                <button key={n} className={`ntag ${industries.includes(n) ? 'active' : ''}`}
                  onClick={() => toggleIndustry(n)}>{n}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Introduction — full width */}
        <div className="sp-card sp-full">
          <div className="sp-card-title">✍️ Your Introduction *</div>
          <div className="sp-intro-desc">
            This is the email body that every company will read. Write 3–5 sentences about yourself, your experience, and what you bring. Companies will see this with your CV attached and your email as the reply address.
          </div>
          <div className="sp-intro-preview-label">What companies will receive:</div>
          <div className="sp-email-preview">
            <div className="sp-ep-row"><span className="sp-ep-key">From:</span> <span>{name || 'Your Name'} &lt;noreply@reachhire.com&gt;</span></div>
            <div className="sp-ep-row"><span className="sp-ep-key">Reply-To:</span> <span>{user?.email || 'your@email.com'}</span></div>
            <div className="sp-ep-row"><span className="sp-ep-key">Subject:</span> <span>Application for {role || '[Your Role]'} Position — {name || 'Your Name'}</span></div>
            <div className="sp-ep-divider" />
            <div className="sp-ep-body">
              <p>Dear Hiring Team,</p>
              <p className="sp-ep-intro">{intro || <em style={{color:'#aaa'}}>Your introduction will appear here...</em>}</p>
              <p>I am particularly interested in opportunities at your company and would love to contribute my skills as a <strong>{role || '[Role]'}</strong>.</p>
              <p>Please find my CV{clName ? ' and cover letter' : ''} attached.</p>
              <p>Best regards,<br/><strong>{name || 'Your Name'}</strong><br/>{user?.email}<br/>{linkedinUrl && <>{linkedinUrl}</>}</p>
            </div>
          </div>
          <textarea
            className="sp-intro-textarea"
            placeholder={`E.g: I am a passionate ${role || 'Software Developer'} with 3 years of experience building scalable web applications. I have delivered products used by thousands of users across Africa and I am eager to bring this energy to your team.`}
            value={intro}
            onChange={e => setIntro(e.target.value)}
            rows={5}
          />
         <div className="sp-word-count" style={{ color: 'var(--gray-400)' }}>
  {introWords} words
</div>
        </div>

        {/* Documents */}
        <div className="sp-card sp-full">
          <div className="sp-card-title">📄 Your Documents</div>
          <div className="sp-docs-grid">
            <div>
              <label className="sp-label">CV / Resume *</label>
              {cvName ? (
                <div className="sp-uploaded-file">
                  <span>📄</span>
                  <span className="sp-uf-name">{cvName}</span>
                  <button className="sp-replace-btn" onClick={() => cvRef.current.click()}>
                    {uploadingCv ? 'Uploading...' : <img src={Editicon} alt="edit" width={21} height={21} />}
                  </button>
                </div>
              ) : (
                <div className="upload-zone" onClick={() => cvRef.current.click()}>
                  <div style={{ fontSize:32, marginBottom:8 }}>📄</div>
                  <div className="sp-uz-text">{uploadingCv ? 'Uploading...' : 'Upload your CV'}</div>
                  <div className="sp-uz-sub">PDF, DOC, DOCX · Max 5MB</div>
                </div>
              )}
              <input ref={cvRef} type="file" accept=".pdf,.doc,.docx" style={{ display:'none' }} onChange={handleCvUpload} />
            </div>
            <div>
              <label className="sp-label">Cover Letter <span className="sp-optional">(optional)</span></label>
              {clName ? (
                <div className="sp-uploaded-file">
                  <span>✉️</span>
                  <span className="sp-uf-name">{clName}</span>
                  <button className="sp-replace-btn" onClick={() => clRef.current.click()}>
                    {uploadingCl ? 'Uploading...' : <img src={Editicon} alt="edit" width={21} height={21} />}
                  </button>
                </div>
              ) : (
                <div className="upload-zone" onClick={() => clRef.current.click()}>
                  <div style={{ fontSize:32, marginBottom:8 }}>✉️</div>
                  <div className="sp-uz-text">{uploadingCl ? 'Uploading...' : 'Upload Cover Letter'}</div>
                  <div className="sp-uz-sub">PDF, DOC, DOCX · Max 5MB</div>
                </div>
              )}
              <input ref={clRef} type="file" accept=".pdf,.doc,.docx" style={{ display:'none' }} onChange={handleClUpload} />
            </div>
          </div>
        </div>

      </div>

      <div className="sp-save-row">
        {/* <button className="sp-logout-btn" onClick={() => setShowLogoutConfirm(true)}>
          🚪 Logout
        </button> */}
        <button className="sp-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile '}
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="sp-modal-overlay">
          <div className="sp-modal">
            <div className="sp-modal-title">Are you sure you want to logout?</div>
            <div className="sp-modal-sub">You will need to sign in again to access your dashboard.</div>
            <div className="sp-modal-btns">
              <button className="sp-modal-cancel" onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
              <button className="sp-modal-confirm" onClick={onLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}