"""Gera a agenda diária de prospecção em Markdown."""

from datetime import date, datetime, timedelta

from .config import ROOT
from .models import Lead

AGENDA_DIR = ROOT / "agenda"


def bairros_do_dia(cfg: dict, dia: date) -> list[str]:
    """Rodízio determinístico: cada dia cobre um bloco diferente de bairros."""
    bairros, n = cfg["alvo"]["bairros"], cfg["alvo"]["bairros_por_dia"]
    inicio = (dia.toordinal() * n) % len(bairros)
    return [bairros[(inicio + i) % len(bairros)] for i in range(n)]


def angulo(lead: Lead) -> str:
    texto = " ".join(lead.motivos)
    if "não tem site" in texto:
        return ("Mostrar como uma landing page com catálogo e botão de WhatsApp transforma "
                "seguidores do Instagram em pedidos, sem depender só do direct.")
    if "agregador" in texto:
        return ("O link da bio leva a um agregador/rede social. Propor uma página própria, "
                "com a marca da loja, que concentre catálogo, localização e WhatsApp.")
    if "site com falhas" in texto:
        return "Apontar as falhas concretas do site atual e mostrar uma landing page focada em conversão."
    return "Apresentar landing pages para campanhas sazonais (coleções, liquidações, datas comemorativas)."


def rascunho(lead: Lead, cfg: dict) -> str:
    nome_loja = lead.nome
    base = (f"Olá, equipe da {nome_loja}! Tudo bem? Vi o trabalho de vocês"
            f"{' no Instagram' if lead.instagram else ''} e gostei muito das peças. ")
    if "não tem site" in " ".join(lead.motivos):
        base += ("Não encontrei um site próprio da loja. "
                 "Eu crio landing pages para lojas de moda: uma página rápida, bonita no celular, "
                 "com catálogo e botão direto pro WhatsApp. ")
    else:
        base += ("Eu crio landing pages para lojas de moda, páginas pensadas para transformar "
                 "visitas em conversas no WhatsApp e vendas. ")
    return base + "Posso te mostrar um exemplo rápido, sem compromisso?"


def gerar(leads: list[Lead], pendentes: list[Lead], cfg: dict, dia: date,
          observacoes: list[str]) -> str:
    inicio = datetime.combine(dia, datetime.min.time()).replace(hour=10)
    linhas = [
        f"# Agenda de prospecção — {dia.strftime('%d/%m/%Y')}",
        "",
        f"Agente: **{cfg['agente']['nome']}** · Serviço: {cfg['agente']['servico']} · "
        f"Segmento: {cfg['alvo']['segmento']} · Região: {cfg['alvo']['municipio']}/{cfg['alvo']['uf']}",
        "",
        f"Bairros pesquisados hoje: {', '.join(bairros_do_dia(cfg, dia))}",
        "",
        "> ⚠️ **Nenhum contato foi feito.** Todo contato externo exige aprovação humana. "
        "Para decidir: `python -m glaube aprovar <id>` ou `python -m glaube rejeitar <id>`. "
        "Depois de falar com a loja: `python -m glaube contatado <id>`.",
        "",
        f"## Leads qualificados de hoje ({len(leads)}/{cfg['alvo']['meta_diaria']})",
        "",
    ]
    if not leads:
        linhas += ["Nenhum lead novo qualificado hoje.", ""]
    else:
        linhas += ["| # | Horário sugerido | Loja | Bairro | Pontuação | Canal | ID |",
                   "|---|---|---|---|---|---|---|"]
        for i, l in enumerate(leads, 1):
            hora = (inicio + timedelta(minutes=30 * (i - 1))).strftime("%H:%M")
            canal = f"@{l.instagram}" if l.instagram else (l.telefone or l.site or "Google Maps")
            linhas.append(f"| {i} | {hora} | {l.nome} | {l.bairro or '—'} | {l.pontuacao} | {canal} | `{l.id}` |")
        linhas.append("")
        for i, l in enumerate(leads, 1):
            linhas += [
                f"### {i}. {l.nome} — {l.pontuacao} pts",
                "",
                f"- **ID:** `{l.id}` · **Status:** {l.status}",
                f"- **Bairro / endereço:** {l.bairro or '—'} / {l.endereco or '—'}",
                f"- **Instagram:** {'https://instagram.com/' + l.instagram if l.instagram else '—'}",
                f"- **Telefone:** {l.telefone or '—'} · **Site:** {l.site or '—'}",
                f"- **Google:** {l.google_maps_url or '—'}"
                + (f" · nota {l.nota} ({l.avaliacoes} avaliações)" if l.nota is not None else ""),
                f"- **Por que é oportunidade:** {'; '.join(l.motivos)}",
                f"- **Ângulo de abordagem:** {angulo(l)}",
                f"- **Fontes:** {'; '.join(l.fontes) or '—'}",
            ]
            if l.observacoes:
                linhas.append(f"- **Observações:** {l.observacoes}")
            linhas += ["", "Rascunho de mensagem (**não enviado — só após aprovação**):", "",
                       f"> {rascunho(l, cfg)}", ""]
    if pendentes:
        linhas += ["## Ainda aguardando aprovação (dias anteriores)", ""]
        linhas += [f"- `{l.id}` — {l.nome} ({l.pontuacao} pts, na agenda de {l.agenda_em})" for l in pendentes]
        linhas.append("")
    if observacoes:
        linhas += ["## Observações da execução", ""] + [f"- {o}" for o in observacoes] + [""]
    return "\n".join(linhas)
