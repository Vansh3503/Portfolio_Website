// Centralized project list — used by Home preview + /work page
export const PROJECTS = [
  {
    slug: "ai-studio",
    title: "AI Studio Platform",
    company: "eInfoChips",
    year: "2024 – Present",
    summary:
      "Microservice platform for enterprise AI and QA — auth, document ingestion, chat, workflow, web-stories, test-management, and crawling — running on Azure AKS.",
    impact: "Production · Azure AKS · CI/CD",
    stack: [
      "FastAPI",
      "React 18",
      "PostgreSQL",
      "PgVector",
      "Redis",
      "RabbitMQ",
      "Kong",
      "Docker",
      "AKS",
      "Helm",
      "Agno",
      "CrewAI",
      "LangGraph",
      "Azure OpenAI",
    ],
    accent: "#ff8a3d",
  },
  {
    slug: "multi-agent-qa",
    title: "Multi-Agent QA Pipeline",
    company: "eInfoChips",
    year: "2024 – Present",
    summary:
      "Agentic pipeline that auto-generates user stories and test cases from browser recordings and documents. Built with Agno, CrewAI, and LangGraph.",
    impact: "Agentic test generation",
    stack: ["Agno", "CrewAI", "LangGraph", "FastAPI", "PostgreSQL"],
    accent: "#ffb16b",
  },
  {
    slug: "browser-automation",
    title: "Browser Automation Service",
    company: "eInfoChips",
    year: "2024",
    summary:
      "Browser-Use SDK with RabbitMQ task queuing, Redis distributed locking, and live noVNC streaming for AI-driven test execution.",
    impact: "Distributed locks · live streaming",
    stack: ["Browser-Use", "RabbitMQ", "Redis", "noVNC", "AKS"],
    accent: "#5aa9ff",
  },
  {
    slug: "llm-eval-security",
    title: "LLM Reliability & Security Testing",
    company: "eInfoChips",
    year: "2024 – Present",
    summary:
      "RAG quality with DeepEval (precision, faithfulness, relevancy). Adversarial probing with Garak across OWASP-LLM Top-10 categories.",
    impact: "OWASP-LLM Top-10",
    stack: ["DeepEval", "Garak", "Azure OpenAI", "Python"],
    accent: "#ff8a3d",
  },
  {
    slug: "multimodal-rag",
    title: "Multimodal RAG — Unified Q&A",
    company: "eInfoChips",
    year: "2024",
    summary:
      "Q&A over PDF, CSV, DOCX, images, and video using LLaVA (Ollama) + LangChain + FAISS with sub-2s P95 latency.",
    impact: "Sub-2s P95 latency",
    stack: ["LLaVA", "LangChain", "FAISS", "Ollama"],
    accent: "#ffb16b",
  },
  {
    slug: "docuquery",
    title: "DocuQuery — Intelligent Document Q&A",
    company: "Personal",
    year: "2023",
    summary:
      "RAG app for Q&A over PDFs, TXT, and URLs using OpenAI, LLaMA 3, Groq, FAISS, and Streamlit.",
    impact: "Open-source · multi-LLM",
    stack: ["OpenAI", "LLaMA 3", "Groq", "FAISS", "Streamlit"],
    accent: "#5aa9ff",
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
      "Build multi-agent QA pipelines with Agno, CrewAI, and LangGraph that auto-generate user stories and test cases from browser recordings and documents.",
      "Design async document RAG pipelines: upload → text extraction (Docling/pypdf) → chunking → embedding (Azure OpenAI) → PgVector storage.",
      "Develop browser automation services using the Browser-Use SDK with RabbitMQ task queuing, Redis distributed locking, and live noVNC streaming.",
      "Run LLM quality and security evaluation with DeepEval (precision, faithfulness, relevancy) and Garak (prompt injection, jailbreaks, OWASP LLM Top-10).",
      "Build multimodal RAG with LLaVA and CLIP for image and video understanding across mixed-media corpora.",
      "Implement platform security: Fernet-encrypted API keys, JWT blacklisting in Redis, bcrypt hashing, Kong rate limiting, and PostgreSQL advisory locks.",
      "Ship FastAPI + React internal tools, including an exam engine with Redis-backed grading and WeasyPrint PDF certificate generation.",
    ],
  },
  {
    role: "AI Engineer Intern",
    company: "Seaflux Technologies",
    where: "Ahmedabad, India",
    period: "Jan 2024 – Jul 2024",
    bullets: [
      "Built RESTful backend services for an e-commerce platform using FastAPI — product catalogue, cart management, and async order processing.",
    ],
  },
];

export const SKILLS = {
  Languages: ["Python", "C", "C++"],
  "AI Frameworks": [
    "Agno",
    "CrewAI",
    "LangChain",
    "LangGraph",
    "Langflow",
    "HuggingFace",
    "AutoGen",
    "MCP",
    "A2A",
  ],
  "Backend & APIs": ["FastAPI", "SQLAlchemy", "Pydantic", "REST", "WebSockets"],
  "Infra & DevOps": [
    "Docker",
    "Kubernetes (AKS)",
    "Helm",
    "Azure ACR",
    "Azure DevOps",
    "Bitbucket Pipelines",
    "GitHub",
  ],
  Databases: ["PostgreSQL 16", "PgVector", "MongoDB", "Redis 7", "RabbitMQ 3.13"],
  "AI/ML": [
    "RAG",
    "Prompt Engineering",
    "Fine-Tuning",
    "Multi-Agent Systems",
    "Multimodal AI",
  ],
  "LLM Tooling": [
    "LangSmith",
    "DeepEval",
    "Garak",
    "Playwright",
    "Azure OpenAI",
    "Gemini",
    "Ollama",
  ],
  Observability: [
    "Kong API Gateway",
    "Structured Logging",
    "Token-Usage Tracking",
    "Tableau",
  ],
};

export const CERTIFICATIONS = [
  "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
  "IBM — Introduction to Data Analytics",
  "IBM — Python for Data Science, AI & Development",
  "IBM — Data Visualization and Dashboards with Excel and Cognos",
];
