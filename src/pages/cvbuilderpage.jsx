/*
 * CVBuilderPage.jsx — Professional wizard-style CV Builder
 */
import { useState, useRef } from 'react'
import { useToast } from '../context/ToastContext'
import './cvbuilderpage.css'

const STEPS = [
  { id: 1, label: 'Personal Info' },
  { id: 2, label: 'Work History' },
  { id: 3, label: 'Education' },
  { id: 4, label: 'Skills' },
  { id: 5, label: 'Summary' },
  { id: 6, label: 'Finalise' },
]

const TEMPLATES = [
  { id: 'modern',  label: 'Modern',  accent: '#2563eb' },
  { id: 'classic', label: 'Classic', accent: '#1e293b' },
  { id: 'minimal', label: 'Minimal', accent: '#0f9373' },
]

const EMPTY_CV = {
  photo: null,
  firstName: '', lastName: '', email: '', phone: '',
  location: '', linkedin: '', website: '',
  summary: '',
  experience: [{ company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] }],
  education: [{ school: '', degree: '', field: '', startYear: '', endYear: '' }],
  skills: [],
  certifications: [{ name: '', issuer: '', year: '' }],
}

export default function CVBuilderPage({ onUseForBlast, profile, onBack }) {
  // const { showToast } = useToast()
  // const [step, setStep]               = useState(1)
  // const [cv, setCv]                   = useState(EMPTY_CV)
  // const [template, setTemplate]       = useState('modern')
  // const [skillInput, setSkillInput]   = useState('')
  // const [showUseModal, setShowUseModal] = useState(false)
  // const [showTplDrop, setShowTplDrop] = useState(false)
  // const previewRef = useRef()
  // const photoRef   = useRef()

  function update(field, val) { setCv(p => ({ ...p, [field]: val })) }

  Validation
  function isComplete() {
    return (
      cv.firstName.trim() &&
      cv.lastName.trim() &&
      cv.email.trim() &&
      cv.phone.trim() &&
      cv.experience.some(e => e.company.trim() && e.role.trim()) &&
      cv.education.some(e => e.school.trim()) &&
      cv.skills.length > 0 &&
      cv.summary.trim()
    )
  }

  // Photo
  function handlePhoto(e) {
    const f = e.target.files[0]
    if (!f) return
    update('photo', URL.createObjectURL(f))
  }

  // Experience
  function updateExp(i, field, val) {
    const exp = [...cv.experience]; exp[i] = { ...exp[i], [field]: val }; update('experience', exp)
  }
  function updateExpBullet(i, bi, val) {
    const exp = [...cv.experience]; const b = [...exp[i].bullets]; b[bi] = val; exp[i] = { ...exp[i], bullets: b }; update('experience', exp)
  }
  function addExpBullet(i) {
    const exp = [...cv.experience]; exp[i].bullets = [...exp[i].bullets, '']; update('experience', exp)
  }
  function removeExpBullet(i, bi) {
    const exp = [...cv.experience]; exp[i].bullets = exp[i].bullets.filter((_, x) => x !== bi); update('experience', exp)
  }
  function addExp() { update('experience', [...cv.experience, { company: '', role: '', startDate: '', endDate: '', current: false, bullets: [''] }]) }
  function removeExp(i) { update('experience', cv.experience.filter((_, x) => x !== i)) }

  // Education
  function updateEdu(i, field, val) {
    const edu = [...cv.education]; edu[i] = { ...edu[i], [field]: val }; update('education', edu)
  }
  function addEdu() { update('education', [...cv.education, { school: '', degree: '', field: '', startYear: '', endYear: '' }]) }
  function removeEdu(i) { update('education', cv.education.filter((_, x) => x !== i)) }

  // Skills
  function addSkill() {
    if (!skillInput.trim()) return
    update('skills', [...cv.skills, skillInput.trim()]); setSkillInput('')
  }
  function removeSkill(i) { update('skills', cv.skills.filter((_, x) => x !== i)) }

  // Certifications
  function updateCert(i, field, val) {
    const cert = [...cv.certifications]; cert[i] = { ...cert[i], [field]: val }; update('certifications', cert)
  }
  function addCert() { update('certifications', [...cv.certifications, { name: '', issuer: '', year: '' }]) }
  function removeCert(i) { update('certifications', cv.certifications.filter((_, x) => x !== i)) }

  async function handleDownloadPDF() {
    if (!isComplete()) {
      showToast('Please complete all required fields before downloading', 'error')
      return
    }
    try {
      const { default: html2pdf } = await import('html2pdf.js')
      html2pdf().set({
        margin: 0, filename: `${cv.firstName}-${cv.lastName}-cv.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(previewRef.current).save()
      showToast('CV downloaded! 📄', 'success')
    } catch { showToast('Failed to download', 'error') }
  }

  function handleUseForBlast() {
    if (!isComplete()) {
      showToast('Please complete all required fields before blasting', 'error')
      return
    }
    if (profile?.cvOriginalName) setShowUseModal(true)
    else generateAndUse('replace')
  }

  async function generateAndUse(mode) {
    setShowUseModal(false)
    try {
      const { default: html2pdf } = await import('html2pdf.js')
      const blob = await html2pdf().set({
        margin: 0, image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(previewRef.current).outputPdf('blob')
      const file = new File([blob], `${cv.firstName}-builder.pdf`, { type: 'application/pdf' })
      onUseForBlast(file, mode)
      showToast('CV ready for blast! ', 'success')
    } catch { showToast('Failed to prepare CV', 'error') }
  }

  const fullName = [cv.firstName, cv.lastName].filter(Boolean).join(' ')
  const tpl = TEMPLATES.find(t => t.id === template)

  const stepTitles = {
    1: { q: "What's the best way for employers to contact you?", sub: "We suggest including your full name, email and phone number." },
    2: { q: "Tell us about your work experience.", sub: "Start with your most recent job. Include key achievements." },
    3: { q: "What is your educational background?", sub: "Add your highest qualification first." },
    4: { q: "What skills do you bring to the table?", sub: "Include both technical and soft skills relevant to your role." },
    5: { q: "Write a professional summary.", sub: "A strong 2–4 sentence overview of who you are and what you offer." },
    6: { q: "You're almost done!", sub: "Review your CV, download it or use it for a blast." },
  }

  const missingFields = []
  if (!cv.firstName || !cv.lastName) missingFields.push('Full name')
  if (!cv.email) missingFields.push('Email')
  if (!cv.phone) missingFields.push('Phone')
  if (!cv.experience.some(e => e.company && e.role)) missingFields.push('At least one work experience')
  if (!cv.education.some(e => e.school)) missingFields.push('At least one education entry')
  if (cv.skills.length === 0) missingFields.push('At least one skill')
  if (!cv.summary) missingFields.push('Professional summary')

  return (
    <div className="cvb-page">

      {/* Left Sidebar */}
      <aside className="cvb-steps-sidebar">
        <div className="cvb-steps-logo">
          <button className="cvb-back-btn" onClick={onBack}>← Back</button>
          CV Builder
        </div>
        <div className="cvb-steps-list">
          {STEPS.map((s, i) => (
            <div key={s.id} className="cvb-step-item" onClick={() => setStep(s.id)} style={{ cursor: 'pointer' }}>
              <div className="cvb-step-left">
                <div className={`cvb-step-circle ${step === s.id ? 'cvb-step-active' : step > s.id ? 'cvb-step-done' : ''}`}>
                  {step > s.id ? '✓' : s.id}
                </div>
                {i < STEPS.length - 1 && <div className={`cvb-step-line ${step > s.id ? 'cvb-step-line-done' : ''}`} />}
              </div>
              <div className={`cvb-step-label ${step === s.id ? 'cvb-step-label-active' : step > s.id ? 'cvb-step-label-done' : ''}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="cvb-steps-ai-box">
          <div className="cvb-ai-title"> AI Features</div>
          <div className="cvb-ai-chip">AI Improve Summary</div>
          <div className="cvb-ai-chip">AI Suggest Skills</div>
          <div className="cvb-ai-chip">AI Tailor to Job</div>
          <div className="cvb-ai-soon">Coming Soon</div>
        </div>
      </aside>

      {/* Center Form */}
      <div className="cvb-center">
        <div className="cvb-form-card">
          <div className="cvb-form-question">{stepTitles[step].q}</div>
          <div className="cvb-form-subtext">{stepTitles[step].sub}</div>

          {/* Step 1 — Personal */}
          {step === 1 && (
            <div className="cvb-form-body">
              <div className="cvb-photo-row">
                <div className="cvb-photo-wrap" onClick={() => photoRef.current.click()}>
                  {cv.photo
                    ? <img src={cv.photo} alt="photo" className="cvb-photo-img" />
                    : <div className="cvb-photo-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="#94a3b8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#94a3b8"/></svg>
                      </div>
                  }
                  <div className="cvb-photo-overlay">{cv.photo ? 'Change photo' : '+ Add photo'}</div>
                </div>
                <input ref={photoRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handlePhoto} />
                <div className="cvb-photo-hint">Optional — not all employers expect a photo</div>
              </div>
              <div className="cvb-fields-grid">
                <div className="cvb-field">
                  <label>First Name *</label>
                  <input placeholder="e.g. John" value={cv.firstName} onChange={e => update('firstName', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>Last Name *</label>
                  <input placeholder="e.g. Doe" value={cv.lastName} onChange={e => update('lastName', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>Email Address *</label>
                  <input placeholder="e.g. john@example.com" value={cv.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div className="cvb-field">
                  <label>Phone Number *</label>
                  <input placeholder="e.g. +234 800 000 0000" value={cv.phone} onChange={e => update('phone', e.target.value)} />
                </div>
                <div className="cvb-field cvb-field-full">
                  <label>Location</label>
                  <input placeholder="e.g. Lagos, Nigeria" value={cv.location} onChange={e => update('location', e.target.value)} />
                </div>
              </div>
              <div className="cvb-optional-title">Add additional information <span>(optional)</span></div>
              <div className="cvb-optional-chips">
                <div className="cvb-opt-chip">
                  <span>LinkedIn</span>
                  <input className="cvb-opt-input" placeholder="linkedin.com/in/you" value={cv.linkedin} onChange={e => update('linkedin', e.target.value)} />
                </div>
                <div className="cvb-opt-chip">
                  <span>Website</span>
                  <input className="cvb-opt-input" placeholder="yourwebsite.com" value={cv.website} onChange={e => update('website', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Experience */}
          {step === 2 && (
            <div className="cvb-form-body">
              {cv.experience.map((exp, i) => (
                <div key={i} className="cvb-block">
                  <div className="cvb-block-head">
                    <span>Position {i + 1}</span>
                    {cv.experience.length > 1 && <button className="cvb-remove" onClick={() => removeExp(i)}>Remove</button>}
                  </div>
                  <div className="cvb-fields-grid">
                    <div className="cvb-field">
                      <label>Job Title *</label>
                      <input placeholder="e.g. Frontend Developer" value={exp.role} onChange={e => updateExp(i, 'role', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Company *</label>
                      <input placeholder="e.g. Flutterwave" value={exp.company} onChange={e => updateExp(i, 'company', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Start Date</label>
                      <input placeholder="e.g. Jan 2022" value={exp.startDate} onChange={e => updateExp(i, 'startDate', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>End Date</label>
                      <input placeholder="e.g. Dec 2024" value={exp.current ? 'Present' : exp.endDate} disabled={exp.current} onChange={e => updateExp(i, 'endDate', e.target.value)} />
                      <label className="cvb-checkbox-lbl">
                        <input type="checkbox" checked={exp.current} onChange={e => updateExp(i, 'current', e.target.checked)} />
                        I currently work here
                      </label>
                    </div>
                  </div>
                  <div className="cvb-field">
                    <label>Key Responsibilities & Achievements</label>
                    {exp.bullets.map((b, bi) => (
                      <div key={bi} className="cvb-bullet-row">
                        <input placeholder={`Achievement ${bi + 1}`} value={b} onChange={e => updateExpBullet(i, bi, e.target.value)} />
                        {exp.bullets.length > 1 && <button className="cvb-icon-rm" onClick={() => removeExpBullet(i, bi)}>✕</button>}
                      </div>
                    ))}
                    <button className="cvb-add-bullet" onClick={() => addExpBullet(i)}>+ Add bullet point</button>
                  </div>
                </div>
              ))}
              <button className="cvb-add-block" onClick={addExp}>+ Add another position</button>
            </div>
          )}

          {/* Step 3 — Education */}
          {step === 3 && (
            <div className="cvb-form-body">
              {cv.education.map((edu, i) => (
                <div key={i} className="cvb-block">
                  <div className="cvb-block-head">
                    <span>Education {i + 1}</span>
                    {cv.education.length > 1 && <button className="cvb-remove" onClick={() => removeEdu(i)}>Remove</button>}
                  </div>
                  <div className="cvb-fields-grid">
                    <div className="cvb-field cvb-field-full">
                      <label>School / University *</label>
                      <input placeholder="e.g. University of Lagos" value={edu.school} onChange={e => updateEdu(i, 'school', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Degree</label>
                      <input placeholder="e.g. B.Sc" value={edu.degree} onChange={e => updateEdu(i, 'degree', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Field of Study</label>
                      <input placeholder="e.g. Computer Science" value={edu.field} onChange={e => updateEdu(i, 'field', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Start Year</label>
                      <input placeholder="e.g. 2018" value={edu.startYear} onChange={e => updateEdu(i, 'startYear', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>End Year</label>
                      <input placeholder="e.g. 2022" value={edu.endYear} onChange={e => updateEdu(i, 'endYear', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="cvb-add-block" onClick={addEdu}>+ Add another qualification</button>
              <div className="cvb-section-divider">Certifications <span>(optional)</span></div>
              {cv.certifications.map((cert, i) => (
                <div key={i} className="cvb-block">
                  <div className="cvb-block-head">
                    <span>Certification {i + 1}</span>
                    {cv.certifications.length > 1 && <button className="cvb-remove" onClick={() => removeCert(i)}>Remove</button>}
                  </div>
                  <div className="cvb-fields-grid">
                    <div className="cvb-field">
                      <label>Certification Name</label>
                      <input placeholder="e.g. AWS Solutions Architect" value={cert.name} onChange={e => updateCert(i, 'name', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Issuer</label>
                      <input placeholder="e.g. Amazon" value={cert.issuer} onChange={e => updateCert(i, 'issuer', e.target.value)} />
                    </div>
                    <div className="cvb-field">
                      <label>Year</label>
                      <input placeholder="e.g. 2023" value={cert.year} onChange={e => updateCert(i, 'year', e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
              <button className="cvb-add-block" onClick={addCert}>+ Add certification</button>
            </div>
          )}

          {/* Step 4 — Skills */}
          {step === 4 && (
            <div className="cvb-form-body">
              <div className="cvb-field">
                <label>Type a skill and press Enter or click Add *</label>
                <div className="cvb-skill-row">
                  <input placeholder="e.g. React, Node.js, Figma..." value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} />
                  <button className="cvb-skill-add" onClick={addSkill}>Add</button>
                </div>
              </div>
              <div className="cvb-skills-cloud">
                {cv.skills.length === 0
                  ? <div className="cvb-skills-empty">Your skills will appear here as you add them</div>
                  : cv.skills.map((s, i) => (
                    <span key={i} className="cvb-skill-pill">{s}<button onClick={() => removeSkill(i)}>✕</button></span>
                  ))
                }
              </div>
              <div className="cvb-skill-suggestions">
                <div className="cvb-sug-lbl">Popular skills:</div>
                <div className="cvb-sug-chips">
                  {['JavaScript','React','Node.js','Python','SQL','Git','Figma','Communication','Leadership','Problem Solving'].filter(s => !cv.skills.includes(s)).map(s => (
                    <button key={s} className="cvb-sug-chip" onClick={() => update('skills', [...cv.skills, s])}>{s} +</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5 — Summary */}
          {step === 5 && (
            <div className="cvb-form-body">
              <div className="cvb-field">
                <label>Professional Summary *</label>
                <textarea rows={7} placeholder="e.g. Results-driven Frontend Developer with 3+ years of experience building scalable web applications. Looking to join a fast-growing tech team across Africa or remotely." value={cv.summary} onChange={e => update('summary', e.target.value)} />
              </div>
              <div className="cvb-summary-tips">
                <div className="cvb-tips-title">✏️ Writing tips</div>
                <ul>
                  <li>Keep it between 2–4 sentences</li>
                  <li>Mention your years of experience and key skill</li>
                  <li>State what kind of role or company you're targeting</li>
                  <li>Avoid generic phrases like "hard working" or "team player"</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 6 — Finalise */}
          {step === 6 && (
            <div className="cvb-form-body">
              {missingFields.length > 0 && (
                <div className="cvb-missing-box">
                  <div className="cvb-missing-title">⚠️ Please complete these before downloading or blasting:</div>
                  <ul>
                    {missingFields.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}
              <div className="cvb-finalise-actions">
                <button className={`cvb-dl-btn ${!isComplete() ? 'cvb-btn-disabled' : ''}`} onClick={handleDownloadPDF}>
                  ⬇ Download PDF
                </button>
                <button className={`cvb-blast-btn ${!isComplete() ? 'cvb-btn-disabled' : ''}`} onClick={handleUseForBlast}>
                  Use for Blast
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="cvb-nav-btns">
            {step > 1
              ? <button className="cvb-btn-prev" onClick={() => setStep(s => s - 1)}>← Previous</button>
              : <div />
            }
            {step < 6
              ? <button className="cvb-btn-next" onClick={() => setStep(s => s + 1)}>Next: {STEPS[step].label} →</button>
              : <div />
            }
          </div>
        </div>
      </div>

      {/* Right Preview */}
      <div className="cvb-preview-panel">
        <div className="cvb-preview-top">
          <div className="cvb-preview-lbl">Live Preview</div>
          {/* Template Dropdown */}
          <div className="cvb-tpl-dropdown-wrap">
            <button className="cvb-change-tpl" onClick={() => setShowTplDrop(p => !p)}>
              {tpl.label} ▾
            </button>
            {showTplDrop && (
              <div className="cvb-tpl-dropdown">
                {TEMPLATES.map(t => (
                  <button key={t.id}
                    className={`cvb-tpl-opt ${template === t.id ? 'cvb-tpl-opt-active' : ''}`}
                    onClick={() => { setTemplate(t.id); setShowTplDrop(false) }}>
                    <span className="cvb-tpl-opt-dot" style={{ background: t.accent }} />
                    {t.label}
                    {template === t.id && <span className="cvb-tpl-opt-check">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="cvb-preview-scroll">
          <div ref={previewRef} className={`cvb-cv cvb-cv-${template}`}>

            {/* MODERN */}
            {template === 'modern' && (
              <>
                <div className="mod-header">
                  {cv.photo && <img src={cv.photo} alt="photo" className="mod-photo" />}
                  <div>
                    <div className="mod-name">{fullName || 'Your Name'}</div>
                    <div className="mod-contact">{[cv.email, cv.phone, cv.location].filter(Boolean).join(' · ')}</div>
                    {cv.linkedin && <div className="mod-contact">{cv.linkedin}</div>}
                  </div>
                </div>
                {cv.summary && <div className="mod-section"><div className="mod-sec-title">Professional Summary</div><p>{cv.summary}</p></div>}
                {cv.experience.some(e => e.company || e.role) && (
                  <div className="mod-section">
                    <div className="mod-sec-title">Work History</div>
                    {cv.experience.filter(e => e.company || e.role).map((e, i) => (
                      <div key={i} className="mod-exp">
                        <div className="mod-exp-head"><strong>{e.role}</strong><span>{e.startDate}{e.startDate && ' – '}{e.current ? 'Present' : e.endDate}</span></div>
                        <div className="mod-company">{e.company}</div>
                        <ul>{e.bullets.filter(Boolean).map((b, bi) => <li key={bi}>{b}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                )}
                {cv.education.some(e => e.school) && (
                  <div className="mod-section">
                    <div className="mod-sec-title">Education</div>
                    {cv.education.filter(e => e.school).map((e, i) => (
                      <div key={i} className="mod-exp">
                        <div className="mod-exp-head"><strong>{e.degree} {e.field}</strong><span>{e.startYear}{e.startYear && '–'}{e.endYear}</span></div>
                        <div className="mod-company">{e.school}</div>
                      </div>
                    ))}
                  </div>
                )}
                {cv.skills.length > 0 && <div className="mod-section"><div className="mod-sec-title">Skills</div><div className="mod-skills">{cv.skills.map((s, i) => <span key={i}>{s}</span>)}</div></div>}
                {cv.certifications.some(c => c.name) && (
                  <div className="mod-section">
                    <div className="mod-sec-title">Certifications</div>
                    {cv.certifications.filter(c => c.name).map((c, i) => (
                      <div key={i} className="mod-exp">
                        <div className="mod-exp-head"><strong>{c.name}</strong><span>{c.year}</span></div>
                        <div className="mod-company">{c.issuer}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* CLASSIC */}
            {template === 'classic' && (
              <>
                <div className="cls-header">
                  {cv.photo && <img src={cv.photo} alt="photo" className="cls-photo" />}
                  <div className="cls-name">{fullName || 'Your Name'}</div>
                  <div className="cls-contact">{[cv.email, cv.phone, cv.location, cv.linkedin].filter(Boolean).join(' · ')}</div>
                  <hr className="cls-hr" />
                </div>
                {cv.summary && <div className="cls-section"><div className="cls-title">PROFESSIONAL SUMMARY</div><p>{cv.summary}</p></div>}
                {cv.experience.some(e => e.company || e.role) && (
                  <div className="cls-section">
                    <div className="cls-title">WORK HISTORY</div>
                    {cv.experience.filter(e => e.company || e.role).map((e, i) => (
                      <div key={i} className="cls-exp">
                        <div className="cls-exp-head"><strong>{e.role}</strong>{e.company ? ` — ${e.company}` : ''}<span>{e.startDate}{e.startDate && ' – '}{e.current ? 'Present' : e.endDate}</span></div>
                        <ul>{e.bullets.filter(Boolean).map((b, bi) => <li key={bi}>{b}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                )}
                {cv.education.some(e => e.school) && (
                  <div className="cls-section">
                    <div className="cls-title">EDUCATION</div>
                    {cv.education.filter(e => e.school).map((e, i) => (
                      <div key={i} className="cls-exp">
                        <div className="cls-exp-head"><strong>{e.degree} {e.field}</strong>{e.school ? ` — ${e.school}` : ''}<span>{e.startYear}{e.startYear && '–'}{e.endYear}</span></div>
                      </div>
                    ))}
                  </div>
                )}
                {cv.skills.length > 0 && <div className="cls-section"><div className="cls-title">SKILLS</div><p>{cv.skills.join(' · ')}</p></div>}
              </>
            )}

            {/* MINIMAL */}
            {template === 'minimal' && (
              <>
                <div className="min-header">
                  {cv.photo && <img src={cv.photo} alt="photo" className="min-photo" />}
                  <div className="min-name">{fullName || 'Your Name'}</div>
                  <div className="min-contact">{[cv.email, cv.phone, cv.location].filter(Boolean).join('  |  ')}</div>
                  <div className="min-bar" />
                </div>
                {cv.summary && <div className="min-section"><div className="min-title">About</div><p>{cv.summary}</p></div>}
                {cv.experience.some(e => e.company || e.role) && (
                  <div className="min-section">
                    <div className="min-title">Experience</div>
                    {cv.experience.filter(e => e.company || e.role).map((e, i) => (
                      <div key={i} className="min-exp">
                        <div className="min-exp-head"><span className="min-role">{e.role}</span><span className="min-dur">{e.startDate}{e.startDate && ' – '}{e.current ? 'Present' : e.endDate}</span></div>
                        <div className="min-co">{e.company}</div>
                        <ul>{e.bullets.filter(Boolean).map((b, bi) => <li key={bi}>{b}</li>)}</ul>
                      </div>
                    ))}
                  </div>
                )}
                {cv.education.some(e => e.school) && (
                  <div className="min-section">
                    <div className="min-title">Education</div>
                    {cv.education.filter(e => e.school).map((e, i) => (
                      <div key={i} className="min-exp">
                        <div className="min-exp-head"><span className="min-role">{e.degree} {e.field}</span><span className="min-dur">{e.startYear}{e.startYear && '–'}{e.endYear}</span></div>
                        <div className="min-co">{e.school}</div>
                      </div>
                    ))}
                  </div>
                )}
                {cv.skills.length > 0 && <div className="min-section"><div className="min-title">Skills</div><div className="min-skills">{cv.skills.map((s, i) => <span key={i}>{s}</span>)}</div></div>}
              </>
            )}

          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {showUseModal && (
        <div className="cvb-modal-overlay" onClick={() => setShowUseModal(false)}>
          <div className="cvb-modal" onClick={e => e.stopPropagation()}>
            <div className="cvb-modal-title">⚠️ You already have a CV saved</div>
            <div className="cvb-modal-body">Which CV do you want to use for your next blast?</div>
            <div className="cvb-modal-opts">
              <button className="cvb-mopt" onClick={() => { setShowUseModal(false); onUseForBlast(null, 'keep') }}>Use my uploaded CV</button>
              <button className="cvb-mopt cvb-mopt-primary" onClick={() => generateAndUse('replace')}>Use this CV Builder CV</button>
              <button className="cvb-mopt" onClick={() => generateAndUse('once')}>Use for this blast only</button>
              <button className="cvb-mcancel" onClick={() => setShowUseModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}