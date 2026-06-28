import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import CursorGlow from './components/CursorGlow.jsx'
import MatrixRain from './components/MatrixRain.jsx'
import ParticleField from './components/ParticleField.jsx'
import BootSequence from './components/BootSequence.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import Resume from './components/Resume.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

import './styles/layout.css'

export default function App() {
  const [booted, setBooted] = useState(false)
  const parallaxRef = useRef(null)
  const orb1 = useRef(null)
  const orb2 = useRef(null)
  const orb3 = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const s = window.scrollY
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, { x: s * 0.06, y: s * 0.025, duration: 0.4, overwrite: true })
      }
      gsap.to(orb1.current, { y: s * 0.08, duration: 0.6, overwrite: true })
      gsap.to(orb2.current, { y: -s * 0.05, duration: 0.6, overwrite: true })
      gsap.to(orb3.current, { y: s * 0.1, duration: 0.6, overwrite: true })
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <BootSequence onDone={() => setBooted(true)} />

      <MatrixRain />
      <ParticleField />
      <div className="grid-bg" aria-hidden="true" />
      <div ref={orb1} className="orb orb-1" aria-hidden="true" />
      <div ref={orb2} className="orb orb-2" aria-hidden="true" />
      <div ref={orb3} className="orb orb-3" aria-hidden="true" />
      <div ref={parallaxRef} className="bg-parallax-text mono" aria-hidden="true">SYSTEMS</div>

      <CursorGlow />
      <ScrollProgress />

      <div className={`site ${booted ? 'is-booted' : ''}`}>
        <Nav />
        <Hero />
        <main>
          <Projects />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
