import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import { PROJECTS } from '../data/content.js'

/*
 * Scroll-controlled hardware deconstruction → virtualization.
 * A tall wrapper + sticky stage: scroll position IS the timeline, so the
 * sequence scrubs forward and backward with the visitor. No video, no
 * autoplay — pure scroll-linked transforms (GPU-friendly only).
 *
 * Stages: hardware → case opens → components → network → virtualization
 *         → services → complete infrastructure + project reveal.
 */

const CAPTIONS = [
  ['01', 'PHYSICAL HARDWARE', 'One mini PC. This is where everything runs.'],
  ['02', 'CASE DECONSTRUCTION', 'The case opens — nothing magic inside, just parts.'],
  ['03', 'COMPONENT IDENTIFICATION', 'CPU, memory, storage, network. The raw resources.'],
  ['04', 'NETWORK ACTIVATION', 'A cable, a link light, and the packet finds the host.'],
  ['05', 'VIRTUALIZATION', 'Proxmox slices one machine into many.'],
  ['06', 'SERVICE ACTIVATION', 'Pi-hole and WireGuard come online across the layers.'],
  ['07', 'COMPLETE INFRASTRUCTURE', 'Physical hardware, now a virtual environment.'],
]

const CABLE = 'M 12 150 C 60 150, 60 96, 118 92'

const LAYERS = [
  { id: 'host', label: 'PROXMOX HOST', chips: [] },
  { id: 'net', label: 'NETWORK LAYER', chips: ['DNS', 'DHCP', 'VPN'] },
  { id: 'vm', label: 'VIRTUAL MACHINE LAYER', chips: ['VM 01', 'VM 02', 'VM 03'] },
  { id: 'svc', label: 'SERVICES', chips: ['PI-HOLE', 'WIREGUARD'] },
]

const featured = PROJECTS.find((p) => p.featured)

export default function Hardware() {
  const wrapRef = useRef(null)
  const cableRef = useRef(null)
  const cablePacketRef = useRef(null)
  const reduce = useReducedMotion()
  const [stage, setStage] = useState(reduce ? 6 : 0)

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  /* Discrete stage (captions, LED/class switches). */
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (reduce) return
    const s = p < 0.14 ? 0 : p < 0.3 ? 1 : p < 0.46 ? 2 : p < 0.6 ? 3 : p < 0.78 ? 4 : p < 0.88 ? 5 : 6
    setStage(s)

    /* Packet rides the cable during NETWORK ACTIVATION. */
    const cable = cableRef.current
    const packet = cablePacketRef.current
    if (cable && packet) {
      const t = Math.min(1, Math.max(0, (p - 0.47) / 0.11))
      const len = cable.getTotalLength()
      const pt = cable.getPointAtLength(t * len)
      packet.setAttribute('cx', pt.x)
      packet.setAttribute('cy', pt.y)
      packet.style.opacity = t > 0 && t < 1 ? 1 : 0
    }
  })

  /* Continuous transforms. */
  const devOpacity = useTransform(scrollYProgress, [0, 0.07], [0, 1])
  const devScale = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0.82, 1, 1, 0.94])
  const devRY = useTransform(scrollYProgress, [0, 0.34], [-26, -12])
  const topY = useTransform(scrollYProgress, [0.15, 0.29], [0, -118])
  const sideL = useTransform(scrollYProgress, [0.17, 0.3], [0, -104])
  const sideR = useTransform(scrollYProgress, [0.17, 0.3], [0, 104])
  const panelFade = useTransform(scrollYProgress, [0.26, 0.34], [1, 0.35])
  const labelsOn = useTransform(scrollYProgress, [0.31, 0.4], [0, 1])
  const cableDraw = useTransform(scrollYProgress, [0.46, 0.56], [0, 1])
  const sceneX = useTransform(scrollYProgress, [0.86, 0.97], ['0%', '-14%'])
  const infoOpacity = useTransform(scrollYProgress, [0.88, 0.97], [0, 1])
  const infoX = useTransform(scrollYProgress, [0.88, 0.97], [46, 0])

  const layerOn = (i) =>
    useTransform(scrollYProgress, [0.58 + i * 0.055, 0.64 + i * 0.055], [0, 1])
  const layerY = (i) =>
    useTransform(scrollYProgress, [0.58 + i * 0.055, 0.66 + i * 0.055], [34, 0])
  /* eslint-disable react-hooks/rules-of-hooks -- fixed-length loop, stable order */
  const layerStyles = LAYERS.map((_, i) => ({ opacity: layerOn(i), y: layerY(i) }))
  /* eslint-enable react-hooks/rules-of-hooks */

  /* Reduced motion: show the completed diagram, skip the scrub. */
  if (reduce) {
    return (
      <section id="virtualization" className="hw-wrap is-static" data-module="MODULE_05 · VIRTUALIZATION">
        <div className="hw-stage">
          <StageContent
            stage={6}
            refs={{ cableRef, cablePacketRef }}
            styles={{}}
            layerStyles={LAYERS.map(() => ({}))}
            isStatic
          />
        </div>
      </section>
    )
  }

  return (
    <section id="virtualization" className="hw-wrap" ref={wrapRef} data-module="MODULE_05 · VIRTUALIZATION">
      <div className="hw-stage">
        <StageContent
          stage={stage}
          refs={{ cableRef, cablePacketRef }}
          styles={{
            devOpacity, devScale, devRY, topY, sideL, sideR,
            panelFade, labelsOn, cableDraw, sceneX, infoOpacity, infoX,
          }}
          layerStyles={layerStyles}
        />
      </div>
    </section>
  )
}

function StageContent({ stage, refs, styles, layerStyles, isStatic = false }) {
  const s = styles
  return (
    <div className="hw-frame container">
      {/* Stage captions */}
      <div className="hw-captions" aria-live="polite">
        {CAPTIONS.map(([num, title, sub], i) => (
          <div key={num} className={`hw-caption${stage === i ? ' is-on' : ''}`}>
            <span className="mono hw-cap-num">STAGE {num} / 07</span>
            <h3>{title}</h3>
            <p>{sub}</p>
          </div>
        ))}
        <div className="hw-progress" aria-hidden="true">
          {CAPTIONS.map((_, i) => <i key={i} className={i <= stage ? 'is-done' : ''} />)}
        </div>
      </div>

      {/* Scene */}
      <motion.div className="hw-scene" style={isStatic ? undefined : { x: s.sceneX }}>
        <div className={`hw-scene-inner stage-${stage}`}>
          {/* Virtual layers rise above the hardware */}
          <div className="hw-layers" aria-hidden={stage < 4}>
            {LAYERS.slice().reverse().map((layer, ri) => {
              const i = LAYERS.length - 1 - ri
              return (
                <motion.div
                  key={layer.id}
                  className={`hw-layer hw-layer-${layer.id}${stage >= 5 ? ' is-linked' : ''}`}
                  style={isStatic ? undefined : layerStyles[i]}
                >
                  <span className="mono hw-layer-label">{layer.label}</span>
                  {layer.chips.length > 0 && (
                    <span className="hw-layer-chips">
                      {layer.chips.map((c) => <i key={c} className="mono">{c}</i>)}
                    </span>
                  )}
                </motion.div>
              )
            })}
            <div className={`hw-risers${stage >= 5 ? ' is-on' : ''}`} aria-hidden="true">
              <i /><i /><i />
            </div>
          </div>

          {/* The mini PC */}
          <motion.div
            className={`hw-device${stage >= 3 ? ' leds-on' : ''}`}
            data-sv="SYSTEM_NODE"
            style={isStatic ? undefined : { opacity: s.devOpacity, scale: s.devScale, rotateY: s.devRY }}
          >
            <motion.div className="dev-top" style={isStatic ? { y: -118, opacity: 0.35 } : { y: s.topY, opacity: s.panelFade }} />
            <motion.div className="dev-side dev-side-l" style={isStatic ? { x: -104, opacity: 0.35 } : { x: s.sideL, opacity: s.panelFade }} />
            <motion.div className="dev-side dev-side-r" style={isStatic ? { x: 104, opacity: 0.35 } : { x: s.sideR, opacity: s.panelFade }} />

            <div className="dev-board">
              {[
                ['cpu', 'CPU'],
                ['mem', 'MEMORY'],
                ['sto', 'STORAGE'],
                ['nic', 'NETWORK'],
              ].map(([id, label]) => (
                <motion.div key={id} className={`dev-part dev-${id}`} style={isStatic ? undefined : { opacity: s.labelsOn }}>
                  <i className="dev-chip" />
                  <span className="dev-tag mono"><i />{label}</span>
                </motion.div>
              ))}
              <span className="dev-leds" aria-hidden="true"><i /><i /><i /></span>
            </div>
          </motion.div>

          {/* Network cable + packet */}
          <svg className="hw-cable" viewBox="0 0 130 160" aria-hidden="true">
            <path className="hw-cable-bg" d={CABLE} />
            <motion.path
              ref={refs.cableRef}
              className="hw-cable-lit"
              d={CABLE}
              style={isStatic ? { pathLength: 1 } : { pathLength: s.cableDraw }}
            />
            <circle ref={refs.cablePacketRef} className="hw-cable-packet" r="3.6" style={{ opacity: 0 }} />
          </svg>
        </div>
      </motion.div>

      {/* Project reveal — the payoff of the sequence */}
      <motion.aside
        className={`card hw-info${stage >= 6 ? ' is-on' : ''}`}
        style={isStatic ? undefined : { opacity: s.infoOpacity, x: s.infoX }}
        data-sv="PROJECT_INSTANCE"
      >
        <div className="hw-info-head mono">
          <span>FEATURED // {featured.instance}</span>
          <span className="hw-info-status"><i /> RUNNING</span>
        </div>
        <h3>{featured.title}</h3>
        <p>{featured.desc}</p>
        <dl className="hw-info-rows">
          <div><dt className="mono">MAIN CHALLENGE</dt><dd>{featured.challenge}</dd></div>
          <div><dt className="mono">WHAT I LEARNED</dt><dd>{featured.learned}</dd></div>
        </dl>
        <div className="hw-info-tags">
          {featured.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
        </div>
        <a href="https://github.com/Pratham123650" target="_blank" rel="noreferrer" className="u-link" data-cursor="view">
          View GitHub
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 5h5v5M19 5l-8 8M9 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-3" />
          </svg>
        </a>
      </motion.aside>
    </div>
  )
}
