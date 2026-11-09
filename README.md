# Site da Legisla Brasil

Site institucional da Legisla Brasil em **Next.js 16 + React 19 + Tailwind CSS 4**, com componentes do **Kokonut UI** instalados via shadcn. A exportação é estática: `npm run build` gera a pasta `out/` com HTML pronto, que roda em qualquer hospedagem moderna, sem servidor para manter.

## Rodar no computador

```bash
npm install
npm run dev        # http://localhost:3000
```

Requisitos: Node.js 20 ou mais recente.

## Onde mudar o quê

| Quero mudar… | Arquivo |
|---|---|
| Números de impacto, contatos, chave Pix, redes | `content/site.ts` (STATS e SITE) |
| Equipe, conselhos, parceiros, publicações, mídia, relatórios | `content/site.ts` |
| Texto de uma página | `app/<página>/page.tsx` |
| Cores, fontes e o visual geral | `app/globals.css` |
| Menu | `NAV` em `content/site.ts` |

Um número, uma fonte: os números de impacto ficam só em `STATS`, e todas as páginas leem dali.

## Publicar

### Vercel (recomendado)
1. Suba o projeto para um repositório no GitHub.
2. Em vercel.com, **Add New › Project**, escolha o repositório. O Next.js é detectado sozinho.
3. Em **Environment Variables**, cadastre as variáveis de `.env.example`.
4. **Deploy**. Cada alteração no GitHub publica uma nova versão, e cada pull request ganha um link de pré-visualização.

### Netlify
Importe o repositório. O `netlify.toml` já define o comando (`npm run build`) e a pasta (`out`).

### Cloudflare Pages
Comando de build `npm run build`, pasta de saída `out`, variável `NODE_VERSION=22`.

### Domínio
Quando a nova versão estiver aprovada, aponte o DNS de `legislabrasil.org` para a hospedagem escolhida (cada uma mostra os registros). O WordPress antigo pode continuar num subdomínio durante a transição, para manter os PDFs em `/wp-content/uploads/` funcionando até serem migrados para `public/`.

## Formulários

Os formulários (contato, conversa, Comunidade, listas de espera e newsletter) validam os campos em português. Para enviarem de verdade, crie um formulário no [Formspree](https://formspree.io) (ou serviço compatível que aceite POST) e defina `NEXT_PUBLIC_FORM_ENDPOINT`. Sem isso, eles avisam para escrever para falecom@legislabrasil.org, em vez de fingir que enviaram. Cada envio leva o campo `formulario` dizendo de onde veio.

## Antes de lançar

```bash
npm run release    # compila e só termina sem erro se não houver pendências
```

`npm run check:launch` lista, página por página: textos entre [colchetes], formulários sem serviço de envio, retratos com monograma, marcas em texto e capas provisórias.

## Componentes do Kokonut UI

O `components.json` já tem o registro do Kokonut configurado. Para instalar outro componente:

```bash
npx shadcn@latest add @kokonutui/<nome>
# ou: npx shadcn@latest add https://kokonutui.com/r/<nome>.json
```

Instalados e onde estão: veja `docs/kokonut.md`.

## Qualidade

- TypeScript estrito; `npm run build` falha se houver erro de tipo.
- Detector do Impeccable sem achados nas 15 páginas, no computador e no celular (exceto “texto encoberto” entre as pílulas da pilha de formas, que é esperado).
- Um `h1` por página, hierarquia de títulos sem saltos, contraste mínimo 4,5:1, foco visível, link “Pular para o conteúdo”, animações que respeitam “reduzir movimento”.
- Fontes hospedadas no próprio site (Newsreader e Public Sans), sem Google Fonts.
