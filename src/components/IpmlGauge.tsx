import React from 'react';
import { IPMLScore } from '../types';
import { Gauge, Calculator, CheckCircle2, AlertTriangle, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';

interface IpmlGaugeProps {
  ipml: IPMLScore;
}

export const IpmlGauge: React.FC<IpmlGaugeProps> = ({ ipml }) => {
  const score = Math.min(Math.max(ipml.score, 0), 100);

  // Status visual logic
  // Score > 70: High pressure / bullish
  // Score 45-70: Moderate / neutral
  // Score < 45: Bearish
  const isHigh = score >= 70;
  const isModerate = score >= 45 && score < 70;
  const isLow = score < 45;

  const theme = isHigh
    ? {
        badgeBg: 'bg-emerald-950 text-emerald-400 border-emerald-800',
        scoreText: 'text-emerald-400',
        ringGradient: 'from-emerald-500 via-teal-400 to-cyan-500',
        glow: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
        statusBg: 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
      }
    : isModerate
    ? {
        badgeBg: 'bg-amber-950 text-amber-400 border-amber-800',
        scoreText: 'text-amber-400',
        ringGradient: 'from-amber-500 via-yellow-400 to-orange-500',
        glow: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
        statusBg: 'bg-amber-950/60 border-amber-800/80 text-amber-300'
      }
    : {
        badgeBg: 'bg-rose-950 text-rose-400 border-rose-800',
        scoreText: 'text-rose-400',
        ringGradient: 'from-rose-500 via-red-400 to-pink-500',
        glow: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]',
        statusBg: 'bg-rose-950/60 border-rose-800/80 text-rose-300'
      };

  return (
    <section className="mb-6" id="ipml-score">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 font-extrabold shadow-inner shrink-0">
              <Gauge className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  INDICADOR PREDITIVO
                </span>
                <span className="text-[10px] font-mono text-slate-400">MODELO MATEMÁTICO ALGORÍTMICO</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mt-0.5">
                IPML — Índice de Pressão do Mercado Leiteiro
              </h2>
            </div>
          </div>

          <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold ${theme.badgeBg}`}>
            {ipml.statusLabel || `NOTA ${score}/100`}
          </div>
        </div>

        {/* Grid: Left Large Gauge / Right Scoring Breakdown Factors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* LEFT: Large Gauge & Score Display (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800/90 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden text-center shadow-inner">
            <div className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest mb-3">
              PRESSÃO PONDERADA DO MERCADO
            </div>

            {/* Circular score display */}
            <div className="relative w-44 h-44 flex items-center justify-center my-2">
              <div className={`absolute inset-0 rounded-full border-4 border-slate-800 p-2 ${theme.glow}`}>
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-tr ${theme.ringGradient} opacity-20 animate-pulse`}
                ></div>
              </div>
              <div className="flex flex-col items-center justify-center z-10">
                <span className="text-5xl font-black font-mono text-white tracking-tight">
                  {score}
                </span>
                <span className="text-xs font-mono font-extrabold text-slate-400 tracking-wider uppercase mt-1">
                  PONTOS (0 - 100)
                </span>
              </div>
            </div>

            {/* Gauge Track Bar */}
            <div className="w-full mt-4">
              <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-700/80 relative">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.ringGradient} transition-all duration-1000`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500 font-bold mt-1.5 px-1">
                <span className="text-rose-400">0 (Baixista)</span>
                <span className="text-amber-400">50 (Equilíbrio)</span>
                <span className="text-emerald-400">100 (Altista)</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-normal font-medium bg-slate-900/80 px-3 py-2 rounded-lg border border-slate-800">
              Reflete a força agregada de compra dos laticínios (Italac, Piracanjuba) versus captação e custos de insumos.
            </p>
          </div>

          {/* RIGHT: Explicit Mathematical Factor List (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-cyan-400" />
                Composição Matemática da Nota ({ipml.factors.length} Fatores)
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Soma Algorítmica</span>
            </div>

            <div className="space-y-2.5">
              {ipml.factors.map((factor, idx) => {
                const isPos = factor.points > 0;
                const isNeg = factor.points < 0;

                return (
                  <div
                    key={idx}
                    className="bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isPos
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : isNeg
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {isPos ? '+' : ''}{factor.points}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-100 block">
                          {factor.label}
                        </span>
                        {factor.explanation && (
                          <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                            {factor.explanation}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                        isPos
                          ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                          : isNeg
                          ? 'text-rose-400 bg-rose-950/60 border border-rose-800/50'
                          : 'text-slate-400 bg-slate-800'
                      }`}>
                        {isPos && <ArrowUpRight className="w-3.5 h-3.5" />}
                        {isNeg && <ArrowDownRight className="w-3.5 h-3.5" />}
                        {isPos ? `+${factor.points} pts` : `${factor.points} pts`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Pesos: Leite Spot (35%) • Captação (30%) • Insumos B3 (20%) • Câmbio (15%)
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
