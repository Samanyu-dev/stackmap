export interface ResourceLinks {
  websites: string[];
  documentation: string[];
  youtube: string[];
  books: string[];
  practicePlatforms: string[];
  githubRepos: string[];
  blogs: string[];
  freeResources: string[];
  paidResources: string[];
}

export const resourcesDatabase: Record<string, ResourceLinks> = {
  "html-css": {
    websites: ["https://web.dev", "https://css-tricks.com"],
    documentation: ["https://developer.mozilla.org/en-US/docs/Web/HTML", "https://developer.mozilla.org/en-US/docs/Web/CSS"],
    youtube: ["Kevin Powell", "Traversy Media", "FreeCodeCamp"],
    books: ["HTML and CSS: Design and Build Websites by Jon Duckett", "CSS Secrets by Lea Verou"],
    practicePlatforms: ["Frontend Mentor", "CSS Battle"],
    githubRepos: ["https://github.com/h5bp/html5-boilerplate", "https://github.com/daneden/animate.css"],
    blogs: ["Smashing Magazine", "A List Apart"],
    freeResources: ["MDN Web Docs", "W3Schools HTML/CSS tutorials"],
    paidResources: ["Frontend Masters HTML/CSS Paths", "Scrimba Frontend Developer Career Path"]
  },
  "javascript": {
    websites: ["https://javascript.info", "https://eloquentjavascript.net"],
    documentation: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript"],
    youtube: ["Chai aur Code", "Net Ninja", "Academind"],
    books: ["You Don't Know JS by Kyle Simpson", "JavaScript: The Good Parts by Douglas Crockford"],
    practicePlatforms: ["Exercism JavaScript Track", "Codewars", "LeetCode (JS)"],
    githubRepos: ["https://github.com/getify/You-Dont-Know-JS", "https://github.com/airbnb/javascript"],
    blogs: ["Overreacted by Dan Abramov", "David Walsh Blog"],
    freeResources: ["JavaScript30 by Wes Bos", "freeCodeCamp JavaScript Syllabus"],
    paidResources: ["Namaste JavaScript by Akshay Saini", "Jonas Schmedtmann Udemy JS Course"]
  },
  "typescript": {
    websites: ["https://www.typescriptlang.org", "https://www.totaltypescript.com"],
    documentation: ["https://www.typescriptlang.org/docs/"],
    youtube: ["Matt Pocock", "Jack Herrington", "Ben Awad"],
    books: ["Effective TypeScript by Dan Vanderkam", "Programming TypeScript by Boris Cherny"],
    practicePlatforms: ["Type Hero", "TypeScript Exercises"],
    githubRepos: ["https://github.com/microsoft/TypeScript", "https://github.com/tsconfig/bases"],
    blogs: ["TypeScript Blog", "Marius Schulz Blog"],
    freeResources: ["TypeScript Deep Dive Book", "TypeScript Handbook"],
    paidResources: ["Total TypeScript Core Volumes", "Execute Program TypeScript Course"]
  },
  "react": {
    websites: ["https://react.dev", "https://react.gg"],
    documentation: ["https://react.dev/reference/react"],
    youtube: ["Chai aur Code", "Codevolution", "Net Ninja"],
    books: ["The Road to React by Robin Wieruch", "React Key Concepts by Maximilian Schwarzmüller"],
    practicePlatforms: ["Frontend Mentor", "Scrimba React Course"],
    githubRepos: ["https://github.com/facebook/react", "https://github.com/enaqx/awesome-react"],
    blogs: ["React Official Blog", "Dan Abramov's Overreacted"],
    freeResources: ["Scrimba Free React Boot Camp", "freeCodeCamp 12-Hour React Course"],
    paidResources: ["Epic React by Kent C. Dodds", "Stephen Grider React + Redux Course"]
  },
  "nextjs": {
    websites: ["https://nextjs.org", "https://nextjs.org/showcase"],
    documentation: ["https://nextjs.org/docs"],
    youtube: ["Lee Robinson", "ByteGrad", "Dave Gray"],
    books: ["Real-World Next.js by Michele Riva"],
    practicePlatforms: ["Next.js Learn Dashboard", "Frontend Mentor Full-Stack"],
    githubRepos: ["https://github.com/vercel/next.js", "https://github.com/vercel/commerce"],
    blogs: ["Vercel Blog", "Lee Robinson's Blog"],
    freeResources: ["Next.js Official Interactive Tutorials", "freeCodeCamp Next.js Course"],
    paidResources: ["Code With Antonio Next.js SaaS", "NextJS Pro Course by ByteGrad"]
  },
  "nodejs-express": {
    websites: ["https://nodejs.org", "https://expressjs.com"],
    documentation: ["https://nodejs.org/docs/latest/api/", "https://expressjs.com/en/api.html"],
    youtube: ["Dave Gray NodeJS", "Chai aur Code Backend", "Web Dev Simplified"],
    books: ["Node.js Design Patterns by Mario Casciaro", "Distributed Systems with Node.js by Thomas Hunter II"],
    practicePlatforms: ["Node School", "Exercism NodeJS Track"],
    githubRepos: ["https://github.com/goldbergyoni/nodebestpractices", "https://github.com/expressjs/express"],
    blogs: ["Node.js Official Blog", "RisingStack Engineering Blog"],
    freeResources: ["Node.js Interactive Guides", "Mozilla Developer Local Library Backend Series"],
    paidResources: ["NodeJS Developer Bootcamp by Andrew Mead", "Backend Engineer Career Path on Codecademy"]
  },
  "postgresql": {
    websites: ["https://www.postgresql.org", "https://www.postgresqltutorial.com"],
    documentation: ["https://www.postgresql.org/docs/current/"],
    youtube: ["Hussein Nasser Database Engineering", "Prisma Database Guide", "Amigoscode PostgreSQL"],
    books: ["Designing Data-Intensive Applications by Martin Kleppmann", "PostgreSQL High Performance by Gregory Smith"],
    practicePlatforms: ["SQLBolt", "LeetCode Database Problems", "SQLZoo"],
    githubRepos: ["https://github.com/postgres/postgres", "https://github.com/db-cli/pgcli"],
    blogs: ["Craig Kerstiens Blog", "Postgres Weekly"],
    freeResources: ["Intro to Databases by Carnegie Mellon", "Neon Serverless Postgres Docs"],
    paidResources: ["Complete SQL Bootcamp by Jose Portilla", "Hussein Nasser Database Masterclass"]
  },
  "system-design": {
    websites: ["https://systemdesign.one", "https://bytebytego.com"],
    documentation: ["https://github.com/donnemartin/system-design-primer"],
    youtube: ["ByteByteGo (Alex Xu)", "Gaurav Sen", "ArjanCodes"],
    books: ["System Design Interview by Alex Xu", "Designing Data-Intensive Applications by Martin Kleppmann"],
    practicePlatforms: ["Exponent System Design Prep", "Educative.io System Design Paths"],
    githubRepos: ["https://github.com/donnemartin/system-design-primer", "https://github.com/checkcheckzz/system-design-interview"],
    blogs: ["Netflix Tech Blog", "Uber Engineering Blog", "Airbnb Tech Blog"],
    freeResources: ["System Design Primer", "InfoQ Architecture Section"],
    paidResources: ["ByteByteGo Premium Platform", "Educative Grokking the System Design Interview"]
  },
  "cloud-computing": {
    websites: ["https://aws.amazon.com", "https://azure.microsoft.com"],
    documentation: ["https://docs.aws.amazon.com", "https://learn.microsoft.com/azure/"],
    youtube: ["Stephane Maarek", "Digital Cloud Training", "Cloud Academy"],
    books: ["AWS Certified Solutions Architect Study Guide", "Cloud Computing Design Patterns by Thomas Erl"],
    practicePlatforms: ["AWS Skill Builder", "Microsoft Learn Sandbox Labs"],
    githubRepos: ["https://github.com/turnerlabs/terraform-aws-architecture", "https://github.com/claranet/terraform-aws-vpc"],
    blogs: ["AWS Architecture Blog", "All Things Distributed by Werner Vogels"],
    freeResources: ["AWS Free Tier Labs", "Microsoft Learn Modules Guide"],
    paidResources: ["Stephane Maarek Solutions Architect Course", "Adrian Cantrill AWS Courses"]
  },
  "devops": {
    websites: ["https://roadmap.sh/devops", "https://kubernetes.io"],
    documentation: ["https://docs.docker.com", "https://kubernetes.io/docs/home/"],
    youtube: ["TechWorld with Nana", "KodeKloud", "DevOps Toolkit"],
    books: ["The Phoenix Project by Gene Kim", "Site Reliability Engineering by Google"],
    practicePlatforms: ["KodeKloud Labs", "Killercoda Interactive Scenarios"],
    githubRepos: ["https://github.com/bregman-arie/devops-resources", "https://github.com/kubernetes/kubernetes"],
    blogs: ["DevOps.com", "Google Cloud SRE Blog"],
    freeResources: ["DevOps Boot Camp by freeCodeCamp", "Play with Kubernetes Sandbox"],
    paidResources: ["KodeKloud Subscription", "Linux Foundation Certified Kubernetes Administrator Course"]
  },
  "dsa": {
    websites: ["https://neetcode.io", "https://leetcode.com"],
    documentation: ["https://visualgo.net/en", "https://github.com/jwasham/coding-interview-university"],
    youtube: ["NeetCode", "Abdul Bari", "William Fiset"],
    books: ["Introduction to Algorithms (CLRS)", "Cracking the Coding Interview by Gayle Laakmann McDowell"],
    practicePlatforms: ["LeetCode", "HackerRank", "GeeksforGeeks", "Codeforces"],
    githubRepos: ["https://github.com/jwasham/coding-interview-university", "https://github.com/trekhleb/javascript-algorithms"],
    blogs: ["LeetCode Discuss Section", "GeeksforGeeks Algorithms Guide"],
    freeResources: ["NeetCode Roadmaps", "Algorithms Course by Princeton on Coursera"],
    paidResources: ["AlgoExpert.io", "LeetCode Premium Membership"]
  },
  "machine-learning-ai": {
    websites: ["https://machinelearningmastery.com", "https://huggingface.co"],
    documentation: ["https://pytorch.org/docs/", "https://scikit-learn.org/stable/"],
    youtube: ["Sentdex", "Lex Fridman AI Podcast", "StatQuest with Josh Starmer"],
    books: ["Hands-On Machine Learning by Aurélien Géron", "Deep Learning by Ian Goodfellow"],
    practicePlatforms: ["Kaggle", "DataCamp"],
    githubRepos: ["https://github.com/ageron/handson-ml3", "https://github.com/huggingface/transformers"],
    blogs: ["OpenAI Blog", "Hugging Face Blog", "Distill.pub"],
    freeResources: ["Andrew Ng's Machine Learning Specialization", "Fast.ai Practical Deep Learning for Coders"],
    paidResources: ["Coursera AI Professional Certificates", "Udacity Deep Learning Nanodegree"]
  },
  "mobile-development": {
    websites: ["https://developer.android.com", "https://developer.apple.com/swift/"],
    documentation: ["https://developer.android.com/reference", "https://developer.apple.com/documentation/swift"],
    youtube: ["Philipp Lackner (Android)", "Sean Allen (iOS)", "Paul Hudson (Hacking with Swift)"],
    books: ["Android Programming: The Big Nerd Ranch Guide", "Swift Programming: The Big Nerd Ranch Guide"],
    practicePlatforms: ["Android Kotlin Basics Codelabs", "Swift Playgrounds", "Hacking with Swift Exercises"],
    githubRepos: ["https://github.com/android/architecture-samples", "https://github.com/vsouza/awesome-ios"],
    blogs: ["Android Developers Blog", "Swift by Sundell"],
    freeResources: ["Hacking with Swift (100 Days of Swift)", "Google Android Basics in Kotlin"],
    paidResources: ["Ray Wenderlich (Kodeco) Mobile Subscriptions", "Angela Yu iOS Development Course"]
  },
  "cybersecurity": {
    websites: ["https://www.hacksplaining.com", "https://portswigger.net"],
    documentation: ["https://owasp.org/www-project-top-ten/", "https://csrc.nist.gov/publications"],
    youtube: ["John Hammond", "LiveOverflow", "NetworkChuck"],
    books: ["The Web Application Hacker's Handbook by Dafydd Stuttard", "Hacking: The Art of Exploitation by Jon Erickson"],
    practicePlatforms: ["TryHackMe", "Hack The Box", "PortSwigger Web Security Academy"],
    githubRepos: ["https://github.com/danielmiessler/SecLists", "https://github.com/swisskyrepo/PayloadsAllTheThings"],
    blogs: ["Krebs on Security", "Schneier on Security", "Dark Reading"],
    freeResources: ["SANS Cyber Aces Academy", "OWASP Cheat Sheets API Guidance"],
    paidResources: ["Offensive Security OSCP Certification Prep", "TryHackMe Premium Tracks"]
  },
  "blockchain": {
    websites: ["https://ethereum.org/en/developers/", "https://usejournal.com/blockchain"],
    documentation: ["https://docs.soliditylang.org/", "https://docs.solana.com/"],
    youtube: ["Dapp University", "Patrick Collins Smart Contract Engineering", "EatTheBlocks"],
    books: ["Mastering Bitcoin by Andreas Antonopoulos", "Mastering Ethereum by Andreas Antonopoulos & Gavin Wood"],
    practicePlatforms: ["CryptoZombies", "Speedrun Ethereum"],
    githubRepos: ["https://github.com/smartcontractkit/full-blockchain-solidity-course-js", "https://github.com/ethereum/solidity"],
    blogs: ["Vitalik Buterin's Website", "ConsenSys Blog"],
    freeResources: ["Buildspace Blockchain Tracks", "Patrick Collins 32-hour Solidity Course"],
    paidResources: ["Alchemy University Bootcamps", "ConsenSys Academy Developer Program"]
  },
  "product-management": {
    websites: ["https://www.productmanagementfestival.com", "https://www.productplan.com"],
    documentation: ["https://www.mindtheproduct.com/resources/"],
    youtube: ["Product School", "PM Diego Granados", "Dan Olsen"],
    books: ["Inspired by Marty Cagan", "Cracking the PM Interview by Jackie Bavaro", "The Lean Product Playbook by Dan Olsen"],
    practicePlatforms: ["Product Management Exercises", "StellarPeers PM Interview Questions"],
    githubRepos: ["https://github.com/nusr/awesome-product-management"],
    blogs: ["Silicon Valley Product Group (SVPG)", "Product Talk by Teresa Torres"],
    freeResources: ["Product School Free Certification Resources", "Aki's Product Management Syllabus"],
    paidResources: ["Reforge Product Management Program", "Product School Certifications"]
  },
  "technical-writing": {
    websites: ["https://www.writethedocs.org", "https://developers.google.com/tech-writing"],
    documentation: ["https://developers.google.com/tech-writing/one", "https://developers.google.com/tech-writing/two"],
    youtube: ["Google Technical Writing", "Write the Docs Playlists", "Amruta Ranade"],
    books: ["The Product is Docs by Write the Docs", "Technical Writing for Dummies by Sheryl Lindsell-Roberts"],
    practicePlatforms: ["Google Tech Writing Class Tasks", "Markdown Tutorial Practice Platforms"],
    githubRepos: ["https://github.com/Kavex/technical-writing-resources", "https://github.com/jwasham/awesome-tech-writing"],
    blogs: ["I'd Rather Be Writing by Tom Johnson", "Write the Docs Blog"],
    freeResources: ["Google Technical Writing Courses", "Microsoft Style Guide for Technical Publications"],
    paidResources: ["Society for Technical Communication (STC) Classes", "Udemy Technical Writing Courses"]
  }
};
