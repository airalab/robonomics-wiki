---
title: 라즈베리 파이용 사전 설치 이미지
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

**라즈베리 파이에 Robonomics 통합을 사용하여 Home Assistant를 설치하는 가이드에 오신 것을 환영합니다. Home Assistant는 오픈 소스 홈 자동화 시스템으로, 가정 네트워크에서 스마트 기기를 제어하기 위한 중앙 허브를 공합니다. Robonomics와 통합함으로써 분산 클라우드 서비스를 활용하여 스마트 홈의 기능과 보안을 향상시킬 수 있습니다. 이 글에서는 라즈베리 파이에 Home Assistant와 Robonomics를 설치하는 단계별 지침을 제공하며, 안전하고 분산된 솔루션을 사용하여 가정의 다양한 측면을 자동화하고 제어할 수 있습니다. 시작해 봅시다!**

## 설치에 필요한 하드웨어

이미 Home Assistant를 스마트 홈 설정에 통합하지 않았다면, 처음부터 완전한 스마트 홈 시스템을 구축하기 위해 필요한 장비를 알고 있어야 합니다.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>라즈베리 파이 4 (at least 2 GB RAM)</b>
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


## 1. Robonomics 사전 설치 이미지 다운로드

Robonomics 사전 설치 이미지에는 다음이 포함되어 있습니다.
- Home Assistant Core
- IPFS
- MQTT 브로커 및 통합
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="https://crustipfs.info/ipfs/QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

[GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)에서 소스 코드를 확인하고 최신 릴리스 이미지를 다운로드할 수 있습니다.

</robo-wiki-note>


## 2. 이미지 구성

컴퓨터에 [라즈베리 파이 Imager](https://www.raspberrypi.com/software/)를 설치하고 SD 카드를 삽입하세요.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Raspberry Pi Imager 프로그램을 실행합니다. 필요한 이미지를 운영 체제로 선택하고 저장소 드롭다운 메뉴에서 SD 카드를 선택했는지 확인하세요. 
설정에서 다음을 수행하세요:
- 사용자 이름과 비밀번호 설정(기본 사용자 이름 "pi"를 기억하기 쉽게 저장),  
- Wi-Fi 이름과 비밀번호 제공, 
- 드롭다 목록에서 국가 선택
그리고 이미지를 `Write`하세요. 
                   
<robo-wiki-note type="note">사용자 이름과 비밀번호를 주의깊게 저장하세요. 문제 해결 시 이 자격 증명이 필요합니다.</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

국가 코드는 [여기](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)에서 확인할 수 있습니다.

## 3. 첫 번째 부팅

**SD 카드를 안전하게 추출한 다음**, 라즈베리 파이에 삽입하세요. 그런 다음 라즈베리 파이에 **Zigbee 어댑터를 삽입하세요.**

<robo-wiki-note type="warning">라즈베리 파이를 처음 시작하기 전에 Zigbee 어댑터를 삽입하는 것이 중요합니다! 
Zigbee 네트워크의 자동 구성을 위해 필요합니다.</robo-wiki-note>

**[JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en)(필요한 모든 펌웨어가 있는 어댑터)를 사용하는 경우, 이 지침을 따르기만 하면 됩니다. 그러나 다른 어댑터를 사용하는 경우, 먼저 Zigbee2MQTT 소프트웨어로 플래시해야 합니다. 디바이스에 대한 지침은 [여기](https://www.zigbee2mqtt.io/information/supported_adapters.html)에서 찾을 수 있습니다.**

그런 다음 전원 케이블을 장치에 연결하세요. 장치는 Wi-Fi 네트워크에 연결해야 합니다. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Raspberry Pi가 연결되면 빨간색 LED가 켜지고 녹색 LED가 잠시 동안 깜박입니다. Raspberry Pi가 부팅되고 네트워크에 등록될 때까지 최대 5분 정도 기다립니다.

이제 라즈베리 파이의 IP 주소를 찾으세요. [Fing 모바일 앱](https://www.fing.com/products)이나 
[nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용하여 찾을 수 있습니다. IP 목록에서 `robots-home`(옵션 이름은 `Home(homeassistant)`일 수 있음) 
호스트 머신의 이름을 찾으세요. 

이 예제에서 주소는 `192.168.43.56`입니다. 

모든 것이 작동하는지 확인하려면 웹 브라우저를 열고 웹 페이지 `http://%RASPBERRY_IP_ADDRESS%:8123`로 이동하세요. 이 예제에서는 `192.168.43.56:8123`입니다.
모든 것이 정상이면 Home Assistant 웹 인터페이스가 표시됩니다. 웹 페이지가 열리지 않으면 라즈베리 파이가 부팅되기까지 최대 5분 동안 기다렸다가 다시 시도하세요. 

<robo-wiki-video loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## 문제 해결

1. 나중에 Wi-Fi 설정을 변경하려면 `ssh` 명령을 사용하여 라즈베리 파이에 로그인해야 합니다. 이를 위해 컴퓨터에서 터미널을 열고
"이미지 구성" 단계에서 생성한 사용자 이름과 함께 ssh 명령을 입력하세요(기본값은 "pi"입니다). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

그런 다음 `sudo raspi-config` 명령을 사용하세요. 이 명령에 대한 자세한 정보는 [공식 사이트](https://www.raspberrypi.com/documentation/computers/configuration.html)에서 확인할 수 있습니다.
