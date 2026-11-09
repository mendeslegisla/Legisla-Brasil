import type { Metadata } from "next";
import Agenda from "@/components/site/Agenda";
import Backdrop from "@/components/site/Backdrop";
import { Donate, Newsletter } from "@/components/site/blocks";
import { HeroTitle } from "@/components/site/Hero";
import Personas from "@/components/site/Personas";
import Statement from "@/components/site/Statement";
import { Btn, Chip, Grid, Head, PublicationCard, Rows, Section, TextLink } from "@/components/site/ui";
import { MEDIA, PUBLICATIONS } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Legisla Brasil: fortalecendo quem faz a política" },
  description: "Consultoria para mandatos e partidos, formação para quem trabalha nos bastidores e dados que decodificam o Legislativo. Suprapartidária e sem fins lucrativos, desde 2017.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const juventudes = PUBLICATIONS[0];
  return (
    <>
      <section className="lg-section lg-hero has-backdrop has-floor">
        <Backdrop className="is-floor" type="hemiciclo" />
        <div className="lg-inner">
          <div className="lg-split is-wide-left">
            <div className="lg-seq">
              <HeroTitle>Ajudamos quem está na política a entregar mais para a população.</HeroTitle>
              <p className="lg-lede">Somos uma organização suprapartidária e sem fins lucrativos. Desde 2017, apoiamos mandatos e partidos, formamos quem trabalha nos bastidores e publicamos dados que decodificam o Legislativo.</p>
              <div className="lg-actions">
                <Btn arrow href="/contato/">Fale com a equipe</Btn>
                <Btn href="/publicacoes/" variant="ghost">Ver pesquisas</Btn>
              </div>
            </div>
            <aside aria-label="Pesquisa em destaque" className="lg-evidence">
              <Chip open>Pesquisa nova, 2026</Chip>
              <h2>{juventudes.title}</h2>
              <p className="lg-muted">Por que tão poucos jovens chegam ao poder, e o que os partidos podem fazer para mudar isso.</p>
              <blockquote className="lg-press">“{MEDIA.imprensa[0].title}”<cite>{MEDIA.imprensa[0].source}, sobre a pesquisa</cite></blockquote>
              <TextLink href={juventudes.href}>Baixar a pesquisa (PDF)</TextLink>
            </aside>
          </div>
        </div>
      </section>

      <Section id="publicos" tone="surface">
        <h2>Você é…</h2>
        <Personas />
        <p className="lg-small lg-muted">É da imprensa ou pesquisa o Legislativo? <a href="/contato/">Fale com a nossa assessoria</a>.</p>
      </Section>

      <Section backdrop="rede" backdropClass="is-side" tone="ink">
        <Statement />
        <p className="lg-small lg-muted">Fonte: Relatório de Impacto 2025. <a href="/transparencia/">Ver todos os relatórios</a></p>
      </Section>

      <Section>
        <Head side="Quando as inscrições fecham, a lista de espera fica aberta." title="Programas" />
        <Agenda />
      </Section>

      <Section tone="surface">
        <div className="lg-head">
          <h2>Pesquisas e guias</h2>
          <TextLink href="/publicacoes/">Ver todas as publicações</TextLink>
        </div>
        <Grid cols={3} min="16rem">
          {[PUBLICATIONS[0], PUBLICATIONS[1], PUBLICATIONS[3]].map((p) => <PublicationCard key={p.title} pub={p} />)}
        </Grid>
      </Section>

      <Section>
        <div className="lg-head">
          <h2>Legisla na mídia</h2>
          <TextLink href="/na-midia/">Ver tudo</TextLink>
        </div>
        <Rows items={[MEDIA.artigos[0], ...MEDIA.imprensa]} />
      </Section>

      <Donate />
      <Newsletter />
    </>
  );
}
