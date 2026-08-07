import React from 'react';
import { TickerItem } from '../types';
import { Terminal, Activity, RefreshCw, Sliders, Zap, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TerminalHeaderProps {
  dateStr: string;
  tickers: TickerItem[];
  timestamp: string;
  isAnalyzing: boolean;
  isFallback?: boolean;
  onOpenPresets: () => void;
  onOpenCustomInput: () => void;
  onRefresh: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  dateStr,
  tickers,
  timestamp,
  isAnalyzing,
  isFallback,
  onOpenPresets,
  onOpenCustomInput,
  onRefresh
}) => {
  return (
    <header className="bg-slate-950 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-xl">
      {/* Top Ticker Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-6 text-xs font-mono whitespace-nowrap max-w-7xl mx-auto">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold shrink-0 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            LIVE TICKER B3 & SPOT:
          </div>
          {tickers?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 shrink-0 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
              <span className="text-slate-400 font-semibold">{item.label}:</span>
              <span className="font-bold text-slate-100">{item.value}</span>
              <span className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded ${
                item.status === 'up'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  : item.status === 'down'
                  ? 'bg-rose-950 text-rose-400 border border-rose-800/60'
                  : 'bg-slate-800 text-slate-300'
              }`}>
                {item.status === 'up' && <TrendingUp className="w-3 h-3" />}
                {item.status === 'down' && <TrendingDown className="w-3 h-3" />}
                {item.status === 'stable' && <Minus className="w-3 h-3" />}
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Terminal Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Brand & Date */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/20 shrink-0 font-black">
              <Terminal className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                  TERMINAL BLOOMBERG • LEITE CRU
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> FOCO ITALAC
                </span>
                {isFallback && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    MODO OFFLINE
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2 mt-0.5">
                Terminal de Inteligência Preditiva
                <span className="text-xs font-mono font-normal text-slate-400 hidden sm:inline-block">
                  v4.0 • {timestamp || 'Atualizado'}
                </span>
              </h1>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="hidden lg:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>{dateStr}</span>
            </div>

            <button
              onClick={onOpenPresets}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5 transition shadow-sm hover:border-slate-500"
              title="Alternar cenários pré-configurados"
            >
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cenários</span>
            </button>

            <button
              onClick={onOpenCustomInput}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 transition shadow-md shadow-cyan-600/20"
              title="Analisar novo texto de mercado"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Simular com IA</span>
            </button>

            <button
              onClick={onRefresh}
              disabled={isAnalyzing}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition disabled:opacity-50"
              title="Atualizar dados"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
