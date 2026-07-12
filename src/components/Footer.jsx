import { PROFILE } from '../data/content.js'

export default function Footer() {
  const toTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="mono footer-id">
          © {new Date().getFullYear()} {PROFILE.name} · PORTFOLIO V2.0
        </p>

        <div className="footer-social">
          <a className="u-link" href={PROFILE.github} target="_blank" rel="noreferrer" data-cursor="open">GitHub</a>
          <a className="u-link" href={PROFILE.linkedin} target="_blank" rel="noreferrer" data-cursor="open">LinkedIn</a>
          <a className="u-link" href={`mailto:${PROFILE.email}`} data-cursor="open">Email</a>
        </div>

        <div className="footer-right">
          <span className="footer-status mono"><i /> SYSTEM ONLINE</span>
          <a href="#top" className="footer-top mono" onClick={toTop} data-cursor="open" aria-label="Back to top">
            ↑ TOP
          </a>
        </div>
      </div>
    </footer>
  )
}
