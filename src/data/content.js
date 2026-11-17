/* ------------------------------------------------------------------ */
/*  Centralized content — every section reads from here.               */
/*  All information is real. Do not add facts that are not verified.   */
/* ------------------------------------------------------------------ */

export const PROFILE = {
  name: 'Pratham Patel',
  domain: 'PRATHAM-PATEL.COM',
  title: 'Information Technology',
  tagline: 'Systems • Networking • Virtualization',
  role: 'Information Technology Student',
  school: 'Wayne State University',
  location: 'Taylor, MI',
  degree: 'Bachelor of Science in Information Technology',
  minor: 'Business Administration',
  educationPeriod: 'August 2024 - Present',
  gpa: '3.90',
  status: 'Seeking an IT internship',
  email: 'prathampatel102403@gmail.com',
  github: 'https://github.com/Pratham123650',
  githubLabel: 'github.com/Pratham123650',
  linkedin: 'https://www.linkedin.com/in/prathampatelit/',
  linkedinLabel: 'linkedin.com/in/prathampatelit',
  resume: '/resume.pdf',
  intro:
    'Detail-oriented Information Technology student with hands-on experience in systems administration, networking, Windows Server, Linux, and virtualization.',
  about1:
    "I'm an Information Technology student at Wayne State University with a minor in Business Administration. I built and manage a Proxmox VE home lab with Ubuntu Linux and Windows Server virtual machines, including Active Directory Domain Services, DNS, DHCP, and user account policies.",
  about2:
    'As an IT Intern at Edward Rose & Sons, I provided first-level support and worked with Active Directory, Group Policy, Patch My PC, Microsoft Intune, and SCCM. I also manage daily operations at Subway and previously helped users restore account access through V2 Soft.',
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
    tech: ['Windows 10/11', 'Windows Server', 'Linux (Ubuntu, Kali)', 'Docker', 'Proxmox'],
    usage:
      'I work with Windows 10/11, Windows Server, Linux distributions including Ubuntu and Kali, Docker, and Proxmox.',
  },
  {
    id: 'networking',
    label: 'Networking',
    x: 80, y: 18,
    tech: ['TCP/IP', 'DHCP', 'DNS', 'NAT', 'Subnetting'],
    usage:
      'My networking skills include TCP/IP, DHCP, DNS, NAT, and subnetting, with DNS and DHCP configured in my Windows Server home lab.',
  },
  {
    id: 'enterprise',
    label: 'Enterprise IT',
    x: 90, y: 60,
    tech: ['Active Directory', 'Group Policy', 'Patch My PC', 'Microsoft Intune', 'SCCM'],
    usage:
      'At Edward Rose & Sons, I supported endpoint configuration and device management using Active Directory, Group Policy, Patch My PC, Microsoft Intune, and SCCM.',
  },
  {
    id: 'scripting',
    label: 'Scripting',
    x: 68, y: 88,
    tech: ['Python', 'C', 'Java', 'C++', 'HTML', 'CSS'],
    usage:
      'My programming background includes basic Python scripting, C coursework, introductory Java and C++, and HTML and CSS.',
  },
  {
    id: 'database',
    label: 'Database',
    x: 28, y: 88,
    tech: ['MySQL'],
    usage:
      'I studied MySQL as part of my Computer Science coursework at Henry Ford Community College.',
  },
  {
    id: 'support',
    label: 'IT Support',
    x: 9, y: 58,
    tech: ['Technical Support', 'Hardware', 'Software', 'Account Support', 'Peripherals', 'Support Tickets'],
    usage:
      'I provided first-level technical support for hardware, software, account, and peripheral issues while troubleshooting user problems and resolving support tickets.',
  },
]

/* ------------------------------ Homelab ------------------------------ */
export const HOMELAB_DEVICES = [
  {
    id: 'proxmox',
    unit: 'U1',
    label: 'Proxmox VE Host',
    kind: 'Virtualization platform',
    leds: 6,
    what: 'The Proxmox VE environment hosts and manages the lab virtual machines.',
    why: 'The home lab was built to simulate enterprise IT environments.',
    learned: 'Virtualization, system administration, server management, and technical troubleshooting.',
    tech: ['Proxmox', 'Virtualization'],
  },
  {
    id: 'vms',
    unit: 'U2',
    label: 'Virtual Machines',
    kind: 'Ubuntu Linux / Windows Server',
    leds: 4,
    what: 'Multiple Ubuntu Linux and Windows Server virtual machines run inside the Proxmox VE lab.',
    why: 'The virtual machines provide a hands-on environment for systems administration and server management.',
    learned: 'Linux, Windows Server, network configuration, and virtual machine management.',
    tech: ['Ubuntu Linux', 'Windows Server'],
  },
  {
    id: 'windows-server',
    unit: 'U3',
    label: 'Windows Server',
    kind: 'Server administration',
    leds: 3,
    what: 'Windows Server virtual machines provide the environment for directory and network services.',
    why: 'The lab applies Windows Server administration in a simulated enterprise environment.',
    learned: 'Windows Server administration, endpoint policies, and technical troubleshooting.',
    tech: ['Windows Server', 'Systems Administration'],
  },
  {
    id: 'directory-services',
    unit: 'U4',
    label: 'Active Directory',
    kind: 'AD DS / user policies',
    leds: 3,
    what: 'Active Directory Domain Services and user account policies are configured in the Windows Server environment.',
    why: 'Directory services support the lab\'s enterprise IT simulation.',
    learned: 'Active Directory Domain Services and user account policy configuration.',
    tech: ['Active Directory', 'AD DS', 'User Account Policies'],
  },
  {
    id: 'network-services',
    unit: 'U5',
    label: 'DNS / DHCP',
    kind: 'Network services',
    leds: 2,
    what: 'DNS and DHCP are configured within the Windows Server lab environment.',
    why: 'These services support the network configuration used by the home lab.',
    learned: 'DNS, DHCP, and network configuration in Windows Server.',
    tech: ['DNS', 'DHCP', 'Networking'],
  },
]

/* ------------------------------ Projects ------------------------------ */
export const PROJECT_FILTERS = ['All', 'Homelab']

export const PROJECTS = [
  {
    id: 'homelab',
    instance: 'INSTANCE_01',
    category: 'Homelab',
    featured: true,
    title: 'Home Virtualization Lab (Proxmox)',
    desc: 'A Proxmox VE home lab that hosts and manages Ubuntu Linux and Windows Server virtual machines while simulating an enterprise IT environment.',
    challenge: 'Building one environment for multiple virtual machines, server services, and network configuration.',
    learned: 'Applied virtualization, system administration, server management, network configuration, Linux, Windows Server, and technical troubleshooting skills.',
    tags: ['Proxmox', 'Ubuntu Linux', 'Windows Server', 'Active Directory', 'DNS', 'DHCP'],
    technologies: [
      'Proxmox', 'Virtualization', 'Ubuntu Linux', 'Windows Server',
      'Active Directory', 'AD DS', 'DNS', 'DHCP', 'User Account Policies',
      'Systems Administration', 'Network Configuration', 'Technical Troubleshooting',
    ],
    overview:
      'A home virtualization lab built with Proxmox VE to host and manage multiple virtual machines, including Ubuntu Linux and Windows Server.',
    goal:
      'Simulate an enterprise IT environment while applying systems administration, networking, virtualization, and troubleshooting skills.',
    implementation: [
      'Designed a home lab using Proxmox VE to host and manage multiple virtual machines, including Ubuntu Linux and Windows Server.',
      'Configured Active Directory Domain Services, DNS, DHCP, and user account policies in a Windows Server environment.',
      'Applied virtualization, system administration, server management, network configuration, Linux, Windows Server, and technical troubleshooting skills.',
    ],
    challenges: [
      'Built the environment to support multiple virtual machines and Windows Server services in one home lab.',
    ],
    solutions: [
      'Used Proxmox VE to host and manage Ubuntu Linux and Windows Server virtual machines.',
      'Configured AD DS, DNS, DHCP, and user account policies in the Windows Server environment.',
    ],
    lessons: [
      'Virtualization and virtual machine management with Proxmox VE.',
      'Windows Server administration with AD DS, DNS, DHCP, and user account policies.',
      'Linux, network configuration, server management, and technical troubleshooting.',
    ],
    evidence: [
      { id: 'proxmox-dashboard', title: 'Proxmox VE environment', caption: 'Virtual machine host and management', description: 'Add a sanitized view of the Proxmox VE environment without exposing hostnames, addresses, storage details, or user information.', technology: 'Proxmox' },
      { id: 'windows-server', title: 'Windows Server services', caption: 'AD DS and user account policies', description: 'Add a sanitized view of the Windows Server lab showing Active Directory Domain Services or user account policy configuration.', technology: 'Windows Server' },
      { id: 'network-services', title: 'DNS and DHCP configuration', caption: 'Windows Server network services', description: 'Add a sanitized view demonstrating DNS or DHCP configuration without exposing addresses, domains, credentials, or identifiers.', technology: 'Networking' },
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
    meta: 'June 2026 - August 2026',
    bullets: [
      'Provided first-level technical support for hardware, software, account, and peripheral issues, troubleshooting user problems and resolving support tickets.',
      'Supported enterprise IT operations using Active Directory, Group Policy, and Patch My PC to troubleshoot user issues, maintain endpoint configurations, and keep devices updated and functional.',
      'Assisted with mobile device management using Microsoft Intune, including device enrollment, configuration, and remote wipes for secure deployment and retirement.',
      'Imaged, configured, and deployed Windows devices using SCCM while maintaining accurate asset records.',
    ],
    areas: [
      {
        label: 'First-level support',
        details: [
          'Provided support for hardware, software, account, and peripheral issues while resolving support tickets.',
        ],
      },
      {
        label: 'Endpoint operations',
        details: ['Used Active Directory, Group Policy, and Patch My PC to troubleshoot issues and maintain endpoint configurations.'],
      },
      {
        label: 'Device management',
        details: ['Supported Intune enrollment, configuration, and remote wipes, and deployed Windows devices with SCCM.'],
      },
    ],
    tools: ['Technical Support', 'Hardware', 'Software', 'Account Support', 'Peripherals', 'Support Tickets', 'Active Directory', 'Group Policy', 'Patch My PC', 'Microsoft Intune', 'SCCM', 'Windows 10/11', 'Asset Management'],
  },
  {
    log: 'LOG_03',
    status: 'ACTIVE',
    company: 'Subway',
    position: 'Manager',
    meta: 'May 2019 - Present',
    bullets: [
      'Lead employee training and daily operations, helping new team members adapt to their roles while maintaining service standards and efficient store operations.',
      'Maintain accuracy in cash handling and inventory management to support smooth daily operations.',
    ],
    tools: ['Employee Training', 'Daily Operations', 'Cash Handling', 'Inventory Management'],
  },
  {
    log: 'LOG_02',
    status: 'COMPLETE',
    company: 'V2 Soft',
    position: 'IT Helpdesk Support',
    meta: 'January 2022',
    bullets: [
      'Provided technical support to users experiencing account access issues following a data breach affecting Flagstar Bank.',
      'Assisted with password resets and account recovery to restore user access.',
    ],
    tools: ['Technical Support', 'Account Support', 'Password Resets', 'Account Recovery'],
  },
  {
    log: 'LOG_01',
    status: 'ACTIVE',
    company: 'Wayne State University',
    position: 'Vice President - Video Game Development Club',
    meta: 'Student leadership',
    bullets: [
      'Coordinate club meetings and collaborative activities related to game design and development.',
    ],
    tools: ['Leadership', 'Coordination'],
  },
]

/* ----------------------- Education / current work ----------------------- */
export const EDUCATION = [
  {
    status: 'ENROLLED',
    school: PROFILE.school,
    degree: PROFILE.degree,
    minor: PROFILE.minor,
    gpa: PROFILE.gpa,
    period: PROFILE.educationPeriod,
    location: 'Detroit, MI',
    coursework: 'Systems Administration; Human-Computer Interaction; Computer Network and Systems (in progress); IT Software Management (in progress); Principals of Cyber Security (in progress); Cisco Certified Network Associate (CCNA) - in progress',
  },
  {
    status: 'COMPLETED',
    school: 'Henry Ford Community College',
    degree: 'Associate of Science, Computer Science',
    period: 'August 2021 - May 2024',
    location: 'Dearborn, MI',
    coursework: 'MySQL, Python, C, HTML, CSS',
  },
]

export const CURRENTLY_BUILDING = [
  {
    title: 'Home virtualization lab',
    detail: 'Managing Proxmox VE virtual machines with Ubuntu Linux, Windows Server, AD DS, DNS, DHCP, and user account policies.',
    technologies: ['Proxmox', 'Windows Server', 'Ubuntu Linux'],
  },
  {
    title: 'Coursework in progress',
    detail: 'Computer Network and Systems, IT Software Management, Principles of Cyber Security, and CCNA coursework.',
    technologies: ['Networking', 'IT Software Management', 'Cyber Security', 'CCNA'],
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
