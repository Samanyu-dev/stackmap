import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// Check if PostgreSQL is available
export const isDbConnected = !!process.env.DATABASE_URL;

// Helper to determine if we should fall back to mockup store
export const useMockDb = !isDbConnected;

// In-Memory Database Store for fallback demo mode
class InMemoryDb {
  private users: any[] = [];
  private roadmaps: any[] = [];
  private nodes: any[] = [];
  private progress: any[] = [];
  private applications: any[] = [];
  private dsaProblems: any[] = [];
  private projects: any[] = [];
  private notes: any[] = [];
  private bookmarks: any[] = [];
  private studyPlans: any[] = [];

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add default user
    this.users.push({
      id: "demo-user-id",
      email: "student@stackmap.dev",
      name: "Alex Coder",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      role: "USER",
      streak: 5,
      lastActive: new Date(),
      createdAt: new Date(),
    });

    // We will populate standard roadmaps in seed json or load it inside stores
  }

  // Basic CRUD mock handlers
  async getUser(id: string) {
    return this.users.find(u => u.id === id) || this.users[0];
  }

  async updateUserStreak(userId: string) {
    const user = await this.getUser(userId);
    if (user) {
      user.streak += 1;
      user.lastActive = new Date();
    }
    return user;
  }

  async getApplications(userId: string) {
    if (this.applications.length === 0) {
      this.applications = [
        {
          id: "app-1",
          userId,
          company: "Google",
          role: "Software Engineering Intern",
          type: "internship",
          location: "Mountain View, CA (Hybrid)",
          package: "$45/hr",
          applicationLink: "https://careers.google.com",
          appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          status: "INTERVIEW",
          referralContact: "Jane Doe (L4 SWE)",
          resumeVersion: "v2_SWE_General",
          notes: "Focus on Graph algorithms and System Design basics. Mock interview scheduled on Friday.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "app-2",
          userId,
          company: "Stripe",
          role: "Frontend Engineer",
          type: "fulltime",
          location: "San Francisco, CA",
          package: "$150k",
          applicationLink: "https://stripe.com/jobs",
          appliedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
          deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: "OA",
          referralContact: null,
          resumeVersion: "v2_Frontend_Special",
          notes: "Completed Online Assessment. Awaiting response.",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: "app-3",
          userId,
          company: "Vercel",
          role: "Next.js Advocate",
          type: "fulltime",
          location: "Remote",
          package: "$135k",
          applicationLink: "https://vercel.com/careers",
          appliedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          deadline: null,
          status: "APPLIED",
          referralContact: "Lee Robinson",
          resumeVersion: "v2_Developer_Relations",
          notes: "Submitted portfolo website showing high performance Web Vitals.",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
    }
    return this.applications.filter(app => app.userId === userId);
  }

  async createApplication(data: any) {
    const newApp = {
      id: `app-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data
    };
    this.applications.push(newApp);
    return newApp;
  }

  async updateApplication(id: string, data: any) {
    const idx = this.applications.findIndex(app => app.id === id);
    if (idx !== -1) {
      this.applications[idx] = { ...this.applications[idx], ...data, updatedAt: new Date() };
      return this.applications[idx];
    }
    return null;
  }

  async deleteApplication(id: string) {
    this.applications = this.applications.filter(app => app.id !== id);
    return { success: true };
  }

  async getDsaProblems(userId: string) {
    if (this.dsaProblems.length === 0) {
      this.dsaProblems = [
        {
          id: "dsa-1",
          userId,
          title: "Two Sum",
          platform: "LeetCode",
          topic: "Arrays",
          difficulty: "BEGINNER",
          status: "SOLVED",
          attempts: 1,
          solutionLink: "https://leetcode.com/problems/two-sum/submissions/",
          revisionDate: new Date(),
          confidenceLevel: 5,
          createdAt: new Date()
        },
        {
          id: "dsa-2",
          userId,
          title: "Longest Palindromic Substring",
          platform: "LeetCode",
          topic: "Dynamic Programming",
          difficulty: "INTERMEDIATE",
          status: "ATTEMPTED",
          attempts: 3,
          solutionLink: "",
          revisionDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          confidenceLevel: 2,
          createdAt: new Date()
        },
        {
          id: "dsa-3",
          userId,
          title: "Merge k Sorted Lists",
          platform: "LeetCode",
          topic: "Heaps / LinkedLists",
          difficulty: "ADVANCED",
          status: "TODO",
          attempts: 0,
          solutionLink: null,
          revisionDate: null,
          confidenceLevel: 1,
          createdAt: new Date()
        }
      ];
    }
    return this.dsaProblems.filter(prob => prob.userId === userId);
  }

  async upsertDsaProblem(data: any) {
    const idx = this.dsaProblems.findIndex(p => p.title === data.title && p.userId === data.userId);
    if (idx !== -1) {
      this.dsaProblems[idx] = { ...this.dsaProblems[idx], ...data, updatedAt: new Date() };
      return this.dsaProblems[idx];
    } else {
      const newDsa = {
        id: `dsa-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data
      };
      this.dsaProblems.push(newDsa);
      return newDsa;
    }
  }

  async deleteDsaProblem(id: string) {
    this.dsaProblems = this.dsaProblems.filter(p => p.id !== id);
    return { success: true };
  }
}

export const mockDb = new InMemoryDb();
