import Reveal from './Reveal.jsx'
import { PROFILE } from '../data/content.js'

/* About — a personal system profile: technical styling, readable content. */

const ROWS = [
  ['USER', PROFILE.name],
  ['ROLE', `${PROFILE.role} — ${PROFILE.school}`],
  ['DEGREE', `${PROFILE.degree} · Minor: ${PROFILE.minor}`],
  ['GPA', PROFILE.gpa],
  ['GRADUATION', PROFILE.graduation],
  ['LOCATION', PROFILE.location],
  ['FOCUS', 'Systems / Networks / Automation'],
]

export default function About() {
  return (
    <section id="about" data-module="MODULE_02 · USER_PROFILE">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow mono">User profile</span>
          <h2 className="section-title">System <em>identity</em></h2>
        </Reveal>

        <div className="about-grid">
          <div>
            <Reveal>
              <p className="about-lede">
                I learn infrastructure by <em>building it</em> — labs, coursework,
                and hands-on projects.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="about-body">{PROFILE.about1}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="about-body">{PROFILE.about2}</p>
            </Reveal>
          </div>

          <div className="about-side">
            <Reveal delay={0.12}>
              <div className="card profile-card" data-sv="SYSTEM_NODE">
                <div className="pc-head mono">
                  <span>USER_PROFILE</span>
                  <span className="pc-status"><i /> ACTIVE</span>
                </div>

                <dl className="pc-rows">
                  {ROWS.map(([k, v]) => (
                    <div className="pc-row" key={k}>
                      <dt className="mono">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="pc-foot mono">
                  <i /> {PROFILE.status.toUpperCase()}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
