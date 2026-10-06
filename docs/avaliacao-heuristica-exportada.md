# Avaliação heurística · O caso Marina

Gerado em 03/10/2026. Análise da IA: Claude Code e axe-core 4.10.2. Análise manual: o estudante.

## Análise da IA, com a decisão do estudante

### IA-01 · Folhas (bottom sheets) · Botão de perigo ("Descartar seleção", "Remover disciplina")

- **Onde:** Folhas (bottom sheets) · Botão de perigo ("Descartar seleção", "Remover disciplina")
- **O que a IA viu:** Texto branco sobre #e5484d mede 3,91:1; o mínimo para texto de 14px é 4,5:1.
- **Origem:** Norma · WCAG 1.4.3
- **Por que é problema:** Quem tem baixa visão pode ler mal o rótulo da ação destrutiva, justamente a que mais exige atenção. O contraste não muda: tropeça sempre.
- **Severidade da IA:** 2 (frequência às vezes, impacto custa caro, persistência tropeça sempre)
- **Correção:** Escurecer o fundo do botão de perigo (token de erro mais escuro) até ≥ 4,5:1 com texto branco.
- **Quem achou:** Verificador (axe) + medição da IA
- **Estado:** aberto
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 3
- **Motivo:** (a registrar)

### IA-02 · T2 · Detalhe da disciplina · Estrutura da página (sem região principal)

- **Onde:** T2, T3 e T4 · Estrutura da página (sem região principal)
- **O que a IA viu:** O axe aponta "landmark-one-main" e "region" (11, 13 e 14 elementos fora de região) em T2, T3 e T4. Início, T1, T5 e Agenda passam.
- **Origem:** Norma · WCAG 1.3.1
- **Por que é problema:** Quem navega por leitor de tela não consegue pular direto para o conteúdo principal nessas três telas, e elas são o caminho da matrícula.
- **Severidade da IA:** 2 (frequência toda vez, impacto contorna, persistência às vezes lembra)
- **Correção:** Envolver o conteúdo de T2, T3 e T4 em um <main>, como nas outras telas, e deixar a barra fixa em região própria.
- **Quem achou:** Verificador (axe). É "boa prática" do axe, ligada a 1.3.1 e 2.4.1.
- **Estado:** aberto
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 4
- **Motivo:** (a registrar)

### IA-03 · Início · Título do documento, título da NavBar e h1 do Início

- **Onde:** Todas · Título do documento, título da NavBar e h1 do Início
- **O que a IA viu:** O <title> é sempre "O caso Marina — Matrícula"; o título da NavBar tem aria-hidden; o h1 do Início é "Marina".
- **Origem:** Heurística 1 (Visibilidade do estado do sistema) · WCAG 2.4.2
- **Por que é problema:** Ao trocar de tela, quem usa leitor de tela não ouve em que tela está; a aba do navegador e o histórico também não ajudam.
- **Severidade da IA:** 2 (frequência toda vez, impacto contorna, persistência aprende)
- **Correção:** Atualizar document.title a cada tela ("Disciplinas — O caso Marina") e dar ao h1 do Início um texto que diga onde a pessoa está.
- **Quem achou:** IA (auditoria contra a apostila)
- **Estado:** aberto
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 2
- **Motivo:** (a registrar)

### IA-04 · T3 · Revise e confirme · Cancelar seleção → folha de confirmação → Desfazer

- **Onde:** T3 e Folhas · Cancelar seleção → folha de confirmação → Desfazer
- **O que a IA viu:** Descartar a seleção pede confirmação numa folha e, depois, ainda mostra o Desfazer. São duas redes de segurança para a mesma ação.
- **Origem:** Heurística 5 (Prevenção de erro)
- **Por que é problema:** Um toque a mais para quem está com pressa. Mas as duas proteções foram decididas de propósito (decisões #19 e #25): decidir qual manter é seu.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Manter só uma das duas (folha antes OU Desfazer depois), e registrar o motivo da outra no campo "Descarte" da decisão.
- **Quem achou:** IA (auditoria contra a apostila)
- **Estado:** aberto
- **Caixa (estudante):** Opinião vestida de norma
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** Segurança para evitar erro. Não vou ajustar
- **O que foi feito no lugar:** Nada

### IA-05 · T3 · Revise e confirme · Rótulos de botão: "Confirmar", "Revisar", "Manter"

- **Onde:** T1, T2, T3 · Rótulos de botão: "Confirmar", "Revisar", "Manter"
- **O que a IA viu:** Não diziam o objeto nem o resultado da ação.
- **Origem:** Heurística 2 (Correspondência com o mundo real)
- **Por que é problema:** Na pressa, "Confirmar" sozinho não diz se confirma a matrícula, a seleção ou outra coisa.
- **Severidade da IA:** 2 (frequência toda vez, impacto contorna, persistência aprende)
- **Correção:** Verbo + objeto: Confirmar matrícula, Revisar seleção, Remover disciplina, Manter disciplina, Descartar seleção.
- **Quem achou:** IA (auditoria contra a apostila)
- **Estado:** corrigido · Corrigido em 03/10/2026 (decisão #27). Conferido no navegador na lista; resumo e folhas só por leitura do código.
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 2
- **Motivo:** (a registrar)

### IA-06 · T1 · Lista de disciplinas · Campo de busca, chips de área, trilha do seletor, card de totais

- **Onde:** T1 e T3 · Campo de busca, chips de área, trilha do seletor, card de totais
- **O que a IA viu:** O contorno media 1,14:1 contra o fundo; o mínimo para componentes é 3:1.
- **Origem:** Norma · WCAG 1.4.11
- **Por que é problema:** Quem tem baixa visão não percebe onde o campo e os filtros começam e terminam.
- **Severidade da IA:** 2 (frequência toda vez, impacto contorna, persistência às vezes lembra)
- **Correção:** Novo token --color-border-control (gray-500) nos controles: 3,61:1.
- **Quem achou:** IA com medição no navegador
- **Estado:** corrigido · Corrigido em 03/10/2026 (decisão #27); medido depois: 3,61:1.
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 2
- **Motivo:** (a registrar)

### IA-07 · T3 · Revise e confirme · Blocos da semana no resumo ("Fundamentos de Programação", "Inglês Instrumental")

- **Onde:** T2 e T3 · Blocos da semana no resumo ("Fundamentos de Programação", "Inglês Instrumental")
- **O que a IA viu:** O nome era cortado no meio, sem reticências.
- **Origem:** Heurística 6 (Reconhecer em vez de lembrar)
- **Por que é problema:** A Marina precisa reconhecer a disciplina pelo nome; cortado sem aviso parece outro nome.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Reticências no bloco e nome completo no aria-label da agenda.
- **Quem achou:** IA com medição no navegador
- **Estado:** corrigido · Corrigido em parte: o nome completo ainda não aparece na tela, só para o leitor de tela. Não conferi visualmente depois da mudança.
- **Caixa (estudante):** Plausível e falso
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** Já corrigido
- **O que foi feito no lugar:** Nada

### IA-22 · Agenda · Blocos da visão Semana: "Inglês Instrumental", "Cálculo I"

- **Onde:** Agenda (Semana) · Blocos da visão Semana: "Inglês Instrumental", "Cálculo I"
- **O que a IA viu:** O texto quebra no meio da palavra: "Cálcul / o I", "Instrumenta / l".
- **Origem:** Heurística 6 (Reconhecer em vez de lembrar)
- **Por que é problema:** A Marina precisa reconhecer a disciplina de relance; palavra partida atrasa a leitura e pode parecer outro nome.
- **Severidade da IA:** 2 (frequência toda vez, impacto contorna, persistência aprende)
- **Correção:** Em coluna estreita não partir palavra: abreviar com reticências ou mostrar só a sigla, e abrir o nome inteiro ao tocar.
- **Quem achou:** IA com captura de tela no navegador
- **Estado:** aberto
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 3
- **Motivo:** (a registrar)

### IA-08 · Estados (E1–E4 e limite) · Regra de movimento reduzido (CSS global)

- **Onde:** Todas · Regra de movimento reduzido (CSS global)
- **O que a IA viu:** A regra zera as durações mas não limita a repetição: spinner e esqueleto, que repetem sem parar, passariam a piscar.
- **Origem:** Norma · WCAG 2.3.3
- **Por que é problema:** Quem ativa essa preferência o faz para evitar movimento; piscar seria pior que animar.
- **Severidade da IA:** 1 (frequência raro, impacto contorna, persistência aprende)
- **Correção:** Adicionar animation-iteration-count: 1 à regra.
- **Quem achou:** IA (leitura do CSS)
- **Estado:** corrigido · Corrigido em 03/10/2026, só por leitura de CSS. Não testei com a preferência ativa.
- **Caixa (estudante):** (a classificar)
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** (a registrar)
- **Severidade do estudante:** (a registrar)
- **Motivo:** (a registrar)

### IA-09 · T2 · Detalhe da disciplina · Botão Voltar (círculo flutuante)

- **Onde:** T2 e T3 · Botão Voltar (círculo flutuante)
- **O que a IA viu:** O fundo do círculo mede 1,06:1 contra o fundo, abaixo dos 3:1 de 1.4.11.
- **Origem:** Norma · WCAG 1.4.11
- **Por que é problema:** Concluí que não é defeito: o círculo é só decoração; a informação é o ícone (15:1) e o alvo tem 48px.
- **Severidade da IA:** 0 (frequência raro, impacto contorna, persistência aprende)
- **Correção:** Nenhuma. Registrado como nível 0: defeito listado e depois descartado.
- **Quem achou:** IA com medição no navegador
- **Estado:** nivel0 · Nível 0 (slide 11 da aula): a IA listou, mediu e concluiu que não era defeito. Você confirma ou discorda.
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 0
- **Motivo:** (a registrar)

### IA-10 · T3 · Revise e confirme · Aviso de vaga só ao confirmar (E3)

- **Onde:** T3 · Revise e confirme · Aviso de vaga só ao confirmar (E3)
- **O que a IA viu:** Hoje a vaga só falha ao tocar Confirmar matrícula.
- **Origem:** Heurística 1 (Visibilidade do estado do sistema)
- **Por que é problema:** Resolve melhor o medo da Marina ("a vaga ainda vai estar lá?"); mas o aviso já cobre o erro sem falsa confirmação.
- **Severidade da IA:** 1 (frequência raro, impacto custa caro, persistência aprende)
- **Correção:** Sugestão original da IA: revalidar as vagas ao abrir a T3 e avisar antes. A própria IA sugeria adaptar: só para a disciplina com 1 vaga.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** rascunho
- **Caixa (estudante):** Plausível e falso
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** (a registrar)
- **O que foi feito no lugar:** (a registrar)

### IA-11 · T1 · Lista de disciplinas · Filtro por período na lista

- **Onde:** T1 · Lista de disciplinas · Filtro por período na lista
- **O que a IA viu:** O enunciado (p. 1) lista filtro por período; só existem chips de área (decisão 15).
- **Origem:** Heurística 4 (Consistência e padrões)
- **Por que é problema:** Fecha a lacuna com o enunciado. Mas você removeu o filtro de propósito.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Sugestão original: recolocar o filtro por período. A IA deixou "decidir": só vale se o professor cobrar.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** rascunho
- **Caixa (estudante):** (a classificar)
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** (a registrar)
- **Severidade do estudante:** (a registrar)
- **Motivo:** (a registrar)

### IA-12 · T3 · Revise e confirme · Aviso com Desfazer fica até fechar

- **Onde:** T3 · Revise e confirme · Aviso com Desfazer fica até fechar
- **O que a IA viu:** A IA sugeriu fazer o aviso de Desfazer sumir sozinho em 5 segundos.
- **Origem:** Heurística 3 (Controle e liberdade do usuário) · WCAG 2.2.1
- **Por que é problema:** Tempo limite quebra o 2.2.1; a Marina, no celular e com pressa, pode não ver o aviso a tempo.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Sugestão original: sumir em 5s. A IA recomendava recusar.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** rascunho
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** toast fixo 
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 2
- **Motivo:** (a registrar)

### IA-13 · T1 · Lista de disciplinas · Botão + do cartão

- **Onde:** T1 · Lista de disciplinas · Botão + do cartão
- **O que a IA viu:** A IA sugeriu trocar o + por uma caixa de seleção com o rótulo "Selecionar".
- **Origem:** Heurística 6 (Reconhecer em vez de lembrar)
- **Por que é problema:** O + tem 48px, nome acessível e aria-pressed. A caixa ocuparia espaço do cartão em 402px.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Sugestão original: caixa com rótulo. A IA recomendava recusar.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** rascunho
- **Caixa (estudante):** Opinião vestida de norma
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** (a registrar)
- **O que foi feito no lugar:** Não fiz nada, é altamente reconhecível que o + eé para adicionar

### IA-14 · T3 · Revise e confirme · Confirmar matrícula sem "Tem certeza?"

- **Onde:** T3 · Revise e confirme · Confirmar matrícula sem "Tem certeza?"
- **O que a IA viu:** A IA sugeriu pedir "Tem certeza?" antes de Confirmar na T3.
- **Origem:** Heurística 5 (Prevenção de erro)
- **Por que é problema:** A T3 já é a tela de confirmação; a prevenção real vem do bloqueio. Uma confirmação a mais pesa para quem tem pressa.
- **Severidade da IA:** 1 (frequência raro, impacto contorna, persistência aprende)
- **Correção:** Sugestão original: acrescentar a pergunta. A IA recomendava recusar.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** corrigido · Implementado em 03/10/2026 (decisão #29): folha “Confirmar matrícula?” antes de enviar. Conferido no navegador: Esc, toque fora e Voltar e revisar não confirmam.
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** Não tem
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 4
- **Motivo:** (a registrar)
- **O que foi feito:** Folha de confirmação antes de enviar a matrícula.

### IA-15 · Estados (E1–E4 e limite) · Barra de abas e botão de ação encolhem ao rolar

- **Onde:** Todas · Barra de abas e botão de ação encolhem ao rolar
- **O que a IA viu:** Encolhem a 80%, chegando a 38px de altura.
- **Origem:** Norma · WCAG 2.5.8
- **Por que é problema:** Continua acima do mínimo de 24px do AA, mas o alvo da ação principal cai abaixo de 48px.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Sugestão original: parar de encolher. A IA sugeria adaptar: manter o encolhimento só na barra de abas.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** rascunho
- **Caixa (estudante):** Opinião vestida de norma
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** Opinião
- **O que foi feito no lugar:** Manter

### IA-16 · T1 · Lista de disciplinas · Chips (36px) e seletor (40px)

- **Onde:** T1 · Lista de disciplinas · Chips (36px) e seletor (40px)
- **O que a IA viu:** Medidos no navegador abaixo dos 48px do restante dos controles.
- **Origem:** Norma · WCAG 2.5.8
- **Por que é problema:** Passam o mínimo de 24px do AA; a escala do projeto pede 48px.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Sugestão original: subir para 48px.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** rascunho
- **Caixa (estudante):** Opinião vestida de norma
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** Está dentro dos padrões aceitáveis
- **O que foi feito no lugar:** Está dentro dos padrões aceitáveis e não mudarei

### IA-17 · Estados (E1–E4 e limite) · Aviso de vaga esgotada (E3)

- **Onde:** E3 e T3 · Aviso de vaga esgotada (E3)
- **O que a IA viu:** Hoje diz "remova ou volte à lista"; não há atalho para outra disciplina.
- **Origem:** Heurística 9 (Ajudar a reconhecer, diagnosticar e recuperar de erros)
- **Por que é problema:** O caminho para uma alternativa fica por conta da Marina.
- **Severidade da IA:** 1 (frequência raro, impacto custa caro, persistência aprende)
- **Correção:** Sugestão original: ver disciplinas parecidas. A IA sugeria adaptar: um atalho "Escolher outra" que leva à T1 mantendo as demais selecionadas.
- **Quem achou:** IA, revisão de 03/10 (antes da apostila)
- **Estado:** rascunho
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 1
- **Motivo:** (a registrar)

### IA-18 · T3 · Revise e confirme · Confirmar matrícula desabilitado

- **Onde:** T3 · Revise e confirme · Confirmar matrícula desabilitado
- **O que a IA viu:** O motivo aparece na barra ("Resolva o choque") e acima, mas o botão só fica apagado.
- **Origem:** Heurística 1 (Visibilidade do estado do sistema)
- **Por que é problema:** Botão apagado não diz o que fazer; o texto de motivo está perto, mas separado.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Manter o texto de motivo junto do botão, ou deixar o botão ativo e explicar ao tocar.
- **Quem achou:** IA (auditoria contra a apostila)
- **Estado:** aberto
- **Caixa (estudante):** Opinião vestida de norma
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** Não faz sentido
- **O que foi feito no lugar:** Irei ajustar a mensagem

### IA-19 · Estados (E1–E4 e limite) · Estados da tela: falta "não consegui carregar"

- **Onde:** Estados (E1–E4 e limite) · Estados da tela: falta "não consegui carregar"
- **O que a IA viu:** Existem E1 (busca vazia), E2 (carregando), E3 (vaga esgotada) e E4 (busca longa); não há tela de falha do sistema ou sem conexão.
- **Origem:** Heurística 9 (Ajudar a reconhecer, diagnosticar e recuperar de erros)
- **Por que é problema:** Se o carregamento falhar no meio da corrida por vagas, a Marina não saberia o que fazer.
- **Severidade da IA:** 2 (frequência às vezes, impacto não sai, persistência aprende)
- **Correção:** Acrescentar um estado de falha com mensagem e botão "Tentar de novo".
- **Quem achou:** IA (auditoria contra a apostila)
- **Estado:** aberto · O enunciado não exige esse estado; vale como lacuna de handoff (pergunta 3 da especificação).
- **Caixa (estudante):** Verificável
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Aceitar
- **Severidade do estudante:** 2
- **Motivo:** (a registrar)

### IA-20 · T1 · Lista de disciplinas · Lista sem contador de resultados

- **Onde:** T1 · Lista de disciplinas · Lista sem contador de resultados
- **O que a IA viu:** A busca e os chips mudam a lista sem dizer quantas disciplinas aparecem.
- **Origem:** Heurística 1 (Visibilidade do estado do sistema)
- **Por que é problema:** Sem o total, a Marina não sabe se viu tudo ou se faltou rolar.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Linha "n disciplinas" acima da lista, anunciada pelo leitor de tela.
- **Quem achou:** IA (auditoria contra a apostila)
- **Estado:** aberto
- **Caixa (estudante):** Opinião vestida de norma
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** Opinião, não há impacto de uso
- **O que foi feito no lugar:** Nada

### IA-21 · T2 · Detalhe da disciplina · Kicker em caixa-alta com 7 palavras

- **Onde:** T2 · Detalhe da disciplina · Kicker em caixa-alta com 7 palavras
- **O que a IA viu:** "Programação · 1º período · 4 créditos" em caixa-alta, longo para uma linha em maiúsculas.
- **Origem:** Heurística 8 (Estética e design minimalista)
- **Por que é problema:** Caixa-alta em frase longa é mais lenta de ler.
- **Severidade da IA:** 1 (frequência às vezes, impacto contorna, persistência aprende)
- **Correção:** Manter caixa mista, ou abreviar o kicker.
- **Quem achou:** IA (auditoria contra a apostila)
- **Estado:** aberto
- **Caixa (estudante):** Opinião vestida de norma
- **O que o estudante conferiu:** (a registrar)
- **Decisão do estudante:** Recusar
- **Severidade do estudante:** (a registrar)
- **Motivo:** Não é plausível, vale manter como está
- **O que foi feito no lugar:** Nada será feito

## Análise manual do estudante, tela a tela

### Início

7 atendem · 0 não atendem · 3 não se aplicam · 7 não marcados


### T1 · Lista de disciplinas

9 atendem · 0 não atendem · 1 não se aplicam · 7 não marcados


### T2 · Detalhe da disciplina

10 atendem · 0 não atendem · 0 não se aplicam · 7 não marcados


### T3 · Revise e confirme

10 atendem · 0 não atendem · 0 não se aplicam · 7 não marcados


### Folhas (bottom sheets)

9 atendem · 0 não atendem · 0 não se aplicam · 8 não marcados


### T4 · Confirmação

0 atendem · 0 não atendem · 0 não se aplicam · 17 não marcados


### T5 · Minhas matrículas

0 atendem · 0 não atendem · 0 não se aplicam · 17 não marcados


### Agenda

0 atendem · 0 não atendem · 0 não se aplicam · 17 não marcados


### Estados (E1–E4 e limite)

0 atendem · 0 não atendem · 0 não se aplicam · 17 não marcados

