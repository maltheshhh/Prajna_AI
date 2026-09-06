import { mockRecidivismScores } from '@/data/mockRecidivism';
import { mockFIRs } from '@/data/mockFIRs';
import { useLanguage } from '@/context/LanguageContext';
import * as Lucide from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

export function PredictiveInsightsPage() {
  const { t } = useLanguage();
  const getRiskColor = (score: number) => {
    if (score >= 75) return 'text-ksp-red bg-red-50 dark:bg-red-950/20';
    if (score >= 50) return 'text-ksp-warning bg-orange-50 dark:bg-orange-950/20';
    return 'text-ksp-success bg-green-50 dark:bg-green-950/20';
  };

  // Demographic mock aggregations
  const ageData = [
    { group: '18-25 yrs', count: 18 },
    { group: '26-35 yrs', count: 24 },
    { group: '36-45 yrs', count: 12 },
    { group: '46+ yrs', count: 6 }
  ];

  const genderData = [
    { name: 'Male', count: 48, color: '#0B2E59' },
    { name: 'Female', count: 10, color: '#8B0000' },
    { name: 'Other', count: 2, color: '#7B1FA2' }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs">
      {/* Page Header Banner */}
      <div className="bg-[#0B2E59] text-white p-6 rounded-lg shadow border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('predictiveTitle')}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('predictiveDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.Brain size={16} className="text-[#8B0000]" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">AI Insights</span>
        </div>
      </div>

      {/* Section 1: Crime Forecasting & Early Warning */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="rounded-lg border border-ksp-red/30 bg-red-50/10 p-4.5 dark:bg-ksp-navy-dark dark:border-ksp-red/40 space-y-2">
          <div className="flex items-center space-x-2 text-ksp-red font-bold select-none">
            <Lucide.AlertTriangle className="h-4.5 w-4.5" />
            <span>{t('crimeSpikeForecast')}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-ksp-gray-800 dark:text-ksp-gray-200">
            **Bengaluru Urban — Theft** forecasted to spike **40%** in the next 30 days based on seasonal wedding and monsoon patterns. Recommend beat patrol enhancements.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg border border-ksp-warning/35 bg-orange-50/10 p-4.5 dark:bg-ksp-navy-dark dark:border-ksp-warning/40 space-y-2">
          <div className="flex items-center space-x-2 text-ksp-warning font-bold select-none">
            <Lucide.ShieldAlert className="h-4.5 w-4.5" />
            <span>{t('gangTracker')}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-ksp-gray-800 dark:text-ksp-gray-200">
            **Network-Alpha Gang Activity:** 3 members of the HSR theft cohort recently active within **Mysuru district**. Cross-jurisdiction alert issued to Kuvempunagar PS.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg border border-ksp-info/35 bg-sky-50/10 p-4.5 dark:bg-ksp-navy-dark dark:border-ksp-info/40 space-y-2">
          <div className="flex items-center space-x-2 text-ksp-info font-bold select-none">
            <Lucide.Zap className="h-4.5 w-4.5" />
            <span>{t('resourceRecommendations')}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-ksp-gray-800 dark:text-ksp-gray-200">
            **Early Warning recommendation:** Deploy additional patrol vehicles near KR Market and commercial complexes between **18:00 and 22:00 hours** daily.
          </p>
        </div>
      </div>

      {/* Section 2: Recidivism Risk Dashboard */}
      <div className="rounded-lg border border-ksp-gray-200 bg-white p-5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
        <div className="flex items-center space-x-2 border-b pb-3 mb-4 select-none">
          <Lucide.Users className="h-5 w-5 text-ksp-navy dark:text-sky-300" />
          <h3 className="font-extrabold text-sm text-ksp-navy dark:text-white uppercase tracking-wider">
            {t('recidivismRoster')}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ksp-gray-200 font-bold text-ksp-gray-800 dark:border-ksp-navy-light dark:text-ksp-gray-200">
                <th className="py-2.5">{t('accusedOffender')}</th>
                <th className="py-2.5">{t('riskScore')}</th>
                <th className="py-2.5">{t('predictedCrime')}</th>
                <th className="py-2.5">{t('timelineProjection')}</th>
                <th className="py-2.5">{t('targetZone')}</th>
                <th className="py-2.5">{t('triggerFactorsReasoning')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ksp-gray-100 dark:divide-ksp-navy-light font-medium">
              {mockRecidivismScores.map((score) => (
                <tr key={score.suspectId} className="hover:bg-ksp-gray-50/50 dark:hover:bg-ksp-navy-light/10">
                  <td className="py-3 font-bold text-ksp-navy dark:text-sky-300">{score.suspectName}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold ${getRiskColor(score.riskScore)}`}>
                      {score.riskScore} / 100
                    </span>
                  </td>
                  <td className="py-3 text-ksp-gray-800 dark:text-ksp-gray-200">{score.predictedCrimeType}</td>
                  <td className="py-3 text-ksp-gray-600 dark:text-ksp-gray-300">{score.predictedTimeline}</td>
                  <td className="py-3 font-semibold text-ksp-gray-800 dark:text-ksp-gray-200">{score.predictedZone}</td>
                  <td className="py-3 max-w-xs text-ksp-gray-600 dark:text-ksp-gray-300 leading-snug">
                    <ul className="list-disc pl-4 space-y-0.5 text-[10px]">
                      {score.triggerFactors.slice(0, 2).map((factor, idx) => (
                        <li key={idx} className="truncate" title={factor}>{factor}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 3: Sociological Insights Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age chart */}
        <div className="w-full h-80 bg-white p-5 rounded-xl border border-gray-200 dark:bg-[#081120] dark:border-blue-900/40 shadow-xs">
          <h3 className="text-xs font-black text-[#0B2E59] dark:text-white uppercase tracking-wider mb-4">
            {t('demographicsAge')}
          </h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={ageData} margin={{ left: -25 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" tick={{ fontSize: 10, fontWeight: 700 }} />
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
              Demographic Ratio
            </span>
          </div>

          {/* Segmented Ratio Bar */}
          <div className="space-y-2 py-1">
            <div className="flex justify-between items-center text-xs font-mono font-black">
              {genderData.map((d: any) => {
                const accent = d.name === 'Male' ? 'text-sky-600 dark:text-sky-400' : d.name === 'Female' ? 'text-red-600 dark:text-red-400' : 'text-purple-600 dark:text-purple-400';
                return (
                  <span key={d.name} className={accent}>
                    {d.name}: {d.count}%
                  </span>
                );
              })}
            </div>

            {/* Segmented Progress Strip */}
            <div className="w-full h-4 rounded-full bg-gray-100 dark:bg-[#030712] overflow-hidden flex p-0.5 border border-gray-200/60 dark:border-gray-800 shadow-inner">
              {genderData.map((d: any) => {
                const percent = d.count;
                if (!percent) return null;
                const fillBg = d.name === 'Male' ? 'bg-[#0284C7] dark:bg-[#38BDF8]' : d.name === 'Female' ? 'bg-[#DC2626] dark:bg-[#EF4444]' : 'bg-[#9333EA] dark:bg-[#A855F7]';
                return (
                  <div
                    key={d.name}
                    className={`h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 ${fillBg}`}
                    style={{ width: `${percent}%` }}
                    title={`${d.name}: ${percent}%`}
                  />
                );
              })}
            </div>
          </div>

          {/* Demographic Detail Cards */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            {genderData.map((d: any) => {
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
                    <span className="text-gray-600 dark:text-gray-300">{d.name}</span>
                    <span className="text-xs">{isMale ? '👨' : isFemale ? '👩' : '⚧'}</span>
                  </div>
                  <div className="mt-1">
                    <div className={`text-base font-black font-mono leading-none ${textAccent}`}>
                      {d.count}%
                    </div>
                    <div className="text-[9.5px] font-mono text-gray-500 dark:text-gray-400 mt-1 font-semibold">
                      Distribution
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
