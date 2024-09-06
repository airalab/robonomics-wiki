---
title: Dispositivos Zigbee no Zigbee2MQTT

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt/

---

**Se, durante o processo de instalação, você inserir um coordenador ZigBee, poderá adicionar dispositivos ZigBee à sua casa inteligente. Este artigo explicará como fazer isso.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## Pareando Dispositivos

Abra um navegador da web e acesse `http://%PC_IP_ADDRESS%:8099`. Você pode encontrar o endereço IP do Raspberry Pi
usando o [aplicativo móvel Fing](https://www.fing.com/products) ou a [ferramenta de linha de comando nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Se configurou tudo no seu PC, use `http://localhost:8099`.

Você verá a interface web do Zigbee2MQTT:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


É hora de conectar seu dispositivo inteligente.
Primeiro, pressione o botão `Permitir junção (Tudo)` na parte superior da interface web do Zigbee2MQTT.

Em seguida, comece a parear os dispositivos. A maneira mais comum de colocar um dispositivo no modo de conexão é segurar seu botão de energia ou ligá-los/desligá-los 5 vezes. Certifique-se de que o Zigbee2MQTT está em execução.

Quando o dispositivo se conectar, você os verá na interface web:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

Agora você deve ver este sensor na sua interface web do Home Assistant. Vá para `Configurações` -> `Dispositivos e Serviços` -> `Dispositivos`.

Após adicionar todos os sensores, você pode fechar a interface web do Zigbee2MQTT.