import { useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 5h5v5M19 5l-8 8M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
  </svg>
)

/* Miniature line-art scenes, one per project — drawn, not stock. */
const Visuals = {
  rack: (
    <svg viewBox="0 0 400 220" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.9">
        <rect x="140" y="30" width="120" height="160" rx="6" />
        {[52, 78, 104, 130, 156].map((y) => (
          <g key={y}>
            <rect x="150" y={y} width="100" height="18" rx="3" opacity="0.7" />
            <circle cx="158" cy={y + 9} r="2" fill="currentColor" stroke="none" opacity="0.9" />
            <path d={`M170 ${y + 9} h60`} opacity="0.35" />
          </g>
        ))}
        <path d="M140 110 H60 M60 110 V60 M60 110 V170" opacity="0.4" />
        <circle cx="60" cy="60" r="3" fill="currentColor" stroke="none" opacity="0.7" />
        <circle cx="60" cy="170" r="3" fill="currentColor" stroke="none" opacity="0.7" />
        <path d="M260 90 H340 M340 90 V140" opacity="0.4" />
        <circle cx="340" cy="140" r="3" fill="currentColor" stroke="none" opacity="0.7" />
      </g>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 400 220" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.9">
        <rect x="90" y="40" width="220" height="140" rx="8" />
        <path d="M90 66h220" opacity="0.5" />
        <circle cx="106" cy="53" r="3" opacity="0.7" />
        <circle cx="118" cy="53" r="3" opacity="0.5" />
        <circle cx="130" cy="53" r="3" opacity="0.3" />
        <path d="m130 96-14 14 14 14M170 96l14 14-14 14M158 92l-8 40" opacity="0.85" />
        <path d="M200 100h70M200 116h90M200 132h56" opacity="0.35" />
      </g>
    </svg>
  ),
  network: (
    <svg viewBox="0 0 400 220" fill="none" stroke="currentColor" strokeWidth="1" preserveAspectRatio="xMidYMid slice">
      <g opacity="0.9">
        <circle cx="200" cy="110" r="26" />
        <text x="200" y="115" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontFamily="monospace" opacity="0.9">DNS</text>
        {[
          [90, 50, 'AD'], [310, 50, 'DHCP'], [90, 170, 'SQL'], [310, 170, 'HTTP'],
        ].map(([x, y, label]) => (
          <g key={label}>
            <rect x={x - 26} y={y - 15} width="52" height="30" rx="6" />
            <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fill="currentColor" stroke="none" fontFamily="monospace" opacity="0.9">{label}</text>
            <path d={`M${x} ${y > 110 ? y - 15 : y + 15} L200 ${y > 110 ? 128 : 92}`} opacity="0.4" />
          </g>
        ))}
      </g>
    </svg>
  ),
}

const PROJECTS = [
  {
    category: 'Infrastructure',
    title: 'Home Lab / Proxmox Server',
    desc: 'Built a virtualization environment for hosting VMs, testing services, and learning infrastructure management.',
    tags: ['Proxmox', 'Linux', 'Virtualization'],
    visual: 'rack',
    wide: true,
    links: [
      { label: 'GitHub profile', href: 'https://github.com/Pratham123650' },
      { label: 'Ask me about it', href: '#contact', internal: true },
    ],
  },
  {
    category: 'Development',
    title: 'Java Application Projects',
    desc: 'Created course-based apps involving data structures, file handling, and user interfaces for practical development experience.',
    tags: ['Java', 'Data Structures', 'JavaFX'],
    visual: 'code',
    links: [{ label: 'View on GitHub', href: 'https://github.com/Pratham123650' }],
  },
  {
    category: 'Systems',
    title: 'Networking / Systems Labs',
    desc: 'Configured services like DNS, DHCP, Active Directory, Apache, and MySQL as part of hands-on systems administration labs.',
    tags: ['Networking', 'Windows Server', 'MySQL'],
    visual: 'network',
    links: [{ label: 'GitHub profile', href: 'https://github.com/Pratham123650' }],
  },
]

function ProjectCard({ project }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 22 })
  const sry = useSpring(ry, { stiffness: 180, damping: 22 })

  const onMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
    if (reduce) return
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 4)
    rx.set(-py * 4)
  }, [reduce, rx, ry])

  const onLeave = useCallback(() => { rx.set(0); ry.set(0) }, [rx, ry])

  return (
    <motion.article
      ref={ref}
      className={`card project-card${project.wide ? ' is-wide' : ''}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX: srx, rotateY: sry, transformPerspective: 900 }}
    >
      <div className="project-top">
        <span className="mono project-cat">{project.category}</span>
        <span className="mono">{project.tags.length} tools</span>
      </div>

      <div className="project-visual" aria-hidden="true">
        {Visuals[project.visual]}
      </div>

      <h3>{project.title}</h3>
      <p>{project.desc}</p>

      <div className="project-tags">
        {project.tags.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="project-links">
        {project.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="u-link"
            target={l.internal ? undefined : '_blank'}
            rel={l.internal ? undefined : 'noreferrer'}
          >
            {l.label} {!l.internal && <ExternalIcon />}
          </a>
        ))}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">Selected work</span>
            <h2 className="section-title">Featured <em>projects</em></h2>
          </Reveal>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={p.wide ? 'is-wide-wrap' : undefined} as="div">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
