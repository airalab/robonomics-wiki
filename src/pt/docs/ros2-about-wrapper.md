---
title: Sobre o Robonomics ROS 2 Wrapper
contributors: [Fingerling42]
ferramentas:   
  - Ubuntu 22.04.4
    https://releases.ubuntu.com/jammy/
  - ROS 2 Humble
    https://docs.ros.org/en/humble/Installation.html
  - IPFS Kubo 0.26.0
    https://docs.ipfs.tech/install/command-line/
  - Python 3.10.12
    https://www.python.org/downloads/
---

**Neste artigo, você aprenderá sobre o pacote Robonomics ROS 2 Wrapper, que permite que você utilize todos os recursos da parachain Robonomics para qualquer robô compatível com o ROS 2.**

A ideia do pacote é envolver a API da parachain Robonomics fornecida pelo [robonomics-interface](https://github.com/airalab/robonomics-interface) em nós do ROS 2. O objetivo é fornecer aos desenvolvedores do ROS 2 uma maneira conveniente de integrar seus robôs ou dispositivos com os recursos da parachain. A lógica por trás da integração de um dispositivo robótico é que um endereço único é criado para ele na parachain Robonomics, que é usado para controlar o dispositivo ou receber sua telemetria.

Os recursos disponíveis incluem:

* **Função de lançamento** — lançar um dispositivo para executar qualquer comando com um conjunto especificado de parâmetros passados como uma string ou um arquivo.
* **Função de registro de dados** — publicar dados do dispositivotelemetria em forma de hash para parachain.
* **Uso da assinatura Robonomics** — a capacidade de enviar transações sem taxa.
* **Armazenamento seguro de arquivos** — para compactar e descompactar dados, é utilizado o [Sistema de Arquivos Interplanetários](https://ipfs.tech/), que permite acessar arquivos por meio de seu hash único. Para uso conveniente do IPFS, o suporte do [Pinata](https://www.pinata.cloud/) está incluído, o que permite fixar arquivos IPFS para download rápido.
* **Criptografia e descriptografia de arquivos** — proteção de arquivos com criptografia de chave pública.

Atualmente, o wrapper está disponível na [implementação Python](https://github.com/airalab/robonomics-ros2/).

## Arquitetura do Wrapper

Arquitetonicamente, o wrapper consiste em um nó trabalhador (com os tópicos e serviços necessários) e uma classe de nó básica que pode ser usada para seus robôs específicos.

{% roboWikiPicture {src:"docs/robotics/robonomics-ros2-wrapper.png", alt:"Arquitetura do Wrapper ROS 2"} %}{% endroboWikiPicture %}

* `robonomics_ros2_pubsub` — um nó único para cada robô que serve como ponto de entrada para o Web3. Ele envolve os serviços para enviar registros de dados e receber lançamentos via Robonomics e permite que arquivos sejam baixados/enviados para o IPFS. Este nó é configurado por um arquivo especial, que é descrito abaixo. A afiliação de um nó a um robô específico pode serespecificado via o namespace do ROS.
* `robonomics_ros2_robot_handler` — um nó específico do robô baseado em uma classe básica `basic_robonomics_handler` para coordenar pubsub e o robô. Ele processa lançamentos e decide quando enviar datalogs para controlar o robô.

## Instalando o Wrapper

Para trabalhar com o wrapper, você precisa do seguinte software:

* Distribuição do sistema operacional Linux (geralmente, Ubuntu)
* Distribuição do ROS 2
* Nó IPFS
* Python 3 (para a implementação em Python do wrapper)

Por favor, siga o guia de instalação disponível [aqui](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#getting-started) e verifique as versões necessárias do software. Após baixar os componentes necessários, você precisará [compilar](https://github.com/airalab/robonomics-ros2/?tab=readme-ov-file#installation-and-building) o wrapper como um pacote ROS 2 usual usando a utilidade `colcon`.

## Configurando Conexões com a Nuvem Web3

Antes de iniciar o wrapper, você precisa configurar como exatamente seu robô se conectará à nuvem descentralizada Robonomics e aos serviços de suporte Web3. Para fazer isso, você precisa editar o arquivo de configuração chamado `robonomics_pubsub_params_template.yaml`, que deve ser único para cada robô lançado que precisa acessar o Robonomics.

O arquivo contém os seguintes campos de configuração:

| Campo                 | Descrição                                                                                                |
|-----------------------|------------------------------------------------------------------------------------------------------------|
| account_seed          | Semente de conta da parachain Robonomics                                                                   |
| crypto_type           | Tipo da sua conta, `ED25519` ou `SR25519`                                                                  |
| remote_node_url       | URL do nó Robonomics, o padrão é `wss://kusama.rpc.robonomics.network`, para nó local `ws://127.0.0.1:9944`|
| rws_owner_address     | Um endereço do proprietário da assinatura Robonomics para usar o módulo RWS                                |
| ipfs_dir_path         | Um caminho do diretório para conter arquivos IPFS                                                          |
| ipfs_gateway          | Gateway IPFS para baixar arquivos, por exemplo, `https://ipfs.io`                                         |
| pinata_api_key        | Chave API do serviço de fixação [Pinata](https://www.pinata.cloud/) para IPFS                               |
| pinata_api_secret_key | Chave secreta da API do serviço de fixação [Pinata](https://www.pinata.cloud/) para IPFS                   |

Para criar uma conta na parachain Robonomics, por favor, utilize [o seguinte guia](https://wiki.robonomics.network/docs/create-account-in-dapp/) em nosso wiki. Por favor, preste atenção ao tipo de conta que você cria, pois contas com tipo SR25519 não podem usar criptografia de arquivos.

{% roboWikiNote {type: "warning", title: "Aviso"}%}

  A frase-semente é uma informação sensível que permite a qualquer pessoaUse sua conta. Certifique-se de não fazer upload de um arquivo de configuração com ela no GitHub ou em qualquer outro lugar.
{% endroboWikiNote %}

Preste atenção ao campo `remote_node_url`, pois ele permite que você escolha como se conectar à parachain Robonomics, incluindo localmente. Você pode implantar sua instância local do Robonomics para testes e desenvolvimento. As instruções de como fazer isso estão disponíveis neste [artigo](https://wiki.robonomics.network/docs/run-dev-node/) em nosso wiki.

Se você tiver uma assinatura Robonomics que permite enviar transações sem taxas, insira o endereço do proprietário da assinatura no campo `rws_owner_address`. Não se esqueça de que sua conta deve ser adicionada à sua assinatura. As instruções de como ativar sua assinatura Robonomics estão disponíveis em dois guias: via [Robonomics dapp](https://wiki.robonomics.network/docs/sub-activate/) com interface amigável ou via [portal Robonomics Substrate](https://wiki.robonomics.network/docs/get-subscription/).

O parâmetro `ipfs_gateway` permite que você especifique o gateway por meio do qual os arquivos IPFS serão baixados. Estes podem ser [gateways públicos](https://ipfs.github.io/public-gateway-checker/) ou privados especializados (por exemplo, aqueles obtidos no Pinata).