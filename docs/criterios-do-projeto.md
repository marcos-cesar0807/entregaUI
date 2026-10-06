# Critérios do projeto — O caso Marina

Fonte: `Atividade_Caso_Marina_FUUXUI_1.pdf` (8 páginas), enviado em 23/09/2026. Esta matriz resume exigências do enunciado; decisões de implementação ficam nos demais arquivos. **Caminho principal escolhido pelo estudante:** código React e Storybook. O PDF descreve código HTML/CSS/JS; o pacote React deverá incluir um build que abra no navegador sem instalação.

## Contexto

Marina tem 19 anos, é caloura, usa celular e não tem computador em casa. Precisa comparar disciplinas e horários rapidamente, pois já perdeu uma vaga por demorar. A jornada é escolher a disciplina e garantir a vaga. Por isso, a versão móvel e o erro de vaga esgotada durante a decisão são obrigatórios (p. 1).

T1 deve mostrar título, busca, ~~filtro por período~~ (removido a pedido do estudante; ver decisão 15 — lacuna vs. enunciado p. 1), **oito cartões** com nome, professor, horário e vagas restantes, seleção por cartão, resumo e ação de confirmar (p. 1).

## Telas e estados obrigatórios

| ID | Decisão | Conteúdo e saída | Fonte |
| --- | --- | --- | --- |
| T1 Lista | Qual disciplina escolher? | Busca, filtro, oito cartões e vagas; abre T2 | p. 2 |
| T2 Detalhe | É esta mesmo? | Horário completo, choque com aulas existentes, selecionar; vai a T3 ou E3 | p. 2 — implementado: tela real (não mais dialog), banner, descrição, agenda semanal com choque destacado, linha do professor que abre bottom sheet com cartão de perfil (Esc fecha e devolve o foco à linha), adicionar/remover fixo. T3/E3 (fluxo de confirmação após o choque) ainda pendente |
| T3 Resumo | Confirmo tudo? | Seleção, total, voltar, cancelar, confirmar; vai a T4 ou erro | p. 2 — implementado: tela real com fade; um cartão por disciplina (nome, professor, horário) com remover; agenda semanal resultante (já matriculado + novas) e estado de conflito; voltar preserva seleção, remover pede confirmação em diálogo (Esc devolve o foco à lixeira); barra fixa com a contagem e confirmar; **Cancelar seleção** (botão de texto na barra fixa, abaixo do Confirmar) abre “Descartar toda a seleção?” e leva à T1 com Desfazer; ao confirmar pode ocorrer o E3 |
| T4 Confirmação | E agora? | O que foi garantido e próximo passo; vai a T5 ou nova busca | p. 2 — implementado: loading (spinner, ~900ms) → “semana pronta”: agenda sem choque com as novas disciplinas encaixando (motion em tokens de duração), ação principal “Voltar ao início” e secundária “Ver minhas matrículas” (decisões 16 e 17) |
| T5 Minhas matrículas | Está tudo certo? | Matrículas efetivadas | p. 2 — implementado como sub-aba “Minhas matrículas” da aba Disciplinas (novas + já cursando), alcançável a qualquer momento pela navbar (decisão 17) |
| E1 Sem resultado | Como continuar? | Em T1, orientar a limpar ou mudar a busca | p. 2 |
| E2 Carregando | O sistema está respondendo? | Em T1, carregamento inicial com conexão lenta | p. 2 — dispara na primeira entrada em Disciplinas, já que o app abre no Início (decisão 17) |
| E3 Vaga esgotada | O que fazer agora? | Em T3, recuperação sem falsa confirmação | p. 2 — implementado (decisão 21): ao tocar Confirmar, a última vaga de Dataviz é levada por outra pessoa; abre o aviso “A vaga de Dataviz acabou” (Remover ou Fechar), a disciplina fica marcada e Confirmar fica bloqueado. O choque de horário continua como estado extra |
| E4 Validação | Como corrigir? | No primeiro campo com entrada, sugestão concreta | p. 2 |

## Matriz de critérios e evidências

**Estado:** reavaliado em 03/10/2026 com verificação no navegador. Concluído = feito e verificado; Pendente = depende do estudante ou ainda não feito.

| ID | Critério de aceite | Evidência prevista | Estado | Fonte |
| --- | --- | --- | --- | --- |
| F01 | T1–T5 navegáveis e E1–E4 alcançáveis | Protótipo e mapa de fluxo; visão consolidada em Storybook → `Projeto/Protótipo` (grade com as 5 telas e os 4 estados) | Concluído: T1–T5 navegáveis e E1–E4 alcançáveis. **E3 agora é vaga esgotada de verdade** (decisão 21): ao confirmar na T3, a última vaga de Dataviz é levada por outra pessoa, nada é confirmado e Confirmar fica bloqueado até remover a disciplina. O choque de horário segue como estado extra. Percurso T1→T5 verificado só com teclado em 03/10/2026 | pp. 2, 6 |
| F02 | Voltar preserva seleção e texto parcial; cancelar descarta; desfazer reverte; fechar não muda dados | Teste manual de navegação | Concluído (03/10/2026): **voltar** preserva seleção e texto parcial da busca (verificado); **cancelar** voltou à T3 como “Cancelar seleção” e descarta tudo após confirmação (decisão 21); **desfazer** restaura a seleção; **fechar** (diálogos, aviso de vaga esgotada) não altera dados, com Esc devolvendo o foco | p. 6 |
| F03 | Transições usam a escala; saída espelha entrada | Lista de ligações e CSS | Concluído: durações medidas no navegador só em 0,12 / 0,24 / 0,4s; entrar é deslizar para a esquerda (240ms) e voltar desliza para a direita (240ms), os demais trocam por esmaecer (120ms). A folha do professor entra e sai pela mesma duração média | pp. 4, 6 |
| V01 | Grid móvel com colunas, margem e calha; todos os espaços na escala 4/8/12/16/24/32/48/64 | `docs/design-system.md` e CSS | Concluído: grid mobile de 4 colunas (80,5px), margem 16, calha 16 (decisão 33; prints em `evidencias/grid/`); todos os espaços renderizados em 4/8/12/16/24/32/48/64 (auditoria em 03/10/2026) e regra de uso por valor em `docs/design-system.md` | pp. 3, 5 |
| V02 | Uma ação primária por tela, guiada pela jornada | Revisão de T1–T5 | Revisado em 03/10/2026: Início = Escolher disciplinas; T1 = Revisar (aparece com a seleção); T2 = Adicionar à matrícula; T3 = Confirmar; T4 = Voltar ao início; T5 e Agenda são telas de consulta, sem ação primária. Confirmar com o estudante se T5 precisa de uma | p. 5 |
| V03 | Três registros com decisão, critério e alternativa descartada | `docs/decisoes.md` | Estruturado | p. 5 |
| D01 | Cinco degraus tipográficos nomeados pelo uso | `docs/design-system.md` | Concluído: 5 degraus (12 legenda, 14 corpo, 18 corpo destacado, 22 título de seção, 26 título de tela), base 14px, +4 por degrau; verificado no navegador que só esses tamanhos aparecem | p. 3 |
| D02 | Cinco neutros, cada um com contraste medido contra o fundo | `docs/design-system.md` | Concluído | p. 3 |
| D03 | Cores de ação, erro e sucesso com par fundo/texto e contraste medido | `docs/design-system.md` | Concluído | p. 3 |
| D04 | Até três raios; três durações nomeadas; dois pontos de quebra justificados por linha de texto | `docs/design-system.md` | Concluído: 3 raios (8, 24 e pílula), 3 durações (120, 240 e 400ms) e 2 quebras (360 e 600px) com a razão pela largura do texto; auditado no navegador | p. 3 |
| D05 | 25–40 tokens; nome, valor, camada e razão; camadas primitiva, semântica e componente | Tabela e variáveis CSS | Concluído: 33 na tabela, 115 exportados | pp. 3, 5 |
| D06 | Hexadecimais somente nos primitivos | Inspeção da tabela e CSS | Concluído: nenhum hexadecimal fora de `figma-tokens.css`/`tailwind-theme.css` (busca em `src/`). Ressalva: sombras e scrim usam `rgba(0,0,0,…)`; estão documentadas como `shadow/float` e entram nas pendências do handoff | p. 5 |
| D07 | Botão, busca, cartão e mensagem de sistema reutilizáveis, cada um com página de sete seções | Storybook (aba Docs de cada componente) e `docs/componentes/` | Concluído para a primeira tela | pp. 3, 5–6 |
| D08 | Três princípios que passem no teste do oposto | `docs/design-system.md`, visível em Storybook → `Fundamentos/Design System (avaliação)` | Propostos; revisão humana pendente | p. 3 |
| A01 | Print de T1 com foco numerado, comparação com ordem visual e correções | `evidencias/foco/`, `docs/acessibilidade.md` | Concluído: print numerado com 27 paradas em `evidencias/foco/T1-ordem-de-foco.png`; a ordem do teclado coincide com a visual, sem correções pendentes | p. 6 |
| A02 | Nomes acessíveis para controles sem texto; sobreposições fecham com Esc e devolvem foco | Inspeção e teste de teclado | Concluído (03/10/2026): tabela de nomes acessíveis em `docs/acessibilidade.md`; Esc fecha e devolve o foco em professor, remover, descartar, vaga esgotada e toast. Um defeito de foco ao voltar do detalhe foi achado e corrigido | p. 6 |
| A03 | Pelo menos cinco critérios WCAG citados por número e demonstrados | `docs/acessibilidade.md`, visível em Storybook → `Fundamentos/Acessibilidade (avaliação)` | Concluído: cinco critérios sugeridos (2.5.8, 1.4.3, 1.4.1, 2.4.7, 3.3.3) mais 2.1.1, 2.1.2, 4.1.2 e 2.2.1, cada um com a evidência | p. 6 |
| R01 | Revisão heurística com IA, incluindo sugestão recusada e motivo | `docs/revisao-e-iteracao.md` | Concluído em 03/10/2026: 22 achados da IA com decisão do estudante; 9 recusas com motivo (`docs/avaliacao-heuristica-exportada.md`). Faltam IA-08 e IA-11 e as telas T4, T5, Agenda e Estados da análise manual | pp. 6–7 |
| R02 | Teste com pessoa: Experimento, Fato, Insight, Recomendação; mudança justificada | `docs/revisao-e-iteracao.md` | Pendente: roteiro pronto em `docs/revisao-e-iteracao.md`; falta aplicar o teste com uma pessoa e preencher | p. 6 |
| H01 | Handoff com tokens, páginas, fluxo, ligações e pendências conhecidas | `docs/handoff.md` e PDF único | Atualizado em 03/10/2026; falta só gerar o PDF único com a revisão do estudante | p. 6 |
| I01 | Registro de IA: data, ferramenta, pedido, tratamento e por quê | `docs/registro-de-ia.md` | Em andamento | p. 7 |
| E01 | ZIP com LEIA-ME, protótipo, PDF único, registro de IA e print de foco | Pacote final | LEIA-ME, build offline e PDF gerados; falta a revisão do estudante e o envio no Moodle | p. 8 |

## Mapa de fluxo e ligações iniciais

| Origem | Gatilho | Destino / efeito | Animação indicada |
| --- | --- | --- | --- |
| T1 cartão | Abrir | T2 | Deslizar esquerda, médio |
| T2 voltar | Voltar | T1, preservando entrada | Deslizar direita, médio |
| T2 selecionar | Selecionar | T3 ou E3 | Esmaecer, rápido |
| T3 confirmar | Confirmar matrícula | Bottom sheet “Confirmar matrícula?” (decisão 29); Confirmar leva à T4 se válido (ou ao E3); Voltar e revisar, Esc e toque fora não confirmam | Esmaecer, rápido |
| T3 remover | Lixeira no cartão | Bottom sheet “Remover disciplina?” (ação principal em cima, Manter embaixo); Remover tira a disciplina (agenda e contagem atualizam, lista vazia mostra orientação), Esc/toque fora/Manter não alteram nada | Esmaecer, rápido |
| T3 cancelar seleção | Botão de texto na barra fixa, abaixo do Confirmar | Bottom sheet “Descartar toda a seleção?”; Descartar leva à T1 com toast Desfazer; Esc/toque fora/Manter não alteram nada | Esmaecer, rápido |
| T3 limite de créditos | Confirmar com mais de 12 créditos no semestre | Confirmar fica bloqueado e a mensagem “Limite de créditos excedido: 13 de 12. Remova uma disciplina para confirmar.” aparece em vermelho; remover uma disciplina libera o Confirmar. Selecionar continua permitido | — |
| Toast desfazer | Desfazer | Restaura a seleção anterior (após cancelar ou remover); foco no título da tela | Esmaecer, médio |
| E3 fechar | Fechar ou Esc | Fica na T3 (E3 aparece na T3), sem alteração; foco vai à lixeira da disciplina afetada | Esmaecer, rápido |
| T3 confirmar → E3 | Confirmar | Volta à T3 com o aviso de vaga esgotada; nada é confirmado | Esmaecer, rápido |
| Início escolher disciplinas | Abrir | T1 | Esmaecer, rápido |
| Navbar (Início, Disciplinas, Agenda) | Tocar aba | Aba correspondente; foco na aba ativa | Esmaecer, rápido |
| T1 ↔ T5 | Seletor Disponíveis / Minhas matrículas | Sub-aba correspondente | Esmaecer, rápido |
| T4 voltar ao início | Ação principal | Início sem o cartão de prazo | Esmaecer, rápido |
| T4 ver matrículas | Ação secundária | T5 | Esmaecer, rápido |

O mapa e a lista definitivos devem caber juntos em uma página do PDF final (p. 4). Documentar também conflito de horário, limite de créditos (implementado, decisão 26) e desfazer quando implementados.

## Acessibilidade

O PDF sugere demonstrar **2.5.8** alvo mínimo, **1.4.3** contraste, **1.4.1** uso da cor, **2.4.7** foco visível e **3.3.3** sugestão de erro; cita também **2.1.1**, **2.1.2**, **4.1.2** e **3.3.7** (p. 6). Testar teclado de verdade no caminho de código.

## Entrega e rubricas

Prazo: **05/10/2026, 23h59**, Moodle. Nome do ZIP: `nomedoaluno_nomedadisciplina_pd.ZIP`. Correção até 09/10, reentrega até 12/10, conceitos em 16/10. O ZIP contém LEIA-ME, protótipo, **um PDF** de documentação, registro de IA e prints de foco (p. 8).

Rubricas: consistência visual, hierarquia e organização, navegação, acessibilidade, análise crítica da IA, coerência com UX, organização do Design System e clareza do handoff (p. 7).

## Lacunas a resolver

- O PDF exige sete seções por componente, mas não nomeia as seções. Uma estrutura uniforme foi proposta em `docs/design-system.md`.
- ~~“Desfazer” não tinha lugar definido~~ — resolvido: toast após cancelar/remover na T3 (decisão 18).
- React/Storybook precisam produzir um build final que abra no navegador sem instalação, conforme o caminho B.
