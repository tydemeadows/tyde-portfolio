// app/api/match/route.ts
// Server-side API route — API key never exposed to the browser

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { RESUME_CONTEXT } from "@/lib/resume-data";
import type { MatchRequest, MatchResponse } from "@/types/matchmaker";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert technical recruiter and career coach analyzing job fit for a specific candidate.

You have access to the candidate's full resume below. Your job is to carefully read a job description and produce a structured JSON analysis of how well this candidate matches the role.

CANDIDATE RESUME:
${RESUME_CONTEXT}

INSTRUCTIONS:
Analyze the job description against the candidate's experience. Return ONLY valid JSON — no markdown fences, no preamble, no trailing text. Use this exact schema:

{
  "score": <integer 0-100>,
  "scoreLabel": "<one of: Excellent Match | Strong Match | Good Match | Partial Match | Low Match>",
  "scoreSummary": "<2-3 sentence honest assessment of overall fit>",
  "matchedSkills": ["<skill or experience that directly matches a requirement>"],
  "gaps": ["<missing skill or experience from the JD>"],
  "bonusSkills": ["<skill Tyde has that goes beyond the JD requirements>"],
  "highlights": ["<specific experience bullet that strongly supports candidacy>"],
  "gaps_context": ["<brief explanation of each gap and how Tyde might address it>"],
  "interviewQuestions": ["<question a recruiter should ask to probe Tyde's fit>"],
  "pitch": "<1-2 sentence elevator pitch Tyde could use when applying for this role>"
}

Rules:
- matchedSkills: 4-8 items
- gaps: 2-5 items (be honest but constructive)
- bonusSkills: 2-4 items
- highlights: 3-5 items
- gaps_context: same length as gaps array
- interviewQuestions: 3-4 items
- Score generously only when skills truly match. Gaps should be real gaps, not nitpicks.`;

export async function POST(req: NextRequest): Promise<NextResponse<MatchResponse>> {
  try {
    const body: MatchRequest = await req.json();
    const { jobDescription } = body;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { error: "Job description is too short. Please paste the full description." },
        { status: 400 }
      );
    }

    if (jobDescription.length > 10000) {
      return NextResponse.json(
        { error: "Job description is too long (max 10,000 characters)." },
        { status: 400 }
      );
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Analyze this job description:\n\n${jobDescription.trim()}`,
        },
      ],
    });

    const raw = message.content[0].type === "text" ? message.content[0].text : "";
    const clean = raw.replace(/```json|```/gi, "").trim();
    const result = JSON.parse(clean);

    // Clamp score to valid range
    result.score = Math.max(0, Math.min(100, result.score));

    return NextResponse.json({ result });
  } catch (err) {
    console.error("Matchmaker API error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
