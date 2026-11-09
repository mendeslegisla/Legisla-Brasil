"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/content/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
    setSub(null);
  }, [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setSub(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const current = (href: string) => path === href;
  const inGroup = (hrefs: string[]) => hrefs.some((h) => path === h);

  return (
    <header className={cn("lg-header", scrolled && "is-scrolled")}>
      <div className="lg-header__bar">
        <Link className="lg-logo" href="/">Legisla Brasil</Link>
        <button aria-controls="menu-principal" aria-expanded={open} className="lg-burger" onClick={() => setOpen((o) => !o)} type="button">
          <span /><span /><span />
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        </button>
        <nav aria-label="Menu principal" className={cn("lg-nav", open && "is-open")} id="menu-principal">
          <ul>
            {NAV.map((item) =>
              item.children ? (
                <li className="has-sub" key={item.label}>
                  <button aria-expanded={sub === item.label} className={cn(inGroup(item.children.map((c) => c.href)) && "is-current")}
                    onClick={() => setSub((s) => (s === item.label ? null : item.label))} type="button">
                    {item.label}
                    <svg aria-hidden="true" fill="none" height="14" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" width="14"><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  <ul className="lg-sub">
                    {item.children.map((c) => (
                      <li key={c.href + c.label}><Link aria-current={current(c.href) ? "page" : undefined} href={c.href}>{c.label}</Link></li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}><Link aria-current={current(item.href) ? "page" : undefined} href={item.href}>{item.label}</Link></li>
              )
            )}
          </ul>
        </nav>
        <div className="lg-header__actions">
          <Link className="lg-support" href="/#apoie">Apoie</Link>
          <Link className="lg-btn" href="/contato/">Fale com a equipe</Link>
        </div>
      </div>
    </header>
  );
}
