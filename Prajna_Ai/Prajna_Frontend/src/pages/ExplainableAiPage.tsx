import React, { useState } from 'react';
import { AuditLogTable } from '@/components/audit/AuditLogTable';
import { CatalystStatusPanel } from '@/components/audit/CatalystStatusPanel';
import { mockAuditLogs } from '@/data/mockAuditLogs';
import { mockCatalystStatus } from '@/data/mockCatalystStatus';
import { useLanguage } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';

export function ExplainableAiPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'audit' | 'status' | 'reports'>('audit');
  
  // Reports form state
  const [reportType, setReportType] = useState('investigation');
  const [dateRange, setDateRange] = useState('30days');
  const [district, setDistrict] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerationProgress(0);
    
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-ksp-navy text-white p-6 rounded-lg shadow border-l-4 border-ksp-red flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-sans">
            {t('f11Title') || 'F11: Explainable AI & Security Audit'}
          </h1>
          <p className="text-sm text-ksp-gray-300 mt-1">
            {t('f11Desc') || 'Immutable security logs, CCTNS record citations, and Zoho Catalyst microservices status.'}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-ksp-navy-light px-4 py-2 rounded border border-ksp-navy-dark text-xs">
          <Lucide.Shield size={16} className="text-ksp-red" />
          <span className="font-mono text-ksp-gray-100">{t('auditLocked')}</span>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-gray-200 dark:border-blue-900/40 bg-gray-50/50 dark:bg-[#030712] rounded-t-xl overflow-x-auto select-none">
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'audit'
              ? 'border-[#38BDF8] text-[#0B2E59] dark:text-[#38BDF8] bg-white dark:bg-[#081120] font-black shadow-xs'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0B2E59] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0B1930]'
          }`}
        >
          <Lucide.FileText size={16} className={activeTab === 'audit' ? 'text-[#38BDF8]' : ''} /> {t('secureAuditLogs')}
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'status'
              ? 'border-[#38BDF8] text-[#0B2E59] dark:text-[#38BDF8] bg-white dark:bg-[#081120] font-black shadow-xs'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0B2E59] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0B1930]'
          }`}
        >
          <Lucide.Database size={16} className={activeTab === 'status' ? 'text-[#38BDF8]' : ''} /> {t('catalystCloudStatus')}
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'reports'
              ? 'border-[#38BDF8] text-[#0B2E59] dark:text-[#38BDF8] bg-white dark:bg-[#081120] font-black shadow-xs'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0B2E59] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0B1930]'
          }`}
        >
          <Lucide.Settings size={16} className={activeTab === 'reports' ? 'text-[#38BDF8]' : ''} /> {t('executiveReportGenerator')}
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-ksp-gray-200 shadow-sm text-xs text-ksp-gray-800 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-ksp-gray-200">
              <span className="font-bold text-ksp-red uppercase block">{t('tamperProofLockActive')}</span>
              <p className="mt-1">
                {t('tamperProofDesc')}
              </p>
            </div>
            <AuditLogTable logs={mockAuditLogs} />
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-4">
            <CatalystStatusPanel services={mockCatalystStatus} />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-6 dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
              <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider border-b border-ksp-gray-100 pb-2 dark:text-white">
                {t('configureReport')}
              </h2>

              <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Report Type */}
                  <div>
                    <label className="block text-xs font-semibold text-ksp-gray-800 mb-1 uppercase dark:text-ksp-gray-200">{t('reportClass')}</label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full p-2.5 border border-ksp-gray-200 rounded text-xs bg-white text-ksp-gray-800 dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                    >
                      <option value="investigation">{t('classInvestigation')}</option>
                      <option value="trends">{t('classTrends')}</option>
                      <option value="offenders">{t('classOffenders')}</option>
                      <option value="audit">{t('classAudit')}</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label className="block text-xs font-semibold text-ksp-gray-800 mb-1 uppercase dark:text-ksp-gray-200">{t('temporalScope')}</label>
                    <select
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full p-2.5 border border-ksp-gray-200 rounded text-xs bg-white text-ksp-gray-800 dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                    >
                      <option value="30days">{t('scope30days')}</option>
                      <option value="90days">{t('scope90days')}</option>
                      <option value="1year">{t('scope1year')}</option>
                      <option value="custom">{t('scopeCustom')}</option>
                    </select>
                  </div>
                </div>

                {/* District Selector */}
                <div>
                  <label className="block text-xs font-semibold text-ksp-gray-800 mb-1 uppercase dark:text-ksp-gray-200">{t('districtJurisdiction')}</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 border border-ksp-gray-200 rounded text-xs bg-white text-ksp-gray-800 dark:bg-ksp-navy-light dark:border-ksp-navy-light dark:text-white"
                  >
                    <option value="all">{t('distAll')}</option>
                    <option value="blr">{t('distBlr')}</option>
                    <option value="mys">{t('distMys')}</option>
                    <option value="mng">{t('distMng')}</option>
                    <option value="hbl">{t('distHbl')}</option>
                  </select>
                </div>

                {/* Secure Checkboxes */}
                <div className="space-y-2 pt-2 border-t border-ksp-gray-100 dark:border-ksp-navy-light">
                  <div className="flex items-center">
                    <input
                      id="maskPii"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-ksp-navy focus:ring-ksp-navy border-ksp-gray-300 rounded"
                    />
                    <label htmlFor="maskPii" className="ml-2 block text-xs text-ksp-gray-800 font-semibold cursor-pointer dark:text-ksp-gray-200">
                      {t('maskPii')}
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="auditLogCheck"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-ksp-navy focus:ring-ksp-navy border-ksp-gray-300 rounded"
                    />
                    <label htmlFor="auditLogCheck" className="ml-2 block text-xs text-ksp-gray-800 font-semibold cursor-pointer dark:text-ksp-gray-200">
                      {t('autoSign')}
                    </label>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-ksp-navy hover:bg-ksp-navy-light text-white font-bold px-6 py-2.5 rounded text-xs flex items-center gap-2 border border-ksp-navy-dark disabled:opacity-50 transition-colors dark:bg-ksp-navy-light dark:hover:bg-ksp-navy-light/80"
                  >
                    {isGenerating ? (
                      <>
                        <Lucide.Loader2 size={16} className="animate-spin text-white" />
                        {t('generating')} ({generationProgress}%)
                      </>
                    ) : (
                      <>
                        <Lucide.Download size={16} /> {t('compileReport')}
                      </>
                    )}
                  </button>
                  <button
                    type="reset"
                    disabled={isGenerating}
                    className="border border-ksp-gray-300 text-ksp-gray-800 px-4 py-2.5 rounded text-xs hover:bg-ksp-gray-50 transition-colors dark:border-ksp-navy-light dark:text-ksp-gray-300 dark:hover:bg-ksp-navy-light/10"
                  >
                    {t('resetParams')}
                  </button>
                </div>

              </form>
            </div>

            {/* Status Column (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4 text-xs text-ksp-gray-800 dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:text-ksp-gray-200">
              <h3 className="text-sm font-bold text-ksp-navy uppercase border-b border-ksp-gray-100 pb-2 dark:text-white">
                {t('zohoSmartBrowz')} (via Browser Web Engine)
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-ksp-gray-50 border border-ksp-gray-200 rounded dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light/40">
                  <span className="font-semibold text-ksp-navy block mb-1 dark:text-sky-300">
                    {t('serverlessEngine')} (external feature)
                  </span>
                  <p>
                    {t('serverlessEngineDesc')}
                  </p>
                </div>

                {isGenerating && (
                  <div className="space-y-1">
                    <div className="flex justify-between font-semibold">
                      <span>{t('compilingAssets')}</span>
                      <span>{generationProgress}%</span>
                    </div>
                    <div className="w-full bg-ksp-gray-200 h-2 rounded overflow-hidden">
                      <div 
                        className="bg-ksp-navy h-full transition-all duration-150" 
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {showToast && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-900 rounded flex items-start gap-2 animate-fade-in shadow-sm dark:bg-green-950/20 dark:border-green-900/40 dark:text-green-300">
                    <Lucide.CheckCircle2 className="text-ksp-success shrink-0" size={18} />
                    <div>
                      <span className="font-bold block">{t('pdfSuccess')}</span>
                      <span className="block mt-0.5 text-xs">
                        {t('pdfSuccessDesc')}KSP-REP-{Math.floor(Math.random() * 8000) + 1000}.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Explainable AI & Legal Accountability Architecture"
        department="State Police Legal Oversight & AI Ethics Board"
        legalAuthority="Digital Personal Data Protection (DPDP) Act, 2023 & Indian Evidence Act Electronic Admissibility"
        purpose="Model transparency reporting, SHAP/LIME feature attribution inspection, audit trail verification, and cloud microservices health auditing."
        steps={[
          {
            step: "01",
            action: "Inspect Security Audit Logs",
            detail: "Verify SHA-256 digital signatures, officer badge authorization, and prompt history across CCTNS RAG queries."
          },
          {
            step: "02",
            action: "Catalyst Serverless Status",
            detail: "Audit real-time latency, cloud API gateway availability, and QuickML model inference telemetry."
          },
          {
            step: "03",
            action: "Generate Compliance Dossier",
            detail: "Export automated executive PDF reports documenting system transparency metrics for judicial submission."
          }
        ]}
        tacticalTips={[
          "All algorithmic inferences include confidence weight disclosures to prevent algorithmic bias in policing.",
          "Check the Tamper-Proof Lock badge confirming active cryptographic chain-of-custody logging."
        ]}
      />
    </div>
  );
}
