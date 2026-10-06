# Bottom sheet

## 1. Finalidade

Pede uma decisão ou mostra um aviso sem tirar a pessoa da tela: remover disciplina, descartar a seleção (T3), vaga esgotada (E3) e o perfil do professor (T2). Substitui os diálogos centrados.

## 2. Anatomia

Folha ancorada embaixo, com os cantos de cima a 24px, sobre um fundo escurecido. Título, texto curto e as ações empilhadas em largura total: a **ação principal em cima** e a **secundária embaixo**. Não há botão ×.

## 3. Variantes e estados

`dialog` (padrão) e `alertdialog` (aviso que interrompe, como a E3). A ação principal pode ser `primary` ou `danger`; a secundária é sempre `tertiary`. Estados: fechada, subindo, aberta e descendo.

## 4. Comportamento

Sobe de baixo e desce ao fechar (duração média, 240ms). Fecha com **Esc**, **tocando fora** da folha ou na ação secundária. A ação principal faz o que promete e fecha.

## 5. Conteúdo

Título em forma de pergunta quando pede decisão (“Remover disciplina?”) e afirmação quando avisa (“A vaga de Dataviz acabou”). O texto diz o que muda e se dá para desfazer. Os rótulos dos botões são verbos (“Remover”, “Descartar”, “Manter”).

## 6. Acessibilidade

Usa o `<dialog>` nativo em modo modal: o conteúdo de trás fica inerte e Tab não sai da folha. O foco inicial vai para a ação **secundária** (a segura), não para a principal, que costuma ser destrutiva. Ao fechar, o foco volta a quem abriu a folha; na E3 vai para a lixeira da disciplina afetada. Como não há ×, o fechamento visível é a ação secundária, além de Esc e do toque fora. O aviso da E3 usa `role="alertdialog"` com título e texto ligados por `aria-labelledby` e `aria-describedby`.

## 7. Tokens e implementação

`radius/card` (cantos de cima), `space/8`, `space/24`, `duration/medium`, `type/title-sm-h4` no título. Código: `src/components/molecules/BottomSheet.tsx`; estilo em `src/styles/global.css` (`.bottom-sheet`, `.sheet-title`, `.sheet-text`, `.sheet-actions`). Storybook: `Moléculas/Bottom sheet`. Não existe no Figma; é uma extensão necessária aos estados de decisão do enunciado.
