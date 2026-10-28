"""Base de leads em JSON versionado no git (legível e auditável em cada diff)."""

import json
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from .config import ROOT
from .models import STATUS, Lead

DB_PATH = ROOT / "data" / "leads.json"
TZ = ZoneInfo("America/Sao_Paulo")


def agora() -> str:
    return datetime.now(TZ).isoformat(timespec="seconds")


class Base:
    def __init__(self, path: Path = DB_PATH):
        self.path = path
        self.leads: list[Lead] = []
        if path.exists():
            self.leads = [Lead.from_dict(d) for d in json.loads(path.read_text("utf-8"))]

    def salvar(self):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        dados = [l.to_dict() for l in sorted(self.leads, key=lambda l: l.id)]
        self.path.write_text(json.dumps(dados, ensure_ascii=False, indent=2) + "\n", "utf-8")

    def obter(self, lead_id: str) -> Lead:
        for l in self.leads:
            if l.id == lead_id:
                return l
        raise KeyError(f"lead não encontrado: {lead_id}")

    def duplicado(self, novo: Lead) -> Lead | None:
        chaves = novo.chaves()
        for l in self.leads:
            if l.chaves() & chaves:
                return l
        return None

    def adicionar(self, novo: Lead) -> tuple[Lead, bool]:
        """Insere o lead ou completa o existente. Retorna (lead, era_novo)."""
        existente = self.duplicado(novo)
        if existente:
            for campo in ("bairro", "endereco", "categoria", "telefone", "site", "instagram",
                          "google_maps_url", "google_place_id", "nota", "avaliacoes",
                          "situacao_google", "observacoes"):
                if getattr(existente, campo) in (None, "") and getattr(novo, campo) not in (None, ""):
                    setattr(existente, campo, getattr(novo, campo))
            existente.fontes = sorted(set(existente.fontes) | set(novo.fontes))
            return existente, False
        while any(l.id == novo.id for l in self.leads):
            novo.id += "-x"
        novo.coletado_em = novo.coletado_em or agora()
        novo.historico.append({"em": novo.coletado_em, "evento": "coletado"})
        self.leads.append(novo)
        return novo, True

    def mudar_status(self, lead: Lead, status: str, nota: str | None = None):
        if status not in STATUS:
            raise ValueError(f"status inválido: {status}")
        if status == "contatado" and lead.status != "aprovado":
            raise PermissionError(
                f"'{lead.nome}' está como '{lead.status}'. Contato só pode ser registrado "
                "depois de aprovação humana (status 'aprovado')."
            )
        lead.historico.append({"em": agora(), "evento": f"{lead.status} -> {status}",
                               **({"nota": nota} if nota else {})})
        lead.status = status
        if status in ("aprovado", "rejeitado"):
            lead.decidido_em, lead.decisao_nota = agora(), nota
