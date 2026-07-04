import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'

const ITEMS = [
  {
    title: 'IT / Technical Projects',
    sub: 'Hands-on systems',
    meta: 'github.com/Pratham123650',
    link: 'https://github.com/Pratham123650',
    bullets: [
      'Built and managed a Proxmox home lab with Ubuntu and Windows Server.',
      'Configured Active Directory, user accounts, and core network services.',
      'Explored Docker and Ansible for automation and server setup.',
      'Developed technical troubleshooting and problem-solving skills by installing, configuring, and maintaining lab environments across multiple operating systems and platforms.',
    ],
  },
  {
    title: 'Vice President — Video Game Development Club',
    sub: 'Leadership · Wayne State University',
    bullets: [
      'Supported club initiatives, collaborated with members, and contributed to a creative, team-driven environment.',
      'Strengthened leadership, coordination, and the ability to work with others toward shared goals.',
    ],
  },
  {
    title: 'Manager — Subway',
    sub: 'Leadership · Operations',
    bullets: [
      'Helped oversee daily operations, supported team members, and ensured customers had a positive experience.',
      'Strengthened clear communication, quick problem-solving, and organization in a fast-paced environment.',
    ],
  },
]

export default function Experience() {
  const railRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <section id="experience">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">Background</span>
            <h2 className="section-title">Experience &amp; <em>highlights</em></h2>
          </Reveal>
        </div>

        <div className="timeline" ref={railRef}>
          <div className="timeline-rail" aria-hidden="true">
            <motion.i style={{ scaleY }} />
          </div>

          {ITEMS.map((item, i) => (
            <div className="timeline-item" key={item.title}>
              <span className="timeline-dot" aria-hidden="true" />
              <Reveal delay={i * 0.05}>
                <div className="card timeline-card">
                  <div className="timeline-meta">
                    <div>
                      <h3>{item.title}</h3>
                      <div className="sub">{item.sub}</div>
                    </div>
                    {item.meta && <span className="mono">{item.meta}</span>}
                  </div>
                  <ul>
                    {item.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noreferrer" className="u-link card-link">
                      Visit GitHub
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className="experience-cta">
          <Magnetic href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
            View résumé PDF <span className="arrow">→</span>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}
