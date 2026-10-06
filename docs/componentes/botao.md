# Botão

## 1. Finalidade

Aciona a próxima decisão. Na T1, “Confirmar matrícula” abre a prévia da seleção; a matrícula real ainda não é concluída nesta etapa.

## 2. Anatomia

Elemento HTML `button`, texto visível e ícones opcionais antes/depois. A versão média tem altura mínima de 48px.

## 3. Variantes e estados

`primary` para a ação principal, `secondary` para suporte e `tertiary` para ação textual. Tamanhos `md` e `sm`; o rótulo usa o corpo (14/20) nos dois. Estados derivados de `hover`, `active`, `disabled`, `loading` e `selected`.

## 4. Comportamento

Enter e Espaço ativam o botão. Em carregamento, fica desabilitado e recebe `aria-busy`. Uma ação primária por tela é a regra de composição.

## 5. Conteúdo

Usar verbo e resultado esperado: “Confirmar matrícula”, “Voltar”, “Limpar filtros”. Evitar “OK” sem contexto.

## 6. Acessibilidade

Foco visível por teclado, contraste de 6,08:1 no botão primário e alvo médio de 48px. O tamanho `sm` é apenas para ações secundárias em contexto; conferir o alvo quando usado isoladamente.

## 7. Tokens e implementação

`color/action/primary/*`, `color/text/inverse`, `radius/button`, `space/12`, `space/24`, `size/touch-target-min`. Código: `src/components/atoms/Button.tsx`. Storybook: `Átomos/Botão`. Referência Figma: componente `35:56`.
