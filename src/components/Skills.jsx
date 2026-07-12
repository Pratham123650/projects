import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import Reveal from './Reveal.jsx'
import { SKILL_CATEGORIES } from '../data/content.js'

/*
 * Skills as a network architecture map.
 * PRATHAM is the core node; categories branch outward. The recurring
 * packet enters on scroll and routes to each category, lighting it up.
 * Hover / focus / tap explores; click pins a category open.
 */

const CX = 50
const CY = 50

export default function Skills() {
  const mapRef = useRef(null)
  const packetRef = useRef(null)
  const reduce = useReducedMotion()

  const [hovered, setHovered] = useState(null)
  const [pinned, setPinned] = useState(null)
  const [lit, setLit] = useState(reduce ? SKILL_CATEGORIES.length : 0)

  /* Scroll-scrubbed packet: routes core → node k while the map crosses the viewport. */
  const { scrollYProgress } = useScroll({ target: mapRef, offset: ['start 0.85', 'end 0.6'] })
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduce) return
    const n = SKILL_CATEGORIES.length
    const total = Math.min(0.999, Math.max(0, p)) * n
    const idx = Math.floor(total)
    const t = total - idx
    setLit(p >= 1 ? n : idx)
    const el = packetRef.current
    if (!el) return
    if (p <= 0 || p >= 1) { el.style.opacity = 0; return }
    const target = SKILL_CATEGORIES[Math.min(idx, n - 1)]
    el.style.opacity = 1
    el.setAttribute('cx', CX + (target.x - CX) * t)
    el.setAttribute('cy', CY + (target.y - CY) * t)
  })

  const active = pinned ?? hovered
  const activeCat = SKILL_CATEGORIES.find((c) => c.id === active)

  return (
    <section id="skills" data-module="MODULE_03 · NETWORK_MAP">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">Network architecture</span>
            <h2 className="section-title">Skill <em>nodes</em></h2>
            <p className="section-sub">
              Every capability routes back to hands-on work. Hover or tap a node to
              see where I&apos;ve actually used it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div
            className="netmap"
            ref={mapRef}
            data-active={active || undefined}
            data-sv="NETWORK_MAP"
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="netmap-svg" aria-hidden="true">
              {SKILL_CATEGORIES.map((c, i) => (
                <line
                  key={c.id}
                  className={`nm-edge${active === c.id ? ' is-active' : ''}${i < lit ? ' is-lit' : ''}`}
                  x1={CX} y1={CY} x2={c.x} y2={c.y}
                />
              ))}
              {!reduce && <circle ref={packetRef} className="nm-packet" r="1.1" cx={CX} cy={CY} style={{ opacity: 0 }} />}
            </svg>

            {/* Core node */}
            <div className="nm-core" style={{ left: `${CX}%`, top: `${CY}%` }} aria-hidden="true">
              <span className="nm-core-ring" />
              <span className="nm-core-label mono">PRATHAM</span>
            </div>

            {/* Category nodes */}
            {SKILL_CATEGORIES.map((c, i) => (
              <button
                key={c.id}
                className={`nm-node${active === c.id ? ' is-active' : ''}${i < lit ? ' is-lit' : ''}`}
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                data-cursor="explore"
                aria-expanded={active === c.id}
                onPointerEnter={() => setHovered(c.id)}
                onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(c.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setPinned((v) => (v === c.id ? null : c.id))}
              >
                <i className="nm-dot" />
                <span className="nm-label mono">{c.label.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Detail panel */}
        <div className="nm-panel-wrap" aria-live="polite">
          <AnimatePresence mode="wait">
            {activeCat ? (
              <motion.div
                key={activeCat.id}
                className="card nm-panel"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="nm-panel-head mono">
                  <span>NODE // {activeCat.label.toUpperCase()}</span>
                  <span className="nm-panel-status"><i /> LINK ACTIVE</span>
                </div>
                <p>{activeCat.usage}</p>
                <div className="nm-panel-tags">
                  {activeCat.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                className="nm-hint mono"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
              >
                ▸ SELECT A NODE TO INSPECT ITS ROUTE
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
