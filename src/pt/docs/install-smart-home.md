---
title: Instalação de Casa Inteligente
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Integração Robonomics Home Assistant 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Bem-vindo ao guia de instalação do Home Assistant com integração Robonomics. O Home Assistant é um sistema de automação residencial de código aberto que fornece um hub centralizado para controlar dispositivos inteligentes em sua rede doméstica. Ao integrar com Robonomics, um serviço em nuvem descentralizado, você pode aprimorar a funcionalidade e segurança da sua casa inteligente. Neste artigo, forneceremos instruções passo a passo sobre como instalar o Home Assistant com Robonomics, dando-lhe a capacidade de automatizar e controlar vários aspectos da sua casa usando uma solução segura e descentralizada. Vamos começar!**

## Demonstração

Aqui está um exemplo de uma instalação completa de Casa Inteligente e integração Robonomics. Tenha em mente que o tempo necessário pode variar dependendo da conexão com a Internet.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Hardware necessário para a instalação

Se você ainda não incorporou o Home Assistant à sua configuração de casa inteligente, é importante estar ciente do equipamento necessário para estabelecer um sistema de casa inteligente completo do zero. A equipe Robonomics recomenda o uso do Raspberry Pi 4 como servidor de casa inteligente. **Mas é possível configurar tudo em seu PC.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (pelo menos 2 GB de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Cartão SD 16Gb</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptador Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivos inteligentes Zigbee (Opcional) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Computador para configuração</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

## 1. Instalar Pré-requisitos

O Docker Robonomics contém:
- Home Assistant
- IPFS
- Broker e Integração MQTT
- Zigbee2MQTT
- Proxy libp2p
- Integração Robonomics

Este artigo mostrará o processo de instalação no sistema Ubuntu. Primeiro, você precisa instalar os pacotes a seguir:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

Em seguida, você precisa instalar o Docker no PC. Encontre as instruções de instalação no [site oficial](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Informação importante">

  Adicione seu usuário ao grupo docker para iniciar os contêineres do Docker sem permissões de root. Encontre as [instruções aqui](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

## 2. Configurar

Baixe o repositório do GitHub e navegue dentro dele:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Em seguida, crie um arquivo `.env` a partir do `template.env`:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

Depois disso, você pode abrir o arquivo `.env` e editar os valores padrão, como:
- Versões dos pacotes
- caminho para o repositório onde serão armazenadas todas as pastas de configurações.
- fuso horário em ["nome do banco de dados tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Iniciar

Execute o script bash e aguarde até que ele instale todos os pacotes necessários:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

O script verificará todas as ações necessárias que você completou nos passos anteriores e lançará um erro se algo estiver errado.

Durante o processo de instalação, as seguintes situações podem ocorrer:
- Se você decidir não usar o coordenador Zigbee, verá uma linha de diálogo confirmando se deseja continuar a instalação:

{% codeHelper %}

```
este script criará todos os repositórios necessários e iniciará os contêineres do Docker
Não é possível encontrar a localização do coordenador Zigbee. Insira-o e execute o script novamente. O diretório /dev/serial/by-id/ não existe
Você deseja continuar sem o coordenador Zigbee? Ele não iniciará o contêiner Zigbee2MQTT.
Você deseja prosseguir? (s/n)
```

{% endcodeHelper %}


- Se houver vários dispositivos em seu PC que usam portas seriais, o script perguntará qual dispositivo usar:

{% codeHelper %}

```
este script criará todos os repositórios necessários e iniciará os contêineres do Docker
o coordenador Zigbee está instalado
Você tem mais de 1 dispositivo conectado. Escolha um
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

Isso é tudo. Continue para o próximo artigo.