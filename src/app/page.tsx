import { employers, skillRows, skillCategories } from "@/lib/resume-data";
import EmployerCard from "@/components/ui/EmployerCard";
import SkillMarquee from "@/components/ui/SkillMarquee";
import SkillCategoryGrid from "@/components/ui/SkillCategoryGrid";
import SkillsMatchmaker from "@/components/ui/SkillsMatchmaker";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f4f0] flex flex-col items-center px-6 py-18 overflow-x-hidden">

      {/* Grid texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-35 z-0"
        style={{
          backgroundImage:
            "linear-gradient(#e3dfd8 1px, transparent 1px), linear-gradient(90deg, #e3dfd8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* PAGE HEADER */}
      <div className="relative z-10 text-center mb-18 max-w-2xl">
        <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.24em] uppercase text-stone-400 mb-4">
          <span className="w-7 h-px bg-stone-300" />
          Portfolio · Resume
          <span className="w-7 h-px bg-stone-300" />
        </div>
        <h1 className="font-serif text-[clamp(38px,5.5vw,60px)] font-normal tracking-[-0.025em] leading-[1.08] text-stone-900 mb-4">
          Experience &amp; <em className="italic text-blue-600">Skills</em>
        </h1>
        <p className="text-[15px] text-stone-600 leading-relaxed font-light">
          Frontend Developer · Scrum Master · Co-Founder · Software Engineer<br />
          Huntsville–Decatur–Albertville, AL
        </p>
        <div className="flex items-center justify-center gap-2.5 mt-5 flex-wrap">
          <a
            href="https://www.linkedin.com/in/tyde-m-8a233215/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[11px] px-4 py-1.5 bg-white border border-stone-200 rounded-full text-stone-600 shadow-sm hover:border-blue-400 hover:text-blue-600 hover:-translate-y-px hover:shadow-md transition-all duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-4 py-1.5 bg-white border border-stone-200 rounded-full text-stone-500 shadow-sm">📍 Alabama, US</span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] px-4 py-1.5 bg-white border border-stone-200 rounded-full text-stone-500 shadow-sm">🖥️ Open to Opportunities</span>
        </div>
      </div>

      {/* EMPLOYERS */}
      <section className="relative z-10 w-full max-w-[1100px] mb-14">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-[15px] font-semibold text-stone-900 whitespace-nowrap tracking-tight">Where I&apos;ve Worked</h2>
          <span className="font-mono text-[11px] text-stone-400 bg-stone-100 border border-stone-200 rounded-full px-2 py-0.5">{employers.length}</span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {employers.map((emp) => (
            <EmployerCard key={emp.company} employer={emp} />
          ))}
        </div>
      </section>

      {/* BRIDGE */}
      <div className="relative z-10 flex items-center justify-center gap-3 mb-14 text-stone-400 w-full max-w-[1100px]">
        <div className="flex-1 max-w-60 h-px bg-stone-200" />
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Technologies across my career</span>
        <div className="flex-1 max-w-60 h-px bg-stone-200" />
      </div>

      {/* SKILLS HEADING + LEGEND */}
      <section className="relative z-10 w-full max-w-[1100px] mb-4">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-[15px] font-semibold text-stone-900 whitespace-nowrap tracking-tight">Technologies &amp; Tools</h2>
          <div className="flex-1 h-px bg-stone-200" />
        </div>
        <div className="flex items-center justify-center gap-2.5 flex-wrap mb-7">
          <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-stone-400 mr-1">Proficiency →</span>
          {[
            { cls: "text-[14px] font-extrabold text-stone-900", dot: "bg-blue-500",    label: "Expert"  },
            { cls: "text-[13px] font-semibold text-stone-700",  dot: "bg-emerald-500", label: "Strong"  },
            { cls: "text-[11px] font-normal text-stone-400",    dot: "bg-stone-400",   label: "Capable" },
          ].map(({ cls, dot, label }) => (
            <div key={label} className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-stone-200 rounded-full shadow-sm">
              <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
              <span className={cls}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-10">
        <SkillMarquee rows={skillRows} />
      </div>

      {/* CATEGORY GRID */}
      <div className="relative z-10">
        <SkillCategoryGrid categories={skillCategories} />
      </div>

      {/* SKILLS MATCHMAKER */}
      <div className="relative z-10 w-full max-w-[1100px]">
        <SkillsMatchmaker />
      </div>

    </main>
  );
}
