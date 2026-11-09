"use client";

/**
 * Fundos animados desenhados por geometria, a partir do mundo do Legislativo.
 * hemiciclo: as 513 cadeiras da Câmara. congresso: o Congresso Nacional em traço.
 * rede: pontos conectados. documento: linhas de um texto de lei sendo grifadas.
 *
 * A geometria é calculada uma vez (sempre igual) e já sai no HTML. A animação
 * só roda quando o desenho está visível na tela; com “reduzir movimento”, fica parado.
 */
import { type CSSProperties, type ReactElement, useEffect, useRef } from "react";
import type { Motif } from "@/content/site";
import { cn } from "@/lib/utils";

type V = CSSProperties & Record<`--${string}`, string | number>;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hemiciclo(): ReactElement {
  const total = 513;
  const rows = 10;
  const r0 = 0.36;
  const radii = Array.from({ length: rows }, (_, i) => r0 + ((1 - r0) * i) / (rows - 1));
  const sum = radii.reduce((a, b) => a + b, 0);
  const counts = radii.map((r) => Math.round((total * r) / sum));
  counts[rows - 1] += total - counts.reduce((a, b) => a + b, 0);
  const seats: ReactElement[] = [];
  radii.forEach((r, i) => {
    for (let k = 0; k < counts[i]; k++) {
      const f = counts[i] > 1 ? k / (counts[i] - 1) : 0.5;
      const a = Math.PI * (1 - f);
      const R = 480 * r;
      seats.push(
        <circle cx={(500 + R * Math.cos(a)).toFixed(1)} cy={(505 - R * Math.sin(a)).toFixed(1)} key={`${i}-${k}`} r={6.2}
          style={{ "--a": f.toFixed(3), "--r": i } as V} />
      );
    }
  });
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 520">
      <g className="bd-seats">{seats}</g>
    </svg>
  );
}

function congresso(): ReactElement {
  const lines = [
    "M30 400 H970",
    "M150 318 H850 V352 H150 Z",
    "M120 400 L190 352 M880 400 L810 352",
    "M458 318 V58 H490 V318",
    "M510 318 V58 H542 V318",
    "M490 168 H510 M490 176 H510",
    "M205 262 Q300 336 395 262 Z",
    "M282 296 L300 318 L318 296",
    "M612 318 C624 252 776 252 788 318",
  ];
  const windows: ReactElement[] = [];
  for (let f = 0; f < 18; f++) {
    [464, 516].forEach((x, j) => {
      windows.push(<rect height={3} key={`${f}-${j}`} rx={1} style={{ "--f": f + j * 0.5 } as V} width={20} x={x} y={(72 + f * 13.5).toFixed(1)} />);
    });
  }
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 440">
      <g className="bd-lines">
        {lines.map((d, i) => <path d={d} key={d} pathLength={1} style={{ "--i": i } as V} />)}
      </g>
      <g className="bd-windows">{windows}</g>
    </svg>
  );
}

function rede(): ReactElement {
  const rand = rng(17);
  const pts: [number, number][] = [];
  while (pts.length < 34) {
    const p: [number, number] = [60 + rand() * 880, 50 + rand() * 520];
    if (pts.every((q) => Math.hypot(p[0] - q[0], p[1] - q[1]) > 95)) pts.push(p);
  }
  const seen = new Set<string>();
  const edges: { d: string; i: number; delay: string }[] = [];
  pts.forEach((p, a) => {
    pts.map((q, b) => [Math.hypot(p[0] - q[0], p[1] - q[1]), b] as const)
      .sort((x, y) => x[0] - y[0]).slice(1, 3)
      .forEach(([, b]) => {
        const key = `${Math.min(a, b)}-${Math.max(a, b)}`;
        if (seen.has(key)) return;
        seen.add(key);
        const q = pts[b];
        edges.push({ d: `M${p[0].toFixed(0)} ${p[1].toFixed(0)} L${q[0].toFixed(0)} ${q[1].toFixed(0)}`, i: a, delay: `${(rand() * 6).toFixed(2)}s` });
      });
  });
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1000 620">
      <g className="bd-edges">{edges.map((e) => <path d={e.d} key={e.d} pathLength={1} style={{ "--i": e.i } as V} />)}</g>
      <g className="bd-signals">{edges.map((e) => <path d={e.d} key={e.d} pathLength={1} style={{ "--i": e.i, "--d": e.delay } as V} />)}</g>
      <g className="bd-nodes">
        {pts.map((p, a) => (
          <circle className={a % 7 === 0 ? "is-hub" : undefined} cx={p[0].toFixed(0)} cy={p[1].toFixed(0)} key={a} r={a % 7 === 0 ? 9 : 5.5} style={{ "--i": a } as V} />
        ))}
      </g>
    </svg>
  );
}

function documento(): ReactElement {
  const rand = rng(5);
  const lines: ReactElement[] = [];
  const marks: ReactElement[] = [];
  let y = 70;
  let n = 0;
  let h = 0;
  for (let para = 0; para < 6; para++) {
    lines.push(<rect className="is-head" height={13} key={`h${para}`} rx={2} style={{ "--i": n++ } as V} width={110} x={70} y={y} />);
    y += 34;
    const count = 3 + Math.floor(rand() * 3);
    for (let l = 0; l < count; l++) {
      const w = l === count - 1 ? 160 + rand() * 220 : 440 + rand() * 60;
      lines.push(<rect height={8} key={`l${para}-${l}`} rx={2} style={{ "--i": n++ } as V} width={w.toFixed(0)} x={70} y={y} />);
      if ((para === 1 && l < 2) || (para === 3 && l === 1) || (para === 4 && l < 3)) {
        marks.push(<rect height={20} key={`m${para}-${l}`} rx={3} style={{ "--h": h++ } as V} width={(w + 12).toFixed(0)} x={64} y={y - 6} />);
      }
      y += 22;
    }
    y += 26;
  }
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 640 760">
      <rect className="bd-sheet" height={720} pathLength={1} rx={6} width={600} x={20} y={20} />
      <g className="bd-marks">{marks}</g>
      <g className="bd-text">{lines}</g>
    </svg>
  );
}

const DRAWINGS: Record<Motif, ReactElement> = {
  hemiciclo: hemiciclo(),
  congresso: congresso(),
  rede: rede(),
  documento: documento(),
};

export default function Backdrop({ type, className, mini }: { type: Motif; className?: string; mini?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => el.classList.toggle("is-live", e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div aria-hidden="true" className={cn("lg-backdrop", `is-${type}`, mini && "is-mini", className)} ref={ref}>
      {DRAWINGS[type]}
    </div>
  );
}
