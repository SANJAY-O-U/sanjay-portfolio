export type CaseTab = { label: string; body: string; points?: string[] }

export type Project = {
  id: string
  index: string
  title: string
  subtitle: string
  badge?: string
  meta?: string[]
  description: string
  /** Honest project-state note shown under the description */
  status?: string
  stack: string[]
  highlights: { value?: number; suffix?: string; label: string }[]
  flowLabel?: string
  flow?: string[]
  features?: string[]
  variant: 'hero' | 'wide' | 'half' | 'compact'
  visual: 'relay' | 'map' | 'crop' | 'ledger' | 'generation' | 'none'
  case?: CaseTab[]
  /** Verified URLs only. Leave undefined until a real URL exists — never fabricate. */
  repo?: string
  demo?: string
}

export const projects: Project[] = [
  {
    id: 'relay-trucking',
    index: '01',
    title: 'Relay Trucking',
    subtitle: 'Driver Relay & Custody Management Platform',
    description:
      'A full-stack logistics platform designed to coordinate truck relays, driver matching and secure custody handovers across operational boundaries.',
    status: 'Backend validated · frontend-to-backend integration in progress',
    stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    highlights: [{ value: 249, suffix: '/249', label: 'automated backend tests · Phase G' }],
    flowLabel: 'Relay workflow',
    flow: ['Driver', 'Load', 'Relay Radar', 'Candidate Match', 'Proposal', 'Handover', 'Custody Confirmation'],
    features: [
      'Authentication',
      'Fleet / load management',
      'Geolocation',
      'Relay points',
      'Matching / proposals',
      'Two-party custody exchange',
      'ETA',
      'Geofence / proximity logic',
    ],
    variant: 'hero',
    visual: 'relay',
    case: [
      {
        label: 'Problem',
        body: 'Trucking operations require coordinated relay, matching and custody workflows: finding the right driver, agreeing a handover point and keeping custody of the load unambiguous throughout.',
      },
      {
        label: 'Architecture',
        body: 'A React + Vite client over an Express REST API backed by MongoDB. A driver and a load enter Relay Radar, candidates are matched, a proposal is made, and the handover ends in a confirmed custody exchange. Driver Dashboard, Relay Radar and Handover interfaces are built on top.',
      },
      {
        label: 'Engineering',
        body: 'Focused capabilities carry the workflow.',
        points: [
          'Authentication',
          'Fleet / load management',
          'Geolocation and relay points',
          'Matching and proposals',
          'Two-party custody exchange',
          'ETA',
          'Geofence / proximity logic',
        ],
      },
      {
        label: 'Validation',
        body: '249/249 automated backend tests passing in the latest Phase G validation. Frontend-to-backend integration was still in progress at the latest project state.',
      },
    ],
  },
  {
    id: 'ner-smart',
    index: '02',
    title: 'NER-SMART',
    subtitle: 'Route Intelligence & Resilience Platform',
    badge: 'Smart India Hackathon 2026',
    meta: ['Team Lead', '5-member team'],
    description:
      'Disaster-aware logistics intelligence connecting field incidents, road conditions and disaster alerts to route accessibility, risk scoring and operational alerts.',
    stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Flutter', 'Leaflet', 'OpenStreetMap'],
    highlights: [{ value: 229, label: 'automated backend tests passing' }],
    flowLabel: 'Incident to action',
    flow: ['Field Incident', 'Risk / Accessibility', 'Road Network', 'Routing', 'Alert', 'Authority Action'],
    variant: 'wide',
    visual: 'map',
    repo: 'https://github.com/SANJAY-O-U/NER-SMART',
    demo: 'https://ner-smart-puce.vercel.app/',
    case: [
      {
        label: 'Problem',
        body: 'Field incidents, road conditions and disaster alerts live in different places. Logistics teams need them folded into one view of which routes are accessible.',
      },
      {
        label: 'Engineering',
        body: 'Deterministic, explainable logic — not a machine-learning model.',
        points: [
          'Deterministic risk scoring',
          'Cargo-aware, graph-based routing over the road network',
          'REST APIs and MongoDB services',
          'React GIS dashboard (Leaflet + OpenStreetMap) and Flutter field app',
        ],
      },
      {
        label: 'Validation',
        body: 'Backend validation recorded 229 automated tests passing. Built as an SIH 2026 team project.',
      },
    ],
  },
  {
    id: 'cropcast-ai',
    index: '03',
    title: 'CropCast AI',
    subtitle: 'AI-Powered Crop Intelligence & Weather Data Platform',
    description:
      'A crop-intelligence project that pairs leaf-image disease detection with a weather layer: block-level forecasts downscaled to village points on a map, backed by an ERA5-Land reanalysis data pipeline.',
    status: 'Elevation-based baseline downscaling · trained weather model not built yet',
    stack: ['React', 'Vite', 'Leaflet', 'Python', 'FastAPI', 'PyTorch', 'YOLOv8', 'ERA5-Land', 'Open-Meteo'],
    highlights: [
      { label: 'ERA5-Land pipeline' },
      { label: 'Weather map' },
      { label: 'Leaf disease detection' },
      { label: 'Grad-CAM explanations' },
    ],
    flowLabel: 'Data pipeline',
    flow: ['ERA5-Land acquisition', 'Normalization', 'Weather variables', 'Spatial visualization', 'Crop intelligence'],
    variant: 'wide',
    visual: 'crop',
    repo: 'https://github.com/SANJAY-O-U/crop-ai-app',
    demo: 'https://crop-ai-app.vercel.app/',
    case: [
      {
        label: 'Problem',
        body: 'Agricultural decisions are strongly affected by localized weather and environmental conditions, but raw climate data is difficult to interpret spatially.',
      },
      {
        label: 'Engineering',
        body: 'Research pipeline and application layer, kept honest about what is built.',
        points: [
          'ERA5-Land acquisition and normalization, including deaccumulation of accumulated precipitation',
          'Rainfall, temperature, humidity and wind per point',
          'Block forecast downscaled to village points with an elevation baseline (lapse-rate temperature; rainfall, humidity and wind use uncalibrated heuristics)',
          'Leaflet weather map',
          'Leaf-image disease classification (ResNet18) with YOLOv8 leaf detection and Grad-CAM',
        ],
      },
      {
        label: 'Validation',
        body: 'Pilot data normalization validation: 72 timesteps, 5 weather variables, 359 rows per point and 0 NaN values. This is a data-pipeline check, not an application KPI. No weather-model or classifier accuracy is claimed.',
      },
    ],
  },
  {
    id: 'society-ledger',
    index: '04',
    title: 'Society Ledger',
    subtitle: 'Smart Housing Society Management Platform',
    description:
      'An end-to-end Flutter platform for role-based administration, maintenance billing, ledger transactions, complaints, events and inventory/documents.',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Node.js', 'Express', 'MongoDB', 'Firebase', 'Razorpay'],
    highlights: [
      { label: 'JWT authentication' },
      { label: 'Firebase Phone Auth' },
      { label: 'Razorpay payments' },
      { label: 'FCM notifications' },
      { label: 'PDF receipts & statements' },
    ],
    features: ['Members', 'Maintenance', 'Ledger', 'Payments', 'Complaints', 'Events', 'Inventory', 'Notifications'],
    variant: 'half',
    visual: 'ledger',
    repo: 'https://github.com/SANJAY-O-U/society-ledger',
    case: [
      {
        label: 'Scope',
        body: 'Society operations — maintenance billing, ledger transactions, complaints, events and inventory/documents — behind role-based administration.',
      },
      {
        label: 'Engineering',
        body: 'A Flutter app (Riverpod) backed by an Express + MongoDB API.',
        points: [
          'Firebase Phone Auth and JWT authentication',
          'Razorpay payments',
          'FCM notifications',
          'PDF receipts and statements',
        ],
      },
    ],
  },
  {
    id: 'ai-content-generator',
    index: '05',
    title: 'AI Content Generator',
    subtitle: 'Authenticated AI Content Platform',
    description:
      'An authenticated content-generation application built on the hosted Gemini API, with persistent generation history and MongoDB-backed CRUD workflows.',
    stack: ['React', 'Vite', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Gemini API', 'JWT', 'bcrypt'],
    highlights: [{ label: 'Gemini API integration' }, { label: 'Authentication' }, { label: 'Persistent history' }, { label: 'CRUD' }],
    flowLabel: 'Generation flow',
    flow: ['Prompt', 'JWT Auth', 'Gemini API', 'MongoDB', 'History'],
    variant: 'half',
    visual: 'generation',
    repo: 'https://github.com/SANJAY-O-U/AI-Content-Generator',
    case: [
      {
        label: 'Overview',
        body: 'Authenticated users generate content through the Gemini API and keep a persistent history they can manage.',
      },
      {
        label: 'Engineering',
        body: 'A React client over modular Express REST services and MongoDB.',
        points: ['JWT authentication with bcrypt password hashing', 'Gemini API integration', 'Persistent generation history', 'MongoDB-backed CRUD'],
      },
    ],
  },
  {
    id: 'company-hr-erp',
    index: '06',
    title: 'Company HR ERP',
    subtitle: 'Database & REST API System',
    description:
      'Normalized relational models for employees, departments, projects, dependents and role-based access, with SQL logic behind a Flask REST API.',
    stack: ['MySQL', 'Flask', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    highlights: [],
    features: ['Relational modeling', 'Role-based access', 'Stored procedures', 'Functions', 'Triggers', 'Views', 'REST API'],
    variant: 'compact',
    visual: 'none',
  },
]
