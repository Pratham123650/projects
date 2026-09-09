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
  location: 'Detroit Metro Area, Michigan',
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
  /* Add /public/resume.pdf, then set this to '/resume.pdf' to show résumé actions. */
  resume: null,
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
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

/* ------------------------------- Skills ------------------------------- */
/* x/y are % coordinates inside the network map canvas.                   */
export const SKILL_CATEGORIES = [
  {
    id: 'systems',
    label: 'Systems',
    x: 20, y: 20,
    tech: ['Windows Server', 'Active Directory', 'Linux', 'Proxmox'],
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
    tech: ['Docker', 'Ansible'],
    usage:
      'I have explored Docker and Ansible for automation and repeatable server setup in my homelab.',
  },
  {
    id: 'development',
    label: 'Development',
    x: 28, y: 88,
    tech: ['Java', 'JavaFX', 'MySQL'],
    usage:
      'I built course-based Java applications involving data structures, file handling, and JavaFX interfaces, and configured MySQL in systems labs.',
  },
  {
    id: 'hardware',
    label: 'Hardware',
    x: 9, y: 58,
    tech: ['Hardware', 'Device Deployment', 'Troubleshooting'],
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
    technologies: [
      'Proxmox', 'Linux', 'Ubuntu', 'Windows Server', 'Active Directory',
      'AD Access Control', 'TCP/IP', 'DNS', 'DHCP', 'UniFi', 'Pi-hole',
      'WireGuard', 'Docker', 'Ansible', 'Hardware',
    ],
    overview:
      'An always-on home lab built around a Proxmox host, managed UniFi networking, Ubuntu and Windows Server virtual machines, and core network services.',
    goal:
      'Create a safe environment for building, breaking, and rebuilding infrastructure while learning how virtualization, operating systems, identity, DNS, remote access, and networking work together.',
    implementation: [
      'Built and continue to manage the physical host and Proxmox virtualization environment.',
      'Run Ubuntu and Windows Server guests for systems administration practice.',
      'Configured Active Directory, user accounts, DNS, DHCP, and other core network services.',
      'Run Pi-hole for network-wide DNS filtering, WireGuard for secure remote access, and UniFi for managed networking.',
      'Explored Docker and Ansible for containerized services and repeatable server setup.',
    ],
    challenges: [
      'Coordinating multiple operating systems, services, and network settings on one host.',
      'Understanding service dependencies when DNS, routing, authentication, or a guest system is unavailable.',
    ],
    solutions: [
      'Used the lab as a controlled environment to isolate layers, verify dependencies, and rebuild systems safely.',
      'Detailed troubleshooting record pending — add a real incident, diagnostic steps, and resolution here.',
    ],
    lessons: [
      'How physical hardware becomes virtual infrastructure through a hypervisor.',
      'How DNS, routing, remote access, identity, and server administration affect one another.',
      'Why recoverability and methodical troubleshooting matter in an always-on environment.',
    ],
    evidence: [
      { id: 'proxmox-dashboard', title: 'Proxmox dashboard', caption: 'Host and guest overview', description: 'Add a sanitized dashboard capture showing the Proxmox host and virtual guests. Hide hostnames, addresses, storage details, and user information.', technology: 'Proxmox' },
      { id: 'unifi-dashboard', title: 'UniFi dashboard', caption: 'Managed network overview', description: 'Add a sanitized view that demonstrates gateway or switching management without exposing device names, addresses, or location details.', technology: 'UniFi' },
      { id: 'active-directory', title: 'Active Directory', caption: 'Identity and account administration', description: 'Add a sanitized view of the lab directory structure or administration console. Remove names, domains, and identifiers.', technology: 'Active Directory' },
      { id: 'pihole', title: 'Pi-hole dashboard', caption: 'DNS filtering in operation', description: 'Add a sanitized dashboard capture that demonstrates DNS filtering. Remove client addresses, domains, and query details.', technology: 'Pi-hole' },
      { id: 'automation', title: 'Automation workspace', caption: 'Docker or Ansible evidence', description: 'Add a terminal or configuration screenshot showing a real Docker or Ansible task after removing secrets, paths, hostnames, and inventory details.', technology: 'Automation' },
    ],
    links: [{ label: 'GitHub profile', href: 'https://github.com/Pratham123650' }],
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
    technologies: ['Java', 'JavaFX', 'Data Structures', 'File Handling'],
    overview:
      'A group of course-based Java applications focused on data structures, file handling, and practical desktop interfaces.',
    goal:
      'Turn classroom programming concepts into working applications with understandable structure and usable interfaces.',
    implementation: [
      'Built Java applications that organize data, read and write files, and present functionality through JavaFX interfaces.',
      'Applied program design and data-structure choices to practical course assignments.',
    ],
    challenges: ['Choosing structures that keep application data and file operations understandable.'],
    solutions: ['Detailed troubleshooting record pending — add a real bug, investigation, and fix here.'],
    lessons: ['Program structure, data handling, and the process of moving from a requirement to a working interface.'],
    evidence: [
      { id: 'java-ui', title: 'JavaFX application', caption: 'Working application interface', description: 'Add a screenshot of a completed JavaFX interface and note which requirement or workflow it demonstrates.', technology: 'JavaFX' },
      { id: 'java-code', title: 'Data and file handling', caption: 'Implementation evidence', description: 'Add a focused, readable code or output capture that demonstrates a real data-structure or file-handling decision.', technology: 'Java' },
    ],
    links: [
      { label: 'Library application', href: 'https://github.com/Pratham123650/Library-Management-Application' },
      { label: 'Text file analyzer', href: 'https://github.com/Pratham123650/Text-File-Analyzer' },
    ],
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
    technologies: ['Networking', 'Windows Server', 'Active Directory', 'DNS', 'DHCP', 'Apache', 'MySQL'],
    overview:
      'Hands-on systems administration labs configuring DNS, DHCP, Active Directory, Apache, and MySQL.',
    goal:
      'Practice configuring the core services that allow systems to resolve names, receive network settings, authenticate users, and host applications.',
    implementation: [
      'Configured DNS and DHCP services in lab environments.',
      'Configured Active Directory and Windows Server components.',
      'Worked with Apache and MySQL as supporting application services.',
    ],
    challenges: ['Making interdependent services resolve, route, and authenticate correctly together.'],
    solutions: ['Detailed troubleshooting record pending — add a verified lab issue, checks performed, and resolution here.'],
    lessons: ['How core network and identity services support the applications and users that depend on them.'],
    evidence: [
      { id: 'systems-services', title: 'Systems lab services', caption: 'DNS, DHCP, or Active Directory configuration', description: 'Add a sanitized lab screenshot that shows a completed service configuration and explain what was verified.', technology: 'Windows Server' },
      { id: 'web-database', title: 'Apache / MySQL lab', caption: 'Application service configuration', description: 'Add a screenshot or terminal output that demonstrates the configured service without exposing credentials or host details.', technology: 'MySQL' },
    ],
    links: [{ label: 'GitHub profile', href: 'https://github.com/Pratham123650' }],
  },
]

/* ----------------------------- Experience ----------------------------- */
export const EXPERIENCE = [
  {
    log: 'LOG_04',
    status: 'COMPLETE',
    company: 'Edward Rose & Sons',
    position: 'IT Intern',
    meta: 'Bloomfield, MI · Jun — Aug 2026',
    bullets: [
      'Troubleshot hardware and mobile devices and determined when equipment required replacement.',
      'Installed and replaced hardware on company equipment and kept software and applications up to date.',
      'Assisted with system migration and networking projects.',
      'Supported the enterprise support team with data gathering and report analysis.',
    ],
    areas: [
      {
        label: 'End-user & device support',
        details: [
          'Troubleshot hardware and mobile devices and determined when equipment required replacement.',
          'Installed and replaced hardware on company equipment and kept software and applications up to date.',
        ],
      },
      {
        label: 'Infrastructure project exposure',
        details: ['Assisted with system migration and networking projects.'],
      },
      {
        label: 'Enterprise support & reporting',
        details: ['Supported the enterprise support team with data gathering and report analysis.'],
      },
    ],
    tools: ['Windows', 'iOS', 'Microsoft Office', 'Networking', 'Hardware', 'Device Deployment', 'Troubleshooting'],
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
    tools: ['Proxmox', 'Linux', 'Ubuntu', 'Windows Server', 'Active Directory', 'AD Access Control', 'TCP/IP', 'DNS', 'DHCP', 'Pi-hole', 'WireGuard', 'UniFi', 'Docker', 'Ansible'],
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

/* ----------------------- Education / current work ----------------------- */
export const EDUCATION = {
  school: PROFILE.school,
  degree: PROFILE.degree,
  minor: PROFILE.minor,
  gpa: PROFILE.gpa,
  graduation: PROFILE.graduation,
  location: 'Detroit, Michigan',
}

export const CURRENTLY_BUILDING = [
  {
    title: 'Home lab operations',
    detail: 'Managing the Proxmox environment and its networking, identity, DNS, and remote-access services.',
    technologies: ['Proxmox', 'Networking', 'Systems'],
  },
  {
    title: 'Infrastructure automation',
    detail: 'Exploring Docker and Ansible for containerized services and repeatable server setup.',
    technologies: ['Docker', 'Ansible'],
  },
]

/* Keep this empty until a completed certification is explicitly added. */
export const CERTIFICATIONS = []

const normalized = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '')

export function getSkillEvidence(skill) {
  const key = normalized(skill)
  const projectEvidence = PROJECTS.filter((project) =>
    project.technologies.some((technology) => normalized(technology) === key),
  ).map((project) => ({
    type: 'Project',
    label: project.title,
    href: `#/projects/${project.id}`,
  }))

  const experienceEvidence = EXPERIENCE.filter((entry) =>
    entry.tools.some((tool) => normalized(tool) === key),
  ).map((entry) => ({
    type: 'Experience',
    label: entry.company,
    href: '#experience',
  }))

  return [...projectEvidence, ...experienceEvidence]
}

/* --------------------------- Boot sequence ---------------------------- */
export const BOOT_LINES = [
  'INITIALIZING SYSTEM',
  'ESTABLISHING SECURE CONNECTION',
  'LOADING PROJECT NODES',
  'VERIFYING NETWORK',
  'ROUTING DATA',
  'CONNECTION ESTABLISHED',
]
