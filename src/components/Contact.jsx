import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { PROFILE, FORM_ENDPOINT } from '../data/content.js'

/*
 * Contact — establishing the final connection.
 * If FORM_ENDPOINT (Formspree) is configured the form posts there;
 * otherwise it falls back to mailto so the button always works.
 */

const CHANNELS = [
  {
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: PROFILE.githubLabel,
    href: PROFILE.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-3.2c0-.9-.2-1.6-.7-2.1 2.4-.3 4.9-1.2 4.9-5.4 0-1.2-.4-2.2-1.1-3 .1-.3.5-1.4-.1-2.9 0 0-.9-.3-3 1.1a10.4 10.4 0 0 0-5.5 0c-2.1-1.4-3-1.1-3-1.1-.6 1.5-.2 2.6-.1 2.9-.7.8-1.1 1.8-1.1 3 0 4.2 2.5 5.1 4.9 5.4-.4.4-.6 1-.7 1.7-.6.3-2.2.8-3.2-.9-.6-1-1.6-1.1-1.6-1.1" />
        <path d="M9 20.5c-4.5 1.4-4.5-2-6-2.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: PROFILE.linkedinLabel,
    href: PROFILE.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const reduce = useReducedMotion()

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    if (FORM_ENDPOINT) {
      setState('sending')
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        })
        setState(res.ok ? 'sent' : 'error')
      } catch {
        setState('error')
      }
      return
    }

    /* mailto fallback — always works, no backend required. */
    const name = data.get('name') || ''
    const from = data.get('email') || ''
    const message = data.get('message') || ''
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ''}`)
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`
    setState('sent')
  }

  return (
    <section id="contact" data-module="MODULE_08 · CONNECTION">
      <div className="container">
        <Reveal>
          <div className="card contact-panel" data-sv="CONNECTION_NODE">
            <div className="contact-info">
              <span className="section-eyebrow mono">Establish a new connection</span>
              <h2 className="contact-title">Ready to <em>connect?</em></h2>
              <p className="contact-sub">
                Open to internships, collaborations, and conversations about systems,
                networking, and infrastructure.
              </p>

              <div className="contact-channels">
                {CHANNELS.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="contact-channel"
                    data-cursor="open"
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <span className="ch-icon">{c.icon}</span>
                    <span>
                      <strong>{c.label}</strong>
                      <span>{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>

              {/* Final route: the packet reaches its destination. */}
              <svg className="contact-route" viewBox="0 0 220 40" aria-hidden="true">
                <path className="cr-path" d="M 6 20 H 150" />
                <circle className="cr-node" cx="160" cy="20" r="5" />
                <circle className="cr-node-halo" cx="160" cy="20" r="11" />
                {state === 'sent' && !reduce && <circle className="cr-packet" r="4" cy="20" />}
              </svg>
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="field">
                <label className="mono" htmlFor="cf-name">NAME</label>
                <input id="cf-name" name="name" autoComplete="name" required data-cursor="text" />
              </div>
              <div className="field">
                <label className="mono" htmlFor="cf-email">EMAIL</label>
                <input id="cf-email" name="email" type="email" autoComplete="email" required data-cursor="text" />
              </div>
              <div className="field">
                <label className="mono" htmlFor="cf-msg">MESSAGE</label>
                <textarea id="cf-msg" name="message" required data-cursor="text" />
              </div>

              <AnimatePresence mode="wait">
                {state === 'sent' ? (
                  <motion.p
                    key="ok"
                    className="form-success mono"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    role="status"
                  >
                    <i /> TRANSMISSION RECEIVED
                    {!FORM_ENDPOINT && <span className="fs-sub">Opening your mail app — thanks for reaching out.</span>}
                  </motion.p>
                ) : (
                  <motion.div key="btn" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    <Magnetic className="btn btn-primary form-submit" type="submit" data-cursor="open" disabled={state === 'sending'}>
                      {state === 'sending' ? 'Routing…' : 'Send transmission'} <span className="arrow">→</span>
                    </Magnetic>
                    {state === 'error' && (
                      <p className="form-error" role="alert">
                        Transmission failed — email me directly at{' '}
                        <a className="u-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
