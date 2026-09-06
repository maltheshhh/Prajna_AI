import React, { useState } from 'react';
import { 
  Plus, Search, MessageSquare, Clock, Trash2, ChevronRight, 
  ChevronLeft, Sparkles, Shield, User, Calendar
} from 'lucide-react';
import { ChatSessionRecord } from '@/utils/api';

interface ChatHistorySidebarProps {
  sessions: ChatSessionRecord[];
  activeSessionId: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onSelectSession: (session: ChatSessionRecord) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string, e: React.MouseEvent) => void;
  officerName?: string;
  officerPsId?: string;
}

export function ChatHistorySidebar({
  sessions,
  activeSessionId,
  isOpen,
  onToggle,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  officerName = 'Investigator',
  officerPsId = 'KA-BLR-042'
}: ChatHistorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Defensive array fallback
  const safeSessions = Array.isArray(sessions) ? sessions : [];

  // Filter sessions by search term safely
  const query = searchQuery.toLowerCase();
  const filteredSessions = safeSessions.filter(s => {
    if (!s) return false;
    const title = (s.title || '').toLowerCase();
    const matchesTitle = title.includes(query);
    const matchesMsg = Array.isArray(s.messages) && s.messages.some((m: any) => (m?.content || '').toLowerCase().includes(query));
    return matchesTitle || matchesMsg;
  });

  // Group sessions by date
  const now = new Date();
  const todaySessions: ChatSessionRecord[] = [];
  const pastWeekSessions: ChatSessionRecord[] = [];
  const olderSessions: ChatSessionRecord[] = [];

  filteredSessions.forEach(session => {
    if (!session) return;
    const sessionDate = new Date(session.updatedAt || session.createdAt || Date.now());
    const diffDays = (now.getTime() - sessionDate.getTime()) / (1000 * 3600 * 24);
    if (diffDays < 1) {
      todaySessions.push(session);
    } else if (diffDays < 7) {
      pastWeekSessions.push(session);
    } else {
      olderSessions.push(session);
    }
  });

  if (!isOpen) {
    return (
      <div className="hidden lg:flex flex-col items-center py-4 px-2 border-l border-gray-200 dark:border-blue-900/30 bg-white/50 dark:bg-[#020617]/50 backdrop-blur-md shrink-0">
        <button
          type="button"
          onClick={onToggle}
          className="p-2.5 rounded-xl bg-gray-100 hover:bg-sky-50 text-gray-700 hover:text-sky-600 dark:bg-[#081120] dark:hover:bg-blue-950/40 dark:text-sky-300 transition shadow-xs cursor-pointer"
          title="Open Investigation History"
        >
          <Clock size={18} />
        </button>
        <span className="[writing-mode:vertical-rl] font-mono text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-6 select-none">
          CHAT HISTORY
        </span>
      </div>
    );
  }

  return (
    <aside className="w-80 border-l border-gray-200 dark:border-blue-900/40 bg-gray-50/50 dark:bg-[#030712] flex flex-col h-full shrink-0 select-none z-20 font-sans transition-all">
      {/* Header Bar */}
      <div className="p-4 border-b border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-300">
            <Clock size={16} />
          </div>
          <div>
            <h3 className="font-extrabold text-xs text-[#0B2E59] dark:text-white uppercase tracking-wider">
              Investigation History
            </h3>
            <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
              Badge: <span className="text-sky-600 dark:text-sky-400 font-bold">{officerPsId}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-white transition cursor-pointer"
          title="Collapse History Drawer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Action Bar: New Chat & Search */}
      <div className="p-3.5 space-y-2.5 border-b border-gray-100 dark:border-gray-800/60 bg-gray-50/50 dark:bg-[#050B14]">
        <button
          type="button"
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0B2E59] to-[#133D6B] hover:from-[#133D6B] hover:to-[#0B2E59] text-white text-xs font-bold shadow-sm transition active:scale-[0.98] cursor-pointer"
        >
          <Plus size={15} className="text-sky-300" />
          <span>New Investigation Chat</span>
        </button>

        {/* Search Past Chats */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search past cases & chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-[#081120] border border-gray-200 dark:border-gray-800 rounded-lg text-gray-800 dark:text-gray-200 focus:outline-none focus:border-sky-500 transition"
          />
        </div>
      </div>

      {/* Scrollable History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 text-left">
        {filteredSessions.length === 0 ? (
          <div className="py-12 text-center text-gray-400 dark:text-gray-600 space-y-2 px-4">
            <MessageSquare size={32} className="mx-auto opacity-30" />
            <p className="text-xs font-bold">No investigations found</p>
            <p className="text-[11px] leading-relaxed">
              Start a new chat to begin querying CCTNS records and logging case intelligence.
            </p>
          </div>
        ) : (
          <>
            {/* Today Group */}
            {todaySessions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
                  Today
                </span>
                {todaySessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => onSelectSession(session)}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                  />
                ))}
              </div>
            )}

            {/* Previous 7 Days Group */}
            {pastWeekSessions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
                  Previous 7 Days
                </span>
                {pastWeekSessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => onSelectSession(session)}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                  />
                ))}
              </div>
            )}

            {/* Older Group */}
            {olderSessions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2">
                  Older Investigations
                </span>
                {olderSessions.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onSelect={() => onSelectSession(session)}
                    onDelete={(e) => onDeleteSession(session.id, e)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Officer Profile Info */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/60 dark:bg-[#020617] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2 truncate">
          <div className="h-7 w-7 rounded-full bg-[#0B2E59] text-white flex items-center justify-center font-bold text-xs shrink-0">
            {officerName.charAt(0)}
          </div>
          <div className="truncate">
            <p className="font-bold text-gray-800 dark:text-gray-200 truncate text-[11px]">
              {officerName}
            </p>
            <p className="text-[9px] text-gray-400 font-mono">
              Session Isolated
            </p>
          </div>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-500/20">
          LOGGED IN
        </span>
      </div>
    </aside>
  );
}

function SessionItem({
  session,
  isActive,
  onSelect,
  onDelete
}: {
  session: ChatSessionRecord;
  isActive: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition border ${
        isActive
          ? 'bg-sky-50 border-sky-300 text-sky-900 dark:bg-[#081930] dark:border-sky-500/60 dark:text-white font-bold'
          : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
      }`}
    >
      <div className="flex items-center space-x-2.5 truncate flex-1 pr-2">
        <MessageSquare
          size={14}
          className={`shrink-0 ${
            isActive ? 'text-sky-600 dark:text-sky-300' : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500'
          }`}
        />
        <div className="truncate flex-1">
          <span className="text-xs truncate block font-medium">
            {session.title || 'Untitled Case Query'}
          </span>
          <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 block">
            {new Date(session.updatedAt || session.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {session.messages?.length || 0} msgs
          </span>
        </div>
      </div>

      {/* Delete button on hover */}
      <button
        type="button"
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer"
        title="Delete this chat"
      >
        <Trash2 size={12} />
      </button>
    </div>
  );
}