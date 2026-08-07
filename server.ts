import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { INITIAL_TERMINAL_DATA } from './src/data/sampleData';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Helper to initialize Gemini Client safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Fallback rule-based extractor when offline or missing key
function performFallbackTerminalData(milkPointText: string, cepeaText: string) {
  const combined = (milkPointText + '\n' + cepeaText).toLowerCase();

  // Basic sentiment analysis
  const isHigh = combined.includes('alta') || combined.includes('disputa') || combined.includes('ágio') || combined.includes('seca');
  const isLow = combined.includes('pico de safra') || combined.includes('queda') || combined.includes('deságio');

  if (isLow && !isHigh) {
    return {
      ...INITIAL_TERMINAL_DATA,
      aiSummary3Lines: [
        'A entrada da safra de inverno no Sul aumentou a oferta regional nas plataformas industriais.',
        'A Italac e grandes concorrentes operam com recepção estável, evitando pagar ágios no spot.',
        'No atacado, a maior disponibilidade de derivados atena os preços no curto prazo (15 dias).'
      ],
      ipml: {
        score: 38,
        statusLabel: 'PRESSÃO BAIXISTA / MODERADA (38/100)',
        factors: [
          { label: 'Pico de Safra no Sul', points: -18, type: 'negative', explanation: 'Aumento na entrega de leite cru pelos produtores gaúchos e catarinenses' },
          { label: 'Mercado Spot sem Ágio Extra', points: -12, type: 'negative', explanation: 'Indústrias não cobrem ofertas livres para evitar sobre-estoque' },
          { label: 'Importações Sustentadas (+3,5%)', points: -8, type: 'negative', explanation: 'Entrada contínua de leite em pó do Uruguai e Argentina' },
          { label: 'Ração na B3 em Leve Baixa (-2,4%)', points: -6, type: 'negative', explanation: 'Avanço da colheita do milho reduz custo de ração' }
        ]
      },
      compass: {
        marketDirection: 'vendedor' as const,
        directionBadge: '🔴 VENDEDOR (BAIXA DOS PREÇOS)',
        periods: {
          d7: { label: '7 Dias', probabilityText: 'Baixa 72%', direction: 'baixa' as const },
          d15: { label: '15 Dias', probabilityText: 'Baixa Moderada 64%', direction: 'baixa' as const },
          d30: { label: '30 Dias', probabilityText: 'Estável 55%', direction: 'estabilidade' as const }
        }
      },
      industryHumor: {
        ...INITIAL_TERMINAL_DATA.industryHumor,
        italac: {
          ...INITIAL_TERMINAL_DATA.industryHumor.italac,
          appetite: '🟡 COMPRAS MODERADAS / TABELA',
          statusType: 'buyer_moderate' as const,
          spotPremium: 'Sem Ágio Extra (Preço Regular)',
          strategyText: 'Absorvendo volume contratado em SC e RS, com postura seletiva para novos lotes spot.'
        }
      },
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      isFallback: true
    };
  }

  return {
    ...INITIAL_TERMINAL_DATA,
    timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    isFallback: true
  };
}

// Endpoint: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Endpoint: Extract & Analyze Dairy Market Texts for Bloomberg Terminal IPML
app.post('/api/analyze', async (req, res) => {
  const { milkPointText, cepeaText } = req.body;

  if (!milkPointText && !cepeaText) {
    return res.status(400).json({ error: 'Por favor, forneça pelo menos um texto sobre o mercado de leite cru.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    const fallback = performFallbackTerminalData(milkPointText || '', cepeaText || '');
    return res.json(fallback);
  }

  try {
    const systemPrompt = `Você é um analista sênior do Bloomberg Terminal especializado no mercado físico de comercialização comercial de leite cru no Brasil para laticínios industriais (com destaque máximo para a ITALAC).

Sua tarefa é analisar os textos fornecidos sobre mercado de leite (MilkPoint, CEPEA, B3, Dólar, notícias da indústria) e produzir um objeto JSON preditivo para o terminal com os seguintes campos rigorosos:

{
  "todayDateFormatted": "Data atual formatada por extenso em português",
  "aiSummary3Lines": [
    "Frase 1 (25-35 palavras): O que esperar do mercado de leite cru hoje no campo e spot.",
    "Frase 2 (25-35 palavras): Apetite de compra das indústrias com foco principal na ITALAC.",
    "Frase 3 (25-35 palavras): Tendência dos insumos na B3 (milho/soja), dólar e repasse nos derivados."
  ],
  "ipml": {
    "score": 82, // Número inteiro de 0 a 100
    "statusLabel": "PRESSÃO ALTISTA EXTREMA (82/100)",
    "factors": [
      {
        "label": "+12 pontos: Leite Spot em alta",
        "points": 12,
        "type": "positive" | "negative" | "neutral",
        "explanation": "Explicação curta do fator"
      },
      {
        "label": "-6 pontos: Aumento das importações",
        "points": -6,
        "type": "negative",
        "explanation": "Explicação curta do fator"
      }
    ]
  },
  "compass": {
    "marketDirection": "comprador" | "vendedor" | "neutro",
    "directionBadge": "🟢 COMPRADOR (ALTA DOS PREÇOS)" | "🔴 VENDEDOR (BAIXA DOS PREÇOS)" | "🟡 NEUTRO (EQUILÍBRIO)",
    "periods": {
      "d7": { "label": "7 Dias", "probabilityText": "Alta 78%", "direction": "alta" | "baixa" | "estabilidade" },
      "d15": { "label": "15 Dias", "probabilityText": "Alta Moderada 70%", "direction": "alta" | "baixa" | "estabilidade" },
      "d30": { "label": "30 Dias", "probabilityText": "Estável 60%", "direction": "alta" | "baixa" | "estabilidade" }
    }
  },
  "drivers": [
    {
      "id": "drv-1",
      "text": "Frase curta com indicador do dia",
      "direction": "up" | "down" | "neutral",
      "impactTag": "Etiqueta curta (Ex: +R$ 0,22/L Ágio)"
    }
  ],
  "industryHumor": {
    "italac": {
      "name": "Italac",
      "isMainHighlight": true,
      "appetite": "🟢 COMPRANDO FORTE",
      "statusType": "buyer_strong" | "buyer_moderate" | "cautious" | "seller",
      "regionNote": "GO, MG, SP, PR, RS",
      "spotPremium": "Ágio pago no spot",
      "strategyText": "Apetite de compra e estratégia para abastecimento industrial da Italac."
    },
    "competitors": [
      {
        "name": "Piracanjuba",
        "isMainHighlight": false,
        "appetite": "🟢 Comprando Forte",
        "statusType": "buyer_strong" | "buyer_moderate" | "cautious" | "seller",
        "regionNote": "GO, MG, SP",
        "spotPremium": "Ágio spot",
        "strategyText": "Estratégia do concorrente"
      },
      {
        "name": "Lactalis",
        "isMainHighlight": false,
        "appetite": "🟡 Compras Moderadas",
        "statusType": "buyer_moderate",
        "regionNote": "RS, SC, PR, SP, MG",
        "spotPremium": "Sem Ágio",
        "strategyText": "Estratégia do concorrente"
      },
      {
        "name": "Nestlé",
        "isMainHighlight": false,
        "appetite": "🟡 Cauteloso / Seletivo",
        "statusType": "cautious",
        "regionNote": "SP, MG, GO",
        "spotPremium": "Tabela de Contrato",
        "strategyText": "Estratégia do concorrente"
      }
    ]
  },
  "impactRadar": [
    {
      "id": "rad-1",
      "title": "Título resumido e profissional da notícia",
      "summary": "Resumo analítico do impacto comercial no leite cru",
      "direction": "alta" | "baixa" | "neutro",
      "impactScore": 9.2, // Número de 0.0 a 10.0
      "category": "Mercado Spot / Insumos B3 / Captação",
      "source": "MilkPoint / CEPEA / Scot",
      "publishedTime": "Hoje, 08:15"
    }
  ],
  "weeklyTimeline": [
    {
      "day": "Seg",
      "dateStr": "03/Ago",
      "eventTitle": "Evento ou indicador marcante da segunda-feira",
      "direction": "alta" | "baixa" | "neutro",
      "impactTag": "+1,8% Spot"
    },
    {
      "day": "Ter",
      "dateStr": "04/Ago",
      "eventTitle": "Evento de terça-feira",
      "direction": "alta" | "baixa" | "neutro",
      "impactTag": "GDT +2,4%"
    },
    {
      "day": "Qua",
      "dateStr": "05/Ago",
      "eventTitle": "Evento de quarta-feira",
      "direction": "alta" | "baixa" | "neutro",
      "impactTag": "Italac Ágio"
    },
    {
      "day": "Qui",
      "dateStr": "06/Ago",
      "eventTitle": "Evento de quinta-feira",
      "direction": "alta" | "baixa" | "neutro",
      "impactTag": "Milho B3"
    },
    {
      "day": "Sex",
      "dateStr": "07/Ago",
      "eventTitle": "Evento de hoje (sexta-feira)",
      "direction": "alta" | "baixa" | "neutro",
      "impactTag": "IPML Hoje",
      "isToday": true
    }
  ],
  "climateRadar": {
    "summary15Days": "Frase curta (20-30 palavras) sintetizando o impacto do clima no preço do leite nos próximos 15 dias.",
    "nationalRegions": [
      {
        "region": "Goiás (GO)",
        "condition": "Seca Severa / Estiagem",
        "weatherType": "drought" | "sun" | "rain" | "cloud" | "storm",
        "impactDirection": "alta" | "baixa" | "neutro",
        "impactLabel": "Impacto Altista (Queda de Oferta)",
        "details": "🔴 Seca em GO prejudica pastos e reduz captação."
      },
      {
        "region": "Minas Gerais (MG)",
        "condition": "Estiagem no Triângulo",
        "weatherType": "drought",
        "impactDirection": "alta",
        "impactLabel": "Impacto Altista (Menor Captação)",
        "details": "🔴 Estiagem na bacia de MG eleva disputa spot."
      },
      {
        "region": "Paraná & Sul (PR/SC/RS)",
        "condition": "Chuvas Moderadas",
        "weatherType": "rain",
        "impactDirection": "baixa",
        "impactLabel": "Impacto Baixista (Safra Estável)",
        "details": "🟢 Clima no Sul mantém produção estável."
      }
    ],
    "globalRegions": [
      {
        "region": "Nova Zelândia (Fonterra)",
        "condition": "Sol / Início de Primavera",
        "weatherType": "sun",
        "impactDirection": "neutro",
        "impactLabel": "Impacto Neutro",
        "details": "🟡 Condições na NZ mantêm leilão GDT regular."
      },
      {
        "region": "Mercosul (Uruguai / Argentina)",
        "condition": "Chuvas Favoráveis",
        "weatherType": "rain",
        "impactDirection": "baixa",
        "impactLabel": "Impacto Baixista (Oferta Exportável)",
        "details": "🟢 Chuvas no Uruguai mantêm embarques de leite em pó."
      }
    ]
  },
  "tickers": [
    { "label": "LEITE SPOT", "value": "R$ 3,08 / L", "change": "+2,6%", "status": "up" },
    { "label": "ITALAC SPOT PREMIUM", "value": "+R$ 0,22 / L", "change": "ALTA", "status": "up" },
    { "label": "MILHO FUTURO B3", "value": "R$ 68,50 / sc", "change": "+3,8%", "status": "up" },
    { "label": "SOJA FUTURO B3", "value": "R$ 134,20 / sc", "change": "+2,4%", "status": "up" },
    { "label": "DÓLAR COMERCIAL", "value": "R$ 5,42", "change": "+0,65%", "status": "up" },
    { "label": "UHT ATACADO", "value": "R$ 4,38 / L", "change": "+2,1%", "status": "up" },
    { "label": "GDT LEITE EM PÓ", "value": "US$ 3.820 / t", "change": "+2,4%", "status": "up" }
  ]
}`;

    const userContent = `Textos do mercado de leite para gerar o Terminal de Inteligência Preditiva IPML:

=== TEXTO 1 (MILKPOINT / INDÚSTRIA / ITALAC) ===
${milkPointText || ''}

=== TEXTO 2 (CEPEA / B3 / DÓLAR) ===
${cepeaText || ''}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userContent,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        temperature: 0.15
      }
    });

    const responseText = response.text || '';
    const parsedData = JSON.parse(responseText);

    return res.json({
      ...parsedData,
      isFallback: false,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    });
  } catch (error: any) {
    console.error('Error in Bloomberg Terminal API processing:', error);
    const fallback = performFallbackTerminalData(milkPointText || '', cepeaText || '');
    return res.json({ ...fallback, isFallback: true, errorDetails: error.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bloomberg Terminal Dairy Server running on http://localhost:${PORT}`);
  });
}

startServer();
