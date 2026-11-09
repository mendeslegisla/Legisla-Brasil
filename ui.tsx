import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Doc, Faq, MediaItem, Motif, Person, Publication, Testimonial } from "@/content/site";
import Backdrop from "./Backdrop";
import { ArrowRight } from "./icons";

/* ---------- Estrutura ---------- */

export type Tone = "surface" | "paper" | "wine" | "ink";

export function Section({ tone, id, className, children, backdrop, backdropClass }: {
  tone?: Tone; id?: string; className?: string; children: ReactNode; backdrop?: Motif; backdropClass?: string;
}) {
  return (
    <section className={cn("lg-section", tone && `is-${tone}`, backdrop && "has-backdrop", className)} id={id}>
      {backdrop ? <Backdrop className={backdropClass} type={backdrop} /> : null}
      <div className="lg-inner">{children}</div>
    </section>
  );
}

export function Head({ title, side }: { title: ReactNode; side?: ReactNode }) {
  return (
    <div className="lg-head">
      <h2>{title}</h2>
      {side ? <p className="lg-muted">{side}</p> : null}
    </div>
  );
}

export function Grid({ cols = 3, min = "16rem", className, children }: { cols?: number; min?: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn("lg-grid", className)} style={{ "--cols": cols, "--min": min } as CSSProperties}>
      {children}
    </div>
  );
}

/* ---------- Ações ---------- */

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

export function Btn({ href, children, variant, arrow }: { href: string; children: ReactNode; variant?: "ghost" | "light" | "dark"; arrow?: boolean }) {
  const cls = cn("lg-btn", variant && `is-${variant}`);
  const inner = (
    <>
      {children}
      {arrow ? <ArrowRight /> : null}
    </>
  );
  return isExternal(href) ? (
    <a className={cls} href={href} rel="noopener" target={href.startsWith("http") ? "_blank" : undefined}>{inner}</a>
  ) : (
    <Link className={cls} href={href}>{inner}</Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const inner = (
    <>
      {children}
      <ArrowRight size={15} />
    </>
  );
  return isExternal(href) ? (
    <a className={cn("lg-link", className)} href={href} rel="noopener" target={href.startsWith("http") ? "_blank" : undefined}>{inner}</a>
  ) : (
    <Link className={cn("lg-link", className)} href={href}>{inner}</Link>
  );
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="lg-actions">{children}</div>;
}

/* ---------- Conteúdo ---------- */

export function Card({ title, children, link, chip }: { title: ReactNode; children?: ReactNode; link?: { label: string; href: string }; chip?: { text: string; open?: boolean | null } }) {
  return (
    <article className="lg-card">
      <h3>{title}</h3>
      {children ? <div className="lg-muted">{children}</div> : null}
      {chip ? <Chip open={chip.open}>{chip.text}</Chip> : null}
      {link ? <TextLink className="lg-push" href={link.href}>{link.label}</TextLink> : null}
    </article>
  );
}

export function Chip({ children, open }: { children: ReactNode; open?: boolean | null }) {
  return <p className={cn("lg-chip", open === true && "is-open", open === false && "is-closed")}>{children}</p>;
}

export function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="lg-stat">
      <p className="lg-stat__n">{n}</p>
      <p className="lg-muted">{label}</p>
    </div>
  );
}

export function Steps({ items, cols }: { items: { n: string; title: string; text: ReactNode }[]; cols?: number }) {
  return (
    <Grid cols={cols ?? items.length} min="15rem">
      {items.map((s, i) => (
        <div className="lg-step" key={s.title} style={{ "--lg-delay": `${i * 0.18}s` } as CSSProperties}>
          <p className="lg-step__n">{s.n}</p>
          <h3>{s.title}</h3>
          <div className="lg-muted">{s.text}</div>
        </div>
      ))}
    </Grid>
  );
}

export function Rows({ items, className }: { items: (MediaItem | Doc)[]; className?: string }) {
  return (
    <div className={cn("lg-rows", className)}>
      {items.map((it) => {
        const tag = "tag" in it ? it.tag : it.year;
        const source = "source" in it ? it.source : it.note;
        return (
          <div className="lg-row" key={it.title}>
            <p className="lg-row__tag">{tag}</p>
            <p className="lg-row__title"><a href={it.href} rel="noopener" target="_blank">{it.title}</a></p>
            <p className="lg-row__src">{source}</p>
          </div>
        );
      })}
    </div>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="lg-faq-list">
      {items.map((f) => (
        <details className="lg-faq" key={f.q}>
          <summary>{f.q}</summary>
          <div>{f.a}</div>
        </details>
      ))}
    </div>
  );
}

export function Quote({ t }: { t: Testimonial }) {
  return (
    <figure className="lg-quote">
      <blockquote>“{t.text}”</blockquote>
      <figcaption><strong>{t.name}</strong>{t.role}</figcaption>
    </figure>
  );
}

/* ---------- Imagens provisórias (até chegarem as reais) ---------- */

const TONES = ["is-papel", "is-vinho", "is-tinta", "is-medio"];
function toneFor(name: string) {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

/** Retrato com monograma. Troque por <Image> com a foto real (classe lg-duotone). */
export function Portrait({ name }: { name: string }) {
  const letters = name.trim().split(/\s+/).map((w) => w.match(/\p{L}/u)?.[0] ?? "").filter(Boolean);
  const initials = letters.length > 1 ? letters[0] + letters[letters.length - 1] : (letters[0] ?? "");
  return <div aria-hidden="true" className={cn("lg-portrait", toneFor(name))} data-placeholder="retrato"><span>{initials}</span></div>;
}

export function PersonCard({ p }: { p: Person }) {
  return (
    <article className="lg-person">
      <Portrait name={p.name} />
      <h3>{p.name}</h3>
      <p className="lg-role">{p.role}</p>
      {p.bio ? <p className="lg-bio">{p.bio}</p> : null}
      <p className="lg-in">
        {p.linkedin ? <a href={p.linkedin} rel="noopener" target="_blank">LinkedIn</a> : <span>[LinkedIn pessoal]</span>}
      </p>
    </article>
  );
}

/** Marca em texto de parceiro. Troque pelo logo oficial. */
export function Wordmark({ name }: { name: string }) {
  return <div aria-hidden="true" className="lg-wordmark" data-placeholder="logo"><span>{name}</span></div>;
}

/** Capa tipográfica de publicação. Troque pela capa real, se houver. */
export function Cover({ pub }: { pub: Publication }) {
  return (
    <div aria-hidden="true" className={cn("lg-cover-art", `is-${pub.tone}`)} data-placeholder="capa">
      <span className="lg-cover-art__brand">Legisla Brasil</span>
      <span className="lg-cover-art__type">{pub.type}</span>
      <span className="lg-cover-art__title">{pub.title}</span>
      <Backdrop mini type={pub.motif} />
    </div>
  );
}

export function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <article className="lg-card">
      <Cover pub={pub} />
      <h3><a href={pub.href} rel="noopener" target="_blank">{pub.title}</a></h3>
      <p className="lg-kicker">{pub.type}</p>
      <p className="lg-muted">{pub.text}</p>
      <TextLink className="lg-push" href={pub.href}>{pub.label}</TextLink>
    </article>
  );
}

export function Timeline({ items }: { items: { year: string; title: string; text: string }[] }) {
  return (
    <div className="lg-timeline">
      {items.map((t) => (
        <div className="lg-tl-item" key={t.year + t.title}>
          <p className="lg-tl-year">{t.year}</p>
          <h3>{t.title}</h3>
          <p className="lg-muted">{t.text}</p>
        </div>
      ))}
    </div>
  );
}
