import { motion, useReducedMotion } from 'framer-motion'

/** Scroll-triggered reveal. Animates transform + opacity only. */
export default function Reveal({ children, delay = 0, y = 26, className, as = 'div', once = true }) {
  const reduce = useReducedMotion()
  const Tag = motion[as] || motion.div

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
