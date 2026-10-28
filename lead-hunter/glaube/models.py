"""Modelo de lead e normalização de campos."""

import re
import unicodedata
from dataclasses import asdict, dataclass, field

# Ciclo de vida. Nenhum status leva a contato automático: "contatado" só é
# aceito depois de "aprovado", e quem registra o contato é uma pessoa.
STATUS = (
    "novo",                  # coletado, ainda não pontuado
    "descartado",            # não atende aos critérios
    "qualificado",           # passou na pontuação, fora da agenda
    "aguardando_aprovacao",  # na agenda do dia, esperando decisão humana
    "aprovado",              # liberado por uma pessoa para contato
    "rejeitado",             # pessoa decidiu não contatar
    "contatado",             # pessoa registrou que fez o contato
)


def slug(texto: str) -> str:
    texto = unicodedata.normalize("NFKD", texto or "").encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", texto.lower()).strip("-")


def normaliza_instagram(valor: str | None) -> str | None:
    if not valor:
        return None
    valor = valor.strip()
    m = re.search(r"instagram\.com/([A-Za-z0-9._]+)", valor)
    handle = m.group(1) if m else valor.lstrip("@")
    handle = handle.strip("/").lower()
    return handle if re.fullmatch(r"[a-z0-9._]{1,30}", handle) else None


def normaliza_telefone(valor: str | None) -> str | None:
    if not valor:
        return None
    digitos = re.sub(r"\D", "", valor)
    if digitos.startswith("55") and len(digitos) in (12, 13):
        digitos = digitos[2:]
    return digitos if len(digitos) in (10, 11) else None


@dataclass
class Lead:
    nome: str
    bairro: str | None = None
    endereco: str | None = None
    categoria: str | None = None
    telefone: str | None = None
    site: str | None = None
    instagram: str | None = None
    google_maps_url: str | None = None
    google_place_id: str | None = None
    nota: float | None = None
    avaliacoes: int | None = None
    situacao_google: str | None = None  # OPERATIONAL, CLOSED_PERMANENTLY...
    fontes: list[str] = field(default_factory=list)
    observacoes: str | None = None
    # preenchidos pelo agente
    id: str = ""
    status: str = "novo"
    pontuacao: int = 0
    motivos: list[str] = field(default_factory=list)
    diagnostico_site: dict = field(default_factory=dict)
    coletado_em: str | None = None
    agenda_em: str | None = None
    decidido_em: str | None = None
    decisao_nota: str | None = None
    historico: list[dict] = field(default_factory=list)

    def __post_init__(self):
        self.nome = (self.nome or "").strip()
        self.instagram = normaliza_instagram(self.instagram)
        self.telefone = normaliza_telefone(self.telefone)
        if self.site:
            self.site = self.site.strip()
            if not re.match(r"https?://", self.site):
                self.site = "https://" + self.site
        if not self.id:
            self.id = slug(f"{self.nome}-{self.bairro or ''}")[:60]

    def chaves(self) -> set[str]:
        """Identificadores usados para evitar duplicidade."""
        ch = {"nome:" + slug(self.nome)}
        if self.google_place_id:
            ch.add("place:" + self.google_place_id)
        if self.instagram:
            ch.add("ig:" + self.instagram)
        if self.telefone:
            ch.add("tel:" + self.telefone)
        return ch

    def to_dict(self) -> dict:
        return asdict(self)

    @classmethod
    def from_dict(cls, d: dict) -> "Lead":
        campos = cls.__dataclass_fields__
        return cls(**{k: v for k, v in d.items() if k in campos})
