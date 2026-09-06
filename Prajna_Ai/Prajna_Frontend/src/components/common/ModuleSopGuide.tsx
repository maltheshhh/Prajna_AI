import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, CheckCircle, Shield, Building2, HelpCircle, ArrowRight } from 'lucide-react';

export interface ModuleSopStep {
  step: string;
  action: string;
  detail: string;
}

interface ModuleSopGuideProps {
  moduleName: string;
  department: string;
  legalAuthority?: string;
  purpose: string;
  steps: ModuleSopStep[];
  tacticalTips?: string[];
  escalationUnit?: string;
  defaultExpanded?: boolean;
}

export function ModuleSopGuide({
  moduleName,
  department,
  legalAuthority = "Karnataka Police Act & Bharatiya Nagarik Suraksha Sanhita (BNSS)",
  purpose,
  steps,
  tacticalTips = [],
  escalationUnit = "State Police Command & Control Room (Dial 112 / Ext 4001)",
  defaultExpanded = false
}: ModuleSopGuideProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="w-full bg-white dark:bg-[#071D3A] rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-xs text-left overflow-hidden select-none transition mt-8 font-sans">
      {/* Header Bar / Toggle */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 bg-gray-50/80 dark:bg-[#05182E] flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800/60 transition"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-[#0B2E59] text-white">
            <BookOpen size={16} className="text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xs text-[#0B2E59] dark:text-sky-300 uppercase tracking-wider">
                Standard Operating Procedure (SOP) & Officer Operating Guide
              </span>
              <span className="text-[9px] font-mono font-bold bg-amber-100 text-amber-900 dark:bg-amber-900/50 dark:text-amber-200 px-1.5 py-0.2 rounded">
                HOW TO OPERATE
              </span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
              {purpose}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="px-3 py-1 rounded-md bg-white dark:bg-slate-800 border text-xs font-bold text-[#0B2E59] dark:text-white flex items-center gap-1 shadow-xs shrink-0"
        >
          <span>{isExpanded ? "Hide Guide" : "View How to Operate"}</span>
          {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>
      </div>

      {/* Collapsible Content Drawer */}
      {isExpanded && (
        <div className="p-5 border-t dark:border-gray-700 space-y-4 text-xs">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-[#05182E] rounded-lg border dark:border-gray-700">
            <div>
              <span className="text-[10px] text-gray-500 font-mono block font-bold uppercase">Assigned Department</span>
              <span className="font-bold text-[#0B2E59] dark:text-sky-300 flex items-center gap-1 mt-0.5">
                <Building2 size={12} /> {department}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-mono block font-bold uppercase">Legal & Regulatory Authority</span>
              <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1 mt-0.5">
                <Shield size={12} className="text-[#8B0000]" /> {legalAuthority}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-mono block font-bold uppercase">Escalation & Field Dispatch</span>
              <span className="font-mono text-gray-700 dark:text-gray-300 font-bold mt-0.5 block">
                {escalationUnit}
              </span>
            </div>
          </div>

          {/* Operating Steps */}
          <div>
            <h4 className="font-mono text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2.5">
              STEP-BY-STEP INVESTIGATOR WORKFLOW:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {steps.map((s, idx) => (
                <div key={idx} className="p-3 bg-white dark:bg-[#071D3A] rounded-lg border border-gray-200 dark:border-gray-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#0B2E59] text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-xs text-[#0B2E59] dark:text-sky-300">
                      {s.step}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold text-gray-800 dark:text-white">
                    {s.action}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-snug">
                    {s.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Tips */}
          {tacticalTips.length > 0 && (
            <div className="p-3 bg-blue-50/60 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900 space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#0B2E59] dark:text-sky-300 uppercase flex items-center gap-1">
                <HelpCircle size={12} /> Tactical Investigator Tips & Best Practices:
              </span>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-gray-700 dark:text-gray-300 font-medium">
                {tacticalTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
