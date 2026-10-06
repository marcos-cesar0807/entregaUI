# CLAUDE.md — O caso Marina

Instruções para o Claude Code neste projeto. Contexto completo do projeto está no [README.md](README.md); critérios da entrega em [docs/criterios-do-projeto.md](docs/criterios-do-projeto.md).

## O que é avaliado (fonte: `Atividade_Caso_Marina_FUUXUI_1.pdf`)

Enunciado da disciplina, entregue como PDF pelo estudante (não versionado no repo — pedir de novo se precisar reler na íntegra). Resumo do que a nota mede, para não regredir sem perceber:

- **Item 6 — Design system**: grid, escala de espaço (só 4/8/12/16/24/32/48/64), 5 degraus tipográficos nomeados por uso, 5 neutros com contraste medido, 3 cores de papel (ação/erro/sucesso) com par fundo+texto medido, até 3 raios, 3 durações nomeadas, 2 quebras justificadas pela largura do texto, **tabela de tokens com 25–40 linhas e 4 colunas (nome, valor, camada, razão)** nas três camadas (primitivo/semântico/componente, pirâmide com poucos de componente), **4 componentes documentados em 7 seções** (Botão, campo de busca, cartão de disciplina, mensagem de sistema), e 3 princípios que passem no "teste do oposto". Hexadecimal só pode aparecer na camada primitiva.
- **Item 3 — Acessibilidade**: percurso de teclado com print de ordem de foco numerada, nomes acessíveis para controles sem texto, toda sobreposição fecha com Esc e devolve foco, e pelo menos 5 critérios WCAG citados por número (mínimo sugerido: 2.5.8, 1.4.3, 1.4.1, 2.4.7, 3.3.3).
- **Item 2 — Componentes e protótipo**: 5 telas (T1–T5) e 4 estados (E1–E4) alcançáveis, as quatro saídas (voltar/cancelar/desfazer/fechar) fazem o que prometem, transições usam a escala de duração.
- **Itens 4, 5, 7**: revisão heurística com algo recusado da IA (não só aceito), teste com pessoa no formato Experimento/Fato/Insight/Recomendação, e pacote de handoff (tokens + páginas de componente + mapa de fluxo + pendências).
- O professor confere a **tabela de tokens** e a **razão** de cada um primeiro — nunca adicionar token sem explicar por que ele existe.
- Rastreio linha a linha de cada critério → evidência já mantido em [docs/criterios-do-projeto.md](docs/criterios-do-projeto.md); atualizar esse arquivo junto de qualquer mudança que feche ou abra uma lacuna.
- **A documentação do Storybook precisa refletir isso diretamente** (não só existir em Markdown solto): `Fundamentos/Design System (avaliação)` e `Fundamentos/Acessibilidade (avaliação)` (`src/stories/DesignSystem.stories.tsx`, `src/stories/Acessibilidade.stories.tsx`) puxam `docs/design-system.md` e `docs/acessibilidade.md` via import `?raw` — são o recorte exato que o professor vai olhar primeiro. Ao editar esses dois arquivos `.md`, o Storybook atualiza sozinho (mesma fonte); não duplicar o conteúdo em outro lugar.

## Regras fixas

- **Todo prompt relevante enviado à IA deve ser registrado em [docs/registro-de-ia.md](docs/registro-de-ia.md)**, no formato da tabela existente: data, ferramenta, o que foi pedido, o que foi feito com a resposta, por quê. Adicionar uma linha por pedido, nunca reescrever o histórico.
- Tokens do Design System vêm do Figma (`DS-Marcos`) e vivem em `src/styles/figma-tokens.css` / `.json` — fonte única de verdade. Não inventar valores. A seleção usada na entrega está em `docs/design-system.md`; a documentação completa das 115 variáveis, com descrição de cada uma, vive em Storybook (`src/stories/Tokens.stories.tsx`, seção Fundamentos/Tokens).
- `src/styles/tailwind-theme.css` espelha os tokens no namespace `@theme` do Tailwind v4. É gerado a partir de `figma-tokens.json` (valores literais, não `var()`, para não colidir com os nomes de `figma-tokens.css`) — regenerar os dois juntos se os tokens do Figma mudarem. Componentes existentes usam CSS puro; Tailwind é só a camada de utilitários disponível, migração de componente é decisão separada do estudante.
- Cada componente com página em `docs/componentes/*.md` (7 seções: finalidade, anatomia, variantes e estados, comportamento, conteúdo, acessibilidade, tokens e implementação) deve aparecer também como aba **Docs** no Storybook, puxando o mesmo arquivo via import `?raw` (`parameters.docs.description.component`, cortado com `src/stories/docBody.ts`) — nunca copiar o texto para dentro do `.stories.tsx`. Ao criar um componente novo com página própria em `docs/componentes`, ligar as duas pontas do mesmo jeito.
- As páginas visuais de Fundamentos do Storybook (`src/stories/fundamentos/`: grid, espaçamento, tipografia, cor, raios e elevação, movimento, camadas de tokens) são feitas para designers e mostram as escalas do sistema. Ao mudar um valor de escala (espaço, fonte, raio, duração, quebra, cor de papel), atualizar a página correspondente e `docs/design-system.md` juntos; contrastes e cores são lidos de `figma-tokens.json`, o resto está escrito nas páginas.
- Decisões de projeto (trade-offs, ajustes de contraste, etc.) vão em `docs/decisoes.md`, não só no registro de IA.
- `Projeto/Protótipo` no Storybook (`src/stories/FlowCatalog.tsx` + `flow-catalog-data.tsx`) é a grade com as 5 telas e os 4 estados obrigatórios, renderizando os componentes React reais (escalados via CSS, sem `<iframe>`/router). Ao adicionar uma tela ou estado novo ao fluxo (T-alguma-coisa ou E-alguma-coisa), acrescentar uma entrada em `flow-catalog-data.tsx` no mesmo padrão — senão a grade fica desatualizada e deixa de ser a evidência do F01.
- Build offline (`npm run build:offline`) precisa continuar abrindo via `file://` sem dependências externas — não adicionar CDNs ou fontes remotas.

## Comandos

- `npm run dev` — protótipo interativo (Vite).
- `npm run storybook` — Storybook na porta 6006.
- `npm run build` / `npm run build:offline` — builds de entrega.
- `npm run build-storybook` — Storybook estático em `storybook-static/`.

## Estrutura

```text
.storybook/                 Configuração do Storybook
docs/                       Critérios, decisões, tokens, componentes, registro de IA
src/components/atoms|molecules|organisms/  Design system em código
src/flows/                  Telas e estados do protótipo
src/styles/                 Tokens CSS/JSON exportados do Figma
src/stories/                Histórias do Storybook (inclui Tokens.stories.tsx)
```
