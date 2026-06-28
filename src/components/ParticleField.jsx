import { useEffect, useRef } from 'react'

// Floating "data node" particles with faint connecting lines — a subtle
// circuit-board feel that drifts and reacts a little to the pointer.
export default function ParticleField() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let width, height, dpr, particles
    let lastFrame = 0
    const mouse = { x: -9999, y: -9999 }

    const count = () => Math.min(34, Math.floor((window.innerWidth * window.innerHeight) / 42000))

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.35)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: count() }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.6,
      }))
    }
    setup()

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    window.addEventListener('mousemove', onMove)

    let raf
    const draw = (now = 0) => {
      if (document.hidden) {
        raf = requestAnimationFrame(draw)
        return
      }
      if (now - lastFrame < 50) {
        raf = requestAnimationFrame(draw)
        return
      }
      lastFrame = now
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < 110 * 110) {
          p.x -= dx * 0.0014
          p.y -= dy * 0.0014
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          const limit = 105
          if (d2 < limit * limit) {
            ctx.strokeStyle = `rgba(91,207,187,${0.08 * (1 - d2 / (limit * limit))})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = 'rgba(176,220,204,0.55)'
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => setup()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="particle-field" aria-hidden="true" />
}
