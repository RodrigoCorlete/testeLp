import tempfile
import unittest
from datetime import date
from pathlib import Path

from glaube import agenda
from glaube.config import load
from glaube.models import Lead
from glaube.scoring import qualifica
from glaube.site_check import analisa_html, classifica_url
from glaube.storage import Base

CFG = load()


class TestModelo(unittest.TestCase):
    def test_normalizacao(self):
        l = Lead(nome="Loja X", instagram="https://www.instagram.com/Loja.X/", telefone="+55 (21) 99999-0000")
        self.assertEqual(l.instagram, "loja.x")
        self.assertEqual(l.telefone, "21999990000")
        self.assertEqual(Lead(nome="A", instagram="@abc").instagram, "abc")


class TestQualificacao(unittest.TestCase):
    def test_sem_site_com_instagram_qualifica(self):
        l = qualifica(Lead(nome="Ateliê Flor", instagram="@ateliefl", telefone="21988887777"), CFG)
        self.assertEqual(l.status, "qualificado")
        self.assertEqual(l.pontuacao, 60)

    def test_rede_descartada(self):
        self.assertEqual(qualifica(Lead(nome="FARM Rio Ipanema", instagram="farm"), CFG).status, "descartado")
        self.assertEqual(qualifica(Lead(nome="Lojas Renner", instagram="x"), CFG).status, "descartado")

    def test_rede_nao_casa_substring(self):
        l = qualifica(Lead(nome="Farmácia da Moda", instagram="fm", telefone="2133334444"), CFG)
        self.assertEqual(l.status, "qualificado")

    def test_fechado_descartado(self):
        l = qualifica(Lead(nome="Y", instagram="y", situacao_google="CLOSED_PERMANENTLY"), CFG)
        self.assertEqual(l.status, "descartado")

    def test_site_nao_verificado_nao_conta_como_sem_site(self):
        l = qualifica(Lead(nome="Z", site="lojaz.com.br", instagram="z"), CFG)
        self.assertIn("não pôde ser verificado", " ".join(l.motivos))

    def test_agregador(self):
        dom = CFG["qualificacao"]["dominios_nao_site"]
        self.assertEqual(classifica_url("https://linktr.ee/x", dom), "agregador")
        self.assertEqual(classifica_url(None, dom), "sem_site")
        self.assertEqual(classifica_url("https://lojax.com.br", dom), "proprio")

    def test_html_fraco(self):
        prob = analisa_html("<html><body>oi</body></html>", "http://x.com")["problemas"]
        self.assertIn("sem HTTPS", prob)
        self.assertIn("sem botão de WhatsApp", prob)


class TestBaseEAprovacao(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp()) / "leads.json"
        self.base = Base(self.tmp)

    def test_deduplica_por_instagram(self):
        self.base.adicionar(Lead(nome="Loja A", instagram="lojaa", fontes=["s1"]))
        l, novo = self.base.adicionar(Lead(nome="Loja A Copacabana", instagram="@lojaa", telefone="2122223333", fontes=["s2"]))
        self.assertFalse(novo)
        self.assertEqual(l.telefone, "2122223333")
        self.assertEqual(l.fontes, ["s1", "s2"])
        self.base.salvar()
        self.assertEqual(len(Base(self.tmp).leads), 1)

    def test_contato_exige_aprovacao(self):
        l, _ = self.base.adicionar(Lead(nome="Loja B", instagram="b"))
        self.base.mudar_status(l, "aguardando_aprovacao")
        with self.assertRaises(PermissionError):
            self.base.mudar_status(l, "contatado")
        self.base.mudar_status(l, "aprovado", "ok")
        self.base.mudar_status(l, "contatado")
        self.assertEqual(l.status, "contatado")


class TestAgenda(unittest.TestCase):
    def test_rodizio_bairros(self):
        a = agenda.bairros_do_dia(CFG, date(2026, 10, 28))
        b = agenda.bairros_do_dia(CFG, date(2026, 10, 29))
        self.assertEqual(len(a), CFG["alvo"]["bairros_por_dia"])
        self.assertNotEqual(a, b)

    def test_agenda_avisa_sem_contato(self):
        l = qualifica(Lead(nome="Loja C", instagram="c", telefone="21999998888", fontes=["teste"]), CFG)
        md = agenda.gerar([l], [], CFG, date(2026, 10, 28), [])
        self.assertIn("Nenhum contato foi feito", md)
        self.assertIn("não enviado", md)


if __name__ == "__main__":
    unittest.main()
