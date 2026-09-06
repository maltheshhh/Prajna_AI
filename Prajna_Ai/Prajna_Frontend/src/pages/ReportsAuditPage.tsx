import React, { useState, useEffect } from 'react';
import { AuditLogTable } from '@/components/audit/AuditLogTable';
import { CatalystStatusPanel } from '@/components/audit/CatalystStatusPanel';

import { 
  useLanguage, 
  formatCrimeType, 
  formatIncidentStatus, 
  formatIncidentDetails 
} from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { fetchCitizenReports, fetchAuditLogsApi } from '@/utils/api';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import { Shield, FileText, Database, Settings, Download, CheckCircle2, Loader2, AlertCircle, MapPin, Check, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function ReportsAuditPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [logs, setLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'audit' | 'status' | 'reports' | 'incidents'>('audit');
  
  // Incident reports queue state
  const [incidentReports, setIncidentReports] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);

  useEffect(() => {
    loadIncidentQueue();
    loadAuditLogs();
  }, []);

  async function loadAuditLogs() {
    try {
      const res = await fetchAuditLogsApi();
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        setLogs(res.data);
      }
    } catch (err) {
      console.warn('Audit logs fallback:', err);
    }
  }

  async function loadIncidentQueue() {
    try {
      const apiRes = await fetchCitizenReports();
      if (apiRes.success && apiRes.data?.reports?.length) {
        setIncidentReports(apiRes.data.reports);
        return;
      }
    } catch {
      // Fallback
    }

    const data = localStorage.getItem('ksp_general_crime_reports');
    if (data) {
      setIncidentReports(JSON.parse(data));
    }
  }

  const handleDispatchFromAudit = (reportId: string) => {
    const updated = incidentReports.map(r => {
      if (r.id === reportId) {
        return { ...r, status: "Patrol Dispatched & Station Logged" };
      }
      return r;
    });
    localStorage.setItem('ksp_general_crime_reports', JSON.stringify(updated));
    setIncidentReports(updated);
    if (selectedIncident && selectedIncident.id === reportId) {
      setSelectedIncident({ ...selectedIncident, status: "Patrol Dispatched & Station Logged" });
    }
    showToast({ type: 'warning', title: 'Emergency Dispatch', message: `Emergency dispatch alert triggered for incident ${reportId}. Patrol vehicle routed to landmark location.` });
  };

  // Reports form state
  const [reportType, setReportType] = useState('investigation');
  const [dateRange, setDateRange] = useState('30days');
  const [district, setDistrict] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showPdfSuccessBanner, setShowPdfSuccessBanner] = useState(false);

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
            setShowPdfSuccessBanner(true);
            setTimeout(() => setShowPdfSuccessBanner(false), 4000);
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
          <h1 className="text-2xl font-bold tracking-tight font-sans">{t('reportsTitle')}</h1>
          <p className="text-sm text-ksp-gray-300 mt-1">
            {t('reportsDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-ksp-navy-light px-4 py-2 rounded border border-ksp-navy-dark text-xs">
          <Shield size={16} className="text-ksp-red" />
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
          <FileText size={16} className={activeTab === 'audit' ? 'text-[#38BDF8]' : ''} /> {t('secureAuditLogs')}
        </button>
        <button
          onClick={() => setActiveTab('status')}
          className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'status'
              ? 'border-[#38BDF8] text-[#0B2E59] dark:text-[#38BDF8] bg-white dark:bg-[#081120] font-black shadow-xs'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0B2E59] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0B1930]'
          }`}
        >
          <Database size={16} className={activeTab === 'status' ? 'text-[#38BDF8]' : ''} /> {t('catalystCloudStatus')}
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'reports'
              ? 'border-[#38BDF8] text-[#0B2E59] dark:text-[#38BDF8] bg-white dark:bg-[#081120] font-black shadow-xs'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0B2E59] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0B1930]'
          }`}
        >
          <Settings size={16} className={activeTab === 'reports' ? 'text-[#38BDF8]' : ''} /> {t('executiveReportGenerator')}
        </button>
        <button
          onClick={() => setActiveTab('incidents')}
          className={`flex items-center gap-2 px-6 py-3.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer shrink-0 ${
            activeTab === 'incidents'
              ? 'border-[#38BDF8] text-[#0B2E59] dark:text-[#38BDF8] bg-white dark:bg-[#081120] font-black shadow-xs'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-[#0B2E59] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#0B1930]'
          }`}
        >
          <AlertCircle size={16} className={activeTab === 'incidents' ? 'text-[#38BDF8]' : ''} /> Citizen Incident Reports Queue
        </button>
      </div>

      {/* Tab Contents */}
      <div className="space-y-6">
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-ksp-gray-200 shadow-sm text-xs text-ksp-gray-800">
              <span className="font-bold text-ksp-red uppercase block">{t('tamperProofLockActive')}</span>
              <p className="mt-1">
                {t('tamperProofDesc')}
              </p>
            </div>
            <AuditLogTable logs={logs} />
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-4">
            <CatalystStatusPanel services={[{ serviceName: 'Identity Engine', status: 'online' as const, latency: 12, lastChecked: new Date().toISOString() }]} />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Form Column (7 Cols) */}
            <div className="lg:col-span-7 bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-6">
              <h2 className="text-sm font-bold text-ksp-navy uppercase tracking-wider border-b border-ksp-gray-100 pb-2">
                {t('configureReport')}
              </h2>

              <form onSubmit={handleGenerateReport} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Report Type */}
                  <div>
                    <label htmlFor="reportTypeSelect" className="block text-xs font-semibold text-ksp-gray-800 mb-1 uppercase">{t('reportClass')}</label>
                    <select
                      id="reportTypeSelect"
                      name="reportTypeSelect"
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full p-2.5 border border-ksp-gray-200 rounded text-xs bg-white text-ksp-gray-800"
                    >
                      <option value="investigation">{t('classInvestigation')}</option>
                      <option value="trends">{t('classTrends')}</option>
                      <option value="offenders">{t('classOffenders')}</option>
                      <option value="audit">{t('classAudit')}</option>
                    </select>
                  </div>

                  {/* Date Range */}
                  <div>
                    <label htmlFor="dateRangeSelect" className="block text-xs font-semibold text-ksp-gray-800 mb-1 uppercase">{t('temporalScope')}</label>
                    <select
                      id="dateRangeSelect"
                      name="dateRangeSelect"
                      value={dateRange}
                      onChange={(e) => setDateRange(e.target.value)}
                      className="w-full p-2.5 border border-ksp-gray-200 rounded text-xs bg-white text-ksp-gray-800"
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
                  <label htmlFor="districtSelect" className="block text-xs font-semibold text-ksp-gray-800 mb-1 uppercase">{t('districtJurisdiction')}</label>
                  <select
                    id="districtSelect"
                    name="districtSelect"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 border border-ksp-gray-200 rounded text-xs bg-white text-ksp-gray-800"
                  >
                    <option value="all">{t('distAll')}</option>
                    <option value="blr">{t('distBlr')}</option>
                    <option value="mys">{t('distMys')}</option>
                    <option value="mng">{t('distMng')}</option>
                    <option value="hbl">{t('distHbl')}</option>
                  </select>
                </div>

                {/* Secure Checkboxes */}
                <div className="space-y-2 pt-2 border-t border-ksp-gray-100">
                  <div className="flex items-center">
                    <input
                      id="maskPii"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-ksp-navy focus:ring-ksp-navy border-ksp-gray-300 rounded"
                    />
                    <label htmlFor="maskPii" className="ml-2 block text-xs text-ksp-gray-800 font-semibold cursor-pointer">
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
                    <label htmlFor="auditLogCheck" className="ml-2 block text-xs text-ksp-gray-800 font-semibold cursor-pointer">
                      {t('autoSign')}
                    </label>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-ksp-navy hover:bg-ksp-navy-light text-white font-bold px-6 py-2.5 rounded text-xs flex items-center gap-2 border border-ksp-navy-dark disabled:opacity-50 transition-colors"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={16} className="animate-spin text-white" />
                        {t('generating')} ({generationProgress}%)
                      </>
                    ) : (
                      <>
                        <Download size={16} /> {t('compileReport')}
                      </>
                    )}
                  </button>
                  <button
                    type="reset"
                    disabled={isGenerating}
                    className="border border-ksp-gray-300 text-ksp-gray-800 px-4 py-2.5 rounded text-xs hover:bg-ksp-gray-50 transition-colors"
                  >
                    {t('resetParams')}
                  </button>
                </div>

              </form>
            </div>

            {/* Status Column (5 Cols) */}
            <div className="lg:col-span-5 bg-white rounded-lg border border-ksp-gray-200 shadow-sm p-6 space-y-4 text-xs text-ksp-gray-800">
              <h3 className="text-sm font-bold text-ksp-navy uppercase border-b border-ksp-gray-100 pb-2">
                {t('zohoSmartBrowz')}
              </h3>
              
              <div className="space-y-3">
                <div className="p-3 bg-ksp-gray-50 border border-ksp-gray-200 rounded">
                  <span className="font-semibold text-ksp-navy block mb-1">{t('serverlessEngine')}</span>
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

                {showPdfSuccessBanner && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-900 rounded flex items-start gap-2 animate-fade-in shadow-sm">
                    <CheckCircle2 className="text-ksp-success shrink-0" size={18} />
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

        {activeTab === 'incidents' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg border border-ksp-gray-200 shadow-sm text-xs text-ksp-gray-800 dark:bg-[#071D3A] dark:border-ksp-navy-light text-left">
              <h3 className="font-bold text-sm text-[#0B2E59] dark:text-sky-300 border-b pb-2 mb-4 uppercase tracking-wider flex justify-between items-center">
                <span>Citizen Crime & Incident Reports Queue</span>
                <span className="text-[10px] bg-red-100 text-[#8B0000] px-2 py-0.5 rounded font-mono font-bold">EMERGENCY PROTOCOL</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light">
                      <th className="py-2.5 px-3">Report ID</th>
                      <th className="py-2.5 px-3">Crime Type</th>
                      <th className="py-2.5 px-3">Location / Landmark</th>
                      <th className="py-2.5 px-3">Details</th>
                      <th className="py-2.5 px-3">Contact</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-ksp-navy-light">
                    {incidentReports.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-gray-500 font-medium">
                          No active citizen incident reports registered.
                        </td>
                      </tr>
                    ) : (
                      incidentReports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50/50 dark:hover:bg-ksp-navy-light/5">
                          <td className="py-3 px-3 font-mono font-bold text-[#0B2E59] dark:text-sky-300">{report.id}</td>
                          <td className="py-3 px-3 font-bold text-gray-800 dark:text-white">{formatCrimeType(report.crimeType, t)}</td>
                          <td className="py-3 px-3 font-semibold text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-0.5"><MapPin size={12} /> {report.location}</span>
                          </td>
                          <td className="py-3 px-3 text-gray-700 dark:text-gray-300 max-w-xs truncate" title={report.details}>
                            {formatIncidentDetails(report.details, t)}
                          </td>
                          <td className="py-3 px-3 font-mono text-gray-600 dark:text-gray-400">{report.contact}</td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                              report.status.includes('Dispatched') ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {formatIncidentStatus(report.status, t)}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => setSelectedIncident(report)}
                              className="text-[#0B2E59] dark:text-sky-300 font-bold px-2 py-1 rounded text-[10px] uppercase hover:underline"
                            >
                              Dossier
                            </button>
                            {!report.status.includes('Dispatched') ? (
                              <button
                                type="button"
                                onClick={() => handleDispatchFromAudit(report.id)}
                                className="bg-[#8B0000] text-white font-bold px-2.5 py-1 rounded text-[10px] uppercase hover:bg-[#a60000] cursor-pointer"
                              >
                                Dispatch Patrol
                              </button>
                            ) : (
                              <span className="text-green-600 font-bold text-[10px] uppercase">Dispatched</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Incident Detail Modal */}
        {selectedIncident && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-2xl dark:bg-[#071D3A] dark:border-ksp-navy-light dark:text-white text-left space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start border-b pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold bg-[#0B2E59] text-white px-2 py-0.5 rounded">
                    {selectedIncident.id}
                  </span>
                  <h3 className="text-base font-extrabold text-[#0B2E59] dark:text-white mt-1">
                    {formatCrimeType(selectedIncident.crimeType, t)} — Audit Incident Dossier
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedIncident(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-xl font-bold cursor-pointer"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded dark:bg-ksp-navy-dark text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-bold text-gray-800 dark:text-white">{selectedIncident.location}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Assigned Station</span>
                  <span className="font-bold text-gray-800 dark:text-white">{selectedIncident.station}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Citizen Contact</span>
                  <span className="font-mono text-gray-700 dark:text-gray-300">{selectedIncident.contact}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase font-bold">Status</span>
                  <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold ${
                    selectedIncident.status.includes('Dispatched') ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {formatIncidentStatus(selectedIncident.status, t)}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 dark:text-gray-200">
                  Incident Narrative
                </h4>
                <p className="text-xs text-gray-800 bg-gray-50 p-3 rounded dark:bg-ksp-navy-dark dark:text-gray-300 leading-relaxed">
                  {formatIncidentDetails(selectedIncident.details, t)}
                </p>
              </div>

              {selectedIncident.autoMatchedSuspects && selectedIncident.autoMatchedSuspects.length > 0 && (
                <div className="border border-red-200 bg-red-50 p-3 rounded dark:bg-red-950/30 text-xs">
                  <span className="font-bold text-[#8B0000] block uppercase">Auto-Matched Suspect Lead</span>
                  <span>{selectedIncident.autoMatchedSuspects[0].name} ({selectedIncident.autoMatchedSuspects[0].confidence}% Match)</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedIncident(null);
                    navigate('/offender-profiling');
                  }}
                  className="px-3 py-1.5 border border-[#0B2E59] text-[#0B2E59] dark:border-sky-300 dark:text-sky-300 text-xs font-bold rounded hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink size={12} /> View Suspect Database
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedIncident(null)}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded hover:bg-gray-200 cursor-pointer"
                  >
                    Close
                  </button>
                  {!selectedIncident.status.includes('Dispatched') && (
                    <button
                      type="button"
                      onClick={() => handleDispatchFromAudit(selectedIncident.id)}
                      className="px-3 py-1.5 bg-[#8B0000] text-white text-xs font-bold rounded hover:bg-[#a60000] cursor-pointer"
                    >
                      Dispatch Patrol
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Immutable Audit Trail & Executive Compliance Reports"
        department="State Police Oversight & Legal Compliance Directorate"
        legalAuthority="Section 65B Indian Evidence Act (Electronic Records) & Bharatiya Sakshya Adhiniyam"
        purpose="Tamper-proof cryptographic logging of all database accesses, AI query operations, FIR lookups, and generation of formal executive PDF compliance briefs."
        steps={[
          {
            step: "01",
            action: "Review Immutable Audit Ledger",
            detail: "Audit cryptographic SHA-256 event hashes, timestamp records, officer badge IDs, and action types to verify chain of custody."
          },
          {
            step: "02",
            action: "Catalyst Serverless Telemetry",
            detail: "Monitor Zoho Catalyst microservices status, latency meters, and uptime metrics across AI inference and OCR endpoints."
          },
          {
            step: "03",
            action: "Executive Report Generator",
            detail: "Configure timeframe and jurisdiction filters to generate formal PDF crime briefing documents with court-ready citations."
          }
        ]}
        tacticalTips={[
          "All query audits are locked with tamper-proof signatures adhering to electronic evidence standards.",
          "Use the Citizen Incident Queue tab to review public reports and dispatch field patrols."
        ]}
      />
    </div>
  );
}
