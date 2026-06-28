import Reveal from './Reveal.jsx'
import TiltCard from './TiltCard.jsx'

const SKILLS = [
  'Linux Administration', 'Windows Server', 'Active Directory', 'Networking',
  'Proxmox', 'VirtualBox', 'Java', 'Python', 'TCP/IP, DNS, DHCP',
]

export default function Resume() {
  return (
    <section id="resume">
      <div className="container">
        <div className="section-divider" />
        <Reveal className="section-heading">
          <div>
            <span className="section-label mono">// background</span>
            <h2 className="section-title">Resume Snapshot</h2>
          </div>
        </Reveal>

        <div className="resume-grid">
          <Reveal>
            <TiltCard className="card resume-card" tiltAmount={4}>
              <h3 className="mono">Education</h3>
              <div className="timeline-item">
                <h4>Wayne State University — Detroit, MI</h4>
                <div className="muted">B.S. in Information Technology</div>
                <div className="muted">Minor in Business Administration</div>
                <p style={{ marginTop: '0.5rem' }}>Expected Graduation: December 2027</p>
                <div className="gpa-badge mono">⭐ GPA: 3.83</div>
              </div>

              <h3 className="mono" style={{ marginTop: '1.8rem' }}>Technical Skills</h3>
              <ul className="skill-list" style={{ marginTop: '0.8rem' }}>
                {SKILLS.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.1}>
            <TiltCard className="card resume-card" tiltAmount={4}>
              <h3 className="mono">Experience / Highlights</h3>

              <div className="timeline-item">
                <h4>IT / Technical Projects</h4>
                <div className="muted">Hands-on systems</div>
                <div className="muted" style={{ marginTop: '0.35rem' }}>
                  <a href="https://github.com/Pratham123650" target="_blank" rel="noreferrer" data-cursor="open">
                    GitHub: github.com/Pratham123650
                  </a>
                </div>
                <ul className="bullet-list">
                  <li>Built and managed a Proxmox home lab with Ubuntu and Windows Server.</li>
                  <li>Configured Active Directory, user accounts, and core network services.</li>
                  <li>Explored Docker and Ansible for automation and server setup.</li>
                  <li>Developed technical troubleshooting and problem-solving skills by installing, configuring, and maintaining lab environments across multiple operating systems and platforms.</li>
                </ul>
              </div>

              <div className="timeline-item">
                <h4>Leadership / Teamwork</h4>
                <div className="muted">Clubs and jobs</div>
                <ul className="bullet-list">
                  <li>As Vice President of the Video Game Development Club, I helped support club initiatives, collaborate with members, and contribute to a creative and team-driven environment. This role strengthened my leadership, coordination, and ability to work with others toward shared goals.</li>
                  <li>As a manager at Subway, I developed hands-on leadership experience by helping oversee daily operations, supporting team members, and ensuring customers had a positive experience. This role strengthened my ability to communicate clearly, solve problems quickly, and stay organized in a fast-paced environment.</li>
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
