import * as Lucide from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  color: string;
}

export function StatCard({ label, value, icon, trend, trendPercent, color }: StatCardProps) {
  const IconComponent = (Lucide as any)[icon] || Lucide.Activity;

  return (
    <div 
      className="flex items-center justify-between rounded-lg border border-ksp-gray-200 bg-white p-5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light"
      style={{ borderLeftWidth: '5px', borderLeftColor: color }}
    >
      <div className="space-y-1">
        <span className="text-xs font-bold text-ksp-gray-600 dark:text-ksp-gray-300 uppercase tracking-wider">
          {label}
        </span>
        <div className="text-2xl font-extrabold text-ksp-navy dark:text-white font-mono">
          {value}
        </div>
        
        {/* Trend Indicator */}
        <div className="flex items-center space-x-1">
          {trend === 'up' && (
            <span className="flex items-center text-[10px] font-bold text-ksp-red">
              <Lucide.TrendingUp className="h-3 w-3 mr-0.5" />
              +{trendPercent}% (Rising)
            </span>
          )}
          {trend === 'down' && (
            <span className="flex items-center text-[10px] font-bold text-ksp-success">
              <Lucide.TrendingDown className="h-3 w-3 mr-0.5" />
              -{trendPercent}% (Declining)
            </span>
          )}
          {trend === 'stable' && (
            <span className="flex items-center text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-300">
              <Lucide.Minus className="h-3 w-3 mr-0.5" />
              Stable
            </span>
          )}
        </div>
      </div>

      <div 
        className="rounded-full p-3 dark:bg-opacity-20"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        <IconComponent className="h-6 w-6" />
      </div>
    </div>
  );
}
