import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <span className="section-eyebrow mono">About</span>
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
              <p className="about-body">
                I&apos;m an Information Technology student at Wayne State University with a
                minor in Business Administration. My current focus is building infrastructure
                skills through labs, coursework, and hands-on projects — from running a
                Proxmox home lab to configuring core network services.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="about-body">
                Outside the terminal, I&apos;ve led as Vice President of the Video Game
                Development Club and managed daily operations at Subway — experience that
                shaped how I communicate, coordinate, and solve problems under pressure.
              </p>
            </Reveal>
          </div>

          <div className="about-side">
            <Reveal delay={0.12}>
              <div className="card edu-card">
                <span className="mono" style={{ display: 'block', marginBottom: '0.9rem' }}>
                  Education
                </span>
                <div className="edu-school">Wayne State University</div>
                <div className="edu-loc">Detroit, MI</div>

                <div className="edu-rows">
                  <div className="edu-row">
                    <span>Degree</span>
                    <strong>B.S. Information Technology</strong>
                  </div>
                  <div className="edu-row">
                    <span>Minor</span>
                    <strong>Business Administration</strong>
                  </div>
                  <div className="edu-row">
                    <span>Graduation</span>
                    <strong>December 2027</strong>
                  </div>
                </div>

                <div className="gpa-chip">
                  <strong>3.83</strong>
                  <span>GPA</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
