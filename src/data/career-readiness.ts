/**
 * Career Readiness Calculation Engine for StackMap
 * Computes scores in the range [0-100] based on weighted preparation matrices.
 */

// Weight constants for readiness components
export const READINESS_WEIGHTS = {
  // Weights inside Resume Readiness
  RESUME: {
    ATS_SCORE: 0.40,      // Match score returned by analyzer
    FORMATTING: 0.25,     // Formatting rules checks (e.g., margins, columns)
    MISSING_SKILLS: 0.20,  // Deducts if critical skills are absent
    KEYWORDS: 0.15        // Keyword coverage score
  },
  // Weights inside DSA Readiness
  DSA: {
    SOLVED_COUNT: 0.50,   // Number of problems solved relative to goal (e.g., target 200)
    PLATFORM_DIVERSITY: 0.20, // solved on LeetCode + Codeforces + GFG etc.
    CONFIDENCE: 0.30      // Confidence levels (average across solved topics)
  },
  // Weights inside Project Readiness
  PROJECTS: {
    MILESTONES_COMPLETED: 0.40, // Steps completed across active project roadmaps
    DEPLOYMENT_VERIFIED: 0.30,  // Has deployment links mapped
    README_CHECKLIST: 0.30     // README requirements checked
  },
  // Weights inside Interview Readiness
  INTERVIEWS: {
    MOCKS_COMPLETED: 0.45,    // Completed mock interview sessions count
    CONFIDENCE_RATING: 0.35,  // User-defined rating (1-5)
    ATTEMPT_CONSISTENCY: 0.20 // Consistency rating based on mock scores
  },
  // Weights inside Company Readiness
  COMPANY: {
    TIMELINE_PROGRESS: 0.50,  // Steps checked on recommended timeline (e.g., 30/60/90 days)
    ROUNDS_REVIEWED: 0.30,    // Specific loop rounds studied (e.g., OA, LLD, HLD)
    COMPANY_RESOURCES: 0.20   // Read company-specific reference guides
  },
  // Weights for Overall Career Readiness Score
  OVERALL: {
    DSA: 0.25,
    PROJECTS: 0.25,
    RESUME: 0.20,
    COMPANY: 0.15,
    INTERVIEW: 0.15
  }
};

/**
 * Calculates Resume Readiness Score (0-100)
 */
export function calculateResumeReadiness(params: {
  atsScore: number;           // 0 to 100
  formattingScore: number;    // 0 to 100
  missingSkillsCount: number; // count of missing critical skills
  keywordsScore: number;      // 0 to 100
}): number {
  const { atsScore, formattingScore, missingSkillsCount, keywordsScore } = params;
  
  // Missing skills deduction: deduct 5 points per missing skill, capped at 40 max deduction
  const skillsScore = Math.max(0, 100 - (missingSkillsCount * 8));

  const weightedScore = 
    (atsScore * READINESS_WEIGHTS.RESUME.ATS_SCORE) +
    (formattingScore * READINESS_WEIGHTS.RESUME.FORMATTING) +
    (skillsScore * READINESS_WEIGHTS.RESUME.MISSING_SKILLS) +
    (keywordsScore * READINESS_WEIGHTS.RESUME.KEYWORDS);

  return Math.round(Math.min(100, Math.max(0, weightedScore)));
}

/**
 * Calculates DSA Readiness Score (0-100)
 */
export function calculateDSAReadiness(params: {
  solvedCount: number;        // count of unique solved problems
  targetGoal?: number;        // target count (default: 200)
  platformsCount: number;     // e.g. LeetCode, HackerRank, GFG (1 to 5)
  averageConfidence: number;  // 1 (low) to 5 (high)
}): number {
  const { solvedCount, targetGoal = 200, platformsCount, averageConfidence } = params;

  // Solved Count component (0-100)
  const solvedPercent = Math.min(100, (solvedCount / targetGoal) * 100);

  // Platform diversity component (0-100, max is 3+ platforms)
  const platformScore = Math.min(100, (platformsCount / 3) * 100);

  // Confidence component (0-100)
  const confidenceScore = (averageConfidence / 5) * 100;

  const weightedScore = 
    (solvedPercent * READINESS_WEIGHTS.DSA.SOLVED_COUNT) +
    (platformScore * READINESS_WEIGHTS.DSA.PLATFORM_DIVERSITY) +
    (confidenceScore * READINESS_WEIGHTS.DSA.CONFIDENCE);

  return Math.round(Math.min(100, Math.max(0, weightedScore)));
}

/**
 * Calculates Project Readiness Score (0-100)
 */
export function calculateProjectReadiness(params: {
  completedMilestones: number; // steps checked across projects
  totalMilestones: number;     // total milestones across active projects
  hasDeploymentsCount: number; // number of projects with verified deployment links
  activeProjectsCount: number; // active projects in user list
  readmeCheckedCount: number;  // total checks completed
  totalReadmeChecks: number;   // total README constraints
}): number {
  const { 
    completedMilestones, 
    totalMilestones, 
    hasDeploymentsCount, 
    activeProjectsCount, 
    readmeCheckedCount, 
    totalReadmeChecks 
  } = params;

  // Milestones progress (0-100)
  const milestoneScore = totalMilestones > 0 
    ? (completedMilestones / totalMilestones) * 100 
    : 0;

  // Deployments index (0-100)
  const deploymentScore = activeProjectsCount > 0 
    ? Math.min(100, (hasDeploymentsCount / activeProjectsCount) * 100) 
    : 0;

  // README constraints score (0-100)
  const readmeScore = totalReadmeChecks > 0 
    ? (readmeCheckedCount / totalReadmeChecks) * 100 
    : 0;

  const weightedScore = 
    (milestoneScore * READINESS_WEIGHTS.PROJECTS.MILESTONES_COMPLETED) +
    (deploymentScore * READINESS_WEIGHTS.PROJECTS.DEPLOYMENT_VERIFIED) +
    (readmeScore * READINESS_WEIGHTS.PROJECTS.README_CHECKLIST);

  return Math.round(Math.min(100, Math.max(0, weightedScore)));
}

/**
 * Calculates Interview Readiness Score (0-100)
 */
export function calculateInterviewReadiness(params: {
  mocksCompleted: number;      // number of simulated mock rounds
  targetMocks?: number;        // default target mocks (e.g. 10)
  confidenceRating: number;    // 1 to 5 scale
  mockScoresAverage: number;   // average score in percent (0 to 100)
}): number {
  const { mocksCompleted, targetMocks = 10, confidenceRating, mockScoresAverage } = params;

  // Mocks frequency index (0-100)
  const frequencyScore = Math.min(100, (mocksCompleted / targetMocks) * 100);

  // Confidence index (0-100)
  const confidenceScore = (confidenceRating / 5) * 100;

  const weightedScore = 
    (frequencyScore * READINESS_WEIGHTS.INTERVIEWS.MOCKS_COMPLETED) +
    (confidenceScore * READINESS_WEIGHTS.INTERVIEWS.CONFIDENCE_RATING) +
    (mockScoresAverage * READINESS_WEIGHTS.INTERVIEWS.ATTEMPT_CONSISTENCY);

  return Math.round(Math.min(100, Math.max(0, weightedScore)));
}

/**
 * Calculates Company Readiness Score (0-100)
 */
export function calculateCompanyReadiness(params: {
  completedTimelineSteps: number; // steps checked on active company prep path
  totalTimelineSteps: number;     // total timeline steps (e.g. 4 phases)
  roundsReviewedCount: number;    // rounds prepared
  totalRoundsCount: number;       // total rounds in company loop
  resourcesCheckedCount: number;  // company resource files read
  totalResourcesCount: number;    // total resources
}): number {
  const {
    completedTimelineSteps,
    totalTimelineSteps,
    roundsReviewedCount,
    totalRoundsCount,
    resourcesCheckedCount,
    totalResourcesCount
  } = params;

  // Timeline progress index (0-100)
  const timelineScore = totalTimelineSteps > 0
    ? (completedTimelineSteps / totalTimelineSteps) * 100
    : 0;

  // Rounds prepared index (0-100)
  const roundsScore = totalRoundsCount > 0
    ? (roundsReviewedCount / totalRoundsCount) * 100
    : 0;

  // Resources read index (0-100)
  const resourcesScore = totalResourcesCount > 0
    ? (resourcesCheckedCount / totalResourcesCount) * 100
    : 0;

  const weightedScore = 
    (timelineScore * READINESS_WEIGHTS.COMPANY.TIMELINE_PROGRESS) +
    (roundsScore * READINESS_WEIGHTS.COMPANY.ROUNDS_REVIEWED) +
    (resourcesScore * READINESS_WEIGHTS.COMPANY.COMPANY_RESOURCES);

  return Math.round(Math.min(100, Math.max(0, weightedScore)));
}

/**
 * Calculates Overall Career Score (0-100)
 */
export function calculateOverallCareerScore(params: {
  resumeReadiness: number;
  dsaReadiness: number;
  projectReadiness: number;
  interviewReadiness: number;
  companyReadiness: number;
}): number {
  const { resumeReadiness, dsaReadiness, projectReadiness, interviewReadiness, companyReadiness } = params;

  const weightedScore = 
    (dsaReadiness * READINESS_WEIGHTS.OVERALL.DSA) +
    (projectReadiness * READINESS_WEIGHTS.OVERALL.PROJECTS) +
    (resumeReadiness * READINESS_WEIGHTS.OVERALL.RESUME) +
    (companyReadiness * READINESS_WEIGHTS.OVERALL.COMPANY) +
    (interviewReadiness * READINESS_WEIGHTS.OVERALL.INTERVIEW);

  return Math.round(Math.min(100, Math.max(0, weightedScore)));
}
