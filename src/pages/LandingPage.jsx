/*
 * ============================================================
 *  LandingPage.jsx
 *  Se\elf-contained — imports only global.css (via main.jsx)
 *  and its own LandingPage.css
 * ============================================================
 */
import { useState, useEffect, useRef } from 'react'
import './aboutpage.css'
import './LandingPage.css'
import usericon from './images/usericon.png'
import Niche from './images/nicheicon.png'
import Reachicon from './images/reachicon.png'
import Blasticon from './images/blasticon.png'
import Africaicon from './images/africa.png'
import Targeticon from './images/target.png'
import Instanticon from './images/instanticon.png'
import Paymenticon from './images/payment.png'
import Analyticsicon from './images/analytics.png'
import Techicon from './images/techrole.png'
import Africa from './images/africa.svg'
import Global from './images/global.svg'
import Cvsent from './images/hired.avif'
import { calcPrice, fmtNaira, getBreakdown, COMPANIES } from '../utils/pricing'

const MAX_COMPANIES = 1223

/* heeelper*/
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ── Navbar ────────────────────────────────────────────────── */
function Navbar({ onGetStarted }) {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 60) }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`lp-nav ${scrolled ? 'lp-nav-scrolled' : 'lp-nav-top'}`}>
        <div className="lp-nav-inner">
          <span className="lp-logo" onClick={() => window.scrollTo(0,0)}>
            Jobto<span>Mail</span>
          </span>
          <div className="lp-nav-links">
            <a onClick={() => scrollTo('lp-how')}>How it Works</a>
            <a onClick={() => scrollTo('lp-features')}>Features</a>
            <a onClick={() => scrollTo('lp-pricing')}>Pricing</a>
            <a className="lp-nav-cta" onClick={() => onGetStarted('signup')}>Get Started</a>
          </div>
          <button className={`lp-hamburger ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      {open && (
        <div className="lp-mobile-menu">
          <a onClick={() => { scrollTo('lp-how');      setOpen(false) }}>How it Works</a>
          <a onClick={() => { scrollTo('lp-features'); setOpen(false) }}>Features</a>
          <a onClick={() => { scrollTo('lp-pricing');  setOpen(false) }}>Pricing</a>
          <a className="lp-m-cta" onClick={() => { onGetStarted('signup'); setOpen(false) }}>Get Started</a>
        </div>
      )}
    </>
  )
}
/* ── Hero ──────────────────────────────────────────────────── */
function Hero({ onGetStarted }) {
  return (
    <section className="lp-hero" style={{
      backgroundImage: `linear-gradient(
        to right,
        rgba(10, 15, 30, 0.92) 0%,
        rgba(10, 15, 30, 0.75) 50%,
        rgba(10, 15, 30, 0.55) 100%
      ), url(${Cvsent})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="lp-hero-inner">
        {/* Left */}
        <div className="lp-hero-left">
          <h1>Get Your CV to <span>Every</span> Tech Company That Matters</h1>
          <p className="lp-sub">
            Stop applying one by one. Upload your CV, choose your industry,
            drag the slider and we deliver your profile to up to <strong>{MAX_COMPANIES.toLocaleString()} verified</strong> tech
            company HR inboxes across Africa and beyond, in minutes.
          </p>
          <div className="lp-hero-btns">
            <button className="btn-primary" onClick={() => onGetStarted('signup')}>Start Now </button>
            <button className="btn-outline" onClick={() => scrollTo('lp-how')}>See How It Works</button>
          </div>
          <div className="lp-stats">
            <div><div className="lp-stat-num">{MAX_COMPANIES.toLocaleString()}</div><div className="lp-stat-lbl">Verified Companies</div></div>
            <div><div className="lp-stat-num">24</div><div className="lp-stat-lbl">Countries</div></div>
            <div><div className="lp-stat-num">₦5k</div><div className="lp-stat-lbl">Starting From</div></div>
          </div>
        </div>
        {/* Right — demo card */}
        <div className="lp-hero-right">
          <div className="lp-demo-card">
            <div className="lp-demo-top">
              <span className="lp-demo-title">Build Your Blast</span>
            </div>
            <div className="lp-demo-count">800</div>
            <div className="lp-demo-sub">companies selected</div>
            <div className="lp-demo-track">
              <div className="lp-demo-fill"><div className="lp-demo-thumb" /></div>
            </div>
            <div className="lp-demo-price-row">
              <div><div className="lp-price-lbl">Total</div><div className="lp-price-amt">₦200,000</div></div>
              <div style={{ textAlign:'right' }}><div className="lp-price-lbl">Per company</div><div className="lp-per">₦250</div></div>
            </div>
            <button className="lp-demo-btn" onClick={() => onGetStarted('signup')}>Proceed to Payment </button>
            <div className="lp-chips">
              <span className="lp-chip"> Nigeria · 478 companies</span>
              <span className="lp-chip"> Remote · 277 companies</span>
              <span className="lp-chip"> Kenya · 88 companies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Ticker ────────────────────────────────────────────────── */
function Ticker() {
  const doubled = [...COMPANIES, ...COMPANIES] 
  return (
    
    <div className="lp-ticker-wrap">
       <div d="lp-how" className="lp-section lp-gray howitworks ticker-header">
           <div className="lp-sec-label">The Procedure</div>
      <h2 className="lp-sec-title">Get yur CV seen by <span>Top Tech Companies</span></h2>
       </div>
      <div className="lp-ticker-track">
        {doubled.map((c, i) => (
          <span key={i} className="lp-ticker-item">
            <img
              src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=32`}
              alt={c.name}
              width={18}
              height={18}
              style={{ borderRadius: 4, verticalAlign: 'middle', marginRight: 6 }}
              onError={e => { e.target.style.display = 'none' }}
            />
            {c.flag} {c.name}
          </span>
        ))}
      </div>
    </div>
  )
}
 
function About() {
  return (
    // Hero           ← single-line comment is fine too
    <section className="about-hero">
      <div className="about-hero-inner">
        <h1 className='lp-sec-title'>
          Built for African Tech Talent.<br />
          <span>By Africans.</span>
        </h1>
        <p>
          SwiftyApply was born from a simple frustration — talented developers,
          designers, and product managers in Africa spending weeks sending CVs
          one by one, never hearing back. We decided to change that.
        </p>
      </div>
    </section>
  );
}
/* ── How It Works ──────────────────────────────────────────── */
const STEPS = [
  { n:'01', icon:<img src={usericon} alt="CV" width={57} height={57} />, title:'Upload Your CV',    desc:'Upload your CV and cover letter. Secure and ready to send anytime.' },
  { n:'02', icon:<img src={Niche} alt="Niche" width={60} height={60} />, title:'Pick Your Niche',   desc:'Select your role and preferred industries — Fintech, SaaS, AI, Health and more.' },
  { n:'03', icon:<img src={Reachicon} alt="Reach" width={60} height={60} />, title:'Set Your Reach', desc:`Drag the slider or type a number — up to ${MAX_COMPANIES.toLocaleString()} verified companies. Price updates instantly.` },
  { n:'04', icon:<img src={Blasticon} alt="Blast" width={60} height={60} />, title:'Pay & Blast',    desc:'Complete your payment via card, bank transfer, or USSD. We handle the rest.' },
]

function HowItWorks() {
  const [visible, setVisible] = useState([])
  const [scrollingUp, setScrollingUp] = useState(false)
  const sectionRef = useRef(null)
  const lastScrollY = useRef(window.scrollY)

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY
      setScrollingUp(currentY < lastScrollY.current)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible([])
          const order = scrollingUp
            ? [...STEPS.keys()].reverse()
            : [...STEPS.keys()]
          order.forEach((idx, i) => {
            setTimeout(() => {
              setVisible(prev => [...prev, idx])
            }, i * 300)
          })
        } else {
          setVisible([])
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [scrollingUp])

  return (
    <section id="lp-how" className="lp-section lp-gray howitworks" ref={sectionRef}>
      <div className="lp-sec-label">The Process</div>
      <h2 className="lp-sec-title">From Upload to Inbox <span>in Minutes</span></h2>
      <div className="lp-steps-grid">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={`lp-step-card lp-step-animate ${visible.includes(i) ? 'lp-step-visible' : ''}`}
          >
            <span className="lp-step-num">{s.n}</span>
            <span className="lp-step-icon">{s.icon}</span>
            <div className="lp-step-title">{s.title}</div>
            <div className="lp-step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Features ──────────────────────────────────────────────── */
const FEATS = [
  { icon:<img src={Africaicon} alt="africa" width={35} height={35} />, title:'Pan-African Reach',   desc:'From Lagos to Nairobi, Accra to Cairo — plus 277 global remote companies.' },
  { icon:<img src={Targeticon} alt="target" width={35} height={35} />, title:'Smart Targeting',     desc:'Filter by industry, role, and location. Your CV only goes where it matters.' },
  { icon:<img src={Instanticon} alt="instant" width={35} height={35} />, title:'Instant Delivery',  desc:'Once payment is confirmed, emails go out immediately — no waiting.' },
  { icon:<img src={Paymenticon} alt="payment" width={35} height={35} />, title:'Secure Payments',   desc:'Card, bank transfer, USSD or mobile money in Naira. Fully automated.' },
  { icon:<img src={Analyticsicon} alt="analytics" width={35} height={35} />, title:'Live Tracking', desc:'See exactly which companies got your CV, broken down by country and industry.' },
  { icon:<img src={Techicon} alt="tech" width={35} height={35} />, title:'Every Tech Role',         desc:'Frontend, Backend, Data, DevOps, Product, Design, QA — all covered.' },
]

function Features() {
  const [visible, setVisible] = useState([])
  const [scrollingUp, setScrollingUp] = useState(false)
  const sectionRef = useRef(null)
  const lastScrollY = useRef(window.scrollY)

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY
      setScrollingUp(currentY < lastScrollY.current)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible([])
          const order = scrollingUp
            ? [...FEATS.keys()].reverse()
            : [...FEATS.keys()]
          order.forEach((idx, i) => {
            setTimeout(() => {
              setVisible(prev => [...prev, idx])
            }, i * 250)
          })
        } else {
          setVisible([])
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [scrollingUp])

  return (
    <section id="lp-features" className="lp-section lp-white" ref={sectionRef}>
      <div className="lp-sec-label">Why Jobtomail</div>
      <h2 className="lp-sec-title">Built for <span>African Tech Talent</span></h2>
      <div className="lp-feats-grid">
        {FEATS.map((f, i) => (
          <div
            key={f.title}
            className={`lp-feat-card lp-feat-animate ${visible.includes(i) ? 'lp-feat-visible' : ''}`}
          >
            <div className="lp-feat-icon">{f.icon}</div>
            <div className="lp-feat-title">{f.title}</div>
            <div className="lp-feat-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Pricing ───────────────────────────────────────────────── */
const NICHES = [' Fintech',' SaaS',' AI/ML',' Healthtech',' Agritech',' Remote',' E-commerce',' EdTech',' Tech/Software',' Insurtech',' Marketing Tech',' Telecom',' Media/Creative','HR Tech',' Crypto/Web3',' Cloud/DevOps',' GovTech',' CleanTech']

function Pricing({ onGetStarted }) {
  const [count, setCount]   = useState(20)
  const [niches, setNiches] = useState(['🏦 Fintech','💻 SaaS','🌍 Remote'])

  const { per, total } = calcPrice(count)
  const bd = getBreakdown(count)

  function handleNum(e) {
    let v = Number(e.target.value)
    if (isNaN(v)) return
    setCount(Math.min(Math.max(v, 20), MAX_COMPANIES))
  }
  function toggleNiche(n) {
    setNiches(p => p.includes(n) ? p.filter(x => x !== n) : [...p, n])
  }

  const regions = [
    { flag:'🇳🇬', name:'Nigeria',       count: bd.ng, pct: 45 },
    { flag:<img src={Global} alt="Global" width={17} height={17} />,  name:'Global/Remote', count: bd.gr, pct: 25 },
    { flag:'🇰🇪', name:'Kenya',         count: bd.ke, pct: 15 },
    { flag:'🇿🇦', name:'South Africa',  count: bd.sa, pct: 10 },
    { flag:<img src={Africa} alt="Africa" width={17} height={17} />,  name:'Other Africa',  count: bd.oa, pct:  5 },
  ]

  return (
    <section id="lp-pricing" className="lp-section lp-gray lp lp-pricingsection">
      <div style={{ textAlign:'center' }}>
        <div className="lp-sec-label" style={{ color: 'white' }}>Pricing</div>
        <h2 className="lp-sec-title" style={{ maxWidth:'100%',color: 'white' }}>Pay Only for <span>What You Need</span></h2>
        <p className="lp-sec-sub text-center">Drag or type to pick your reach. ₦250 per company. Up to <strong>{MAX_COMPANIES.toLocaleString()} verified companies</strong> available.</p>
      </div>

      <div className="lp-pricing-box">
        {/* Left */}
        <div>
          <div className="lp-calc-title">Build Your Blast</div>
          <div className="lp-calc-sub">Minimum 20 · Maximum {MAX_COMPANIES.toLocaleString()} verified companies</div>
          <div className="lp-range-labels"><span>20</span><span>{MAX_COMPANIES.toLocaleString()}</span></div>
          <input className="rh-range" type="range" min="20" max={MAX_COMPANIES} step="1"
            value={count} onChange={e => setCount(Number(e.target.value))} />
          <div className="lp-input-row">
            <span className="lp-input-lbl">Companies:</span>
            <input className="rh-num-input" type="number" min="20" max={MAX_COMPANIES} value={count} onChange={handleNum} />
          </div>
          <div className="lp-niche-lbl">Filter by Industry</div>
          <div className="lp-niche-tags">
            {NICHES.map(n => (
              <button key={n} className={`ntag ${niches.includes(n) ? 'active' : ''}`} onClick={() => toggleNiche(n)}>{n}</button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="lp-price-summary">
            <div className="lp-ps-row"><span className="lp-ps-lbl">Companies selected</span><span className="lp-ps-val">{count.toLocaleString()}</span></div>
            <div className="lp-ps-row"><span className="lp-ps-lbl">Price per company</span><span className="lp-ps-val">₦{per}</span></div>
            <div className="lp-ps-row lp-ps-total">
              <span className="lp-ps-total-lbl">Total</span>
              <span className="lp-ps-total-val">{fmtNaira(total)}</span>
            </div>
          </div>
          <div className="lp-cb-title">Estimated Breakdown by Region</div>
          {regions.map(r => (
            <div key={r.name} className="lp-cb-row">
              <span>{r.flag}</span>
              <span className="lp-cb-name">{r.name}</span>
              <div className="prog-bar" style={{ flex:1 }}>
                <div className="prog-fill" style={{ width:`${r.pct}%` }} />
              </div>
              <span className="lp-cb-count">{r.count}</span>
            </div>
          ))}
          <button className="lp-pay-btn" onClick={() => onGetStarted('signup')}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  { q: 'How does SwiftyApply work?', a: 'You upload your CV and cover letter, select how many companies you want to reach, pay, and we immediately send your CV directly to the HR inboxes of verified tech companies across Africa and globally.' },
  { q: 'How many companies will receive my CV?', a: 'You choose — from a minimum of 20 companies up to our full database of 1,223+ verified tech companies. The more companies you select, the more exposure you get.' },
  { q: 'Will companies actually see my CV?', a: 'Yes. We send directly to HR and careers email addresses — not job portals or forms. Your CV lands in a real inbox. Some emails may bounce due to company mail server restrictions, but the majority are delivered successfully.' },
  { q: 'What happens after I pay?', a: 'Your blast starts immediately after payment is confirmed. You can track progress in real time on your dashboard, broken down by country and region.' },
  { q: 'Can I get a refund?', a: 'We do not offer refunds once a blast has started, as the service has been rendered. If your blast fails entirely due to a technical error on our end before any emails go out, you are entitled to a full refund or free re-blast.' },
  { q: 'What file formats are accepted?', a: 'We accept PDF, DOC, and DOCX files up to 5MB. We recommend PDF for best compatibility across different email clients.' },
  { q: 'How long does a blast take?', a: 'Most blasts complete within a few minutes. Larger blasts to 500+ companies may take up to 30 minutes depending on server load.' },
  // { q: 'Do I need a cover letter?', a: 'No — a cover letter is completely optional. Many users blast with just their CV. However, including one can increase your chances of getting a response.' },
  // { q: 'Why are some emails bouncing back to me?', a: 'Some companies have mail servers that restrict emails from external senders. This is normal in email blasting — typically 5–15% of emails may bounce. The majority will be delivered successfully.' },
  // { q: 'Is my data safe?', a: 'Yes. Your CV and personal data are stored securely and never sold or shared with anyone other than the companies you choose to blast to. See our Privacy Policy for full details.' },
  // { q: 'Can I blast again after my first one?', a: 'Absolutely. You can create as many blast orders as you want. Many users blast every few weeks to stay top of mind with companies.' },
  // { q: 'What industries and countries are covered?', a: 'Our database covers Fintech, SaaS, AI/ML, Healthtech, E-commerce and more. Countries include Nigeria, Kenya, South Africa, Ghana, Egypt and 277 global remote companies.' },
]

function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="lp-section lp-white faq " id="lp-faq" style={{ backgroundColor:""}}>
      <h2 className="lp-sec-title faqtitle">Frequently Asked <span>Questions</span></h2>
      <div className="lp-faq-list">
        {FAQS.map((f, i) => (
          <div key={i} className={`lp-faq-item ${open === i ? 'lp-faq-open' : ''}`}>
            <button className="lp-faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <span className="lp-faq-icon">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && <div className="lp-faq-a" style={{ color: '#ded7d7' }}>{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

function Mission() {
  return (
    <section className="about-mission">
      <div className="about-mission-inner">
        <div className="about-mission-text">
          <div className="about-section-label lp-sec-label">Our Mission</div>
          <h2 className='lp-sec-title'>Closing the Gap Between African Talent and <span>Global Opportunity</span></h2>
           {/* <h1 className='lp-sec-title'>
          Built for African Tech Talent.<br />
          <span>By Africans.</span>
        </h1> */}
          <p style={{ color: '#666666' }}>
            The African tech ecosystem is producing world-class engineers, designers, and product builders. But the job search process hasn't kept up. Job boards are flooded, referrals are gatekept, and cold outreach is time-consuming.
          </p>
          <p style={{ color: '#666666' }}>
            SwiftyApply levels the playing field. We give every job seeker ,whether they're in Lagos, Nairobi, Accra or Kigali — the ability to put their CV directly in front of the people who can hire them, at scale, in minutes.
          </p>
          <p style={{ color: '#666666' }}>
            We're not just a tool. We're infrastructure for African career growth.
          </p>
        </div>
        <div className="about-mission-visual">
          <div className="about-visual-card">
            <div className="about-vc-top"></div>
            <div className="about-vc-title ">The Problem We Solve</div>
            <div className="about-vc-item">
              <span className="about-vc-before">Before SwiftyApply</span>
              <p style={{ color: '#666666' }}>
                Apply to 5 companies per day manually. Spend weeks hoping for responses. Miss out on companies you didn't even know were hiring.
              </p>
            </div>
            <div className="about-vc-divider" />
            <div className="about-vc-item">
              <span className="about-vc-after">With SwiftyApply</span>
              <p style={{ color: '#666666' }}>
                Blast your CV to 1,223+ verified companies in minutes. Get in front of HR managers before jobs are even posted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ── Footer ────────────────────────────────────────────────── */
function Footer({ onGetStarted }) {
  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        <div>
          <div className="lp-f-logo">Jobto<span>Mail</span></div>
          <div className="lp-f-desc">The fastest way for African tech talent to get noticed. Blast your CV to {MAX_COMPANIES.toLocaleString()} verified companies across Africa and beyond.</div>
        </div>
        <div className="lp-f-col"><div className="lp-f-col-title">Product</div>
          <a onClick={() => scrollTo('lp-how')}>How it Works</a>
          <a onClick={() => scrollTo('lp-pricing')}>Pricing</a>
          <a onClick={() => scrollTo('lp-features')}>Features</a>
        </div>
        <div className="lp-f-col"><div className="lp-f-col-title">Company</div>
          <a onClick={() => onGetStarted('about')}>About Us</a><a>Blog</a> <a href="mailto:swiftapply@gmail.com">Contact</a>
        </div>
        <div className="lp-f-col"><div className="lp-f-col-title">Legal</div>
          <a onClick={() => onGetStarted('privacy')}>Privacy Policy</a>
          <a onClick={() => onGetStarted('terms')}>Terms of Service</a>
          <a>Refund Policy</a>
        </div>
      </div>
      <div className="lp-footer-bottom">
        <span>© 2025 JobtoMail. All rights reserved.</span>
        <span>Made with ❤️ for African Tech Talent</span>
      </div>
    </footer>
  )
}

/* ── LandingPage (default export) ─────────────────────────── */
export default function LandingPage({ onGetStarted }) {
  return (
    <>
      <Navbar onGetStarted={onGetStarted} />
      <Hero   onGetStarted={onGetStarted} />
      <Ticker />
       <About />
      <HowItWorks  />
      <Pricing onGetStarted={onGetStarted} />
      <Features />
      <FAQ />
      <Mission />
      <Footer onGetStarted={onGetStarted} />
    </>
  )
}