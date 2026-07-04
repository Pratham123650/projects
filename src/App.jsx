import { useState } from 'react'

import Preloader from './components/Preloader.jsx'
import Spotlight from './components/Spotlight.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Preloader onDone={() => setReady(true)} />

      <div className="aurora" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Spotlight />
      <ScrollProgress />

      <Nav />
      <Hero ready={ready} />
      <main>
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
