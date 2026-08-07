import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface FastDecisionHeaderProps {
  summary3Lines: [string, string, string];
  dateStr: string;
}

export const FastDecisionHeader: React.FC<FastDecisionHeaderProps> = ({ summary3Lines, dateStr }) => {
  return (
    <section className="mb-6" id="decisao-rapida">
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800/90 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 font-bold shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                SÍNTESE EXECUTIVA DE DECISÃO RÁPIDA (LEITURA &lt; 1 MINUTO)
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                O que esperar do mercado hoje?
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800/80 shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{dateStr}</span>
          </div>
        </div>

        {/* 3-Line Structured AI Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {summary3Lines.map((lineText, idx) => (
            <div
              key={idx}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 p-4 rounded-xl transition duration-200 relative group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-900">
                  {idx === 0 ? '1. OFERTA & CAMPO' : idx === 1 ? '2. ITALAC & INDÚSTRIA' : '3. PREÇO & TENDÊNCIA'}
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">#LINE_0{idx + 1}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {lineText}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  Alta Confiabilidade
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
