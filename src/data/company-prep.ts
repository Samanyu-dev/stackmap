export interface CompanyPrepData {
  slug: string;
  company: string;
  name: string; // alias for company
  overview: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  sector: "IT Services" | "Product MNCs" | "Indian Startups" | "Finance & Banking" | "Hardware & Chips" | "Cloud & DevTools";
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

// Helper to programmatically construct rich, detailed prep roadmaps for catalog scaling
function generateCompanyData(
  slug: string,
  name: string,
  sector: "IT Services" | "Product MNCs" | "Indian Startups" | "Finance & Banking" | "Hardware & Chips" | "Cloud & DevTools",
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
): CompanyPrepData {
  let roles: string[] = [];
  let compensationRange = "";
  let interviewRounds: { title: string; desc: string }[] = [];
  let dsaTopics: string[] = [];
  let csFundamentals: string[] = [];
  let systemDesignLevel: "None" | "System Design Basics" | "Advanced System Design" = "None";
  let systemDesignFocus = "";
  let oaPattern = "";
  let behavioralPrep: string[] = [];
  let resources = [{ title: `${name} Prep Guide`, url: `https://www.google.com/search?q=${encodeURIComponent(name + " recruitment process")}` }];
  let projects: string[] = [];

  if (sector === "IT Services") {
    roles = ["Associate Systems Engineer", "Tech Consultant", "Quality Analyst"];
    compensationRange = difficulty === "BEGINNER" ? "₹3,50,000 - ₹6,50,000 L.P.A." : "₹6,00,000 - ₹12,00,000 L.P.A.";
    interviewRounds = [
      { title: "National Qualifier Assessment", desc: "Written exam containing verbal aptitude, quantitative analysis, and 2 basic coding loop questions (120 mins)." },
      { title: "Technical Interview", desc: "Review of college projects, core language syntax (C/C++/Java/Python), SQL joins, and OOP definitions." },
      { title: "HR & Management Review", desc: "Behavioral audit evaluating shift flexibility, location availability, and work goals." }
    ];
    dsaTopics = ["Arrays & Strings", "Basic sorting & hashing", "Recursion", "OOP Principles"];
    csFundamentals = ["DBMS (SQL joins, ACID properties)", "Operating Systems basics", "OOP Principles"];
    systemDesignLevel = "None";
    systemDesignFocus = "Relational database schema models and basic validation forms.";
    oaPattern = "Focuses on array iteration, string transformations, and logical math patterns.";
    behavioralPrep = ["Emphasize adaptability, teamwork, and willingness to learn.", "Present final year college projects cleanly."];
    projects = ["Todo App", "Expense Tracker"];
  } else if (sector === "Product MNCs") {
    roles = ["Software Development Engineer (SDE)", "Backend Developer", "Systems Architect"];
    compensationRange = difficulty === "ADVANCED" ? "₹24,00,000 - ₹50,00,000 L.P.A." : "₹15,00,000 - ₹28,00,000 L.P.A.";
    interviewRounds = [
      { title: "Online Assessment", desc: "2-3 complex algorithmic challenges focusing on arrays, intervals, and graphs (90 mins)." },
      { title: "Technical Screen", desc: "Live coding with an engineer covering graphs, heaps, or dynamic programming." },
      { title: "Onsite Loop", desc: "3 technical DSA rounds, 1 system design round, and 1 behavioral review." }
    ];
    dsaTopics = ["Graphs (BFS/DFS, Dijkstra)", "Dynamic Programming", "Priority Queues & Heaps", "Segment Trees"];
    csFundamentals = ["Operating Systems (Threads, Memory)", "DBMS (Transaction isolation levels)", "Computer Networks (TCP/IP)"];
    systemDesignLevel = "Advanced System Design";
    systemDesignFocus = "High throughput ingestion queues, distributed database replication, and cache layers.";
    oaPattern = "Hard algorithmic arrays, graph traversals, and dynamic programming subproblems.";
    behavioralPrep = ["Draft STAR-format stories highlighting leadership, customer obsession, and resolving conflict.", "Quantify achievements in previous projects."];
    projects = ["Distributed URL Shortener", "Kubernetes Monitoring Tool"];
  } else if (sector === "Indian Startups") {
    roles = ["SDE-1", "SDE-2", "Fullstack Developer"];
    compensationRange = difficulty === "ADVANCED" ? "₹18,00,000 - ₹38,00,000 L.P.A." : "₹10,00,000 - ₹20,00,000 L.P.A.";
    interviewRounds = [
      { title: "Machine Coding Round", desc: "Implement a fully functional console system prompt (e.g., parking lot) demonstrating clean OOP patterns in 2 hours." },
      { title: "DSA Problem Solving", desc: "1-2 rounds focusing on recursion, trees, sliding window, and graphs." },
      { title: "High Level Design", desc: "Scale real-time messaging, order booking queues, or geo-routing maps." }
    ];
    dsaTopics = ["Object Oriented Design (LLD)", "Sliding Window & Hashing", "Graphs (BFS/DFS)", "Trees & BST"];
    csFundamentals = ["DBMS Indexing & Joins", "Redis Caching Strategies", "REST APIs / WebSockets"];
    systemDesignLevel = "System Design Basics";
    systemDesignFocus = "Machine coding design patterns, rate limiting, and real-time geo-caches.";
    oaPattern = "Medium to hard arrays, hash maps lookup constraints, and greedy optimization.";
    behavioralPrep = ["Emphasize raw execution speed, bias for action, and taking ownership.", "Be ready to explain structural design trade-offs."];
    projects = ["Task Kanban Board", "Food Delivery System"];
  } else if (sector === "Finance & Banking") {
    roles = ["Quantitative Analyst", "Associate Tech Developer", "Systems Analyst"];
    compensationRange = difficulty === "ADVANCED" ? "₹20,00,000 - ₹48,00,000 L.P.A." : "₹12,00,000 - ₹22,00,000 L.P.A.";
    interviewRounds = [
      { title: "Technical Screen", desc: "Assessment covering coding speed, pointers, and C++ memory layouts." },
      { title: "Quantitative Test", desc: "Mathematical puzzles, probability distributions, and statistics questions." },
      { title: "Technical Loop", desc: "2 rounds of core DSA, 1 round low-level performance profiling, and 1 behavioral round." }
    ];
    dsaTopics = ["Priority Queues", "Binary Trees & BST", "Sorting & Binary Search", "Bit Manipulation"];
    csFundamentals = ["C++ Memory Internals (Stack vs Heap)", "Operating Systems scheduling", "DBMS transactions & acid"];
    systemDesignLevel = "Advanced System Design";
    systemDesignFocus = "Low-latency database storage engines, fast order execution pools, and caching grids.";
    oaPattern = "Fast dynamic array searches, mathematical combinations, and heap bounds.";
    behavioralPrep = ["Emphasize security compliance, high integrity, and attention to detail.", "Explain risk-reward tradeoffs in designs."];
    projects = ["Quantitative Portfolio Risk Engine", "Low-Latency Logging System"];
  } else if (sector === "Hardware & Chips") {
    roles = ["Embedded Software Engineer", "Firmware Engineer", "Silicon Validation Engineer"];
    compensationRange = difficulty === "ADVANCED" ? "₹15,00,000 - ₹32,00,000 L.P.A." : "₹8,00,000 - ₹16,00,000 L.P.A.";
    interviewRounds = [
      { title: "Written Exam", desc: "Circuit theory, digital electronics basics, Verilog/VHDL, and C syntax pointers." },
      { title: "Lab Debugging / Technical", desc: "Coding on microcontrollers, pointer manipulations, and reading hardware logs." },
      { title: "Technical Interview", desc: "Interrupts, registers mapping, concurrency, and real-time operating systems concepts." }
    ];
    dsaTopics = ["Bit Manipulation", "Stacks & Queues (circular buffers)", "Pointer Arithmetic", "Basic Arrays"];
    csFundamentals = ["Microcontrollers Architecture (ARM/AVR)", "Interrupt Handling & DMA", "RTOS Task Scheduling & Semaphores"];
    systemDesignLevel = "None";
    systemDesignFocus = "RTOS task pools scheduler, device driver protocols, and register state transitions.";
    oaPattern = "Bitwise shifts, pointers bounds validation, and digital state machine logic.";
    behavioralPrep = ["Highlight methodical testing habits, safety-first compliance, and hardware-software integration.", "Demonstrate hardware debugging persistence."];
    projects = ["Embedded RTOS Task Scheduler", "IoT Home Automation Controller"];
  } else if (sector === "Cloud & DevTools") {
    roles = ["DevOps Engineer", "Cloud Security Engineer", "Site Reliability Engineer (SRE)"];
    compensationRange = difficulty === "ADVANCED" ? "₹16,00,000 - ₹35,00,000 L.P.A." : "₹9,00,000 - ₹18,00,000 L.P.A.";
    interviewRounds = [
      { title: "Scripting Assessment", desc: "Write scripts (Bash / Python) to automate server queries, file text extraction, and API checks (90 mins)." },
      { title: "Linux & System Internals", desc: "In-depth review of processes, system calls, network sockets, and container storage isolation." },
      { title: "Architecture & Security Case", desc: "1 round designing highly available clouds or auditing security threats." }
    ];
    dsaTopics = ["HashMaps", "Trees & Graphs (routing algorithms)", "Searching & Sorting", "Strings parsing"];
    csFundamentals = ["Linux Process Lifecycle & Signals", "Docker & Kubernetes container bounds", "Networking (DNS, TCP, TLS, Load Balancers)"];
    systemDesignLevel = "System Design Basics";
    systemDesignFocus = "SLA metrics dashboard logging pipelines, firewall gateways, and auto-scaling setups.";
    oaPattern = "Text processing scripts, REST client logs manipulation, and simple networking routes check.";
    behavioralPrep = ["Present incident recovery instances, post-mortem tracking habits, and security audits.", "Explain automation-first approaches."];
    projects = ["Distributed ML Inference Pipeline", "Dockerized API Gateway"];
  }

  const timeline = [
    { step: `Core ${sector} Principles`, duration: "Weeks 1-2", details: `Study foundational concepts: ${csFundamentals.join(", ")}.` },
    { step: "Advanced DSA Exercises", duration: "Weeks 3-5", details: `Solve high frequency DSA problems: ${dsaTopics.slice(0, 3).join(", ")}.` },
    { step: "System Blueprint Reviews", duration: "Weeks 6-8", details: `Master target models: ${systemDesignFocus}.` }
  ];

  return {
    slug,
    company: name,
    name,
    overview: `${name} is a leading organization in the ${sector} industry. Recruiting candidates involves screening logical aptitude, core DSA constraints, and system scalability models appropriate for target roles: ${roles.join(", ")}.`,
    difficulty,
    sector,
    commonRoles: roles,
    roles,
    compensationRange,
    rounds: interviewRounds,
    interviewRounds,
    timeline,
    roadmap: timeline,
    resources,
    recommendedProjects: projects,
    projects,
    experiences: [
      { q: `What is the core focus of the interview at ${name}?`, a: `The interview evaluates strong fundamentals in ${csFundamentals.join(", ")}, hands-on problem solving with ${dsaTopics.slice(0, 2).join(" and ")}, and behavioral alignment.` }
    ],
    faqs: [
      { q: `What is the core focus of the interview at ${name}?`, a: `The interview evaluates strong fundamentals in ${csFundamentals.join(", ")}, hands-on problem solving with ${dsaTopics.slice(0, 2).join(" and ")}, and behavioral alignment.` }
    ],
    oaPattern,
    dsaTopics,
    csFundamentals,
    systemDesignLevel,
    behavioralPrep,
    systemDesignFocus,
    preparationTimeline: {
      thirtyDays: `Master target concepts: ${dsaTopics.slice(0, 2).join(" & ")}.`,
      sixtyDays: `Review computer systems principles: ${csFundamentals.slice(0, 2).join(" & ")}.`,
      ninetyDays: `Mock interview configurations focusing on ${systemDesignFocus}.`,
      oneEightyDays: `Build high quality portfolio systems: ${projects.join(" & ")}.`
    }
  };
}

// Hand-curated custom detail profiles for key high-priority target entities
const customPrepProfiles: Record<string, Omit<CompanyPrepData, "sector">> = {
  "flipkart": {
    slug: "flipkart",
    company: "Flipkart",
    name: "Flipkart",
    overview: "Flipkart's hiring pipeline focuses heavily on low-level system design (Machine Coding) and problem-solving. In the Machine Coding round, candidates must design and code a clean, working console app demonstrating SOLID design patterns within 2 hours.",
    difficulty: "ADVANCED",
    roles: ["SDE-1", "SDE-2", "SDE Intern"],
    commonRoles: ["SDE-1", "SDE-2", "SDE Intern"],
    compensationRange: "₹18,0,000 - ₹32,0,000 L.P.A.",
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
    compensationRange: "₹22,0,000 - ₹36,0,000 L.P.A.",
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
    compensationRange: "₹20,0,000 - ₹34,0,000 L.P.A.",
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
    roadmap: [{ step: "High Scale API Caches", duration: "Weeks 1-2", details: "Review CDN architectures, Redis scaling policies, and dynamic routing." }],
    timeline: [{ step: "High Scale API Caches", duration: "Weeks 1-2", details: "Review CDN architectures, Redis scaling policies, and dynamic routing." }],
    resources: [{ title: "Swiggy Bytes Tech Blog", url: "https://bytes.swiggy.com/" }],
    projects: ["Food Delivery System", "Ride Sharing Dispatcher"],
    recommendedProjects: ["Food Delivery System", "Ride Sharing Dispatcher"],
    experiences: [{ q: "What is heavily audited at Swiggy?", a: "OOD extensibility and concurrency threads safety under large concurrent ordering flows." }],
    faqs: [{ q: "What is heavily audited at Swiggy?", a: "OOD extensibility and concurrency threads safety under large concurrent ordering flows." }],
    oaPattern: "Focuses on strings parsing, maps sorting, and dynamic grids.",
    dsaTopics: ["Dynamic Programming (subsequences)", "Heaps & Priority lists", "Graphs (Dijkstra)", "OOD Principles"],
    csFundamentals: ["DBMS (Index, ACID)", "OS basics", "System caches"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on client dedication, speed of decisions, and ownership.", "Review college system designs."],
    systemDesignFocus: "Geo-replication caches, message queue order processes, and load balancers.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode graphs, heaps, and tree traversals.",
      sixtyDays: "Practice building clean class structures under 2 hours.",
      ninetyDays: "Mock concurrent queues and memory cache scales.",
      oneEightyDays: "Build a prototype order pipeline with Node, Express, and Redis."
    }
  },
  "razorpay": {
    slug: "razorpay",
    company: "Razorpay",
    name: "Razorpay",
    overview: "Razorpay interviews check high-performance backend, database integrity (transaction logs, ACID), and solid API designs. LLD rounds emphasize extensible software components.",
    difficulty: "ADVANCED",
    roles: ["SDE-1", "SDE-2", "Backend Developer"],
    commonRoles: ["SDE-1", "SDE-2", "Backend Developer"],
    compensationRange: "₹18,0,000 - ₹32,0,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment", desc: "2 algorithmic tasks on arrays or strings + CS queries (90 mins)." },
      { title: "Machine Coding Round", desc: "Write solid OOP components for payment reconciliation or invoicing tools (120 mins)." },
      { title: "System Design (HLD)", desc: "1 round detailing scaling gateways, webhook triggers, and audit logs." }
    ],
    rounds: [
      { title: "Online Assessment", desc: "2 algorithmic tasks on arrays or strings + CS queries (90 mins)." },
      { title: "Machine Coding Round", desc: "Write solid OOP components for payment reconciliation or invoicing tools (120 mins)." },
      { title: "System Design (HLD)", desc: "1 round detailing scaling gateways, webhook triggers, and audit logs." }
    ],
    roadmap: [{ step: "DB ACID transactions", duration: "Weeks 1-2", details: "Review database locks, serialization modes, and ACID compliance benchmarks." }],
    timeline: [{ step: "DB ACID transactions", duration: "Weeks 1-2", details: "Review database locks, serialization modes, and ACID compliance benchmarks." }],
    resources: [{ title: "Razorpay Tech Blog", url: "https://engineering.razorpay.com/" }],
    projects: ["Student Job Portal", "E-Commerce System"],
    recommendedProjects: ["Student Job Portal", "E-Commerce System"],
    experiences: [{ q: "What does Razorpay verify in API design?", a: "Idempotency keys, webhook delivery mechanisms, and transaction security logs." }],
    faqs: [{ q: "What does Razorpay verify in API design?", a: "Idempotency keys, webhook delivery mechanisms, and transaction security logs." }],
    oaPattern: "Focuses on hash maps, loops, and trees.",
    dsaTopics: ["Linked Lists & Stacks", "Hash Maps & Strings", "SQL indices", "OOP design patterns"],
    csFundamentals: ["DBMS (ACID, Locks)", "OS concurrency basics", "API designs"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on customer integrity, ownership, and simplicity.", "Explain database transactions designs."],
    systemDesignFocus: "Idempotency keys, gateway proxies, and payment reconciliation logs.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and arrays, and review SQL joins.",
      sixtyDays: "Practice OOD class diagrams and payment workflow charts.",
      ninetyDays: "Mock payment processors designs and transactional ledgers.",
      oneEightyDays: "Build a billing gateway ledger simulation with Python and Postgres."
    }
  },
  "phonepe": {
    slug: "phonepe",
    company: "PhonePe",
    name: "PhonePe",
    overview: "PhonePe interviews check core performance, transactions security, and LLD class layouts. Machine coding round is a key filter requiring compiling console solutions.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer-1", "Software Engineer-2", "Android Developer"],
    commonRoles: ["Software Engineer-1", "Software Engineer-2", "Android Developer"],
    compensationRange: "₹20,0,000 - ₹35,0,000 L.P.A.",
    interviewRounds: [
      { title: "Written Code Round", desc: "DSA assessment on arrays, intervals, and sorting challenges (90 mins)." },
      { title: "Machine Coding", desc: "Code an interactive ledger, transaction processing, or wallet tool in 2 hours." },
      { title: "System Design (HLD)", desc: "Design low latency transactional scales, ledger caches, and messaging frameworks." }
    ],
    rounds: [
      { title: "Written Code Round", desc: "DSA assessment on arrays, intervals, and sorting challenges (90 mins)." },
      { title: "Machine Coding", desc: "Code an interactive ledger, transaction processing, or wallet tool in 2 hours." },
      { title: "System Design (HLD)", desc: "Design low latency transactional scales, ledger caches, and messaging frameworks." }
    ],
    roadmap: [{ step: "OOD Class Blueprints", duration: "Weeks 1-2", details: "Review inheritance vs composition, and SOLID classes interfaces." }],
    timeline: [{ step: "OOD Class Blueprints", duration: "Weeks 1-2", details: "Review inheritance vs composition, and SOLID classes interfaces." }],
    resources: [{ title: "PhonePe Prep guidelines", url: "https://phonepe.com" }],
    projects: ["E-Commerce System", "Ride Sharing Dispatcher"],
    recommendedProjects: ["E-Commerce System", "Ride Sharing Dispatcher"],
    experiences: [{ q: "What is unique about PhonePe machine coding?", a: "The console code must support transactions rollback and concurrent safety updates." }],
    faqs: [{ q: "What is unique about PhonePe machine coding?", a: "The console code must support transactions rollback and concurrent safety updates." }],
    oaPattern: "Focuses on sorting, intervals, maps, and matrices.",
    dsaTopics: ["Intervals & Hashing", "SOLID OOP principles", "Binary Trees", "Sorting"],
    csFundamentals: ["DBMS (isolation keys)", "OS concurrency thread pools", "OOP Principles"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on raw execution speed, bias for action, and simplicity.", "Explain structural tradeoffs in databases."],
    systemDesignFocus: "Ledger databases, cache synchronization, and real-time transaction processing.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode intervals and maps, and practice pointer validations.",
      sixtyDays: "Practice machine coding designs (e.g. splitwise).",
      ninetyDays: "Mock transaction processing caches and ledger designs.",
      oneEightyDays: "Build a complete ledger microservice with Go and Redis."
    }
  },
  "cred": {
    slug: "cred",
    company: "Cred",
    name: "CRED",
    overview: "CRED values pixel-perfect frontend experiences alongside robust backend architectures. Machine coding rounds check architectural setups (SOLID, clean layering).",
    difficulty: "ADVANCED",
    roles: ["SDE-1 Backend", "SDE-1 Frontend", "Fullstack Developer"],
    commonRoles: ["SDE-1 Backend", "SDE-1 Frontend", "Fullstack Developer"],
    compensationRange: "₹22,0,000 - ₹38,0,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment", desc: "HackerRank round containing 2 DSA tasks and 10 CS MCQs (90 mins)." },
      { title: "Machine Coding", desc: "Create a modular, layer-separated API console server (e.g., credit ledger) in 2 hours." },
      { title: "Technical Round", desc: "DSA + LLD review focusing on concurrency, transaction limits, and cache indices." }
    ],
    rounds: [
      { title: "Online Assessment", desc: "HackerRank round containing 2 DSA tasks and 10 CS MCQs (90 mins)." },
      { title: "Machine Coding", desc: "Create a modular, layer-separated API console server (e.g., credit ledger) in 2 hours." },
      { title: "Technical Round", desc: "DSA + LLD review focusing on concurrency, transaction limits, and cache indices." }
    ],
    roadmap: [{ step: "Modular Layered APIs", duration: "Weeks 1-2", details: "Review folder structures, dependency inject controllers, and models in Node/Go." }],
    timeline: [{ step: "Modular Layered APIs", duration: "Weeks 1-2", details: "Review folder structures, dependency inject controllers, and models in Node/Go." }],
    resources: [{ title: "CRED Tech guidelines", url: "https://cred.club" }],
    projects: ["Task Kanban Board", "E-Commerce System"],
    recommendedProjects: ["Task Kanban Board", "E-Commerce System"],
    experiences: [{ q: "What is evaluated in CRED machine coding?", a: "Code structures layout, layers separation, error handler logs, and dependency injection." }],
    faqs: [{ q: "What is evaluated in CRED machine coding?", a: "Code structures layout, layers separation, error handler logs, and dependency injection." }],
    oaPattern: "Focuses on array queries, dynamic sums, and graphs.",
    dsaTopics: ["Linked Lists & Stacks", "Hash Maps & Strings", "Routing routes structures", "Basic Trees"],
    csFundamentals: ["JS scope models", "DBMS transaction locks", "REST API designs"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on aesthetic appreciation, ownership, and excellence.", "Review college layout designs."],
    systemDesignFocus: "API gateways proxies, cache invalidations, and ledger reconciliations.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and arrays, and review JS classes.",
      sixtyDays: "Practice OOD class diagrams and REST controllers.",
      ninetyDays: "Mock transaction processing caches and API routes.",
      oneEightyDays: "Build a dynamic credit ledger system using Express, Postgres, and Redis."
    }
  },
  "paytm": {
    slug: "paytm",
    company: "Paytm",
    name: "Paytm",
    overview: "Paytm interviews evaluate CS fundamentals, DBMS queries, transactions ACID safety, and core backend architectures. Candidates must showcase strong debugging abilities.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Engineer-1", "Backend Developer", "QA Automation Engineer"],
    commonRoles: ["Software Engineer-1", "Backend Developer", "QA Automation Engineer"],
    compensationRange: "₹10,0,000 - ₹20,0,000 L.P.A.",
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
  "google-india": {
    slug: "google-india",
    company: "Google India",
    name: "Google (India)",
    overview: "Google India interviews assess advanced algorithms, data structures, and raw problem-solving speed. Questions focus on graphs, segment trees, dynamic programming, and scalable distributed systems.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer Intern", "SWE L3", "SWE L4"],
    commonRoles: ["Software Engineer Intern", "SWE L3", "SWE L4"],
    compensationRange: "₹24,0,000 - ₹45,0,000 L.P.A.",
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
    behavioralPrep: ["Focus on navigating ambiguity and team collaboration.", "Prepare STAR format stories."],
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
    compensationRange: "₹18,0,000 - ₹34,0,000 L.P.A.",
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
    compensationRange: "₹20,0,000 - ₹38,0,000 L.P.A.",
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
  "zoho": {
    slug: "zoho",
    company: "Zoho Corporation",
    name: "Zoho Corporation",
    overview: "Zoho interviews assess core programming, logical reasoning, and C/Java/JS fundamentals. In LLD rounds, candidates must build fully working console modules demonstrating OOP relationships.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Developer", "QA Engineer", "Mobile Developer"],
    commonRoles: ["Software Developer", "QA Engineer", "Mobile Developer"],
    compensationRange: "₹8,0,000 - ₹18,0,000 L.P.A.",
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
    compensationRange: "₹10,0,000 - ₹22,0,000 L.P.A.",
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
  "tcs": {
    slug: "tcs",
    company: "TCS",
    name: "Tata Consultancy Services (TCS)",
    overview: "TCS recruits SDEs through National Qualifier Tests (NQT). Interviews check logic aptitude, standard language syntax (C/C++/Java/Python), SQL joins, and final year projects.",
    difficulty: "BEGINNER",
    roles: ["Ninja Systems Engineer", "Digital Developer", "Prime Software Engineer"],
    commonRoles: ["Ninja Systems Engineer", "Digital Developer", "Prime Software Engineer"],
    compensationRange: "₹3,36,000 - ₹9,0,000 L.P.A.",
    interviewRounds: [
      { title: "NQT Written Exam", desc: "Aptitude, verbal analysis, logical reasonings, and 2 basic coding challenge tasks (120 mins)." },
      { title: "Technical Round", desc: "Review of programming syntaxes, college projects database tables, and OOP terms." }
    ],
    rounds: [
      { title: "NQT Written Exam", desc: "Aptitude, verbal analysis, logical reasonings, and 2 basic coding challenge tasks (120 mins)." },
      { title: "Technical Round", desc: "Review of programming syntaxes, college projects database tables, and OOP terms." }
    ],
    roadmap: [{ step: "NQT Aptitude Prep", duration: "Weeks 1-2", details: "Review quant formulas, logical puzzle paths, and basic C loops." }],
    timeline: [{ step: "NQT Aptitude Prep", duration: "Weeks 1-2", details: "Review quant formulas, logical puzzle paths, and basic C loops." }],
    resources: [{ title: "TCS NQT Preparation Details", url: "https://tcs.com" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "Are coding challenges hard in NQT?", a: "No, they usually require simple loops, arrays sorting, or basic strings parse filters." }],
    faqs: [{ q: "Are coding challenges hard in NQT?", a: "No, they usually require simple loops, arrays sorting, or basic strings parse filters." }],
    oaPattern: "Focuses on array parsing, math loops, and patterns.",
    dsaTopics: ["Arrays & Strings", "Basic sorting & hashing", "Linked Lists", "OOP definitions"],
    csFundamentals: ["DBMS (SQL joins, ACID keys)", "OS basics", "OOP terms"],
    systemDesignLevel: "None",
    behavioralPrep: ["Focus on flexibility, learnability, and willingness to adapt to projects.", "Explain final year project contributions."],
    systemDesignFocus: "Database schema mappings and basic query operations.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and basic arrays, and review SQL joins.",
      sixtyDays: "Practice quantitative aptitude questions under time constraints.",
      ninetyDays: "Mock technical loops explaining class concepts.",
      oneEightyDays: "Build a basic contact manager using Python and SQLite."
    }
  },
  "infosys": {
    slug: "infosys",
    company: "Infosys",
    name: "Infosys",
    overview: "Infosys recruits SDEs through InfyTQ and HackWithInfy loops. Evaluation checks DSA, Python/Java syntax, database constraints, and college projects.",
    difficulty: "BEGINNER",
    roles: ["Systems Engineer (SE)", "Specialist Programmer (SP)", "Digital Specialist Engineer (DSE)"],
    commonRoles: ["Systems Engineer (SE)", "Specialist Programmer (SP)", "Digital Specialist Engineer (DSE)"],
    compensationRange: "₹3,60,000 - ₹9,50,000 L.P.A.",
    interviewRounds: [
      { title: "Online Assessment", desc: "3 coding questions on arrays, recursion, or graphs depending on tier (Ninja vs Specialist) (180 mins)." },
      { title: "Technical Interview", desc: "Live coding on string parsing, array lookups, database indices, and OOP concepts." }
    ],
    rounds: [
      { title: "Online Assessment", desc: "3 coding questions on arrays, recursion, or graphs depending on tier (Ninja vs Specialist) (180 mins)." },
      { title: "Technical Interview", desc: "Live coding on string parsing, array lookups, database indices, and OOP concepts." }
    ],
    roadmap: [{ step: "HackWithInfy Practice", duration: "Weeks 1-2", details: "Solve intermediate arrays, prefix sums, and recursion trees." }],
    timeline: [{ step: "HackWithInfy Practice", duration: "Weeks 1-2", details: "Solve intermediate arrays, prefix sums, and recursion trees." }],
    resources: [{ title: "Infosys Careers Portal", url: "https://infosys.com" }],
    projects: ["Todo App", "Expense Tracker"],
    recommendedProjects: ["Todo App", "Expense Tracker"],
    experiences: [{ q: "What is HackWithInfy?", a: "A national level coding contest. High scores secure direct Specialist Programmer interviews." }],
    faqs: [{ q: "What is HackWithInfy?", a: "A national level coding contest. High scores secure direct Specialist Programmer interviews." }],
    oaPattern: "Focuses on prefix sums, greedy optimization, and graphs.",
    dsaTopics: ["Arrays & Strings", "Basic sorting & hashing", "Recursion", "OOP definitions"],
    csFundamentals: ["DBMS (SQL joins)", "OS basics", "OOP terms"],
    systemDesignLevel: "None",
    behavioralPrep: ["Focus on willingness to work on foreign projects and learnability.", "Describe college project roles."],
    systemDesignFocus: "Database schema creation and basic web forms validation.",
    preparationTimeline: {
      thirtyDays: "Solve Leetcode strings and basic arrays, and review SQL joins.",
      sixtyDays: "Practice quantitative aptitude questions under time constraints.",
      ninetyDays: "Mock technical loops explaining class concepts.",
      oneEightyDays: "Build a basic directory index tracker using Node and SQLite."
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

// Raw definitions database for scaling catalog to ~250 entities
const rawCompaniesList: {
  slug: string;
  name: string;
  sector: "IT Services" | "Product MNCs" | "Indian Startups" | "Finance & Banking" | "Hardware & Chips" | "Cloud & DevTools";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}[] = [
  // IT Services & Consulting (30+ companies)
  { slug: "cognizant", name: "Cognizant", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "accenture", name: "Accenture India", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "capgemini", name: "Capgemini", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "tech-mahindra", name: "Tech Mahindra", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "ltimindtree", name: "LTIMindtree", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "mphasis", name: "Mphasis", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "dxc-technology", name: "DXC Technology", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "hexaware", name: "Hexaware Technologies", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "persistent", name: "Persistent Systems", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "zensar", name: "Zensar Technologies", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "ust-global", name: "UST Global", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "birlasoft", name: "Birlasoft", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "coforge", name: "Coforge", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "kpit", name: "KPIT Technologies", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "tata-elxsi", name: "Tata Elxsi", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "cyient", name: "Cyient", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "happiest-minds", name: "Happiest Minds Technologies", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "virtusa", name: "Virtusa", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "sonata", name: "Sonata Software", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "cgi", name: "CGI India", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "genpact", name: "Genpact", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "deloitte", name: "Deloitte India", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "ey", name: "EY India (Ernst & Young)", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "pwc", name: "PwC India (PriceWaterhouseCoopers)", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "kpmg", name: "KPMG India", sector: "IT Services", difficulty: "INTERMEDIATE" },
  { slug: "tietoevry", name: "TIETOEVRY India", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "sopra-steria", name: "Sopra Steria India", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "nec", name: "NEC Corporation India", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "fujitsu", name: "Fujitsu India", sector: "IT Services", difficulty: "BEGINNER" },
  { slug: "hitachi-vantara", name: "Hitachi Vantara India", sector: "IT Services", difficulty: "INTERMEDIATE" },

  // Product MNCs & SaaS (50+ companies)
  { slug: "adobe", name: "Adobe India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "oracle", name: "Oracle India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "cisco", name: "Cisco Systems", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "sap", name: "SAP Labs India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "salesforce", name: "Salesforce India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "vmware", name: "VMware India (Broadcom)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "ibm", name: "IBM India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "intuit", name: "Intuit India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "paypal", name: "PayPal India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "servicenow", name: "ServiceNow India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "uber", name: "Uber India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "atlassian", name: "Atlassian India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "twilio", name: "Twilio India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "redhat", name: "Red Hat India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "apple", name: "Apple India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "meta", name: "Meta India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "netflix", name: "Netflix India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "linkedin", name: "LinkedIn India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "twitter", name: "Twitter India (X)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "zoom", name: "Zoom Video Communications", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "gitlab", name: "GitLab India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "github", name: "GitHub India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "bitbucket", name: "Bitbucket (Atlassian)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "notion", name: "Notion India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "airtable", name: "Airtable India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "coda", name: "Coda India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "box", name: "Box India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "dropbox", name: "Dropbox India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "egnyte", name: "Egnyte India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "jira", name: "Jira (Atlassian)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "confluence", name: "Confluence (Atlassian)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "trello", name: "Trello (Atlassian)", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "asana", name: "Asana India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "monday", name: "Monday.com India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "smartsheet", name: "Smartsheet India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "wrike", name: "Wrike India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "clickup", name: "ClickUp India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "pegasystems", name: "Pegasystems India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "software-ag", name: "Software AG India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "progress", name: "Progress Software", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "tibco", name: "TIBCO Software", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "tableau", name: "Tableau (Salesforce)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "looker", name: "Looker (Google)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "powerbi", name: "PowerBI (Microsoft)", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "microstrategy", name: "MicroStrategy India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "qlik", name: "Qlik India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "alteryx", name: "Alteryx India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "talend", name: "Talend India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "informatica", name: "Informatica India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "teradata", name: "Teradata India", sector: "Product MNCs", difficulty: "INTERMEDIATE" },
  { slug: "cloudera", name: "Cloudera India", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "hortonworks", name: "Hortonworks (Cloudera)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "mapr", name: "MapR (HPE)", sector: "Product MNCs", difficulty: "ADVANCED" },
  { slug: "micro-focus", name: "Micro Focus (OpenText)", sector: "Product MNCs", difficulty: "INTERMEDIATE" },

  // Indian Startups & Unicorns (40+ companies)
  { slug: "ola", name: "Ola Cabs", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "ola-electric", name: "Ola Electric", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "myntra", name: "Myntra", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "inmobi", name: "InMobi", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "postman", name: "Postman", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "delhivery", name: "Delhivery", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "nykaa", name: "Nykaa", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "zepto", name: "Zepto", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "blinkit", name: "Blinkit", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "groww", name: "Groww", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "zerodha", name: "Zerodha", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "urban-company", name: "Urban Company", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "unacademy", name: "Unacademy", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "physicswallah", name: "PhysicsWallah", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "upgrad", name: "Upgrad", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "jio", name: "Jio Platforms", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "licious", name: "Licious", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "spinny", name: "Spinny", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "cardekho", name: "CarDekho", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "bookmyshow", name: "BookMyShow", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "meesho", name: "Meesho", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "boat", name: "Boat (Imagine Marketing)", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "mamaearth", name: "Mamaearth (Honasa Consumer)", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "games24x7", name: "Games24x7", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "dream11", name: "Dream11 (Sporta Technologies)", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "mpl", name: "MPL (Mobile Premier League)", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "pocket-fm", name: "Pocket FM", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "khatabook", name: "Khatabook", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "ninjacart", name: "Ninjacart", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "blackbuck", name: "BlackBuck", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "shadowfax", name: "Shadowfax", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "porter", name: "Porter", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "ather", name: "Ather Energy", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "elasticrun", name: "ElasticRun", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "dealshare", name: "DealShare", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "sharechat", name: "ShareChat", sector: "Indian Startups", difficulty: "ADVANCED" },
  { slug: "dailyhunt", name: "Dailyhunt (VerSe Innovation)", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "koo", name: "Koo (Bombinate Technologies)", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "mapmyindia", name: "MapmyIndia", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "infoedge", name: "Info Edge (Naukri.com)", sector: "Indian Startups", difficulty: "INTERMEDIATE" },
  { slug: "makemytrip", name: "MakeMyTrip", sector: "Indian Startups", difficulty: "INTERMEDIATE" },

  // Finance, Fintech & Banking (50+ companies)
  { slug: "goldman-sachs", name: "Goldman Sachs India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "jpmorgan", name: "J.P. Morgan Chase & Co.", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "morgan-stanley", name: "Morgan Stanley", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "barclays", name: "Barclays India", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "deutsche-bank", name: "Deutsche Bank India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "citi", name: "Citi India (Citigroup)", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "hsbc", name: "HSBC Technology India", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "wells-fargo", name: "Wells Fargo India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "standard-chartered", name: "Standard Chartered GBS", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "amex", name: "American Express India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "fidelity", name: "Fidelity Investments", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "bank-of-america", name: "Bank of America", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "mastercard", name: "MasterCard India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "visa", name: "Visa India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "bny-mellon", name: "BNY Mellon India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "northern-trust", name: "Northern Trust", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "state-street", name: "State Street India", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "macquarie", name: "Macquarie Group", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "ubs", name: "UBS India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "credit-suisse", name: "Credit Suisse (UBS)", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "natwest", name: "NatWest Group (RBS)", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "societe-generale", name: "Societe Generale Global Solution Centre", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "bnp-paribas", name: "BNP Paribas India", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "invesco", name: "Invesco India", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "broadridge", name: "Broadridge Financial Solutions", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "fiserv", name: "Fiserv India", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "fis-global", name: "FIS Global", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "pine-labs", name: "Pine Labs", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "billdesk", name: "BillDesk", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "jupiter", name: "Jupiter Money", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "fi-money", name: "Fi Money", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "navi", name: "Navi Technologies", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "slice", name: "Slice (Garagepreneurs)", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "onecard", name: "OneCard (FPL Technologies)", sector: "Finance & Banking", difficulty: "INTERMEDIATE" },
  { slug: "stripe", name: "Stripe India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "adyen", name: "Adyen India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "plaid", name: "Plaid India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "coinbase", name: "Coinbase India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "chainlink", name: "Chainlink Labs India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "polygon", name: "Polygon Technology", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "solana", name: "Solana Labs India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "ripple", name: "Ripple India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "block", name: "Block (Square) India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "affirm", name: "Affirm India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "chime", name: "Chime India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "robinhood", name: "Robinhood India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "revolut", name: "Revolut India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "monzo", name: "Monzo India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "wise", name: "Wise India (TransferWise)", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "remitly", name: "Remitly India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "flywire", name: "Flywire India", sector: "Finance & Banking", difficulty: "ADVANCED" },
  { slug: "toast", name: "Toast India", sector: "Finance & Banking", difficulty: "ADVANCED" },

  // Hardware & Semiconductors (20+ companies)
  { slug: "intel", name: "Intel India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "qualcomm", name: "Qualcomm India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "nvidia", name: "NVIDIA India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "texas-instruments", name: "Texas Instruments India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "amd", name: "AMD India (Advanced Micro Devices)", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "synopsys", name: "Synopsys India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "cadence", name: "Cadence Design Systems", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "mediatek", name: "MediaTek India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "nxp", name: "NXP Semiconductors", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "micron", name: "Micron Technology India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "applied-materials", name: "Applied Materials India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "broadcom", name: "Broadcom India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "marvell", name: "Marvell Semiconductors", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "western-digital", name: "Western Digital India", sector: "Hardware & Chips", difficulty: "ADVANCED" },
  { slug: "seagate", name: "Seagate Technology", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "siemens", name: "Siemens Technology India", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "bosch", name: "Bosch Global Software Technologies (BGSW)", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "honeywell", name: "Honeywell Technology Solutions", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "schneider", name: "Schneider Electric India", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "philips", name: "Philips Innovation Campus", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "ge-digital", name: "GE Digital (General Electric)", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "collins-aerospace", name: "Collins Aerospace India", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "amadeus", name: "Amadeus India", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },
  { slug: "sabre", name: "Sabre Travel Technologies", sector: "Hardware & Chips", difficulty: "INTERMEDIATE" },

  // Cloud, DevTools & Cybersecurity (50+ companies)
  { slug: "elastic", name: "Elastic India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "cloudflare", name: "Cloudflare India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "zscaler", name: "Zscaler India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "palo-alto", name: "Palo Alto Networks", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "fortinet", name: "Fortinet India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "check-point", name: "Check Point Software Technologies", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "crowdstrike", name: "CrowdStrike India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "nutanix", name: "Nutanix India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "pure-storage", name: "Pure Storage India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "citrix", name: "Citrix Systems (Cloud Software Group)", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "confluent", name: "Confluent India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "snowflake", name: "Snowflake India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "databricks", name: "Databricks India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "mongodb", name: "MongoDB India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "couchbase", name: "Couchbase India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "redis", name: "Redis Labs India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "neo4j", name: "Neo4j India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "dynatrace", name: "Dynatrace India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "new-relic", name: "New Relic India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "splunk", name: "Splunk India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "commvault", name: "Commvault India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "veritas", name: "Veritas Technologies", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "bmc", name: "BMC Software India", sector: "Cloud & DevTools", difficulty: "INTERMEDIATE" },
  { slug: "ca-technologies", name: "CA Technologies (Broadcom)", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "rubrik", name: "Rubrik India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "uipath", name: "UiPath India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "cockroach", name: "Cockroach Labs India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "hashicorp", name: "HashiCorp India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "okta", name: "Okta India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "auth0", name: "Auth0 (Okta)", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "jfrog", name: "JFrog India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "sonarsource", name: "SonarSource India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "snyk", name: "Snyk India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "veracode", name: "Veracode India", sector: "Cloud & DevTools", difficulty: "INTERMEDIATE" },
  { slug: "checkmarx", name: "Checkmarx India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "rapid7", name: "Rapid7 India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "tenable", name: "Tenable India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "qualys", name: "Qualys India", sector: "Cloud & DevTools", difficulty: "INTERMEDIATE" },
  { slug: "datadog", name: "Datadog India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "grafana", name: "Grafana Labs India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "pagerduty", name: "PagerDuty India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "opsgenie", name: "Opsgenie (Atlassian)", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "victorops", name: "VictorOps (Splunk)", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "xmatters", name: "xMatters India", sector: "Cloud & DevTools", difficulty: "INTERMEDIATE" },
  { slug: "cohesity", name: "Cohesity India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "veeam", name: "Veeam Software", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "acronis", name: "Acronis India", sector: "Cloud & DevTools", difficulty: "INTERMEDIATE" },
  { slug: "druva", name: "Druva India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "squarespace", name: "SquareSpace India", sector: "Cloud & DevTools", difficulty: "INTERMEDIATE" },
  { slug: "wix", name: "Wix India", sector: "Cloud & DevTools", difficulty: "INTERMEDIATE" },
  { slug: "shopify", name: "Shopify India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "bigcommerce", name: "BigCommerce India", sector: "Cloud & DevTools", difficulty: "ADVANCED" },
  { slug: "magento", name: "Magento (Adobe)", sector: "Cloud & DevTools", difficulty: "ADVANCED" }
];

// Combine custom detailed profiles and dynamically generated ones
export const companyPrepData: Record<string, CompanyPrepData> = {};

// 1. Populate custom detailed profiles (adding their respective sectors)
const customSectors: Record<string, "IT Services" | "Product MNCs" | "Indian Startups" | "Finance & Banking" | "Hardware & Chips" | "Cloud & DevTools"> = {
  "flipkart": "Indian Startups",
  "zomato": "Indian Startups",
  "swiggy": "Indian Startups",
  "razorpay": "Indian Startups",
  "phonepe": "Indian Startups",
  "cred": "Indian Startups",
  "paytm": "Indian Startups",
  "google-india": "Product MNCs",
  "microsoft-india": "Product MNCs",
  "amazon-india": "Product MNCs",
  "zoho": "Product MNCs",
  "freshworks": "Product MNCs",
  "tcs": "IT Services",
  "infosys": "IT Services",
  "wipro": "IT Services",
  "hcltech": "IT Services"
};

Object.keys(customPrepProfiles).forEach((slug) => {
  const profile = customPrepProfiles[slug];
  companyPrepData[slug] = {
    ...profile,
    sector: customSectors[slug]
  } as CompanyPrepData;
});

// 2. Populate remaining 230+ companies dynamically using template models
rawCompaniesList.forEach((c) => {
  // Only auto-generate if it doesn't already have a custom profile
  if (!companyPrepData[c.slug]) {
    companyPrepData[c.slug] = generateCompanyData(c.slug, c.name, c.sector, c.difficulty);
  }
});
