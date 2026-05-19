"use client";

import { useState } from "react";
import type { Employer } from "@/lib/resume-data";

interface Props {
  employer: Employer;
}

const badgeStyles: Record<string, string> = {
  current: "bg-emerald-50 border-emerald-300 text-emerald-700",
  founder: "bg-orange-50 border-orange-300 text-orange-700",
  default: "bg-stone-100 border-stone-300 text-stone-500",
};

export default function EmployerCard({ employer: e }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="group relative bg-white border border-stone-200 rounded-2xl p-6 overflow-hidden
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-stone-300"
    >
      {/* Accent bar — slides in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl
                   scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-[380ms] ease-out"
        style={{ background: e.accent }}
      />

      {/* Logo + badges */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-[13px] border border-stone-200 flex items-center justify-center
                     text-lg font-extrabold font-sans tracking-tighter shrink-0"
          style={{ background: e.logoBg, color: e.logoColor }}
        >
          {e.initials}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {e.badges.map((b) => (
            <span
              key={b.label}
              className={`font-mono text-[10px] tracking-widest uppercase px-2.5 py-[3px]
                         rounded-full border whitespace-nowrap ${badgeStyles[b.variant]}`}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="text-[17px] font-bold text-stone-900 tracking-tight leading-tight mb-0.5">
        {e.company}
      </div>
      <div className="text-[13px] font-medium text-stone-600 mb-1">{e.role}</div>
      <div className="font-mono text-[10px] text-stone-400 mb-3.5 flex flex-wrap gap-1.5">
        <span>📅 {e.dates}</span>
        <span>· {e.duration}</span>
        {e.location && <span>📍 {e.location}</span>}
      </div>

      <p className="text-[13px] text-stone-600 leading-relaxed font-light mb-3.5">
        {e.desc}
      </p>

      {/* Collapsible highlights */}
      <div className="border-t border-stone-100">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between py-2.5 font-mono text-[10px]
                     tracking-[0.12em] uppercase text-stone-400 hover:text-stone-600 transition-colors"
        >
          <span>{open ? "Hide Details" : "Key Responsibilities"}</span>
          <span
            className={`inline-block w-[7px] h-[7px] border-r-[1.5px] border-b-[1.5px]
                       border-current transition-transform duration-250
                       ${open ? "-rotate-135 translate-y-[2px]" : "rotate-45 -translate-y-[1px]"}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-350 ease-out
                      ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          <ul className="flex flex-col gap-2 pb-3.5">
            {e.highlights.map((h, i) => (
              <li
                key={i}
                className="text-[13px] text-stone-600 leading-relaxed font-light pl-4 relative"
              >
                <span
                  className="absolute left-0 text-base font-bold leading-snug"
                  style={{ color: e.accent }}
                >
                  ›
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {e.skills.map((s) => (
          <span
            key={s}
            className="font-mono text-[10px] px-2 py-[3px] rounded-[7px]
                       bg-stone-50 border border-stone-200 text-stone-600
                       hover:bg-stone-100 hover:border-stone-300 transition-colors cursor-default"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
