/*
 * PrivacyPage.jsx — SwiftyApply Privacy Policy
 */
import './LegalPage.css'

export default function PrivacyPage({ onBack }) {
  return (
    <div className="legal-page">
      <div className="legal-nav">
        <span className="legal-logo">Swifty<span>Apply</span></span>
        <button className="legal-back" onClick={onBack}>Back to Home</button>
      </div>

      <div className="legal-container">
        <div className="legal-header">
          <h1>Privacy Policy</h1>
          <p className="legal-date">Last updated: March 15, 2026</p>
        </div>

        <div className="legal-body">

          <section>
            <h2>1. Introduction</h2>
            <p>SwiftyApply ("we," "our," or "us") is committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your data when you use our Platform at swiftyapply.vercel.app.</p>
            <p>This policy is compliant with the Nigeria Data Protection Regulation (NDPR) 2019 and the Nigeria Data Protection Act 2023.</p>
          </section>

          <section>
            <h2>2. Data We Collect</h2>
            <p>We collect the following types of personal data:</p>

            <h3>Account Information</h3>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Password (stored encrypted — we never see your plain text password)</li>
              <li>Google account information (if you sign in with Google)</li>
            </ul>

            <h3>Profile Information</h3>
            <ul>
              <li>Professional role and preferred job location</li>
              <li>Industries of interest</li>
              <li>Professional introduction / bio</li>
            </ul>

            <h3>Documents</h3>
            <ul>
              <li>Your CV file (PDF, DOC, or DOCX)</li>
              <li>Your cover letter file (optional)</li>
            </ul>

            <h3>Order and Payment Information</h3>
            <ul>
              <li>Blast order history (companies count, amount, status)</li>
              <li>Payment reference numbers (we do not store your card details — Paystack handles all card data)</li>
            </ul>

            <h3>Technical Data</h3>
            <ul>
              <li>IP address and browser type (collected automatically by our hosting provider)</li>
              <li>Usage data such as pages visited and features used</li>
            </ul>
          </section>

          <section>
            <h2>3. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul>
              <li><strong>To provide our service</strong> — sending your CV to selected companies on your behalf</li>
              <li><strong>To manage your account</strong> — authentication, profile management, and order history</li>
              <li><strong>To process payments</strong> — verifying and confirming your Paystack transactions</li>
              <li><strong>To communicate with you</strong> — blast confirmations, order updates, and support responses</li>
              <li><strong>To improve our platform</strong> — analysing usage patterns to fix bugs and improve features</li>
              <li><strong>To comply with legal obligations</strong> — maintaining records as required by Nigerian law</li>
            </ul>
            <div className="legal-callout">
              We will never sell your personal data or CV to third parties. Your documents are used solely to deliver the blast service you paid for.
            </div>
          </section>

          <section>
            <h2>4. How Your CV is Used</h2>
            <p>When you submit a blast order, your CV and cover letter are:</p>
            <ul>
              <li>Attached to an email sent to each selected company's HR inbox</li>
              <li>The email is sent on your behalf with your email address as the Reply-To</li>
              <li>Companies receive your CV directly — we do not act as an intermediary for replies</li>
            </ul>
            <p>Your CV files are stored on our secure servers (hosted on Render) for as long as your account is active, so you can reuse them for future blasts without re-uploading.</p>
          </section>

          <section>
            <h2>5. Data Sharing</h2>
            <p>We share your data only in the following limited circumstances:</p>
            <ul>
              <li><strong>Tech companies you select</strong> — your CV and cover letter are sent to their HR email addresses as part of the service</li>
              <li><strong>Paystack</strong> — your email address and payment amount are shared to process transactions</li>
              <li><strong>Google</strong> — if you use Google Sign-In, your Google account data is used for authentication only</li>
              <li><strong>Render (hosting)</strong> — your data is stored on Render's servers in accordance with their privacy policy</li>
              <li><strong>Legal requirements</strong> — we may disclose data if required by Nigerian law or a valid court order</li>
            </ul>
            <p>We do not share, sell, or rent your personal data to advertisers, data brokers, or any other third parties.</p>
          </section>

          <section>
            <h2>6. Data Storage and Security</h2>
            <p>Your data is stored on secure servers provided by Render (render.com) and MongoDB Atlas. We implement the following security measures:</p>
            <ul>
              <li>All data transmitted between your browser and our servers is encrypted via HTTPS/TLS</li>
              <li>Passwords are hashed using industry-standard encryption — we cannot see your password</li>
              <li>Payment processing is handled entirely by Paystack — we never store card numbers or bank details</li>
              <li>Access to our database is restricted to authorized personnel only</li>
            </ul>
            <p>While we take reasonable measures to protect your data, no system is completely secure. We cannot guarantee absolute security of data transmitted over the internet.</p>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <p>We retain your personal data for as long as your account is active. Specifically:</p>
            <ul>
              <li><strong>Account data</strong> — retained until you request account deletion</li>
              <li><strong>CV and cover letter files</strong> — retained until you delete them from your profile or delete your account</li>
              <li><strong>Order history</strong> — retained for up to 3 years for financial record-keeping purposes</li>
              <li><strong>Payment references</strong> — retained for up to 5 years as required by Nigerian financial regulations</li>
            </ul>
          </section>

          <section>
            <h2>8. Your Rights (NDPR)</h2>
            <p>Under the Nigeria Data Protection Regulation (NDPR), you have the following rights:</p>
            <ul>
              <li><strong>Right to Access</strong> — you can request a copy of all personal data we hold about you</li>
              <li><strong>Right to Rectification</strong> — you can update or correct inaccurate data via your profile settings</li>
              <li><strong>Right to Erasure</strong> — you can request deletion of your account and all associated data</li>
              <li><strong>Right to Portability</strong> — you can request your data in a portable format</li>
              <li><strong>Right to Object</strong> — you can object to processing of your data for specific purposes</li>
              <li><strong>Right to Withdraw Consent</strong> — you can withdraw consent at any time by deleting your account</li>
            </ul>
            <p>To exercise any of these rights, contact us at <strong>swiftyapply@gmail.com</strong>. We will respond within 30 days.</p>
          </section>

          <section>
            <h2>9. Cookies</h2>
            <p>SwiftyApply uses minimal cookies and local storage for:</p>
            <ul>
              <li>Keeping you logged in (authentication token stored in localStorage)</li>
              <li>Remembering pending payment references temporarily</li>
            </ul>
            <p>We do not use advertising cookies, tracking pixels, or third-party analytics cookies.</p>
          </section>

          <section>
            <h2>10. Children's Privacy</h2>
            <p>SwiftyApply is not intended for anyone under the age of 18. We do not knowingly collect personal data from children. If you believe a child has provided us with their data, please contact us immediately at <strong>swiftyapply@gmail.com</strong> and we will delete it.</p>
          </section>

          <section>
            <h2>11. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page. Your continued use of the Platform after changes are posted constitutes your acceptance of the revised Policy.</p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>For any privacy-related questions, requests, or complaints, please contact our Data Protection Officer at:</p>
            <div className="legal-contact-box">
              <p><strong>SwiftyApply — Data Protection</strong></p>
              <p>Email: <strong>swiftyapply@gmail.com</strong></p>
              <p>Website: swiftyapply.vercel.app</p>
              <p>Response time: within 30 business days</p>
            </div>
          </section>

        </div>
      </div>

      <div className="legal-footer">
        <span>© 2026 SwiftyApply. All rights reserved.</span>
        <div className="legal-footer-links">
          <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'terms' }))}>Terms of Service</button>
          <span className="legal-active">Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}