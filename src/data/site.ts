/**
 * Central site configuration.
 * Empty values render as an "unavailable" state — links are never fabricated.
 */
export const site = {
  name: 'Sanjay O. Upadhyay',
  location: 'Mumbai, India',
  status: 'Computer Engineering • Full-Stack Development • Mumbai, India',
  nav: [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],
  email: 'sanjayouwork@gmail.com',
  linkedin: 'https://www.linkedin.com/in/sanjay-upadhyay-1b87483b4',
  github: 'https://github.com/SANJAY-O-U',
  resume: '/Sanjay_O_Upadhyay_Resume.pdf',
}

export const credibility = [
  { value: 9.34, decimals: 2, suffix: '', label: 'CGPA' },
  { text: 'First Year', sub: 'College Topper' },
  { text: 'SIH 2026', sub: 'Team Lead' },
  { value: 249, decimals: 0, suffix: '/249', label: 'Relay backend tests' },
  { value: 229, decimals: 0, suffix: '', label: 'NER-SMART backend tests' },
] as const

export const surfaces = [
  { key: 'web', label: 'Web' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend' },
  { key: 'ai', label: 'AI' },
  { key: 'gis', label: 'GIS' },
  { key: 'data', label: 'Data' },
  { key: 'db', label: 'Databases' },
]

export const process = [
  { n: '01', title: 'Understand', body: 'Map the domain, the actors and the failure modes before touching code.' },
  { n: '02', title: 'Design', body: 'Settle the data model, API surface and workflow boundaries.' },
  { n: '03', title: 'Build', body: 'Ship the smallest reliable version end to end.' },
  { n: '04', title: 'Test', body: 'Validate behaviour with automated backend tests.' },
  { n: '05', title: 'Iterate', body: 'Refine from what the running system shows.' },
]

export const processExamples = [
  { project: 'Relay Trucking', path: ['Architecture', 'APIs', 'Workflows', 'Validation'] },
  { project: 'NER-SMART', path: ['Domain problem', 'Risk engine', 'Routing', 'Dashboard', 'Field app'] },
  { project: 'Society Ledger', path: ['Requirements', 'Backend', 'Authentication', 'Payments', 'Mobile experience'] },
]

export const building = [
  { title: 'Relay Trucking', body: 'Turning complex backend workflows into a production-ready driver experience.' },
  { title: 'CropCast AI', body: 'Exploring climate data, geospatial intelligence and agricultural decision support.' },
  { title: 'Society Ledger', body: 'Building a mobile platform for society operations.' },
  { title: 'Career', body: 'Preparing for software engineering internships.' },
]

export const experience = {
  company: 'CODTECH IT Solutions Pvt. Ltd.',
  role: 'MERN Stack Web Development Intern',
  period: 'Jun 2026 — Jul 2026',
  duration: '4-week internship',
  bullets: [
    'Built MERN application features with React, Node.js, Express and MongoDB.',
    'Implemented REST API integration and database-backed workflows with modular frontend and backend components.',
    'Used Git/GitHub for version control and structured feature development.',
  ],
}

export const education = {
  cgpa: '9.34',
  badge: 'First-Year College Topper',
  degree: 'B.E./B.Tech. Computer Engineering',
  school: 'Terna Engineering College',
  university: 'University of Mumbai',
  years: '2023–2027',
  earlier: [
    'HSC — Mahila Samati Junior College — 2023 | 92.83%',
    'SSC — N.E.S. High School, Bhandup — 2021 | 95%',
  ],
}

export const leadership = [
  { title: 'Team Leader since First Year', body: 'Coordinating project teams, development responsibilities and delivery.' },
  { title: 'Current Team Lead', body: 'Ctrl_Alt_Elite — Smart India Hackathon 2026' },
  { title: '5-member team', body: 'Leading development of NER-SMART.' },
]
