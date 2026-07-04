import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const LINKS = [
  { href: '#about', id: 'about', label: 'About' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#experience', id: 'experience', label: 'Experience' },
]

export default function Nav() {
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [intro, setIntro] = useState(true)
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 4200)
    return () => clearTimeout(t)
  }, [])

  /* Scroll spy */
  useEffect(() => {
    const sections = [...LINKS.map((l) => l.id), 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  /* Hide on scroll down, show on scroll up */
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setHidden(y > last && y > 140 && !open)
        last = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.nav
        className="nav"
        initial={reduce ? false : { y: -70, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: intro && !reduce ? 2.9 : 0 }}
        aria-label="Primary"
      >
        <div className="nav-pill">
          <a href="#top" className="brand" onClick={close}>
            Pratham <em>Patel</em>
          </a>

          <div className="nav-links">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={`nav-link${active === l.id ? ' is-active' : ''}`}
              >
                {active === l.id && (
                  <motion.span
                    className="nav-active-bg"
                    layoutId="nav-active"
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                )}
                {l.label}
              </a>
            ))}
          </div>

          <a href="#contact" className="btn btn-primary nav-cta">Contact</a>

          <button
            className={`nav-burger${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={l.href}
                className={active === l.id ? 'is-active' : ''}
                onClick={close}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={close} className={active === 'contact' ? 'is-active' : ''}>
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
