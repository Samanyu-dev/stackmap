export interface ProjectStep {
  task: string;
  resources: { name: string; url: string }[];
  expectedOutput: string;
  debuggingTips: string;
}

export interface ProjectRoadmapData {
  slug: string;
  title: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  duration: string;
  techStack: string[];
  prerequisites: string[];
  steps: ProjectStep[];
  roadmapSteps: ProjectStep[]; // for new schema compliance
  outcomes: string[];
  readmeChecklist: string[];
  deploymentGuide: string[];
  resumeBullets: string[];
  interviewPoints: string[]; // for UI backwards compatibility
  interviewTalkingPoints: string[]; // for new schema compliance
}

export const projectRoadmaps: Record<string, ProjectRoadmapData> = {
  // === BEGINNER PROJECTS ===
  "portfolio-website": {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "Make a high-performance, beautiful portfolio site showcasing your projects, bio, and resume download buttons.",
    difficulty: "BEGINNER",
    duration: "3-5 Days",
    techStack: ["HTML5", "Tailwind CSS", "JavaScript", "GSAP", "GitHub Pages"],
    prerequisites: ["CSS Grid & Flexbox", "Semantic HTML"],
    steps: [
      {
        task: "Semantic Layouts Structure",
        resources: [{ name: "Layout grids (MDN)", url: "https://developer.mozilla.org" }],
        expectedOutput: "Responsive grids displaying profile layouts.",
        debuggingTips: "Keep margins balanced. Check page scores on Lighthouse."
      },
      {
        task: "GSAP Animation Timelines",
        resources: [{ name: "GSAP Getting Started", url: "https://gsap.com/resources/get-started/" }],
        expectedOutput: "Smooth fade-in effects on page loading and scroll reveal animations.",
        debuggingTips: "Ensure GSAP scrollTrigger triggers are unmounted or clean up event listeners to avoid leaks."
      }
    ],
    roadmapSteps: [
      {
        task: "Semantic Layouts Structure",
        resources: [{ name: "Layout grids (MDN)", url: "https://developer.mozilla.org" }],
        expectedOutput: "Responsive grids displaying profile layouts.",
        debuggingTips: "Keep margins balanced. Check page scores on Lighthouse."
      },
      {
        task: "GSAP Animation Timelines",
        resources: [{ name: "GSAP Getting Started", url: "https://gsap.com/resources/get-started/" }],
        expectedOutput: "Smooth fade-in effects on page loading and scroll reveal animations.",
        debuggingTips: "Ensure GSAP scrollTrigger triggers are unmounted or clean up event listeners to avoid leaks."
      }
    ],
    outcomes: ["Semantic layout design", "CSS animation triggers", "Github deployment"],
    readmeChecklist: ["Add performance Lighthouse screenshots", "Include screenshots of responsive layouts"],
    deploymentGuide: [
      "Deploy directly to GitHub Pages using git hooks.",
      "Optionally configure a custom domain using CNAME records."
    ],
    resumeBullets: [
      "Engineered a semantic developer portfolio achieving a 98% Lighthouse performance rating.",
      "Leveraged GSAP animations to create interactive user interactions, improving page-session durations by 12%."
    ],
    interviewPoints: [
      "Explain semantic elements impact on SEO rankings.",
      "How to avoid animation lag by offloading styles processing to the GPU using transform properties."
    ],
    interviewTalkingPoints: [
      "Explain semantic elements impact on SEO rankings.",
      "How to avoid animation lag by offloading styles processing to the GPU using transform properties."
    ]
  },
  
  // === SYSTEMS & SYSTEMS CLIENTS (NON-WEB INTERMEDIATE / ADVANCED) ===
  "shell-cli": {
    slug: "shell-cli",
    title: "Custom Linux Shell CLI",
    description: "Write your own functional POSIX shell CLI tool (like bash or zsh) that executes terminal commands, supports pipes, redirect streams, and maintains command histories.",
    difficulty: "INTERMEDIATE",
    duration: "1-2 Weeks",
    techStack: ["C / C++", "POSIX API", "Make / CMake", "Linux System Calls"],
    prerequisites: ["Pointers & Process Memory", "Linux OS Process Spawning (fork, exec)"],
    steps: [
      {
        task: "REPL Loop & Command Parser",
        resources: [{ name: "Writing a simple shell", url: "https://brennan.io/write-shell-c/" }],
        expectedOutput: "A console prompt that reads input strings, splits arguments by whitespaces, and exits on 'exit'.",
        debuggingTips: "Beware of buffer overflows. Strip trailing line endings ('\\n') from input read streams."
      },
      {
        task: "Process Spawning & Execution",
        resources: [{ name: "fork() and execvp() man pages", url: "https://man7.org/linux/man-pages/man2/fork.2.html" }],
        expectedOutput: "Spawns child processes executing core binaries (like ls, pwd, cat) returning focus back to shell loop.",
        debuggingTips: "Remember to wait() on child processes so you do not create orphaned or zombie processes."
      },
      {
        task: "Pipes and Stream Redirection",
        resources: [{ name: "dup2() and pipe() man pages", url: "https://man7.org/linux/man-pages/man2/pipe.2.html" }],
        expectedOutput: "Connects stdout of one process to stdin of another (e.g. cat file.txt | grep text), or redirects to files (ls > out.txt).",
        debuggingTips: "Close unused read/write ends of pipes in parent and child processes to avoid hanging stdin descriptors."
      }
    ],
    roadmapSteps: [
      {
        task: "REPL Loop & Command Parser",
        resources: [{ name: "Writing a simple shell", url: "https://brennan.io/write-shell-c/" }],
        expectedOutput: "A console prompt that reads input strings, splits arguments by whitespaces, and exits on 'exit'.",
        debuggingTips: "Beware of buffer overflows. Strip trailing line endings ('\\n') from input read streams."
      },
      {
        task: "Process Spawning & Execution",
        resources: [{ name: "fork() and execvp() man pages", url: "https://man7.org/linux/man-pages/man2/fork.2.html" }],
        expectedOutput: "Spawns child processes executing core binaries (like ls, pwd, cat) returning focus back to shell loop.",
        debuggingTips: "Remember to wait() on child processes so you do not create orphaned or zombie processes."
      },
      {
        task: "Pipes and Stream Redirection",
        resources: [{ name: "dup2() and pipe() man pages", url: "https://man7.org/linux/man-pages/man2/pipe.2.html" }],
        expectedOutput: "Connects stdout of one process to stdin of another (e.g. cat file.txt | grep text), or redirects to files (ls > out.txt).",
        debuggingTips: "Close unused read/write ends of pipes in parent and child processes to avoid hanging stdin descriptors."
      }
    ],
    outcomes: ["POSIX systems programming", "Process lifecycle control (fork, exec, wait)", "Descriptor duplicates redirection (dup2)"],
    readmeChecklist: ["Provide building scripts using CMake", "Document supported shell operators (|, >, <, &)"],
    deploymentGuide: ["Compile on standard GCC toolchains. Install binary globally in /usr/local/bin to use natively."],
    resumeBullets: [
      "Engineered a custom POSIX-compliant shell CLI in C, managing process lifecycles via fork, execvp, and wait system calls.",
      "Implemented standard I/O redirection and piping using file descriptor manipulation (dup2, pipe), lowering pipeline memory overhead."
    ],
    interviewPoints: [
      "Explain the difference between execve, execvp, and execl.",
      "What is a zombie process and how does waitpid prevent it?"
    ],
    interviewTalkingPoints: [
      "Explain the difference between execve, execvp, and execl.",
      "What is a zombie process and how does waitpid prevent it?"
    ]
  },
  "cryptography-vault": {
    slug: "cryptography-vault",
    title: "Secure Local Password Vault CLI",
    description: "Build a secure CLI manager that encrypts credentials locally using AES-256-GCM, deriving keys securely from a master password.",
    difficulty: "INTERMEDIATE",
    duration: "1 Week",
    techStack: ["Go / Rust", "AES-256-GCM", "PBKDF2 / Argon2id", "JSON Database"],
    prerequisites: ["Basic Cryptography (Symmetric Encryption)", "File I/O"],
    steps: [
      {
        task: "Key Derivation from Master Key",
        resources: [{ name: "Argon2 key derivation guide", url: "https://en.wikipedia.org/wiki/Argon2" }],
        expectedOutput: "Master password hashed and expanded to a secure 32-byte cryptographic key.",
        debuggingTips: "Always use random salt. Never hardcode salts or iteration parameters inside credentials vault files."
      },
      {
        task: "AES-256-GCM File Encryption",
        resources: [{ name: "Symmetric Encryption man pages", url: "https://man7.org/linux/man-pages/" }],
        expectedOutput: "JSON database file securely encrypted when saved and decrypted when read by the CLI.",
        debuggingTips: "Always generate a unique Initialization Vector (IV/Nonce) for each encryption cycle to prevent replay attacks."
      }
    ],
    roadmapSteps: [
      {
        task: "Key Derivation from Master Key",
        resources: [{ name: "Argon2 key derivation guide", url: "https://en.wikipedia.org/wiki/Argon2" }],
        expectedOutput: "Master password hashed and expanded to a secure 32-byte cryptographic key.",
        debuggingTips: "Always use random salt. Never hardcode salts or iteration parameters inside credentials vault files."
      },
      {
        task: "AES-256-GCM File Encryption",
        resources: [{ name: "Symmetric Encryption man pages", url: "https://man7.org/linux/man-pages/" }],
        expectedOutput: "JSON database file securely encrypted when saved and decrypted when read by the CLI.",
        debuggingTips: "Always generate a unique Initialization Vector (IV/Nonce) for each encryption cycle to prevent replay attacks."
      }
    ],
    outcomes: ["Cryptographic key derivations (Argon2id)", "AES-GCM Authenticated Encryption", "Secure memory cleaning"],
    readmeChecklist: ["Document vault file schemas", "Detail key derivation parameters used"],
    deploymentGuide: ["Build static binary using cargo or go build, and distribute via homebrew tap or binary files."],
    resumeBullets: [
      "Engineered an offline credential manager in Rust utilizing AES-256-GCM symmetric encryption for data vaults safety.",
      "Implemented PBKDF2/Argon2id key derivation functions with random salts, preventing brute-force attack vectors."
    ],
    interviewPoints: [
      "Why is AES-GCM preferred over AES-CBC or AES-ECB modes?",
      "Explain key derivation functions (KDF) purpose."
    ],
    interviewTalkingPoints: [
      "Why is AES-GCM preferred over AES-CBC or AES-ECB modes?",
      "Explain key derivation functions (KDF) purpose."
    ]
  },
  "compiler-interpreter": {
    slug: "compiler-interpreter",
    title: "Lisp Compiler & VM Interpreter",
    description: "Write an interpreter or compiler from scratch for a subset of Lisp/Scheme, building your own parser, AST tree, and virtual machine execution environment.",
    difficulty: "ADVANCED",
    duration: "3-4 Weeks",
    techStack: ["Rust / Go", "Abstract Syntax Trees (AST)", "Context-Free Grammars", "Virtual Machine"],
    prerequisites: ["Tree Data Structures", "Recursive Descent Parsing"],
    steps: [
      {
        task: "Tokenizing & Lexer",
        resources: [{ name: "Crafting Interpreters (Lexing)", url: "https://craftinginterpreters.com/scanning.html" }],
        expectedOutput: "Translates raw code string into structured stream of tokens with line/col positions.",
        debuggingTips: "Handle string escape tokens and multi-line comment scopes correctly to prevent loop hangs."
      },
      {
        task: "Recursive Descent AST Parser",
        resources: [{ name: "AST parsing guide", url: "https://craftinginterpreters.com/parsing.html" }],
        expectedOutput: "Parses tokens into an Abstract Syntax Tree (AST) checking semantic syntax correctness.",
        debuggingTips: "Define clear precedence rules for arithmetic operator nodes to keep equations aligned."
      },
      {
        task: "Bytecode VM Compiler & Runner",
        resources: [{ name: "Stack-based VM design", url: "https://craftinginterpreters.com/a-bytecode-virtual-machine.html" }],
        expectedOutput: "AST compiled to a custom bytecode format and executed in your own stack-based virtual machine.",
        debuggingTips: "Trace variables allocation stacks carefully to avoid stack overflow or memory leaks."
      }
    ],
    roadmapSteps: [
      {
        task: "Tokenizing & Lexer",
        resources: [{ name: "Crafting Interpreters (Lexing)", url: "https://craftinginterpreters.com/scanning.html" }],
        expectedOutput: "Translates raw code string into structured stream of tokens with line/col positions.",
        debuggingTips: "Handle string escape tokens and multi-line comment scopes correctly to prevent loop hangs."
      },
      {
        task: "Recursive Descent AST Parser",
        resources: [{ name: "AST parsing guide", url: "https://craftinginterpreters.com/parsing.html" }],
        expectedOutput: "Parses tokens into an Abstract Syntax Tree (AST) checking semantic syntax correctness.",
        debuggingTips: "Define clear precedence rules for arithmetic operator nodes to keep equations aligned."
      },
      {
        task: "Bytecode VM Compiler & Runner",
        resources: [{ name: "Stack-based VM design", url: "https://craftinginterpreters.com/a-bytecode-virtual-machine.html" }],
        expectedOutput: "AST compiled to a custom bytecode format and executed in your own stack-based virtual machine.",
        debuggingTips: "Trace variables allocation stacks carefully to avoid stack overflow or memory leaks."
      }
    ],
    outcomes: ["Compiler scanner design", "Semantic analysis and parsing", "Virtual Machine bytecode instruction sets"],
    readmeChecklist: ["Document BNF grammar guidelines", "Provide example scripts that execute correctly in VM"],
    deploymentGuide: ["Compile to binary and upload as a CLI interpreter tool on GitHub Release pipelines."],
    resumeBullets: [
      "Built a stack-based Virtual Machine bytecode compiler and interpreter from scratch in Rust, processing custom AST structures.",
      "Implemented a recursive descent compiler scanner resolving arithmetic precedence and variables scoping variables."
    ],
    interviewPoints: [
      "Explain the difference between tree-walk interpreters and bytecode virtual machines.",
      "What is stack overflow and stack underflow inside a virtual machine executor?"
    ],
    interviewTalkingPoints: [
      "Explain the difference between tree-walk interpreters and bytecode virtual machines.",
      "What is stack overflow and stack underflow inside a virtual machine executor?"
    ]
  },
  "bittorrent-client": {
    slug: "bittorrent-client",
    title: "Concurrent BitTorrent Client CLI",
    description: "Write a high-performance BitTorrent client in Go/Rust parsing torrent files, contacting trackers, and downloading chunks concurrently.",
    difficulty: "ADVANCED",
    duration: "3-4 Weeks",
    techStack: ["Go / Rust", "TCP / UDP Sockets", "Bencode Parser", "Concurrencies (Goroutines/Tokio)"],
    prerequisites: ["TCP/IP Sockets", "Async Concurrency model"],
    steps: [
      {
        task: "Bencode Format Parser",
        resources: [{ name: "BitTorrent Protocol specification", url: "http://www.bittorrent.org/beps/bep_0003.html" }],
        expectedOutput: "Successfully parses `.torrent` file returning trackers announce URLs, file lengths, and SHA-1 chunk hashes.",
        debuggingTips: "Be careful parsing binary string hash bytes in Bencode lists since they do not match standard UTF-8 encodings."
      },
      {
        task: "UDP Tracker Handshake",
        resources: [{ name: "UDP Tracker protocol specification", url: "http://www.bittorrent.org/beps/bep_0015.html" }],
        expectedOutput: "Connection packet queries tracker URL returning list of active peer IP addresses and port bindings.",
        debuggingTips: "Be ready to retry connection packets on packet loss. Implement backoff retry scales."
      },
      {
        task: "Concurrent TCP Peer Engine",
        resources: [{ name: "Peer wire protocols", url: "http://www.bittorrent.org/beps/bep_0003.html" }],
        expectedOutput: "CLI connecting to 10+ peers concurrently over TCP, downloading blocks, checking SHA-1, and assembling final file.",
        debuggingTips: "Synchronize download blocks map updates using thread-safe structures to prevent corruption."
      }
    ],
    roadmapSteps: [
      {
        task: "Bencode Format Parser",
        resources: [{ name: "BitTorrent Protocol specification", url: "http://www.bittorrent.org/beps/bep_0003.html" }],
        expectedOutput: "Successfully parses `.torrent` file returning trackers announce URLs, file lengths, and SHA-1 chunk hashes.",
        debuggingTips: "Be careful parsing binary string hash bytes in Bencode lists since they do not match standard UTF-8 encodings."
      },
      {
        task: "UDP Tracker Handshake",
        resources: [{ name: "UDP Tracker protocol specification", url: "http://www.bittorrent.org/beps/bep_0015.html" }],
        expectedOutput: "Connection packet queries tracker URL returning list of active peer IP addresses and port bindings.",
        debuggingTips: "Be ready to retry connection packets on packet loss. Implement backoff retry scales."
      },
      {
        task: "Concurrent TCP Peer Engine",
        resources: [{ name: "Peer wire protocols", url: "http://www.bittorrent.org/beps/bep_0003.html" }],
        expectedOutput: "CLI connecting to 10+ peers concurrently over TCP, downloading blocks, checking SHA-1, and assembling final file.",
        debuggingTips: "Synchronize download blocks map updates using thread-safe structures to prevent corruption."
      }
    ],
    outcomes: ["Binary Bencode decoding", "Concurrencies orchestration", "TCP socket stream handlers"],
    readmeChecklist: ["Detail concurrent workers architecture", "Provide speed download metrics in CLI logs"],
    deploymentGuide: ["Distribute as statically compiled CLI executable tool."],
    resumeBullets: [
      "Developed a multi-threaded BitTorrent client in Go orchestrating TCP connections to peer nodes concurrently via Goroutines.",
      "Created binary Bencode decoders verifying block downloads using SHA-1 hashing, ensuring zero file corruption."
    ],
    interviewPoints: [
      "How does peer exchange (PEX) and DHT locate peers without trackers?",
      "How to avoid deadlock bugs when multiple threads coordinate block download updates."
    ],
    interviewTalkingPoints: [
      "How does peer exchange (PEX) and DHT locate peers without trackers?",
      "How to avoid deadlock bugs when multiple threads coordinate block download updates."
    ]
  },
  "database-engine": {
    slug: "database-engine",
    title: "B-Tree Relational Storage Engine",
    description: "Write an ACID-compliant SQL storage engine from scratch implementing custom binary formats, index caches, and table schema rules.",
    difficulty: "ADVANCED",
    duration: "4 Weeks",
    techStack: ["C++ / Rust", "B-Trees / B+ Trees", "ACID File Logs (WAL)", "Virtual Page cache"],
    prerequisites: ["Advanced Tree Data structures", "Low-level File I/O"],
    steps: [
      {
        task: "Disk Page Manager & Serialization",
        resources: [{ name: "Database Internals (Pages)", url: "https://www.oreilly.com/library/view/database-internals/9781492051398/" }],
        expectedOutput: "A page manager caching 4096-byte memory buffers, writing page files cleanly to disk.",
        debuggingTips: "Ensure correct endianness mapping when serializing integer markers to disk files."
      },
      {
        task: "B+ Tree Index Implementation",
        resources: [{ name: "B+ Tree index rules", url: "https://en.wikipedia.org/wiki/B%2B_tree" }],
        expectedOutput: "Nodes split, merge, and locate key offsets on binary pages.",
        debuggingTips: "Verify key leaf nodes splits pointers are linked correctly to support range queries."
      },
      {
        task: "Write-Ahead Logging (WAL) Recovery",
        resources: [{ name: "Write-Ahead Logging (WAL) internals", url: "https://en.wikipedia.org/wiki/Write-ahead_logging" }],
        expectedOutput: "Transactions committed to logs first; database state recovered from logs on simulated crashes.",
        debuggingTips: "Run fsync() on log files immediately during transaction commits to guarantee durability bounds."
      }
    ],
    roadmapSteps: [
      {
        task: "Disk Page Manager & Serialization",
        resources: [{ name: "Database Internals (Pages)", url: "https://www.oreilly.com/library/view/database-internals/9781492051398/" }],
        expectedOutput: "A page manager caching 4096-byte memory buffers, writing page files cleanly to disk.",
        debuggingTips: "Ensure correct endianness mapping when serializing integer markers to disk files."
      },
      {
        task: "B+ Tree Index Implementation",
        resources: [{ name: "B+ Tree index rules", url: "https://en.wikipedia.org/wiki/B%2B_tree" }],
        expectedOutput: "Nodes split, merge, and locate key offsets on binary pages.",
        debuggingTips: "Verify key leaf nodes splits pointers are linked correctly to support range queries."
      },
      {
        task: "Write-Ahead Logging (WAL) Recovery",
        resources: [{ name: "Write-Ahead Logging (WAL) internals", url: "https://en.wikipedia.org/wiki/Write-ahead_logging" }],
        expectedOutput: "Transactions committed to logs first; database state recovered from logs on simulated crashes.",
        debuggingTips: "Run fsync() on log files immediately during transaction commits to guarantee durability bounds."
      }
    ],
    outcomes: ["B+ Tree index searching", "Disk buffer page caching", "ACID transactions logging (WAL)"],
    readmeChecklist: ["Document B-Tree page schemas", "Detail performance benchmarks queries per second"],
    deploymentGuide: ["Distribute as an embedded C++ library or CLI database manager tool."],
    resumeBullets: [
      "Architected an ACID-compliant database storage engine in C++ executing indexing queries on B+ Trees.",
      "Engineered a write-ahead logging (WAL) crash recovery engine, guaranteeing data durability bounds."
    ],
    interviewPoints: [
      "Explain why B+ Trees are preferred over Binary Search Trees or Hash Tables for disk databases.",
      "How does page eviction (LRU) manage disk buffer pools constraints?"
    ],
    interviewTalkingPoints: [
      "Explain why B+ Trees are preferred over Binary Search Trees or Hash Tables for disk databases.",
      "How does page eviction (LRU) manage disk buffer pools constraints?"
    ]
  },
  "raytracer-engine": {
    slug: "raytracer-engine",
    title: "3D Ray Tracer Graphics Engine",
    description: "Write a high-performance 3D Ray Tracer rendering scene spheres, reflections, shadows, and light refraction vectors.",
    difficulty: "ADVANCED",
    duration: "2-3 Weeks",
    techStack: ["C++ / Rust / CUDA", "PPM Image output", "Vector Mathematics", "Linear Algebra"],
    prerequisites: ["Linear Algebra (Matrix operations)", "Physics of Light"],
    steps: [
      {
        task: "Camera Projection Vectors",
        resources: [{ name: "Ray Tracing in One Weekend", url: "https://raytracing.github.io/books/RayTracingInOneWeekend.html" }],
        expectedOutput: "Generates a PPM image of a gradient sky backdrop using coordinates mapping.",
        debuggingTips: "Validate normal vectors calculations. Keep coordinates systems matching camera directions."
      },
      {
        task: "Spheres Collision & Diffuse Materials",
        resources: [{ name: "Ray Tracing Sphere Intersections", url: "https://raytracing.github.io" }],
        expectedOutput: "Renders solid 3D spheres on screen with soft ambient shadows and light bounce diffusions.",
        debuggingTips: "Verify quadratic formula roots calculations to prevent visual edge clipping errors."
      },
      {
        task: "Reflection & Refraction (Glass/Metal)",
        resources: [{ name: "Snell's Law and Fresnel reflection equations", url: "https://wikipedia.org" }],
        expectedOutput: "Glass spheres refracting background views, and metallic spheres reflecting surrounding elements.",
        debuggingTips: "Clamp reflection counts (e.g. max depth 50) to prevent infinite loop recursive stack crashes."
      }
    ],
    roadmapSteps: [
      {
        task: "Camera Projection Vectors",
        resources: [{ name: "Ray Tracing in One Weekend", url: "https://raytracing.github.io/books/RayTracingInOneWeekend.html" }],
        expectedOutput: "Generates a PPM image of a gradient sky backdrop using coordinates mapping.",
        debuggingTips: "Validate normal vectors calculations. Keep coordinates systems matching camera directions."
      },
      {
        task: "Spheres Collision & Diffuse Materials",
        resources: [{ name: "Ray Tracing Sphere Intersections", url: "https://raytracing.github.io" }],
        expectedOutput: "Renders solid 3D spheres on screen with soft ambient shadows and light bounce diffusions.",
        debuggingTips: "Verify quadratic formula roots calculations to prevent visual edge clipping errors."
      },
      {
        task: "Reflection & Refraction (Glass/Metal)",
        resources: [{ name: "Snell's Law and Fresnel reflection equations", url: "https://wikipedia.org" }],
        expectedOutput: "Glass spheres refracting background views, and metallic spheres reflecting surrounding elements.",
        debuggingTips: "Clamp reflection counts (e.g. max depth 50) to prevent infinite loop recursive stack crashes."
      }
    ],
    outcomes: ["Geometric ray calculations", "Refractive glass physics", "Material diffuse shading patterns"],
    readmeChecklist: ["Provide rendered output image files", "List rendering speed optimization benchmarks"],
    deploymentGuide: ["Distribute compiled CLI utility. Integrate output images generation scripts."],
    resumeBullets: [
      "Developed a CPU ray tracing engine in C++ executing vector physics rendering reflections and refractions.",
      "Optimized rendering rendering rates by 40% through parallel chunk loops using OpenMP."
    ],
    interviewPoints: [
      "Explain Snell's law role in glass refractions.",
      "How do Bounding Volume Hierarchies (BVH) speed up triangle rendering intersection checks?"
    ],
    interviewTalkingPoints: [
      "Explain Snell's law role in glass refractions.",
      "How do Bounding Volume Hierarchies (BVH) speed up triangle rendering intersection checks?"
    ]
  }
};
