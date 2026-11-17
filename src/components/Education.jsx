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

        <div className="education-list">
          {EDUCATION.map((record, index) => (
            <Reveal delay={0.08 + index * 0.06} key={record.school}>
              <article className="card education-card" data-sv="EDUCATION_NODE">
                <div className="education-main">
                  <span className="mono education-status"><i /> {record.status}</span>
                  <h3>{record.degree}</h3>
                  <p>{record.school}</p>
                  <span>{record.location}</span>
                </div>
                <dl className="education-facts">
                  <div><dt className="mono">ATTENDANCE</dt><dd>{record.period}</dd></div>
                  {record.minor && <div><dt className="mono">MINOR</dt><dd>{record.minor}</dd></div>}
                  {record.gpa && <div><dt className="mono">GPA</dt><dd>{record.gpa}</dd></div>}
                  <div><dt className="mono">COURSEWORK</dt><dd>{record.coursework}</dd></div>
                </dl>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
