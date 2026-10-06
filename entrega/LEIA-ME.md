# O caso Marina: LEIA-ME

**Caminho escolhido (entrega principal): B, código com apoio de IA.** Protótipo navegável em React + TypeScript, com Design System documentado em Storybook. Não há arquivo de design como entrega principal; as variáveis de design vêm do Figma `DS-Marcos`, exportadas para `codigo-fonte/src/styles/figma-tokens.css`.

## Como abrir o protótipo (sem instalar nada)

Abra `prototipo/index.html` com duplo clique. Funciona por `file://`, sem servidor e sem internet. Mantenha a pasta `prototipo/assets/` junto do HTML. Use uma janela estreita (celular, 402px) ou as ferramentas de dispositivo do navegador: a versão de celular é a obrigatória.

Caminho para atravessar de T1 a T5: **Início → Escolher disciplinas (T1) → toque em um cartão (T2) → Adicionar à matrícula → Revisar seleção (T3) → Confirmar matrícula, e confirmar na folha (T4) → Ver minhas matrículas (T5)**.

Para ver o **E3 (vaga esgotada durante a decisão)**: na lista, adicione **Dataviz** (última vaga) e mais uma disciplina, toque em **Revisar seleção**, em **Confirmar matrícula** e de novo em **Confirmar matrícula** na folha de confirmação. Outros estados: **E1** digite “zzz” na busca; **E2** é o esqueleto que aparece ao entrar em Disciplinas; **E4** digite mais de 60 caracteres na busca.

## O que há no ZIP

| Item | Onde |
| --- | --- |
| Protótipo (abre no navegador) | `prototipo/index.html` |
| Código-fonte (para rodar `npm install`, `npm run dev`, `npm run storybook`) | `codigo-fonte/` |
| Documentação em um PDF só: registros de decisão, tabela de tokens, páginas de componente, mapa de fluxo, lista de ligações, percurso de teclado e critérios citados | `documentacao/Documentacao-Caso-Marina.pdf` |
| Registro de uso de IA | `registro-de-uso-de-ia.md` |
| Prints: ordem de foco numerada da T1 e todas as telas e estados | `evidencias/` |

Não há link de visualização de arquivo de design aberto. Os componentes ficam no Storybook (`npm run storybook`, porta 6006), em *Fundamentos/Design System (avaliação)*, *Fundamentos/Acessibilidade (avaliação)* e *Projeto/Protótipo* (as 5 telas e os 4 estados, funcionando).

## Honestidade sobre o que falta

Teste com uma pessoa (item 5), decisões finais da revisão heurística (item 4) e a coluna “Revisão humana” das decisões dependem do estudante e estão sinalizadas como pendentes em `documentacao/` (seções 6 e 7). O filtro por período da T1 foi removido de propósito (decisão 15).
