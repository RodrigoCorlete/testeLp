"""Coleta no Google Maps via Places API (New). Requer GOOGLE_MAPS_API_KEY."""

import json
import os
import urllib.request

from .models import Lead

URL = "https://places.googleapis.com/v1/places:searchText"
CAMPOS = ",".join([
    "places.id", "places.displayName", "places.formattedAddress", "places.addressComponents",
    "places.nationalPhoneNumber", "places.websiteUri", "places.googleMapsUri",
    "places.rating", "places.userRatingCount", "places.businessStatus", "places.primaryTypeDisplayName",
])


def disponivel() -> bool:
    return bool(os.environ.get("GOOGLE_MAPS_API_KEY"))


def _bairro(componentes: list[dict]) -> str | None:
    for c in componentes or []:
        if "sublocality" in c.get("types", []) or "sublocality_level_1" in c.get("types", []):
            return c.get("longText")
    return None


def _municipio(componentes: list[dict]) -> str | None:
    for c in componentes or []:
        if "administrative_area_level_2" in c.get("types", []) or "locality" in c.get("types", []):
            return c.get("longText")
    return None


def buscar(consulta: str, municipio: str, limite: int = 20) -> list[Lead]:
    corpo = {"textQuery": consulta, "languageCode": "pt-BR", "regionCode": "BR", "pageSize": limite}
    req = urllib.request.Request(
        URL, data=json.dumps(corpo).encode(), method="POST",
        headers={"Content-Type": "application/json",
                 "X-Goog-Api-Key": os.environ["GOOGLE_MAPS_API_KEY"],
                 "X-Goog-FieldMask": CAMPOS},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        dados = json.load(resp)
    leads = []
    for p in dados.get("places", []):
        comps = p.get("addressComponents", [])
        if (_municipio(comps) or "").lower() != municipio.lower():
            continue  # fora do município-alvo
        site = p.get("websiteUri")
        leads.append(Lead(
            nome=p.get("displayName", {}).get("text", ""),
            bairro=_bairro(comps),
            endereco=p.get("formattedAddress"),
            categoria=(p.get("primaryTypeDisplayName") or {}).get("text"),
            telefone=p.get("nationalPhoneNumber"),
            site=site,
            instagram=site if site and "instagram.com" in site else None,
            google_maps_url=p.get("googleMapsUri"),
            google_place_id=p.get("id"),
            nota=p.get("rating"),
            avaliacoes=p.get("userRatingCount"),
            situacao_google=p.get("businessStatus"),
            fontes=[f"Google Maps (Places API): {consulta}"],
        ))
    return leads
