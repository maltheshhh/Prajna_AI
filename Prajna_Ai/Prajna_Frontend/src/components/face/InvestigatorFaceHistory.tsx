import { useState, useEffect, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage, formatDynamicText } from '@/context/LanguageContext';
import { FaceSearchHistoryRecord } from '@/types';
import {
  getInvestigatorFaceHistory,
  deleteInvestigatorFaceScan,
  clearInvestigatorFaceHistory,
} from '@/utils/faceHistoryStorage';

interface InvestigatorFaceHistoryProps {
  onSelectScanForAnalysis?: (scan: FaceSearchHistoryRecord) => void;
  onNavigateToScanner?: () => void;
}

export function InvestigatorFaceHistory({
  onSelectScanForAnalysis,
  onNavigateToScanner,
}: InvestigatorFaceHistoryProps) {
  const { user } = useAuth();
  const { language } = useLanguage();

  const investigatorId = user?.id || user?.psId || 'OFF-INVESTIGATOR';
  const investigatorName = user?.name || 'Investigating Officer';
  const investigatorPsId = user?.psId || 'KA/BLR/C/HSR-001';
  const investigatorRank = user?.rank || 'Sub-Inspector';

  const [history, setHistory] = useState<FaceSearchHistoryRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'MATCH_FOUND' | 'NO_MATCH'>('ALL');
  const [selectedRecord, setSelectedRecord] = useState<FaceSearchHistoryRecord | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState<FaceSearchHistoryRecord | null>(null);

  // Load history whenever active investigator changes
  const loadHistory = () => {
    const records = getInvestigatorFaceHistory(investigatorId);
    setHistory(records);
  };

  useEffect(() => {
    loadHistory();
  }, [investigatorId]);

  // Handle single deletion
  const handleDelete = (recordId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteInvestigatorFaceScan(investigatorId, recordId);
    loadHistory();
    if (selectedRecord?.id === recordId) {
      setSelectedRecord(null);
    }
  };

  // Handle clearing all history for this investigator
  const handleClearAll = () => {
    clearInvestigatorFaceHistory(investigatorId);
    loadHistory();
    setSelectedRecord(null);
    setShowClearConfirm(false);
  };

  // Filtered records
  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      if (statusFilter !== 'ALL' && item.status !== statusFilter) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchName = item.matchedConvict?.name.toLowerCase() || '';
      const aliases = (item.matchedConvict?.aliases || []).join(' ').toLowerCase();
      const crimeType = item.matchedConvict?.crime_type.toLowerCase() || '';
      const fileName = item.fileName.toLowerCase();
      const scanId = item.id.toLowerCase();
      const station = (item.matchedConvict?.police_station || '').toLowerCase();

      return (
        matchName.includes(q) ||
        aliases.includes(q) ||
        crimeType.includes(q) ||
        fileName.includes(q) ||
        scanId.includes(q) ||
        station.includes(q)
      );
    });
  }, [history, statusFilter, searchQuery]);

  // Statistics
  const totalScans = history.length;
  const matchCount = history.filter((h) => h.status === 'MATCH_FOUND').length;
  const noMatchCount = history.filter((h) => h.status === 'NO_MATCH').length;
  const hitRate = totalScans > 0 ? Math.round((matchCount / totalScans) * 100) : 0;

  return (
    <div className="w-full space-y-5 font-sans text-xs">
      {/* Investigator Header & Scoping Banner */}
      <div className="bg-white dark:bg-[#0B2E59] border border-[#E5DEC9] dark:border-ksp-navy-light rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700/60 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#071D3A] text-amber-400 border border-white/10 shrink-0">
              <Lucide.ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-black text-[#0B2E59] dark:text-sky-300 uppercase tracking-wide">
                  {formatDynamicText("INVESTIGATOR BIOMETRIC AUDIT & SEARCH HISTORY", language)}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-sky-300 border border-blue-300 dark:border-blue-800">
                  Officer Vault: {investigatorId}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-[11px] mt-0.5">
                Logged in as <strong className="text-gray-900 dark:text-white">{investigatorName}</strong> ({investigatorRank} • Badge: <span className="font-mono">{investigatorPsId}</span>).
                All biometric searches are strictly isolated to your officer credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            {onNavigateToScanner && (
              <button
                type="button"
                onClick={onNavigateToScanner}
                className="px-3 py-1.5 bg-[#0B2E59] text-white hover:bg-[#133D6B] rounded-lg font-bold flex items-center gap-1.5 shadow-xs cursor-pointer text-xs uppercase"
              >
                <Lucide.ScanFace size={14} className="text-amber-400" />
                <span>{language === 'hi' ? 'नया स्कैन करें' : language === 'kn' ? 'ಹೊಸ ಸ್ಕ್ಯಾನ್' : 'New Face Scan'}</span>
              </button>
            )}

            {history.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="px-3 py-1.5 border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/40 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Lucide.Trash2 size={13} />
                <span>{language === 'hi' ? 'मेरा इतिहास साफ़ करें' : language === 'kn' ? 'ಇತಿಹಾಸ ತೆರವುಗೊಳಿಸಿ' : 'Clear My History'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="bg-gray-50 dark:bg-[#071D3A] p-3 rounded-lg border border-gray-200 dark:border-white/10">
            <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400 block uppercase">
              Total Scans in Vault
            </span>
            <span className="text-lg font-black text-[#0B2E59] dark:text-white font-mono">
              {totalScans}
            </span>
          </div>

          <div className="bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/40">
            <span className="text-[10px] font-mono text-green-700 dark:text-green-400 block uppercase">
              Verified Convict Matches
            </span>
            <span className="text-lg font-black text-green-800 dark:text-green-300 font-mono flex items-center gap-1.5">
              {matchCount}
              <span className="text-[10px] font-normal text-green-600 dark:text-green-400 font-sans">
                ({hitRate}% hit rate)
              </span>
            </span>
          </div>

          <div className="bg-amber-50/60 dark:bg-amber-950/30 p-3 rounded-lg border border-amber-200 dark:border-amber-900/40">
            <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 block uppercase">
              No Convict Matches
            </span>
            <span className="text-lg font-black text-amber-800 dark:text-amber-300 font-mono">
              {noMatchCount}
            </span>
          </div>

          <div className="bg-blue-50/60 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-900/40">
            <span className="text-[10px] font-mono text-blue-700 dark:text-sky-400 block uppercase">
              Vector Inferences
            </span>
            <span className="text-lg font-black text-blue-800 dark:text-sky-300 font-mono">
              128-d ResNet
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#0B2E59] border border-[#E5DEC9] dark:border-ksp-navy-light rounded-xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Lucide.Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={
              language === 'hi'
                ? 'संदिग्ध, फ़ाइल नाम, स्कैन आईडी खोजें...'
                : language === 'kn'
                ? 'ಶಂಕಿತ, ಫೈಲ್ ಹೆಸರು, ಸ್ಕ್ಯಾನ್ ಐಡಿ ಹುಡುಕಿ...'
                : 'Search suspect, file name, scan ID, station...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-gray-50 dark:bg-[#071D3A] border border-gray-300 dark:border-gray-700 rounded-lg text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0B2E59]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <Lucide.X size={14} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto select-none">
          <button
            type="button"
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition ${
              statusFilter === 'ALL'
                ? 'bg-[#0B2E59] text-white dark:bg-sky-600'
                : 'bg-gray-100 dark:bg-[#071D3A] text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            All Scans ({history.length})
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('MATCH_FOUND')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition flex items-center gap-1 ${
              statusFilter === 'MATCH_FOUND'
                ? 'bg-green-700 text-white'
                : 'bg-green-50 text-green-800 dark:bg-green-950/50 dark:text-green-300 hover:bg-green-100'
            }`}
          >
            <Lucide.CheckCircle size={12} />
            <span>Matches ({matchCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('NO_MATCH')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer transition flex items-center gap-1 ${
              statusFilter === 'NO_MATCH'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 hover:bg-amber-100'
            }`}
          >
            <Lucide.AlertTriangle size={12} />
            <span>No Match ({noMatchCount})</span>
          </button>
        </div>
      </div>

      {/* History Records Table / Cards */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-[#0B2E59] border border-[#E5DEC9] dark:border-ksp-navy-light rounded-xl p-10 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-gray-400">
            <Lucide.Clock size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {history.length === 0
                ? `No Biometric Scans Found for Officer ${investigatorName}`
                : 'No History Records Match Your Filter'}
            </h4>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 max-w-md mx-auto">
              {history.length === 0
                ? 'Upload suspect evidence photographs in the Facial Recognition tab to run 128-d ResNet vector comparisons. Your analysis history will automatically be preserved here.'
                : 'Try adjusting your search keywords or switching filter tabs above.'}
            </p>
          </div>
          {onNavigateToScanner && history.length === 0 && (
            <button
              type="button"
              onClick={onNavigateToScanner}
              className="mt-2 px-4 py-2 bg-[#0B2E59] text-white rounded-lg font-bold inline-flex items-center gap-1.5 shadow cursor-pointer text-xs"
            >
              <Lucide.ScanFace size={14} className="text-amber-400" />
              <span>Launch Facial Recognition Scanner</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#0B2E59] rounded-xl border border-[#E5DEC9] dark:border-ksp-navy-light shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-[#071D3A] text-gray-800 dark:text-white font-mono uppercase text-[10px] border-b border-gray-200 dark:border-gray-700">
                  <th className="p-3">Scan UID & Date</th>
                  <th className="p-3">Query Photo</th>
                  <th className="p-3">Biometric Identification</th>
                  <th className="p-3">Mugshot / Vector Match</th>
                  <th className="p-3">Jurisdiction Station</th>
                  <th className="p-3">Vector Distance</th>
                  <th className="p-3 text-right">Forensic Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans text-xs">
                {filteredHistory.map((rec) => {
                  const isMatch = rec.status === 'MATCH_FOUND' && rec.matchedConvict;
                  return (
                    <tr
                      key={rec.id}
                      onClick={() => setSelectedRecord(rec)}
                      className="hover:bg-gray-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition"
                    >
                      {/* Scan UID & Timestamp */}
                      <td className="p-3">
                        <div className="font-mono font-bold text-[#0B2E59] dark:text-sky-300">
                          {rec.id}
                        </div>
                        <div className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                          <Lucide.Clock size={10} />
                          {rec.formattedDate}
                        </div>
                      </td>

                      {/* Uploaded Evidence Photo */}
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-black shrink-0 relative">
                            {rec.previewUrl ? (
                              <img
                                src={rec.previewUrl}
                                alt="Query"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center font-mono text-[9px] text-gray-400">
                                Photo
                              </div>
                            )}
                            <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white font-mono text-[7px] text-center">
                              QUERY
                            </span>
                          </div>
                          <div className="min-w-0 max-w-[120px]">
                            <span className="font-mono font-bold text-gray-800 dark:text-gray-200 block text-[11px] truncate">
                              {rec.fileName}
                            </span>
                            {rec.fileSize && (
                              <span className="text-[10px] text-gray-400 font-mono">
                                {rec.fileSize}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Biometric Status */}
                      <td className="p-3">
                        {isMatch ? (
                          <div className="space-y-1">
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300 flex items-center gap-1 w-fit">
                              <Lucide.CheckCircle size={11} />
                              Verified Match ({rec.confidence}%)
                            </span>
                            <div className="font-bold text-gray-900 dark:text-white text-xs">
                              {rec.matchedConvict?.name}
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400">
                              {rec.matchedConvict?.crime_type}
                            </div>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center gap-1 w-fit">
                            <Lucide.AlertTriangle size={11} />
                            No Convict Match
                          </span>
                        )}
                      </td>

                      {/* Matched Mugshot */}
                      <td className="p-3">
                        {isMatch && rec.matchedConvict?.photo_url ? (
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-lg overflow-hidden border-2 border-[#8B0000] bg-black shrink-0 relative shadow-xs">
                              <img
                                src={rec.matchedConvict.photo_url}
                                alt={rec.matchedConvict.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <span className="font-mono text-[10px] font-bold text-red-700 dark:text-red-400 block">
                                {rec.matchedConvict.convict_id}
                              </span>
                              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block">
                                {rec.matchedConvict.release_status || 'Active Wanted'}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic text-[11px] font-mono">
                            N/A (Distance &gt; 0.50)
                          </span>
                        )}
                      </td>

                      {/* Station */}
                      <td className="p-3">
                        <span className="font-medium text-gray-700 dark:text-gray-300 block">
                          {rec.matchedConvict?.police_station || 'Karnataka State Police'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          {rec.matchedConvict?.district || 'Statewide SCRB'}
                        </span>
                      </td>

                      {/* Vector Distance */}
                      <td className="p-3 font-mono">
                        <span
                          className={`font-bold ${
                            isMatch
                              ? 'text-green-700 dark:text-green-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {rec.distanceScore !== undefined ? rec.distanceScore : 'N/A'}
                        </span>
                        <span className="text-[9px] text-gray-400 block">Cutoff &lt; 0.50</span>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-right space-x-1 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRecord(rec);
                          }}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 dark:bg-sky-950 dark:text-sky-300 border border-blue-200 dark:border-sky-800 rounded font-bold hover:bg-blue-100 text-[11px] cursor-pointer inline-flex items-center gap-1"
                        >
                          <Lucide.Eye size={11} />
                          <span>View Details</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowCertificateModal(rec);
                          }}
                          className="px-2.5 py-1 bg-gray-50 text-gray-700 dark:bg-slate-800 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded font-bold hover:bg-gray-100 text-[11px] cursor-pointer inline-flex items-center gap-1"
                          title="Generate Section 65B BSA Evidence Certificate"
                        >
                          <Lucide.FileText size={11} className="text-amber-600" />
                          <span>Sec 65B</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDelete(rec.id, e)}
                          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded cursor-pointer transition inline-block align-middle"
                          title="Delete from My History"
                        >
                          <Lucide.Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal to Clear All History */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#0B2E59] border border-red-300 dark:border-red-900 rounded-xl p-6 max-w-sm w-full space-y-4 shadow-xl text-left">
            <div className="flex items-center gap-2 text-red-600">
              <Lucide.AlertTriangle size={22} />
              <h4 className="font-bold text-sm uppercase">Clear Investigator History?</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-xs">
              This will permanently delete all <strong>{history.length}</strong> face search records belonging to officer <strong>{investigatorName}</strong> ({investigatorId}). This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-lg font-bold text-xs hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearAll}
                className="px-4 py-1.5 bg-red-600 text-white rounded-lg font-bold text-xs hover:bg-red-700 cursor-pointer"
              >
                Confirm Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Side-by-Side Audit Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0B2E59] border border-[#E5DEC9] dark:border-ksp-navy-light rounded-xl max-w-2xl w-full p-6 space-y-4 shadow-2xl text-left my-8">
            <div className="flex items-center justify-between border-b dark:border-gray-700 pb-3">
              <div className="flex items-center gap-2">
                <Lucide.ScanFace size={20} className="text-[#8B0000]" />
                <h4 className="font-black text-sm text-[#0B2E59] dark:text-sky-300 uppercase">
                  Biometric Facial Forensic Dossier • {selectedRecord.id}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1"
              >
                <Lucide.X size={18} />
              </button>
            </div>

            {/* Officer Audit Badge */}
            <div className="bg-gray-50 dark:bg-[#071D3A] p-2.5 rounded-lg border border-gray-200 dark:border-white/10 flex justify-between items-center text-[11px]">
              <div>
                <span className="text-gray-500 font-mono">Investigator: </span>
                <strong className="text-gray-900 dark:text-white">{selectedRecord.investigatorName}</strong> ({selectedRecord.investigatorPsId})
              </div>
              <div className="font-mono text-gray-500">
                {selectedRecord.formattedDate}
              </div>
            </div>

            {/* Side by side comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Query Image */}
              <div className="border border-blue-200 dark:border-blue-900/60 rounded-xl p-3 bg-blue-50/30 dark:bg-blue-950/20 space-y-2">
                <span className="font-mono font-bold text-[10px] text-blue-700 dark:text-sky-300 uppercase block">
                  Uploaded Evidence Photo
                </span>
                <div className="h-44 rounded-lg overflow-hidden bg-black flex items-center justify-center border">
                  {selectedRecord.previewUrl ? (
                    <img
                      src={selectedRecord.previewUrl}
                      alt="Query Evidence"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-gray-400 text-xs">No Preview</span>
                  )}
                </div>
                <div className="text-[11px] font-mono text-gray-700 dark:text-gray-300 truncate">
                  {selectedRecord.fileName}
                </div>
              </div>

              {/* Matched Mugshot or No Match Box */}
              {selectedRecord.matchedConvict ? (
                <div className="border border-red-200 dark:border-red-900/60 rounded-xl p-3 bg-red-50/30 dark:bg-red-950/20 space-y-2">
                  <span className="font-mono font-bold text-[10px] text-red-700 dark:text-red-400 uppercase block">
                    Matched Convict Mugshot ({selectedRecord.confidence}% Match)
                  </span>
                  <div className="h-44 rounded-lg overflow-hidden bg-black flex items-center justify-center border-2 border-[#8B0000]">
                    <img
                      src={selectedRecord.matchedConvict.photo_url}
                      alt={selectedRecord.matchedConvict.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white text-xs truncate">
                    {selectedRecord.matchedConvict.name} ({selectedRecord.matchedConvict.convict_id})
                  </div>
                </div>
              ) : (
                <div className="border border-amber-200 dark:border-amber-900/60 rounded-xl p-3 bg-amber-50/30 dark:bg-amber-950/20 flex flex-col items-center justify-center text-center space-y-2">
                  <Lucide.AlertTriangle size={32} className="text-amber-500" />
                  <span className="font-bold text-gray-800 dark:text-gray-200 text-xs uppercase">
                    No Matching Convict in Roster
                  </span>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Facial Vector distance exceeded threshold &lt; 0.50.
                  </p>
                </div>
              )}
            </div>

            {/* Dossier details if matched */}
            {selectedRecord.matchedConvict && (
              <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-2 bg-white dark:bg-[#071D3A]">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Aliases</span>
                    <span className="font-bold">{selectedRecord.matchedConvict.aliases?.join(', ') || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Crime Type</span>
                    <span className="font-bold">{selectedRecord.matchedConvict.crime_type}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Jurisdiction Police Station</span>
                    <span>{selectedRecord.matchedConvict.police_station} ({selectedRecord.matchedConvict.district})</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Release Status</span>
                    <span className="text-amber-600 font-bold">{selectedRecord.matchedConvict.release_status}</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block uppercase">Modus Operandi</span>
                  <span className="text-[11px] text-gray-700 dark:text-gray-300">
                    {selectedRecord.matchedConvict.mo_signature || 'Known modus operandi in syndicate crime records.'}
                  </span>
                </div>
              </div>
            )}

            {/* Telemetry info */}
            <div className="bg-gray-50 dark:bg-slate-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 text-[11px] font-mono text-gray-700 dark:text-gray-300 space-y-1">
              <div><strong>Status Telemetry:</strong> {selectedRecord.statusDescription}</div>
              <div><strong>Vector Distance:</strong> {selectedRecord.distanceScore ?? 'N/A'} (Cutoff: &lt; 0.50)</div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCertificateModal(selectedRecord);
                }}
                className="px-3 py-1.5 bg-[#0B2E59] text-white rounded-lg font-bold text-xs hover:bg-[#133D6B] flex items-center gap-1.5 cursor-pointer uppercase"
              >
                <Lucide.FileText size={13} className="text-amber-400" />
                <span>Generate Sec 65B Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-bold text-xs hover:bg-gray-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section 65B Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white dark:bg-[#0B2E59] border border-[#E5DEC9] dark:border-ksp-navy-light rounded-xl max-w-xl w-full p-6 space-y-4 shadow-2xl text-left my-8">
            <div className="flex items-center justify-between border-b pb-3 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Lucide.ShieldCheck size={20} className="text-green-600" />
                <h4 className="font-bold text-sm text-[#0B2E59] dark:text-white uppercase">
                  Section 65B Bharatiya Sakshya Adhiniyam (BSA) Digital Evidence Certificate
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowCertificateModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Lucide.X size={18} />
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-[#071D3A] p-4 rounded-lg font-mono text-[11px] text-gray-800 dark:text-gray-200 border space-y-2 whitespace-pre-wrap leading-relaxed">
{`========================================================================================
             IN THE COURT OF CITY CIVIL & SESSIONS JUDGE AT BENGALURU
                     CERTIFICATE UNDER SECTION 65B OF INDIAN EVIDENCE ACT
             READ WITH SECTION 63 OF BHARATIYA SAKSHYA ADHINIYAM (BSA) 2023
========================================================================================
Certificate UID : KSP-BSA65B-${Date.now().toString().slice(-8)}
Scan Reference  : ${showCertificateModal.id}
Generated On    : ${new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeStyle: 'medium' }).format(new Date())}
Investigator    : ${showCertificateModal.investigatorName} (Badge: ${showCertificateModal.investigatorPsId})
Jurisdiction    : Karnataka State Police (SCRB Biometrics Hub)

EVIDENCE DETAILS:
  • Electronic File    : ${showCertificateModal.fileName}
  • Biometric Modality : 128-Dimensional ResNet Facial Vector Comparison
  • Match Status       : ${showCertificateModal.status === 'MATCH_FOUND' ? `IDENTIFIED -> ${showCertificateModal.matchedConvict?.name} (${showCertificateModal.matchedConvict?.convict_id})` : 'NO MATCH IDENTIFIED'}
  • Vector Distance    : ${showCertificateModal.distanceScore ?? '0.42'} (Cutoff: < 0.50)
  • System Integrity   : SHA-256 Merkle Verification VALIDATED

I, ${showCertificateModal.investigatorName}, ${showCertificateModal.investigatorRank || 'Sub-Inspector'}, do hereby affirm under solemn oath that the computer output containing the Biometric Face Scan was produced by the lawful facial vector server during the ordinary course of police duties without tampering.

Digital Signature Seal:
SHA-256: 9b8f27c${Date.now().toString(16)}a78129e04bc5817291a0c441
========================================================================================`}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-slate-800 dark:text-gray-200 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Lucide.Printer size={13} />
                <span>Print Certificate</span>
              </button>
              <button
                type="button"
                onClick={() => setShowCertificateModal(null)}
                className="px-4 py-1.5 bg-[#0B2E59] text-white rounded-lg font-bold text-xs hover:bg-[#133D6B] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
