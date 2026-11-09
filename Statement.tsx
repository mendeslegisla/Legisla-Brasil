"use client";

/** Frase dos números com marca-texto desenhado à mão (marker-text, do Kokonut UI). */
import { Mark, MarkerText } from "@/components/kokonutui/marker-text";
import { STATS } from "@/content/site";

export default function Statement() {
  return (
    <MarkerText as="p" className="lg-statement" gap={140}>
      Desde {STATS.fundacao}, trabalhamos com <Mark color="#EA5454" type="underline">{STATS.mandatos} mandatos</Mark> de{" "}
      <Mark color="#EA5454" type="underline">{STATS.partidos} partidos</Mark>. A Comunidade Legisla reúne{" "}
      <Mark color="#EA5454" type="underline">{STATS.comunidade} pessoas</Mark> que fazem a política acontecer nos{" "}
      <Mark color="#EA5454" type="circle">bastidores</Mark>, em todas as regiões do país.
    </MarkerText>
  );
}
