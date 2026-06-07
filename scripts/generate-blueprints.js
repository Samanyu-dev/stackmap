const fs = require("fs");
const path = require("path");
const userMilestones = require("./user_milestones.json");

const blueprintsDir = path.join(__dirname, "../src/data/blueprints");

if (!fs.existsSync(blueprintsDir)) {
  fs.mkdirSync(blueprintsDir, { recursive: true });
}

// 29 roadmaps metadata definitions
const roadmapsMeta = {
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
      "How do you define the differences between asymmetric and symmetric encryption?",
      "What are the best methods to audit insecure container operations configs?"
    ]
  },
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
  "ux-design": {
    id: "roadmap-ux-designer",
    title: "UX Designer",
    slug: "ux-design",
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


function generateRoadmapFromMeta(meta) {
  let nodes = [];

  if (userMilestones[meta.slug]) {
    // Deep clone the user milestones
    let milestones = JSON.parse(JSON.stringify(userMilestones[meta.slug]));
    
    // Ensure all roadmaps have 15-25 nodes! Expand if fewer than 15 nodes
    if (milestones.length < 15) {
      const extras = [
        { title: "Advanced Performance & Optimization", subtopics: ["Resource bundlers splitting", "Asset caching", "Performance profiling benchmarks", "Latency tracing metrics"] },
        { title: "System Monitoring & Observability", subtopics: ["Sentry tracking integrations", "APM dashboard metrics", "Grafana visualizations", "Logstash aggregations"] },
        { title: "AI Integration & Machine Learning Basics", subtopics: ["LLM API integration patterns", "Gemini/OpenAI SDK configurations", "Structured JSON model schemas", "Vector databases & RAG"] },
        { title: "Security Auditing & Threat Protection", subtopics: ["OWASP threat protections", "SAST/DAST container scans", "Encryption protocols (SSL/TLS)", "Secrets vaulting policies"] },
        { title: "Placement Readiness & Technical Mock Interviews", subtopics: ["Technical mock loops", "System Design blueprints", "Behavioral frameworks (STAR method)", "Salary negotiations logs"] }
      ];
      
      while (milestones.length < 15 && extras.length > 0) {
        const ext = extras.shift();
        const newOrder = milestones.length + 1;
        milestones.push({
          order: newOrder,
          title: `${newOrder}. ${ext.title}`,
          subtopics: ext.subtopics
        });
      }
    }

    const totalMilestones = milestones.length;
    let totalHours = 120;
    const durMatch = meta.estimatedDuration.match(/(\d+)\s+Month/i);
    if (durMatch) {
      const months = parseInt(durMatch[1]);
      totalHours = months * 4 * 10;
    }
    const hoursPerMilestone = Math.max(8, Math.ceil(totalHours / totalMilestones));

    nodes = milestones.map((m) => {
      const order = m.order;
      const title = m.title;
      const subtopics = m.subtopics || [
        `${title} Fundamentals`,
        "Practical Configurations",
        "Production Best Practices",
        "Debugging & Testing Rules"
      ];
      
      const nodeSlug = title.toLowerCase()
        .replace(/^\d+\.\s+/, "")
        .replace(/[^a-z0-9\s\-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
        
      let difficulty = "BEGINNER";
      if (order > totalMilestones * 0.66) {
        difficulty = "ADVANCED";
      } else if (order > totalMilestones * 0.33) {
        difficulty = "INTERMEDIATE";
      }
      
      const description = `Master core capabilities of ${title.replace(/^\d+\.\s+/, "")}: ${subtopics.slice(0, 5).join(", ")}.`;
      
      const prerequisites = [];
      if (order > 1) {
        const prevMilestone = milestones[order - 2];
        const prevSlug = prevMilestone.title.toLowerCase()
          .replace(/^\d+\.\s+/, "")
          .replace(/[^a-z0-9\s\-]/g, "")
          .trim()
          .replace(/\s+/g, "-");
        prerequisites.push(prevSlug);
      }
      
      const resources = [];
      if (subtopics.length > 0) {
        resources.push({
          id: `res-${meta.slug}-${order}-1`,
          title: `${subtopics[0]} Reference (MDN / Official)`,
          type: "DOCUMENTATION",
          url: subtopics[0].toLowerCase().includes("git") 
            ? "https://git-scm.com/doc" 
            : subtopics[0].toLowerCase().includes("react")
            ? "https://react.dev"
            : subtopics[0].toLowerCase().includes("next")
            ? "https://nextjs.org/docs"
            : subtopics[0].toLowerCase().includes("docker")
            ? "https://docs.docker.com"
            : subtopics[0].toLowerCase().includes("kubernetes")
            ? "https://kubernetes.io/docs/"
            : `https://www.google.com/search?q=${encodeURIComponent(subtopics[0] + " documentation")}`
        });
      }
      if (subtopics.length > 1) {
        resources.push({
          id: `res-${meta.slug}-${order}-2`,
          title: `${subtopics[1]} Crash Course`,
          type: "YOUTUBE",
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent(subtopics[1] + " tutorial")}`
        });
      }
      if (subtopics.length > 2) {
        resources.push({
          id: `res-${meta.slug}-${order}-3`,
          title: `Practice ${subtopics[2]} Exercises`,
          type: "WEBSITE",
          url: (subtopics[2].toLowerCase().includes("dsa") || subtopics[2].toLowerCase().includes("sql"))
            ? "https://leetcode.com"
            : `https://www.google.com/search?q=${encodeURIComponent(subtopics[2] + " exercises")}`
        });
      }
      
      const projectIdeas = [];
      if (order === totalMilestones - 1 && meta.projects && meta.projects.length > 0) {
        projectIdeas.push(`Build a complete implementation of: ${meta.projects[0]}`);
      } else if (order === totalMilestones && meta.projects && meta.projects.length > 1) {
        projectIdeas.push(`Build a complete implementation of: ${meta.projects[1]}`);
      } else {
        projectIdeas.push(`Build a prototype integrating ${subtopics.slice(0, Math.min(3, subtopics.length)).join(", ")}.`);
      }
      
      const interviewQuestions = [];
      if (meta.interviewQuestions && meta.interviewQuestions.length > 0) {
        const questionIdx = (order - 1) % meta.interviewQuestions.length;
        interviewQuestions.push(meta.interviewQuestions[questionIdx]);
      }
      if (subtopics.length > 0) {
        interviewQuestions.push(`What is ${subtopics[0]} and how does it optimize development/production lifecycle performance?`);
      }
      if (subtopics.length > 1) {
        interviewQuestions.push(`Explain the core operational principles and architectural tradeoffs of ${subtopics[1]}.`);
      }

      return {
        id: `${meta.id}-node-${order}`,
        slug: nodeSlug,
        title: title,
        description: description,
        difficulty: difficulty,
        estimatedTime: `${hoursPerMilestone} hours`,
        prerequisites: prerequisites,
        parentNodeId: null,
        order: order,
        resources: resources,
        projectIdeas: projectIdeas,
        interviewQuestions: interviewQuestions
      };
    });
  } else {
    // Dynamic generator for the remaining 13 roles! Expanded to 18 nodes!
    const milestones = [
      { order: 1, slug: "fundamentals", title: `1. Core ${meta.title} Fundamentals`, desc: `Understand the foundational principles of ${meta.title}, primary operational architectures, and basic lifecycle concepts.` },
      { order: 2, slug: "cs-fundamentals", title: "2. Computer Science & Systems Theory", desc: "Master operating systems process cycles, memory segment layers, and data structure constraints relevant to engineering." },
      { order: 3, slug: "tools", title: `3. Standard Tools: ${meta.tools[0] || 'VCS'} & CLI Environment`, desc: `Configure version control using Git & GitHub, and prepare local workspace instances using: ${meta.tools.slice(0, 3).join(", ") || 'Git'}.` },
      { order: 4, slug: "languages", title: `4. Programming Languages: ${meta.languages.join(" / ")}`, desc: `Write typesafe, concurrent, and asynchronous code scripts using the target programming languages: ${meta.languages.join(", ")}.` },
      { order: 5, slug: "syntax-adv", title: "5. Advanced Syntax: Concurrency & Threads", desc: "Master asynchronous code execution blocks, thread management, typesafety models, and error handling grids." },
      { order: 6, slug: "frameworks", title: `6. Core Frameworks: ${meta.frameworks.slice(0, 2).join(" & ") || 'Core Interfaces'}`, desc: `Build routing layouts, custom controller components, and unified data flow structures using: ${meta.frameworks.join(", ")}.` },
      { order: 7, slug: "databases", title: `7. Database Systems: ${meta.databases.slice(0, 2).join(" & ") || 'Local Storage'}`, desc: `Configure structured schemas, queries indexing, transactional logs mapping, and storage layouts using: ${meta.databases.join(", ")}.` },
      { order: 8, slug: "db-queries-adv", title: "8. Advanced Queries & Index Optimization", desc: "Write complex query joins, configure database replication clusters, read execution plans, and set up caching." },
      { order: 9, slug: "apis-routing-core", title: "9. API Engineering & Inter-service Communication", desc: "Build RESTful routes, map JSON inputs, validate request payloads, and handle gRPC/WebSocket streaming protocols." },
      { order: 10, slug: "testing", title: `10. Testing & Code Quality: ${meta.testing[0] || 'Core Quality Rules'}`, desc: `Write automated validation logic, integration checking routes, and unit assertion conditions using: ${meta.testing.join(", ")}.` },
      { order: 11, slug: "security-patterns", title: "11. OWASP Threat Protections & Security Patterns", desc: "Configure HTTPS protocols, sanitise input parameters, prevent SQL inject arrays, and design role-based policies." },
      { order: 12, slug: "isolation-docker", title: "12. Containerization & Isolation using Docker", desc: "Write functional Dockerfiles, configure multi-container compositions, and handle container networks." },
      { order: 13, slug: "deployment", title: `13. Deployment & Hosting: ${meta.deployment.slice(0, 2).join(" / ") || 'Static Hosting'}`, desc: `Package deployment bundles, map environment secret variables, and provision host execution instances on: ${meta.deployment.join(", ")}.` },
      { order: 14, slug: "advanced-concepts", title: "14. Advanced Architectural Paradigms", desc: `Master high-concurrency systems scaling, security mitigations, and performance tuning: ${meta.advancedConcepts.join(", ")}.` },
      { order: 15, slug: "performance-profiling", title: "15. System Performance & Latency Benchmarks", desc: "Profile execution bottlenecks, evaluate memory leaks, configure caching layers, and optimize bundle sizes." },
      { order: 16, slug: "automation-cicd", title: "16. Automated Pipelines (CI/CD) & Automation", desc: "Implement automatic checking workflows, build testing hooks, and automate release distribution paths." },
      { order: 17, slug: "resume-projects", title: "17. High Impact Portfolio Projects", desc: `Design, deploy, and document production-ready projects in your portfolio: ${meta.projects.join(" or ")}.` },
      { order: 18, slug: "job-readiness", title: "18. Job Readiness & Placement Scan", desc: "Conduct mock technical interviews, customize resume formatting metrics, optimize LinkedIn/GitHub profiles, and begin career applications." }
    ];

    nodes = milestones.map((m) => {
      const order = m.order;
      const title = m.title;
      const subtopics = [
        `${title} Core Theories`,
        "Practical Configurations",
        "Production Best Practices",
        "Debugging & Testing Rules"
      ];
      
      let difficulty = "BEGINNER";
      if (order > 12) difficulty = "ADVANCED";
      else if (order > 6) difficulty = "INTERMEDIATE";
      
      const prerequisites = [];
      if (order > 1) {
        prerequisites.push(milestones[order - 2].slug);
      }
      
      const resources = [
        {
          id: `res-${meta.slug}-${order}-1`,
          title: `${m.title} Guide (MDN / Official Docs)`,
          type: "DOCUMENTATION",
          url: "https://developer.mozilla.org"
        }
      ];
      
      const projectIdeas = [];
      if (order === 17 && meta.projects && meta.projects.length > 0) {
        projectIdeas.push(`Build a complete implementation of: ${meta.projects[0]}`);
      } else if (order === 18) {
        projectIdeas.push("Scan your resume against target JDs using StackMap's scanner and optimize matching parameters to reach 85%+.");
      } else {
        projectIdeas.push(`Build a prototype demonstrating ${m.slug} core concepts.`);
      }
      
      const interviewQuestions = [];
      if (meta.interviewQuestions && meta.interviewQuestions.length > 0) {
        const questionIdx = (order - 1) % meta.interviewQuestions.length;
        interviewQuestions.push(meta.interviewQuestions[questionIdx]);
      } else {
        interviewQuestions.push(`Explain the core principles and tradeoffs associated with ${m.slug}.`);
      }
      
      return {
        id: `${meta.id}-node-${order}`,
        slug: m.slug,
        title: title,
        description: m.desc,
        difficulty: difficulty,
        estimatedTime: "15 hours",
        prerequisites: prerequisites,
        parentNodeId: null,
        order: order,
        resources: resources,
        projectIdeas: projectIdeas,
        interviewQuestions: interviewQuestions
      };
    });
  }

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

console.log("Writing blueprint JSON files...");
Object.keys(roadmapsMeta).forEach((key) => {
  const roadmapData = generateRoadmapFromMeta(roadmapsMeta[key]);
  const filename = `${key}.json`;
  const filepath = path.join(blueprintsDir, filename);
  fs.writeFileSync(filepath, JSON.stringify(roadmapData, null, 2));
  console.log(`- Created ${filename}`);
});

// Also write DSA JSON blueprint manually using same template
const dsaMeta = {
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
};

const dsaData = generateRoadmapFromMeta(dsaMeta);
fs.writeFileSync(path.join(blueprintsDir, "dsa.json"), JSON.stringify(dsaData, null, 2));
console.log("- Created dsa.json");

console.log("All 29 blueprints generated successfully!");
