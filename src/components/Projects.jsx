import { useCallback, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { PROJECTS, PROJECT_FILTERS } from '../data/content.js'

/*
 * Projects as virtual infrastructure — each one is a running instance,
 * not a card in a grid. Layered depth on hover (subtle, per-layer offsets),
 * real filters, and a featured instance tied to the virtualization sequence.
 */

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 5h5v5M19 5l-8 8M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
  </svg>
)

function Instance({ p }) {
  const reduce = useReducedMotion()

  /* Depth layers: children translate at different rates via CSS vars. */
  const onMove = useCallback((e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', (e.clientX - r.left) / r.width - 0.5)
    e.currentTarget.style.setProperty('--py', (e.clientY - r.top) / r.height - 0.5)
  }, [reduce])

  const onLeave = useCallback((e) => {
    e.currentTarget.style.setProperty('--px', 0)
    e.currentTarget.style.setProperty('--py', 0)
  }, [])

  return (
    <motion.article
      layout
      className={`proj${p.featured ? ' is-featured' : ''}`}
      data-cursor="view"
      data-sv="PROJECT_INSTANCE"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="proj-head mono">
        <span className="proj-id">{p.instance}</span>
        <span className="proj-cat">{p.category.toUpperCase()}</span>
        <span className="proj-status"><i /> RUNNING</span>
      </div>

      <div className="proj-body">
        {p.featured && <span className="proj-flag mono">★ FEATURED INSTANCE</span>}
        <h3 className="proj-title">{p.title}</h3>
        <p className="proj-desc">{p.desc}</p>

        <dl className="proj-rows">
          <div><dt className="mono">MAIN CHALLENGE</dt><dd>{p.challenge}</dd></div>
          <div><dt className="mono">WHAT I LEARNED</dt><dd>{p.learned}</dd></div>
        </dl>

        <div className="proj-tags">
          {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>

        <div className="proj-links">
          {p.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="u-link"
              data-cursor="open"
              target={l.internal ? undefined : '_blank'}
              rel={l.internal ? undefined : 'noreferrer'}
            >
              {l.label} {!l.internal && <ExternalIcon />}
            </a>
          ))}
        </div>
      </div>

      {/* Decorative circuit layer — moves at its own depth rate */}
      <svg className="proj-circuit" viewBox="0 0 200 120" aria-hidden="true">
        <path d="M 10 100 H 60 V 60 H 120 M 120 60 H 190 M 60 60 V 20 H 100" />
        <circle cx="120" cy="60" r="3" />
        <circle cx="60" cy="60" r="2.4" />
        <circle cx="100" cy="20" r="2.4" />
      </svg>
    </motion.article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const visible = PROJECTS.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id="projects" data-module="MODULE_06 · PROJECT_INSTANCES">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">Virtual infrastructure</span>
            <h2 className="section-title">Project <em>instances</em></h2>
            <p className="section-sub">
              Every project runs as part of the same environment — physical hardware
              underneath, virtual systems on top.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="proj-filters" role="tablist" aria-label="Filter projects">
              {PROJECT_FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  className={`proj-filter mono${filter === f ? ' is-on' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="proj-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => <Instance key={p.id} p={p} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
