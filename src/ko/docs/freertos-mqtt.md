---
title: Amazon FreeRTOS 장치를 MQTT를 통해 Robonomics에 연결하기

contributors: [khssnv]
---

이 문서에서는 [Amazon Web Services FreeRTOS](https://aws.amazon.com/freertos/)를 실행하는 마이크로컨트롤러가 MQTT를 통해 Robonomics 네트워크에 연결되는 방법을 설명합니다. 프로젝트 소스 코드는 [이 저장소](http://github.com/khssnv/freertos_mqtt_robonomics_example)에서 확인할 수 있습니다.

우리는 [ESP32 DevKitC](https://devices.amazonaws.com/detail/a3G0L00000AANtjUAH/ESP32-WROOM-32-DevKitC/)를 사용하며, FreeRTOS 배포 및 MQTT 구현은 [Espressif IoT Development Framework](https://github.com/espressif/esp-idf)에서 제공합니다. Espressif는 사용된 마이크로컨트롤러의 공급 업체입니다.

또한 데모용으로 [PMS-3003](http://www.plantower.com/en/content/?107.html) 센서가 있습니다. 이 센서는 대기 중의 입자 상태를 측정하며, 이를 통해 대기 질을 추정할 수 있습니다.

대기 질은 이 문서의 주제가 아닙니다. 대기 질에 대한 자세한 정보는 WHO 웹사이트에서 확인할 수 있습니다: [대기(야외) 공기 오염](https://www.who.int/news-room/fact-sheets/detail/ambient-(outdoor)-air-quality-and-health). 시스템의 목표는 센서 측정 값을 Airalab의 Robonomics 네트워크에 발행하는 것입니다.

## 하드웨어 설정

PMS3003 TXD 핀 5를 ESP32 DevKitC IO17에 연결하여 UART를 통해 측정 값을 전송합니다.
또한 두 장치 모두 전원과 공통 접지가 필요합니다.

{% roboWikiPicture {src:"docs/freertos-mqtt/wiring.png", alt:"Wiring Diagram"} %}{% endroboWikiPicture %}

## 데이터 흐름

센서 측정 값을 Robonomics 네트워크로 전달하기 위해 펌웨어 수준에서 우리의 목표는 센서로부터 데이터를 가져와서 해당하는 임베디드 통신 프로토콜 (우리의 경우 UART)을 통해 AIRA 인스턴스로 전달하는 것입니다.

{% roboWikiPicture {src:"docs/freertos-mqtt/send.svg", alt:"Sending"} %}{% endroboWikiPicture %}

우리의 예제에서는 공용 IP 주소 및 도메인 이름이 할당된 AIRA 클라우드 배포를 사용합니다.
AIRA 인스턴스에서는 `mosquitto` MQTT 브로커를 설정하고 `/freertos_mqtt_robonomics_example/98:F4`를 구독합니다.:AB:72:23:C4` 주제로 MQTT에서 메시지를 받습니다.

그런 다음 메시지를 `robonomics io` 작성기로 파이프로 전달합니다.

{% roboWikiPicture {src:"docs/freertos-mqtt/recv.svg", alt:"수신"} %}{% endroboWikiPicture %}

이제 데이터가 Robonomics Network에 있고 다시 `robonomics io`로 읽을 수 있습니다.

## 펌웨어

우리는 [TCP 전송을 사용한 ESP-MQTT 샘플 응용 프로그램](https://github.com/espressif/esp-idf/tree/master/examples/protocols/mqtt/tcp)을 기반으로 합니다.

우리는 UART 연결을 위해 센서, SNTP 시간 동기화 및 주기적인 MQTT 게시자 루틴을 위해 `main/app_main.c`만 수정합니다.

프로젝트를 반복하려는 경우, 그리고 이것이 첫 번째 ESP IDF 기반 프로젝트인 경우, 먼저 [Espressif의 ESP-IDF 프로그래밍 가이드](https://docs.espressif.com/projects/esp-idf/en/latest/esp32/get-started/index.html#installation-step-by-step)를 따라 펌웨어 작업(구성, 빌드 및 `idf.py` 도구를 사용한 업로드)에 익숙해지기 위해 소개를 따르십시오.

### Wi-Fi 구성

클라우드에 배포된 AIRA 인스턴스와 통신하려면 마이크로컨트롤러에 인터넷 연결이 필요합니다.
이를 위해 ESP32의 Wi-Fi를 사용합니다.
Espressif은 온보드 Wi-Fi를 구성하기 위한 유틸리티를 제공합니다.
우리의 예에서는 Ubuntu 20.04 GNU/Linux 개발 환경을 사용합니다.
Wi-Fi를 구성하려면 프로젝트 폴더로 이동하여 SDK 구성 도구를 실행합니다.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

그런 다음 `예제 연결 구성` 섹션에서 Wi-Fi 액세스 포인트 SSID와 암호를 설정합니다.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-wi-fi.png", alt:"Menuconfig Wi-Fi"} %}{% endroboWikiPicture %}

### MQTT 엔드포인트 구성

MQTT를 구성하는 데는 두 가지가 있습니다.
첫 번째는 MQTT 브로커 주소입니다.
SDK 구성 도구로 구성할 수 있습니다.

```console
cd freertos_mqtt_robonomics_example/firmware
idf.py menuconfig
```

`예제 구성` 섹션에서 `Broker URL`을 설정합니다.

{% roboWikiPicture {src:"docs/freertos-mqtt/menuconfig-mqtt.png", alt:"Menuconfig MQTT"} %}{% endroboWikiPicture %}

두 번째는 MQTT 주제입니다..
프로젝트 이름 접두사와 ESP32 MAC 주소를 사용하여 펌웨어에 설정했습니다.
특정 마이크로칩에 대해 `/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4`를 얻습니다.

## MQTT에서 Robonomics로

먼저 MQTT를 통해 데이터를 수신하는지 확인해 봅시다.
Mosquitto MQTT 브로커 주제 디바이스를 구독할 수 있습니다.

```console
$ nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'"
ts=1615651809, PM1=2, PM2.5=6, PM10=3
```

여기서 `mosquitto` 패키지를 환경에 가져와 `mosquitto_sub` 유틸리티를 사용합니다.
그런 다음 펌웨어에 설정된 주제를 구독합니다.
측정값을 받았으므로 AIRA가 MQTT를 통해 데이터를 올바르게 수신합니다.
이제 이러한 메시지를 Robonomics 네트워크로 전달합시다.

```console
nix-shell -p mosquitto --run "mosquitto_sub -h localhost -t '/freertos_mqtt_robonomics_example/98:F4:AB:72:23:C4'" | robonomics io write pubsub --bootnodes=/ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
```

여기서 `robonomics` 유틸리티를 사용하여 pubsub 채널 `/freertos_mqtt_robonomics_example`에 메시지를 게시합니다.
적어도 하나의 연결이 설정되도록 `bootnodes`를 지정합니다.

이제 동일한 pubsub 채널에서 이러한 메시지를 읽습니다.

```console
$ robonomics io read pubsub --listen /ip4/127.0.0.1/tcp/34333 /freertos_mqtt_robonomics_example
2021-03-27 15:15:51  Generated random peer id: 12D3KooWB2nym5E6c3aPpnPKK5wB9Z6n9eZzcXSpyUBozxhi6dam
2021-03-27 15:15:51  Subscribed to topic: _robonomics_pubsub_peer_discovery
2021-03-27 15:15:51  Subscribed to topic: /freertos_mqtt_robonomics_example
2021-03-27 15:15:56  새로운 피어가 연결되었습니다: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
2021-03-27 15:15:56  GRAFT: 주제: TopicHash { hash: "_robonomics_pubsub_peer_discovery" }에 대한 피어의 메시 링크가 추가되었습니다: PeerId("12D3KooWRPLCioD2b9XLZTZJQELSAuQAyTrHUKzRktrQHtTSs6kS")
ts=1616843855, PM1=3, PM2.5=4, PM10=3
```

## 사용된 원본 자료

* ESP32 DevKitC 핀 배치도는 GoJimmy의 블로그 https://gojimmypi.blogspot.com/2017/03/jtag-debugging-for-esp32.html 에서 확인하였습니다.
* PSM3003 데이터 구조 및 디코더는 OpenAirProject의 https://github.com/openairproject/sensor-esp32 에서 확인하였습니다.

**모두 감사합니다!**