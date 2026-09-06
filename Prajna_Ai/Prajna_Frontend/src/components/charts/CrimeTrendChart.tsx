import { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLanguage, formatDynamicText } from '@/context/LanguageContext';

interface CrimeTrendChartProps {
  data: { month: string; count: number }[];
}

export function CrimeTrendChart({ data }: CrimeTrendChartProps) {
  const { t, language } = useLanguage();
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-80 bg-white p-4 rounded-lg border border-ksp-gray-200 dark:bg-ksp-navy-dark dark:border-ksp-navy-light shadow-sm">
      <h3 className="text-xs font-bold text-ksp-navy dark:text-white uppercase tracking-wider mb-4">
        {t('crimeTrendTitle') || "12-Month Crime Trend (Case Volume)"}
      </h3>
      <ResponsiveContainer width="100%" height="88%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E3A5F' : '#E8ECF1'} opacity={0.8} />
          <XAxis 
            dataKey="month" 
            tickFormatter={(val) => formatDynamicText(val, language)}
            tick={{ fontSize: 10, fill: isDark ? '#E2E8F0' : '#546E7A' }} 
            stroke={isDark ? '#94A3B8' : '#B0BEC5'}
          />
          <YAxis 
            tick={{ fontSize: 10, fill: isDark ? '#E2E8F0' : '#546E7A' }} 
            stroke={isDark ? '#94A3B8' : '#B0BEC5'}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#071D3A' : '#0B2E59', 
              borderRadius: '8px', 
              border: isDark ? '1px solid #1E3A5F' : 'none', 
              color: '#fff', 
              fontSize: '12px' 
            }}
            itemStyle={{ color: '#fff' }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke={isDark ? '#EF4444' : '#8B0000'} 
            strokeWidth={3} 
            dot={{ r: 4, stroke: isDark ? '#EF4444' : '#8B0000', strokeWidth: 1, fill: isDark ? '#071D3A' : '#fff' }}
            activeDot={{ r: 6 }} 
            name={t('casesRegistered') || "Cases Registered"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

