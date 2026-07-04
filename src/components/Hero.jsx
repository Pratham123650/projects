import { useEffect, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import Magnetic from './Magnetic.jsx'

const ROLES = [
  'IT Student',
  'Systems Administration',
  'Home Lab Builder',
  'Networking & Virtualization',
]

const STATS = [
  { value: '3.83', label: 'GPA · Wayne State' },
  { value: 'Dec 2027', label: 'Expected graduation' },
  { value: 'Michigan', label: 'Detroit metro' },
]

const STACK = ['Linux', 'Windows Server', 'Proxmox', 'Networking', 'Java', 'Python']

/* Signature element: a network topology drawn in champagne hairlines. */
const NODES = [
  [430, 90], [620, 150], [760, 70], [520, 260], [700, 300],
  [840, 220], [610, 430], [780, 470], [470, 420], [880, 380],
]
const EDGES = [
  [0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [2, 5],
  [3, 8], [4, 6], [6, 7], [7, 9], [5, 9], [6, 8], [4, 7],
]
/* Edges that carry animated "packets" after activation. */
const STREAMS = [1, 3, 8, 10]

function Topology({ ready }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 40, damping: 20, mass: 0.8 })
  const sy = useSpring(py, { stiffness: 40, damping: 20, mass: 0.8 })

  useEffect(() => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (e) => {
      px.set((e.clientX / window.innerWidth - 0.5) * -18)
      py.set((e.clientY / window.innerHeight - 0.5) * -12)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, px, py])

  return (
    <div className="hero-topology" aria-hidden="true">
      <motion.div className="hero-topology-inner" style={reduce ? undefined : { x: sx, y: sy }}>
        <svg viewBox="380 30 560 500" fill="none">
          <defs>
            <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d9bb84" stopOpacity="0.55" />
              <stop offset="1" stopColor="#8fa7cd" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {EDGES.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={NODES[a][0]} y1={NODES[a][1]}
              x2={NODES[b][0]} y2={NODES[b][1]}
              stroke="url(#edge)"
              strokeWidth="0.8"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={ready ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.4 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {/* Data streams: dashed overlays whose dashes travel along the wire. */}
          {!reduce && STREAMS.map((e, i) => {
            const [a, b] = EDGES[e]
            return (
              <motion.line
                key={`s${e}`}
                className="topo-stream"
                x1={NODES[a][0]} y1={NODES[a][1]}
                x2={NODES[b][0]} y2={NODES[b][1]}
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 2.2 + i * 0.3 }}
                style={{ animationDelay: `${i * 1.1}s` }}
              />
            )
          })}
          {NODES.map(([x, y], i) => (
            <motion.g
              key={i}
              initial={reduce ? false : { opacity: 0, scale: 0 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              <circle cx={x} cy={y} r="10" fill="#d9bb84" opacity="0.06" />
              <circle cx={x} cy={y} r="2.4" fill={i % 3 === 0 ? '#d9bb84' : '#8fa7cd'} opacity="0.85" />
            </motion.g>
          ))}
        </svg>
      </motion.div>

      {/* One calibration sweep across the hero as it activates. */}
      {!reduce && (
        <motion.div
          className="hero-scan"
          initial={{ x: '-10vw', opacity: 0 }}
          animate={ready ? { x: '110vw', opacity: [0, 0.9, 0.9, 0] } : {}}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
        />
      )}
    </div>
  )
}

function RotatingRole() {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2800)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <div className="hero-role" aria-label={ROLES.join(', ')}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[i]}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion()

  const wordAnim = (delay) => ({
    initial: reduce ? false : { y: '110%' },
    animate: ready ? { y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  })

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <header id="top" className="hero">
      <Topology ready={ready} />

      <div className="container hero-inner">
        <motion.div {...fade(0.1)}>
          <span className="hero-availability">
            <i /> Open to IT &amp; systems internships
          </span>
        </motion.div>

        <h1 className="hero-name">
          <span className="line">
            <motion.span className="word" {...wordAnim(0.2)}>Pratham</motion.span>
          </span>
          <span className="line">
            <motion.span className="word" {...wordAnim(0.32)}><em>Patel</em></motion.span>
          </span>
        </h1>

        <motion.div {...fade(0.55)}>
          <RotatingRole />
        </motion.div>

        <motion.p className="hero-copy" {...fade(0.65)}>
          A portfolio built around <strong>practical systems work</strong> — virtualization,
          networking labs, and infrastructure tools — on the path toward an IT systems internship.
        </motion.p>

        <motion.div className="hero-ctas" {...fade(0.78)}>
          <Magnetic href="#projects" className="btn btn-primary">
            Explore work <span className="arrow">→</span>
          </Magnetic>
          <Magnetic href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-ghost">
            View résumé
          </Magnetic>
          <Magnetic
            href="https://github.com/Pratham123650"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            GitHub
          </Magnetic>
        </motion.div>

        <motion.div className="hero-stats" {...fade(0.92)}>
          {STATS.map((s) => (
            <div className="hero-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span className="mono">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div className="hero-ctas" style={{ marginTop: '1.6rem', gap: '0.5rem' }} {...fade(1.02)}>
          {STACK.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </motion.div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="mono">Scroll</span>
        <i />
      </div>

      <motion.div className="hero-telemetry mono" aria-hidden="true" {...fade(1.5)}>
        <span>sys · online</span>
        <span>detroit, mi · 42.36°n / 83.07°w</span>
      </motion.div>
    </header>
  )
}
