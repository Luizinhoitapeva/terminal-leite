export type MarketDirectionType = 'comprador' | 'vendedor' | 'neutro';

export interface ScoreFactor {
  label: string;
  points: number; // e.g. +12 or -6
  type: 'positive' | 'negative' | 'neutral';
  explanation?: string;
}

export interface IPMLScore {
  score: number; // 0 to 100
  statusLabel: string; // e.g. "PRESSÃO ALTISTA EXTREMA"
  factors: ScoreFactor[];
}

export interface TrendPeriod {
  label: string; // "7 Dias", "15 Dias", "30 Dias"
  probabilityText: string; // "Alta 78%"
  direction: 'alta' | 'baixa' | 'estabilidade';
}

export interface TrendCompass {
  marketDirection: MarketDirectionType;
  directionBadge: string; // "🟢 Comprador (Alta)" or "🔴 Vendedor (Baixa)"
  periods: {
    d7: TrendPeriod;
    d15: TrendPeriod;
    d30: TrendPeriod;
  };
}

export interface DailyDriver {
  id: string;
  text: string;
  direction: 'up' | 'down' | 'neutral';
  impactTag: string;
}

export interface IndustryAppetitePlayer {
  name: string;
  isMainHighlight?: boolean;
  appetite: string; // "🟢 Comprando Forte", "🟡 Cauteloso", etc.
  statusType: 'buyer_strong' | 'buyer_moderate' | 'cautious' | 'seller';
  regionNote: string;
  spotPremium: string;
  strategyText: string;
}

export interface IndustryHumor {
  italac: IndustryAppetitePlayer;
  competitors: IndustryAppetitePlayer[];
}

export interface ImpactRadarCard {
  id: string;
  title: string;
  summary: string;
  direction: 'alta' | 'baixa' | 'neutro'; // 🟢 Alta, 🔴 Baixa, 🟡 Neutro
  impactScore: number; // 0.0 to 10.0
  category: string;
  source: string;
  publishedTime: string;
}

export interface WeeklyTimelineEvent {
  day: 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex';
  dateStr: string;
  eventTitle: string;
  direction: 'alta' | 'baixa' | 'neutro';
  impactTag: string;
  isToday?: boolean;
}

export interface TickerItem {
  label: string;
  value: string;
  change: string;
  status: 'up' | 'down' | 'stable';
}

export type WeatherType = 'sun' | 'rain' | 'drought' | 'cloud' | 'storm';

export interface ClimateRegionItem {
  region: string; // e.g. "Goiás (GO)", "Minas Gerais (MG)", "Paraná (PR)", "Nova Zelândia", "Mercosul (Uruguai/ARG)"
  condition: string; // e.g. "Seca Histórica", "Chuvas Abundantes"
  weatherType: WeatherType;
  impactDirection: 'alta' | 'baixa' | 'neutro'; // 'alta' = Preço sobe (oferta cai), 'baixa' = Preço cai (oferta sobe)
  impactLabel: string; // e.g. "Impacto Altista", "Impacto Baixista"
  details: string; // e.g. "Estiagem severa reduz pastagens e eleva custo com ração"
}

export interface ClimateRadarData {
  summary15Days: string; // Frase curta da IA sintetizando impacto do clima no preço do leite nos próximos 15 dias
  nationalRegions: ClimateRegionItem[]; // MG, GO, PR
  globalRegions: ClimateRegionItem[]; // Nova Zelândia, Mercosul
}

export interface TerminalData {
  todayDateFormatted: string;
  aiSummary3Lines: [string, string, string]; // Exactly 3 high impact lines
  ipml: IPMLScore;
  compass: TrendCompass;
  drivers: DailyDriver[];
  industryHumor: IndustryHumor;
  impactRadar: ImpactRadarCard[];
  weeklyTimeline: WeeklyTimelineEvent[];
  climateRadar: ClimateRadarData;
  tickers: TickerItem[];
  timestamp: string;
  isFallback?: boolean;
}

export interface MarketScenarioPreset {
  id: string;
  title: string;
  description: string;
  milkPointText: string;
  cepeaText: string;
}
