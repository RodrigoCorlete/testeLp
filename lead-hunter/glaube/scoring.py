"""Qualificação: regras explícitas e auditáveis, sem caixa-preta."""

from .models import Lead, slug
from .site_check import classifica_url


def eh_rede(nome: str, redes: list[str]) -> bool:
    tokens = f"-{slug(nome)}-"
    return any(f"-{slug(r)}-" in tokens for r in redes)


def qualifica(lead: Lead, cfg: dict) -> Lead:
    q, p = cfg["qualificacao"], cfg["pesos"]
    motivos: list[str] = []

    if eh_rede(lead.nome, q["excluir_redes"]):
        lead.status, lead.pontuacao = "descartado", 0
        lead.motivos = ["rede/franquia grande — fora do público-alvo"]
        return lead
    if lead.situacao_google and lead.situacao_google != "OPERATIONAL":
        lead.status, lead.pontuacao = "descartado", 0
        lead.motivos = [f"Google Maps indica situação {lead.situacao_google}"]
        return lead
    if not (lead.instagram or lead.telefone or lead.site or lead.google_maps_url):
        lead.status, lead.pontuacao = "descartado", 0
        lead.motivos = ["nenhum canal público identificado"]
        return lead

    pontos = 0
    tipo = classifica_url(lead.site, q["dominios_nao_site"])
    diag = lead.diagnostico_site or {}
    if tipo == "sem_site":
        pontos += p["sem_site"]
        motivos.append("não tem site próprio identificado")
    elif tipo == "agregador":
        pontos += p["site_agregador"]
        motivos.append("o 'site' é só rede social/agregador de links")
    elif diag.get("verificado"):
        problemas = diag.get("problemas", [])
        ganho = min(p["site_fraco_max"], 4 * len(problemas))
        pontos += ganho
        if problemas:
            motivos.append("site com falhas: " + ", ".join(problemas))
        else:
            motivos.append("site próprio sem falhas óbvias (menor prioridade)")
    else:
        pontos += p["site_nao_verificado"]
        motivos.append("site próprio não pôde ser verificado")

    if lead.instagram:
        pontos += p["tem_instagram"]
        motivos.append(f"ativo no Instagram (@{lead.instagram})")
    if lead.avaliacoes is not None:
        if lead.avaliacoes >= 50:
            pontos += p["avaliacoes_50"]
            motivos.append(f"negócio estabelecido ({lead.avaliacoes} avaliações no Google)")
        elif lead.avaliacoes >= 10:
            pontos += p["avaliacoes_10"]
            motivos.append(f"negócio ativo ({lead.avaliacoes} avaliações no Google)")
    if lead.nota is not None and lead.nota >= 4.3:
        pontos += p["nota_alta"]
        motivos.append(f"boa reputação (nota {lead.nota})")
    if lead.telefone:
        pontos += p["tem_telefone"]
        motivos.append("telefone público disponível")

    lead.pontuacao = min(pontos, 100)
    lead.motivos = motivos
    lead.status = "qualificado" if lead.pontuacao >= q["pontuacao_minima"] else "descartado"
    if lead.status == "descartado":
        motivos.append(f"pontuação {lead.pontuacao} abaixo do mínimo {q['pontuacao_minima']}")
    return lead
