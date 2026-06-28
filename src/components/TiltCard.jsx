import { useRef } from 'react'
import gsap from 'gsap'

export default function TiltCard({ className = '', children, tiltAmount = 8, glow = true, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * tiltAmount
    const ry = (px - 0.5) * tiltAmount

    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.4,
      ease: 'power2.out',
    })

    if (glow) {
      el.style.setProperty('--mx', `${px * 100}%`)
      el.style.setProperty('--my', `${py * 100}%`)
    }
  }

  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
  }

  const onClick = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'ripple ripple-card'
    ripple.style.left = (e.clientX - r.left) + 'px'
    ripple.style.top = (e.clientY - r.top) + 'px'
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
  }

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      {...rest}
    >
      <div className="tilt-card-inner">{children}</div>
    </div>
  )
}
