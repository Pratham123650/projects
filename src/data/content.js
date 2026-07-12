/* ------------------------------------------------------------------ */
/*  Centralized content — every section reads from here.               */
/*  All information is real. Do not add facts that are not verified.   */
/* ------------------------------------------------------------------ */

export const PROFILE = {
  name: 'Pratham Patel',
  domain: 'PRATHAM-PATEL.COM',
  title: 'Information Technology',
  tagline: 'Systems • Networks • Automation',
  role: 'Information Technology Student',
  school: 'Wayne State University',
  location: 'Detroit Metro, Michigan',
  degree: 'B.S. Information Technology',
  minor: 'Business Administration',
  graduation: 'December 2027',
  gpa: '3.83',
  status: 'Available for opportunities',
  email: 'prathampatel102403@gmail.com',
  github: 'https://github.com/Pratham123650',
  githubLabel: 'github.com/Pratham123650',
  linkedin: 'https://www.linkedin.com/in/prathampatelit/',
  linkedinLabel: 'linkedin.com/in/prathampatelit',
  resume: '/resume.pdf',
  intro:
    'I learn infrastructure by building it — a Proxmox homelab, core network services, and hands-on systems work, on the path toward a career in IT systems.',
  about1:
    "I'm an Information Technology student at Wayne State University with a minor in Business Administration. My focus is building real infrastructure skills through labs, coursework, and hands-on projects — from running a Proxmox homelab with Pi-hole, WireGuard, and UniFi networking to configuring core services like DNS, DHCP, and Active Directory.",
  about2:
    "As an IT Intern at Edward Rose & Sons, I troubleshot and replaced hardware across company equipment, assisted with system migration and networking projects, and supported the enterprise support team with data gathering and report analysis. Outside the terminal, I've led as Vice President of the Video Game Development Club and managed daily operations at Subway — experience that shaped how I communicate, coordinate, and solve problems under pressure.",
}

/* Formspree endpoint — paste your form URL here (e.g. https://formspree.io/f/xxxxxxx).
   While empty, the contact form falls back to mailto: so it always works. */
export const FORM_ENDPOINT = ''

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'homelab', label: 'Homelab' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

/* ------------------------------- Skills ------------------------------- */
/* x/y are % coordinates inside the network map canvas.                   */
export const SKILL_CATEGORIES = [
  {
    id: 'systems',
    label: 'Systems',
    x: 20, y: 20,
    tech: ['Windows Server', 'Active Directory', 'Linux', 'Proxmox', 'SCCM', 'VirtualBox'],
    usage:
      'I run Windows Server and Linux VMs on my Proxmox host, manage Active Directory in my lab, and worked hands-on with Windows and iOS devices as an IT Intern at Edward Rose & Sons.',
  },
  {
    id: 'networking',
    label: 'Networking',
    x: 80, y: 18,
    tech: ['TCP/IP', 'DNS', 'DHCP', 'UniFi'],
    usage:
      'I configured DNS and DHCP in systems labs and run my home network on UniFi gear, which routes everything my homelab serves.',
  },
  {
    id: 'security',
    label: 'Security',
    x: 90, y: 60,
    tech: ['Pi-hole', 'WireGuard', 'AD Access Control'],
    usage:
      'Pi-hole filters DNS for my whole network, WireGuard gives me secure remote access into the lab, and I manage user accounts and access through Active Directory.',
  },
  {
    id: 'automation',
    label: 'Automation',
    x: 68, y: 88,
    tech: ['Docker', 'Ansible', 'Python'],
    usage:
      'I have explored Docker and Ansible for automating server setup in my homelab, alongside Python for scripting.',
  },
  {
    id: 'development',
    label: 'Development',
    x: 28, y: 88,
    tech: ['Java', 'JavaFX', 'Python', 'MySQL', 'GitHub'],
    usage:
      'I built course-based Java applications involving data structures, file handling, and JavaFX interfaces, and configured MySQL in systems labs.',
  },
  {
    id: 'hardware',
    label: 'Hardware',
    x: 9, y: 58,
    tech: ['Homelab Hardware', 'Deployment', 'Troubleshooting'],
    usage:
      'I built and maintain the hardware behind my homelab, and installed, replaced, and troubleshot hardware on company equipment during my IT internship.',
  },
]

/* ------------------------------ Homelab ------------------------------ */
export const HOMELAB_DEVICES = [
  {
    id: 'unifi',
    unit: 'U1',
    label: 'UniFi Network',
    kind: 'Gateway / Switching',
    leds: 4,
    what: 'UniFi networking gear that routes and switches everything in the lab and home network.',
    why: 'I wanted real, managed networking — gear I could actually configure instead of an ISP box I could not.',
    learned: 'How routing, switching, and network management behave outside of a textbook.',
    tech: ['UniFi', 'TCP/IP', 'DHCP'],
  },
  {
    id: 'pihole',
    unit: 'U2',
    label: 'Pi-hole DNS',
    kind: 'Network-wide DNS filtering',
    leds: 2,
    what: 'Pi-hole answers DNS for every device on the network and filters ads and trackers at the DNS layer.',
    why: 'Running my own resolver meant every DNS lookup in the house became something I could see and control.',
    learned: 'How DNS resolution works end-to-end, and what breaks when the resolver goes down.',
    tech: ['Pi-hole', 'DNS', 'Linux'],
  },
  {
    id: 'wireguard',
    unit: 'U3',
    label: 'WireGuard VPN',
    kind: 'Secure remote access',
    leds: 2,
    what: 'A WireGuard tunnel that lets me reach the lab securely from anywhere.',
    why: 'I needed remote access to manage VMs and services without exposing anything directly to the internet.',
    learned: 'Key-based VPN configuration, routing between subnets, and thinking about what should never be public.',
    tech: ['WireGuard', 'Networking', 'Security'],
  },
  {
    id: 'proxmox',
    unit: 'U4',
    label: 'Proxmox Host',
    kind: 'Virtualization server',
    leds: 6,
    what: 'The core of the lab — a Proxmox VE host running Ubuntu and Windows Server virtual machines.',
    why: 'One physical machine becomes a whole environment: domain services, web servers, test boxes.',
    learned: 'Virtualization, resource allocation, snapshots, and how physical hardware becomes virtual infrastructure.',
    tech: ['Proxmox', 'Linux', 'Windows Server'],
  },
  {
    id: 'vms',
    unit: 'U5',
    label: 'Virtual Machines',
    kind: 'Ubuntu · Windows Server',
    leds: 3,
    what: 'The VM layer on top of Proxmox — Ubuntu and Windows Server guests running Active Directory and lab services.',
    why: 'VMs let me build, break, and rebuild full systems safely — the fastest way I have found to learn.',
    learned: 'Active Directory, user accounts, core network services, and multi-OS administration.',
    tech: ['Ubuntu', 'Windows Server', 'Active Directory'],
  },
]

/* ------------------------------ Projects ------------------------------ */
export const PROJECT_FILTERS = ['All', 'Homelab', 'Development', 'Systems']

export const PROJECTS = [
  {
    id: 'homelab',
    instance: 'INSTANCE_01',
    category: 'Homelab',
    featured: true,
    title: 'Home Lab / Proxmox Server',
    desc: 'A virtualization environment for hosting VMs, testing services, and learning infrastructure management — with Pi-hole DNS filtering, a WireGuard VPN, and UniFi networking around it.',
    challenge: 'Getting multiple operating systems, services, and the network configuration to work together reliably on one host.',
    learned: 'How virtualization, networking, and system administration fit together in practice.',
    tags: ['Proxmox', 'Linux', 'Windows Server', 'Pi-hole', 'WireGuard'],
    links: [
      { label: 'GitHub', href: 'https://github.com/Pratham123650' },
      { label: 'Virtualization sequence', href: '#virtualization', internal: true },
    ],
  },
  {
    id: 'java',
    instance: 'INSTANCE_02',
    category: 'Development',
    title: 'Java Application Projects',
    desc: 'Course-based applications involving data structures, file handling, and user interfaces, built for practical development experience.',
    challenge: 'Structuring programs around the right data structures and clean file handling.',
    learned: 'Development fundamentals — from program design through building working interfaces.',
    tags: ['Java', 'Data Structures', 'JavaFX'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/Pratham123650' }],
  },
  {
    id: 'labs',
    instance: 'INSTANCE_03',
    category: 'Systems',
    title: 'Networking / Systems Labs',
    desc: 'Configured services like DNS, DHCP, Active Directory, Apache, and MySQL as part of hands-on systems administration labs.',
    challenge: 'Making interdependent services resolve, route, and authenticate correctly together.',
    learned: 'How core network services underpin everything else that runs on a network.',
    tags: ['Networking', 'Windows Server', 'Active Directory', 'MySQL'],
    links: [{ label: 'GitHub profile', href: 'https://github.com/Pratham123650' }],
  },
]

/* ----------------------------- Experience ----------------------------- */
export const EXPERIENCE = [
  {
    log: 'LOG_04',
    status: 'ACTIVE',
    company: 'Edward Rose & Sons',
    position: 'IT Intern',
    meta: 'Bloomfield, MI · Jun — Aug 2026',
    bullets: [
      'Troubleshot hardware and mobile devices and determined when equipment required replacement.',
      'Installed and replaced hardware on company equipment and kept software and applications up to date.',
      'Assisted with system migration and networking projects.',
      'Supported the enterprise support team with data gathering and report analysis.',
    ],
    tools: ['Windows', 'iOS', 'Microsoft Office', 'Networking', 'Hardware'],
  },
  {
    log: 'LOG_03',
    status: 'ONGOING',
    company: 'Personal Homelab',
    position: 'IT / Technical Projects',
    meta: 'github.com/Pratham123650',
    link: 'https://github.com/Pratham123650',
    bullets: [
      'Built and manage a Proxmox homelab with Ubuntu and Windows Server.',
      'Configured Active Directory, user accounts, and core network services.',
      'Run Pi-hole, WireGuard, and UniFi networking as always-on services.',
      'Explored Docker and Ansible for automation and server setup.',
    ],
    tools: ['Proxmox', 'Pi-hole', 'WireGuard', 'UniFi', 'Docker', 'Ansible'],
  },
  {
    log: 'LOG_02',
    status: 'COMPLETE',
    company: 'Wayne State University',
    position: 'Vice President — Video Game Development Club',
    meta: 'Leadership',
    bullets: [
      'Supported club initiatives, collaborated with members, and contributed to a creative, team-driven environment.',
      'Strengthened leadership, coordination, and working toward shared goals.',
    ],
    tools: ['Leadership', 'Coordination'],
  },
  {
    log: 'LOG_01',
    status: 'COMPLETE',
    company: 'Subway',
    position: 'Manager',
    meta: 'Operations',
    bullets: [
      'Helped oversee daily operations, supported team members, and ensured customers had a positive experience.',
      'Strengthened clear communication, quick problem-solving, and organization in a fast-paced environment.',
    ],
    tools: ['Operations', 'Communication'],
  },
]

/* --------------------------- Boot sequence ---------------------------- */
export const BOOT_LINES = [
  'INITIALIZING SYSTEM',
  'ESTABLISHING SECURE CONNECTION',
  'LOADING PROJECT NODES',
  'VERIFYING NETWORK',
  'ROUTING DATA',
  'CONNECTION ESTABLISHED',
]
