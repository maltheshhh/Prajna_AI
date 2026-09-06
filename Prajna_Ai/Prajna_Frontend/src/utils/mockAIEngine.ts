import { ChatMessage, FIRRecord, SuspectProfile, FIRCitation, ChartData } from '@/types';
import { Language } from '@/context/LanguageContext';

// Simple check for Kannada text
function isKannadaText(text: string): boolean {
  return /[\u0C80-\u0CFF]/.test(text);
}

// Simple check for Hindi text
function isHindiText(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

// Mock translator helper
function translateQuery(query: string): string {
  const q = query.toLowerCase();
  
  if (isKannadaText(query)) {
    if (q.includes('ಮೈಸೂರು') || q.includes('mysuru')) return 'show cases in mysuru';
    if (q.includes('ಕಳ್ಳತನ') || q.includes('theft')) return 'theft cases';
    if (q.includes('ಬೆಂಗಳೂರು') || q.includes('bengaluru')) return 'show cases in bengaluru';
    if (q.includes('ಸಂಖ್ಯೆ') || q.includes('fir')) return 'fir info';
    if (q.includes('ಹೊಸ') || q.includes('recent')) return 'recent cases';
    return 'generic query';
  }
  
  if (isHindiText(query)) {
    if (q.includes('मैसूर') || q.includes('मैसुरु') || q.includes('mysuru')) return 'show cases in mysuru';
    if (q.includes('चोरी') || q.includes('theft')) return 'theft cases';
    if (q.includes('बेंगलुरु') || q.includes('बंगलौर') || q.includes('bengaluru')) return 'show cases in bengaluru';
    if (q.includes('नंबर') || q.includes('संख्या') || q.includes('fir')) return 'fir info';
    if (q.includes('हाल ही') || q.includes('हालिया') || q.includes('हाल')) return 'recent cases';
    return 'generic query';
  }
  
  return query;
}

function getTranslatedContent(
  templateType: 'fir_summary' | 'fir_not_found' | 'suspect_profile' | 'analytical_response' | 'fallback',
  vars: any,
  language: Language
): string {
  if (language === 'en') {
    if (templateType === 'fir_summary') {
      const { record } = vars;
      return `### FIR Summary: Case Reference ${record.firNumber}
**District:** ${record.district} | **Police Station:** ${record.policeStation}
**Date Registered:** ${new Date(record.dateOfRegistration).toLocaleDateString()}
**Legal Section Citation:** ${record.actsAndSections.join(', ')}
**Modus Operandi:** ${record.modusOperandi}

**Investigation Details:**
- **Officer Assigned (IO):** ${record.ioName}
- **Complainant:** ${record.complainantName}
- **Accused Persons:** ${record.accusedNames.join(', ')}
- **Case Progression:** ${record.status.toUpperCase()} (Severity: ${record.severity.toUpperCase()})

**Official Incident Synopsis:**
${record.summary}`;
    }
    if (templateType === 'fir_not_found') {
      return `Case record with FIR number ${vars.firNum} was not found in the Catalyst NoSQL database. Verify if the year or sequence digits are entered correctly.`;
    }
    if (templateType === 'suspect_profile') {
      const { matchedSuspect, suspectFIRs } = vars;
      return `### Criminal Intelligence Profile: ${matchedSuspect.name} (${matchedSuspect.aliases.join(', ')})
**Age:** ${matchedSuspect.age} | **Risk Assessment:** ${matchedSuspect.riskTier.toUpperCase()}
**Primary Modus Operandi (Fingerprint):** *${matchedSuspect.moSignature}*
**Jurisdictional District:** ${matchedSuspect.district}

**Recorded Case History:**
The suspect is officially linked to **${matchedSuspect.linkedFIRs.length} registered FIRs** in this division.
${suspectFIRs.map((f: any, i: number) => `${i + 1}. **FIR ${f.firNumber}** (${f.crimeType}) - Status: *${f.status.toUpperCase()}*`).join('\n')}

**Intelligence Network Notes:**
Suspect has direct associations with ${matchedSuspect.associateIds.length} known repeat offenders. Known financial accounts are linked to structured transfers.`;
    }
    if (templateType === 'analytical_response') {
      const { matchedDistrict, matchedCrime, filteredLength } = vars;
      return `### Analytical Response: ${matchedDistrict ? matchedDistrict.toUpperCase() : ''} ${matchedCrime ? matchedCrime.toUpperCase() : ''} Crime Report
Based on a natural query scanning of **1,000 Catalyst NoSQL records**, we retrieved **${filteredLength} matching cases** for this criteria in the specified time frame.

**Modus Operandi Breakdown:**
Common methods include opportunistic timing, duplicate keys, and electronic spoofing.

**Suggested Preventive Action:**
Increase deployment in high density beats. Monitor active repeat offenders sharing these MOs.`;
    }
    return `### Conversational AI Query Results
I am Prajna-AI, the conversational assistant for the Karnataka State Police. I have scanned the database containing 1,000 FIRs stored in Zoho Catalyst.

**You can query the system for:**
1. Specific FIR summaries (e.g., *"Summary of FIR 0012/2026"*)
2. Accused/Offender histories (e.g., *"Show profile for Raju K."*)
3. Regional hotspots & trends (e.g., *" Burglary cases in Mysuru"*)

Please narrow down your parameters to fetch legal sections, network graphs, or analytical charts.`;
  }

  if (language === 'hi') {
    if (templateType === 'fir_summary') {
      const { record } = vars;
      return `[PRAJNA-TRANSLATION PIPELINE / प्रज्ञा अनुवाद] (supported by external feature)

### प्राथमिकी (FIR) सारांश: मामला संदर्भ ${record.firNumber}
**जिला:** ${record.district} | **पुलिस स्टेशन:** ${record.policeStation}
**पंजीकरण तिथि:** ${new Date(record.dateOfRegistration).toLocaleDateString()}
**कानूनी धारा उद्धरण:** ${record.actsAndSections.join(', ')}
**कार्य प्रणाली (Modus Operandi):** ${record.modusOperandi}

**जांच विवरण:**
- **नामित अधिकारी (IO):** ${record.ioName}
- **शिकायतकर्ता:** ${record.complainantName}
- **आरोपी व्यक्ति:** ${record.accusedNames.join(', ')}
- **मामले की प्रगति:** ${record.status.toUpperCase()} (गंभीरता: ${record.severity.toUpperCase()})

**आधिकारिक घटना का सारांश:**
${record.summary}`;
    }
    if (templateType === 'fir_not_found') {
      return `[PRAJNA-TRANSLATION PIPELINE / प्रज्ञा अनुवाद] (supported by external feature)

प्राथमिकी संख्या ${vars.firNum} वाला केस रिकॉर्ड कैटलिस्ट नोएसक्यूएल (NoSQL) डेटाबेस में नहीं मिला। जांचें कि क्या वर्ष या अनुक्रम अंक सही ढंग से दर्ज किए गए हैं।`;
    }
    if (templateType === 'suspect_profile') {
      const { matchedSuspect, suspectFIRs } = vars;
      return `[PRAJNA-TRANSLATION PIPELINE / प्रज्ञा अनुवाद] (supported by external feature)

### आपराधिक खुफिया प्रोफाइल: ${matchedSuspect.name} (${matchedSuspect.aliases.join(', ')})
**उम्र:** ${matchedSuspect.age} | **जोखिम मूल्यांकन:** ${matchedSuspect.riskTier.toUpperCase()}
**प्राथमिक कार्य प्रणाली (MO Signature):** *${matchedSuspect.moSignature}*
**क्षेत्रीय जिला:** ${matchedSuspect.district}

**दर्ज मामले का इतिहास:**
संदिग्ध आधिकारिक तौर पर इस डिवीजन में **${matchedSuspect.linkedFIRs.length} दर्ज प्राथमिकियों (FIR)** से जुड़ा है।
${suspectFIRs.map((f: any, i: number) => `${i + 1}. **FIR ${f.firNumber}** (${f.crimeType}) - स्थिति: *${f.status.toUpperCase()}*`).join('\n')}

**खुफिया नेटवर्क नोट्स:**
संदिग्ध का ${matchedSuspect.associateIds.length} ज्ञात मरु-अपराधियों के साथ सीधा संबंध है। वित्तीय खाते संदिग्ध लेनदेन से जुड़े हैं।`;
    }
    if (templateType === 'analytical_response') {
      const { matchedDistrict, matchedCrime, filteredLength } = vars;
      return `[PRAJNA-TRANSLATION PIPELINE / प्रज्ञा अनुवाद] (supported by external feature)

### विश्लेषणात्मक प्रतिक्रिया: ${matchedDistrict ? matchedDistrict.toUpperCase() : ''} ${matchedCrime ? matchedCrime.toUpperCase() : ''} अपराध रिपोर्ट
**1,000 कैटलिस्ट नोएसक्यूएल (NoSQL) रिकॉर्ड** को स्कैन करने के आधार पर, हमने इस समयावधि में इस मानदंड के लिए **${filteredLength} मिलान मामले** प्राप्त किए हैं।

**कार्य प्रणाली (Modus Operandi) विवरण:**
सामान्य तरीकों में अवसरवादी समय, डुप्लिकेट चाबियाँ और इलेक्ट्रॉनिक स्पूफ़िंग शामिल हैं।

**सुझाया गया निवारक उपाय:**
उच्च घनत्व वाले गश्ती क्षेत्रों (Beats) में तैनाती बढ़ाएं। इन तरीकों को साझा करने वाले सक्रिय पुनरावर्ती अपराधियों की निगरानी करें।`;
    }
    return `[PRAJNA-TRANSLATION PIPELINE / प्रज्ञा अनुवाद] (supported by external feature)

### संवादात्मक एआई प्रश्न परिणाम
मैं प्रज्ञा-AI हूं, कर्नाटक राज्य पुलिस का संवादात्मक सहायक। मैंने जोहो कैटलिस्ट में संग्रहीत 1,000 एफआईआर वाले डेटाबेस को स्कैन किया है।

**आप सिस्टम से निम्नलिखित के बारे में पूछ सकते हैं:**
1. विशिष्ट प्राथमिकी (FIR) सारांश (जैसे, *"Summary of FIR 0012/2026"*)
2. आरोपी/अपराधी इतिहास (जैसे, *"Show profile for Raju K."*)
3. क्षेत्रीय हॉटस्पॉट और रुझान (जैसे, *" Burglary cases in Mysuru"*)

कृपया कानूनी धाराओं, आपराधिक नेटवर्क या विश्लेषणात्मक चार्ट प्राप्त करने के लिए अपने खोज मापदंडों को स्पष्ट करें।`;
  }

  // Kannada
  if (templateType === 'fir_summary') {
    const { record } = vars;
    return `[PRAJNA-TRANSLATION PIPELINE / ಪ್ರಜ್ಞಾ ಅನುವಾದ] (supported by external feature)

### ಎಫ್‌ಐಆರ್ ಸಾರಾಂಶ: ಪ್ರಕರಣ ಉಲ್ಲೇಖ ${record.firNumber}
**ಜಿಲ್ಲೆ:** ${record.district} | **ಪೊಲೀಸ್ ಠಾಣೆ:** ${record.policeStation}
**ನೋಂದಾಯಿತ ದಿನಾಂಕ:** ${new Date(record.dateOfRegistration).toLocaleDateString()}
**ಕಾನೂನು ವಿಭಾಗದ ಉಲ್ಲೇಖ:** ${record.actsAndSections.join(', ')}
**ವಿಧಾನ ಸಹಿ (Modus Operandi):** ${record.modusOperandi}

**ತನಿಖೆಯ ವಿವರಗಳು:**
- **ನಿಯೋಜಿತ ಅಧಿಕಾರಿ (IO):** ${record.ioName}
- **ದೂರುದಾರರು:** ${record.complainantName}
- **ಆರೋಪಿ ವ್ಯಕ್ತಿಗಳು:** ${record.accusedNames.join(', ')}
- **ಪ್ರಕರಣದ ಪ್ರಗತಿ:** ${record.status.toUpperCase()} (ತೀವ್ರತೆ: ${record.severity.toUpperCase()})

**ಅಧಿಕೃತ ಘಟನೆಯ ಸಾರಾಂಶ:**
${record.summary}`;
  }
  if (templateType === 'fir_not_found') {
    return `[PRAJNA-TRANSLATION PIPELINE / ಪ್ರಜ್ಞಾ ಅನುವಾದ] (supported by external feature)

FIR ಸಂಖ್ಯೆ ${vars.firNum} ಹೊಂದಿರುವ ಪ್ರಕರಣದ ದಾಖಲೆಯು ಕ್ಯಾಟಲಿಸ್ಟ್ ನೋಎಸ್ಕ್ಯೂಎಲ್ (NoSQL) ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಕಂಡುಬಂದಿಲ್ಲ. ವರ್ಷ ಅಥವಾ ಅನುಕ್ರಮ ಅಂಕಿಗಳನ್ನು ಸರಿಯಾಗಿ ನಮೂದಿಸಲಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.`;
  }
  if (templateType === 'suspect_profile') {
    const { matchedSuspect, suspectFIRs } = vars;
    return `[PRAJNA-TRANSLATION PIPELINE / ಪ್ರಜ್ಞಾ ಅನುವಾದ] (supported by external feature)

### ಕ್ರಿಮಿನಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಪ್ರೊಫೈಲ್: ${matchedSuspect.name} (${matchedSuspect.aliases.join(', ')})
**ವಯಸ್ಸು:** ${matchedSuspect.age} | **ಅಪಾಯದ ಮೌಲ್ಯಮಾಪನ:** ${matchedSuspect.riskTier.toUpperCase()}
**ಪ್ರಾಥಮಿಕ ವಿಧಾನ ಸಹಿ (MO Signature):** *${matchedSuspect.moSignature}*
**ನ್ಯಾಯವ್ಯಾಪ್ತಿ ಜಿಲ್ಲೆ:** ${matchedSuspect.district}

**ದಾಖಲಾದ ಪ್ರಕರಣದ ಇತಿಹಾಸ:**
ಶಂಕಿತನು ಅಧಿಕೃತವಾಗಿ ಈ ವಿಭಾಗದಲ್ಲಿ **${matchedSuspect.linkedFIRs.length} ನೋಂದಾಯಿತ ಎಫ್‌ಐಆರ್‌ಗಳಿಗೆ** ಸಂಬಂಧ ಹೊಂದಿದ್ದಾನೆ.
${suspectFIRs.map((f: any, i: number) => `${i + 1}. **FIR ${f.firNumber}** (${f.crimeType}) - ಸ್ಥಿತಿ: *${f.status.toUpperCase()}*`).join('\n')}

**ಗುಪ್ತಚರ ಜಾಲದ ಟಿಪ್ಪಣಿಗಳು:**
ಶಂಕಿತನು ${matchedSuspect.associateIds.length} ಗುರುತಿಸಲಾದ ಮರು-ಅಪರಾಧಿಗಳೊಂದಿಗೆ ನೇರ ಸಂಬಂಧ ಹೊಂದಿದ್ದಾನೆ. ಹಣಕಾಸಿನ ಖಾತೆಗಳು ವ್ಯವಸ್ಥಿತ ಹಣ ವರ್ಗಾವಣೆಗೆ ಸಂಬಂಧಿಸಿವೆ.`;
  }
  if (templateType === 'analytical_response') {
    const { matchedDistrict, matchedCrime, filteredLength } = vars;
    return `[PRAJNA-TRANSLATION PIPELINE / ಪ್ರಜ್ಞಾ ಅನುವಾದ] (supported by external feature)

### ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಪ್ರತಿಕ್ರಿಯೆ: ${matchedDistrict ? matchedDistrict.toUpperCase() : ''} ${matchedCrime ? matchedCrime.toUpperCase() : ''} ಅಪರಾಧ ವರದಿ
**೧,೦೦೦ ಕ್ಯಾಟಲಿಸ್ಟ್ ನೋಎಸ್ಕ್ಯೂಎಲ್ (NoSQL) ದಾಖಲೆಗಳನ್ನು** ಸ್ಕ್ಯಾನ್ ಮಾಡಲಾಗಿದ್ದು, ನಿರ್ದಿಷ್ಟ ಸಮಯದ ಚೌಕಟ್ಟಿನಲ್ಲಿ ಈ ಮಾನದಂಡಕ್ಕಾಗಿ **${filteredLength} ಹೊಂದಾಣಿಕೆಯ ಪ್ರಕರಣಗಳನ್ನು** ಪತ್ತೆಹಚ್ಚಲಾಗಿದೆ.

**ವಿಧಾನ ಸಹಿ (Modus Operandi) ವಿವರ:**
ಸಾಮಾನ್ಯ ವಿಧಾನಗಳಲ್ಲಿ ಸುಲಭವಾಗಿ ಸಿಗುವ ಅವಕಾಶದ ಬಳಕೆ, ನಕಲಿ ಕೀಗಳು ಮತ್ತು ಎಲೆಕ್ಟ್ರಾನಿಕ್ ವಂಚನೆ ಸೇರಿವೆ.

**ಸೂಚಿಸಲಾದ ತಡೆಗಟ್ಟುವ ಕ್ರಮ:**
ಹೆಚ್ಚಿನ ಜನನಿಬಿಡ ಬೀಟ್‌ಗಳಲ್ಲಿ ಗಸ್ತನ್ನು ಹೆಚ್ಚಿಸಿ. ಈ ವಿಧಾನಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಸಕ್ರಿಯ ಮರು-ಅಪರಾಧಿಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.`;
  }
  return `[PRAJNA-TRANSLATION PIPELINE / ಪ್ರಜ್ಞಾ ಅನುವಾದ] (supported by external feature)

### ಸಂಭಾಷಣಾ ಎಐ ಪ್ರಶ್ನೆ ಫಲಿತಾಂಶಗಳು
ನಾನು ಪ್ರಜ್ಞಾ-AI, ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್‌ಗಾಗಿ ಸಂಭಾಷಣಾ ಸಹಾಯಕ. ಜೊಹೊ ಕ್ಯಾಟಲಿಸ್ಟ್‌ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ ೧,೦೦೦ ಎಫ್‌ಐಆರ್‌ಗಳನ್ನು ಒಳಗೊಂಡಿರುವ ಡೇಟಾಬೇಸ್ ಅನ್ನು ನಾನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿದ್ದೇನೆ.

**ನೀವು ಸಿಸ್ಟಮ್‌ನಲ್ಲಿ ಈ ಕೆಳಗಿನವುಗಳನ್ನು ಪ್ರಶ್ನಿಸಬಹುದು:**
1. ನಿರ್ದಿಷ್ಟ ಎಫ್‌ಐಆರ್ ಸಾರಾಂಶಗಳು (ಉದಾಹರಣೆಗೆ, *"Summary of FIR 0012/2026"*)
2. ಆರೋಪಿಗಳ ವಿವರಗಳು (ಉದಾಹರಣೆಗೆ, *"Show profile for Raju K."*)
3. ಪ್ರಾದೇಶಿಕ ಅಪರಾಧ ಪ್ರದೇಶಗಳು ಮತ್ತು ಪ್ರವೃತ್ತಿಗಳು (ಉದಾಹರಣೆಗೆ, *" Burglary cases in Mysuru"*)

ಕಾನೂನು ವಿಭಾಗಗಳು, ಜಾಲಗಳು ಅಥವಾ ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಚಾರ್ಟ್‌ಗಳನ್ನು ಪಡೆಯಲು ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹುಡುಕಾಟ ನಿಯತಾಂಕಗಳನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ.`;
}

export function generateMockAIResponse(
  query: string,
  mockFIRs: FIRRecord[],
  mockSuspects: SuspectProfile[],
  language: Language
): ChatMessage {
  const normQuery = translateQuery(query).toLowerCase();
  
  let content = '';
  let citations: FIRCitation[] = [];
  let charts: ChartData[] = [];
  let confidence = Math.floor(Math.random() * 15) + 80; // 80-95%
  
  // Match suspect
  const matchedSuspect = mockSuspects.find(s => 
    normQuery.includes(s.name.toLowerCase()) || 
    s.aliases.some(a => normQuery.includes(a.toLowerCase()))
  );

  // Match district
  const districts = ['bengaluru', 'mysuru', 'mangaluru', 'kalaburagi', 'hubballi', 'belagavi', 'raichur'];
  const matchedDistrict = districts.find(d => normQuery.includes(d));

  // Match crime type
  const crimeTypes = ['theft', 'robbery', 'burglary', 'cyber', 'murder', 'assault', 'drug', 'snatching'];
  const matchedCrime = crimeTypes.find(c => normQuery.includes(c));

  // Match FIR number
  const firMatch = query.match(/\d{4}\/\d{4}/);

  if (firMatch) {
    const firNum = firMatch[0];
    const record = mockFIRs.find(f => f.firNumber.includes(firNum));

    if (record) {
      content = getTranslatedContent('fir_summary', { record }, language);
      citations = [{ firNumber: record.firNumber, policeStation: record.policeStation, relevanceScore: 100 }];
    } else {
      content = getTranslatedContent('fir_not_found', { firNum }, language);
    }
  } else if (matchedSuspect) {
    const suspectFIRs = mockFIRs.filter(f => f.accusedNames.includes(matchedSuspect.name));
    content = getTranslatedContent('suspect_profile', { matchedSuspect, suspectFIRs }, language);
    citations = suspectFIRs.map(f => ({
      firNumber: f.firNumber,
      policeStation: f.policeStation,
      relevanceScore: 95
    }));
  } else if (matchedDistrict || matchedCrime) {
    let filtered = mockFIRs;
    if (matchedDistrict) {
      filtered = filtered.filter(f => f.district.toLowerCase().includes(matchedDistrict));
    }
    if (matchedCrime) {
      filtered = filtered.filter(f => f.crimeType.toLowerCase().includes(matchedCrime));
    }

    content = getTranslatedContent('analytical_response', { matchedDistrict, matchedCrime, filteredLength: filtered.length }, language);
    citations = filtered.slice(0, 3).map(f => ({
      firNumber: f.firNumber,
      policeStation: f.policeStation,
      relevanceScore: 90
    }));

    // Generate bar chart data for this crime type/district
    charts = [
      {
        type: 'bar',
        title: language === 'kn' ? 'ಮಾಸಿಕ ಅಪರಾಧ ಪ್ರಮಾಣ' : language === 'hi' ? 'मासिक अपराध मात्रा' : 'Monthly Incident Volume',
        data: [
          { month: 'Jan', count: Math.floor(filtered.length * 0.3) + 1 },
          { month: 'Feb', count: Math.floor(filtered.length * 0.2) + 2 },
          { month: 'Mar', count: Math.floor(filtered.length * 0.4) + 1 },
          { month: 'Apr', count: Math.floor(filtered.length * 0.1) + 1 }
        ]
      }
    ];
  } else {
    // Generic fallback
    content = getTranslatedContent('fallback', {}, language);
  }

  return {
    id: `MSG-${Math.random().toString(36).substr(2, 9)}`,
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
    language,
    citations,
    charts,
    confidence,
    auditId: `AUD-${Math.floor(Math.random() * 90000) + 10000}`
  };
}

export function generateCaseSummary(firId: string, mockFIRs: FIRRecord[], language: Language = 'en'): ChatMessage {
  const record = mockFIRs.find(f => f.id === firId || f.firNumber === firId);
  if (!record) {
    const notFoundMsg = language === 'kn'
      ? 'ಪ್ರಕರಣದ ಸಾರಾಂಶ ವಿಫಲವಾಗಿದೆ. ದಾಖಲೆ ಕಂಡುಬಂದಿಲ್ಲ.'
      : language === 'hi'
      ? 'केस सारांश विफल रहा। रिकॉर्ड नहीं मिला।'
      : 'Case summary failed. Record not found.';
    return {
      id: `MSG-${Date.now()}`,
      role: 'assistant',
      content: notFoundMsg,
      timestamp: new Date().toISOString(),
      language
    };
  }

  const headerTitle = language === 'kn' ? 'ಸುರಕ್ಷಿತ ಕೇಸ್ ಸಂಕ್ಷಿಪ್ತ ವಿವರ' : language === 'hi' ? 'सुरक्षित केस संक्षिप्त विवरण' : 'SECURE CASE BRIEF';
  const labelJurisdiction = language === 'kn' ? 'ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ' : language === 'hi' ? 'अधिकार क्षेत्र' : 'JURISDICTION';
  const labelStatus = language === 'kn' ? 'ಸ್ಥಿತಿ' : language === 'hi' ? 'स्थिति' : 'STATUS';
  const labelSeverity = language === 'kn' ? 'ತೀವ್ರತೆ' : language === 'hi' ? 'गंभीरता' : 'SEVERITY';
  const labelIO = language === 'kn' ? 'ತನಿಖಾಧಿಕಾರಿ (IO)' : language === 'hi' ? 'जांच अधिकारी (IO)' : 'INVESTIGATION OFFICER';
  const labelLegalCitation = language === 'kn' ? 'ಕಾನೂನು ಉಲ್ಲೇಖ' : language === 'hi' ? 'कानूनी उद्धरण' : 'LEGAL CITATION';
  const dualCitationText = language === 'kn' ? 'ದ್ವಿ ಉಲ್ಲೇಖ (Dual citation):' : language === 'hi' ? 'दोहरा उद्धरण (Dual citation):' : 'Dual citation:';
  const labelSummary = language === 'kn' ? 'ಸಾರಾಂಶ ವಿವರಣೆ' : language === 'hi' ? 'सारांश विवरण' : 'SUMMARY DESCRIPTION';
  const labelMO = language === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆಯ ವಿಧಾನ (MO) ಟಿಪ್ಪಣಿಗಳು' : language === 'hi' ? 'कार्यप्रणाली (MO) नोट्स' : 'MO NOTES';

  return {
    id: `MSG-${Date.now()}`,
    role: 'assistant',
    content: `### ${headerTitle}: FIR ${record.firNumber}
**${labelJurisdiction}:** ${record.policeStation}, ${record.district}
**${labelStatus}:** ${record.status.toUpperCase()} | **${labelSeverity}:** ${record.severity.toUpperCase()}
**${labelIO}:** ${record.ioName}

**${labelLegalCitation}:**
${dualCitationText} ${record.actsAndSections.join(' / ')}

**${labelSummary}:**
${record.summary}

**${labelMO}:**
${record.modusOperandi}`,
    timestamp: new Date().toISOString(),
    language,
    citations: [{ firNumber: record.firNumber, policeStation: record.policeStation, relevanceScore: 100 }],
    confidence: 98,
    auditId: `AUD-${Math.floor(Math.random() * 90000) + 10000}`
  };
}

export function findSimilarCases(firId: string, mockFIRs: FIRRecord[], language: Language = 'en'): ChatMessage {
  const record = mockFIRs.find(f => f.id === firId || f.firNumber === firId);
  const msgText = language === 'kn'
    ? `FIR ${record?.firNumber || firId} ಗಾಗಿ ಹೊಂದಾಣಿಕೆಯಾದ ಸಮಾನ ಪ್ರಕರಣಗಳು`
    : language === 'hi'
    ? `FIR ${record?.firNumber || firId} के लिए मिलान किए गए समान मामले`
    : `Similar cases matched for FIR ${record?.firNumber || firId}`;
  return {
    id: `MSG-SIM-${Date.now()}`,
    role: 'assistant',
    content: msgText,
    timestamp: new Date().toISOString(),
    language
  };
}

export function generateInvestigativeLeads(suspectId: string, mockSuspects: SuspectProfile[], mockFIRs: FIRRecord[], language: Language = 'en'): ChatMessage {
  const suspect = mockSuspects.find(s => s.id === suspectId);
  const msgText = language === 'kn'
    ? `ಶಂಕಿತ ${suspect?.name || suspectId} ಗಾಗಿ ತನಿಖಾ ಸುಳಿವುಗಳು`
    : language === 'hi'
    ? `संदिग्ध ${suspect?.name || suspectId} के लिए खोजी सुराग`
    : `Investigative leads for suspect ${suspect?.name || suspectId}`;
  return {
    id: `MSG-LEAD-${Date.now()}`,
    role: 'assistant',
    content: msgText,
    timestamp: new Date().toISOString(),
    language
  };
}
