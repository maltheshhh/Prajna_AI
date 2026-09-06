import { useState } from 'react';
import { Language } from '@/context/LanguageContext';
import * as Lucide from 'lucide-react';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  variant?: 'compact' | 'full';
}

export function LanguageToggle({
  currentLanguage,
  onLanguageChange,
  variant = 'compact',
}: LanguageToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; subLabel: string; title: string }[] = [
    { code: 'en', label: 'EN', subLabel: 'English', title: 'English (India)' },
    { code: 'hi', label: 'हिंदी', subLabel: 'Hindi', title: 'हिंदी (Hindi)' },
    { code: 'kn', label: 'ಕನ್ನಡ', subLabel: 'Kannada', title: 'ಕನ್ನಡ (Kannada)' },
  ];

  const currentLangObj = languages.find((l) => l.code === currentLanguage);

  const handleTriggerClick = () => {
    const currentIndex = languages.findIndex((l) => l.code === currentLanguage);
    const nextIndex = (currentIndex + 1) % languages.length;
    onLanguageChange(languages[nextIndex].code);
    setIsOpen(false);
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleSelectLanguage = (code: Language) => {
    onLanguageChange(code);
    setIsOpen(false);
    (document.activeElement as HTMLElement)?.blur();
  };

  const isExpanded = variant === 'full' || isOpen;

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
      className="group/lang group relative inline-flex items-center rounded-lg border border-ksp-gray-300 bg-white p-1 shadow-sm dark:bg-ksp-navy-dark dark:border-ksp-navy-light select-none transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0B2E59]/20 dark:focus-within:ring-[#FF9F1C]/30"
    >
      {/* Collapsed Language Trigger / Icon */}
      <button
        type="button"
        onClick={handleTriggerClick}
        title={`Language: ${currentLangObj?.title || 'Change Language'} (Click to cycle, hover to choose)`}
        aria-label={`Change language, currently ${currentLangObj?.label || currentLanguage}`}
        className="flex items-center justify-center p-1.5 text-ksp-gray-500 dark:text-ksp-gray-300 hover:text-ksp-navy dark:hover:text-[#FFB800] rounded-md transition-colors cursor-pointer shrink-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-ksp-navy"
      >
        <Lucide.Languages className="h-3.5 w-3.5" />
      </button>

      {/* Expandable Language Options */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center space-x-1 ${
          isExpanded
            ? 'max-w-64 opacity-100 pointer-events-auto pl-1'
            : 'max-w-0 opacity-0 pointer-events-none pl-0'
        }`}
      >
        {languages.map((lang) => {
          const isActive = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              title={lang.title}
              className={`px-2.5 py-1 text-[11px] font-extrabold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-ksp-navy text-white shadow-xs ring-1 ring-ksp-navy dark:bg-[#FF9F1C] dark:text-[#071D3A]'
                  : 'text-ksp-gray-600 hover:text-ksp-navy hover:bg-ksp-gray-100 dark:text-ksp-gray-300 dark:hover:bg-ksp-navy-light/60'
              }`}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
