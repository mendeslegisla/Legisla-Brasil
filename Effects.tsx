"use client";

/**
 * Movimento ao rolar, contado e com função:
 * - títulos de seção assentam no peso final quando chegam à tela;
 * - a linha de cada etapa (.lg-step) se desenha.
 * Roda de novo a cada troca de página.
 */
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Effects() {
  const path = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heads = Array.from(document.querySelectorAll<HTMLElement>(".lg-section:not(.lg-hero) h2"));
    const steps = Array.from(document.querySelectorAll<HTMLElement>(".lg-step"));
    if (reduce || !("IntersectionObserver" in window)) {
      steps.forEach((s) => s.classList.add("is-in"));
      return;
    }
    heads.forEach((h) => h.classList.add("lg-settle"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    [...heads, ...steps].forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
