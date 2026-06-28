import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  '> initializing portfolio.sys ...',
  '> mounting /resume /projects /contact ...',
  '> loading identity: PRATHAM_PATEL.profile',
  '> status: ONLINE',
]

export default function BootSequence({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (shown < LINES.length) {
      const t = setTimeout(() => setShown((s) => s + 1), 320)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, 550)
    return () => clearTimeout(t)
  }, [shown, onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="boot-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          <div className="boot-box mono">
            {LINES.slice(0, shown).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {line}
              </motion.p>
            ))}
            <span className="boot-cursor">▋</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
