# Prajna-AI Multi-Language Voice & Speech Recognition Package

A complete, production-ready speech-to-text integration for React & Zoho Catalyst powered by the browser's native **Web Speech API** (`SpeechRecognition` / `webkitSpeechRecognition`).

---

## 🌟 Key Features

1. **Native Chrome & Edge Integration**:
   - Zero external third-party API token or paid service dependencies.
   - Runs directly on the user's browser with low latency, real-time interim word streaming.

2. **Tri-Lingual Indian Legal & Police Speech Optimization**:
   - **English (India)**: `en-IN` (tuned for Indian English accents and legal terminology)
   - **Hindi (हिंदी)**: `hi-IN`
   - **Kannada (ಕನ್ನಡ)**: `kn-IN`

3. **Decoupled Language Architecture (Independent from Page Translation)**:
   - The Mic Language Toggle is **independent** of any parent website translation button.
   - Changing the speech language (`EN` | `हिंदी` | `ಕನ್ನಡ`) adjusts the voice model and input prompt **without altering the website interface language**.
   - Translating the website UI does **not** override or interfere with the user's active microphone language selection.

4. **Click-to-Speak / Click-Again-to-Finish**:
   - Continuous phrase capture (`continuous = true`).
   - Does not cut off during natural pauses while thinking or reading FIR notes.
   - Click the mic to start speaking, speak freely, and click the red stop button when finished.

5. **Hot Language Switching**:
   - The user can click the language toggle button (`EN` | `हिंदी` | `ಕನ್ನಡ`) **in the middle of speaking**, and the recognition engine seamlessly switches language models without losing previous text or aborting the session.

6. **Zoho Catalyst Ready**:
   - Compatible with Catalyst Web Client / AppSail hosting (`dist/` build).
   - Includes backend serverless function `zia_speech` for health checks, CORS handling, and speech payload validation.

---

## 📁 Package Directory Layout

```
prajna-mic-package/
├── frontend/
│   ├── services/
│   │   └── speechRecognitionService.ts   # Standalone Speech Engine & Locale Mapper (en-IN, hi-IN, kn-IN)
│   └── components/
│       ├── VoiceInputButton.tsx          # Pulse-animated Mic & Stop button component
│       ├── LanguageToggle.tsx            # High-visibility 1-click EN/HI/KN switcher
│       └── ChatInput.tsx                 # Full chat input with decoupled mic language state
│
├── backend/
│   └── functions/
│       └── zia_speech/
│           ├── index.js                  # Catalyst Advanced I/O function handler
│           ├── catalyst-config.json      # Node.js 18 runtime configuration
│           └── package.json              # Backend dependencies
│
└── README.md                             # Documentation & Integration guide (this file)
```

---

## 🚀 Quick Integration Guide

### 1. Copy Frontend Files to your React Project:
- Copy `frontend/services/speechRecognitionService.ts` to `src/services/`
- Copy `frontend/components/VoiceInputButton.tsx` to `src/components/chat/`
- Copy `frontend/components/LanguageToggle.tsx` to `src/components/ui/`
- Copy `frontend/components/ChatInput.tsx` to `src/components/chat/`

### 2. Standalone Mic & Language Switcher (Decoupled Example):

```tsx
import { useState } from 'react';
import { VoiceInputButton } from '@/components/chat/VoiceInputButton';
import { LanguageToggle } from '@/components/ui/LanguageToggle';

export type Language = 'en' | 'hi' | 'kn';

export function IndependentVoiceBox() {
  const [text, setText] = useState('');
  
  // Independent mic language state - decoupled from global page translation
  const [micLanguage, setMicLanguage] = useState<Language>(() => {
    return (localStorage.getItem('ksp_mic_language') as Language) || 'en';
  });

  const handleMicLanguageChange = (newLang: Language) => {
    setMicLanguage(newLang);
    localStorage.setItem('ksp_mic_language', newLang);
  };

  return (
    <div className="flex items-center space-x-2 p-3 bg-white rounded-lg border">
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder={`Speaking in ${micLanguage.toUpperCase()}...`}
        className="flex-1 p-2 border rounded"
      />

      {/* Voice Input Button */}
      <VoiceInputButton 
        language={micLanguage} 
        onSpeechResult={(transcript) => setText(transcript)} 
      />

      {/* Mic-Specific Language Switcher */}
      <LanguageToggle 
        currentLanguage={micLanguage} 
        onLanguageChange={handleMicLanguageChange} 
      />
    </div>
  );
}
```

---

## ⚙️ Backend Deployment (Zoho Catalyst)

1. Copy `backend/functions/zia_speech` into your `Prajna_Backend/functions/` directory.
2. In your `catalyst.json`, make sure `zia_speech` is registered under `functions.targets`:
   ```json
   {
     "functions": {
       "targets": [
         "prajna_ai_function",
         "zia_speech"
       ],
       "source": "functions"
     }
   }
   ```
3. Deploy to Catalyst:
   ```bash
   catalyst deploy
   ```
4. Verify the health check endpoint:
   ```bash
   curl https://<YOUR_CATALYST_APP_DOMAIN>/server/zia_speech
   ```

---

## 📋 Browser Compatibility & Security

| Browser | Support Level | Notes |
| :--- | :--- | :--- |
| **Google Chrome (Desktop & Mobile)** | 🟢 Full Support | Recommended for best accuracy and low latency |
| **Microsoft Edge** | 🟢 Full Support | Uses Chromium Web Speech engine |
| **Brave / Opera / Vivaldi** | 🟢 Full Support | Ensure mic permissions are granted |
| **Mozilla Firefox** | ⚠️ Partial | Web Speech recognition flags disabled by default |
| **Apple Safari** | ⚠️ Limited | Basic speech recognition; requires user gesture |

> **Note on Microphone Permissions**:
> Browsers require HTTPS (or `localhost` for local development) to access the microphone. Ensure microphone permissions are allowed in browser site settings.
