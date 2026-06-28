import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CursorGlow.css'

// A soft lens cursor: precise core, trailing aura, and contextual labels.
export default function CursorGlow() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const auraRef = useRef(null)
  const glowRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return

    const dot = dotRef.current
    const ring = ringRef.current
    const aura = auraRef.current
    const glow = glowRef.current
    const label = labelRef.current
    if (!dot || !ring || !aura || !glow || !label) return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    const auraPos = { ...pos }
    const glowPos = { ...pos }

    gsap.set([dot, ring, aura, glow], { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y })
    gsap.set(label, { opacity: 0, y: 22 })

    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      gsap.to(dot, { x: pos.x, y: pos.y, duration: 0.08, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', move)

    let raf
    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.2
      ringPos.y += (pos.y - ringPos.y) * 0.2
      auraPos.x += (pos.x - auraPos.x) * 0.12
      auraPos.y += (pos.y - auraPos.y) * 0.12
      glowPos.x += (pos.x - glowPos.x) * 0.055
      glowPos.y += (pos.y - glowPos.y) * 0.055
      gsap.set(ring, { x: ringPos.x, y: ringPos.y })
      gsap.set(aura, { x: auraPos.x, y: auraPos.y })
      gsap.set(glow, { x: glowPos.x, y: glowPos.y })
      raf = requestAnimationFrame(tick)
    }
    tick()

    let activeTarget = null
    const onEnter = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      if (!target || target === activeTarget) return
      activeTarget = target
      const text = target.getAttribute('data-cursor') || 'open'
      label.textContent = text
      ring.classList.add('is-active')
      aura.classList.add('is-active')
      gsap.to(dot, { scale: 0.48, opacity: 0.8, duration: 0.24, ease: 'power2.out' })
      gsap.to(ring, { scale: 1.72, rotate: 45, duration: 0.32, ease: 'power3.out' })
      gsap.to(aura, { scale: 1.12, opacity: 0.9, duration: 0.32, ease: 'power3.out' })
      gsap.to(glow, { scale: 1.22, opacity: 0.72, duration: 0.36, ease: 'power2.out' })
      gsap.to(label, { opacity: 1, y: 30, duration: 0.22, ease: 'power2.out' })
    }
    const onLeave = (e) => {
      const target = e.target.closest('a, button, [data-cursor]')
      if (!target || !activeTarget) return
      if (target.contains(e.relatedTarget)) return
      activeTarget = null
      ring.classList.remove('is-active')
      aura.classList.remove('is-active')
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.24, ease: 'power2.out' })
      gsap.to(ring, { scale: 1, rotate: 0, duration: 0.34, ease: 'power3.out' })
      gsap.to(aura, { scale: 1, opacity: 0.42, duration: 0.3, ease: 'power2.out' })
      gsap.to(glow, { scale: 1, opacity: 0.4, duration: 0.34, ease: 'power2.out' })
      gsap.to(label, { opacity: 0, y: 22, duration: 0.16, ease: 'power2.out' })
    }
    const onDown = () => {
      gsap.fromTo(ring, { scale: 0.88 }, { scale: activeTarget ? 1.72 : 1, duration: 0.35, ease: 'elastic.out(1, 0.45)' })
    }

    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    window.addEventListener('mousedown', onDown)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      window.removeEventListener('mousedown', onDown)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={glowRef} className="cursor-glow" />
      <div ref={auraRef} className="cursor-aura" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label mono" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}
