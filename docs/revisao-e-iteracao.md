# Revisão heurística e iteração

## Revisão heurística com IA

A revisão completa está em [`avaliacao-heuristica-exportada.md`](avaliacao-heuristica-exportada.md), exportada da ferramenta [`avaliacao-heuristica.html`](avaliacao-heuristica.html). Cada achado traz o que a IA viu, a origem (heurística de Nielsen ou critério WCAG), a severidade, a correção sugerida e **a decisão do estudante com o motivo**. Resumo do export de 03/10/2026:

| Decisão do estudante | Quantidade | Achados |
| --- | --- | --- |
| Aceitar | 11 | IA-01, 02, 03, 05, 06, 09, 12, 14, 17, 19, 22 |
| **Recusar** | **9** | IA-04, 07, 10, 13, 15, 16, 18, 20, 21 |
| A registrar | 2 | IA-08, 11 |

**Sugestões recusadas, com o motivo do estudante** (o enunciado exige ao menos uma): IA-04 (manter só uma das proteções ao descartar: *“Segurança para evitar erro”*), IA-13 (trocar o + por caixa de seleção: *“é altamente reconhecível que o + é para adicionar”*), IA-15 (parar de encolher a barra ao rolar: *manter*), IA-16 (chips de 36px para 48px: *“dentro dos padrões aceitáveis”*), IA-20 (contador de resultados: *“não há impacto de uso”*), IA-21 (kicker em caixa mista: *“vale manter como está”*).

Alguns achados já foram corrigidos no código (IA-05, 06 e 08, decisão 27). A análise manual tela a tela ainda tem telas sem marcação (T4, T5, Agenda e Estados).

## Teste com pessoa

Não preencher como realizado antes do teste. Roteiro de 10 a 15 minutos, no celular (ou janela de 402px), sem explicar a interface:

1. “Escolha **duas disciplinas** para o próximo semestre e garanta a vaga.” (T1 → T4; observar onde hesita.)
2. “Uma das disciplinas está com **uma vaga só**. Tente confirmar.” (E3; observar se entende o aviso e o que faz depois.)
3. “Desista da seleção e **volte atrás**.” (Cancelar e Desfazer; observar se acha as duas saídas.)

Anotar tempo, hesitações, falas em voz alta e onde a pessoa tocou errado.

| Experimento | Fato observado | Insight | Recomendação | Alteração feita |
| --- | --- | --- | --- | --- |
| A realizar | A observar | A interpretar | A propor | A registrar |
