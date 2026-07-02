import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from './TiltCard.jsx'
import MagneticButton from './MagneticButton.jsx'

const ROLES = [
  'IT Student',
  'Systems Administration',
  'Home Lab Builder',
  'Networking and Virtualization',
  'Interactive IT Portfolio',
]

const METRICS = [
  { label: 'GPA', value: '3.83' },
  { label: 'Graduation', value: 'Dec 2027' },
  { label: 'Location', value: 'Michigan' },
]

const COMMANDS = [
  { id: '01', label: 'Projects', desc: 'Infrastructure, labs, and code', href: '#projects', cursor: 'explore' },
  { id: '02', label: 'Resume', desc: 'Skills, education, and highlights', href: '#resume', cursor: 'view' },
  { id: '03', label: 'Contact', desc: 'Email, GitHub, and LinkedIn', href: '#contact', cursor: 'connect' },
]

const STACK = ['Linux', 'Windows Server', 'Proxmox', 'Networking', 'Java', 'Python']

function useTyping(roles) {
  const [text, setText] = useState('')
  useEffect(() => {
    let ri = 0, ci = 0, del = false, t
    const tick = () => {
      const r = roles[ri]
      setText(r.substring(0, del ? ci - 1 : ci + 1))
      del ? ci-- : ci++
      let delay = del ? 38 : 75
      if (!del && ci === r.length) { del = true; delay = 1500 }
      if (del && ci === 0) { del = false; ri = (ri + 1) % roles.length; delay = 250 }
      t = setTimeout(tick, delay)
    }
    t = setTimeout(tick, 400)
    return () => clearTimeout(t)
  }, [roles])
  return text
}

export default function Hero() {
  const typed = useTyping(ROLES)

  return (
    <header id="top" className="hero">
      <div className="container hero-grid">
        <motion.div
          className="hero-primary"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <TiltCard className="card hero-main" tiltAmount={3}>
            <div className="eyebrow mono">
              <span className="dot" />
              Interactive IT Portfolio
            </div>
            <h1>
              Pratham <span className="text-grad">Patel</span>
            </h1>
            <p className="typing-text mono">
              {typed}<span className="typing-cursor">|</span>
            </p>
            <p className="hero-copy">
              A portfolio built around practical systems work: virtualization,
              networking labs, infrastructure tools, and the path toward an IT
              systems internship.
            </p>
            <div className="cta-row">
              <MagneticButton href="#projects" className="btn btn-primary" data-cursor="explore">
                Explore Work
              </MagneticButton>
              <MagneticButton href="#resume" className="btn btn-secondary" data-cursor="view">
                Resume
              </MagneticButton>
              <MagneticButton href="https://github.com/Pratham123650" target="_blank" rel="noreferrer" className="btn btn-secondary" data-cursor="visit">
                GitHub
              </MagneticButton>
            </div>

            <div className="hero-metrics" aria-label="Profile highlights">
              {METRICS.map((metric) => (
                <div className="hero-metric" key={metric.label}>
                  <span className="mono">{metric.label}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <div className="hero-stack-list" aria-label="Current technology focus">
              {STACK.map((item) => (
                <span className="tag" key={item}>{item}</span>
              ))}
            </div>
          </TiltCard>

          <div className="hero-signal mono" aria-hidden="true">
            <span>portfolio signal</span>
            <div className="signal-bars">
              {Array.from({ length: 12 }, (_, i) => (
                <i key={i} style={{ '--i': i }} />
              ))}
            </div>
            <span>open to internships</span>
          </div>
        </motion.div>

        <motion.aside
          className="hero-command"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <TiltCard className="card command-card" tiltAmount={4}>
            <div className="command-top mono">
              <span>// control deck</span>
              <span className="command-status"><i /> online</span>
            </div>

            <nav className="command-paths" aria-label="Portfolio shortcuts">
              {COMMANDS.map((command) => (
                <a
                  className="command-path"
                  href={command.href}
                  key={command.id}
                  data-cursor={command.cursor}
                >
                  <span className="command-id mono">{command.id}</span>
                  <span>
                    <strong>{command.label}</strong>
                    <small>{command.desc}</small>
                  </span>
                </a>
              ))}
            </nav>

            <div className="console-readout mono">
              <span>$ current_focus</span>
              <p>Building infrastructure skills through labs, coursework, and hands-on projects.</p>
              <span>$ contact</span>
              <p>prathampatel102403@gmail.com</p>
            </div>

            <div className="hero-signal command-signal mono" aria-hidden="true">
              <span>route</span>
              <div className="signal-bars">
                {Array.from({ length: 8 }, (_, i) => (
                  <i key={i} style={{ '--i': i }} />
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.aside>
      </div>
    </header>
  )
}
