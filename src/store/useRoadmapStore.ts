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
    // Initial fetch from APIs if connected, otherwise we rely on mocks initialized above
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
      const completedCount = Object.values(completedNodes).filter(Boolean).length;
      return {
        completedNodes,
        user: { ...state.user, completedTopics: completedCount }
      };
    });
  },

  toggleNodeBookmark: (nodeSlug: string) => {
    set((state) => {
      const isBookmarked = !state.bookmarkedNodes[nodeSlug];
      return {
        bookmarkedNodes: { ...state.bookmarkedNodes, [nodeSlug]: isBookmarked }
      };
    });
  },

  saveNodeNote: (nodeSlug: string, note: string) => {
    set((state) => ({
      nodeNotes: { ...state.nodeNotes, [nodeSlug]: note }
    }));
  },

  incrementStreak: () => {
    set((state) => ({
      user: { ...state.user, streak: state.user.streak + 1 }
    }));
  }
}));
