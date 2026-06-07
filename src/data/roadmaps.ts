import { RoadmapData, RoadmapNodeData } from "@/store/useRoadmapStore";

export interface RoadmapMetaData {
  id: string;
  title: string;
  slug: string;
  category: "DEVELOPMENT" | "DATA_SCIENCE" | "SYSTEMS" | "PREPARATION";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  estimatedDuration: string;
  prerequisites: string[];
  languages: string[];
  tools: string[];
  frameworks: string[];
  databases: string[];
  testing: string[];
  deployment: string[];
  advancedConcepts: string[];
  projects: string[];
  interviewQuestions: string[];
}

// Define data mappings for all 29 career roadmaps
const roadmapsMeta: Record<string, RoadmapMetaData> = {
  "frontend-developer": {
    id: "roadmap-frontend",
    title: "Frontend Developer",
    slug: "frontend-developer",
    category: "DEVELOPMENT",
    difficulty: "BEGINNER",
    estimatedDuration: "4 Months",
    prerequisites: [],
    languages: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript"],
    tools: ["Vite", "Webpack", "npm/pnpm", "Git & GitHub", "Chrome DevTools"],
    frameworks: ["React.js", "Next.js App Router", "Tailwind CSS", "Zustand"],
    databases: ["LocalStorage", "IndexedDB", "SessionStorage"],
    testing: ["Jest", "React Testing Library", "Cypress E2E"],
    deployment: ["Vercel", "Netlify", "GitHub Pages"],
    advancedConcepts: ["Web Workers", "Micro-Frontends", "WebAssembly (Wasm)", "Content Security Policy (CSP)"],
    projects: ["Sleek Dark Portfolio Website", "Weather Dashboard", "Task Kanban Board"],
    interviewQuestions: [
      "What is the difference between client-side rendering (CSR) and server-side rendering (SSR)?",
      "Explain event delegation and event bubbling in the browser DOM."
    ]
  },
  "backend-developer": {
    id: "roadmap-backend",
    title: "Backend Developer",
    slug: "backend-developer",
    category: "DEVELOPMENT",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "4 Months",
    prerequisites: ["frontend-developer"],
    languages: ["Node.js (JavaScript/TypeScript)", "Python", "Go (Golang)", "Java"],
    tools: ["Postman", "Docker", "Git & GitHub", "REST Client", "SSH"],
    frameworks: ["Express.js", "NestJS", "FastAPI", "Spring Boot"],
    databases: ["PostgreSQL (Relational)", "MongoDB (NoSQL)", "Redis (Caching)"],
    testing: ["Supertest", "Jest", "PyTest", "Mocha"],
    deployment: ["AWS (EC2/S3)", "Render", "Heroku", "Docker Compose"],
    advancedConcepts: ["Message Queues (RabbitMQ/Kafka)", "Rate Limiting", "WebSockets Concurrency", "gRPC APIs"],
    projects: ["Secure Task REST API Server", "Distributed URL Shortener", "Real-time Chat App Backend"],
    interviewQuestions: [
      "Explain the event loop in Node.js and how it handles asynchronous operations.",
      "What is database sharding and how does it differ from horizontal replication?"
    ]
  },
  "fullstack-developer": {
    id: "roadmap-fullstack",
    title: "Full Stack Developer",
    slug: "fullstack-developer",
    category: "DEVELOPMENT",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "6 Months",
    prerequisites: ["frontend-developer", "backend-developer"],
    languages: ["JavaScript", "TypeScript", "SQL"],
    tools: ["Git & GitHub", "Docker", "Postman", "Vite", "ESLint"],
    frameworks: ["React.js", "Next.js", "Express.js", "Zustand"],
    databases: ["PostgreSQL", "MongoDB", "Redis"],
    testing: ["Jest", "Cypress", "Supertest"],
    deployment: ["Vercel", "AWS", "Render"],
    advancedConcepts: ["GraphQL APIs", "Monorepo architectures", "Serverless Functions", "WebSockets sync"],
    projects: ["E-Commerce System with Payments", "Student Job Portal", "E-Learning LMS Platform"],
    interviewQuestions: [
      "How do you handle user session state synchronization between Next.js SSR and Express JWT auth?",
      "Explain database transactions ACID safety guidelines under concurrent API loads."
    ]
  },
  "android": {
    id: "roadmap-android",
    title: "Android Developer",
    slug: "android",
    category: "DEVELOPMENT",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "4 Months",
    prerequisites: [],
    languages: ["Kotlin", "Java"],
    tools: ["Android Studio", "Gradle", "Logcat", "ADB (Android Debug Bridge)"],
    frameworks: ["Jetpack Compose", "Android SDK", "Coroutines & Flows"],
    databases: ["Room DB", "SQLite", "DataStore"],
    testing: ["JUnit", "Espresso", "Mockk"],
    deployment: ["Google Play Store", "Firebase App Distribution"],
    advancedConcepts: ["Dagger Hilt Dependency Injection", "Android WorkManager", "Memory Leak profiling"],
    projects: ["Offline-first Journal App", "Bluetooth IoT Controller Dashboard"],
    interviewQuestions: [
      "Explain Android Activity Lifecycle states and how Compose remembers state.",
      "What are Kotlin coroutines and how do they resolve thread blocking?"
    ]
  },
  "ios": {
    id: "roadmap-ios",
    title: "iOS Developer",
    slug: "ios",
    category: "DEVELOPMENT",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "4 Months",
    prerequisites: [],
    languages: ["Swift", "Objective-C"],
    tools: ["Xcode", "Instruments (profiling)", "Swift Package Manager", "CocoaPods"],
    frameworks: ["SwiftUI", "UIKit", "Combine (Reactive)"],
    databases: ["CoreData", "SwiftData", "Realm"],
    testing: ["XCTest", "Swift Testing", "Quick & Nimble"],
    deployment: ["Apple App Store", "TestFlight"],
    advancedConcepts: ["Automatic Reference Counting (ARC)", "GCD (Grand Central Dispatch)", "CoreAnimation"],
    projects: ["Interactive iOS Habit Tracker", "Real-time Crypto Price Grid"],
    interviewQuestions: [
      "What is a retain cycle in Swift and how do you prevent it using weak references?",
      "Explain SwiftUI's declarative view state management model."
    ]
  },
  "qa": {
    id: "roadmap-qa",
    title: "QA Testing Engineer",
    slug: "qa",
    category: "DEVELOPMENT",
    difficulty: "BEGINNER",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["JavaScript", "Python", "Java"],
    tools: ["Selenium", "Playwright", "Postman", "Jira", "JMeter"],
    frameworks: ["Cypress", "PyTest", "TestNG", "Cucumber (BDD)"],
    databases: ["SQL query basics"],
    testing: ["Unit testing", "Integration testing", "E2E testing", "Load testing"],
    deployment: ["GitHub Actions pipelines", "Jenkins build automation"],
    advancedConcepts: ["Visual Regression Testing", "Chaos engineering assertions", "API load benchmarking"],
    projects: ["Automated E2E Testing Suite for Shop", "Load Benchmarking script for REST APIs"],
    interviewQuestions: [
      "Explain the difference between black-box testing and white-box testing.",
      "How do you design a robust locator selector strategy in Playwright/Selenium?"
    ]
  },
  "blockchain": {
    id: "roadmap-blockchain",
    title: "Blockchain Developer",
    slug: "blockchain",
    category: "DEVELOPMENT",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["backend-developer"],
    languages: ["Solidity", "Rust", "JavaScript/TypeScript"],
    tools: ["Hardhat", "Foundry", "Truffle", "Metamask Wallet", "Etherscan"],
    frameworks: ["Web3.js", "Ethers.js", "Anchor (Solana)"],
    databases: ["IPFS (Decentralized storage)", "The Graph (indexing)"],
    testing: ["Waffle", "Foundry tests", "Chai assertions"],
    deployment: ["Ethereum Mainnet", "Solana Devnet", "Arbitrum Layer-2"],
    advancedConcepts: ["Reentrancy Vulnerabilities", "Gas Optimization rules", "DeFi Flash Loans", "Zero Knowledge Proofs"],
    projects: ["Decentralized Crowdfunding Smart Contract", "NFT Minting DApp Portal"],
    interviewQuestions: [
      "What is reentrancy and how do you mitigate it using checks-effects-interactions patterns?",
      "Explain the gas fees mechanism in EVM and how to optimize storage layout."
    ]
  },
  "game-developer": {
    id: "roadmap-game-developer",
    title: "Game Developer",
    slug: "game-developer",
    category: "DEVELOPMENT",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "4 Months",
    prerequisites: [],
    languages: ["C#", "C++", "GLSL Shaders"],
    tools: ["Unity Engine", "Unreal Engine", "Blender", "RenderDoc"],
    frameworks: ["MonoBehaviour", "Physics 2D/3D engines"],
    databases: ["Local SaveGame files JSON"],
    testing: ["Unity Test Runner", "Unreal Automation Framework"],
    deployment: ["Steam Platform", "itch.io", "WebGL static build"],
    advancedConcepts: ["Object Pooling", "Shader Graph calculations", "Spatial Partitioning grids", "A* Pathfinding"],
    projects: ["2D Platformer Unity Project", "3D Maze solver with custom shaders"],
    interviewQuestions: [
      "What is object pooling and how does it prevent GC stuttering in game loops?",
      "Explain how draw calls optimization affects frame rendering rate."
    ]
  },
  "server-side-game-developer": {
    id: "roadmap-server-side-game-developer",
    title: "Server Side Game Developer",
    slug: "server-side-game-developer",
    category: "DEVELOPMENT",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["backend-developer", "game-developer"],
    languages: ["C++", "C#", "Go", "TypeScript"],
    tools: ["Docker", "Kubernetes", "Redis", "Wireshark"],
    frameworks: ["Socket.io", "gRPC", "Mirror (Unity)", "Nakama"],
    databases: ["PostgreSQL", "Redis Cache", "MongoDB"],
    testing: ["LoadTesting tools", "Locust scripts"],
    deployment: ["AWS GameLift", "Kubernetes Agones clusters"],
    advancedConcepts: ["Client-Side Prediction", "Dead Reckoning lag compensation", "State Synchronization", "UDP/TCP routing protocols"],
    projects: ["Real-time Multiplayer Lobby Server", "Cooperative Matchmaker Service"],
    interviewQuestions: [
      "Explain the difference between TCP and UDP protocols inside action multiplayer loops.",
      "How do client prediction and server reconciliation mitigate visual network lag?"
    ]
  },
  "software-architect": {
    id: "roadmap-software-architect",
    title: "Software Architect",
    slug: "software-architect",
    category: "DEVELOPMENT",
    difficulty: "ADVANCED",
    estimatedDuration: "6 Months",
    prerequisites: ["backend-developer"],
    languages: ["TypeScript", "Java", "Go", "Python"],
    tools: ["Draw.io", "Docker", "Kubernetes", "Prometheus", "UML diagrams"],
    frameworks: ["Spring Cloud", "NestJS monorepo", "GraphQL Federation"],
    databases: ["PostgreSQL (Multi-region)", "Cassandra", "Redis Clustered"],
    testing: ["Chaos Mesh", "LoadRunner", "SonarQube quality checks"],
    deployment: ["AWS Multi-AZ", "Kubernetes EKS clusters", "Terraform IaC"],
    advancedConcepts: ["Saga Transactions pattern", "Event Sourcing", "Domain-Driven Design (DDD)", "CAP Theorem tradeoffs"],
    projects: ["Microservices Architectural Blueprint", "Distributed Ledger Sync system"],
    interviewQuestions: [
      "Explain the Saga pattern and how it manages distributed transactions consistency.",
      "What are the tradeoffs between Event Sourcing and relational state updates?"
    ]
  },
  "developer-relations": {
    id: "roadmap-developer-relations",
    title: "Developer Relations (DevRel)",
    slug: "developer-relations",
    category: "DEVELOPMENT",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "3 Months",
    prerequisites: ["frontend-developer"],
    languages: ["JavaScript", "TypeScript", "Python"],
    tools: ["GitHub", "Discord", "OBS Studio", "Google Analytics", "Markdown"],
    frameworks: ["Next.js", "Docusaurus", "Tailwind CSS"],
    databases: ["SQL query basics"],
    testing: ["CI/CD validation scripts"],
    deployment: ["Vercel", "GitHub Pages"],
    advancedConcepts: ["Open-Source community strategies", "API SDK generation", "Public Speaking layouts", "Analytics funnels"],
    projects: ["Open-Source SDK wrapper library", "Technical documentation portal project"],
    interviewQuestions: [
      "How do you evaluate the success metrics of an open-source developer tool?",
      "What is your strategy for handling critical developer feedback on a breaking API update?"
    ]
  },
  "forward-deployed-engineer": {
    id: "roadmap-forward-deployed-engineer",
    title: "Forward Deployed Engineer",
    slug: "forward-deployed-engineer",
    category: "DEVELOPMENT",
    difficulty: "ADVANCED",
    estimatedDuration: "4 Months",
    prerequisites: ["backend-developer", "fullstack-developer"],
    languages: ["Python", "SQL", "JavaScript/TypeScript", "Bash"],
    tools: ["Docker", "Git & GitHub", "Jira", "Postman", "Kibana"],
    frameworks: ["React.js", "FastAPI", "Pandas"],
    databases: ["PostgreSQL", "Elasticsearch", "Oracle DB"],
    testing: ["Integration checks", "User Acceptance Testing (UAT)"],
    deployment: ["On-Premise deployments", "AWS VPCs", "Kubernetes"],
    advancedConcepts: ["Data Integration pipelines", "Client customization hooks", "Legacy database migrations", "SOC2 security checks"],
    projects: ["Heterogeneous Data Integration pipeline", "On-Premises deployment suite"],
    interviewQuestions: [
      "How do you balance writing custom code for a high-value client versus building scalable product features?",
      "Describe how you debugged a system failure inside a client's secure, isolated VPC network."
    ]
  },

  // === SYSTEMS ROADMAPS ===
  "devops-engineer": {
    id: "roadmap-devops",
    title: "DevOps Engineer",
    slug: "devops-engineer",
    category: "SYSTEMS",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["backend-developer"],
    languages: ["Bash", "Python", "Go (Golang)", "YAML/JSON"],
    tools: ["Docker", "Kubernetes", "Ansible", "Jenkins", "GitLab CI"],
    frameworks: ["Terraform", "Helm charts"],
    databases: ["PostgreSQL (Replication)", "Redis Clustered"],
    testing: ["Terratest", "ShellSpec"],
    deployment: ["AWS (EKS/EC2/RDS)", "GCP", "Azure"],
    advancedConcepts: ["Infrastructure as Code (IaC)", "GitOps (ArgoCD)", "Service Meshes (Istio)", "Chaos Engineering"],
    projects: ["AWS Infrastructure Setup via Terraform", "Automated Kubernetes Deployment pipeline"],
    interviewQuestions: [
      "Explain how Kubernetes handles blue-green deployments and self-healing pods.",
      "What are the benefits of immutable infrastructure and how does Terraform manage it?"
    ]
  },
  "devsecops": {
    id: "roadmap-devsecops",
    title: "DevSecOps Engineer",
    slug: "devsecops",
    category: "SYSTEMS",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["devops-engineer"],
    languages: ["Bash", "Python", "Go"],
    tools: ["Trivy", "SonarQube", "HashiCorp Vault", "OWASP ZAP", "GitLab Secure"],
    frameworks: ["Terraform (Secured)"],
    databases: ["PostgreSQL (Encrypted)"],
    testing: ["SAST scanning", "DAST scanning", "SCA auditing"],
    deployment: ["AWS", "Kubernetes (Network Policies)"],
    advancedConcepts: ["Secrets Management", "Shift-Left security", "Vulnerability management pipelines", "Container Auditing"],
    projects: ["SonarQube & Trivy CI Pipeline Integration", "HashiCorp Vault API integration project"],
    interviewQuestions: [
      "What is the difference between static (SAST) and dynamic (DAST) security analysis?",
      "How do you handle API credential injection inside containers without exposing secrets in Git?"
    ]
  },
  "postgresql": {
    id: "roadmap-postgresql",
    title: "PostgreSQL Database Engineer",
    slug: "postgresql",
    category: "SYSTEMS",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["SQL", "PL/pgSQL", "Python/Bash"],
    tools: ["pgAdmin", "pg_dump/pg_restore", "Explain Visualizers", "psql CLI"],
    frameworks: ["Prisma", "Sequelize"],
    databases: ["PostgreSQL (Advanced)"],
    testing: ["pgTap unit testing"],
    deployment: ["Supabase", "AWS RDS Postgres", "Dockerized Postgres clustered"],
    advancedConcepts: ["Connection Pooling (PgBouncer)", "Write-Ahead Logging (WAL)", "Logical Replication", "Composite Indexing"],
    projects: ["Highly Available Postgres Cluster setup", "Database Query Performance Optimizer Suite"],
    interviewQuestions: [
      "Explain the differences between PostgreSQL transaction isolation levels and how they prevent dirty reads.",
      "How do you configure PgBouncer and optimize database connection limits?"
    ]
  },
  "network-engineer": {
    id: "roadmap-network-engineer",
    title: "Network Engineer",
    slug: "network-engineer",
    category: "SYSTEMS",
    difficulty: "BEGINNER",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["Bash", "Python (Netmiko/Scapy)"],
    tools: ["Wireshark", "Cisco Packet Tracer", "GNS3", "SSH/Telnet"],
    frameworks: ["TCP/IP stack", "OSI reference model"],
    databases: ["SQLite (for config logging)"],
    testing: ["Ping/Traceroute scripts", "iPerf throughput testing"],
    deployment: ["Cisco IOS configurations", "Cloud VPS network topologies"],
    advancedConcepts: ["BGP & OSPF routing protocols", "Subnet partitioning", "VLAN trunking", "DNS lookup resolving"],
    projects: ["Cisco Packet Tracer Network Topology setup", "Python Wireshark Network Packet Scanner"],
    interviewQuestions: [
      "Explain TCP 3-way handshake process and the flags set in each packet.",
      "What is the purpose of subnetting and how do you calculate CIDR IP allocations?"
    ]
  },
  "cyber-security": {
    id: "roadmap-cyber-security",
    title: "Cyber Security Engineer",
    slug: "cyber-security",
    category: "SYSTEMS",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "4 Months",
    prerequisites: ["network-engineer"],
    languages: ["Python", "Bash", "JavaScript"],
    tools: ["Nmap", "Metasploit", "Burp Suite", "Wireshark", "Hashcat"],
    frameworks: ["NIST framework", "OWASP rules", "MITRE ATT&CK"],
    databases: ["SQL security setups"],
    testing: ["Vulnerability assessments", "Penetration testing loops"],
    deployment: ["Kali Linux", "Firewall configurations AWS"],
    advancedConcepts: ["Buffer Overflows protection", "Digital Signatures (RSA)", "IAM policies audit", "Log auditing"],
    projects: ["Local Vulnerability Security Scanner script", "Secure Cryptographic Signatures suite"],
    interviewQuestions: [
      "How does a buffer overflow exploit occur and how can developers mitigate it in C/C++?",
      "Explain asymmetric vs symmetric encryption key methods and where they are used."
    ]
  },

  // === DATA & AI ROADMAPS ===
  "data-analyst": {
    id: "roadmap-data-analyst",
    title: "Data Analyst",
    slug: "data-analyst",
    category: "DATA_SCIENCE",
    difficulty: "BEGINNER",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["SQL", "Python", "R"],
    tools: ["Excel", "Tableau", "PowerBI", "Jupyter Notebooks"],
    frameworks: ["Pandas", "NumPy", "Matplotlib/Seaborn"],
    databases: ["PostgreSQL", "BigQuery"],
    testing: ["Unit testing pandas dataframes"],
    deployment: ["Tableau Public dashboards", "GitHub Pages html reports"],
    advancedConcepts: ["Statistical Hypothesis Testing", "Data Normalization layouts", "Data Cleaning anomalies", "A/B Testing analysis"],
    projects: ["Hospital Logs Data Preprocessing pipeline", "Interactive Tableau E-Commerce Dashboard"],
    interviewQuestions: [
      "What is the difference between WHERE and HAVING clause filters in SQL?",
      "How do you handle null variables inside Pandas and what is the difference between fillna and dropna?"
    ]
  },
  "bi-analyst": {
    id: "roadmap-bi-analyst",
    title: "BI Analyst",
    slug: "bi-analyst",
    category: "DATA_SCIENCE",
    difficulty: "INTERMEDIATE",
    estimatedDuration: "3 Months",
    prerequisites: ["data-analyst"],
    languages: ["SQL", "DAX (PowerBI)", "Python"],
    tools: ["PowerBI", "Tableau", "Microsoft SSAS", "Looker Studio"],
    frameworks: ["Star schema layouts", "Snowflake schema modeling"],
    databases: ["SQL Server", "Snowflake Data Warehouse", "BigQuery"],
    testing: ["Data validation checks"],
    deployment: ["Corporate BI servers", "AWS S3 static sheets"],
    advancedConcepts: ["Dimensional Data Modeling", "Fact vs Dimension tables", "Incremental data refreshes", "Dashboard authorization rules"],
    projects: ["E-Commerce Dimensional Star Schema design", "Corporate PowerBI Financial dashboard"],
    interviewQuestions: [
      "Explain the differences between Star and Snowflake database schema layouts.",
      "What are Slowly Changing Dimensions (SCD) and how do you handle them in database tables?"
    ]
  },
  "data-engineer": {
    id: "roadmap-data-engineer",
    title: "Data Engineer",
    slug: "data-engineer",
    category: "DATA_SCIENCE",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["backend-developer"],
    languages: ["Python", "SQL", "Scala", "Java"],
    tools: ["Apache Airflow", "Docker", "Apache Kafka", "DBT (Data Build Tool)"],
    frameworks: ["Apache Spark (PySpark)", "Hadoop MapReduce"],
    databases: ["Snowflake", "Google BigQuery", "Cassandra", "PostgreSQL"],
    testing: ["Great Expectations data tests", "PyTest"],
    deployment: ["AWS (MWAA/EMR)", "Docker Compose multi-node", "Kubernetes"],
    advancedConcepts: ["Extract-Transform-Load (ETL) DAG loops", "Columnar Storage (Parquet)", "Distributed Processing partitions", "Schema Registry"],
    projects: ["Automated Airflow Weather ETL pipeline", "Large-scale Log Parser using Spark"],
    interviewQuestions: [
      "What is the difference between OLTP databases and OLAP warehouses?",
      "Explain the concept of partition pruning in columnar databases like BigQuery."
    ]
  },
  "machine-learning": {
    id: "roadmap-machine-learning",
    title: "Machine Learning",
    slug: "machine-learning",
    category: "DATA_SCIENCE",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["data-analyst"],
    languages: ["Python", "R", "SQL"],
    tools: ["Jupyter Notebooks", "Conda", "Git", "TensorBoard"],
    frameworks: ["Scikit-Learn", "PyTorch", "TensorFlow", "Keras"],
    databases: ["SQLite", "PostgreSQL"],
    testing: ["Cross-Validation models metrics", "Unit tests ML input grids"],
    deployment: ["FastAPI servers", "Hugging Face spaces"],
    advancedConcepts: ["Feature Engineering scaling", "Gradient Descent optimizations", "Overfitting regularization (L1/L2)", "Ensemble Learning (XGBoost)"],
    projects: ["House Prices Estimator Pipeline", "Spam Mail Filter Classifier"],
    interviewQuestions: [
      "Explain the bias-variance tradeoff in machine learning algorithms.",
      "What is the difference between L1 (Lasso) and L2 (Ridge) regularization and how do they reduce overfitting?"
    ]
  },
  "ai-engineer": {
    id: "roadmap-ai-engineer",
    title: "AI Engineer",
    slug: "ai-engineer",
    category: "DATA_SCIENCE",
    difficulty: "ADVANCED",
    estimatedDuration: "4 Months",
    prerequisites: ["backend-developer", "machine-learning"],
    languages: ["Python", "TypeScript", "SQL"],
    tools: ["Pinecone Vector DB", "ChromaDB", "LangChain", "OpenAI/Gemini SDKs"],
    frameworks: ["FastAPI", "Next.js App Router", "LlamaIndex"],
    databases: ["Pinecone", "Milvus", "PostgreSQL (pgvector)"],
    testing: ["Prompt evaluations frameworks", "LLM validation tests"],
    deployment: ["Vercel", "Render", "Docker Compose"],
    advancedConcepts: ["Retrieval-Augmented Generation (RAG)", "Vector Embeddings Cosine similarity", "Prompt Engineering few-shot", "Agents & Tools loops"],
    projects: ["CLI Chatbot using Gemini SDK", "RAG 'Chat with PDF' web application"],
    interviewQuestions: [
      "Explain the steps of a typical RAG pipeline and how vector databases speed up semantic lookups.",
      "How do you enforce structured JSON output types on OpenAI/Gemini models?"
    ]
  },
  "ai-data-scientist": {
    id: "roadmap-ai-data-scientist",
    title: "AI & Data Scientist",
    slug: "ai-data-scientist",
    category: "DATA_SCIENCE",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["machine-learning"],
    languages: ["Python", "R", "C++", "SQL"],
    tools: ["PyTorch", "Keras", "Jupyter", "TensorBoard"],
    frameworks: ["Scikit-Learn", "NLTK", "OpenCV"],
    databases: ["PostgreSQL", "NoSQL stores"],
    testing: ["Model testing frameworks", "Cross validations"],
    deployment: ["FastAPI model serving", "AWS Sagemaker"],
    advancedConcepts: ["Backpropagation neural matrices", "Activation functions (ReLU, Sigmoid)", "Computer Vision (CNNs)", "Natural Language Processing (NLP)"],
    projects: ["Image Recognition Handwritten Classifier", "Stock Pricing Forecasting algorithm"],
    interviewQuestions: [
      "Explain how backpropagation computes gradients across hidden layers.",
      "What is the difference between CNNs and RNNs and when is each used?"
    ]
  },
  "mlops": {
    id: "roadmap-mlops",
    title: "MLOps Engineer",
    slug: "mlops",
    category: "DATA_SCIENCE",
    difficulty: "ADVANCED",
    estimatedDuration: "5 Months",
    prerequisites: ["devops-engineer", "machine-learning"],
    languages: ["Python", "Bash", "YAML"],
    tools: ["MLflow", "DVC (Data Version Control)", "Kubeflow", "Prometheus", "Docker"],
    frameworks: ["Prefect", "BentoML", "FastAPI"],
    databases: ["Feature Stores (Feast)", "PostgreSQL"],
    testing: ["Model drift checks", "Unit test pipeline structures"],
    deployment: ["Kubernetes model serving clusters", "Triton Server", "AWS Sagemaker"],
    advancedConcepts: ["Model Drift monitoring", "Feature Stores indexing", "Reproducible pipelines layouts", "Continuous Training (CT) triggers"],
    projects: ["Automated DVC ML Pipeline model", "MLflow Server Tracking dashboard project"],
    interviewQuestions: [
      "What is model drift and how do you monitor it in production servers?",
      "How does DVC manage large dataset models versions without committing binary data directly in Git?"
    ]
  },

  // === PREPARATION ROADMAPS ===
  "dsa": {
    id: "roadmap-dsa",
    title: "Data Structures & Algorithms",
    slug: "dsa",
    category: "PREPARATION",
    difficulty: "BEGINNER",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["C++", "Java", "Python", "JavaScript/TypeScript"],
    tools: ["LeetCode IDE", "Visualgo.net", "GDB debugger", "Visual Studio Code"],
    frameworks: ["Big O complexity boundaries", "Memory Layouts"],
    databases: ["None"],
    testing: ["Unit testing testcases tables"],
    deployment: ["GitHub repository code solutions"],
    advancedConcepts: ["Dynamic Programming (DP)", "Graph traversals BFS/DFS", "Greedy algorithms selection", "Heaps sorting bounds"],
    projects: ["Custom Singly Linked List classes", "Sorting Algorithms visualizer page"],
    interviewQuestions: [
      "Why are array index lookups O(1) time complexity while linked lists search is O(N)?",
      "What are the prerequisites and runtime complexity of Binary Search?"
    ]
  },
  "ux-designer": {
    id: "roadmap-ux-designer",
    title: "UX Designer",
    slug: "ux-designer",
    category: "PREPARATION",
    difficulty: "BEGINNER",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["HTML5 basics", "CSS3 basics"],
    tools: ["Figma", "Adobe XD", "Miro", "LottieFiles", "Hotjar"],
    frameworks: ["Design System templates", "Material Design", "Tailwind UI layouts"],
    databases: ["None"],
    testing: ["A/B Testing tools", "Usability testing checks"],
    deployment: ["Figma Prototype shares", "Behance portfolio pages"],
    advancedConcepts: ["Information Architecture blueprints", "Conversion funnel optimization", "Color Psychology models", "Accessibility WCAG standards"],
    projects: ["Responsive E-Commerce Figma prototype", "SaaS Dashboard User Journey layout"],
    interviewQuestions: [
      "Explain the difference between user interface (UI) and user experience (UX) design.",
      "How do you design a layout grid complying with WCAG contrast and scale access standards?"
    ]
  },
  "product-manager": {
    id: "roadmap-product-manager",
    title: "Product Manager",
    slug: "product-manager",
    category: "PREPARATION",
    difficulty: "BEGINNER",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["SQL (Analytics queries)", "Markdown"],
    tools: ["Jira", "Confluence", "Amplitude", "Mixpanel", "ProductPlan"],
    frameworks: ["Agile/Scrum", "PRD (Product Requirements Document) layouts", "OKR frameworks"],
    databases: ["PostgreSQL (for dashboards)"],
    testing: ["User Acceptance Testing (UAT) checks"],
    deployment: ["Product Roadmap publications", "Analytics dashboard setups"],
    advancedConcepts: ["Product Lifecycle schedules", "Feature prioritization frameworks (RICE)", "User retention cohorts", "A/B testing criteria"],
    projects: ["Product Requirements Document (PRD) for SaaS features", "Comprehensive OKR & product roadmap deck"],
    interviewQuestions: [
      "How do you prioritize a product backlog containing competing engineering requests and user demands?",
      "What is the RICE scoring model and how do you calculate feature priority scores?"
    ]
  },
  "engineering-manager": {
    id: "roadmap-engineering-manager",
    title: "Engineering Manager",
    slug: "engineering-manager",
    category: "PREPARATION",
    difficulty: "ADVANCED",
    estimatedDuration: "6 Months",
    prerequisites: ["software-architect"],
    languages: ["Markdown", "YAML"],
    tools: ["Jira Portfolio", "Slack", "Zoom", "Confluence", "Excel"],
    frameworks: ["Agile/Kanban", "1-on-1 outline frameworks", "Team capacity charts"],
    databases: ["None"],
    testing: ["System load verification audits"],
    deployment: ["Delivery timelines schedules", "Production release logs"],
    advancedConcepts: ["Conflict Resolution matrices", "Engineering capacity mappings", "Technical Debt budgets", "Career growth paths planning"],
    projects: ["Engineering sprint velocity planner", "Technical Debt remediation outline proposal"],
    interviewQuestions: [
      "How do you manage a high-performing engineer who is struggling with team collaboration?",
      "Explain your strategy for balancing the delivery of new features with refactoring legacy technical debt."
    ]
  },
  "technical-writer": {
    id: "roadmap-technical-writer",
    title: "Technical Writer",
    slug: "technical-writer",
    category: "PREPARATION",
    difficulty: "BEGINNER",
    estimatedDuration: "3 Months",
    prerequisites: [],
    languages: ["Markdown", "HTML", "JSON/YAML"],
    tools: ["Docusaurus", "GitBook", "GitHub", "Swagger/OpenAPI", "Google Style Guide"],
    frameworks: ["Docs-as-Code setups", "Tailwind Prose CSS"],
    databases: ["None"],
    testing: ["Markdown links linter scans", "Grammar checker pipelines"],
    deployment: ["Vercel documentation pages", "GitHub Pages static docs"],
    advancedConcepts: ["OpenAPI API specs layout", "Docs-as-code automation pipelines", "Audience analysis grids", "Style guide compliance rules"],
    projects: ["Interactive OpenAPI documentation portal project", "Technical Markdown User Guide documentation"],
    interviewQuestions: [
      "What is the Docs-as-Code philosophy and what tools are used to implement it?",
      "How do you translate a highly complex system architecture feature into an accessible user guide?"
    ]
  }
};

/**
 * Generator helper that maps the RoadmapMetaData template into the final RoadmapData
 * containing the 12 requested career checkpoints for each of the 29 roadmaps.
 */
function generateRoadmapFromMeta(meta: RoadmapMetaData): RoadmapData {
  const nodes: RoadmapNodeData[] = [
    {
      id: `${meta.id}-node-1`,
      slug: "internet-fundamentals",
      title: "1. Internet Fundamentals",
      description: "Learn how the internet operates, DNS servers resolution, HTTP request-response headers cycles, and web server browsers mechanics.",
      difficulty: "BEGINNER",
      estimatedTime: "8 hours",
      prerequisites: [],
      parentNodeId: null,
      order: 1,
      resources: [
        { id: `res-${meta.slug}-internet-1`, title: "How the Internet Works (MDN Docs)", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work" },
        { id: `res-${meta.slug}-internet-2`, title: "HTTP Request Cycle Tutorial", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=7_LPdttKXPc" }
      ],
      projectIdeas: ["Deploy a basic index.html static site explaining the TCP/IP stack mapping using GitHub Pages."],
      interviewQuestions: [
        "What is the function of a DNS server and how does it map domains to IP addresses?",
        "Explain the differences between HTTP GET and POST requests."
      ]
    },
    {
      id: `${meta.id}-node-2`,
      slug: "computer-fundamentals",
      title: "2. Computer Fundamentals",
      description: "Master operating systems processes scheduling, memory stack and heap segments layouts, thread concurrency locks, and basic networks structures.",
      difficulty: "BEGINNER",
      estimatedTime: "12 hours",
      prerequisites: ["internet-fundamentals"],
      parentNodeId: null,
      order: 2,
      resources: [
        { id: `res-${meta.slug}-cs-1`, title: "Operating Systems Internals Guide", type: "WEBSITE", url: "https://tldp.org" },
        { id: `res-${meta.slug}-cs-2`, title: "Memory Stack vs Heap Allocation Tutorial", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=_8-ht2AKyT4" }
      ],
      projectIdeas: ["Write a memory allocation test program tracing stack and heap boundaries variables."],
      interviewQuestions: [
        "Explain stack vs heap memory layouts and how garbage collectors allocate spaces.",
        "What is an operating system deadlock condition and how do you prevent it?"
      ]
    },
    {
      id: `${meta.id}-node-3`,
      slug: "tools",
      title: `3. Standard Tools: ${meta.tools[0]} & More`,
      description: `Master version control with Git & GitHub and construct development environments using ${meta.tools.join(", ")}.`,
      difficulty: "BEGINNER",
      estimatedTime: "10 hours",
      prerequisites: ["computer-fundamentals"],
      parentNodeId: null,
      order: 3,
      resources: [
        { id: `res-${meta.slug}-tools-1`, title: "Git Handbook Guidelines", type: "DOCUMENTATION", url: "https://guides.github.com/introduction/git-handbook/" }
      ],
      projectIdeas: ["Configure a GitHub repository with branches, push changes, and resolve a mock git merge conflict."],
      interviewQuestions: [
        "What is the difference between git merge and git rebase?",
        "Explain git stash command usage."
      ]
    },
    {
      id: `${meta.id}-node-4`,
      slug: "languages",
      title: `4. Target Languages: ${meta.languages.join(" / ")}`,
      description: `Master variables types, asynchronous functions logic, control structures, and concurrency patterns in ${meta.languages.join(", ")}.`,
      difficulty: "BEGINNER",
      estimatedTime: "30 hours",
      prerequisites: ["tools"],
      parentNodeId: null,
      order: 4,
      resources: [
        { id: `res-${meta.slug}-lang-1`, title: `${meta.languages[0]} Official Guides`, type: "DOCUMENTATION", url: "https://developer.mozilla.org" }
      ],
      projectIdeas: [`Build a terminal console validator app using ${meta.languages[0]} handling variable arrays.`],
      interviewQuestions: [
        `What are the reference types vs value types in ${meta.languages[0]}?`,
        `How does asynchronous logic work in ${meta.languages[0]}?`
      ]
    },
    {
      id: `${meta.id}-node-5`,
      slug: "frameworks",
      title: `5. Core Frameworks: ${meta.frameworks.join(" & ")}`,
      description: `Build layouts, API endpoints routers, state managers, and view contexts using ${meta.frameworks.join(", ")}.`,
      difficulty: "INTERMEDIATE",
      estimatedTime: "40 hours",
      prerequisites: ["languages"],
      parentNodeId: null,
      order: 5,
      resources: [
        { id: `res-${meta.slug}-fw-1`, title: `${meta.frameworks[0]} Reference Docs`, type: "DOCUMENTATION", url: "https://react.dev" }
      ],
      projectIdeas: [`Develop an interactive dashboard UI layout mapping components using ${meta.frameworks[0]}.`],
      interviewQuestions: [
        `When does a ${meta.frameworks[0]} component lifecycle trigger a re-render?`,
        `Explain how dependency injection or state management is handled in ${meta.frameworks[0]}.`
      ]
    },
    {
      id: `${meta.id}-node-6`,
      slug: "databases",
      title: `6. Database Systems: ${meta.databases.join(" / ")}`,
      description: `Configure schemas, database relationships, indexes constraints, query optimizations, and caching setups using ${meta.databases.join(", ")}.`,
      difficulty: "INTERMEDIATE",
      estimatedTime: "25 hours",
      prerequisites: ["frameworks"],
      parentNodeId: null,
      order: 6,
      resources: [
        { id: `res-${meta.slug}-db-1`, title: "Database Query Tuning and Indexes", type: "WEBSITE", url: "https://www.postgresqltutorial.com/" }
      ],
      projectIdeas: [`Create database tables mapping models schema using ${meta.databases[0]}.`],
      interviewQuestions: [
        "What is database indexing and how does it speed up queries?",
        "Explain transaction ACID guarantees under concurrent loads."
      ]
    },
    {
      id: `${meta.id}-node-7`,
      slug: "testing",
      title: `7. Quality & Testing: ${meta.testing.join(" / ")}`,
      description: `Write automated tests suites including Unit tests, Integration checks, and End-to-End assertions using ${meta.testing.join(", ")}.`,
      difficulty: "INTERMEDIATE",
      estimatedTime: "15 hours",
      prerequisites: ["frameworks"],
      parentNodeId: null,
      order: 7,
      resources: [
        { id: `res-${meta.slug}-test-1`, title: "Software testing methodologies", type: "DOCUMENTATION", url: "https://jestjs.io" }
      ],
      projectIdeas: ["Write unit tests files mapping components logic asserting edge input values."],
      interviewQuestions: [
        "Explain the differences between unit, integration, and E2E testing.",
        "What is test mocking and why is it used for database layers?"
      ]
    },
    {
      id: `${meta.id}-node-8`,
      slug: "deployment",
      title: `8. Production Deployment: ${meta.deployment.join(" / ")}`,
      description: `Package deployment builds, containerize codebases, map variables, and host services on ${meta.deployment.join(", ")}.`,
      difficulty: "INTERMEDIATE",
      estimatedTime: "15 hours",
      prerequisites: ["databases"],
      parentNodeId: null,
      order: 8,
      resources: [
        { id: `res-${meta.slug}-deploy-1`, title: "Production hosting deployment guidelines", type: "DOCUMENTATION", url: "https://docs.docker.com" }
      ],
      projectIdeas: ["Build production build folders, package configurations, and host online."],
      interviewQuestions: [
        "How do you manage environment configuration secrets inside production hosts?",
        "What is a Docker container image build layers?"
      ]
    },
    {
      id: `${meta.id}-node-9`,
      slug: "advanced-concepts",
      title: "9. Advanced Concepts",
      description: `Master scaling paradigms, specialized integrations, security mitigations, and optimizations: ${meta.advancedConcepts.join(", ")}.`,
      difficulty: "ADVANCED",
      estimatedTime: "35 hours",
      prerequisites: ["deployment"],
      parentNodeId: null,
      order: 9,
      resources: [
        { id: `res-${meta.slug}-adv-1`, title: "Advanced systems engineering layouts", type: "DOCUMENTATION", url: "https://github.com/donnemartin/system-design-primer" }
      ],
      projectIdeas: ["Build a scalable micro-architecture or complex optimization script."],
      interviewQuestions: [
        `Explain how you would implement ${meta.advancedConcepts[0]} to solve scalability bottlenecks.`,
        `What security vulnerabilities does ${meta.advancedConcepts[meta.advancedConcepts.length - 1]} protect against?`
      ]
    },
    {
      id: `${meta.id}-node-10`,
      slug: "interview-prep",
      title: "10. Technical Interview Preparation",
      description: "Drill algorithmic problem patterns, low-level design structures, system designs diagrams, and practice mock loops.",
      difficulty: "ADVANCED",
      estimatedTime: "25 hours",
      prerequisites: ["advanced-concepts"],
      parentNodeId: null,
      order: 10,
      resources: [
        { id: `res-${meta.slug}-int-1`, title: "NeetCode DSA Roadmap Practice", type: "WEBSITE", url: "https://neetcode.io" }
      ],
      projectIdeas: ["Solve 50+ role-related challenges on practice platforms and log time tracking curves."],
      interviewQuestions: meta.interviewQuestions
    },
    {
      id: `${meta.id}-node-11`,
      slug: "resume-projects",
      title: "11. High Impact Portfolio Projects",
      description: `Fulfill engineering requirements for target projects: ${meta.projects.join(" or ")}. Set up deployment links and repository READMEs.`,
      difficulty: "ADVANCED",
      estimatedTime: "40 hours",
      prerequisites: ["interview-prep"],
      parentNodeId: null,
      order: 11,
      resources: [
        { id: `res-${meta.slug}-proj-1`, title: "GitHub Readme templates design guidelines", type: "WEBSITE", url: "https://github.com" }
      ],
      projectIdeas: meta.projects.map((p, idx) => `Build complete deployable version of ${p} with documentation.`),
      interviewQuestions: [
        `Explain the core architecture bottlenecks of your ${meta.projects[0]} project.`,
        "How does your database sharding or state caching optimize loading speeds?"
      ]
    },
    {
      id: `${meta.id}-node-12`,
      slug: "job-readiness",
      title: "12. Career Job Readiness",
      description: "Verify resume match ratings, compile interview logs, execute speed mocks, configure networking references, and apply.",
      difficulty: "ADVANCED",
      estimatedTime: "15 hours",
      prerequisites: ["resume-projects"],
      parentNodeId: null,
      order: 12,
      resources: [
        { id: `res-${meta.slug}-jr-1`, title: "StackMap Resume Readiness Analyzer Tool", type: "WEBSITE", url: "/resume/readiness" }
      ],
      projectIdeas: ["Analyze your resume using StackMap's JD readiness scanner, scoring 85%+ Match rating."],
      interviewQuestions: [
        "Describe a complex technical challenge you solved and how you structured the engineering decisions.",
        "How do you manage deadlines tradeoffs when multiple team milestones conflict?"
      ]
    }
  ];

  // Helper arrays mapping learningObjectives and subtopics for compliance
  const enrichedNodes = nodes.map(node => ({
    ...node,
    learningObjectives: [
      `Master key capabilities of the ${node.slug} milestone.`,
      `Understand operational edge-cases and debugging logs.`,
      `Implement practical mock tasks utilizing official documentation.`
    ],
    subtopics: [
      `${node.title} Core Theories`,
      "Practical Configurations",
      "Production Best Practices",
      "Debugging & Testing Rules"
    ],
    // Map projects list as string array for new schema compliance
    projects: node.projectIdeas
  }));

  return {
    id: meta.id,
    title: meta.title,
    slug: meta.slug,
    description: `Master ${meta.title} skills, standard tools, framework engineering, database design, and advanced deployment pipelines.`,
    category: meta.category,
    difficulty: meta.difficulty,
    estimatedTime: meta.estimatedDuration,
    estimatedDuration: meta.estimatedDuration,
    prerequisites: meta.prerequisites,
    nodes: enrichedNodes,
    roadmapNodes: enrichedNodes
  };
}

// Map the list into final career roadmaps database
export const roadmaps: Record<string, RoadmapData> = {};

Object.keys(roadmapsMeta).forEach(key => {
  roadmaps[key] = generateRoadmapFromMeta(roadmapsMeta[key]);
});
