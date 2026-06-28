import { motion } from 'framer-motion'

const LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  return (
    <motion.nav
      className="nav"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="nav-inner-wrap">
        <div className="container nav-inner">
          <a href="#top" className="brand" data-cursor="home">
            <span className="brand-dot" />
            Pratham Patel
          </a>
          <div className="nav-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link mono" data-cursor="go">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
