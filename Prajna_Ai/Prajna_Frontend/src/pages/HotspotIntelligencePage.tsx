import { mockHotspotData } from '@/data/mockHotspotData';
import { KarnatakaHotspotMap } from '@/components/map/KarnatakaHotspotMap';
import { useLanguage } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';

export function HotspotIntelligencePage() {
  const { t, language } = useLanguage();
  // Aggregate stats from hotspot data
  const totalHotspots = mockHotspotData.length;
  const criticalCount = mockHotspotData.filter(h => h.severity === 'critical').length;
  const increasingCount = mockHotspotData.filter(h => h.trend === 'increasing').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs">
      {/* Page Header Banner */}
      <div className="bg-[#0B2E59] text-white p-6 rounded-lg shadow border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('hotspotsTitle')}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('hotspotsDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.Map size={16} className="text-[#8B0000]" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">
            {language === 'kn' ? 'ಜಿಐಎಸ್ ನಕ್ಷೆ' : language === 'hi' ? 'जीआईएस मानचित्र' : 'GIS Map'}
          </span>
        </div>
      </div>

      {/* Main Map View */}
      <div className="w-full h-[500px]">
        <KarnatakaHotspotMap data={mockHotspotData} />
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="rounded-lg border border-ksp-gray-200 bg-white p-4.5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light flex items-center space-x-4">
          <div className="bg-red-50 p-3 rounded-full text-ksp-red dark:bg-red-950/20">
            <Lucide.ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-300 uppercase block">{t('criticalHotspots')}</span>
            <span className="text-lg font-extrabold text-ksp-navy dark:text-white font-mono">{criticalCount} {t('regions')}</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg border border-ksp-gray-200 bg-white p-4.5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light flex items-center space-x-4">
          <div className="bg-sky-50 p-3 rounded-full text-ksp-info dark:bg-sky-950/20">
            <Lucide.TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-300 uppercase block">{t('risingCrimeTrends')}</span>
            <span className="text-lg font-extrabold text-ksp-navy dark:text-white font-mono">{increasingCount} {t('beats')}</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg border border-ksp-gray-200 bg-white p-4.5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light flex items-center space-x-4">
          <div className="bg-green-50 p-3 rounded-full text-ksp-success dark:bg-green-950/20">
            <Lucide.ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-ksp-gray-600 dark:text-ksp-gray-300 uppercase block">{t('totalHotspotsMonitored')}</span>
            <span className="text-lg font-extrabold text-ksp-navy dark:text-white font-mono">{totalHotspots} {t('points')}</span>
          </div>
        </div>
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="GIS Spatial Crime Hotspot Intelligence"
        department="State Police GIS Cell & Traffic/Law Enforcement Wing"
        legalAuthority="Section 149 BNSS (Police to prevent cognizable offences)"
        purpose="Spatial density clustering and geospatial crime hotspot mapping to optimize police patrol beats and emergency quick response vehicle deployment."
        steps={[
          {
            step: "01",
            action: "Inspect Heat Clusters",
            detail: "Hover over circular GIS heatmap zones on the Karnataka map to view incident density, primary crime types, and beat jurisdiction."
          },
          {
            step: "02",
            action: "Filter by Severity Tier",
            detail: "Review red Critical zones versus amber Rising Trend beats to prioritize immediate PCR vehicle re-routing."
          },
          {
            step: "03",
            action: "Field Patrol Allocation",
            detail: "Use hotspot GPS coordinates to configure dynamic night patrolling routes in high-density commercial and transit corridors."
          }
        ]}
        tacticalTips={[
          "Click on any individual hotspot marker to view historical FIR volume and station contact details.",
          "Critical clusters with rising trends trigger automatic alerts to the Real-Time Crime Center (RTCC)."
        ]}
      />
    </div>
  );
}
