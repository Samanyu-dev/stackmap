import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("Cleaning database tables...");
  await prisma.resource.deleteMany({});
  await prisma.roadmapNode.deleteMany({});
  await prisma.roadmap.deleteMany({});

  console.log("Scanning roadmap blueprints directory...");
  const blueprintsDir = path.join(__dirname, "../src/data/blueprints");
  
  if (!fs.existsSync(blueprintsDir)) {
    throw new Error(`Blueprints directory does not exist at: ${blueprintsDir}`);
  }

  const files = fs.readdirSync(blueprintsDir).filter((f: string) => f.endsWith(".json"));

  console.log(`Found ${files.length} blueprint files. Seeding...`);

  for (const file of files) {
    const filePath = path.join(blueprintsDir, file);
    const rawData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(rawData);

    console.log(`Seeding roadmap: ${data.title} (${data.slug})`);

    const roadmap = await prisma.roadmap.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        estimatedTime: data.estimatedTime,
        category: data.category,
      }
    });

    for (const node of data.nodes) {
      const dbNode = await prisma.roadmapNode.create({
        data: {
          roadmapId: roadmap.id,
          slug: node.slug,
          title: node.title,
          description: node.description,
          difficulty: node.difficulty,
          estimatedTime: node.estimatedTime,
          prerequisites: node.prerequisites,
          order: node.order,
        }
      });

      if (node.resources && Array.isArray(node.resources)) {
        for (const res of node.resources) {
          await prisma.resource.create({
            data: {
              title: res.title,
              type: res.type,
              url: res.url,
              isApproved: true,
              roadmapNodeId: dbNode.id,
              roadmapId: roadmap.id
            }
          });
        }
      }
    }
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding process:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
