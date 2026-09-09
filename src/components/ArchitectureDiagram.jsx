import { useMemo, useState } from 'react'
import { HOMELAB_DEVICES } from '../data/content.js'

function lookup(id) {
  return HOMELAB_DEVICES.find((device) => device.id === id)
}

function DiagramNode({ node, active, onSelect }) {
  return (
    <button
      type="button"
      className={`arch-node${active ? ' is-active' : ''}`}
      onClick={() => onSelect(node)}
      aria-pressed={active}
      data-cursor="explore"
    >
      <span className="arch-node-top mono">
        <i aria-hidden="true" /> {node.layer}
      </span>
      <strong>{node.label}</strong>
      <span>{node.kind}</span>
    </button>
  )
}

export default function ArchitectureDiagram() {
  const nodes = useMemo(() => {
    const unifi = lookup('unifi')
    const proxmox = lookup('proxmox')
    const vms = lookup('vms')
    const pihole = lookup('pihole')
    const wireguard = lookup('wireguard')

    return {
      route: [
        {
          id: 'internet',
          layer: 'EDGE',
          label: 'Internet',
          kind: 'External network',
          what: 'The external boundary of the lab. Administrative services are not presented here as public endpoints.',
          tech: ['Network boundary'],
        },
        { ...unifi, layer: 'GATEWAY' },
        {
          id: 'lan',
          layer: 'NETWORK',
          label: 'Internal Network',
          kind: 'Managed lab traffic',
          what: 'The internal path connecting the gateway, virtualization host, guests, and supporting services. Exact addressing is intentionally omitted.',
          tech: ['TCP/IP', 'DNS', 'DHCP'],
        },
        { ...proxmox, layer: 'COMPUTE' },
      ],
      workloads: [
        {
          id: 'windows-vm',
          layer: 'GUEST',
          label: 'Windows Server VM',
          kind: 'Identity / systems lab',
          what: vms.what,
          learned: vms.learned,
          tech: ['Windows Server', 'Active Directory'],
        },
        {
          id: 'ubuntu-vm',
          layer: 'GUEST',
          label: 'Ubuntu VM',
          kind: 'Linux systems lab',
          what: vms.what,
          learned: vms.learned,
          tech: ['Ubuntu', 'Linux'],
        },
      ],
      services: [
        { ...pihole, layer: 'SERVICE' },
        { ...wireguard, layer: 'REMOTE' },
        {
          id: 'active-directory',
          layer: 'SERVICE',
          label: 'Active Directory',
          kind: 'Accounts / access',
          what: 'Directory services configured in the Windows Server lab for user accounts and access administration.',
          learned: vms.learned,
          tech: ['Active Directory', 'Windows Server'],
        },
      ],
    }
  }, [])

  const [selected, setSelected] = useState(nodes.route[3])

  return (
    <div className="architecture-shell">
      <div className="arch-toolbar mono">
        <span>LAB_TOPOLOGY // SANITIZED VIEW</span>
        <span className="arch-safe"><i /> NO ADDRESSES EXPOSED</span>
      </div>

      <div className="arch-canvas" aria-label="Interactive home lab network architecture">
        <div className="arch-route">
          {nodes.route.map((node, index) => (
            <div className="arch-route-step" key={node.id}>
              <DiagramNode node={node} active={selected.id === node.id} onSelect={setSelected} />
              {index < nodes.route.length - 1 && <span className="arch-connector" aria-hidden="true"><i /></span>}
            </div>
          ))}
        </div>

        <div className="arch-downlink" aria-hidden="true"><i /></div>

        <div className="arch-plane">
          <div>
            <span className="arch-plane-label mono">VIRTUAL WORKLOADS</span>
            <div className="arch-node-grid">
              {nodes.workloads.map((node) => (
                <DiagramNode key={node.id} node={node} active={selected.id === node.id} onSelect={setSelected} />
              ))}
            </div>
          </div>
          <div>
            <span className="arch-plane-label mono">NETWORK / IDENTITY SERVICES</span>
            <div className="arch-node-grid arch-node-grid-services">
              {nodes.services.map((node) => (
                <DiagramNode key={node.id} node={node} active={selected.id === node.id} onSelect={setSelected} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="arch-inspector" aria-live="polite">
        <div>
          <span className="mono arch-inspector-label">SELECTED NODE</span>
          <h3>{selected.label}</h3>
          <p>{selected.what}</p>
          {selected.learned && <p className="arch-learned"><strong>Operational context:</strong> {selected.learned}</p>}
        </div>
        <div className="arch-inspector-tags">
          {(selected.tech || []).map((technology) => <span className="tag" key={technology}>{technology}</span>)}
        </div>
      </div>
    </div>
  )
}
