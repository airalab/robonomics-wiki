---
title: Conecte com segurança a IA na nuvem ao chão de fábrica
contributors: [vitl2907]
---

As tecnologias da Robonomics já podem resolver os desafios que a Indústria 4.0 enfrenta e já estão sendo aplicadas em cenários do mundo real no ambiente industrial.

Um grande número de empresas de IA está construindo soluções para otimizar os processos no chão de fábrica, permitindo que as plantas produzam mais com menos custo. No entanto, a maioria das plantas reluta em conectar sua infraestrutura diretamente à nuvem, pois isso resulta em riscos potenciais de cibersegurança, o que poderia levar a perdas de milhões de dólares e até mesmo à perda de vidas humanas.

O [MerkleBot](https://merklebot.com) utilizou a [Rede Robonomics](https://robonomics.network) para construir uma solução para clientes industriais conectarem sua fábrica à IA baseada na nuvem de forma segura.

Este artigo foi escrito após um experimento que conduzimos com o [Protocolo Veracity](https://www.veracityprotocol.org/), que utiliza algoritmos para criar proteção não invasiva de qualquer item físico com base nas fotografias de um dispositivo móvel.

Este caso de uso mostra o processo de digitalização das peças industriais usando um braço robótico.

[Vídeo de demonstração](https://youtu.be/8AL70LFVX5w)

## Processo passo a passo

### DApp como interface do usuário

{% roboWikiPicture {src:"docs/google-play-store.gif", alt:"/google-play-store"} %}{% endroboWikiPicture %}

O DApp atua como uma interface do usuário para o operador. É usado para solicitar o lançamento do robô para coletar as fotografias e seu objetivo é permitir a comunicação segura entre o ambiente da fábrica e a IA baseada na nuvem.

### Lançamento do robô

{% roboWikiPicture {src:"docs/Veracity_Protocol_Transaction.gif", alt:"/Veracity_Protocol_Transaction"} %}{% endroboWikiPicture %}

O operador inicia a digitalização robótica assinando a transação no DApp. Este passo garante que o processo no chão de fábrica só possa começar com base na transação na blockchain pública.

O robô recebe um comando da blockchain através da Rede Robonomics e inicia a digitalização. As tecnologias da Rede Robonomics nos permitem fechar a lacuna entre o objetivo comercial e a operação robótica.

### Coleta de dados e envio para a IA baseada na nuvem

No DApp, o operador vê a confirmação e o robô começa a digitalizar os itens colocados na mesa, como neste caso de uso, ou na linha de produção diretamente, se necessário.

{% roboWikiPicture {src:"docs/Veracity_Protocol_Launch.gif", alt:"/Veracity_Protocol_Launch"} %}{% endroboWikiPicture %}

Quando o robô coleta os dados, ele os armazena localmente e os disponibiliza para a IA baseada na nuvem por meio do protocolo IPFS. Ao criptografar os dados e organizar a troca de dados por meio de uma transação blockchain, podemos autorizar o acesso à IA baseada na nuvem, garantindo que os dados permaneçam seguros e no local.

O mecanismo de segurança incorporado na Robonomics, com base na segurança compartilhada das blockchains públicas, permite obter o nível de segurança que é proibitivamente caro para a maioria das fábricas organizarem por conta própria.

### Criação de passaporte digital

Quando a IA baseada na nuvem analisa os dados, o arquivo de log e as recomendações são registrados automaticamente como um [Passaporte Digital](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/). Cada operação e digitalização podem ser rastreadas, pois o registro blockchain possui o hash de todos esses arquivos por meio do protocolo IPFS.

## Comentários sobre o caso de uso

Neste caso de uso, foi utilizado o braço industrial Universal Robot UR3. Mas graças ao suporte da Robonomics para ROS, a maioria dos principais manipuladores industriais pode ser usada e conectada à IA baseada na nuvem de forma segura, incluindo KUKA, Fanuc e Yaskawa.

Se você estiver interessado em saber mais sobre a implantação e integração de instrumentos de IA baseados na nuvem de forma segura, por favor [entre em contato](mailto:v@merklebot.com)