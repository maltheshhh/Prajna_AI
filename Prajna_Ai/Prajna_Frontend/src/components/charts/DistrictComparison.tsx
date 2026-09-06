import { useState, useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { useLanguage, formatDynamicText } from '@/context/LanguageContext';

interface DistrictComparisonProps {
  data: { district: string; count: number }[];
}

export function DistrictComparison({ data }: DistrictComparisonProps) {
  const { t, language } = useLanguage();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const maxVal = Math.max(...data.map(d => d.count));

  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg border border-ksp-gray-200 dark:bg-ksp-navy-dark dark:border-ksp-navy-light shadow-sm">
      <h3 className="text-xs font-bold text-ksp-navy dark:text-white uppercase tracking-wider mb-4">
        {t('crimeVolumeByDistrict') || "Crime Volume Comparison By District"}
      </h3>
      <ResponsiveContainer width="100%" height="88%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 15, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E3A5F' : '#E8ECF1'} opacity={0.8} horizontal={false} />
          <XAxis type="number" stroke={isDark ? '#94A3B8' : '#B0BEC5'} tick={{ fontSize: 9, fill: isDark ? '#CBD5E1' : '#64748B' }} />
          <YAxis 
            dataKey="district" 
            type="category" 
            stroke={isDark ? '#94A3B8' : '#B0BEC5'} 
            tickFormatter={(val) => formatDynamicText(val, language)}
            tick={{ fontSize: 9, fill: isDark ? '#E2E8F0' : '#546E7A' }} 
            width={85}
          />
          <Tooltip
            contentStyle={{ 
              backgroundColor: isDark ? '#071D3A' : '#0B2E59', 
              borderRadius: '8px', 
              border: isDark ? '1px solid #1E3A5F' : 'none', 
              color: '#fff', 
              fontSize: '11px' 
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} name={t('casesUnit') || "Cases"}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.count === maxVal 
                  ? (isDark ? '#EF4444' : '#8B0000') 
                  : (isDark ? '#38BDF8' : '#0B2E59')
                } 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

