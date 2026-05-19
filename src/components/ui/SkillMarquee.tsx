"use client";

import type { SkillPill, SkillLevel } from "@/lib/resume-data";

interface Props {
  rows: SkillPill[][];
}

const pillStyles: Record<SkillLevel, string> = {
  expert:  "border-blue-200 bg-blue-50/60 shadow-blue-100/50",
  strong:  "border-stone-200 bg-white",
  capable: "border-stone-200 bg-white opacity-80",
};

const nameStyles: Record<SkillLevel, string> = {
  expert:  "text-[14px] font-extrabold text-stone-900",
  strong:  "text-[13px] font-semibold text-stone-800",
  capable: "text-[11px] font-normal text-stone-600",
};

const iconStyles: Record<SkillLevel, string> = {
  expert:  "text-base",
  strong:  "text-[15px]",
  capable: "text-[13px] opacity-70",
};

const animationClass = ["animate-marquee-left", "animate-marquee-right", "animate-marquee-left-slow"];

export default function SkillMarquee({ rows }: Props) {
  return (
    <div className="relative w-full max-w-[1100px] overflow-hidden flex flex-col gap-2.5 mb-6">
      {/* fade edges */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 z-10
                      bg-gradient-to-r from-[#f6f4f0] to-transparent" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 z-10
                      bg-gradient-to-l from-[#f6f4f0] to-transparent" />

      {rows.map((pills, rowIdx) => (
        <div
          key={rowIdx}
          className={`flex gap-2.5 w-max ${animationClass[rowIdx]}
                      hover:[animation-play-state:paused]`}
        >
          {/* Duplicate for seamless loop */}
          {[...pills, ...pills].map((p, i) => (
            <div
              key={i}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full
                         border shadow-sm cursor-default
                         hover:shadow-md hover:-translate-y-px transition-all duration-200
                         ${pillStyles[p.level]}`}
            >
              <span className={`w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0 ${iconStyles[p.level]}`}>
                {p.icon}
              </span>
              <span className={nameStyles[p.level]}>{p.name}</span>
              <span className="w-px h-3 bg-stone-200 shrink-0" />
              <span className="font-mono text-[10px] text-stone-400">{p.cat}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
