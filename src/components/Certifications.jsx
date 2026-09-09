import { CERTIFICATIONS } from '../data/content.js'

/* Ready for verified credentials; hidden while the centralized data array is empty. */
export default function Certifications() {
  if (!CERTIFICATIONS.length) return null

  return (
    <section id="certifications" aria-labelledby="certifications-title">
      <div className="container">
        <h2 id="certifications-title" className="section-title">Verified <em>certifications</em></h2>
        <div className="certification-grid">
          {CERTIFICATIONS.map((certification) => (
            <article className="card certification-card" key={certification.credentialId || certification.name}>
              <span className="mono">{certification.status}</span>
              <h3>{certification.name}</h3>
              <p>{certification.issuer} · {certification.dateEarned}</p>
              {certification.credentialId && <p>Credential ID: {certification.credentialId}</p>}
              {certification.verificationUrl && <a className="u-link" href={certification.verificationUrl} target="_blank" rel="noreferrer">Verify credential</a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
