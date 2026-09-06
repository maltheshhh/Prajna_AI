import { useEffect, useState, useRef } from 'react';
import { Language } from '@/context/LanguageContext';
import { speechService, LANGUAGE_DISPLAY_NAMES } from '@/services/speechRecognitionService';
import * as Lucide from 'lucide-react';

interface VoiceInputButtonProps {
  language: Language;
  onSpeechResult: (text: string) => void;
  onRecordingStart?: () => void;
  onRecordingEnd?: () => void;
}

export function VoiceInputButton({
  language,
  onSpeechResult,
  onRecordingStart,
  onRecordingEnd,
}: VoiceInputButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const onSpeechResultRef = useRef(onSpeechResult);
  onSpeechResultRef.current = onSpeechResult;
  const onRecordingStartRef = useRef(onRecordingStart);
  onRecordingStartRef.current = onRecordingStart;
  const onRecordingEndRef = useRef(onRecordingEnd);
  onRecordingEndRef.current = onRecordingEnd;

  useEffect(() => {
    // Safely configure callbacks
    if (speechService && typeof speechService.setCallbacks === 'function') {
      speechService.setCallbacks({
        onStart: () => {
          setIsListening(true);
          onRecordingStartRef.current?.();
        },
        onInterimResult: (text: string) => {
          if (onSpeechResultRef.current) {
            onSpeechResultRef.current(text);
          }
        },
        onFinalResult: (text: string) => {
          if (onSpeechResultRef.current) {
            onSpeechResultRef.current(text);
          }
        },
        onError: (err: string) => {
          setIsListening(false);
          onRecordingEndRef.current?.();
          if (err) {
            alert(err);
          }
        },
        onEnd: () => {
          setIsListening(false);
          onRecordingEndRef.current?.();
        },
      });

      speechService.setLanguage(language);
    }

    return () => {
      if (speechService && typeof speechService.abort === 'function') {
        speechService.abort();
      }
    };
  }, [language]);

  const toggleRecording = () => {
    if (!speechService || typeof speechService.isSupported !== 'function' || !speechService.isSupported()) {
      alert('Speech recognition is supported in Google Chrome and Microsoft Edge.');
      return;
    }

    if (isListening) {
      speechService.stop();
      setIsListening(false);
      onRecordingEndRef.current?.();
    } else {
      setIsListening(true);
      onRecordingStartRef.current?.();
      speechService.start(language);
    }
  };

  const langLabel = LANGUAGE_DISPLAY_NAMES[language] || language.toUpperCase();
  const buttonTitle = isListening
    ? `Listening in ${langLabel}... Click again to finish speaking`
    : `Click to speak in ${langLabel} (Click again to finish)`;

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={toggleRecording}
        title={buttonTitle}
        className={`relative p-2 rounded-full transition-all focus:outline-none select-none ${
          isListening
            ? 'bg-ksp-red text-white shadow-lg animate-pulse ring-4 ring-red-400/50 hover:bg-red-700'
            : 'bg-ksp-gray-100 hover:bg-ksp-gray-200 text-ksp-gray-600 dark:bg-ksp-navy-dark dark:text-ksp-gray-300 dark:hover:bg-ksp-navy-light'
        }`}
      >
        {isListening ? (
          <Lucide.Square className="h-5 w-5 fill-current" />
        ) : (
          <Lucide.Mic className="h-5 w-5" />
        )}
      </button>

      {/* Floating active recording pulse badge */}
      {isListening && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
      )}
    </div>
  );
}
