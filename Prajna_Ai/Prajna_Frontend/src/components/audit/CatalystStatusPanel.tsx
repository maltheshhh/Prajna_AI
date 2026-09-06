import { useState } from 'react';
import { CatalystServiceStatus } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import * as Lucide from 'lucide-react';

interface CatalystStatusPanelProps {
  services: CatalystServiceStatus[];
}

export function CatalystStatusPanel({ services }: CatalystStatusPanelProps) {
  const { t } = useLanguage();
  const [liveServices, setLiveServices] = useState<CatalystServiceStatus[]>(services);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const simulateRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Slightly randomize latency values (within 20%) to show dynamic changes
      const randomized = liveServices.map((s) => ({
        ...s,
        latency: Math.max(10, Math.floor(s.latency * (0.9 + Math.random() * 0.2))),
        lastChecked: new Date().toISOString()
      }));
      setLiveServices(randomized);
      setIsRefreshing(false);
    }, 800);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <span className="h-2 w-2 rounded-full bg-ksp-success animate-pulse" />;
      case 'degraded': return <span className="h-2 w-2 rounded-full bg-ksp-warning" />;
      default: return <span className="h-2 w-2 rounded-full bg-ksp-red animate-ping" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 dark:bg-green-950/20 dark:text-green-300';
      case 'degraded': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/20 dark:text-yellow-300';
      default: return 'bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-300';
    }
  };

  return (
    <div className="rounded-lg border border-ksp-gray-200 bg-white p-5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light text-xs font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4 select-none">
        <div className="flex items-center space-x-2">
          <Lucide.ServerCrash className="h-5 w-5 text-ksp-navy dark:text-sky-300" />
          <div>
            <h3 className="font-extrabold text-sm text-ksp-navy dark:text-white uppercase tracking-wider">
              {t('zohoCatalystLiveDeploymentStatus')}
            </h3>
            <p className="text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300">
              {t('platform')}: Catalyst Premium | {t('projectId')}: KSP-CIRAS-2026
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={simulateRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1 rounded bg-ksp-navy text-white px-3 py-1 font-bold hover:bg-ksp-navy-light disabled:opacity-40 shadow-sm"
        >
          <Lucide.RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? t('refreshing') : t('syncServices')}</span>
        </button>
      </div>

      {/* Sync highlight bar */}
      <div className="rounded bg-sky-50 p-3 mb-4 text-xs font-semibold text-ksp-info border border-sky-200 dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light flex justify-between items-center select-none">
        <span>{t('databaseIndexHighlight')}</span>
        <span className="font-mono text-[10px]">{t('latestIndex')}</span>
      </div>

      {/* Service grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {liveServices.map((service, idx) => (
          <div
            key={idx}
            className={`rounded-lg border p-4.5 flex flex-col justify-between transition-all ${
              service.status === 'online' ? 'border-ksp-gray-100 bg-slate-50/50 dark:border-ksp-navy-light/40' :
              service.status === 'degraded' ? 'border-ksp-warning bg-orange-50/15' :
              'border-ksp-red bg-red-50/15'
            } dark:bg-ksp-navy-dark`}
          >
            <div className="flex items-start justify-between">
              <span className="font-mono font-bold text-ksp-gray-800 dark:text-white block leading-snug">
                {service.serviceName}
              </span>
              <div className="flex items-center space-x-1.5 select-none">
                {getStatusIcon(service.status)}
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${getStatusBadgeClass(service.status)}`}>
                  {service.status}
                </span>
              </div>
            </div>

            <div className="mt-4 font-mono text-[10px] space-y-1 text-ksp-gray-600 dark:text-ksp-gray-300">
              <div className="flex justify-between">
                <span>{t('responseLatency')}</span>
                <span className="font-bold text-ksp-gray-800 dark:text-white">
                  {service.latency}ms
                </span>
              </div>
              {service.recordCount !== undefined && (
                <div className="flex justify-between">
                  <span>{t('recordCapacity')}</span>
                  <span className="font-bold text-ksp-navy dark:text-sky-300">
                    {service.recordCount.toLocaleString()} {t('units')}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-[8px] text-ksp-gray-600">
                <span>{t('checked')}</span>
                <span>{new Date(service.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
