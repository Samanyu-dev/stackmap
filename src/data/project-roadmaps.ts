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
  roadmapSteps: ProjectStep[]; // for new schema compliance
  outcomes: string[];
  readmeChecklist: string[];
  deploymentGuide: string[];
  resumeBullets: string[];
  interviewPoints: string[]; // for UI backwards compatibility
  interviewTalkingPoints: string[]; // for new schema compliance
}

export const projectRoadmaps: Record<string, ProjectRoadmapData> = {
  // === BEGINNER PROJECTS ===
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
      },
      {
        task: "GSAP Animation Timelines",
        resources: [{ name: "GSAP Getting Started", url: "https://gsap.com/resources/get-started/" }],
        expectedOutput: "Smooth fade-in effects on page loading and scroll reveal animations.",
        debuggingTips: "Ensure GSAP scrollTrigger triggers are unmounted or clean up event listeners to avoid leaks."
      }
    ],
    roadmapSteps: [
      {
        task: "Semantic Layouts Structure",
        resources: [{ name: "Layout grids (MDN)", url: "https://developer.mozilla.org" }],
        expectedOutput: "Responsive grids displaying profile layouts.",
        debuggingTips: "Keep margins balanced. Check page scores on Lighthouse."
      },
      {
        task: "GSAP Animation Timelines",
        resources: [{ name: "GSAP Getting Started", url: "https://gsap.com/resources/get-started/" }],
        expectedOutput: "Smooth fade-in effects on page loading and scroll reveal animations.",
        debuggingTips: "Ensure GSAP scrollTrigger triggers are unmounted or clean up event listeners to avoid leaks."
      }
    ],
    outcomes: ["Semantic layout design", "CSS animation triggers", "Github deployment"],
    readmeChecklist: ["Add performance Lighthouse screenshots", "Include screenshots of responsive layouts"],
    deploymentGuide: [
      "Deploy directly to GitHub Pages using git hooks.",
      "Optionally configure a custom domain using CNAME records."
    ],
    resumeBullets: [
      "Engineered a semantic developer portfolio achieving a 98% Lighthouse performance rating.",
      "Leveraged GSAP animations to create interactive user interactions, improving page-session durations by 12%."
    ],
    interviewPoints: [
      "Explain semantic elements impact on SEO rankings.",
      "How to avoid animation lag by offloading styles processing to the GPU using transform properties."
    ],
    interviewTalkingPoints: [
      "Explain semantic elements impact on SEO rankings.",
      "How to avoid animation lag by offloading styles processing to the GPU using transform properties."
    ]
  },
  "weather-app": {
    slug: "weather-app",
    title: "Weather Dashboard",
    description: "Build a weather search application showing conditions and forecasting curves for target cities.",
    difficulty: "BEGINNER",
    duration: "1 Week",
    techStack: ["React", "CSS Grid", "OpenWeather API", "Chart.js"],
    prerequisites: ["React Basics", "Fetch Web API"],
    steps: [
      {
        task: "Connect OpenWeather API",
        resources: [{ name: "OpenWeather Docs", url: "https://openweathermap.org/api" }],
        expectedOutput: "Console log showing temperature and humidity conditions for searched terms.",
        debuggingTips: "Add try-catch blocks. Map error states (like 404 - City Not Found) to custom user warnings."
      }
    ],
    roadmapSteps: [
      {
        task: "Connect OpenWeather API",
        resources: [{ name: "OpenWeather Docs", url: "https://openweathermap.org/api" }],
        expectedOutput: "Console log showing temperature and humidity conditions for searched terms.",
        debuggingTips: "Add try-catch blocks. Map error states (like 404 - City Not Found) to custom user warnings."
      }
    ],
    outcomes: ["Third-party API processing", "React state handlers", "Interactive chart mapping"],
    readmeChecklist: ["Add API key configuration template", "Add visual screenshot of the forecasting chart"],
    deploymentGuide: ["Deploy static build folders to Vercel or Netlify, specifying production env API keys."],
    resumeBullets: [
      "Built a weather metrics portal querying OpenWeather endpoints, processing responses dynamically in custom charts.",
      "Implemented localStorage search caching, avoiding redundant network payloads by 20%."
    ],
    interviewPoints: ["How to manage API keys securely in clientside applications.", "How to throttle search query triggers using debouncers."],
    interviewTalkingPoints: ["How to manage API keys securely in clientside applications.", "How to throttle search query triggers using debouncers."]
  },
  "todo-app": {
    slug: "todo-app",
    title: "Task Kanban Board",
    description: "Create a checklist workflow featuring status drag-and-drop columns and local state persistence.",
    difficulty: "BEGINNER",
    duration: "3-5 Days",
    techStack: ["HTML5", "CSS Grid", "JavaScript (ES6)", "Drag and Drop API"],
    prerequisites: ["DOM manipulations", "Event delegation"],
    steps: [
      {
        task: "Drag & Drop Event Triggers",
        resources: [{ name: "HTML5 Drag and Drop API Guide", url: "https://developer.mozilla.org" }],
        expectedOutput: "Cards draggable across Todo, In-Progress, and Completed visual columns.",
        debuggingTips: "Add event.preventDefault() to the dragOver listener to allow dropped states."
      }
    ],
    roadmapSteps: [
      {
        task: "Drag & Drop Event Triggers",
        resources: [{ name: "HTML5 Drag and Drop API Guide", url: "https://developer.mozilla.org" }],
        expectedOutput: "Cards draggable across Todo, In-Progress, and Completed visual columns.",
        debuggingTips: "Add event.preventDefault() to the dragOver listener to allow dropped states."
      }
    ],
    outcomes: ["Browser drag event maps", "Status lists filtering", "Local storage state saves"],
    readmeChecklist: ["Explain structural layout", "Document browser API support limits"],
    deploymentGuide: ["Host statically on GitHub Pages or Vercel."],
    resumeBullets: [
      "Engineered an interactive Task Board application leveraging native HTML5 Drag & Drop APIs for smooth task cards tracking.",
      "Implemented local storage state saves, maintaining user checklists logs with zero server latency."
    ],
    interviewPoints: ["Explain event delegation patterns in listing layouts.", "What is the difference between dragEnter and dragOver events?"],
    interviewTalkingPoints: ["Explain event delegation patterns in listing layouts.", "What is the difference between dragEnter and dragOver events?"]
  },
  "expense-tracker": {
    slug: "expense-tracker",
    title: "Expense Tracker",
    description: "Design an interactive personal finance manager showing category breakdown charts.",
    difficulty: "BEGINNER",
    duration: "1 Week",
    techStack: ["React", "Tailwind CSS", "Recharts", "LocalStorage"],
    prerequisites: ["Zustand State", "Recharts Components"],
    steps: [
      {
        task: "Interactive Category Breakdown Chart",
        resources: [{ name: "Recharts Pie Chart Guide", url: "https://recharts.org" }],
        expectedOutput: "Color-coded Pie Chart mapping category distributions (e.g. food, rent, books) dynamically.",
        debuggingTips: "Convert pricing inputs from strings to numerical types before parsing calculation datasets."
      }
    ],
    roadmapSteps: [
      {
        task: "Interactive Category Breakdown Chart",
        resources: [{ name: "Recharts Pie Chart Guide", url: "https://recharts.org" }],
        expectedOutput: "Color-coded Pie Chart mapping category distributions (e.g. food, rent, books) dynamically.",
        debuggingTips: "Convert pricing inputs from strings to numerical types before parsing calculation datasets."
      }
    ],
    outcomes: ["Data visualization structures", "Inputs parsing validations", "Filter criteria schedules"],
    readmeChecklist: ["Provide screenshots of charts dashboard", "Detail local storage persistence schemas"],
    deploymentGuide: ["Deploy React project via Vercel."],
    resumeBullets: [
      "Built a personal finance manager tracking monthly expenditures, generating category metrics dashboards via Recharts.",
      "Designed Zod validators for financial fields inputs, reducing input error entries by 35%."
    ],
    interviewPoints: ["How to manage floating-point pricing arithmetic in JavaScript without rounding errors.", "Explain responsive containers behavior in Recharts."],
    interviewTalkingPoints: ["How to manage floating-point pricing arithmetic in JavaScript without rounding errors.", "Explain responsive containers behavior in Recharts."]
  },
  "blog-cms": {
    slug: "blog-cms",
    title: "Static Blog CMS",
    description: "Build a static site generator blog that compiles Markdown files into web articles.",
    difficulty: "BEGINNER",
    duration: "1 Week",
    techStack: ["Next.js", "TypeScript", "Gray-Matter (Markdown parser)", "Tailwind Typography"],
    prerequisites: ["NextJS static parameters generation", "Markdown structure"],
    steps: [
      {
        task: "Parse Frontmatter and Body",
        resources: [{ name: "Gray-Matter Parsing Guide", url: "https://github.com/jonschlinkert/gray-matter" }],
        expectedOutput: "Dynamic articles rendering headings, title metadata, and publish dates from Markdown fields.",
        debuggingTips: "Ensure date variables parse correctly inside serialize functions."
      }
    ],
    roadmapSteps: [
      {
        task: "Parse Frontmatter and Body",
        resources: [{ name: "Gray-Matter Parsing Guide", url: "https://github.com/jonschlinkert/gray-matter" }],
        expectedOutput: "Dynamic articles rendering headings, title metadata, and publish dates from Markdown fields.",
        debuggingTips: "Ensure date variables parse correctly inside serialize functions."
      }
    ],
    outcomes: ["Static Site Generation (SSG)", "Markdown parsing engines", "CSS prose styling (Tailwind Typography)"],
    readmeChecklist: ["Provide a sample markdown template", "Explain build parameters"],
    deploymentGuide: ["Host on Vercel with automatic hooks recompiling files upon GitHub pushes."],
    resumeBullets: [
      "Engineered an SSG developer blog that parses Markdown directories, generating SEO-optimized static articles.",
      "Leveraged Next.js generateStaticParams to prerender markdown articles, achieving sub-100ms loading speeds."
    ],
    interviewPoints: ["Explain the difference between static site generation (SSG) and server-side rendering (SSR).", "Why is markdown preferred for headless content management?"],
    interviewTalkingPoints: ["Explain the difference between static site generation (SSG) and server-side rendering (SSR).", "Why is markdown preferred for headless content management?"]
  },

  // === INTERMEDIATE PROJECTS ===
  "netflix-clone": {
    slug: "netflix-clone",
    title: "Netflix Clone",
    description: "Build a responsive video streaming mock database featuring list sliders, trailer player models, TMDB API feeds, and auth contexts.",
    difficulty: "INTERMEDIATE",
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
    roadmapSteps: [
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
    ],
    interviewTalkingPoints: [
      "Explain TMDB data fetching optimization using memoization hooks.",
      "Detail how Firebase tokens are stored and refreshed in the browser."
    ]
  },
  "e-commerce-platform": {
    slug: "e-commerce-platform",
    title: "E-Commerce System",
    description: "Build a complete shop featuring carts state, payment validations, item lists, and admin dashboard logs.",
    difficulty: "INTERMEDIATE",
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
    roadmapSteps: [
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
    interviewPoints: ["How does Stripe webhook signature validation prevent payment spoofing?"],
    interviewTalkingPoints: ["How does Stripe webhook signature validation prevent payment spoofing?"]
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
    roadmapSteps: [
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
    interviewPoints: ["Explain the difference between HTTP polling and WebSockets."],
    interviewTalkingPoints: ["Explain the difference between HTTP polling and WebSockets."]
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
    roadmapSteps: [
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
    interviewPoints: ["How to secure recruiter endpoints from standard user access."],
    interviewTalkingPoints: ["How to secure recruiter endpoints from standard user access."]
  },
  "lms-platform": {
    slug: "lms-platform",
    title: "E-Learning Platform",
    description: "Build a structured course platform featuring video lessons tracking, quiz questions modules, and certificates.",
    difficulty: "INTERMEDIATE",
    duration: "2-3 Weeks",
    techStack: ["Next.js App Router", "Prisma", "Mux Video API", "PostgreSQL", "Tailwind CSS"],
    prerequisites: ["Database migrations", "Dynamic routing routes"],
    steps: [
      {
        task: "Video Upload with Mux",
        resources: [{ name: "Mux Video API Documentation", url: "https://docs.mux.com" }],
        expectedOutput: "Course lessons rendering custom HLS video players tracking play progression.",
        debuggingTips: "Handle Mux webhook triggers to update video processing status variables."
      }
    ],
    roadmapSteps: [
      {
        task: "Video Upload with Mux",
        resources: [{ name: "Mux Video API Documentation", url: "https://docs.mux.com" }],
        expectedOutput: "Course lessons rendering custom HLS video players tracking play progression.",
        debuggingTips: "Handle Mux webhook triggers to update video processing status variables."
      }
    ],
    outcomes: ["Media streaming architectures", "Lessons checklist tracking", "Mux webhook event maps"],
    readmeChecklist: ["Document env fields for Mux API tokens", "Detail mock quiz structures"],
    deploymentGuide: ["Deploy on Vercel setting Neon Postgres db URLs."],
    resumeBullets: [
      "Developed a video e-learning system leveraging Mux API hooks, optimizing video encoding and playback loops.",
      "Configured database models matching chapters progress, reducing dynamic query sizes by 20%."
    ],
    interviewPoints: ["Explain how HLS video streaming works.", "How to secure course video media from bulk download scrapers."],
    interviewTalkingPoints: ["Explain how HLS video streaming works.", "How to secure course video media from bulk download scrapers."]
  },

  // === ADVANCED PROJECTS ===
  "url-shortener": {
    slug: "url-shortener",
    title: "Distributed URL Shortener",
    description: "Write a high-performance redirect microservice that generates short hash links and tracks analytics.",
    difficulty: "ADVANCED",
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
    roadmapSteps: [
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
    interviewPoints: ["Why is 301 redirect preferred over 302 for SEO mappings?"],
    interviewTalkingPoints: ["Why is 301 redirect preferred over 302 for SEO mappings?"]
  },
  "ride-sharing": {
    slug: "ride-sharing",
    title: "Ride Sharing Dispatcher",
    description: "Design a spatial dispatcher coordinating driver updates, geofence queries, and matching routes.",
    difficulty: "ADVANCED",
    duration: "3-4 Weeks",
    techStack: ["Node.js", "Redis (GeoSets)", "PostgreSQL", "Socket.io", "Leaflet Maps"],
    prerequisites: ["Redis Geospatial API", "WebSockets protocols"],
    steps: [
      {
        task: "Spatial Driver Indexes",
        resources: [{ name: "Redis Geo Commands Reference", url: "https://redis.io/commands/geoadd/" }],
        expectedOutput: "Real-time query indexes matching active drivers within a 5km coordinate radius.",
        debuggingTips: "Filter coordinates values boundary limits carefully to prevent database query failures."
      }
    ],
    roadmapSteps: [
      {
        task: "Spatial Driver Indexes",
        resources: [{ name: "Redis Geo Commands Reference", url: "https://redis.io/commands/geoadd/" }],
        expectedOutput: "Real-time query indexes matching active drivers within a 5km coordinate radius.",
        debuggingTips: "Filter coordinates values boundary limits carefully to prevent database query failures."
      }
    ],
    outcomes: ["Geospatial indexing schemas", "Websocket location streaming", "Driver dispatcher loops"],
    readmeChecklist: ["Add map UI demo screens", "Document concurrency limits"],
    deploymentGuide: ["Dockerize backend cluster and deploy on AWS ECS linked to Redis Cloud."],
    resumeBullets: [
      "Engineered a spatial ride dispatcher dispatching coordinates updates to drivers via Redis GeoSets, reducing delays by 25%.",
      "Configured Socket.io brokers broadcast grouping drivers by geographical geofences, dropping message overloads."
    ],
    interviewPoints: ["How does quadtree geo-indexing compare to Redis Geo Hashing?", "Explain how location updates are decoupled from transactional databases."],
    interviewTalkingPoints: ["How does quadtree geo-indexing compare to Redis Geo Hashing?", "Explain how location updates are decoupled from transactional databases."]
  },
  "food-delivery": {
    slug: "food-delivery",
    title: "Food Delivery System",
    description: "Build a distributed food order queue manager integrating restaurant dashboards, delivery riders, and payments.",
    difficulty: "ADVANCED",
    duration: "3 Weeks",
    techStack: ["Go (Golang)", "Kafka / RabbitMQ", "MongoDB", "gRPC", "React"],
    prerequisites: ["Message queue brokers", "Concurrency constructs"],
    steps: [
      {
        task: "Configure Order Kafka Pipeline",
        resources: [{ name: "Apache Kafka Quickstart", url: "https://kafka.apache.org/quickstart" }],
        expectedOutput: "Decoupled transaction consumer logs showing orders emitted, verified, and sent to kitchens.",
        debuggingTips: "Adjust Kafka offset configuration loops to prevent message duplication bugs."
      }
    ],
    roadmapSteps: [
      {
        task: "Configure Order Kafka Pipeline",
        resources: [{ name: "Apache Kafka Quickstart", url: "https://kafka.apache.org/quickstart" }],
        expectedOutput: "Decoupled transaction consumer logs showing orders emitted, verified, and sent to kitchens.",
        debuggingTips: "Adjust Kafka offset configuration loops to prevent message duplication bugs."
      }
    ],
    outcomes: ["Asynchronous pipeline architectures", "gRPC interservice communication", "Order queue metrics"],
    readmeChecklist: ["Include Docker Compose setup", "Explain topic configurations for Kafka"],
    deploymentGuide: ["Deploy to AWS EKS with Kubernetes pods scale guidelines for restaurant loops."],
    resumeBullets: [
      "Built a distributed delivery catalog in Go processing checkout streams using Apache Kafka queues.",
      "Optimized dashboard synchronization cycles using gRPC communication channels, lowering latency bounds by 30%."
    ],
    interviewPoints: ["What is the difference between gRPC and REST?", "Explain consumer groups mapping in Kafka architecture."],
    interviewTalkingPoints: ["What is the difference between gRPC and REST?", "Explain consumer groups mapping in Kafka architecture."]
  },
  "ai-resume-analyzer": {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    description: "Design an ATS rating system checking resume text against job descriptions using Google Gemini.",
    difficulty: "ADVANCED",
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
    roadmapSteps: [
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
    ],
    interviewTalkingPoints: [
      "Explain prompt formatting rules helping Gemini return structured JSON outputs.",
      "How to prevent database block locks when multiple users submit requests simultaneously."
    ]
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
    roadmapSteps: [
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
    interviewPoints: ["Explain the difference between vector similarity search and keyword matching."],
    interviewTalkingPoints: ["Explain the difference between vector similarity search and keyword matching."]
  },
  "stock-prediction": {
    slug: "stock-prediction",
    title: "AI Stock Sentiment Platform",
    description: "Build an interactive dashboard mapping stock pricing graphs alongside live sentiment ratings scraped from headlines.",
    difficulty: "ADVANCED",
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
    roadmapSteps: [
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
    interviewPoints: ["How do you handle rate-limit blocks when web scraping news articles?"],
    interviewTalkingPoints: ["How do you handle rate-limit blocks when web scraping news articles?"]
  },
  "kubernetes-dashboard": {
    slug: "kubernetes-dashboard",
    title: "Kubernetes Ops Panel",
    description: "Develop a real-time monitor panel reporting cluster states, nodes metrics, container pods, and service logs.",
    difficulty: "ADVANCED",
    duration: "2-3 Weeks",
    techStack: ["React", "Go (Golang)", "Kubernetes API Client", "Socket.io", "Tailwind CSS"],
    prerequisites: ["Kubernetes RBAC configurations", "SSE or Websockets API"],
    steps: [
      {
        task: "Connect Kubernetes Clientset",
        resources: [{ name: "Go Client for Kubernetes", url: "https://github.com/kubernetes/client-go" }],
        expectedOutput: "Dashboard API logs returning structured JSON metrics representing nodes health, pod counts, and namespace scopes.",
        debuggingTips: "Utilize Kubeconfig path context loaders fallback loops when running outside local clusters."
      }
    ],
    roadmapSteps: [
      {
        task: "Connect Kubernetes Clientset",
        resources: [{ name: "Go Client for Kubernetes", url: "https://github.com/kubernetes/client-go" }],
        expectedOutput: "Dashboard API logs returning structured JSON metrics representing nodes health, pod counts, and namespace scopes.",
        debuggingTips: "Utilize Kubeconfig path context loaders fallback loops when running outside local clusters."
      }
    ],
    outcomes: ["K8s client interaction APIs", "Server-Sent Events streaming", "Clustered health checks"],
    readmeChecklist: ["Document cluster role permissions configurations", "Provide sample yaml deployment templates"],
    deploymentGuide: ["Deploy inside local clusters using customized deployment helm templates."],
    resumeBullets: [
      "Engineered a Kubernetes operational monitoring panel in Go, enabling developers to review live pod states and namespace files.",
      "Implemented cluster event pipelines reducing dashboard UI state refresh times by 30%."
    ],
    interviewPoints: ["Explain how RBAC secures access to cluster APIs.", "What is the role of custom resource definitions (CRDs) inside a cluster?"],
    interviewTalkingPoints: ["Explain how RBAC secures access to cluster APIs.", "What is the role of custom resource definitions (CRDs) inside a cluster?"]
  },
  "devops-monitoring": {
    slug: "devops-monitoring",
    title: "DevOps Monitoring Suite",
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
    roadmapSteps: [
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
    interviewPoints: ["Explain the difference between Docker containers overlay and host network modes."],
    interviewTalkingPoints: ["Explain the difference between Docker containers overlay and host network modes."]
  }
};
