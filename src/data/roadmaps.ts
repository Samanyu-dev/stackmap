import { RoadmapData } from "@/store/useRoadmapStore";

import frontendDeveloper from "./blueprints/frontend-developer.json";
import backendDeveloper from "./blueprints/backend-developer.json";
import fullstackDeveloper from "./blueprints/fullstack-developer.json";
import android from "./blueprints/android.json";
import ios from "./blueprints/ios.json";
import qa from "./blueprints/qa.json";
import blockchain from "./blueprints/blockchain.json";
import gameDeveloper from "./blueprints/game-developer.json";
import serverSideGameDeveloper from "./blueprints/server-side-game-developer.json";
import softwareArchitect from "./blueprints/software-architect.json";
import developerRelations from "./blueprints/developer-relations.json";
import forwardDeployedEngineer from "./blueprints/forward-deployed-engineer.json";
import devopsEngineer from "./blueprints/devops-engineer.json";
import devsecops from "./blueprints/devsecops.json";
import postgresql from "./blueprints/postgresql.json";
import networkEngineer from "./blueprints/network-engineer.json";
import cyberSecurity from "./blueprints/cyber-security.json";
import dataAnalyst from "./blueprints/data-analyst.json";
import biAnalyst from "./blueprints/bi-analyst.json";
import dataEngineer from "./blueprints/data-engineer.json";
import machineLearning from "./blueprints/machine-learning.json";
import aiEngineer from "./blueprints/ai-engineer.json";
import aiDataScientist from "./blueprints/ai-data-scientist.json";
import mlops from "./blueprints/mlops.json";
import uxDesign from "./blueprints/ux-design.json";
import productManager from "./blueprints/product-manager.json";
import engineeringManager from "./blueprints/engineering-manager.json";
import technicalWriter from "./blueprints/technical-writer.json";
import dsa from "./blueprints/dsa.json";

export interface RoadmapMetaData {
  id: string;
  title: string;
  slug: string;
  category: "DEVELOPMENT" | "DATA_SCIENCE" | "SYSTEMS" | "PREPARATION";
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  estimatedDuration: string;
  prerequisites: string[];
  languages: string[];
  tools: string[];
  frameworks: string[];
  databases: string[];
  testing: string[];
  deployment: string[];
  advancedConcepts: string[];
  projects: string[];
  interviewQuestions: string[];
}

export const roadmaps: Record<string, RoadmapData> = {
  "frontend-developer": frontendDeveloper as unknown as RoadmapData,
  "backend-developer": backendDeveloper as unknown as RoadmapData,
  "fullstack-developer": fullstackDeveloper as unknown as RoadmapData,
  "android": android as unknown as RoadmapData,
  "ios": ios as unknown as RoadmapData,
  "qa": qa as unknown as RoadmapData,
  "blockchain": blockchain as unknown as RoadmapData,
  "game-developer": gameDeveloper as unknown as RoadmapData,
  "server-side-game-developer": serverSideGameDeveloper as unknown as RoadmapData,
  "software-architect": softwareArchitect as unknown as RoadmapData,
  "developer-relations": developerRelations as unknown as RoadmapData,
  "forward-deployed-engineer": forwardDeployedEngineer as unknown as RoadmapData,
  "devops-engineer": devopsEngineer as unknown as RoadmapData,
  "devsecops": devsecops as unknown as RoadmapData,
  "postgresql": postgresql as unknown as RoadmapData,
  "network-engineer": networkEngineer as unknown as RoadmapData,
  "cyber-security": cyberSecurity as unknown as RoadmapData,
  "data-analyst": dataAnalyst as unknown as RoadmapData,
  "bi-analyst": biAnalyst as unknown as RoadmapData,
  "data-engineer": dataEngineer as unknown as RoadmapData,
  "machine-learning": machineLearning as unknown as RoadmapData,
  "ai-engineer": aiEngineer as unknown as RoadmapData,
  "ai-data-scientist": aiDataScientist as unknown as RoadmapData,
  "mlops": mlops as unknown as RoadmapData,
  "ux-design": uxDesign as unknown as RoadmapData,
  "product-manager": productManager as unknown as RoadmapData,
  "engineering-manager": engineeringManager as unknown as RoadmapData,
  "technical-writer": technicalWriter as unknown as RoadmapData,
  "dsa": dsa as unknown as RoadmapData
};
