import { NextResponse } from "next/server";
import { analyzeResume } from "@/lib/resume-analyzer";

export async function POST(req: Request) {
  try {
    const { company, role, resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Both resume text and job description are required fields." },
        { status: 400 }
      );
    }

    const analysis = analyzeResume(resumeText, jobDescription);

    return NextResponse.json({
      company: company || "Target Company",
      role: role || "Target Role",
      ...analysis
    });
  } catch (err: any) {
    console.error("Resume readiness analyzer endpoint error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
