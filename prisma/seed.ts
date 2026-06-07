const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seeds = [
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    description: "Learn how to build beautiful, responsive, and high-performance user interfaces. This path takes you from basic internet concepts to modern framework engineering.",
    difficulty: "BEGINNER",
    estimatedTime: "3-4 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        slug: "internet-basics",
        title: "Internet Basics",
        description: "Understand how the web works, hosting, DNS, HTTP/HTTPS, and browsers.",
        difficulty: "BEGINNER",
        estimatedTime: "2 hours",
        prerequisites: [],
        order: 1,
        resources: [
          { title: "How the Internet Works (MDN)", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/How_does_the_Internet_work" },
          { title: "How the Internet Works in 5 Minutes", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=7_LPdttKXPc" }
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
        slug: "html-basics",
        title: "Semantic HTML",
        description: "Learn structuring web documents using correct semantic tags for SEO and accessibility.",
        difficulty: "BEGINNER",
        estimatedTime: "4 hours",
        prerequisites: ["internet-basics"],
        order: 2,
        resources: [
          { title: "HTML Basics (MDN)", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML" },
          { title: "HTML Full Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=UB1O30zR-EE" }
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
        slug: "css-basics",
        title: "CSS Styles & Responsive Layouts",
        description: "Master Flexbox, Grid layouts, custom variables, responsive media queries, and design patterns.",
        difficulty: "BEGINNER",
        estimatedTime: "10 hours",
        prerequisites: ["html-basics"],
        order: 3,
        resources: [
          { title: "CSS Layout (MDN)", type: "DOCUMENTATION", url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout" },
          { title: "CSS Flexbox & Grid Guide", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=rg7Fvvl3taU" }
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
        slug: "javascript-dom",
        title: "JavaScript & DOM Manipulation",
        description: "Learn async programming, promises, array methods, API integration, and standard browser DOM APIs.",
        difficulty: "BEGINNER",
        estimatedTime: "15 hours",
        prerequisites: ["css-basics"],
        order: 4,
        resources: [
          { title: "Modern JavaScript Tutorial", type: "WEBSITE", url: "https://javascript.info" },
          { title: "Promises & Async/Await", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=V_Kr9OSfDeU" }
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
        slug: "git-version",
        title: "Git & Version Control",
        description: "Learn how to manage version history, commit branches, merge changes, and collaborate using GitHub.",
        difficulty: "BEGINNER",
        estimatedTime: "3 hours",
        prerequisites: ["javascript-dom"],
        order: 5,
        resources: [
          { title: "Git Handbook", type: "DOCUMENTATION", url: "https://guides.github.com/introduction/git-handbook/" },
          { title: "Git & GitHub Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=RGOj5yH7evk" }
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
        slug: "react-framework",
        title: "React Library core concepts",
        description: "Understand Virtual DOM, hooks (useState, useEffect, useMemo, useContext), props, and component lifecycle.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "20 hours",
        prerequisites: ["javascript-dom", "git-version"],
        order: 6,
        resources: [
          { title: "React Documentation", type: "DOCUMENTATION", url: "https://react.dev" },
          { title: "React JS Course for Beginners", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=bMknfKXIFA8" }
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
        slug: "nextjs-app",
        title: "Next.js App Router",
        description: "Master React Server Components (RSC), Client Components, server-side data fetching, page routing, and SEO optimization.",
        difficulty: "ADVANCED",
        estimatedTime: "15 hours",
        prerequisites: ["react-framework"],
        order: 7,
        resources: [
          { title: "Next.js Docs", type: "DOCUMENTATION", url: "https://nextjs.org/docs" },
          { title: "Next.js 14/15 App Router Tutorial", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=wm5gMKuwSYk" }
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
  {
    slug: "backend-developer",
    title: "Backend Developer",
    description: "Learn server design, building APIs, relational and non-relational database management, authentication protocols, and system scaling.",
    difficulty: "INTERMEDIATE",
    estimatedTime: "4 Months",
    category: "DEVELOPMENT",
    nodes: [
      {
        slug: "nodejs-basics",
        title: "Node.js & Express Basics",
        description: "Learn server logic using Node.js, Express routers, middle-wares, error handling, and file system interfaces.",
        difficulty: "BEGINNER",
        estimatedTime: "8 hours",
        prerequisites: [],
        order: 1,
        resources: [
          { title: "Node.js Guide (NodeJS)", type: "DOCUMENTATION", url: "https://nodejs.org/en/docs/guides" },
          { title: "Express.js Crash Course", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=SccSCuHhOw0" }
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
        slug: "databases-sql",
        title: "Databases (SQL & NoSQL)",
        description: "Explore PostgreSQL, MySQL, MongoDB, indexing, relations, ACID properties, queries, and migrations.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "12 hours",
        prerequisites: ["nodejs-basics"],
        order: 2,
        resources: [
          { title: "Learn PostgreSQL Basics", type: "WEBSITE", url: "https://www.postgresqltutorial.com/" },
          { title: "SQL vs NoSQL Databases", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=ZS_kXvOe90o" }
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
        slug: "rest-apis",
        title: "REST APIs & Validation",
        description: "Design robust REST endpoints with proper HTTP methods, query status codes, request validators, and schemas.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "6 hours",
        prerequisites: ["databases-sql"],
        order: 3,
        resources: [
          { title: "RESTful API Design Best Practices", type: "WEBSITE", url: "https://restfulapi.net/" },
          { title: "API Validation with Zod or Joi", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=L8M_MskP8xU" }
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
        slug: "auth-security",
        title: "Auth, Sessions & Security",
        description: "Learn session management, JWT (JSON Web Tokens), hashing passwords with bcrypt, OAuth flows, and CORS configuration.",
        difficulty: "INTERMEDIATE",
        estimatedTime: "10 hours",
        prerequisites: ["rest-apis"],
        order: 4,
        resources: [
          { title: "OWASP Top 10 Security Risks", type: "DOCUMENTATION", url: "https://owasp.org/www-project-top-ten/" },
          { title: "JWT Auth Explained", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=7Q17ubqL6gA" }
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
        slug: "docker-deploy",
        title: "Docker Containerization",
        description: "Package your applications into Docker containers. Learn Dockerfile creation, port mapping, and volume management.",
        difficulty: "ADVANCED",
        estimatedTime: "8 hours",
        prerequisites: ["auth-security"],
        order: 5,
        resources: [
          { title: "Docker Container Basics", type: "DOCUMENTATION", url: "https://docs.docker.com/get-started/" },
          { title: "Docker Crash Course for Beginners", type: "YOUTUBE", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" }
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
  }
];

async function main() {
  console.log("Cleaning database tables...");
  await prisma.resource.deleteMany({});
  await prisma.roadmapNode.deleteMany({});
  await prisma.roadmap.deleteMany({});

  console.log("Seeding main learning roadmaps...");

  for (const seed of seeds) {
    const roadmap = await prisma.roadmap.create({
      data: {
        slug: seed.slug,
        title: seed.title,
        description: seed.description,
        difficulty: seed.difficulty,
        estimatedTime: seed.estimatedTime,
        category: seed.category,
      }
    });

    for (const node of seed.nodes) {
      const dbNode = await prisma.roadmapNode.create({
        data: {
          roadmapId: roadmap.id,
          slug: node.slug,
          title: node.title,
          description: node.description,
          difficulty: node.difficulty,
          estimatedTime: node.estimatedTime,
          prerequisites: node.prerequisites,
          order: node.order,
        }
      });

      for (const res of node.resources) {
        await prisma.resource.create({
          data: {
            title: res.title,
            type: res.type,
            url: res.url,
            isApproved: true,
            roadmapNodeId: dbNode.id,
            roadmapId: roadmap.id
          }
        });
      }
    }
  }

  console.log("Seeding complete successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding process:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
