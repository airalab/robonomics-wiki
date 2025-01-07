---
title: Instalação de Casa Inteligente
contribuidores: [nakata5321, PaTara43]
ferramentas:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Integração Robonomics Home Assistant 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Bem-vindo ao guia de instalação do Home Assistant com integração Robonomics. O Home Assistant é um sistema de automação residencial de código aberto que fornece um hub centralizado para controlar dispositivos inteligentes em sua rede doméstica. Ao integrar com Robonomics, um serviço em nuvem descentralizado, você pode aprimorar a funcionalidade e segurança da sua casa inteligente. Neste artigo, forneceremos instruções passo a passo sobre como instalar o Home Assistant com Robonomics, dando a você a capacidade de automatizar e controlar vários aspectos de sua casa usando uma solução segura e descentralizada. Vamos começar!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"instalação"} %}{% endroboWikiPicture %}

## Demonstração

Aquié um exemplo de instalação completa de integração de Casa Inteligente e Robonomics. Tenha em mente que o tempo necessário pode variar dependendo da conexão com a Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware necessário para a instalação

Se você ainda não incorporou o Home Assistant em sua configuração de casa inteligente, é importante estar ciente do equipamento necessário para estabelecer um sistema de casa inteligente completo do zero. A equipe da Robonomics recomenda o uso do Raspberry Pi 4 como servidor de casa inteligente.

{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (pelo menos 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Cartão SD16Gb</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
    {% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
     <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (Opcionalmente) </b> </a>  {% endroboWikiGrid %}
    {% roboWikiGrid %}     {% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
    <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (Opcionalmente) </b> </a>  {% endroboWikiGrid %}
    
{% endroboWikiGridWrapper %}


## 1. Instalar Pré-requisitos


{% roboWikiNote {type: "warning", title: "Informação importante" }%} Todos esses passos devem ser feitos em um Raspberry Pi 4 com sistema Ubuntu. {% endroboWikiNote %}

O Robonomics Docker contém:
- Home Assistant
- IPFS
- Broker e Integração MQTT- Zigbee2MQTT
- proxy libp2p
- Integração Robonomics

Primeiro, você precisa instalar os seguintes pacotes:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Em seguida, você precisa instalar o Docker no seu Raspberry Pi 4. Encontre as instruções de instalação no [site oficial](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Informação importante"}%} Adicione seu usuário ao grupo docker para iniciar contêineres do Docker sem permissões de root. Encontre as [instruções aqui](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

## 2. Configurar

Baixe o repositório do GitHub e navegue até ele:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Em seguida, crie um arquivo `.env` a partir do `template.env`:


{% codeHelper {copy: true}%}

```
cp template.env .env
```

{% endcodeHelper %}

Depois disso, você pode abrir o arquivo `.env` e editar os valores padrão, como:
- o caminho para o repositório onde todas as pastas de configurações serão armazenadas.
- fuso horário em ["nome do banco de dados tz"](https://en.wikipedia.org/wiki/List_of_t_database_time_zones).

## 3. Iniciar

Execute o script bash e aguarde até que ele instale todos os pacotes necessários:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

O script verificará se todas as ações necessárias foram concluídas nos passos anteriores e exibirá um erro se algo estiver incorreto.

Durante o processo de instalação, as seguintes situações podem ocorrer:
- Se você decidir não usar o coordenador Zigbee, verá uma linha de diálogo confirmando se deseja continuar a instalação:

{% codeHelper %}

```
este script criará todos os repositórios necessários e iniciará os contêineres do Docker
Não é possível encontrar a localização do coordenador Zigbee. Insira-o e execute o script novamente. O diretório /dev/serial/by-id/ não existe
Você deseja continuar sem o coordenador Zigbee? O contêiner Zigbee2MQTT não será iniciado.
Você deseja prosseguir? (Y/n)
```

{% endcodeHelper %}


- Se houver vários dispositivos em seu Raspberry Pi 4 que usam portas seriais, o script perguntará qual dispositivo usar:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Pós-instalação

Após tudo ter sido iniciado, você pode usar o script `update.sh` para atualizar a versão dos pacotes do Docker:
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
Este script irá baixar novas versões, excluir as versões antigas dos pacotes e reiniciar tudo automaticamente, salvando todas as suas configurações.

Para parar tudo, use o script `stop.sh`:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}

Isso é tudo. Continue para o próximo artigo.