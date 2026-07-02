import { useMemo, useState } from 'react'
import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

const FILTERS = ['All', 'Infrastructure', 'Development', 'Systems']

const PROJECTS = [
  {
    id: '01',
    category: 'Infrastructure',
    title: 'Home Lab / Proxmox Server',
    desc: 'Built a virtualization environment for hosting VMs, testing services, and learning infrastructure management.',
    tags: ['Proxmox', 'Linux', 'Virtualization'],
    links: [
      { label: 'GitHub Profile', href: 'https://github.com/Pratham123650' },
      { label: 'Ask Me About It', href: '#contact', internal: true },
    ],
  },
  {
    id: '02',
    category: 'Development',
    title: 'Java Application Projects',
    desc: 'Created course-based apps involving data structures, file handling, and user interfaces for practical development experience.',
    tags: ['Java', 'Data Structures', 'JavaFX'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/Pratham123650' }],
  },
  {
    id: '03',
    category: 'Systems',
    title: 'Networking / Systems Labs',
    desc: 'Configured services like DNS, DHCP, Active Directory, Apache, and MySQL as part of hands-on systems administration labs.',
    tags: ['Networking', 'Windows Server', 'MySQL'],
    links: [{ label: 'GitHub Profile', href: 'https://github.com/Pratham123650' }],
  },
]

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const filteredProjects = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((project) => project.category === filter)),
    [filter]
  )

  return (
    <section id="projects">
      <div className="container">
        <div className="section-divider" />
        <Reveal className="section-heading">
          <div>
            <span className="section-label mono">// work</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
          <div className="project-filters" aria-label="Project filters">
            {FILTERS.map((item) => (
              <button
                key={item}
                type="button"
                className={`filter-pill mono${filter === item ? ' is-active' : ''}`}
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                data-cursor="filter"
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid" aria-live="polite">
          {filteredProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <TiltCard className="card project-card" tiltAmount={10} data-cursor="inspect">
                <div className="project-meta mono">
                  <span>{p.category}</span>
                  <span>{p.tags.length} tools</span>
                </div>
                <div className="project-number mono">{p.id}</div>
                <h3 className="project-title">{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tag-list">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {p.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.internal ? undefined : '_blank'}
                      rel={l.internal ? undefined : 'noreferrer'}
                      data-cursor={l.internal ? 'go' : 'open'}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
