import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface PageInfoSectionProps {
  title?: string;
  badge?: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export function PageInfoSection({
  title = 'Module Intelligence Guide & Standard Operating Procedures',
  badge = 'KSP SOP & AI Lineage',
  defaultExpanded = false,
  children,
}: PageInfoSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-800 text-left select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 shadow-xs transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#0B2E59] dark:text-white uppercase tracking-wide font-mono">
                {title}
              </h3>
              {badge && (
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-mono">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {isOpen ? 'Click to collapse reference manual & architectural guidelines' : 'Click to expand officer workflows, AI explainability notes & data dictionary'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 group-hover:text-amber-500">
          <span className="text-[10px] font-bold font-mono uppercase hidden md:inline">
            {isOpen ? 'Collapse' : 'Expand Guide'}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-amber-500" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          {children}
        </div>
      )}
    </div>
  );
}
