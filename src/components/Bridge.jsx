import { useRef } from 'react'
import { useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'

/*
 * Section bridge — the recurring packet travels this path as the visitor
 * scrolls between major sections, stitching the journey together.
 * Position is scroll-scrubbed via getPointAtLength (reversible).
 */
const VARIANTS = {
  a: 'M 50 0 C 50 60, 78 90, 78 120 C 78 150, 50 180, 50 240',
  b: 'M 50 0 C 50 60, 22 90, 22 120 C 22 150, 50 180, 50 240',
  c: 'M 50 0 L 50 240',
}

export default function Bridge({ variant = 'c' }) {
  const wrapRef = useRef(null)
  const pathRef = useRef(null)
  const litRef = useRef(null)
  const packetRef = useRef(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start 0.92', 'end 0.35'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const path = pathRef.current
    const packet = packetRef.current
    const lit = litRef.current
    if (!path || !packet || reduce) return
    const len = path.getTotalLength()
    const pt = path.getPointAtLength(p * len)
    packet.setAttribute('cx', pt.x)
    packet.setAttribute('cy', pt.y)
    packet.style.opacity = p > 0.02 && p < 0.98 ? 1 : 0
    if (lit) {
      lit.style.strokeDasharray = len
      lit.style.strokeDashoffset = len * (1 - p)
    }
  })

  return (
    <div ref={wrapRef} className="bridge" aria-hidden="true" data-sv="NETWORK_PATH">
      <svg viewBox="0 0 100 240" preserveAspectRatio="xMidYMid meet">
        <path ref={pathRef} className="bridge-path" d={VARIANTS[variant]} />
        {!reduce && <path ref={litRef} className="bridge-lit" d={VARIANTS[variant]} />}
        {!reduce && <circle ref={packetRef} className="bridge-packet" r="3.4" cx="50" cy="0" style={{ opacity: 0 }} />}
      </svg>
    </div>
  )
}
