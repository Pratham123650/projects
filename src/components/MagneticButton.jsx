import { useRef } from 'react'
import gsap from 'gsap'

export default function MagneticButton({ as: Tag = 'a', className = '', children, strength = 0.4, ...rest }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    gsap.to(el, { x, y, duration: 0.35, ease: 'power3.out' })
  }
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
  }
  const onClick = (e) => {
    const el = ref.current
    const r = el.getBoundingClientRect()
    const ripple = document.createElement('span')
    ripple.className = 'ripple'
    ripple.style.left = (e.clientX - r.left) + 'px'
    ripple.style.top = (e.clientY - r.top) + 'px'
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 650)
  }

  return (
    <Tag
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor="open"
      {...rest}
    >
      {children}
    </Tag>
  )
}
