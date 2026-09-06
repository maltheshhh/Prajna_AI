import { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useLanguage } from '@/context/LanguageContext';

interface SeasonalPatternChartProps {
  data: { quarter: string; theft: number; assault: number; cybercrime: number }[];
}

export function SeasonalPatternChart({ data }: SeasonalPatternChartProps) {
  const { t } = useLanguage();
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
        {t('seasonalOverlayTitle') || "Seasonal Crime Activity Overlay (Quarterly)"}
      </h3>
      <ResponsiveContainer width="100%" height="88%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E3A5F' : '#E8ECF1'} opacity={0.8} />
          <XAxis dataKey="quarter" stroke={isDark ? '#94A3B8' : '#B0BEC5'} tick={{ fontSize: 10, fill: isDark ? '#E2E8F0' : '#546E7A' }} />
          <YAxis stroke={isDark ? '#94A3B8' : '#B0BEC5'} tick={{ fontSize: 10, fill: isDark ? '#E2E8F0' : '#546E7A' }} />
          <Tooltip
            contentStyle={{ 
              backgroundColor: isDark ? '#071D3A' : '#0B2E59', 
              borderRadius: '8px', 
              border: isDark ? '1px solid #1E3A5F' : 'none', 
              color: '#fff', 
              fontSize: '11px' 
            }}
          />
          <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
          <Area 
            type="monotone" 
            dataKey="theft" 
            stackId="1" 
            stroke={isDark ? '#38BDF8' : '#0B2E59'} 
            fill={isDark ? '#38BDF8' : '#0B2E59'} 
            fillOpacity={isDark ? 0.35 : 0.25} 
            name={t('theftBurglaryLegend') || "Theft / Burglary"}
          />
          <Area 
            type="monotone" 
            dataKey="cybercrime" 
            stackId="2" 
            stroke={isDark ? '#34D399' : '#0277BD'} 
            fill={isDark ? '#34D399' : '#0277BD'} 
            fillOpacity={isDark ? 0.35 : 0.25} 
            name={t('cyberFraudLegend') || "Cyber Fraud"}
          />
          <Area 
            type="monotone" 
            dataKey="assault" 
            stackId="3" 
            stroke={isDark ? '#EF4444' : '#8B0000'} 
            fill={isDark ? '#EF4444' : '#8B0000'} 
            fillOpacity={isDark ? 0.35 : 0.25} 
            name={t('assaultViolenceLegend') || "Assault / Violence"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

