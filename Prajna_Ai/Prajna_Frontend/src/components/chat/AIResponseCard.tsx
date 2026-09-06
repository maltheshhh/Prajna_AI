import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/types';
import { ChatSuspectMatchCard } from './ChatSuspectMatchCard';
import * as Lucide from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AIResponseCardProps {
  message: ChatMessage;
  onExportPDF?: () => void;
  onSaveReport?: () => void;
}

export function AIResponseCard({ message, onExportPDF, onSaveReport }: AIResponseCardProps) {
  const [showReasoning, setShowReasoning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const isSpeakingRef = useRef(false);
  const audioQueueRef = useRef<HTMLAudioElement[]>([]);

  // Populate browser voice list
  useEffect(() => {
    if (!window.speechSynthesis) return;
    const update = () => setVoices(window.speechSynthesis.getVoices());
    update();
    window.speechSynthesis.onvoiceschanged = update;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Split text into chunks ≤ 180 chars at sentence boundaries
  const chunkText = (text: string): string[] => {
    const parts = text.split(/(?<=[।.!?,;])\s+/);
    const chunks: string[] = [];
    let buf = '';
    for (const p of parts) {
      if ((buf + p).length > 180 && buf.length > 0) {
        chunks.push(buf.trim());
        buf = p;
      } else {
        buf += (buf ? ' ' : '') + p;
      }
    }
    if (buf.trim()) chunks.push(buf.trim());
    return chunks.length > 0 ? chunks : [text];
  };

  // Play Hindi/Kannada: pre-buffer direct audio elements, play in order
  const playIndicTTS = (text: string, lang: string) => {
    const chunks = chunkText(text);
    isSpeakingRef.current = true;
    setIsSpeaking(true);

    // Pre-create and start buffering all chunks in parallel directly from Google
    const audios = chunks.map(chunk => {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(chunk)}`;
      const audio = new Audio(url);
      audio.preload = 'auto'; // Request browser to pre-buffer
      return audio;
    });

    audioQueueRef.current = audios;

    const playChunk = (index: number) => {
      if (index >= audios.length || !isSpeakingRef.current) {
        isSpeakingRef.current = false;
        setIsSpeaking(false);
        return;
      }

      const audio = audios[index];
      
      audio.onended = () => {
        playChunk(index + 1);
      };
      
      audio.onerror = (e) => {
        console.error("[TTS] Direct audio chunk error, skipping...", e);
        playChunk(index + 1);
      };

      audio.play().catch(err => {
        console.error("[TTS] Play failed:", err);
        playChunk(index + 1);
      });
    };

    playChunk(0);
  };

  const handleSpeak = () => {
    // --- STOP ---
    if (isSpeaking) {
      isSpeakingRef.current = false;
      audioQueueRef.current.forEach(a => { a.pause(); a.src = ''; });
      audioQueueRef.current = [];
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown / headers from the text
    const cleanText = message.content
      .replace(/###/g, '')
      .replace(/\*\*/g, '')
      .replace(/\[PRAJNA-TRANSLATION PIPELINE \/ [^\]]+\]\s*(\(supported by external feature\))?/gi, '')
      .replace(/\|/g, ' ')
      .replace(/\*/g, ' ')
      .replace(/\n+/g, '. ')
      .trim();

    if (!cleanText) return;

    // --- HINDI / KANNADA → Google TTS via proxy (no CORS, no local packs needed) ---
    if (message.language === 'hi' || message.language === 'kn') {
      playIndicTTS(cleanText, message.language);
      return;
    }

    // --- ENGLISH → Browser speech synthesis ---
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-IN';
    const voiceList = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
    const enVoice =
      voiceList.find(v => v.lang.toLowerCase().replace('_', '-') === 'en-in') ||
      voiceList.find(v => v.lang.toLowerCase().startsWith('en'));
    if (enVoice) { utterance.voice = enVoice; utterance.lang = enVoice.lang; }
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => { isSpeakingRef.current = false; setIsSpeaking(false); };
    utterance.onerror = () => { isSpeakingRef.current = false; setIsSpeaking(false); };
    isSpeakingRef.current = true;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getSeverityBadgeColor = (score: number) => {
    if (score >= 85) return 'bg-green-100 text-green-800 dark:bg-green-950/30 dark:text-green-300';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300';
  };

  const getSourceIcon = (relevance: number) => {
    if (relevance > 90) return <Lucide.ShieldAlert className="h-3.5 w-3.5 text-ksp-red shrink-0" />;
    return <Lucide.Shield className="h-3.5 w-3.5 text-ksp-navy dark:text-sky-300 shrink-0" />;
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Suspect Match Dossier Card (if biometric or suspect search matched) */}
      {message.suspectMatch && (
        <ChatSuspectMatchCard match={message.suspectMatch} />
      )}

      {/* Summary Content */}
      <div className="prose prose-sm max-w-none dark:prose-invert text-ksp-gray-800 dark:text-ksp-gray-100">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>

      {/* Render Inline Recharts Visualizations */}
      {message.charts && message.charts.map((chart, idx) => (
        <div key={idx} className="my-4 border border-ksp-gray-100 rounded-lg bg-slate-50 p-4 dark:bg-ksp-navy-dark/40 dark:border-ksp-navy-light shadow-xs">
          <h4 className="font-mono font-bold text-ksp-navy dark:text-sky-300 mb-3 text-center uppercase tracking-wide">
            {chart.title}
          </h4>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chart.type === 'bar' ? (
                <BarChart data={chart.data} margin={{ left: -25, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B0000" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : chart.type === 'line' ? (
                <LineChart data={chart.data} margin={{ left: -25, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#0B2E59" strokeWidth={2} />
                </LineChart>
              ) : (
                <PieChart>
                  <Tooltip />
                  <Pie
                    data={chart.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="count"
                  >
                    {chart.data.map((_, i) => (
                      <Cell key={`cell-${i}`} fill={i % 2 === 0 ? '#0B2E59' : '#8B0000'} />
                    ))}
                  </Pie>
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      ))}

      {/* Citations section */}
      {message.citations && message.citations.length > 0 && (
        <div className="border border-ksp-gray-100 rounded bg-white p-3 dark:bg-ksp-navy-dark dark:border-ksp-navy-light">
          <div className="flex items-center space-x-2 font-bold text-ksp-navy dark:text-sky-300 border-b pb-2 mb-2">
            <Lucide.FileSpreadsheet className="h-4 w-4" />
            <span>OFFICIAL CRIME DATA SOURCE CITED ({message.citations.length} RECORDS)</span>
          </div>
          <div className="space-y-2">
            {message.citations.map((c, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-ksp-gray-50 dark:bg-ksp-navy-light/20 hover:bg-ksp-gray-100 transition">
                <div className="flex items-center space-x-2">
                  {getSourceIcon(c.relevanceScore)}
                  <span className="font-mono font-bold text-ksp-gray-800 dark:text-ksp-gray-200">
                    FIR {c.firNumber}
                  </span>
                  <span className="text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300">
                    ({c.policeStation})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-ksp-gray-200 h-1.5 rounded-full overflow-hidden dark:bg-ksp-navy-light">
                    <div className="bg-ksp-success h-full" style={{ width: `${c.relevanceScore}%` }} />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-ksp-success">{c.relevanceScore}% match</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confidence score & audit badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-ksp-gray-100 pt-3 dark:border-ksp-navy-light">
        <div className="flex items-center space-x-3">
          {message.confidence && (
            <div className="flex items-center space-x-1">
              <span className="text-ksp-gray-600 dark:text-ksp-gray-300">AI Confidence:</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${getSeverityBadgeColor(message.confidence)}`}>
                {message.confidence}%
              </span>
            </div>
          )}
          {message.auditId && (
            <div className="flex items-center space-x-1 font-mono text-[10px] text-ksp-gray-600 dark:text-ksp-gray-300">
              <Lucide.Shield className="h-3.5 w-3.5 text-ksp-navy dark:text-sky-300 shrink-0" />
              <span>Audit: {message.auditId}</span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSpeak}
            className={`flex items-center gap-1 rounded border px-2 py-1 hover:shadow-xs transition ${
              isSpeaking
                ? 'border-ksp-red bg-red-50 text-ksp-red dark:bg-red-950/20'
                : 'border-ksp-gray-300 hover:border-ksp-navy dark:text-white dark:border-ksp-navy-light'
            }`}
            title={isSpeaking ? 'Stop speaking' : 'Speak response'}
          >
            {isSpeaking ? (
              <>
                <Lucide.VolumeX className="h-3.5 w-3.5 text-ksp-red animate-pulse" /> Stop
              </>
            ) : (
              <>
                <Lucide.Volume2 className="h-3.5 w-3.5" /> Speak {message.language !== 'en' ? '(supported by external feature)' : ''}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onExportPDF}
            className="flex items-center gap-1 rounded border border-ksp-gray-300 hover:border-ksp-navy px-2 py-1 hover:shadow-xs transition dark:text-white dark:border-ksp-navy-light"
          >
            <Lucide.FileDown className="h-3.5 w-3.5" /> PDF
          </button>
          <button
            type="button"
            onClick={onSaveReport}
            className="flex items-center gap-1 rounded border border-ksp-gray-300 hover:border-ksp-navy px-2 py-1 hover:shadow-xs transition dark:text-white dark:border-ksp-navy-light"
          >
            <Lucide.Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>
      </div>

      {/* Explainable AI section */}
      <div className="border-t border-ksp-gray-100 pt-3 dark:border-ksp-navy-light">
        <button
          type="button"
          onClick={() => setShowReasoning(!showReasoning)}
          className="flex items-center gap-1 text-[10px] font-bold text-ksp-navy dark:text-sky-300 hover:underline"
        >
          {showReasoning ? <Lucide.ChevronUp className="h-3.5 w-3.5" /> : <Lucide.ChevronDown className="h-3.5 w-3.5" />}
          <span>{showReasoning ? 'HIDE AI REASONING METADATA' : 'EXPLAINABLE AI: VIEW REASONING METADATA'}</span>
        </button>
        {showReasoning && (
          <div className="mt-2 rounded bg-ksp-gray-50 p-2.5 font-mono text-[10px] text-ksp-gray-600 dark:bg-ksp-navy-dark dark:border dark:border-ksp-navy-light leading-relaxed dark:text-ksp-gray-200">
            <ul className="list-disc pl-4 space-y-1">
              <li>Scanned 1,000 JSON documents in Catalyst NoSQL.</li>
              <li>Filtered vectors using Claude API keyphrase matches.</li>
              <li>Extracted matching records mapping specific modus operandi.</li>
              <li>Citations matched to standard SCRB CCTNS database schemas.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
