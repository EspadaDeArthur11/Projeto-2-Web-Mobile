# Eco Mania — Especificação Técnica

Aplicação web educativa sobre separação de resíduos sólidos, construída em
Next.js com App Router.

---

## 1. Visão do produto

O Eco Mania ensina a destinar corretamente resíduos domésticos às cinco
categorias da **Resolução CONAMA 275/2001**, por meio de rodadas curtas de
decisão com retorno imediato.

A premissa pedagógica é que a informação adere melhor no instante da dúvida. O
jogador não recebe uma lista de regras antes de começar: ele decide, erra, e a
explicação daquele resíduo específico aparece no momento em que o erro
acontece. A pontuação sustenta o engajamento; a explicação é o produto.

O público-alvo são escolas, campanhas de educação ambiental e treinamentos
corporativos. A aplicação roda no navegador, sem instalação e sem cadastro.

---

## 2. Escopo

### 2.1 Dentro do escopo

- Dois modos de jogo com regras distintas
- Catálogo de resíduos com explicação individual por item
- Interação por clique e por arrasto, em dispositivos apontadores e de toque
- Registro local de recordes e das duas últimas partidas
- Modo de acessibilidade visual para daltonismo
- Interface responsiva de 320 pixels a telas amplas
- Endpoint HTTP para consulta ao catálogo

### 2.2 Fora do escopo

- Contas de usuário e autenticação
- Placar compartilhado entre jogadores
- Banco de dados ou persistência em servidor
- Painel administrativo para edição do catálogo
- Aplicativo nativo para celular
- Internacionalização

---

## 3. Requisitos funcionais

| ID | Requisito |
|---|---|
| RF01 | O sistema apresenta um menu com acesso aos dois modos de jogo |
| RF02 | O sistema sorteia um resíduo por rodada, sem repetir o da rodada anterior |
| RF03 | O jogador destina o resíduo a uma lixeira por clique ou por arrasto |
| RF04 | O sistema valida a destinação contra a categoria correta do resíduo |
| RF05 | Em caso de acerto, o sistema soma pontos e informa a categoria correta |
| RF06 | Em caso de erro, o sistema exibe a explicação específica daquele resíduo |
| RF07 | O sistema bloqueia novas jogadas enquanto o retorno está em exibição |
| RF08 | No modo clássico, o sistema debita uma vida a cada erro |
| RF09 | No modo clássico, a partida encerra quando as vidas chegam a zero |
| RF10 | No modo por tempo, o sistema conta sessenta segundos regressivamente |
| RF11 | No modo por tempo, a partida encerra quando o cronômetro chega a zero |
| RF12 | Ao encerrar, o sistema apresenta pontuação, estatísticas e recorde |
| RF13 | O sistema indica a categoria com maior número de erros na partida |
| RF14 | O sistema registra o recorde de cada modo separadamente |
| RF15 | O sistema mantém o registro das duas últimas partidas |
| RF16 | O sistema permite ativar a exibição do nome em cada lixeira |
| RF17 | A preferência de acessibilidade persiste entre sessões |
| RF18 | O sistema disponibiliza o catálogo de resíduos por endpoint HTTP |

---

## 4. Requisitos não funcionais

| ID | Categoria | Requisito |
|---|---|---|
| RNF01 | Acessibilidade | Nenhuma informação é transmitida exclusivamente por cor |
| RNF02 | Acessibilidade | Toda ação é alcançável por teclado, com foco visível |
| RNF03 | Acessibilidade | Mudanças de estado são anunciadas a leitores de tela |
| RNF04 | Acessibilidade | O texto alternativo das imagens não revela a resposta |
| RNF05 | Compatibilidade | Operação de 320 pixels de largura em diante, retrato e paisagem |
| RNF06 | Compatibilidade | Suporte a apontadores de mouse, toque e caneta |
| RNF07 | Usabilidade | Movimento reduzido quando o sistema operacional assim indica |
| RNF08 | Desempenho | Ausência de travamento perceptível durante o arrasto |
| RNF09 | Resiliência | Falha de armazenamento não interrompe a partida |
| RNF10 | Portabilidade | Operação sem conexão após o carregamento inicial |
| RNF11 | Manutenibilidade | Catálogo editável sem alteração de código |

---

## 5. Regras de negócio

### 5.1 Categorias

As cinco categorias seguem as cores da Resolução CONAMA 275/2001.

| Categoria | Cor oficial | Itens no catálogo |
|---|---|---|
| Vidro | verde | 3 |
| Plástico | vermelho | 3 |
| Papel | azul | 3 |
| Orgânico | marrom | 3 |
| Metal | amarelo | 3 |

As cores são conteúdo didático, não decisão estética. Nenhum modo de exibição
pode alterá-las: quem aprende na aplicação precisa reconhecer as mesmas cores
na rua.

### 5.2 Pontuação

| Situação | Pontos |
|---|---|
| Acerto | 10 |
| Acerto a partir do terceiro consecutivo | 15 |
| Erro | 0 |

A sequência de acertos zera a cada erro. A maior sequência alcançada é
registrada no resultado da partida. Erros não subtraem pontos — a penalidade é
a vida perdida, no modo clássico, ou o tempo consumido, no modo por tempo.

### 5.3 Modo clássico

| Parâmetro | Valor |
|---|---|
| Vidas iniciais | 3 |
| Condição de término | vidas em zero |
| Pausa após acerto | 1,2 segundo |
| Pausa após erro | 3 segundos |

A pausa após o erro é mais longa porque há texto explicativo a ser lido.

### 5.4 Modo por tempo

| Parâmetro | Valor |
|---|---|
| Tempo inicial | 60 segundos |
| Condição de término | cronômetro em zero |
| Pausa após acerto | 0,6 segundo |
| Pausa após erro | 1,6 segundo |

As pausas são mais curtas porque o cronômetro não interrompe durante a
exibição do retorno. Erros não eliminam o jogador; custam apenas o tempo
consumido pela leitura.

### 5.5 Recordes e histórico

Cada modo mantém um recorde independente: pontuações obtidas em sessenta
segundos não são comparáveis a pontuações obtidas com três vidas.

O histórico guarda exatamente duas partidas, em fila. A cada encerramento, a
partida mais recente ocupa a primeira posição, a anterior desce para a segunda
e a mais antiga é descartada.

---

## 6. Arquitetura

### 6.1 Tecnologias

| Camada | Escolha |
|---|---|
| Framework | Next.js com App Router |
| Linguagem | TypeScript |
| Interface | React |
| Estilos | CSS global com variáveis |
| Dados | arquivo JSON versionado |
| Persistência | armazenamento do navegador |

### 6.2 Princípios de projeto

**Estado como fonte única.** Nenhum componente manipula o documento
diretamente. A interface é função do estado, e alterações de estado provocam
a atualização da tela.

**Regra de validação centralizada.** Clique e arrasto são formas de entrada
distintas que convergem para a mesma rotina de validação. A regra do jogo
existe em um único ponto, o que impede divergência entre os dois caminhos.

**Separação entre dados e lógica.** O catálogo de resíduos é um arquivo de
dados versionado, sem instruções. Acrescentar um item não exige alteração de
código.

**Acessibilidade por padrão.** Os recursos de acessibilidade não são um modo
alternativo: a aplicação é operável por teclado e compreensível sem percepção
de cor em sua configuração inicial. O modo de acessibilidade visual adiciona
um reforço, nunca repara uma ausência.

### 6.3 Fronteira servidor e cliente

A aplicação renderiza no servidor por padrão. Componentes que dependem de
interação, temporizadores ou armazenamento do navegador são marcados como
componentes de cliente.

A marcação se propaga pela árvore: tudo renderizado dentro de um componente de
cliente também executa no cliente. A fronteira é desenhada no nível mais alto
possível de cada rota, de modo que a estrutura estática permaneça no servidor.

---

## 7. Estrutura de diretórios

```
eco-mania/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── classico/page.tsx
│   ├── tempo/page.tsx
│   ├── resultado/page.tsx
│   └── api/residuos/route.ts
│
├── components/
│   ├── Jogo.tsx
│   ├── Hud.tsx
│   ├── Residuo.tsx
│   ├── Lixeiras.tsx
│   ├── Lixeira.tsx
│   ├── Feedback.tsx
│   ├── BotaoModo.tsx
│   ├── CaixaDaltonico.tsx
│   ├── HistoricoPartidas.tsx
│   ├── PainelResultado.tsx
│   └── DicaRevisao.tsx
│
├── hooks/
│   ├── useJogo.ts
│   ├── useCronometro.ts
│   ├── useArraste.ts
│   ├── useArmazenamento.ts
│   └── useDaltonismo.ts
│
├── lib/
│   ├── tipos.ts
│   ├── constantes.ts
│   └── historico.ts
│
├── data/
│   └── residuos.json
│
├── public/assets/
│   ├── cenario.png
│   ├── lixeiras/
│   ├── residuos/
│   └── svg/
│
└── styles/
    └── globals.css
```

---

## 8. Rotas

| Rota | Arquivo | Camada | Responsabilidade |
|---|---|---|---|
| — | `app/layout.tsx` | Servidor | Estrutura do documento, idioma, metadados e importação dos estilos |
| `/` | `app/page.tsx` | Servidor | Menu com apresentação, acesso aos modos, histórico e acessibilidade |
| `/classico` | `app/classico/page.tsx` | Servidor | Carrega o catálogo e monta a partida no modo clássico |
| `/tempo` | `app/tempo/page.tsx` | Servidor | Carrega o catálogo e monta a partida no modo por tempo |
| `/resultado` | `app/resultado/page.tsx` | Cliente | Recupera o resultado da partida e apresenta o desfecho |
| `/api/residuos` | `app/api/residuos/route.ts` | Servidor | Entrega o catálogo em JSON, com filtro opcional por categoria |
| qualquer outra | `app/not-found.tsx` | Servidor | Página de endereço inexistente, com retorno ao menu |

As rotas de jogo são renderizadas no servidor e entregam o catálogo como
propriedade ao componente de partida, que opera no cliente. A rota de resultado
é de cliente por depender do armazenamento de sessão.

---

## 9. Componentes

| Componente | Camada | Responsabilidade | Entradas | Estado próprio |
|---|---|---|---|---|
| `Jogo` | Cliente | Conecta o estado da partida aos componentes visuais e coordena o fluxo de rodadas | modo de jogo, catálogo | nenhum |
| `Hud` | Cliente | Painel superior com pontuação e o marcador correspondente ao modo | modo, pontuação, vidas, tempo formatado | nenhum |
| `Residuo` | Cliente | Exibe o resíduo da rodada e responde ao arrasto por ponteiro | resíduo, permissão de jogada, ação de solte | deslocamento durante o arrasto |
| `Lixeiras` | Cliente | Dispõe as cinco lixeiras e encaminha a escolha do jogador | lixeira sob o ponteiro, ação de escolha | nenhum |
| `Lixeira` | Cliente | Lixeira individual com cor, símbolo e rótulo | categoria, rótulo, destaque, ação de escolha | nenhum |
| `Feedback` | Cliente | Faixa de retorno para acerto, erro e carregamento, anunciada a leitores de tela | mensagem, natureza da mensagem | nenhum |
| `BotaoModo` | Servidor | Cartão de acesso a um modo, com descrição e faixa de cor | destino, título, descrição, cor | nenhum |
| `CaixaDaltonico` | Cliente | Alterna a exibição dos rótulos e persiste a escolha | nenhuma | preferência ativa |
| `HistoricoPartidas` | Cliente | Lista as duas últimas partidas, ocultando-se quando não há registro | nenhuma | registros recuperados |
| `PainelResultado` | Cliente | Blocos de estatística correspondentes ao modo jogado | resultado da partida | nenhum |
| `DicaRevisao` | Cliente | Frase de revisão com exemplos da categoria de maior erro | categoria, catálogo | nenhum |

---

## 10. Hooks

| Hook | Responsabilidade | Entrega |
|---|---|---|
| `useJogo` | Estado e regras da partida: sorteio, validação, pontuação, vidas, sequência e encerramento | estado da partida e a ação de responder |
| `useCronometro` | Contagem regressiva, formatação e sinalização de término | segundos restantes e tempo formatado |
| `useArraste` | Arrasto por eventos de ponteiro, identificação do alvo e destaque da lixeira | deslocamento, alvo atual e manipuladores de evento |
| `useArmazenamento` | Leitura e escrita no armazenamento do navegador, com proteção contra execução no servidor e contra bloqueio | valor atual e ação de gravação |
| `useDaltonismo` | Recupera e aplica a preferência de exibição de rótulos | estado da preferência e ação de alternância |

---

## 11. Módulos de domínio

| Módulo | Conteúdo |
|---|---|
| `lib/tipos.ts` | Definições de Resíduo, Categoria, Modo de Jogo e Resultado de Partida |
| `lib/constantes.ts` | Rótulos das categorias, chaves de armazenamento, durações de pausa e valores de pontuação |
| `lib/historico.ts` | Formatação do registro de partida e rotação da fila de duas posições |

Concentrar durações, chaves e valores de pontuação em um módulo único evita a
dispersão desses números pelo código, situação em que alterar um e esquecer
outro é o modo de falha mais comum.

---

## 12. Modelo de dados

O catálogo reside em `data/residuos.json`. Cada resíduo é descrito por quatro
atributos.

| Atributo | Tipo | Descrição |
|---|---|---|
| `arquivo` | texto | Nome do arquivo de imagem em `public/assets/residuos/` |
| `nome` | texto | Designação do objeto, exibida ao jogador e usada como texto alternativo |
| `categoria` | texto | Uma das cinco categorias; corresponde ao identificador da lixeira |
| `explicacao` | texto | Justificativa da destinação correta, exibida em caso de erro |

O array fica encapsulado em um objeto raiz, o que permite acrescentar
metadados — versão, data de atualização, lista de categorias — sem romper
contrato com consumidores existentes.

### Regra de conteúdo

O atributo `nome` designa o **objeto**, nunca a categoria. "Garrafa de
refrigerante", e não "garrafa de plástico".

A regra não é estilística. O mesmo valor serve de texto alternativo da imagem:
se contivesse a categoria, o leitor de tela anunciaria a resposta e a
aplicação deixaria de ser um jogo para quem depende dele. A restrição atende
diretamente o RNF04.

---

## 13. Estado e persistência

### 13.1 Estado em memória

| Dado | Responsável | Duração |
|---|---|---|
| Pontuação, vidas, acertos, erros, sequência | `useJogo` | a partida |
| Resíduo atual e anterior | `useJogo` | a partida |
| Permissão de jogada | `useJogo` | a partida |
| Segundos restantes | `useCronometro` | a partida |
| Deslocamento do arrasto | `useArraste` | o arrasto |

### 13.2 Armazenamento de sessão

Encerrado ao fechar a aba. Transporta o resultado da partida até a rota de
resultado.

| Conteúdo |
|---|
| Modo jogado |
| Pontuação final |
| Vidas restantes |
| Total de acertos e de erros |
| Maior sequência de acertos |
| Recorde do modo e indicação de superação |
| Categoria com maior número de erros |

### 13.3 Armazenamento persistente

Mantido entre sessões.

| Conteúdo |
|---|
| Preferência de exibição de rótulos |
| Recorde do modo clássico |
| Recorde do modo por tempo |
| Registro da última partida |
| Registro da penúltima partida |

### 13.4 Tolerância a falha

Navegadores bloqueiam o armazenamento em contextos de origem local e em
sessões anônimas. Todo acesso é intermediado pelo `useArmazenamento`, que trata
a indisponibilidade e devolve valores padrão. Uma gravação malsucedida não
interrompe a partida em andamento, conforme o RNF09.

---

## 14. Interface de dados

### 14.1 Endpoint

| Método | Caminho | Parâmetro | Resposta |
|---|---|---|---|
| GET | `/api/residuos` | — | catálogo completo |
| GET | `/api/residuos` | `categoria` | resíduos da categoria indicada |
| GET | `/api/residuos` | categoria inexistente | erro com código 404 |

### 14.2 Consumo interno

As rotas de jogo obtêm o catálogo diretamente na renderização de servidor, sem
requisição de rede. Essa escolha elimina estado de carregamento e tratamento
de erro nas telas de partida, e entrega os dados junto com o documento.

O endpoint atende o RF18 e existe para consumo externo, filtragem no servidor e
eventual substituição da fonte de dados sem alteração nos consumidores.

---

## 15. Acessibilidade

A paleta da CONAMA cria uma dificuldade concreta: para deuteranopia e
protanopia, os dois tipos mais frequentes de daltonismo, verde, vermelho,
marrom e amarelo são percebidos de forma semelhante. Quatro das cinco lixeiras
seriam indistinguíveis.

A aplicação responde com três sinais independentes de identificação.

| Sinal | Disponibilidade | Função |
|---|---|---|
| Cor da categoria | permanente | conteúdo didático da aplicação |
| Símbolo gráfico | permanente | diferenciação por forma |
| Rótulo textual | opcional | reforço explícito |

As cores permanecem inalteradas em qualquer configuração. Substituí-las por
uma paleta de maior contraste tornaria o aprendizado inútil fora da aplicação.
O rótulo acrescenta um sinal; não substitui nenhum.

A configuração inicial já é operável sem percepção de cor, atendendo o critério
**1.4.1 (Use of Color)** da WCAG 2.1. O rótulo é conveniência adicional, não
condição de uso.

Demais medidas:

| Medida | Requisito atendido |
|---|---|
| Lixeiras implementadas como botões, alcançáveis por tabulação | RNF02 |
| Indicador de foco visível, exibido apenas na navegação por teclado | RNF02 |
| Região de anúncio para leitores de tela na faixa de retorno | RNF03 |
| Texto alternativo que designa o objeto sem revelar a categoria | RNF04 |
| Supressão de transições conforme preferência do sistema operacional | RNF07 |

---

## 16. Responsividade

A estratégia privilegia dimensionamento contínuo sobre pontos de ruptura.
Tamanhos de imagem e de tipografia variam de forma proporcional entre um
mínimo e um máximo, o que elimina o salto visual característico de layouts
construídos apenas com consultas de mídia.

As consultas de mídia tratam o que o dimensionamento contínuo não resolve:
espaçamento, empilhamento e reorganização.

| Faixa | Ajustes |
|---|---|
| Tablet | redução de espaçamento |
| Celular | redução tipográfica, liberação do fundo fixo |
| Celular estreito | reorganização do painel, quebra das lixeiras em duas linhas |
| Orientação paisagem | compactação vertical |

A faixa de paisagem é condicionada à **altura** disponível, não à largura. Em
orientação horizontal o constrangimento é vertical: sem a compactação, as
lixeiras ficam fora da área visível e a aplicação se torna inoperável,
violando o RNF05.

### Entrada por ponteiro

A entrada por arrasto utiliza eventos de ponteiro, que unificam mouse, toque e
caneta em um único conjunto de manipuladores, atendendo o RNF06.

Duas condições são obrigatórias para operação em telas de toque:

**Supressão da ação padrão de toque sobre o resíduo.** Sem ela, o navegador
interpreta o arrasto como solicitação de rolagem.

**Deslocamento por transformação visual.** O elemento arrastado permanece no
fluxo do documento. Removê-lo do fluxo provoca reposicionamento das lixeiras
durante o arrasto, e o alvo deixa de corresponder à posição percebida pelo
jogador.

---

## 17. Riscos técnicos

| Risco | Impacto | Mitigação |
|---|---|---|
| Acesso ao armazenamento durante a renderização de servidor | Interrupção da construção do projeto | Acesso restrito ao `useArmazenamento`, posterior à montagem |
| Divergência entre renderização de servidor e de cliente | Advertências e alteração visual após a carga | Sorteio e leitura de data posteriores à montagem |
| Temporizador sem rotina de encerramento | Contagens simultâneas e consumo acelerado do tempo | Encerramento vinculado ao ciclo de vida do efeito |
| Captura de valor desatualizado na contagem regressiva | Cronômetro estacionado | Atualização por função sobre o valor anterior |
| Atualização excessiva durante o arrasto | Travamento perceptível em dispositivos móveis | Dados do arrasto mantidos em referência, fora do estado |
| Ausência da supressão de ação de toque | Arrasto inoperante em telas de toque | Item obrigatório de verificação na fase correspondente |
| Caminhos de recurso incorretos | Imagens ausentes em todas as telas | Verificação integral na primeira fase |

---

## 18. Fases de implementação

Cada fase resulta em um produto operacional. Nenhuma depende da seguinte para
ter valor demonstrável.

| Fase | Escopo | Resultado |
|---|---|---|
| 1 | Estrutura do projeto, recursos estáticos, estilos globais e as cinco rotas com marcação | Telas navegáveis, sem interação |
| 2 | Catálogo, tipos, constantes e endpoint | Dados disponíveis às rotas |
| 3 | Modo clássico por clique: estado da partida, painel, lixeiras e retorno | Jogo completo, operável em todos os dispositivos |
| 4 | Modo por tempo e cronômetro | Ambos os modos operacionais |
| 5 | Resultado, histórico e dica de revisão | Ciclo completo de partida |
| 6 | Arrasto por ponteiro | Conjunto completo de formas de entrada |

A entrada por arrasto é deliberadamente a última fase. É o componente de maior
complexidade e menor criticidade: a partir da Fase 3 a entrada por clique já
atende todos os dispositivos, incluindo telas de toque.

---

## 19. Critérios de aceite

### 19.1 Funcionais

| Critério | Requisitos |
|---|---|
| O menu dá acesso aos dois modos de jogo | RF01 |
| Ambos os modos iniciam, pontuam e encerram pela condição prevista | RF09, RF11 |
| O sorteio nunca repete o resíduo da rodada imediatamente anterior | RF02 |
| A destinação é validada contra a categoria correta do resíduo | RF04 |
| No modo clássico, cada erro debita exatamente uma vida | RF08 |
| No modo por tempo, a contagem parte de sessenta segundos e é regressiva | RF10 |
| O bônus de sequência é aplicado a partir do terceiro acerto consecutivo | RF05 |
| A explicação exibida corresponde ao resíduo respondido | RF06 |
| Novas jogadas são bloqueadas durante a exibição do retorno | RF07 |
| Recorde, histórico e preferência persistem entre sessões | RF14, RF15, RF17 |
| O histórico mantém exatamente dois registros | RF15 |
| O resultado apresenta pontuação, estatísticas e recorde do modo | RF12 |
| O resultado indica a categoria com maior número de erros da partida | RF13 |
| A ativação do modo de acessibilidade exibe o rótulo em cada lixeira | RF16 |
| O acesso à rota de resultado sem partida registrada redireciona ao menu | — |
| O endpoint responde ao catálogo completo e ao filtro por categoria | RF18 |

### 19.2 Interação

| Critério | Requisitos |
|---|---|
| A destinação é possível por clique e por arrasto | RF03 |
| Clique operante em apontadores e em telas de toque | RNF06 |
| Arrasto operante em apontadores e em telas de toque | RNF06 |
| Ausência de travamento perceptível durante o arrasto em dispositivo móvel | RNF08 |
| Lixeira sob o ponteiro destacada durante o arrasto | — |
| Ausência de rolagem involuntária durante o arrasto em telas de toque | RNF06 |
| Operação integral por teclado, com foco visível | RNF02 |

### 19.3 Compatibilidade

| Critério | Requisitos |
|---|---|
| Ausência de rolagem horizontal em 320, 390, 740, 768 e 1440 pixels | RNF05 |
| Cinco lixeiras visíveis nessas resoluções, em retrato e em paisagem | RNF05 |
| Ausência de erros e de advertências de hidratação em todas as rotas | — |
| Operação após desconexão da rede, concluída a carga inicial | RNF10 |
| Falha de gravação no armazenamento não interrompe a partida | RNF09 |
| Acréscimo de resíduo ao catálogo não exige alteração de código | RNF11 |

### 19.4 Acessibilidade

| Critério | Requisitos |
|---|---|
| Categorias distinguíveis sem percepção de cor, na configuração inicial | RNF01 |
| Texto alternativo sem menção à categoria do resíduo | RNF04 |
| Mudanças de retorno anunciadas a leitores de tela | RNF03 |
| Transições suprimidas sob preferência de movimento reduzido | RNF07 |

---

## 20. Glossário

| Termo | Significado |
|---|---|
| **Catálogo** | Conjunto de resíduos disponíveis para sorteio |
| **Categoria** | Uma das cinco destinações da Resolução CONAMA 275/2001 |
| **Rodada** | Ciclo de sorteio, decisão e retorno |
| **Partida** | Sequência de rodadas até a condição de término |
| **Sequência** | Número de acertos consecutivos sem erro intermediário |
| **Retorno** | Mensagem de acerto ou erro exibida após a decisão |
| **Componente de cliente** | Componente que executa no navegador, por depender de interação, temporizador ou armazenamento |
| **Hidratação** | Momento em que o React assume o controle da marcação entregue pelo servidor |
