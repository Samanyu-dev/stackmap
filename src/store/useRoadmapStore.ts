import { create } from "zustand";

export interface RoadmapNodeData {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  estimatedTime: string;
  prerequisites: string[];
  parentNodeId: string | null;
  order: number;
  resources: {
    id: string;
    title: string;
    type: string;
    url: string;
  }[];
  projectIdeas: string[];
  interviewQuestions: string[];
}

export interface RoadmapData {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  estimatedTime: string;
  estimatedDuration?: string;
  prerequisites?: string[];
  category: "DEVELOPMENT" | "DATA_SCIENCE" | "SYSTEMS" | "PREPARATION";
  nodes: RoadmapNodeData[];
  roadmapNodes?: RoadmapNodeData[];
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  streak: number;
  completedTopics: number;
  completedProjects: number;
  dsaSolved: number;
  applicationsSent: number;
  interviewsScheduled: number;
  targetRole?: string;
  weeklyGoal?: string;
}

interface RoadmapState {
  user: UserProfile;
  roadmaps: Record<string, RoadmapData>;
  activeRoadmaps: string[]; // slug array
  completedNodes: Record<string, boolean>; // nodeSlug -> boolean
  bookmarkedNodes: Record<string, boolean>; // nodeSlug -> boolean
  nodeNotes: Record<string, string>; // nodeSlug -> note content
  loading: boolean;

  // Actions
  initialize: () => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  enrollInRoadmap: (slug: string) => void;
  toggleNodeCompletion: (nodeSlug: string) => void;
  toggleNodeBookmark: (nodeSlug: string) => void;
  saveNodeNote: (nodeSlug: string, note: string) => void;
  incrementStreak: () => void;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  user: {
    id: "demo-user-id",
    name: "Alex Coder",
    email: "student@stackmap.dev",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    streak: 5,
    completedTopics: 8,
    completedProjects: 2,
    dsaSolved: 14,
    applicationsSent: 3,
    interviewsScheduled: 1,
    targetRole: "Frontend Developer",
    weeklyGoal: "5 Topics",
  },
  roadmaps: {},
  activeRoadmaps: ["frontend-developer"],
  completedNodes: {
    "internet-basics": true,
    "html-basics": true,
    "css-basics": true,
  },
  bookmarkedNodes: {
    "javascript-dom": true,
  },
  nodeNotes: {
    "css-basics": "Flexbox grid works using display: flex; check flex-grow and justify-content parameters.",
  },
  loading: false,

  initialize: () => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("stackmap_user_profile");
      if (savedUser) {
        try {
          set({ user: JSON.parse(savedUser) });
        } catch (e) {}
      }
      const savedCompleted = localStorage.getItem("stackmap_completed_nodes");
      if (savedCompleted) {
        try {
          set({ completedNodes: JSON.parse(savedCompleted) });
        } catch (e) {}
      }
      const savedBookmarked = localStorage.getItem("stackmap_bookmarked_nodes");
      if (savedBookmarked) {
        try {
          set({ bookmarkedNodes: JSON.parse(savedBookmarked) });
        } catch (e) {}
      }
      const savedNotes = localStorage.getItem("stackmap_node_notes");
      if (savedNotes) {
        try {
          set({ nodeNotes: JSON.parse(savedNotes) });
        } catch (e) {}
      }
    }
  },

  updateUserProfile: (updates: Partial<UserProfile>) => {
    set((state) => {
      const updatedUser = { ...state.user, ...updates };
      if (typeof window !== "undefined") {
        localStorage.setItem("stackmap_user_profile", JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    });
  },

  enrollInRoadmap: (slug: string) => {
    set((state) => {
      if (state.activeRoadmaps.includes(slug)) return state;
      return { activeRoadmaps: [...state.activeRoadmaps, slug] };
    });
  },

  toggleNodeCompletion: (nodeSlug: string) => {
    set((state) => {
      const isCompleted = !state.completedNodes[nodeSlug];
      const completedNodes = { ...state.completedNodes, [nodeSlug]: isCompleted };
      if (typeof window !== "undefined") {
        localStorage.setItem("stackmap_completed_nodes", JSON.stringify(completedNodes));
      }
      const completedCount = Object.values(completedNodes).filter(Boolean).length;
      const updatedUser = { ...state.user, completedTopics: completedCount };
      if (typeof window !== "undefined") {
        localStorage.setItem("stackmap_user_profile", JSON.stringify(updatedUser));
      }
      return {
        completedNodes,
        user: updatedUser
      };
    });
  },

  toggleNodeBookmark: (nodeSlug: string) => {
    set((state) => {
      const isBookmarked = !state.bookmarkedNodes[nodeSlug];
      const bookmarkedNodes = { ...state.bookmarkedNodes, [nodeSlug]: isBookmarked };
      if (typeof window !== "undefined") {
        localStorage.setItem("stackmap_bookmarked_nodes", JSON.stringify(bookmarkedNodes));
      }
      return { bookmarkedNodes };
    });
  },

  saveNodeNote: (nodeSlug: string, note: string) => {
    set((state) => {
      const nodeNotes = { ...state.nodeNotes, [nodeSlug]: note };
      if (typeof window !== "undefined") {
        localStorage.setItem("stackmap_node_notes", JSON.stringify(nodeNotes));
      }
      return { nodeNotes };
    });
  },

  incrementStreak: () => {
    set((state) => {
      const updatedUser = { ...state.user, streak: state.user.streak + 1 };
      if (typeof window !== "undefined") {
        localStorage.setItem("stackmap_user_profile", JSON.stringify(updatedUser));
      }
      return { user: updatedUser };
    });
  }
}));

