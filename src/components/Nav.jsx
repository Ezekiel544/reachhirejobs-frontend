import { useState } from 'react'
import styles from './Nav.module.css'

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Nav({ onGetStarted }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>
          <span className={styles.logo} onClick={() => window.scrollTo(0,0)}>
            Reach<span>Hire</span>
          </span>
          <div className={styles.links}>
            <a onClick={() => scrollToSection('how')}>How it Works</a>
            <a onClick={() => scrollToSection('features')}>Features</a>
            <a onClick={() => scrollToSection('pricing-section')}>Pricing</a>
            <a className={styles.cta} onClick={onGetStarted}>Get Started →</a>
          </div>
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <a onClick={() => { scrollToSection('how'); setMenuOpen(false) }}>How it Works</a>
          <a onClick={() => { scrollToSection('features'); setMenuOpen(false) }}>Features</a>
          <a onClick={() => { scrollToSection('pricing-section'); setMenuOpen(false) }}>Pricing</a>
          <a className={styles.mCta} onClick={() => { onGetStarted('signup'); setMenuOpen(false) }}>Get Started →</a>
        </div>
      )}
    </>
  )
}
