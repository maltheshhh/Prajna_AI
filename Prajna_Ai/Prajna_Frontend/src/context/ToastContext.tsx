import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextType {
  showToast: (options: ToastOptions | string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions | string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const toast: ToastItem = typeof options === 'string'
      ? { id, message: options, type: 'info', duration: 4000 }
      : { id, type: 'info', duration: 4000, ...options };

    setToasts((prev) => [...prev, toast]);

    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none px-4">
        {toasts.map((toast) => {
          const type = toast.type || 'info';
          const bgColors = {
            success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100',
            error: 'bg-rose-950/90 border-rose-500/50 text-rose-100',
            warning: 'bg-amber-950/90 border-amber-500/50 text-amber-100',
            info: 'bg-slate-900/95 border-sky-500/50 text-sky-100',
          }[type];

          const iconColors = {
            success: 'text-emerald-400',
            error: 'text-rose-400',
            warning: 'text-amber-400',
            info: 'text-sky-400',
          }[type];

          const IconComponent = {
            success: CheckCircle2,
            error: AlertCircle,
            warning: AlertTriangle,
            info: Info,
          }[type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 transform translate-y-0 ${bgColors}`}
              role="alert"
            >
              <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${iconColors}`} />
              <div className="flex-1 min-w-0">
                {toast.title && (
                  <h4 className="text-sm font-bold tracking-wide uppercase">{toast.title}</h4>
                )}
                <p className="text-xs font-medium opacity-90 leading-relaxed mt-0.5">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (opts) => {
        if (typeof opts === 'string') {
          console.log('[Toast]:', opts);
        } else {
          console.log(`[Toast ${opts.type || 'info'}]:`, opts.title || '', opts.message);
        }
      }
    };
  }
  return context;
};
