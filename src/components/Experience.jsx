import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { EXPERIENCE, PROFILE } from '../data/content.js'

/*
 * Experience as a cinematic system log — entries are recorded as the
 * visitor scrolls, with the packet traveling the vertical data path.
 * The styling is technical; the content stays recruiter-readable.
 */

export default function Experience() {
  const railRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 75%', 'end 60%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const packetTop = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" data-module="MODULE_07 · SYSTEM_LOG">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">System log</span>
            <h2 className="section-title">Recorded <em>experience</em></h2>
            <p className="section-sub">
              A running log of roles, responsibilities, and what each one added to the system.
            </p>
          </Reveal>
        </div>

        <div className="timeline" ref={railRef}>
          <div className="timeline-rail" aria-hidden="true">
            <motion.i style={{ scaleY: progress }} />
            <motion.span className="timeline-packet packet" style={{ top: packetTop }} />
          </div>

          {EXPERIENCE.map((item, i) => (
            <div className="timeline-item" key={item.log}>
              <span className="timeline-dot" aria-hidden="true" />
              <Reveal delay={i * 0.05}>
                <article className={`card log-entry${item.status === 'ACTIVE' ? ' is-live' : ''}`} data-sv="LOG_ENTRY">
                  <div className="log-meta mono">
                    <span className="log-id">[{item.log}]</span>
                    <span>{item.meta}</span>
                    <span className={`log-status st-${item.status.toLowerCase()}`}>
                      <i /> {item.status}
                    </span>
                  </div>

                  <div className="log-title">
                    <h3>{item.position}</h3>
                    <div className="log-org">{item.company}</div>
                  </div>

                  <ul className="log-lines">
                    {item.bullets.map((b) => (
                      <li key={b}><span className="mono log-caret">▸</span>{b}</li>
                    ))}
                  </ul>

                  <div className="log-tools">
                    <span className="mono log-tools-label">TOOLS</span>
                    {item.tools.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>

                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" className="u-link card-link" data-cursor="open">
                      Visit GitHub
                    </a>
                  )}
                </article>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className="experience-cta">
          <Magnetic href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-primary" data-cursor="open">
            View résumé PDF <span className="arrow">→</span>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
