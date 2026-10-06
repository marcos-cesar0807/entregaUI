# Cartão de disciplina

## 1. Finalidade

Permite comparar disciplinas rapidamente na lista, com o conjunto de informações exigido para Marina, e escolher sem sair da lista.

## 2. Anatomia

Cartão branco e plano (sem sombra, só vidro flutua), com os cantos a 24 (`radius/card`). Ele ocupa as 4 colunas do grid e repete a mesma grade por dentro, sem moldura: a **arte ocupa a coluna 1** (80,5px, encostada na borda esquerda e recortada pelo raio do cartão), com o degradê local e a ilustração 3D da área, e o **texto ocupa as colunas 2 a 4**, com a calha de 16 (`space/16`) entre os dois. No texto: selo “Últimas vagas” quando aplicável, nome, professor, horário, créditos e vagas restantes, cada um com ícone. No canto superior direito, o botão **+** redondo. Dois botões irmãos, sem aninhamento: um que cobre o cartão e abre o detalhe (T2), e o **+** que adiciona.

## 3. Variantes e estados

- Não selecionado: **+** em círculo roxo claro.
- Selecionado: cartão com fundo roxo claro e **✓** em círculo roxo (o estado não depende só da cor).
- Com choque de horário: a linha do horário vira “Choca com [aula]” em vermelho com ícone de alerta.
- Esgotado: o **+** fica desativado.
- Badge “Últimas vagas” quando restam até seis vagas.

## 4. Comportamento

Tocar no cartão abre o detalhe (T2). Tocar no **+** adiciona ou tira a disciplina da seleção, com um pequeno salto no círculo (240ms, curva de mola), e o acessório de seleção acima da tab bar atualiza a contagem. Em T2, adicionar volta para a lista, onde está o “Revisar”.

## 5. Conteúdo

Nome, docente, horário e vagas em texto. Os quatro primeiros itens se baseiam no quadro Figma; os demais são dados demonstrativos para atingir oito cartões.

## 6. Acessibilidade

O botão que abre o detalhe tem nome “Ver detalhes de [disciplina]” (e “(selecionada)” quando aplicável). O **+** tem nome “Adicionar [disciplina] à matrícula” ou “Tirar [disciplina] da matrícula” e `aria-pressed`. Alvo de toque de 48px no **+** (2.5.8). Seleção indicada por fundo e por ícone (1.4.1). Choque de horário com ícone e texto, nunca só cor (1.4.1). O foco visível usa o anel roxo padrão (2.4.7).

## 7. Tokens e implementação

`color/bg/secondary`, `color/purple/50` (selecionado), `radius/card`, `space/16`, `duration/medium`, `ease/spring`. Código: `src/components/organisms/DisciplineCard.tsx`, com `Badge`, `Icon` e ícones Hugeicons (sem `Checkbox`). Storybook: `Organismos/Cartão de disciplina`. Referência Figma: cartão `70:658` e tela `47:9`; referência visual: `docs/proposta-visual/proposta-repaginacao.html`.
