import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useSystem } from '../context/SystemContext.jsx'
import { PROFILE, SKILL_CATEGORIES, PROJECTS, EXPERIENCE } from '../data/content.js'

/*
 * A real interactive terminal (optional Easter egg — never required for
 * navigation). Real input, command history, tab-completion.
 */

const COMMANDS = ['help', 'about', 'skills', 'projects', 'experience', 'homelab', 'contact', 'clear']

const PROMPT = 'pratham@portfolio:~$'

function runCommand(raw, { scrollTo }) {
  const cmd = raw.trim().toLowerCase()
  switch (cmd) {
    case 'help':
      return [
        'Available commands:',
        '  help        show this list',
        '  about       short profile summary',
        '  skills      major skill categories',
        '  projects    list real projects',
        '  experience  professional experience',
        '  homelab     jump to the server rack',
        '  contact     contact options',
        '  clear       clear terminal output',
      ]
    case 'about':
      return [
        `${PROFILE.name} — ${PROFILE.role}`,
        `${PROFILE.school} · ${PROFILE.degree} (minor: ${PROFILE.minor})`,
        `GPA ${PROFILE.gpa} · graduating ${PROFILE.graduation}`,
        `Focus: systems, networking, virtualization, homelab infrastructure.`,
      ]
    case 'skills':
      return SKILL_CATEGORIES.map((c) => `  ${c.label.padEnd(14)} ${c.tech.join(', ')}`)
    case 'projects':
      return [
        ...PROJECTS.map((p, i) => `  [${i + 1}] ${p.title} — ${p.tags.join(', ')}`),
        '',
        `Repos: ${PROFILE.githubLabel}`,
      ]
    case 'experience':
      return EXPERIENCE.map((e) => `  ${e.log} ${e.position} @ ${e.company} [${e.status}]`)
    case 'homelab':
      scrollTo('homelab')
      return ['Connecting to RACK_01 … done. Scrolling to the homelab.']
    case 'contact':
      scrollTo('contact')
      return [
        `  email     ${PROFILE.email}`,
        `  github    ${PROFILE.githubLabel}`,
        `  linkedin  ${PROFILE.linkedinLabel}`,
      ]
    case '':
      return []
    default:
      return ['Command not found. Type "help" to view available commands.']
  }
}

export default function Terminal() {
  const { termOpen, setTermOpen } = useSystem()
  const reduce = useReducedMotion()
  const [lines, setLines] = useState([
    { t: 'cmd', text: 'explore' },
    { t: 'out', text: 'Welcome to the portfolio shell. Type "help" to view available commands.' },
  ])
  const [value, setValue] = useState('')
  const [cmdHist, setCmdHist] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    if (termOpen) setTimeout(() => inputRef.current?.focus(), 60)
  }, [termOpen])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, termOpen])

  useEffect(() => {
    if (!termOpen) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setTermOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [termOpen, setTermOpen])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  const submit = () => {
    const raw = value
    const out = runCommand(raw, { scrollTo })
    if (raw.trim().toLowerCase() === 'clear') {
      setLines([])
    } else {
      setLines((l) => [
        ...l,
        { t: 'cmd', text: raw },
        ...out.map((text) => ({ t: 'out', text })),
      ])
    }
    if (raw.trim()) setCmdHist((h) => [raw, ...h])
    setHistIdx(-1)
    setValue('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); submit() }
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, cmdHist.length - 1)
      if (cmdHist[next] !== undefined) { setHistIdx(next); setValue(cmdHist[next]) }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      if (next < 0) { setHistIdx(-1); setValue('') }
      else { setHistIdx(next); setValue(cmdHist[next]) }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = COMMANDS.find((c) => c.startsWith(value.toLowerCase()) && value)
      if (match) setValue(match)
    }
  }

  return (
    <AnimatePresence>
      {termOpen && (
        <motion.div
          className="term"
          role="dialog"
          aria-label="Interactive terminal"
          initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="mono term-title">pratham@portfolio — shell</span>
            <button className="term-close" onClick={() => setTermOpen(false)} aria-label="Close terminal">×</button>
          </div>

          <div
            className="term-body"
            ref={bodyRef}
            data-cursor="text"
            onClick={() => inputRef.current?.focus()}
            aria-live="polite"
          >
            {lines.map((l, i) => (
              <div key={i} className={`term-line term-${l.t}`}>
                {l.t === 'cmd' && <span className="term-prompt">{PROMPT} </span>}
                {l.text}
              </div>
            ))}
            <div className="term-line term-input-row">
              <span className="term-prompt">{PROMPT} </span>
              <input
                ref={inputRef}
                className="term-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck="false"
                autoCapitalize="none"
                autoComplete="off"
                aria-label="Terminal command input"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
