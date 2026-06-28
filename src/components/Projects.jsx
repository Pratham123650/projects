import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

const PROJECTS = [
  {
    id: '01',
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
    title: 'Java Application Projects',
    desc: 'Created course-based apps involving data structures, file handling, and user interfaces for practical development experience.',
    tags: ['Java', 'Data Structures', 'JavaFX'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/Pratham123650' }],
  },
  {
    id: '03',
    title: 'Networking / Systems Labs',
    desc: 'Configured services like DNS, DHCP, Active Directory, Apache, and MySQL as part of hands-on systems administration labs.',
    tags: ['Networking', 'Windows Server', 'MySQL'],
    links: [{ label: 'GitHub Profile', href: 'https://github.com/Pratham123650' }],
  },
]

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-divider" />
        <Reveal className="section-heading">
          <div>
            <span className="section-label mono">// work</span>
            <h2 className="section-title">Featured Projects</h2>
          </div>
        </Reveal>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <TiltCard className="card project-card" tiltAmount={10} data-cursor="inspect">
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
