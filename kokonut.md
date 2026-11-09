# Componentes do Kokonut UI no site

Instalados a partir do registro oficial (`https://kokonutui.com/r/<nome>.json`), em `components/kokonutui/`. Licença MIT: `components/kokonutui/LICENSE.txt`.

| Componente | Onde | Envoltório da Legisla |
|---|---|---|
| `shape-hero` | Abertura da Comunidade: pílulas com termos do Legislativo caem, se empilham e podem ser arremessadas | `components/site/ShapesHero.tsx` |
| `marker-text` | Frase dos números na Início: sublinhados e círculo desenhados à mão, em coral | `components/site/Statement.tsx` |
| `split-flap-text` | Pauta de programas na Início: o status vira letra a letra, como num painel de votação | `components/site/Agenda.tsx` |
| `smooth-tab` | Seletor “Você é…” na Início | `components/site/Personas.tsx` |
| `scroll-index` | Relatórios e auditorias na Transparência: índice que acompanha a rolagem | `app/transparencia/page.tsx` |

## Ajustes feitos no código copiado

O shadcn copia o código-fonte para dentro do projeto justamente para ser ajustado. Cada ajuste está marcado com “Legisla:” no arquivo.

- `shape-hero.tsx`: props `contentClassName` e `titleClassName`, para texto alinhado à esquerda e a tipografia do site.
- `split-flap-text.tsx`: letras acentuadas do português no alfabeto do painel.
- `smooth-tab.tsx`: cinza das abas inativas trocado por `text-cinza`, para atingir contraste 4,5:1.
- `scroll-index.tsx`: indicador em coral e rótulo “Seções desta página”.

## Critério para usar outros

O catálogo tem mais de 100 componentes. Antes de adicionar um, confira a regra `sem-cara-de-ia`: nada de gradiente em texto, brilhos, vidro desfocado ou animação em toda seção. Os escolhidos aqui têm uma função ligada ao mundo do Legislativo (marca-texto, painel de votação, pauta).
