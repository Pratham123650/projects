import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'

const EMAIL = 'prathampatel102403@gmail.com'

const CHANNELS = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/Pratham123650',
    href: 'https://github.com/Pratham123650',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-3.2c0-.9-.2-1.6-.7-2.1 2.4-.3 4.9-1.2 4.9-5.4 0-1.2-.4-2.2-1.1-3 .1-.3.5-1.4-.1-2.9 0 0-.9-.3-3 1.1a10.4 10.4 0 0 0-5.5 0c-2.1-1.4-3-1.1-3-1.1-.6 1.5-.2 2.6-.1 2.9-.7.8-1.1 1.8-1.1 3 0 4.2 2.5 5.1 4.9 5.4-.4.4-.6 1-.7 1.7-.6.3-2.2.8-3.2-.9-.6-1-1.6-1.1-1.6-1.1" />
        <path d="M9 20.5c-4.5 1.4-4.5-2-6-2.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/prathampatelit',
    href: 'https://www.linkedin.com/in/prathampatelit/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 11v5M8 8v.01M12 16v-5M16 16v-3a2 2 0 0 0-4 0" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') || ''
    const from = data.get('email') || ''
    const message = data.get('message') || ''
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ''}`)
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact">
      <div className="container">
        <Reveal>
          <div className="card contact-panel">
            <div className="contact-info">
              <span className="section-eyebrow mono">Reach out</span>
              <h2 className="contact-title">
                Let&apos;s build something <em>reliable</em>.
              </h2>
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
            </div>

            <form className="contact-form" onSubmit={onSubmit}>
              <div className="field">
                <input name="name" placeholder="Your name" autoComplete="name" required aria-label="Your name" />
              </div>
              <div className="field">
                <input name="email" type="email" placeholder="Your email" autoComplete="email" required aria-label="Your email" />
              </div>
              <div className="field">
                <textarea name="message" placeholder="What would you like to talk about?" required aria-label="Message" />
              </div>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.p
                    key="ok"
                    className="form-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    role="status"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <motion.path
                        d="M4 12.5 9.5 18 20 6.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                      />
                    </svg>
                    Opening your mail app — thanks for reaching out.
                  </motion.p>
                ) : (
                  <motion.div key="btn" exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    <Magnetic className="btn btn-primary form-submit" type="submit">
                      Send message <span className="arrow">→</span>
                    </Magnetic>
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
