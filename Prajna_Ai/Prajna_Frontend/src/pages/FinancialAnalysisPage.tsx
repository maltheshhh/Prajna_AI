import React, { useState } from 'react';
import { mockTransactions } from '@/data/mockTransactions';
import { mockSuspects } from '@/data/mockSuspects';
import { useLanguage, formatTransactionType, formatRisk, formatDynamicText } from '@/context/LanguageContext';
import { FinancialTransaction } from '@/types';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import { 
  Shield, IndianRupee, Filter, Search, ArrowRight, AlertOctagon, 
  Download, RefreshCw, BarChart2, TrendingUp, TrendingDown, Layers
} from 'lucide-react';

export function FinancialAnalysisPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [suspiciousOnly, setSuspiciousOnly] = useState(false);
  const [selectedTxnId, setSelectedTxnId] = useState<string | null>(mockTransactions[0]?.id || null);

  // Stats calculation
  const totalVolume = mockTransactions.reduce((acc, curr) => acc + curr.amount, 0);
  const suspiciousVolume = mockTransactions
    .filter(t => t.suspicious)
    .reduce((acc, curr) => acc + curr.amount, 0);
  const suspiciousCount = mockTransactions.filter(t => t.suspicious).length;

  // Filter transactions
  const filteredTxns = mockTransactions.filter(txn => {
    const suspect = mockSuspects.find(s => txn.linkedSuspectIds.includes(s.id));
    const suspectName = suspect ? suspect.name.toLowerCase() : '';
    
    const matchesSearch = 
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      suspectName.includes(searchTerm.toLowerCase()) ||
      txn.linkedSuspectIds.some(id => id.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = typeFilter === 'all' || txn.transactionType === typeFilter;
    const matchesSuspicious = !suspiciousOnly || txn.suspicious;

    return matchesSearch && matchesType && matchesSuspicious;
  });

  const selectedTxn = mockTransactions.find(t => t.id === selectedTxnId) || null;
  const linkedSuspect = selectedTxn 
    ? mockSuspects.find(s => selectedTxn.linkedSuspectIds.includes(s.id)) 
    : null;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#071D3A] via-[#0B2E59] to-[#133D6B] text-white p-6 rounded-2xl shadow-md border-l-4 border-[#FF9F1C] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-xs">{t('financialTitle')}</h1>
          <p className="text-xs text-gray-300 mt-1 max-w-2xl font-medium">
            {t('financialDesc')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#071D3A]/90 px-3.5 py-1.5 rounded-xl border border-[#FF9F1C]/40 text-xs shrink-0 shadow-xs">
          <Shield size={16} className="text-[#FF9F1C]" />
          <span className="font-mono font-black text-amber-300">FIU Link Node Active</span>
        </div>
      </div>

      {/* Financial Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#071D3A] p-4 rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-blue-500/15 text-blue-700 dark:text-sky-300 border border-blue-500/30 rounded-xl">
            <IndianRupee size={22} />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t('totalLoggedVolume')}</span>
            <span className="text-lg font-black font-mono text-[#0B2E59] dark:text-white mt-0.5 block">₹{totalVolume.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#071D3A] p-4 rounded-xl border border-red-200 dark:border-red-900/40 shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30 rounded-xl">
            <AlertOctagon size={22} />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t('suspiciousLayering')}</span>
            <span className="text-lg font-black font-mono text-red-700 dark:text-red-400 mt-0.5 block">₹{suspiciousVolume.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#071D3A] p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-xl">
            <Layers size={22} />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t('structuringAlerts')}</span>
            <span className="text-lg font-black font-mono text-amber-700 dark:text-amber-400 mt-0.5 block">{suspiciousCount} Alerts</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#071D3A] p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/40 shadow-xs flex items-center gap-3.5">
          <div className="p-3 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-xl">
            <TrendingUp size={22} />
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{t('activeFiuQueries')}</span>
            <span className="text-lg font-black font-mono text-emerald-700 dark:text-emerald-400 mt-0.5 block">100% Secure</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Panel: Transaction Grid & Filters (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Filter Container */}
          <div className="bg-white dark:bg-[#071D3A] p-4 rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" size={16} />
              <input
                type="text"
                placeholder={t('searchBySuspectTxnAccount') || "Search by Suspect, Txn ID, or Account..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-[#05182E] text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-[#FF9F1C] text-xs font-medium placeholder-gray-400"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs bg-gray-50/50 dark:bg-[#05182E] text-gray-800 dark:text-white font-medium focus:outline-none focus:border-[#FF9F1C]"
              >
                <option value="all">{t('allTypes') || "All Types"}</option>
                <option value="transfer">{t('transactionTransfer') || "Transfer"}</option>
                <option value="withdrawal">{t('transactionWithdrawal') || "Withdrawal"}</option>
                <option value="deposit">{t('transactionDeposit') || "Deposit"}</option>
                <option value="structured">{t('transactionStructured') || "Structured"}</option>
              </select>

              <div className="flex items-center">
                <input
                  id="suspiciousToggle"
                  type="checkbox"
                  checked={suspiciousOnly}
                  onChange={(e) => setSuspiciousOnly(e.target.checked)}
                  className="h-4 w-4 text-[#0B2E59] focus:ring-[#0B2E59] border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="suspiciousToggle" className="ml-2 block text-xs text-gray-800 dark:text-gray-200 font-bold cursor-pointer select-none">
                  {t('suspiciousOnly') || "Suspicious Only"}
                </label>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs overflow-hidden">
            <div className="bg-gray-50 dark:bg-[#05182E] border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex justify-between items-center select-none">
              <span className="text-xs font-black text-[#0B2E59] dark:text-sky-300 font-mono tracking-wider uppercase">
                {t('transactionAuditLedger')} ({filteredTxns.length})
              </span>
            </div>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-[#092244] text-gray-700 dark:text-gray-200 uppercase font-black text-[10px] border-b border-gray-200 dark:border-gray-700 tracking-wider">
                    <th className="p-3">{t('transactionId') || "Transaction ID"}</th>
                    <th className="p-3">{t('senderFrom') || "Sender (From)"}</th>
                    <th className="p-3">{t('recipientTo') || "Recipient (To)"}</th>
                    <th className="p-3">{language === 'kn' ? 'ಮೊತ್ತ' : language === 'hi' ? 'राशि' : 'Amount'}</th>
                    <th className="p-3">{language === 'kn' ? 'ದಿನಾಂಕ' : language === 'hi' ? 'दिनांक' : 'Date'}</th>
                    <th className="p-3">{language === 'kn' ? 'ಪ್ರಕಾರ' : language === 'hi' ? 'प्रकार' : 'Type'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80 font-medium">
                  {filteredTxns.map((txn) => (
                    <tr 
                      key={txn.id} 
                      onClick={() => setSelectedTxnId(txn.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedTxnId === txn.id 
                          ? 'bg-blue-50 dark:bg-[#133D6B] border-l-4 border-[#FF9F1C]' 
                          : 'hover:bg-gray-50/70 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <td className="p-3 font-mono font-black text-[#0B2E59] dark:text-sky-300">{txn.id}</td>
                      <td className="p-3 font-mono text-[11px] text-gray-700 dark:text-gray-300 font-medium">{txn.fromAccount}</td>
                      <td className="p-3 font-mono text-[11px] text-gray-700 dark:text-gray-300 font-medium">{txn.toAccount}</td>
                      <td className={`p-3 font-mono font-black ${
                        txn.suspicious 
                          ? 'text-red-700 dark:text-red-400' 
                          : 'text-[#0B2E59] dark:text-white'
                      }`}>
                        ₹{txn.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3 text-gray-500 dark:text-gray-400 font-mono text-[11px]">
                        {new Date(txn.date).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] uppercase font-black font-mono border tracking-wider ${
                          txn.suspicious || txn.transactionType === 'structured'
                            ? 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40' 
                            : txn.transactionType === 'transfer'
                            ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/40'
                            : 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/40'
                        }`}>
                          {formatTransactionType(txn.transactionType, t)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Panel: Link Analysis & Money Trail (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {!selectedTxn ? (
            <div className="bg-white dark:bg-[#071D3A] p-12 text-center rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs text-gray-500 dark:text-gray-400 text-xs font-medium">
              {t('selectTxnRowTrace') || "Select a transaction row to execute link node trace."}
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Money Trail Visualizer */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs p-6 space-y-4">
                <h3 className="text-xs font-black text-[#0B2E59] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                  {t('moneyTrailTitle') || "Money Trail Link Visualizer"}
                </h3>
                
                {/* Simulated Money Flow diagram */}
                <div className="flex flex-col items-center justify-between p-5 bg-gray-50 dark:bg-[#05182E] border border-gray-200 dark:border-gray-800 rounded-xl gap-6">
                  
                  {/* Sender Account */}
                  <div className="text-center w-full max-w-[220px] bg-white dark:bg-[#0B2E59] p-3.5 border-2 border-gray-200 dark:border-blue-800 rounded-xl shadow-xs">
                    <span className="block text-[10px] text-gray-500 dark:text-gray-300 font-bold uppercase">{t('sourceAccount')}</span>
                    <span className="block font-mono font-black text-xs text-[#0B2E59] dark:text-sky-300 mt-1 truncate">{selectedTxn.fromAccount}</span>
                    {linkedSuspect && selectedTxn.fromAccount.includes('ACC') && (
                      <span className="text-[10px] font-bold font-mono text-red-700 dark:text-red-300 mt-0.5 block">
                        {language === 'kn' ? 'ಲಿಂಕ್ ಮಾಡಲಾಗಿದೆ:' : language === 'hi' ? 'लिंक्ड:' : 'Linked:'} {linkedSuspect.name}
                      </span>
                    )}
                  </div>
                  
                  {/* Flow Arrow with Amount */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-0.5 h-10 bg-red-600 dark:bg-red-500 relative">
                      <div className="absolute bottom-0 -left-1.5 w-3.5 h-3.5 border-r-2 border-b-2 border-red-600 dark:border-red-500 transform rotate-45"></div>
                    </div>
                    <span className="text-sm font-black font-mono text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/80 px-3.5 py-1 rounded-lg border border-red-300 dark:border-red-800 mt-2 shadow-xs">
                      ₹{selectedTxn.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-gray-600 dark:text-gray-300 font-black mt-1">
                      {selectedTxn.transactionType === 'structured' ? (t('structuringLayerAlert') || 'Structuring Layer (Alert)') : (t('directTransfer') || 'Direct Transfer')}
                    </span>
                  </div>

                  {/* Recipient Account */}
                  <div className="text-center w-full max-w-[220px] bg-white dark:bg-[#0B2E59] p-3.5 border-2 border-gray-200 dark:border-blue-800 rounded-xl shadow-xs">
                    <span className="block text-[10px] text-gray-500 dark:text-gray-300 font-bold uppercase">{t('destinationAccount')}</span>
                    <span className="block font-mono font-black text-xs text-[#0B2E59] dark:text-sky-300 mt-1 truncate">{selectedTxn.toAccount}</span>
                    {linkedSuspect && selectedTxn.toAccount.includes('ACC') && (
                      <span className="text-[10px] font-bold font-mono text-red-700 dark:text-red-300 mt-0.5 block">
                        {language === 'kn' ? 'ಲಿಂಕ್ ಮಾಡಲಾಗಿದೆ:' : language === 'hi' ? 'लिंक्ड:' : 'Linked:'} {linkedSuspect.name}
                      </span>
                    )}
                  </div>

                </div>

                <div className="text-xs space-y-1.5 pt-2">
                  <p className="font-bold text-[#0B2E59] dark:text-sky-300">
                    {t('cctnsAnalysisSummary') || "CCTNS Intelligence Analysis Summary:"}
                  </p>
                  {selectedTxn.suspicious ? (
                    <div className="p-3.5 bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-900 dark:text-red-200 rounded-xl space-y-1 text-xs leading-relaxed font-medium">
                      <p className="font-black flex items-center gap-1.5 text-red-700 dark:text-red-300">
                        <AlertOctagon size={15} /> {t('structuringWarningTitle') || "Structuring Warning (IT Act / BNS)"}
                      </p>
                      <p>
                        {t('structuringWarningDesc') || "This transaction shows structuring hallmarks. Multiple identical amounts just below ₹50,000 (PAN reporting limit) were transferred sequentially within 24 hours. Represents likely layering of proceeds of cybercrime/narcotics."}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic font-medium">
                      {t('standardTxnPath') || "Standard transaction path. No immediate structural alerts triggered for this node sequence."}
                    </p>
                  )}
                </div>
              </div>

              {/* Linked Offender Details */}
              <div className="bg-white dark:bg-[#071D3A] rounded-xl border border-gray-200 dark:border-blue-900/40 shadow-xs p-6 space-y-4">
                <h3 className="text-xs font-black text-[#0B2E59] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                  {t('linkedOffenderProfile') || "Linked Offender Profile"}
                </h3>

                {linkedSuspect ? (
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-[#05182E] p-3.5 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <div>
                        <span className="font-black text-sm text-[#0B2E59] dark:text-white">{linkedSuspect.name}</span>
                        <span className="block font-mono text-[10px] text-blue-700 dark:text-sky-300 font-bold mt-0.5">ID: {linkedSuspect.id}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black font-mono border ${
                        linkedSuspect.riskTier === 'high' 
                          ? 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/40' 
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/40'
                      }`}>
                        {formatRisk(linkedSuspect.riskTier, t)}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-gray-700 dark:text-gray-300 uppercase text-[10px] tracking-wider">
                        {t('criminologyModusOperandi') || "Criminology Modus Operandi:"}
                      </p>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {formatDynamicText(linkedSuspect.moSignature, language)}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-gray-700 dark:text-gray-300 uppercase text-[10px] tracking-wider">
                        {t('associatedFinancialAccounts') || "Associated Financial Accounts:"}
                      </p>
                      <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 font-mono font-bold text-xs space-y-0.5">
                        {linkedSuspect.financialAccounts?.map(acc => (
                          <li key={acc}>{acc}</li>
                        )) || <li>{language === 'kn' ? 'ಇತರ ಯಾವುದೇ ಹಣಕಾಸು ಖಾತೆಗಳು ಪಟ್ಟಿಯಾಗಿಲ್ಲ' : language === 'hi' ? 'कोई अन्य वित्तीय खाता सूचीबद्ध नहीं है' : 'No other financial accounts listed'}</li>}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center py-4 font-medium">
                    {t('noRegisteredSuspectTxn') || "No registered suspect directly indexed to this transaction identifier."}
                  </p>
                )}
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Financial Forensics & Money Laundering Trail Analysis"
        department="CID Economic Offences Wing (EOW) & Cybercrime Unit"
        legalAuthority="Prevention of Money Laundering Act (PMLA), 2002 & Section 102 CrPC (Freezing of Accounts)"
        purpose="Transaction ledger audit, automated structuring & layering detection, FIU query cross-referencing, and money trail graph tracing across banking institutions."
        steps={[
          {
            step: "01",
            action: "Filter & Search Ledger",
            detail: "Filter audit records by transaction category (UPI, IMPS, RTGS, Wire) or toggle 'Suspicious Only' to isolate structuring spikes."
          },
          {
            step: "02",
            action: "Inspect Money Trail Visualizer",
            detail: "Select any ledger entry to reveal the Source Account -> Destination Account flow, amount, and flag justifications."
          },
          {
            step: "03",
            action: "Cross-Reference Suspect Profile",
            detail: "Review linked offender dossiers and associated mule accounts to initiate formal Section 102 CrPC account freeze requisitions."
          }
        ]}
        tacticalTips={[
          "Rapid successive transactions below ₹50,000 threshold trigger automated PMLA structuring alerts.",
          "Click the Export button on suspicious rows to prepare evidence annexures for Financial Intelligence Unit (FIU-IND) submission."
        ]}
      />
    </div>
  );
}

