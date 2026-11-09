"use client";

/** Seletor “Você é…”: abas do Kokonut UI (smooth-tab), com as cores da Legisla. */
import SmoothTab, { type SwipeTabItem } from "@/components/kokonutui/smooth-tab";
import { Btn } from "./ui";

const panel = (title: string, text: string, label: string, href: string) => (
  <div className="lg-panel">
    <div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
    <Btn href={href}>{label}</Btn>
  </div>
);

const ITEMS: SwipeTabItem[] = [
  { id: "mandato", title: "Sou parlamentar ou assessor(a)", content: panel("Planeje o mandato para entregar o que prometeu.", "Consultoria de 3 meses com diagnóstico em liderança política, relevância de agendas e capacidade de execução da equipe. Para mandatos federais, estaduais e municipais.", "Conhecer a consultoria", "/mandatos/") },
  { id: "partido", title: "Represento um partido", content: panel("Partidos mais representativos e coesos.", "Programas de atração de lideranças femininas, negras e jovens, desenho de agenda partidária e formação continuada.", "Ver soluções para partidos", "/partidos/") },
  { id: "comunidade", title: "Quero entrar na Comunidade", content: panel("Os bastidores fazem a política acontecer.", "Assessores, chefes de gabinete e dirigentes de todo o Brasil trocando métodos, formações e oportunidades.", "Entrar na Comunidade", "/comunidade/") },
  { id: "apoio", title: "Quero apoiar a Legisla", content: panel("Apoie uma democracia que funciona.", "Doações sustentam o trabalho suprapartidário. Contas, auditorias e doadores estão publicados na página de Transparência.", "Doar agora", "#apoie") },
];

export default function Personas() {
  return <SmoothTab activeColor="bg-tinta" activeTextColor="text-white" className="lg-personas max-w-none" items={ITEMS} label="Escolha seu perfil" />;
}
