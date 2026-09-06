import { useState, useRef, DragEvent } from 'react';
import { VoiceInputButton } from './VoiceInputButton';
import { speechService } from '@/services/speechRecognitionService';
import { ChatAttachmentPreview } from './ChatAttachmentPreview';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useLanguage, Language } from '@/context/LanguageContext';
import { ChatAttachment } from '@/types';
import * as Lucide from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string, language: Language, attachments?: ChatAttachment[]) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const { t, language } = useLanguage();
  const [micLanguage, setMicLanguage] = useState<Language>(() => {
    return (localStorage.getItem('ksp_mic_language') as Language) || language || 'en';
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typedPrefixRef = useRef('');
  const isVoiceRecordingRef = useRef(false);

  const handleMicLanguageChange = (newLang: Language) => {
    setMicLanguage(newLang);
    localStorage.setItem('ksp_mic_language', newLang);
  };

  const handleSend = () => {
    if (isVoiceRecordingRef.current) {
      speechService.stop();
      isVoiceRecordingRef.current = false;
    }
    typedPrefixRef.current = '';

    const trimmed = text.trim();
    if ((!trimmed && attachments.length === 0) || disabled || isProcessingFiles) return;
    
    // If no text but files attached, provide a default prompt describing the action
    const queryText = trimmed || (attachments.length === 1 
      ? `Analyze the attached ${attachments[0].type === 'image' ? 'evidence image' : 'case document'} "${attachments[0].name}" and provide intelligence breakdown.`
      : `Analyze the ${attachments.length} attached case files & evidence materials.`);

    onSendMessage(queryText, micLanguage, attachments.length > 0 ? [...attachments] : undefined);
    setText('');
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceStart = () => {
    isVoiceRecordingRef.current = true;
    typedPrefixRef.current = text;
  };

  const handleVoiceEnd = () => {
    isVoiceRecordingRef.current = false;
  };

  const handleVoiceInput = (result: string) => {
    const prefix = typedPrefixRef.current;
    if (!result) {
      setText(prefix);
      return;
    }
    const separator = prefix && !prefix.endsWith(' ') ? ' ' : '';
    const newText = prefix ? `${prefix}${separator}${result}` : result;
    setText(newText);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const processFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    setIsProcessingFiles(true);

    const newAttachments: ChatAttachment[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isImg = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      const isText = file.type.startsWith('text/') || 
                     file.name.endsWith('.json') || 
                     file.name.endsWith('.csv') || 
                     file.name.endsWith('.txt') ||
                     file.name.endsWith('.md') ||
                     file.name.endsWith('.log');

      let fileType: 'image' | 'pdf' | 'document' | 'other' = 'other';
      if (isImg) fileType = 'image';
      else if (isPdf) fileType = 'pdf';
      else if (isText || file.name.endsWith('.doc') || file.name.endsWith('.docx')) fileType = 'document';

      const attachmentId = `ATT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

      try {
        if (isImg) {
          const dataUrl = await readFileAsDataURL(file);
          newAttachments.push({
            id: attachmentId,
            name: file.name,
            type: fileType,
            mimeType: file.type || 'image/jpeg',
            size: file.size,
            dataUrl: dataUrl
          });
        } else if (isPdf) {
          const [pdfText, dataUrl] = await Promise.all([
            extractTextFromPdf(file),
            readFileAsDataURL(file).catch(() => '')
          ]);
          newAttachments.push({
            id: attachmentId,
            name: file.name,
            type: fileType,
            mimeType: 'application/pdf',
            size: file.size,
            dataUrl: dataUrl || undefined,
            extractedText: pdfText || `[PDF Document: ${file.name} | Size: ${(file.size / 1024).toFixed(1)} KB]`
          });
        } else if (isText) {
          const content = await readFileAsText(file);
          newAttachments.push({
            id: attachmentId,
            name: file.name,
            type: fileType,
            mimeType: file.type || 'text/plain',
            size: file.size,
            extractedText: content.slice(0, 30000) // Keep comprehensive extract
          });
        } else {
          // Other binary documents (DOCX, etc.)
          const [docText, dataUrl] = await Promise.all([
            extractTextFromPdf(file).catch(() => ''),
            readFileAsDataURL(file).catch(() => '')
          ]);
          newAttachments.push({
            id: attachmentId,
            name: file.name,
            type: fileType,
            mimeType: file.type || 'application/octet-stream',
            size: file.size,
            dataUrl: dataUrl || undefined,
            extractedText: docText || `[Document File: ${file.name} | Size: ${(file.size / 1024).toFixed(1)} KB]`
          });
        }
      } catch (err) {
        console.error('Failed to read file:', file.name, err);
      }
    }

    setAttachments((prev) => [...prev, ...newAttachments]);
    setIsProcessingFiles(false);
  };

  const extractTextFromPdf = async (file: File): Promise<string> => {
    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      const textDecoder = new TextDecoder('utf-8', { fatal: false });
      const rawString = textDecoder.decode(bytes);

      const textMatches: string[] = [];

      // 1. PDF Parenthesized Text Streams: (Text...) Tj
      const tjRegex = /\(([^)]+)\)\s*(?:Tj|TJ|'|")/g;
      let match;
      while ((match = tjRegex.exec(rawString)) !== null) {
        if (match[1]) {
          const cleaned = match[1].replace(/\\[()\\]/g, '').trim();
          if (cleaned.length > 0) textMatches.push(cleaned);
        }
      }

      // 2. Bracketed array of text elements [(Item 1) 20 (Item 2)] TJ
      const tjArrayRegex = /\[(.*?)\]\s*TJ/g;
      let arrayMatch;
      while ((arrayMatch = tjArrayRegex.exec(rawString)) !== null) {
        const inner = arrayMatch[1];
        const innerTj = /\(([^)]+)\)/g;
        let innerMatch;
        while ((innerMatch = innerTj.exec(inner)) !== null) {
          if (innerMatch[1]) {
            const cleaned = innerMatch[1].replace(/\\[()\\]/g, '').trim();
            if (cleaned.length > 0) textMatches.push(cleaned);
          }
        }
      }

      // 3. Hexadecimal character encodings <48656c6c6f> Tj
      const hexRegex = /<([0-9a-fA-F]+)>\s*(?:Tj|TJ)/g;
      let hexMatch;
      while ((hexMatch = hexRegex.exec(rawString)) !== null) {
        try {
          const hex = hexMatch[1];
          let str = '';
          for (let i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
          }
          if (str.trim().length > 0) textMatches.push(str.trim());
        } catch {}
      }

      // 4. Raw text stream blocks and ASCII sentences
      if (textMatches.length < 5) {
        const asciiRegex = /[A-Za-z0-9\s.,;:'"\/\\()\-—_#@%&!?*+={}\[\]<>₹$]{4,}/g;
        let asciiMatch;
        while ((asciiMatch = asciiRegex.exec(rawString)) !== null) {
          const cleaned = asciiMatch[0].trim();
          if (
            cleaned &&
            !cleaned.startsWith('/') &&
            !cleaned.startsWith('obj') &&
            !cleaned.startsWith('endobj') &&
            !cleaned.startsWith('xref') &&
            !cleaned.startsWith('trailer') &&
            !cleaned.startsWith('stream') &&
            !cleaned.startsWith('endstream') &&
            !cleaned.startsWith('<<')
          ) {
            textMatches.push(cleaned);
          }
        }
      }

      return textMatches.join(' ').replace(/\s+/g, ' ').trim();
    } catch (err) {
      console.warn('PDF text extraction error:', err);
      return '';
    }
  };

  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    // Reset file input value so same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const getPlaceholder = () => {
    if (attachments.length > 0) {
      return micLanguage === 'kn'
        ? 'ಲಗತ್ತಿಸಲಾದ ಕಡತದೊಂದಿಗೆ ನಿಮ್ಮ ಪ್ರಶ್ನೆ ನಮೂದಿಸಿ ಅಥವಾ ಕಳುಹಿಸಿ...'
        : micLanguage === 'hi'
        ? 'संलग्न फ़ाइल के साथ अपना प्रश्न लिखें या सीधे भेजें...'
        : 'Add instructions for attached file/image, or press Send...';
    }
    if (micLanguage === 'kn') return 'ಪ್ರಜ್ಞಾ-AI ಜೊತೆ ಅಪರಾಧ ದತ್ತಾಂಶದ ಬಗ್ಗೆ ಚರ್ಚಿಸಿ (e.g. FIR 0012/2026)...';
    if (micLanguage === 'hi') return 'प्रज्ञा-AI से अपराध और प्राथमिकी के बारे में पूछें...';
    return 'Ask anything about FIRs, suspects, crime trends, or syndicate networks...';
  };

  const canSend = (text.trim().length > 0 || attachments.length > 0) && !disabled && !isProcessingFiles;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4 pt-2 select-none">
      {/* Hidden File Input for Native Dialog */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept="image/*,application/pdf,.doc,.docx,.txt,.csv,.json"
        className="hidden"
      />

      {/* Floating Modern Pill Container */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col bg-white dark:bg-[#081120] border transition-all rounded-3xl shadow-lg hover:shadow-xl dark:shadow-2xl dark:shadow-blue-950/40 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 ${
          isDragging 
            ? 'border-sky-500 ring-4 ring-sky-500/30 bg-sky-50/50 dark:bg-sky-950/40' 
            : 'border-gray-200 dark:border-blue-900/60'
        }`}
      >
        {/* Attachment Preview Tray */}
        <ChatAttachmentPreview
          attachments={attachments}
          onRemove={handleRemoveAttachment}
          disabled={disabled || isProcessingFiles}
        />

        {/* Input Bar Main Row */}
        <div className="flex items-center p-2 pl-3">
          {/* Plus / Attachment Button */}
          <button
            type="button"
            onClick={handleFileUploadClick}
            disabled={disabled || isProcessingFiles}
            className={`relative p-2 rounded-full transition shrink-0 cursor-pointer ${
              attachments.length > 0
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/60 dark:text-sky-300'
                : 'hover:bg-gray-100 dark:hover:bg-blue-950/60 text-gray-500 hover:text-[#0B2E59] dark:text-gray-400 dark:hover:text-sky-300'
            }`}
            title="Attach FIR Document, Chargesheet, or Evidence Image (PDF, JPG, PNG, TXT)"
          >
            <Lucide.Plus size={18} />
            {attachments.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-[9px] font-bold text-white shadow-xs">
                {attachments.length}
              </span>
            )}
          </button>

          {/* Input Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
            }}
            onKeyDown={handleKeyDown}
            placeholder={getPlaceholder()}
            disabled={disabled || isProcessingFiles}
            className="flex-1 bg-transparent px-3 py-2 text-xs md:text-sm font-medium outline-none resize-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 max-h-36 leading-relaxed"
          />

          {/* Right Tools Group */}
          <div className="flex items-center space-x-2 shrink-0 pr-1">
            {/* Multi-Language Switcher (EN / हिंदी / ಕನ್ನಡ) */}
            <LanguageToggle currentLanguage={micLanguage} onLanguageChange={handleMicLanguageChange} />

            {/* Voice Microphone Input */}
            <VoiceInputButton
              language={micLanguage}
              onSpeechResult={handleVoiceInput}
              onRecordingStart={handleVoiceStart}
              onRecordingEnd={handleVoiceEnd}
            />

            {/* Send Trigger Capsule Button */}
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                canSend
                  ? 'bg-[#0B2E59] hover:bg-[#133D6B] dark:bg-[#38BDF8] dark:hover:bg-sky-300 text-white dark:text-slate-950 shadow-md hover:scale-105 active:scale-95'
                  : 'bg-gray-100 dark:bg-gray-800/60 text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
              title={canSend ? 'Send query or analyze attached files' : 'Enter a query or attach a file'}
            >
              {isProcessingFiles ? (
                <Lucide.Loader2 size={18} className="animate-spin text-sky-500" />
              ) : (
                <Lucide.ArrowUp size={18} className="stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Discreet Legal Compliance Note */}
      <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 text-center mt-2 tracking-wide select-none">
        {t('chatDisclaimer') || "Prajna-AI provides automated crime analytics & case synthesis. Always verify citations against official CCTNS case diaries."}
      </p>
    </div>
  );
}
