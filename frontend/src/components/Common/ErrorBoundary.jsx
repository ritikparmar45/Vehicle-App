import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Uncaught React UI error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full glass-dark border border-white/10 p-10 rounded-[2.5rem] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto text-rose-400">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-heading font-black tracking-tight">Something Went Wrong</h2>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                An unforeseen interface exception occurred. The system has safely halted rendering.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3.5 px-5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={14} /> Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-3.5 px-5 bg-accent-primary hover:bg-accent-primary/90 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2"
              >
                <Home size={14} /> Return Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
