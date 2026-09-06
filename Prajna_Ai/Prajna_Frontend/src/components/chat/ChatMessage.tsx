import { useState } from 'react';
import { ChatMessage as ChatMessageType, ChatAttachment } from '@/types';
import { AIResponseCard } from './AIResponseCard';
import { PrajnaLadyAvatar, PoliceOfficerAvatar, detectOfficerGender } from './ChatAvatars';
import { useAuth } from '@/context/AuthContext';
import * as Lucide from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  onExportPDF?: () => void;
  onSaveReport?: () => void;
  officerName?: string;
  explicitGender?: string;
}

export function ChatMessage({ 
  message, 
  onExportPDF, 
  onSaveReport, 
  officerName: propOfficerName,
  explicitGender
}: ChatMessageProps) {
  const { user } = useAuth();
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  const officerName = propOfficerName || user?.name || 'SI Rajesh Kumar';
  const officerGender = detectOfficerGender(officerName, explicitGender || (user as any)?.gender);

  if (isSystem) {
    return (
      <div className="flex justify-center my-2 select-none">
        <div className="rounded-full bg-gray-100 dark:bg-blue-950/40 border border-gray-200 dark:border-blue-900/40 px-3 py-1 font-mono text-[9px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest">
          {message.content}
        </div>
      </div>
    );
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const renderAttachments = (attachments: ChatAttachment[]) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800/60 space-y-2">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          <Lucide.Paperclip size={12} className="text-sky-500" />
          <span>Attached Case Files & Evidence ({attachments.length})</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {attachments.map((att) => {
            const isImg = att.type === 'image' && att.dataUrl;

            if (isImg) {
              return (
                <div
                  key={att.id}
                  onClick={() => setSelectedImagePreview(att.dataUrl || null)}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-blue-900/60 bg-gray-50 dark:bg-[#071224] p-2 hover:border-sky-500 transition-all cursor-pointer shadow-xs"
                >
                  <div className="relative h-28 w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                    <img
                      src={att.dataUrl}
                      alt={att.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white">
                        <Lucide.ZoomIn size={12} /> View Full
                      </span>
                    </div>
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="truncate text-[11px] font-bold text-gray-800 dark:text-gray-200" title={att.name}>
                      {att.name}
                    </span>
                    <span className="font-mono text-[9px] text-gray-400 dark:text-gray-500 shrink-0 ml-2">
                      {formatFileSize(att.size)}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={att.id}
                className="flex items-center gap-2.5 rounded-xl border border-gray-200 dark:border-blue-900/60 bg-gray-50 dark:bg-[#071224] p-2 hover:border-sky-500 transition-all shadow-xs"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 shrink-0">
                  {att.type === 'pdf' ? (
                    <Lucide.FileText size={18} />
                  ) : (
                    <Lucide.FileSpreadsheet size={18} className="text-sky-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-bold text-gray-800 dark:text-gray-200" title={att.name}>
                    {att.name}
                  </p>
                  <p className="text-[9px] font-mono text-gray-400 dark:text-gray-500">
                    <span className="uppercase text-sky-600 dark:text-sky-400 font-semibold">{att.type}</span> • {formatFileSize(att.size)}
                  </p>
                </div>
                {att.dataUrl && (
                  <a
                    href={att.dataUrl}
                    download={att.name}
                    className="p-1.5 text-gray-400 hover:text-sky-500 transition cursor-pointer"
                    title="Download file"
                  >
                    <Lucide.Download size={14} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`flex w-full my-4 gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* AI Lady Avatar on the left */}
      {!isUser && (
        <div className="flex flex-col items-center pt-1">
          <PrajnaLadyAvatar size="md" />
        </div>
      )}

      {/* Main Message Card Container */}
      <div 
        className={`w-full max-w-2xl rounded-2xl border p-4.5 shadow-sm transition-all duration-300 ${
          isUser 
            ? 'bg-sky-50/70 border-sky-200 text-gray-800 rounded-tr-none dark:bg-[#081528] dark:border-sky-500/30 dark:text-white' 
            : 'bg-white border-gray-200 rounded-tl-none border-l-4 border-l-[#0B2E59] dark:bg-[#081120] dark:border-blue-900/50 dark:border-l-[#38BDF8]'
        }`}
      >
        {/* Top Header of the bubble */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <div>
              <span className="font-extrabold text-xs uppercase tracking-wider text-[#0B2E59] dark:text-sky-300 flex items-center gap-1.5">
                {isUser ? officerName : 'PRAJNA BOT (ಪ್ರಜ್ಞಾ)'}
              </span>
              <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 block">
                {isUser ? 'Karnataka State Police • Duty Officer' : 'QuickML Crime Intelligence Copilot'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 select-none">
            <span className="rounded-full bg-gray-100 dark:bg-blue-950/60 px-2 py-0.5 font-mono text-[9px] font-bold text-gray-600 dark:text-sky-300 border border-transparent dark:border-blue-900/40 uppercase">
              {message.language === 'kn' ? 'KANNADA' : message.language === 'hi' ? 'HINDI' : 'ENGLISH'}
            </span>
            <span className="font-mono text-[9px] text-gray-400 dark:text-gray-500">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Message Body Content */}
        {isUser ? (
          <div>
            <p className="text-xs md:text-sm leading-relaxed font-medium whitespace-pre-line text-gray-800 dark:text-gray-100">
              {message.content}
            </p>
            {renderAttachments(message.attachments || [])}
          </div>
        ) : (
          <div>
            <AIResponseCard 
              message={message} 
              onExportPDF={onExportPDF} 
              onSaveReport={onSaveReport} 
            />
            {renderAttachments(message.attachments || [])}
          </div>
        )}
      </div>

      {/* Police Officer Avatar (Male / Female) on the right */}
      {isUser && (
        <div className="flex flex-col items-center pt-1">
          <PoliceOfficerAvatar gender={officerGender} size="md" />
        </div>
      )}

      {/* Image Zoom Modal */}
      {selectedImagePreview && (
        <div
          onClick={() => setSelectedImagePreview(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs transition-opacity"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-black border border-gray-800 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSelectedImagePreview(null)}
              className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black transition cursor-pointer"
            >
              <Lucide.X size={18} />
            </button>
            <img
              src={selectedImagePreview}
              alt="Evidence preview"
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
