import { useEffect, useRef } from 'react'

const CHARS = '01PRATHAMPATELSYSADMINNETWORKPROXMOXLINUXDNSDHCPADAUTOMATIONJAVAPYTHON<>/=+*{}[]#'

export default function MatrixRain() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let columns, drops, fontSize = 22
    let width, height, dpr
    let lastFrame = 0

    const setup = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.25)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.floor(width / fontSize)
      drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -100))
    }
    setup()

    let raf
    const draw = (now = 0) => {
      if (document.hidden) {
        raf = requestAnimationFrame(draw)
        return
      }
      if (now - lastFrame > 90) {
        lastFrame = now
        ctx.fillStyle = 'rgba(8,10,12,0.075)'
        ctx.fillRect(0, 0, width, height)
        ctx.font = `600 ${fontSize}px JetBrains Mono, monospace`

        for (let i = 0; i < drops.length; i++) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)]
          const x = i * fontSize
          const y = drops[i] * fontSize

          const r = Math.random()
          if (r > 0.985) ctx.fillStyle = 'rgba(220,157,87,0.75)'
          else if (r > 0.94) ctx.fillStyle = 'rgba(147,169,152,0.58)'
          else ctx.fillStyle = 'rgba(91,207,187,0.46)'

          ctx.fillText(char, x, y)

          if (y > height && Math.random() > 0.975) drops[i] = Math.floor(Math.random() * -40)
          drops[i]++
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    const onResize = () => setup()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={ref} className="matrix-rain" aria-hidden="true" />
}
