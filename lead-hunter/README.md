# Glaube — Lead Hunter de landing pages

Agente que encontra lojas de moda e acessórios no município do Rio de Janeiro com potencial
para contratar uma landing page, qualifica cada uma com regras explícitas e monta uma agenda
diária de prospecção. **Ele nunca entra em contato com ninguém**: todo contato depende de
aprovação humana.

## Arquitetura

```
Tarefa agendada (diária) ──► sessão Claude Code ──► segue ROTINA.md
                                   │
        ┌──────────────────────────┼─────────────────────────────┐
        ▼                          ▼                             ▼
 Google Places API          Pesquisa web (Instagram,      Verificação de sites
 (coletar-maps, se houver   diretórios, Google Maps)      (site_check: HTTPS, celular,
  GOOGLE_MAPS_API_KEY)      → entrada/AAAA-MM-DD.json      WhatsApp, pixel, SEO)
        └──────────────┬───────────┘                             │
                       ▼                                         │
         importar → deduplicação (nome, @, telefone, place_id) ◄─┘
                       ▼
         qualificar (scoring.py + config/glaube.toml)
                       ▼
         agenda/AAAA-MM-DD.md  +  data/leads.json  → commit & push
                       ▼
         Pessoa revisa → aprovar / rejeitar → contato manual → contatado
```

- `glaube/` — pacote Python (só biblioteca padrão, Python ≥ 3.11).
- `config/glaube.toml` — segmento, região, meta, bairros, termos, pesos, redes excluídas.
- `data/leads.json` — base de leads com histórico de cada mudança de status.
- `entrada/` — candidatos brutos de cada dia, com as fontes.
- `agenda/` — agenda diária em Markdown.
- `ROTINA.md` — instruções que o agente segue na execução diária.

## Qualificação (0–100, mínimo 50)

| Sinal | Pontos |
|---|---|
| Sem site próprio identificado | 35 |
| "Site" é só Instagram/Linktree/WhatsApp | 30 |
| Site próprio com falhas (4 por falha, até 20) | até 20 |
| Site próprio não verificável | 10 |
| Ativo no Instagram | 15 |
| ≥ 10 / ≥ 50 avaliações no Google | 10 / 20 |
| Nota ≥ 4,3 | 10 |
| Telefone público | 10 |

Descarta na hora: redes/franquias da lista de exclusão, lojas fechadas, lojas sem nenhum canal público.

## Uso

```bash
cd lead-hunter
python -m glaube plano                       # bairros e consultas do dia
python -m glaube importar entrada/2026-10-28.json
python -m glaube diario                      # coleta Maps*, verifica sites, qualifica, gera agenda
python -m glaube listar --status aguardando_aprovacao
python -m glaube aprovar <id> --nota "ok, falar no direct"
python -m glaube rejeitar <id> --nota "já tem agência"
python -m glaube contatado <id>              # bloqueado se o lead não foi aprovado
python -m unittest discover -s tests -t .
```

\* só com `GOOGLE_MAPS_API_KEY` definida no ambiente.

## Limitações atuais do ambiente

- A rede do ambiente de nuvem bloqueia `instagram.com` e a maioria dos sites; a pesquisa usa os
  resultados da busca web. "Sem site" significa "nenhum site identificado nas fontes" — confirme
  o link da bio antes de contatar.
- Sem `GOOGLE_MAPS_API_KEY`, não há nota/avaliações do Google, e a maioria dos leads empata em 50.
  Com a chave, a pontuação diferencia muito melhor.
