import Reveal from './Reveal.jsx'
import { CURRENTLY_BUILDING } from '../data/content.js'

export default function CurrentlyBuilding() {
  return (
    <section className="now-section" aria-labelledby="now-title">
      <div className="container">
        <Reveal>
          <div className="now-panel">
            <div className="now-heading">
              <span className="mono"><i /> CURRENT PROCESS</span>
              <h2 id="now-title">Currently building / learning</h2>
            </div>
            <div className="now-items">
              {CURRENTLY_BUILDING.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <div>{item.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
