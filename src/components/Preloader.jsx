import { useEffect, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion'

const BOOT_LINES = [
  'Initializing portfolio',
  'Loading projects',
  'Calibrating interface',
  'Rendering experience',
]

const LINE_STEP = 0.42 // seconds between status lines
const TOTAL = 2.7 // total boot time before lift-off

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true)
  const reduce = useReducedMotion()

  /* Live progress counter — motion value renders without re-rendering the tree. */
  const progress = useMotionValue(0)
  const rounded = useTransform(progress, (v) => `${Math.round(v)}%`)

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => { setVisible(false); onDone?.() }, 150)
      return () => clearTimeout(t)
    }
    const controls = animate(progress, 100, { duration: TOTAL - 0.4, ease: [0.3, 0.6, 0.3, 1] })
    const t = setTimeout(() => { setVisible(false); onDone?.() }, TOTAL * 1000)
    return () => { controls.stop(); clearTimeout(t) }
  }, [onDone, progress, reduce])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, y: reduce ? 0 : '-4%', scale: reduce ? 1 : 1.015 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {/* HUD frame corners */}
          <div className="boot-frame">
            {['tl', 'tr', 'bl', 'br'].map((c, i) => (
              <motion.span
                key={c}
                className={`boot-corner boot-corner--${c}`}
                initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>

          <div className="boot-core">
            <div className="preloader-word">
              <motion.span
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                Pratham&nbsp;<em>Patel</em>
              </motion.span>
            </div>

            <div className="boot-lines">
              {BOOT_LINES.map((line, i) => (
                <motion.div
                  className="boot-line mono"
                  key={line}
                  initial={reduce ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * LINE_STEP }}
                >
                  <span className="boot-tick">▸</span>
                  {line}
                  <motion.span
                    className="boot-ok"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * LINE_STEP + 0.3 }}
                  >
                    ok
                  </motion.span>
                </motion.div>
              ))}
            </div>

            <div className="boot-progress">
              <div className="preloader-line">
                <motion.i
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: TOTAL - 0.4, delay: 0.3, ease: [0.3, 0.6, 0.3, 1] }}
                />
              </div>
              <motion.span className="boot-counter mono">{rounded}</motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
