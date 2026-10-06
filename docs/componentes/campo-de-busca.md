# Campo de busca

## 1. Finalidade

Reduz a lista de disciplinas por nome sem perder a seleção feita.

## 2. Anatomia

`label` acessível, ícone decorativo de busca, `input type="search"` e mensagem de erro opcional.

## 3. Variantes e estados

Vazio, focado, preenchido, desabilitado e com erro. A borda de foco usa a cor de marca.

## 4. Comportamento

Filtra à medida que a pessoa digita. Busca sem resultado mostra E1 com ação “Limpar filtros”. O valor é mantido no estado da T1 enquanto a pessoa abre e fecha detalhes.

## 5. Conteúdo

Rótulo “Buscar disciplina”; placeholder “Buscar disciplina...”. O placeholder complementa o rótulo, não o substitui.

## 6. Acessibilidade

Nome acessível independente do placeholder. Erro, quando presente, usa `aria-invalid` e `aria-describedby` para ligar a instrução ao campo. Alvo com altura mínima de 48px.

## 7. Tokens e implementação

`color/bg/secondary`, `color/border/brand`, `color/text/secondary`, `radius/input`, `space/16`. Código: `src/components/molecules/SearchField.tsx`; compõe os átomos `Input` e `Icon`. Storybook: `Átomos/Input` (átomo sozinho) e `Moléculas/Campo de busca` (esta página). Referência Figma: `33:14`.
