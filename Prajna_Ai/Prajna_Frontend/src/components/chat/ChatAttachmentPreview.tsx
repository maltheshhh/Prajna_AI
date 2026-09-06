import React from 'react';
import { ChatAttachment } from '@/types';
import * as Lucide from 'lucide-react';

interface ChatAttachmentPreviewProps {
  attachments: ChatAttachment[];
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function ChatAttachmentPreview({ attachments, onRemove, disabled = false }: ChatAttachmentPreviewProps) {
  if (attachments.length === 0) return null;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-wrap gap-2 px-3 py-2 border-b border-gray-100 dark:border-blue-900/30 bg-gray-50/70 dark:bg-[#050c18]/80 rounded-t-2xl">
      {attachments.map((file) => {
        const isImage = file.type === 'image' && file.dataUrl;

        return (
          <div
            key={file.id}
            className="group relative flex items-center gap-2 rounded-xl border border-gray-200 dark:border-blue-800/60 bg-white dark:bg-[#0c182e] p-1.5 pr-2.5 shadow-xs transition-all hover:border-sky-400 dark:hover:border-sky-500 max-w-xs"
          >
            {isImage ? (
              <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-gray-200 dark:border-blue-900/50 bg-gray-100 dark:bg-gray-800 shrink-0">
                <img
                  src={file.dataUrl}
                  alt={file.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 dark:bg-blue-950/60 text-sky-600 dark:text-sky-300 border border-sky-200 dark:border-blue-900/50 shrink-0">
                {file.type === 'pdf' ? (
                  <Lucide.FileText size={20} className="text-red-500" />
                ) : (
                  <Lucide.FileSpreadsheet size={20} className="text-sky-500" />
                )}
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-bold text-gray-800 dark:text-gray-200 max-w-[140px]" title={file.name}>
                {file.name}
              </p>
              <div className="flex items-center gap-1.5 text-[9px] text-gray-400 dark:text-gray-500 font-mono">
                <span className="uppercase font-semibold text-sky-600 dark:text-sky-400">
                  {file.type}
                </span>
                <span>•</span>
                <span>{formatFileSize(file.size)}</span>
              </div>
            </div>

            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(file.id);
                }}
                className="h-5 w-5 rounded-full bg-gray-100 dark:bg-blue-950/80 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 text-gray-400 dark:text-gray-400 flex items-center justify-center transition-colors cursor-pointer"
                title="Remove attachment"
              >
                <Lucide.X size={12} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
