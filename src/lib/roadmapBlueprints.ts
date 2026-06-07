import { RoadmapData } from "@/store/useRoadmapStore";

export const roadmapBlueprints: Record<string, RoadmapData> = {
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
        projectIdeas: [
          "Deploy a simple static text page using GitHub Pages and map it to a custom sub-domain."
        ],
        interviewQuestions: [
          "What happens when you type a URL in your browser and hit Enter?",
          "Explain the difference between HTTP and HTTPS."
        ]
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
        projectIdeas: [
          "Create a semantic markup mockup of a blog article with side panels, navigation links, and article bodies."
        ],
        interviewQuestions: [
          "Why should you use semantic tags like <main>, <article>, <section> instead of just <div>?",
          "What is the purpose of the alt attribute on images?"
        ]
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
        projectIdeas: [
          "Build a fully responsive pricing page card grid matching mobile, tablet, and desktop screens.",
          "Build a portfolio layout using CSS Grid layouts."
        ],
        interviewQuestions: [
          "Explain the difference between flexbox and CSS Grid and when to use each.",
          "What is the CSS Box Model?"
        ]
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
        projectIdeas: [
          "Build a dynamic Todo List with LocalStorage cache and drag-and-drop ordering.",
          "Build a weather search app fetching data from a public weather API."
        ],
        interviewQuestions: [
          "What is event delegation in JavaScript?",
          "What is the difference between let, const, and var?",
          "How do Javascript Promises work and what is a deadlock?"
        ]
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
        projectIdeas: [
          "Initialize a Git repository, create a dev branch, make changes, resolve a mock merge conflict, and push to GitHub."
        ],
        interviewQuestions: [
          "What is the difference between git merge and git rebase?",
          "What does git stash do?"
        ]
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
        projectIdeas: [
          "Build an interactive Dashboard with filters, search fields, and details modal views.",
          "Build a markdown editor with live HTML preview rendering."
        ],
        interviewQuestions: [
          "How does the virtual DOM work in React?",
          "When does a React component re-render?",
          "What are the rules of React Hooks?"
        ]
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
        projectIdeas: [
          "Create a Server-Side Rendered Blog with dynamic routing, pre-fetching tags, and responsive design systems."
        ],
        interviewQuestions: [
          "Explain the difference between Server Components and Client Components in Next.js.",
          "What is the difference between ISR (Incremental Static Regeneration) and SSR (Server Side Rendering)?"
        ]
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
        projectIdeas: [
          "Build a local CLI utility that interacts with text files and parses JSON logs."
        ],
        interviewQuestions: [
          "Explain the event loop in Node.js.",
          "What is middleware in Express.js?"
        ]
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
        projectIdeas: [
          "Design a relational database schema for a shopping system with users, orders, items, and inventory."
        ],
        interviewQuestions: [
          "What is database indexing and how does it speed up queries?",
          "Explain the ACID properties in databases."
        ]
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
        projectIdeas: [
          "Build a fully-validated REST API for a task management app using Express and Zod."
        ],
        interviewQuestions: [
          "What are the key constraints of a RESTful API?",
          "What are the differences between GET, POST, PUT, and PATCH?"
        ]
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
        projectIdeas: [
          "Build a backend API containing user signup, signin, token refresh, and private routes protected by JWT validation."
        ],
        interviewQuestions: [
          "What is the difference between Session-based and Token-based authentication?",
          "How does bcrypt securely store passwords?"
        ]
      },
      {
        id: "be-node-5",
        slug: "docker-deploy",
        title: "Docker Containerization",
        description: "Package your applications into Docker containers. Learn Dockerfile creation, port mapping, and volume management.",
        difficulty: "ADVANCED",
        estimatedTime: "8 hours",
        prerequisites: ["auth-security"],
        parentNodeId: null,
        order: 5,
        resources: [
          { id: "res-be-9", title: "Docker Container Basics", type: "DOCUMENTATION", url: "https://docs.docker.com/get-started/" },
          { id: "res-be-10", title: "Docker Crash Course for Beginners", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" }
        ],
        projectIdeas: [
          "Dockerize your Express and PostgreSQL server, starting both up seamlessly via Docker Compose."
        ],
        interviewQuestions: [
          "What is the difference between a Docker image and a container?",
          "Explain the difference between a Virtual Machine and a Docker container."
        ]
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
        projectIdeas: ["Build a interactive student visual page."],
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
  "dsa": {
    id: "roadmap-dsa",
    slug: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master problem-solving patterns, computational runtime analysis, memory layouts, trees, graphs, dynamic programming, and interview challenges.",
    difficulty: "BEGINNER",
    estimatedTime: "3 Months",
    category: "PREPARATION",
    nodes: [
      {
        id: "dsa-node-1",
        slug: "time-complexity",
        title: "Complexity Analysis (Big O)",
        description: "Analyze code efficiency in terms of time (operations) and space (RAM). Learn to calculate best, average, and worst-case bounds.",
        difficulty: "BEGINNER",
        estimatedTime: "4 hours",
        prerequisites: [],
        parentNodeId: null,
        order: 1,
        resources: [
          { id: "res-dsa-1", title: "Introduction to Big O", type: "WEBSITE", url: "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/" },
          { id: "res-dsa-2", title: "Big O Notation Explained", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=V6mKRYt4c5U" }
        ],
        projectIdeas: ["Write equivalent code blocks for searching an array in O(N) vs O(log N) and plot the execution time difference for large arrays."],
        interviewQuestions: ["What is the difference between average case and worst case complexity?", "What is O(1) space complexity?"]
      },
      {
        id: "dsa-node-2",
        slug: "arrays-lists",
        title: "Arrays & LinkedLists",
        description: "Understand contiguous vs reference memory allocation. Master pointer manipulation, reversing nodes, detection of loops.",
        difficulty: "BEGINNER",
        estimatedTime: "12 hours",
        prerequisites: ["time-complexity"],
        parentNodeId: null,
        order: 2,
        resources: [
          { id: "res-dsa-3", title: "Linked List Data Structure", type: "WEBSITE", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" },
          { id: "res-dsa-4", title: "Linked List Visual Tutorial", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=FihcMa1wj1U" }
        ],
        projectIdeas: ["Build a custom singly linked list class in TypeScript that supports inserts, deletes, reversing, and loop detection."],
        interviewQuestions: ["Explain why index lookups in an array are O(1) whereas in linked lists they are O(N).", "How do you detect a cycle in a linked list?"]
      },
      {
        id: "dsa-node-3",
        slug: "trees-graphs",
        title: "Trees & Graphs",
        description: "Master Binary Trees, BST, Traversals (Pre/In/Post order, BFS, DFS), Dijkstra's, MST, and topological sort.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: ["arrays-lists"],
        parentNodeId: null,
        order: 3,
        resources: [
          { id: "res-dsa-5", title: "Trees and Graphs (GfG)", type: "WEBSITE", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/" },
          { id: "res-dsa-6", title: "BFS and DFS Graph Traversals", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=pcKY4hjDrxk" }
        ],
        projectIdeas: ["Build a route finder app using Dijkstra's algorithm on a simulated graph network represented on a 2D canvas."],
        interviewQuestions: ["What is the difference between BFS and DFS?", "How do you check if a binary tree is a Binary Search Tree?"]
      },
      {
        id: "dsa-node-4",
        slug: "dynamic-programming",
        title: "Dynamic Programming (DP)",
        description: "Understand Memoization vs Tabulation. Solve classic knapsack, subsequence, edit distance, and grid traversal problems.",
        difficulty: "ADVANCED",
        estimatedTime: "25 hours",
        prerequisites: ["trees-graphs"],
        parentNodeId: null,
        order: 4,
        resources: [
          { id: "res-dsa-7", title: "Dynamic Programming Guide", type: "WEBSITE", url: "https://www.geeksforgeeks.org/dynamic-programming/" },
          { id: "res-dsa-8", title: "DP Course for Beginners", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=oBt53YbR9K0" }
        ],
        projectIdeas: ["Solve 10 DP problems on LeetCode and write down a blog/notes explaining the transition states and base cases."],
        interviewQuestions: ["What is the difference between Memoization (Top-down) and Tabulation (Bottom-up)?", "When can you apply Dynamic Programming to a problem?"]
      }
    ]
  }
};
