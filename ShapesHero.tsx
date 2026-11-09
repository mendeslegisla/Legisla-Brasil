"use client";

/** Abertura com pilha de formas (shape-hero, do Kokonut UI) nas cores da Legisla. */
import type { ReactNode } from "react";
import ShapeHero, { type HeroShape } from "@/components/kokonutui/shape-hero";

// Classes montadas dinamicamente (o Tailwind precisa vê-las por extenso): bg-coral bg-vinho bg-tinta size-12 size-16 size-20
const PILL = "h-[3.3rem] px-6 font-texto font-semibold text-[1.05rem] max-sm:h-11 max-sm:px-4 max-sm:text-[.92rem]";
const STYLE = {
  vinho: `${PILL} bg-vinho text-white`,
  tinta: `${PILL} bg-tinta text-nevoa`,
  contorno: `${PILL} bg-white text-tinta shadow-[inset_0_0_0_1px_rgba(36,18,26,.78)]`,
  serifa: `${PILL} bg-papel text-vinho font-titulos italic font-normal text-[1.3rem] shadow-[inset_0_0_0_1px_#D6CFD2]`,
};

export type ShapeSpec = [text: string, style: keyof typeof STYLE] | [dot: "ponto", size: "p" | "m" | "g", color: "coral" | "vinho" | "tinta"];

function toShapes(list: ShapeSpec[]): HeroShape[] {
  return list.map((s, i) => {
    if (s[0] === "ponto") {
      const size = { p: "size-12", m: "size-16", g: "size-20" }[s[1] as "p" | "m" | "g"];
      return { id: `ponto-${i}`, className: `${size} bg-${s[2]}` };
    }
    return { id: `${s[0]}-${i}`, content: s[0], className: STYLE[s[1] as keyof typeof STYLE] };
  });
}

export default function ShapesHero({ title, description, crumbs, actions, shapes, fill = 0.32 }: {
  title: string; description: ReactNode; crumbs?: ReactNode; actions?: ReactNode; shapes: ShapeSpec[]; fill?: number;
}) {
  return (
    <ShapeHero
      actions={actions}
      as="h1"
      className="min-h-[680px] items-start bg-nevoa px-0 pt-[clamp(3rem,7vw,6rem)] pb-[340px] text-tinta sm:pb-24"
      contentClassName="mx-auto w-full max-w-[1200px] items-start px-6 text-left [&>p]:max-w-[36rem] [&>p]:text-[1.2rem] [&>p]:leading-normal [&>p]:text-[#3A2C32] [&>div:last-child]:justify-start"
      description={description}
      eyebrow={crumbs}
      fill={fill}
      shapes={toShapes(shapes)}
      title={title}
      titleClassName="max-w-[16ch] font-titulos font-[450] text-[clamp(2.6rem,1.9rem+3vw,4.6rem)] leading-[1.02] tracking-[-0.025em] sm:text-[clamp(2.6rem,1.9rem+3vw,4.6rem)]"
    />
  );
}
