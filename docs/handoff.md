# Handoff

## Referências

- Tokens, escalas (espaço, tipografia, raio, duração, quebra) e princípios: [`docs/design-system.md`](design-system.md).
- Páginas visuais para designers (Storybook → *Fundamentos*): `src/stories/fundamentos/`, na ordem Comece aqui, Grid e layout, Espaçamento, Tipografia, Cor, Raios e elevação, Movimento e Camadas de tokens.
- Quatro páginas de componente (7 seções): [`docs/componentes/`](componentes/), também na aba Docs do Storybook.
- Fluxo, ligações e animações: [`docs/criterios-do-projeto.md`](criterios-do-projeto.md) e a grade `Projeto/Protótipo` no Storybook.
- Teclado, nomes acessíveis e WCAG: [`docs/acessibilidade.md`](acessibilidade.md) e [`evidencias/foco/`](../evidencias/foco/).
- Decisões (1–26) e iteração: [`docs/decisoes.md`](decisoes.md) e [`docs/revisao-e-iteracao.md`](revisao-e-iteracao.md).
- Uso de IA: [`docs/registro-de-ia.md`](registro-de-ia.md).

## Pendências conhecidas

| Pendência | Impacto | Próxima ação |
| --- | --- | --- |
| Teste com pessoa ainda não realizado | Falta a evidência do item 5 | Aplicar o roteiro de `revisao-e-iteracao.md` e preencher |
| Decisões da revisão heurística e “Revisão humana” das decisões 1–15 e 17–26 em branco | O professor lê a decisão final do estudante, não a sugestão da IA | Aceitar, adaptar ou recusar cada linha, com o motivo |
| Filtro por **período** da T1 foi removido (decisão 15); o enunciado o lista | Pode ser lido como lacuna | Decidir se volta (linha 2 da revisão heurística) |
| Sombras e scrim usam `rgba(0,0,0,…)` literal | Não são hexadecimais, mas são valores soltos | Promover a tokens de sombra se o professor cobrar |
| Tokens de tipografia, raio e duração do projeto sobrescrevem o Figma (`global.css`) | Figma e código divergem | Atualizar as variáveis no Figma para 12/14/18/22/26 e raios 8/24/pílula |
| O limite de créditos usa números demonstrativos (1 crédito = 2h; limite de 12 por semestre) | Em produção a regra viria da instituição | Trocar `CREDIT_LIMIT` e `creditsOf` pela regra real |
| E3 usa dado demonstrativo (`takenOnConfirm` em Dataviz) | Em produção a vaga viria do servidor | Trocar por consulta real à API de vagas |
| Leitor de tela (VoiceOver) não foi usado | Nomes e papéis conferidos só pela árvore de acessibilidade | Testar com VoiceOver no iPhone |
| Versão de tela larga (opcional) não existe | Fora do escopo mínimo | Só depois do celular fechado |
