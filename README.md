# StackMap: Student Tech Career Roadmap Platform

StackMap is a full-stack learning roadmaps platform designed for tech students. It provides interactive curriculum roadmaps, progress gauges, job & internship pipelines, DSA trackers, a resource hub, and an AI study mentor.

## 🚀 Key Stack & Architecture
- **Framework:** Next.js (App Router, Tailwind CSS, TypeScript, v16/v15 canary)
- **Database:** Prisma ORM, PostgreSQL (local sqlite mock fallback config)
- **Authentication:** NextAuth (Credentials & OAuth providers)
- **Graph & Charts:** React Flow (`@xyflow/react`) for roadmaps, Recharts for statistics
- **State Management:** Zustand (reactive dashboard & tracker sync)
- **Animations:** Three.js (3D particle mesh hero), Framer Motion, GSAP, Lenis smooth scrolling

---

## 📂 Project Directory Structure

```
├── prisma
│   ├── schema.prisma         # Prisma schemas defining User, Progress, Trackers
│   └── seed.ts               # Database Reset & Seeding for 5 career blueprints
├── src
│   ├── app
│   │   ├── (auth)
│   │   │   └── login         # Credentials login page
│   │   ├── admin             # CRUD path controls & user submission lists
│   │   ├── api               # REST APIs (Auth, AI Mentor, Tracker sync)
│   │   ├── dashboard         # Study statistics & consistency charts
│   │   ├── mentor            # AI chatbot (study schedules, projects planner)
│   │   ├── profile           # Account settings & resume repositories
│   │   ├── projects          # Curated project ideas catalog by difficulty
│   │   ├── resources         # Study documentation, courses, and video indexes
│   │   └── roadmaps          # Pathway graphs (React Flow) & resource panels
│   ├── components
│   │   ├── dashboard         # Metrics grids & Recharts components
│   │   ├── landing           # ThreeJS 3D hero background
│   │   ├── layout            # Theme controller & sidebar navigation layout
│   │   ├── roadmap           # Custom node templates & resource detail drawers
│   │   └── ui                # Button, Card, Badge, Input widgets
│   ├── hooks                 # Parallax scroll & custom animations
│   ├── lib
│   │   ├── auth.ts           # NextAuth session callback options
│   │   ├── db.ts             # Prisma client instance & mockup state store
│   │   ├── roadmapBlueprints.ts # JSON configurations for default roadmaps
│   │   └── utils.ts          # Tailwind CSS merge wrapper
│   └── store
│       ├── useRoadmapStore.ts # Global Zustand state for syllabus progress
│       └── useTrackerStore.ts # Global Zustand state for placements & DSA
```

---

## 🛠️ Getting Started (Local Development)

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables (`.env`)
Create a `.env` file in the root directory:
```env
# PostgreSQL connection url (e.g. Supabase, Docker, local Postgres)
DATABASE_URL="postgresql://user:password@localhost:5432/stackmap?schema=public"

# NextAuth configuration secrets
NEXTAUTH_SECRET="your-32-character-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google Gemini API key for AI Mentor recommendations (Optional)
GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere"
```
> **Note:** If `DATABASE_URL` is omitted, the platform automatically starts in **Offline Mock Mode**, utilizing an in-memory JSON data manager. This enables testing of all panels, trackers, and note additions without database configurations.

### 3. Deploy Database Migrations & Seed Blueprints
If PostgreSQL is configured:
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 AI Mentor Queries
The AI Mentor is pre-tuned to handle specific curriculum commands. Try asking:
1. `Generate a 7-day study plan for mastering React Hooks.`
2. `Give me mock interview questions for frontend roles.`
3. `Suggest Node.js backend projects containing databases.`

---

## 📦 Production Deployment
1. **Database:** Deploy PostgreSQL on [Supabase](https://supabase.com) or [Neon](https://neon.tech).
2. **Hosting:** Deploy on [Vercel](https://vercel.com) by connecting your Git repository.
3. **Environment variables:** Configure `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, and `GEMINI_API_KEY` in your Vercel deployment settings.
