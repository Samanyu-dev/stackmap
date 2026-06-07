export interface CompanyPrepData {
  slug: string;
  company: string;
  name: string; // alias for company
  overview: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  commonRoles: string[]; // alias for roles
  roles: string[];
  compensationRange: string;
  rounds: { title: string; desc: string }[]; // alias for interviewRounds
  interviewRounds: { title: string; desc: string }[];
  timeline: { step: string; duration: string; details: string }[]; // alias for roadmap
  roadmap: { step: string; duration: string; details: string }[];
  resources: { title: string; url: string }[];
  recommendedProjects: string[]; // alias for projects
  projects: string[];
  faqs: { q: string; a: string }[]; // alias for experiences
  experiences: { q: string; a: string }[];
  oaPattern: string;
  dsaTopics: string[];
  csFundamentals: string[];
  systemDesignLevel: "None" | "System Design Basics" | "Advanced System Design";
  behavioralPrep: string[];
  systemDesignFocus: string;
  preparationTimeline: {
    thirtyDays: string;
    sixtyDays: string;
    ninetyDays: string;
    oneEightyDays: string;
  };
}

export const companyPrepData: Record<string, CompanyPrepData> = {
  // === INDIAN PRODUCT STARTUPS / UNICORNS ===
  "flipkart": {
    slug: "flipkart",
    company: "Flipkart",
    name: "Flipkart",
    overview: "Flipkart's hiring pipeline focuses heavily on low-level system design (Machine Coding) and problem-solving. In the Machine Coding round, candidates must design and code a clean, working console app demonstrating SOLID design patterns within 2 hours.",
    difficulty: "ADVANCED",
    roles: ["SDE-1", "SDE-2", "SDE Intern"],
    commonRoles: ["SDE-1", "SDE-2", "SDE Intern"],
    compensationRange: "₹18,00,000 - ₹32,00,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment", desc: "HackerRank round containing 2-3 algorithmic problems (90 mins)." },
      { title: "Machine Coding Round", desc: "Write functional, clean, extensible object-oriented code for a system design prompt (e.g., cab booking system) in 2 hours." },
      { title: "DSA Problem Solving", desc: "1-2 rounds focusing on trees, dynamic programming, and graph traversals." },
      { title: "System Design (HLD)", desc: "1 round focusing on large scale system architectures and database replication." }
    ],
    rounds: [
      { title: "Online Assessment", desc: "HackerRank round containing 2-3 algorithmic problems (90 mins)." },
      { title: "Machine Coding Round", desc: "Write functional, clean, extensible object-oriented code for a system design prompt (e.g., cab booking system) in 2 hours." },
      { title: "DSA Problem Solving", desc: "1-2 rounds focusing on trees, dynamic programming, and graph traversals." },
      { title: "System Design (HLD)", desc: "1 round focusing on large scale system architectures and database replication." }
    ],
    roadmap: [
      { step: "SOLID Design Principles", duration: "Weeks 1-2", details: "Review Strategy, Factory, and Observer patterns. Practice coding class diagrams." },
      { step: "Machine Coding Practice", duration: "Weeks 3-5", details: "Build 5 functional console applications (e.g., splitwise, snake & ladder) under 2 hours." },
      { step: "Advanced DSA Drill", duration: "Weeks 6-7", details: "Master DP arrays, binary trees, and graph traversals on Leetcode." }
    ],
    timeline: [
      { step: "SOLID Design Principles", duration: "Weeks 1-2", details: "Review Strategy, Factory, and Observer patterns. Practice coding class diagrams." },
      { step: "Machine Coding Practice", duration: "Weeks 3-5", details: "Build 5 functional console applications (e.g., splitwise, snake & ladder) under 2 hours." },
      { step: "Advanced DSA Drill", duration: "Weeks 6-7", details: "Master DP arrays, binary trees, and graph traversals on Leetcode." }
    ],
    resources: [
      { title: "Flipkart SDE Interview Experience", url: "https://www.geeksforgeeks.org/flipkart-interview-experience/" }
    ],
    projects: ["Task Kanban Board", "E-Commerce System"],
    recommendedProjects: ["Task Kanban Board", "E-Commerce System"],
    experiences: [
      { q: "Is machine coding syntax execution audited?", a: "Yes. The code must compile, read inputs, run logic, and emit expected outputs on test cases." }
    ],
    faqs: [
      { q: "Is machine coding syntax execution audited?", a: "Yes. The code must compile, read inputs, run logic, and emit expected outputs on test cases." }
    ],
    oaPattern: "Hard arrays queries, dynamic programming subsequences, and graph traversals.",
    dsaTopics: ["Dynamic Programming (Grid, knapsack)", "Trees & Graph BFS/DFS", "Heaps & Priority Queues", "Design Patterns"],
    csFundamentals: ["Object-Oriented Design (OOD)", "DBMS (Transactions, Isolation)", "OS Concurrency"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on customer first, audacity, and ownership.", "Describe how you resolve technical trade-offs under pressure."],
    systemDesignFocus: "Scalable transaction ledgers, inventory caching, and search indices.",
    preparationTimeline: {
      thirtyDays: "Practice coding functional class structures with console drivers under 2 hours.",
      sixtyDays: "Solve Leetcode DP and trees challenges, and study OOD patterns.",
      ninetyDays: "Mock system designs focusing on scaling e-commerce catalogs.",
      oneEightyDays: "Build a complete shopping application catalog with transaction handling."
    }
  },
  "zomato": {
    slug: "zomato",
    company: "Zomato",
    name: "Zomato",
    overview: "Zomato interviews assess highly scalable backend architectures, concurrency, and real-time dispatcher matching. System design rounds focus on geofence spatial indexing and high-throughput order pipelines.",
    difficulty: "ADVANCED",
    roles: ["SDE-1", "SDE-2", "Backend Engineer"],
    commonRoles: ["SDE-1", "SDE-2", "Backend Engineer"],
    compensationRange: "₹22,00,000 - ₹36,00,000 L.P.A.",
    interviewRounds: [
      { title: "Technical Screen", desc: "Basic algorithm problems solved on code sharing editors (45 mins)." },
      { title: "System Design (LLD)", desc: "Design a class diagram representing real-time dispatchers or restaurant rating queues." },
      { title: "System Design (HLD)", desc: "Scale order queues, geofence services mapping location streams of active riders." }
    ],
    rounds: [
      { title: "Technical Screen", desc: "Basic algorithm problems solved on code sharing editors (45 mins)." },
      { title: "System Design (LLD)", desc: "Design a class diagram representing real-time dispatchers or restaurant rating queues." },
      { title: "System Design (HLD)", desc: "Scale order queues, geofence services mapping location streams of active riders." }
    ],
    roadmap: [
      { step: "Spatial Algorithms Study", duration: "Weeks 1-2", details: "Review geohashing, quad-trees, and Redis geospatial command maps." }
    ],
    timeline: [
      { step: "Spatial Algorithms Study", duration: "Weeks 1-2", details: "Review geohashing, quad-trees, and Redis geospatial command maps." }
    ],
    resources: [{ title: "Zomato Engineering Blog", url: "https://blog.zomato.com/category/technology" }],
    projects: ["Ride Sharing Dispatcher", "Food Delivery System"],
    recommendedProjects: ["Ride Sharing Dispatcher", "Food Delivery System"],
    experiences: [{ q: "What databases are preferred at Zomato?", a: "PostgreSQL for transactional orders, Redis for driver live coordinate caching, and Kafka for message queuing." }],
    faqs: [{ q: "What databases are preferred at Zomato?", a: "PostgreSQL for transactional orders, Redis for driver live coordinate caching, and Kafka for message queuing." }],
    oaPattern: "Focuses on graph search, priority queues, and strings.",
    dsaTopics: ["Geospatial Indexing", "Graphs (BFS/DFS, Dijkstra)", "Priority Queues", "LRU Cache"],
    csFundamentals: ["OS (Concurrency, Locks)", "DBMS (Indexing, Isolation)", "Networks (WebSockets)"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on intense ownership and speed of execution.", "Describe how you optimize latency bottlenecks."],
    systemDesignFocus: "Spatial logistics, Kafka order queues, and WebSockets connections.",
    preparationTimeline: {
      thirtyDays: "Master geohash indexing, Redis geo-APIs, and Leetcode trees.",
      sixtyDays: "Practice scaling distributed queues and handling network dropouts.",
      ninetyDays: "Mock logistics dispatch layouts on whiteboards.",
      oneEightyDays: "Build a food delivery backend simulation using Go, Kafka, and Redis."
    }
  },
  "swiggy": {
    slug: "swiggy",
    company: "Swiggy",
    name: "Swiggy",
    overview: "Swiggy looks for strong low-level and high-level design competency. Interviews assess geolocation queries, concurrency models, and distributed ordering systems.",
    difficulty: "ADVANCED",
    roles: ["SDE-1", "SDE-2", "Platform Engineer"],
    commonRoles: ["SDE-1", "SDE-2", "Platform Engineer"],
    compensationRange: "₹20,00,000 - ₹34,00,000 L.P.A.",
    interviewRounds: [
      { title: "LLD Coding Round", desc: "Code a system (e.g. food delivery dispatcher) with clean class separation." },
      { title: "DSA Round", desc: "Algorithmic rounds focusing on priority queues, sliding window, and graphs." },
      { title: "System Design (HLD)", desc: "1 round designing highly concurrent food ordering networks." }
    ],
    rounds: [
      { title: "LLD Coding Round", desc: "Code a system (e.g. food delivery dispatcher) with clean class separation." },
      { title: "DSA Round", desc: "Algorithmic rounds focusing on priority queues, sliding window, and graphs." },
      { title: "System Design (HLD)", desc: "1 round designing highly concurrent food ordering networks." }
    ],
    roadmap: [{ step: "Logistics system design", duration: "Weeks 1-3", details: "Study Geohash and Redis geo structures." }],
    timeline: [{ step: "Logistics system design", duration: "Weeks 1-3", details: "Study Geohash and Redis geo structures." }],
    resources: [{ title: "Swiggy Bytes Tech Blog", url: "https://bytes.swiggy.com" }],
    projects: ["Food Delivery System", "Ride Sharing Dispatcher"],
    recommendedProjects: ["Food Delivery System", "Ride Sharing Dispatcher"],
    experiences: [{ q: "What is asked in LLD?", a: " SOLID guidelines, clean data objects separation, and functional execution." }],
    faqs: [{ q: "What is asked in LLD?", a: " SOLID guidelines, clean data objects separation, and functional execution." }],
    oaPattern: "Focuses on graph traversals, dynamic arrays, and intervals.",
    dsaTopics: ["Priority Queues", "Graphs & Matrices", "Redis Geospatial commands", "Dynamic Programming"],
    csFundamentals: ["OOD SOLID principles", "OS Concurrency", "DBMS Locking schemas"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on customer centricity, innovation, and direct impact.", "Prepare stories about scaling bottlenecks."],
    systemDesignFocus: "Driver allocation matching loops, real-time tracking queues, and caching.",
    preparationTimeline: {
      thirtyDays: "Practice coding class hierarchies and unit tests.",
      sixtyDays: "Study database locks (optimistic, pessimistic) and Kafka streaming.",
      ninetyDays: "Mock dispatcher algorithms and spatial geofences layouts.",
      oneEightyDays: "Build a scalable microservices dispatcher using gRPC and Go."
    }
  },
  "razorpay": {
    slug: "razorpay",
    company: "Razorpay",
    name: "Razorpay",
    overview: "Razorpay interviews assess transactional consistency, idempotent API designs, security protocols, and caching loops. Systems design loops focus on building secure, fault-tolerant payment ledgers.",
    difficulty: "INTERMEDIATE",
    roles: ["SDE-1", "SDE-2", "Frontend Engineer"],
    commonRoles: ["SDE-1", "SDE-2", "Frontend Engineer"],
    compensationRange: "₹16,00,000 - ₹28,00,000 L.P.A.",
    interviewRounds: [
      { title: "CoderPad Round", desc: "Solve 1-2 coding problems in 60 mins explaining space/time complexity." },
      { title: "LLD Round", desc: "Design a class diagram representing transactional ledgers or refund queues." },
      { title: "HLD Round", desc: "Design payment gateway routing engines or scalable notification services." }
    ],
    rounds: [
      { title: "CoderPad Round", desc: "Solve 1-2 coding problems in 60 mins explaining space/time complexity." },
      { title: "LLD Round", desc: "Design a class diagram representing transactional ledgers or refund queues." },
      { title: "HLD Round", desc: "Design payment gateway routing engines or scalable notification services." }
    ],
    roadmap: [{ step: "Fintech ledgers design", duration: "Weeks 1-2", details: "Study double-entry database schemas and idempotency key maps." }],
    timeline: [{ step: "Fintech ledgers design", duration: "Weeks 1-2", details: "Study double-entry database schemas and idempotency key maps." }],
    resources: [{ title: "Razorpay Engineering Tech Docs", url: "https://razorpay.com" }],
    projects: ["E-Commerce Platform", "Expense Tracker"],
    recommendedProjects: ["E-Commerce Platform", "Expense Tracker"],
    experiences: [{ q: "What is Idempotency?", a: "Avoiding duplicate transaction charges when API requests are retried due to network drops." }],
    faqs: [{ q: "What is Idempotency?", a: "Avoiding duplicate transaction charges when API requests are retried due to network drops." }],
    oaPattern: "Fintech transaction mapping, dynamic array structures, and hash maps.",
    dsaTopics: ["Idempotent API Designs", "Hash Tables & Strings", "Trees & Graphs", "Dynamic Programming"],
    csFundamentals: ["DBMS (ACID, Ledgers)", "Security (TLS, Encryption)", "OOP Class mapping"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Show accountability, empathy, and attention to details.", "Explain how you solved failures in code integration loops."],
    systemDesignFocus: "Gateway routing, transactional isolation, and transaction rollback.",
    preparationTimeline: {
      thirtyDays: "Study transactional isolation, SSL keys, and idempotency logic.",
      sixtyDays: "Solve Leetcode sorting, arrays, and hashing challenges.",
      ninetyDays: "Mock payment systems workflows and ledger database schemas.",
      oneEightyDays: "Build a transactional billing manager with Node, Express, and Postgres."
    }
  },
  "phonepe": {
    slug: "phonepe",
    company: "PhonePe",
    name: "PhonePe",
    overview: "PhonePe runs under massive transactional volume. Interviews focus on concurrent data processing, lock strategies, database index structures, and consistent distributed systems (Saga design pattern).",
    difficulty: "ADVANCED",
    roles: ["SDE-1", "SDE-2", "Backend Developer"],
    commonRoles: ["SDE-1", "SDE-2", "Backend Developer"],
    compensationRange: "₹20,00,000 - ₹34,00,000 L.P.A.",
    interviewRounds: [
      { title: "Technical Screen", desc: "Solve 2 medium problems on queues or dynamic arrays in 60 mins." },
      { title: "Low Level Design", desc: "Construct a local multi-threaded payment orchestrator with SOLID patterns." },
      { title: "High Level Design", desc: "Design distributed lock systems, transactional databases Saga configurations." }
    ],
    rounds: [
      { title: "Technical Screen", desc: "Solve 2 medium problems on queues or dynamic arrays in 60 mins." },
      { title: "Low Level Design", desc: "Construct a local multi-threaded payment orchestrator with SOLID patterns." },
      { title: "High Level Design", desc: "Design distributed lock systems, transactional databases Saga configurations." }
    ],
    roadmap: [{ step: "Saga Pattern Study", duration: "Week 1", details: "Study distributed transaction flows, compensatory actions, and queues." }],
    timeline: [{ step: "Saga Pattern Study", duration: "Week 1", details: "Study distributed transaction flows, compensatory actions, and queues." }],
    resources: [{ title: "PhonePe Tech Blogs", url: "https://www.phonepe.com" }],
    projects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    recommendedProjects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    experiences: [{ q: "What is highly assessed?", a: "Multi-threaded concurrency safety, lock designs, and database performance indexing." }],
    faqs: [{ q: "What is highly assessed?", a: "Multi-threaded concurrency safety, lock designs, and database performance indexing." }],
    oaPattern: "Focuses on advanced trees, priority queues, and sorting.",
    dsaTopics: ["Priority Queues", "Dynamic Programming", "Saga Design Patterns", "Database Locks"],
    csFundamentals: ["DBMS (Isolation, Indexing)", "OS Concurrency", "Computer Networks"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on ownership, data integrity, and engineering quality.", "Describe how you resolve production bottlenecks."],
    systemDesignFocus: "Distributed payment dispatch loops, queue systems partitioning, and transaction ledgers.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode heaps and arrays, and study transaction isolation levels.",
      sixtyDays: "Practice system design for transactional billing systems.",
      ninetyDays: "Mock distributed ledger consistency layouts and Saga pattern setups.",
      oneEightyDays: "Build a highly scalable payment ledger server using gRPC and Go."
    }
  },
  "cred": {
    slug: "cred",
    company: "Cred",
    name: "Cred",
    overview: "Cred interviews assess premium UI styling (Framer Motion, layout structures) alongside backend concurrency. Loops audit clean patterns, visual aesthetics, and database isolation thresholds.",
    difficulty: "ADVANCED",
    roles: ["Frontend Developer", "Backend Developer", "Product Intern"],
    commonRoles: ["Frontend Developer", "Backend Developer", "Product Intern"],
    compensationRange: "₹22,0,000 - ₹36,00,000 L.P.A.",
    interviewRounds: [
      { title: "Machine Coding", desc: "Write functional, clean OOP designs (e.g. credit card ledger system) in 2 hours." },
      { title: "DSA and Systems", desc: "2 rounds testing heap queues, arrays, graphs, and database locks." }
    ],
    rounds: [
      { title: "Machine Coding", desc: "Write functional, clean OOP designs (e.g. credit card ledger system) in 2 hours." },
      { title: "DSA and Systems", desc: "2 rounds testing heap queues, arrays, graphs, and database locks." }
    ],
    roadmap: [{ step: "LLD ledgers design", duration: "Weeks 1-2", details: "Practice clean object separations and multi-threaded locks." }],
    timeline: [{ step: "LLD ledgers design", duration: "Weeks 1-2", details: "Practice clean object separations and multi-threaded locks." }],
    resources: [{ title: "Cred Engineering Guides", url: "https://cred.club" }],
    projects: ["Expense Tracker", "AI Resume Analyzer"],
    recommendedProjects: ["Expense Tracker", "AI Resume Analyzer"],
    experiences: [{ q: "What does Cred check in Frontend?", a: "Pixel-perfect CSS execution, clean animations, and state persistence." }],
    faqs: [{ q: "What does Cred check in Frontend?", a: "Pixel-perfect CSS execution, clean animations, and state persistence." }],
    oaPattern: "Focuses on hash maps, strings, and dynamic programming.",
    dsaTopics: ["Priority Queues", "Design Patterns", "Hash Tables", "Arrays"],
    csFundamentals: ["SOLID Design", "OS Concurrency", "DBMS transactions"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on attention to detail, execution, and aesthetics.", "Explain why design quality is a first-class feature."],
    systemDesignFocus: "Billing transactions ledgers, notifications queues, and CDN caching.",
    preparationTimeline: {
      thirtyDays: "Practice coding functional class structures and clean animations.",
      sixtyDays: "Study design patterns (Singleton, Factory) and build REST validation scripts.",
      ninetyDays: "Mock machine coding challenges within 2 hours.",
      oneEightyDays: "Build a ledger management dashboard with Next.js, Framer Motion, and Tailwind."
    }
  },
  "paytm": {
    slug: "paytm",
    company: "Paytm",
    name: "Paytm",
    overview: "Paytm interviews assess CS fundamentals, transactional ledger consistency, and scale limits. Loops cover DBMS transaction locks, payment reconciliation, and low-latency API caches.",
    difficulty: "INTERMEDIATE",
    roles: ["SDE-1", "SDE-2", "QA Engineer"],
    commonRoles: ["SDE-1", "SDE-2", "QA Engineer"],
    compensationRange: "₹12,00,000 - ₹24,00,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment", desc: "2-3 coding problems on arrays, queues, or intervals (90 mins)." },
      { title: "Technical Round 1", desc: "DSA problems focusing on linked lists, stacks, and trees." },
      { title: "Technical Round 2", desc: "Core CS fundamentals (DBMS joins, indexes, OS threading, memory)." }
    ],
    rounds: [
      { title: "Online Assessment", desc: "2-3 coding problems on arrays, queues, or intervals (90 mins)." },
      { title: "Technical Round 1", desc: "DSA problems focusing on linked lists, stacks, and trees." },
      { title: "Technical Round 2", desc: "Core CS fundamentals (DBMS joins, indexes, OS threading, memory)." }
    ],
    roadmap: [{ step: "CS Basics & DBMS Joins", duration: "Weeks 1-2", details: "Master transactional isolation, SQL indexing, and database joins." }],
    timeline: [{ step: "CS Basics & DBMS Joins", duration: "Weeks 1-2", details: "Master transactional isolation, SQL indexing, and database joins." }],
    resources: [{ title: "Paytm Careers Prep", url: "https://paytm.com" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "What CS fundamentals are most asked?", a: "DBMS transaction isolation, SQL indexing, deadlock conditions, and TCP handshake." }],
    faqs: [{ q: "What CS fundamentals are most asked?", a: "DBMS transaction isolation, SQL indexing, deadlock conditions, and TCP handshake." }],
    oaPattern: "Arrays, lists, strings, and hash maps.",
    dsaTopics: ["Linked Lists & Stacks", "Hash Maps & Strings", "Binary Trees & BST", "Sorting"],
    csFundamentals: ["DBMS (Joins, Indexing, ACID)", "OS (Deadlocks, Processes)", "OOP Concepts"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on accountability and speed.", "Be ready to explain project database choices."],
    systemDesignFocus: "Database ledger design, gateway proxies, and payment reconciliation.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode arrays and trees, and study transaction logs.",
      sixtyDays: "Practice database constraints, joins, and indexing schemas.",
      ninetyDays: "Mock payment systems and API gateway structures.",
      oneEightyDays: "Build a billing reconciliation backend with Node, Express, and Postgres."
    }
  },

  // === GLOBAL PRODUCT MNCS (INDIA BRANCHES) ===
  "google-india": {
    slug: "google-india",
    company: "Google India",
    name: "Google (India)",
    overview: "Google India interviews assess advanced algorithms, data structures, and raw problem-solving speed. Questions focus on graphs, segment trees, dynamic programming, and scalable distributed systems.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer Intern", "SWE L3", "SWE L4"],
    commonRoles: ["Software Engineer Intern", "SWE L3", "SWE L4"],
    compensationRange: "₹24,00,000 - ₹45,00,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment (OA)", desc: "2 complex algorithmic challenges focusing on arrays and modular math (90 mins)." },
      { title: "Phone Screen", desc: "1-2 rounds of coding with a Google engineer via code sharing editors." },
      { title: "Onsite Loop", desc: "3-4 technical coding rounds (graphs, heaps, DP) + 1 behavioral (Googliness) round." }
    ],
    rounds: [
      { title: "Online Assessment (OA)", desc: "2 complex algorithmic challenges focusing on arrays and modular math (90 mins)." },
      { title: "Phone Screen", desc: "1-2 rounds of coding with a Google engineer via code sharing editors." },
      { title: "Onsite Loop", desc: "3-4 technical coding rounds (graphs, heaps, DP) + 1 behavioral (Googliness) round." }
    ],
    roadmap: [
      { step: "Advanced DSA Drill", duration: "Weeks 1-4", details: "Solve 50+ medium/hard graph, tree, and dynamic programming challenges on Leetcode." }
    ],
    timeline: [
      { step: "Advanced DSA Drill", duration: "Weeks 1-4", details: "Solve 50+ medium/hard graph, tree, and dynamic programming challenges on Leetcode." }
    ],
    resources: [{ title: "Google Prep Guide", url: "https://careers.google.com/how-we-hire/" }],
    projects: ["Distributed URL Shortener", "Kubernetes Dashboard"],
    recommendedProjects: ["Distributed URL Shortener", "Kubernetes Dashboard"],
    experiences: [{ q: "What is Googliness?", a: "Humility, collaboration, navigating ambiguity, and bias for action." }],
    faqs: [{ q: "What is Googliness?", a: "Humility, collaboration, navigating ambiguity, and bias for action." }],
    oaPattern: "Focuses on modular math, binary search, and segment trees.",
    dsaTopics: ["Graphs (BFS/DFS, Dijkstra, MST)", "Dynamic Programming (Subsequences, grid)", "Segment Trees & Fenwick Trees", "Heaps"],
    csFundamentals: ["OS (Memory, Threading)", "DBMS (Transaction controls)", "Computer Networks (TCP/IP)"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on navigating ambiguity and team collaboration.", "Prepare STAR format instances."],
    systemDesignFocus: "Scalable search index structures, caching systems, and distributed coordinate services.",
    preparationTimeline: {
      thirtyDays: "Solve Google high-frequency questions, and draft Googliness stories.",
      sixtyDays: "Practice distributed file systems (GFS) and map-reduce concepts.",
      ninetyDays: "Mock loops under strict time constraints.",
      oneEightyDays: "Build a complete web analytics server with distributed scaling."
    }
  },
  "microsoft-india": {
    slug: "microsoft-india",
    company: "Microsoft India",
    name: "Microsoft (India)",
    overview: "Microsoft India interviews emphasize SOLID design principles, Object-Oriented Design (LLD), binary trees, and cloud-scale infrastructures (Azure).",
    difficulty: "INTERMEDIATE",
    roles: ["Software Engineer Intern", "Full Time SDE-1", "SDE-2"],
    commonRoles: ["Software Engineer Intern", "Full Time SDE-1", "SDE-2"],
    compensationRange: "₹18,00,000 - ₹34,00,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment (OA)", desc: "3 coding questions on arrays and strings focusing on edge cases (100 mins)." },
      { title: "Technical Rounds", desc: "2-3 rounds exploring trees, lists, OOP design, and project architectures." },
      { title: "AA Round", desc: "Final interview with a manager auditing leadership and system design trade-offs." }
    ],
    rounds: [
      { title: "Online Assessment (OA)", desc: "3 coding questions on arrays and strings focusing on edge cases (100 mins)." },
      { title: "Technical Rounds", desc: "2-3 rounds exploring trees, lists, OOP design, and project architectures." },
      { title: "AA Round", desc: "Final interview with a manager auditing leadership and system design trade-offs." }
    ],
    roadmap: [{ step: "OOD Class Design", duration: "Weeks 1-2", details: "Study SOLID patterns and class hierarchies in Java/TypeScript." }],
    timeline: [{ step: "OOD Class Design", duration: "Weeks 1-2", details: "Study SOLID patterns and class hierarchies in Java/TypeScript." }],
    resources: [{ title: "Microsoft Careers Prep Guide", url: "https://careers.microsoft.com" }],
    projects: ["Task Kanban Board", "Blog CMS"],
    recommendedProjects: ["Task Kanban Board", "Blog CMS"],
    experiences: [{ q: "What does Microsoft focus on in LLD?", a: "SOLID principles, code readability, class structures, and clean APIs." }],
    faqs: [{ q: "What does Microsoft focus on in LLD?", a: "Microsoft focuses on SOLID design patterns, clean class inheritance structures, and interface definitions." }],
    oaPattern: "Focuses on array queries, interval splits, and basic matrix operations.",
    dsaTopics: ["Binary Trees & BST", "Linked Lists (Reversal, Merge)", "SOLID Design patterns", "Dynamic Programming"],
    csFundamentals: ["DBMS (Indexing, Schema design)", "OS (Concurrency, Memory)", "Computer Networks"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on growth mindset and customer alignment.", "Describe how you handled project setbacks and failures."],
    systemDesignFocus: "Object-oriented design patterns, REST API routes, and cloud cache structures.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode trees and list structures, and study SOLID design rules.",
      sixtyDays: "Practice building clean class structures (OOD) in Java/C++.",
      ninetyDays: "Study cloud scaling methodologies, load balancers, and CDN networks.",
      oneEightyDays: "Build a complete SaaS billing application with multi-tenant databases."
    }
  },
  "amazon-india": {
    slug: "amazon-india",
    company: "Amazon India",
    name: "Amazon (India)",
    overview: "Amazon India loop checks algorithmic fluency (trees, heaps, queues) alongside the 16 Leadership Principles (LPs). Every technical round dedicates 15-20 minutes to LP queries.",
    difficulty: "ADVANCED",
    roles: ["SDE Intern", "SDE-1", "SDE-2"],
    commonRoles: ["SDE Intern", "SDE-1", "SDE-2"],
    compensationRange: "₹20,00,000 - ₹38,00,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment (OA)", desc: "Debugging challenges, 2 coding problems, and work style simulation." },
      { title: "Onsite Loop", desc: "3 coding rounds focusing on heaps, trees, queues + 1 system architecture round." }
    ],
    rounds: [
      { title: "Online Assessment (OA)", desc: "Debugging challenges, 2 coding problems, and work style simulation." },
      { title: "Onsite Loop", desc: "3 coding rounds focusing on heaps, trees, queues + 1 system architecture round." }
    ],
    roadmap: [{ step: "LP STAR Story Drafts", duration: "Weeks 1-2", details: "Draft 2 STAR stories for every one of Amazon's 16 Leadership Principles." }],
    timeline: [{ step: "LP STAR Story Drafts", duration: "Weeks 1-2", details: "Draft 2 STAR stories for every one of Amazon's 16 Leadership Principles." }],
    resources: [{ title: "Amazon LP Guide", url: "https://www.aboutamazon.com/about-us/leadership-principles" }],
    projects: ["Food Delivery System", "DevOps Monitoring Suite"],
    recommendedProjects: ["Food Delivery System", "DevOps Monitoring Suite"],
    experiences: [{ q: "What LP is heavily weighted?", a: "Customer Obsession and Bias for Action. Always focus on how you solved customer problems." }],
    faqs: [{ q: "What LP is heavily weighted?", a: "Customer Obsession and Bias for Action. Always focus on how you solved customer problems." }],
    oaPattern: "Focuses on heaps, sliding window arrays, stacks, and queue structures.",
    dsaTopics: ["Priority Queues & Heaps", "Trees & Graphs (BFS/DFS)", "LRU Cache Design", "Strings & Arrays"],
    csFundamentals: ["OS (Processes, Threading)", "DBMS (Transactions, Isolation)", "Computer Networks"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on the 16 Leadership Principles.", "Quantify achievements in projects (e.g. 'reduced latency by 15%')."],
    systemDesignFocus: "Distributed caches, order queue processing, and microservices databases.",
    preparationTimeline: {
      thirtyDays: "Solve heap, map, and queue challenges and write 10 LP STAR stories.",
      sixtyDays: "Practice system design for scaling microservices structures.",
      ninetyDays: "Mock loops focusing on metrics-driven talking points.",
      oneEightyDays: "Build a highly-concurrent food ordering platform using message queues."
    }
  },

  // === TOP INDIAN PRODUCTS & SAAS ===
  "zoho": {
    slug: "zoho",
    company: "Zoho",
    name: "Zoho",
    overview: "Zoho interviews assess core programming, logical reasoning, and C/Java/JS fundamentals. In LLD rounds, candidates must build fully working console modules demonstrating OOP relationships.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Developer", "QA Engineer", "Mobile Developer"],
    commonRoles: ["Software Developer", "QA Engineer", "Mobile Developer"],
    compensationRange: "₹8,00,000 - ₹18,00,000 L.P.A.",
    interviewRounds: [
      { title: "Written Test", desc: "Aptitude, logical puzzles, and C/Java/JS debugging challenges (90 mins)." },
      { title: "Programming Round 1", desc: "Core algorithms: matrix rotations, string searches, arrays." },
      { title: "Low Level Design (LLD)", desc: "Design and implement a console system class setup (e.g., ticket manager) in C/Java/JS." }
    ],
    rounds: [
      { title: "Written Test", desc: "Aptitude, logical puzzles, and C/Java/JS debugging challenges (90 mins)." },
      { title: "Programming Round 1", desc: "Core algorithms: matrix rotations, string searches, arrays." },
      { title: "Low Level Design (LLD)", desc: "Design and implement a console system class setup (e.g., ticket manager) in C/Java/JS." }
    ],
    roadmap: [{ step: "LLD SOLID design patterns", duration: "Weeks 1-2", details: "Review basic design patterns and OOD class diagrams." }],
    timeline: [{ step: "LLD SOLID design patterns", duration: "Weeks 1-2", details: "Review basic design patterns and OOD class diagrams." }],
    resources: [{ title: "Zoho SDE Prep Guide", url: "https://www.geeksforgeeks.org/zoho-interview-experience/" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "What does Zoho focus on?", a: "SOLID OOP patterns, coding readability, and raw logical debugging capacity." }],
    faqs: [{ q: "What does Zoho focus on?", a: "Zoho focuses on SOLID OOP patterns, coding readability, and raw logical debugging capacity." }],
    oaPattern: "Focuses on string manipulations, matrix parsing, and basic sorting.",
    dsaTopics: ["String manipulation & Matrices", "SOLID OOP principles", "Binary Trees", "Sorting"],
    csFundamentals: ["DBMS (ACID, Schema)", "OS basics", "OOP Principles"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on commitment to Zoho's culture and long-term values.", "Explain project design decisions in detail."],
    systemDesignFocus: "Database schema mappings, API models, and data synchronization.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings, arrays, and recursion exercises.",
      sixtyDays: "Practice OOD class structures (e.g. library billing system).",
      ninetyDays: "Study relational db joins, keys, and indexing.",
      oneEightyDays: "Build a complete task directory application using Java/C++."
    }
  },
  "freshworks": {
    slug: "freshworks",
    company: "Freshworks",
    name: "Freshworks",
    overview: "Freshworks interviews focus on web fundamentals, REST APIs, scaling microservices, and databases. Frontend loops focus on JS event loops, React contexts, and responsive layouts.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Engineer", "QA Automation Engineer", "Frontend Developer"],
    commonRoles: ["Software Engineer", "QA Automation Engineer", "Frontend Developer"],
    compensationRange: "₹10,00,000 - ₹22,00,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment", desc: "2 coding challenges on arrays or trees + CS fundamentals questions (90 mins)." },
      { title: "Technical Round 1", desc: "Algorithmic challenges focusing on linked lists, stacks, and queue structures." },
      { title: "Technical Round 2", desc: "Core JS, React architectures, API designs, and DB index setups." }
    ],
    rounds: [
      { title: "Online Assessment", desc: "2 coding challenges on arrays or trees + CS fundamentals questions (90 mins)." },
      { title: "Technical Round 1", desc: "Algorithmic challenges focusing on linked lists, stacks, and queue structures." },
      { title: "Technical Round 2", desc: "Core JS, React architectures, API designs, and DB index setups." }
    ],
    roadmap: [{ step: "JS Event Loop & React", duration: "Weeks 1-2", details: "Review JS event loops, scopes, and context state optimizations." }],
    timeline: [{ step: "JS Event Loop & React", duration: "Weeks 1-2", details: "Review JS event loops, scopes, and context state optimizations." }],
    resources: [{ title: "Freshworks Engineering Blog", url: "https://freshworks.com" }],
    projects: ["Todo App", "Blog CMS"],
    recommendedProjects: ["Todo App", "Blog CMS"],
    experiences: [{ q: "What is checked in Frontend?", a: "Core JavaScript mechanics, state managers, and network request handling." }],
    faqs: [{ q: "What is checked in Frontend?", a: "Core JavaScript mechanics, state managers, and network request handling." }],
    oaPattern: "Focuses on string operations, stacks, and basic trees.",
    dsaTopics: ["Linked Lists & Stacks", "Hash Maps & Strings", "React context states", "Basic Trees"],
    csFundamentals: ["JS Event Loop", "DBMS indexing", "REST API designs"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on customer delight and collaborative action.", "Describe how you optimize frontend page loading bounds."],
    systemDesignFocus: "REST API routing, database indexes, and connection caching.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and arrays, and review JS closures.",
      sixtyDays: "Practice OOD class hierarchies and SQL schema patterns.",
      ninetyDays: "Mock API designs and caching techniques.",
      oneEightyDays: "Build a complete billing dashboard with React, Node, and MySQL."
    }
  },

  // === INDIAN SERVICES MNCs / TIER-2 IT ===
  "tcs": {
    slug: "tcs",
    company: "TCS",
    name: "TCS",
    overview: "TCS recruits at multiple levels (Ninja, Digital, Prime). Interviews assess C/C++/Java/Python syntax, basic data structures (arrays, strings, stacks), SQL queries, and core CS fundamentals.",
    difficulty: "BEGINNER",
    roles: ["Ninja Systems Engineer", "Digital SWE", "Prime Software Engineer"],
    commonRoles: ["Ninja Systems Engineer", "Digital SWE", "Prime Software Engineer"],
    compensationRange: "₹3,36,000 - ₹9,00,000 L.P.A.",
    interviewRounds: [
      { title: "National Qualifier Test (NQT)", desc: "Online assessment testing quantitative aptitude, logical reasoning, and basic coding (2 questions, 120 mins)." },
      { title: "Technical Interview", desc: "Questions on basic algorithms, strings, OOP terms, SQL joins, and final year projects." },
      { title: "HR & MR Round", desc: "Evaluates behavioral characteristics, flexibility with locations, and shifts." }
    ],
    rounds: [
      { title: "National Qualifier Test (NQT)", desc: "Online assessment testing quantitative aptitude, logical reasoning, and basic coding (2 questions, 120 mins)." },
      { title: "Technical Interview", desc: "Questions on basic algorithms, strings, OOP terms, SQL joins, and final year projects." },
      { title: "HR & MR Round", desc: "Evaluates behavioral characteristics, flexibility with locations, and shifts." }
    ],
    roadmap: [{ step: "NQT Aptitude & C", duration: "Weeks 1-2", details: "Review quant formulas, logical reasoning, and basic C loops." }],
    timeline: [{ step: "NQT Aptitude & C", duration: "Weeks 1-2", details: "Review quant formulas, logical reasoning, and basic C loops." }],
    resources: [{ title: "TCS NQT Preparation Guide", url: "https://tcs.com" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "What is the difference between Ninja and Digital?", a: "Digital and Prime levels assess advanced programming, data structure trees, and SQL indexing." }],
    faqs: [{ q: "What is the difference between Ninja and Digital?", a: "Ninja is entry-level; Digital and Prime levels assess advanced programming, dynamic arrays, and SQL indexing." }],
    oaPattern: "Focuses on string parsing, arithmetic math, and basic loops.",
    dsaTopics: ["Arrays & Strings", "Basic sorting & searching", "OOP terminology", "Linked Lists"],
    csFundamentals: ["DBMS (SQL Joins)", "OS (Deadlocks, Processes)", "OOP Basics"],
    systemDesignLevel: "None",
    behavioralPrep: ["Focus on flexibility, teamwork, and willingness to learn.", "Describe your final year college project in detail."],
    systemDesignFocus: "Database schema creation, basic API requests, and web forms validation.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and basic arrays, and review SQL joins.",
      sixtyDays: "Practice quantitative aptitude questions under time constraints.",
      ninetyDays: "Mock technical loops explaining class concepts.",
      oneEightyDays: "Build a basic database inventory system using SQL and Python."
    }
  },
  "infosys": {
    slug: "infosys",
    company: "Infosys",
    name: "Infosys",
    overview: "Infosys recruits via HackWithInfy and InfyTQ. Assessment tests coding, debugging, database joins, and final year projects. Hiring tiers cover System Engineer (SE), Digital Specialist Engineer (DSE), and Power Programmer (PP).",
    difficulty: "BEGINNER",
    roles: ["Systems Engineer", "Digital Specialist Engineer", "Power Programmer"],
    commonRoles: ["Systems Engineer", "Digital Specialist Engineer", "Power Programmer"],
    compensationRange: "₹3,60,000 - ₹9,50,000 L.P.A.",
    interviewRounds: [
      { title: "Infosys Certification Test", desc: "Coding and database MCQs + 2 programming challenges (120 mins)." },
      { title: "Technical Round", desc: "DSA checks, linked list loops, SQL joins, and Final Year projects details." }
    ],
    rounds: [
      { title: "Infosys Certification Test", desc: "Coding and database MCQs + 2 programming challenges (120 mins)." },
      { title: "Technical Round", desc: "DSA checks, linked list loops, SQL joins, and Final Year projects details." }
    ],
    roadmap: [{ step: "DBMS & SQL Joins", duration: "Week 1", details: "Review relational tables joins, indexes, and primary keys." }],
    timeline: [{ step: "DBMS & SQL Joins", duration: "Week 1", details: "Review relational tables joins, indexes, and primary keys." }],
    resources: [{ title: "Infosys Career Prep Guidelines", url: "https://infosys.com" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "What does Power Programmer level test?", a: "Advanced data structures, segment trees, graphs, and dynamic programming." }],
    faqs: [{ q: "What does Power Programmer level test?", a: "Power Programmer level checks segment trees, graphs, dynamic programming, and low-level designs." }],
    oaPattern: "Focuses on array loops, string parsing, and simple matrix structures.",
    dsaTopics: ["Arrays & Strings", "Linked Lists & Queues", "OOP Principles", "Sorting"],
    csFundamentals: ["DBMS (joins, ACID keys)", "OS basics", "OOP terms"],
    systemDesignLevel: "None",
    behavioralPrep: ["Show adaptability to locations and shifts.", "Discuss teamwork experiences during college assignments."],
    systemDesignFocus: "Basic database indexing and REST client calls.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and arrays, and review SQL joins.",
      sixtyDays: "Practice coding algorithms (e.g. binary search) inside local compilers.",
      ninetyDays: "Mock loops explaining database concepts.",
      oneEightyDays: "Build a basic school directory with relational SQLite tables."
    }
  },
  "wipro": {
    slug: "wipro",
    company: "Wipro",
    name: "Wipro",
    overview: "Wipro hires SDEs through NLTH (Elite) and Turbo loops. Interviews evaluate Python/C++/Java knowledge, logical flow, DBMS triggers, and college project milestones.",
    difficulty: "BEGINNER",
    roles: ["Project Engineer (Elite)", "Turbo Software Engineer"],
    commonRoles: ["Project Engineer (Elite)", "Turbo Software Engineer"],
    compensationRange: "₹3,50,000 - ₹6,50,000 L.P.A.",
    interviewRounds: [
      { title: "NLTH Assessment", desc: "Aptitude, logical reasonings, coding challenge (2 questions), and essay writing loops." },
      { title: "Technical Interview", desc: "Questions on basic algorithms, recursion, OOP patterns, and SQL joins." }
    ],
    rounds: [
      { title: "NLTH Assessment", desc: "Aptitude, logical reasonings, coding challenge (2 questions), and essay writing loops." },
      { title: "Technical Interview", desc: "Questions on basic algorithms, recursion, OOP patterns, and SQL joins." }
    ],
    roadmap: [{ step: "NLTH Aptitude Prep", duration: "Week 1", details: "Review quantitative aptitude, vocabulary, and basic code loops." }],
    timeline: [{ step: "NLTH Aptitude Prep", duration: "Week 1", details: "Review quantitative aptitude, vocabulary, and basic code loops." }],
    resources: [{ title: "Wipro Careers Guidelines", url: "https://wipro.com" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "Is coding hard in NLTH?", a: "NLTH is beginner-friendly. Turbo level is intermediate, checking heaps and DP arrays." }],
    faqs: [{ q: "Is coding hard in NLTH?", a: "NLTH is beginner-friendly. Turbo level is intermediate, checking heaps and DP arrays." }],
    oaPattern: "Focuses on array loops, string updates, and number math.",
    dsaTopics: ["Arrays & Strings", "Basic sorting & hashing", "OOP structures", "Linked Lists"],
    csFundamentals: ["DBMS (SQL joins, ACID keys)", "OS basics", "OOP terms"],
    systemDesignLevel: "None",
    behavioralPrep: ["Demonstrate willingness to learn and flexibility with shifts.", "Present college projects details cleanly."],
    systemDesignFocus: "Database schema creation and basic web forms validation.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and basic arrays, and review SQL joins.",
      sixtyDays: "Practice quantitative aptitude questions under time constraints.",
      ninetyDays: "Mock technical loops explaining class concepts.",
      oneEightyDays: "Build a basic contact manager using Python and SQLite."
    }
  },
  "hcltech": {
    slug: "hcltech",
    company: "HCLTech",
    name: "HCLTech",
    overview: "HCLTech recruits SDEs for infrastructure support, software development, and QA automation. Assessment evaluates Java/Python syntax, SQL commands, and final year project tasks.",
    difficulty: "BEGINNER",
    roles: ["Software Engineer Graduate", "QA Automation Analyst", "Support Associate"],
    commonRoles: ["Software Engineer Graduate", "QA Automation Analyst", "Support Associate"],
    compensationRange: "₹3,25,000 - ₹6,00,000 L.P.A.",
    interviewRounds: [
      { title: "Written Exam", desc: "MCQs checking CS concepts, SQL statements, and 2 basic coding questions (90 mins)." },
      { title: "Technical Round", desc: "Live coding on string operations, array loops, SQL queries, and OOP definitions." }
    ],
    rounds: [
      { title: "Written Exam", desc: "MCQs checking CS concepts, SQL statements, and 2 basic coding questions (90 mins)." },
      { title: "Technical Round", desc: "Live coding on string operations, array loops, SQL queries, and OOP definitions." }
    ],
    roadmap: [{ step: "SQL Joins & Arrays", duration: "Week 1", details: "Review standard SQL commands, joins, and array sorting." }],
    timeline: [{ step: "SQL Joins & Arrays", duration: "Week 1", details: "Review standard SQL commands, joins, and array sorting." }],
    resources: [{ title: "HCLTech Careers Preparation", url: "https://hcltech.com" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "What domains are available at HCLTech?", a: "Software Development, Cloud Infra Support, and QA Automation Testing." }],
    faqs: [{ q: "What domains are available at HCLTech?", a: "Software Development, Cloud Infra Support, and QA Automation Testing." }],
    oaPattern: "Focuses on string manipulations and matrix loops.",
    dsaTopics: ["String parsing & Arrays", "Basic sorting & hashing", "Linked Lists", "OOP terms"],
    csFundamentals: ["DBMS (SQL joins)", "OS basics", "OOP terms"],
    systemDesignLevel: "None",
    behavioralPrep: ["Focus on learnability, teamwork, and willingness to adapt.", "Review college final year projects task logs."],
    systemDesignFocus: "Database schema creation and basic web forms validation.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and basic arrays, and review SQL joins.",
      sixtyDays: "Practice quantitative aptitude questions under time constraints.",
      ninetyDays: "Mock technical loops explaining class concepts.",
      oneEightyDays: "Build a basic todo list using Node and SQLite."
    }
  }
};
