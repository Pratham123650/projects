import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Very subtle radial light that trails the cursor. Fixed element, translate3d only. */
export default function Spotlight() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    let tx = window.innerWidth / 2
    let ty = window.innerHeight / 3
    let cx = tx
    let cy = ty
    let raf

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }

    const loop = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  return <div ref={ref} className="spotlight" aria-hidden="true" />
}
