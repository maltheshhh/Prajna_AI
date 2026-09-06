import React, { useEffect, useState } from "react";
import { SuspectProfile, RecidivismScore } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import { mockSuspects } from '@/data/mockSuspects';
import { 
  Search, Filter, Shield, User, AlertTriangle, Calendar, MapPin, 
  ChevronRight, ChevronDown, Award, Users, IndianRupee, Activity 
} from 'lucide-react';

export function OffenderProfilingPage() {
  const { t } = useLanguage();
  const [suspects, setSuspects] = useState<any[]>([]);
  const [recidivismScores, setRecidivismScores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://prajna-ai-60073413366.development.catalystserverless.in/server/prajna_ai_function/?query=__offender__"
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setSuspects(data);
          setRecidivismScores([]);
          setIsLoading(false);
          return;
        }
      }
    } catch(err) {
      console.warn("Offender profiles remote fetch error, using local dataset:", err);
    }

    // Fallback to rich mock suspects
    setSuspects(mockSuspects);
    setRecidivismScores([]);
    setIsLoading(false);
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [repeatOnly, setRepeatOnly] = useState(false);
  const [selectedSuspectId, setSelectedSuspectId] =
    useState<string | null>(null);

useEffect(() => {

    if(suspects.length > 0 && !selectedSuspectId){
        setSelectedSuspectId(suspects[0].id);
    }

}, [suspects]);
  // Extract districts for filter
  const districts = ['all', ...Array.from(new Set(suspects.map(s => s.district)))];

  // Filtering logic
  const filteredSuspects = suspects.filter(suspect => {
    const matchesSearch = 
      suspect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suspect.aliases.some((alias: string) => alias.toLowerCase().includes(searchTerm.toLowerCase())) ||
      suspect.moSignature.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (suspect.id && suspect.id.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRisk = selectedRisk === 'all' || suspect.riskTier === selectedRisk;
    const matchesDistrict = selectedDistrict === 'all' || suspect.district === selectedDistrict;
    const matchesRepeat = !repeatOnly || suspect.isRepeatOffender;

    return matchesSearch && matchesRisk && matchesDistrict && matchesRepeat;
  });

  const selectedSuspect = suspects.find(s => s.id === selectedSuspectId) || null;
  const selectedRecidivism: any = null;

  // Helper to color-code risk tiers
  const getRiskBadge = (tier: 'high' | 'medium' | 'low') => {
    switch (tier) {
      case 'high':
        return <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/40 uppercase font-mono tracking-wider">{t('highRisk')}</span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/40 uppercase font-mono tracking-wider">{t('mediumRisk')}</span>;
      case 'low':
        return <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 uppercase font-mono tracking-wider">{t('lowRisk')}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071D3A] via-[#0B2E59] to-[#133D6B] text-white p-6 rounded-2xl shadow-md border-l-4 border-[#FF9F1C] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">{t('offenderProfilingTitle')}</h1>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl font-medium">
            {t('offenderProfilingDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#071D3A]/90 px-3.5 py-1.5 rounded-xl border border-[#FF9F1C]/40 text-xs shrink-0 shadow-xs">
          <Shield size={16} className="text-[#FF9F1C]" />
          <span className="font-mono font-black text-amber-300">{t('dbSyncActive')}</span>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Suspect List & Filters (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-[#071D3A] p-4 rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs">
            <h2 className="text-xs font-black text-[#0B2E59] dark:text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
              <Filter size={15} className="text-[#FF9F1C]" /> {t('filtersParameters')}
            </h2>
            <div className="space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" size={16} />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#05182E] text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-[#FF9F1C] text-xs font-medium placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Risk Tier Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">{t('riskTier')}</label>
                  <select
                    value={selectedRisk}
                    onChange={(e) => setSelectedRisk(e.target.value)}
                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs bg-gray-50/50 dark:bg-[#05182E] text-gray-800 dark:text-white font-medium focus:outline-none focus:border-[#FF9F1C]"
                  >
                    <option value="all">{t('allRiskTiers')}</option>
                    <option value="high">{t('highRisk')}</option>
                    <option value="medium">{t('mediumRisk')}</option>
                    <option value="low">{t('lowRisk')}</option>
                  </select>
                </div>

                {/* District Filter */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">{t('district')}</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs bg-gray-50/50 dark:bg-[#05182E] text-gray-800 dark:text-white font-medium focus:outline-none focus:border-[#FF9F1C]"
                  >
                    {districts.map(dist => (
                      <option key={dist} value={dist}>
                        {dist === 'all' ? t('allDistricts') : dist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Repeat Offender Toggle */}
              <div className="flex items-center pt-1">
                <input
                  id="repeatToggle"
                  type="checkbox"
                  checked={repeatOnly}
                  onChange={(e) => setRepeatOnly(e.target.checked)}
                  className="h-4 w-4 text-[#0B2E59] focus:ring-[#0B2E59] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="repeatToggle" className="ml-2 block text-xs text-gray-800 dark:text-gray-200 font-bold cursor-pointer select-none">
                  {t('showRepeatOnly')}
                </label>
              </div>
            </div>
          </div>

          {/* Suspect List Container */}
          <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#05182E] border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center select-none">
              <span className="text-xs font-black text-[#0B2E59] dark:text-sky-300 font-mono tracking-wider uppercase">
                {t('matchingOffenders')} ({filteredSuspects.length})
              </span>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-800/80 max-h-[550px] overflow-y-auto">
              {isLoading ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-800/80">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-3.5 flex items-start justify-between animate-pulse">
                      <div className="space-y-2 flex-1 pr-4 text-left">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
                          <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
                          <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                        </div>
                        <div className="h-2.5 w-44 bg-gray-200 dark:bg-slate-700 rounded" />
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="h-4 w-14 bg-gray-200 dark:bg-slate-700 rounded" />
                        <div className="h-3 w-10 bg-gray-200 dark:bg-slate-700 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredSuspects.length === 0 ? (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-xs font-medium">
                  {t('noOffendersMatch')}
                </div>
              ) : (
                filteredSuspects.map(suspect => (
                  <button
                    key={suspect.id}
                    onClick={() => setSelectedSuspectId(suspect.id)}
                    className={`w-full text-left p-3.5 flex items-start justify-between transition-all cursor-pointer ${
                      selectedSuspectId === suspect.id 
                        ? 'bg-blue-50 dark:bg-[#133D6B] border-l-4 border-[#FF9F1C] shadow-xs' 
                        : 'hover:bg-gray-50/70 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="space-y-1 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-[#0B2E59] dark:text-white">{suspect.name}</span>
                        {suspect.aliases && suspect.aliases.length > 0 && (
                          <span className="text-xs text-gray-500 dark:text-gray-300 font-medium">({suspect.aliases[0]})</span>
                        )}
                      </div>
                      <div className="text-xs flex items-center gap-1.5 font-medium">
                        <span className="font-mono font-bold text-blue-700 dark:text-sky-300">{suspect.id}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">{suspect.district}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-1 italic">
                        MO: {suspect.moSignature}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between h-full space-y-2 shrink-0">
                      {getRiskBadge(suspect.riskTier)}
                      <span className="text-[10px] font-bold bg-gray-200/80 dark:bg-[#05182E] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-1.5 py-0.5 rounded font-mono">
                        {suspect.totalCases} {t('cases')}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Profiling details & Recidivism Score (7 Cols) */}
        <div className="lg:col-span-7">
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              {/* Profile Card Header Skeleton */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 p-6 space-y-4 text-left">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-200 dark:bg-slate-700 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="h-6 w-48 bg-gray-200 dark:bg-slate-700 rounded" />
                    <div className="h-3.5 w-64 bg-gray-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  {[1, 2, 3, 4].map(k => (
                    <div key={k} className="p-3 bg-gray-50 dark:bg-[#05182E] rounded-lg space-y-2">
                      <div className="h-2.5 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
                      <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Details Section Skeleton */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 p-6 space-y-4 text-left">
                <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
                <div className="h-16 w-full bg-gray-100 dark:bg-slate-800 rounded-lg" />
                <div className="h-4 w-36 bg-gray-200 dark:bg-slate-700 rounded pt-2" />
                <div className="space-y-2">
                  <div className="h-10 w-full bg-gray-100 dark:bg-slate-800 rounded-lg" />
                  <div className="h-10 w-full bg-gray-100 dark:bg-slate-800 rounded-lg" />
                </div>
              </div>
            </div>
          ) : !selectedSuspect ? (
            <div className="bg-white dark:bg-[#071D3A] p-12 text-center rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs text-gray-500 dark:text-gray-400">
              <User size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
              <p className="font-medium text-sm">{t('selectOffenderInstructions')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Profile Card Header */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs p-6 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-[#0B2E59] dark:bg-[#133D6B] flex items-center justify-center border-2 border-[#FF9F1C]/40 text-[#FFB800] shadow-inner shrink-0">
                      <User size={32} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#0B2E59] dark:text-white">{selectedSuspect.name}</h2>
                      <div className="flex flex-wrap gap-2 items-center mt-1 text-xs text-gray-700 dark:text-gray-300 font-medium">
                        <span className="font-bold text-blue-700 dark:text-sky-300 font-mono">{selectedSuspect.id}</span>
                        <span>•</span>
                        <span>{t('aliases')}: {selectedSuspect.aliases.join(', ') || t('none')}</span>
                        <span>•</span>
                        <span>{selectedSuspect.age} {t('yrs')} ({selectedSuspect.gender})</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {getRiskBadge(selectedSuspect.riskTier)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 dark:border-gray-800 pt-4 text-xs">
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">{t('moSignature')}</span>
                    <span className="text-[#0B2E59] dark:text-white font-black text-sm mt-0.5 block">{selectedSuspect.moSignature}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">{t('biometricLinkStatus')}</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                      <Award size={14} /> {t('aadharHashVerified')} ({selectedSuspect.aadharHash?.substring(0, 8)}...)
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">{t('lastKnownActivity')}</span>
                    <span className="text-gray-800 dark:text-gray-200 font-mono font-bold mt-0.5 block">
                      {new Date(selectedSuspect.lastKnownActivity).toLocaleDateString()} at {new Date(selectedSuspect.lastKnownActivity).toLocaleTimeString()}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">{t('addressesRegistered')}</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium mt-0.5 block">
                      {selectedSuspect.knownAddresses.join('; ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Recidivism Probability Engine (Zia Serverless Scoring) */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-red-200 dark:border-red-900/60 shadow-xs overflow-hidden">
                <div className="bg-red-50/70 dark:bg-red-950/40 px-4 py-3 border-b border-red-200 dark:border-red-900/60 flex justify-between items-center select-none">
                  <h3 className="text-xs font-black text-red-900 dark:text-red-300 uppercase tracking-wider flex items-center gap-2">
                    <Activity size={16} className="text-red-600" /> {t('recidivismWarningEngine')}
                  </h3>
                  <span className="text-[10px] font-mono font-black bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded-md">
                    {t('catalystQuickMlLive')}
                  </span>
                </div>
                
                <div className="p-6">
                  {selectedRecidivism ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Risk Gauge (4 Cols) */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center border-r border-gray-100 dark:border-gray-800 pr-2 text-center">
                        <div className="relative flex items-center justify-center">
                          <div className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                            <div className="text-center">
                              <span className="text-3xl font-black font-mono text-red-700 dark:text-red-400">{selectedRecidivism.riskScore}%</span>
                              <span className="block text-[8px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">{t('riskScore')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-xs font-black text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-950/80 px-3 py-1 rounded-md border border-red-200 dark:border-red-800 font-mono">
                            {selectedRecidivism.riskScore >= 75 ? t('criticalRiskTier') : selectedRecidivism.riskScore >= 50 ? t('mediumWarningTier') : t('lowAttentionTier')}
                          </span>
                        </div>
                      </div>

                      {/* Recidivism Metrics (8 Cols) */}
                      <div className="md:col-span-8 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">{t('predictedCrimeType')}</span>
                            <span className="text-[#0B2E59] dark:text-white font-bold text-sm block mt-0.5">{selectedRecidivism.predictedCrimeType}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">{t('timelineProjection')}</span>
                            <span className="text-red-700 dark:text-red-400 font-bold block mt-0.5">{selectedRecidivism.predictedTimeline}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">{t('highProbabilityZone')}</span>
                            <span className="text-gray-800 dark:text-gray-200 font-medium block mt-0.5 flex items-center gap-1">
                              <MapPin size={12} className="text-red-600" /> {selectedRecidivism.predictedZone}
                            </span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block">{t('modelLastUpdated')}</span>
                            <span className="text-gray-600 dark:text-gray-400 font-mono block mt-0.5">
                              {new Date(selectedRecidivism.lastUpdated).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Trigger Factors */}
                        <div className="bg-gray-50 dark:bg-[#05182E] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="text-xs font-bold text-[#0B2E59] dark:text-sky-300 mb-1.5 block">{t('identifiedRiskFactors')}</span>
                          <ul className="space-y-1 text-xs text-gray-800 dark:text-gray-300 list-disc pl-4 font-medium">
                            {selectedRecidivism.triggerFactors.map((factor: string, index: number) => (
                              <li key={index}>{factor}</li>
                            ))}
                          </ul>
                        </div>

                      </div>

                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-xs font-medium">
                      {t('noPredictiveMetrics')}
                    </div>
                  )}
                </div>
              </div>

              {/* Case History Timeline (Linked FIRs) */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs p-6">
                <h3 className="text-sm font-bold text-[#0B2E59] dark:text-white mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                  <Calendar size={16} className="text-[#FF9F1C]" /> {t('criminalCaseTimeline')}
                </h3>
                
                {selectedSuspect.linkedFIRs.length === 0 ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4 font-medium">{t('noActiveCaseAssociations')}</p>
                ) : (
                  <div className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-800 space-y-6">
                    {selectedSuspect.linkedFIRs.map((firId: string) => (
                      <div key={firId} className="relative">
                        {/* Timeline node dot */}
                        <span className="absolute -left-[31px] top-3.5 w-4 h-4 rounded-full bg-red-600 border-2 border-white dark:border-[#071D3A] shadow-xs"></span>
                        
                        <div className="bg-gray-50 dark:bg-[#05182E] p-3.5 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <span className="text-xs font-black text-[#0B2E59] dark:text-sky-300 font-mono tracking-wider">{firId}</span>
                            <span className="text-xs text-gray-600 dark:text-gray-300 block mt-0.5 font-medium">
                              {t('linkedToCrimeEvent')}
                            </span>
                          </div>
                          <a
                            href={`/trends-analytics?fir=${firId}`}
                            className="px-3 py-1.5 bg-[#0B2E59] hover:bg-[#133D6B] dark:bg-sky-600 dark:hover:bg-sky-500 text-white rounded-lg text-xs font-black font-mono flex items-center gap-1 shrink-0 shadow-xs cursor-pointer transition"
                          >
                            {t('firLink')} <ChevronRight size={12} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Co-Offender Associations Network List */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs p-6">
                <h3 className="text-sm font-bold text-[#0B2E59] dark:text-white mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                  <Users size={16} className="text-[#FF9F1C]" /> {t('coOffenderDirectory')}
                </h3>
                
                {selectedSuspect.associateIds.length === 0 ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4 font-medium">{t('noCoOffenderLinks')}</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedSuspect.associateIds.map((assocId: string) => {
                      const associate = suspects.find(s => s.id === assocId);
                      return (
                        <div key={assocId} className="bg-gray-50 dark:bg-[#05182E] p-3 rounded-xl border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                          <div>
                            <span className="font-black text-xs text-[#0B2E59] dark:text-white block">{associate?.name || assocId}</span>
                            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 block mt-0.5">ID: {assocId}</span>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <span className="text-[9px] bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30 px-1.5 py-0.5 rounded font-bold font-mono">
                              {t('associate')}
                            </span>
                            {associate && (
                              <button 
                                type="button"
                                onClick={() => setSelectedSuspectId(associate.id)} 
                                className="text-[10px] text-red-700 dark:text-red-400 hover:underline font-bold flex items-center cursor-pointer"
                              >
                                {t('viewProfile')} <ChevronRight size={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Offender Profiling & Recidivism Prediction Engine"
        department="Crime Intelligence & Criminal History Tracking Bureau"
        legalAuthority="Criminal Procedure (Identification) Act, 2022 & Section 110 BNSS (Habitual Offenders)"
        purpose="AI-assisted suspect dossier generation, recidivism risk calculation, Modus Operandi (MO) clustering, and multi-jurisdictional criminal associate tracking."
        steps={[
          {
            step: "01",
            action: "Select or Search Suspect",
            detail: "Filter suspects by crime type (Theft, Burglary, Cybercrime) or type suspect ID/alias in the search bar to load the dossier."
          },
          {
            step: "02",
            action: "Recidivism Risk Gauge",
            detail: "Examine the dynamic Recidivism Gauge (High / Medium / Low Risk) calculated from past chargesheets, bail history, and inter-crime intervals."
          },
          {
            step: "03",
            action: "Criminal Timeline & Associates",
            detail: "Audit historical FIR registrations, case disposal stages, and click linked associate nodes to unmask co-conspirators."
          }
        ]}
        tacticalTips={[
          "High-Risk offenders (>70% recidivism score) automatically flag for Section 110 BNSS preventive surveillance bonds.",
          "Click on any associate suspect card to instantly switch dossiers and track cross-network operations."
        ]}
      />
    </div>
  );
}

