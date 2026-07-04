import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'

/**
 * The ambient environment behind the whole site.
 * Every layer is fixed and animates transform/opacity only:
 *  - blueprint grid drifting at parallax speed
 *  - two aurora light fields moving at different scroll speeds
 *  - a dusk-blue light that gradually takes over as you scroll (color story)
 *  - a sparse field of depth specks (CSS-animated, desktop only)
 */
export default function Backdrop() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.4 })

  const gridY = useTransform(p, [0, 1], ['0%', '-6%'])
  const warmY = useTransform(p, [0, 1], ['0%', '-18%'])
  const coolY = useTransform(p, [0, 1], ['0%', '14%'])
  const warmOpacity = useTransform(p, [0, 0.55, 1], [0.55, 0.3, 0.15])
  const duskOpacity = useTransform(p, [0, 0.45, 1], [0, 0.2, 0.5])

  if (reduce) {
    return (
      <div className="backdrop" aria-hidden="true">
        <div className="bd-grid" />
        <div className="bd-warm" style={{ opacity: 0.4 }} />
      </div>
    )
  }

  return (
    <div className="backdrop" aria-hidden="true">
      <motion.div className="bd-grid" style={{ y: gridY }} />
      <motion.div className="bd-warm" style={{ y: warmY, opacity: warmOpacity }} />
      <motion.div className="bd-cool" style={{ y: coolY }} />
      <motion.div className="bd-dusk" style={{ opacity: duskOpacity }} />
      <div className="bd-specks">
        {Array.from({ length: 18 }, (_, i) => (
          <i
            key={i}
            style={{
              '--i': i,
              top: `${(i * 53) % 97}%`,
              left: `${(i * 37) % 101}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
