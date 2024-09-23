---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Introdução

A Robonomics mudou o modelo de governança da parachain para o sofisticado mecanismo OpenGov da Polkadot, que permite que a cadeia evolua ao longo do tempo, sob a decisão final dos detentores de tokens.
A transição da Robonomics para o OpenGov garante que o DAO detentor de tokens, que controla a maioria das ações, possa sempre comandar a direção da parachain da Robonomics, promovendo qualquer alteração na rede que considerem adequada.

{% roboWikiNote {title:"Nota:", type: "aviso"}%} O OpenGov é aplicável apenas à Parachain da Robonomics, que é uma cadeia baseada em Substrate conectada à Kusama Relay Chain. O OpenGov não é aplicável à implementação Ethereum da Robonomics, pois a mainnet do Ethereum atualmente não suporta sistemas de governança sofisticados como o OpenGov {% endroboWikiNote %}

O OpenGov altera a forma como as operações diárias e as tomadas de decisão são realizadas na parachain. Ele fornece maior clareza quanto ao escopo dos referendos e tem o potencial de aumentar drasticamente a quantidade de decisões tomadas na parachain.

O OpenGov está ativo na cadeia de retransmissão Kusama há alguns meses no momento da escrita, e provou que aumenta drasticamente o número de decisões (referendos individuais e discretos) que o DAO detentor de tokens pode propor, votar e, por meio de votação - controlar, em última instância, a direção do protocolo.

**O conteúdo a seguir contido nesta seção do wiki abordará os princípios fundamentais do OpenGov na parachain da Robonomics e tem como objetivo ajudá-lo a entender melhor os conceitos por trás do OpenGov.**

*É importante observar que a governança é um mecanismo em constante evolução no protocolo, especialmente nas fases iniciais de implementação.*

Para aqueles interessados apenas nos parâmetros da Trilha Robonomics OpenGov, consulte [aqui](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Sobre Referendos

Os referendos são esquemas de votação simples, inclusivos e baseados em participação. Cada referendo tem uma proposta específica associada a ele que assume a forma de uma chamada de função privilegiada no tempo de execução das cadeias. Isso também pode incluir a chamada mais poderosa `set_code`, que tem a capacidade de substituir todo o código deo tempo de execução das cadeias - isso é único para as cadeias baseadas em Substrate e remove a necessidade de um "hard fork" da cadeia ao atualizar a lógica de negócios das cadeias (tempo de execução).

Os referendos são eventos discretos que têm um período de votação fixo (mais sobre os diferentes períodos durante o ciclo de vida de um referendo posteriormente). Os detentores individuais de tokens podem votar de três maneiras em referendos - SIM (concordar/sim), NÃO (discordar/não) ou ABSTER-SE de votar completamente.

Todos os referendos têm um atraso de promulgação associado a eles. Este é o período entre o término do referendo e, assumindo que o referendo foi aprovado, as mudanças sendo promulgadas na rede.

{% roboWikiNote {title:"Nota:", type: "aviso"}%} Existe um Período Mínimo de Promulgação especificamente definido para cada tipo diferente de Origem, mas o originador de um referendo específico pode definir as tarefas específicas desse referendo para serem executadas muitos blocos no futuro {% endroboWikiNote %}

Os referendos são considerados "assados" se estiverem encerrados e os votos forem contados. Supondo que o referendo tenha sido aprovado, ele será agendado para promulgação (no agendador das cadeias). Os referendos são considerados "não assados" se o resultado estiver pendente - como se o referendo ainda estivesse sendo votado.

Com a adição do OpenGov, qualquer pessoa pode iniciar um referendo a qualquer momento e pode fazê-lo quantas vezes desejar. O OpenGov remove a limitação de apenas 1 referendo poder ser processado de cada vez (observe que, no Gov v1, apenas 1 referendo pode ser votado de cada vez. A única exceção sendo um referendo de emergência adicional pelo Comitê Técnico acelerado que também pode ser votado simultaneamente pela comunidade).

O OpenGov introduz várias novas características/conceitos conhecidos como Origens e Trilhas, e estes são introduzidos para ajudar no fluxo e processamento de referendos no protocolo.

Cada Origem está associada a uma única classe de referendo, e cada classe está associada a uma trilha. A trilha delineia o ciclo de vida do referendo e é específica para aquela Origem particular de onde o referendo se origina. Ter trilhas com seus próprios parâmetros específicos permite que a rede modifique dinamicamente o ciclo de vida dos referendos com base em seu nível de privilégio (você pode pensar no nível de privilégio como sendo o quão poderoso um referendo pode ser/quais tipos de mudanças ele pode fazer no protocolo).

*Pense nas Origens como o poder associado a um referendo, e pense nas Trilhas comoOs parâmetros de votação associados a um referendo, como os períodos de duração e os critérios de Aprovação e Suporte.*

Por exemplo, uma atualização em tempo de execução não tem as mesmas implicações para o protocolo como uma pequena dica de tesouro, e, portanto, são necessárias origens diferentes em que diferentes participações, aprovações, depósitos e períodos de promulgação (Tracks) serão predeterminados no pallet das cadeias.

## Propondo um Referendo e Ciclo de Vida do Referendo

### Período de Preparação

No OpenGov, quando um referendo é criado inicialmente, ele pode ser imediatamente votado pela comunidade de detentores de tokens. No entanto, ele não está imediatamente em um estado em que pode ser encerrado, ou ter seus votos contados, ser aprovado e promulgado sumariamente. Em vez disso, os referendos devem cumprir uma série de critérios antes de serem movidos para o Período de Decisão. Até que os referendos entrem no Período de Decisão, eles permanecerão indefinidos - e eventualmente expirarão após o período de ciclo de vida geral conforme especificado na trilha individual.

{% roboWikiPicture {src:"docs/robonomics-opengov/1.jpeg", alt:"imagem"} %}{% endroboWikiPicture %}

Os critérios para um referendo entrar no Período de Decisão são os seguintes:
1. Um Período de Preparação que estabelece a quantidade de tempo que deve decorrer antes que o Período de Decisão possa começar. Este Período de Preparação ajuda a mitigar a possibilidade de "sniping de decisão", em que um atacante que controla uma quantidade substancial de poder de voto pode tentar usar sua grande participação para fazer com que um referendo seja aprovado imediatamente após a proposta, contornando a possibilidade de os outros membros do DAO de detentores de tokens terem tempo adequado para considerar o referendo e participar na votação. Por isso, Origens com níveis de privilégio mais altos têm Períodos de Preparação significativamente mais longos.

2. Deve haver espaço para a decisão. Cada trilha tem seus próprios limites para a quantidade de referendos que podem ser decididos simultaneamente (max_deciding). Trilhas que têm níveis de privilégio mais poderosos terão limites mais baixos. Por exemplo, a origem de nível Root terá uma quantidade significativamente menor de referendos que podem ser decididos simultaneamente em comparação com origens de nível de privilégio mais baixo, como a origem Small Tipper.

3. O Depósito de Decisão deve ser submetido. Inicialmente, criar um referendo é bastante barato, e o valor do Depósito de Submissão (reservado quando o referendo é criado inicialmente) é bastante baixo, e é composto principalmente pelo valor que custa para o armazenamento on-chain associado ao referendo. Os Depósitos de Decisão são significativamente mais altos, o que é necessário para combater o spam., e joga no jogo econômico que o OpenGov traz, o qual abordaremos mais adiante.

Uma vez que todos esses três critérios acima tenham sido atendidos, o referendo passará para o Período de Decisão. Os votos no referendo serão então contados para determinar o resultado.

### Período de Decisão

*Para uma demonstração rápida em vídeo do Período de Decisão, veja [este vídeo](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Uma vez que um referendo tenha atendido a todos os critérios detalhados na seção acima, ele entrará no Período de Decisão.

O Período de Decisão gira em torno de dois conceitos principais, sendo eles os critérios de Aprovação e Suporte.

A Aprovação é definida como a parcela do peso do voto de aprovação (SIMs vs NÃOs) em comparação com o peso total do voto (todos os votos SIM e NÃO combinados). A convicção de cada voto conta para o peso total dos votos SIM/NÃO (mais sobre votação por convicção / bloqueio voluntário em uma seção posterior).

O Suporte é o número total de votos (tokens) que participaram do referendo (e não é ajustado para convicção) em comparação com o total de votos possíveis que poderiam ser feitos no sistema (pense nisso como a emissão total de XRT na parachain - notavelmente, o fornecimento circulante total de XRT não é o principal fator aqui, devido ao fato de que alguma parte desse número existe no Ethereum como tokens ERC-20).

**Os votos que estão na direção de ABSTERÇÃO NÃO contribuem para o critério de Aprovação, mas são incluídos / contam para o critério de Suporte**

Um referendo deve atender aos critérios de Suporte E Aprovação durante o Período de Decisão para progredir para o Período de Confirmação.

Para detalhes dos critérios individuais de Suporte e Aprovação para cada trilha, consulte esta [planilha](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Período de Confirmação

Cada trilha tem sua própria duração específica para o Período de Confirmação. Trilhas que possuem níveis de privilégio maiores (como Root) têm Períodos de Confirmação significativamente mais longos do que aqueles com níveis de privilégio mais baixos (como Small Tipper).

Os referendos devem continuar a atender aos critérios de Aprovação e Suporte durante toda a duração do Período de Confirmação, caso contrário, voltarão novamente para o Período de Decisão (nota: o Período de Decisão não é pausado durante o Período de Confirmação, então é totalmente possível queUm Período de Decisão pode expirar durante o Período de Confirmação, o que significa que se um referendo for removido do Período de Confirmação por não atender mais aos critérios de Aprovação e Suporte, ele será considerado um referendo fracassado e não promulgado).

**É possível ajustar os critérios de Aprovação e Suporte para faixas individuais por meio de um referendo com privilégios de Origem Raiz.**

Origens com níveis de privilégio mais baixos têm critérios de aprovação e suporte significativamente mais fáceis de serem atendidos do que aqueles com níveis de privilégio mais altos. Da mesma forma, origens com níveis de privilégio mais altos têm curvas menos íngremes do que aquelas com menos privilégios (conforme definido na faixa), a fim de garantir que o DAO detentor do token realmente aprove o referendo e evite o "sniping" de referendos de origem de alto privilégio.

No OpenGov, referendos que não são aprovados após o término do Período de Decisão são considerados rejeitados por padrão, e tanto os depósitos de submissão quanto de decisão são reembolsados aos seus originadores (observação: o depósito de decisão pode ser feito por alguém que não seja o originador do referendo).

Se um referendo conseguir atender continuamente aos critérios de Aprovação e Suporte durante todo o Período de Confirmação, então ele é considerado aprovado e será agendado para ser executado a partir da origem proposta, mas o referendo só será executado após o período mínimo de promulgação ter decorrido.

### Período de Promulgação

O Período de Promulgação é especificado pelo originador quando o referendo é proposto, mas está sujeito ao Período Mínimo de Promulgação especificado em cada faixa. Origens mais poderosas têm um período mínimo de promulgação muito maior do que aquelas com menos privilégios. Isso garante que a rede tenha tempo suficiente para se preparar para quaisquer mudanças que um referendo poderoso possa impor.

## Bloqueio Voluntário / Convicção

A Robonomics utiliza um conceito conhecido como bloqueio voluntário, ou votação por convicção. Isso permite que os detentores de tokens aumentem seu poder de voto decidindo por quanto tempo estão dispostos a bloquear seus tokens para um referendo específico. Esse mecanismo afeta apenas os critérios de Aprovação para cada referendo, e a votação por convicção não afeta os critérios de Suporte.

A Votação por Convicção pode ser calculada usando esta fórmula:

$$\text{Votos de Aprovação} = \text{Tokens} * \text{Multiplicador de Convicção}$$

Esta tabela mostra como cada nível crescente de período de bloqueio multiplica seu voto para os critérios de aprovação:

| Períodos de Bloqueio | Multiplicador de Voto | Dias de Bloqueio |
|----------------------|-----------------------|------------------|
| Sem Bloqueio         | 0.1x                  | 0                |
| 1                    | 1                     | 1                |x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


O montante máximo de convicção que um detentor de token pode usar é de 6x convicção. Você só pode definir a convicção conforme a tabela acima e não pode, por exemplo, usar 5,5x de convicção.

Enquanto um token está bloqueado devido à votação, ele ainda pode ser usado para votar em outros referendos, no entanto, ele não fará parte do seu saldo transferível (você não pode enviá-lo para outra conta) - e o saldo só se tornará transferível novamente uma vez que todo o período de bloqueio tenha expirado.

## Delegação de Votos

No OpenGov, foi adicionado um mecanismo para permitir que os detentores de tokens que não têm necessariamente tempo suficiente para revisar cada referendo ainda tenham seus tokens usados como parte do sistema de governança, isso é conhecido como delegação de votos.

Os detentores de tokens podem optar por delegar seu poder de voto a outro eleitor no sistema (outra conta). Os eleitores podem especificar a delegação de seu poder de voto de forma ágil, permitindo-lhes atribuir seu poder de voto a uma conta diferente para cada Origem individual. Os eleitores também podem definir para atribuir uma quantidade diferente de poder de voto para cada Origem (número de tokens e nível de convicção).

Este recurso de delegação tem um objetivo, aumentar a participação dos eleitores e ajudar a garantir que as participações necessárias para atender aos critérios de Aprovação e Apoio sejam atendidas.

Para delegar seu poder de voto, você pode usar a função "Delegar" que você pode encontrar na seção Governança -> Referendo do [Portal Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). Alternativamente, os usuários podem enviar o extrínseco convictionVoting(Delegate) usando a seção Desenvolvedor -> Extrínsecos do Portal Robonomics, no entanto, usar a função "Delegar" da seção de referendo do portal é muito mais fácil.

## Cancelamento / Encerramento de Referendo e o Jogo Econômico de Governança

No OpenGov, existem Origens dedicadas a rejeitar referendos em andamento, independentemente de seu status. Estas são conhecidas como Cancelador de Governança e Matador de Governança.faixas.

Essas Origens intervêm em um referendo que já foi votado. Essas Origens, se o referendo originado por elas for aprovado, rejeitarão imediatamente um referendo em andamento, independentemente de seu status.

O cancelamento em si é um tipo de referendo que deve ser votado pelos detentores de tokens para ser executado. O cancelamento vem com sua própria origem e faixa que têm um tempo de liderança mais baixo (Período de Decisão, etc.) e têm curvas de Aprovação e Suporte com uma curva mais íngreme (o que significa que seus critérios são muito mais fáceis de serem atendidos ao longo do tempo) do que outras Origens. Isso ocorre devido ao fato de que o cancelamento de um referendo geralmente virá com um senso de urgência.

O Cancelador de Governança tem como objetivo rejeitar instantaneamente um referendo em andamento. Quando um referendo é cancelado por esta origem, tanto o Depósito de Submissão quanto o Depósito de Decisão são reembolsados aos seus originadores. Um exemplo de quando um referendo pode ser considerado cancelado é se o originador cometeu algum erro humano no conteúdo de seu referendo e não necessariamente tentou fazer algo malicioso.

O Assassino de Governança tem como objetivo rejeitar instantaneamente um referendo em andamento. É aqui que o jogo econômico de governança entra em jogo. Origens com altos níveis de privilégio, como Root, têm um Depósito de Decisão que requer uma grande quantidade de capital (tokens XRT) a serem postados para que o referendo entre no Período de Decisão.

Se um ator malicioso enviar um referendo, como um referendo com origens de Root que visa `set_code` do tempo de execução das cadeias para algo que interromperá a produção de blocos da cadeia, então o DAO detentor de tokens pode levantar um referendo de Contragolpe de Governança para punir essa ação. Se o referendo malicioso for rejeitado via a origem Assassino de Governança, então tanto os Depósitos de Submissão quanto de Decisão são cortados, o que significa que o originador (a(s) conta(s) que postaram esses depósitos) perderá esses fundos.

Isso significa que há uma consequência econômica severa para atores maliciosos que tentam levantar um referendo que teria impactos negativos graves para a cadeia, o que, teoricamente, impedirá qualquer ator malicioso de tentar fazer isso.

O Depósito de Decisão para a própria faixa Assassino de Governança é bastante alto, isso é para impedir que atores igualmente maliciosos tentem cortar depósitos de referendos bons. **Um referendo existente de Assassino de Governança pode ser anulado por um subsequente referendo de Assassino de Governança.**

## Comitê Técnico Robonomics & Origem na Lista Branca

Este grupo é um corpo de especialistas autogovernante que tem como objetivo principal representar humanos que incorporam e possuem o conhecimento técnico do protocolo de rede Robonomics.Apenas este grupo é capaz de originar referendos do pallet Whitelist. Este pallet faz uma coisa, ele permite que uma Origem aumente o nível de privilégio de outra Origem para uma determinada operação.

Este grupo pode autorizar referendos de uma origem conhecida como Whitelisted-Root, e estes referendos podem ser executados com privilégios de nível Root, mas esses referendos só funcionarão com comandos específicos autorizados pelo grupo. O pallet Whitelist verifica duas coisas:
1. A Origem realmente é a Whitelisted-Root (ou seja, o referendo passou por esta trilha de Origem).
2. A proposta foi realmente incluída na lista branca pelo grupo.

Se ambas as condições forem verdadeiras, então a operação será executada com privilégios de nível Root.

Este sistema possibilita a capacidade de ter uma nova Trilha paralela (Origem Whitelisted-Root), cujos parâmetros permitem um tempo de votação mais curto (os critérios de Aprovação e Suporte são um pouco mais fáceis de atender do que o Root). Este processo aberto e transparente permite que este grupo de especialistas do Protocolo de Rede Robonomics proponha referendos que eles determinaram ser seguros e urgentes.

Deve-se notar que os Critérios de Suporte para referendos iniciados com a origem Whitelisted-Root não tendem a zero como muitas outras origens/trilhas. Isso garante que este grupo não tenha controle de fato sobre todo o Protocolo de Rede Robonomics e requer um nível mínimo de Suporte (participação dos votantes) do DAO detentor de tokens em geral.


## Duração dos Referendos

É importante entender que a duração de cada referendo individual não é algo concreto, não é definitivo. Alguns períodos dentro do ciclo de vida do referendo, como o período mínimo de promulgação, de fato têm uma duração concreta, no entanto, outros, incluindo o período de decisão, não têm. Por exemplo, não é preciso somar as durações máximas para os Períodos de Preparação, Decisão, Confirmação e Mínimo de Promulgação e afirmar que "cada referendo levará X dias", é muito mais fluido do que isso.

Vamos analisar isso através da lente de alguns referendos separados, todos originados da mesma Origem, neste caso, a origem Root.

A Origem Root tem sua própria trilha, onde as durações para cada período são definidas, bem como as curvas de Aprovação e Suporte.

É importante lembrar que os Referendos só avançarão para a próxima etapa em seu ciclo de vida se certas condições forem atendidas.{% roboWikiPicture {src:"docs/robonomics-opengov/2.jpeg", alt:"imagem"} %}{% endroboWikiPicture %}

Você deve assumir nas imagens a seguir que, para um referendo ascender para a próxima etapa de seu ciclo de vida, as condições conforme descritas na imagem acima teriam que ter sido atendidas (a menos que seja declarado o contrário).


### Duração máxima possível com muito pouco comparecimento de eleitores

A imagem abaixo é uma representação do cronograma máximo possível para um referendo, pense nisso como um referendo que:
1. Teve seu Depósito de Decisão postado e, portanto, entrou no Período de Decisão.
2. Possui um único voto, por exemplo, 1 XRT, na direção AYE - isso significa que só atenderá o Suporte necessário (comparecimento de eleitores) no final do Período de Decisão (já que o Suporte geral é extremamente baixo), mas tem 100% de Aprovação, então eventualmente atenderá aos requisitos para entrar no Período de Confirmação.
3. Continua a atender aos critérios mencionados durante o Período de Confirmação.
4. A proposta levantada pelo referendo será promulgada exatamente no mesmo bloco em que o Período Mínimo de Promulgação termina - tecnicamente, o originador do referendo pode definir as mudanças na rede conforme detalhado no referendo para promulgar muitos blocos no futuro, então realisticamente o ciclo de vida real de um referendo individual pode se estender por muitos dias, semanas, meses ou anos.

{% roboWikiPicture {src:"docs/robonomics-opengov/3.jpeg", alt:"imagem"} %}{% endroboWikiPicture %}

Podemos ver que, neste exemplo, o ciclo de vida do referendo seria (aproximadamente) de 17 dias.


### Duração com muito comparecimento de eleitores (com um grande número de votos AYE)

Agora vamos dar uma olhada em um referendo em que o DAO detentor de tokens XRT demonstrou muito interesse. Neste exemplo, vamos assumir que ~248.771 XRT no total de comparecimento de eleitores ocorreu, e todos os eleitores estão votando na direção AYE (observação: tecnicamente, nesta fase de um referendo Raiz, conforme a trilha, apenas 60% dos votos devem estar na direção AYE para que um referendo atenda aos critérios de Aprovação).

{% roboWikiNote {title:"Nota:", type: "aviso"}%}  Sempre consulte as informações mais atualizadas da trilha para obter informações precisas sobre cada Trilha, mais informações podem ser encontradas neste [planilha]](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).
{% endroboWikiNote %}

Neste exemplo:
1. O Depósito de Decisão foi publicado durante o Período de Preparação e, portanto, foi capaz de fazer a transição para o Período de Decisão no final do Período de Preparação.
2. Muitos eleitores votaram neste referendo - obtendo uma participação de eleitores de ~248.771 XRT em um período relativamente curto.
3. Os votos foram majoritariamente na direção do SIM (qualquer coisa acima de 60% SIM).
4. O referendo continuamente atende aos critérios do Período de Confirmação durante todo o seu Período de Confirmação (Nota: Se um referendo deixar de atender aos critérios do Período de Confirmação, ele é devolvido ao seu Período de Decisão).
5. A proposta levantada pelo referendo será promulgada exatamente no mesmo bloco em que o Período Mínimo de Promulgação termina.

Devido ao fato de haver uma participação de ~248.771 XRT, o referendo atenderá aos critérios para entrar em seu Período de Confirmação após ~168 horas (7 dias).

{% roboWikiPicture {src:"docs/robonomics-opengov/4.jpeg", alt:"imagem"} %}{% endroboWikiPicture %}

Podemos ver que neste segundo exemplo, devido ao fato de haver uma boa participação de eleitores, o Período de Decisão na verdade terminou na metade do tempo máximo alocado. Resultando em um referendo que pode ser promulgado em ~10 dias.


### Duração quando o Depósito de Decisão nunca é publicado

Agora, vamos dar uma olhada em um referendo que foi originado, mas nunca teve seu Depósito de Decisão publicado. Tais referendos estão em um estado de "limbo", onde seu Período de Preparação terminou, mas como o Depósito de Decisão não foi publicado, o referendo permanece no "Estado de Preparação".

{% roboWikiPicture {src:"docs/robonomics-opengov/5.jpeg", alt:"imagem"} %}{% endroboWikiPicture %}

Podemos ver que neste terceiro exemplo, devido ao fato de o Depósito de Decisão nunca ter sido publicado, o referendo na verdade nunca entrará no Período de Decisão, em vez disso, permanece no "Estado de Preparação". Isso significa que eventualmente, se nenhum Depósito de Decisão for publicado, o referendo expirará após a duração especificada na constante timeOut.decorrido do palete.

Isso já aconteceu no Kusama anteriormente, em que um referendo foi postado com origens Root, mas devido aos altos requisitos de capital para postar o Depósito de Decisão, o referendo nunca entrou nas fases posteriores de seu ciclo de vida. Tais referendos concluem com a bandeira "expirado".

### Duração quando o Depósito de Decisão é postado tarde

Por fim, vamos dar uma olhada em um exemplo em que o Depósito de Decisão não foi postado por um bom tempo após o referendo ter sido originado. Isso já aconteceu anteriormente no Kusama, onde um referendo foi postado com a origem Root, mas o originador teve que gastar tempo para encontrar alguém com uma grande quantidade de capital para postar o Depósito de Decisão em seu nome.

{% roboWikiPicture {src:"docs/robonomics-opengov/6.jpeg", alt:"imagem"} %}{% endroboWikiPicture %}

Neste exemplo final, devido ao fato de que o Depósito de Decisão foi postado após o término do Período de Preparação, mas antes do referendo expirar - o ciclo de vida do referendo é na verdade muito mais longo do que o normal, pois ele entra no Período de Decisão após um período mais longo.

É importante notar que o DAO detentor de tokens pode votar SIM/NÃO em referendos que estão no Período de Preparação, ou presos no "Estado de Preparação".