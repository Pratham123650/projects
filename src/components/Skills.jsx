import { useCallback } from 'react'
import Reveal from './Reveal.jsx'

const GROUPS = [
  {
    title: 'Systems & Virtualization',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="7" rx="1.5" />
        <rect x="3" y="13" width="18" height="7" rx="1.5" />
        <path d="M7 7.5h.01M7 16.5h.01" strokeWidth="2.4" />
      </svg>
    ),
    skills: ['Linux Administration', 'Windows Server', 'Active Directory', 'Proxmox', 'VirtualBox'],
  },
  {
    title: 'Networking',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="19" r="2.2" />
        <circle cx="19" cy="19" r="2.2" />
        <path d="M12 7.2v5M12 12.2 6.2 17.4M12 12.2l5.8 5.2" />
      </svg>
    ),
    skills: ['Networking', 'TCP/IP', 'DNS', 'DHCP'],
  },
  {
    title: 'Development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 6-5 6 5 6M16 6l5 6-5 6M13.5 4l-3 16" />
      </svg>
    ),
    skills: ['Java', 'Python'],
  },
]

export default function Skills() {
  /* Feed cursor position into the card's radial glow via CSS vars. */
  const track = useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  return (
    <section id="skills">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">Capabilities</span>
            <h2 className="section-title">Technical <em>skills</em></h2>
          </Reveal>
        </div>

        <div className="skills-grid">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.1}>
              <div className="card skill-card" onPointerMove={track}>
                <div className="skill-head">
                  <span className="skill-icon">{g.icon}</span>
                  <h3>{g.title}</h3>
                </div>
                <div className="skill-tags">
                  {g.skills.map((s) => (
                    <span className="tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
