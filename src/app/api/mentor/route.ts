import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Connect to Google Gemini
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const promptContext = `You are a helpful and experienced senior software engineer mentor advising a tech student named Alex. Keep responses brief, structured, and action-oriented. Query: ${prompt}`;
      
      const result = await model.generateContent(promptContext);
      const response = await result.response;
      return NextResponse.json({ response: response.text() });
    }

    // Dynamic Mock responses fallback matching keywords
    let responseText = "";
    const cleanPrompt = prompt.toLowerCase();

    if (cleanPrompt.includes("7-day") || cleanPrompt.includes("7 day")) {
      responseText = `### 📅 7-Day React State & Hooks Mastery Plan

Here is your focused 7-day study plan:

- **Day 1: Understanding Props vs State**
  - Build a simple component that alters views based on internal state changes.
  - Read: [React State Documentation](https://react.dev/learn/state-a-components-memory).
- **Day 2: The useEffect Hook**
  - Fetch data from a mock REST endpoint (JSONPlaceholder) and render a list. Manage loading and error states.
- **Day 3: Custom Hooks Creation**
  - Refactor your Day 2 API logic into a custom \`useFetch\` hook to reuse in other panels.
- **Day 4: Global State via Context**
  - Build a dark/light theme toggle provider using React Context API.
- **Day 5: State optimization with useMemo & useCallback**
  - Learn when to memoize expensive computations or reference callbacks.
- **Day 6: Capstone practice**
  - Combine your \`useFetch\` and Context hooks into a simple dashboard widget.
- **Day 7: Review & Checkpoints**
  - Write unit tests for your hooks and push the code.`;
    } else if (cleanPrompt.includes("interview") || cleanPrompt.includes("question")) {
      responseText = `### 📝 Technical Interview Prep: JavaScript & CSS

Here are 5 intermediate-level questions:

1. **What is the difference between event.preventDefault() and event.stopPropagation()?**
   - *Answer:* \`preventDefault()\` stops the browser's default action (e.g. form submission), while \`stopPropagation()\` prevents the event from bubbling up the DOM tree.
2. **What is a Closure in JavaScript and give a simple use case?**
   - *Answer:* A closure is the combination of a function bundled together with references to its surrounding state. It allows inner functions to access outer scope variables even after the outer function executes.
3. **How does CSS Flexbox differ from CSS Grid in page layout architecture?**
   - *Answer:* Flexbox is primarily 1-dimensional (arranging items in a row or column), while CSS Grid is 2-dimensional (arranging items in rows AND columns).
4. **What are the rules of Hooks in React?**
   - *Answer:* Only call hooks at the top level (not inside loops or conditions) and only call them from React Function Components or Custom Hooks.
5. **How do you optimize Interaction to Next Paint (INP) scores in Next.js?**
   - *Answer:* Defer non-critical javascript execution, minimize main-thread execution using Web Workers, and batch state updates to prevent browser layout thrashing.`;
    } else if (cleanPrompt.includes("project") || cleanPrompt.includes("brainstorm")) {
      responseText = `### 🛠️ Backend Project Idea: Dockerized Task Manager

Build a Task Organizer API.

**Starter Stack:** Node.js, Express.js, PostgreSQL, Prisma, Docker.

**Core Build Checklist:**
- [ ] Write a \`Dockerfile\` and a \`docker-compose.yml\` containing the Express backend and PostgreSQL database.
- [ ] Connect Prisma client, and define models for \`User\` and \`Task\` with 1-to-N relationships.
- [ ] Code a \`/api/auth/register\` and \`/api/auth/login\` endpoint hashing passwords with bcrypt.
- [ ] Set up JWT middleware validation to lock the task endpoints.
- [ ] Build a \`/api/tasks\` route with filtering parameters for completed status.`;
    } else {
      responseText = `I've analyzed your student profile and active roadmaps. 

Currently, you've completed **3 topics** in your **Frontend Developer** syllabus, and you have **3 active job applications** in your pipeline (including Google and Stripe).

**Suggested Action:**
To boost your readiness for the upcoming Google mockup interview, I suggest studying **Arrays and Linked List complexity** in the **DSA Pathway** or practicing Graph algorithms. Let me know if you want me to generate a 30-day study timeline for DSA!`;
    }

    return NextResponse.json({ response: responseText });
  } catch (err: any) {
    console.error("AI Mentor endpoint error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
