import './LandingPage.css'

const MAX_COMPANIES = 1223

export default function Footer({ onNavigate }) {

  function handleProductLink(sectionId) {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Not on landing page — go there first
      onNavigate('landing')
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 400)
    }
  }

  return (
    <footer className="lp-footer">
      <div className="lp-footer-inner">
        <div>
          <div className="lp-f-logo" onClick={() => onNavigate('landing')} style={{ cursor:'pointer' }}>
  Swifty<span>Apply</span>
</div>
          <div className="lp-f-desc">The fastest way for African tech talent to get noticed. Blast your CV to {MAX_COMPANIES.toLocaleString()} verified companies across Africa and beyond.</div>
        </div>
        <div className="lp-f-col">
          <div className="lp-f-col-title">Product</div>
          <a onClick={() => handleProductLink('lp-how')}>How it Works</a>
          <a onClick={() => handleProductLink('lp-pricing')}>Pricing</a>
          <a onClick={() => handleProductLink('lp-features')}>Features</a>
        </div>
        <div className="lp-f-col">
          <div className="lp-f-col-title">Company</div>
          <a onClick={() => onNavigate('about')}>About Us</a>
          <a>Blog</a>
          <a href="mailto:swiftapply@gmail.com">Contact</a>
        </div>
        <div className="lp-f-col">
          <div className="lp-f-col-title">Legal</div>
          <a onClick={() => onNavigate('privacy')}>Privacy Policy</a>
          <a onClick={() => onNavigate('terms')}>Terms of Service</a>
          <a>Refund Policy</a>
        </div>
      </div>
      <div className="lp-footer-bottom">
        <span>© 2025 SwiftyApply. All rights reserved.</span>
        <span>Made with ❤️ for African Tech Talent</span>
      </div>
    </footer>
  )
}