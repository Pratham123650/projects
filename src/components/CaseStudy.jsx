import { useEffect } from 'react'
import Reveal from './Reveal.jsx'
import ArchitectureDiagram from './ArchitectureDiagram.jsx'
import EvidenceGallery from './EvidenceGallery.jsx'
import { PROFILE } from '../data/content.js'

const ExternalIcon = () => (
  <svg className="inline-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 5h5v5M19 5l-8 8M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
  </svg>
)

function updateMeta(project) {
  const title = `${project.title} Case Study — ${PROFILE.name}`
  const description = `${project.overview} Read the implementation, architecture, challenges, lessons, and technical evidence.`
  document.title = title

  const pairs = [
    ['meta[name="description"]', 'content', description],
    ['meta[property="og:title"]', 'content', title],
    ['meta[property="og:description"]', 'content', description],
    ['meta[name="twitter:title"]', 'content', title],
    ['meta[name="twitter:description"]', 'content', description],
  ]
  pairs.forEach(([selector, attribute, value]) => {
    const element = document.querySelector(selector)
    if (element) element.setAttribute(attribute, value)
  })
}

function CaseSection({ id, label, title, children }) {
  return (
    <section id={id} className="case-section">
      <Reveal>
        <span className="section-eyebrow mono">{label}</span>
        <h2 className="case-section-title">{title}</h2>
        {children}
      </Reveal>
    </section>
  )
}

function TechnicalList({ items }) {
  return (
    <ul className="case-list">
      {items.map((item) => (
        <li className={/pending/i.test(item) ? 'is-pending' : undefined} key={item}>
          <span className="mono case-caret">▸</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function ArchitecturePlaceholder({ project }) {
  return (
    <div className="case-placeholder card">
      <span className="mono">ARCHITECTURE_RECORD // PENDING</span>
      <h3>{project.title}</h3>
      <p>
        Add a verified component map or workflow here. Label only systems that were
        actually used, and remove hostnames, addresses, credentials, and internal identifiers.
      </p>
    </div>
  )
}

export default function CaseStudy({ project, section }) {
  useEffect(() => {
    updateMeta(project)
    window.scrollTo(0, 0)
    if (section) {
      const scrollToSection = () => document.getElementById(section)?.scrollIntoView({ block: 'start' })
      window.requestAnimationFrame(scrollToSection)
      const settleTimer = window.setTimeout(scrollToSection, 350)
      const loadTimer = window.setTimeout(scrollToSection, 1200)
      return () => {
        window.clearTimeout(settleTimer)
        window.clearTimeout(loadTimer)
      }
    }
    return undefined
  }, [project, section])

  return (
    <>
      <a className="skip-link" href="#case-content">Skip to case study</a>
      <header className="case-nav" aria-label="Case study navigation">
        <a className="brand" href={`#/projects/${project.id}`} data-cursor="open">PP<em>_</em></a>
        <a className="case-back mono" href="#projects" data-cursor="open">← BACK TO PROJECTS</a>
      </header>

      <main id="case-content" className="case-main">
        <header className="case-hero" id="top" data-module="CASE_STUDY · TECHNICAL_RECORD">
          <div className="container case-hero-inner">
            <div className="case-breadcrumb mono">PROJECTS / {project.category.toUpperCase()} / {project.instance}</div>
            <div className="case-hero-grid">
              <div>
                <span className="case-state mono"><i /> DOCUMENTED BUILD</span>
                <h1>{project.title}</h1>
                <p>{project.overview}</p>
                <div className="case-actions">
                  {project.id === 'homelab' && (
                    <a className="btn btn-primary" href={`#/projects/${project.id}?section=architecture`} data-cursor="open">View architecture <span className="arrow">↓</span></a>
                  )}
                  {project.links.slice(0, 2).map((link) => (
                    <a className="btn btn-ghost" href={link.href} target="_blank" rel="noreferrer" data-cursor="open" key={link.href}>
                      {link.label} <ExternalIcon />
                    </a>
                  ))}
                </div>
              </div>
              <aside className="case-summary card" aria-label="Case study summary">
                <div><span className="mono">INSTANCE</span><strong>{project.instance}</strong></div>
                <div><span className="mono">CATEGORY</span><strong>{project.category}</strong></div>
                <div><span className="mono">EVIDENCE</span><strong>{project.evidence.length} slots ready</strong></div>
                <div><span className="mono">STATUS</span><strong>Ongoing documentation</strong></div>
              </aside>
            </div>
          </div>
        </header>

        <div className="container case-content-grid">
          <aside className="case-index" aria-label="On this page">
            <span className="mono">ON THIS PAGE</span>
            <a href={`#/projects/${project.id}?section=overview`}>Overview</a>
            <a href={`#/projects/${project.id}?section=goal`}>Problem / Goal</a>
            <a href={`#/projects/${project.id}?section=technologies`}>Technologies Used</a>
            <a href={`#/projects/${project.id}?section=architecture`}>Architecture</a>
            <a href={`#/projects/${project.id}?section=implementation`}>Implementation</a>
            <a href={`#/projects/${project.id}?section=challenges`}>Challenges</a>
            <a href={`#/projects/${project.id}?section=troubleshooting`}>Troubleshooting / Solutions</a>
            <a href={`#/projects/${project.id}?section=lessons`}>What I Learned</a>
            <a href={`#/projects/${project.id}?section=evidence`}>Screenshots / Evidence</a>
          </aside>

          <div className="case-document">
            <CaseSection id="overview" label="01 // OVERVIEW" title="Overview">
              <p className="case-lede">{project.overview}</p>
            </CaseSection>

            <CaseSection id="goal" label="02 // PROBLEM_GOAL" title="Problem / Goal">
              <p>{project.goal}</p>
            </CaseSection>

            <CaseSection id="technologies" label="03 // STACK" title="Technologies Used">
              <div className="case-tech-grid">
                {project.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}
              </div>
            </CaseSection>

            <CaseSection id="architecture" label="04 // TOPOLOGY" title="Architecture">
              {project.id === 'homelab' ? <ArchitectureDiagram /> : <ArchitecturePlaceholder project={project} />}
            </CaseSection>

            <CaseSection id="implementation" label="05 // BUILD_LOG" title="Implementation">
              <TechnicalList items={project.implementation} />
            </CaseSection>

            <CaseSection id="challenges" label="06 // CONSTRAINTS" title="Challenges">
              <TechnicalList items={project.challenges} />
            </CaseSection>

            <CaseSection id="troubleshooting" label="07 // INCIDENT_NOTES" title="Troubleshooting / Solutions">
              <TechnicalList items={project.solutions} />
            </CaseSection>

            <CaseSection id="lessons" label="08 // RETROSPECTIVE" title="What I Learned">
              <TechnicalList items={project.lessons} />
            </CaseSection>

            <CaseSection id="evidence" label="09 // ATTACHMENTS" title="Screenshots / Evidence">
              <p className="case-evidence-note">
                Evidence slots are ready for sanitized screenshots. Each item includes the exact
                context to document before it is published.
              </p>
              <EvidenceGallery items={project.evidence} projectTitle={project.title} />
            </CaseSection>

            <div className="case-end card">
              <span className="mono">END_OF_RECORD</span>
              <h2>Continue through the system.</h2>
              <div>
                <a className="btn btn-primary" href="#projects">View all projects</a>
                <a className="u-link" href={`mailto:${PROFILE.email}`}>Contact Pratham</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
