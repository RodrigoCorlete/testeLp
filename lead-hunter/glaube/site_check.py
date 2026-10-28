"""Diagnóstico da presença web de um lead (site próprio x agregador x fraco)."""

import re
import urllib.error
import urllib.request
from urllib.parse import urlparse

UA = "Mozilla/5.0 (compatible; GlaubeLeadHunter/0.1)"


def classifica_url(url: str | None, dominios_nao_site: list[str]) -> str:
    """'sem_site', 'agregador' ou 'proprio'."""
    if not url:
        return "sem_site"
    host = urlparse(url).netloc.lower()
    alvo = host + urlparse(url).path.lower()
    if any(d in alvo for d in dominios_nao_site):
        return "agregador"
    return "proprio"


def analisa_html(html: str, url_final: str) -> dict:
    """Sinais objetivos de qualidade de página. Cada problema vira uma oportunidade."""
    h = html.lower()
    problemas = []
    if not url_final.startswith("https://"):
        problemas.append("sem HTTPS")
    if 'name="viewport"' not in h and "name='viewport'" not in h:
        problemas.append("não adaptado a celular (sem meta viewport)")
    if not re.search(r"<title>\s*[^<\s][^<]*</title>", h):
        problemas.append("sem título de página")
    if 'name="description"' not in h and "name='description'" not in h:
        problemas.append("sem meta description (SEO)")
    if not re.search(r"wa\.me|api\.whatsapp\.com|whatsapp", h):
        problemas.append("sem botão de WhatsApp")
    if not re.search(r"fbq\(|gtag\(|googletagmanager|google-analytics", h):
        problemas.append("sem pixel/analytics de conversão")
    if len(re.sub(r"<[^>]+>", " ", h).split()) < 80:
        problemas.append("pouco conteúdo")
    return {"problemas": problemas}


def verifica_site(url: str, timeout: int = 12) -> dict:
    """Busca a página. Falha de rede é registrada como 'nao_verificado', nunca como 'sem site'."""
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            html = resp.read(600_000).decode(resp.headers.get_content_charset() or "utf-8", "replace")
            diag = analisa_html(html, resp.geturl())
            diag.update(verificado=True, url_final=resp.geturl(), http=resp.status)
            return diag
    except urllib.error.HTTPError as e:
        if e.code in (403, 407) and "tunnel" in str(e.reason).lower():
            return {"verificado": False, "erro": "bloqueado pela rede do ambiente"}
        return {"verificado": True, "http": e.code, "problemas": [f"site responde HTTP {e.code}"]}
    except Exception as e:  # DNS, timeout, proxy, TLS
        return {"verificado": False, "erro": f"{type(e).__name__}: {e}"[:200]}
