import { useEffect, useRef } from 'react'

const CHARS = '01PRATHAMPATELSYSADMINNETWORKPROXMOXLINUXDNSDHCPADAUTOMATIONJAVAPYTHON<>/=+*{}[]#'

export default function MatrixRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let columns, drops, fontSize = 16
    let width, height

    const setup = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      columns = Math.floor(width / fontSize)
      drops = Array(columns).fill(0).map(() => Math.floor(Math.random() * -100))
    }
    setup()

    let frame = 0
    let raf
    const draw = () => {
      frame++
      if (frame % 2 === 0) {
        ctx.fillStyle = 'rgba(5,6,13,0.045)'
        ctx.fillRect(0, 0, width, height)
        ctx.font = `600 ${fontSize}px JetBrains Mono, monospace`

        for (let i = 0; i < drops.length; i++) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)]
          const x = i * fontSize
          const y = drops[i] * fontSize

          const r = Math.random()
          if (r > 0.985) ctx.fillStyle = 'rgba(240,192,96,0.95)'
          else if (r > 0.94) ctx.fillStyle = 'rgba(139,92,246,0.9)'
          else ctx.fillStyle = 'rgba(110,231,255,0.75)'

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
