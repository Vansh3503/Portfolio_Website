// Centralized project list — used by Home preview + /work page
export const PROJECTS = [
  {
    slug: "ai-studio",
    title: "AI Studio — Enterprise AI Platform",
    company: "eInfoChips",
    year: "2024 – Present",
    link: "https://www.einfochips.com/ai-studio/",
    summary:
      "14-microservice platform on FastAPI with event-driven communication via RabbitMQ and REST, backed by PostgreSQL, PgVector, and Redis. Features RAG pipeline, multi-agent chat system with 20+ specialized LLM agents, and AI-driven test automation across web, desktop, and mobile.",
    impact: "Productized as NomAIzo™ · ~60% accuracy",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "PgVector",
      "Redis",
      "RabbitMQ",
      "Agno",
      "Playwright",
      "Appium",
      "Docker",
      "AKS",
      "Helm",
      "Liquibase",
      "Azure OpenAI",
      "ADO Pipelines",
    ],
    accent: "#ff8a3d",
  },
  {
    slug: "cyberstudio",
    title: "CyberStudio — Compliance Gap Analysis",
    company: "eInfoChips",
    year: "2025 – Present",
    summary:
      "Multi-agent AI platform automating EU Cyber Resilience Act and RED/EN 18031 compliance gap analysis. 6 specialized GPT-4o agents with dual isolated PgVector knowledge bases and 3-phase human-in-the-loop workflow.",
    impact: "~70% analysis accuracy · 4 report formats",
    stack: [
      "Agno",
      "GPT-4o",
      "PgVector",
      "Redis",
      "Pydantic",
      "Langfuse",
      "FastAPI",
    ],
    accent: "#a78bfa",
  },
  {
    slug: "assessment-studio",
    title: "Assessment Studio — Exam Platform",
    company: "eInfoChips",
    year: "2026",
    summary:
      "Internal exam platform with slot booking, timed delivery, auto-grading, and certificate generation — used by ~500 employees across Cyber Security, QA, and DevOps divisions. Features tab-switch proctoring and auto-submit safeguards.",
    impact: "~500 employees · 3 divisions",
    stack: ["FastAPI", "Redis", "PostgreSQL", "Docker"],
    accent: "#34d399",
  },
];

export const EXPERIENCE = [
  {
    role: "AI Engineer",
    company: "eInfoChips (an Arrow Company)",
    where: "Ahmedabad, India",
    period: "Jul 2024 – Present",
    link: {
      label: "AI Studio · eInfoChips",
      href: "https://www.einfochips.com/ai-studio/",
    },
    bullets: [
      "Founded AI Studio as a solo proof-of-concept and grew it into a 9–11 member team, mentoring engineers and contributing to key technical and architectural decisions.",
      "Product was productized and launched company-wide as NomAIzo™ AI Studio, an AI-driven testing accelerator now marketed externally by eInfoChips, generating test cases for embedded, desktop, mobile, and web/app systems at ~60% accuracy against manual baselines.",
      "Extended automation coverage across web, desktop, and mobile through Playwright- and Appium-based AI test execution, reducing manual scripting effort across QA teams.",
      "Built CyberStudio, a multi-agent AI platform automating EU Cyber Resilience Act and RED/EN 18031 compliance gap analysis, achieving ~70% analysis accuracy for internal cybersecurity teams.",
      "Built Assessment Studio, an internal exam platform with slot booking, tab-switch proctoring, and auto-submit safeguards, used by ~500 employees across Cyber Security, QA, and DevOps divisions.",
      "Established LLM observability and adversarial testing standards across all platforms using Langfuse and Garak, achieving 90% security accuracy across 28 attack probes.",
      "Owned platform security end-to-end: Fernet-encrypted API key storage, Redis-based JWT blacklisting, bcrypt password hashing, Kong rate limiting, integrated Wiz for continuous code and container vulnerability scanning, and closed a JWT privilege-escalation finding from a VAPT audit.",
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Seaflux Technologies",
    where: "Ahmedabad, India",
    period: "Jan 2024 – Jul 2024",
    bullets: [
      "Built RESTful backend services for an e-commerce platform using FastAPI — covering product catalogue, cart management, and async order processing.",
    ],
  },
];

export const SKILLS = {
  "Languages & Backend": [
    "Python",
    "C/C++",
    "FastAPI",
    "Uvicorn",
    "Pydantic",
    "SQLAlchemy",
    "OAuth2/JWT",
    "Nginx",
    "Kong API Gateway",
  ],
  "AI / LLM Engineering": [
    "Agno",
    "CrewAI",
    "LangGraph",
    "LangChain",
    "RAG Systems",
    "Multi-Agent Systems",
    "Fine Tuning",
  ],
  "Data & Infrastructure": [
    "PostgreSQL",
    "PgVector",
    "MongoDB",
    "Redis",
    "RabbitMQ",
    "Docker",
    "Kubernetes (AKS)",
    "Helm",
    "Azure DevOps",
  ],
  "Evaluation & Observability": [
    "DeepEval",
    "Garak",
    "Langfuse",
    "Wiz",
  ],
};

export const CERTIFICATIONS = [
  "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
];

export const AWARDS = [
  {
    title: "Innovation Award",
    org: "eInfoChips",
    year: "2026",
    detail:
      "For founding and scaling AI Studio from a solo proof-of-concept into a company-wide productized platform (NomAIzo™ AI Studio).",
  },
];
