import React from 'react';
import { ImpactRadarCard, WeeklyTimelineEvent } from '../types';
import { Radio, CalendarDays, TrendingUp, TrendingDown, Minus, Clock, ShieldCheck, Flame, Star } from 'lucide-react';

interface ImpactRadarAndTimelineProps {
  radarCards: ImpactRadarCard[];
  timeline: WeeklyTimelineEvent[];
}

export const ImpactRadarAndTimeline: React.FC<ImpactRadarAndTimelineProps> = ({ radarCards, timeline }) => {
  return (
    <section className="mb-8" id="radar-linha-do-tempo">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT / MAIN: RADAR DE IMPACTO COM SCORE 0-10 E DIREÇÃO (8 Cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 font-extrabold shrink-0">
                  <Radio className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    RADAR PREDITIVO DE IMPACTO
                  </span>
                  <h3 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
                    Notícias & Acontecimentos de Maior Peso Comercial
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 hidden sm:inline-block">
                Score Ponderado de 0 a 10
              </span>
            </div>

            {/* Radar Cards Grid */}
            <div className="space-y-3.5">
              {radarCards.map((item) => {
                const isHigh = item.direction === 'alta';
                const isLow = item.direction === 'baixa';

                return (
                  <div
                    key={item.id}
                    className="bg-slate-950/90 hover:bg-slate-950 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 transition shadow-md group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Direction Badge */}
                        <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full border ${
                          isHigh
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : isLow
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}>
                          {isHigh && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                          {isLow && <TrendingDown className="w-3 h-3 text-rose-400" />}
                          {!isHigh && !isLow && <Minus className="w-3 h-3 text-amber-400" />}
                          {isHigh ? '🟢 Alta' : isLow ? '🔴 Baixa' : '🟡 Neutro'}
                        </span>

                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.category}
                        </span>

                        <span className="text-[10px] font-mono text-slate-500">
                          {item.source} • {item.publishedTime}
                        </span>
                      </div>

                      {/* Impact Score Display (0 to 10) */}
                      <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-lg shrink-0 self-start sm:self-auto">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-mono font-extrabold text-white">
                          Score {item.impactScore.toFixed(1)} <span className="text-slate-500 font-normal">/ 10</span>
                        </span>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Algoritmo de Filtragem e Validação de Notícias</span>
            <span className="text-cyan-400 font-bold">4 Eventos Relevantes</span>
          </div>
        </div>

        {/* RIGHT / SIDEBAR: LINHA DO TEMPO SEMANAL VERTICAL (4 Cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 font-extrabold shrink-0">
                  <CalendarDays className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    SÉRIE SEMANAL
                  </span>
                  <h3 className="text-lg font-extrabold text-white tracking-tight mt-0.5">
                    Linha do Tempo
                  </h3>
                </div>
              </div>

              <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800 font-bold">
                SEG - SEX
              </span>
            </div>

            {/* Vertical Timeline Items */}
            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {timeline.map((evt, idx) => {
                const isHigh = evt.direction === 'alta';
                const isLow = evt.direction === 'baixa';

                return (
                  <div key={idx} className="relative group">
                    {/* Timeline Pin */}
                    <div className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 ${
                      evt.isToday
                        ? 'bg-cyan-400 border-white ring-4 ring-cyan-500/20 animate-pulse'
                        : isHigh
                        ? 'bg-emerald-500 border-slate-900'
                        : isLow
                        ? 'bg-rose-500 border-slate-900'
                        : 'bg-amber-500 border-slate-900'
                    }`}></div>

                    <div className={`p-3 rounded-xl border transition ${
                      evt.isToday
                        ? 'bg-cyan-950/40 border-cyan-700/80'
                        : 'bg-slate-950/80 border-slate-800'
                    }`}>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-mono font-extrabold text-amber-400">
                          {evt.day} ({evt.dateStr})
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                          isHigh
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                            : isLow
                            ? 'bg-rose-950 text-rose-400 border border-rose-900'
                            : 'bg-amber-950 text-amber-400 border border-amber-900'
                        }`}>
                          {evt.impactTag}
                        </span>
                      </div>

                      <p className="text-xs text-slate-200 font-medium leading-tight">
                        {evt.eventTitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>Eventos Macro da Semana</span>
            <span className="text-cyan-400 font-bold">Hoje: Sexta-feira</span>
          </div>
        </div>

      </div>
    </section>
  );
};
