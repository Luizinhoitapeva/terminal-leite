import React from 'react';
import { IndustryHumor as IndustryHumorType, IndustryAppetitePlayer } from '../types';
import { Building2, Flame, Award, MapPin, Tag, ArrowUpRight, ShieldAlert, CheckCircle } from 'lucide-react';

interface IndustryHumorProps {
  humor: IndustryHumorType;
}

export const IndustryHumor: React.FC<IndustryHumorProps> = ({ humor }) => {
  const italac = humor.italac;
  const competitors = humor.competitors;

  return (
    <section className="mb-6" id="humor-industria">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 font-extrabold shrink-0">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  MONITORAMENTO INDUSTRIAL
                </span>
                <span className="text-[10px] font-mono text-slate-400">APETITE DE COMPRA NO SPOT</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mt-0.5">
                Humor da Indústria & Disputa Comercial
              </h2>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
            <span>Mercado Comercial de Leite Cru</span>
          </div>
        </div>

        {/* ABSOLUTE HIGHLIGHT: ITALAC CARD */}
        <div className="mb-6">
          <div className="rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-950 to-slate-950 border-2 border-amber-500/80 p-5 sm:p-6 shadow-2xl relative overflow-hidden group">
            
            <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none text-amber-400">
              <Flame className="w-48 h-48" />
            </div>

            {/* Top Badge Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-amber-500/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/30 shrink-0">
                  <Award className="w-7 h-7 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-black uppercase tracking-widest text-amber-300 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-500/50">
                      ★ DESTAQUE PRINCIPAL • LÍDER COMPRADORA
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight mt-0.5 flex items-center gap-2">
                    {italac.name}
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-500/40">
                      FOCO ESTRATÉGICO
                    </span>
                  </h3>
                </div>
              </div>

              {/* Glowing Appetite Tag */}
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black font-mono px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 border-2 border-emerald-500 shadow-lg shadow-emerald-950/80 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-emerald-400 animate-pulse" />
                  {italac.appetite}
                </span>
              </div>
            </div>

            {/* Italac Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1 mb-1">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  Prêmio / Ágio no Spot
                </span>
                <p className="text-sm font-extrabold text-amber-300 font-mono">
                  {italac.spotPremium}
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Bacias de Ação Principal
                </span>
                <p className="text-sm font-extrabold text-slate-100">
                  {italac.regionNote}
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-3.5 rounded-xl">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Status Operacional
                </span>
                <p className="text-sm font-extrabold text-emerald-400 font-mono">
                  Captação Acelerada (Plantas GO/MG)
                </p>
              </div>
            </div>

            {/* Strategy text */}
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
              <b className="text-amber-400">Diretriz Italac:</b> "{italac.strategyText}"
            </div>

          </div>
        </div>

        {/* COMPETITORS SECTION (PIRACANJUBA, LACTALIS, NESTLÉ) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              Apetite dos Principais Concorrentes Industriais
            </h4>
            <span className="text-[11px] font-mono text-slate-500">Contexto Comparativo</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitors.map((player, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 flex flex-col justify-between transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-base font-extrabold text-white">
                      {player.name}
                    </span>
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded ${
                      player.statusType === 'buyer_strong'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : player.statusType === 'buyer_moderate'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {player.appetite}
                    </span>
                  </div>

                  <div className="space-y-1.5 my-2 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                      <span>{player.regionNote}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-200 font-mono font-bold text-[11px]">
                      <Tag className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{player.spotPremium}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-2.5 leading-normal line-clamp-3">
                    {player.strategyText}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Plataformas Ativas</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
