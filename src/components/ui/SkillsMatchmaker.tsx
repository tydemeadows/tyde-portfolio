"use client";

import { useState, useRef } from "react";
import type { MatchResult } from "@/types/matchmaker";

const LOADING_STEPS = [
  "🔍 Parsing job description…",
  "🧠 Mapping requirements to experience…",
  "⚖️  Scoring skill alignment…",
  "📝 Generating match report…",
];

type ScoreTier = "high" | "medium" | "low";

function getTier(score: number): ScoreTier {
  if (score >= 75) return "high";
  if (score >= 50) return "medium";
  return "low";
}

const tierStyles: Record<ScoreTier, { banner: string; ring: string; label: string }> = {
  high:   { banner: "bg-emerald-50 border-emerald-200",    ring: "#059669", label: "text-emerald-800" },
  medium: { banner: "bg-amber-50 border-amber-200",         ring: "#d97706", label: "text-amber-800"   },
  low:    { banner: "bg-red-50 border-red-200",             ring: "#dc2626", label: "text-red-800"     },
};

interface ScoreRingProps { score: number; color: string }
function ScoreRing({ score, color }: ScoreRingProps) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg className="absolute inset-0 -rotate-90" width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#e5e7eb" strokeWidth="5" />
        <circle
          cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ.toFixed(1)} strokeDashoffset={offset.toFixed(1)}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-extrabold text-stone-900 leading-none">{score}</span>
        <span className="font-mono text-[9px] text-stone-400 leading-none mt-0.5">/100</span>
      </div>
    </div>
  );
}

export default function SkillsMatchmaker() {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  async function analyze() {
    if (!jd.trim() || jd.trim().length < 50) {
      setError("Please paste a complete job description (at least 50 characters).");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    setActiveStep(0);

    // Animate loading steps
    const timers: ReturnType<typeof setTimeout>[] = [];
    LOADING_STEPS.forEach((_, i) => {
      if (i === 0) return;
      timers.push(setTimeout(() => setActiveStep(i), i * 900));
    });

    try {
      const res = await fetch("/api/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Request failed");
      setResult(data.result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      timers.forEach(clearTimeout);
      setLoading(false);
      setActiveStep(-1);
    }
  }

  function clear() {
    setJd("");
    setResult(null);
    setError(null);
  }

  const tier = result ? getTier(result.score) : "high";
  const ts = tierStyles[tier];

  return (
    <div className="w-full max-w-[1100px] mt-16">
      {/* ── Card ── */}
      <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="bg-gradient-to-br from-[#0f1f4a] via-[#1a3a8f] to-[#1e4fd8] p-8 flex flex-wrap gap-6 justify-between">
          <div className="flex-1 min-w-60">
            {/* Live dot badge */}
            <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase
                           bg-white/10 border border-white/20 text-white/80 px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80] animate-pulse" />
              AI-Powered · Claude Sonnet
            </div>
            <h2 className="font-serif text-3xl font-normal text-white tracking-tight mb-2 leading-tight">
              Skills <em className="italic text-blue-300">Matchmaker</em>
            </h2>
            <p className="text-sm text-white/60 font-light leading-relaxed max-w-md">
              Paste any job description. The agent analyzes it against my full resume — 
              scoring fit, identifying matched skills, surfacing gaps, and generating 
              tailored interview questions.
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end self-start pt-1">
            <div className="font-mono text-[10px] text-white/50 bg-white/7 border border-white/10
                           rounded-lg px-3 py-2 text-right leading-relaxed">
              <span className="text-white/80 font-semibold block">~$0.002</span>
              per analysis
            </div>
            <div className="font-mono text-[10px] text-white/50 bg-white/7 border border-white/10
                           rounded-lg px-3 py-2 text-right leading-relaxed">
              <span className="text-white/80 font-semibold block">Multi-step</span>
              agentic reasoning
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          {/* Input */}
          <label className="block font-mono text-[11px] tracking-[0.14em] uppercase text-stone-400 mb-2.5">
            Paste a job description
          </label>
          <div className="relative mb-4">
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Paste the full job description here — title, responsibilities, required skills, preferred qualifications, etc."
              rows={6}
              className="w-full p-4 pr-14 bg-stone-50 border border-stone-200 rounded-2xl
                         font-sans text-[13px] text-stone-800 leading-relaxed resize-y
                         focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
                         placeholder:text-stone-400 transition-all duration-200"
            />
            <span className="absolute bottom-3 right-4 font-mono text-[10px] text-stone-400 pointer-events-none">
              {jd.length.toLocaleString()} chars
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl
                           text-[13px] text-red-700 font-light">
              ⚠️ {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={analyze}
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                         bg-gradient-to-br from-[#1a3a8f] to-[#1e4fd8] text-white
                         text-[13px] font-semibold shadow-md shadow-blue-200
                         hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-px
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                         transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              {loading ? "Analyzing…" : "Analyze Match"}
            </button>
            <button
              onClick={clear}
              className="px-4 py-2.5 rounded-full bg-stone-100 border border-stone-200
                         text-[12px] font-medium text-stone-500 hover:bg-stone-200
                         hover:text-stone-700 transition-colors"
            >
              Clear
            </button>
            <span className="ml-auto font-mono text-[10px] text-stone-400">
              Powered by Claude · ~5 sec
            </span>
          </div>

          {/* Loading steps */}
          {loading && (
            <div className="flex items-center gap-4 mt-6">
              <div className="w-5 h-5 rounded-full border-2 border-stone-200 border-t-blue-500
                             animate-spin shrink-0" />
              <div className="flex flex-col gap-1">
                {LOADING_STEPS.map((s, i) => (
                  <div
                    key={i}
                    className={`font-mono text-[11px] transition-all duration-400
                               ${i === activeStep
                                 ? "text-blue-600 font-medium opacity-100"
                                 : i < activeStep
                                 ? "text-stone-400 opacity-60"
                                 : "text-stone-300 opacity-40"}`}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Results ── */}
          {result && (
            <div ref={resultsRef} className="mt-8 space-y-5">

              {/* Score banner */}
              <div className={`flex items-center gap-5 p-5 rounded-2xl border flex-wrap ${ts.banner}`}>
                <ScoreRing score={result.score} color={ts.ring} />
                <div className="flex-1 min-w-48">
                  <div className={`text-base font-bold mb-1 ${ts.label}`}>{result.scoreLabel}</div>
                  <p className="text-[13px] text-stone-600 font-light leading-relaxed">
                    {result.scoreSummary}
                  </p>
                </div>
              </div>

              {/* Skill chips */}
              <div>
                <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-stone-400 mb-2.5">
                  Skill Alignment
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.matchedSkills?.map((s) => (
                    <span key={s} className="font-mono text-[10px] px-3 py-1 rounded-full
                                            bg-emerald-50 border border-emerald-200 text-emerald-700">
                      ✓ {s}
                    </span>
                  ))}
                  {result.gaps?.map((s) => (
                    <span key={s} className="font-mono text-[10px] px-3 py-1 rounded-full
                                            bg-amber-50 border border-amber-200 text-amber-700">
                      △ {s}
                    </span>
                  ))}
                  {result.bonusSkills?.map((s) => (
                    <span key={s} className="font-mono text-[10px] px-3 py-1 rounded-full
                                            bg-blue-50 border border-blue-200 text-blue-700">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3-col grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Strong matches */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                  <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase
                                 text-emerald-600 mb-3 flex items-center gap-2">
                    <span>✅</span> Strong Matches
                  </h4>
                  <ul className="space-y-2">
                    {result.highlights?.map((h, i) => (
                      <li key={i} className="text-[13px] text-stone-600 font-light leading-relaxed
                                            pl-4 relative">
                        <span className="absolute left-0 text-emerald-500 font-bold text-base leading-snug">›</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaps */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                  <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase
                                 text-amber-600 mb-3 flex items-center gap-2">
                    <span>⚠️</span> Gaps to Address
                  </h4>
                  <ul className="space-y-2">
                    {(result.gaps_context ?? result.gaps)?.map((g, i) => (
                      <li key={i} className="text-[13px] text-stone-600 font-light leading-relaxed
                                            pl-4 relative">
                        <span className="absolute left-0 text-amber-500 font-bold text-base leading-snug">›</span>
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pitch */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5">
                  <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase
                                 text-blue-600 mb-3 flex items-center gap-2">
                    <span>🎯</span> Application Pitch
                  </h4>
                  <p className="text-[13px] text-stone-600 font-light leading-relaxed pl-4 relative">
                    <span className="absolute left-0 text-blue-500 font-bold text-base leading-snug">›</span>
                    {result.pitch}
                  </p>
                </div>
              </div>

              {/* Interview questions */}
              <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5">
                <h4 className="font-mono text-[10px] tracking-[0.14em] uppercase
                               text-blue-600 mb-3 flex items-center gap-2">
                  💬 Suggested Interview Questions
                </h4>
                <ol className="list-decimal list-inside space-y-2">
                  {result.interviewQuestions?.map((q, i) => (
                    <li key={i} className="text-[13px] text-stone-600 font-light leading-relaxed">{q}</li>
                  ))}
                </ol>
              </div>

            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-stone-100 font-mono text-[10px] text-stone-400
                         flex items-center gap-2">
            <span>⚡</span>
            Powered by Anthropic Claude · Analysis runs against Tyde&apos;s verified resume data · No job description data is stored
          </div>
        </div>
      </div>
    </div>
  );
}
