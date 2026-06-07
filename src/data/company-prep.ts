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

// Generate the preparation data for 35 companies
export const companyPrepData: Record<string, CompanyPrepData> = {
  "google": {
    slug: "google",
    company: "Google",
    name: "Google",
    overview: "Google interviews assess raw problem solving, algorithmic fluency, coding speed, and Googliness (behavioral alignment). Questions focus heavily on graph traversals, dynamic programming, and systems scaling.",
    difficulty: "ADVANCED",
    roles: ["Software Engineering Intern", "Associate Software Engineer", "L3 Software Engineer"],
    commonRoles: ["Software Engineering Intern", "Associate Software Engineer", "L3 Software Engineer"],
    compensationRange: "$160,000 - $220,000",
    interviewRounds: [
      { title: "Online Assessment (OA)", desc: "2 complex algorithmic questions on clean coding structures (typically 90 minutes)." },
      { title: "Technical Phone Screen", desc: "1-2 rounds of algorithmic coding with a Google engineer via Google Docs or CodeSpace." },
      { title: "Onsite Loop", desc: "3-4 technical coding rounds (graphs, heaps, DP) + 1 behavioral (Googliness & Leadership) round." }
    ],
    rounds: [
      { title: "Online Assessment (OA)", desc: "2 complex algorithmic questions on clean coding structures (typically 90 minutes)." },
      { title: "Technical Phone Screen", desc: "1-2 rounds of algorithmic coding with a Google engineer via Google Docs or CodeSpace." },
      { title: "Onsite Loop", desc: "3-4 technical coding rounds (graphs, heaps, DP) + 1 behavioral (Googliness & Leadership) round." }
    ],
    roadmap: [
      { step: "Phase 1: Advanced DSA Drill", duration: "Weeks 1-4", details: "Solve 50+ medium/hard graph, tree, and dynamic programming challenges on LeetCode." },
      { step: "Phase 2: Speed Mocking", duration: "Weeks 5-6", details: "Conduct 10+ time-constrained mock interviews verbalizing complexity bounds." },
      { step: "Phase 3: System Design & CS Basics", duration: "Week 7", details: "Review memory models, thread synchronization, and load balancing patterns." },
      { step: "Phase 4: Googliness Preparation", duration: "Week 8", details: "Draft behavioral outlines using the STAR (Situation, Task, Action, Result) method." }
    ],
    timeline: [
      { step: "Phase 1: Advanced DSA Drill", duration: "Weeks 1-4", details: "Solve 50+ medium/hard graph, tree, and dynamic programming challenges on LeetCode." },
      { step: "Phase 2: Speed Mocking", duration: "Weeks 5-6", details: "Conduct 10+ time-constrained mock interviews verbalizing complexity bounds." },
      { step: "Phase 3: System Design & CS Basics", duration: "Week 7", details: "Review memory models, thread synchronization, and load balancing patterns." },
      { step: "Phase 4: Googliness Preparation", duration: "Week 8", details: "Draft behavioral outlines using the STAR (Situation, Task, Action, Result) method." }
    ],
    resources: [
      { title: "Google Careers Prep Guide", url: "https://careers.google.com/how-we-hire/" },
      { title: "NeetCode Graph Playlist", url: "https://neetcode.io" }
    ],
    projects: ["E-Commerce System with Analytics", "Automated Docker CI/CD Pipeline"],
    recommendedProjects: ["E-Commerce System with Analytics", "Automated Docker CI/CD Pipeline"],
    experiences: [
      { q: "Is syntax correctness important at Google?", a: "Yes. While pseudocode logic is audited, clean execution, solid naming conventions, and handling of edge-cases are highly weighted." },
      { q: "What is Googliness?", a: "A set of cultural markers: doing the right thing, valuing diversity, intellectual humility, and bias for action." }
    ],
    faqs: [
      { q: "Is syntax correctness important at Google?", a: "Yes. While pseudocode logic is audited, clean execution, solid naming conventions, and handling of edge-cases are highly weighted." },
      { q: "What is Googliness?", a: "A set of cultural markers: doing the right thing, valuing diversity, intellectual humility, and bias for action." }
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
    systemDesignFocus: "Scalable indexing, search engines crawling, and geographically distributed coordinate systems.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode Top Google Questions (Graphs & DP) and draft Googliness examples.",
      sixtyDays: "Conduct 10+ time-bounded mocks and read CMU database engineering slides.",
      ninetyDays: "Deep dive into Distributed File Systems (GFS) and MapReduce papers.",
      oneEightyDays: "Develop complete web analytics platform and perform mock loops with Google engineers."
    }
  },
  "microsoft": {
    slug: "microsoft",
    company: "Microsoft",
    name: "Microsoft",
    overview: "Microsoft interviews assess Object-Oriented Design, data structures, and robust software engineering practices. They also value passion for cloud technologies (Azure) and developer tools.",
    difficulty: "INTERMEDIATE",
    roles: ["SWE Intern", "Full Time SWE-1", "Support Engineer"],
    commonRoles: ["SWE Intern", "Full Time SWE-1", "Support Engineer"],
    compensationRange: "$140,000 - $190,000",
    interviewRounds: [
      { title: "Online Assessment (OA)", desc: "Codility assessment containing 3 coding challenges focusing on edge-cases (70-120 minutes)." },
      { title: "Technical Rounds", desc: "2-3 rounds exploring trees, linked lists, system design, and project architectures." },
      { title: "As Appropriate (AA) Round", desc: "A final interview auditing leadership, system designs, and team alignment metrics." }
    ],
    rounds: [
      { title: "Online Assessment (OA)", desc: "Codility assessment containing 3 coding challenges focusing on edge-cases (70-120 minutes)." },
      { title: "Technical Rounds", desc: "2-3 rounds exploring trees, linked lists, system design, and project architectures." },
      { title: "As Appropriate (AA) Round", desc: "A final interview auditing leadership, system designs, and team alignment metrics." }
    ],
    roadmap: [
      { step: "Phase 1: Basic DSA & Trees", duration: "Weeks 1-3", details: "Master recursion, tree traversals, and string parsing patterns." },
      { step: "Phase 2: Object-Oriented Designs", duration: "Week 4", details: "Review SOLID principles, Design Patterns (Singleton, Factory, Observer)." },
      { step: "Phase 3: Azure & Systems Overview", duration: "Week 5", details: "Understand cloud service setups, API Gateways, and databases." },
      { step: "Phase 4: Mocking & Core Resumes", duration: "Week 6", details: "Run mock interviews highlighting technical constraints in projects." }
    ],
    timeline: [
      { step: "Phase 1: Basic DSA & Trees", duration: "Weeks 1-3", details: "Master recursion, tree traversals, and string parsing patterns." },
      { step: "Phase 2: Object-Oriented Designs", duration: "Week 4", details: "Review SOLID principles, Design Patterns (Singleton, Factory, Observer)." },
      { step: "Phase 3: Azure & Systems Overview", duration: "Week 5", details: "Understand cloud service setups, API Gateways, and databases." },
      { step: "Phase 4: Mocking & Core Resumes", duration: "Week 6", details: "Run mock interviews highlighting technical constraints in projects." }
    ],
    resources: [
      { title: "Microsoft Careers Page", url: "https://careers.microsoft.com" }
    ],
    projects: ["Sleek Dark Portfolio Website", "Secure Task REST API Server"],
    recommendedProjects: ["Sleek Dark Portfolio Website", "Secure Task REST API Server"],
    experiences: [
      { q: "How important is Object Oriented Programming?", a: "Extremely. Microsoft engineers regularly ask candidates to design class relationships (e.g. Design a Parking Lot) using OOP principles." }
    ],
    faqs: [
      { q: "How important is Object Oriented Programming?", a: "Extremely. Microsoft engineers regularly ask candidates to design class relationships (e.g. Design a Parking Lot) using OOP principles." }
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
    systemDesignFocus: "Object-Oriented Design patterns, API structures, and cloud architecture setups.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode trees and lists problems, and study SOLID design rules.",
      sixtyDays: "Practice LLD machine coding (e.g., parking lot system class structure) in TypeScript/Java.",
      ninetyDays: "Study cloud deployment components (VPCs, CDNs) and load balance methods.",
      oneEightyDays: "Build a complete SaaS platform with multi-tenant databases."
    }
  },
  "amazon": {
    slug: "amazon",
    company: "Amazon",
    name: "Amazon",
    overview: "Amazon's interview loop focuses heavily on their 16 Leadership Principles (LPs). Algorithmic rounds assess tree traversals, queues, and database designs. Be ready to explain how your project work maps directly to their principles.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer", "Systems Architect", "Operations Intern"],
    commonRoles: ["Software Engineer", "Systems Architect", "Operations Intern"],
    compensationRange: "$150,000 - $210,000",
    interviewRounds: [
      { title: "Online Assessment (OA)", desc: "Debugging rounds, 2 coding challenges, and simulated work environment scenarios." },
      { title: "Onsite Loop", desc: "3 coding/design rounds (containing 30 mins LP queries) + 1 system architecture round." }
    ],
    rounds: [
      { title: "Online Assessment (OA)", desc: "Debugging rounds, 2 coding challenges, and simulated work environment scenarios." },
      { title: "Onsite Loop", desc: "3 coding/design rounds (containing 30 mins LP queries) + 1 system architecture round." }
    ],
    roadmap: [
      { step: "Phase 1: LP Integration", duration: "Weeks 1-2", details: "Draft 2 STAR stories for every one of Amazon's 16 Leadership Principles." },
      { step: "Phase 2: Heaps, Stacks, Queues", duration: "Weeks 3-5", details: "Master priority queues, sliding window arrays, and tree sweeps." },
      { step: "Phase 3: System Design Drill", duration: "Week 6", details: "Study distributed pub-sub pipelines (Kafka) and caching (Redis)." }
    ],
    timeline: [
      { step: "Phase 1: LP Integration", duration: "Weeks 1-2", details: "Draft 2 STAR stories for every one of Amazon's 16 Leadership Principles." },
      { step: "Phase 2: Heaps, Stacks, Queues", duration: "Weeks 3-5", details: "Master priority queues, sliding window arrays, and tree sweeps." },
      { step: "Phase 3: System Design Drill", duration: "Week 6", details: "Study distributed pub-sub pipelines (Kafka) and caching (Redis)." }
    ],
    resources: [
      { title: "Amazon Leadership Principles Guide", url: "https://www.aboutamazon.com/about-us/leadership-principles" }
    ],
    projects: ["Real-time Chat App", "Food Delivery System"],
    recommendedProjects: ["Real-time Chat App", "Food Delivery System"],
    experiences: [
      { q: "What is Customer Obsession?", a: "Amazon's most weighted LP. Show how you went out of your way to understand a user's problems and designed technical solutions for them." }
    ],
    faqs: [
      { q: "What is Customer Obsession?", a: "Amazon's most weighted LP. Show how you went out of your way to understand a user's problems and designed technical solutions for them." }
    ],
    oaPattern: "Focuses on heaps, binary search, and stacks. Includes Work Style Assessment checking LP matches.",
    dsaTopics: ["Heaps & Priority Queues", "Trees & Graphs (BFS/DFS)", "LRU Cache Design", "Strings & Arrays"],
    csFundamentals: ["OS (Process Sync)", "DBMS (ACID, Locks)", "Software Testing Methods"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: [
      "Memorize and apply Amazon's 16 Leadership Principles.",
      "Focus on Customer Obsession and Ownership.",
      "Use metrics in behavioral answers (e.g. 'improved efficiency by 15%')."
    ],
    systemDesignFocus: "Distributed caches, order queue processing, and microservices databases orchestration.",
    preparationTimeline: {
      thirtyDays: "Solve heap, map, and queue structures and write 10 LP STAR stories.",
      sixtyDays: "Practice system design layouts for scaling transactional microservices.",
      ninetyDays: "Mock with peers and refine metrics-driven talking points for past projects.",
      oneEightyDays: "Build a highly-concurrent food ordering platform using distributed message queues."
    }
  },
  "meta": {
    slug: "meta",
    company: "Meta",
    name: "Meta",
    overview: "Meta interviews are highly structured and fast-paced. Candidates must solve 2 medium-to-hard coding problems in 45 minutes. System design rounds assess candidate's ability to drive architectural conversations under clear timelines.",
    difficulty: "ADVANCED",
    roles: ["SWE Intern", "L4 Software Engineer", "Frontend Engineer"],
    commonRoles: ["SWE Intern", "L4 Software Engineer", "Frontend Engineer"],
    compensationRange: "$170,000 - $240,000",
    interviewRounds: [
      { title: "Technical Phone Screen", desc: "2 coding questions (45 mins) prioritizing optimal space/time complexity bounds." },
      { title: "Onsite Loop", desc: "2 coding rounds (45 mins each) + 1 system design (or frontend architecture) round + 1 behavioral round." }
    ],
    rounds: [
      { title: "Technical Phone Screen", desc: "2 coding questions (45 mins) prioritizing optimal space/time complexity bounds." },
      { title: "Onsite Loop", desc: "2 coding rounds (45 mins each) + 1 system design (or frontend architecture) round + 1 behavioral round." }
    ],
    roadmap: [
      { step: "Phase 1: High Frequency Leetcode", duration: "Weeks 1-4", details: "Filter and solve the top 100 Meta-tagged challenges on LeetCode." },
      { step: "Phase 2: Verbal Speed Runs", duration: "Weeks 5-6", details: "Mock coding sessions aiming to outline optimal designs under 15 minutes." }
    ],
    timeline: [
      { step: "Phase 1: High Frequency Leetcode", duration: "Weeks 1-4", details: "Filter and solve the top 100 Meta-tagged challenges on LeetCode." },
      { step: "Phase 2: Verbal Speed Runs", duration: "Weeks 5-6", details: "Mock coding sessions aiming to outline optimal designs under 15 minutes." }
    ],
    resources: [
      { title: "Meta Careers Portal Guide", url: "https://www.metacareers.com" }
    ],
    projects: ["Netflix Clone", "AI Resume Analyzer"],
    recommendedProjects: ["Netflix Clone", "AI Resume Analyzer"],
    experiences: [
      { q: "Is communication important?", a: "Critical. Because you must solve 2 problems in 45 minutes, explaining your logic concurrently while typing is necessary." }
    ],
    faqs: [
      { q: "Is communication important?", a: "Critical. Because you must solve 2 problems in 45 minutes, explaining your logic concurrently while typing is necessary." }
    ],
    oaPattern: "Not commonly used. Focus is on phone screening loops.",
    dsaTopics: ["Binary Trees & Graph BFS", "Hash Maps & Arrays", "Two Pointer & Sliding Window", "Intervals"],
    csFundamentals: ["OS (Concurrency)", "DBMS (NoSQL schemas)", "System Scale Tradeoffs"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: [
      "Highlight impact, ownership, and moving fast.",
      "Show how you resolved conflicts with teammates.",
      "Prepare examples of leadership without authority."
    ],
    systemDesignFocus: "Feed generation systems, messaging loops architecture, and content delivery network caching.",
    preparationTimeline: {
      thirtyDays: "Solve Meta high-frequency LeetCode questions, focusing on speed and edge-cases.",
      sixtyDays: "Practice system design for large-scale social networks (e.g., Instagram Feed).",
      ninetyDays: "Simulate coding loops solving 2 medium questions under 40 minutes.",
      oneEightyDays: "Build a highly interactive feed clone integrating live notifications and pagination."
    }
  },
  "apple": {
    slug: "apple",
    company: "Apple",
    name: "Apple",
    overview: "Apple interviews are team-specific. Loops assess low-level fundamentals, memory layouts, hardware-software interfaces, and concurrency. They value precision, craftsmanship, and elegant solutions.",
    difficulty: "ADVANCED",
    roles: ["Firmware Engineer", "macOS/iOS Developer", "SWE L3"],
    commonRoles: ["Firmware Engineer", "macOS/iOS Developer", "SWE L3"],
    compensationRange: "$150,000 - $210,000",
    interviewRounds: [
      { title: "Team Screen", desc: "1-2 phone screen rounds exploring fundamentals relevant to the target team." },
      { title: "Onsite Loop", desc: "5-6 rounds covering deep coding, algorithms, OOD, and hardware interfaces." }
    ],
    rounds: [
      { title: "Team Screen", desc: "1-2 phone screen rounds exploring fundamentals relevant to the target team." },
      { title: "Onsite Loop", desc: "5-6 rounds covering deep coding, algorithms, OOD, and hardware interfaces." }
    ],
    roadmap: [
      { step: "Phase 1: Memory & Pointers", duration: "Weeks 1-2", details: "Review pointer arithmetic, manual heap configurations, and cache alignments." }
    ],
    timeline: [
      { step: "Phase 1: Memory & Pointers", duration: "Weeks 1-2", details: "Review pointer arithmetic, manual heap configurations, and cache alignments." }
    ],
    resources: [{ title: "Apple Careers Guidelines", url: "https://www.apple.com/careers/" }],
    projects: ["Distributed URL Shortener", "Kubernetes Ops Panel"],
    recommendedProjects: ["Distributed URL Shortener", "Kubernetes Ops Panel"],
    experiences: [{ q: "What do Apple teams value most?", a: "Attention to detail, clean API boundaries, and deep understanding of memory constraints." }],
    faqs: [{ q: "What do Apple teams value most?", a: "Attention to detail, clean API boundaries, and deep understanding of memory constraints." }],
    oaPattern: "Rare. Focuses on team-specific low-level coding scripts.",
    dsaTopics: ["Bit Manipulation", "Arrays & Strings", "Trees & Graph DFS", "Memory Allocations"],
    csFundamentals: ["OS (Memory Layout, Registers)", "Computer Architecture", "Object Oriented Design"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Show commitment to high-quality code.", "Explain how you maintain privacy and security.", "Provide examples of pixel-perfect designs."],
    systemDesignFocus: "Local device storage syncing, secure API communication protocols, and embedded caches.",
    preparationTimeline: {
      thirtyDays: "Review pointers, assembly instructions, bit operations, and BST loops.",
      sixtyDays: "Practice building clean class structures (OOD) and memory managers.",
      ninetyDays: "Mock with colleagues on team-specific domains (e.g. graphics or OS kernels).",
      oneEightyDays: "Build an operating systems simulator or a custom binary compiler in C++/Rust."
    }
  },
  "netflix": {
    slug: "netflix",
    company: "Netflix",
    name: "Netflix",
    overview: "Netflix interviews assess cultural fit (Netflix Culture Memo) alongside senior-level engineering skills. Loops focus on microservices architecture, performance optimizations, and fallback layouts.",
    difficulty: "ADVANCED",
    roles: ["Senior Software Engineer", "Infrastructure Architect"],
    commonRoles: ["Senior Software Engineer", "Infrastructure Architect"],
    compensationRange: "$250,000 - $350,000",
    interviewRounds: [
      { title: "Technical Screen", desc: "Deep architectural screening regarding past production systems failures." },
      { title: "Onsite Loop", desc: "2 system design rounds + 2 behavioral/cultural alignment rounds." }
    ],
    rounds: [
      { title: "Technical Screen", desc: "Deep architectural screening regarding past production systems failures." },
      { title: "Onsite Loop", desc: "2 system design rounds + 2 behavioral/cultural alignment rounds." }
    ],
    roadmap: [{ step: "Phase 1: Culture Memo Study", duration: "Week 1", details: "Read the Netflix Culture Memo. Draft instances where you exercised Freedom and Responsibility." }],
    timeline: [{ step: "Phase 1: Culture Memo Study", duration: "Week 1", details: "Read the Netflix Culture Memo. Draft instances where you exercised Freedom and Responsibility." }],
    resources: [{ title: "Netflix Culture Memo", url: "https://jobs.netflix.com/culture" }],
    projects: ["Netflix Clone", "DevOps Monitoring Suite"],
    recommendedProjects: ["Netflix Clone", "DevOps Monitoring Suite"],
    experiences: [{ q: "What is unique about Netflix interviews?", a: "They assess independence. You must show how you work effectively with minimal oversight." }],
    faqs: [{ q: "What is unique about Netflix interviews?", a: "They assess independence. You must show how you work effectively with minimal oversight." }],
    oaPattern: "None. Focuses entirely on live technical design screens.",
    dsaTopics: ["System Design Tradeoffs", "Hash Tables", "Concurrency Arrays", "Dynamic Programming"],
    csFundamentals: ["Networking (CDN, HTTP/3)", "Distributed Systems", "Concurrency patterns"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on 'Freedom and Responsibility'.", "Show how you handle direct feedback.", "Prepare examples of making high-stakes trade-offs."],
    systemDesignFocus: "Video transcoding networks, content delivery networking (CDN), and high-availability database replication.",
    preparationTimeline: {
      thirtyDays: "Study the Netflix Culture Memo and outline past scale decisions in detail.",
      sixtyDays: "Analyze video streaming layouts and fault-tolerant architecture patterns.",
      ninetyDays: "Mock system designs focusing on CDN routing, caches, and database consistency.",
      oneEightyDays: "Build a distributed CDN simulation caching chunks across regional nodes."
    }
  },
  "goldman-sachs": {
    slug: "goldman-sachs",
    company: "Goldman Sachs",
    name: "Goldman Sachs",
    overview: "Goldman Sachs interviews assess CS fundamentals (OOP, OS, DBMS), mathematics probability, and core algorithmic coding. They value detail-oriented problem solvers who understand financial structures.",
    difficulty: "INTERMEDIATE",
    roles: ["Analyst SWE", "Quantitative Developer", "Summer Intern"],
    commonRoles: ["Analyst SWE", "Quantitative Developer", "Summer Intern"],
    compensationRange: "$110,000 - $160,000",
    interviewRounds: [
      { title: "CoderPad Screen", desc: "1-2 algorithmic questions solved in real-time under CoderPad compilers (60 mins)." },
      { title: "Superday Loop", desc: "3-4 technical rounds covering algorithms, math/probability, database joins, and resume metrics." }
    ],
    rounds: [
      { title: "CoderPad Screen", desc: "1-2 algorithmic questions solved in real-time under CoderPad compilers (60 mins)." },
      { title: "Superday Loop", desc: "3-4 technical rounds covering algorithms, math/probability, database joins, and resume metrics." }
    ],
    roadmap: [{ step: "Phase 1: Basic Math & Arrays", duration: "Weeks 1-2", details: "Review combinations, probability, map filters, and search methods." }],
    timeline: [{ step: "Phase 1: Basic Math & Arrays", duration: "Weeks 1-2", details: "Review combinations, probability, map filters, and search methods." }],
    resources: [{ title: "Goldman Sachs Prep Guide", url: "https://www.goldmansachs.com" }],
    projects: ["Expense Tracker", "Stock Prediction Platform"],
    recommendedProjects: ["Expense Tracker", "Stock Prediction Platform"],
    experiences: [{ q: "What kind of math is asked?", a: "Basic statistics, coin toss probabilities, and numerical puzzle estimations." }],
    faqs: [{ q: "What kind of math is asked?", a: "Basic statistics, coin toss probabilities, and numerical puzzle estimations." }],
    oaPattern: "HackerRank assessment testing arrays, math logic, and CS fundamentals.",
    dsaTopics: ["String & Array manipulation", "Hash Maps & Sets", "Recursion & Backtracking", "Math / Number Theory"],
    csFundamentals: ["DBMS (Joins, Indexes)", "OOP (Abstraction, Interfaces)", "OS (Deadlocks, Process Sync)"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on teamwork, integrity, and client service.", "Explain why you want to work in financial technology.", "Show interest in market trends."],
    systemDesignFocus: "Consistent data logs, transactions locking systems, and failover databases schema designs.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode string and math puzzles and review OOP terms.",
      sixtyDays: "Practice SQL queries including joins, window functions, and indexing layouts.",
      ninetyDays: "Mock CoderPad style loops with colleagues under time constraints.",
      oneEightyDays: "Build a financial transaction analytics server processing files."
    }
  },

  // === REMAINDER OF THE 35 COMPANIES (Google to Perplexity) ===
  "atlassian": {
    slug: "atlassian",
    company: "Atlassian",
    name: "Atlassian",
    overview: "Atlassian assessments look closely at code quality and clean structures. Their Machine Coding round requires writing extensible, tested code matching SOLID guidelines under a strict 45-minute loop.",
    difficulty: "ADVANCED",
    roles: ["Graduate Software Engineer", "SWE L2"],
    commonRoles: ["Graduate Software Engineer", "SWE L2"],
    compensationRange: "$130,000 - $180,000",
    interviewRounds: [
      { title: "Machine Coding Screen", desc: "Write clean, object-oriented solutions for a design prompt (e.g. Rate Limiter) with unit tests." }
    ],
    rounds: [
      { title: "Machine Coding Screen", desc: "Write clean, object-oriented solutions for a design prompt (e.g. Rate Limiter) with unit tests." }
    ],
    roadmap: [{ step: "Phase 1: Unit Testing Rules", duration: "Week 1", details: "Review Jest and JUnit testing frameworks, asserting edge cases." }],
    timeline: [{ step: "Phase 1: Unit Testing Rules", duration: "Week 1", details: "Review Jest and JUnit testing frameworks, asserting edge cases." }],
    resources: [{ title: "Atlassian Developer Guidance", url: "https://developer.atlassian.com" }],
    projects: ["Job Portal", "LMS Platform"],
    recommendedProjects: ["Job Portal", "LMS Platform"],
    experiences: [{ q: "How is code evaluated?", a: "Readability, naming conventions, separation of concerns, and robust test assertions count." }],
    faqs: [{ q: "How is code evaluated?", a: "Readability, naming conventions, separation of concerns, and robust test assertions count." }],
    oaPattern: "Object-oriented design problems matching REST validators.",
    dsaTopics: ["Rate Limiter design", "Graphs & Trees", "Design Patterns", "Strings & Arrays"],
    csFundamentals: ["SOLID Design Principles", "OOD Class structures", "Testing paradigms"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on Atlassian values: 'Play, as a team', 'Be the change you seek'.", "Explain how you handle constructive feedback."],
    systemDesignFocus: "Collaborative document sync architectures, API rate limiting, and relational schema designs.",
    preparationTimeline: {
      thirtyDays: "Practice writing clean class structures and unit tests inside local environments.",
      sixtyDays: "Study design patterns (Strategy, Factory) and build REST validation scripts.",
      ninetyDays: "Mock machine coding challenges within 45-minute limits.",
      oneEightyDays: "Build a collaborative workspace platform integrating real-time document syncing."
    }
  },
  "uber": {
    slug: "uber",
    company: "Uber",
    name: "Uber",
    overview: "Uber loops test highly scalable distributed systems design and spatial math. Candidates must design geo-matching routing dispatcher workflows that coordinate multiple concurrency pipelines.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer II", "Senior Distributed Architect"],
    commonRoles: ["Software Engineer II", "Senior Distributed Architect"],
    compensationRange: "$160,000 - $230,000",
    interviewRounds: [{ title: "System Design", desc: "Design geofencing services mapping location updates of 1M+ active drivers." }],
    rounds: [{ title: "System Design", desc: "Design geofencing services mapping location updates of 1M+ active drivers." }],
    roadmap: [{ step: "Phase 1: Spatial Algorithms", duration: "Week 1", details: "Study quad-trees, geohashing, and Redis coordinate sets." }],
    timeline: [{ step: "Phase 1: Spatial Algorithms", duration: "Week 1", details: "Study quad-trees, geohashing, and Redis coordinate sets." }],
    resources: [{ title: "Uber Tech Blog", url: "https://www.uber.com/blog/engineering/" }],
    projects: ["Ride Sharing System", "Kubernetes Dashboard"],
    recommendedProjects: ["Ride Sharing System", "Kubernetes Dashboard"],
    experiences: [{ q: "What is highly weighted?", a: "Concurrency models, distributed transactions consistency, and spatial index querying." }],
    faqs: [{ q: "What is highly weighted?", a: "Concurrency models, distributed transactions consistency, and spatial index querying." }],
    oaPattern: "Graph traversals, advanced priority queues, and sorting algorithms.",
    dsaTopics: ["Redis GeoSets spatial query", "Graphs (Dijkstra, MST)", "Dynamic Programming", "Concurrency structures"],
    csFundamentals: ["OS (Thread pools, Mutexes)", "DBMS (Geo indexes, Partitioning)", "Computer Networks"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Show bias for action and data-driven decisions.", "Focus on customer-focused solutions under operational stress."],
    systemDesignFocus: "Real-time dispatching loops, spatial data grids partitioning, and connection pooling protocols.",
    preparationTimeline: {
      thirtyDays: "Master geohash calculations, spatial grids, and Redis geo-APIs.",
      sixtyDays: "Study high-concurrency websocket management and queueing patterns.",
      ninetyDays: "Design full dispatcher architecture layouts on whiteboards.",
      oneEightyDays: "Develop a functional ride-matching dashboard with Leaflet and Redis."
    }
  },
  "adobe": {
    slug: "adobe",
    company: "Adobe",
    name: "Adobe",
    overview: "Adobe interviews assess computer graphics, object-oriented software patterns, and C++/Java development. Loops check candidate's ability to manipulate memory models and render assets efficiently.",
    difficulty: "INTERMEDIATE",
    roles: ["SWE 1", "Graphics Engineer", "Full Stack Developer"],
    commonRoles: ["SWE 1", "Graphics Engineer", "Full Stack Developer"],
    compensationRange: "$120,000 - $180,000",
    interviewRounds: [{ title: "System Design Screen", desc: "Design distributed document storage schemas (e.g. Creative Cloud assets sync)." }],
    rounds: [{ title: "System Design Screen", desc: "Design distributed document storage schemas (e.g. Creative Cloud assets sync)." }],
    roadmap: [{ step: "Phase 1: OOD class layouts", duration: "Week 1", details: "Review C++ classes, pointer layouts, and graphics abstractions." }],
    timeline: [{ step: "Phase 1: OOD class layouts", duration: "Week 1", details: "Review C++ classes, pointer layouts, and graphics abstractions." }],
    resources: [{ title: "Adobe Career Guidance", url: "https://www.adobe.com/careers.html" }],
    projects: ["Todo App", "Blog CMS"],
    recommendedProjects: ["Todo App", "Blog CMS"],
    experiences: [{ q: "Is OOP checked?", a: "Yes. They focus heavily on reusable design patterns and robust memory managers." }],
    faqs: [{ q: "Is OOP checked?", a: "Yes. They focus heavily on reusable design patterns and robust memory managers." }],
    oaPattern: "Focuses on strings, dynamic arrays, and basic tree traversals.",
    dsaTopics: ["Trees & Graphs", "Memory Allocations", "Design Patterns", "Strings & Arrays"],
    csFundamentals: ["Computer Graphics fundamentals", "OOP patterns", "OS memory maps"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on creativity, user empathy, and innovation.", "Show passion for digital experiences and design aesthetics."],
    systemDesignFocus: "Distributed asset storage systems, content sync, and desktop-to-cloud interfaces.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode trees and list layouts, and study design patterns.",
      sixtyDays: "Practice OOD class architecture mapping (e.g., paint canvas software).",
      ninetyDays: "Review distributed storage structures, file caches, and sync pipelines.",
      oneEightyDays: "Build a vector graphics canvas web app with dynamic asset persistence."
    }
  },
  "nvidia": {
    slug: "nvidia",
    company: "NVIDIA",
    name: "NVIDIA",
    overview: "NVIDIA interviews check firmware, low-level hardware structures, CUDA parallel programming, and computer architecture. They focus on hardware-software boundaries.",
    difficulty: "ADVANCED",
    roles: ["System Software Intern", "Hardware Engineer", "CUDA Compiler SWE"],
    commonRoles: ["System Software Intern", "Hardware Engineer", "CUDA Compiler SWE"],
    compensationRange: "$150,000 - $210,000",
    interviewRounds: [{ title: "GPU Architecture", desc: "Explain CUDA kernel launch rules, grid layouts, thread index mapping, and shared memory caches." }],
    rounds: [{ title: "GPU Architecture", desc: "Explain CUDA kernel launch rules, grid layouts, thread index mapping, and shared memory caches." }],
    roadmap: [{ step: "Phase 1: Parallel Compute", duration: "Week 1", details: "Master CUDA programming models, hardware registers, and thread warps." }],
    timeline: [{ step: "Phase 1: Parallel Compute", duration: "Week 1", details: "Master CUDA programming models, hardware registers, and thread warps." }],
    resources: [{ title: "NVIDIA Developer Zone", url: "https://developer.nvidia.com" }],
    projects: ["Stock Prediction Platform", "Kubernetes Dashboard"],
    recommendedProjects: ["Stock Prediction Platform", "Kubernetes Dashboard"],
    experiences: [{ q: "What CUDA features are tested?", a: "Memory bank conflicts, thread divergence, and cache locality optimization." }],
    faqs: [{ q: "What CUDA features are tested?", a: "Memory bank conflicts, thread divergence, and cache locality optimization." }],
    oaPattern: "Rare. Focuses on C programming memory optimizations and logic gates.",
    dsaTopics: ["Bit Operations", "Cache Locality optimization", "Arrays & Vectors", "Sorting"],
    csFundamentals: ["Parallel Programming (CUDA)", "Computer Architecture", "OS Kernels"],
    systemDesignLevel: "None",
    behavioralPrep: ["Focus on intense dedication, scientific rigor, and speed of execution.", "Explain how you solved complex hardware-software limits."],
    systemDesignFocus: "Embedded device caching, GPU-CPU pipelines, and parallel compute grids.",
    preparationTimeline: {
      thirtyDays: "Master memory systems, cache lines, assembly pointers, and bit logic.",
      sixtyDays: "Write CUDA threads mapping functions and test logic speed improvements.",
      ninetyDays: "Mock graphics or systems loops with active GPU engineers.",
      oneEightyDays: "Develop a custom parallel compute graphics engine script in CUDA/C++."
    }
  },
  "flipkart": {
    slug: "flipkart",
    company: "Flipkart",
    name: "Flipkart",
    overview: "Flipkart loops assess machine coding, DSA, and low-level design. The machine coding round requires constructing a functional backend application matching clean design guidelines in 120 minutes.",
    difficulty: "ADVANCED",
    roles: ["Software Development Engineer I", "SDE II"],
    commonRoles: ["Software Development Engineer I", "SDE II"],
    compensationRange: "₹18,000,000 - ₹30,000,000",
    interviewRounds: [{ title: "Machine Coding", desc: "Build a running application (e.g. Cab Booking system) with input drivers in 2 hours." }],
    rounds: [{ title: "Machine Coding", desc: "Build a running application (e.g. Cab Booking system) with input drivers in 2 hours." }],
    roadmap: [{ step: "Phase 1: LLD Patterns", duration: "Week 1", details: "Study SOLID principles and clean routing architectures in Go/Java." }],
    timeline: [{ step: "Phase 1: LLD Patterns", duration: "Week 1", details: "Study SOLID principles and clean routing architectures in Go/Java." }],
    resources: [{ title: "Flipkart Engineering Blog", url: "https://tech.flipkart.com" }],
    projects: ["E-Commerce Platform", "Job Portal"],
    recommendedProjects: ["E-Commerce Platform", "Job Portal"],
    experiences: [{ q: "What counts in Machine Coding?", a: "Functional completeness, SOLID models, extensibility, and clean console inputs." }],
    faqs: [{ q: "What counts in Machine Coding?", a: "Functional completeness, SOLID models, extensibility, and clean console inputs." }],
    oaPattern: "Focuses on array queries, interval mappings, and graph trees.",
    dsaTopics: ["System Design patterns", "Trees & Graphs", "Dynamic Programming", "Sorting & Map searches"],
    csFundamentals: ["Object Oriented Design (OOD)", "DBMS (Transaction locks)", "OS Threading"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on customer first, audacity, and ownership.", "Explain how you managed production bottlenecks in projects."],
    systemDesignFocus: "Scalable order queues, catalog searches indexes, and database replication setups.",
    preparationTimeline: {
      thirtyDays: "Practice coding functional class layouts with clean input drivers under 2 hours.",
      sixtyDays: "Study database constraints (indexes, locks) and transaction bounds.",
      ninetyDays: "Mock dynamic pricing systems system design layouts.",
      oneEightyDays: "Build a complete shopping application catalog with payment gateways."
    }
  },
  "razorpay": {
    slug: "razorpay",
    company: "Razorpay",
    name: "Razorpay",
    overview: "Razorpay is a major fintech platform. Interviews assess transactional consistency, REST API designs, security, and low latency caching loops.",
    difficulty: "INTERMEDIATE",
    roles: ["SDE I", "SDE II", "Security Engineer"],
    commonRoles: ["SDE I", "SDE II", "Security Engineer"],
    compensationRange: "₹16,000,000 - ₹26,000,000",
    interviewRounds: [{ title: "System Design Round", desc: "Design transactional ledgers, payment gateways, or distributed transaction handlers." }],
    rounds: [{ title: "System Design Round", desc: "Design transactional ledgers, payment gateways, or distributed transaction handlers." }],
    roadmap: [{ step: "Phase 1: Payment Ledgers", duration: "Week 1", details: "Study double-entry ledger database setups and idempotency keys." }],
    timeline: [{ step: "Phase 1: Payment Ledgers", duration: "Week 1", details: "Study double-entry ledger database setups and idempotency keys." }],
    resources: [{ title: "Razorpay Engineering Tech Docs", url: "https://razorpay.com" }],
    projects: ["E-Commerce Platform", "Expense Tracker"],
    recommendedProjects: ["E-Commerce Platform", "Expense Tracker"],
    experiences: [{ q: "What is Idempotency?", a: "Avoiding duplicate transaction charges when API requests are retried due to network drops." }],
    faqs: [{ q: "What is Idempotency?", a: "Avoiding duplicate transaction charges when API requests are retried due to network drops." }],
    oaPattern: "Fintech array challenges, dynamic programming, and hash maps.",
    dsaTopics: ["Transaction Idempotency", "Trees & Graphs", "Dynamic Programming", "Hash Tables"],
    csFundamentals: ["DBMS (ACID, Ledgers)", "Security (TLS, Encryption)", "OOP"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Show empathy, speed of execution, and structural design skills.", "Prepare stories of high accountability under system failures."],
    systemDesignFocus: "Payment gateways routing, transaction ledgers replication, and cache coherence.",
    preparationTimeline: {
      thirtyDays: "Study idempotency keys, payment webhooks, and ledger designs.",
      sixtyDays: "Solve LeetCode dynamic programming and string parsing challenges.",
      ninetyDays: "Mock payment systems layouts and database locks setups.",
      oneEightyDays: "Build a payment validation backend using Node/Postgres and Stripe integration."
    }
  },
  "phonepe": {
    slug: "phonepe",
    company: "PhonePe",
    name: "PhonePe",
    overview: "PhonePe operates under massive transactional throughput. Interviews assess backend design patterns, database indexing, and highly consistent distributed databases.",
    difficulty: "ADVANCED",
    roles: ["SDE-1", "SDE-2", "Backend Architect"],
    commonRoles: ["SDE-1", "SDE-2", "Backend Architect"],
    compensationRange: "₹20,000,000 - ₹32,000,000",
    interviewRounds: [{ title: "Transaction Scaling", desc: "Explain database locking strategies, distributed transaction maps (Saga), and message systems routing." }],
    rounds: [{ title: "Transaction Scaling", desc: "Explain database locking strategies, distributed transaction maps (Saga), and message systems routing." }],
    roadmap: [{ step: "Phase 1: Distributed Ledger Scales", duration: "Week 1", details: "Study distributed database consistency, two-phase commits, and Saga patterns." }],
    timeline: [{ step: "Phase 1: Distributed Ledger Scales", duration: "Week 1", details: "Study distributed database consistency, two-phase commits, and Saga patterns." }],
    resources: [{ title: "PhonePe Tech Blogs", url: "https://www.phonepe.com" }],
    projects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    recommendedProjects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    experiences: [{ q: "Is system design hard?", a: "Yes. They focus heavily on concurrency models and scaling databases to handle 10,000+ RPS." }],
    faqs: [{ q: "Is system design hard?", a: "Yes. They focus heavily on concurrency models and scaling databases to handle 10,000+ RPS." }],
    oaPattern: "Focuses on advanced trees, priority queues, and sorting.",
    dsaTopics: ["Priority Queues & Heaps", "Dynamic Programming", "Saga Design Patterns", "Distributed databases locks"],
    csFundamentals: ["DBMS (Isolation levels, Indexes)", "OS Concurrency", "Computer Networks"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on ownership, user centricity, and data integrity.", "Describe how you optimize systems bottlenecks."],
    systemDesignFocus: "Distributed payment dispatch loops, queue systems partitioning, and transaction ledgers.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode heaps and graphs, and study transactional isolation levels.",
      sixtyDays: "Practice system design for transaction-heavy financial networks.",
      ninetyDays: "Mock concurrency designs and distributed ledger structures.",
      oneEightyDays: "Build a highly scalable payment ledger server using gRPC and Go."
    }
  },
  "swiggy": {
    slug: "swiggy",
    company: "Swiggy",
    name: "Swiggy",
    overview: "Swiggy interviews focus on LLD, HLD, and spatial logistics. Loops check candidate's ability to coordinate live location updates, orders matching, and delivery dispatcher structures.",
    difficulty: "ADVANCED",
    roles: ["SDE I", "SDE II", "Infrastructure Engineer"],
    commonRoles: ["SDE I", "SDE II", "Infrastructure Engineer"],
    compensationRange: "₹16,000,000 - ₹28,000,000",
    interviewRounds: [{ title: "Dispatcher Design", desc: "Design a spatial food dispatcher matching riders with restaurants inside local geofences." }],
    rounds: [{ title: "Dispatcher Design", desc: "Design a spatial food dispatcher matching riders with restaurants inside local geofences." }],
    roadmap: [{ step: "Phase 1: Spatial geofencing", duration: "Week 1", details: "Review Redis GeoSets, quadtrees, and Leaflet location tracking." }],
    timeline: [{ step: "Phase 1: Spatial geofencing", duration: "Week 1", details: "Review Redis GeoSets, quadtrees, and Leaflet location tracking." }],
    resources: [{ title: "Swiggy Engineering Blog", url: "https://bytes.swiggy.com" }],
    projects: ["Food Delivery System", "Ride Sharing System"],
    recommendedProjects: ["Food Delivery System", "Ride Sharing System"],
    experiences: [{ q: "What design pattern is common?", a: "Observer, Strategy, and Factory patterns are heavily evaluated in LLD rounds." }],
    faqs: [{ q: "What design pattern is common?", a: "Observer, Strategy, and Factory patterns are heavily evaluated in LLD rounds." }],
    oaPattern: "Focuses on dynamic programming, intervals, and sorting graphs.",
    dsaTopics: ["Redis spatial indexes", "Heaps & Priority Queues", "Design Patterns", "Dynamic Programming"],
    csFundamentals: ["OOP patterns", "DBMS (Geo queries, Locks)", "OS threading"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Show consumer focus, speed of execution, and structural designs.", "Prepare stories of managing delivery queues under high load spikes."],
    systemDesignFocus: "Real-time routing algorithms, spatial dispatch loops, and microservices caching.",
    preparationTimeline: {
      thirtyDays: "Study spatial index algorithms, Redis geo commands, and OOP design models.",
      sixtyDays: "Practice building LLD cab/food booking scripts in 2 hours.",
      ninetyDays: "Review distributed message queues (Kafka, RabbitMQ) and caching.",
      oneEightyDays: "Build a complete food delivery dispatcher application with Kafka."
    }
  },
  "zomato": {
    slug: "zomato",
    company: "Zomato",
    name: "Zomato",
    overview: "Zomato loops check backend system design, database schemas, and caching layers. They value engineers who can design real-time systems to handle massive weekend traffic spikes.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Engineer", "Senior Developer", "DevOps Engineer"],
    commonRoles: ["Software Engineer", "Senior Developer", "DevOps Engineer"],
    compensationRange: "₹18,000,000 - ₹28,000,000",
    interviewRounds: [{ title: "Scalability Design", desc: "Design real-time restaurant booking, rating, and search system indexing menus dynamically." }],
    rounds: [{ title: "Scalability Design", desc: "Design real-time restaurant booking, rating, and search system indexing menus dynamically." }],
    roadmap: [{ step: "Phase 1: Database Caching", duration: "Week 1", details: "Study cache invalidation patterns, database scaling, and search indexing." }],
    timeline: [{ step: "Phase 1: Database Caching", duration: "Week 1", details: "Study cache invalidation patterns, database scaling, and search indexing." }],
    resources: [{ title: "Zomato Tech Blog", url: "https://zomato.com/blog" }],
    projects: ["Food Delivery System", "E-Commerce Platform"],
    recommendedProjects: ["Food Delivery System", "E-Commerce Platform"],
    experiences: [{ q: "How are search features built?", a: "Using Elasticsearch clusters, caching menus in Redis, and partitioning databases by regional locations." }],
    faqs: [{ q: "How are search features built?", a: "Using Elasticsearch clusters, caching menus in Redis, and partitioning databases by regional locations." }],
    oaPattern: "Focuses on strings parsing, dynamic programming, and heap allocations.",
    dsaTopics: ["Elasticsearch indexing", "Caching schemas", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["DBMS (Sharding, Replication)", "OS (Concurrency)", "OOP"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on ownership, bias for action, and customer feedback.", "Explain how you handle server outages under peak loads."],
    systemDesignFocus: "Search indexing clusters, real-time cache updates, and geofenced queries.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode strings and arrays, and study caching strategies.",
      sixtyDays: "Practice designing menus catalog search databases schemas.",
      ninetyDays: "Review sharding, replication, and global cache patterns.",
      oneEightyDays: "Build a search catalog app with Elasticsearch and Redis."
    }
  },
  "paypal": {
    slug: "paypal",
    company: "PayPal",
    name: "PayPal",
    overview: "PayPal interviews check CS fundamentals, OOP class designs, database locking, and secure APIs. They focus on transaction safety, ledger reliability, and data privacy.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Engineer I", "SDE II", "Fintech Intern"],
    commonRoles: ["Software Engineer I", "SDE II", "Fintech Intern"],
    compensationRange: "$130,000 - $180,000",
    interviewRounds: [{ title: "Fintech Design", desc: "Design secure payment gateways routing, transaction ledgers, and fraud auditing pipelines." }],
    rounds: [{ title: "Fintech Design", desc: "Design secure payment gateways routing, transaction ledgers, and fraud auditing pipelines." }],
    roadmap: [{ step: "Phase 1: Security & Ledger", duration: "Week 1", details: "Review encryption methods, OAuth, TLS, and double-entry database setups." }],
    timeline: [{ step: "Phase 1: Security & Ledger", duration: "Week 1", details: "Review encryption methods, OAuth, TLS, and double-entry database setups." }],
    resources: [{ title: "PayPal Developer Guide", url: "https://developer.paypal.com" }],
    projects: ["E-Commerce Platform", "Expense Tracker"],
    recommendedProjects: ["E-Commerce Platform", "Expense Tracker"],
    experiences: [{ q: "What transaction isolation level is used?", a: "Serializable or Repeatable Read is typically chosen to ensure balance consistency." }],
    faqs: [{ q: "What transaction isolation level is used?", a: "Serializable or Repeatable Read is typically chosen to ensure balance consistency." }],
    oaPattern: "Focuses on array queries, mathematical logic, and hash tables.",
    dsaTopics: ["Ledger designs", "Cryptography algorithms", "Graphs & Trees", "Dynamic Programming"],
    csFundamentals: ["DBMS (ACID, Isolation levels)", "Security (TLS, OAuth)", "OOP Design"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on customer focus, security, and global impact.", "Explain how you ensure data privacy in your projects."],
    systemDesignFocus: "Transactional databases, ledger auditing systems, and API idempotency.",
    preparationTimeline: {
      thirtyDays: "Study database isolation levels, encryption algorithms, and OOP terms.",
      sixtyDays: "Practice designing secure API endpoints with request validations.",
      ninetyDays: "Mock transaction processing loops and system designs.",
      oneEightyDays: "Build an API ledger backend using NestJS and PostgreSQL."
    }
  },
  "juspay": {
    slug: "juspay",
    company: "Juspay",
    name: "Juspay",
    overview: "Juspay interviews are highly algorithmic, focusing on graph theory, functional programming, and low-level concurrency pipelines. Their Hackathons are notoriously challenging.",
    difficulty: "ADVANCED",
    roles: ["SDE I", "SDE II", "FP Developer"],
    commonRoles: ["SDE I", "SDE II", "FP Developer"],
    compensationRange: "₹18,000,000 - ₹28,000,000",
    interviewRounds: [{ title: "Graph hackathon", desc: "Implement complex thread-safe graph operations (e.g. Lockable Tree) under high concurrency." }],
    rounds: [{ title: "Graph hackathon", desc: "Implement complex thread-safe graph operations (e.g. Lockable Tree) under high concurrency." }],
    roadmap: [{ step: "Phase 1: Thread-Safe Graphs", duration: "Week 1", details: "Master thread synchronization, mutexes, condition variables, and lock-free graphs." }],
    timeline: [{ step: "Phase 1: Thread-Safe Graphs", duration: "Week 1", details: "Master thread synchronization, mutexes, condition variables, and lock-free graphs." }],
    resources: [{ title: "Juspay Tech Blogs", url: "https://juspay.in" }],
    projects: ["Ride Sharing System", "Kubernetes Dashboard"],
    recommendedProjects: ["Ride Sharing System", "Kubernetes Dashboard"],
    experiences: [{ q: "What programming style is preferred?", a: "Functional programming (Haskell, PureScript, Clojure) concepts are highly valued." }],
    faqs: [{ q: "What programming style is preferred?", a: "Functional programming (Haskell, PureScript, Clojure) concepts are highly valued." }],
    oaPattern: "Hard graph traversals, concurrency models, and lock-free tree algorithms.",
    dsaTopics: ["Lockable N-ary Tree", "Thread Synchronization", "Functional Programming", "Graphs (BFS/DFS, Dijkstra)"],
    csFundamentals: ["OS (Concurrency, Lock-free structures)", "Functional Programming", "OOP Design"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on high technical capability, curiosity, and speed of execution.", "Describe how you solved complex algorithmic bugs."],
    systemDesignFocus: "Low-latency API loops, microservices threading, and spatial coordinate systems.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode advanced graph problems and study thread synchronization.",
      sixtyDays: "Practice writing lock-safe tree data structures in Java or C++.",
      ninetyDays: "Learn functional programming concepts (monads, immutability).",
      oneEightyDays: "Build a highly-concurrent transaction gateway using PureScript/Rust."
    }
  },
  "rubrik": {
    slug: "rubrik",
    company: "Rubrik",
    name: "Rubrik",
    overview: "Rubrik specializes in data storage management and security. Interviews focus heavily on system software engineering, OS kernels, file systems, and C++/Go programming.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer", "Systems Architect", "Storage Developer"],
    commonRoles: ["Software Engineer", "Systems Architect", "Storage Developer"],
    compensationRange: "$160,000 - $220,000",
    interviewRounds: [{ title: "Systems Internals", desc: "Explain memory virtualization, file systems inodes, transaction logging, and distributed replication." }],
    rounds: [{ title: "Systems Internals", desc: "Explain memory virtualization, file systems inodes, transaction logging, and distributed replication." }],
    roadmap: [{ step: "Phase 1: File System Internals", duration: "Week 1", details: "Study inodes, page cache, virtual memory management, and POSIX API systems." }],
    timeline: [{ step: "Phase 1: File System Internals", duration: "Week 1", details: "Study inodes, page cache, virtual memory management, and POSIX API systems." }],
    resources: [{ title: "Rubrik Engineering Blog", url: "https://www.rubrik.com/blog" }],
    projects: ["Distributed URL Shortener", "Kubernetes Dashboard"],
    recommendedProjects: ["Distributed URL Shortener", "Kubernetes Dashboard"],
    experiences: [{ q: "What storage models are checked?", a: "Write-Ahead Logging (WAL), Log-Structured Merge (LSM) Trees, and B-Trees." }],
    faqs: [{ q: "What storage models are checked?", a: "Write-Ahead Logging (WAL), Log-Structured Merge (LSM) Trees, and B-Trees." }],
    oaPattern: "Focuses on bitwise logic, advanced trees, and interval allocations.",
    dsaTopics: ["POSIX file API", "LSM & B-Trees", "Bit Manipulation", "Graphs & Trees"],
    csFundamentals: ["OS (File systems, Page cache)", "Distributed systems", "Systems Programming"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on integrity, technical rigor, and collaboration.", "Describe a situation where you debugged a system failure at the OS level."],
    systemDesignFocus: "Distributed storage clusters, backup replication pipelines, and database replication schemas.",
    preparationTimeline: {
      thirtyDays: "Solve bitwise LeetCode problems, and review POSIX systems APIs.",
      sixtyDays: "Practice designing storage engines (B-Tree/LSM-Tree) index schemas.",
      ninetyDays: "Mock systems designs for fault-tolerant data storage clusters.",
      oneEightyDays: "Build a custom key-value store storage engine using C++ or Go."
    }
  },
  "de-shaw": {
    slug: "de-shaw",
    company: "DE Shaw",
    name: "DE Shaw",
    overview: "DE Shaw is a prestigious quantitative hedge fund. Interviews assess advanced algorithms, systems programming, and high-frequency trading designs.",
    difficulty: "ADVANCED",
    roles: ["Software Developer", "Quantitative Analyst", "Graduate SWE"],
    commonRoles: ["Software Developer", "Quantitative Analyst", "Graduate SWE"],
    compensationRange: "$180,000 - $260,000",
    interviewRounds: [{ title: "Trading Loop", desc: "Design low-latency order execution book engines, pricing aggregators, and concurrent data buffers." }],
    rounds: [{ title: "Trading Loop", desc: "Design low-latency order execution book engines, pricing aggregators, and concurrent data buffers." }],
    roadmap: [{ step: "Phase 1: Order Book Algorithms", duration: "Week 1", details: "Study double-linked limit order book implementations and lock-free rings." }],
    timeline: [{ step: "Phase 1: Order Book Algorithms", duration: "Week 1", details: "Study double-linked limit order book implementations and lock-free rings." }],
    resources: [{ title: "DE Shaw Group Careers", url: "https://www.deshaw.com" }],
    projects: ["Stock Prediction Platform", "Distributed URL Shortener"],
    recommendedProjects: ["Stock Prediction Platform", "Distributed URL Shortener"],
    experiences: [{ q: "What performance metrics count?", a: "Cache-miss rates, memory allocation patterns, and lock contention drop-offs." }],
    faqs: [{ q: "What performance metrics count?", a: "Cache-miss rates, memory allocation patterns, and lock contention drop-offs." }],
    oaPattern: "Highly complex graphs, dynamic programming, and statistics puzzles.",
    dsaTopics: ["Limit Order Book design", "Lock-free Ring Buffer", "Advanced Graphs", "Dynamic Programming"],
    csFundamentals: ["OS (Low-latency networking, CPU pin)", "Computer Architecture", "Math & Probability"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on intellectual curiosity, mathematical precision, and collaboration.", "Show passion for trading systems architectures."],
    systemDesignFocus: "Low-latency systems, pricing feeds processing, and real-time ledger consistency.",
    preparationTimeline: {
      thirtyDays: "Solve advanced LeetCode graphs and DP, and review statistics templates.",
      sixtyDays: "Practice building lock-free data queues and circular buffers in C++.",
      ninetyDays: "Mock quant software loop formats and system design pipelines.",
      oneEightyDays: "Build a high-performance order book engine with C++ and Google Test."
    }
  },
  "morgan-stanley": {
    slug: "morgan-stanley",
    company: "Morgan Stanley",
    name: "Morgan Stanley",
    overview: "Morgan Stanley interviews assess Java concurrency, OOP, SQL databases, and CS fundamentals. They value robust development practices and financial technology interest.",
    difficulty: "INTERMEDIATE",
    roles: ["Technology Analyst", "Java Developer", "Summer Intern"],
    commonRoles: ["Technology Analyst", "Java Developer", "Summer Intern"],
    compensationRange: "$110,000 - $160,000",
    interviewRounds: [{ title: "Java Concurrency", desc: "Explain Java thread pools, executor services, memory barriers, and garbage collection mechanisms." }],
    rounds: [{ title: "Java Concurrency", desc: "Explain Java thread pools, executor services, memory barriers, and garbage collection mechanisms." }],
    roadmap: [{ step: "Phase 1: Java & Concurrency", duration: "Week 1", details: "Master Java collection frameworks, JVM optimizations, and concurrent locks." }],
    timeline: [{ step: "Phase 1: Java & Concurrency", duration: "Week 1", details: "Master Java collection frameworks, JVM optimizations, and concurrent locks." }],
    resources: [{ title: "Morgan Stanley Technology careers", url: "https://www.morganstanley.com" }],
    projects: ["Expense Tracker", "Stock Prediction Platform"],
    recommendedProjects: ["Expense Tracker", "Stock Prediction Platform"],
    experiences: [{ q: "Is SQL tested?", a: "Yes. They heavily evaluate SQL optimization (indexes, transactions isolation levels) and table designs." }],
    faqs: [{ q: "Is SQL tested?", a: "Yes. They heavily evaluate SQL optimization (indexes, transactions isolation levels) and table designs." }],
    oaPattern: "Focuses on strings, dynamic arrays, and basic tree layouts.",
    dsaTopics: ["JVM garbage collections", "SQL indexes & Joins", "Trees & Graphs", "Arrays & Maps"],
    csFundamentals: ["JVM Internals & GC", "DBMS (ACID, Joins)", "OOP Class structure"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on teamwork, client service, and professional integrity.", "Explain why you want to work in investment banking technology."],
    systemDesignFocus: "Transactional databases, caching layers, and backup ledger systems.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode arrays and strings, and study JVM internals.",
      sixtyDays: "Practice writing complex SQL queries including joins and window actions.",
      ninetyDays: "Review thread locks, memory structures, and OOP designs.",
      oneEightyDays: "Build a financial portfolio backend using Spring Boot and PostgreSQL."
    }
  },
  "jp-morgan": {
    slug: "jp-morgan",
    company: "JP Morgan",
    name: "JP Morgan",
    overview: "JP Morgan interviews check Java, Spring Boot, software patterns, and SQL. They focus on reliability, transaction consistency, and enterprise class layouts.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Engineer Graduate", "SDE II", "Java Analyst"],
    commonRoles: ["Software Engineer Graduate", "SDE II", "Java Analyst"],
    compensationRange: "$115,000 - $165,000",
    interviewRounds: [{ title: "Enterprise Design", desc: "Design transactional banking systems mapping users, balance ledger tables, and database locks." }],
    rounds: [{ title: "Enterprise Design", desc: "Design transactional banking systems mapping users, balance ledger tables, and database locks." }],
    roadmap: [{ step: "Phase 1: Spring Boot & SQL", duration: "Week 1", details: "Master Spring dependency injection, Hibernate JPA maps, and Postgres configurations." }],
    timeline: [{ step: "Phase 1: Spring Boot & SQL", duration: "Week 1", details: "Master Spring dependency injection, Hibernate JPA maps, and Postgres configurations." }],
    resources: [{ title: "JPMC Careers Tech Prep", url: "https://careers.jpmorgan.com" }],
    projects: ["E-Commerce Platform", "Todo App"],
    recommendedProjects: ["E-Commerce Platform", "Todo App"],
    experiences: [{ q: "What database features count?", a: "Locks, index types (B-Tree/Hash), and transactional consistency rules." }],
    faqs: [{ q: "What database features count?", a: "Locks, index types (B-Tree/Hash), and transactional consistency rules." }],
    oaPattern: "Focuses on basic loops, string parsing, and arrays.",
    dsaTopics: ["Spring Framework injection", "Transactional ledgers", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["OOP patterns (SOLID)", "DBMS (Transactions, Isolation)", "Enterprise Java"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Highlight leadership, teamwork, and service quality.", "Show understanding of global financial services scales."],
    systemDesignFocus: "Transactional systems, ledger synchronization, and caching systems.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode strings and arrays, and review Spring Boot basics.",
      sixtyDays: "Practice designing relational schemas and transaction boundary limits.",
      ninetyDays: "Mock enterprise system design loops and OOP structures.",
      oneEightyDays: "Build an online banking portal using Spring Boot and PostgreSQL."
    }
  },
  "salesforce": {
    slug: "salesforce",
    company: "Salesforce",
    name: "Salesforce",
    overview: "Salesforce interviews assess multi-tenant system design, backend architectures, APEX/Java coding, and API routing schemas.",
    difficulty: "INTERMEDIATE",
    roles: ["SWE Intern", "Associate Software Engineer", "Salesforce SDE"],
    commonRoles: ["SWE Intern", "Associate Software Engineer", "Salesforce SDE"],
    compensationRange: "$130,000 - $185,000",
    interviewRounds: [{ title: "Multi-Tenant Design", desc: "Design multi-tenant databases systems isolating tenant assets while keeping shared database pools." }],
    rounds: [{ title: "Multi-Tenant Design", desc: "Design multi-tenant databases systems isolating tenant assets while keeping shared database pools." }],
    roadmap: [{ step: "Phase 1: Multi-Tenancy concepts", duration: "Week 1", details: "Study database sharding, schema isolation strategies, and multi-tenant cache structures." }],
    timeline: [{ step: "Phase 1: Multi-Tenancy concepts", duration: "Week 1", details: "Study database sharding, schema isolation strategies, and multi-tenant cache structures." }],
    resources: [{ title: "Salesforce Careers Page", url: "https://www.salesforce.com/company/careers" }],
    projects: ["Job Portal", "Blog CMS"],
    recommendedProjects: ["Job Portal", "Blog CMS"],
    experiences: [{ q: "What is Multi-Tenancy?", a: "A system architecture where a single software instance serves multiple distinct customers (tenants) securely." }],
    faqs: [{ q: "What is Multi-Tenancy?", a: "A system architecture where a single software instance serves multiple distinct customers (tenants) securely." }],
    oaPattern: "Focuses on array sorting, hash maps, and basic string parsing.",
    dsaTopics: ["Multi-Tenant database sharding", "Trees & Graphs", "Dynamic Programming", "Sorting"],
    csFundamentals: ["Database Isolation", "Cloud Architecture concepts", "OOP"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on trust, customer success, innovation, and equality.", "Show how you solve user problems using cloud systems."],
    systemDesignFocus: "SaaS multi-tenant database designs, API routing, and caching models.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode arrays and maps, and study multi-tenancy rules.",
      sixtyDays: "Practice designing isolated data schemas and sharding keys.",
      ninetyDays: "Mock SaaS design frameworks and caching systems.",
      oneEightyDays: "Build a multi-tenant task workspace app using NextJS and Supabase."
    }
  },
  "linkedin": {
    slug: "linkedin",
    company: "LinkedIn",
    name: "LinkedIn",
    overview: "LinkedIn interviews focus heavily on graph databases, distributed message systems, and high concurrency. Loops check candidate's capability to scale social network features.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer", "Systems Developer", "Frontend Architect"],
    commonRoles: ["Software Engineer", "Systems Developer", "Frontend Architect"],
    compensationRange: "$160,000 - $225,000",
    interviewRounds: [{ title: "Social Graph Design", desc: "Design social graph databases (e.g. connections degrees lookup) using BFS/DFS optimizations." }],
    rounds: [{ title: "Social Graph Design", desc: "Design social graph databases (e.g. connections degrees lookup) using BFS/DFS optimizations." }],
    roadmap: [{ step: "Phase 1: Graph Scale-Out", duration: "Week 1", details: "Study distributed graph layouts, sharding by node hashes, and caching graphs." }],
    timeline: [{ step: "Phase 1: Graph Scale-Out", duration: "Week 1", details: "Study distributed graph layouts, sharding by node hashes, and caching graphs." }],
    resources: [{ title: "LinkedIn Engineering Tech blog", url: "https://engineering.linkedin.com" }],
    projects: ["Real-time Chat App", "Job Portal"],
    recommendedProjects: ["Real-time Chat App", "Job Portal"],
    experiences: [{ q: "How is graph search scaled?", a: "Using sub-graph database divisions, caching connections in memory, and query limits." }],
    faqs: [{ q: "How is graph search scaled?", a: "Using sub-graph database divisions, caching connections in memory, and query limits." }],
    oaPattern: "Focuses on advanced graphs, priority queues, and dynamic programming.",
    dsaTopics: ["Distributed Graph search", "Message queues Kafka", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["Distributed Systems", "DBMS (Graph DBs, Sharding)", "OS Concurrency"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on growth mindset, collaboration, and members first.", "Explain how you handle conflicts in technical teams."],
    systemDesignFocus: "Social graphs, feed generation systems, and asynchronous pipelines.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode advanced graph problems, and review BFS/DFS loops.",
      sixtyDays: "Practice designing distributed graph search models.",
      ninetyDays: "Review distributed queues (Kafka) and key-value cache systems.",
      oneEightyDays: "Build a connection network analyzer in Go using Graph DBs."
    }
  },
  "databricks": {
    slug: "databricks",
    company: "Databricks",
    name: "Databricks",
    overview: "Databricks loop evaluates distributed database structures, Spark optimization, storage engines, and concurrency. They target high-caliber systems engineers.",
    difficulty: "ADVANCED",
    roles: ["Software Developer", "Data Platform Architect", "Systems Developer"],
    commonRoles: ["Software Developer", "Data Platform Architect", "Systems Developer"],
    compensationRange: "$180,000 - $250,000",
    interviewRounds: [{ title: "Database Systems", desc: "Design distributed storage engines, log parsing pipelines, and query optimizers." }],
    rounds: [{ title: "Database Systems", desc: "Design distributed storage engines, log parsing pipelines, and query optimizers." }],
    roadmap: [{ step: "Phase 1: Distributed Engines", duration: "Week 1", details: "Study distributed database logs (Delta Lake), parquet layouts, and Spark optimizations." }],
    timeline: [{ step: "Phase 1: Distributed Engines", duration: "Week 1", details: "Study distributed database logs (Delta Lake), parquet layouts, and Spark optimizations." }],
    resources: [{ title: "Databricks Tech Blogs", url: "https://www.databricks.com/blog" }],
    projects: ["Kubernetes Dashboard", "Distributed URL Shortener"],
    recommendedProjects: ["Kubernetes Dashboard", "Distributed URL Shortener"],
    experiences: [{ q: "What storage engines are checked?", a: "Columnar databases layouts (Parquet), log structured storage systems, and Delta ledger caches." }],
    faqs: [{ q: "What storage engines are checked?", a: "Columnar databases layouts (Parquet), log structured storage systems, and Delta ledger caches." }],
    oaPattern: "Focuses on advanced tree data structures, sorting, and priority queues.",
    dsaTopics: ["Columnar database storage", "Delta Lake logging", "Advanced Trees & Graphs", "Dynamic Programming"],
    csFundamentals: ["Distributed Query Execution", "Operating Systems", "Systems Programming"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on intellectual rigor, teamwork, and customer impact.", "Show deep understanding of database scaling trades."],
    systemDesignFocus: "Distributed execution engines, storage-compute split architectures, and caches.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode advanced trees and dynamic programming, and study storage layouts.",
      sixtyDays: "Practice designing storage indexing engines class structures.",
      ninetyDays: "Mock distributed systems designs for transactional database engines.",
      oneEightyDays: "Build a custom columnar data parser engine in Rust or C++."
    }
  },
  "snowflake": {
    slug: "snowflake",
    company: "Snowflake",
    name: "Snowflake",
    overview: "Snowflake interviews assess cloud database systems, storage-compute separation, columnar data querying, and concurrency. They value systems engineering depth.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer II", "Database Platform SWE"],
    commonRoles: ["Software Engineer II", "Database Platform SWE"],
    compensationRange: "$180,000 - $245,000",
    interviewRounds: [{ title: "Compute Isolation", desc: "Design cloud compute scaling systems isolating customer warehouses while sharing global storage catalogs." }],
    rounds: [{ title: "Compute Isolation", desc: "Design cloud compute scaling systems isolating customer warehouses while sharing global storage catalogs." }],
    roadmap: [{ step: "Phase 1: Compute-Storage split", duration: "Week 1", details: "Study cloud metadata catalogs, virtual compute warehouse setups, and data caching loops." }],
    timeline: [{ step: "Phase 1: Compute-Storage split", duration: "Week 1", details: "Study cloud metadata catalogs, virtual compute warehouse setups, and data caching loops." }],
    resources: [{ title: "Snowflake Developer Portal Docs", url: "https://docs.snowflake.com" }],
    projects: ["Kubernetes Dashboard", "Stock Prediction Platform"],
    recommendedProjects: ["Kubernetes Dashboard", "Stock Prediction Platform"],
    experiences: [{ q: "What is Compute-Storage Split?", a: "An architecture separating metadata and storage catalog databases from the CPU nodes executing query loops." }],
    faqs: [{ q: "What is Compute-Storage Split?", a: "An architecture separating metadata and storage catalog databases from the CPU nodes executing query loops." }],
    oaPattern: "Advanced array sorting, heap structures, and graph tree traversals.",
    dsaTopics: ["Compute warehouses isolation", "Metadata database catalogs", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["Distributed SQL queries", "OS Internals", "Systems Programming"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on customer focus, integrity, and scaling out systems.", "Describe past projects where you solved compute resource constraints."],
    systemDesignFocus: "Cloud data warehouses sharding, metadata databases, and cache consistency.",
    preparationTimeline: {
      thirtyDays: "Solve advanced LeetCode arrays and graphs, and study data warehouse architectures.",
      sixtyDays: "Practice designing storage catalogs metadata indexes.",
      ninetyDays: "Review sharding, cluster replication, and transactional locks layouts.",
      oneEightyDays: "Build a distributed files partition parser system in C++ or Go."
    }
  },
  "palantir": {
    slug: "palantir",
    company: "Palantir",
    name: "Palantir",
    overview: "Palantir interviews focus on hard DSA, logical reasoning, and real-world system integrations. Candidates must show strong analytical capability under complex constraints.",
    difficulty: "ADVANCED",
    roles: ["Forward Deployed Engineer", "Software Developer", "DevOps Systems Engineer"],
    commonRoles: ["Forward Deployed Engineer", "Software Developer", "DevOps Systems Engineer"],
    compensationRange: "$150,000 - $210,000",
    interviewRounds: [{ title: "Decomposition Round", desc: "Deconstruct highly ambiguous real-world system issues (e.g. disaster relief tracking) into modular system structures." }],
    rounds: [{ title: "Decomposition Round", desc: "Deconstruct highly ambiguous real-world system issues (e.g. disaster relief tracking) into modular system structures." }],
    roadmap: [{ step: "Phase 1: Analytical structures", duration: "Week 1", details: "Review ambiguous scenario breakdowns and graph search logic (BFS/DFS)." }],
    timeline: [{ step: "Phase 1: Analytical structures", duration: "Week 1", details: "Review ambiguous scenario breakdowns and graph search logic (BFS/DFS)." }],
    resources: [{ title: "Palantir Careers Guide", url: "https://www.palantir.com/careers" }],
    projects: ["DevOps Monitoring Suite", "RAG PDF Chatbot"],
    recommendedProjects: ["DevOps Monitoring Suite", "RAG PDF Chatbot"],
    experiences: [{ q: "What is Decomposition?", a: "The capacity to take a massive, unstructured problem and break it down into explicit database, API, and UI components." }],
    faqs: [{ q: "What is Decomposition?", a: "The capacity to take a massive, unstructured problem and break it down into explicit database, API, and UI components." }],
    oaPattern: "Focuses on complex tree loops, matrix traversals, and graphs.",
    dsaTopics: ["Ambiguous scenario mapping", "Graphs & Trees BFS/DFS", "Dynamic Programming", "Sorting"],
    csFundamentals: ["System Design trade-offs", "Database Indexes", "Security & Encryption"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on technical capability, problem solving under stress, and mission alignment.", "Describe how you coordinate multiple data sources integrations."],
    systemDesignFocus: "Heterogeneous data integration systems, real-time sync pipelines, and spatial maps.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode graph and matrix problems, and practice scenario breakdowns.",
      sixtyDays: "Practice designing LLD class systems for complex scheduling scenarios.",
      ninetyDays: "Mock Palantir decomposition loops with systems engineers.",
      oneEightyDays: "Build a real-time data sync pipeline dashboard with Go/React."
    }
  },
  "stripe": {
    slug: "stripe",
    company: "Stripe",
    name: "Stripe",
    overview: "Stripe interviews assess API design quality, test coverage, and code design. Loops focus on clean, self-documenting code and thorough testing patterns.",
    difficulty: "ADVANCED",
    roles: ["Software Engineer I", "SDE II", "Security Developer"],
    commonRoles: ["Software Engineer I", "SDE II", "Security Developer"],
    compensationRange: "$165,000 - $230,000",
    interviewRounds: [{ title: "Integration Round", desc: "Write code integrating third-party APIs with extensive test verification suites under CoderPad." }],
    rounds: [{ title: "Integration Round", desc: "Write code integrating third-party APIs with extensive test verification suites under CoderPad." }],
    roadmap: [{ step: "Phase 1: API Design & Testing", duration: "Week 1", details: "Study HTTP protocol specifications, API REST validators, and test mocking setups." }],
    timeline: [{ step: "Phase 1: API Design & Testing", duration: "Week 1", details: "Study HTTP protocol specifications, API REST validators, and test mocking setups." }],
    resources: [{ title: "Stripe Tech Blog", url: "https://stripe.com/blog" }],
    projects: ["E-Commerce Platform", "Expense Tracker"],
    recommendedProjects: ["E-Commerce Platform", "Expense Tracker"],
    experiences: [{ q: "What is highly evaluated?", a: "API clean naming variables, robust error handlers, and functional completeness over speed." }],
    faqs: [{ q: "What is highly evaluated?", a: "API clean naming variables, robust error handlers, and functional completeness over speed." }],
    oaPattern: "Focuses on string parsers, file configurations inputs, and map filters.",
    dsaTopics: ["REST validation rules", "API Mocking setups", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["HTTP Protocols", "OOD clean design patterns", "Testing structures"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on precision, documentation, and developer-first logic.", "Prepare examples of how you structured public APIs or tools."],
    systemDesignFocus: "Payment transaction systems, webhook integrations, and API idempotency layouts.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode string and map puzzles, and review HTTP specification documents.",
      sixtyDays: "Practice writing API routing layouts with extensive mock test assertions.",
      ninetyDays: "Mock Stripe integration format loops under 60-minute CoderPad limits.",
      oneEightyDays: "Build a complete Stripe-like checkout API with Node and Jest testing."
    }
  },
  "coinbase": {
    slug: "coinbase",
    company: "Coinbase",
    name: "Coinbase",
    overview: "Coinbase interviews evaluate cryptographic ledger models, blockchain interfaces, security, and low latency transactional loops.",
    difficulty: "INTERMEDIATE",
    roles: ["Software Engineer", "Blockchain Developer", "Security Analyst"],
    commonRoles: ["Software Engineer", "Blockchain Developer", "Security Analyst"],
    compensationRange: "$140,000 - $195,000",
    interviewRounds: [{ title: "Ledger Security", desc: "Design secure transaction signing ledgers, cryptographic verify pipelines, and hot-cold storage splits." }],
    rounds: [{ title: "Ledger Security", desc: "Design secure transaction signing ledgers, cryptographic verify pipelines, and hot-cold storage splits." }],
    roadmap: [{ step: "Phase 1: Cryptographic setups", duration: "Week 1", details: "Study ledger double-entry tables, asymmetric encryption keys, and digital sign keys." }],
    timeline: [{ step: "Phase 1: Cryptographic setups", duration: "Week 1", details: "Study ledger double-entry tables, asymmetric encryption keys, and digital sign keys." }],
    resources: [{ title: "Coinbase Engineering Blog", url: "https://blog.coinbase.com" }],
    projects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    recommendedProjects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    experiences: [{ q: "What ledger models are checked?", a: "UTXO model structures, balance-based ledgers, and transactions verification schemas." }],
    faqs: [{ q: "What ledger models are checked?", a: "UTXO model structures, balance-based ledgers, and transactions verification schemas." }],
    oaPattern: "Focuses on array queries, number logic, and hash map searches.",
    dsaTopics: ["Hot-Cold storage partitions", "Cryptographic ledgers", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["Cryptography (Asymmetric, Hash)", "DBMS (Isolation, ACID)", "Distributed systems"],
    systemDesignLevel: "System Design Basics",
    behavioralPrep: ["Focus on efficiency, clear communication, and customer safety.", "Explain your interest in decentralized finance systems."],
    systemDesignFocus: "Distributed ledger scaling, transaction validation, and secure API gateways.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode maps and arrays, and study cryptographic key signatures.",
      sixtyDays: "Practice designing transactional database schemas with locks.",
      ninetyDays: "Mock transaction processing loops and system designs.",
      oneEightyDays: "Build a simple decentralized finance wallet backend with Web3."
    }
  },
  "cloudflare": {
    slug: "cloudflare",
    company: "Cloudflare",
    name: "Cloudflare",
    overview: "Cloudflare interviews check networking systems, DNS protocols, CDN caching, and systems performance (C/Go/Rust). They value network architectural depth.",
    difficulty: "ADVANCED",
    roles: ["Systems Engineer", "Security Engineer", "Infrastructure Developer"],
    commonRoles: ["Systems Engineer", "Security Engineer", "Infrastructure Developer"],
    compensationRange: "$150,000 - $215,000",
    interviewRounds: [{ title: "CDN Caching", desc: "Design edge CDN caching nodes, rate limiting systems, and request validation pipelines." }],
    rounds: [{ title: "CDN Caching", desc: "Design edge CDN caching nodes, rate limiting systems, and request validation pipelines." }],
    roadmap: [{ step: "Phase 1: HTTP & DNS", duration: "Week 1", details: "Review TCP/UDP routing layers, DNS record types, and HTTP caching headers." }],
    timeline: [{ step: "Phase 1: HTTP & DNS", duration: "Week 1", details: "Review TCP/UDP routing layers, DNS record types, and HTTP caching headers." }],
    resources: [{ title: "Cloudflare Engineering blog", url: "https://blog.cloudflare.com" }],
    projects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    recommendedProjects: ["Distributed URL Shortener", "DevOps Monitoring Suite"],
    experiences: [{ q: "What network layers are checked?", a: "Layer 4 (TCP) vs Layer 7 (HTTP) routing mechanisms, load balancers, and reverse proxy systems." }],
    faqs: [{ q: "What network layers are checked?", a: "Layer 4 (TCP) vs Layer 7 (HTTP) routing mechanisms, load balancers, and reverse proxy systems." }],
    oaPattern: "Focuses on bit manipulation, array logic, and priority queues.",
    dsaTopics: ["CDN edge caches", "DNS protocol mapping", "Bit Manipulation", "Graphs & Trees"],
    csFundamentals: ["Computer Networks (TCP/IP, HTTP/3)", "Operating Systems", "Systems Programming"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on security, privacy, and speed of execution.", "Describe how you debugged a network connectivity issue in past projects."],
    systemDesignFocus: "Edge network architectures, globally distributed CDN caches, and DDoS mitigations.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode bit operations and maps, and study networking models.",
      sixtyDays: "Practice writing network socket servers with clean error handling.",
      ninetyDays: "Mock CDN scale design layouts and rate limiter systems.",
      oneEightyDays: "Build a custom reverse proxy server in Go or Rust caching static files."
    }
  },
  "tesla": {
    slug: "tesla",
    company: "Tesla",
    name: "Tesla",
    overview: "Tesla interviews check hardware integration software, C/C++ embedded platforms, real-time operating systems (RTOS), and robotics control loops.",
    difficulty: "ADVANCED",
    roles: ["Autopilot Engineer", "Embedded Software Developer", "Firmware Intern"],
    commonRoles: ["Autopilot Engineer", "Embedded Software Developer", "Firmware Intern"],
    compensationRange: "$140,000 - $205,000",
    interviewRounds: [{ title: "Embedded C++", desc: "Write thread-safe control loop algorithms in C++ with manual memory mapping rules." }],
    rounds: [{ title: "Embedded C++", desc: "Write thread-safe control loop algorithms in C++ with manual memory mapping rules." }],
    roadmap: [{ step: "Phase 1: RTOS control loops", duration: "Week 1", details: "Study RTOS thread scheduling rules, memory mapping layouts, and pointer offsets." }],
    timeline: [{ step: "Phase 1: RTOS control loops", duration: "Week 1", details: "Study RTOS thread scheduling rules, memory mapping layouts, and pointer offsets." }],
    resources: [{ title: "Tesla Careers Portal", url: "https://www.tesla.com/careers" }],
    projects: ["Kubernetes Dashboard", "DevOps Monitoring Suite"],
    recommendedProjects: ["Kubernetes Dashboard", "DevOps Monitoring Suite"],
    experiences: [{ q: "What C++ features are tested?", a: "Volatile pointer keywords, hardware registers maps, and parallel execution logic." }],
    faqs: [{ q: "What C++ features are tested?", a: "Volatile pointer keywords, hardware registers maps, and parallel execution logic." }],
    oaPattern: "Rare. Focuses on low-level C logic and assembly pointers.",
    dsaTopics: ["RTOS thread layouts", "Embedded C++ memory", "Bit Manipulation", "Arrays & Vectors"],
    csFundamentals: ["Operating Systems (RTOS, Interrupts)", "Computer Architecture", "Control Theory"],
    systemDesignLevel: "None",
    behavioralPrep: ["Focus on hard work, dedication, speed, and hardware innovation.", "Describe how you solved complex hardware-software limits."],
    systemDesignFocus: "Embedded device caching, GPU-CPU pipelines, and parallel compute grids.",
    preparationTimeline: {
      thirtyDays: "Master C pointer arithmetic, hardware registers, and register registers.",
      sixtyDays: "Practice writing low-level hardware control loops with constraints.",
      ninetyDays: "Mock embedded systems and robotics loops with active engineers.",
      oneEightyDays: "Build a custom RTOS control script mapping memory variables in C++."
    }
  },
  "spacex": {
    slug: "spacex",
    company: "SpaceX",
    name: "SpaceX",
    overview: "SpaceX interviews evaluate real-time systems safety, embedded C++ control systems, telemetry pipelines, and parallel compute architectures.",
    difficulty: "ADVANCED",
    roles: ["Flight Software Engineer", "Systems Architect", "Embedded Developer"],
    commonRoles: ["Flight Software Engineer", "Systems Architect", "Embedded Developer"],
    compensationRange: "$145,000 - $210,000",
    interviewRounds: [{ title: "Telemetry loop", desc: "Design telemetry data capture pipelines handling 1M+ packets/sec with zero packet loss." }],
    rounds: [{ title: "Telemetry loop", desc: "Design telemetry data capture pipelines handling 1M+ packets/sec with zero packet loss." }],
    roadmap: [{ step: "Phase 1: Telemetry systems", duration: "Week 1", details: "Study UDP socket routing, packet parsing schemas, and binary serialization loops." }],
    timeline: [{ step: "Phase 1: Telemetry systems", duration: "Week 1", details: "Study UDP socket routing, packet parsing schemas, and binary serialization loops." }],
    resources: [{ title: "SpaceX Group Careers Guide", url: "https://www.spacex.com/careers" }],
    projects: ["Kubernetes Dashboard", "DevOps Monitoring Suite"],
    recommendedProjects: ["Kubernetes Dashboard", "DevOps Monitoring Suite"],
    experiences: [{ q: "What telemetry features are tested?", a: "Packet validation algorithms, ring buffer structures, and CPU thread mapping loops." }],
    faqs: [{ q: "What telemetry features are tested?", a: "Packet validation algorithms, ring buffer structures, and CPU thread mapping loops." }],
    oaPattern: "Rare. Focuses on low-level C programming logic.",
    dsaTopics: ["Telemetry packet parsing", "Thread allocations", "Bit Manipulation", "Arrays & Vectors"],
    csFundamentals: ["OS (RTOS, Interrupt handlers)", "Computer Architecture", "Computer Networks"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on mission-first dedication, high technical standards, and resilience.", "Show how you debugged a telemetry failure under tight deadlines."],
    systemDesignFocus: "Embedded device caching, telemetry pipelines, and parallel compute grids.",
    preparationTimeline: {
      thirtyDays: "Master C pointer arithmetic, packet structures, and binary parsing loops.",
      sixtyDays: "Practice writing low-level telemetry ingestion pipelines.",
      ninetyDays: "Mock embedded systems and real-time operations loops with engineers.",
      oneEightyDays: "Build a custom real-time telemetry parser system in C++ or Go."
    }
  },
  "openai": {
    slug: "openai",
    company: "OpenAI",
    name: "OpenAI",
    overview: "OpenAI interviews evaluate deep learning systems scaling, LLM optimization (tensor parallelism), CUDA programming, and model interfaces.",
    difficulty: "ADVANCED",
    roles: ["Research Engineer", "Machine Learning Platform SWE", "API Developer"],
    commonRoles: ["Research Engineer", "Machine Learning Platform SWE", "API Developer"],
    compensationRange: "$200,000 - $320,000",
    interviewRounds: [{ title: "Model Scaling", desc: "Design deep learning platforms scaling training runs across 10,000+ GPUs with minimal idle time." }],
    rounds: [{ title: "Model Scaling", desc: "Design deep learning platforms scaling training runs across 10,000+ GPUs with minimal idle time." }],
    roadmap: [{ step: "Phase 1: Deep Learning Scale", duration: "Week 1", details: "Study distributed training systems, data parallelism, and tensor layouts." }],
    timeline: [{ step: "Phase 1: Deep Learning Scale", duration: "Week 1", details: "Study distributed training systems, data parallelism, and tensor layouts." }],
    resources: [{ title: "OpenAI Research Publications", url: "https://openai.com/research" }],
    projects: ["RAG PDF Chatbot", "Stock Prediction Platform"],
    recommendedProjects: ["RAG PDF Chatbot", "Stock Prediction Platform"],
    experiences: [{ q: "What is Tensor Parallelism?", a: "Splitting model tensor weight matrix layers across multiple GPUs to fit large model parameters." }],
    faqs: [{ q: "What is Tensor Parallelism?", a: "Splitting model tensor weight matrix layers across multiple GPUs to fit large model parameters." }],
    oaPattern: "Focuses on complex matrices operations, priority queues, and graph trees.",
    dsaTopics: ["Tensor weight partitioning", "Model context scaling", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["Distributed Query Execution", "Operating Systems", "Deep Learning Systems"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on safety, alignment, scientific curiosity, and speed.", "Show deep understanding of deep learning constraints."],
    systemDesignFocus: "Distributed execution engines, storage-compute split architectures, and caches.",
    preparationTimeline: {
      thirtyDays: "Solve advanced LeetCode matrices and graphs, and study ML models.",
      sixtyDays: "Practice writing CUDA threads mapping functions for model speedups.",
      ninetyDays: "Mock ML systems loops and model designs with experts.",
      oneEightyDays: "Build a custom deep learning execution engine in C++ and CUDA."
    }
  },
  "anthropic": {
    slug: "anthropic",
    company: "Anthropic",
    name: "Anthropic",
    overview: "Anthropic interviews assess AI safety, model alignment systems, deep learning platforms scaling, and API routing schemas.",
    difficulty: "ADVANCED",
    roles: ["Research SWE", "AI Platform Developer", "Graduate Intern"],
    commonRoles: ["Research SWE", "AI Platform Developer", "Graduate Intern"],
    compensationRange: "$190,000 - $300,000",
    interviewRounds: [{ title: "Model Alignment", desc: "Design systems auditing model alignment metrics, verifying safety guidelines, and monitoring prompts." }],
    rounds: [{ title: "Model Alignment", desc: "Design systems auditing model alignment metrics, verifying safety guidelines, and monitoring prompts." }],
    roadmap: [{ step: "Phase 1: AI safety systems", duration: "Week 1", details: "Study prompt filtering systems, alignment verification, and secure API gateways." }],
    timeline: [{ step: "Phase 1: AI safety systems", duration: "Week 1", details: "Study prompt filtering systems, alignment verification, and secure API gateways." }],
    resources: [{ title: "Anthropic Research Index", url: "https://www.anthropic.com/research" }],
    projects: ["RAG PDF Chatbot", "AI Resume Analyzer"],
    recommendedProjects: ["RAG PDF Chatbot", "AI Resume Analyzer"],
    experiences: [{ q: "What is constitutional AI?", a: "Training models to follow a set of safety rules and guidelines during execution loops." }],
    faqs: [{ q: "What is constitutional AI?", a: "Training models to follow a set of safety rules and guidelines during execution loops." }],
    oaPattern: "Focuses on matrix operations, trees, and hash tables.",
    dsaTopics: ["Model safety verification", "API rate limiting", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["Model alignment frameworks", "Operating Systems", "Systems Programming"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on safety, honesty, cooperation, and rigorous thinking.", "Show deep understanding of AI safety constraints."],
    systemDesignFocus: "Distributed prompt execution, cache consistency, and database isolation.",
    preparationTimeline: {
      thirtyDays: "Solve advanced LeetCode graphs and DP, and study ML safety frameworks.",
      sixtyDays: "Practice designing prompt checking routing class layouts.",
      ninetyDays: "Mock ML platforms loops and systems designs.",
      oneEightyDays: "Build a custom prompt safety filtering gateway using Node and Python."
    }
  },
  "perplexity": {
    slug: "perplexity",
    company: "Perplexity",
    name: "Perplexity",
    overview: "Perplexity is a conversational search engine. Interviews evaluate search crawling, index databases, vector retrieval, and low latency LLM caching layers.",
    difficulty: "ADVANCED",
    roles: ["Search Engine SWE", "AI Developer", "Frontend Intern"],
    commonRoles: ["Search Engine SWE", "AI Developer", "Frontend Intern"],
    compensationRange: "$160,000 - $230,000",
    interviewRounds: [{ title: "Search Indexing", desc: "Design real-time web crawlers, search index databases, and conversational vector retrieval caches." }],
    rounds: [{ title: "Search Indexing", desc: "Design real-time web crawlers, search index databases, and conversational vector retrieval caches." }],
    roadmap: [{ step: "Phase 1: Real-time search crawling", duration: "Week 1", details: "Study web crawler architectures, parsing schemas, and vector index databases." }],
    timeline: [{ step: "Phase 1: Real-time search crawling", duration: "Week 1", details: "Study web crawler architectures, parsing schemas, and vector index databases." }],
    resources: [{ title: "Perplexity Corporate News", url: "https://www.perplexity.ai" }],
    projects: ["RAG PDF Chatbot", "Distributed URL Shortener"],
    recommendedProjects: ["RAG PDF Chatbot", "Distributed URL Shortener"],
    experiences: [{ q: "How is search retrieval optimized?", a: "Using hybrid search (BM25 + vector similarity), and caching LLM token outputs." }],
    faqs: [{ q: "How is search retrieval optimized?", a: "Using hybrid search (BM25 + vector similarity), and caching LLM token outputs." }],
    oaPattern: "Focuses on string parsers, graph traversals, and dynamic programming.",
    dsaTopics: ["Real-time search indexes", "Conversational vector caches", "Graphs & Trees", "Arrays & Maps"],
    csFundamentals: ["Information Retrieval", "Operating Systems", "Systems Programming"],
    systemDesignLevel: "Advanced System Design",
    behavioralPrep: ["Focus on customer focus, innovation, safety, and speed.", "Describe past projects where you solved data query bounds."],
    systemDesignFocus: "Distributed crawler architecture, index databases sharding, and caching.",
    preparationTimeline: {
      thirtyDays: "Solve LeetCode advanced search problems, and review string parsing loops.",
      sixtyDays: "Practice designing real-time search crawlers indexing models.",
      ninetyDays: "Mock search platforms design loops and systems designs.",
      oneEightyDays: "Build a conversational QA engine using Next.js and Pinecone."
    }
  }
};

// Backward-compatibility export mapping
export const companyRoadmaps = companyPrepData;
