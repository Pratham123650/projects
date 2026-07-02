import { useState } from 'react'

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

  return (
    <>
      <BootSequence onDone={() => setBooted(true)} />

      <MatrixRain />
      <ParticleField />
      <div className="grid-bg" aria-hidden="true" />
      <div className="bg-parallax-text mono" aria-hidden="true">SYSTEMS</div>

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
