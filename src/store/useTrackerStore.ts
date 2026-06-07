import { create } from "zustand";

export interface Application {
  id: string;
  company: string;
  role: string;
  type: "internship" | "fulltime";
  location: string;
  package: string;
  applicationLink?: string;
  appliedDate: string;
  deadline?: string;
  status: "SAVED" | "APPLIED" | "OA" | "INTERVIEW" | "HR" | "OFFER" | "REJECTED";
  referralContact?: string;
  resumeVersion?: string;
  notes?: string;
  followUpReminder?: string;
}

export interface DSAProblem {
  id: string;
  title: string;
  platform: string;
  topic: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "TODO" | "ATTEMPTED" | "SOLVED";
  attempts: number;
  solutionLink?: string;
  revisionDate?: string;
  confidenceLevel: number; // 1 to 5
}

interface TrackerState {
  applications: Application[];
  dsaProblems: DSAProblem[];
  loading: boolean;

  // Application CRUD Actions
  setApplications: (apps: Application[]) => void;
  addApplication: (app: Omit<Application, "id">) => void;
  updateApplicationStatus: (id: string, status: Application["status"]) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;

  // DSA CRUD Actions
  setDsaProblems: (probs: DSAProblem[]) => void;
  addDsaProblem: (prob: Omit<DSAProblem, "id">) => void;
  updateDsaProblem: (id: string, updates: Partial<DSAProblem>) => void;
  deleteDsaProblem: (id: string) => void;
}

export const useTrackerStore = create<TrackerState>((set) => ({
  applications: [
    {
      id: "app-1",
      company: "Google",
      role: "Software Engineering Intern",
      type: "internship",
      location: "Mountain View, CA (Hybrid)",
      package: "$45/hr",
      applicationLink: "https://careers.google.com",
      appliedDate: "2026-06-02",
      deadline: "2026-06-22",
      status: "INTERVIEW",
      referralContact: "Jane Doe (L4 SWE)",
      resumeVersion: "v2_SWE_General",
      notes: "Focus on Graph algorithms and System Design basics. Mock interview scheduled on Friday."
    },
    {
      id: "app-2",
      company: "Stripe",
      role: "Frontend Engineer",
      type: "fulltime",
      location: "San Francisco, CA",
      package: "$150k",
      applicationLink: "https://stripe.com/jobs",
      appliedDate: "2026-05-26",
      deadline: "2026-06-05",
      status: "OA",
      resumeVersion: "v2_Frontend_Special",
      notes: "Completed Online Assessment. Awaiting response."
    },
    {
      id: "app-3",
      company: "Vercel",
      role: "Next.js Advocate",
      type: "fulltime",
      location: "Remote",
      package: "$135k",
      applicationLink: "https://vercel.com/careers",
      appliedDate: "2026-06-06",
      status: "APPLIED",
      referralContact: "Lee Robinson",
      resumeVersion: "v2_Developer_Relations",
      notes: "Submitted portfolio website showing high performance Web Vitals."
    }
  ],
  dsaProblems: [
    {
      id: "dsa-1",
      title: "Two Sum",
      platform: "LeetCode",
      topic: "Arrays",
      difficulty: "BEGINNER",
      status: "SOLVED",
      attempts: 1,
      solutionLink: "https://leetcode.com/problems/two-sum/submissions/",
      confidenceLevel: 5
    },
    {
      id: "dsa-2",
      title: "Longest Palindromic Substring",
      platform: "LeetCode",
      topic: "Dynamic Programming",
      difficulty: "INTERMEDIATE",
      status: "ATTEMPTED",
      attempts: 3,
      solutionLink: "",
      confidenceLevel: 2
    },
    {
      id: "dsa-3",
      title: "Merge k Sorted Lists",
      platform: "LeetCode",
      topic: "Heaps / LinkedLists",
      difficulty: "ADVANCED",
      status: "TODO",
      attempts: 0,
      confidenceLevel: 1
    }
  ],
  loading: false,

  setApplications: (apps) => set({ applications: apps }),
  addApplication: (app) => set((state) => ({
    applications: [
      ...state.applications,
      { ...app, id: `app-${Math.random().toString(36).substr(2, 9)}` }
    ]
  })),
  updateApplicationStatus: (id, status) => set((state) => ({
    applications: state.applications.map(app => app.id === id ? { ...app, status } : app)
  })),
  updateApplication: (id, updates) => set((state) => ({
    applications: state.applications.map(app => app.id === id ? { ...app, ...updates } : app)
  })),
  deleteApplication: (id) => set((state) => ({
    applications: state.applications.filter(app => app.id !== id)
  })),

  setDsaProblems: (probs) => set({ dsaProblems: probs }),
  addDsaProblem: (prob) => set((state) => ({
    dsaProblems: [
      ...state.dsaProblems,
      { ...prob, id: `dsa-${Math.random().toString(36).substr(2, 9)}` }
    ]
  })),
  updateDsaProblem: (id, updates) => set((state) => ({
    dsaProblems: state.dsaProblems.map(p => p.id === id ? { ...p, ...updates } : p)
  })),
  deleteDsaProblem: (id) => set((state) => ({
    dsaProblems: state.dsaProblems.filter(p => p.id !== id)
  }))
}));
