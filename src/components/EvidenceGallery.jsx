import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function EvidenceGallery({ items, projectTitle }) {
  const [active, setActive] = useState(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!active) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [active])

  return (
    <>
      <div className="evidence-grid">
        {items.map((item, index) => (
          <article className="evidence-card" key={item.id}>
            <button
              type="button"
              className="evidence-preview"
              onClick={() => setActive(item)}
              aria-label={`Open evidence item: ${item.title}`}
              data-cursor="view"
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.alt || `${item.title} for ${projectTitle}`}
                  loading="lazy"
                  width="1280"
                  height="720"
                />
              ) : (
                <span className="evidence-placeholder" aria-hidden="true">
                  <span className="mono">EVIDENCE_SLOT_{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.title}</strong>
                  <span>Sanitized screenshot pending</span>
                </span>
              )}
              <span className="evidence-expand mono">OPEN FULL SCREEN</span>
            </button>
            <div className="evidence-copy">
              <span className="tag">{item.technology}</span>
              <h3>{item.caption}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} evidence viewer`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActive(null)
            }}
          >
            <motion.div
              className="lightbox-panel"
              initial={reduce ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 10, scale: 0.99 }}
            >
              <div className="lightbox-bar mono">
                <span>{active.title}</span>
                <button type="button" onClick={() => setActive(null)} autoFocus aria-label="Close evidence viewer">CLOSE ×</button>
              </div>
              <div className="lightbox-media">
                {active.src ? (
                  <img src={active.src} alt={active.alt || `${active.title} for ${projectTitle}`} />
                ) : (
                  <div className="evidence-placeholder evidence-placeholder-large">
                    <span className="mono">SCREENSHOT PENDING</span>
                    <strong>{active.title}</strong>
                    <span>Add a sanitized image through the project data.</span>
                  </div>
                )}
              </div>
              <div className="lightbox-caption">
                <span className="tag">{active.technology}</span>
                <strong>{active.caption}</strong>
                <p>{active.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
