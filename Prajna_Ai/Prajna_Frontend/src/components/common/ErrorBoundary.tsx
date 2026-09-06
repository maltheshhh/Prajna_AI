import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-lg border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800 text-red-900 dark:text-red-200 text-xs space-y-2 select-none">
          <div className="flex items-center gap-2 font-bold text-red-800 dark:text-red-300">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-600" />
            <span>{this.props.fallbackTitle || 'Component Error'}</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            {this.props.fallbackMessage || 'An unexpected rendering error occurred. You can retry reload or reset this view.'}
          </p>
          {this.state.error && (
            <div className="font-mono text-[9.5px] bg-red-100/80 dark:bg-red-900/40 p-2 rounded overflow-x-auto text-red-800 dark:text-red-200">
              {this.state.error.message}
            </div>
          )}
          <button
            type="button"
            onClick={this.handleReset}
            className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <RefreshCw size={11} /> Retry View
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
