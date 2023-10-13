---
title: Zigbee2MQTT에 사전 설치된 이미지와 함께 사용되는 Zigbee 어댑터

contributors: [nakata5321, PaTara43]
tools:
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt/releases/tag/1.32.1

---

**이 문서에서는 스마트 기기를 페어링합니다.**

<robo-wiki-picture src="home-assistant/zigbee2mqtt.png" />

## Pairing Device

웹 브라우저를 열고 `http://%RASPBERRY_IP_ADDRESS%:8099`로 이동합니다. 라즈베리 파이의 IP 주소는 [Fing 모바일 앱](https://www.fing.com/products) 또는 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용하여 찾을 수 있습니다.

Zigbee2MQTT의 웹 인터페이스가 표시됩니다:

<robo-wiki-picture src="home-assistant/z2m-webinterface.jpg" />




스마트 기기를 연결할 시간입니다. 
먼저, Zigbee2MQTT의 웹 인터페이스 상단에 있는 `Permit join (All)` 버튼을 누릅니다. 

그런 다음, 기기를 페어링하기 시작합니다. 기기를 연결 모드로 전환하는 가장 일반적인 방법은 전원 버튼을 길게 누르거나 5번 켜고 끄는 것입니다. Zigbee2MQTT가 실행 중인지 확인하세요.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

기기가 연결되면 웹 인터페이스에서 확인할 수 있습니다:

<robo-wiki-picture src="home-assistant/device_connected.jpg" />

이제 Home Assistant WebUI에서 이 센서를 볼 수 있어야 합니다. `Settings` -> `Devices & Services` -> `Devices`로 이동하세요:

<robo-wiki-picture src="home-assistant/mqtt-devices.jpg" />

모든 센서를 추가한 후에는 Zigbee2MQTT의 웹 인터페이스를 닫을 수 있습니다.
