import { Language } from '@/context/LanguageContext';

// Map application language codes to standard BCP-47 speech recognition locale tags
export const SPEECH_LOCALE_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
};

export const LANGUAGE_DISPLAY_NAMES: Record<Language, string> = {
  en: 'English (India)',
  hi: 'हिंदी (Hindi)',
  kn: 'ಕನ್ನಡ (Kannada)',
};

export interface SpeechRecognitionCallbacks {
  onStart?: () => void;
  onInterimResult?: (text: string) => void;
  onFinalResult?: (text: string) => void;
  onError?: (error: string) => void;
  onEnd?: () => void;
}

interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

class SpeechRecognitionManager {
  private recognition: any = null;
  private isListening: boolean = false;
  private userWantsListening: boolean = false;
  private currentLanguage: Language = 'en';
  private callbacks: SpeechRecognitionCallbacks = {};
  private finalTranscript: string = '';
  private committedResultIndex: number = -1;
  private restartTimeout: any = null;

  constructor() {
    this.isSupported = this.isSupported.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.setCallbacks = this.setCallbacks.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.abort = this.abort.bind(this);
    this.getIsListening = this.getIsListening.bind(this);
  }

  public isSupported = (): boolean => {
    if (typeof window === 'undefined') return false;
    const win = window as unknown as IWindow;
    return !!(win.SpeechRecognition || win.webkitSpeechRecognition);
  };

  /**
   * Completely tears down any active SpeechRecognition instance,
   * unbinding all event listeners first to prevent ghost callbacks.
   */
  private cleanupCurrentRecognition = (): void => {
    clearTimeout(this.restartTimeout);
    this.restartTimeout = null;

    if (this.recognition) {
      // Detach all event listeners so old/aborted instances never fire callbacks
      this.recognition.onstart = null;
      this.recognition.onresult = null;
      this.recognition.onerror = null;
      this.recognition.onend = null;

      try {
        this.recognition.abort();
      } catch {
        // Ignore if already inactive
      }
      this.recognition = null;
    }
  };

  /**
   * Creates a single fresh SpeechRecognition instance with clean event handlers.
   */
  private createRecognitionInstance = (): any => {
    if (!this.isSupported()) return null;

    // Ensure any previously active instance is destroyed first
    this.cleanupCurrentRecognition();

    const win = window as unknown as IWindow;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return null;

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = SPEECH_LOCALE_MAP[this.currentLanguage] || 'en-IN';

      recognition.onstart = () => {
        this.isListening = true;
        if (this.callbacks.onStart) {
          this.callbacks.onStart();
        }
      };

      recognition.onresult = (event: any) => {
        let interimText = '';

        // Iterate only from event.resultIndex onward to avoid reprocessing earlier segments
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (!result || !result[0]) continue;

          const transcriptPiece = result[0].transcript;

          if (result.isFinal) {
            // Commit each newly-finalized chunk exactly once
            if (i > this.committedResultIndex) {
              const piece = transcriptPiece.trim();
              if (piece) {
                this.finalTranscript = this.finalTranscript
                  ? `${this.finalTranscript} ${piece}`
                  : piece;
              }
              this.committedResultIndex = i;
            }
          } else {
            // Accumulate live interim text for the current unfinalized phrase
            interimText += transcriptPiece;
          }
        }

        const trimmedInterim = interimText.trim();
        const combinedText = trimmedInterim
          ? (this.finalTranscript ? `${this.finalTranscript} ${trimmedInterim}` : trimmedInterim)
          : this.finalTranscript;

        if (this.callbacks.onInterimResult) {
          this.callbacks.onInterimResult(combinedText);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'no-speech' || event.error === 'aborted') {
          return;
        }

        let errorMessage = '';
        switch (event.error) {
          case 'not-allowed':
          case 'service-not-allowed':
            errorMessage = 'Microphone permission denied. Please allow microphone access in your browser settings.';
            this.userWantsListening = false;
            this.isListening = false;
            break;
          case 'audio-capture':
            errorMessage = 'No microphone device found on your system.';
            this.userWantsListening = false;
            this.isListening = false;
            break;
          case 'network':
            errorMessage = 'Network issue with speech recognition service.';
            break;
          default:
            errorMessage = `Speech recognition error: ${event.error}`;
        }

        if (errorMessage && this.callbacks.onError) {
          this.callbacks.onError(errorMessage);
        }
      };

      recognition.onend = () => {
        this.isListening = false;

        if (this.userWantsListening) {
          // Auto-restart listening after silence if the user hasn't stopped recording
          clearTimeout(this.restartTimeout);
          this.restartTimeout = setTimeout(() => {
            if (this.userWantsListening) {
              this.restartSession();
            }
          }, 80);
        } else {
          // Finished recording session
          if (this.callbacks.onFinalResult && this.finalTranscript) {
            this.callbacks.onFinalResult(this.finalTranscript.trim());
          }
          if (this.callbacks.onEnd) {
            this.callbacks.onEnd();
          }
          this.cleanupCurrentRecognition();
        }
      };

      this.recognition = recognition;
      return recognition;
    } catch (e) {
      console.error('Failed to initialize SpeechRecognition:', e);
      this.recognition = null;
      return null;
    }
  };

  /**
   * Restarts a session while preserving this.finalTranscript
   */
  private restartSession = (): void => {
    if (!this.userWantsListening) return;
    this.committedResultIndex = -1;
    const recognition = this.createRecognitionInstance();
    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        console.warn('Speech recognition auto-restart notice:', e);
      }
    }
  };

  public setLanguage = (lang: Language): void => {
    const prevLang = this.currentLanguage;
    this.currentLanguage = lang;
    const newLocale = SPEECH_LOCALE_MAP[lang] || 'en-IN';

    if (this.recognition) {
      this.recognition.lang = newLocale;

      if (this.userWantsListening && prevLang !== lang) {
        // Hot language switch: restart recognition with new language locale
        try {
          this.recognition.stop();
        } catch (e) {
          console.warn('Hot language switch notice:', e);
        }
      }
    }
  };

  public setCallbacks = (callbacks: SpeechRecognitionCallbacks): void => {
    this.callbacks = callbacks || {};
  };

  public start = (lang?: Language): void => {
    if (!this.isSupported()) {
      if (this.callbacks.onError) {
        this.callbacks.onError('Web Speech API is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
      }
      return;
    }

    if (lang) {
      this.currentLanguage = lang;
    }

    this.userWantsListening = true;
    this.finalTranscript = '';
    this.committedResultIndex = -1;

    const recognition = this.createRecognitionInstance();
    if (recognition) {
      try {
        recognition.start();
      } catch (err: any) {
        console.error('Error starting speech recognition:', err);
      }
    }
  };

  public stop = (): void => {
    this.userWantsListening = false;
    clearTimeout(this.restartTimeout);
    this.restartTimeout = null;

    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (err) {
        console.warn('Error stopping speech recognition:', err);
      }
    } else {
      this.isListening = false;
      if (this.callbacks.onFinalResult && this.finalTranscript) {
        this.callbacks.onFinalResult(this.finalTranscript.trim());
      }
      if (this.callbacks.onEnd) {
        this.callbacks.onEnd();
      }
      this.cleanupCurrentRecognition();
    }
  };

  public abort = (): void => {
    this.userWantsListening = false;
    this.cleanupCurrentRecognition();
    this.isListening = false;
  };

  public getIsListening = (): boolean => {
    return this.isListening;
  };
}

// Global Singleton Instance
export const speechService = new SpeechRecognitionManager();
export default speechService;
