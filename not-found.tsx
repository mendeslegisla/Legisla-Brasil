import Hero from "@/components/site/Hero";

export const metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <Hero
      actions={[{ label: "Ir para a página inicial", href: "/", arrow: true }, { label: "Ver pesquisas e guias", href: "/publicacoes/", variant: "ghost" }, { label: "Falar com a equipe", href: "/contato/", variant: "ghost" }]}
      backdrop="documento"
      lede="O site da Legisla foi reorganizado. Comece pela página inicial ou escolha um dos caminhos abaixo."
      title="Esta página não existe mais, ou mudou de endereço."
    />
  );
}
