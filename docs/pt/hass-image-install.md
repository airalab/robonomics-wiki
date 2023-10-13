---
title: Imagem pré-instalada para Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Bem-vindo ao guia de instalação do Home Assistant com integração Robonomics em um Raspberry Pi. O Home Assistant é um sistema de automação residencial de código aberto que fornece um hub centralizado para controlar dispositivos inteligentes em sua rede doméstica. Ao integrar-se ao Robonomics, um serviço em nuvem descentralizado, você pode aprimorar a funcionalidade e a segurança de sua casa inteligente. Neste artigo, forneceremos instruções passo a passo sobre como instalar o Home Assistant com Robonomics em um Raspberry Pi, dando a você a capacidade de automatizar e controlar vários aspectos de sua casa usando uma solução segura e descentralizada. Vamos começar!**

## Hardware necessário para a instalação

Se você ainda não incorporou o Home Assistant à sua configuração de casa inteligente, é importante estar ciente do equipamento necessário para estabelecer um sistema completo de casa inteligente desde o início.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Baixe a imagem pré-instalada do Robonomics

A imagem pré-instalada do Robonomics contém:
- Home Assistant Core
- IPFS
- Broker MQTT e Integração
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="https://crustipfs.info/ipfs/QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Você pode verificar o código-fonte e baixar a versão mais recente da imagem no [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Configure a imagem

Instale o [Raspberry Pi Imager](https://www.raspberrypi.com/software/) em seu computador. Em seguida, insira o cartão SD.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Execute o programa Raspberry Pi Imager. Escolha a imagem necessária como sistema operacional e certifique-se de selecionar seu cartão SD no menu suspenso de armazenamento.
Nas configurações:
- Defina o nome de usuário e a senha (salve o nome de usuário padrão "pi" para facilitar a lembrança),  
- forneça o nome e a senha do Wi-Fi, 
- escolha seu país na lista suspensa
e então `Grave` a imagem. 
                   
<robo-wiki-note type="note">Guarde o nome de usuário e a senha com cuidado, pois essas credenciais serão necessárias em caso de solução de problemas</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Você pode encontrar códigos de país [aqui](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. Primeira inicialização

**Ejete com segurança o cartão SD**, insira-o no Raspberry Pi. Em seguida, **insira o adaptador Zigbee** no Raspberry Pi.

<robo-wiki-note type="warning">É importante inserir o adaptador Zigbee antes da primeira inicialização do Raspberry Pi! 
É necessário para a autoconfiguração da rede Zigbee.</robo-wiki-note>

**Se você tiver o [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (que possui todo o firmware necessário), você pode simplesmente seguir estas instruções. No entanto, se você tiver outro adaptador, a primeira coisa que você precisa fazer é gravá-lo com o software Zigbee2MQTT. Você pode encontrar instruções para o seu dispositivo [aqui](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

Em seguida, conecte o cabo de alimentação ao seu dispositivo. Ele deve se conectar à sua rede Wi-Fi. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Assim que o Raspberry Pi estiver conectado, o LED vermelho acenderá e o LED verde piscará por algum tempo. Aguarde até 5 minutos para que o Raspberry Pi inicialize e se registre na rede.

Agora encontre o endereço IP do Raspberry Pi. Para encontrá-lo, você pode usar o aplicativo móvel [Fing](https://www.fing.com/products) ou 
a ferramenta de linha de comando [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Encontre o `robots-home` (o nome opcional pode ser `Home(homeassistant)`) 
nome da máquina host na lista de IPs. 

Neste exemplo, o endereço é `192.168.43.56`. 

Para verificar se tudo está funcionando, abra o navegador da web e acesse a página da web `http://%RASPBERRY_IP_ADDRESS%:8123`. Neste exemplo, será `192.168.43.56:8123`.
Se tudo estiver correto, você verá a interface web do Home Assistant. Se a página da web não abrir, aguarde até 5 minutos para que o Raspberry Pi seja inicializado e tente novamente. 

<robo-wiki-video loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Solucionando Problemas

1. Para alterar as configurações do Wi-Fi posteriormente, você deve fazer login no Raspberry Pi via comando `ssh`. Para isso, abra o terminal em seu computador
e digite o comando ssh com seu nome de usuário, que você criou na etapa "Configurando a imagem" (o padrão é "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

e então use o comando `sudo raspi-config`. Encontre mais informações sobre este comando no [site oficial.](https://www.raspberrypi.com/documentation/computers/configuration.html)
