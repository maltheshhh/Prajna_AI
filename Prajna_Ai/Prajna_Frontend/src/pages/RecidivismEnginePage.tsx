import React, { useState } from 'react';
import { mockRecidivismScores } from '@/data/mockRecidivism';
import { useLanguage } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';

export function RecidivismEnginePage() {
  const { t } = useLanguage();
  const [selectedOffenderId, setSelectedOffenderId] = useState<string>(mockRecidivismScores[0]?.suspectId || '');

  const selectedRecidivism = mockRecidivismScores.find(score => score.suspectId === selectedOffenderId) || mockRecidivismScores[0];

  const getRiskColor = (score: number) => {
    if (score >= 75) return 'text-ksp-red bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/40';
    if (score >= 50) return 'text-ksp-warning bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900/40';
    return 'text-ksp-success bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/40';
  };

  const getGaugeColorClass = (score: number) => {
    if (score >= 75) return 'border-t-red-600 border-r-red-600';
    if (score >= 50) return 'border-t-orange-500 border-r-orange-500';
    return 'border-t-green-600 border-r-green-600';
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs">
      {/* Page Header Banner */}
      <div className="bg-[#0B2E59] text-white p-6 rounded-lg shadow border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('f6Title')}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('f6Desc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.BrainCircuit size={16} className="text-[#8B0000]" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">Risk Engine</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel: Roster List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-ksp-gray-200 shadow-sm overflow-hidden dark:bg-ksp-navy-dark dark:border-ksp-navy-light flex flex-col h-[600px]">
          <div className="bg-ksp-navy text-white px-4 py-3 border-b border-ksp-navy-light flex items-center justify-between select-none">
            <h3 className="font-bold text-xs uppercase flex items-center gap-1.5">
              <Lucide.Users size={15} /> {t('recidivismRoster')}
            </h3>
            <span className="font-mono text-[9px] bg-white/10 px-2 py-0.5 rounded">
              {mockRecidivismScores.length} OFFENDERS
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-ksp-gray-100 dark:divide-ksp-navy-light">
            {mockRecidivismScores.map((score) => {
              const isSelected = score.suspectId === selectedOffenderId;
              return (
                <button
                  key={score.suspectId}
                  onClick={() => setSelectedOffenderId(score.suspectId)}
                  className={`w-full text-left p-4 transition-colors flex justify-between items-center ${
                    isSelected
                      ? 'bg-ksp-navy-light/10 dark:bg-ksp-navy-light/20'
                      : 'hover:bg-ksp-gray-50/50 dark:hover:bg-ksp-navy-light/5'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-bold text-ksp-navy dark:text-sky-300 block text-xs">
                      {score.suspectName}
                    </span>
                    <span className="text-[10px] text-ksp-gray-600 dark:text-ksp-gray-400 block font-mono">
                      ID: {score.suspectId} | {score.predictedCrimeType}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${getRiskColor(score.riskScore)}`}>
                    {score.riskScore}%
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Scoring analysis (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 h-[600px] overflow-y-auto">
          {selectedRecidivism ? (
            <div className="space-y-6">
              {/* Analyzer Header Card */}
              <div className="bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-ksp-red bg-red-100/10 px-2 py-0.5 rounded font-mono border border-ksp-red/20 uppercase block w-fit mb-2">
                      Catalyst QuickML Model Active
                    </span>
                    <h2 className="text-xl font-bold text-ksp-navy dark:text-white uppercase">
                      {selectedRecidivism.suspectName}
                    </h2>
                    <span className="text-xs font-mono text-ksp-gray-600 dark:text-ksp-gray-400 mt-1 block">
                      Suspect ID: {selectedRecidivism.suspectId}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-ksp-gray-600 dark:text-ksp-gray-300 flex items-center gap-1 bg-ksp-gray-50 dark:bg-ksp-navy-light/10 px-3 py-1 rounded border border-ksp-gray-200 dark:border-ksp-navy-light">
                    <Lucide.Clock size={12} /> {t('modelLastUpdated')}: {new Date(selectedRecidivism.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Radial Score Gauge Card */}
              <div className="bg-white rounded-lg border border-red-200 p-6 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:border-red-900/40 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 flex flex-col items-center justify-center border-r border-ksp-gray-100 pr-4 text-center dark:border-ksp-navy-light">
                  {/* Gauge */}
                  <div className="relative flex items-center justify-center w-32 h-32">
                    <div className="w-28 h-28 rounded-full border-4 border-ksp-gray-100 flex items-center justify-center dark:border-ksp-navy-light">
                      <div className="text-center select-none">
                        <span className="text-3xl font-extrabold font-mono text-red-700 dark:text-red-400">
                          {selectedRecidivism.riskScore}%
                        </span>
                        <span className="block text-[8px] uppercase tracking-wider text-ksp-gray-600 dark:text-ksp-gray-400 font-bold mt-0.5">
                          {t('riskScore')}
                        </span>
                      </div>
                    </div>
                    {/* Visual arc highlight using CSS borders */}
                    <div className={`absolute inset-0 rounded-full border-4 border-transparent border-l-red-600 ${getGaugeColorClass(selectedRecidivism.riskScore)} animate-pulse`} />
                  </div>
                  <div className="mt-4">
                    <span className="text-xs font-bold text-red-800 bg-red-100 px-4 py-1.5 rounded uppercase tracking-wider font-mono dark:bg-red-950/40 dark:text-red-300">
                      {selectedRecidivism.riskScore >= 75 ? t('criticalRiskTier') : selectedRecidivism.riskScore >= 50 ? t('mediumWarningTier') : t('lowAttentionTier')}
                    </span>
                  </div>
                </div>

                {/* Projection Details */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="font-bold text-xs text-ksp-navy dark:text-sky-300 uppercase tracking-wide border-b pb-2 select-none">
                    Recidivism Timeline & Targets
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-ksp-gray-600 dark:text-ksp-gray-400 font-semibold uppercase block">{t('predictedCrimeType')}</span>
                      <span className="text-ksp-navy font-bold text-sm block mt-0.5 dark:text-white">{selectedRecidivism.predictedCrimeType}</span>
                    </div>
                    <div>
                      <span className="text-ksp-gray-600 dark:text-ksp-gray-400 font-semibold uppercase block">{t('timelineProjection')}</span>
                      <span className="text-red-700 font-bold block mt-0.5 dark:text-red-400">{selectedRecidivism.predictedTimeline}</span>
                    </div>
                    <div>
                      <span className="text-ksp-gray-600 dark:text-ksp-gray-400 font-semibold uppercase block">{t('highProbabilityZone')}</span>
                      <span className="text-ksp-gray-800 font-medium block mt-0.5 flex items-center gap-1 dark:text-ksp-gray-200">
                        <Lucide.MapPin size={12} className="text-ksp-red" /> {selectedRecidivism.predictedZone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-white rounded-lg border border-ksp-gray-200 p-6 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light space-y-4">
                <h3 className="font-bold text-xs text-ksp-navy dark:text-sky-300 uppercase tracking-wide border-b pb-2 select-none flex items-center gap-1.5">
                  <Lucide.ShieldAlert size={15} /> {t('identifiedRiskFactors')}
                </h3>
                <ul className="space-y-3.5 text-xs text-ksp-gray-800 list-disc pl-5 dark:text-ksp-gray-300 leading-relaxed">
                  {selectedRecidivism.triggerFactors.map((factor, index) => (
                    <li key={index} className="font-medium">
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Explainability warning disclosure */}
              <div className="p-4 bg-ksp-gray-50 border border-ksp-gray-200 rounded text-[11px] leading-relaxed text-ksp-gray-600 dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light/40 dark:text-ksp-gray-400 flex gap-2">
                <Lucide.Info size={16} className="text-ksp-navy dark:text-sky-300 shrink-0 mt-0.5" />
                <p>
                  <strong>Algorithm Model transparency disclosure:</strong> Recidivism probability scores are processed using Zoho Catalyst QuickML AutoML node regression models running multi-factor intersection weights. These mathematical projections are designed purely for law enforcement deployment resource optimization and must not be used as primary judicial evidence.
                </p>
              </div>

            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-lg border border-ksp-gray-200 shadow-sm text-ksp-gray-600 dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
              <Lucide.User size={48} className="mx-auto text-ksp-gray-300 mb-3" />
              Select an offender from the roster list to view recidivism warning analytics.
            </div>
          )}
        </div>
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Automated Recidivism Probability Engine"
        department="Crime Intelligence & Statistical Risk Assessment Cell"
        legalAuthority="Section 110 BNSS (Security for good behaviour from habitual offenders)"
        purpose="Machine learning recidivism scoring based on historical conviction frequency, bail violations, crime severity weights, and inter-offence latency periods."
        steps={[
          {
            step: "01",
            action: "Select Offender Roster Record",
            detail: "Choose any registered offender from the left roster list to load individual recidivism telemetry."
          },
          {
            step: "02",
            action: "Evaluate Risk Probability Gauge",
            detail: "Audit the circular probability meter, high-risk flags, and calculated 12-month re-offence probability percentage."
          },
          {
            step: "03",
            action: "Factor Breakdown & Mitigation",
            detail: "Review trigger factors (unemployment, associate clusters, narcotic history) to formulate rehabilitation or surveillance protocols."
          }
        ]}
        tacticalTips={[
          "Scores exceeding 75% trigger high-priority surveillance recommendations for beat constables.",
          "Check the transparency disclosure note regarding algorithm accountability and judicial evidence boundaries."
        ]}
      />
    </div>
  );
}
