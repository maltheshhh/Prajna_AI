import { useMemo } from 'react';
import { Layers } from 'lucide-react';
import { useLanguage, formatCrimeType, formatDynamicText } from '@/context/LanguageContext';

interface CrimeTypeBreakdownProps {
  data: { name: string; value: number; color: string }[];
}

export function CrimeTypeBreakdown({ data }: CrimeTypeBreakdownProps) {
  const { t, language } = useLanguage();

  // Sort data descending by volume
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.value - a.value);
  }, [data]);

  const maxValue = useMemo(() => {
    return Math.max(...data.map(d => d.value), 1);
  }, [data]);

  const totalCrimes = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.value, 0);
  }, [data]);

  return (
    <div className="w-full h-80 bg-white p-4 rounded-xl border border-gray-200 dark:bg-[#081120] dark:border-blue-900/40 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2 mb-2 select-none">
        <h3 className="text-xs font-black text-[#0B2E59] dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <Layers size={14} className="text-[#38BDF8]" /> {t('crimeCategoryDistribution') || "Crime Category Distribution"}
        </h3>
        <span className="text-[10px] font-mono font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#030712] px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-800">
          {t('totalCases') ? t('totalCases').replace('{0}', String(totalCrimes)) : `Total: ${totalCrimes} Cases`}
        </span>
      </div>

      {/* Ranked Horizontal Distribution Bars */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-blue-900/40">
        {sortedData.map((item, idx) => {
          const percent = Math.round((item.value / totalCrimes) * 100);
          const barWidth = Math.max(8, Math.round((item.value / maxValue) * 100));

          return (
            <div key={item.name} className="group flex flex-col space-y-1">
              <div className="flex items-center justify-between text-[11px] font-medium">
                <div className="flex items-center space-x-1.5 truncate max-w-[65%]">
                  <span className="text-[10px] font-mono font-black text-gray-400 dark:text-gray-500 w-4">
                    #{idx + 1}
                  </span>
                  <span className="font-bold text-gray-800 dark:text-gray-200 truncate">
                    {formatCrimeType(item.name, t) || formatDynamicText(item.name, language)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 font-mono text-[11px] shrink-0">
                  <span className="font-black text-[#0B2E59] dark:text-white">{item.value}</span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">({percent}%)</span>
                </div>
              </div>

              {/* Progress track */}
              <div className="w-full bg-gray-100 dark:bg-[#030712] rounded-full h-2 overflow-hidden border border-gray-200/50 dark:border-gray-800">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor: item.color || '#38BDF8',
                    boxShadow: `0 0 8px ${item.color}40`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

