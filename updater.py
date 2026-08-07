import os
import json
from datetime import datetime
from google import genai
from google.genai import types

def generate_real_terminal_data():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY não encontrada nas variáveis de ambiente do GitHub.")

    client = genai.Client(api_key=api_key)

    today_str = datetime.now().strftime("%d/%m/%Y")
    formatted_date = datetime.now().strftime("%A, %d de %B de %Y").replace("", "") # ou ajuste o formato em PT

    system_instruction = """
    Você é um analista sênior do Bloomberg Terminal especializado no mercado físico de comercialização de leite cru no Brasil para laticínios industriais (com destaque máximo para a ITALAC). 
    Sua tarefa é simular a captação de dados recentes do mercado de leite (MilkPoint, CEPEA, B3, Clima nas bacias de MG, GO, PR, Nova Zelândia, Mercosul) e produzir um objeto JSON preditivo real para o terminal com os seguintes campos exatos:
    {
      "todayDateFormatted": "Data atual por extenso em português",
      "aiSummary3Lines": [
        "Frase 1 (25-35 palavras): O que esperar do mercado de leite cru hoje no campo e spot.",
        "Frase 2 (25-35 palavras): Apetite de compra das indústrias com foco principal na ITALAC.",
        "Frase 3 (25-35 palavras): Tendência dos insumos na B3 (milho/soja), dólar e repasse nos derivados."
      ],
      "ipml": {
        "score": 82, 
        "statusLabel": "PRESSÃO ALTISTA EXTREMA (82/100)",
        "factors": [
          { "label": "Leite Spot em Alta (+R$ 0,22/L ágio)", "points": 18, "type": "positive", "explanation": "Explicação curta" }
        ]
      },
      "compass": {
        "marketDirection": "comprador",
        "directionBadge": "COMPRADOR (ALTA DOS PREÇOS)",
        "periods": {
          "d7": { "label": "7 Dias", "probabilityText": "Alta Forte (84%)", "direction": "alta" },
          "d15": { "label": "15 Dias", "probabilityText": "Alta Moderada (76%)", "direction": "alta" },
          "d30": { "label": "30 Dias", "probabilityText": "Estável (58%)", "direction": "estabilidade" }
        }
      },
      "drivers": [
        { "id": "drv-1", "text": "Texto descritivo do driver", "direction": "up", "impactTag": "Tag Curta" }
      ],
      "industryHumor": {
        "italac": {
          "name": "Italac",
          "isMainHighlight": true,
          "appetite": "COMPRANDO FORTE",
          "statusType": "buyer_strong",
          "regionNote": "GO, MG, SP, PR, RS",
          "spotPremium": "Ágio Agressivo",
          "strategyText": "Estratégia compradora ativa..."
        },
        "competitors": [
          {
            "name": "Piracanjuba",
            "isMainHighlight": false,
            "appetite": "Comprando Forte",
            "statusType": "buyer_strong",
            "regionNote": "GO, MG, SP",
            "spotPremium": "Ágio de +R$ 0,15 / Litro",
            "strategyText": "Estratégia concorrente..."
          }
        ]
      },
      "impactRadar": [
        {
          "id": "rad-1",
          "title": "Título da notícia",
          "summary": "Resumo do impacto comercial",
          "direction": "alta",
          "impactScore": 9.2,
          "category": "Mercado Spot",
          "source": "MilkPoint",
          "publishedTime": "Hoje"
        }
      ],
      "weeklyTimeline": [
        { "day": "Seg", "dateStr": "03/Ago", "eventTitle": "Evento", "direction": "alta", "impactTag": "Spot" },
        { "day": "Sex", "dateStr": "Hoje", "eventTitle": "Boletim atualizado", "direction": "alta", "impactTag": "IPML", "isToday": true }
      ],
      "climateRadar": {
        "summary15Days": "Resumo de 15 dias do impacto climático...",
        "nationalRegions": [
          { "region": "Goiás (GO)", "condition": "Seca Severa", "weatherType": "drought", "impactDirection": "alta", "impactLabel": "Altista", "details": "Detalhes..." }
        ],
        "globalRegions": [
          { "region": "Nova Zelândia", "condition": "Sol", "weatherType": "sun", "impactDirection": "neutro", "impactLabel": "Neutro", "details": "Detalhes..." }
        ]
      },
      "tickers": [
        { "label": "LEITE SPOT", "value": "R$ 3,08 / L", "change": "+2,6%", "status": "up" }
      ],
      "timestamp": "Agora"
    }
    Retorne estritamente APENAS o JSON válido.
    """

    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents="Gere a análise preditiva atualizada para o terminal do leite de hoje.",
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            temperature=0.2
        )
    )

    data = json.loads(response.text)
    
    # Salva na pasta pública do projeto React para o site ler estaticamente
    output_path = os.path.join("src", "data", "liveData.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    print(f"Sucesso! Dados gerados e salvos em {output_path}")

if __name__ == "__main__":
    generate_real_terminal_data()
