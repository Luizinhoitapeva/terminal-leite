import React, { useState } from 'react';
import { Activity, X, Sparkles, Send, RefreshCw, FileText } from 'lucide-react';

interface CustomAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRunAnalysis: (milkText: string, cepeaText: string) => Promise<void>;
  isAnalyzing: boolean;
}

export const CustomAnalysisModal: React.FC<CustomAnalysisModalProps> = ({
  isOpen,
  onClose,
  onRunAnalysis,
  isAnalyzing
}) => {
  const [milkText, setMilkText] = useState('');
  const [cepeaText, setCepeaText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!milkText && !cepeaText) return;
    await onRunAnalysis(milkText, cepeaText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Simular Análise de Texto com IA (Gemini 3.6)
              </h3>
              <p className="text-xs text-slate-400">
                Cole dados do mercado, artigos do MilkPoint ou boletins CEPEA para recalcular o IPML e o Terminal
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              Notícias da Indústria, Spot e Italac (MilkPoint / Scot)
            </label>
            <textarea
              value={milkText}
              onChange={(e) => setMilkText(e.target.value)}
              placeholder="Cole aqui textos sobre a disputa de leite spot, postura compradora da Italac, preços de repasse no UHT..."
              className="w-full h-28 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold uppercase text-slate-300 flex items-center gap-1.5 mb-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Indicadores de Insumos B3, Dólar e Captação (CEPEA)
            </label>
            <textarea
              value={cepeaText}
              onChange={(e) => setCepeaText(e.target.value)}
              placeholder="Cole aqui cotações do milho e soja na B3, câmbio do Dólar, relatório CEPEA do leite ao produtor..."
              className="w-full h-28 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500 font-mono resize-none"
            />
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>O modelo Gemini recalculará o índice IPML (0-100), o posicionamento da Italac, a bússola de tendência e o radar de impacto.</span>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-300 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isAnalyzing || (!milkText && !cepeaText)}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-cyan-600/30 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Calculando IPML com IA...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Rodar Inteligência Preditiva IA</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
