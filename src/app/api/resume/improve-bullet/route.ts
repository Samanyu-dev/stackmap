import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { bulletText, type } = await req.json();

    if (!bulletText) {
      return NextResponse.json({ error: "bulletText is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      // Connect to Google Gemini
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const prompt = `You are a resume writing expert. Optimize the following description/bullet point for a technical resume. Make it metric-oriented, impact-focused, and start with a strong action verb. Keep it to one single bullet sentence. Description: "${bulletText}"`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return NextResponse.json({ optimizedText: response.text().replace(/^[-*•\s]+/, "").trim() });
    }

    // Deterministic Mock optimization fallback
    let optimized = bulletText;
    const lower = bulletText.toLowerCase();

    const replacements = [
      { trigger: "helped build", replacement: "Collaborated in the system architecture and deployment of" },
      { trigger: "made a website", replacement: "Architected and engineered a responsive, high-performance web application" },
      { trigger: "fixed bugs", replacement: "Refactored legacy code structures and eliminated blocker memory leaks, reducing bounce rates" },
      { trigger: "managed database", replacement: "Designed relational database schema tables, executing query optimizations" },
      { trigger: "worked on", replacement: "Spearheaded development cycles and implemented scalable features for" },
      { trigger: "did testing", replacement: "Automated unit testing suites, achieving 90%+ branch code coverage" }
    ];

    let matched = false;
    for (const r of replacements) {
      if (lower.includes(r.trigger)) {
        optimized = bulletText.replace(new RegExp(r.trigger, "gi"), r.replacement);
        matched = true;
      }
    }

    if (!matched) {
      // Default metric-based enhancements
      optimized = `Spearheaded engineering initiatives to build ${bulletText.charAt(0).toLowerCase() + bulletText.slice(1)}, improving query performance and API response times by 25%.`;
    }

    return NextResponse.json({ optimizedText: optimized });
  } catch (err: any) {
    console.error("Resume bullet optimizer endpoint error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
