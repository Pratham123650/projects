import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { NAV_LINKS, PROFILE } from '../data/content.js'
import { useSystem } from '../context/SystemContext.jsx'
import ScrollProgress from './ScrollProgress.jsx'

export default function Nav() {
  const { setSection, systemView, setSystemView, setTermOpen, ready } = useSystem()
  const [active, setActive] = useState('')
  const [hidden, setHidden] = useState(false)
  const [compact, setCompact] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  /* Scroll spy — also feeds the section-reactive backdrop environment. */
  useEffect(() => {
    const ids = ['top', ...NAV_LINKS.map((l) => l.id), 'virtualization']
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          setActive(e.target.id)
          setSection(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [setSection])

  /* Hide on scroll down, compact after the hero. */
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        setHidden(y > last && y > 160 && !open)
        setCompact(y > 90)
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
      <ScrollProgress />
      <motion.nav
        className={`nav${compact ? ' is-compact' : ''}`}
        initial={reduce ? false : { y: -70, opacity: 0 }}
        animate={{ y: hidden ? -96 : 0, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Primary"
      >
        <div className="nav-pill">
          <a href="#top" className="brand" onClick={close} data-cursor="open">
            PP<em>_</em>
          </a>

          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-cursor="open"
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

          <div className="nav-tools">
            <button
              className={`sv-toggle mono${systemView ? ' is-on' : ''}`}
              onClick={() => setSystemView(!systemView)}
              aria-pressed={systemView}
              title="Toggle System View"
            >
              <i /> System&nbsp;View
            </button>
            <button
              className="term-btn mono"
              onClick={() => setTermOpen(true)}
              aria-label="Open terminal (Ctrl + backtick)"
              title="Terminal (Ctrl + `)"
            >
              &gt;_
            </button>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary nav-cta"
              data-cursor="open"
            >
              Resume
            </a>
          </div>

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
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} onClick={close}>
                {l.label}
              </a>
            ))}
            <a href={PROFILE.resume} target="_blank" rel="noreferrer" onClick={close}>Resume</a>
            <div className="nav-mobile-tools">
              <button
                className={`sv-toggle mono${systemView ? ' is-on' : ''}`}
                onClick={() => { setSystemView(!systemView); close() }}
                aria-pressed={systemView}
              >
                <i /> System View
              </button>
              <button className="term-btn mono" onClick={() => { setTermOpen(true); close() }}>
                &gt;_ Terminal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
