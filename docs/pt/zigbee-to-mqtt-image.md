---
title: Adaptador Zigbee com Zigbee2MQTT para Imagem Pré-instalada

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**Neste artigo você irá parear dispositivos inteligentes.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

Abra um navegador da web e vá para `http://%RASPBERRY_IP_ADDRESS%:8099`. Você pode encontrar o endereço IP do Raspberry Pi usando o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

Você verá a interface web do Zigbee2MQTT:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




É hora de conectar seu dispositivo inteligente. 
Primeiro, pressione o botão `Permit join (All)` no topo da interface web do Zigbee2MQTT. 

Em seguida, comece a parear os dispositivos. A maneira mais comum de colocar um dispositivo no modo de conexão é segurar seu botão de energia ou ligá-los/desligá-los 5 vezes. Certifique-se de que o Zigbee2MQTT esteja em execução.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

Quando o dispositivo se conectar, você os verá na interface web:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

Agora você deve ver este sensor em sua interface web do Home Assistant. Vá para `Settings` -> `Devices & Services` -> `Devices`:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

Após adicionar todos os sensores, você pode fechar a interface web do Zigbee2MQTT.
