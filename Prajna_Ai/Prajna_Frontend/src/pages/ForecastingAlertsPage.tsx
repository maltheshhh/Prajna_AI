import React from 'react';
import { mockHotspotData } from '@/data/mockHotspotData';
import { KarnatakaHotspotMap } from '@/components/map/KarnatakaHotspotMap';
import { useLanguage } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';

export function ForecastingAlertsPage() {
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
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('f10Title')}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('f10Desc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.AlertTriangle size={16} className="text-[#8B0000]" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">
            {language === 'kn' ? 'ಮುನ್ಸೂಚನೆ' : language === 'hi' ? 'पूर्वानुमान' : 'Forecasting'}
          </span>
        </div>
      </div>

      {/* Section 1: Crime Forecasting & Early Warning Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1 */}
        <div className="rounded-lg border border-ksp-red/30 bg-red-50/10 p-4.5 dark:bg-ksp-navy-dark dark:border-ksp-red/40 space-y-2">
          <div className="flex items-center space-x-2 text-ksp-red font-bold select-none">
            <Lucide.AlertTriangle className="h-4.5 w-4.5" />
            <span>{t('crimeSpikeForecast') || 'Crime Spike Forecast'}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-ksp-gray-800 dark:text-ksp-gray-200">
            {language === 'kn' ? (
              <>
                <strong>ಬೆಂಗಳೂರು ನಗರ — ಕಳ್ಳತನ</strong> ಕಾಲೋಚಿತ ವಿವಾಹ ಮತ್ತು ಮಾನ್ಸೂನ್ ಮಾದರಿಗಳ ಆಧಾರದ ಮೇಲೆ ಮುಂದಿನ 30 ದಿನಗಳಲ್ಲಿ <strong>40%</strong> ಹೆಚ್ಚಾಗುವ ಮುನ್ಸೂಚನೆ ಇದೆ. ಬೀಟ್ ಗಸ್ತು ಹೆಚ್ಚಿಸಲು ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ.
              </>
            ) : language === 'hi' ? (
              <>
                <strong>बेंगलुरु शहरी — चोरी</strong> मौसमी शादी और मानसून पैटर्न के आधार पर अगले 30 दिनों में <strong>40%</strong> की वृद्धि का अनुमान है। बीट गश्त बढ़ाने की सिफारिश की गई है।
              </>
            ) : (
              <>
                <strong>Bengaluru Urban — Theft</strong> forecasted to spike <strong>40%</strong> in the next 30 days based on seasonal wedding and monsoon patterns. Recommend beat patrol enhancements.
              </>
            )}
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg border border-ksp-warning/35 bg-orange-50/10 p-4.5 dark:bg-ksp-navy-dark dark:border-ksp-warning/40 space-y-2">
          <div className="flex items-center space-x-2 text-ksp-warning font-bold select-none">
            <Lucide.ShieldAlert className="h-4.5 w-4.5" />
            <span>{t('gangTracker') || 'Organized Gang Tracker'}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-ksp-gray-800 dark:text-ksp-gray-200">
            {language === 'kn' ? (
              <>
                <strong>ನೆಟ್‌ವರ್ಕ್-ಆಲ್ಫಾ ಗ್ಯಾಂಗ್ ಚಟುವಟಿಕೆ:</strong> ಎಚ್‌ಎಸ್‌ಆರ್ ಕಳ್ಳತನ ತಂಡದ 3 ಸದಸ್ಯರು ಇತ್ತೀಚೆಗೆ <strong>ಮೈಸೂರು ಜಿಲ್ಲೆಯ</strong> ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಸಕ್ರಿಯರಾಗಿದ್ದಾರೆ. ಕುವೆಂಪುನಗರ ಠಾಣೆಗೆ ಅಂತರ-ವ್ಯಾಪ್ತಿ ಎಚ್ಚರಿಕೆ ನೀಡಲಾಗಿದೆ.
              </>
            ) : language === 'hi' ? (
              <>
                <strong>नेटवर्क-अल्फा गिरोह गतिविधि:</strong> एचएसआर चोरी गिरोह के 3 सदस्य हाल ही में <strong>मैसूरु जिले</strong> के भीतर सक्रिय हैं। कुवेम्पुनगर पुलिस स्टेशन को अंतर-अधिकार क्षेत्र अलर्ट जारी किया गया।
              </>
            ) : (
              <>
                <strong>Network-Alpha Gang Activity:</strong> 3 members of the HSR theft cohort recently active within <strong>Mysuru district</strong>. Cross-jurisdiction alert issued to Kuvempunagar PS.
              </>
            )}
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-lg border border-ksp-info/35 bg-sky-50/10 p-4.5 dark:bg-ksp-navy-dark dark:border-ksp-info/40 space-y-2">
          <div className="flex items-center space-x-2 text-ksp-info font-bold select-none">
            <Lucide.Zap className="h-4.5 w-4.5" />
            <span>{t('resourceRecommendations') || 'Resource Deployment Recs'}</span>
          </div>
          <p className="text-[11px] leading-relaxed text-ksp-gray-800 dark:text-ksp-gray-200">
            {language === 'kn' ? (
              <>
                <strong>ಮುನ್ನೆಚ್ಚರಿಕೆ ಶಿಫಾರಸು:</strong> ಪ್ರತಿದಿನ <strong>18:00 ರಿಂದ 22:00 ಗಂಟೆಯವರೆಗೆ</strong> ಕೆಆರ್ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ವಾಣಿಜ್ಯ ಸಂಕೀರ್ಣಗಳ ಬಳಿ ಹೆಚ್ಚುವರಿ ಗಸ್ತು ವಾಹನಗಳನ್ನು ನಿಯೋಜಿಸಿ.
              </>
            ) : language === 'hi' ? (
              <>
                <strong>प्रारंभिक चेतावनी सिफारिश:</strong> प्रतिदिन <strong>18:00 से 22:00 बजे</strong> के बीच केआर मार्केट और वाणिज्यिक परिसरों के पास अतिरिक्त गश्ती वाहन तैनात करें।
              </>
            ) : (
              <>
                <strong>Early Warning recommendation:</strong> Deploy additional patrol vehicles near KR Market and commercial complexes between <strong>18:00 and 22:00 hours</strong> daily.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Main Map View */}
      <div className="bg-white rounded-lg border border-ksp-gray-200 p-4.5 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light space-y-4">
        <h3 className="font-extrabold text-xs text-ksp-navy dark:text-white uppercase tracking-wider border-b pb-2 select-none">
          {t('hotspotsTitle') || 'CRIME HOTSPOT INTELLIGENCE — KARNATAKA MAP'}
        </h3>
        <div className="w-full h-[400px] overflow-hidden rounded border border-ksp-gray-100 dark:border-ksp-navy-light">
          <KarnatakaHotspotMap data={mockHotspotData} />
        </div>
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
        moduleName="Predictive Forecasting & Proactive Early Warning System"
        department="State Police Modernization & Predictive Analytics Division"
        legalAuthority="Section 149 BNSS (Police to prevent cognizable offences)"
        purpose="AI temporal-spatial forecasting models projecting next 72-hour crime spikes, vulnerability alerts, and weather-correlated patrol recommendations."
        steps={[
          {
            step: "01",
            action: "Inspect 72-Hour Forecast Map",
            detail: "Audit predicted risk zones across Bengaluru, Mysuru, Hubballi, and Belagavi commissionerates."
          },
          {
            step: "02",
            action: "Early Warning Advisory",
            detail: "Review early warning notices flagged by seasonal events, weekend commercial influx, or festival overlap."
          },
          {
            step: "03",
            action: "Proactive Cordon Dispatch",
            detail: "Route tactical mobile PCR units to predicted vulnerability corridors ahead of anticipated peak hours."
          }
        ]}
        tacticalTips={[
          "Weather-correlated crime spikes automatically prompt wet-weather patrol recommendations.",
          "Coordinate with local station house officers (SHOs) to deploy static barricades during peak forecast windows."
        ]}
      />
    </div>
  );
}
