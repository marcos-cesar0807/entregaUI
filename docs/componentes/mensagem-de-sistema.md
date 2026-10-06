# Mensagem de sistema

## 1. Finalidade

Explica o que aconteceu e o que a pessoa pode fazer em seguida nos estados E1, E3 e E4.

## 2. Anatomia

Título, explicação curta e ação opcional. O conteúdo é texto real, sem depender de cor ou ícone.

## 3. Variantes e estados

`info`, `success`, `warning` e `error`, conforme as cores semânticas do Figma.

## 4. Comportamento

Mensagem de erro usa `role="alert"`; as demais usam `role="status"`. A ação, quando existe, é um botão reutilizável. Aviso sobre a tela inteira (choque de horário, limite de créditos, vaga esgotada) fica no topo do conteúdo, antes de qualquer dado, numa mensagem só, mesmo com vários problemas ao mesmo tempo: o título lista os problemas (“Choque de horário e limite de créditos”) e o texto junta os fatos com um único próximo passo; `warning` quando ainda não bloqueia (T2), `error` quando impede confirmar (T3).

## 5. Conteúdo

Descrever fato e próximo passo. Exemplo E1: “Nenhuma disciplina encontrada. Tente outro termo ou limpe os filtros.”

## 6. Acessibilidade

Texto e ação comunicam o estado sem depender só da cor (WCAG 1.4.1). Pares de erro e sucesso medem 5,70:1 e 4,55:1, respectivamente. Mensagem dinâmica é anunciada pelo papel semântico.

## 7. Tokens e implementação

`color/feedback/*`, `radius/card`, `space/16`. Código: `src/components/molecules/SystemMessage.tsx`. Storybook: `Moléculas/Mensagem de sistema`. O arquivo Figma contém `Badge` `38:12` para status; a mensagem composta é uma extensão necessária aos estados do enunciado.
