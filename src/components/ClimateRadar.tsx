import React from 'react';
import { ClimateRadarData, ClimateRegionItem, WeatherType } from '../types';
import { CloudSun, Sun, CloudRain, Flame, Cloud, CloudLightning, Globe2, MapPin, Sparkles, ThermometerSun, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface ClimateRadarProps {
  climate: ClimateRadarData;
}

export const ClimateRadar: React.FC<ClimateRadarProps> = ({ climate }) => {
  const getWeatherIcon = (type: WeatherType) => {
    switch (type) {
      case 'drought':
        return <Flame className="w-4 h-4 text-rose-400" />;
      case 'rain':
        return <CloudRain className="w-4 h-4 text-cyan-400" />;
      case 'sun':
        return <Sun className="w-4 h-4 text-amber-400" />;
      case 'storm':
        return <CloudLightning className="w-4 h-4 text-purple-400" />;
      case 'cloud':
      default:
        return <Cloud className="w-4 h-4 text-slate-400" />;
    }
  };

  const renderRegionCard = (item: ClimateRegionItem, idx: number) => {
    const isHigh = item.impactDirection === 'alta';
    const isLow = item.impactDirection === 'baixa';

    return (
      <div
        key={idx}
        className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition flex flex-col justify-between group"
      >
        <div>
          {/* Top Bar: Weather Condition & Impact Badge */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-white">
              {getWeatherIcon(item.weatherType)}
              <span>{item.region}</span>
            </div>

            {/* Impact Thermometer Badge */}
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                isHigh
                  ? 'bg-rose-950/90 text-rose-300 border-rose-800/80'
                  : isLow
                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-800/80'
                  : 'bg-amber-950/90 text-amber-300 border-amber-800/80'
              }`}
            >
              {isHigh && <ArrowUpRight className="w-3 h-3 text-rose-400" />}
              {isLow && <ArrowDownRight className="w-3 h-3 text-emerald-400" />}
              {!isHigh && !isLow && <Minus className="w-3 h-3 text-amber-400" />}
              {isHigh ? '🔴 Altista' : isLow ? '🟢 Baixista' : '🟡 Neutro'}
            </span>
          </div>

          {/* Condition Subtitle */}
          <div className="text-[11px] font-mono font-semibold text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/60 inline-block mb-2">
            {item.condition}
          </div>

          {/* Detail Explanation */}
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {item.details}
          </p>
        </div>

        {/* Footer Tag */}
        <div className="mt-3 pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>{item.impactLabel}</span>
          <span className="text-slate-400 font-bold">{isHigh ? 'Oferta ↓' : isLow ? 'Oferta ↑' : 'Estável'}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="mb-6" id="radar-climatico">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 font-extrabold shrink-0">
              <CloudSun className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                  RADAR CLIMÁTICO ESTRATÉGICO
                </span>
                <span className="text-[10px] font-mono text-slate-400">TERMÔMETRO DE IMPACTO NA OFERTA</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mt-0.5">
                Monitoramento Climático das Bacias Leiteiras
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
            <ThermometerSun className="w-4 h-4 text-amber-400" />
            <span>Previsão de Oferta vs Pastagens</span>
          </div>
        </div>

        {/* 15-DAY AI CLIMATE SYNTHESIS BANNER */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-950/80 via-slate-950 to-slate-950 border border-amber-500/40 shadow-inner flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400 font-bold shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
              SÍNTESE IA • PROJEÇÃO CLIMÁTICA DE PREÇOS (PRÓXIMOS 15 DIAS)
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-semibold mt-0.5">
              "{climate.summary15Days}"
            </p>
          </div>
        </div>

        {/* 2-COLUMN GRID: NACIONAL vs GLOBAL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* GROUP 1: NACIONAL (MG, GO, PR) */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-extrabold text-white font-mono tracking-tight">
                  Nacional (MG, GO, PR)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                BACIAS PRINCIPAIS
              </span>
            </div>

            <div className="space-y-3">
              {climate.nationalRegions.map((item, idx) => renderRegionCard(item, idx))}
            </div>
          </div>

          {/* GROUP 2: GLOBAL (NOVA ZELÂNDIA, MERCOSUL) */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-extrabold text-white font-mono tracking-tight">
                  Global (Nova Zelândia, Mercosul)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                IMPORTAÇÕES & GDT
              </span>
            </div>

            <div className="space-y-3">
              {climate.globalRegions.map((item, idx) => renderRegionCard(item, idx))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
