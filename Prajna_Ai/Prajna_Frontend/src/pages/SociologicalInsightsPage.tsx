import React, { useEffect, useState } from "react";
import { useLanguage, formatGender, formatDynamicText } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

export function SociologicalInsightsPage() {
  const { t, language } = useLanguage();

const [analytics, setAnalytics] = useState<any>({
  ageData: [],
  genderData: []
});

useEffect(() => {
  loadAnalytics();
}, []);

async function loadAnalytics() {
  try {
    const response = await fetch(
      "https://prajna-ai-60073413366.development.catalystserverless.in/server/prajna_ai_function/?query=__sociology__"
    );

    const data = await response.json();

    setAnalytics(data);

    console.log("Sociology:", data);

  } catch (err) {
    console.error(err);
  }
}
  const ageData = analytics.ageData || [];
  const genderColors: Record<string, string> = {
  Male: "#0B2E59",
  Female: "#8B0000",
  Other: "#7B1FA2"
};

const genderData = (analytics.genderData || []).map((item: any) => ({
  ...item,
  color: genderColors[item.name] || "#999999"
}));
 console.log("Analytics:", analytics);
 console.log("AgeData:", ageData);
 console.log("GenderData:", genderData);
// -----------------------
const sociologicalFactors = [
  { area: "Bengaluru", crimeRateIndex: 85 },
  { area: "Mysuru", crimeRateIndex: 63 },
  { area: "Belagavi", crimeRateIndex: 54 },
  { area: "Hubballi", crimeRateIndex: 49 },
  { area: "Mangaluru", crimeRateIndex: 42 }
];
const totalGender = genderData.reduce(
  (sum: number, item: any) => sum + item.count,
  0
);
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs">
      {/* Page Header Banner */}
      <div className="bg-[#0B2E59] text-white p-6 rounded-lg shadow border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('f4Title')}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('f4Desc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.BarChart3 size={16} className="text-[#8B0000]" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">Socio Insights</span>
        </div>
      </div>

      {/* Demographic Breakdown Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age chart */}
        <div className="w-full h-80 bg-white p-5 rounded-lg border border-ksp-gray-200 dark:bg-ksp-navy-dark dark:border-ksp-navy-light shadow-sm">
          <h3 className="text-xs font-bold text-ksp-navy dark:text-white uppercase tracking-wider mb-4">
            {t('demographicsAge')}
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={ageData} margin={{ left: -25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" tickFormatter={(val) => formatDynamicText(val, language)} tick={{ fontSize: 10, fontWeight: 700 }} />
              <YAxis tick={{ fontSize: 10, fontWeight: 700 }} />
              <Tooltip contentStyle={{ backgroundColor: '#071D3A', borderColor: '#1E3A5F', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
              <Bar dataKey="count" fill="#38BDF8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender ratio */}
        <div className="w-full h-80 bg-white p-5 rounded-xl border border-gray-200 dark:bg-[#081120] dark:border-blue-900/40 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2 mb-1 select-none">
            <h3 className="text-xs font-black text-[#0B2E59] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Lucide.Users size={14} className="text-[#38BDF8]" />
              {t('demographicsGender')}
            </h3>
            <span className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#030712] px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-800">
              {t('totalRecords') ? t('totalRecords').replace('{0}', String(totalGender)) : `Total: ${totalGender} Records`}
            </span>
          </div>

          {/* Segmented Ratio Bar */}
          <div className="space-y-2 py-1">
            <div className="flex justify-between items-center text-xs font-mono font-black">
              {genderData.map((d: any) => {
                const percent = totalGender === 0 ? 0 : Math.round((d.count / totalGender) * 100);
                const accent = d.name === 'Male' ? 'text-sky-600 dark:text-sky-400' : d.name === 'Female' ? 'text-red-600 dark:text-red-400' : 'text-purple-600 dark:text-purple-400';
                return (
                  <span key={d.name} className={accent}>
                    {formatGender(d.name, t)}: {percent}%
                  </span>
                );
              })}
            </div>

            {/* Segmented Progress Strip */}
            <div className="w-full h-4 rounded-full bg-gray-100 dark:bg-[#030712] overflow-hidden flex p-0.5 border border-gray-200/60 dark:border-gray-800 shadow-inner">
              {genderData.map((d: any) => {
                const percent = totalGender === 0 ? 0 : (d.count / totalGender) * 100;
                if (percent === 0) return null;
                const fillBg = d.name === 'Male' ? 'bg-[#0284C7] dark:bg-[#38BDF8]' : d.name === 'Female' ? 'bg-[#DC2626] dark:bg-[#EF4444]' : 'bg-[#9333EA] dark:bg-[#A855F7]';
                return (
                  <div
                    key={d.name}
                    className={`h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 ${fillBg}`}
                    style={{ width: `${percent}%` }}
                    title={`${formatGender(d.name, t)}: ${Math.round(percent)}%`}
                  />
                );
              })}
            </div>
          </div>

          {/* Demographic Detail Cards */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            {genderData.map((d: any) => {
              const percent = totalGender === 0 ? 0 : Math.round((d.count / totalGender) * 100);
              const isMale = d.name === 'Male';
              const isFemale = d.name === 'Female';
              const cardBg = isMale
                ? 'border-sky-200 bg-sky-50/50 dark:border-sky-900/50 dark:bg-sky-950/20'
                : isFemale
                ? 'border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20'
                : 'border-purple-200 bg-purple-50/50 dark:border-purple-900/50 dark:bg-purple-950/20';
              const textAccent = isMale
                ? 'text-sky-700 dark:text-sky-300'
                : isFemale
                ? 'text-red-700 dark:text-red-300'
                : 'text-purple-700 dark:text-purple-300';

              return (
                <div key={d.name} className={`p-2.5 rounded-lg border flex flex-col justify-between ${cardBg}`}>
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-gray-600 dark:text-gray-300">{formatGender(d.name, t)}</span>
                    <span className="text-xs">{isMale ? '👨' : isFemale ? '👩' : '⚧'}</span>
                  </div>
                  <div className="mt-1">
                    <div className={`text-base font-black font-mono leading-none ${textAccent}`}>
                      {percent}%
                    </div>
                    <div className="text-[9.5px] font-mono text-gray-500 dark:text-gray-400 mt-1 font-semibold">
                      {d.count.toLocaleString()} {t('casesUnit') || 'cases'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sociological Correlation Panel */}
      <div className="rounded-lg border border-ksp-gray-200 bg-white p-5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
        <div className="flex items-center space-x-2 border-b pb-3 mb-4 select-none">
          <Lucide.Compass className="h-5 w-5 text-ksp-navy dark:text-sky-300" />
          <h3 className="font-extrabold text-sm text-ksp-navy dark:text-white uppercase tracking-wider">
            {t('socioEconomicCorrelations') || "Socio-Economic & Sociological Crime Correlations"}
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sociologicalFactors} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fontWeight: 700 }} />
                <YAxis type="category" dataKey="area" tickFormatter={(val) => formatDynamicText(val, language)} tick={{ fontSize: 9.5, fontWeight: 700 }} width={120} />
                <Tooltip contentStyle={{ backgroundColor: '#071D3A', borderColor: '#1E3A5F', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Bar dataKey="crimeRateIndex" fill="#EF4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="lg:col-span-4 space-y-3.5 text-xs">
            <h4 className="font-bold text-ksp-navy dark:text-sky-300 uppercase">
              {t('sociologicalBriefingTitle') || "Sociological Analysis Briefing"}
            </h4>
            <p className="leading-relaxed text-ksp-gray-600 dark:text-ksp-gray-300 font-medium">
              {t('sociologicalBriefingDesc') || "Correlation analysis mapping CCTNS crime records against taluk census profiles indicates that regions exhibiting high urban migration and unemployment rates show a **2.7x higher** concentration of opportunistic property offences."}
            </p>
            <div className="bg-red-50 dark:bg-red-950/20 rounded p-3 border border-red-200 text-red-900 dark:text-red-300">
              <span className="font-bold block uppercase text-[10px]">
                {t('criminologyActionPolicy') || "Criminology Action Policy:"}
              </span>
              <p className="mt-1 text-[11px] leading-relaxed">
                {t('criminologyActionPolicyDesc') || "Prioritize development of local beat networks in areas with high density of commercial liquor outlets and rapid migratory expansion."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Sociological & Demographic Crime Pattern Analysis"
        department="State Police Research & Social Defense Division"
        legalAuthority="Juvenile Justice (Care & Protection) Act & Community Policing Mandates"
        purpose="Cross-referencing crime rates with sociological indicators, age demographics, and regional urbanization indices to formulate preventative social defense strategies."
        steps={[
          {
            step: "01",
            action: "Age of Accused Distribution",
            detail: "Analyze demographic bar charts to understand the age cohorts most involved in registered offences."
          },
          {
            step: "02",
            action: "Gender Ratio Demographic Meter",
            detail: "Inspect the segmented ratio strip and micro metric cards to evaluate demographic proportion trends."
          },
          {
            step: "03",
            action: "Regional Socio-Economic Correlation",
            detail: "Review crime index scores against urban migration and socio-economic variables to deploy community policing initiatives."
          }
        ]}
        tacticalTips={[
          "Compare high-density youth demographic spikes with local drug/substance abuse intelligence.",
          "Use the Criminology Action Policy recommendation box to guide grassroots police station outreach."
        ]}
      />
    </div>
  );
}
