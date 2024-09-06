---
title: Zigbee2MQTT에서 Zigbee 장치

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt/

---

**설치 과정 중에 ZigBee 코디네이터를 삽입하면 스마트 홈에 ZigBee 장치를 추가할 수 있습니다. 이 기사에서는 그 방법을 설명하겠습니다.**

{% roboWikiPicture {src:"docs/home-assistant/zigbee2mqtt.png", alt:"zigbee2mqt"} %}{% endroboWikiPicture %}

## 장치 페어링

웹 브라우저를 열고 `http://%PC_IP_ADDRESS%:8099`로 이동합니다. Raspberry Pi의 IP 주소는 [Fing 모바일 앱](https://www.fing.com/products)이나 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용하여 찾을 수 있습니다. PC에서 모든 것을 설정했다면 `http://localhost:8099`를 사용하세요.

Zigbee2MQTT의 웹 인터페이스가 표시됩니다:


{% roboWikiPicture {src:"docs/home-assistant/z2m-webinterface.jpg", alt:"z2m-webinterface"} %}{% endroboWikiPicture %}


이제 스마트 장치를 연결할 시간입니다.
먼저, Zigbee2MQTT의 웹 인터페이스 상단에 있는 `Permit join (All)` 버튼을 누릅니다.

그런 다음, 장치를 페어링합니다. 장치를 연결 모드로 전환하는 가장 일반적인 방법은 전원 버튼을 누르거나 5번 켜고 끄는 것입니다. Zigbee2MQTT가 실행 중인지 확인하세요.

장치가 연결되면 웹 인터페이스에서 확인할 수 있습니다:

{% roboWikiPicture {src:"docs/home-assistant/device_connected.jpg", alt:"device_connected"} %}{% endroboWikiPicture %}

이제 Home Assistant WebUI에서 이 센서를 볼 수 있어야 합니다. `Settings` -> `Devices & Services` -> `Devices`로 이동합니다.

모든 센서를 추가한 후에는 Zigbee2MQTT의 웹 인터페이스를 닫을 수 있습니다.