import { useState } from 'react'
import { calcPrice, fmtNaira, getBreakdown, COMPANIES } from '../utils/pricing'
import styles from './Landing.module.css'

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ onGetStarted }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroLeft}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            1,223+ African &amp; Global Tech Companies
          </div>
          <h1>
            Get Your CV to <span>Every</span> Tech Company That Matters
          </h1>
          <p className={styles.sub}>
            Stop applying one by one. Upload your CV, choose your industry,
            drag the slider — and we deliver your profile to hundreds of tech
            companies in minutes.
          </p>
          <div className={`hero-btns ${styles.heroBtns}`}>
            <button className="btn-primary" onClick={() => onGetStarted('signup')}>
              Start Now — It's Fast →
            </button>
            <button className="btn-outline" onClick={() => scrollToSection('how')}>
              ▶ See How It Works
            </button>
          </div>
          <div className={styles.heroStats}>
            <div><div className={styles.statNum}>1,223+</div><div className={styles.statLbl}>Companies</div></div>
            <div><div className={styles.statNum}>24</div><div className={styles.statLbl}>Countries</div></div>
            <div><div className={styles.statNum}>₦2k</div><div className={styles.statLbl}>Starting From</div></div>
          </div>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroCard}>
            <div className={styles.cardTop}>
              <span className={styles.cardTitle}>Build Your Blast</span>
              <span className={styles.live}>Live</span>
            </div>
            <div className={styles.sliderCount}>800</div>
            <div className={styles.sliderSub}>companies selected</div>
            <div className={styles.demoTrack}>
              <div className={styles.demoFill}><div className={styles.demoThumb} /></div>
            </div>
            <div className={styles.priceRow}>
              <div>
                <div className={styles.priceLbl}>Total</div>
                <div className={styles.priceAmt}>₦96,000</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={styles.priceLbl}>Per company</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--gray-600)' }}>₦120</div>
              </div>
            </div>
            <button className={styles.demoBtn} onClick={() => onGetStarted('signup')}>
              Proceed to Payment ⚡
            </button>
            <div className={styles.chips}>
              <span className={styles.chip}>🇳🇬 Nigeria · 478 companies</span>
              <span className={styles.chip}>🌍 Remote · 277 companies</span>
              <span className={styles.chip}>🇰🇪 Kenya · 88 companies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Ticker ────────────────────────────────────────────────────────────────────
function Ticker() {
  const doubled = [...COMPANIES, ...COMPANIES]
  return (
    <div className={styles.tickerWrap}>
      <div className="ticker-track">
        {doubled.map((c, i) => (
          <span key={i} className={styles.tItem}>{c}</span>
        ))}
      </div>
    </div>
  )
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', icon: '📄', title: 'Upload Your CV', desc: 'Upload your CV and cover letter. Secure and ready to send anytime.' },
    { num: '02', icon: '🎯', title: 'Pick Your Niche', desc: 'Select your role and preferred industries — Fintech, SaaS, AI, Health and more.' },
    { num: '03', icon: '🎚️', title: 'Set Your Reach', desc: 'Drag the slider or type a number. Price updates instantly.' },
    { num: '04', icon: '⚡', title: 'Pay & Blast', desc: 'Complete your payment via card, bank transfer, or USSD. We handle the rest.' },
  ]
  return (
    <section id="how" className={styles.sectionGray}>
      <div className={styles.section}>
        <div className={styles.secLabel}>The Process</div>
        <h2 className={styles.secTitle}>From Upload to Inbox <span>in Minutes</span></h2>
        <div className={styles.stepsGrid}>
          {steps.map(s => (
            <div key={s.num} className={styles.stepCard}>
              <span className={styles.stepNum}>{s.num}</span>
              <span className={styles.stepIcon}>{s.icon}</span>
              <div className={styles.stepTitle}>{s.title}</div>
              <div className={styles.stepDesc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────────────────
function Features() {
  const feats = [
    { icon: '🌍', title: 'Pan-African Reach', desc: 'From Lagos to Nairobi, Accra to Cairo — plus 277 global remote companies.' },
    { icon: '🎯', title: 'Smart Targeting', desc: 'Filter by industry, role, and location. Your CV only goes where it matters.' },
    { icon: '⚡', title: 'Instant Delivery', desc: 'Once payment is confirmed, emails go out immediately.' },
    { icon: '🔒', title: 'Secure Payments', desc: 'Card, bank transfer, USSD or mobile money in Naira. Fully automated.' },
    { icon: '📊', title: 'Live Tracking', desc: 'See exactly which companies got your CV, broken down by country and industry.' },
    { icon: '💼', title: 'Every Tech Role', desc: 'Frontend, Backend, Data, DevOps, Product, Design, QA — all covered.' },
  ]
  return (
    // <section id="features" className={styles.sectionWhite}>
    //   <div className={styles.section}>
    //     <div className={styles.secLabel}>Why ReachHire</div>
    //     <h2 className={styles.secTitle}>Built for <span>African Tech Talent</span></h2>
    //     <div className={styles.featsGrid}>
    //       {feats.map(f => (
    //         <div key={f.title} className={styles.featCard}>
    //           <div className={styles.featIconWrap}>{f.icon}</div>
    //           <div className={styles.featTitle}>{f.title}</div>
    //           <div className={styles.featDesc}>{f.desc}</div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  )
}

// ── Pricing Calculator ────────────────────────────────────────────────────────
const NICHES = ['🏦 Fintech','💻 SaaS','🤖 AI/ML','🏥 Healthtech','🌾 Agritech','🌍 Remote','🛒 E-commerce','📚 EdTech']

function PricingSection({ onGetStarted }) {
  const [count, setCount] = useState(500)
  const [activeNiches, setActiveNiches] = useState(['🏦 Fintech','💻 SaaS','🌍 Remote'])

  const { per, total } = calcPrice(count)
  const bd = getBreakdown(count)

  function handleSlider(e) { setCount(Number(e.target.value)) }
  function handleInput(e) {
    let v = Number(e.target.value)
    if (isNaN(v)) return
    v = Math.min(Math.max(v, 10), 20000)
    setCount(v)
  }
  function toggleNiche(n) {
    setActiveNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])
  }

  return (
    <section id="pricing-section" className={styles.sectionGray}>
      <div className={styles.section}>
        <div style={{ textAlign: 'center' }}>
          <div className={styles.secLabel}>Pricing</div>
          <h2 className={styles.secTitle} style={{ maxWidth: '100%' }}>
            Pay Only for <span>What You Need</span>
          </h2>
          <p className={styles.secSub} style={{ margin: '14px auto 0', textAlign: 'center' }}>
            Drag or type to pick your reach. More companies = less per email.
          </p>
        </div>

        <div className={styles.pricingBox}>
          {/* Left */}
          <div>
            <div className={styles.calcTitle}>Build Your Blast</div>
            <div className={styles.calcSub}>Minimum 10 · Maximum 20,000 companies</div>
            <div className={styles.rangeLblRow}><span>10</span><span>20,000</span></div>
            <input type="range" min="10" max="20000" step="10" value={count} onChange={handleSlider} />
            <div className={styles.inputRow}>
              <span className={styles.inputLbl}>Companies:</span>
              <input
                type="number" className="company-num-input"
                min="10" max="20000" value={count}
                onChange={handleInput}
              />
            </div>
            <div className={styles.nicheLbl} style={{ marginTop: 16 }}>Filter by Industry</div>
            <div className={styles.nicheTags}>
              {NICHES.map(n => (
                <button
                  key={n}
                  className={`ntag ${activeNiches.includes(n) ? 'active' : ''}`}
                  onClick={() => toggleNiche(n)}
                >{n}</button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className={styles.priceSummary}>
              <div className={styles.psRow}>
                <span className={styles.psLbl}>Companies selected</span>
                <span className={styles.psVal}>{count.toLocaleString()}</span>
              </div>
              <div className={styles.psRow}>
                <span className={styles.psLbl}>Price per company</span>
                <span className={styles.psVal}>₦{per}</span>
              </div>
              <div className={styles.psRow}>
                <span className={styles.psTotalLbl}>Total</span>
                <span className={styles.psTotalVal}>{fmtNaira(total)}</span>
              </div>
            </div>

            <div className={styles.cbTitle}>Estimated Breakdown by Region</div>
            {[
              { flag:'🇳🇬', name:'Nigeria', count: bd.ng, pct: 45 },
              { flag:'🌍', name:'Global/Remote', count: bd.gr, pct: 25 },
              { flag:'🇰🇪', name:'Kenya', count: bd.ke, pct: 15 },
              { flag:'🇿🇦', name:'South Africa', count: bd.sa, pct: 10 },
              { flag:'🌍', name:'Other Africa', count: bd.oa, pct: 5 },
            ].map(r => (
              <div key={r.name} className={styles.cbItem}>
                <span>{r.flag}</span>
                <span className={styles.cbName}>{r.name}</span>
                <div className="prog-bar" style={{ flex: 1 }}>
                  <div className="prog-fill" style={{ width: `${r.pct}%` }} />
                </div>
                <span className={styles.cbCount}>{r.count}</span>
              </div>
            ))}

            <button className={styles.payBtn} style={{ marginTop: 20 }} onClick={() => onGetStarted('signup')}>
              Get Started — Proceed to Payment ⚡
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <div className={styles.fLogo}>Reach<span>Hire</span></div>
          <div className={styles.fDesc}>The fastest way for African tech talent to get noticed. Blast your CV to 1,223+ companies across Africa and beyond.</div>
        </div>
        <div className={styles.fCol}>
          <div className={styles.fColTitle}>Product</div>
          <a onClick={() => scrollToSection('how')}>How it Works</a>
          <a onClick={() => scrollToSection('pricing-section')}>Pricing</a>
          <a onClick={() => scrollToSection('features')}>Features</a>
        </div>
        <div className={styles.fCol}>
          <div className={styles.fColTitle}>Company</div>
          <a>About Us</a><a>Blog</a><a>Contact</a>
        </div>
        <div className={styles.fCol}>
          <div className={styles.fColTitle}>Legal</div>
          <a>Privacy Policy</a><a>Terms of Service</a><a>Refund Policy</a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2025 ReachHire. All rights reserved.</span>
        <span>Made with ❤️ for African Tech Talent</span>
      </div>
    </footer>
  )
}

// ── Landing (combines all sections) ──────────────────────────────────────────
export default function Landing({ onGetStarted }) {
  return (
    <>
      <Hero onGetStarted={onGetStarted} />
      <Ticker />
      <HowItWorks />
      <Features />
      <PricingSection onGetStarted={onGetStarted} />
      <Footer />
    </>
  )
}
