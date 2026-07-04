export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="mono">© {new Date().getFullYear()} Pratham Patel · Built with React, Vite &amp; Framer Motion</p>
        <div className="footer-social">
          <a className="u-link" href="https://github.com/Pratham123650" target="_blank" rel="noreferrer">GitHub</a>
          <a className="u-link" href="https://www.linkedin.com/in/prathampatelit/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="u-link" href="mailto:prathampatel102403@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  )
}
