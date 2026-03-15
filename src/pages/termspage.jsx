/*
 * TermsPage.jsx — SwiftyApply Terms of Service
 */
import './LegalPage.css'

export default function TermsPage({ onBack }) {
  return (
    <div className="legal-page">
      <div className="legal-nav">
        <span className="legal-logo">Swifty<span>Apply</span></span>
        <button className="legal-back" onClick={onBack}>Back to Home</button>
      </div>

      <div className="legal-container">
        <div className="legal-header">
          <h1>Terms of Service</h1>
          <p className="legal-date">Last updated: March 15, 2026</p>
        </div>

        <div className="legal-body">

          <section>
            <h2>1. Introduction and Acceptance</h2>
            <p>Welcome to SwiftyApply ("we," "our," or "us"). By accessing or using our platform at swiftyapply.vercel.app (the "Platform"), you agree to be bound by these Terms of Service. Please read them carefully before using our services.</p>
            <p>If you do not agree to these Terms, you must not use SwiftyApply. Your continued use of the Platform constitutes acceptance of any changes we make to these Terms.</p>
          </section>

          <section>
            <h2>2. Description of Service</h2>
            <p>SwiftyApply is a CV distribution platform that allows job seekers ("Users") to upload their curriculum vitae (CV) and cover letter, and have them sent via email to a selected number of tech companies across Africa and globally on their behalf.</p>
            <p>Our service includes:</p>
            <ul>
              <li>Accepting CV and cover letter uploads from Users</li>
              <li>Sending CV blast emails to verified tech company HR inboxes</li>
              <li>Providing a dashboard to track blast progress and order history</li>
              <li>Processing payments securely via Paystack</li>
            </ul>
            <div className="legal-callout">
              SwiftyApply is a distribution service only. We do not guarantee interviews, employment offers, or any response from the companies we contact on your behalf.
            </div>
          </section>

          <section>
            <h2>3. User Eligibility</h2>
            <p>To use SwiftyApply, you must:</p>
            <ul>
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Have the legal right to use and distribute the CV and documents you upload</li>
              <li>Not be prohibited from using our services under applicable law</li>
            </ul>
          </section>

          <section>
            <h2>4. User Responsibilities</h2>
            <p>By using SwiftyApply, you agree that:</p>
            <ul>
              <li>The CV and documents you upload belong to you and contain accurate information about yourself</li>
              <li>You will not upload CVs or documents belonging to another person without their explicit written consent</li>
              <li>You will not use the Platform to send spam, malware, or any harmful content</li>
              <li>You will not attempt to reverse-engineer, hack, or disrupt the Platform</li>
              <li>You will not use our service to harass, defame, or harm any individual or company</li>
              <li>You are solely responsible for the accuracy of information in your CV</li>
            </ul>
          </section>

          <section>
            <h2>5. Payments and Refund Policy</h2>
            <p>All payments are processed securely by Paystack. By making a payment, you agree to Paystack's terms and conditions in addition to ours.</p>
            <p>Pricing is calculated at <strong>₦250 per company</strong>, with a minimum of 20 companies (₦5,000 minimum).</p>
            <p><strong>Refund Policy:</strong></p>
            <ul>
              <li>No refunds are issued once a blast has started sending, as the service has been rendered</li>
              <li>If a blast fails entirely due to a technical error on our end before any emails are sent, you are entitled to a full refund or a free re-blast</li>
              <li>Partial refunds may be considered at our discretion if a significant portion of your blast failed due to our technical error</li>
              <li>We do not offer refunds if companies choose not to respond to your application</li>
              <li>Payment disputes must be raised within 7 days of the transaction</li>
            </ul>
            <p>To request a refund, contact us at <strong>swiftyapply@gmail.com</strong>.</p>
          </section>

          <section>
            <h2>6. Cold Email Disclosure</h2>
            <div className="legal-callout legal-callout-warning">
              <strong>Important:</strong> SwiftyApply sends your CV to companies on a cold outreach basis. This means the companies receiving your CV have not specifically requested it. While we only contact verified tech companies, we cannot guarantee that every recipient will welcome unsolicited applications.
            </div>
            <p>By using our service, you acknowledge and accept that:</p>
            <ul>
              <li>Some companies may not accept unsolicited CVs</li>
              <li>Some emails may be blocked, filtered as spam, or bounced by recipient mail servers</li>
              <li>We cannot guarantee delivery to 100% of selected companies</li>
              <li>Response rates vary significantly based on role, timing, and company hiring needs</li>
            </ul>
          </section>

          <section>
            <h2>7. Intellectual Property</h2>
            <p>You retain full ownership of your CV, cover letter, and any documents you upload. By uploading content to SwiftyApply, you grant us a limited, non-exclusive license to store and transmit your documents solely for the purpose of delivering our service.</p>
            <p>All other content on the Platform — including logos, design, code, and copy — belongs to SwiftyApply and may not be copied, reproduced, or distributed without our written permission.</p>
          </section>

          <section>
            <h2>8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, SwiftyApply shall not be liable for:</p>
            <ul>
              <li>Any failure to secure employment or interviews as a result of using our service</li>
              <li>Emails that are blocked, bounced, or filtered by recipient mail servers</li>
              <li>Any indirect, incidental, or consequential damages arising from use of the Platform</li>
              <li>Loss of data due to technical failures beyond our reasonable control</li>
            </ul>
            <p>Our maximum liability to you for any claim shall not exceed the amount you paid for the specific service giving rise to the claim.</p>
          </section>

          <section>
            <h2>9. Account Termination</h2>
            <p>We reserve the right to suspend or terminate your account at our discretion if we determine that you have:</p>
            <ul>
              <li>Violated any of these Terms</li>
              <li>Provided false or misleading information</li>
              <li>Attempted to abuse, exploit, or disrupt the Platform</li>
              <li>Used the service for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2>10. Changes to These Terms</h2>
            <p>We may update these Terms from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.</p>
          </section>

          <section>
            <h2>11. Governing Law</h2>
            <p>These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.</p>
          </section>

          <section>
            <h2>12. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at:</p>
            <div className="legal-contact-box">
              <p><strong>SwiftyApply</strong></p>
              <p>Email: <strong>swiftyapply@gmail.com</strong></p>
              <p>Website: swiftyapply.vercel.app</p>
            </div>
          </section>

        </div>
      </div>

      <div className="legal-footer">
        <span>© 2026 SwiftyApply. All rights reserved.</span>
        <div className="legal-footer-links">
          <span className="legal-active">Terms of Service</span>
          <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'privacy' }))}>Privacy Policy</button>
        </div>
      </div>
    </div>
  )
}