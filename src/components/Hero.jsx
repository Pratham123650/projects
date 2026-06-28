import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TiltCard from './TiltCard.jsx'
import MagneticButton from './MagneticButton.jsx'

const ROLES = [
  'IT Student',
  'Systems Administration Enthusiast',
  'Home Lab Builder',
  'Aspiring IT / Systems Intern',
  'Virtualization · Networking · Software',
]

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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <TiltCard className="card hero-main" tiltAmount={3}>
            <div className="eyebrow mono">
              <span className="dot" />
              IT · SYSTEMS · PROJECTS · PORTFOLIO
            </div>
            <h1>
              Hi, I&apos;m <span className="text-grad">Pratham Patel</span>.
            </h1>
            <p className="typing-text mono">
              {typed}<span className="typing-cursor">|</span>
            </p>
            <p className="hero-copy">
              I&apos;m building practical technology projects in systems administration,
              networking, and virtualization. This site is a simple place to view my
              resume, see what I&apos;m working on, and get in touch.
            </p>
            <div className="cta-row">
              <MagneticButton href="#resume" className="btn btn-primary" data-cursor="view">
                View Resume
              </MagneticButton>
              <MagneticButton href="https://github.com/Pratham123650" target="_blank" className="btn btn-secondary" data-cursor="visit">
                GitHub
              </MagneticButton>
              <MagneticButton href="https://www.linkedin.com/in/prathampatelit/" target="_blank" className="btn btn-secondary" data-cursor="visit">
                LinkedIn
              </MagneticButton>
            </div>
            <div className="hero-signal mono" aria-hidden="true">
              <span>live signal</span>
              <div className="signal-bars">
                {Array.from({ length: 12 }, (_, i) => (
                  <i key={i} style={{ '--i': i }} />
                ))}
              </div>
              <span>availability open</span>
            </div>
          </TiltCard>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <TiltCard className="card hero-side" tiltAmount={4}>
            <div className="mini-block">
              <h3 className="mono">Focus Areas</h3>
              <ul className="skill-list">
                {['Linux', 'Windows Server', 'Virtualization', 'Networking', 'Proxmox'].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="mini-block">
              <h3 className="mono">What&apos;s on this site</h3>
              <p>Projects, technical skills, background, and a resume snapshot.</p>
            </div>
            <div className="mini-block status-block">
              <h3 className="mono">System Status</h3>
              <p className="status-line mono">
                <span className="status-led" /> ONLINE · open to internships
              </p>
              <p>Email: prathampatel102403@gmail.com<br />Location: Michigan, USA</p>
            </div>
          </TiltCard>
        </motion.aside>
      </div>
    </header>
  )
}
