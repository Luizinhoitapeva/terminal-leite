import React, { useState, useCallback, useEffect } from 'react';
import { TerminalData, MarketScenarioPreset } from './types';
import { INITIAL_TERMINAL_DATA, SAMPLE_PRESETS } from './data/sampleData';
import { TerminalHeader } from './components/TerminalHeader';
import { FastDecisionHeader } from './components/FastDecisionHeader';
import { IpmlGauge } from './components/IpmlGauge';
import { CompassAndMovers } from './components/CompassAndMovers';
import { IndustryHumor } from './components/IndustryHumor';
import { ImpactRadarAndTimeline } from './components/ImpactRadarAndTimeline';
import { ClimateRadar } from './components/ClimateRadar';
import { ScenarioModal } from './components/ScenarioModal';
import { CustomAnalysisModal } from './components/CustomAnalysisModal';

export default function App() {
  const [terminalData, setTerminalData] = useState<TerminalData>(INITIAL_TERMINAL_DATA);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string>('cenario-italac-alta');
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  // Carrega o liveData.json gerado pelo robô assim que a página abre
  useEffect(() => {
    fetch('/data/liveData.json') // <-- Caminho correto para arquivos públicos no Vite/Cloudflare
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Live data not found');
      })
      .then((data) => {
        if (data) setTerminalData(data);
      })
      .catch((err) => {
        console.log('Usando dados padrão/fallback locais:', err);
      });
  }, []);

  const runAnalysis = useCallback(async (milkText: string, cepeaText: string) => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milkPointText: milkText, cepeaText: cepeaText })
      });
      if (response.ok) {
        const data = await response.json();
        setTerminalData(data);
      }
    } catch (err) {
      console.error('Error running terminal AI analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleSelectPreset = (preset: MarketScenarioPreset) => {
    setActivePresetId(preset.id);
    runAnalysis(preset.milkPointText, preset.cepeaText);
  };

  const handleRefresh = () => {
    const currentPreset = SAMPLE_PRESETS.find((p) => p.id === activePresetId) || SAMPLE_PRESETS[0];
    runAnalysis(currentPreset.milkPointText, currentPreset.cepeaText);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      <TerminalHeader
        dateStr={terminalData.todayDateFormatted}
        tickers={terminalData.tickers}
        timestamp={terminalData.timestamp}
        isAnalyzing={isAnalyzing}
        isFallback={terminalData.isFallback}
        onOpenPresets={() => setIsScenarioModalOpen(true)}
        onOpenCustomInput={() => setIsCustomModalOpen(true)}
        onRefresh={handleRefresh}
      />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <FastDecisionHeader summary3Lines={terminalData.aiSummary3Lines} dateStr={terminalData.todayDateFormatted} />
        <IpmlGauge ipml={terminalData.ipml} />
        <CompassAndMovers compass={terminalData.compass} drivers={terminalData.drivers} />
        <IndustryHumor humor={terminalData.industryHumor} />
        <ImpactRadarAndTimeline radarCards={terminalData.impactRadar} timeline={terminalData.weeklyTimeline} />
        {terminalData.climateRadar && <ClimateRadar climate={terminalData.climateRadar} />}
      </main>
      <ScenarioModal isOpen={isScenarioModalOpen} onClose={() => setIsScenarioModalOpen(false)} presets={SAMPLE_PRESETS} activePresetId={activePresetId} onSelectPreset={handleSelectPreset} />
      <CustomAnalysisModal isOpen={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)} onRunAnalysis={runAnalysis} isAnalyzing={isAnalyzing} />
      
      {/* RODAPÉ ATUALIZADO COM ASSINATURA E IDENTIDADE */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span className="font-bold text-slate-200">Criado por LD • Terminal de Inteligência do Leite Cru</span>
            </div>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="text-[11px] text-slate-400">Atualização automática diária</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
            <span>Fontes: CEPEA / Scot / B3 / MilkPoint</span>
            <span className="text-cyan-400 font-bold">
              {terminalData.timestamp ? `Última atualização: ${terminalData.timestamp}` : 'Sinais em validação'}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
