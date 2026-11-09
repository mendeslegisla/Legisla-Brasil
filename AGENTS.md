# Site da Legisla Brasil (Next.js) — instruções para agentes

Site institucional da **Legisla Brasil**, organização suprapartidária e sem fins lucrativos que fortalece mandatos, partidos e quem trabalha nos bastidores do Legislativo. Responda e escreva sempre em **português do Brasil**.

## Stack

Next.js 16 (App Router, exportação estática em `out/`), React 19, TypeScript estrito, Tailwind CSS 4, componentes do Kokonut UI via shadcn (`components.json`). Hospedagem: Vercel, Netlify ou Cloudflare Pages.

## Estrutura

- `content/site.ts` — **todo o conteúdo**: números (`STATS`), contatos (`SITE`), menu, equipe, publicações, mídia, relatórios. Um número, uma fonte.
- `app/<rota>/page.tsx` — uma página por rota, com `metadata` própria (título, descrição, canônica).
- `components/site/` — componentes da Legisla: `ui.tsx` (Section, Head, Grid, Btn, TextLink, Card, Chip, Stat, Steps, Rows, FaqList, Quote, PersonCard, PublicationCard, Timeline), `Hero.tsx`, `Backdrop.tsx` (fundos animados), `Form.tsx`, `blocks.tsx` (Donate, Newsletter, Conversa), `Header.tsx`, `Footer.tsx`, `Effects.tsx`.
- `components/kokonutui/` — componentes do Kokonut UI. Ajustes marcados com “Legisla:”. Veja `docs/kokonut.md`.
- `app/globals.css` — tokens (`@theme`) e o sistema visual (`lg-*`).
- `scripts/check-launch.mjs` — trava de lançamento.

## Comandos

- `npm run dev` — desenvolvimento em http://localhost:3000.
- `npm run build` — compila e gera `out/`. **Obrigatório antes de concluir qualquer tarefa.** Falha com erro de tipo.
- `npm run check:launch` — lista pendências (colchetes, formulários sem envio, imagens provisórias). Sai com erro enquanto houver.
- `npm run release` — build + trava. Só para a publicação final.

## Design

Visual editorial de publicação séria sobre política: títulos em **Newsreader**, texto em **Public Sans**, fios finos no lugar de caixas. Cores: vinho `#4B0A2A` (principal), coral `#EA5454` (acento, nunca em texto pequeno sobre fundo claro), névoa `#E7E7E7` (fundo), tinta `#24121A` (texto). No Tailwind: `bg-vinho`, `text-tinta`, `font-titulos` etc. Seções com `<Section tone="surface|paper|wine|ink">`; aberturas com `<Hero backdrop="hemiciclo|congresso|rede|documento">`. **Leia a regra `sem-cara-de-ia` antes de qualquer mudança visual.**

## Regras de ouro

1. **Nunca invente dados nem rostos.** O que não existir fica entre [colchetes] em `content/site.ts`. Pessoa real sem foto usa `<Portrait>` (monograma).
2. **Um número, uma fonte:** números de impacto só em `STATS`.
3. **Toda página termina com uma ação clara.**
4. **Formulários não fingem enviar:** sem `NEXT_PUBLIC_FORM_ENDPOINT`, avisam o caminho alternativo.
5. **Acessibilidade:** um `h1` por página, títulos sem saltos de nível, contraste 4,5:1 (inclusive placeholders), `<label>` em todo campo, campos opcionais marcados, foco visível, `prefers-reduced-motion` respeitado.
6. **LGPD:** consentimento separado para newsletter; link para a Política de Privacidade em todo formulário; nenhum rastreador sem aviso de cookies.
7. **Texto:** frases curtas, voz ativa, aspas tipográficas “ ”, botões que dizem o que acontece.
8. **Suprapartidarismo:** nada que favoreça ou ataque partido, candidato ou ideologia.
9. **Sem cara de site feito por IA:** veja a regra `sem-cara-de-ia`.

## Antes de dizer que terminou

- [ ] `npm run build` sem erros
- [ ] Página conferida no navegador do Antigravity, em 1280 px e 390 px
- [ ] Detector do Impeccable sem achados novos (`npx impeccable detect --json "http://localhost:3000/rota/"`)
- [ ] Nenhum dado inventado; lacunas entre colchetes em `content/site.ts`
