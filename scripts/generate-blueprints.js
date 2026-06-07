const fs = require("fs");
const path = require("path");

const blueprintsDir = path.join(__dirname, "../src/data/blueprints");

if (!fs.existsSync(blueprintsDir)) {
  fs.mkdirSync(blueprintsDir, { recursive: true });
}

const roadmaps = {
  "frontend-developer": {
    id: "roadmap-frontend",
    slug: "frontend-developer",
    title: "Frontend Developer",
    description: "Learn how to build beautiful, responsive, and high-performance user interfaces. This path takes you from basic internet concepts to modern framework engineering.",
    difficulty: "BEGINNER",
    estimatedTime: "3-4 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "fe-node-1",
        slug: "internet-basics",
        title: "Internet Basics",
        description: "Understand how the web works, hosting, DNS, HTTP/HTTPS, and browsers.",
        difficulty: "BEGINNER",
        estimatedTime: "2 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-fe-1", title: "How the Internet Works (MDN)", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work" },
          { id: "res-fe-2", title: "How the Internet Works in 5 Minutes", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=7_LPdttKXPc" }
        ],
        projectIdeas: ["Deploy a simple static text page using GitHub Pages and map it to a custom sub-domain."],
        interviewQuestions: ["What happens when you type a URL in your browser and hit Enter?", "Explain the difference between HTTP and HTTPS."]
      },
      {
        id: "fe-node-2",
        slug: "html-basics",
        title: "Semantic HTML",
        description: "Learn structuring web documents using correct semantic tags for SEO and accessibility.",
        difficulty: "BEGINNER",
        estimatedTime: "4 hours",
        prerequisites: ["internet-basics"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-fe-3", title: "HTML Basics (MDN)", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
          { id: "res-fe-4", title: "HTML Full Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=UB1O30zR-EE" }
        ],
        projectIdeas: ["Create a semantic markup mockup of a blog article with side panels, navigation links, and article bodies."],
        interviewQuestions: ["Why should you use semantic tags like <main>, <article>, <section> instead of just <div>?", "What is the purpose of the alt attribute on images?"]
      },
      {
        id: "fe-node-3",
        slug: "css-basics",
        title: "CSS Styles & Responsive Layouts",
        description: "Master Flexbox, Grid layouts, custom variables, responsive media queries, and design patterns.",
        difficulty: "BEGINNER",
        estimatedTime: "10 hours",
        prerequisites: ["html-basics"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-fe-5", title: "CSS Layout (MDN)", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout" },
          { id: "res-fe-6", title: "CSS Flexbox & Grid Guide", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=rg7Fvvl3taU" }
        ],
        projectIdeas: ["Build a fully responsive pricing page card grid matching mobile, tablet, and desktop screens."],
        interviewQuestions: ["Explain the difference between flexbox and CSS Grid and when to use each.", "What is the CSS Box Model?"]
      },
      {
        id: "fe-node-4",
        slug: "javascript-dom",
        title: "JavaScript & DOM Manipulation",
        description: "Learn async programming, promises, array methods, API integration, and standard browser DOM APIs.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: ["css-basics"],
        parentNodeId: null,
        order: 4,
        resources: [
          { id: "res-fe-7", title: "Modern JavaScript Tutorial", type: "WEBSITE", url: "https://javascript.info" },
          { id: "res-fe-8", title: "Promises & Async/Await", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=V_Kr9OSfDeU" }
        ],
        projectIdeas: ["Build a dynamic Todo List with LocalStorage cache and drag-and-drop ordering."],
        interviewQuestions: ["What is event delegation in JavaScript?", "What is the difference between let, const, and var?"]
      },
      {
        id: "fe-node-5",
        slug: "git-version",
        title: "Git & Version Control",
        description: "Learn how to manage version history, commit branches, merge changes, and collaborate using GitHub.",
        difficulty: "BEGINNER",
        estimatedTime: "3 hours",
        prerequisites: ["javascript-dom"],
        parentNodeId: null,
        order: 5,
        resources: [
          { id: "res-fe-9", title: "Git Handbook", type: "DOCUMENTATION", url: "https://guides.github.com/introduction/git-handbook/" },
          { id: "res-fe-10", title: "Git & GitHub Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
        ],
        projectIdeas: ["Initialize a Git repository, create a dev branch, make changes, resolve a mock merge conflict, and push to GitHub."],
        interviewQuestions: ["What is the difference between git merge and git rebase?", "What does git stash do?"]
      },
      {
        id: "fe-node-6",
        slug: "react-framework",
        title: "React Library core concepts",
        description: "Understand Virtual DOM, hooks (useState, useEffect, useMemo, useContext), props, and component lifecycle.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: ["javascript-dom", "git-version"],
        parentNodeId: null,
        order: 6,
        resources: [
          { id: "res-fe-11", title: "React Documentation", type: "DOCUMENTATION", url: "https://react.dev" },
          { id: "res-fe-12", title: "React JS Course for Beginners", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=bMknfKXIFA8" }
        ],
        projectIdeas: ["Build an interactive Dashboard with filters, search fields, and details modal views."],
        interviewQuestions: ["How does the virtual DOM work in React?", "When does a React component re-render?"]
      },
      {
        id: "fe-node-7",
        slug: "nextjs-app",
        title: "Next.js App Router",
        description: "Master React Server Components (RSC), Client Components, server-side data fetching, page routing, and SEO optimization.",
        difficulty: "ADVANCED",
        estimatedTime: "15 hours",
        prerequisites: ["react-framework"],
        parentNodeId: null,
        order: 7,
        resources: [
          { id: "res-fe-13", title: "Next.js Docs", type: "DOCUMENTATION", url: "https://nextjs.org/docs" },
          { id: "res-fe-14", title: "Next.js 14/15 App Router Tutorial", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=wm5gMKuwSYk" }
        ],
        projectIdeas: ["Create a Server-Side Rendered Blog with dynamic routing, pre-fetching tags, and responsive design systems."],
        interviewQuestions: ["Explain the difference between Server Components and Client Components in Next.js.", "What is the difference between ISR and SSR?"]
      }
    ]
  },
  "backend-developer": {
    id: "roadmap-backend",
    slug: "backend-developer",
    title: "Backend Developer",
    description: "Learn server design, building APIs, relational and non-relational database management, authentication protocols, and system scaling.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "4 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "be-node-1",
        slug: "nodejs-basics",
        title: "Node.js & Express Basics",
        description: "Learn server logic using Node.js, Express routers, middle-wares, error handling, and file system interfaces.",
        difficulty: "BEGINNER",
        estimatedTime: "8 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-be-1", title: "Node.js Guide (NodeJS)", type: "DOCUMENTATION", url: "https://nodejs.org/en/docs/guides" },
          { id: "res-be-2", title: "Express.js Crash Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=SccSCuHhOw0" }
        ],
        projectIdeas: ["Build a local CLI utility that interacts with text files and parses JSON logs."],
        interviewQuestions: ["Explain the event loop in Node.js.", "What is middleware in Express.js?"]
      },
      {
        id: "be-node-2",
        slug: "databases-sql",
        title: "Databases (SQL & NoSQL)",
        description: "Explore PostgreSQL, MySQL, MongoDB, indexing, relations, ACID properties, queries, and migrations.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "12 hours",
        prerequisites: ["nodejs-basics"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-be-3", title: "Learn PostgreSQL Basics", type: "WEBSITE", url: "https://www.postgresqltutorial.com/" },
          { id: "res-be-4", title: "SQL vs NoSQL Databases", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=ZS_kXvOe90o" }
        ],
        projectIdeas: ["Design a relational database schema for a shopping system with users, orders, items, and inventory."],
        interviewQuestions: ["What is database indexing and how does it speed up queries?", "Explain the ACID properties in databases.Delta"]
      },
      {
        id: "be-node-3",
        slug: "rest-apis",
        title: "REST APIs & Validation",
        description: "Design robust REST endpoints with proper HTTP methods, query status codes, request validators, and schemas.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "6 hours",
        prerequisites: ["databases-sql"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-be-5", title: "RESTful API Design Best Practices", type: "WEBSITE", url: "https://restfulapi.net/" },
          { id: "res-be-6", title: "API Validation with Zod or Joi", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=L8M_MskP8xU" }
        ],
        projectIdeas: ["Build a fully-validated REST API for a task management app using Express and Zod."],
        interviewQuestions: ["What are the key constraints of a RESTful API?", "What are the differences between GET, POST, PUT, and PATCH?"]
      },
      {
        id: "be-node-4",
        slug: "auth-security",
        title: "Auth, Sessions & Security",
        description: "Learn session management, JWT (JSON Web Tokens), hashing passwords with bcrypt, OAuth flows, and CORS configuration.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "10 hours",
        prerequisites: ["rest-apis"],
        parentNodeId: null,
        order: 4,
        resources: [
          { id: "res-be-7", title: "OWASP Top 10 Security Risks", type: "DOCUMENTATION", url: "https://owasp.org/www-project-top-ten/" },
          { id: "res-be-8", title: "JWT Auth Explained", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=7Q17ubqL6gA" }
        ],
        projectIdeas: ["Build a backend API containing user signup, signin, token refresh, and private routes protected by JWT validation."],
        interviewQuestions: ["What is the difference between Session-based and Token-based authentication?", "How does bcrypt securely store passwords?"]
      },
      {
        id: "be-node-5",
        slug: "caching-redis",
        title: "Caching & Redis",
        description: "Improve performance by avoiding redundant computation. Master key-value stores, memory sizing, and cache invalidation strategies.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "6 hours",
        prerequisites: ["databases-sql"],
        parentNodeId: null,
        order: 5,
        resources: [
          { id: "res-be-cache-1", title: "Redis Crash Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=jgpVdJB2sKQ" },
          { id: "res-be-cache-2", title: "Caching Strategies", type: "DOCUMENTATION", url: "https://redis.io/docs/manual/client-side-caching/" }
        ],
        projectIdeas: ["Integrate a Redis cache layer for fetching database records in an Express API, reducing load latency by 80%."],
        interviewQuestions: ["What is cache stampede and how do you prevent it?", "Explain the difference between write-through and cache-aside patterns."]
      },
      {
        id: "be-node-6",
        slug: "message-brokers",
        title: "Message Brokers (Kafka/RabbitMQ)",
        description: "Build asynchronous event-driven pipelines. Master pub-sub systems, message delivery guarantees, and stream offsets.",
        difficulty: "ADVANCED",
        estimatedTime: "12 hours",
        prerequisites: ["auth-security"],
        parentNodeId: null,
        order: 6,
        resources: [
          { id: "res-be-mb-1", title: "RabbitMQ Essentials", type: "DOCUMENTATION", url: "https://www.rabbitmq.com/getstarted.html" },
          { id: "res-be-mb-2", title: "Kafka Explained in 10 mins", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=Ch5vhJ0rkig" }
        ],
        projectIdeas: ["Build a decoupled transaction logging service that listens to events emitted to a RabbitMQ queue."],
        interviewQuestions: ["What is the difference between Kafka and RabbitMQ?", "Explain how partitions enable horizontal scaling in Kafka."]
      },
      {
        id: "be-node-7",
        slug: "docker-deploy",
        title: "Docker Containerization",
        description: "Package your applications into Docker containers. Learn Dockerfile creation, port mapping, and volume management.",
        difficulty: "ADVANCED",
        estimatedTime: "8 hours",
        prerequisites: ["auth-security"],
        parentNodeId: null,
        order: 7,
        resources: [
          { id: "res-be-9", title: "Docker Container Basics", type: "DOCUMENTATION", url: "https://docs.docker.com/get-started/" },
          { id: "res-be-10", title: "Docker Crash Course for Beginners", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" }
        ],
        projectIdeas: ["Dockerize your Express and PostgreSQL server, starting both up seamlessly via Docker Compose."],
        interviewQuestions: ["What is the difference between a Docker image and a container?", "Explain the difference between a Virtual Machine and a Docker container."]
      }
    ]
  },
  "fullstack-developer": {
    id: "roadmap-fullstack",
    slug: "fullstack-developer",
    title: "Full Stack Developer",
    description: "Combine Frontend visual engineering with Backend server and database infrastructure to build complete end-to-end applications.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "6 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "fs-node-1",
        slug: "fs-frontend",
        title: "Frontend Foundations",
        description: "Master HTML, CSS, JavaScript, and React components to build views.",
        difficulty: "BEGINNER",
        estimatedTime: "30 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-fs-1", title: "React Docs", type: "DOCUMENTATION", url: "https://react.dev" }
        ],
        projectIdeas: ["Build an interactive student visual page."],
        interviewQuestions: ["Explain React state."]
      },
      {
        id: "fs-node-2",
        slug: "fs-backend",
        title: "Backend Foundations",
        description: "Learn Express, Databases (SQL), schema creation, and server APIs.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "30 hours",
        prerequisites: ["fs-frontend"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-fs-2", title: "PostgreSQL Guide", type: "WEBSITE", url: "https://www.postgresqltutorial.com/" }
        ],
        projectIdeas: ["Build a REST database server."],
        interviewQuestions: ["What are SQL primary and foreign keys?"]
      },
      {
        id: "fs-node-3",
        slug: "fs-integration",
        title: "API Integration & NextJS Full Stack",
        description: "Connect both layers: build API routes inside Next.js App Router, manage state, and authenticate user contexts.",
        difficulty: "ADVANCED",
        estimatedTime: "25 hours",
        prerequisites: ["fs-frontend", "fs-backend"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-fs-3", title: "Next.js Data Fetching", type: "DOCUMENTATION", url: "https://nextjs.org/docs/app/building-your-application/data-fetching" }
        ],
        projectIdeas: ["Build a full-fledged ecommerce platform with dashboard analytics, admin controls, and database cache."],
        interviewQuestions: ["What is Hydration mismatch in Next.js and how can you solve it?"]
      }
    ]
  },
  "devops-engineer": {
    id: "roadmap-devops",
    slug: "devops-engineer",
    title: "DevOps Engineer",
    description: "Learn configuration automation, continuous integration and delivery pipelines, cloud computing administration, container architecture, and system observability.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "SYSTEMS",
    nodes: [
      {
        id: "do-node-1",
        slug: "linux-cli",
        title: "Linux & Shell Scripting",
        description: "Understand Linux OS structure, process management, file permissions, shell variables, and scripting automations.",
        difficulty: "BEGINNER",
        estimatedTime: "10 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-do-1", title: "Bash Guide for Beginners", type: "WEBSITE", url: "https://tldp.org/LDP/Bash-Beginners-Guide/html/" },
          { id: "res-do-2", title: "Linux CLI Full Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=wBp0Rb-ZJak" }
        ],
        projectIdeas: ["Write a bash script that periodically zips local server log files and moves them to a backup folder."],
        interviewQuestions: ["How do you check current memory usage and disk space in Linux?", "What is a soft link vs hard link?"]
      },
      {
        id: "do-node-2",
        slug: "ci-cd-pipelines",
        title: "CI/CD & GitHub Actions",
        description: "Set up continuous build, lint test automation, and code deployments upon git push hooks.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "8 hours",
        prerequisites: ["linux-cli"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-do-3", title: "GitHub Actions Docs", type: "DOCUMENTATION", url: "https://docs.github.com/en/actions" },
          { id: "res-do-4", title: "CI/CD Pipeline Tutorial", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=scEDHsr3APg" }
        ],
        projectIdeas: ["Configure a GitHub action pipeline that runs ESLint and jest test assertions on every pull request."],
        interviewQuestions: ["What is the difference between Continuous Integration, Delivery, and Deployment?", "What are runner agents in CI/CD?"]
      },
      {
        id: "do-node-3",
        slug: "kubernetes-orch",
        title: "Kubernetes Orchestration",
        description: "Deploy and manage large-scale container clusters. Learn pods, services, deployments, ingress, configmaps, and secrets.",
        difficulty: "ADVANCED",
        estimatedTime: "20 hours",
        prerequisites: ["ci-cd-pipelines"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-do-5", title: "Kubernetes Interactive tutorials", type: "WEBSITE", url: "https://kubernetes.io/docs/tutorials/" },
          { id: "res-do-6", title: "Kubernetes Course for Beginners", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=X48VuDVv0do" }
        ],
        projectIdeas: ["Deploy a multi-container web app setup (frontend, backend, database) inside a local minikube cluster."],
        interviewQuestions: ["What is a Pod in Kubernetes?", "Explain the role of Kubelet and API server in Kubernetes master control."]
      }
    ]
  },
  "devsecops": {
    id: "roadmap-devsecops",
    slug: "devsecops",
    title: "DevSecOps",
    description: "Shift security left. Integrate scanning tools, secure CI/CD pipelines, container auditing, secrets vaults, and policy compliance into operations.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "SYSTEMS",
    nodes: [
      {
        id: "dso-node-1",
        slug: "secure-cicd",
        title: "Secure CI/CD Pipelines",
        description: "Integrate static application security testing (SAST) and dynamic testing (DAST) into workflow pipelines.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "10 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-dso-1", title: "GitLab Secure Docs", type: "DOCUMENTATION", url: "https://docs.gitlab.com/ee/user/application_security/" }
        ],
        projectIdeas: ["Add a SonarQube audit workflow to a GitHub repository to block pull requests containing security vulnerabilities."],
        interviewQuestions: ["What is the difference between SAST and DAST?", "Why is 'shifting left' important in DevSecOps?"]
      },
      {
        id: "dso-node-2",
        slug: "container-security",
        title: "Container & Kubernetes Security",
        description: "Scan container images for CVE bugs and configure runtime security rules inside clusters.",
        difficulty: "ADVANCED",
        estimatedTime: "15 hours",
        prerequisites: ["secure-cicd"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-dso-2", title: "Trivy Scanner Guide", type: "WEBSITE", url: "https://aquasecurity.github.io/trivy/" }
        ],
        projectIdeas: ["Scan local Docker images using Trivy and fix all CRITICAL and HIGH severity CVE warnings in the base layers."],
        interviewQuestions: ["What does it mean to run a Docker container as a non-root user?", "Explain network policies in Kubernetes security."]
      },
      {
        id: "dso-node-3",
        slug: "secrets-vault",
        title: "Secrets Management (HashiCorp Vault)",
        description: "Store API keys, database credentials, and certificates securely. Avoid plaintext secrets in Git histories.",
        difficulty: "ADVANCED",
        estimatedTime: "12 hours",
        prerequisites: ["secure-cicd"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-dso-3", title: "HashiCorp Vault Getting Started", type: "DOCUMENTATION", url: "https://developer.hashicorp.com/vault/docs" }
        ],
        projectIdeas: ["Deploy a HashiCorp Vault server locally, authorize a Node application using AppRole, and read API keys at runtime."],
        interviewQuestions: ["Why should you avoid environment variable configuration injects for high-security secrets?", "What is token replication in Vault?"]
      }
    ]
  },
  "data-analyst": {
    id: "roadmap-data-analyst",
    slug: "data-analyst",
    title: "Data Analyst",
    description: "Extract, clean, and visualize data. Master Excel tables, SQL query metrics, Python analysis packages, and visualization platforms.",
    difficulty: "BEGINNER",
    estimatedTime: "3 Months",
    category: "DATA_SCIENCE",
    nodes: [
      {
        id: "da-node-1",
        slug: "sql-analytics",
        title: "SQL Data Querying & Filters",
        description: "Master JOIN operations, group Aggregations (SUM/AVG), conditional filtering, window functions, and SQL views.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-da-1", title: "PostgreSQL Tutorial", type: "WEBSITE", url: "https://www.postgresqltutorial.com/" }
        ],
        projectIdeas: ["Write complex queries querying e-commerce analytics database tables to find user retention rates month-over-month."],
        interviewQuestions: ["Explain the difference between WHERE and HAVING clause filters.", "What are SQL window functions?"]
      },
      {
        id: "da-node-2",
        slug: "pandas-python",
        title: "Python Analytics (Pandas/NumPy)",
        description: "Learn to load CSV/JSON files, fill missing values, clean structures, and run calculations using Pandas dataframes.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: ["sql-analytics"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-da-2", title: "Pandas User Guide", type: "DOCUMENTATION", url: "https://pandas.pydata.org/docs/user_guide/index.html" }
        ],
        projectIdeas: ["Load a dataset representing hospital patient logs, clean null values, normalize date strings, and output statistic logs."],
        interviewQuestions: ["How does NumPy optimize computational matrices vs standard Python lists?", "What is the function of .fillna() in Pandas?"]
      },
      {
        id: "da-node-3",
        slug: "bi-dashboards",
        title: "BI Viz dashboards (Tableau/PowerBI)",
        description: "Connect data pipelines, design metrics grids, construct charts, and share interactive reports.",
        difficulty: "BEGINNER",
        estimatedTime: "10 hours",
        prerequisites: ["pandas-python"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-da-3", title: "Tableau Training Videos", type: "WEBSITE", url: "https://www.tableau.com/learn/training" }
        ],
        projectIdeas: ["Build an interactive sales analysis dashboard on Tableau Public demonstrating seasonal transaction trends."],
        interviewQuestions: ["What are dimensions vs metrics in BI dashboards?", "Explain the difference between live connection and extracts in Tableau."]
      }
    ]
  },
  "ai-engineer": {
    id: "roadmap-ai-engineer",
    slug: "ai-engineer",
    title: "AI Engineer",
    description: "Build intelligent systems. Learn prompt configurations, vector datastores, retrieval augmented generation (RAG) structures, and LLM APIs.",
    difficulty: "ADVANCED",
    estimatedTime: "4 Months",
    category: "DATA_SCIENCE",
    nodes: [
      {
        id: "ai-node-1",
        slug: "llm-apis",
        title: "LLM APIs & Prompt Configuration",
        description: "Understand model parameters (temperature, top-p, system instructions) and construct chat prompts.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "6 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-ai-1", title: "Google Gemini API Docs", type: "DOCUMENTATION", url: "https://ai.google.dev/gemini-api/docs" }
        ],
        projectIdeas: ["Build a CLI chatbot using the Gemini SDK that takes customizable system instructions and tracks chat context."],
        interviewQuestions: ["What is the effect of raising the temperature parameter in LLM calls?", "Explain few-shot prompting techniques."]
      },
      {
        id: "ai-node-2",
        slug: "embeddings-vectors",
        title: "Embeddings & Vector Databases",
        description: "Transform text documents into token embeddings. Master vector indexing, cosine similarity checks, and database lookups.",
        difficulty: "ADVANCED",
        estimatedTime: "10 hours",
        prerequisites: ["llm-apis"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-ai-2", title: "Vector Databases Explained", type: "WEBSITE", url: "https://www.pinecone.io/learn/vector-database/" }
        ],
        projectIdeas: ["Build a semantic code scanner that searches files based on meaning matches rather than literal text matches."],
        interviewQuestions: ["What is the difference between vector embeddings and keywords search?", "Explain Cosine Similarity vs Dot Product distance metric calculations."]
      },
      {
        id: "ai-node-3",
        slug: "rag-langchain",
        title: "RAG & LangChain Orchestration",
        description: "Build Retrieval-Augmented Generation (RAG) pipelines. Connect vector datastores with LLMs to provide real-time documentation checks.",
        difficulty: "ADVANCED",
        estimatedTime: "15 hours",
        prerequisites: ["embeddings-vectors"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-ai-3", title: "LangChain Documentation", type: "DOCUMENTATION", url: "https://python.langchain.com/docs/get_started/introduction" }
        ],
        projectIdeas: ["Build a 'Chat with my PDF' web app that parses documents, slices paragraphs into vectors, and returns cited answers."],
        interviewQuestions: ["Explain the architectural steps of a typical RAG system.", "How do you mitigate LLM hallucinations inside prompts?"]
      }
    ]
  },
  "ai-data-scientist": {
    id: "roadmap-ai-data-scientist",
    slug: "ai-data-scientist",
    title: "AI and Data Scientist",
    description: "Analyze, predict, and optimize. Master ML algorithms, statistics matrices, mathematical models, and deep learning tools.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "DATA_SCIENCE",
    nodes: [
      {
        id: "ads-node-1",
        slug: "math-foundations",
        title: "Mathematical Foundations",
        description: "Master linear algebra, matrices operations, calculus gradients, statistics probability distributions, and correlation variables.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "30 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-ads-1", title: "Mathematics for ML (MIT)", type: "DOCUMENTATION", url: "https://mml-book.github.io/" }
        ],
        projectIdeas: ["Write Python matrices operations calculations using raw lists, checking mathematical equations results vs NumPy results."],
        interviewQuestions: ["Explain eigenvalues and eigenvectors.", "What is the Central Limit Theorem and why is it important in statistical experiments?"]
      },
      {
        id: "ads-node-2",
        slug: "ml-algorithms",
        title: "Machine Learning Algorithms",
        description: "Implement regression models, decision trees, random forests, clustering techniques, and evaluation metrics (precision/recall/F1).",
        difficulty: "ADVANCED",
        estimatedTime: "40 hours",
        prerequisites: ["math-foundations"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-ads-2", title: "Scikit-Learn Tutorials", type: "WEBSITE", url: "https://scikit-learn.org/stable/tutorial/" }
        ],
        projectIdeas: ["Build a house pricing estimation model using linear regression and validate score accuracies using Scikit-Learn metrics."],
        interviewQuestions: ["What is the difference between bagging and boosting algorithms?", "Explain overfitting and how regularization techniques (L1/L2) mitigate it."]
      },
      {
        id: "ads-node-3",
        slug: "deep-learning",
        title: "Deep Learning (PyTorch)",
        description: "Construct multi-layer neural networks, backpropagation pathways, activations functions (ReLU, Sigmoid), and weights optimization.",
        difficulty: "ADVANCED",
        estimatedTime: "35 hours",
        prerequisites: ["ml-algorithms"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-ads-3", title: "PyTorch Getting Started", type: "DOCUMENTATION", url: "https://pytorch.org/get-started/locally/" }
        ],
        projectIdeas: ["Build an image recognition classifier system that correctly labels handdrawn digits using PyTorch layers."],
        interviewQuestions: ["What does backpropagation do in neural network training loops?", "Why do we use activations functions inside hidden nodes layers?"]
      }
    ]
  },
  "data-engineer": {
    id: "roadmap-data-engineer",
    slug: "data-engineer",
    title: "Data Engineer",
    description: "Architect pipelines. Build large-scale data warehouses, ELT ingestion pipelines, data lakes, and stream processing pipelines.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "DATA_SCIENCE",
    nodes: [
      {
        id: "de-node-1",
        slug: "data-warehouses",
        title: "SQL & Data Warehousing (Snowflake/BigQuery)",
        description: "Master star schemas, index models, cluster distributions, query partitions, and analytical SQL querying.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-de-1", title: "Snowflake Documentation", type: "DOCUMENTATION", url: "https://docs.snowflake.com" }
        ],
        projectIdeas: ["Design an analytical database schema on BigQuery staging tables using star schemas mapping dimensions."],
        interviewQuestions: ["What is the difference between transactional OLTP databases and warehouse OLAP databases?", "Explain cluster keys in data warehouses."]
      },
      {
        id: "de-node-2",
        slug: "etl-orchestration",
        title: "ETL pipelines & Airflow Orchestration",
        description: "Construct data extraction DAG structures, run schedule schedules, and trace task dependencies in pipelines.",
        difficulty: "ADVANCED",
        estimatedTime: "25 hours",
        prerequisites: ["data-warehouses"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-de-2", title: "Apache Airflow Getting Started", type: "WEBSITE", url: "https://airflow.apache.org/" }
        ],
        projectIdeas: ["Write an Airflow DAG that pulls weather metrics daily from public APIs, cleans values, and appends records to Snowflake."],
        interviewQuestions: ["What is a DAG in pipeline orchestrations?", "How do you handle pipeline task failures and retries in Airflow workflows?"]
      },
      {
        id: "de-node-3",
        slug: "big-data-spark",
        title: "Big Data Processing (Apache Spark)",
        description: "Distribute computation across worker nodes. Master RDD frameworks, spark dataframes, and dynamic partitioning optimizations.",
        difficulty: "ADVANCED",
        estimatedTime: "30 hours",
        prerequisites: ["etl-orchestration"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-de-3", title: "Apache Spark Programming Guide", type: "DOCUMENTATION", url: "https://spark.apache.org/docs/latest/rdd-programming-guide.html" }
        ],
        projectIdeas: ["Build a log analysis pipeline that parses 10GB of log records in a distributed manner using PySpark."],
        interviewQuestions: ["What is lazy evaluation in Spark and what is its benefit?", "Explain the difference between actions and transformations in Spark."]
      }
    ]
  },
  "android": {
    id: "roadmap-android",
    slug: "android",
    title: "Android Developer",
    description: "Build mobile applications for the Android OS. Master Kotlin syntax, Compose layouts, REST client caching, and local database storage.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "4 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "adr-node-1",
        slug: "kotlin-basics",
        title: "Kotlin Programming",
        description: "Master variables types, nullable values assertions, functions syntax, collections, lambdas, and class inheritances.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-adr-1", title: "Kotlin Learn Basics", type: "DOCUMENTATION", url: "https://kotlinlang.org/docs/home.html" }
        ],
        projectIdeas: ["Build a Kotlin terminal calculator app that validates mathematical operations bounds safely."],
        interviewQuestions: ["What are data classes in Kotlin?", "Explain how Kotlin handles Null Safety (nullable vs non-null types)."]
      },
      {
        id: "adr-node-2",
        slug: "jetpack-compose",
        title: "Jetpack Compose Declarative UI",
        description: "Construct layouts using composable blocks, manage view state updates, and design material layouts.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "25 hours",
        prerequisites: ["kotlin-basics"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-adr-2", title: "Compose Tutorials", type: "WEBSITE", url: "https://developer.android.com/jetpack/compose" }
        ],
        projectIdeas: ["Build a responsive mobile checklist app utilizing Jetpack Compose components and themes."],
        interviewQuestions: ["What is recomposition in Compose?", "Explain the function of remember { mutableStateOf() } in Jetpack Compose views."]
      },
      {
        id: "adr-node-3",
        slug: "sqlite-room",
        title: "SQLite & Room Database Caching",
        description: "Staging database structures, configuring entity queries, and cache API responses locally.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 hours",
        prerequisites: ["jetpack-compose"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-adr-3", title: "Room Database Guide", type: "DOCUMENTATION", url: "https://developer.android.com/training/data-storage/room" }
        ],
        projectIdeas: ["Build a offline-first journal application caching mobile entries locally using Room database tables."],
        interviewQuestions: ["What is Room in Android and what are its key components?", "Explain how DAOs map database queries to Swift/Kotlin classes."]
      }
    ]
  },
  "machine-learning": {
    id: "roadmap-machine-learning",
    slug: "machine-learning",
    title: "Machine Learning",
    description: "Design model algorithms. Learn regression mathematical bounds, supervised/unsupervised classifiers, feature configurations, and validations.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "DATA_SCIENCE",
    nodes: [
      {
        id: "ml-node-1",
        slug: "python-ml-basics",
        title: "Python for ML & Feature Engineering",
        description: "Load datasets, normalize metrics scales, impute missing entries, and extract key indicators.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-ml-1", title: "Kaggle Feature Engineering course", type: "WEBSITE", url: "https://www.kaggle.com/learn/feature-engineering" }
        ],
        projectIdeas: ["Create a preprocessing pipeline that cleans real-estate metrics lists, scaling prices and normalizing areas."],
        interviewQuestions: ["What is one-hot encoding and when do you use it?", "Explain the difference between normalization and standardization features scaling."]
      },
      {
        id: "ml-node-2",
        slug: "supervised-learning",
        title: "Supervised & Unsupervised Learning",
        description: "Train classifiers (Trees, SVM) and regression models. Apply clustering (K-Means) to segments.",
        difficulty: "ADVANCED",
        estimatedTime: "30 hours",
        prerequisites: ["python-ml-basics"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-ml-2", title: "Scikit-Learn Guide", type: "DOCUMENTATION", url: "https://scikit-learn.org/stable/user_guide.html" }
        ],
        projectIdeas: ["Build a mail classification spam filter app using Scikit-Learn Naive Bayes algorithms."],
        interviewQuestions: ["What are precision, recall, and F1-score evaluation metrics?", "Explain K-Means clustering algorithm bounds."]
      }
    ]
  },
  "postgresql": {
    id: "roadmap-postgresql",
    slug: "postgresql",
    title: "PostgreSQL",
    description: "Become a database expert. Master PostgreSQL transactions, indexing techniques, stored procedures, replication setups, and schema tuning.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "3 Months",
    category: "SYSTEMS",
    nodes: [
      {
        id: "pg-node-1",
        slug: "pg-acid",
        title: "ACID & Transaction isolation",
        description: "Master database locking, transactional ACID properties, isolation levels (Read Committed, Serializable), and MVCC.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "10 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-pg-1", title: "PostgreSQL Transactions Docs", type: "DOCUMENTATION", url: "https://www.postgresql.org/docs/current/tutorial-transactions.html" }
        ],
        projectIdeas: ["Write SQL script loops demonstrating Read Phenomenons (Dirty read, Phantom read) across multiple connection tabs."],
        interviewQuestions: ["What is MVCC (Multi-Version Concurrency Control) in Postgres?", "Explain how Read Committed isolation level operates."]
      },
      {
        id: "pg-node-2",
        slug: "pg-indexing",
        title: "Indexing & Query Plans (EXPLAIN)",
        description: "Build B-Tree, GIN, and GiST indexes. Analyze queries performance using EXPLAIN ANALYZE plan dumps.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 hours",
        prerequisites: ["pg-acid"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-pg-2", title: "Explain Query Plan Guide", type: "WEBSITE", url: "https://www.pgmustard.com/docs/explain" }
        ],
        projectIdeas: ["Build a B-Tree index on a table containing 1 million rows, and show how query scan moves from Sequential Scan to Index Scan."],
        interviewQuestions: ["When would you use a GIN index instead of a B-Tree index in Postgres?", "What does 'Sequential Scan' indicate in an EXPLAIN dump?"]
      },
      {
        id: "pg-node-3",
        slug: "pg-procedures",
        title: "PL/pgSQL stored procedures & triggers",
        description: "Write database routines, trigger actions on inserts, clean data, and construct auditing structures.",
        difficulty: "ADVANCED",
        estimatedTime: "12 hours",
        prerequisites: ["pg-indexing"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-pg-3", title: "PL/pgSQL Programming Docs", type: "DOCUMENTATION", url: "https://www.postgresql.org/docs/current/plpgsql.html" }
        ],
        projectIdeas: ["Build a trigger that logs previous database column state rows into an audit history table whenever updates happen."],
        interviewQuestions: ["What is the difference between a database function and a stored procedure?", "Explain trigger execution boundaries (BEFORE vs AFTER)."]
      }
    ]
  },
  "ios": {
    id: "roadmap-ios",
    slug: "ios",
    title: "iOS Developer",
    description: "Build native applications for Apple devices. Master Swift programming, SwiftUI layout components, data grids, and CoreData cache.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "4 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "ios-node-1",
        slug: "swift-syntax",
        title: "Swift Syntax & Classes",
        description: "Understand variables types, Swift Optionals, structs vs classes, protocols, optionals chaining, and error catches.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-ios-1", title: "Swift Language Guide", type: "DOCUMENTATION", url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/" }
        ],
        projectIdeas: ["Build a localized terminal task utility in Swift demonstrating protocol inheritance classes."],
        interviewQuestions: ["Explain Swift optionals and the difference between if-let and guard-let bindings.", "What is the difference between a Struct and a Class in Swift?"]
      },
      {
        id: "ios-node-2",
        slug: "swiftui-views",
        title: "SwiftUI Declarative Layouts",
        description: "Build user interfaces using VStack, HStack, List, state bindings (@State, @Binding), and layout updates.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "25 hours",
        prerequisites: ["swift-syntax"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-ios-2", title: "Apple SwiftUI Tutorials", type: "WEBSITE", url: "https://developer.apple.com/tutorials/swiftui" }
        ],
        projectIdeas: ["Build a custom weather view list demonstrating bindings transitions and dynamic layout grids."],
        interviewQuestions: ["What is the purpose of @StateObject vs @ObservedObject in SwiftUI?", "Explain the layout layout flow of SwiftUI view trees."]
      }
    ]
  },
  "blockchain": {
    id: "roadmap-blockchain",
    slug: "blockchain",
    title: "Blockchain Developer",
    description: "Learn cryptographic consensus. Build Solidity smart contracts, deploy decentralized apps (DApps), and audit security frameworks.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "bc-node-1",
        slug: "solidity-contracts",
        title: "Solidity Smart Contracts",
        description: "Understand compilation, variables scoping, EVM memory vs storage, mapping indices, events, and modifiers.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-bc-1", title: "Solidity Docs", type: "DOCUMENTATION", url: "https://docs.soliditylang.org/" }
        ],
        projectIdeas: ["Build a verified voting smart contract allowing registered nodes to cast cryptographic votes."],
        interviewQuestions: ["What is the difference between memory and storage variables in Solidity?", "Explain smart contract re-entrancy bugs and how checks-effects-interactions prevents them."]
      },
      {
        id: "bc-node-2",
        slug: "web3-dapp",
        title: "Web3 APIs & Frontends (ethers.js)",
        description: "Connect frontends with smart contracts. Master RPC node queries, wallet handshakes (MetaMask), and transactions signing.",
        difficulty: "ADVANCED",
        estimatedTime: "15 hours",
        prerequisites: ["solidity-contracts"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-bc-2", title: "EthersJS Docs", type: "DOCUMENTATION", url: "https://docs.ethers.org/v6/" }
        ],
        projectIdeas: ["Build a token staking page dashboard that displays stake balances and triggers transactions signing via MetaMask."],
        interviewQuestions: ["What does an RPC Node provider do in decentralized app connections?", "Explain signed transactions gas limits."]
      }
    ]
  },
  "qa": {
    id: "roadmap-qa",
    slug: "qa",
    title: "QA Engineer",
    description: "Verify software quality. Master automated end-to-end testing, manual bug logging, API querying, and load sweeps.",
    difficulty: "BEGINNER",
    estimatedTime: "3 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "qa-node-1",
        slug: "cypress-testing",
        title: "Cypress Automated Testing",
        description: "Write automated end-to-end user browser scripts. Master element selectors, assertion conditions, and test suites.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-qa-1", title: "Cypress Docs", type: "DOCUMENTATION", url: "https://docs.cypress.io" }
        ],
        projectIdeas: ["Write a Cypress suite testing login actions, session storage writes, and redirect links on a dashboard page."],
        interviewQuestions: ["What is automated regression testing?", "Explain how Cypress handles asynchronous code execution commands."]
      },
      {
        id: "qa-node-2",
        slug: "postman-apis",
        title: "API Verification (Postman)",
        description: "Construct REST client request templates, validate response body values, and run postman automated runner loops.",
        difficulty: "BEGINNER",
        estimatedTime: "10 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-qa-2", title: "Postman API testing guide", type: "WEBSITE", url: "https://learning.postman.com/docs/writing-scripts/intro-to-scripts/" }
        ],
        projectIdeas: ["Build a Postman collection querying task API endpoints, validating response status codes and body property fields."],
        interviewQuestions: ["How do you verify JSON schema formats in API testing?", "Explain how environment variables are updated dynamically in Postman collections."]
      }
    ]
  },
  "software-architect": {
    id: "roadmap-software-architect",
    slug: "software-architect",
    title: "Software Architect",
    description: "Design massive enterprise systems. Master system scalability, design patterns, microservices, databases tuning, and domain logic segregation.",
    difficulty: "ADVANCED",
    estimatedTime: "6 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "sa-node-1",
        slug: "design-patterns",
        title: "OOD Design Patterns",
        description: "Master Creational, Structural, and Behavioral patterns (Singleton, Factory, Observer, Strategy). Review SOLID code design guidelines.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-sa-1", title: "Refactoring Guru design patterns", type: "WEBSITE", url: "https://refactoring.guru/design-patterns" }
        ],
        projectIdeas: ["Write a text parser script utilizing Strategy and Factory patterns to easily adapt formatting configurations."],
        interviewQuestions: ["Explain the Dependency Inversion Principle (SOLID).", "When would you choose the Observer pattern over dynamic callback events?"]
      },
      {
        id: "sa-node-2",
        slug: "microservices-ddd",
        title: "Microservices & Domain-Driven Design (DDD)",
        description: "Build modular services. Map bounded contexts, design microservice domain boundaries, configure API Gateways, and align database isolation schemas.",
        difficulty: "ADVANCED",
        estimatedTime: "30 hours",
        prerequisites: ["design-patterns"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-sa-2", title: "Microservices Architecture Patterns", type: "WEBSITE", url: "https://microservices.io/" }
        ],
        projectIdeas: ["Design a system architecture mapping payment channels, catalog views, and user profiles into bounded microservice sectors."],
        interviewQuestions: ["What is a bounded context in Domain-Driven Design?", "Explain database-per-service pattern challenges (e.g. data consistency)."]
      }
    ]
  },
  "cyber-security": {
    id: "roadmap-cyber-security",
    slug: "cyber-security",
    title: "Cyber Security",
    description: "Protect digital infrastructure. Master threat modeling, network diagnostics, penetration testing, cryptography, and server hardening.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "SYSTEMS",
    nodes: [
      {
        id: "cs-node-1",
        slug: "network-recon",
        title: "Network Reconnaissance (Nmap)",
        description: "Scan network IPs, verify open port statuses, trace running service revisions, and diagnostic firewalls settings.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-cs-1", title: "Nmap Scanning Guide", type: "DOCUMENTATION", url: "https://nmap.org/book/man.html" }
        ],
        projectIdeas: ["Scan local test servers using Nmap, identifying open ports, and reporting potential access vulnerabilities."],
        interviewQuestions: ["What is a SYN scan in Nmap and how does it operate?", "Explain the difference between active and passive scanning methodologies."]
      },
      {
        id: "cs-node-2",
        slug: "pentesting-owasp",
        title: "OWASP Vulnerabilities & Exploitation",
        description: "Audit vulnerabilities like SQL injection, XSS inputs, IDOR flaws, and access control bugs.",
        difficulty: "ADVANCED",
        estimatedTime: "25 hours",
        prerequisites: ["network-recon"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-cs-2", title: "OWASP Top 10 Web Risks", type: "WEBSITE", url: "https://owasp.org/www-project-top-ten/" }
        ],
        projectIdeas: ["Set up a vulnerable test application, execute SQL injections to bypass authentication, and write patches."],
        interviewQuestions: ["How does parameterized SQL query input protect against SQL injection?", "Explain dynamic CSRF token verification protections."]
      }
    ]
  },
  "ux-design": {
    id: "roadmap-ux-design",
    slug: "roadmap-ux-design",
    title: "UX Design",
    description: "Design intuitive interfaces. Learn user wireframes, Figma prototyping, usability guidelines, and grid layout components.",
    difficulty: "BEGINNER",
    estimatedTime: "3 Months",
    category: "PREPARATION",
    nodes: [
      {
        id: "ux-node-1",
        slug: "figma-prototyping",
        title: "Figma UI Prototyping",
        description: "Learn frame layers, auto-layouts grids, custom styles variables, component definitions, and interactive prototype animations.",
        difficulty: "BEGINNER",
        estimatedTime: "20 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-ux-1", title: "Figma Design Tutorials", type: "WEBSITE", url: "https://help.figma.com/hc/en-us/categories/360002047814" }
        ],
        projectIdeas: ["Build a interactive mobile checkout user flow in Figma linking screens with interactive button transitions."],
        interviewQuestions: ["What is auto-layout in Figma and why is it preferred for responsive layouts?", "Explain component states in Figma UI designs."]
      }
    ]
  },
  "technical-writer": {
    id: "roadmap-technical-writer",
    slug: "roadmap-technical-writer",
    title: "Technical Writer",
    description: "Document advanced APIs, software workflows, and architecture guides using Markdown and OpenAPI specifications.",
    difficulty: "BEGINNER",
    estimatedTime: "2 Months",
    category: "PREPARATION",
    nodes: [
      {
        id: "tw-node-1",
        slug: "openapi-swagger",
        title: "OpenAPI & Swagger Documentation",
        description: "Write OpenAPI YAML configuration files defining API endpoints, queries schemas, request body structures, and response codes.",
        difficulty: "BEGINNER",
        estimatedTime: "12 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-tw-1", title: "OpenAPI Specification Docs", type: "DOCUMENTATION", url: "https://swagger.io/specification/" }
        ],
        projectIdeas: ["Draft a comprehensive OpenAPI specification file mapping a task manager REST API server routes."],
        interviewQuestions: ["What is the difference between Swagger UI and Swagger Editor?", "Explain why structuring schema components prevents specification bloating."]
      }
    ]
  },
  "game-developer": {
    id: "roadmap-game-developer",
    slug: "game-developer",
    title: "Game Developer",
    description: "Build interactive 3D/2D games. Master Unity engine components, C# script controllers, physics matrices, and gameplay loops.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "5 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "gd-node-1",
        slug: "unity-csharp",
        title: "Unity Engine & C# Scripting",
        description: "Master GameObjects components, transform layouts, script triggers, update routines, and physical collision dynamics.",
        difficulty: "BEGINNER",
        estimatedTime: "25 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-gd-1", title: "Unity Learn Essentials", type: "WEBSITE", url: "https://learn.unity.com" }
        ],
        projectIdeas: ["Build a 2D side-scroller game in Unity controlling a player character jumping over block obstacles."],
        interviewQuestions: ["Explain the difference between Update() and FixedUpdate() loops in Unity C# scripts.", "What is a prefab component in game engine design?"]
      }
    ]
  },
  "server-side-game-developer": {
    id: "roadmap-server-side-game-developer",
    slug: "server-side-game-developer",
    title: "Server Side Game Developer",
    description: "Build robust backend architectures for multiplayer games. Master WebSocket packets, matchmaking algorithms, anti-cheat structures, and game scaling.",
    difficulty: "ADVANCED",
    estimatedTime: "5 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "ssg-node-1",
        slug: "socket-networking",
        title: "Socket Networking & WebSockets",
        description: "Build low-latency communication nodes. Master TCP/UDP packet protocols, WebSockets integrations, and custom serialize frameworks.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-ssg-1", title: "WebSockets Protocol MDN", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API" }
        ],
        projectIdeas: ["Build a real-time coordinates broadcast server in Node broadcasting player coordinates data maps to connected nodes."],
        interviewQuestions: ["Why is UDP preferred over TCP for real-time multiplayer gaming coordinates systems?", "What are the latency overheads of HTTP vs WebSockets?"]
      }
    ]
  },
  "mlops": {
    id: "roadmap-mlops",
    slug: "mlops",
    title: "MLOps",
    description: "Deploy and manage machine learning pipelines. Master model registries (MLflow), orchestration frameworks (Kubeflow), container deployment, and monitoring systems.",
    difficulty: "ADVANCED",
    estimatedTime: "4 Months",
    category: "DATA_SCIENCE",
    nodes: [
      {
        id: "mlo-node-1",
        slug: "model-tracking",
        title: "MLflow Model Registry",
        description: "Log hyper-parameters, compare model output metrics, register versions, and load weight files dynamically.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "12 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-mlo-1", title: "MLflow Getting Started", type: "DOCUMENTATION", url: "https://mlflow.org/docs/latest/index.html" }
        ],
        projectIdeas: ["Configure a training script that logs validation accuracy metrics to an MLflow tracker dashboard."],
        interviewQuestions: ["What is a model registry and why is it critical in MLOps pipelines?", "How do hyper-parameter metrics comparisons accelerate iteration?"]
      }
    ]
  },
  "product-manager": {
    id: "roadmap-product-manager",
    slug: "product-manager",
    title: "Product Manager",
    description: "Align business value with dev outputs. Master prioritization models, product discovery matrices, analytics indicators, and user feedback processes.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "3 Months",
    category: "PREPARATION",
    nodes: [
      {
        id: "pm-node-1",
        slug: "backlog-prioritization",
        title: "Backlog Prioritization Models",
        description: "Master prioritization frameworks (RICE, MoSCoW, Value vs Effort) and map out roadmap releases.",
        difficulty: "BEGINNER",
        estimatedTime: "10 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-pm-1", title: "Product Backlog Prioritization (Atlassian)", type: "WEBSITE", url: "https://www.atlassian.com/agile/product-management/prioritization" }
        ],
        projectIdeas: ["Draft a RICE matrix evaluating 5 feature suggestions, and compile a roadmap timeline based on scoring results."],
        interviewQuestions: ["What does RICE stand for and how is reach computed?", "Explain the difference between a product vision and a product roadmap."]
      }
    ]
  },
  "engineering-manager": {
    id: "roadmap-engineering-manager",
    slug: "engineering-manager",
    title: "Engineering Manager",
    description: "Manage technical talent and strategic alignment. Learn development coaching, agile methodologies, recruitment strategies, and system governance.",
    difficulty: "ADVANCED",
    estimatedTime: "4 Months",
    category: "PREPARATION",
    nodes: [
      {
        id: "em-node-1",
        slug: "talent-development",
        title: "Technical Talent Development",
        description: "Formulate growth plans, manage career progression targets, run performance review cycles, and handle delegation.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-em-1", title: "The Manager's Path (O'Reilly)", type: "BOOK", url: "https://www.oreilly.com/library/view/the-managers-path/9781491973882/" }
        ],
        projectIdeas: ["Draft a career framework mapping technical achievements expectations across SWE levels (L1 to L3)."],
        interviewQuestions: ["How do you align business deliverable deadlines with developer growth targets?", "Explain conflict resolution steps in engineering sprints."]
      }
    ]
  },
  "developer-relations": {
    id: "roadmap-developer-relations",
    slug: "developer-relations",
    title: "Developer Relations",
    description: "Champion developer success. Create technical content, build local developer communities, analyze usage metrics, and direct SDK feedback loops.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "3 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "dr-node-1",
        slug: "content-creation",
        title: "Developer Content Creation",
        description: "Write clear tutorials, design SDK usage quick-start plans, and document API edge cases.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-dr-1", title: "DevRel handbook", type: "WEBSITE", url: "https://devrel.academy/" }
        ],
        projectIdeas: ["Write a step-by-step setup tutorial teaching developers how to integrate custom SDK client queries."],
        interviewQuestions: ["What are the key KPIs of Developer Relations teams?", "How do you evaluate user feedback loops from SDK usage data?"]
      }
    ]
  },
  "bi-analyst": {
    id: "roadmap-bi-analyst",
    slug: "bi-analyst",
    title: "BI Analyst",
    description: "Deliver analytical business intelligence. Master data warehouse modeling, SQL reporting layers, and starschema database structures.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "3 Months",
    category: "DATA_SCIENCE",
    nodes: [
      {
        id: "bia-node-1",
        slug: "star-schemas",
        title: "Star & Snowflake Schemas Data Modeling",
        description: "Differentiate Dimension tables vs Fact tables, map primary keys relationships, and model indexing layers.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "12 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-bia-1", title: "Dimensional Modeling Guide", type: "DOCUMENTATION", url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/" }
        ],
        projectIdeas: ["Design a dimensional database model layout mapping customers, products sales, and regional dates variables."],
        interviewQuestions: ["What is a Fact table and how does it differ from a Dimension table?", "Explain why denormalized schemas are preferred inside BI data warehouses."]
      }
    ]
  },
  "network-engineer": {
    id: "roadmap-network-engineer",
    slug: "network-engineer",
    title: "Network Engineer",
    description: "Configure network topologies. Master OSI model layers, IP subnetting math, firewall rules, and diagnostics tools.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "4 Months",
    category: "SYSTEMS",
    nodes: [
      {
        id: "ne-node-1",
        slug: "osi-model",
        title: "OSI Model & TCP/IP Network Protocols",
        description: "Study packet paths through physical, transport (TCP/UDP), and application layers. Review DNS routing steps.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-ne-1", title: "OSI Model Explanation (Cloudflare)", type: "WEBSITE", url: "https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/" }
        ],
        projectIdeas: ["Capture network packets using Wireshark, trace TCP 3-Way Handshake steps, and output packet size distributions."],
        interviewQuestions: ["Explain the difference between TCP and UDP.", "What happens at Layer 3 (Network Layer) of the OSI model?"]
      }
    ]
  },
  "forward-deployed-engineer": {
    id: "roadmap-forward-deployed-engineer",
    slug: "forward-deployed-engineer",
    title: "Forward Deployed Engineer",
    description: "Integrate complex client-facing software solutions. Master custom API bindings, data migrations, technical consulting, and critical triage.",
    difficulty: "ADVANCED",
    estimatedTime: "4 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        id: "fde-node-1",
        slug: "integration-glue",
        title: "Custom Integrations & API Glue-Code",
        description: "Write robust ETL scripts and custom Webhook receivers to bridge client legacy systems with SaaS APIs.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "15 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-fde-1", title: "API Integration Patterns", type: "DOCUMENTATION", url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/" }
        ],
        projectIdeas: ["Write a custom webhook routing adapter that maps client ticketing alerts into standardized payloads for API delivery."],
        interviewQuestions: ["How do you handle API rate-limiting and retry backoffs in real-time integration loops?", "Explain how you handle data schema mapping mismatching."]
      }
    ]
  }
};

console.log("Writing blueprint JSON files...");
Object.entries(roadmaps).forEach(([slug, data]) => {
  const filepath = path.join(blueprintsDir, `${slug}.json`);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
  console.log(`- Created ${slug}.json`);
});

console.log("All 28 blueprints generated successfully!");
