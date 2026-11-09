"use client";

/** Pauta de programas. O status vira como num painel de votação (split-flap-text, do Kokonut UI). */
import SplitFlapText from "@/components/kokonutui/split-flap-text";
import { PROGRAMS } from "@/content/site";
import { TextLink } from "./ui";

export default function Agenda() {
  return (
    <div className="lg-rows lg-agenda">
      {PROGRAMS.map((p) => (
        <div className="lg-row" key={p.title}>
          <h3 className="lg-row__title">{p.title}</h3>
          <p className="lg-row__src">{p.text}</p>
          <div className="lg-agenda__status">
            <span className="sr-only">Status: {p.status}</span>
            <span aria-hidden="true">
              <SplitFlapText className="text-[1.05rem] sm:text-[1.15rem]" text={p.status.replace(/[[\]]/g, "").toUpperCase()}
                tileClassName={p.open === false ? "bg-cinza text-nevoa" : "bg-tinta text-nevoa"} />
            </span>
          </div>
          <TextLink href={p.href}>{p.link}</TextLink>
        </div>
      ))}
    </div>
  );
}
