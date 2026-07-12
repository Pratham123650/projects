import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import Magnetic from './Magnetic.jsx'
import { PROFILE } from '../data/content.js'

const STATS = [
  { value: PROFILE.gpa, label: 'GPA · Wayne State' },
  { value: 'Dec 2027', label: 'Expected graduation' },
  { value: 'Michigan', label: 'Detroit metro' },
]

/* ------------------------------------------------------------------ */
/* Infrastructure environment — racks, routes, LEDs. Simulated depth   */
/* via layered parallax; the boot packet "lands" on the entry node.    */
/* ------------------------------------------------------------------ */

/* One rack drawn in hairlines. */
function Rack({ x, y, w = 96, h = 220, units = 6, seed = 0 }) {
  const slats = Array.from({ length: units }, (_, i) => y + 18 + i * ((h - 30) / units))
  return (
    <g className="hs-rack">
      <rect x={x} y={y} width={w} height={h} rx="5" />
      <line x1={x + 8} y1={y + 8} x2={x + 8} y2={y + h - 8} opacity="0.35" />
      <line x1={x + w - 8} y1={y + 8} x2={x + w - 8} y2={y + h - 8} opacity="0.35" />
      {slats.map((sy, i) => (
        <g key={i}>
          <rect x={x + 13} y={sy} width={w - 26} height={((h - 30) / units) - 7} rx="2" opacity="0.55" />
          <circle
            className="hs-led"
            cx={x + 22} cy={sy + 8} r="2"
            style={{ animationDelay: `${((seed + i) % 5) * 0.9}s` }}
          />
          <line x1={x + 32} y1={sy + 8} x2={x + w - 20} y2={sy + 8} opacity="0.2" />
        </g>
      ))}
    </g>
  )
}

const ROUTES = [
  'M 520 330 L 610 330 L 640 280 L 700 280',
  'M 520 330 L 600 380 L 700 380 L 730 420',
  'M 748 240 L 748 180 L 850 180 L 880 220',
  'M 700 480 L 640 520 L 520 520',
]

function InfraScene({ ready }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 40, damping: 20, mass: 0.8 })
  const sy = useSpring(py, { stiffness: 40, damping: 20, mass: 0.8 })
  const sx2 = useTransform(sx, (v) => v * 0.5)
  const sy2 = useTransform(sy, (v) => v * 0.5)

  useEffect(() => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return undefined
    const onMove = (e) => {
      px.set((e.clientX / window.innerWidth - 0.5) * -20)
      py.set((e.clientY / window.innerHeight - 0.5) * -13)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, px, py])

  return (
    <div className="hero-scene" aria-hidden="true" data-sv="ENTRY_NODE">
      {/* Depth layer 1 — racks (moves most) */}
      <motion.div className="hero-scene-layer" style={reduce ? undefined : { x: sx, y: sy }}>
        <svg viewBox="440 60 560 560" fill="none" className="hs-svg">
          <g className="hs-floor" opacity="0.3">
            {Array.from({ length: 7 }, (_, i) => (
              <line key={i} x1={440 + i * 90} y1="620" x2={620 + i * 62} y2="380" />
            ))}
            <line x1="440" y1="560" x2="1000" y2="560" />
            <line x1="470" y1="480" x2="1000" y2="480" />
          </g>
          <motion.g
            initial={reduce ? false : { opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Rack x={700} y={230} seed={0} />
            <Rack x={840} y={260} w={82} h={190} units={5} seed={2} />
            <Rack x={588} y={430} w={78} h={130} units={3} seed={4} />
          </motion.g>
        </svg>
      </motion.div>

      {/* Depth layer 2 — routes + entry node (moves less → depth) */}
      <motion.div className="hero-scene-layer" style={reduce ? undefined : { x: sx2, y: sy2 }}>
        <svg viewBox="440 60 560 560" fill="none" className="hs-svg">
          {ROUTES.map((d, i) => (
            <motion.path
              key={i}
              className="hs-route"
              d={d}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={ready ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.3, delay: 0.7 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          {!reduce && ROUTES.slice(0, 2).map((d, i) => (
            <path key={`s${i}`} className={`hs-stream${ready ? ' is-on' : ''}`} d={d} style={{ animationDelay: `${2 + i * 1.4}s` }} />
          ))}

          {/* Entry node — receives the boot packet's pulse. */}
          <motion.g
            initial={reduce ? false : { opacity: 0, scale: 0.4 }}
            animate={ready ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '520px 330px' }}
          >
            <circle cx="520" cy="330" r="26" className="hs-node-halo" />
            <circle cx="520" cy="330" r="5" className="hs-node-core" />
            {ready && !reduce && <circle cx="520" cy="330" r="10" className="hs-node-pulse" />}
          </motion.g>

          {/* The signature packet continues from the boot sequence. */}
          {ready && !reduce && (
            <circle
              className="hero-packet"
              r="4"
              style={{ offsetPath: `path('${ROUTES[0]}')` }}
            />
          )}
        </svg>
      </motion.div>
    </div>
  )
}

export default function Hero({ ready }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)

  /* Scroll slowly moves the camera toward the infrastructure. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -46])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 80])

  const fade = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  })

  const wordAnim = (delay) => ({
    initial: reduce ? false : { y: '110%' },
    animate: ready ? { y: 0 } : {},
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <header id="top" className="hero" ref={ref} data-module="MODULE_01 · ENTRY_NODE">
      <motion.div style={reduce ? undefined : { scale: sceneScale, y: sceneY }} className="hero-scene-wrap">
        <InfraScene ready={ready} />
      </motion.div>

      <motion.div
        className="container hero-inner"
        style={reduce ? undefined : { opacity: copyOpacity, y: copyY }}
      >
        <motion.div {...fade(0.1)}>
          <span className="hero-availability">
            <i /> Open to IT &amp; systems opportunities
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

        <motion.div className="hero-role mono" {...fade(0.5)}>
          <span className="hr-main">{PROFILE.title}</span>
          <span className="hr-sub">{PROFILE.tagline}</span>
        </motion.div>

        <motion.p className="hero-copy" {...fade(0.62)}>
          {PROFILE.intro}
        </motion.p>

        <motion.div className="hero-ctas" {...fade(0.76)}>
          <Magnetic href="#projects" className="btn btn-primary" data-cursor="open">
            Explore the system <span className="arrow">→</span>
          </Magnetic>
          <Magnetic href={PROFILE.resume} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor="open">
            View résumé
          </Magnetic>
          <Magnetic href={PROFILE.github} target="_blank" rel="noreferrer" className="btn btn-ghost" data-cursor="open">
            GitHub
          </Magnetic>
        </motion.div>

        <motion.div className="hero-stats" {...fade(0.9)}>
          {STATS.map((s) => (
            <div className="hero-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span className="mono">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="mono">Follow the packet</span>
        <i />
      </div>

      <motion.div className="hero-telemetry mono" aria-hidden="true" {...fade(1.4)}>
        <span>sys · online</span>
        <span>detroit, mi · 42.36°n / 83.07°w</span>
      </motion.div>
    </header>
  )
}
