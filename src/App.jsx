import { useEffect, useState } from 'react'
import { SystemProvider, useSystem } from './context/SystemContext.jsx'
import { PROJECTS } from './data/content.js'

import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Backdrop from './components/Backdrop.jsx'
import Spotlight from './components/Spotlight.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Bridge from './components/Bridge.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Homelab from './components/Homelab.jsx'
import Hardware from './components/Hardware.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Terminal from './components/Terminal.jsx'
import CaseStudy from './components/CaseStudy.jsx'
import Education from './components/Education.jsx'
import CurrentlyBuilding from './components/CurrentlyBuilding.jsx'
import Certifications from './components/Certifications.jsx'

/* The Digital Infrastructure Journey:
   BOOT → HERO (network entry) → USER PROFILE → SKILL NODES →
   PHYSICAL RACK → VIRTUALIZATION → PROJECT INSTANCES → SYSTEM LOG → CONNECT */
function Site() {
  const { ready, setReady } = useSystem()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />

      <Backdrop />
      <div className="grain" aria-hidden="true" />
      <Spotlight />
      <Cursor />

      <a className="skip-link" href="#about">Skip to content</a>

      <Nav />
      <Hero ready={ready} />
      <main>
        <Bridge variant="a" />
        <About />
        <Bridge variant="b" />
        <Experience />
        <Bridge variant="c" />
        <Projects />
        <Bridge variant="a" />
        <Skills />
        <Bridge variant="c" />
        <Homelab />
        <Hardware />
        <Bridge variant="b" />
        <Education />
        <Certifications />
        <CurrentlyBuilding />
        <Bridge variant="c" />
        <Contact />
      </main>
      <Footer />

      <Terminal />
    </>
  )
}

function PortfolioRouter() {
  const [hash, setHash] = useState(window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const match = hash.match(/^#\/projects\/([^?]+)(?:\?section=([^&]+))?/)
  const project = match ? PROJECTS.find((item) => item.id === decodeURIComponent(match[1])) : null

  useEffect(() => {
    if (project) return
    const title = 'Pratham Patel — IT & Systems Portfolio'
    const description = 'Information Technology student portfolio with documented systems administration, networking, virtualization, and infrastructure projects.'
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [project])

  if (project) {
    return <CaseStudy project={project} section={match?.[2] ? decodeURIComponent(match[2]) : null} />
  }

  return <Site />
}

export default function App() {
  return (
    <SystemProvider>
      <PortfolioRouter />
    </SystemProvider>
  )
}
