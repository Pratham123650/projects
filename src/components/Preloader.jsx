import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { BOOT_LINES, PROFILE } from '../data/content.js'

/*
 * Cinematic boot: system messages type in while the signature packet
 * travels a minimal network pathway, activating nodes as it passes.
 * Plays once per browser session; SKIP is always available.
 */

/* The packet's route — nodes sit on this path. */
const PATH = 'M 20 62 L 150 62 L 210 26 L 330 26 L 396 96 L 508 96 L 580 62'
const NODES = [
  [20, 62], [150, 62], [210, 26], [330, 26], [396, 96], [508, 96], [580, 62],
]
/* Node activation times, matched to constant packet speed along the path. */
const TRAVEL = 2.0
const DELAYS = [0, 0.35, 0.55, 0.88, 1.15, 1.5, 1.85]

export default function Preloader({ onDone }) {
  const reduce = useReducedMotion()
  const [skipped] = useState(() => {
    try { return sessionStorage.getItem('pp-booted') === '1' } catch { return false }
  })
  const [visible, setVisible] = useState(!skipped)
  const [lines, setLines] = useState(0)
  const [connected, setConnected] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const doneRef = useRef(false)

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    try { sessionStorage.setItem('pp-booted', '1') } catch { /* private mode */ }
    setLeaving(true)
    onDone()
    setTimeout(() => setVisible(false), 700)
  }

  useEffect(() => {
    if (skipped) { doneRef.current = true; onDone(); return undefined }

    if (reduce) {
      setLines(BOOT_LINES.length)
      setConnected(true)
      const t = setTimeout(finish, 900)
      return () => clearTimeout(t)
    }

    const timers = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLines(i + 1), 200 + i * 320))
    })
    timers.push(setTimeout(() => setConnected(true), 2150))
    timers.push(setTimeout(finish, 2850))
    return () => timers.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div className={`boot${leaving ? ' boot-out' : ''}`} role="status" aria-label="Loading">
      <div className="boot-inner">
        <div className="boot-lines mono" aria-hidden="true">
          {BOOT_LINES.slice(0, lines).map((l, i) => (
            <span key={l} className="boot-line" style={{ '--d': `${i * 0.04}s` }}>
              <i>▸</i> {l}
            </span>
          ))}
        </div>

        <svg className="boot-net" viewBox="0 0 600 122" fill="none" aria-hidden="true">
          <path className="boot-path" d={PATH} />
          <path className={`boot-path-lit${connected ? ' is-done' : ''}`} d={PATH} />
          {NODES.map(([x, y], i) => (
            <circle
              key={i}
              className="boot-node"
              cx={x} cy={y} r="4"
              style={{ animationDelay: `${DELAYS[i]}s` }}
            />
          ))}
          {/* Destination node pulse — this pulse hands off into the hero. */}
          {connected && <circle className="boot-pulse" cx="580" cy="62" r="6" />}
          {!reduce && (
            <circle className="boot-packet" r="4" style={{ '--travel': `${TRAVEL}s`, offsetPath: `path('${PATH}')` }} />
          )}
        </svg>

        <div className={`boot-connected mono${connected ? ' is-on' : ''}`}>
          CONNECTED: {PROFILE.domain}
        </div>
      </div>

      <button className="boot-skip mono" onClick={finish}>
        SKIP ↵
      </button>
    </div>
  )
}
