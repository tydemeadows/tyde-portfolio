// ─────────────────────────────────────────────────────────────────────────────
// resume-data.ts  —  Single source of truth for all page content
// Edit this file to update employers, skills, and categories everywhere at once
// ─────────────────────────────────────────────────────────────────────────────

export type SkillLevel = "expert" | "strong" | "capable";

export interface Employer {
  initials: string;
  logoBg: string;
  logoColor: string;
  accent: string;
  company: string;
  role: string;
  dates: string;
  duration: string;
  location?: string;
  badges: { label: string; variant: "current" | "founder" | "default" }[];
  desc: string;
  highlights: string[];
  skills: string[];
}

export interface SkillPill {
  icon: string;
  name: string;
  cat: string;
  level: SkillLevel;
}

export interface SkillCategory {
  name: string;
  color: string;
  tags: { name: string; level: SkillLevel }[];
}

// ── EMPLOYERS ────────────────────────────────────────────────────────────────

export const employers: Employer[] = [
  {
    initials: "PL",
    logoBg: "#0f1923",
    logoColor: "#ffffff",
    accent: "#1a56db",
    company: "Parry Labs",
    role: "Frontend Developer / Scrum Master",
    dates: "Feb 2023 – Present",
    duration: "3 yrs 4 mos",
    location: "",
    badges: [{ label: "● Current", variant: "current" }],
    desc: "Building modern frontend interfaces for defense and technology products. Serving as Scrum Master while leading system integration efforts and driving UX improvements across product lines.",
    highlights: [
      "Frontend development using React, Redux, and TypeScript on defense & tech products",
      "Scrum Master — facilitated sprint planning, daily standups, and retrospectives",
      "Managed team workflows and backlog grooming via Atlassian Jira and Confluence",
      "Coordinated system integration across cross-functional engineering teams",
      "Drove UX design improvements and design system consistency across interfaces",
    ],
    skills: ["React", "Redux.js", "TypeScript", "JavaScript", "Jira", "Scrum Master", "Atlassian", "Agile", "System Integration", "UX Design"],
  },
  {
    initials: "HF",
    logoBg: "#1a1035",
    logoColor: "#a78bfa",
    accent: "#7c3aed",
    company: "HiveFab",
    role: "Co-Founder",
    dates: "Jan 2024 – Present",
    duration: "2 yrs 5 mos",
    location: "",
    badges: [
      { label: "● Current", variant: "current" },
      { label: "Founder", variant: "founder" },
    ],
    desc: "Co-founded a Web3 / Decentralized Fabrication startup building a 3D printing marketplace on blockchain infrastructure. Leading API development, platform architecture, and smart contract design.",
    highlights: [
      "Co-founded startup in the Web3 / Decentralized Fabrication space",
      "Leading API development, web3 integrations, and full platform architecture",
      "Building smart contract infrastructure for decentralized manufacturing and order fulfillment",
      "Owning product direction, technical roadmap, and early customer development",
      "Integrating IPFS-based storage for decentralized asset management",
    ],
    skills: ["Web3.js", "API Development", "Solidity", "React", "Node.js", "IPFS", "Smart Contracts"],
  },
  {
    initials: "KS",
    logoBg: "#f0f4ff",
    logoColor: "#1a56db",
    accent: "#0ea5e9",
    company: "K Sciences",
    role: "Software Engineer · Project Lead · Program Manager",
    dates: "Feb 2017 – May 2023",
    duration: "6 yrs 4 mos",
    location: "Huntsville–Decatur–Albertville Area",
    badges: [],
    desc: "Full-time software engineering role that expanded into Project Lead and Program Manager responsibilities. Worked directly with government and commercial customers from proposal through product delivery and acceptance.",
    highlights: [
      "Acted as Project Lead and Program Manager across multiple concurrent engagements",
      "Worked directly with customers on proposal development, requirements gathering, and contract scoping",
      "Managed full product delivery lifecycle — design, development, delivery, and customer acceptance",
      "Authored formal acceptance test plans and coordinated delivery reviews with clients",
      "Built software applications and tools using Python and React for scientific and technical clients",
      "Bridged technical team and customer stakeholders as primary point of contact",
    ],
    skills: ["Python", "React.js", "JavaScript", "REST APIs", "SQL", "Program Management", "Proposal Writing", "Requirements Analysis", "Acceptance Testing"],
  },
  {
    initials: "FT",
    logoBg: "#002855",
    logoColor: "#00aeef",
    accent: "#00aeef",
    company: "FARO Technologies",
    role: "Account Manager (Outside Sales)",
    dates: "Dec 2014 – Jan 2017",
    duration: "2 yrs 2 mos",
    location: "",
    badges: [],
    desc: "Outside sales representative and subject matter expert in precision 3D measurement and metrology. Managed a full regional sales cycle from lead generation through deal closure for FARO's enterprise client base.",
    highlights: [
      "Outside sales rep covering a regional territory for FARO's precision measurement product line",
      "Subject matter expert in 3D measurement, scanning, and metrology solutions",
      "Built and managed a regional pipeline — prospecting, lead generation through deal closure",
      "Developed technical proposals and ROI-focused sales presentations for enterprise accounts",
      "Translated complex metrology technology into clear customer value propositions",
      "Achieved quota through trusted advisor relationships with manufacturing and engineering clients",
    ],
    skills: ["Technical Sales", "Lead Generation", "Proposal Writing", "Deal Closure", "Metrology", "3D Measurement", "Account Management", "Communication"],
  },
];

// ── SKILL MARQUEE ROWS ────────────────────────────────────────────────────────

export const skillRows: SkillPill[][] = [
  [
    { icon: "⚛️", name: "React",           cat: "Frontend",   level: "expert"  },
    { icon: "🟨", name: "JavaScript",      cat: "Language",   level: "expert"  },
    { icon: "🔵", name: "TypeScript",      cat: "Language",   level: "strong"  },
    { icon: "🐍", name: "Python",          cat: "Language",   level: "expert"  },
    { icon: "🔁", name: "Redux",           cat: "State Mgmt", level: "expert"  },
    { icon: "🏃", name: "Agile / Scrum",   cat: "Process",    level: "expert"  },
    { icon: "📋", name: "Jira",            cat: "Atlassian",  level: "expert"  },
    { icon: "📘", name: "Confluence",      cat: "Atlassian",  level: "expert"  },
    { icon: "🌐", name: "Web3.js",         cat: "Blockchain", level: "strong"  },
    { icon: "📡", name: "REST APIs",       cat: "API",        level: "expert"  },
    { icon: "🧱", name: "HTML",            cat: "Markup",     level: "expert"  },
    { icon: "🎨", name: "CSS",             cat: "Styling",    level: "expert"  },
  ],
  [
    { icon: "🌿", name: "TailwindCSS",     cat: "Styling",    level: "strong"  },
    { icon: "▲",  name: "Next.js",         cat: "Frontend",   level: "strong"  },
    { icon: "📦", name: "Node.js",         cat: "Backend",    level: "strong"  },
    { icon: "🔺", name: "GraphQL",         cat: "API",        level: "capable" },
    { icon: "🐳", name: "Docker",          cat: "DevOps",     level: "strong" },
    { icon: "🔧", name: "Git",             cat: "DevOps",     level: "strong"  },
    { icon: "🗄️", name: "PostgreSQL",      cat: "Database",   level: "strong"  },
    { icon: "🍃", name: "MongoDB",         cat: "Database",   level: "capable" },
    { icon: "🔗", name: "Solidity",        cat: "Blockchain", level: "strong"  },
    { icon: "🧠", name: "OpenAI API",      cat: "AI",         level: "strong"  },
    { icon: "🤖", name: "Claude API",      cat: "AI",         level: "strong"  },
    { icon: "🔬", name: "Jest",            cat: "Testing",    level: "capable" },
  ],
  [
    { icon: "🎨", name: "Figma",           cat: "Design",     level: "strong"  },
    { icon: "🔍", name: "UX Research",     cat: "Design",     level: "strong"  },
    { icon: "📐", name: "Metrology",       cat: "Hardware",   level: "expert"  },
    { icon: "🖨️", name: "3D Printing",     cat: "Hardware",   level: "strong"  },
    { icon: "📝", name: "Proposal Writing",cat: "Business",   level: "expert"  },
    { icon: "📊", name: "Program Mgmt",    cat: "Leadership", level: "expert"  },
    { icon: "🤝", name: "Requirements",    cat: "Process",    level: "strong"  },
    { icon: "☁️", name: "AWS",             cat: "Cloud",      level: "capable" },
    { icon: "📱", name: "React Native",    cat: "Mobile",     level: "capable" },
    { icon: "⛓️", name: "Smart Contracts", cat: "Blockchain", level: "strong"  },
    { icon: "🛡️", name: "OAuth / JWT",     cat: "Auth",       level: "capable" },
    { icon: "🌐", name: "IPFS",            cat: "Web3",       level: "capable" },
  ],
];

// ── SKILL CATEGORIES (bottom grid) ───────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  { name: "Frontend", color: "#1a56db", tags: [
    { name: "React",       level: "expert"  },
    { name: "Redux",       level: "expert"  },
    { name: "JavaScript",  level: "expert"  },
    { name: "TypeScript",  level: "strong"  },
    { name: "TailwindCSS", level: "strong"  },
    { name: "Next.js",     level: "strong"  },
    { name: "HTML / CSS",  level: "expert"  },
  ]},
  { name: "Agile & Process", color: "#059669", tags: [
    { name: "Scrum Master",    level: "expert" },
    { name: "Agile",           level: "expert" },
    { name: "Jira",            level: "expert" },
    { name: "Sprint Planning", level: "expert" },
    { name: "Confluence",      level: "strong" },
    { name: "Atlassian",       level: "strong" },
  ]},
  { name: "Languages", color: "#0ea5e9", tags: [
    { name: "JavaScript", level: "expert"  },
    { name: "TypeScript", level: "strong"  },
    { name: "Python",     level: "strong"  },
    { name: "Solidity",   level: "strong"  },
    { name: "HTML",       level: "expert"  },
    { name: "CSS",        level: "expert"  },
  ]},
  { name: "Web3 / DeFi", color: "#7c3aed", tags: [
    { name: "Web3.js",         level: "strong"  },
    { name: "Solidity",        level: "strong"  },
    { name: "Smart Contracts", level: "strong"  },
    { name: "IPFS",            level: "capable" },
    { name: "Ethereum",        level: "capable" },
  ]},
  { name: "Backend & APIs", color: "#0e7490", tags: [
    { name: "REST APIs",  level: "expert"  },
    { name: "Node.js",    level: "strong"  },
    { name: "Python",     level: "strong"  },
    { name: "GraphQL",    level: "capable" },
    { name: "PostgreSQL", level: "strong"  },
    { name: "MongoDB",    level: "capable" },
  ]},
  { name: "Leadership", color: "#c2410c", tags: [
    {name: "Project Lead",         level: "expert" },
    { name: "Program Mgmt",        level: "expert" },
    { name: "Proposal Writing",    level: "expert" },
    { name: "Requirements",        level: "strong" },
    { name: "Acceptance Planning", level: "strong" },
    { name: "Technical Sales",     level: "expert" },
    { name: "Lead Generation",     level: "expert" },
  ]},
  { name: "Design / UX", color: "#e05c2a", tags: [
    { name: "Figma",          level: "strong"  },
    { name: "UX Research",    level: "strong"  },
    { name: "Prototyping",    level: "capable" },
    { name: "Design Systems", level: "capable" },
  ]},
  { name: "Hardware & Other", color: "#854d0e", tags: [
    { name: "Metrology",   level: "expert"  },
    { name: "3D Printing", level: "strong"  },
    { name: "FARO",        level: "expert"  },
    { name: "Git",         level: "strong"  },
    { name: "Docker",      level: "capable" },
    { name: "AWS",         level: "capable" },
  ]},
];

// ── RESUME CONTEXT STRING (used by the AI matchmaker API route) ───────────────

export const RESUME_CONTEXT = `
CANDIDATE: Tyde M.
LOCATION: Huntsville–Decatur–Albertville, AL
LINKEDIN: linkedin.com/in/tyde-m-8a233215/

WORK EXPERIENCE:

1. Parry Labs — Frontend Developer / Scrum Master (Feb 2023–Present, 3 yrs 4 mos)
   - Frontend development using React, Redux, and TypeScript on defense & technology products
   - Scrum Master: facilitated sprint planning, daily standups, and retrospectives
   - Managed workflows and backlog grooming via Atlassian Jira and Confluence
   - Coordinated system integration across cross-functional engineering teams
   - Drove UX design improvements and design system consistency

2. HiveFab — Co-Founder (Jan 2024–Present, 2 yrs 5 mos)
   - Co-founded a Web3 / Decentralized Fabrication startup (3D printing marketplace)
   - Leading API development, web3 integrations, and full platform architecture
   - Building smart contract infrastructure for decentralized manufacturing (Solidity, Ethereum)
   - Integrating IPFS-based storage for decentralized asset management
   - Owning product direction, technical roadmap, and early customer development

3. K Sciences — Software Engineer / Project Lead / Program Manager (Feb 2017–May 2023, 6 yrs 4 mos)
   - Acted as Project Lead and Program Manager across multiple concurrent engagements
   - Worked with government and commercial customers on proposals, requirements, and contracts
   - Managed full product delivery lifecycle (design → development → delivery → acceptance)
   - Authored formal acceptance test plans and coordinated delivery reviews with clients
   - Built software applications using Python and React for scientific and technical clients

4. FARO Technologies — Account Manager / Outside Sales (Dec 2014–Jan 2017, 2 yrs 2 mos)
   - Outside sales covering a regional territory for precision 3D measurement products
   - Subject matter expert in 3D measurement, scanning, and metrology
   - Full sales pipeline: lead generation through deal closure
   - Developed technical proposals and ROI-focused presentations for enterprise accounts

TECHNICAL SKILLS (Expert): React, Redux, JavaScript, HTML, CSS, REST APIs, Jira, Agile/Scrum, Metrology, Proposal Writing, Program Management
TECHNICAL SKILLS (Strong): TypeScript, Python, Node.js, Next.js, TailwindCSS, Git, PostgreSQL, Web3.js, Solidity, Figma, UX Research, Confluence, Atlassian, Requirements Engineering, 3D Printing, OpenAI API, Claude API
TECHNICAL SKILLS (Capable): GraphQL, Docker, MongoDB, AWS, React Native, OAuth/JWT, IPFS, Jest, Webpack, Prototyping

SOFT SKILLS: Leadership, cross-functional collaboration, customer-facing communication, technical writing, team facilitation, agentic AI system building, startup execution
`;
