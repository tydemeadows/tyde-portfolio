// types/matchmaker.ts — shared types for the AI matchmaker feature

export interface MatchResult {
  score: number;
  scoreLabel: string;
  scoreSummary: string;
  matchedSkills: string[];
  gaps: string[];
  gaps_context: string[];
  bonusSkills: string[];
  highlights: string[];
  interviewQuestions: string[];
  pitch: string;
}

export interface MatchRequest {
  jobDescription: string;
}

export interface MatchResponse {
  result?: MatchResult;
  error?: string;
}
