---
title: Conectar um Dispositivo Amazon FreeRTOS ao Robonomics via MQTT

contributors: [khssnv]
---

Aqui está a demonstração de como um microcontrolador executando o [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) pode ser conectado à Rede Robonomics via MQTT. Por favor, verifique [este repositório](http://github.com/khssnv/freertos_mqtt_robonomics_example) para o código-fonte do projeto.

Nós utilizamos o [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) com a distribuição FreeRTOS e a implementação MQTT fornecida pelo [Espressif IoT Development Framework](https://github.com/espressif/esp-idf), sendo a Espressif a fornecedora do microcontrolador utilizado.

Também há um sensor [PMS-3003](http://www.plantower.com/en/content/?107.html) para fins de demonstração. O sensor mede a presença de matéria particulada no ar e pode ser utilizado para estimar a qualidade do ar.

A qualidade do ar não é o foco do artigo, você pode encontrar mais informações sobre isso no site da OMS: [Poluição do ar ambiente (ao ar livre)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). O objetivo do sistema é publicar as medições do sensor na rede Robonomics da Airalab.

## Configuração de Hardware

Conectamos o PMS3003 TXD PIN5 ao ESP32 DevKitC IO17 para transferir as medições via UART.
Ambos os dispositivos também requerem energia e um terra comum.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Diagrama de Fiação"} %}{% endroboWikiPicture %}

## Fluxo de Dados

Para enviar as medições do sensor para a rede Robonomics, em um nível de firmware, nosso objetivo é obter dados de um sensor por meio do protocolo de comunicação embarcado que ele suporta (UART no nosso caso) e enviá-lo para a instância AIRA via MQTT / TCP.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Enviando"} %}{% endroboWikiPicture %}

Em nosso exemplo, utilizamos a implantação em nuvem da AIRA disponível por endereço IP público e nome de domínio atribuído.
Na instância AIRA, configuramos o corretor MQTT `mosquitto` e nos inscrevemos em `/freertos_mqtt_robonomics_example/98:F4`:AB:72:23:C4` tópico para receber mensagens do MQTT.

Em seguida, passamos as mensagens para o escritor `robonomics io` por meio de pipe.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"Recebendo"} %}{% endroboWikiPicture %}

Agora os dados estão disponíveis na Rede Robonomics e podemos lê-los novamente com o `robonomics io`.

## Firmware

Utilizamos a [aplicação de exemplo ESP-MQTT com transporte TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) como base.

Apenas modificamos o `main/app_main.c` para conexão UART com o sensor, sincronização de tempo SNTP e rotina periódica de publicação MQTT.

Se você está tentando repetir o projeto e é o seu primeiro projeto baseado em ESP IDF, por favor, siga inicialmente o [guia de programação ESP-IDF da Espressif](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) para se familiarizar com operações de firmware como configuração, compilação e upload com a ferramenta `idf.py`.

### Configuração Wi-Fi

Para se comunicar com a instância AIRA implantada na nuvem, nosso microcontrolador requer conexão com a Internet.
Utilizamos o Wi-Fi do ESP32 para isso.
A Espressif fornece utilitários para configurar o Wi-Fi embarcado.
Em nosso exemplo, utilizamos um ambiente de desenvolvimento com Ubuntu 20.04 GNU/Linux.
Para configurar o Wi-Fi, vamos para a pasta do projeto e executamos a ferramenta de configuração do SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Em seguida, definimos o SSID e a senha do ponto de acesso Wi-Fi na seção `Example Connection Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### Configuração do Endpoint MQTT

Há duas coisas a serem configuradas para o MQTT.
A primeira é o endereço do broker MQTT.
É configurável com a ferramenta de configuração do SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Defina a `URL do Broker` na seção `Example Configuration`.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

A segunda coisa é um tópico MQTT..
Configuramos isso no firmware com o prefixo do nome do projeto seguido do endereço MAC do nosso ESP32.
Isso nos dá `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` para nosso microchip específico.

## Do MQTT para Robonomics

Primeiro, vamos verificar se recebemos dados por MQTT.
Podemos nos inscrever no tópico do dispositivo publicado em nosso corretor MQTT Mosquitto.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Aqui trazemos o pacote `mosquitto` para o nosso ambiente para usar a utilidade `mosquitto_sub`.
Em seguida, nos inscrevemos no tópico definido no firmware.
Recebemos nossas medições, o que significa que o AIRA está recebendo dados por MQTT corretamente.
Agora vamos encaminhar essas mensagens para a Rede Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Aqui usamos a utilidade `robonomics` para publicar mensagens no canal pubsub `/freertos_mqtt_robonomics_example`.
Especificamos `bootnodes` para garantir que pelo menos uma conexão seja estabelecida.

Agora vamos ler essas mensagens do mesmo canal pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  Novo par conectado: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Link de malha adicionado para o par: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") no tópico: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Recursos Originais Utilizados

* Layout de pinos do ESP32 DevKitC do blog do GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Estrutura de dados e decodificador PSM3003 do OpenAirProject https://github.com/openairproject/sensor-esp32

**Obrigado a todos!**