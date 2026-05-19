import type { SkillCategory, SkillLevel } from "@/lib/resume-data";

interface Props {
  categories: SkillCategory[];
}

const tagStyles: Record<SkillLevel, string> = {
  expert:  "text-[13px] font-extrabold text-stone-900 border-blue-200/60 bg-blue-50/50",
  strong:  "text-[12px] font-semibold text-stone-700 border-stone-200 bg-stone-50",
  capable: "text-[10px] font-normal text-stone-400 border-stone-200 bg-stone-50",
};

export default function SkillCategoryGrid({ categories }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-[1100px]">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className="bg-white border border-stone-200 rounded-2xl p-4
                     hover:shadow-lg hover:border-stone-300 transition-all duration-200"
        >
          <h3 className="font-mono text-[10px] tracking-[0.15em] uppercase text-stone-400
                         mb-3 flex items-center gap-1.5">
            <span
              className="w-[7px] h-[7px] rounded-full shrink-0"
              style={{ background: cat.color }}
            />
            {cat.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 items-baseline">
            {cat.tags.map((t) => (
              <span
                key={t.name}
                className={`px-2.5 py-[3px] rounded-full border cursor-default
                           hover:brightness-95 transition-all ${tagStyles[t.level]}`}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
