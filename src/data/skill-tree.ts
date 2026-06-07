export interface SkillNode {
  id: string;
  name: string;
  description: string;
  xp: number;
  prerequisites: string[];
  recommendedRoadmaps: string[];
  recommendedProjects: { name: string; url: string }[];
}

export interface SkillDomainData {
  slug: string;
  title: string;
  description: string;
  domain: "FRONTEND" | "BACKEND" | "DSA" | "DEVOPS" | "AI_ML" | "DATABASES" | "SYSTEM_DESIGN" | "CLOUD" | "CYBERSECURITY";
  nodes: SkillNode[];
  xpAward: number;
}

export const skillTreeData: Record<string, SkillDomainData> = {
  "frontend": {
    slug: "frontend",
    title: "Frontend Engineering",
    description: "Master user interfaces, client state, performance optimization, and browser compilation.",
    domain: "FRONTEND",
    xpAward: 1200,
    nodes: [
      {
        id: "fe-html-css",
        name: "HTML5 & CSS3 Core",
        description: "Understand semantic markup, layouts (Flexbox, Grid), responsive viewports, and custom variables.",
        xp: 100,
        prerequisites: [],
        recommendedRoadmaps: ["Frontend Developer"],
        recommendedProjects: [{ name: "Sleek Dark Portfolio", url: "/project-roadmaps/portfolio-website" }]
      },
      {
        id: "fe-js-basics",
        name: "JavaScript ES6 Async",
        description: "Promises, async/await, closures, lexical scopes, event bubbling, and DOM manipulations.",
        xp: 150,
        prerequisites: ["fe-html-css"],
        recommendedRoadmaps: ["Frontend Developer"],
        recommendedProjects: [{ name: "Weather Dashboard", url: "/roadmaps/frontend-developer" }]
      },
      {
        id: "fe-tailwind-ui",
        name: "Tailwind CSS & Modern UI",
        description: "Master utility-first styles, layout grids, transitions, theme variables, and shadcn components.",
        xp: 100,
        prerequisites: ["fe-html-css"],
        recommendedRoadmaps: ["Frontend Developer"],
        recommendedProjects: [{ name: "Sleek Dark Portfolio", url: "/project-roadmaps/portfolio-website" }]
      },
      {
        id: "fe-react-core",
        name: "React Library & Hooks",
        description: "Virtual DOM, state management, render optimizations (useMemo, useCallback), props, and context providers.",
        xp: 250,
        prerequisites: ["fe-js-basics"],
        recommendedRoadmaps: ["Frontend Developer", "Full Stack Developer"],
        recommendedProjects: [{ name: "Netflix Clone", url: "/project-roadmaps/netflix-clone" }]
      },
      {
        id: "fe-state-mgmt",
        name: "Zustand & State Management",
        description: "Explore atomic state trees, client actions, persistence layers, and reactive bindings.",
        xp: 200,
        prerequisites: ["fe-react-core"],
        recommendedRoadmaps: ["Frontend Developer"],
        recommendedProjects: [{ name: "Dashboard Workspace", url: "/dashboard" }]
      },
      {
        id: "fe-nextjs-app",
        name: "Next.js Framework & SSR",
        description: "Server Component models, Hydration layouts, route pre-fetching, dynamic loading, and SEO indicators.",
        xp: 350,
        prerequisites: ["fe-react-core"],
        recommendedRoadmaps: ["Frontend Developer", "Full Stack Developer"],
        recommendedProjects: [{ name: "AI Resume Analyzer", url: "/project-roadmaps/ai-resume-analyzer" }]
      },
      {
        id: "fe-testing",
        name: "Testing & Jest",
        description: "Write unit tests with Jest and component tests using React Testing Library. Perform E2E tests.",
        xp: 150,
        prerequisites: ["fe-react-core"],
        recommendedRoadmaps: ["Frontend Developer"],
        recommendedProjects: []
      },
      {
        id: "fe-perf-audit",
        name: "Web Performance & CWV",
        description: "Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), dynamic code splitting, and bundle sizes.",
        xp: 250,
        prerequisites: ["fe-nextjs-app"],
        recommendedRoadmaps: ["Frontend Developer"],
        recommendedProjects: []
      },
      {
        id: "fe-security",
        name: "Web Security & Headers",
        description: "Mitigate Cross-Site Scripting (XSS), CSRF, verify Content Security Policies, and cookies security.",
        xp: 200,
        prerequisites: ["fe-nextjs-app"],
        recommendedRoadmaps: ["Frontend Developer"],
        recommendedProjects: []
      }
    ]
  },
  "backend": {
    slug: "backend",
    title: "Backend Engineering",
    description: "Construct scalable servers, API structures, databases mappings, and secure authentications.",
    domain: "BACKEND",
    xpAward: 1500,
    nodes: [
      {
        id: "be-express-node",
        name: "NodeJS & Express Servers",
        description: "Server setup, middlewares, routing, custom error boundary configurations, and fs logs.",
        xp: 150,
        prerequisites: [],
        recommendedRoadmaps: ["Backend Developer"],
        recommendedProjects: [{ name: "Secure Task REST API", url: "/project-roadmaps/url-shortener" }]
      },
      {
        id: "be-db-sql",
        name: "PostgreSQL & Prisma Client",
        description: "Relational data structures, raw query indexes, transaction locks, migrations, and joins.",
        xp: 250,
        prerequisites: ["be-express-node"],
        recommendedRoadmaps: ["Backend Developer", "Full Stack Developer"],
        recommendedProjects: [{ name: "E-Commerce System", url: "/project-roadmaps/e-commerce-platform" }]
      },
      {
        id: "be-jwt-auth",
        name: "JWT Auth & Session Guards",
        description: "Token creation, refresh tokens strategies, password hashing layouts (bcrypt), and CORS headers.",
        xp: 200,
        prerequisites: ["be-express-node"],
        recommendedRoadmaps: ["Backend Developer"],
        recommendedProjects: [{ name: "Task Manager backend", url: "/roadmaps/backend-developer" }]
      },
      {
        id: "be-scaling",
        name: "Message Queues & Cache",
        description: "In-memory caching mechanisms using Redis, publisher-subscriber systems, and server pooling.",
        xp: 400,
        prerequisites: ["be-db-sql", "be-jwt-auth"],
        recommendedRoadmaps: ["Backend Developer", "System Design"],
        recommendedProjects: [{ name: "Chat Application", url: "/project-roadmaps/chat-application" }]
      }
    ]
  },
  "dsa": {
    slug: "dsa",
    title: "Data Structures & Algorithms",
    description: "Analyze code computational complexity, arrays, heaps, dynamic programming, and search grids.",
    domain: "DSA",
    xpAward: 1800,
    nodes: [
      {
        id: "dsa-big-o",
        name: "Complexity Bounds (Big O)",
        description: "Compute operation counts and memory overheads across linear, binary, and quadratic loops.",
        xp: 100,
        prerequisites: [],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      },
      {
        id: "dsa-arrays-lists",
        name: "Arrays & LinkedLists",
        description: "Contiguous vs linked node allocations. Reverse lists, detect cycles, merge lists, and multi-pointer search.",
        xp: 150,
        prerequisites: ["dsa-big-o"],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      },
      {
        id: "dsa-stacks-queues",
        name: "Stacks & Queues",
        description: "LIFO/FIFO mechanisms. Monotonic stack logic, circular buffer queues, and queue implementations using stacks.",
        xp: 150,
        prerequisites: ["dsa-arrays-lists"],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      },
      {
        id: "dsa-search-sort",
        name: "Searching & Sorting",
        description: "Binary Search bounds, Merge Sort divide-and-conquer, Quick Sort partitioning, and topological ordering.",
        xp: 200,
        prerequisites: ["dsa-big-o"],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      },
      {
        id: "dsa-trees-graphs",
        name: "Tree & Graph Traversals",
        description: "Solve BST paths, BFS/DFS sweeps, Dijkstra weights, topological ordering, and cycle checks.",
        xp: 300,
        prerequisites: ["dsa-big-o"],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      },
      {
        id: "dsa-heaps",
        name: "Heaps & Priority Queues",
        description: "Heap structures, heapify insertions, dynamic priority schedules, and heap sort complexity.",
        xp: 250,
        prerequisites: ["dsa-trees-graphs"],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      },
      {
        id: "dsa-greedy",
        name: "Greedy Algorithms",
        description: "Activity selections, Huffman Coding trees, and fractional knapsack constraints.",
        xp: 200,
        prerequisites: ["dsa-search-sort"],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      },
      {
        id: "dsa-dp-advanced",
        name: "Dynamic Programming",
        description: "Optimizing overlapping structures using memoization charts and tabulation matrices.",
        xp: 450,
        prerequisites: ["dsa-trees-graphs"],
        recommendedRoadmaps: ["DSA"],
        recommendedProjects: []
      }
    ]
  }
};
