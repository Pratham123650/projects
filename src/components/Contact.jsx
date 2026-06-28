import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

const CONTACTS = [
  { icon: '✉', label: 'Email', value: 'prathampatel102403@gmail.com', href: 'mailto:prathampatel102403@gmail.com' },
  { icon: '⌁', label: 'GitHub', value: 'github.com/Pratham123650', href: 'https://github.com/Pratham123650' },
  { icon: '◈', label: 'LinkedIn', value: 'linkedin.com/in/prathampatelit', href: 'https://www.linkedin.com/in/prathampatelit/' },
]

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="section-divider" />
        <Reveal className="section-heading">
          <div>
            <span className="section-label mono">// reach out</span>
            <h2 className="section-title">Contact</h2>
          </div>
        </Reveal>

        <div className="contact-grid">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <TiltCard className="card contact-card" tiltAmount={8}>
                <div className="contact-icon">{c.icon}</div>
                <h3 className="mono">{c.label}</h3>
                <p>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" data-cursor="connect">
                    {c.value}
                  </a>
                </p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
