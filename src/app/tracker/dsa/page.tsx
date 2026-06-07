"use client";

import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTrackerStore, DSAProblem } from "@/store/useTrackerStore";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import { Code2, Play, CheckCircle2, Circle, ExternalLink, Terminal, ShieldAlert, Award, Star, Search, Flame } from "lucide-react";

interface SyllabusQuestion {
  id: string;
  title: string;
  platform: string;
  url: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

interface SyllabusTopic {
  topic: string;
  questions: SyllabusQuestion[];
}

interface TopicLearnGuide {
  learnLinks: { name: string; url: string }[];
  explanation: string;
  exampleCode: string;
  questionTypes: { name: string; description: string }[];
}

const topicLearnGuides: Record<string, TopicLearnGuide> = {
  "Arrays & Hashing": {
    learnLinks: [
      { name: "NeetCode Arrays Course (Video)", url: "https://neetcode.io" },
      { name: "GeeksforGeeks Arrays Guide (Docs)", url: "https://www.geeksforgeeks.org/array-data-structure/" },
      { name: "Tech Interview Handbook Arrays", url: "https://www.techinterviewhandbook.org/algorithms/array/" }
    ],
    explanation: "Arrays store elements in contiguous memory slots, enabling O(1) index lookups. Hashing indexes elements via a hash function, storing them in dynamic buckets to achieve O(1) average time complexity for insertion, deletion, and lookup operations.",
    exampleCode: `// Check if array has duplicates using a Set
function hasDuplicate(nums) {
  const numSet = new Set();
  for (const num of nums) {
    if (numSet.has(num)) {
      return true;
    }
    numSet.add(num);
  }
  return false;
}`,
    questionTypes: [
      { name: "Duplicate & Anagram Matching", description: "Use HashSets or HashMaps to track frequencies or occurrences of items (e.g. Valid Anagram, Two Sum)." },
      { name: "Prefix Sum Sequences", description: "Pre-calculate cumulative sums or products of arrays to answer dynamic subarray range checks in O(1) time." },
      { name: "Subarray Windows", description: "Track subsets of elements using dynamic maps to record bounds configurations." }
    ]
  },
  "Two Pointers": {
    learnLinks: [
      { name: "NeetCode Two Pointers (Video)", url: "https://neetcode.io" },
      { name: "Tech Interview Handbook Two Pointers", url: "https://www.techinterviewhandbook.org/algorithms/two-pointers/" }
    ],
    explanation: "Two Pointers is a technique where two indices scan a linear data structure simultaneously. Typically, one starts at the beginning and the other at the end (for sorted lists), or they run at different speeds (slow/fast), reducing time complexity from O(N^2) to O(N) by saving nested loops.",
    exampleCode: `// Check if string is palindrome using two pointers
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}`,
    questionTypes: [
      { name: "Sorted Array Convergence", description: "Start pointers at opposite boundaries (left = 0, right = len - 1) and shrink the window depending on conditions (e.g. 3Sum, Container with Most Water)." },
      { name: "Fast & Slow Pointers", description: "Advance slow by 1 step and fast by 2 steps to detect cycles or midpoints (e.g. Floyd's cycle detection in lists)." },
      { name: "Simultaneous Multi-list scanning", description: "Scan separate arrays concurrently to merge or compare elements in linear time." }
    ]
  },
  "Sliding Window": {
    learnLinks: [
      { name: "NeetCode Sliding Window (Video)", url: "https://neetcode.io" },
      { name: "GeeksforGeeks Window Sliding Technique", url: "https://www.geeksforgeeks.org/window-sliding-technique/" }
    ],
    explanation: "Sliding Window is an extension of the Two Pointers technique, tracking a continuous subsegment (window) of elements. The window size can be fixed (e.g. average of all subarrays of size K) or dynamic (expanding with a right pointer and contracting with a left pointer to find optimal lengths).",
    exampleCode: `// Find maximum sum of a contiguous subarray of size K
function maxSubarraySum(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < arr.length; i++) {
    windowSum += arr[i];
    if (i >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[i - k + 1]; // slide window left
    }
  }
  return maxSum;
}`,
    questionTypes: [
      { name: "Fixed Size Subarrays", description: "Compute results of fixed-width slices (e.g., maximum average, sliding window maximum)." },
      { name: "Dynamic / Variable Window size", description: "Expand the right boundary to satisfy a condition, then contract left boundary to optimize size (e.g., Longest Substring Without Repeating Characters)." },
      { name: "Window State Tracking", description: "Maintain frequency maps or count keys within active window boundaries." }
    ]
  },
  "Stacks & Queues": {
    learnLinks: [
      { name: "NeetCode Stack (Video)", url: "https://neetcode.io" },
      { name: "GeeksforGeeks Stack Data Structure", url: "https://www.geeksforgeeks.org/stack-data-structure/" }
    ],
    explanation: "A Stack is a LIFO (Last-In, First-Out) structure, perfect for parsing nested configurations (parentheses, HTML tags) or tracking recursion stack traces. A Queue is a FIFO (First-In, First-Out) structure, crucial for task scheduling and Breadth-First Search (BFS) graphs frontier exploration.",
    exampleCode: `// Validate parentheses matching using a Stack
function isValidParentheses(s) {
  const stack = [];
  const matches = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== matches[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}`,
    questionTypes: [
      { name: "Balanced Bracket & Syntax Parsing", description: "Push opening symbols onto a stack and pop them on matching closing symbols." },
      { name: "Monotonic Stack", description: "Maintain a sorted stack (strictly increasing/decreasing) to solve next greater element problems in O(N)." },
      { name: "Breadth-First Queues", description: "Queue up nodes level-by-level to search graph components." }
    ]
  },
  "Linked Lists": {
    learnLinks: [
      { name: "NeetCode Linked List (Video)", url: "https://neetcode.io" },
      { name: "GeeksforGeeks Linked List", url: "https://www.geeksforgeeks.org/data-structures/linked-list/" }
    ],
    explanation: "Linked Lists store nodes dynamically where each node points to the next in memory. Searching takes O(N) time since nodes are not index-addressable, but insertion or deletion at a known node is O(1) because it only requires pointer re-linking.",
    exampleCode: `// Reverse a Singly Linked List in-place
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`,
    questionTypes: [
      { name: "In-Place Pointer Reversal", description: "Re-point the next links without allocating extra memory space (e.g., Reverse Linked List)." },
      { name: "Slow/Fast Runner Cycles", description: "Identify loop indices or list intersections using slow and fast pointers." },
      { name: "Dummy Node Introductions", description: "Create a dummy head node to simplify corner cases when adding or removing elements." }
    ]
  },
  "Trees & Graphs": {
    learnLinks: [
      { name: "NeetCode Trees Course", url: "https://neetcode.io" },
      { name: "GeeksforGeeks Binary Trees", url: "https://www.geeksforgeeks.org/binary-tree-data-structure/" },
      { name: "LeetCode Graph Theory Explore", url: "https://leetcode.com/explore/featured/card/graph/" }
    ],
    explanation: "Trees are non-linear hierarchical graphs with parent-child relationships (e.g., Binary Search Trees). Graphs are generalized node clusters connected by directional or bi-directional edges. Traversals are done recursively using Depth-First Search (DFS) or iteratively via queues in Breadth-First Search (BFS).",
    exampleCode: `// Compute maximum depth of Binary Tree recursively
function maxDepth(root) {
  if (root === null) return 0;
  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
}`,
    questionTypes: [
      { name: "DFS Recursive Traversals", description: "Solve sub-tree properties bottom-up or top-down (e.g. Invert Binary Tree, Lowest Common Ancestor)." },
      { name: "BFS Level Order", description: "Explore neighboring nodes layer-by-layer using a queue (e.g., Tree Level Order)." },
      { name: "Adjacency Grids component traversal", description: "Scan grids using DFS/BFS algorithms to label connected sets (e.g. Number of Islands)." }
    ]
  },
  "Dynamic Programming": {
    learnLinks: [
      { name: "NeetCode Dynamic Programming", url: "https://neetcode.io" },
      { name: "GeeksforGeeks Dynamic Programming", url: "https://www.geeksforgeeks.org/dynamic-programming/" }
    ],
    explanation: "Dynamic Programming optimization solves complex problems by breaking them into overlapping subproblems, saving subproblem solutions (Memoization for Top-down, Tabulation for Bottom-up) to optimize runtime from exponential down to polynomial or linear.",
    exampleCode: `// Climb Stairs using dynamic programming (O(N) time, O(1) space)
function climbStairs(n) {
  if (n <= 2) return n;
  let step1 = 1, step2 = 2;
  for (let i = 3; i <= n; i++) {
    let current = step1 + step2;
    step1 = step2;
    step2 = current;
  }
  return step2;
}`,
    questionTypes: [
      { name: "1D State Recurrences", description: "Build linear DP arrays to resolve sequence counts (e.g., Climbing Stairs, House Robber)." },
      { name: "2D Grid Path Optimization", description: "Compute cost arrays traversing grid columns or knapsack capacities (e.g., Unique Paths, Coin Change)." },
      { name: "Sequence String Alignments", description: "Calculate matching subsets across two strings (e.g. Longest Common Subsequence)." }
    ]
  }
};

export default function DsaTracker() {
  const { dsaProblems, addDsaProblem, updateDsaProblem, deleteDsaProblem } = useTrackerStore();
  const { user, incrementStreak } = useRoadmapStore();

  const [activeTab, setActiveTab] = useState<"syllabus" | "custom">("syllabus");
  const [searchQuery, setSearchQuery] = useState("");

  // Syllabus list data
  const syllabusData: SyllabusTopic[] = [
    {
      topic: "Arrays & Hashing",
      questions: [
        { id: "arr-1", title: "Two Sum", platform: "LeetCode", url: "https://leetcode.com/problems/two-sum/", difficulty: "EASY" },
        { id: "arr-2", title: "Contains Duplicate", platform: "LeetCode", url: "https://leetcode.com/problems/contains-duplicate/", difficulty: "EASY" },
        { id: "arr-3", title: "Group Anagrams", platform: "LeetCode", url: "https://leetcode.com/problems/group-anagrams/", difficulty: "MEDIUM" }
      ]
    },
    {
      topic: "Two Pointers",
      questions: [
        { id: "tp-1", title: "Valid Palindrome", platform: "LeetCode", url: "https://leetcode.com/problems/valid-palindrome/", difficulty: "EASY" },
        { id: "tp-2", title: "3Sum", platform: "LeetCode", url: "https://leetcode.com/problems/3sum/", difficulty: "MEDIUM" },
        { id: "tp-3", title: "Container With Most Water", platform: "LeetCode", url: "https://leetcode.com/problems/container-with-most-water/", difficulty: "MEDIUM" }
      ]
    },
    {
      topic: "Sliding Window",
      questions: [
        { id: "sw-1", title: "Best Time to Buy and Sell Stock", platform: "LeetCode", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", difficulty: "EASY" },
        { id: "sw-2", title: "Longest Substring Without Repeating Characters", platform: "LeetCode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", difficulty: "MEDIUM" }
      ]
    },
    {
      topic: "Stacks & Queues",
      questions: [
        { id: "st-1", title: "Valid Parentheses", platform: "LeetCode", url: "https://leetcode.com/problems/valid-parentheses/", difficulty: "EASY" },
        { id: "st-2", title: "Min Stack", platform: "LeetCode", url: "https://leetcode.com/problems/min-stack/", difficulty: "MEDIUM" }
      ]
    },
    {
      topic: "Linked Lists",
      questions: [
        { id: "ll-1", title: "Reverse Linked List", platform: "LeetCode", url: "https://leetcode.com/problems/reverse-linked-list/", difficulty: "EASY" },
        { id: "ll-2", title: "Merge Two Sorted Lists", platform: "LeetCode", url: "https://leetcode.com/problems/merge-two-sorted-lists/", difficulty: "EASY" },
        { id: "ll-3", title: "Linked List Cycle", platform: "LeetCode", url: "https://leetcode.com/problems/linked-list-cycle/", difficulty: "EASY" }
      ]
    },
    {
      topic: "Trees & Graphs",
      questions: [
        { id: "tree-1", title: "Invert Binary Tree", platform: "LeetCode", url: "https://leetcode.com/problems/invert-binary-tree/", difficulty: "EASY" },
        { id: "tree-2", title: "Maximum Depth of Binary Tree", platform: "LeetCode", url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", difficulty: "EASY" },
        { id: "tree-3", title: "Number of Islands", platform: "LeetCode", url: "https://leetcode.com/problems/number-of-islands/", difficulty: "MEDIUM" }
      ]
    },
    {
      topic: "Dynamic Programming",
      questions: [
        { id: "dp-1", title: "Climbing Stairs", platform: "LeetCode", url: "https://leetcode.com/problems/climbing-stairs/", difficulty: "EASY" },
        { id: "dp-2", title: "Coin Change", platform: "LeetCode", url: "https://leetcode.com/problems/coin-change/", difficulty: "MEDIUM" },
        { id: "dp-3", title: "Longest Increasing Subsequence", platform: "LeetCode", url: "https://leetcode.com/problems/longest-increasing-subsequence/", difficulty: "HARD" }
      ]
    }
  ];

  // Checklist state in localStorage
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("stackmap_dsa_checklist");
      if (saved) {
        try {
          setChecklist(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, []);

  const toggleChecklist = (id: string, questionTitle: string, difficulty: string) => {
    const updated = { ...checklist, [id]: !checklist[id] };
    setChecklist(updated);
    localStorage.setItem("stackmap_dsa_checklist", JSON.stringify(updated));

    // Also record it inside custom logged challenges store
    const exists = dsaProblems.some(p => p.id === id);
    if (!exists && updated[id]) {
      addDsaProblem({
        id,
        title: questionTitle,
        platform: "LeetCode",
        topic: "Syllabus Track",
        difficulty: difficulty === "HARD" ? "ADVANCED" : difficulty === "MEDIUM" ? "INTERMEDIATE" : "BEGINNER",
        status: "SOLVED",
        attempts: 1,
        confidenceLevel: 4
      } as any);
    }
  };

  // IDE challenges definitions
  const challenges = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "EASY",
      desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      starterCode: `function twoSum(nums, target) {
  // Write your solution here
  
}`,
      testCases: [
        { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
        { input: [[3, 2, 4], 6], expected: [1, 2] },
        { input: [[3, 3], 6], expected: [0, 1] }
      ],
      validator: `
        const result = twoSum(args[0], args[1]);
        if (!Array.isArray(result) || result.length !== 2) return false;
        return (result[0] === expected[0] && result[1] === expected[1]) || 
               (result[0] === expected[1] && result[1] === expected[0]);
      `
    },
    {
      id: "reverse-string",
      title: "Reverse String",
      difficulty: "EASY",
      desc: "Write a function that reverses a string.\nInput will be a string, and you should return the reversed string.",
      starterCode: `function reverseString(str) {
  // Write your solution here
  
}`,
      testCases: [
        { input: ["hello"], expected: "olleh" },
        { input: ["Hannah"], expected: "hannaH" },
        { input: ["StackMap"], expected: "paMkcatS" }
      ],
      validator: `
        const result = reverseString(args[0]);
        return result === expected;
      `
    },
    {
      id: "valid-palindrome",
      title: "Valid Palindrome",
      difficulty: "EASY",
      desc: "Given a string s, return true if it is a palindrome, or false otherwise.\nIgnore letter case and non-alphanumeric characters.",
      starterCode: `function isPalindrome(s) {
  // Write your solution here
  
}`,
      testCases: [
        { input: ["A man, a plan, a canal: Panama"], expected: true },
        { input: ["race a car"], expected: false },
        { input: [" "], expected: true }
      ],
      validator: `
        const result = isPalindrome(args[0]);
        return result === expected;
      `
    },
    {
      id: "fizzbuzz",
      title: "FizzBuzz",
      difficulty: "EASY",
      desc: "Given an integer n, return a string array answer (1-indexed) where:\n- answer[i] == 'FizzBuzz' if i is divisible by 3 and 5.\n- answer[i] == 'Fizz' if i is divisible by 3.\n- answer[i] == 'Buzz' if i is divisible by 5.\n- answer[i] == i if none of the above conditions are true.",
      starterCode: `function fizzBuzz(n) {
  // Write your solution here
  
}`,
      testCases: [
        { input: [3], expected: ["1", "2", "Fizz"] },
        { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
        { input: [15], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"] }
      ],
      validator: `
        const result = fizzBuzz(args[0]);
        if (!Array.isArray(result)) return false;
        return JSON.stringify(result) === JSON.stringify(tcExpected);
      `
    }
  ];

  const [activeChallengeIdx, setActiveChallengeIdx] = useState(0);
  const activeChallenge = challenges[activeChallengeIdx];
  const [code, setCode] = useState(activeChallenge.starterCode);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(["Terminal ready. Write code and run verification."]);
  const [compiling, setCompiling] = useState(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);

  // Update editor code when active challenge shifts
  useEffect(() => {
    setCode(activeChallenge.starterCode);
    setTestsPassed(null);
    setConsoleLogs([`Switched to: ${activeChallenge.title}. Editor refreshed.`]);
  }, [activeChallengeIdx]);

  const runCodeVerification = () => {
    setCompiling(true);
    setTestsPassed(null);
    setConsoleLogs(prev => [...prev, "> Starting compilation run..."]);

    setTimeout(() => {
      try {
        let results = [];
        let allOk = true;

        for (let i = 0; i < activeChallenge.testCases.length; i++) {
          const tc = activeChallenge.testCases[i];
          // Dynamic client evaluations compiler
          const userFnStr = code;
          
          // Execute evaluation wrapper
          const runner = new Function("args", "tcExpected", `
            ${userFnStr}
            try {
              ${activeChallenge.validator}
            } catch (innerErr) {
              return false;
            }
          `);

          const pass = runner(tc.input, tc.expected);
          results.push(`Test Case ${i + 1}: ${pass ? "PASSED" : "FAILED"}`);
          if (!pass) allOk = false;
        }

        setConsoleLogs(prev => [
          ...prev,
          ...results,
          allOk 
            ? `> Success! All ${activeChallenge.testCases.length} test cases passed. Challenge completed.` 
            : `> Failure! Some test cases returned unexpected structures. Check logic.`
        ]);
        
        setTestsPassed(allOk);

        if (allOk) {
          // Check off the challenge in checklist
          const checklistId = `ide-${activeChallenge.id}`;
          const updated = { ...checklist, [checklistId]: true };
          setChecklist(updated);
          localStorage.setItem("stackmap_dsa_checklist", JSON.stringify(updated));

          // Log problem in store
          addDsaProblem({
            id: checklistId,
            title: `IDE Challenge: ${activeChallenge.title}`,
            platform: "StackMap IDE",
            topic: "Interactive IDE",
            difficulty: "BEGINNER",
            status: "SOLVED",
            attempts: 1,
            confidenceLevel: 5
          } as any);

          // Increment streak
          incrementStreak();
        }
      } catch (err: any) {
        setConsoleLogs(prev => [
          ...prev,
          `> Compilation Error: ${err.message || err.toString()}`
        ]);
        setTestsPassed(false);
      } finally {
        setCompiling(false);
      }
    }, 900);
  };

  // Count progress
  const totalSyllabusQuestions = syllabusData.flatMap(t => t.questions).length;
  const completedSyllabus = syllabusData.flatMap(t => t.questions).filter(q => checklist[q.id]).length;
  const progressPercentage = Math.round((completedSyllabus / totalSyllabusQuestions) * 100) || 0;

  return (
    <DashboardLayout>
      <div className="space-y-6 text-left">
        {/* Page Header */}
        <div className="border-b border-border/40 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">DSA Syllabus & Code Terminal</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Check off core curriculum questions, track platform solutions, and test live algorithms inside the sandbox terminal.
            </p>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-secondary/40 border border-border/60 rounded-xl font-mono text-xs text-orange-400">
            <Flame className="h-4.5 w-4.5 fill-orange-400 animate-pulse" />
            <span>Streak: {user.streak} days</span>
          </div>
        </div>

        {/* Global Progress bar */}
        <Card className="bg-card/45 border-border">
          <CardContent className="py-5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 w-full md:max-w-md">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">DSA Syllabus Completion</span>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
              </div>
            </div>
            <div className="flex items-center space-x-6 text-xs text-muted-foreground">
              <div>
                <span className="font-bold text-foreground block text-lg">{completedSyllabus} / {totalSyllabusQuestions}</span>
                <span>Solved Problems</span>
              </div>
              <div className="border-l border-border/40 pl-6">
                <span className="font-bold text-primary block text-lg">{progressPercentage}%</span>
                <span>Completion Rate</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Dual-Pane Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN: THE BIG PICTURE SYLLABUS CATALOG (7 Cols) */}
          <div className="xl:col-span-7 space-y-6">
            <Card className="bg-card/45 border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <CardTitle className="text-base font-bold flex items-center space-x-2">
                      <Award className="h-5 w-5 text-primary" />
                      <span>Curriculum Checklist</span>
                    </CardTitle>
                    <CardDescription className="text-xs">Select subtopics to check off target interview algorithms.</CardDescription>
                  </div>
                  <div className="flex space-x-1.5 p-0.5 bg-secondary rounded-lg border border-border/60 text-[10px] font-mono font-semibold">
                    <button 
                      onClick={() => setActiveTab("syllabus")} 
                      className={`px-3 py-1 rounded-md transition-all ${activeTab === "syllabus" ? "bg-primary text-white" : "text-muted-foreground"}`}
                    >
                      SYLLABUS
                    </button>
                    <button 
                      onClick={() => setActiveTab("custom")} 
                      className={`px-3 py-1 rounded-md transition-all ${activeTab === "custom" ? "bg-primary text-white" : "text-muted-foreground"}`}
                    >
                      USER LOGS ({dsaProblems.length})
                    </button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6">
                {activeTab === "syllabus" ? (
                  /* Syllabus Checklist Accordion View */
                  <div className="space-y-4">
                    {syllabusData.map((group, groupIdx) => (
                      <div key={groupIdx} className="border border-border/60 rounded-xl overflow-hidden bg-background/25">
                        <div className="bg-secondary/40 px-4 py-3 flex justify-between items-center border-b border-border/60">
                          <span className="font-bold text-xs text-foreground uppercase tracking-wider">{group.topic}</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              onClick={() => setSelectedTopic(group.topic)}
                              variant="outline"
                              className="text-[9px] font-bold h-7 px-2 border-primary/20 bg-primary/5 hover:bg-primary/15 text-primary uppercase font-mono tracking-wide"
                            >
                              Learn Guide
                            </Button>
                            <Badge variant="outline" className="text-[10px] font-mono">
                              {group.questions.filter(q => checklist[q.id]).length} / {group.questions.length} Solved
                            </Badge>
                          </div>
                        </div>
                        <div className="divide-y divide-border/40">
                          {group.questions.map((q) => {
                            const isDone = !!checklist[q.id];
                            return (
                              <div key={q.id} className="p-3 flex items-center justify-between gap-4 hover:bg-secondary/15 transition-all">
                                <div className="flex items-center space-x-3">
                                  <button 
                                    onClick={() => toggleChecklist(q.id, q.title, q.difficulty)} 
                                    className={`text-muted-foreground transition-all hover:text-primary`}
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="h-5 w-5 text-green-400 fill-green-400/10" />
                                    ) : (
                                      <Circle className="h-5 w-5 opacity-40" />
                                    )}
                                  </button>
                                  <span className={`text-xs font-semibold ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                    {q.title}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <Badge variant={q.difficulty === "HARD" ? "destructive" : q.difficulty === "MEDIUM" ? "warning" : "info"} className="text-[8.5px] uppercase font-bold px-1.5 py-0.5">
                                    {q.difficulty}
                                  </Badge>
                                  <a href={q.url} target="_blank" rel="noopener noreferrer" className="p-1 rounded-md border border-border bg-secondary hover:bg-rim/20 text-muted-foreground hover:text-foreground">
                                    <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Custom logged table view */
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search logged challenges..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        className="pl-9 h-10 text-xs"
                      />
                    </div>
                    {dsaProblems.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).length > 0 ? (
                      <div className="border border-border/60 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-secondary/35 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60">
                              <th className="p-3">Problem</th>
                              <th className="p-3">Category</th>
                              <th className="p-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/40">
                            {dsaProblems.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((p) => (
                              <tr key={p.id} className="hover:bg-secondary/10">
                                <td className="p-3 font-bold">{p.title}</td>
                                <td className="p-3">
                                  <Badge variant="outline" className="text-[9px]">{p.topic}</Badge>
                                </td>
                                <td className="p-3 text-right">
                                  <Button variant="ghost" size="sm" onClick={() => deleteDsaProblem(p.id)} className="h-7 text-red-400 hover:bg-red-500/10">
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">No custom challenges logged yet.</div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE CODE TERMINAL CHALLENGE (5 Cols) */}
          <div className="xl:col-span-5 space-y-6">
            <Card className="bg-card/45 border-border">
              <CardHeader className="border-b border-border/40 pb-4">
                <div className="space-y-1">
                  <CardTitle className="text-base font-bold flex items-center space-x-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    <span>Live Code Sandbox</span>
                  </CardTitle>
                  <CardDescription className="text-xs">Compile and run algorithms directly on StackMap.</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Challenge Dropdown Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Select Active Challenge</label>
                  <select 
                    value={activeChallengeIdx} 
                    onChange={(e) => setActiveChallengeIdx(parseInt(e.target.value))}
                    className="w-full h-10 px-3 bg-secondary/80 border border-border/60 rounded-xl text-xs text-foreground focus:outline-none focus:border-primary"
                  >
                    {challenges.map((c, idx) => (
                      <option key={c.id} value={idx}>{c.title} ({c.difficulty})</option>
                    ))}
                  </select>
                </div>

                {/* Challenge prompt card */}
                <div className="p-3.5 bg-secondary/25 border border-border/60 rounded-xl space-y-2 text-xs">
                  <span className="font-bold text-foreground">Challenge Prompt:</span>
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed font-light">{activeChallenge.desc}</p>
                </div>

                {/* Simulated IDE editor viewport */}
                <div className="relative border border-border/80 rounded-xl overflow-hidden bg-[#0A0A16] shadow-2xl">
                  {/* Window upper bar */}
                  <div className="bg-[#111124] px-4 py-2 border-b border-border/60 flex items-center justify-between">
                    <div className="flex space-x-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <span className="font-mono text-[9px] text-muted-foreground">stackmap-compiler.js</span>
                  </div>

                  {/* Core textarea editor */}
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-64 p-4 bg-transparent text-[#E1E1E6] font-mono text-xs leading-relaxed focus:outline-none resize-none"
                    spellCheck={false}
                  />

                  {/* Pass/Fail visual alert badge */}
                  {testsPassed !== null && (
                    <div className={`absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center space-x-1.5 ${
                      testsPassed 
                        ? "bg-green-500/15 border border-green-500/30 text-green-400" 
                        : "bg-red-500/15 border border-red-500/30 text-red-400"
                    }`}>
                      {testsPassed ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>PASS (3/3 cases)</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-4 w-4" />
                          <span>FAIL</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Console prompt logs output view */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Sandbox Terminal Output</span>
                  <div className="p-3.5 bg-black border border-border/60 rounded-xl h-24 overflow-y-auto font-mono text-[10px] text-green-400 space-y-1 leading-normal">
                    {consoleLogs.map((log, lIdx) => (
                      <div key={lIdx}>{log}</div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-border/40 pt-4 flex gap-2">
                <Button 
                  onClick={() => setCode(activeChallenge.starterCode)} 
                  variant="outline" 
                  size="sm" 
                  className="font-mono text-[10px] uppercase tracking-wider cursor-pointer"
                >
                  Reset Starter
                </Button>
                <Button 
                  onClick={runCodeVerification} 
                  disabled={compiling}
                  size="sm" 
                  className="ml-auto font-mono text-[10px] uppercase tracking-wider bg-nova hover:bg-nova-bright cursor-pointer flex items-center space-x-1.5"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>{compiling ? "Running Checks..." : "Verify Solution"}</span>
                </Button>
              </CardFooter>
            </Card>
          </div>

        </div>
      </div>

      {/* SLIDING DRAWER DETAIL VIEW */}
      {selectedTopic && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-all duration-300">
          {/* Backdrop click closer */}
          <div className="flex-grow" onClick={() => setSelectedTopic(null)} />
          
          {/* Drawer panel content */}
          <div className="w-full max-w-xl bg-card border-l border-border/80 h-full overflow-y-auto p-6 shadow-2xl relative space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-border/40 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest block font-bold">Topic Guide</span>
                  <h2 className="text-xl font-extrabold tracking-tight text-foreground mt-1">{selectedTopic}</h2>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedTopic(null)} className="h-8 w-8 p-0 rounded-full hover:bg-secondary/50">
                  ✕
                </Button>
              </div>

              {/* Where to Learn */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Where to Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {topicLearnGuides[selectedTopic]?.learnLinks.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[11px] font-semibold bg-secondary/80 border text-secondary-foreground px-3 py-1.5 rounded-lg flex items-center space-x-1.5 hover:bg-primary/10 hover:border-primary/40 transition-all font-mono"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Concept Explanation</h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-light bg-secondary/15 p-4 rounded-xl border border-border/40">
                  {topicLearnGuides[selectedTopic]?.explanation}
                </p>
              </div>

              {/* Code Example */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Code Example</h3>
                <div className="relative border border-border/80 rounded-xl overflow-hidden bg-[#0A0A16]">
                  <div className="bg-[#111124] px-4 py-1.5 border-b border-border/40 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span>example.js</span>
                  </div>
                  <pre className="p-4 text-[#E1E1E6] font-mono text-[11px] leading-relaxed overflow-x-auto bg-[#04040A] text-left">
                    <code>{topicLearnGuides[selectedTopic]?.exampleCode}</code>
                  </pre>
                </div>
              </div>

              {/* Common Question Types */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Common Patterns</h3>
                <div className="space-y-2">
                  {topicLearnGuides[selectedTopic]?.questionTypes.map((type, idx) => (
                    <div key={idx} className="p-3 bg-secondary/25 border border-border/40 rounded-xl space-y-1 text-left">
                      <span className="text-xs font-bold text-foreground block">{type.name}</span>
                      <p className="text-[11px] text-muted-foreground font-light">{type.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Questions inside the drawer */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">Practice Checklist</h3>
                <div className="border border-border/60 rounded-xl overflow-hidden divide-y divide-border/40 bg-background/25">
                  {syllabusData.find(g => g.topic === selectedTopic)?.questions.map((q) => {
                    const isDone = !!checklist[q.id];
                    return (
                      <div key={q.id} className="p-3 flex items-center justify-between gap-4 hover:bg-secondary/10 transition-all text-left">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => toggleChecklist(q.id, q.title, q.difficulty)} 
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {isDone ? (
                              <CheckCircle2 className="h-5 w-5 text-green-400 fill-green-400/10" />
                            ) : (
                              <Circle className="h-5 w-5 opacity-40" />
                            )}
                          </button>
                          <span className={`text-xs font-semibold ${isDone ? "line-through text-muted-foreground" : "text-foreground"}`}>
                            {q.title}
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={q.difficulty === "HARD" ? "destructive" : q.difficulty === "MEDIUM" ? "warning" : "info"} className="text-[8.5px] uppercase font-bold px-1.5 py-0.5">
                            {q.difficulty}
                          </Badge>
                          <a href={q.url} target="_blank" rel="noopener noreferrer" className="p-1 rounded-md border border-border bg-secondary hover:bg-rim/20 text-muted-foreground hover:text-foreground">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
            
            <div className="pt-4 border-t border-border/40 text-center">
              <Button size="sm" onClick={() => setSelectedTopic(null)} className="w-full uppercase text-xs font-bold font-mono tracking-wider">
                Close Guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
