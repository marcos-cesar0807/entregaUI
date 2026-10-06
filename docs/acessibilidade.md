# Acessibilidade e teclado

Tudo abaixo foi **verificado no navegador em 03/10/2026** (Tab, Shift+Tab, Enter, Espaço e Esc em janela de 402px), não só lido no código.

## Percurso de teclado da T1 (print numerado)

Print: [`evidencias/foco/T1-ordem-de-foco.png`](../evidencias/foco/T1-ordem-de-foco.png). Cada número do print é a posição do foco ao apertar Tab, começando no título da tela. A tela tem **27 paradas**.

| Ordem | Controle | Posição visual | Nome acessível | Enter/Espaço |
| --- | --- | --- | --- | --- |
| 1–2 | Disponíveis · Minhas matrículas | Seletor logo abaixo do título | “Disponíveis”, “Minhas matrículas” (grupo “Visão das disciplinas”) | Troca a sub-aba |
| 3 | Busca | Abaixo do seletor | Buscar disciplina | Digitação filtra |
| 4–8 | Chips de área | Abaixo da busca, da esquerda para a direita | Todos, Design, Programação, Negócios, Educação | Filtra |
| 9–24 | Para cada cartão, dois controles: o cartão e o **+** | Lista, de cima para baixo | “Ver detalhes de [nome]” e “Adicionar [nome] à matrícula” | Abre T2 / seleciona |
| 25–27 | Barra de abas | Rodapé flutuante | Início, Disciplinas, Agenda (navegação “Principal”) | Troca de aba |

**Comparação com a ordem visual:** a ordem do teclado coincide com a visual (de cima para baixo, da esquerda para a direita; em cada cartão, o cartão vem antes do **+** que fica no canto). Nenhuma divergência encontrada, então não há correção pendente neste ponto. A barra de abas é a última parada porque também é a última no DOM, e visualmente está no rodapé.

## Nome acessível de cada controle sem texto visível

| Controle | Onde | Nome acessível |
| --- | --- | --- |
| Botão **+** / ✓ do cartão | T1 | “Adicionar [nome] à matrícula” / “Tirar [nome] da matrícula” (`aria-pressed`) |
| Cartão inteiro (área clicável) | T1 | “Ver detalhes de [nome]” (+ “(selecionada)”) |
| Chevron de voltar | T2, T3 | “Voltar à lista de disciplinas” |
| Coração | T2 | “Favoritar” / “Tirar dos favoritos” (`aria-pressed`) |
| Linha do professor | T2 | “Ver perfil de [nome]” (`aria-haspopup="dialog"`) |
| Nota do professor (★) | T2 | “Nota 4,9” |
| Cartões relacionados | T2 | “Ver [nome]” |
| Lixeira | T3 | “Remover [nome] da matrícula” |
| × do toast | T1, T3 | “Fechar aviso” |
| Dias da agenda | Agenda | “[dia], [data]” (+ “: ver o dia” na semana) |
| Agenda semanal | T3, T4 | Rótulo da grade lista cada aula com dia, horas e “em conflito” |

Ícones decorativos (busca, professor, relógio, vagas, localização) têm `alt=""` ou `aria-hidden`.

## Sobreposições: Esc ou toque fora fecham e devolvem o foco

Todas são bottom sheets (`BottomSheet`, `<dialog>` modal). Não têm botão ×: fecham com **Esc**, **tocando fora** ou na ação secundária (Manter / Fechar). O foco inicial vai para a ação secundária, a segura, e não para a principal, que costuma ser destrutiva. Verificado no navegador em 03/10/2026.

| Sobreposição | Abre com | Esc / fechar | Foco depois | Verificado |
| --- | --- | --- | --- | --- |
| Perfil do professor | Linha do professor | Esc ou toque fora: fecha, nada muda | Volta à linha do professor | ✅ |
| “Remover disciplina?” | Lixeira | Esc, toque fora ou Manter: fecha sem remover | Volta à lixeira que abriu | ✅ |
| “Confirmar matrícula?” | Confirmar matrícula | Esc, toque fora ou Voltar e revisar: fecha sem confirmar | Volta ao Confirmar matrícula | ✅ |
| “Descartar toda a seleção?” | Cancelar seleção | Esc, toque fora ou Manter: fecha sem descartar | Volta ao botão Cancelar seleção | ✅ |
| **E3** “A vaga de [nome] acabou” (`alertdialog`) | Confirmar (o aviso aparece ao voltar à T3) | Esc, toque fora ou Fechar: fecha sem alterar nada | Vai à lixeira da disciplina afetada, porque o Confirmar ficou bloqueado | ✅ |
| Toast “Desfazer” | Descartar ou remover | × fecha; Desfazer restaura | Título da tela | ✅ |

Ao voltar do detalhe (T2) para a lista, o foco vai para o cartão que abriu o detalhe. Isso foi um defeito encontrado nesta verificação (o foco se perdia no `<body>` porque a lista é remontada) e corrigido.

## Critérios WCAG demonstrados

| WCAG | Como a interface atende | Evidência |
| --- | --- | --- |
| **2.5.8** alvo mínimo | Mínimo do AA é 24px; o projeto adota 48px nas ações principais. Medido: **+**, lixeira, botões, busca, navegação e abas têm 48px (a barra de abas encolhe para 38px ao rolar, ainda acima de 24); chips 36px; seletor de aba 40px | Medição no navegador, `.chip`, `.segmented__option` |
| **1.4.3** contraste | Ação 6,08:1; erro 5,70:1; sucesso 4,55:1; texto secundário 7,06:1 contra o fundo; botão de perigo com texto branco 6,47:1 (antes 3,91:1, achado IA-01) | `docs/design-system.md` |
| **1.4.1** uso da cor | Seleção tem ✓ e borda além da cor; o choque de horário e a vaga esgotada aparecem em texto (“Choca com…”, “Vaga esgotada”) além do vermelho; o limite de créditos excedido tem mensagem em texto (“Limite de créditos excedido: 13 de 12…”) além do vermelho; a lixeira vermelha é confirmada por texto no bottom sheet | T1, T3 e E3 |
| **2.4.7** foco visível | Contorno de 3px em roxo (`:focus-visible`) em todo controle | `src/styles/global.css`, print numerado |
| **3.3.3** sugestão de erro | A busca com mais de 60 caracteres diz “Use até 60 caracteres ou apague parte do termo”; o aviso de vaga esgotada diz o que fazer (remover a disciplina ou escolher outra) | T1 (E4), T3 (E3) |
| 2.1.1 teclado | Toda a jornada T1 → T5 foi percorrida só com os controles padrão; diálogos nativos (`<dialog>`) | Verificação de 03/10/2026 |
| 2.1.2 sem armadilha | Esc sempre fecha a sobreposição; Tab não fica preso fora de um diálogo aberto | Verificação de 03/10/2026 |
| 4.1.2 nome, função, valor | Botões de ícone têm nome, `aria-pressed` nos que alternam, `role="status"`/`alertdialog` nos avisos | Tabela de nomes acima |
| 2.2.1 tempo ajustável | O toast de Desfazer não some sozinho | `src/App.tsx` |
| 1.3.1 informações e relações | Toda tela tem uma região `<main>` (T2, T3 e T4 não tinham; achado IA-02) | Verificado no navegador em 03/10/2026 |
| 2.4.2 página com título | O título da aba muda a cada tela (“Revise e confirme — O caso Marina”); o h1 do Início diz “Início · Marina” para o leitor de tela (achado IA-03) | `src/App.tsx`, `Home.tsx` |

## O que ainda precisa de olho humano

- Leitor de tela (VoiceOver) não foi usado; os nomes e papéis foram conferidos pela árvore de acessibilidade do navegador.
- A janela do teste foi 402px. Em larguras menores que 360px o cartão muda de proporção (ver quebras) e não foi fotografado.
