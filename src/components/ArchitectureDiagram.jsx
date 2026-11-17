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
    const proxmox = lookup('proxmox')
    const vms = lookup('vms')
    const windowsServer = lookup('windows-server')
    const directoryServices = lookup('directory-services')
    const networkServices = lookup('network-services')

    return {
      route: [
        {
          id: 'physical-host',
          layer: 'HARDWARE',
          label: 'Physical Host',
          kind: 'Lab hardware',
          what: 'The physical system provides the compute resources for the Proxmox VE environment.',
          tech: ['Hardware'],
        },
        { ...proxmox, layer: 'HYPERVISOR' },
        {
          id: 'virtual-network',
          layer: 'NETWORK',
          label: 'Virtual Network',
          kind: 'Guest connectivity',
          what: 'The virtual network connects the Ubuntu Linux and Windows Server guests with the lab services they use.',
          tech: ['Network Configuration', 'TCP/IP'],
        },
        { ...vms, layer: 'GUESTS' },
      ],
      workloads: [
        { ...windowsServer, id: 'windows-vm', layer: 'GUEST' },
        {
          id: 'ubuntu-vm',
          layer: 'GUEST',
          label: 'Ubuntu VM',
          kind: 'Linux systems lab',
          what: 'Ubuntu Linux virtual machines run inside the Proxmox VE environment.',
          learned: 'Linux administration, virtual machine management, and technical troubleshooting.',
          tech: ['Ubuntu Linux', 'Linux'],
        },
      ],
      services: [
        { ...directoryServices, layer: 'IDENTITY' },
        { ...networkServices, id: 'dns', layer: 'SERVICE', label: 'DNS', kind: 'Name resolution', tech: ['DNS', 'Windows Server'] },
        { ...networkServices, id: 'dhcp', layer: 'SERVICE', label: 'DHCP', kind: 'Network configuration', tech: ['DHCP', 'Windows Server'] },
      ],
    }
  }, [])

  const [selected, setSelected] = useState(nodes.route[1])

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
