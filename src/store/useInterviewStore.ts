import { create } from "zustand";

// --- Normal CDF Approximation for Z-score percentiles ---
function normalCDF(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z >= 0 ? 1 - p : p;
}

// --- Interfaces ---
export interface Job {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  weightConfig: {
    jdMatch: number;      // default: 25
    github: number;       // default: 20
    coding: number;       // default: 20
    logical: number;      // default: 10
    project: number;      // default: 10
    research: number;     // default: 5
    cgpa: number;         // default: 10
  };
}

export type PipelineStage =
  | "UPLOADED"
  | "RESUME_PROCESSED"
  | "EVALUATING"
  | "EVALUATED"
  | "RANKED"
  | "TEST_SENT"
  | "TEST_COMPLETED"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "ERROR";

export interface Candidate {
  id: string;
  jobId: string;
  name: string;
  email: string;
  college: string;
  cgpa: number;
  resumeText: string;
  githubUrl?: string;
  pipelineStage: PipelineStage;
  statusMessage: string;
  testResults?: {
    testLa: number; // Logical Aptitude (0-100)
    testCode: number; // Coding (0-100)
  };
  jitsiLink?: string;
  calendarEventId?: string;
  scheduledTime?: string;
}

export interface GithubRepo {
  name: string;
  stars: number;
  forks: number;
  daysSinceUpdate: number;
  impactScore: number;
  primaryLanguage: string;
  isFork?: boolean;
}

export interface Evaluation {
  candidateId: string;
  jobId: string;
  technicalDepth: number;         // 0-100
  technicalDepthJustification: string;
  projectComplexity: number;      // 0-100
  projectComplexityJustification: string;
  researchQuality: number;         // 0-100
  researchQualityJustification: string;
  jdAlignment: number;             // 0-100
  jdAlignmentJustification: string;
  githubImpactScore: number;      // absolute total
  githubRepos: GithubRepo[];
  githubLanguages: Record<string, number>;
  semanticJdMatch: number;        // 0-100
  combinedJdScore: number;        // 0-100
  overallAssessment: string;
  strengths: string[];
  concerns: string[];
}

export interface DimensionScore {
  raw: number;
  normalized: number; // 0-100 percentile
  weighted: number;
}

export interface CandidateScore {
  candidateId: string;
  jobId: string;
  compositeScore: number; // 0-100
  rank: number;
  breakdown: {
    jdMatch: DimensionScore;
    github: DimensionScore;
    coding: DimensionScore;
    logical: DimensionScore;
    project: DimensionScore;
    research: DimensionScore;
    cgpa: DimensionScore;
  };
}

export interface InterviewQuestion {
  text: string;
  category: string;
}

export interface TranscriptEntry {
  role: "ai" | "candidate";
  text: string;
  timestamp: string;
}

export interface MockSession {
  candidateId: string;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  transcript: TranscriptEntry[];
  status: "NOT_STARTED" | "INTRO" | "ASKING" | "LISTENING" | "COMPLETED";
}

export interface MockFeedback {
  candidateId: string;
  totalScore: number; // 0-100
  categories: {
    communication: number; // 0-100
    technical: number; // 0-100
    problemSolving: number; // 0-100
    culturalFit: number; // 0-100
    confidence: number; // 0-100
  };
  justifications: {
    communication: string;
    technical: string;
    problemSolving: string;
    culturalFit: string;
    confidence: string;
  };
  strengths: string[];
  improvements: string[];
  suggestions: string[];
}

// --- Store Interface ---
interface InterviewState {
  jobs: Job[];
  candidates: Candidate[];
  evaluations: Record<string, Evaluation>; // candidateId -> Evaluation
  scores: Record<string, CandidateScore>; // candidateId -> CandidateScore
  mockSessions: Record<string, MockSession>; // candidateId -> MockSession
  mockFeedback: Record<string, MockFeedback>; // candidateId -> MockFeedback
  isHydrated: boolean;

  // Actions
  initialize: () => void;
  addJob: (job: Job) => void;
  updateJobWeights: (jobId: string, weights: Job["weightConfig"]) => void;
  deleteJob: (jobId: string) => void;
  addCandidates: (jobId: string, candidateList: Omit<Candidate, "id" | "pipelineStage" | "statusMessage">[]) => void;
  updateCandidateStage: (candidateId: string, stage: PipelineStage, statusMessage: string) => void;
  triggerEvaluation: (candidateId: string) => Promise<void>;
  triggerBulkEvaluation: (jobId: string) => Promise<void>;
  computeRankings: (jobId: string) => void;
  sendTestLinks: (candidateIds: string[]) => Promise<void>;
  uploadTestResults: (jobId: string, results: { name: string; testLa: number; testCode: number }[]) => void;
  scheduleInterview: (candidateId: string, time: string) => void;
  
  // Voice Mock Interview Actions
  startInterviewSession: (candidateId: string) => void;
  submitCandidateAnswer: (candidateId: string, text: string) => Promise<void>;
  completeInterviewSession: (candidateId: string) => void;
}

// --- Default Data for Neo-Cosmic Brutalism Demo ---
const DEFAULT_JOBS: Job[] = [
  {
    id: "job-ai-systems",
    title: "AI & Distributed Systems Architect",
    description: "Looking for an engineer to architect low-latency LLM inference caching networks, multi-model fallback middleware, and vector retrieval pipelines. Candidate should have familiarity with Rust, Go, Python, PyTorch, CUDA operations, and custom KV-caching. Experience in publishing research on distributed training, deep learning optimization, or GPU kernels is highly valued. Deep understanding of distributed transactions and consistency models is required.",
    createdAt: "2026-06-01T08:00:00Z",
    weightConfig: {
      jdMatch: 25,
      github: 20,
      coding: 20,
      logical: 10,
      project: 10,
      research: 5,
      cgpa: 10
    }
  },
  {
    id: "job-fullstack-quantum",
    title: "Lead Full-Stack Web3 Engineer",
    description: "Building next-generation cosmic dashboard portals using Next.js 16, React 19, Tailwind CSS v4, Web3 providers, and Rust-based solana smart contracts. Strong emphasis on UI visual performance, web accessibility (ARIA compliant primitives), state modeling with Zustand/XState, and clean, responsive styling interfaces.",
    createdAt: "2026-06-03T10:00:00Z",
    weightConfig: {
      jdMatch: 30,
      github: 25,
      coding: 20,
      logical: 10,
      project: 10,
      research: 0,
      cgpa: 5
    }
  }
];

const DEFAULT_CANDIDATES: Candidate[] = [
  {
    id: "cand-devika",
    jobId: "job-ai-systems",
    name: "Devika Nair",
    email: "devika@stackmap.dev",
    college: "Indian Institute of Technology, Madras",
    cgpa: 9.4,
    resumeText: "Devika Nair is a senior developer specializing in PyTorch optimization, distributed GPU caching, and CUDA kernel development. Built a custom KV-cache management engine written in Rust that achieves 4.5x higher throughput. Published paper 'Optimizing Distributed Attention Kernels on Heterogeneous GPU Grids' at MLSys. Experienced in Go and Python. Strong mathematical skills, logical aptitude, and 9.4 CGPA.",
    githubUrl: "https://github.com/devika-nair-gpu",
    pipelineStage: "UPLOADED",
    statusMessage: "Candidate profile registered."
  },
  {
    id: "cand-arjun",
    jobId: "job-ai-systems",
    name: "Arjun Mehta",
    email: "arjun@stackmap.dev",
    college: "Birla Institute of Technology and Science, Pilani",
    cgpa: 8.8,
    resumeText: "Arjun Mehta. Passionate about machine learning pipelines and FastAPI backends. Built custom model loaders and LiteLLM wrappers. Developed python wrapper around Groq API to serve LLM prompts. Strong coding experience, with standard GitHub profile containing some popular python helper tools. BITS Pilani graduate with 8.8 CGPA. Looking for a systems role to apply my software engineering skills.",
    githubUrl: "https://github.com/arjunmehta-dev",
    pipelineStage: "UPLOADED",
    statusMessage: "Candidate profile registered."
  },
  {
    id: "cand-priya",
    jobId: "job-ai-systems",
    name: "Priya Sharma",
    email: "priya@stackmap.dev",
    college: "Delhi Technological University",
    cgpa: 9.1,
    resumeText: "Priya Sharma. Worked on Web3 frontends, SVG charting tools, and React-native apps. Extensive projects built using Next.js, Vite, and tailwind. Familiar with basic Python and AI model APIs, but focus is mostly front-end visual widgets and web application flow. DTU graduate with 9.1 CGPA. Eager to explore AI & Systems modeling, but primary experience is Web development and dashboard rendering.",
    githubUrl: "https://github.com/priyasharma-web",
    pipelineStage: "UPLOADED",
    statusMessage: "Candidate profile registered."
  },
  {
    id: "cand-rohan",
    jobId: "job-ai-systems",
    name: "Rohan Das",
    email: "rohan@stackmap.dev",
    college: "Vellore Institute of Technology, Vellore",
    cgpa: 7.9,
    resumeText: "Rohan Das. Fullstack system helper. Built basic database web applications in Django and Express. Experience in JavaScript and C++ coding challenges. Basic project repository showing simple web scraping scripts and database CRUD configurations. VIT graduate, 7.9 CGPA.",
    githubUrl: "https://github.com/rohan-das-99",
    pipelineStage: "UPLOADED",
    statusMessage: "Candidate profile registered."
  },
  {
    id: "cand-sneha",
    jobId: "job-ai-systems",
    name: "Sneha Patel",
    email: "sneha@stackmap.dev",
    college: "Indian Institute of Science, Bangalore",
    cgpa: 9.6,
    resumeText: "Sneha Patel is an AI Researcher at IISc. Published 'Low-Rank Adaptation Mechanics for Extreme Scale Attention Heads' at NeurIPS. Designed theoretical math backing memory-efficient training loops. Built custom tensor compilers in Rust. Exceptional research credentials and 9.6 CGPA. Very high logical aptitude but lesser production software experience (mostly academic scripts and prototype repos).",
    githubUrl: "https://github.com/sneha-patel-research",
    pipelineStage: "UPLOADED",
    statusMessage: "Candidate profile registered."
  }
];

// Seed evaluations
const DEFAULT_EVALUATIONS: Record<string, Evaluation> = {
  "cand-devika": {
    candidateId: "cand-devika",
    jobId: "job-ai-systems",
    technicalDepth: 95,
    technicalDepthJustification: "Exceptional knowledge of GPU kernels, custom memory layouts, CUDA programming, and high-performance Rust compiler design.",
    projectComplexity: 92,
    projectComplexityJustification: "Designed and built a custom KV-cache engine in Rust, demonstrating a rare capability of understanding low-level mechanics of attention architectures.",
    researchQuality: 88,
    researchQualityJustification: "Published a MLSys paper specifically addressing attention optimization on heterogeneous GPU environments.",
    jdAlignment: 94,
    jdAlignmentJustification: "Almost a perfect fit for the AI & Distributed Systems Architect description, matching the KV-caching and distributed training optimization needs.",
    githubImpactScore: 68.4,
    githubRepos: [
      { name: "rust-kv-cache", stars: 120, forks: 45, daysSinceUpdate: 5, impactScore: 208.0, primaryLanguage: "Rust" },
      { name: "cuda-attention-kernels", stars: 85, forks: 20, daysSinceUpdate: 15, impactScore: 121.2, primaryLanguage: "C++" },
      { name: "pytorch-dist-trainer", stars: 40, forks: 8, daysSinceUpdate: 42, impactScore: 51.5, primaryLanguage: "Python" }
    ],
    githubLanguages: { "Rust": 55, "C++": 25, "Python": 20 },
    semanticJdMatch: 92,
    combinedJdScore: 93,
    overallAssessment: "Strongly recommended system engineer with high academic credibility, impressive low-level coding skills, and published research. Perfect fit for deep tech scaling.",
    strengths: ["Rust & CUDA kernel development expertise", "Published MLSys research paper", "High CGPA from IIT Madras"],
    concerns: ["Focused on systems, less experienced in web framework orchestration"]
  },
  "cand-arjun": {
    candidateId: "cand-arjun",
    jobId: "job-ai-systems",
    technicalDepth: 78,
    technicalDepthJustification: "Solid understanding of API backend architecture, LiteLLM integrations, and Groq-accelerated pipelines.",
    projectComplexity: 70,
    projectComplexityJustification: "Built wrappers and microservices for LLM API integration. Good practice of routing, but lacks low-level systems writing.",
    researchQuality: 20,
    researchQualityJustification: "No active research papers or mathematical publication footprints detected.",
    jdAlignment: 75,
    jdAlignmentJustification: "Strong fit for Python and FastAPI systems. Lacks GPU kernel optimization and distributed training expertise.",
    githubImpactScore: 28.2,
    githubRepos: [
      { name: "litellm-router", stars: 45, forks: 12, daysSinceUpdate: 12, impactScore: 67.2, primaryLanguage: "Python" },
      { name: "groq-fastapi-service", stars: 15, forks: 4, daysSinceUpdate: 3, impactScore: 22.8, primaryLanguage: "Python" }
    ],
    githubLanguages: { "Python": 100 },
    semanticJdMatch: 76,
    combinedJdScore: 75.5,
    overallAssessment: "Competent Python backend and ML service engineer. Fits roles related to LLM deployment and API architecture, though lacks deep systems optimization skills.",
    strengths: ["FastAPI and LiteLLM experience", "Active recent commits", "Good API engineering fundamentals"],
    concerns: ["No research backing", "Lacks low-level system engineering experience"]
  },
  "cand-priya": {
    candidateId: "cand-priya",
    jobId: "job-ai-systems",
    technicalDepth: 62,
    technicalDepthJustification: "Excellent frontend architecture skills (React 19, CSS transitions, layouts), but weak in GPU execution models, systems architectures, or LLM caching.",
    projectComplexity: 78,
    projectComplexityJustification: "Designed visual chart dashboards and user tools with rich animations, but lacks back-end orchestration or complex databases.",
    researchQuality: 10,
    researchQualityJustification: "No research background.",
    jdAlignment: 45,
    jdAlignmentJustification: "Low alignment with a distributed systems role which prioritizes high-performance backend, PyTorch, and distributed scaling.",
    githubImpactScore: 35.8,
    githubRepos: [
      { name: "cosmic-canvas-charts", stars: 65, forks: 10, daysSinceUpdate: 20, impactScore: 81.6, primaryLanguage: "TypeScript" },
      { name: "react19-brutalist-ui", stars: 32, forks: 6, daysSinceUpdate: 2, impactScore: 43.8, primaryLanguage: "CSS" }
    ],
    githubLanguages: { "TypeScript": 60, "CSS": 30, "HTML": 10 },
    semanticJdMatch: 48,
    combinedJdScore: 46.5,
    overallAssessment: "Strong frontend developer with an eye for detail, but matches very little of the core systems description requirements for the AI & Systems Architect.",
    strengths: ["Exceptional UX / Dashboard design ability", "Clean UI structures", "React 19 & Tailwind competency"],
    concerns: ["No experience in CUDA, PyTorch, or low-level systems"]
  },
  "cand-rohan": {
    candidateId: "cand-rohan",
    jobId: "job-ai-systems",
    technicalDepth: 50,
    technicalDepthJustification: "Familiar with standard web backends (Express, Django) and basic data queries. Struggles with complex distributed systems topics.",
    projectComplexity: 48,
    projectComplexityJustification: "Has built simple CRUD programs, basic web scrapers, and simple student trackers.",
    researchQuality: 5,
    researchQualityJustification: "No research output.",
    jdAlignment: 38,
    jdAlignmentJustification: "Very low alignment. Does not possess specialized experience in deep learning systems, Rust compiler patterns, or GPU profiling.",
    githubImpactScore: 12.4,
    githubRepos: [
      { name: "django-crud-todo", stars: 5, forks: 2, daysSinceUpdate: 100, impactScore: 7.3, primaryLanguage: "Python" },
      { name: "cpp-dsa-practice", stars: 3, forks: 1, daysSinceUpdate: 10, impactScore: 4.9, primaryLanguage: "C++" }
    ],
    githubLanguages: { "Python": 60, "C++": 40 },
    semanticJdMatch: 42,
    combinedJdScore: 40,
    overallAssessment: "Junior engineer with standard CRUD skillset. Will need extensive ramp-up to handle distributed machine learning optimization tasks.",
    strengths: ["Understands basic database setup", "Practices C++ DSA"],
    concerns: ["Lack of advanced backend experience", "No exposure to machine learning architecture"]
  },
  "cand-sneha": {
    candidateId: "cand-sneha",
    jobId: "job-ai-systems",
    technicalDepth: 96,
    technicalDepthJustification: "Profound expertise in deep learning mathematical theories, LoRA techniques, scale compiler nodes, and tensor calculations.",
    projectComplexity: 80,
    projectComplexityJustification: "Built math simulators and research proof-of-concepts, which are theoretically rich, but lack production-level containerization or deployment infrastructure.",
    researchQuality: 98,
    researchQualityJustification: "Exceptional publication record at NeurIPS, focusing on LoRA scaling and memory optimization mechanics.",
    jdAlignment: 88,
    jdAlignmentJustification: "Strong match for the machine learning research and optimizer engineering. Lacks a bit of distributed consensus or infrastructure dev.",
    githubImpactScore: 45.2,
    githubRepos: [
      { name: "lora-scale-attention", stars: 80, forks: 12, daysSinceUpdate: 30, impactScore: 98.2, primaryLanguage: "Python" },
      { name: "tensor-compiler-proto", stars: 35, forks: 8, daysSinceUpdate: 90, impactScore: 42.6, primaryLanguage: "Rust" }
    ],
    githubLanguages: { "Python": 70, "Rust": 30 },
    semanticJdMatch: 85,
    combinedJdScore: 86.5,
    overallAssessment: "Brilliant research mind from IISc with strong NeurIPS publications. Will excel in algorithm optimization and compiler architecture, though might require support for core systems DevOps tasks.",
    strengths: ["NeurIPS publication record", "IISc research pedigree", "High logical aptitude"],
    concerns: ["Mainly focused on academic scripts", "Lacks production backend deployment experience"]
  }
};

// Seed test results
const SEED_TEST_RESULTS = {
  "cand-devika": { testLa: 90, testCode: 95 },
  "cand-arjun": { testLa: 78, testCode: 82 },
  "cand-priya": { testLa: 70, testCode: 65 },
  "cand-rohan": { testLa: 60, testCode: 55 },
  "cand-sneha": { testLa: 98, testCode: 88 }
};

// Seed mock interview sessions
const SEED_MOCK_SESSIONS: Record<string, MockSession> = {
  "cand-devika": {
    candidateId: "cand-devika",
    questions: [
      { text: "Can you explain how your custom KV-cache engine manages GPU memory efficiently?", category: "Technical Depth" },
      { text: "What mathematical challenges did you address in optimizing attention kernels on distributed GPU grids?", category: "Research Quality" },
      { text: "Describe a scenario where you had to debug a lock contention issue in Rust.", category: "Problem Solving" }
    ],
    currentQuestionIndex: 0,
    transcript: [
      { role: "ai", text: "Welcome, Devika. Let's start with your Rust projects. Can you explain how your custom KV-cache engine manages GPU memory efficiently?", timestamp: "11:00 AM" },
      { role: "candidate", text: "Sure! Traditional KV-caches suffer from fragmentation. We built a paging allocator similar to virtual memory tables. This allows us to allocate blocks dynamically without requiring contiguous GPU allocations. We achieved around 4.5x higher token generation throughput.", timestamp: "11:01 AM" }
    ],
    status: "ASKING"
  }
};

// --- Zustand Store Implementation ---
export const useInterviewStore = create<InterviewState>((set, get) => ({
  jobs: DEFAULT_JOBS,
  candidates: DEFAULT_CANDIDATES,
  evaluations: DEFAULT_EVALUATIONS,
  scores: {},
  mockSessions: SEED_MOCK_SESSIONS,
  mockFeedback: {},
  isHydrated: false,

  initialize: () => {
    if (typeof window !== "undefined") {
      const savedJobs = localStorage.getItem("sm_screening_jobs");
      const savedCandidates = localStorage.getItem("sm_screening_candidates");
      const savedEvaluations = localStorage.getItem("sm_screening_evaluations");
      const savedScores = localStorage.getItem("sm_screening_scores");
      const savedSessions = localStorage.getItem("sm_screening_sessions");
      const savedFeedback = localStorage.getItem("sm_screening_feedback");

      set({
        jobs: savedJobs ? JSON.parse(savedJobs) : DEFAULT_JOBS,
        candidates: savedCandidates ? JSON.parse(savedCandidates) : DEFAULT_CANDIDATES,
        evaluations: savedEvaluations ? JSON.parse(savedEvaluations) : DEFAULT_EVALUATIONS,
        scores: savedScores ? JSON.parse(savedScores) : {},
        mockSessions: savedSessions ? JSON.parse(savedSessions) : SEED_MOCK_SESSIONS,
        mockFeedback: savedFeedback ? JSON.parse(savedFeedback) : {},
        isHydrated: true
      });

      // Always perform an initial rank computation if scores are empty
      const currentJobs = get().jobs;
      if (savedScores === null && currentJobs.length > 0) {
        currentJobs.forEach(job => get().computeRankings(job.id));
      }
    }
  },

  addJob: (job) => {
    set((state) => {
      const updated = [...state.jobs, job];
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_jobs", JSON.stringify(updated));
      }
      return { jobs: updated };
    });
    // Immediately calculate empty rankings for the new job
    get().computeRankings(job.id);
  },

  updateJobWeights: (jobId, weights) => {
    set((state) => {
      const updated = state.jobs.map(job => 
        job.id === jobId ? { ...job, weightConfig: weights } : job
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_jobs", JSON.stringify(updated));
      }
      return { jobs: updated };
    });
    // Recalculate rankings based on new weights
    get().computeRankings(jobId);
  },

  deleteJob: (jobId) => {
    set((state) => {
      const updatedJobs = state.jobs.filter(j => j.id !== jobId);
      const updatedCandidates = state.candidates.filter(c => c.jobId !== jobId);
      
      const updatedEvaluations = { ...state.evaluations };
      const updatedScores = { ...state.scores };
      const updatedSessions = { ...state.mockSessions };
      const updatedFeedback = { ...state.mockFeedback };

      state.candidates.forEach(c => {
        if (c.jobId === jobId) {
          delete updatedEvaluations[c.id];
          delete updatedScores[c.id];
          delete updatedSessions[c.id];
          delete updatedFeedback[c.id];
        }
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_jobs", JSON.stringify(updatedJobs));
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updatedCandidates));
        localStorage.setItem("sm_screening_evaluations", JSON.stringify(updatedEvaluations));
        localStorage.setItem("sm_screening_scores", JSON.stringify(updatedScores));
        localStorage.setItem("sm_screening_sessions", JSON.stringify(updatedSessions));
        localStorage.setItem("sm_screening_feedback", JSON.stringify(updatedFeedback));
      }

      return {
        jobs: updatedJobs,
        candidates: updatedCandidates,
        evaluations: updatedEvaluations,
        scores: updatedScores,
        mockSessions: updatedSessions,
        mockFeedback: updatedFeedback
      };
    });
  },

  addCandidates: (jobId, candidateList) => {
    set((state) => {
      const newCandidates = candidateList.map((c, i) => ({
        ...c,
        id: `cand-${Date.now()}-${i}`,
        pipelineStage: "UPLOADED" as const,
        statusMessage: "Candidate profile registered."
      }));

      const updated = [...state.candidates, ...newCandidates];
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updated));
      }
      return { candidates: updated };
    });
  },

  updateCandidateStage: (candidateId, stage, statusMessage) => {
    set((state) => {
      const updated = state.candidates.map(c => 
        c.id === candidateId ? { ...c, pipelineStage: stage, statusMessage } : c
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updated));
      }
      return { candidates: updated };
    });
  },

  triggerEvaluation: async (candidateId) => {
    const candidate = get().candidates.find(c => c.id === candidateId);
    if (!candidate) return;

    // Simulate AI pipeline stages with timeouts
    get().updateCandidateStage(candidateId, "RESUME_PROCESSED", "[1/4] PDF resume processed. Querying embeddings...");
    await new Promise(resolve => setTimeout(resolve, 800));

    get().updateCandidateStage(candidateId, "EVALUATING", "[2/4] Executing semantic alignment to Job Description...");
    await new Promise(resolve => setTimeout(resolve, 800));

    get().updateCandidateStage(candidateId, "EVALUATING", "[3/4] Pulling Github repository history & calculating exponential decay...");
    await new Promise(resolve => setTimeout(resolve, 800));

    get().updateCandidateStage(candidateId, "EVALUATING", "[4/4] Prompting Gemini LLM fallback chain for qualitative grades...");
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock calculations based on resume content keywords
    const text = candidate.resumeText.toLowerCase();
    const hasRust = text.includes("rust") || text.includes("performance");
    const hasGpu = text.includes("gpu") || text.includes("cuda");
    const hasWeb = text.includes("web") || text.includes("react") || text.includes("next.js");
    const hasResearch = text.includes("paper") || text.includes("neurips") || text.includes("mlsys") || text.includes("published");

    let td = 60, pc = 60, rq = 10, jd = 55, sim = 60;
    if (hasRust && hasGpu) {
      td = 92; pc = 90; sim = 90; jd = 93;
    } else if (hasWeb) {
      td = 70; pc = 75; sim = 65; jd = 60;
    }
    if (hasResearch) {
      rq = 85;
      td += 5;
    }

    const mockEvaluation: Evaluation = {
      candidateId,
      jobId: candidate.jobId,
      technicalDepth: Math.min(td, 100),
      technicalDepthJustification: `Synthesized background shows ${hasGpu ? "advanced systems and hardware optimization" : "general software development"} capability.`,
      projectComplexity: pc,
      projectComplexityJustification: `Projects demonstrate ${pc > 80 ? "excellent architectural planning" : "standard app assembly"} skills.`,
      researchQuality: rq,
      researchQualityJustification: hasResearch ? "Identified publications in high-tier AI/Systems domains." : "No research publication footprints found.",
      jdAlignment: jd,
      jdAlignmentJustification: `Resume semantic similarity aligns at ${jd}%.`,
      githubImpactScore: hasGpu ? 55.4 : hasWeb ? 34.2 : 12.0,
      githubRepos: hasGpu ? [
        { name: "custom-cuda-kernels", stars: 45, forks: 15, daysSinceUpdate: 2, impactScore: 150, primaryLanguage: "C++" },
        { name: "perf-rust-sandbox", stars: 22, forks: 6, daysSinceUpdate: 10, impactScore: 75, primaryLanguage: "Rust" }
      ] : [
        { name: "visual-grid-styles", stars: 18, forks: 4, daysSinceUpdate: 4, impactScore: 60, primaryLanguage: "TypeScript" }
      ],
      githubLanguages: hasGpu ? { "C++": 60, "Rust": 40 } : { "TypeScript": 100 },
      semanticJdMatch: sim,
      combinedJdScore: Math.round((sim + jd) / 2),
      overallAssessment: `The candidate demonstrates ${td > 80 ? "high competence" : "intermediate capabilities"} suited for targeted engineering.`,
      strengths: hasGpu ? ["GPU programming", "Low-level structures"] : ["UI visual structures", "JavaScript components"],
      concerns: hasResearch ? [] : ["Needs research background check"]
    };

    set((state) => {
      const updatedEvals = { ...state.evaluations, [candidateId]: mockEvaluation };
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_evaluations", JSON.stringify(updatedEvals));
      }
      return { evaluations: updatedEvals };
    });

    get().updateCandidateStage(candidateId, "EVALUATED", "Evaluation completed successfully.");
    get().computeRankings(candidate.jobId);
  },

  triggerBulkEvaluation: async (jobId) => {
    const jobCandidates = get().candidates.filter(c => c.jobId === jobId);
    for (const c of jobCandidates) {
      await get().triggerEvaluation(c.id);
    }
  },

  computeRankings: (jobId) => {
    const job = get().jobs.find(j => j.id === jobId);
    if (!job) return;

    const jobCandidates = get().candidates.filter(c => c.jobId === jobId);
    const evals = get().evaluations;

    // Filter to candidates who have evaluations completed, plus seeds
    // Standardize metrics: CGPA, Test Logical, Test Coding, Github, JD Match, Project, Research
    // For normalization, we compute Mean & Standard Deviation across all candidates who have scores or are seeded
    const cgpaList = jobCandidates.map(c => c.cgpa);
    
    // Inject seed tests if they aren't manually set yet, to allow instant rankings demo
    jobCandidates.forEach(c => {
      if (!c.testResults && SEED_TEST_RESULTS[c.id as keyof typeof SEED_TEST_RESULTS]) {
        c.testResults = SEED_TEST_RESULTS[c.id as keyof typeof SEED_TEST_RESULTS];
      }
    });

    const codingScores = jobCandidates.map(c => c.testResults?.testCode ?? 0);
    const logicalScores = jobCandidates.map(c => c.testResults?.testLa ?? 0);
    
    const githubScores = jobCandidates.map(c => {
      const evaluation = evals[c.id];
      return evaluation ? evaluation.githubImpactScore : 0;
    });

    const jdScores = jobCandidates.map(c => {
      const evaluation = evals[c.id];
      return evaluation ? evaluation.combinedJdScore : 50; // default average
    });

    const projectScores = jobCandidates.map(c => {
      const evaluation = evals[c.id];
      return evaluation ? evaluation.projectComplexity : 50;
    });

    const researchScores = jobCandidates.map(c => {
      const evaluation = evals[c.id];
      return evaluation ? evaluation.researchQuality : 10;
    });

    // Helper functions for stats
    const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / Math.max(arr.length, 1);
    const stdDev = (arr: number[], m: number) => {
      const variance = arr.reduce((a, b) => a + Math.pow(b - m, 2), 0) / Math.max(arr.length, 1);
      return Math.sqrt(variance) || 1; // avoid division by zero
    };

    const mCgpa = mean(cgpaList), sCgpa = stdDev(cgpaList, mCgpa);
    const mCoding = mean(codingScores), sCoding = stdDev(codingScores, mCoding);
    const mLogical = mean(logicalScores), sLogical = stdDev(logicalScores, mLogical);
    const mGithub = mean(githubScores), sGithub = stdDev(githubScores, mGithub);
    const mJd = mean(jdScores), sJd = stdDev(jdScores, mJd);
    const mProj = mean(projectScores), sProj = stdDev(projectScores, mProj);
    const mRes = mean(researchScores), sRes = stdDev(researchScores, mRes);

    const computedScores: CandidateScore[] = jobCandidates.map(c => {
      const evaluation = evals[c.id];
      const jdRaw = evaluation ? evaluation.combinedJdScore : 50;
      const ghRaw = evaluation ? evaluation.githubImpactScore : 0;
      const codRaw = c.testResults?.testCode ?? 0;
      const logRaw = c.testResults?.testLa ?? 0;
      const projRaw = evaluation ? evaluation.projectComplexity : 50;
      const resRaw = evaluation ? evaluation.researchQuality : 10;
      const cgpaRaw = c.cgpa;

      // Calculate Percentiles
      const zCgpa = (cgpaRaw - mCgpa) / sCgpa;
      const zCoding = (codRaw - mCoding) / sCoding;
      const zLogical = (logRaw - mLogical) / sLogical;
      const zGithub = (ghRaw - mGithub) / sGithub;
      const zJd = (jdRaw - mJd) / sJd;
      const zProj = (projRaw - mProj) / sProj;
      const zRes = (resRaw - mRes) / sRes;

      const pctCgpa = Math.round(normalCDF(zCgpa) * 100);
      const pctCoding = c.testResults ? Math.round(normalCDF(zCoding) * 100) : 0; // penalized if missing
      const pctLogical = c.testResults ? Math.round(normalCDF(zLogical) * 100) : 0;
      const pctGithub = Math.round(normalCDF(zGithub) * 100);
      const pctJd = Math.round(normalCDF(zJd) * 100);
      const pctProj = Math.round(normalCDF(zProj) * 100);
      const pctRes = Math.round(normalCDF(zRes) * 100);

      // Weighted sum Math
      const w = job.weightConfig;
      const weightedScore = (
        (pctJd * w.jdMatch) +
        (pctGithub * w.github) +
        (pctCoding * w.coding) +
        (pctLogical * w.logical) +
        (pctProj * w.project) +
        (pctRes * w.research) +
        (pctCgpa * w.cgpa)
      ) / 100;

      return {
        candidateId: c.id,
        jobId: job.id,
        compositeScore: Math.round(weightedScore),
        rank: 0,
        breakdown: {
          jdMatch: { raw: jdRaw, normalized: pctJd, weighted: Math.round(pctJd * w.jdMatch / 100) },
          github: { raw: ghRaw, normalized: pctGithub, weighted: Math.round(pctGithub * w.github / 100) },
          coding: { raw: codRaw, normalized: pctCoding, weighted: Math.round(pctCoding * w.coding / 100) },
          logical: { raw: logRaw, normalized: pctLogical, weighted: Math.round(pctLogical * w.logical / 100) },
          project: { raw: projRaw, normalized: pctProj, weighted: Math.round(pctProj * w.project / 100) },
          research: { raw: resRaw, normalized: pctRes, weighted: Math.round(pctRes * w.research / 100) },
          cgpa: { raw: cgpaRaw, normalized: pctCgpa, weighted: Math.round(pctCgpa * w.cgpa / 100) }
        }
      };
    });

    // Sort by composite score descending and assign rank
    computedScores.sort((a, b) => b.compositeScore - a.compositeScore);
    computedScores.forEach((score, index) => {
      score.rank = index + 1;
    });

    set((state) => {
      const newScores = { ...state.scores };
      computedScores.forEach(score => {
        newScores[score.candidateId] = score;
      });

      // Update candidates status to RANKED if they were EVALUATED
      const updatedCandidates = state.candidates.map(c => {
        if (c.jobId === jobId && (c.pipelineStage === "EVALUATED" || c.pipelineStage === "UPLOADED")) {
          return { ...c, pipelineStage: "RANKED" as const, statusMessage: "Ranking computed." };
        }
        return c;
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_scores", JSON.stringify(newScores));
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updatedCandidates));
      }

      return { scores: newScores, candidates: updatedCandidates };
    });
  },

  sendTestLinks: async (candidateIds) => {
    set((state) => {
      const updated = state.candidates.map(c => {
        if (candidateIds.includes(c.id)) {
          return { ...c, pipelineStage: "TEST_SENT" as const, statusMessage: "Interactive test link emailed." };
        }
        return c;
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updated));
      }
      return { candidates: updated };
    });
  },

  uploadTestResults: (jobId, results) => {
    // Implement multi-tier fuzzy name matching
    set((state) => {
      const normalize = (s: string) => s.toLowerCase().replace(/[.\-_,;:'"]/g, "").replace(/\s+/g, " ").trim();
      
      const updatedCandidates = state.candidates.map(candidate => {
        if (candidate.jobId !== jobId) return candidate;

        // Try to match name
        const normCandName = normalize(candidate.name);
        const match = results.find(r => {
          const normResultName = normalize(r.name);
          // 1. Exact match
          if (normCandName === normResultName) return true;
          // 2. Substring match
          if (normCandName.includes(normResultName) || normResultName.includes(normCandName)) return true;
          // 3. Word set overlap (reordered words)
          const candWords = normCandName.split(" ");
          const resultWords = normResultName.split(" ");
          const intersect = candWords.filter(w => resultWords.includes(w));
          if (intersect.length >= 2 || (candWords.length === 1 && intersect.length === 1)) return true;
          // 4. No space match
          if (normCandName.replace(/\s+/g, "") === normResultName.replace(/\s+/g, "")) return true;
          return false;
        });

        if (match) {
          return {
            ...candidate,
            pipelineStage: "TEST_COMPLETED" as const,
            statusMessage: `Test results processed. logical: ${match.testLa}, coding: ${match.testCode}`,
            testResults: {
              testLa: match.testLa,
              testCode: match.testCode
            }
          };
        }
        return candidate;
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updatedCandidates));
      }

      return { candidates: updatedCandidates };
    });

    // Recompute rankings
    get().computeRankings(jobId);
  },

  scheduleInterview: (candidateId, time) => {
    const jitsiRoom = `stackmap-interview-${candidateId}-${Date.now().toString().slice(-4)}`;
    const jitsiLink = `https://meet.jit.si/${jitsiRoom}`;
    
    set((state) => {
      const updated = state.candidates.map(c => {
        if (c.id === candidateId) {
          return {
            ...c,
            pipelineStage: "INTERVIEW_SCHEDULED" as const,
            statusMessage: `Video interview scheduled for ${time}.`,
            jitsiLink,
            calendarEventId: `cal-${Date.now()}`,
            scheduledTime: time
          };
        }
        return c;
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updated));
      }
      return { candidates: updated };
    });
  },

  // --- Voice AI Interview Turn logic ---
  startInterviewSession: (candidateId) => {
    const jobQuestions = [
      { text: "Could you walk me through your engineering experience with high-performance architectures?", category: "General Intro" },
      { text: "How do you think about managing cache coherence and latency bottlenecks when executing dense model token steps?", category: "Technical Depth" },
      { text: "What is your approach to handling multi-instance failover states in stateful socket servers?", category: "Problem Solving" }
    ];

    const initialTranscript: TranscriptEntry[] = [
      {
        role: "ai",
        text: "Initiating communication uplink. Welcome to the Star Map AI Interview Chamber. Please share a summary of your technical projects and background.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];

    set((state) => {
      const newSession: MockSession = {
        candidateId,
        questions: jobQuestions,
        currentQuestionIndex: 0,
        transcript: initialTranscript,
        status: "ASKING"
      };

      const updated = { ...state.mockSessions, [candidateId]: newSession };
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_sessions", JSON.stringify(updated));
      }
      return { mockSessions: updated };
    });
  },

  submitCandidateAnswer: async (candidateId, text) => {
    const session = get().mockSessions[candidateId];
    if (!session) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: TranscriptEntry = { role: "candidate", text, timestamp };

    // Append candidate message immediately
    set((state) => {
      const currentSession = state.mockSessions[candidateId];
      const updatedSession = {
        ...currentSession,
        transcript: [...currentSession.transcript, userMessage],
        status: "LISTENING" as const
      };
      return {
        mockSessions: { ...state.mockSessions, [candidateId]: updatedSession }
      };
    });

    // Simulate AI synthesis & response generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const nextIndex = session.currentQuestionIndex + 1;
    const isFinished = nextIndex >= session.questions.length;

    let replyText = "";
    if (isFinished) {
      replyText = "Thank you. Your responses have been uploaded to the cosmic database. The AI analysis engine is compiling your feedback report now. Feel free to review it.";
    } else {
      replyText = session.questions[nextIndex].text;
    }

    const aiMessage: TranscriptEntry = {
      role: "ai",
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set((state) => {
      const currentSession = state.mockSessions[candidateId];
      const updatedSession = {
        ...currentSession,
        currentQuestionIndex: isFinished ? currentSession.currentQuestionIndex : nextIndex,
        transcript: [...currentSession.transcript, aiMessage],
        status: isFinished ? ("COMPLETED" as const) : ("ASKING" as const)
      };

      const updatedSessions = { ...state.mockSessions, [candidateId]: updatedSession };
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_sessions", JSON.stringify(updatedSessions));
      }

      // If completed, generate feedback report!
      if (isFinished) {
        const feedback: MockFeedback = {
          candidateId,
          totalScore: 88,
          categories: {
            communication: 90,
            technical: 85,
            problemSolving: 92,
            culturalFit: 84,
            confidence: 88
          },
          justifications: {
            communication: "Expresses complex design choices fluidly and structures architectural steps chronologically.",
            technical: "Detailed explanation of cache block mechanics, although there is room to clarify locks configurations.",
            problemSolving: "Highly structured approach, splitting complex data graphs into manageable pipelines.",
            culturalFit: "Shows mission-oriented focus and is eager to explore challenging distributed systems issues.",
            confidence: "Speaks with precise, clear terminology under pressure."
          },
          strengths: ["Strong pacing in describing memory structures", "Direct answers, avoiding redundant jargon", "Clear knowledge of Rust/Go socket frameworks"],
          improvements: ["Could clarify how multiple GPUs synchronize memory allocations", "Consider illustrating failovers using standard CAP references"],
          suggestions: ["Revise GPU block scheduling details before the live session", "Look up Jitsi integration practices for calendar tasks"]
        };

        const updatedFeedback = { ...state.mockFeedback, [candidateId]: feedback };
        
        // Also advance candidate pipeline stage!
        const updatedCandidates = state.candidates.map(c => 
          c.id === candidateId ? { ...c, pipelineStage: "SHORTLISTED" as const, statusMessage: "AI Interview completed. Shortlisted for HR scheduler." } : c
        );

        localStorage.setItem("sm_screening_feedback", JSON.stringify(updatedFeedback));
        localStorage.setItem("sm_screening_candidates", JSON.stringify(updatedCandidates));

        return {
          mockSessions: updatedSessions,
          mockFeedback: updatedFeedback,
          candidates: updatedCandidates
        };
      }

      return { mockSessions: updatedSessions };
    });
  },

  completeInterviewSession: (candidateId) => {
    set((state) => {
      const session = state.mockSessions[candidateId];
      if (!session) return state;

      const updatedSession = { ...session, status: "COMPLETED" as const };
      const updatedSessions = { ...state.mockSessions, [candidateId]: updatedSession };
      
      if (typeof window !== "undefined") {
        localStorage.setItem("sm_screening_sessions", JSON.stringify(updatedSessions));
      }
      return { mockSessions: updatedSessions };
    });
  }
}));
