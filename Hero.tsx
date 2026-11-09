import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Motif } from "@/content/site";
import { cn } from "@/lib/utils";
import Backdrop from "./Backdrop";
import { Btn, Chip } from "./ui";

export type Crumb = { label: string; href?: string };
export type Action = { label: string; href: string; variant?: "ghost" | "light" | "dark"; arrow?: boolean };

/** Título que entra palavra por palavra, do traço fino ao peso normal (só CSS). */
export function HeroTitle({ children }: { children: string }) {
  const words = children.trim().split(/\s+/);
  return (
    <h1 aria-label={children}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span aria-hidden="true" className="lg-w" style={{ "--i": i } as CSSProperties}>{w}</span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Você está em" className="lg-crumb">
      <Link href="/">Início</Link>
      {items.map((c) => (
        <span key={c.label}> / {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}</span>
      ))}
    </nav>
  );
}

export default function Hero({ title, lede, crumbs, actions, status, backdrop, children }: {
  title: string; lede: ReactNode; crumbs?: Crumb[]; actions?: Action[];
  status?: { text: string; open?: boolean | null }; backdrop?: Motif; children?: ReactNode;
}) {
  return (
    <section className={cn("lg-section lg-hero", backdrop && "has-backdrop")}>
      {backdrop ? <Backdrop type={backdrop} /> : null}
      <div className="lg-inner">
        <div className="lg-seq">
          {crumbs ? <Crumbs items={crumbs} /> : null}
          <HeroTitle>{title}</HeroTitle>
          <p className="lg-lede">{lede}</p>
          {status ? <Chip open={status.open}>{status.text}</Chip> : null}
          {actions?.length ? (
            <div className="lg-actions">
              {actions.map((a) => <Btn arrow={a.arrow} href={a.href} key={a.label} variant={a.variant}>{a.label}</Btn>)}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
