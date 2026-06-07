export interface SkillNode {
  id: string;
  name: string; // alias for title
  title: string;
  description: string;
  xp: number; // alias for xpReward
  xpReward: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  prerequisites: string[];
  unlocks: string[];
  projectsUnlocked: string[];
  recommendedProjects: { name: string; url: string }[]; // backwards compatibility
  recommendedRoadmaps: string[];
  companyTracksUnlocked: string[];
}

export interface SkillDomainData {
  slug: string;
  title: string;
  description: string;
  domain: 
    | "FRONTEND" 
    | "BACKEND" 
    | "DSA" 
    | "DEVOPS" 
    | "AI_ML" 
    | "DATABASES" 
    | "SYSTEM_DESIGN" 
    | "CLOUD" 
    | "CYBERSECURITY" 
    | "MOBILE" 
    | "GAME_DEV" 
    | "DATA_ENG" 
    | "BLOCKCHAIN" 
    | "PRODUCT_ENG";
  xpTier: number;
  xpAward: number; // alias for xpTier
  nodes: SkillNode[];
}

export const skillTreeData: Record<string, SkillDomainData> = {
  "frontend": {
    slug: "frontend",
    title: "Frontend Engineering",
    description: "Master user interfaces, client state, performance optimization, and browser compilation.",
    domain: "FRONTEND",
    xpTier: 1200,
    xpAward: 1200,
    nodes: [
      {
        id: "fe-html-css",
        title: "HTML5 & CSS3 Core",
        name: "HTML5 & CSS3 Core",
        description: "Understand semantic markup, layouts (Flexbox, Grid), responsive viewports, and custom variables.",
        xpReward: 100,
        xp: 100,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["fe-js-basics", "fe-tailwind-ui"],
        projectsUnlocked: ["portfolio-website"],
        recommendedProjects: [{ name: "Sleek Dark Portfolio", url: "/project-roadmaps/portfolio-website" }],
        recommendedRoadmaps: ["Frontend Developer"],
        companyTracksUnlocked: ["wix", "shopify"]
      },
      {
        id: "fe-js-basics",
        title: "JavaScript ES6 Async",
        name: "JavaScript ES6 Async",
        description: "Promises, async/await, closures, lexical scopes, event bubbling, and DOM manipulations.",
        xpReward: 150,
        xp: 150,
        level: "BEGINNER",
        prerequisites: ["fe-html-css"],
        unlocks: ["fe-react-core"],
        projectsUnlocked: ["weather-app", "todo-app"],
        recommendedProjects: [{ name: "Weather Dashboard", url: "/roadmaps/frontend-developer" }],
        recommendedRoadmaps: ["Frontend Developer"],
        companyTracksUnlocked: ["adobe", "razorpay"]
      },
      {
        id: "fe-tailwind-ui",
        title: "Tailwind CSS & Modern UI",
        name: "Tailwind CSS & Modern UI",
        description: "Master utility-first styles, layout grids, transitions, theme variables, and shadcn components.",
        xpReward: 100,
        xp: 100,
        level: "BEGINNER",
        prerequisites: ["fe-html-css"],
        unlocks: ["fe-react-core"],
        projectsUnlocked: ["expense-tracker"],
        recommendedProjects: [{ name: "Sleek Dark Portfolio", url: "/project-roadmaps/portfolio-website" }],
        recommendedRoadmaps: ["Frontend Developer"],
        companyTracksUnlocked: []
      },
      {
        id: "fe-react-core",
        title: "React Library & Hooks",
        name: "React Library & Hooks",
        description: "Virtual DOM, state management, render optimizations (useMemo, useCallback), props, and context providers.",
        xpReward: 250,
        xp: 250,
        level: "INTERMEDIATE",
        prerequisites: ["fe-js-basics"],
        unlocks: ["fe-state-mgmt", "fe-nextjs-app", "fe-testing"],
        projectsUnlocked: ["netflix-clone", "job-portal"],
        recommendedProjects: [{ name: "Netflix Clone", url: "/project-roadmaps/netflix-clone" }],
        recommendedRoadmaps: ["Frontend Developer", "Full Stack Developer"],
        companyTracksUnlocked: ["meta", "netflix"]
      },
      {
        id: "fe-state-mgmt",
        title: "Zustand & State Management",
        name: "Zustand & State Management",
        description: "Explore atomic state trees, client actions, persistence layers, and reactive bindings.",
        xpReward: 200,
        xp: 200,
        level: "INTERMEDIATE",
        prerequisites: ["fe-react-core"],
        unlocks: ["fe-nextjs-app"],
        projectsUnlocked: ["e-commerce-platform"],
        recommendedProjects: [{ name: "Dashboard Workspace", url: "/dashboard" }],
        recommendedRoadmaps: ["Frontend Developer"],
        companyTracksUnlocked: ["stripe", "coinbase"]
      },
      {
        id: "fe-nextjs-app",
        title: "Next.js Framework & SSR",
        name: "Next.js Framework & SSR",
        description: "Server Component models, Hydration layouts, route pre-fetching, dynamic loading, and SEO indicators.",
        xpReward: 350,
        xp: 350,
        level: "ADVANCED",
        prerequisites: ["fe-react-core"],
        unlocks: ["fe-perf-audit", "fe-security"],
        projectsUnlocked: ["ai-resume-analyzer", "lms-platform"],
        recommendedProjects: [{ name: "AI Resume Analyzer", url: "/project-roadmaps/ai-resume-analyzer" }],
        recommendedRoadmaps: ["Frontend Developer", "Full Stack Developer"],
        companyTracksUnlocked: ["vercel", "supabase"]
      },
      {
        id: "fe-testing",
        title: "Testing & Jest",
        name: "Testing & Jest",
        description: "Write unit tests with Jest and component tests using React Testing Library. Perform E2E tests.",
        xpReward: 150,
        xp: 150,
        level: "INTERMEDIATE",
        prerequisites: ["fe-react-core"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Frontend Developer"],
        companyTracksUnlocked: []
      },
      {
        id: "fe-perf-audit",
        title: "Web Performance & CWV",
        name: "Web Performance & CWV",
        description: "Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), dynamic code splitting, and bundle sizes.",
        xpReward: 250,
        xp: 250,
        level: "ADVANCED",
        prerequisites: ["fe-nextjs-app"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Frontend Developer"],
        companyTracksUnlocked: ["google", "netflix"]
      },
      {
        id: "fe-security",
        title: "Web Security & Headers",
        name: "Web Security & Headers",
        description: "Mitigate Cross-Site Scripting (XSS), CSRF, verify Content Security Policies, and cookies security.",
        xpReward: 200,
        xp: 200,
        level: "ADVANCED",
        prerequisites: ["fe-nextjs-app"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Frontend Developer"],
        companyTracksUnlocked: ["cloudflare", "okta"]
      }
    ]
  },
  "backend": {
    slug: "backend",
    title: "Backend Engineering",
    description: "Construct scalable servers, API structures, databases mappings, and secure authentications.",
    domain: "BACKEND",
    xpTier: 1500,
    xpAward: 1500,
    nodes: [
      {
        id: "be-express-node",
        title: "NodeJS & Express Servers",
        name: "NodeJS & Express Servers",
        description: "Server setup, middlewares, routing, custom error boundary configurations, and fs logs.",
        xpReward: 150,
        xp: 150,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["be-db-sql", "be-jwt-auth"],
        projectsUnlocked: ["url-shortener"],
        recommendedProjects: [{ name: "Secure Task REST API", url: "/project-roadmaps/url-shortener" }],
        recommendedRoadmaps: ["Backend Developer"],
        companyTracksUnlocked: ["paypal", "juspay"]
      },
      {
        id: "be-db-sql",
        title: "PostgreSQL & Prisma Client",
        name: "PostgreSQL & Prisma Client",
        description: "Relational data structures, raw query indexes, transaction locks, migrations, and joins.",
        xpReward: 250,
        xp: 250,
        level: "INTERMEDIATE",
        prerequisites: ["be-express-node"],
        unlocks: ["be-scaling"],
        projectsUnlocked: ["e-commerce-platform"],
        recommendedProjects: [{ name: "E-Commerce System", url: "/project-roadmaps/e-commerce-platform" }],
        recommendedRoadmaps: ["Backend Developer", "Full Stack Developer"],
        companyTracksUnlocked: ["snowflake", "supabase"]
      },
      {
        id: "be-jwt-auth",
        title: "JWT Auth & Session Guards",
        name: "JWT Auth & Session Guards",
        description: "Token creation, refresh tokens strategies, password hashing layouts (bcrypt), and CORS headers.",
        xpReward: 200,
        xp: 200,
        level: "INTERMEDIATE",
        prerequisites: ["be-express-node"],
        unlocks: ["be-scaling"],
        projectsUnlocked: [],
        recommendedProjects: [{ name: "Task Manager backend", url: "/roadmaps/backend-developer" }],
        recommendedRoadmaps: ["Backend Developer"],
        companyTracksUnlocked: ["okta", "auth0"]
      },
      {
        id: "be-scaling",
        title: "Message Queues & Cache",
        name: "Message Queues & Cache",
        description: "In-memory caching mechanisms using Redis, publisher-subscriber systems, and server pooling.",
        xpReward: 400,
        xp: 400,
        level: "ADVANCED",
        prerequisites: ["be-db-sql", "be-jwt-auth"],
        unlocks: ["be-microservices"],
        projectsUnlocked: ["chat-application", "ride-sharing"],
        recommendedProjects: [{ name: "Chat Application", url: "/project-roadmaps/chat-application" }],
        recommendedRoadmaps: ["Backend Developer", "System Design"],
        companyTracksUnlocked: ["uber", "amazon"]
      },
      {
        id: "be-microservices",
        title: "Microservices & gRPC",
        name: "Microservices & gRPC",
        description: "Decouple massive applications into self-contained services communicating via gRPC or message queues.",
        xpReward: 500,
        xp: 500,
        level: "ADVANCED",
        prerequisites: ["be-scaling"],
        unlocks: [],
        projectsUnlocked: ["food-delivery"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Software Architect"],
        companyTracksUnlocked: ["netflix", "databricks"]
      }
    ]
  },
  "dsa": {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    description: "Analyze code computational complexity, arrays, heaps, dynamic programming, and search grids.",
    domain: "DSA",
    xpTier: 1800,
    xpAward: 1800,
    nodes: [
      {
        id: "dsa-big-o",
        title: "Complexity Bounds (Big O)",
        name: "Complexity Bounds (Big O)",
        description: "Compute operation counts and memory overheads across linear, binary, and quadratic loops.",
        xpReward: 100,
        xp: 100,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["dsa-arrays-lists", "dsa-search-sort"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: []
      },
      {
        id: "dsa-arrays-lists",
        title: "Arrays & LinkedLists",
        name: "Arrays & LinkedLists",
        description: "Contiguous vs linked node allocations. Reverse lists, detect cycles, merge lists, and multi-pointer search.",
        xpReward: 150,
        xp: 150,
        level: "BEGINNER",
        prerequisites: ["dsa-big-o"],
        unlocks: ["dsa-stacks-queues"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: ["morgan-stanley"]
      },
      {
        id: "dsa-stacks-queues",
        title: "Stacks & Queues",
        name: "Stacks & Queues",
        description: "LIFO/FIFO mechanisms. Monotonic stack logic, circular buffer queues, and queue implementations using stacks.",
        xpReward: 150,
        xp: 150,
        level: "BEGINNER",
        prerequisites: ["dsa-arrays-lists"],
        unlocks: ["dsa-trees-graphs"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: []
      },
      {
        id: "dsa-search-sort",
        title: "Searching & Sorting",
        name: "Searching & Sorting",
        description: "Binary Search bounds, Merge Sort divide-and-conquer, Quick Sort partitioning, and topological ordering.",
        xpReward: 200,
        xp: 200,
        level: "BEGINNER",
        prerequisites: ["dsa-big-o"],
        unlocks: ["dsa-greedy"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: []
      },
      {
        id: "dsa-trees-graphs",
        title: "Tree & Graph Traversals",
        name: "Tree & Graph Traversals",
        description: "Solve BST paths, BFS/DFS sweeps, Dijkstra weights, topological ordering, and cycle checks.",
        xpReward: 300,
        xp: 300,
        level: "INTERMEDIATE",
        prerequisites: ["dsa-big-o"],
        unlocks: ["dsa-heaps", "dsa-dp-advanced"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: ["google", "meta"]
      },
      {
        id: "dsa-heaps",
        title: "Heaps & Priority Queues",
        name: "Heaps & Priority Queues",
        description: "Heap structures, heapify insertions, dynamic priority schedules, and heap sort complexity.",
        xpReward: 250,
        xp: 250,
        level: "INTERMEDIATE",
        prerequisites: ["dsa-trees-graphs"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: ["amazon"]
      },
      {
        id: "dsa-greedy",
        title: "Greedy Algorithms",
        name: "Greedy Algorithms",
        description: "Activity selections, Huffman Coding trees, and fractional knapsack constraints.",
        xpReward: 200,
        xp: 200,
        level: "INTERMEDIATE",
        prerequisites: ["dsa-search-sort"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: []
      },
      {
        id: "dsa-dp-advanced",
        title: "Dynamic Programming",
        name: "Dynamic Programming",
        description: "Optimizing overlapping structures using memoization charts and tabulation matrices.",
        xpReward: 450,
        xp: 450,
        level: "ADVANCED",
        prerequisites: ["dsa-trees-graphs"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DSA"],
        companyTracksUnlocked: ["google", "de-shaw", "uber"]
      }
    ]
  },
  "devops": {
    slug: "devops",
    title: "Cloud & DevOps Engineering",
    description: "Build robust automation pipelines, container orchestrations, and cloud metrics monitors.",
    domain: "DEVOPS",
    xpTier: 1400,
    xpAward: 1400,
    nodes: [
      {
        id: "do-linux-cli",
        title: "Linux & Bash Scripting",
        name: "Linux & Bash Scripting",
        description: "Understand file system hierarchy, process flags, environment variables, and shell automations.",
        xpReward: 100,
        xp: 100,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["do-docker-compose"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevOps Engineer"],
        companyTracksUnlocked: []
      },
      {
        id: "do-docker-compose",
        title: "Docker Containerization",
        name: "Docker Containerization",
        description: "Write Dockerfiles, bundle dependencies layers, isolate environments, and bind ports.",
        xpReward: 200,
        xp: 200,
        level: "INTERMEDIATE",
        prerequisites: ["do-linux-cli"],
        unlocks: ["do-kubernetes-cluster", "do-actions-cicd"],
        projectsUnlocked: ["devops-monitoring"],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevOps Engineer"],
        companyTracksUnlocked: ["atlassian"]
      },
      {
        id: "do-kubernetes-cluster",
        title: "Kubernetes Orchestration",
        name: "Kubernetes Orchestration",
        description: "Manage pods lifecycle, services network layers, configmaps, and secrets inside local clusters.",
        xpReward: 400,
        xp: 400,
        level: "ADVANCED",
        prerequisites: ["do-docker-compose"],
        unlocks: [],
        projectsUnlocked: ["kubernetes-dashboard"],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevOps Engineer"],
        companyTracksUnlocked: ["netflix", "databricks"]
      },
      {
        id: "do-actions-cicd",
        title: "GitHub Actions CI/CD",
        name: "GitHub Actions CI/CD",
        description: "Set up test validation runners, automate lint checks, and script CD releases upon tag changes.",
        xpReward: 250,
        xp: 250,
        level: "ADVANCED",
        prerequisites: ["do-docker-compose"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevOps Engineer"],
        companyTracksUnlocked: ["stripe", "cloudflare"]
      }
    ]
  },
  "ai_ml": {
    slug: "ai_ml",
    title: "AI & Machine Learning",
    description: "Train intelligence models, configure transformers layers, and scale vectors indexes operations.",
    domain: "AI_ML",
    xpTier: 1600,
    xpAward: 1600,
    nodes: [
      {
        id: "ml-numpy-pandas",
        title: "Python Data Preprocessing",
        name: "Python Data Preprocessing",
        description: "Load datasets, normalize metrics scales, fill missing values, and analyze correlations.",
        xpReward: 120,
        xp: 120,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["ml-classifiers"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Machine Learning Engineer", "AI Engineer"],
        companyTracksUnlocked: []
      },
      {
        id: "ml-classifiers",
        title: "Scikit-Learn ML Models",
        name: "Scikit-Learn ML Models",
        description: "Implement regressions, decision trees, random forests, and evaluate precision/recall curves.",
        xpReward: 220,
        xp: 220,
        level: "INTERMEDIATE",
        prerequisites: ["ml-numpy-pandas"],
        unlocks: ["ml-pytorch-deep", "ml-transformers"],
        projectsUnlocked: ["stock-prediction"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Machine Learning Engineer"],
        companyTracksUnlocked: ["nvidia"]
      },
      {
        id: "ml-pytorch-deep",
        title: "PyTorch Deep Learning",
        name: "PyTorch Deep Learning",
        description: "Construct neural networks, manage backpropagation optimization cycles, and activate layers.",
        xpReward: 350,
        xp: 350,
        level: "ADVANCED",
        prerequisites: ["ml-classifiers"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["AI & Data Scientist"],
        companyTracksUnlocked: ["openai", "anthropic"]
      },
      {
        id: "ml-transformers",
        title: "Transformers & LLMs",
        name: "Transformers & LLMs",
        description: "Fine-tune pretrained weights, configure embeddings models, and manage vector indices.",
        xpReward: 400,
        xp: 400,
        level: "ADVANCED",
        prerequisites: ["ml-classifiers"],
        unlocks: [],
        projectsUnlocked: ["rag-pdf-chatbot"],
        recommendedProjects: [],
        recommendedRoadmaps: ["AI Engineer"],
        companyTracksUnlocked: ["openai", "perplexity"]
      }
    ]
  },
  "databases": {
    slug: "databases",
    title: "Database Engineering",
    description: "Design relational models, optimize indexing queries, sharding partitions, and transactions constraints.",
    domain: "DATABASES",
    xpTier: 1300,
    xpAward: 1300,
    nodes: [
      {
        id: "db-queries-joins",
        title: "SQL Queries & Aggregations",
        name: "SQL Queries & Aggregations",
        description: "Master primary keys, database schemas normalization, join filters, and SUM/AVG queries.",
        xpReward: 100,
        xp: 100,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["db-indexes-tuning"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["PostgreSQL Engineer"],
        companyTracksUnlocked: []
      },
      {
        id: "db-indexes-tuning",
        title: "Indexes & Query Profiling",
        name: "Indexes & Query Profiling",
        description: "Create B-Tree indexes, review query execution plans, and optimize slow execution loops.",
        xpReward: 200,
        xp: 200,
        level: "INTERMEDIATE",
        prerequisites: ["db-queries-joins"],
        unlocks: ["db-transactions-acid"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["PostgreSQL Engineer"],
        companyTracksUnlocked: ["morgan-stanley"]
      },
      {
        id: "db-transactions-acid",
        title: "ACID & Transactions Locks",
        name: "ACID & Transactions Locks",
        description: "Configure transactional boundary limits, concurrency isolation levels, and prevent deadlock conditions.",
        xpReward: 300,
        xp: 300,
        level: "ADVANCED",
        prerequisites: ["db-indexes-tuning"],
        unlocks: [],
        projectsUnlocked: ["e-commerce-platform"],
        recommendedProjects: [],
        recommendedRoadmaps: ["PostgreSQL Engineer"],
        companyTracksUnlocked: ["paypal", "razorpay"]
      }
    ]
  },
  "system_design": {
    slug: "system_design",
    title: "System Design Architectures",
    description: "Architect high availability, horizontally scaled distributed applications, load balancers, and caches.",
    domain: "SYSTEM_DESIGN",
    xpTier: 1500,
    xpAward: 1500,
    nodes: [
      {
        id: "sd-horizontal-scale",
        title: "Scale, Latency & Throughput",
        name: "Scale, Latency & Throughput",
        description: "Differentiate horizontal vs vertical scaling, load balancer algorithms, and stateless routing patterns.",
        xpReward: 150,
        xp: 150,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["sd-caching-redis"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Software Architect"],
        companyTracksUnlocked: []
      },
      {
        id: "sd-caching-redis",
        title: "Distributed Caching & Redis",
        name: "Distributed Caching & Redis",
        description: "Implement write-through / cache-aside patterns, key evictions models, and prevent cache stampedes.",
        xpReward: 250,
        xp: 250,
        level: "INTERMEDIATE",
        prerequisites: ["sd-horizontal-scale"],
        unlocks: ["sd-sharding-replic"],
        projectsUnlocked: ["url-shortener"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Software Architect"],
        companyTracksUnlocked: ["amazon"]
      },
      {
        id: "sd-sharding-replic",
        title: "Database Sharding & Replication",
        name: "Database Sharding & Replication",
        description: "Master primary-replica synchronization lags, consistent hashing, database sharding partitions, and split-brain checks.",
        xpReward: 400,
        xp: 400,
        level: "ADVANCED",
        prerequisites: ["sd-caching-redis"],
        unlocks: [],
        projectsUnlocked: ["ride-sharing"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Software Architect"],
        companyTracksUnlocked: ["google", "meta", "netflix", "uber"]
      }
    ]
  },
  "cloud": {
    slug: "cloud",
    title: "Cloud Computing Platforms",
    description: "Configure cloud virtual instances, virtual networks, CDNs, and serverless compute tools.",
    domain: "CLOUD",
    xpTier: 1350,
    xpAward: 1350,
    nodes: [
      {
        id: "cloud-vms-vpcs",
        title: "Cloud compute (EC2) & VPCs",
        name: "Cloud compute (EC2) & VPCs",
        description: "Setup cloud servers instances, manage security group settings, and partition virtual networks.",
        xpReward: 120,
        xp: 120,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["cloud-cdn-storage"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevOps Engineer"],
        companyTracksUnlocked: []
      },
      {
        id: "cloud-cdn-storage",
        title: "Object Storage & CDNs",
        name: "Object Storage & CDNs",
        description: "Store asset objects, map asset caching, and accelerate edge traffic using CloudFront layouts.",
        xpReward: 220,
        xp: 220,
        level: "INTERMEDIATE",
        prerequisites: ["cloud-vms-vpcs"],
        unlocks: ["cloud-terraform-iac"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevOps Engineer"],
        companyTracksUnlocked: ["cloudflare"]
      },
      {
        id: "cloud-terraform-iac",
        title: "Terraform Infrastructure as Code",
        name: "Terraform Infrastructure as Code",
        description: "Script infrastructure setups, manage remote state variables, and orchestrate cloud networks.",
        xpReward: 350,
        xp: 350,
        level: "ADVANCED",
        prerequisites: ["cloud-cdn-storage"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevOps Engineer"],
        companyTracksUnlocked: ["hashicorp", "aws"]
      }
    ]
  },
  "cybersecurity": {
    slug: "cybersecurity",
    title: "Cyber Security & Defense",
    description: "Verify security vulnerabilities, encrypt data transactions, and check network firewalls.",
    domain: "CYBERSECURITY",
    xpTier: 1400,
    xpAward: 1400,
    nodes: [
      {
        id: "sec-owasp-top",
        title: "OWASP Top 10 vulnerabilities",
        name: "OWASP Top 10 vulnerabilities",
        description: "Mitigate SQL Injection flaws, Cross-Site Scripting (XSS), cross-origin CSRF, and broken access rules.",
        xpReward: 120,
        xp: 120,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["sec-encrypt-keys"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Cyber Security Engineer", "DevSecOps Engineer"],
        companyTracksUnlocked: []
      },
      {
        id: "sec-encrypt-keys",
        title: "Cryptographic Keys & SSL",
        name: "Cryptographic Keys & SSL",
        description: "Configure TLS handshakes, manage asymmetric encryption keys, verify public key structures, and hashing.",
        xpReward: 220,
        xp: 220,
        level: "INTERMEDIATE",
        prerequisites: ["sec-owasp-top"],
        unlocks: ["sec-auditing-scans"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Cyber Security Engineer"],
        companyTracksUnlocked: ["coinbase"]
      },
      {
        id: "sec-auditing-scans",
        title: "Security Scans & Firewalls",
        name: "Security Scans & Firewalls",
        description: "Execute static SAST code analysis, configure network firewalls, and audit container image CVE indicators.",
        xpReward: 350,
        xp: 350,
        level: "ADVANCED",
        prerequisites: ["sec-encrypt-keys"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["DevSecOps Engineer"],
        companyTracksUnlocked: ["cloudflare", "palantir"]
      }
    ]
  },
  "mobile": {
    slug: "mobile",
    title: "Mobile Development",
    description: "Build native Android and iOS mobile applications with local database storage caching.",
    domain: "MOBILE",
    xpTier: 1300,
    xpAward: 1300,
    nodes: [
      {
        id: "mob-lang-basics",
        title: "Kotlin & Swift Programming",
        name: "Kotlin & Swift Programming",
        description: "Master optional values, object classes, structural layouts, and concurrent functions in mobile languages.",
        xpReward: 100,
        xp: 100,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["mob-layout-views"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Android Developer", "iOS Developer"],
        companyTracksUnlocked: []
      },
      {
        id: "mob-layout-views",
        title: "Jetpack Compose & SwiftUI",
        name: "Jetpack Compose & SwiftUI",
        description: "Create responsive mobile interfaces using declarative styling, list rows, and view state binders.",
        xpReward: 200,
        xp: 200,
        level: "INTERMEDIATE",
        prerequisites: ["mob-lang-basics"],
        unlocks: ["mob-cache-sqlite"],
        projectsUnlocked: ["weather-app"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Android Developer", "iOS Developer"],
        companyTracksUnlocked: ["apple"]
      },
      {
        id: "mob-cache-sqlite",
        title: "Local Database Caching (Room/CoreData)",
        name: "Local Database Caching (Room/CoreData)",
        description: "Configure local relational entities, store configurations caches, and sync remote payloads offline.",
        xpReward: 300,
        xp: 300,
        level: "ADVANCED",
        prerequisites: ["mob-layout-views"],
        unlocks: [],
        projectsUnlocked: ["todo-app"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Android Developer", "iOS Developer"],
        companyTracksUnlocked: ["swiggy", "uber"]
      }
    ]
  },
  "game_dev": {
    slug: "game_dev",
    title: "Game Development",
    description: "Design game physics loops, asset renders, and coordinate multiplayer lobbies routing.",
    domain: "GAME_DEV",
    xpTier: 1400,
    xpAward: 1400,
    nodes: [
      {
        id: "game-canvas-physics",
        title: "2D Canvas & Physics Vectors",
        name: "2D Canvas & Physics Vectors",
        description: "Manage requestAnimationFrame vectors loops, trace object collisions boundaries, and process velocity adjustments.",
        xpReward: 120,
        xp: 120,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["game-engines-unity"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Game Developer"],
        companyTracksUnlocked: []
      },
      {
        id: "game-engines-unity",
        title: "C# Scripting & Unity Layouts",
        name: "C# Scripting & Unity Layouts",
        description: "Master Unity components hierarchy, scripting updates, collision sensors, and coordinate transforms.",
        xpReward: 220,
        xp: 220,
        level: "INTERMEDIATE",
        prerequisites: ["game-canvas-physics"],
        unlocks: ["game-lobby-multiplayer"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Game Developer"],
        companyTracksUnlocked: ["epic-games"]
      },
      {
        id: "game-lobby-multiplayer",
        title: "Multiplayer Lobby & Socket Servers",
        name: "Multiplayer Lobby & Socket Servers",
        description: "Synchronize participant movements, optimize frame intervals lag, and configure server lobby instances.",
        xpReward: 350,
        xp: 350,
        level: "ADVANCED",
        prerequisites: ["game-engines-unity"],
        unlocks: [],
        projectsUnlocked: ["chat-application"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Server Side Game Developer"],
        companyTracksUnlocked: ["sony", "valve"]
      }
    ]
  },
  "data_eng": {
    slug: "data_eng",
    title: "Data Engineering",
    description: "Orchestrate ETL pipelines, build analytical warehousing grids, and process big data logs.",
    domain: "DATA_ENG",
    xpTier: 1500,
    xpAward: 1500,
    nodes: [
      {
        id: "de-warehouse-schemas",
        title: "SQL & Star schemas data models",
        name: "SQL & Star schemas data models",
        description: "Model transactional analytics databases using dimension tables and fact tables.",
        xpReward: 120,
        xp: 120,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["de-pipelines-airflow"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Data Engineer", "BI Analyst"],
        companyTracksUnlocked: []
      },
      {
        id: "de-pipelines-airflow",
        title: "Airflow ETL pipelines",
        name: "Airflow ETL pipelines",
        description: "Construct dynamic extract-transform-load DAG loops, schedule pipelines, and track query states.",
        xpReward: 230,
        xp: 230,
        level: "INTERMEDIATE",
        prerequisites: ["de-warehouse-schemas"],
        unlocks: ["de-spark-processing"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Data Engineer"],
        companyTracksUnlocked: ["snowflake"]
      },
      {
        id: "de-spark-processing",
        title: "Apache Spark big data compute",
        name: "Apache Spark big data compute",
        description: "Coordinate queries computation across distributed database clusters, partitioning logs datasets.",
        xpReward: 400,
        xp: 400,
        level: "ADVANCED",
        prerequisites: ["de-pipelines-airflow"],
        unlocks: [],
        projectsUnlocked: ["stock-prediction"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Data Engineer"],
        companyTracksUnlocked: ["databricks"]
      }
    ]
  },
  "blockchain": {
    slug: "blockchain",
    title: "Blockchain Development",
    description: "Write Solidity smart contracts, deploy token interfaces, and audit security layers.",
    domain: "BLOCKCHAIN",
    xpTier: 1400,
    xpAward: 1400,
    nodes: [
      {
        id: "bc-contracts-basics",
        title: "Solidity & Smart Contracts",
        name: "Solidity & Smart Contracts",
        description: "Understand state variables storage logic, mapping types, parameters validations, and functions rules.",
        xpReward: 120,
        xp: 120,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["bc-deploy-frameworks"],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Blockchain Developer"],
        companyTracksUnlocked: []
      },
      {
        id: "bc-deploy-frameworks",
        title: "Hardhat & Web3 Client Interfaces",
        name: "Hardhat & Web3 Client Interfaces",
        description: "Compile contract structures, deploy to testnets, and integrate browser wallet scripts.",
        xpReward: 220,
        xp: 220,
        level: "INTERMEDIATE",
        prerequisites: ["bc-contracts-basics"],
        unlocks: ["bc-auditing-attacks"],
        projectsUnlocked: ["todo-app"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Blockchain Developer"],
        companyTracksUnlocked: ["coinbase"]
      },
      {
        id: "bc-auditing-attacks",
        title: "Reentrancy & Gas Optimizations",
        name: "Reentrancy & Gas Optimizations",
        description: "Mitigate reentrancy execution logic bugs, verify transfer call boundaries, and drop gas loops costs.",
        xpReward: 380,
        xp: 380,
        level: "ADVANCED",
        prerequisites: ["bc-deploy-frameworks"],
        unlocks: [],
        projectsUnlocked: [],
        recommendedProjects: [],
        recommendedRoadmaps: ["Blockchain Developer"],
        companyTracksUnlocked: ["consensys"]
      }
    ]
  },
  "product_eng": {
    slug: "product_eng",
    title: "Product Engineering",
    description: "Align technical architecture design grids with user goals, SEO indexing, and product metrics.",
    domain: "PRODUCT_ENG",
    xpTier: 1300,
    xpAward: 1300,
    nodes: [
      {
        id: "pe-ux-align",
        title: "User Experience (UX) UI basics",
        name: "User Experience (UX) UI basics",
        description: "Map visual structural grids, construct interactive mock templates, and analyze conversion channels.",
        xpReward: 100,
        xp: 100,
        level: "BEGINNER",
        prerequisites: [],
        unlocks: ["pe-writing-docs"],
        projectsUnlocked: ["portfolio-website"],
        recommendedProjects: [],
        recommendedRoadmaps: ["UX Designer", "Product Manager"],
        companyTracksUnlocked: []
      },
      {
        id: "pe-writing-docs",
        title: "Technical Writing & Docs layouts",
        name: "Technical Writing & Docs layouts",
        description: "Draft clear developer documentation files, structure markdown layouts, and define APIs endpoints specifications.",
        xpReward: 200,
        xp: 200,
        level: "INTERMEDIATE",
        prerequisites: ["pe-ux-align"],
        unlocks: ["pe-metrics-analytics"],
        projectsUnlocked: ["blog-cms"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Technical Writer"],
        companyTracksUnlocked: ["atlassian"]
      },
      {
        id: "pe-metrics-analytics",
        title: "Product Analytics & Funnels",
        name: "Product Analytics & Funnels",
        description: "Track user retention funnels, set up behavioral analytics tags, and optimize conversion grids.",
        xpReward: 300,
        xp: 300,
        level: "ADVANCED",
        prerequisites: ["pe-writing-docs"],
        unlocks: [],
        projectsUnlocked: ["job-portal"],
        recommendedProjects: [],
        recommendedRoadmaps: ["Product Manager", "Engineering Manager"],
        companyTracksUnlocked: ["google", "meta"]
      }
    ]
  }
};
