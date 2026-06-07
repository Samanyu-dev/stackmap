export interface AnalysisResult {
  overallScore: number;
  sectionScores: {
    skills: number;
    keywords: number;
    projects: number;
    experience: number;
    atsFormat: number;
  };
  missingSkills: string[];
  missingKeywords: string[];
  improvementChecklist: { id: string; text: string; completed: boolean }[];
  suggestedRoadmaps: string[];
  suggestedProjects: string[];
  estimatedScoreImprovement: number;
}

// Common skills dictionary for analyzer parsing
const SKILL_KEYWORDS = [
  "react", "next.js", "typescript", "javascript", "tailwind css", "css", "html",
  "node.js", "express", "prisma", "postgresql", "mongodb", "mysql", "sql", "git",
  "docker", "kubernetes", "aws", "gcp", "devops", "ci/cd", "rest apis", "graphql",
  "python", "django", "fastapi", "machine learning", "deep learning", "ai", "gemini",
  "data structures", "algorithms", "system design", "redis", "nginx", "testing", "jest"
];

// Map matching keywords/skills to recommended pathways and projects
const PATHWAY_RECOMMENDATIONS: Record<string, { pathway: string; project: string; projectLink: string }> = {
  "react": { pathway: "Frontend Developer", project: "Sleek Dark Portfolio", projectLink: "/project-roadmaps/portfolio-website" },
  "next.js": { pathway: "Frontend Developer", project: "AI Resume Analyzer", projectLink: "/project-roadmaps/ai-resume-analyzer" },
  "node.js": { pathway: "Backend Developer", project: "Secure Task REST API", projectLink: "/project-roadmaps/url-shortener" },
  "postgresql": { pathway: "Backend Developer", project: "E-Commerce System", projectLink: "/project-roadmaps/e-commerce-platform" },
  "docker": { pathway: "DevOps Engineer", project: "DevOps CI/CD Pipeline", projectLink: "/project-roadmaps/devops-cicd-pipeline" },
  "algorithms": { pathway: "DSA Preparation", project: "LeetCode Practice", projectLink: "/tracker/dsa" }
};

export function analyzeResume(resumeText: string, jobDescriptionText: string): AnalysisResult {
  const resume = resumeText.toLowerCase();
  const jd = jobDescriptionText.toLowerCase();

  // 1. Skill Match Calculations
  const presentSkills: string[] = [];
  const missingSkills: string[] = [];

  SKILL_KEYWORDS.forEach((skill) => {
    if (jd.includes(skill)) {
      if (resume.includes(skill)) {
        presentSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    }
  });

  const totalJdSkills = presentSkills.length + missingSkills.length;
  const skillsScore = totalJdSkills > 0 ? Math.round((presentSkills.length / totalJdSkills) * 100) : 70;

  // 2. Keyword Match Calculations
  const keywords = ["scale", "optimize", "cloud", "security", "database", "responsive", "agile", "collaboration", "ci/cd", "performance"];
  const presentKeywords: string[] = [];
  const missingKeywords: string[] = [];

  keywords.forEach((word) => {
    if (jd.includes(word)) {
      if (resume.includes(word)) {
        presentKeywords.push(word);
      } else {
        missingKeywords.push(word);
      }
    }
  });

  const totalJdKeywords = presentKeywords.length + missingKeywords.length;
  const keywordsScore = totalJdKeywords > 0 ? Math.round((presentKeywords.length / totalJdKeywords) * 100) : 65;

  // 3. Project Relevance (Check for keywords like project, git, github, portfolio)
  let projectsScore = 50;
  if (resume.includes("project") || resume.includes("portfolio")) projectsScore += 20;
  if (resume.includes("github.com") || resume.includes("git ")) projectsScore += 20;
  if (presentSkills.some(s => ["react", "next.js", "node.js"].includes(s))) projectsScore += 10;
  projectsScore = Math.min(projectsScore, 100);

  // 4. Experience Relevance
  let experienceScore = 40;
  if (resume.includes("experience") || resume.includes("intern")) experienceScore += 30;
  if (resume.includes("year") || resume.includes("month")) experienceScore += 20;
  if (resume.includes("led ") || resume.includes("built ")) experienceScore += 10;
  experienceScore = Math.min(experienceScore, 100);

  // 5. ATS Formatting Quality
  let atsScore = 90; // Start high, deduct for common formatting issues in text
  const checklist = [
    { id: "c1", text: "Avoid multiple column layouts which throw off standard scanners", completed: true },
    { id: "c2", text: "Ensure presence of Contact info, Email, and GitHub link", completed: false },
    { id: "c3", text: "Utilize metrics-focused action points (e.g. 'Improved efficiency by 20%')", completed: false },
    { id: "c4", text: "Keep overall document under a 1-page structure", completed: true }
  ];

  if (!resume.includes("email") && !resume.includes("@")) {
    atsScore -= 20;
  } else {
    checklist[1].completed = true;
  }

  if (resume.includes("%") || resume.includes("increased") || resume.includes("improved")) {
    checklist[2].completed = true;
  } else {
    atsScore -= 15;
  }

  // Calculate overall rating
  const overallScore = Math.round(
    (skillsScore * 0.35) +
    (keywordsScore * 0.25) +
    (projectsScore * 0.15) +
    (experienceScore * 0.15) +
    (atsScore * 0.10)
  );

  // Suggested roadmap and project paths based on missing skills
  const suggestedRoadmapsSet = new Set<string>();
  const suggestedProjectsSet = new Set<string>();

  missingSkills.slice(0, 3).forEach((skill) => {
    const rec = PATHWAY_RECOMMENDATIONS[skill];
    if (rec) {
      suggestedRoadmapsSet.add(rec.pathway);
      suggestedProjectsSet.add(`${rec.project} (Link: ${rec.projectLink})`);
    }
  });

  // Default fallbacks if empty
  if (suggestedRoadmapsSet.size === 0) {
    suggestedRoadmapsSet.add("Frontend Developer");
    suggestedRoadmapsSet.add("DSA Preparation");
  }
  if (suggestedProjectsSet.size === 0) {
    suggestedProjectsSet.add("AI Resume Analyzer (Link: /project-roadmaps/ai-resume-analyzer)");
  }

  // Calculate estimated improvement potential
  const estimatedScoreImprovement = Math.round(
    (missingSkills.length * 4) + (missingKeywords.length * 3) + (checklist.filter(c => !c.completed).length * 5)
  );

  return {
    overallScore,
    sectionScores: {
      skills: skillsScore,
      keywords: keywordsScore,
      projects: projectsScore,
      experience: experienceScore,
      atsFormat: atsScore
    },
    missingSkills: missingSkills.map(s => s.toUpperCase()),
    missingKeywords: missingKeywords.map(k => k.toUpperCase()),
    improvementChecklist: checklist,
    suggestedRoadmaps: Array.from(suggestedRoadmapsSet),
    suggestedProjects: Array.from(suggestedProjectsSet),
    estimatedScoreImprovement: Math.min(estimatedScoreImprovement, 100 - overallScore)
  };
}
