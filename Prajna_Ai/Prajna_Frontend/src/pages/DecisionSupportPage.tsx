import React, { useState } from 'react';
import { mockFIRs } from '@/data/mockFIRs';
import { mockSuspects } from '@/data/mockSuspects';
import { generateCaseSummary, findSimilarCases, generateInvestigativeLeads } from '@/utils/mockAIEngine';
import { useLanguage, formatDynamicText, formatIncidentStatus, formatCrimeType } from '@/context/LanguageContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import * as Lucide from 'lucide-react';

export function DecisionSupportPage() {
  const { language, t } = useLanguage();
  const [selectedFirId, setSelectedFirId] = useState<string>(mockFIRs[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'summary' | 'similar' | 'leads'>('summary');
  
  const currentFIR = mockFIRs.find(f => f.id === selectedFirId) || mockFIRs[0];
  const summaryMsg = generateCaseSummary(currentFIR.firNumber, mockFIRs, language);
  const similarMsg = findSimilarCases(currentFIR.id, mockFIRs, language);

  // Leads for the first accused of the selected FIR
  const leadsAccusedName = currentFIR.accusedNames[0] || 'Raju K.';
  const matchedSuspect = mockSuspects.find(s => s.name === leadsAccusedName) || mockSuspects[0];
  const leadsMsg = generateInvestigativeLeads(matchedSuspect.id, mockSuspects, mockFIRs, language);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs">
      {/* Page Header Banner */}
      <div className="bg-[#0B2E59] text-white p-6 rounded-lg shadow border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('f7Title') || 'Investigator Decision Support'}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('f7Desc') || 'Automated case briefings, similar case analytics, and AI-suggested investigative leads.'}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.Lightbulb size={16} className="text-[#8B0000]" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">
            {t('decisionSupportBadge') || 'Decision Support'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: FIR Selector (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-ksp-gray-200 shadow-sm overflow-hidden dark:bg-ksp-navy-dark dark:border-ksp-navy-light flex flex-col h-[550px]">
          <div className="bg-ksp-navy text-white px-4 py-3 border-b border-ksp-navy-light flex items-center justify-between select-none">
            <h3 className="font-bold text-xs uppercase flex items-center gap-1.5">
              <Lucide.FileText size={15} /> {language === 'kn' ? 'ಕೇಸ್ ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ' : language === 'hi' ? 'केस फ़ाइल चुनें' : 'Select Case File'}
            </h3>
            <span className="font-mono text-[9px] bg-white/10 px-2 py-0.5 rounded">
              {mockFIRs.length} {t('casesBadge') || (language === 'kn' ? 'ಪ್ರಕರಣಗಳು' : language === 'hi' ? 'मामले' : 'CASES')}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-ksp-gray-100 dark:divide-ksp-navy-light">
            {mockFIRs.map((fir) => {
              const isSelected = fir.id === selectedFirId;
              return (
                <button
                  key={fir.id}
                  onClick={() => setSelectedFirId(fir.id)}
                  className={`w-full text-left p-3.5 transition-colors flex justify-between items-center ${
                    isSelected
                      ? 'bg-ksp-navy-light/10 dark:bg-ksp-navy-light/20'
                      : 'hover:bg-ksp-gray-50/50 dark:hover:bg-ksp-navy-light/5'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="font-bold text-ksp-navy dark:text-sky-300 block text-xs font-mono">
                      FIR {fir.firNumber}
                    </span>
                    <span className="text-[10px] text-ksp-gray-600 dark:text-ksp-gray-400 block truncate max-w-[200px]">
                      {formatCrimeType(fir.crimeType, t)} | {formatDynamicText(fir.policeStation, language)}
                    </span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                    fir.status === 'open' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {formatIncidentStatus(fir.status, t)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Decision Tools Pane (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-ksp-gray-200 shadow-sm overflow-hidden dark:bg-ksp-navy-dark dark:border-ksp-navy-light flex flex-col h-[550px]">
          {/* Tab Navigation */}
          <div className="bg-ksp-gray-50 border-b border-ksp-gray-200 p-2 flex gap-2 select-none dark:bg-ksp-navy-light/20 dark:border-ksp-navy-light/40">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 font-bold rounded flex items-center gap-1.5 transition ${
                activeTab === 'summary'
                  ? 'bg-ksp-navy text-white shadow dark:bg-ksp-navy-light'
                  : 'hover:bg-ksp-gray-200/50 text-ksp-gray-800 dark:text-ksp-gray-200'
              }`}
            >
              <Lucide.FileSpreadsheet size={14} /> {t('caseBriefSummaryTab') || 'Case Brief summary'}
            </button>
            <button
              onClick={() => setActiveTab('similar')}
              className={`px-4 py-2 font-bold rounded flex items-center gap-1.5 transition ${
                activeTab === 'similar'
                  ? 'bg-ksp-navy text-white shadow dark:bg-ksp-navy-light'
                  : 'hover:bg-ksp-gray-200/50 text-ksp-gray-800 dark:text-ksp-gray-200'
              }`}
            >
              <Lucide.Layers size={14} /> {t('similarCaseFinderTab') || 'Similar Case Finder'}
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 font-bold rounded flex items-center gap-1.5 transition ${
                activeTab === 'leads'
                  ? 'bg-ksp-navy text-white shadow dark:bg-ksp-navy-light'
                  : 'hover:bg-ksp-gray-200/50 text-ksp-gray-800 dark:text-ksp-gray-200'
              }`}
            >
              <Lucide.Compass size={14} /> {t('suggestedLeadsTab') || 'Suggested leads'}
            </button>
          </div>

          {/* Tab Contents */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            
            {/* Header Badge */}
            <div className="flex justify-between items-center text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300 border-b pb-2 select-none">
              <span className="font-bold flex items-center gap-1 font-mono uppercase bg-ksp-gray-100 dark:bg-ksp-navy-light/30 px-2 py-0.5 rounded">
                <Lucide.Shield size={12} /> {t('secureGateQuickML') || 'SECURE GATE: Catalyst QuickML (external model)'}
              </span>
              <span className="font-mono">
                {t('auditTrailId') || 'Audit Trail ID'}: {summaryMsg.auditId}
              </span>
            </div>

            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div className="p-4 bg-ksp-gray-50 border border-ksp-gray-200/80 rounded dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light/30">
                  <h3 className="font-extrabold text-sm text-ksp-navy dark:text-white uppercase tracking-wider mb-2">
                    {t('caseBriefSummaryTab') || 'Case Brief Summary'}
                  </h3>
                  <div className="text-xs text-ksp-gray-800 dark:text-ksp-gray-200 leading-relaxed font-medium whitespace-pre-wrap">
                    {summaryMsg.content}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'similar' && (
              <div className="space-y-4">
                <div className="p-4 bg-ksp-gray-50 border border-ksp-gray-200/80 rounded dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light/30">
                  <h3 className="font-extrabold text-sm text-ksp-navy dark:text-white uppercase tracking-wider mb-2">
                    {language === 'kn' ? 'ಹೋಲುವ ಪ್ರಕರಣಗಳ ವಿಶ್ಲೇಷಣೆ' : language === 'hi' ? 'समान मामला विश्लेषण' : 'Similar Case Analytics'}
                  </h3>
                  <p className="text-xs text-ksp-gray-600 dark:text-ksp-gray-300 font-medium mb-3">
                    {language === 'kn'
                      ? 'ಗುಣಲಕ್ಷಣ ಹೊಂದಾಣಿಕೆಯು ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿರುವ ಈ ಕೆಳಗಿನ ಪ್ರಕರಣಗಳು ಒಂದೇ ರೀತಿಯ ಕಾರ್ಯಾಚರಣೆಯ ವಿಧಾನ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಗುಣಲಕ್ಷಣಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತವೆ ಎಂದು ತೋರಿಸುತ್ತದೆ:'
                      : language === 'hi'
                      ? 'विशेषता मिलान से पता चलता है कि डेटाबेस में निम्नलिखित मामले समान कार्यप्रणाली और स्थानिक विशेषताओं को साझा करते हैं:'
                      : 'Attribute matching shows the following cases in the database share similar Modus Operandi and spatial attributes:'}
                  </p>
                  
                  <div className="divide-y divide-ksp-gray-200 dark:divide-ksp-navy-light space-y-3 pt-2">
                    {mockFIRs
                      .filter(f => f.crimeType === currentFIR.crimeType && f.id !== currentFIR.id)
                      .slice(0, 3)
                      .map(f => (
                        <div key={f.id} className="pt-3 first:pt-0 flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <span className="font-bold text-ksp-navy dark:text-sky-300 block font-mono">
                              FIR {f.firNumber} ({formatCrimeType(f.crimeType, t)})
                            </span>
                            <span className="text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300 block leading-snug">
                              {language === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆಯ ವಿಧಾನ:' : language === 'hi' ? 'कार्यप्रणाली (MO):' : 'MO:'} {formatDynamicText(f.modusOperandi, language)}
                            </span>
                          </div>
                          <span className="text-[9px] font-bold text-ksp-success bg-green-50 border border-green-200 px-1.5 py-0.5 rounded shrink-0">
                            92% {language === 'kn' ? 'ಹೋಲಿಕೆ' : language === 'hi' ? 'ಸಮಾನತೆ' : 'Similarity'}
                          </span>
                        </div>
                      ))}
                    {mockFIRs.filter(f => f.crimeType === currentFIR.crimeType && f.id !== currentFIR.id).length === 0 && (
                      <p className="text-xs text-ksp-gray-600 italic">
                        {language === 'kn'
                          ? 'ಈ ಜಿಲ್ಲಾ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಯಾವುದೇ ರೀತಿಯ ಅಪರಾಧ ಸಹಿಗಳು ಪತ್ತೆಯಾಗಿಲ್ಲ.'
                          : language === 'hi'
                          ? 'इस जिला डेटाबेस में कोई समान अपराध हस्ताक्षर नहीं पाए गए।'
                          : 'No similar crime signatures detected in this district database.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'leads' && (
              <div className="space-y-4">
                <div className="p-4 bg-ksp-gray-50 border border-ksp-gray-200/80 rounded dark:bg-ksp-navy-light/10 dark:border-ksp-navy-light/30">
                  <h3 className="font-extrabold text-sm text-ksp-navy dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Lucide.Lightbulb size={16} className="text-yellow-600" /> {t('suggestedLeadsTab') || (language === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ತನಿಖಾ ಸುಳಿವುಗಳು' : language === 'hi' ? 'सुझाए गए खोजी सुराग' : 'Suggested Investigative Leads')}
                  </h3>
                  <p className="text-xs text-ksp-gray-600 dark:text-ksp-gray-300 font-medium mb-3">
                    {language === 'kn'
                      ? `${leadsAccusedName} ರ ಹಿಂದಿನ ಸ್ಥಳಗಳು ಮತ್ತು ಸಹ-ಆರೋಪಿಗಳ ಅಪರಾಧ ಮ್ಯಾಪಿಂಗ್ ಆಧಾರದ ಮೇಲೆ, ಸಿಸ್ಟಂ ಈ ಕೆಳಗಿನ ಆದ್ಯತೆಯ ಸುಳಿವುಗಳನ್ನು ಸೂಚಿಸುತ್ತದೆ:`
                      : language === 'hi'
                      ? `${leadsAccusedName} के पिछले स्थानों और सह-अपराधियों के अपराध मानचित्रण के आधार पर, प्रणाली निम्नलिखित प्राथमिकता सुरागों का सुझाव देती है:`
                      : `Based on crime mapping of co-offenders and historical locations for ${leadsAccusedName}, the system suggests the following priority leads:`}
                  </p>
                  
                  <ul className="space-y-2.5 list-disc pl-5 font-semibold text-ksp-gray-800 dark:text-ksp-gray-200 leading-relaxed text-xs">
                    <li>
                      {language === 'kn'
                        ? `${currentFIR.location.beat} ಬೀಟ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಲಾದ ಇತರ ಸಕ್ರಿಯ ಖಾತೆಗಳೊಂದಿಗೆ ಹಣಕಾಸಿನ ಲಿಂಕ್ ಮಾದರಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.`
                        : language === 'hi'
                        ? `${currentFIR.location.beat} बीट में पंजीकृत अन्य सक्रिय खातों के साथ वित्तीय लिंक पैटर्न का मिलान करें।`
                        : `Cross-reference the financial link pattern with other active accounts registered at ${currentFIR.location.beat} Beat.`}
                    </li>
                    <li>
                      {language === 'kn'
                        ? `ಮುಖ್ಯ ಶಂಕಿತ ಸಹ-ಆರೋಪಿಗಳಿಗೆ ಸಂಪರ್ಕಗೊಂಡಿರುವ ಹಂಚಿಕೆಯ ಸ್ಥಳ ನೋಡ್‌ಗಳನ್ನು ತನಿಖೆ ಮಾಡಿ.`
                        : language === 'hi'
                        ? `मुख्य संदिग्ध सह-अपराधियों से जुड़े साझा स्थान नोड्स की जांच करें।`
                        : `Investigate the shared location nodes connected to prime suspect co-offenders.`}
                    </li>
                    <li>
                      {language === 'kn'
                        ? `ಅಪರಾಧ ನಡೆದ ಸಮಯದ ಚೌಕಟ್ಟಿನಲ್ಲಿ ${currentFIR.location.circle} ಸರ್ಕಲ್ ಪ್ರದೇಶದಲ್ಲಿ ಶಂಕಿತ ವ್ಯಕ್ತಿಯ ಕರೆ ವಿವರ ದಾಖಲೆಗಳನ್ನು (CDR) ಪರಿಶೀಲಿಸಿ.`
                        : language === 'hi'
                        ? `अपराध समय सीमा के दौरान ${currentFIR.location.circle} सर्कल क्षेत्र में संदिग्ध के कॉल विवरण रिकॉर्ड (सीडीआर) को सत्यापित करें।`
                        : `Verify call details records (CDR) of the suspect within the ${currentFIR.location.circle} Circle area during the offence time frame.`}
                    </li>
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="AI Decision Support System & Case Precedent Finder"
        department="Criminal Investigation Department (CID) & Prosecution Advisory Cell"
        legalAuthority="Section 173 CrPC / Section 193 BNSS (Report of police officer on completion of investigation)"
        purpose="Automated case summarization, Modus Operandi (MO) similarity matching across historical FIRs, and generation of priority investigative leads for Investigating Officers (IOs)."
        steps={[
          {
            step: "01",
            action: "Select Target FIR",
            detail: "Pick any active FIR from the left roster to populate the case narrative, IPC/BNS sections, and accused details."
          },
          {
            step: "02",
            action: "Case Brief Summary",
            detail: "Read structured AI summary highlighting crime scene facts, Modus Operandi signatures, and prime suspects."
          },
          {
            step: "03",
            action: "Similar Case Precedents & Leads",
            detail: "Switch to 'Similar Case Finder' and 'Suggested Leads' tabs to find matching serial crimes and targeted CDR/financial queries."
          }
        ]}
        tacticalTips={[
          "Similar Case Finder matches MO patterns across district boundaries to detect interstate criminal gangs.",
          "Use the Suggested Leads tab as a ready checklist during morning crime review conferences."
        ]}
      />
    </div>
  );
}
