import React, { useState, useEffect } from 'react';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatHistorySidebar } from '@/components/chat/ChatHistorySidebar';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { ModuleSopGuide } from '@/components/common/ModuleSopGuide';
import { ChatSessionRecord, fetchUserChatHistoryApi, saveChatSessionApi, deleteChatSessionApi } from '@/utils/api';
import { ChatMessage as ChatMessageType } from '@/types';
import * as Lucide from 'lucide-react';

export function ChatbotPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const officerName = user?.name || 'SI Rajesh Kumar';
  const officerPsId = user?.psId || 'KA-BLR-042';
  const storageKey = `ksp_chat_history_${officerPsId}`;

  const [sessions, setSessions] = useState<ChatSessionRecord[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(true);

  // Load officer-isolated chat history on mount or when officer changes
  useEffect(() => {
    loadOfficerHistory();
  }, [officerPsId]);

  async function loadOfficerHistory() {
    try {
      // 1. Try fetching from backend API
      const res = await fetchUserChatHistoryApi(officerPsId);
      if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setSessions(res.data);
        return;
      }
    } catch (err) {
      console.warn('Backend history not reachable, falling back to local vault:', err);
    }

    // 2. Fallback to localStorage isolated by officer PS ID
    const localData = localStorage.getItem(storageKey);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          return;
        }
      } catch {
        // ignore parse error
      }
    }

    // 3. Initial default seed investigations for this officer if first time
    const initialSeed: ChatSessionRecord[] = [
      {
        id: `SESSION-${officerPsId}-1`,
        userId: officerPsId,
        title: 'Burglary Trends in Bengaluru East (Q1)',
        messages: [
          {
            id: '1',
            role: 'user',
            content: 'Show burglary trends in Bengaluru during last 3 months',
            timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
            language: 'en'
          },
          {
            id: '2',
            role: 'assistant',
            content: '### Burglary Trend Analysis (Bengaluru East)\n- Registered Cases: 142\n- Peak Occurrence Hours: 01:00 AM - 04:30 AM\n- Primary Hotspots: Indiranagar 100ft Rd, HRBR Layout, Baiyappanahalli.\n- Modus Operandi: Night house-breaking via balcony sliders.',
            timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
            language: 'en'
          }
        ],
        createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString()
      },
      {
        id: `SESSION-${officerPsId}-2`,
        userId: officerPsId,
        title: 'FIR 7075/2025 Case Synthesis',
        messages: [
          {
            id: '3',
            role: 'user',
            content: 'Generate a summary brief for FIR 7075/2025',
            timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
            language: 'en'
          },
          {
            id: '4',
            role: 'assistant',
            content: '### FIR 7075/2025 Case Abstract\n- Police Station: Ashok Nagar PS, Bengaluru\n- Sections: IPC 379 / BNS 303 (Theft)\n- Accused: Raju K. (Arrested)\n- Status: Chargesheet submitted to 4th ACMM Court.',
            timestamp: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
            language: 'en'
          }
        ],
        createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString()
      },
      {
        id: `SESSION-${officerPsId}-3`,
        userId: officerPsId,
        title: 'Suspect Anil R Associate Network',
        messages: [
          {
            id: '5',
            role: 'user',
            content: 'Show criminal network for suspect Anil R.',
            timestamp: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
            language: 'en'
          },
          {
            id: '6',
            role: 'assistant',
            content: '### Suspect Anil R. Criminal Association Dossier\n- Risk Tier: High (KCOCA Watchlist)\n- Direct Associates: 6 registered offenders across Mysuru and Bengaluru.\n- Primary Operations: Inter-state vehicle lifting and counterfeit registration plates.',
            timestamp: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
            language: 'en'
          }
        ],
        createdAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
        updatedAt: new Date(Date.now() - 3600 * 1000 * 72).toISOString()
      }
    ];

    setSessions(initialSeed);
    localStorage.setItem(storageKey, JSON.stringify(initialSeed));
  }

  // Handle messages change and persist to active session
  const handleMessagesChange = (newMessages: ChatMessageType[] | ((prev: ChatMessageType[]) => ChatMessageType[])) => {
    setMessages((prevMsgs) => {
      const updatedMsgs = typeof newMessages === 'function' ? newMessages(prevMsgs) : newMessages;

      if (updatedMsgs.length === 0) {
        return [];
      }

      // If there's an active session, update it
      if (activeSessionId) {
        const updatedSessions = sessions.map((s) => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: updatedMsgs,
              updatedAt: new Date().toISOString()
            };
          }
          return s;
        });

        setSessions(updatedSessions);
        localStorage.setItem(storageKey, JSON.stringify(updatedSessions));

        const activeSession = updatedSessions.find(s => s.id === activeSessionId);
        if (activeSession) {
          saveChatSessionApi(activeSession).catch(() => {});
        }
      } else {
        // Create new session from first user message
        const firstUserMsg = updatedMsgs.find(m => m.role === 'user');
        const sessionTitle = firstUserMsg 
          ? (firstUserMsg.content.length > 40 ? firstUserMsg.content.substring(0, 40) + '...' : firstUserMsg.content)
          : 'New Investigation';

        const newSessionId = `SESSION-${officerPsId}-${Date.now()}`;
        const newSession: ChatSessionRecord = {
          id: newSessionId,
          userId: officerPsId,
          title: sessionTitle,
          messages: updatedMsgs,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const updatedSessions = [newSession, ...sessions];
        setSessions(updatedSessions);
        setActiveSessionId(newSessionId);
        localStorage.setItem(storageKey, JSON.stringify(updatedSessions));

        saveChatSessionApi(newSession).catch(() => {});
      }

      return updatedMsgs;
    });
  };

  const handleSelectSession = (session: ChatSessionRecord) => {
    setActiveSessionId(session.id);
    setMessages(session.messages || []);
  };

  const handleNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
    localStorage.setItem(storageKey, JSON.stringify(updatedSessions));

    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
      setMessages([]);
    }

    deleteChatSessionApi(sessionId, officerPsId).catch(() => {});
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto font-sans text-xs">
      {/* Page Header Banner */}
      <div className="bg-[#0B2E59] text-white p-6 rounded-2xl shadow-md border-l-4 border-[#8B0000] flex flex-col md:flex-row md:items-center justify-between gap-4 text-left select-none">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight uppercase">{t('chatbotTitle')}</h1>
          <p className="text-xs text-gray-300 mt-1 leading-normal">
            {t('chatbotSubtitle')}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-[#133D6B] px-4 py-2 rounded-xl border border-[#05182E] text-xs self-start md:self-auto">
          <Lucide.MessageSquare size={16} className="text-amber-400" />
          <span className="font-mono text-gray-100 uppercase tracking-wider font-semibold">
            Prajna AI • {officerName}
          </span>
        </div>
      </div>

      {/* Main Conversational Workspace with Right-Side History Drawer */}
      <div className="flex flex-col lg:flex-row gap-0 items-stretch h-[680px] rounded-2xl border border-gray-200 dark:border-blue-900/40 bg-white dark:bg-[#020617] overflow-hidden shadow-md">
        {/* Chat Canvas (Takes full flexible width) */}
        <div className="flex-1 min-w-0 h-full flex flex-col">
          <ChatWindow
            messages={messages}
            onMessagesChange={handleMessagesChange}
            isHistoryOpen={isHistoryOpen}
            onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
            historyCount={sessions.length}
            officerName={officerName}
            onNewChat={handleNewChat}
          />
        </div>

        {/* Right-Side Chat History Drawer */}
        <ChatHistorySidebar
          sessions={sessions}
          activeSessionId={activeSessionId}
          isOpen={isHistoryOpen}
          onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
          onDeleteSession={handleDeleteSession}
          officerName={officerName}
          officerPsId={officerPsId}
        />
      </div>

      {/* Lower Row: Session Intelligence & Helpful Command Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {/* Session Intelligence Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:bg-[#081120] dark:border-blue-900/40 space-y-3">
          <h4 className="font-black text-xs text-[#0B2E59] dark:text-sky-300 border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Lucide.Cpu size={14} className="text-[#38BDF8]" />
            {t('sessionIntel')}
          </h4>
          <div className="space-y-2 text-xs leading-snug">
            <div className="flex justify-between py-1 border-b border-gray-100/60 dark:border-gray-800/40">
              <span className="text-gray-600 dark:text-gray-400 font-medium">{t('sessionId')}:</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white">KSP-RAG-{officerPsId}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100/60 dark:border-gray-800/40">
              <span className="text-gray-600 dark:text-gray-400 font-medium">{t('serverLatency')}:</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">~1200ms (LLM)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600 dark:text-gray-400 font-medium">{t('model')}:</span>
              <span className="font-mono font-bold text-sky-600 dark:text-sky-300">Quick ML GLM-4.7 Flash</span>
            </div>
          </div>
        </div>

        {/* Helpful Command Tips Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:bg-[#081120] dark:border-blue-900/40 space-y-3">
          <h4 className="font-black text-xs text-[#0B2E59] dark:text-sky-300 border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-1.5 uppercase tracking-wider">
            <Lucide.Sparkles size={14} className="text-amber-400" />
            {t('helpfulTips')}
          </h4>
          <ul className="list-disc pl-4 space-y-2 text-xs leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
            <li>{t('tip1')}</li>
            <li>{t('tip2')}</li>
            <li>{t('tip3')}</li>
          </ul>
        </div>
      </div>

      {/* Operating Instructions / SOP Guide */}
      <ModuleSopGuide
        moduleName="Prajna AI Chatbot & Semantic Crime Assistant"
        department="State Crime Records Bureau & Intelligence Wing"
        legalAuthority="Section 91 CrPC / Section 94 BNSS & CCTNS Integration Mandate"
        purpose="Conversational RAG assistant connected to CCTNS database for instantaneous FIR retrieval, suspect cross-referencing, and natural language crime query generation."
        steps={[
          {
            step: "01",
            action: "FIR & Case Querying",
            detail: "Type any natural query or exact FIR identifier (e.g., 'FIR 0012/2026') to automatically generate structured case abstracts and investigator notes."
          },
          {
            step: "02",
            action: "Suspect Cross-Referencing",
            detail: "Ask by suspect name or alias (e.g., 'Show criminal history for Raju K') to retrieve MO matching, known associates, and active arrest warrants."
          },
          {
            step: "03",
            action: "Analytical Chart Generation",
            detail: "Prompt for statistical breakdowns (e.g., 'Show burglary trends in Bengaluru') to generate inline interactive bar and trend charts directly in chat."
          }
        ]}
        tacticalTips={[
          "Use the right-side History Drawer to resume previous investigation case sessions or start a new chat.",
          "Use exact FIR formats like 'KA/BLR/2026/001' for sub-second deterministic document retrieval.",
          "Export full chat transcripts to PDF for attachment with formal case diary entries."
        ]}
      />
    </div>
  );
}
