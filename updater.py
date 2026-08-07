import os
import json
from datetime import datetime

from google import genai
from google.genai import types


# ============================================================================
# CONFIGURAÇÃO
# ============================================================================

OUTPUT_PATH = os.path.join("src", "data", "liveData.json")

MODEL_NAME = "gemini-3.5-flash"


# ============================================================================
# MOTOR IPML
# ============================================================================
#
# IMPORTANTE:
# O Gemini NÃO calcula o IPML.
# O Gemini NÃO pode alterar os números.
#
# Cada indicador recebe:
#   score = 0..100
#   weight = peso percentual
#
# O IPML é calculado exclusivamente pelo Python.
# ============================================================================

def calculate_ipml(indicators):
    total_weight = sum(item["weight"] for item in indicators.values())

    if round(total_weight, 10) != 1.0:
        raise ValueError(
            f"Erro de metodologia: os pesos somam {total_weight:.4f}, "
            "mas deveriam somar exatamente 1.0."
        )

    weighted_total = sum(
        item["score"] * item["weight"]
        for item in indicators.values()
    )

    return round(weighted_total, 1)


# ============================================================================
# DADOS BASE
# ============================================================================
#
# ATENÇÃO:
# Estes valores ainda são INPUTS MANUAIS/ESTÁTICOS.
#
# O próximo passo será substituir esses valores por dados coletados
# automaticamente das fontes reais.
# ============================================================================

indicators = {
    "spot": {
        "score": 91,
        "weight": 0.30,
        "label": "Leite Spot"
    },

    "captacao": {
        "score": 88,
        "weight": 0.25,
        "label": "Captação"
    },

    "derivados": {
        "score": 79,
        "weight": 0.15,
        "label": "Derivados / Atacado"
    },

    "importacao": {
        "score": 72,
        "weight": 0.10,
        "label": "Importações"
    },

    "insumos": {
        "score": 84,
        "weight": 0.10,
        "label": "Insumos B3"
    },

    "clima": {
        "score": 78,
        "weight": 0.05,
        "label": "Clima"
    },

    "cambio": {
        "score": 70,
        "weight": 0.05,
        "label": "Câmbio"
    }
}


# ============================================================================
# CÁLCULO DETERMINÍSTICO
# ============================================================================

ipml_calculated = calculate_ipml(indicators)

ipml_final = int(round(ipml_calculated))


# ============================================================================
# VALIDAÇÃO DO RESULTADO
# ============================================================================

if not 0 <= ipml_final <= 100:
    raise ValueError(
        f"IPML inválido: {ipml_final}. "
        "O índice deve estar entre 0 e 100."
    )


# ============================================================================
# FATORES EXIBIDOS NO FRONTEND
# ============================================================================
#
# Os pontos abaixo são derivados diretamente da matemática acima.
# Não são digitados separadamente.
# ============================================================================

factors_data = []

factor_definitions = [
    (
        "spot",
        "Leite Spot em Alta",
        "Forte pressão compradora no mercado spot."
    ),
    (
        "captacao",
        "Recuo na Captação Regional",
        "Redução da oferta de leite cru."
    ),
    (
        "derivados",
        "Repasse no Atacado",
        "Movimento de preços em UHT e derivados."
    ),
    (
        "importacao",
        "Importações",
        "Comportamento das entradas de lácteos."
    ),
    (
        "insumos",
        "Custos de Ração / B3",
        "Pressão dos custos de produção."
    ),
    (
        "clima",
        "Clima nas Bacias",
        "Impacto climático sobre a oferta."
    ),
    (
        "cambio",
        "Câmbio e Paridade",
        "Impacto cambial sobre importação/exportação."
    )
]


for key, label, explanation in factor_definitions:

    item = indicators[key]

    contribution = round(
        item["score"] * item["weight"],
        1
    )

    factors_data.append({
        "label": label,
        "score": item["score"],
        "weight": f"{int(item['weight'] * 100)}%",
        "points": f"+{contribution:.1f} pts",
        "type": "positive",
        "explanation": explanation
    })


# ============================================================================
# CONFIANÇA DO SINAL
# ============================================================================
#
# IMPORTANTE:
# Ainda estamos usando métricas de qualidade fornecidas pelo pipeline.
# Elas não são "probabilidade estatística de acerto".
#
# Depois podemos substituir por métricas calculadas automaticamente
# a partir das fontes reais.
# ============================================================================

source_quality = 91
data_freshness = 96
indicator_convergence = 94
conflict_index = 8


signal_confidence = round(
    (
        indicator_convergence * 0.35
        + source_quality * 0.25
        + data_freshness * 0.25
        + (100 - conflict_index) * 0.15
    ),
    1
)


# ============================================================================
# O QUE MUDOU
# ============================================================================

what_changed = [
    {
        "indicator": "IPML",
        "previous": "79.0",
        "current": str(ipml_final),
        "trend": f"▲ {ipml_final - 79:+.1f}"
    },
    {
        "indicator": "Leite Spot",
        "previous": "R$ 3,02/L",
        "current": "R$ 3,08/L",
        "trend": "▲ +2,0%"
    },
    {
        "indicator": "Captação GO/MG",
        "previous": "-2,8%",
        "current": "-3,4%",
        "trend": "▼ Piora"
    },
    {
        "indicator": "Milho B3",
        "previous": "R$ 67,20",
        "current": "R$ 68,50",
        "trend": "▲ Alta"
    },
    {
        "indicator": "Clima GO",
        "previous": "Alerta",
        "current": "Seca Severa",
        "trend": "🔴 Crítico"
    }
]


# ============================================================================
# GATILHOS DE MUDANÇA
# ============================================================================

forecast_triggers = {
    "riskFactors": [
        "Queda do preço spot abaixo de R$ 3,00/L",
        "Recuperação da captação regional acima de +3%",
        "Aumento das importações de lácteos do Mercosul acima de 5%",
        "Retração nos contratos do leilão GDT acima de 3%"
    ],

    "bullTriggers": [
        "Spot superando R$ 3,15/L",
        "Aprofundamento da quebra de oferta",
        "Aceleração das compras das grandes marcas no Sudeste"
    ]
}


# ============================================================================
# TEMPLATE PROTEGIDO
# ============================================================================
#
# Estes campos pertencem ao Python.
# O Gemini NÃO tem autoridade para alterá-los.
# ============================================================================

template_data = {

    "todayDateFormatted": "Sexta-feira, 07 de agosto de 2026",

    "createdBy": "Criado por LD",

    "timestamp": datetime.now().strftime(
        "Atualizado %H:%M"
    ),

    "whatChanged": what_changed,

    "forecastTriggers": forecast_triggers,

    "ipml": {
        "score": ipml_final,

        "statusLabel": (
            f"PRESSÃO ALTISTA EXTREMA ({ipml_final}/100)"
        ),

        "factors": factors_data,

        "weightsInfo": (
            "Pesos Metodológicos: "
            "Spot 30% • "
            "Captação 25% • "
            "Derivados 15% • "
            "Importação 10% • "
            "Insumos 10% • "
            "Clima 5% • "
            "Câmbio 5%"
        )
    },

    "signalConfidence": {
        "convergence": f"{indicator_convergence}%",
        "sourceQuality": f"{source_quality}%",
        "freshness": f"{data_freshness}%",
        "conflictIndex": f"{conflict_index}%",
        "finalConfidence": f"{signal_confidence}%"
    },

    "precisionStatus": (
        "Precisão histórica: em validação "
        "(amostragem inicial de 30 ciclos pendente)"
    ),

    "compass": {
        "marketDirection": "comprador",

        "directionBadge": (
            "COMPRADOR (ALTA DOS PREÇOS)"
        ),

        "periods": {
            "d7": {
                "label": "7 Dias",
                "probabilityText": "Alta Forte (84%)",
                "direction": "alta"
            },

            "d15": {
                "label": "15 Dias",
                "probabilityText": "Alta Moderada (76%)",
                "direction": "alta"
            },

            "d30": {
                "label": "30 Dias",
                "probabilityText": "Estável (58%)",
                "direction": "estabilidade"
            }
        }
    },

    "drivers": [
        {
            "id": "drv-1",
            "text": (
                "Leite Spot pressionado no Sudeste "
                "com ágio estimado de até +R$ 0,22/litro."
            ),
            "direction": "up",
            "impactTag": "+R$ 0,22/L Ágio"
        }
    ],

    "industryHumor": {
        "italac": {
            "name": "Italac",
            "isMainHighlight": True,

            "appetite": (
                "COMPRANDO FORTE "
                "(Estimativa de Modelo)"
            ),

            "statusType": "buyer_strong",

            "regionNote": "GO, MG, SP, PR, RS",

            "spotPremium": (
                "Ágio Estimado de "
                "+R$ 0,18 a +R$ 0,24 / Litro"
            ),

            "strategyText": (
                "Análise algorítmica aponta "
                "comportamento de captação ativa "
                "para garantia de abastecimento."
            )
        },

        "competitors": [
            {
                "name": "Piracanjuba",

                "isMainHighlight": False,

                "appetite": "Comprando Forte",

                "statusType": "buyer_strong",

                "regionNote": "GO, MG, SP",

                "spotPremium": (
                    "Ágio Estimado de R$ 0,15 / Litro"
                ),

                "strategyText": (
                    "Estimativa de disputa por tanques "
                    "na bacia do Centro-Oeste."
                )
            }
        ]
    },

    "impactRadar": [
        {
            "id": "rad-1",

            "title": (
                "Mercado Spot permanece pressionado "
                "pela disputa por leite cru"
            ),

            "summary": (
                "Sinal de pressão compradora "
                "no mercado spot."
            ),

            "direction": "alta",

            "impactScore": 9.2,

            "category": "Mercado Spot",

            "source": "MilkPoint / Scot Consultoria",

            "publishedTime": "Hoje, 08:15",

            "sourceUrl": (
                "https://www.milkpoint.com.br"
            )
        },

        {
            "id": "rad-2",

            "title": (
                "Captação do leite recua "
                "sob efeito de estiagem"
            ),

            "summary": (
                "Indicadores de captação "
                "pressionam a oferta."
            ),

            "direction": "alta",

            "impactScore": 8.7,

            "category": "Oferta no Campo",

            "source": "CEPEA / ICAP-L",

            "publishedTime": "Hoje, 07:40",

            "sourceUrl": (
                "https://www.cepea.esalq.usp.br"
            )
        }
    ],

    "weeklyTimeline": [
        {
            "day": "Seg",
            "dateStr": "03/Ago",
            "eventTitle": (
                "Leite Spot abre a semana "
                "com alta de +1,8%"
            ),
            "direction": "alta",
            "impactTag": "Spot",
            "ipmlImpact": "IPML +4"
        },

        {
            "day": "Ter",
            "dateStr": "04/Ago",
            "eventTitle": (
                "Leilão GDT fecha "
                "em alta de +2,4%"
            ),
            "direction": "alta",
            "impactTag": "GDT",
            "ipmlImpact": "IPML +2"
        },

        {
            "day": "Qua",
            "dateStr": "05/Ago",
            "eventTitle": (
                "Movimento de reajuste "
                "nas bacias de GO/MG"
            ),
            "direction": "alta",
            "impactTag": "Captação",
            "ipmlImpact": "IPML +5"
        },

        {
            "day": "Qui",
            "dateStr": "06/Ago",
            "eventTitle": (
                "Milho B3 em R$ 68,50/saca"
            ),
            "direction": "alta",
            "impactTag": "B3",
            "ipmlImpact": "IPML +3"
        },

        {
            "day": "Sex",
            "dateStr": "Hoje",
            "eventTitle": (
                f"IPML Consolidado "
                f"{ipml_final}/100 - Viés Altista"
            ),
            "direction": "alta",
            "impactTag": "IPML",
            "isToday": True,
            "ipmlImpact": "Consolidado"
        }
    ],

    "climateRadar": {
        "summary15Days": (
            "A seca persistente em Goiás e Minas Gerais "
            "restringe pastagens e impõe cautela na oferta."
        ),

        "nationalRegions": [
            {
                "region": "Goiás (GO)",
                "condition": "Seca Severa / Estiagem",
                "weatherType": "drought",
                "impactDirection": "alta",
                "impactLabel": "Altista",
                "source": "INMET",
                "updatedAt": "07/08 15:00",
                "details": (
                    "Prejuízo aos pastos e dependência de silagem."
                )
            },

            {
                "region": "Minas Gerais (MG)",
                "condition": "Estiagem Triângulo & Norte",
                "weatherType": "drought",
                "impactDirection": "alta",
                "impactLabel": "Altista",
                "source": "INMET",
                "updatedAt": "07/08 15:00",
                "details": (
                    "Pressão potencial sobre a captação regional."
                )
            }
        ],

        "globalRegions": [
            {
                "region": "Nova Zelândia",
                "condition": "Sol / Início de Primavera",
                "weatherType": "sun",
                "impactDirection": "neutro",
                "impactLabel": "Neutro",
                "source": "Fonterra / GDT",
                "updatedAt": "04/08",
                "details": (
                    "Fluxos estáveis sem choque identificado."
                )
            }
        ]
    },

    "tickers": [
        {
            "label": "LEITE SPOT (MÉDIA BR)",
            "value": "R$ 3,08 / L",
            "change": "+2,6%",
            "status": "up"
        },

        {
            "label": "MILHO B3",
            "value": "R$ 68,50 / Saca",
            "change": "+1,4%",
            "status": "up"
        }
    ]
}


# ============================================================================
# GEMINI
# ============================================================================
#
# O Gemini é REDATOR/ANALISTA.
# Não é calculadora.
# Não é banco de dados.
# Não é fonte oficial.
# ============================================================================

def generate_ai_text(template):

    api_key = os.environ.get("GEMINI_API_KEY")

    if not api_key:
        raise ValueError(
            "GEMINI_API_KEY não encontrada nas variáveis "
            "de ambiente do GitHub."
        )

    client = genai.Client(api_key=api_key)

    protected_data = {
        "ipml": template["ipml"],
        "signalConfidence": template["signalConfidence"],
        "precisionStatus": template["precisionStatus"],
        "whatChanged": template["whatChanged"],
        "forecastTriggers": template["forecastTriggers"],
        "tickers": template["tickers"],
        "climateRadar": template["climateRadar"],
        "weeklyTimeline": template["weeklyTimeline"],
        "industryHumor": template["industryHumor"]
    }

    prompt = f"""
Refine os textos analíticos do terminal de mercado leiteiro.

IMPORTANTE:

Você NÃO pode alterar nenhum número.

Você NÃO pode alterar:
- IPML
- pesos
- scores
- probabilidades
- preços
- percentuais
- timestamps
- fontes
- URLs
- nomes de empresas
- dados climáticos
- histórico

Você pode apenas melhorar:
- clareza
- concisão
- linguagem institucional
- explicações
- resumo analítico

Dados protegidos:

{json.dumps(protected_data, ensure_ascii=False, indent=2)}

Retorne APENAS um JSON válido.
"""

    response = client.models.generate_content(
        model=MODEL_NAME,

        contents=prompt,

        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.05
        )
    )

    try:
        return json.loads(response.text)

    except json.JSONDecodeError as exc:

        raise ValueError(
            "Gemini retornou conteúdo que não é JSON válido."
        ) from exc


# ============================================================================
# PROTEÇÃO FINAL
# ============================================================================
#
# Mesmo que o Gemini tente alterar os números, o Python recoloca os dados
# matemáticos/originais antes de salvar.
# ============================================================================

def protect_deterministic_data(ai_data, template):

    protected_keys = [
        "todayDateFormatted",
        "createdBy",
        "timestamp",
        "whatChanged",
        "forecastTriggers",
        "ipml",
        "signalConfidence",
        "precisionStatus",
        "compass",
        "industryHumor",
        "impactRadar",
        "weeklyTimeline",
        "climateRadar",
        "tickers"
    ]

    for key in protected_keys:
        ai_data[key] = template[key]

    return ai_data


# ============================================================================
# EXECUÇÃO PRINCIPAL
# ============================================================================

def generate_real_terminal_data():

    print("============================================")
    print(" TERMINAL DO MERCADO LEITEIRO")
    print(" Motor Determinístico + Gemini")
    print("============================================")

    print(
        f"IPML calculado pelo Python: "
        f"{ipml_calculated}/100"
    )

    print(
        f"Confiança calculada: "
        f"{signal_confidence}%"
    )

    ai_data = generate_ai_text(template_data)

    final_data = protect_deterministic_data(
        ai_data,
        template_data
    )

    # =========================================================================
    # VALIDAÇÃO FINAL
    # =========================================================================

    if final_data["ipml"]["score"] != ipml_final:

        raise RuntimeError(
            "FALHA DE SEGURANÇA: "
            "IPML final diferente do IPML calculado."
        )

    if final_data["ipml"]["score"] != int(
        round(
            sum(
                item["score"] * item["weight"]
                for item in indicators.values()
            )
        )
    ):
        raise RuntimeError(
            "FALHA DE AUDITORIA: "
            "IPML não corresponde aos pesos definidos."
        )

    # =========================================================================
    # SALVAR JSON
    # =========================================================================

    os.makedirs(
        os.path.dirname(OUTPUT_PATH),
        exist_ok=True
    )

    with open(
        OUTPUT_PATH,
        "w",
        encoding="utf-8"
    ) as file:

        json.dump(
            final_data,
            file,
            ensure_ascii=False,
            indent=2
        )

    print("--------------------------------------------")
    print("SUCESSO")
    print(f"IPML final: {ipml_final}/100")
    print(f"Confiança: {signal_confidence}%")
    print(f"Arquivo: {OUTPUT_PATH}")
    print("--------------------------------------------")


if __name__ == "__main__":
    generate_real_terminal_data()
