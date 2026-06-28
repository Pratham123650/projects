import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CursorGlow.css'

// A reticle-style cursor: a core dot + an outer ring that expands/labels
// on interactive elements, plus a soft radial glow that follows behind.
export default function CursorGlow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    const label = labelRef.current

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    const glowPos = { ...pos }

    gsap.set([dot, ring, glow], { xPercent: -50, yPercent: -50 })

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.08, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', move)

    let raf
    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      glowPos.x += (pos.x - glowPos.x) * 0.08
      glowPos.y += (pos.y - glowPos.y) * 0.08
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
      gsap.set(glow, { x: glowPos.x, y: glowPos.y })
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onEnter = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (!t) return
      const text = t.getAttribute('data-cursor')
      gsap.to(ring, { scale: 2.1, borderColor: 'rgba(110,231,255,0.8)', duration: 0.3 })
      gsap.to(glow, { scale: 1.6, opacity: 0.9, duration: 0.3 })
      if (text && label) {
        label.textContent = text
        gsap.to(label, { opacity: 1, duration: 0.2 })
      }
    }
    const onLeave = (e) => {
      const t = e.target.closest('[data-cursor]')
      if (!t) return
      gsap.to(ring, { scale: 1, borderColor: 'rgba(110,231,255,0.45)', duration: 0.3 })
      gsap.to(glow, { scale: 1, opacity: 0.55, duration: 0.3 })
      if (label) gsap.to(label, { opacity: 0, duration: 0.15 })
    }

    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label mono" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
