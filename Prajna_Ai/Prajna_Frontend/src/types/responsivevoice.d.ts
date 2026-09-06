// Type declarations for ResponsiveVoice.js (loaded via CDN script tag)
interface ResponsiveVoice {
  speak(text: string, voiceName: string, parameters?: {
    pitch?: number;
    rate?: number;
    volume?: number;
    onstart?: () => void;
    onend?: () => void;
    onerror?: (e: unknown) => void;
  }): void;
  cancel(): void;
  isPlaying(): boolean;
  voiceSupport(): boolean;
  getVoices(): Array<{ name: string }>;
}

declare global {
  interface Window {
    responsiveVoice?: ResponsiveVoice;
  }
}

export {};
