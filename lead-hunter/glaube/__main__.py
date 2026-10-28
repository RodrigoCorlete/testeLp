"""Linha de comando do Glaube. Uso: python -m glaube <comando> (rode dentro de lead-hunter/)."""

import argparse
import json
import sys
from datetime import date, datetime
from pathlib import Path

from . import agenda, places, site_check
from .config import load
from .models import Lead
from .scoring import qualifica
from .storage import TZ, Base


def hoje() -> date:
    return datetime.now(TZ).date()


def cmd_plano(args, cfg, base):
    dia = args.data or hoje()
    bairros = agenda.bairros_do_dia(cfg, dia)
    print(f"Bairros de {dia}: {', '.join(bairros)}")
    print("Consultas sugeridas:")
    for b in bairros:
        for t in cfg["alvo"]["termos"]:
            print(f"  - {t} {b} {cfg['alvo']['municipio']}")
    print(f"Google Maps (Places API): {'disponível' if places.disponivel() else 'sem GOOGLE_MAPS_API_KEY'}")


def cmd_coletar_maps(args, cfg, base):
    if not places.disponivel():
        print("GOOGLE_MAPS_API_KEY não definida — coleta no Google Maps ignorada.")
        return 0
    novos = 0
    for b in agenda.bairros_do_dia(cfg, args.data or hoje()):
        for t in cfg["alvo"]["termos"]:
            consulta = f"{t} em {b}, {cfg['alvo']['municipio']} - {cfg['alvo']['uf']}"
            try:
                encontrados = places.buscar(consulta, cfg["alvo"]["municipio"])
            except Exception as e:
                print(f"falha na consulta '{consulta}': {e}", file=sys.stderr)
                continue
            for l in encontrados:
                novos += base.adicionar(l)[1]
    base.salvar()
    print(f"Google Maps: {novos} lead(s) novo(s).")
    return novos


def cmd_importar(args, cfg, base):
    dados = json.loads(Path(args.arquivo).read_text("utf-8"))
    novos = atualizados = 0
    for d in dados:
        if not d.get("nome") or not d.get("fontes"):
            print(f"ignorado (sem nome ou sem fonte): {d.get('nome')}", file=sys.stderr)
            continue
        _, era_novo = base.adicionar(Lead.from_dict({**d, "status": "novo"}))
        novos += era_novo
        atualizados += not era_novo
    base.salvar()
    print(f"Importação: {novos} novo(s), {atualizados} já existente(s) (dados complementados).")


def cmd_verificar_sites(args, cfg, base):
    from .site_check import classifica_url
    for l in base.leads:
        if l.status != "novo" or l.diagnostico_site:
            continue
        if classifica_url(l.site, cfg["qualificacao"]["dominios_nao_site"]) == "proprio":
            l.diagnostico_site = site_check.verifica_site(l.site)
            print(f"{l.nome}: {l.diagnostico_site}")
    base.salvar()


def cmd_qualificar(args, cfg, base):
    for l in base.leads:
        if l.status == "novo":
            qualifica(l, cfg)
            print(f"{l.status:12} {l.pontuacao:3}  {l.nome}")
    base.salvar()


def cmd_agenda(args, cfg, base):
    dia = args.data or hoje()
    meta = cfg["alvo"]["meta_diaria"]
    ja = [l for l in base.leads if l.agenda_em == dia.isoformat()]
    candidatos = sorted((l for l in base.leads if l.status == "qualificado"),
                        key=lambda l: (-l.pontuacao, l.coletado_em or ""))
    for l in candidatos[: max(0, meta - len(ja))]:
        l.agenda_em = dia.isoformat()
        base.mudar_status(l, "aguardando_aprovacao")
        ja.append(l)
    pendentes = [l for l in base.leads
                 if l.status == "aguardando_aprovacao" and l.agenda_em != dia.isoformat()]
    texto = agenda.gerar(ja, pendentes, cfg, dia, args.obs or [])
    destino = agenda.AGENDA_DIR / f"{dia.isoformat()}.md"
    destino.parent.mkdir(exist_ok=True)
    destino.write_text(texto, "utf-8")
    base.salvar()
    print(f"Agenda salva em {destino} com {len(ja)} lead(s).")


def cmd_diario(args, cfg, base):
    cmd_coletar_maps(args, cfg, base)
    cmd_verificar_sites(args, cfg, base)
    cmd_qualificar(args, cfg, base)
    cmd_agenda(args, cfg, base)


def _decisao(status):
    def f(args, cfg, base):
        l = base.obter(args.id)
        try:
            base.mudar_status(l, status, args.nota)
        except PermissionError as e:
            print(f"BLOQUEADO: {e}", file=sys.stderr)
            return 2
        base.salvar()
        print(f"{l.nome}: {status}")
    return f


def cmd_listar(args, cfg, base):
    for l in sorted(base.leads, key=lambda l: -l.pontuacao):
        if args.status and l.status != args.status:
            continue
        print(f"{l.status:21} {l.pontuacao:3}  {l.id:40} {l.nome}")


def cmd_resumo(args, cfg, base):
    from collections import Counter
    c = Counter(l.status for l in base.leads)
    print(f"Total: {len(base.leads)}")
    for s, n in c.most_common():
        print(f"  {s}: {n}")


def main(argv=None):
    p = argparse.ArgumentParser(prog="glaube", description="Glaube — Lead Hunter de landing pages")
    sub = p.add_subparsers(dest="cmd", required=True)
    data = dict(type=date.fromisoformat, default=None, help="AAAA-MM-DD (padrão: hoje, horário de Brasília)")

    s = sub.add_parser("plano", help="bairros e consultas do dia"); s.add_argument("--data", **data); s.set_defaults(f=cmd_plano)
    s = sub.add_parser("coletar-maps", help="coleta via Google Places API"); s.add_argument("--data", **data); s.set_defaults(f=cmd_coletar_maps)
    s = sub.add_parser("importar", help="importa candidatos (JSON) pesquisados pelo agente"); s.add_argument("arquivo"); s.set_defaults(f=cmd_importar)
    s = sub.add_parser("verificar-sites", help="analisa sites próprios dos leads novos"); s.set_defaults(f=cmd_verificar_sites)
    s = sub.add_parser("qualificar", help="pontua leads novos"); s.set_defaults(f=cmd_qualificar)
    for nome, fn in (("agenda", cmd_agenda), ("diario", cmd_diario)):
        s = sub.add_parser(nome); s.add_argument("--data", **data)
        s.add_argument("--obs", action="append", help="observação a registrar na agenda")
        s.set_defaults(f=fn)
    for nome, st in (("aprovar", "aprovado"), ("rejeitar", "rejeitado"), ("contatado", "contatado")):
        s = sub.add_parser(nome); s.add_argument("id"); s.add_argument("--nota"); s.set_defaults(f=_decisao(st))
    s = sub.add_parser("listar"); s.add_argument("--status"); s.set_defaults(f=cmd_listar)
    s = sub.add_parser("resumo"); s.set_defaults(f=cmd_resumo)

    args = p.parse_args(argv)
    ret = args.f(args, load(), Base())
    return ret if isinstance(ret, int) and ret == 2 else 0


if __name__ == "__main__":
    sys.exit(main())
