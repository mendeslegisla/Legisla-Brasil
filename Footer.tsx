import Link from "next/link";
import { SITE } from "@/content/site";

export default function Footer() {
  return (
    <footer className="lg-footer">
      <div className="lg-footer__cols">
        <div>
          <h2>Legisla Brasil</h2>
          <p>Organização suprapartidária e sem fins lucrativos que fortalece quem constrói o futuro do Brasil no Legislativo.</p>
        </div>
        <nav aria-label="Atuação">
          <h3>Atuação</h3>
          <ul>
            <li><Link href="/mandatos/">Para mandatos</Link></li>
            <li><Link href="/partidos/">Para partidos</Link></li>
            <li><Link href="/comunidade/">Comunidade</Link></li>
            <li><Link href="/publicacoes/">Pesquisas e guias</Link></li>
            <li><Link href="/na-midia/">Legisla na mídia</Link></li>
          </ul>
        </nav>
        <nav aria-label="Sobre nós">
          <h3>Sobre nós</h3>
          <ul>
            <li><Link href="/quem-somos/">Quem somos</Link></li>
            <li><Link href="/equipe/">Equipe e governança</Link></li>
            <li><Link href="/parceiros/">Redes e parceiros</Link></li>
            <li><Link href="/transparencia/">Transparência</Link></li>
            <li><Link href="/en/" hrefLang="en" lang="en">English</Link></li>
          </ul>
        </nav>
        <div>
          <h3>Contato</h3>
          <ul>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a href={SITE.whatsapp.href}>WhatsApp {SITE.whatsapp.label}</a></li>
            <li>Imprensa: <a href={`mailto:${SITE.press.email}`}>{SITE.press.email}</a></li>
            <li>
              <a href={SITE.social.instagram} rel="noopener" target="_blank">Instagram</a> · <a href={SITE.social.linkedin} rel="noopener" target="_blank">LinkedIn</a> · <a href={SITE.social.facebook} rel="noopener" target="_blank">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg-footer__base">
        <p>© {new Date().getFullYear()} Legisla Brasil</p>
        <p>
          <Link href="/politica-de-privacidade/">Política de Privacidade</Link> · <a href={SITE.conduct} rel="noopener" target="_blank">Código de Conduta</a> · <Link href="/contato/">Contato</Link>
        </p>
      </div>
    </footer>
  );
}
