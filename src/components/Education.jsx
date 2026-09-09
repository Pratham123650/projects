import Reveal from './Reveal.jsx'
import { EDUCATION } from '../data/content.js'

export default function Education() {
  return (
    <section id="education" data-module="MODULE_08 · EDUCATION_RECORD">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">Education record</span>
            <h2 className="section-title">Academic <em>foundation</em></h2>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <article className="card education-card" data-sv="EDUCATION_NODE">
            <div className="education-main">
              <span className="mono education-status"><i /> ENROLLED</span>
              <h3>{EDUCATION.degree}</h3>
              <p>{EDUCATION.school}</p>
              <span>{EDUCATION.location}</span>
            </div>
            <dl className="education-facts">
              <div><dt className="mono">EXPECTED GRADUATION</dt><dd>Expected Graduation · {EDUCATION.graduation}</dd></div>
              <div><dt className="mono">MINOR</dt><dd>{EDUCATION.minor}</dd></div>
              <div><dt className="mono">GPA</dt><dd>{EDUCATION.gpa}</dd></div>
            </dl>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
