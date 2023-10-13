---
title: Conecte um dispositivo Amazon FreeRTOS ao Robonomics por MQTT

contributors: [khssnv]
---

Aqui está a demonstração de como um microcontrolador executando [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/) pode ser conectado à Rede Robonomics via MQTT. Por favor, verifique [este repositório](http://github.com/khssnv/freertos_mqtt_robonomics_example) para o código-fonte do projeto.

Nós usamos [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/) com distribuição FreeRTOS e implementação MQTT fornecida pelo [Espressif IoT Development Framework](https://github.com/espressif/esp-idf) enquanto a Espressif é uma fornecedora do microcontrolador utilizado.

Também há um sensor [PMS-3003](http://www.plantower.com/en/content/?107.html) para fins de demonstração. O sensor mede a presença de material particulado no ar e pode ser usado para estimar a qualidade do ar.

A qualidade do ar não é um tópico do artigo, você pode encontrar mais informações sobre isso no site da OMS: [Poluição do ar ambiente (ao ar livre)](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). O objetivo do sistema é publicar as medições do sensor na rede Robonomics da Airalab.

## Configuração de Hardware

Conectamos o pino TXD do PMS3003 ao IO17 do ESP32 DevKitC para transferir as medições por UART.
Ambos os dispositivos também requerem energia e um terra comum.

![Wiring Diagram](../images/freertos-mqtt/wiring.png)

## Fluxo de Dados

Para enviar as medições do sensor para a rede Robonomics, em nível de firmware, nosso objetivo é obter os dados de um sensor por meio do protocolo de comunicação embarcado que ele suporta (UART no nosso caso) e enviá-los para uma instância AIRA por MQTT / TCP.

![Sending](../images/freertos-mqtt/send.svg)

Em nosso exemplo, usamos a implantação em nuvem do AIRA disponível por meio de um endereço IP público e um nome de domínio atribuído.
Na instância AIRA, configuramos o broker MQTT `mosquitto` e nos inscrevemos no tópico `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` para receber mensagens do MQTT.

Em seguida, passamos as mensagens para o escritor `robonomics io` por meio de um pipe.

![Receiving](../images/freertos-mqtt/recv.svg)

Agora os dados estão disponíveis na Rede Robonomics e podemos lê-los novamente com o `robonomics io`.

## Firmware

Usamos o [aplicativo de exemplo ESP-MQTT com transporte TCP](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp) como base.

Apenas modificamos o arquivo `main/app_main.c` para a conexão UART com o sensor, sincronização de tempo SNTP e rotina periódica de publicação MQTT.

Se você está tentando repetir o projeto e é o seu primeiro projeto baseado no ESP IDF, siga primeiro o guia de programação do [Espressif ESP-IDF](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step) para se familiarizar com as operações de firmware, como configuração, compilação e upload com a ferramenta `idf.py`.

### Configuração do Wi-Fi

Para se comunicar com a instância AIRA implantada na nuvem, nosso microcontrolador requer uma conexão com a Internet.
Usamos o Wi-Fi do ESP32 para isso.
A Espressif fornece utilitários para configurar o Wi-Fi embarcado.
Em nosso exemplo, usamos um ambiente de desenvolvimento com Ubuntu 20.04 GNU/Linux.
Para configurar o Wi-Fi, vamos para a pasta do projeto e executamos a ferramenta de configuração do SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Em seguida, definimos o SSID e a senha do ponto de acesso Wi-Fi na seção `Example Conectarion Configuração`.

![Menuconfig Wi-Fi](../images/freertos-mqtt/menuconfig-wi-fi.png)

### Configuração do Endpoint MQTT

Existem duas coisas a serem configuradas para o MQTT.
A primeira é o endereço do broker MQTT.
Isso pode ser configurado com a ferramenta de configuração do SDK.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

Defina a `URL do Broker` na seção `Example Configuração`.

![Menuconfig MQTT](../images/freertos-mqtt/menuconfig-mqtt.png)

A segunda coisa é o tópico MQTT.
Definimos isso no firmware com o prefixo do nome do projeto seguido do endereço MAC do nosso ESP32.
Isso nos dá `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4` para nosso microchip específico.

## Do MQTT para o Robonomics

Primeiro, vamos verificar se recebemos dados por MQTT.
Podemos nos inscrever no tópico do broker MQTT Mosquitto para receber as mensagens do dispositivo.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

Aqui trazemos o pacote `mosquitto` para o nosso ambiente para usar a utilidade `mosquitto_sub`.
Em seguida, nos inscrevemos no tópico definido no firmware.
Obtemos nossas medições, o que significa que a AIRA recebe dados corretamente por MQTT.
Agora vamos encaminhar essas mensagens para a Rede Robonomics.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

Aqui usamos a utilidade `robonomics` para publicar mensagens no canal pubsub `/freertos_mqtt_robonomics_example`.
Especificamos `bootnodes` para garantir pelo menos uma conexão estabelecida.

Agora estamos lendo essas mensagens do mesmo canal pubsub.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  New peer connected: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: Mesh link added for peer: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS") in topic: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## Recursos originais utilizados

* Pinout do ESP32 DevKitC do blog do GoJimmy https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html
* Estrutura de dados e decodificador PSM3003 do OpenAirProject https://github.com/openairproject/sensor-esp32

**Obrigado a todos!**
