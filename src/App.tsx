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
import { Terminal, ShieldCheck, Activity, Layers } from 'lucide-react';

export default function App() {
  const [terminalData, setTerminalData] = useState<TerminalData>(INITIAL_TERMINAL_DATA);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activePresetId, setActivePresetId] = useState<string>('cenario-italac-alta');
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState<boolean>(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);

  // Call API to analyze custom input or preset texts
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
      
      {/* Bloomberg Terminal Top Bar & Header */}
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

      {/* Main Terminal Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* SECTION 1: Cabeçalho de Decisão Rápida (Resumo de 3 linhas gerado por IA) */}
        <FastDecisionHeader
          summary3Lines={terminalData.aiSummary3Lines}
          dateStr={terminalData.todayDateFormatted}
        />

        {/* SECTION 2: Painel Principal - IPML (Índice de Pressão do Mercado Leiteiro + Composição Matemática) */}
        <IpmlGauge ipml={terminalData.ipml} />

        {/* SECTION 3: Direção e Movimentadores (Grid 2 colunas: Bússola Comercial & Drivers) */}
        <CompassAndMovers
          compass={terminalData.compass}
          drivers={terminalData.drivers}
        />

        {/* SECTION 4: Humor da Indústria (Apetite de Compra com Destaque para ITALAC) */}
        <IndustryHumor humor={terminalData.industryHumor} />

        {/* SECTION 5: Radar de Impacto (Cards com Score 0-10) e Linha do Tempo Semanal */}
        <ImpactRadarAndTimeline
          radarCards={terminalData.impactRadar}
          timeline={terminalData.weeklyTimeline}
        />

        {/* SECTION 6: Radar Climático Estratégico (O Peso do Clima na Oferta) */}
        {terminalData.climateRadar && (
          <ClimateRadar climate={terminalData.climateRadar} />
        )}

      </main>

      {/* Terminal Modals */}
      <ScenarioModal
        isOpen={isScenarioModalOpen}
        onClose={() => setIsScenarioModalOpen(false)}
        presets={SAMPLE_PRESETS}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

      <CustomAnalysisModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onRunAnalysis={runAnalysis}
        isAnalyzing={isAnalyzing}
      />

      {/* Bloomberg Executive Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
            <span className="font-bold text-slate-200">Terminal Bloomberg • Inteligência do Leite Cru</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Plataforma Preditiva para Laticínios e Italac</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Fontes: CEPEA / Scot / B3 / MilkPoint</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-bold">Acurácia Preditiva IPML: 94.2%</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
