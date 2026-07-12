import { useEffect, useRef, useState } from 'react'

/*
 * Context-aware custom cursor (desktop / fine pointers only).
 * The dot tracks the real pointer 1:1; the ring follows with a fast lerp
 * inside a single rAF loop. Labels come from [data-cursor] ancestors:
 *   view · connect · open · drag · explore · text (text = native caret)
 */
const LABELS = {
  view: 'VIEW',
  connect: 'CONNECT',
  open: 'OPEN',
  drag: 'DRAG',
  explore: 'EXPLORE',
}

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [mode, setMode] = useState('default')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return undefined
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    let tx = -100; let ty = -100
    let rx = -100; let ry = -100
    let raf

    const dot = () => dotRef.current
    const ring = () => ringRef.current

    const onMove = (e) => {
      tx = e.clientX; ty = e.clientY
      if (dot()) dot().style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    }

    const loop = () => {
      rx += (tx - rx) * 0.32
      ry += (ty - ry) * 0.32
      if (ring()) ring().style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    const onOver = (e) => {
      const el = e.target.closest?.('[data-cursor], a, button, input, textarea, select')
      if (!el) { setMode('default'); return }
      const kind = el.dataset?.cursor
      if (kind === 'text' || el.matches('input, textarea, select')) setMode('text')
      else if (kind && LABELS[kind]) setMode(kind)
      else setMode('hover')
    }
    const onOut = () => setMode('default')
    const onLeave = () => { tx = -100; ty = -100 }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('cursor-text', mode === 'text')
  }, [mode])

  if (!enabled) return null

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={dotRef} className={`cursor-dot${mode === 'text' ? ' is-hidden' : ''}`} />
      <div ref={ringRef} className={`cursor-ring is-${mode}`}>
        {LABELS[mode] && <span className="cursor-label">{LABELS[mode]}</span>}
      </div>
    </div>
  )
}
