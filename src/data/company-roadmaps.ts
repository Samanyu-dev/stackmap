export interface CompanyRoadmapData {
  slug: string;
  name: string;
  overview: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  commonRoles: string[];
  rounds: { title: string; desc: string }[];
  oaPattern: string;
  dsaTopics: string[];
  csFundamentals: string[];
  systemDesignLevel: "None" | "System Design Basics" | "Advanced System Design";
  behavioralPrep: string[];
  faqs: { q: string; a: string }[];
  timeline: { step: string; duration: string; details: string }[];
  recommendedProjects: string[];
  resources: { title: string; url: string }[];
}

export const companyRoadmaps: Record<string, CompanyRoadmapData> = {
  "google": {
    slug: "google",
    name: "Google",
    overview: "Google interviews assess raw problem solving, algorithmic fluency, coding speed, and Googliness (behavioral alignment). Questions focus heavily on graph traversals, dynamic programming, and systems scaling.",
    difficulty: "ADVANCED",
    commonRoles: ["Software Engineering Intern", "Associate Software Engineer", "L3 Software Engineer"],
    rounds: [
      { title: "Online Assessment (OA)", desc: "2 complex algorithmic questions on clean coding structures (typically 90 minutes)." },
      { title: "Technical Phone Screen", desc: "1-2 rounds of algorithmic coding with a Google engineer via Google Docs or CodeSpace." },
      { title: "Onsite Loop", desc: "3-4 technical coding rounds (graphs, heaps, DP) + 1 behavioral (Googliness & Leadership) round." }
    ],
    oaPattern: "Focus on medium-to-hard range arrays, sliding windows, and modular math. Often includes grid traversals and boundary check algorithms.",
    dsaTopics: ["Graphs (BFS/DFS, Dijkstra, MST)", "Dynamic Programming (Grid, Subsequences)", "Tries & Segment Trees", "Heaps & Sorting Algorithms"],
    csFundamentals: ["OS (Memory Layout, Threading)", "DBMS (Transaction Controls)", "Computer Networks (TCP/IP Handshake)"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: [
      "Demonstrate structured collaboration under ambiguity.",
      "Show how you handle project setbacks and feedback loops.",
      "Provide Google-specific scale design examples."
    ],
    faqs: [
      { q: "Is syntax correctness important at Google?", a: "Yes. While pseudocode logic is audited, clean execution, solid naming conventions, and handling of edge-cases are highly weighted." },
      { q: "What is Googliness?", a: "A set of cultural markers: doing the right thing, valuing diversity, intellectual humility, and bias for action." }
    ],
    timeline: [
      { step: "Phase 1: Advanced DSA Drill", duration: "Weeks 1-4", details: "Solve 50+ medium/hard graph, tree, and dynamic programming challenges on LeetCode." },
      { step: "Phase 2: Speed Mocking", duration: "Weeks 5-6", details: "Conduct 10+ time-constrained mock interviews verbalizing complexity bounds." },
      { step: "Phase 3: System Design & CS Basics", duration: "Week 7", details: "Review memory models, thread synchronization, and load balancing patterns." },
      { step: "Phase 4: Googliness Preparation", duration: "Week 8", details: "Draft behavioral outlines using the STAR (Situation, Task, Action, Result) method." }
    ],
    recommendedProjects: [
      "E-Commerce System with Analytics (for scaling architectures)",
      "Automated Docker CI/CD Pipeline (for system optimization)"
    ],
    resources: [
      { title: "Google Careers Prep Guide", url: "https://careers.google.com/how-we-hire/" },
      { title: "NeetCode Graph Playlist", url: "https://neetcode.io" }
    ]
  },
  "microsoft": {
    slug: "microsoft",
    name: "Microsoft",
    overview: "Microsoft interviews assess deep understanding of Object-Oriented Design, data structure structures (trees, lists), and robust software engineering practices. They also value passion for cloud technologies (Azure) and developer tools.",
    difficulty: "INTERMEDIATE",
    commonRoles: ["SWE Intern", "Full Time SWE-1", "Support Engineer"],
    rounds: [
      { title: "Online Assessment (OA)", desc: "Codility assessment containing 3 coding challenges focusing on edge-cases (70-120 minutes)." },
      { title: "Technical Rounds", desc: "2-3 rounds exploring trees, linked lists, system design, and project architectures." },
      { title: "As Appropriate (AA) Round", desc: "A final interview auditing leadership, system designs, and team alignment metrics." }
    ],
    oaPattern: "Codility style. Requires thorough testing. Look out for empty inputs and huge arrays.",
    dsaTopics: ["Binary Trees & BST", "Linked Lists (Reversal, Merge)", "Hash Maps & Strings", "Sorting & Searching"],
    csFundamentals: ["Object-Oriented Design (OOD)", "Operating Systems (Virtual Memory)", "Databases (Indexing, Schema Design)"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: [
      "Demonstrate growth mindset concepts.",
      "Show passion for accessibility and customer focus.",
      "Be prepared to explain past projects in high technical depth."
    ],
    faqs: [
      { q: "How important is Object Oriented Programming?", a: "Extremely. Microsoft engineers regularly ask candidates to design class relationships (e.g. Design a Parking Lot) using OOP principles." }
    ],
    timeline: [
      { step: "Phase 1: Basic DSA & Trees", duration: "Weeks 1-3", details: "Master recursion, tree traversals, and string parsing patterns." },
      { step: "Phase 2: Object-Oriented Designs", duration: "Week 4", details: "Review SOLID principles, Design Patterns (Singleton, Factory, Observer)." },
      { step: "Phase 3: Azure & Systems Overview", duration: "Week 5", details: "Understand cloud service setups, API Gateways, and databases." },
      { step: "Phase 4: Mocking & Core Resumes", duration: "Week 6", details: "Run mock interviews highlighting technical constraints in projects." }
    ],
    recommendedProjects: [
      "Sleek Dark Portfolio Website",
      "Secure Task REST API Server"
    ],
    resources: [
      { title: "Microsoft Careers Page", url: "https://careers.microsoft.com" }
    ]
  },
  "amazon": {
    slug: "amazon",
    name: "Amazon",
    overview: "Amazon's interview loop focuses heavily on their 16 Leadership Principles (LPs). Algorithmic rounds assess tree traversals, queues, and database designs. Be ready to explain how your project work maps directly to their principles.",
    difficulty: "ADVANCED",
    commonRoles: ["SDE Intern", "SDE-1", "Cloud Support Engineer"],
    rounds: [
      { title: "Online Assessment (OA)", desc: "2 coding questions + Work Simulation assessment evaluating customer obsession and ownership." },
      { title: "Technical Onsites", desc: "3-4 rounds where each starts with 20 minutes of behavioral (LP) questions, followed by coding." }
    ],
    oaPattern: "Focus on arrays, heaps, and maps. Work simulation questions weigh equal to code correctness.",
    dsaTopics: ["Heaps & Priority Queues", "Trees & Graphs", "Dynamic Programming (Knapsack, Grid)", "Two Pointers & Sliding Window"],
    csFundamentals: ["System Design", "Networking (DNS, CDN)", "Databases (Sharding, Replication)"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: [
      "Memorize the 16 Leadership Principles.",
      "Draft 2-3 detailed STAR stories for each LP (Ownership, Customer Obsession, Invent and Simplify)."
    ],
    faqs: [
      { q: "What happens if I fail the LP checks but solve all coding tasks?", a: "You will likely be rejected. Amazon considers Leadership Principles critical criteria for hiring." }
    ],
    timeline: [
      { step: "Phase 1: LP Framework Preparation", duration: "Weeks 1-2", details: "Draft STAR matrices mapping past experiences to leadership qualities." },
      { step: "Phase 2: Priority Queues & Graph Traversals", duration: "Weeks 3-5", details: "Practice heap algorithms, BFS, DFS, and topological sorting." },
      { step: "Phase 3: Scalability Designs", duration: "Week 6", details: "Review database scaling, sharding keys, and cache policies." }
    ],
    recommendedProjects: [
      "E-Commerce System with Analytics",
      "Automated Docker CI/CD Pipeline"
    ],
    resources: [
      { title: "Amazon Leadership Principles Guide", url: "https://www.aboutamazon.com/about-us/leadership-principles" }
    ]
  },
  "goldman-sachs": {
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    overview: "Goldman Sachs interviews assess computational speed, mathematical reasoning, memory structures, and core CS fundamentals (OOP, multithreading, databases).",
    difficulty: "INTERMEDIATE",
    commonRoles: ["Summer Analyst", "New Analyst"],
    rounds: [
      { title: "Aptitude & Coding OA", desc: "Math, probability, logical reasoning, and 2 algorithmic questions on HackerRank." },
      { title: "Technical Panel", desc: "2-3 rounds of string parsing, array lookups, database indices, and system architecture." }
    ],
    oaPattern: "HackerRank format. Math questions focus on statistics, combinations, and basic logic.",
    dsaTopics: ["Strings & Hash Tables", "Matrix Traversals", "Recursion", "Searching & Sorting Algorithms"],
    csFundamentals: ["Java / OOP Concepts", "DBMS (SQL Joins, ACID)", "Multithreading & Concurrency"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: [
      "Show interest in financial tech setups.",
      "Demonstrate focus on reliability and security."
    ],
    faqs: [
      { q: "Is math important?", a: "Yes. Quantitative analysis, probability, and puzzle solving are regularly audited." }
    ],
    timeline: [
      { step: "Phase 1: Math & Probability Review", duration: "Week 1", details: "Brush up on statistics, combinations, and logic puzzles." },
      { step: "Phase 2: Arrays & HashMap Operations", duration: "Weeks 2-4", details: "Solve 40+ string operations and array caching questions." },
      { step: "Phase 3: Database & Multithreading", duration: "Week 5", details: "Review SQL query joins, indexing, and thread lock structures." }
    ],
    recommendedProjects: [
      "Secure Task REST API Server"
    ],
    resources: [
      { title: "Goldman Sachs Prep Guide", url: "https://www.goldmansachs.com/careers/" }
    ]
  },
  "atlassian": {
    slug: "atlassian",
    name: "Atlassian",
    overview: "Atlassian interviews evaluate system designs, code craftsmanship, test configurations, and values-alignment. Coding tasks focus on real-world development patterns rather than esoteric puzzles.",
    difficulty: "ADVANCED",
    commonRoles: ["Graduate SDE", "SDE-1"],
    rounds: [
      { title: "Online Assessment", desc: "HackerRank coding testing clean class design and input parsing (90 minutes)." },
      { title: "System Design & Coding Onsites", desc: "Includes Code Craftsmanship (focusing on unit tests and clean code) + Values Alignment (Atlassian values)." }
    ],
    oaPattern: "Clean code structure is highly audited. Write modular functions and clear parameter checks.",
    dsaTopics: ["Design Patterns", "Strings & JSON Parsing", "Hash Maps & Sets", "Recursion"],
    csFundamentals: ["Unit Testing & Mocking", "REST API Design", "System Scalability"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: [
      "Memorize Atlassian values: 'Open company, no bullshit', 'Play, as a team', 'Build with heart and balance'."
    ],
    faqs: [
      { q: "What is Code Craftsmanship?", a: "An interview focused on writing maintainable, readable, and well-tested code. You must write complete unit tests during the round." }
    ],
    timeline: [
      { step: "Phase 1: Clean Coding & Testing", duration: "Weeks 1-2", details: "Practice refactoring messy code and writing Jest unit tests." },
      { step: "Phase 2: System Architecture Review", duration: "Weeks 3-4", details: "Study message queues, database replication, and CDN caches." },
      { step: "Phase 3: Values Assessment", duration: "Week 5", details: "Review company values and prepare collaborative examples." }
    ],
    recommendedProjects: [
      "E-Commerce System with Analytics"
    ],
    resources: [
      { title: "Atlassian Careers Prep", url: "https://www.atlassian.com/company/careers" }
    ]
  },
  "uber": {
    slug: "uber",
    name: "Uber",
    overview: "Uber interviews demand top-tier concurrency coding, system design capabilities, and high-performance algorithms. Focus is on graph networks, location queries, and low-latency APIs.",
    difficulty: "ADVANCED",
    commonRoles: ["SWE Intern", "SWE-1"],
    rounds: [
      { title: "Online Assessment", desc: "3 algorithmic coding questions focusing on graphs, grids, and sorting bounds." },
      { title: "Technical Onsite Loop", desc: "2 coding rounds (concurrency, graphs) + 1 system architecture (low latency scaling) + 1 manager loop." }
    ],
    oaPattern: "Codesignal GC Framework. Requires optimized runtime codes; brute force solutions will TLE.",
    dsaTopics: ["Graphs (BFS/DFS, Dijkstra, MST)", "Design Data Structures (Trie, Heap)", "Two Pointers", "Concurrency Libraries"],
    csFundamentals: ["Multithreading & Concurrency", "System Scalability", "Low Latency Mappings"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: [
      "Show willingness to own large systems.",
      "Explain how you design high-reliability architectures."
    ],
    faqs: [
      { q: "Do they ask concurrency?", a: "Yes. Uber often tests thread synchronization, mutex lock designs, or building concurrent rate limiters." }
    ],
    timeline: [
      { step: "Phase 1: Graph Networks & Slopes", duration: "Weeks 1-3", details: "Solve 40+ LeetCode graph, heap, and geometric coordinates challenges." },
      { step: "Phase 2: Concurrency & Lock systems", duration: "Week 4", details: "Practice thread creations, mutex queues, and asynchronous designs." },
      { step: "Phase 3: Low-Latency Systems", duration: "Weeks 5-6", details: "Study geo-spatial indexes (Quadtree, H3), microservices, and in-memory caches." }
    ],
    recommendedProjects: [
      "Automated Docker CI/CD Pipeline"
    ],
    resources: [
      { title: "Uber Engineering Blog", url: "https://eng.uber.com" }
    ]
  },
  "adobe": {
    slug: "adobe",
    name: "Adobe",
    overview: "Adobe interviews assess robust OOP design, memory management, C++ structures (if desktop systems), web APIs, and algorithmic structures.",
    difficulty: "INTERMEDIATE",
    commonRoles: ["MTS-1", "Software Engineer"],
    rounds: [
      { title: "Online Assessment", desc: "HackerEarth test with coding challenges, logic aptitude, and OOP multiple choice questions." },
      { title: "Onsite Technical", desc: "3 rounds covering data structure modifications, OOP patterns, and database layouts." }
    ],
    oaPattern: "HackerEarth test containing array algorithms, math puzzles, and OOP pointers.",
    dsaTopics: ["BST & Balanced Trees", "Recursion & Backtracking", "String Parsing", "Dynamic Programming Basics"],
    csFundamentals: ["OOP/OOD", "OS (Memory Management, Virtual Memory)", "Compiler Basics"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: [
      "Demonstrate customer empathy.",
      "Show focus on creative problem solving and detail orientation."
    ],
    faqs: [
      { q: "Is C++ mandatory?", a: "Not always, but knowing C++ and manual memory management rules is heavily valued in Adobe's desktop graphics teams." }
    ],
    timeline: [
      { step: "Phase 1: OOP & Class Design", duration: "Week 1", details: "Review class structures, inheritance, and SOLID principles." },
      { step: "Phase 2: BSTs & Dynamic Lists", duration: "Weeks 2-4", details: "Practice tree insertions, traversals, and balance operations." },
      { step: "Phase 3: OS Memory Maps", duration: "Week 5", details: "Review virtual memory pages, allocations, and cache memory grids." }
    ],
    recommendedProjects: [
      "Sleek Dark Portfolio Website"
    ],
    resources: [
      { title: "Adobe Careers", url: "https://www.adobe.com/careers.html" }
    ]
  },
  "nvidia": {
    slug: "nvidia",
    name: "NVIDIA",
    overview: "NVIDIA interviews audit low-level hardware alignment: memory structures, computer architecture, GPU compilation (if CUDA teams), C/C++ memory models, and operating systems.",
    difficulty: "ADVANCED",
    commonRoles: ["Hardware Engineer", "System Software Engineer", "Deep Learning SDE"],
    rounds: [
      { title: "Technical Phone Screening", desc: "1 round verifying operating systems concepts, memory structures, and code writing." },
      { title: "Onsite Technical Loop", desc: "4-5 rounds covering C/C++ pointers, CPU caches, threading loops, and pipeline configurations." }
    ],
    oaPattern: "Aptitude tests on computer architecture, binary mathematics, and C pointers.",
    dsaTopics: ["Bit Manipulation", "Linked Lists & Binary Trees", "Sorting & Cache locality", "Search Trees"],
    csFundamentals: ["Computer Architecture (Caches, Pipelining)", "Operating Systems (Thread Sync, Interrupts)", "C/C++ Memory Models"],
    systemDesignLevel: "None",
    behavioralPrep: [
      "Show absolute obsession with efficiency and performance bottlenecks.",
      "Show technical alignment with hardware metrics."
    ],
    faqs: [
      { q: "Is C required?", a: "Yes. For System Software roles, writing clean C code using pointers and bitwise math is mandatory." }
    ],
    timeline: [
      { step: "Phase 1: Bit Manipulation & C Pointers", duration: "Weeks 1-2", details: "Practice bit operations, pointer math, and custom memory management configurations." },
      { step: "Phase 2: Computer Architecture & Cache Patterns", duration: "Weeks 3-4", details: "Study CPU cache configurations, cache hits/misses, and instruction pipelining." },
      { step: "Phase 3: OS Concurrency & Interrupts", duration: "Week 5", details: "Review device drivers, virtual filesystems, and thread priorities." }
    ],
    recommendedProjects: [
      "Automated Docker CI/CD Pipeline"
    ],
    resources: [
      { title: "NVIDIA Developer Resource Center", url: "https://developer.nvidia.com" }
    ]
  },
  "flipkart": {
    slug: "flipkart",
    name: "Flipkart",
    overview: "Flipkart loops assess machine coding (solving a real-world system design task in 2 hours with running code), system scaling architectures, and DSA efficiency.",
    difficulty: "ADVANCED",
    commonRoles: ["SDE-1", "SDE-2"],
    rounds: [
      { title: "Online Assessment", desc: "2 algorithmic questions (often involving trees, graphs, or modular math)." },
      { title: "Machine Coding Onsite", desc: "A 2-hour round where you must write fully functional, modular object-oriented code for a system (e.g. Booking System)." },
      { title: "System Design & DSA Onsites", desc: "2 onsite rounds inspecting scalable system configurations and advanced data structures." }
    ],
    oaPattern: "Focus on graphs and trees. Hard bounds require optimized algorithms.",
    dsaTopics: ["Graphs", "Heaps", "Trees", "Dynamic Programming"],
    csFundamentals: ["Object Oriented Design (OOD)", "DBMS (SQL/NoSQL patterns)", "System Scaling"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: [
      "Demonstrate customer focus.",
      "Show speed, adaptability, and bias for action."
    ],
    faqs: [
      { q: "What is the Machine Coding Round?", a: "You are given a problem description and must write clean, running, extensible OOP code (with interfaces and tests) on your laptop in 2 hours." }
    ],
    timeline: [
      { step: "Phase 1: Machine Coding Exercises", duration: "Weeks 1-3", details: "Practice designing parking lots, library catalogs, and booking systems in 2 hours using OOP." },
      { step: "Phase 2: Graph & DP Algorithms", duration: "Weeks 4-5", details: "Solve 30+ graph traversals and knapsack variation problems." },
      { step: "Phase 3: Scalability Designs", duration: "Week 6", details: "Study database replication keys, caching proxies, and load balancers." }
    ],
    recommendedProjects: [
      "E-Commerce System with Analytics"
    ],
    resources: [
      { title: "Flipkart SDE Interview Experience", url: "https://www.geeksforgeeks.org/flipkart-interview-experience/" }
    ]
  },
  "razorpay": {
    slug: "razorpay",
    name: "Razorpay",
    overview: "Razorpay interviews focus on clean code craftsmanship, transactional safety database queries, REST API designs, and values alignment.",
    difficulty: "INTERMEDIATE",
    commonRoles: ["SDE-1", "Backend Intern"],
    rounds: [
      { title: "Online Assessment", desc: "Coding test focusing on arrays, strings, and database query setups." },
      { title: "Technical Onsites", desc: "2 rounds focusing on clean API design, database schemas, transactional integrity, and DSA loops." }
    ],
    oaPattern: "HackerRank code challenges testing string processing and array optimization.",
    dsaTopics: ["String parsing", "Hash Maps & Stacks", "Trees", "Sorting & Searching"],
    csFundamentals: ["DBMS (ACID, Transactions, Indexing)", "REST API Patterns", "OOP Principles"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: [
      "Show passion for building transaction-safe fintech solutions.",
      "Demonstrate structured communication."
    ],
    faqs: [
      { q: "Do they ask database queries?", a: "Yes. Razorpay engineers often request SQL schema designs, indexing strategies, or writing transaction queries during interviews." }
    ],
    timeline: [
      { step: "Phase 1: SQL & Database Integrity", duration: "Weeks 1-2", details: "Master ACID properties, query joins, database indexes, and transaction locks." },
      { step: "Phase 2: API Design & Clean OOP", duration: "Weeks 3-4", details: "Practice designing robust RESTful APIs with proper validation schemas." },
      { step: "Phase 3: DSA Drills", duration: "Week 5", details: "Solve 20+ hash map, array pointer, and binary search challenges." }
    ],
    recommendedProjects: [
      "Secure Task REST API Server"
    ],
    resources: [
      { title: "Razorpay Careers Page", url: "https://razorpay.com/jobs/" }
    ]
  }
};
