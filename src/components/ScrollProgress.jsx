import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100
      if (ref.current) ref.current.style.width = pct + '%'
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div ref={ref} className="scroll-progress-bar" />
    </div>
  )
}
