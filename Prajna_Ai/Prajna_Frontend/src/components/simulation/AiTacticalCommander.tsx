import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ScenarioLocation,
  SimulationFactors,
  PlacedUnit,
  DeploymentPosture,
} from '@/utils/mockSimulationEngine';
import {
  AiStrategyType,
  AI_STRATEGIES,
  DistrictCrimeTelemetry,
  AiDeploymentPlanResponse,
  getClientDistrictTelemetry,
  generateClientTacticalPlan,
} from '@/utils/aiTacticalPlanner';
import {
  fetchDistrictIntelligenceApi,
  generateAiDeploymentPlanApi,
} from '@/utils/api';
import { LiveWeatherData } from '@/pages/OperationalSimulationPage';
import {
  Bot,
  Sparkles,
  Shield,
  Zap,
  CloudRain,
  Crosshair,
  FileText,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Clock,
  Radio,
  Users,
  Compass,
  Loader2,
  ChevronRight,
  Database,
  BarChart3,
} from 'lucide-react';

interface AiTacticalCommanderProps {
  scenarioLocation: ScenarioLocation;
  liveWeather: LiveWeatherData | null;
  currentFactors: SimulationFactors;
  onApplyPlanA: (factors: { posture: DeploymentPosture; placedUnits: PlacedUnit[] }) => void;
  onApplyPlanB: (factors: { posture: DeploymentPosture; placedUnits: PlacedUnit[] }) => void;
  onShowToast: (msg: string) => void;
}

export function AiTacticalCommander({
  scenarioLocation,
  liveWeather,
  currentFactors,
  onApplyPlanA,
  onApplyPlanB,
  onShowToast,
}: AiTacticalCommanderProps) {
  const { t } = useLanguage();

  const [selectedStrategy, setSelectedStrategy] = useState<AiStrategyType>('hotspot_deterrence');
  const [telemetry, setTelemetry] = useState<DistrictCrimeTelemetry | null>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [aiPlanResult, setAiPlanResult] = useState<AiDeploymentPlanResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'briefing' | 'telemetry'>('briefing');

  // Fetch real district crime telemetry when scenario district changes
  useEffect(() => {
    let isMounted = true;

    async function loadTelemetry() {
      if (!scenarioLocation || !scenarioLocation.district) return;
      setIsLoadingTelemetry(true);
      try {
        const res = await fetchDistrictIntelligenceApi(scenarioLocation.district);
        const telemetryData = (res && res.success && res.data) ? res.data : (res && (res as any).totalFIRsCount !== undefined ? (res as any) : null);
        if (telemetryData && isMounted) {
          setTelemetry(telemetryData);
        } else if (isMounted) {
          setTelemetry(getClientDistrictTelemetry(scenarioLocation.district));
        }
      } catch (err) {
        console.warn('District telemetry fetch fallback:', err);
        if (isMounted) {
          setTelemetry(getClientDistrictTelemetry(scenarioLocation.district));
        }
      } finally {
        if (isMounted) setIsLoadingTelemetry(false);
      }
    }

    loadTelemetry();

    return () => {
      isMounted = false;
    };
  }, [scenarioLocation]);

  // Generate AI Deployment Plan
  const handleGenerateAiPlan = async () => {
    setIsGeneratingPlan(true);
    const payload = {
      scenarioLocation,
      strategyType: selectedStrategy,
      crowdDensity: currentFactors.crowdDensity || 'moderate',
      liveWeather: liveWeather || {
        condition: currentFactors.environmentalConditions || 'clear',
        temperature: 26,
        windSpeed: 10,
        precipitation: 0,
        description: 'Clear conditions',
      },
      budgetLimit: 30,
    };

    let planData: AiDeploymentPlanResponse | null = null;

    try {
      const res = await generateAiDeploymentPlanApi(payload);
      if (res && res.success && res.data && res.data.planA) {
        planData = res.data;
      } else if (res && (res as any).planA) {
        planData = res as any;
      }
    } catch (err) {
      console.warn('Backend AI plan generator network fallback:', err);
    }

    // Guaranteed fallback ensuring instantaneous generation even if network is offline
    if (!planData || !planData.planA) {
      planData = generateClientTacticalPlan(payload);
    }

    setAiPlanResult(planData);
    onShowToast(t('aiPlanAppliedSuccess') || 'AI Tactical Deployment Strategy generated.');
    setIsGeneratingPlan(false);
  };

  const renderStrategyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crosshair': return <Crosshair size={16} className="text-sky-600 dark:text-sky-400" />;
      case 'Shield': return <Shield size={16} className="text-amber-600 dark:text-amber-400" />;
      case 'Zap': return <Zap size={16} className="text-pink-600 dark:text-pink-400" />;
      case 'CloudRain': return <CloudRain size={16} className="text-purple-600 dark:text-purple-400" />;
      default: return <Compass size={16} className="text-blue-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#0B2E59]/30 dark:bg-[#071D3A] dark:border-sky-500/30 shadow-md overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2E59] via-[#103D72] to-[#1E4E8C] text-white p-4.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-sky-400/20 border border-sky-300/30 rounded-lg shadow-inner">
            <Bot size={22} className="text-sky-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm tracking-wide uppercase">
                {t('aiTacticalCommander')}
              </h3>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-mono font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE INTELLIGENCE
              </span>
            </div>
            <p className="text-[11px] text-sky-200/90 font-medium mt-0.5">
              {t('aiCommanderSubtitle')}
            </p>
          </div>
        </div>

        {/* Action Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('briefing')}
            className={`px-3 py-1.5 rounded text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'briefing'
                ? 'bg-sky-400 text-slate-950 shadow'
                : 'bg-white/10 hover:bg-white/20 text-sky-100'
            }`}
          >
            <Sparkles size={13} /> {t('aiBriefingTitle')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded text-xs font-extrabold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'telemetry'
                ? 'bg-sky-400 text-slate-950 shadow'
                : 'bg-white/10 hover:bg-white/20 text-sky-100'
            }`}
          >
            <Database size={13} /> {t('districtCrimeTelemetry')}
          </button>
        </div>
      </div>

      {/* Real District Crime Telemetry Bar */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border-b border-gray-200 dark:border-ksp-navy-light px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-extrabold text-gray-700 dark:text-gray-200 flex items-center gap-1">
            <BarChart3 size={14} className="text-[#0B2E59] dark:text-sky-300" />
            {scenarioLocation.district}:
          </span>

          {isLoadingTelemetry ? (
            <div className="flex items-center gap-1.5 text-gray-500 font-mono text-[11px]">
              <Loader2 size={12} className="animate-spin text-sky-500" />
              <span>Querying backend FIRs & Hotspots...</span>
            </div>
          ) : telemetry ? (
            <>
              <span className="bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800 px-2 py-0.5 rounded font-mono font-bold text-[10.5px]">
                {telemetry.totalFIRsCount} FIRs
              </span>
              <span className="bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded font-mono font-bold text-[10.5px]">
                Primary Threat: {telemetry.primaryThreatCrime}
              </span>
              <span className="bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded font-mono font-bold text-[10.5px]">
                {telemetry.criticalHotspotsCount} Critical Hotspots
              </span>
              {telemetry.repeatOffenderLinks > 0 && (
                <span className="bg-purple-100 text-purple-900 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded font-mono font-bold text-[10.5px]">
                  {telemetry.repeatOffenderLinks} Repeat Links
                </span>
              )}
            </>
          ) : (
            <span className="text-gray-400 text-[11px]">Standard district telemetry active.</span>
          )}
        </div>

        {liveWeather && (
          <div className="text-[11px] font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Telemetry: {liveWeather.temperature}°C, {liveWeather.description}</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="p-5 space-y-4">
        {activeTab === 'telemetry' ? (
          /* District Crime Intelligence Breakdown */
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2 dark:border-ksp-navy-light">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-800 dark:text-white flex items-center gap-1.5">
                <FileText size={15} className="text-[#0B2E59] dark:text-sky-300" />
                Historical Crime Intelligence & Accused Profiles ({scenarioLocation.district})
              </h4>
              <span className="text-[10px] font-mono text-gray-400">DATABASE ACTIVE</span>
            </div>

            {telemetry && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Top Crime Breakdown */}
                <div className="p-3.5 rounded-lg border border-gray-200 bg-slate-50 dark:bg-ksp-navy-dark dark:border-ksp-navy-light space-y-2">
                  <h5 className="font-extrabold text-xs text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    Top Crime Categories
                  </h5>
                  <div className="space-y-1.5">
                    {telemetry.topCrimeTypes.map((ct, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-gray-200/50 dark:border-ksp-navy-light/40">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">{ct.crimeType}</span>
                        <span className="font-mono font-bold text-[#0B2E59] dark:text-sky-300">{ct.count} Cases</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Recent Incidents */}
                <div className="p-3.5 rounded-lg border border-gray-200 bg-slate-50 dark:bg-ksp-navy-dark dark:border-ksp-navy-light space-y-2">
                  <h5 className="font-extrabold text-xs text-gray-700 dark:text-gray-200 uppercase tracking-wide">
                    Recent Verified FIR Records
                  </h5>
                  <div className="space-y-2">
                    {telemetry.sampleFIRs.map((fir, idx) => (
                      <div key={idx} className="p-2 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-ksp-navy-light text-[11px] space-y-0.5">
                        <div className="flex justify-between font-mono font-bold text-gray-700 dark:text-gray-300">
                          <span>{fir.firNumber}</span>
                          <span className="text-gray-400">{fir.date}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{fir.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* AI Strategy Planning Tab */
          <div className="space-y-4">
            {/* Strategy Objective Picker */}
            <div className="space-y-2">
              <label className="font-extrabold text-xs uppercase tracking-wide text-gray-800 dark:text-gray-200 flex items-center justify-between">
                <span>{t('aiStrategySelect')}</span>
                <span className="text-[10px] font-mono text-gray-400">4 STRATEGIC MODELS</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {AI_STRATEGIES.map((strat) => (
                  <button
                    key={strat.id}
                    type="button"
                    onClick={() => setSelectedStrategy(strat.id)}
                    className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      selectedStrategy === strat.id
                        ? 'border-[#0B2E59] bg-[#0B2E59]/5 ring-1 ring-[#0B2E59] dark:border-sky-300 dark:bg-sky-950/40 dark:ring-sky-300'
                        : 'border-gray-200 hover:bg-gray-50 dark:border-ksp-navy-light dark:hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800">
                          {renderStrategyIcon(strat.iconName)}
                        </div>
                        <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.5 rounded bg-gray-200/80 text-gray-800 dark:bg-slate-800 dark:text-gray-200">
                          {strat.badge}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-xs text-gray-900 dark:text-white pt-1">
                        {t(strat.titleKey as any) || strat.id}
                      </h4>
                    </div>

                    <p className="text-[10px] text-gray-500 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                      {t(strat.descKey as any)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleGenerateAiPlan}
                disabled={isGeneratingPlan}
                className="px-5 py-2.5 bg-[#0B2E59] hover:bg-[#133D6B] text-white font-extrabold text-xs rounded-lg shadow-md transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isGeneratingPlan ? (
                  <>
                    <Loader2 size={15} className="animate-spin text-sky-300" />
                    <span>{t('generatingAiPlan')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={15} className="text-amber-300" />
                    <span>{t('generateAiPlanBtn')}</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>

            {/* AI Generated Plan Briefing & Actions */}
            {aiPlanResult && (
              <div className="mt-4 p-4 rounded-lg border border-sky-200 bg-sky-50/70 dark:bg-sky-950/20 dark:border-sky-800/60 space-y-3.5 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-sky-200/80 dark:border-sky-800/50 pb-2.5">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0B2E59] dark:text-sky-200 flex items-center gap-1.5">
                      <Shield size={16} className="text-emerald-600 dark:text-emerald-400" />
                      {aiPlanResult.aiBriefing.title} — {selectedStrategy.replace(/_/g, ' ').toUpperCase()}
                    </h4>
                    <p className="text-xs text-gray-700 dark:text-gray-300 mt-0.5 font-semibold">
                      {aiPlanResult.aiBriefing.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 rounded dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700">
                      {aiPlanResult.aiBriefing.expectedRiskReduction}
                    </span>
                    <span className="text-[10px] font-mono font-extrabold bg-sky-100 text-sky-900 border border-sky-300 px-2 py-0.5 rounded dark:bg-sky-950 dark:text-sky-300 dark:border-sky-700">
                      {aiPlanResult.aiBriefing.expectedSlaAcceleration}
                    </span>
                  </div>
                </div>

                {/* Threat Assessment & Reasoning Details */}
                <div className="space-y-2">
                  <div className="p-3 bg-white dark:bg-slate-900/90 rounded border border-sky-200/60 dark:border-sky-800/40 text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-semibold">
                    <span className="font-bold text-[#0B2E59] dark:text-sky-300 uppercase tracking-wide block mb-1">
                      {t('aiThreatAssessment')}:
                    </span>
                    {aiPlanResult.aiBriefing.threatAssessment}
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900/90 rounded border border-sky-200/60 dark:border-sky-800/40 space-y-1.5">
                    <span className="font-bold text-xs text-[#0B2E59] dark:text-sky-300 uppercase tracking-wide block">
                      {t('aiStrategicRationale')}:
                    </span>
                    {aiPlanResult.aiBriefing.reasoningDetails.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-600 dark:bg-sky-400 mt-1.5 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan A & Plan B Quick Comparison Pill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 rounded bg-white dark:bg-slate-900/90 border border-gray-200 dark:border-ksp-navy-light flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-xs text-gray-800 dark:text-gray-200 block">Plan A (AI Baseline)</span>
                      <span className="text-[10px] font-mono text-gray-500">{aiPlanResult.planA.placedUnits.length} Units • Posture: {aiPlanResult.planA.posture}</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: aiPlanResult.planA.result.riskColor }}>
                      Risk: {aiPlanResult.planA.result.coverageRiskIndex}
                    </span>
                  </div>

                  <div className="p-3 rounded bg-white dark:bg-slate-900/90 border border-gray-200 dark:border-ksp-navy-light flex items-center justify-between">
                    <div>
                      <span className="font-extrabold text-xs text-gray-800 dark:text-gray-200 block">Plan B (AI Contingency)</span>
                      <span className="text-[10px] font-mono text-gray-500">{aiPlanResult.planB.placedUnits.length} Units • Posture: {aiPlanResult.planB.posture}</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: aiPlanResult.planB.result.riskColor }}>
                      Risk: {aiPlanResult.planB.result.coverageRiskIndex}
                    </span>
                  </div>
                </div>

                {/* 1-Click Deployment Actions */}
                <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-sky-200/80 dark:border-sky-800/50">
                  <button
                    type="button"
                    onClick={() => {
                      onApplyPlanA({
                        posture: aiPlanResult.planA.posture,
                        placedUnits: aiPlanResult.planA.placedUnits,
                      });
                      onShowToast(t('aiPlanAppliedSuccess') || 'AI Plan applied to Plan A.');
                    }}
                    className="px-4 py-2 bg-[#0B2E59] hover:bg-[#133D6B] text-white font-extrabold text-xs rounded border border-sky-300/40 shadow transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Compass size={13} />
                    <span>{t('applyToPlanA')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onApplyPlanB({
                        posture: aiPlanResult.planB.posture,
                        placedUnits: aiPlanResult.planB.placedUnits,
                      });
                      onShowToast(t('aiPlanAppliedSuccess') || 'AI Plan applied to Plan B.');
                    }}
                    className="px-4 py-2 bg-[#133D6B] hover:bg-[#1a4a80] text-sky-200 font-extrabold text-xs rounded border border-sky-400/40 shadow transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Zap size={13} className="text-sky-300" />
                    <span>{t('applyToPlanB')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onApplyPlanA({
                        posture: aiPlanResult.planA.posture,
                        placedUnits: aiPlanResult.planA.placedUnits,
                      });
                      onApplyPlanB({
                        posture: aiPlanResult.planB.posture,
                        placedUnits: aiPlanResult.planB.placedUnits,
                      });
                      onShowToast('AI Tactical Deployments applied to both Plan A and Plan B.');
                    }}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded border border-emerald-500/40 shadow transition cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} />
                    <span>Apply Both Plans (A & B)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
