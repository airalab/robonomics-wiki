---
title: Robonomics SLS 게이트웨이

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS 펌웨어 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**이 문서에서는 Robonomics SLS 게이트웨이를 설정합니다. 게이트웨이에 필요한 소프트웨어를 설치하고 구성한 다음 Home Assistant에 연결합니다.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## 펌웨어

먼저 게이트웨이의 마이크로컨트롤러 펌웨어를 설치해야 합니다. SLS 게이트웨이의 하단 부분에 있는 스위치 `1`과 `3`을 `ON`으로 설정하고, 나머지는 `OFF`로 설정합니다.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

게이트웨이를 Raspberry Pi에 USB 타입-C 포트를 통해 연결합니다.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

펌웨어가 포함된 저장소를 Raspberry Pi에 복제합니다:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

`robonomics-hass-utils/esp_firmware/linux`로 이동합니다. SLS 게이트웨이를 플래시하려면 `Clear` 및 `Flash_16mb` 스크립트를 실행해야 합니다.

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### 문제 해결

게이트웨이 펌웨어 업데이트 중 문제가 발생하는 경우 추가 조치가 필요합니다:

1. pySerial 모듈이 설치되어 있는지 확인하십시오:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. 사용자가 USB 포트에 액세스 권한을 갖도록하고 컴퓨터를 다시 시작하십시오:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. 경우에 따라 펌웨어를 업데이트하기 위해 스크립트에서 대역폭 설정을 변경해야 할 수 있습니다. `Flash_16mb.sh` 스크립트를 `nano` 편집기로 열고baud 매개변수를 `921600`에서 더 작은 값(예: `115200`)으로 변경하십시오.

## 구성

1. 컴퓨터에서 SLS 게이트웨이를 연결 해제하십시오. 게이트웨이 뒷면의 스위치를 올바른 위치로 설정하십시오. `5`번 스위치 (RX Zigbee to ESP)와 `6`번 스위치 (TX Zigbee to ESP)는 `ON` 위치여야 하며, 다른 스위치는 `OFF`여야 합니다.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. 타입-C 전원 케이블을 연결하십시오. 중앙의 표시등이 녹색으로 변해야 합니다.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. 처음 시작할 때 게이트웨이는 Wi-Fi를 SSID `zgw****`로 공유하기 시작합니다. 이 네트워크에 연결하십시오. 신호가 상당히 약할 수 있으므로 SLS 게이트웨이를 컴퓨터에 가까이 두는 것이 좋습니다.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. 연결이 성공하면 웹 인터페이스가 열립니다 (또는 192.168.1.1 주소).

5. `Wi-Fi Settings` 페이지가 표시됩니다. Wi-Fi를 선택하고 암호를 입력하십시오. `Apply` 버튼을 누릅니다. 게이트웨이가 다시 시작되고 Wi-Fi 네트워크에 연결됩니다.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. SLS 게이트웨이의 로컬 IP를 찾아 웹 인터페이스에 액세스합니다. 찾는 방법은 [Fing 모바일 앱](https://www.fing.com/products) 또는 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용할 수 있습니다. 게이트웨이 이름은 다음과 같아야 합니다: `zgw****`. 브라우저에 게이트웨이 IP를 붙여넣어 게이트웨이의 웹 인터페이스를 엽니다.

7. `Setting` -> `Hardware`로 이동하여 설정이 이미지와 같은지 확인하십시오. 필요한 경우 설정을 수정하고 `Save` 버튼을 클릭합니다:

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

필수 값이 있는 표:

| 필드                    | 값                 |
|--------------------------|:-------------------|
| Zigbee 모듈             | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST 핀           | 18                 |
| Zigbee BSL 핀           | 19                 |
| 서비스 버튼 핀           | 33 (pullUP - true) |
| 주소 지정 가능한 LED 수  | 0                  |
| LED 빨강 (또는 주소)     | 21                 |
| LED 녹색                | 5                  |
| LED 파랑                | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. 그런 다음 게이트웨이를 다시 부팅하십시오. 오른쪽 상단의 `작업` -> `시스템 다시 부팅`을 선택합니다.

9. Zigbee 정보 창에서 게이트웨이가 제대로 작동하는지 확인하십시오. DeviceState는 `OK`여야 합니다.

10. Home Assistant에 장치를 자동으로 추가하도록 구성하십시오. `Zigbee` -> `구성`으로 이동한 다음 `Home Assistant MQTT Discovery`와 `상태 지우기`를 선택합니다. 변경 사항을 저장하고 다시 **SLS 게이트웨이를 부팅**하십시오.

{% roboWikiNote {type: "warning"}%} 집에 이미 활성화된 SLS 게이트웨이가 있고 지금 다른 게이트웨이를 설정하고 있다면하나를 변경해야합니다. 이 문제를 해결하려면 새 장치의 채널을 변경해야 합니다. 이를 위해 `Zigbee` -> `Config`로 이동하여 채널을 다른 채널로 변경하십시오 (예: 채널 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## SLS를 MQTT에 페어링

SLS 게이트웨이를 구성한 후 SLS 게이트웨이를 Home Assistant에 연결해야 합니다. SLS 게이트웨이 웹 인터페이스를 열고 `Settings/Link` -> `MQTT Setup`로 이동하십시오:


브로커 주소를 추가하십시오 (로컬 네트워크의 Home Assistant가 있는 Raspberry Pi의 주소, [Fing 모바일 앱](https://www.fing.com/products) 또는 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)로 찾을 수 있습니다), 포트 (기본값은 `1883`), 브로커 사용자 이름 및 암호 (이전에 생성한 것) 및 주제 이름 (아무거나 선택할 수 있음). 또한 Raspberry Pi IP 주소는 정적이어야 합니다. `Enable` 및 `Retain states`를 클릭하세요..

변경 사항을 저장하십시오. 이제 장치가 Home Assistant에 자동으로 표시됩니다.

## 장치 연결

`Zigbee` -> `Join`으로 이동하여 장치를 연결하십시오. 센서를 페어링 모드로 설정하려면 전원 버튼을 길게 누르거나 5번 켜고 끄는 것이 가장 일반적인 방법입니다. `Join 활성화` 버튼을 눌러 Zigbee 장치를 검색을 시작하십시오. 활성 센서가 표시됩니다.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

이제 [**IoT Subscription**](/docs/sub-activate) 섹션으로 이동하여 Robonomics 구독을 활성화할 수 있습니다.