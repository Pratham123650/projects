import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import Reveal from './Reveal.jsx'
import { HOMELAB_DEVICES } from '../data/content.js'

/*
 * The homelab rack — simulated-3D, scroll-emergent, fully interactive.
 * Devices power on one at a time as the rack rises out of darkness.
 * Selecting a device focuses it and opens its system panel.
 */

export default function Homelab() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [powered, setPowered] = useState(reduce ? HOMELAB_DEVICES.length : 0)
  const [selected, setSelected] = useState(null)

  /* Emergence: the rack rotates into position as it enters the viewport. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.18'] })
  const rackOpacity = useTransform(scrollYProgress, [0, 0.45], [0, 1])
  const rackY = useTransform(scrollYProgress, [0, 0.6], [90, 0])
  const rackRX = useTransform(scrollYProgress, [0, 0.7], [16, 4])
  const rackScale = useTransform(scrollYProgress, [0, 0.7], [0.94, 1])

  /* Devices power on sequentially with scroll progress (reversible). */
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduce) return
    const n = HOMELAB_DEVICES.length
    setPowered(Math.max(0, Math.min(n, Math.floor((p - 0.35) / 0.11) + 1)))
  })

  const sel = HOMELAB_DEVICES.find((d) => d.id === selected)

  return (
    <section id="homelab" data-module="MODULE_04 · PHYSICAL_RACK">
      <div className="container">
        <div className="section-head">
          <Reveal>
            <span className="section-eyebrow mono">Physical infrastructure</span>
            <h2 className="section-title">The <em>homelab</em></h2>
            <p className="section-sub">
              Real hardware, always on. Select a device to connect to it and see
              what it runs, why I built it, and what it taught me.
            </p>
          </Reveal>
        </div>

        <div className={`rack-zone${sel ? ' has-sel' : ''}`}>
          <div className="rack-stage">
            <motion.div
              className="rack"
              data-sv="PHYSICAL_RACK"
              style={reduce ? undefined : { opacity: rackOpacity, y: rackY, rotateX: rackRX, scale: rackScale }}
            >
              <div className="rack-top mono">
                <span>RACK_01 · HOMELAB</span>
                <span className="rack-pwr"><i /> PWR</span>
              </div>

              <div className="rack-body">
                <div className="rack-rail mono" aria-hidden="true">
                  {HOMELAB_DEVICES.map((d) => <span key={d.unit}>{d.unit}</span>)}
                </div>

                <div className="rack-units">
                  {HOMELAB_DEVICES.map((d, i) => (
                    <button
                      key={d.id}
                      className={`rack-unit${i < powered ? ' is-on' : ''}${selected === d.id ? ' is-sel' : ''}`}
                      data-cursor="connect"
                      aria-expanded={selected === d.id}
                      onClick={() => setSelected((v) => (v === d.id ? null : d.id))}
                    >
                      <span className="ru-leds" aria-hidden="true">
                        {Array.from({ length: d.leds }, (_, j) => (
                          <i key={j} style={{ animationDelay: `${(j * 0.7 + i) % 3}s` }} />
                        ))}
                      </span>
                      <span className="ru-text">
                        <strong>{d.label}</strong>
                        <span className="mono">{d.kind}</span>
                      </span>
                      <span className="ru-ports" aria-hidden="true">
                        <i /><i /><i /><i />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="rack-foot mono" aria-hidden="true">
                <span>42U · SIM</span>
                <span>{powered}/{HOMELAB_DEVICES.length} ONLINE</span>
              </div>
            </motion.div>
          </div>

          {/* Device system panel */}
          <div className="rack-panel-wrap" aria-live="polite">
            <AnimatePresence mode="wait">
              {sel ? (
                <motion.aside
                  key={sel.id}
                  className="card rack-panel"
                  data-sv="SERVICE_LAYER"
                  initial={reduce ? false : { opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: 14 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="rp-head mono">
                    <span>{sel.unit} // {sel.label.toUpperCase()}</span>
                    <span className="rp-status"><i /> CONNECTED</span>
                  </div>
                  <dl className="rp-rows">
                    <div><dt className="mono">WHAT IT DOES</dt><dd>{sel.what}</dd></div>
                    <div><dt className="mono">WHY I BUILT IT</dt><dd>{sel.why}</dd></div>
                    <div><dt className="mono">WHAT I LEARNED</dt><dd>{sel.learned}</dd></div>
                  </dl>
                  <div className="rp-tags">
                    {sel.tech.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <button className="btn btn-ghost rp-back" onClick={() => setSelected(null)} data-cursor="open">
                    ← Back to rack
                  </button>
                </motion.aside>
              ) : (
                <motion.div
                  key="idle"
                  className="rack-idle mono"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                >
                  <p>▸ NO DEVICE SELECTED</p>
                  <p className="rack-idle-sub">Connect to a unit to inspect the system running on it.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
