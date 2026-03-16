/*
 * AboutPage.jsx — About Us + Contact combined page
 */
import { useEffect } from 'react'
// import './aboutpage.css'
import Footer from './footer'

const STATS = [
  { val: '1,223+', lbl: 'Verified Companies' },
  { val: '24',     lbl: 'Countries Covered' },
  { val: '₦250',   lbl: 'Per Company' },
  { val: '100%',   lbl: 'African Built' },
]

const VALUES = [
  { icon: '', title: 'Accessibility', desc: 'We believe every African tech professional deserves a fair shot at opportunities, regardless of who they know.' },
  { icon: '', title: 'Speed', desc: 'What used to take weeks of manual applying now takes minutes. We built SwiftyApply to save your most valuable resource — time.' },
  { icon: '', title: 'Pan-African', desc: 'We think beyond Nigeria. Our database covers companies across the continent and globally, because African talent belongs everywhere.' },
  { icon: '', title: 'Trust', desc: 'Your CV is personal. We treat it that way — sent securely, stored safely, never sold or shared beyond what you pay us to do.' },
]

export default function AboutPage({ onBack, scrollTo: scrollTarget }) {
  useEffect(() => {
    if (scrollTarget === 'contact') {
      setTimeout(() => {
        document.getElementById('about-contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [scrollTarget])

  function handleNavigate(tab) {
    if (tab === 'landing') { onBack(); return }
    window.dispatchEvent(new CustomEvent('navigate', { detail: tab }))
  }

  return (
    <div className="about-page">

      {/* Nav */}
      <div className="about-nav">
        <span className="about-logo" onClick={onBack} style={{ cursor:'pointer' }}>Swifty<span>Apply</span></span>
        <div className="about-nav-right">
          {/* <button className="about-nav-link" onClick={() => document.getElementById('about-contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</button> */}
          <button className="about-back" onClick={onBack}>Back to Home</button>
        </div>
      </div>

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <h1>Built for African Tech Talent.<br /><span>By Africans.</span></h1>
          <p>SwiftyApply was born from a simple frustration — talented developers, designers, and product managers in Africa spending weeks sending CVs one by one, never hearing back. We decided to change that.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {STATS.map(s => (
          <div key={s.lbl} className="about-stat">
            <div className="about-stat-val">{s.val}</div>
            <div className="about-stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-mission-inner">
          <div className="about-mission-text">
            <div className="about-section-label">Our Mission</div>
            <h2>Closing the Gap Between African Talent and Global Opportunity</h2>
            <p>The African tech ecosystem is producing world-class engineers, designers, and product builders. But the job search process hasn't kept up. Job boards are flooded, referrals are gatekept, and cold outreach is time-consuming.</p>
            <p>SwiftyApply levels the playing field. We give every job seeker — whether they're in Lagos, Nairobi, Accra or Kigali — the ability to put their CV directly in front of the people who can hire them, at scale, in minutes.</p>
            <p>We're not just a tool. We're infrastructure for African career growth.</p>
          </div>
          <div className="about-mission-visual">
            <div className="about-visual-card">
              <div className="about-vc-top"></div>
              <div className="about-vc-title">The Problem We Solve</div>
              <div className="about-vc-item">
                <span className="about-vc-before">Before SwiftyApply</span>
                <p>Apply to 5 companies per day manually. Spend weeks hoping for responses. Miss out on companies you didn't even know were hiring.</p>
              </div>
              <div className="about-vc-divider" />
              <div className="about-vc-item">
                <span className="about-vc-after">With SwiftyApply</span>
                <p>Blast your CV to 1,223+ verified companies in minutes. Get in front of HR managers before jobs are even posted.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-section-label" style={{ textAlign:'center' }}>What We Stand For</div>
        <h2 className="about-values-title">Our Values</h2>
        <div className="about-values-grid">
          {VALUES.map(v => (
            <div key={v.title} className="about-value-card">
              <div className="about-value-icon">{v.icon}</div>
              <div className="about-value-title">{v.title}</div>
              <div className="about-value-desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      {/* <section id="about-contact" className="about-contact">
        <div className="about-contact-inner">
          <div className="about-contact-left">
            <div className="about-section-label">Get in Touch</div>
            <h2>We'd Love to Hear from You</h2>
            <p>Have a question, feedback, or partnership idea? Reach out directly and we'll get back to you as soon as possible.</p>
            <div className="about-contact-items">
              <div className="about-contact-item">
                <span className="about-ci-icon">✉️</span>
                <div>
                  <div className="about-ci-label">Email Us</div>
                  <div className="about-ci-val">swiftyapply@gmail.com</div>
                </div>
              </div>
              <div className="about-contact-item">
                <span className="about-ci-icon">🌍</span>
                <div>
                  <div className="about-ci-label">Based in</div>
                  <div className="about-ci-val">Nigeria, Africa</div>
                </div>
              </div>
              <div className="about-contact-item">
                <span className="about-ci-icon">⏱️</span>
                <div>
                  <div className="about-ci-label">Response Time</div>
                  <div className="about-ci-val">Within 24–48 hours</div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-contact-right">
            <div className="about-email-box">
              <div className="about-email-icon">✉️</div>
              <div className="about-email-title">Send us an Email</div>
              <div className="about-email-desc">Click below to send us an email directly. We read every message and respond within 24–48 hours.</div>
              <a href="mailto:swiftyapply@gmail.com" className="about-email-btn">
                Email SwiftyApply →
              </a>
            </div>
          </div>
        </div>
      </section> */}

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}