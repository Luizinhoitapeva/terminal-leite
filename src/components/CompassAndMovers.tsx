import React from 'react';
import { TrendCompass, DailyDriver } from '../types';
import { Compass, TrendingUp, TrendingDown, Zap, Table, Target, CheckCircle2, AlertTriangle } from 'lucide-react';

interface CompassAndMoversProps {
  compass: TrendCompass;
  drivers: DailyDriver[];
}

export const CompassAndMovers: React.FC<CompassAndMoversProps> = ({ compass, drivers }) => {
  const isBuyer = compass?.marketDirection === 'comprador';
  const isSeller = compass?.marketDirection === 'vendedor';

  return (
    <section className="mb-6" id="bussola-movimentadores">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* COLUNA A: BÚSSOLA DO MERCADO & MATRIZ DE SINAIS DO MODELO */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 font-extrabold shrink-0">
                  <Compass className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    COLUNA A • DIREÇÃO DE MERCADO
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Bússola Comercial do Leite
                  </h3>
                </div>
              </div>

              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800 font-bold">
                PROJEÇÃO PREDITIVA
              </span>
            </div>

            {/* Main Compass Status Card */}
            <div className={`p-5 rounded-2xl border text-center my-4 transition shadow-inner ${
              isBuyer
                ? 'bg-emerald-950/50 border-emerald-800/80 text-emerald-300'
                : isSeller
                ? 'bg-rose-950/50 border-rose-800/80 text-rose-300'
                : 'bg-amber-950/50 border-amber-800/80 text-amber-300'
            }`}>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">
                POSICIONAMENTO ESTRATÉGICO DA INDÚSTRIA
              </span>
              <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black font-mono tracking-tight my-1">
                {isBuyer && <TrendingUp className="w-8 h-8 text-emerald-400" />}
                {isSeller && <TrendingDown className="w-8 h-8 text-rose-400" />}
                <span>{compass?.directionBadge || 'COMPRADOR (ALTA DOS PREÇOS)'}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium max-w-md mx-auto mt-2">
                {isBuyer
                  ? 'A indústria precisa de matéria-prima e cobre ágios no spot para manter linhas ativas.'
                  : isSeller
                  ? 'Entrada de safra ou fraco consumo ataca margens do produtor, forçando deságios.'
                  : 'Mercado em equilíbrio de oferta e demanda com preços de tabela estabilizados.'}
              </p>
            </div>

            {/* Trend Table: 7 days, 15 days, 30 days */}
            <div className="mt-5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-slate-400 mb-2.5">
                <Table className="w-3.5 h-3.5 text-cyan-400" />
                Matriz de Sinais por Horizonte Temporal
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* 7 Days */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                    7 DIAS
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold font-mono text-emerald-400 block">
                    ALTA FORTE
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                    Sinal do modelo: {compass?.periods?.d7?.probabilityText || '84/100'}
                  </span>
                </div>

                {/* 15 Days */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                    15 DIAS
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold font-mono text-emerald-300 block">
                    ALTA MODERADA
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                    Sinal do modelo: {compass?.periods?.d15?.probabilityText || '76/100'}
                  </span>
                </div>

                {/* 30 Days */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-center">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                    30 DIAS
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold font-mono text-amber-400 block">
                    ESTABILIDADE
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                    Sinal do modelo: {compass?.periods?.d30?.probabilityText || '58/100'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Horizonte Comercial: Negociação de Leite Cru</span>
            <span className="text-cyan-400 font-bold">CONFIANÇA DO SINAL: 93,5%</span>
          </div>
        </div>

        {/* COLUNA B: DRIVERS DO DIA & NOVO RECURSO "O QUE PODE MUDAR O SINAL?" */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 font-extrabold shrink-0">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    COLUNA B • MOVIMENTADORES
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                    Drivers e Forças do Dia
                  </h3>
                </div>
              </div>

              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800 font-bold">
                IMPACTO DIRETO
              </span>
            </div>

            {/* Drivers list with arrows ⬆ and ⬇ */}
            <div className="space-y-3 my-2 mb-4">
              {drivers?.map((drv) => {
                const isUp = drv.direction === 'up';

                return (
                  <div
                    key={drv.id}
                    className="bg-slate-950/90 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 flex items-start justify-between gap-3 transition group"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-bold ${
                        isUp
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/80'
                          : 'bg-rose-950 text-rose-400 border border-rose-800/80'
                      }`}>
                        {isUp ? '⬆' : '⬇'}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                        {drv.text}
                      </p>
                    </div>

                    <span className={`shrink-0 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isUp
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-900'
                        : 'bg-rose-950 text-rose-400 border border-rose-900'
                    }`}>
                      {drv.impactTag}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* NOVO BLOCO SOLICITADO: O QUE PODE MUDAR O SINAL DE PREVISÃO? */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-cyan-400 mb-2">
                <Target className="w-4 h-4 text-cyan-400" />
                🎯 O QUE PODE MUDAR O SINAL DE PREVISÃO?
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px] font-mono">
                {/* Confirmations */}
                <div className="bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-lg">
                  <span className="font-bold text-emerald-400 flex items-center gap-1 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> CONFIRMAÇÃO DA ALTA
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    <li>Spot superando R$ 3,15/L</li>
                    <li>Captação GO/MG mantendo queda</li>
                    <li>Milho B3 &gt; R$ 68,50/saca</li>
                  </ul>
                </div>

                {/* Risks */}
                <div className="bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-lg">
                  <span className="font-bold text-rose-400 flex items-center gap-1 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" /> RISCO DE REVERSÃO
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    <li>Spot caindo &lt; R$ 3,00/L</li>
                    <li>Recuperação da captação &gt; +3%</li>
                    <li>Importações Mercosul &gt; 5%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Fonte de Monitoramento: B3 / CEPEA / MilkPoint</span>
            <span className="text-amber-400 font-bold">Atualizado Hoje</span>
          </div>
        </div>

      </div>
    </section>
  );
};
