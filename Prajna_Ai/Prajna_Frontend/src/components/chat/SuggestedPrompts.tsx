import { Language } from '@/context/LanguageContext';
import * as Lucide from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
  language: Language;
}

export function SuggestedPrompts({ onSelectPrompt, language }: SuggestedPromptsProps) {
  const englishPrompts = [
    { text: 'Show burglary trends in Bengaluru during last 3 months', icon: 'TrendingUp' },
    { text: 'Identify repeat offenders linked to vehicle theft', icon: 'UserSearch' },
    { text: 'Analyze cybercrime hotspots in Karnataka', icon: 'MapPin' },
    { text: 'Show criminal network for suspect Anil R.', icon: 'Network' },
    { text: 'Generate a summary brief for FIR 7075/2025', icon: 'FileText' },
    { text: 'What are the top crime types in Kalaburagi?', icon: 'Activity' }
  ];

  const kannadaPrompts = [
    { text: 'ಮೈಸೂರಿನಲ್ಲಿ ಇತ್ತೀಚಿನ ಕಳ್ಳತನ ಪ್ರಕರಣಗಳನ್ನು ತೋರಿಸಿ', icon: 'TrendingUp' },
    { text: 'ವಾಹನ ಕಳ್ಳತನಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಆರೋपीಗಳನ್ನು ಪತ್ತೆ ಮಾಡಿ', icon: 'UserSearch' },
    { text: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಸೈಬರ್ ಕ್ರೈಮ್ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ತೋರಿಸಿ', icon: 'MapPin' },
    { text: 'ಆರೋಪಿ ರಾಜು ಕೆ. ರವರ ಅಪರಾಧ ಜಾಲವನ್ನು ತೋರಿಸಿ', icon: 'Network' },
    { text: 'ಎಫ್ಐಆರ್ 0012/2026 ಪ್ರಕರಣದ ಸಾರಾಂಶ ನೀಡಿ', icon: 'FileText' },
    { text: 'ಕಲಬುರಗಿಯಲ್ಲಿ ಹೆಚ್ಚಾಗಿ ನಡೆಯುವ ಅಪರಾಧಗಳು ಯಾವುವು?', icon: 'Activity' }
  ];

  const hindiPrompts = [
    { text: 'मैसूर में पिछले 12 महीनों में चोरी के रुझान दिखाएं', icon: 'TrendingUp' },
    { text: 'वाहन चोरी से जुड़े आदतन अपराधियों की पहचान करें', icon: 'UserSearch' },
    { text: 'कर्नाटक में साइबर अपराध हॉटस्पॉट का विश्लेषण करें', icon: 'MapPin' },
    { text: 'संदिग्ध राजू के. के लिए आपराधिक नेटवर्क दिखाएं', icon: 'Network' },
    { text: 'FIR 0012/2026 के लिए एक सारांश रिपोर्ट तैयार करें', icon: 'FileText' },
    { text: 'कलबुर्गी में शीर्ष अपराध प्रकार क्या हैं?', icon: 'Activity' }
  ];

  const prompts = language === 'kn' ? kannadaPrompts : language === 'hi' ? hindiPrompts : englishPrompts;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4">
      <h4 className="text-[10px] font-extrabold text-[#0B2E59] dark:text-sky-300 uppercase tracking-widest text-center mb-4">
        INTELLIGENCE COMMAND SUGGESTIONS
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {prompts.map((p, index) => {
          const IconComponent = (Lucide as any)[p.icon] || Lucide.Search;
          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectPrompt(p.text)}
              className="flex items-start text-left p-3.5 rounded-lg border border-ksp-gray-200 bg-white hover:border-ksp-navy hover:shadow-sm transition-all dark:bg-ksp-navy-dark dark:border-ksp-navy-light dark:hover:border-white"
            >
              <IconComponent className="h-4.5 w-4.5 text-ksp-navy dark:text-sky-300 shrink-0 mr-3 mt-0.5" />
              <span className="text-xs font-bold text-ksp-gray-800 dark:text-ksp-gray-200">
                {p.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
