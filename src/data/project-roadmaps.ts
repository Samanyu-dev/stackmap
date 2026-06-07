export interface ProjectStep {
  task: string;
  resources: { name: string; url: string }[];
  expectedOutput: string;
  debuggingTips: string;
}

export interface ProjectRoadmapData {
  slug: string;
  title: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: string;
  techStack: string[];
  prerequisites: string[];
  steps: ProjectStep[];
  outcomes: string[];
  readmeChecklist: string[];
  deploymentGuide: string[];
  resumeBullets: string[];
  interviewPoints: string[];
}

export const projectRoadmaps: Record<string, ProjectRoadmapData> = {
  "netflix-clone": {
    slug: "netflix-clone",
    title: "Netflix Clone",
    description: "Build a responsive video streaming mock database featuring list sliders, trailer player models, TMDB API feeds, and auth contexts.",
    difficulty: "BEGINNER",
    duration: "1-2 Weeks",
    techStack: ["React", "Tailwind CSS", "Firebase Auth", "TMDB API", "Framer Motion"],
    prerequisites: ["HTML & CSS Basics", "JavaScript ES6 Async"],
    steps: [
      {
        task: "Syllabus Layout Grid Setup",
        resources: [
          { name: "Flexbox & Grid layouts (MDN)", url: "https://developer.mozilla.org" },
          { name: "Netflix Design Inspiration", url: "https://dribbble.com" }
        ],
        expectedOutput: "A responsive blank page featuring a black background and navigation layouts.",
        debuggingTips: "Verify CSS resets are present. Set overflow-x-hidden on layout wrappers to prevent scrollbars."
      },
      {
        task: "TMDB API Integration",
        resources: [
          { name: "TMDB API documentation", url: "https://developer.themoviedb.org" }
        ],
        expectedOutput: "Horizontal movie sliders fetching banners and genres dynamically.",
        debuggingTips: "Ensure API keys are fetched from .env files. Test response limits under browser consoles."
      }
    ],
    outcomes: ["Component life-cycle management", "External API integrations", "Context state handling"],
    readmeChecklist: [
      "Include clear GIF previews of sliders",
      "List environment configuration templates",
      "Mention TMDB API key prerequisites"
    ],
    deploymentGuide: [
      "Build production files via npm run build",
      "Deploy static folders directly to Vercel or Netlify",
      "Add environment variables inside Vercel Dashboard configurations"
    ],
    resumeBullets: [
      "Engineered a responsive video mock application using React, reducing API query rates by 20% using TMDB caching.",
      "Integrated Firebase Auth context handlers securing user bookmark records across sessions."
    ],
    interviewPoints: [
      "Explain TMDB data fetching optimization using memoization hooks.",
      "Detail how Firebase tokens are stored and refreshed in the browser."
    ]
  },
  "ai-resume-analyzer": {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description: "Design an ATS rating system checking resume text against job descriptions using Google Gemini.",
    difficulty: "INTERMEDIATE",
    duration: "2 Weeks",
    techStack: ["Next.js App Router", "TypeScript", "Prisma ORM", "Gemini API", "Tailwind CSS"],
    prerequisites: ["NextJS API routes", "Basic database models"],
    steps: [
      {
        task: "Parse Resume Upload Texts",
        resources: [
          { name: "File Reader web API", url: "https://developer.mozilla.org" }
        ],
        expectedOutput: "Text areas displaying parsed copy inputs or doc strings.",
        debuggingTips: "Clean file symbols and encoding issues. Trim large whitespace loops."
      },
      {
        task: "Gemini Model integration",
        resources: [
          { name: "Google Gemini NodeJS API guide", url: "https://ai.google.dev" }
        ],
        expectedOutput: "A JSON API return containing match score, key gaps, and recommended tips.",
        debuggingTips: "Verify JSON schemas are enforced on prompting Gemini. Use fallback calculators on timeouts."
      }
    ],
    outcomes: ["Model prompting structures", "NextJS App Router API route loops", "JSON database schema mappings"],
    readmeChecklist: [
      "Explain the matching score logic",
      "Provide step-by-step schema migrations instructions"
    ],
    deploymentGuide: [
      "Configure PostgreSQL on Supabase database grids",
      "Host next-app on Vercel setting GEMINI_API_KEY environment flags"
    ],
    resumeBullets: [
      "Architected an AI-powered resume readiness scanner fetching Google Gemini vectors, increasing score alignment by 35%.",
      "Implemented local storage mock databases enabling offline testing cycles."
    ],
    interviewPoints: [
      "Explain prompt formatting rules helping Gemini return structured JSON outputs.",
      "How to prevent database block locks when multiple users submit requests simultaneously."
    ]
  },
  "url-shortener": {
    slug: "url-shortener",
    title: "URL Shortener",
    description: "Write a high-performance redirect microservice that generates short hash links and tracks analytics.",
    difficulty: "BEGINNER",
    duration: "1 Week",
    techStack: ["Node.js", "Express", "MongoDB / Prisma", "Redis Cache", "Tailwind CSS"],
    prerequisites: ["Express routers", "Relational schemas"],
    steps: [
      {
        task: "Generate Short Hash Keys",
        resources: [
          { name: "Cryptographic hash generation guide", url: "https://wikipedia.org" }
        ],
        expectedOutput: "Unique 6-character string tags (e.g. 'aG3x9L') generated for each URL submission.",
        debuggingTips: "Prevent key collisions. Implement index uniqueness constraints at database levels."
      }
    ],
    outcomes: ["Redis key caching logic", "HTTP redirect codes (301/302)", "Database indexes optimization"],
    readmeChecklist: ["Add Docker Compose configurations", "Detail benchmark statistics"],
    deploymentGuide: ["Run node app inside a dockerized network mapping port 80 to Nginx."],
    resumeBullets: [
      "Developed a URL shortener backend handling 100+ requests/sec using Redis memory caching schemas.",
      "Optimized lookup speeds by 40% mapping indexed hashes directly in PostgreSQL."
    ],
    interviewPoints: ["Why is 301 redirect preferred over 302 for SEO mappings?"]
  },
  "chat-application": {
    slug: "chat-application",
    title: "Real-time Chat App",
    description: "Create a live group messaging system featuring chatrooms, active users indicators, and database logging.",
    difficulty: "INTERMEDIATE",
    duration: "2 Weeks",
    techStack: ["React", "Node.js", "Socket.io", "PostgreSQL", "Tailwind CSS"],
    prerequisites: ["WebSocket protocols", "JWT auth guards"],
    steps: [
      {
        task: "Establish WebSocket channels",
        resources: [{ name: "Socket.io docs", url: "https://socket.io" }],
        expectedOutput: "Two terminal consoles successfully communicating messages back and forth in real-time.",
        debuggingTips: "Verify CORS mappings on WebSocket connections. Handle reconnect loops."
      }
    ],
    outcomes: ["State synchronization", "Event-driven programming", "WebSocket handshake hooks"],
    readmeChecklist: ["Provide local test credentials", "Explain room join parameters"],
    deploymentGuide: ["Deploy Node app using socket.io ports on VPS systems (Render/DigitalOcean)."],
    resumeBullets: [
      "Built a concurrent real-time messaging tool leveraging WebSocket event queues, maintaining low-latency state logs.",
      "Configured dynamic chat room partitioning reducing broadcast load by 30%."
    ],
    interviewPoints: ["Explain the difference between HTTP polling and WebSockets."]
  },
  "job-portal": {
    slug: "job-portal",
    title: "Student Job Portal",
    description: "Build an application catalog with filters, resume uploads, applicant lists, and admin approval matrices.",
    difficulty: "INTERMEDIATE",
    duration: "2-3 Weeks",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Cloudinary"],
    prerequisites: ["Form validation Zod schemas", "Dynamic query selectors"],
    steps: [
      {
        task: "Database Mappings Setup",
        resources: [{ name: "Database relationships (Prisma)", url: "https://prisma.io" }],
        expectedOutput: "Relational models representing Jobs, Users, and Applications active.",
        debuggingTips: "Check foreign key cascade behaviors to prevent orphaned application references."
      }
    ],
    outcomes: ["User role separation (Student/Recruiter)", "Database query pagination", "Cloud asset storage"],
    readmeChecklist: ["Include mock seed templates", "List system endpoints"],
    deploymentGuide: ["Deploy to Vercel linking Neon PostgreSQL servers."],
    resumeBullets: [
      "Developed a role-separated career portal utilizing Prisma query pagination, streamlining loading speeds by 25%.",
      "Engineered secure resume uploads integrating Cloudinary document bucket integrations."
    ],
    interviewPoints: ["How to secure recruiter endpoints from standard user access."]
  },
  "portfolio-website": {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "Make a high-performance, beautiful portfolio site showcasing your projects, bio, and resume download buttons.",
    difficulty: "BEGINNER",
    duration: "3-5 Days",
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "GSAP", "GitHub Pages"],
    prerequisites: ["CSS Grid & Flexbox", "Semantic HTML"],
    steps: [
      {
        task: "Semantic Layouts Structure",
        resources: [{ name: "Layout grids (MDN)", url: "https://developer.mozilla.org" }],
        expectedOutput: "Responsive grids displaying profile layouts.",
        debuggingTips: "Keep margins balanced. Check page scores on Lighthouse."
      }
    ],
    outcomes: ["Semantic layout design", "CSS animation triggers", "Github deployment"],
    readmeChecklist: ["Add performance Lighthouse screenshots"],
    deploymentGuide: ["Deploy directly to Github Pages using git hooks."],
    resumeBullets: ["Engineered a semantic developer portfolio achieving a 98% Lighthouse performance rating."],
    interviewPoints: ["Explain semantic elements impact on SEO rankings."]
  },
  "e-commerce-platform": {
    slug: "e-commerce-platform",
    title: "E-Commerce System",
    description: "Build a complete shop featuring carts state, payment validations, item lists, and admin dashboard logs.",
    difficulty: "ADVANCED",
    duration: "3-4 Weeks",
    techStack: ["Next.js App Router", "Zustand", "Prisma", "Stripe API", "PostgreSQL"],
    prerequisites: ["Context state maps", "API integrations"],
    steps: [
      {
        task: "Zustand Cart State Sync",
        resources: [{ name: "Zustand State Guide", url: "https://github.com/pmndrs/zustand" }],
        expectedOutput: "Persistent cart items list toggleable across route navigations.",
        debuggingTips: "Ensure localstorage persistence is configured correctly inside Zustand middleware."
      }
    ],
    outcomes: ["Stripe webhook processing", "Zustand state caching", "Relational database operations"],
    readmeChecklist: ["Add Stripe test keys", "Explain admin credentials"],
    deploymentGuide: ["Deploy on Vercel setting Stripe webhook keys."],
    resumeBullets: [
      "Architected a transactional e-commerce platform processing checkout orders via Stripe API integration.",
      "Optimized query speeds by 35% through custom index schemas on database product search columns."
    ],
    interviewPoints: ["How does Stripe webhook signature validation prevent payment spoofing?"]
  },
  "rag-pdf-chatbot": {
    slug: "rag-pdf-chatbot",
    title: "RAG PDF Chatbot",
    description: "Design a PDF reader chatbot using retrieval-augmented generation to answer questions based on files uploaded.",
    difficulty: "ADVANCED",
    duration: "3 Weeks",
    techStack: ["Next.js", "Python FastAPI", "Pinecone Vector DB", "LangChain", "Gemini API"],
    prerequisites: ["FastAPI routes", "Vector embeddings theory"],
    steps: [
      {
        task: "Generate Document Chunk Vectors",
        resources: [{ name: "LangChain text splitters", url: "https://python.langchain.com" }],
        expectedOutput: "PDF content split into vector array nodes indexed in Pinecone databases.",
        debuggingTips: "Keep chunk sizes balanced (e.g. 500 characters) to preserve contextual matches."
      }
    ],
    outcomes: ["Vector search operations", "FastAPI server connections", "Retrieval-Augmented Generation workflows"],
    readmeChecklist: ["Add model keys", "Provide sample test PDF files"],
    deploymentGuide: ["Host Python code on Render, and Next.js frontend on Vercel."],
    resumeBullets: [
      "Engineered a Retrieval-Augmented Generation (RAG) platform querying Pinecone DB vector stores for PDF contextual answering.",
      "Optimized vector search latency under 120ms utilizing metadata filters."
    ],
    interviewPoints: ["Explain the difference between vector similarity search and keyword matching."]
  },
  "stock-sentiment": {
    slug: "stock-sentiment",
    title: "Stock Sentiment Dashboard",
    description: "Build an interactive dashboard mapping stock pricing graphs alongside live sentiment ratings scraped from headlines.",
    difficulty: "INTERMEDIATE",
    duration: "2 Weeks",
    techStack: ["Next.js", "Python FastAPI", "BeautifulSoup", "Recharts", "PostgreSQL"],
    prerequisites: ["FastAPI routing", "Web scraping limits"],
    steps: [
      {
        task: "Scrape Finance News Headlines",
        resources: [{ name: "Web scraping guidelines (BS4)", url: "https://beautiful-soup-4.readthedocs.io" }],
        expectedOutput: "Clean JSON feeds containing publisher title, dates, and text headlines.",
        debuggingTips: "Verify class selectors. Set correct user-agents to prevent scrapers being blocked."
      }
    ],
    outcomes: ["Data visualization workflows", "Sentiment classification analysis", "Web scraper optimization"],
    readmeChecklist: ["List libraries", "Provide pricing API credentials"],
    deploymentGuide: ["Dockerize FastAPI scrapers and deploy schedule cron tasks on Render."],
    resumeBullets: [
      "Developed a financial news sentiment scraper utilizing FastAPI, processing 100+ articles daily for market insights.",
      "Designed interactive price graphs using Recharts, optimizing loading efficiency by 40%."
    ],
    interviewPoints: ["How do you handle rate-limit blocks when web scraping news articles?"]
  },
  "devops-cicd-pipeline": {
    slug: "devops-cicd-pipeline",
    title: "DevOps CI/CD Pipeline",
    description: "Setup Docker container networks, proxy routing, and build workflow actions pushing updates to cloud hosts.",
    difficulty: "ADVANCED",
    duration: "2 Weeks",
    techStack: ["GitHub Actions", "Docker Compose", "Nginx", "AWS EC2", "Jest"],
    prerequisites: ["Docker structures", "GitHub workflow YAMLs"],
    steps: [
      {
        task: "Automate build runner tests",
        resources: [{ name: "Docker multi-stage compilation", url: "https://docs.docker.com" }],
        expectedOutput: "Green checks on GitHub Actions verifying build test passes.",
        debuggingTips: "Cache package-lock files to save runner download times."
      }
    ],
    outcomes: ["Multi-stage compilation", "Nginx reverse proxy mapping", "Continuous deployment setups"],
    readmeChecklist: ["Add workflow configuration maps", "Provide setup guides"],
    deploymentGuide: ["Install self-hosted runner on AWS EC2 mapping SSL via Nginx."],
    resumeBullets: [
      "Configured a zero-downtime GitHub Actions pipeline automating Docker multi-stage builds on AWS EC2 servers.",
      "Implemented Nginx reverse proxies mapping SSL certificates, cutting bundle traffic latency by 15%."
    ],
    interviewPoints: ["Explain the difference between Docker containers overlay and host network modes."]
  }
};
