# O caso Marina — Design System e matrícula

**Entrega principal: caminho B, código.** Projeto React para o fluxo de matrícula móvel da persona Marina, com Design System documentado em Storybook. O enunciado está rastreado em [`docs/criterios-do-projeto.md`](docs/criterios-do-projeto.md).

## Como usei IA neste projeto

Usei IA ao longo de todo o projeto, primeiro o Codex e depois o Claude Code. Eu desenhei a experiência e a IA executou o que eu pedia. Na maior parte das vezes a primeira proposta não era a que eu queria, e fui chegando ao resultado com várias rodadas de ajuste, avaliando cada uma pelo que fazia sentido para a interface e para o usuário.

**Cada interação com a IA está registrada em [`docs/registro-de-ia.md`](docs/registro-de-ia.md)**: Esse arquivo é a versão expandida do resumo abaixo. As decisões de projeto que saíram dessas interações, com a alternativa descartada, estão em [`docs/decisoes.md`](docs/decisoes.md).

- **Leitura do PDF e conformidade.** Pedi à IA que lesse o enunciado e organizasse as exigências numa matriz de critérios ([`docs/criterios-do-projeto.md`](docs/criterios-do-projeto.md)). Depois voltei a ela várias vezes para conferir se o projeto estava dentro do que era pedido e se eu estava esquecendo alguma coisa. O primeiro relatório apontou problemas que eu não tinha visto, como o E3 estar errado e faltar o print da ordem de foco, e usei isso como plano de trabalho.
- **Do Figma ao código.** Eu tinha criado os tokens do design system no Figma e importei para o projeto local via MCP. A partir deles a IA gerou os arquivos de tokens, o tema do Tailwind, os átomos, as moléculas, os organismos e a primeira tela. Os valores vêm do meu Figma, e a IA não inventou nenhum.
- **Implementação do fluxo, wireframes e refinamento.** Nas telas, eu enviava uma referência e pedia um wireframe antes de implementar. Quase sempre a primeira versão não era a que eu queria, então pedia outra, até aprovar o desenho. Só depois a IA escrevia o código, e a partir daí fiz muitos microajustes até chegar à interface que eu tinha em mente. Em cada rodada eu avaliava se a proposta funcionava como interface e como experiência, e dizia como queria o comportamento dos componentes, a jornada da Marina e as microinterações. A IA errou a primeira leitura em vários pontos, como a posição do botão "Adicionar", a tab bar que colapsava quando eu queria que só diminuísse e o arredondamento excessivo da agenda. Recusei também o que não servia, como dados inventados, funções sem uso e uma repaginação que ignorava os assets do projeto. Os limites do sistema, como a escala de espaço, os três raios e a base de 14px, fui eu que defini, e a IA trabalhou dentro deles.
- **Auditoria e verificação.** A IA rodou verificações automáticas de acessibilidade, mediu contrastes, fontes e espaços no navegador e testou teclado, Esc e retorno de foco. Ela achou defeitos reais, como um aviso que cobria o botão de confirmar, um foco que se perdia ao voltar de uma tela e um seletor CSS que descolorava o botão. Na análise heurística escreveu 21 achados, e eu decidi sobre cada um: aceitei 11 e recusei 9. Aceitei o IA-14 mesmo com a recomendação original da IA contra. A análise está em [`docs/avaliacao-heuristica.html`](docs/avaliacao-heuristica.html) (ferramenta) e [`docs/avaliacao-heuristica-exportada.md`](docs/avaliacao-heuristica-exportada.md) (export), com o que veio da IA separado do que é decisão minha; o resumo está em [`docs/revisao-e-iteracao.md`](docs/revisao-e-iteracao.md).
- **Documentação e Storybook.** Pedi abas de Docs por componente, páginas de avaliação, páginas visuais de Fundamentos para designers, o `decisoes.md` e o registro de IA a cada pedido. Exigi fonte única e valores medidos do que está na tela, para a documentação e o código não divergirem. No Storybook, cada componente com página em `docs/componentes/` mostra o mesmo texto na aba **Docs**; *Fundamentos/Design System (avaliação)* e *Fundamentos/Acessibilidade (avaliação)* puxam [`docs/design-system.md`](docs/design-system.md) e [`docs/acessibilidade.md`](docs/acessibilidade.md); e *Projeto/Protótipo* mostra as 5 telas e os 4 estados com os componentes reais.
- **Apresentação.** Montei o pitch em HTML local com a IA (`apresentacao/`). Ele passou de 20 para 32 slides e voltou a 17, conforme fui ajustando o foco. Os prints foram regenerados a partir do app atual quando o deck ficou com imagens antigas. Pedi que tudo ficasse na minha máquina, sem publicar fora.

## Estado (03/10/2026)

Fluxo completo e navegável: Início → Disciplinas (T1) → Detalhe (T2) → Resumo (T3) → Confirmação (T4) → Minhas matrículas (T5), mais Agenda. Estados: E1 (sem resultado), E2 (carregando), **E3 (vaga esgotada durante a decisão, ao tocar Confirmar na T3)** e E4 (busca com mais de 60 caracteres). As quatro saídas existem: voltar preserva, cancelar descarta, desfazer reverte e fechar não altera nada. O percurso T1→T5 foi verificado só com teclado. **Pendências:** teste com pessoa, decisões da revisão heurística (cabem ao estudante) e o envio no Moodle. Detalhe em [`docs/criterios-do-projeto.md`](docs/criterios-do-projeto.md) e [`docs/handoff.md`](docs/handoff.md).

## Estrutura

```text
.storybook/                 Configuração do Storybook
docs/                      Critérios, decisões, tokens, componentes e handoff
evidencias/foco/            Print da ordem de foco (T1, 27 paradas)
src/components/atoms/      Botão, input, badge, chip, checkbox e ícone
src/components/molecules/  Busca e mensagem de sistema
src/components/organisms/  Cartão de disciplina e resumo fixo
src/flows/                 Telas e estados
src/styles/                Tokens CSS
src/stories/               Histórias do Storybook
```

## Desenvolvimento

Depois de `npm install`:

- `npm run dev`: protótipo durante o desenvolvimento.
- `npm run storybook`: componentes e variantes. O grupo **Fundamentos** tem as páginas visuais do design system para designers (comece por *Comece aqui*).
- `npm run build`: build convencional em `dist/`.
- `npm run build:offline`: `offline/index.html` com JavaScript, CSS e fontes embutidos; manter a pasta `offline/assets/` junto do HTML.
- `npm run build-storybook`: Storybook estático em `storybook-static/`.

As **115 variáveis locais** do Figma foram traduzidas em `src/styles/figma-tokens.css` e `src/styles/figma-tokens.json`, fonte única de verdade dos tokens. A seleção de 38 tokens explicada para a disciplina está em `docs/design-system.md`; a documentação completa e descritiva das 115 variáveis está no Storybook, em **Fundamentos/Tokens**. `src/styles/tailwind-theme.css` espelha esses tokens no namespace `@theme` do Tailwind (v4, via `@tailwindcss/vite`) para uso em classes utilitárias; os componentes existentes continuam em CSS puro. Os assets visíveis da T1 estão no projeto, sem URLs temporárias do Figma.

## Entrega planejada

O ZIP deve incluir LEIA-ME com caminho principal e instruções para abrir, protótipo que abra no navegador sem instalar dependências, documentação em **um PDF único**, registro de IA e prints de T1 com ordem de foco numerada. O build `offline/` prepara esse formato, mas a abertura direta via `file://` ainda deve ser conferida na máquina do estudante. Prazo do PDF: **05/10/2026, 23h59**, via Moodle.
