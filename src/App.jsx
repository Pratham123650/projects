import { SystemProvider, useSystem } from './context/SystemContext.jsx'

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
        <Skills />
        <Bridge variant="c" />
        <Homelab />
        <Hardware />
        <Bridge variant="b" />
        <Projects />
        <Bridge variant="a" />
        <Experience />
        <Bridge variant="c" />
        <Contact />
      </main>
      <Footer />

      <Terminal />
    </>
  )
}

export default function App() {
  return (
    <SystemProvider>
      <Site />
    </SystemProvider>
  )
}
