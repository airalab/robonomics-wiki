---
title: 스마트 홈 설치
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Home Assistant와 Robonomics 통합 설치 안내서에 오신 것을 환영합니다. Home Assistant는 오픈 소스 홈 자동화 시스템으로, 가정 네트워크의 스마트 기기를 제어하는 중앙 허브를 제공합니다. Robonomics와 통합하여 분산 클라우드 서비스를 활용하면 스마트 홈의 기능과 보안을 향상시킬 수 있습니다. 이 문서에서는 Home Assistant와 Robonomics를 설치하는 단계별 지침을 제공하여 안전하고 분산된 솔루션을 사용하여 집의 다양한 측면을 자동화하고 제어할 수 있도록 도와드리겠습니다. 시작해 봅시다!**

## 데모

여기에 완전한 스마트 홈 및 Robonomics 통합 설치의 예시가 있습니다. 인터넷 연결에 따라 소요되는 시간이 다를 수 있음을 염두에 두세요.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 설치에 필요한 하드웨어

이미 Home Assistant를 스마트 홈 설정에 통합하지 않았다면, 처음부터 완전한 스마트 홈 시스템을 구축하는 데 필요한 장비를 알아두는 것이 중요합니다. Robonomics 팀은 Raspberry Pi 4를 스마트 홈 서버로 사용하는 것을 권장합니다. **하지만 PC에서 모든 것을 설정하는 것도 가능합니다.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (최소 2GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD 카드 16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee 어댑터(옵션) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee 스마트 기기(옵션) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>설치용 데스크탑</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. 사전 요구 사항 설치

Robonomics Docker에는 다음이 포함되어 있습니다:
- Home Assistant
- IPFS
- MQTT 브로커 및 통합
- Zigbee2MQTT
- libp2p 프록시
- Robonomics 통합

이 문서에서는 Ubuntu 시스템에서의 설치 과정을 보여줍니다. 먼저 다음 패키지를 설치해야 합니다:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

그런 다음 PC에 Docker를 설치해야 합니다. 설치 지침은 [공식 웹사이트](https://docs.docker.com/engine/install/)에서 찾을 수 있습니다.

<robo-wiki-note type="warning" title="중요 정보">

  Docker 컨테이너를 루트 권한 없이 시작하려면 사용자를 docker 그룹에 추가해야 합니다. [여기에서 지침을 찾을 수 있습니다](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

## 2. 구성

GitHub 저장소를 다운로드하고 내부로 이동합니다:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

그런 다음 `template.env`에서 `.env` 파일을 만듭니다:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

그 후 `.env` 파일을 열고 다음과 같은 기본값을 편집할 수 있습니다:
- 패키지 버전
- 모든 구성 폴더가 저장될 리포지토리 경로
- ["tz 데이터베이스 이름"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)에 대한 시간대.

## 3. 시작

bash 스크립트를 실행하고 필요한 모든 패키지가 설치될 때까지 기다립니다:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

스크립트는 이전 단계에서 완료한 모든 필수 작업을 확인하고, 문제가 있으면 오류를 표시합니다.

설치 과정 중 다음과 같은 상황이 발생할 수 있습니다:
- Zigbee 코디네이터를 사용하지 않기로 결정하면 설치를 계속할지 확인하는 대화형 라인이 표시됩니다:

{% codeHelper %}

```
이 스크립트는 모든 필요한 리포지토리를 생성하고 Docker 컨테이너를 시작합니다
Zigbee 코디네이터 위치를 찾을 수 없습니다. 삽입하고 스크립트를 다시 실행하십시오. 디렉토리 /dev/serial/by-id/가 존재하지 않습니다
Zigbee 코디네이터를 사용하지 않으려면 계속 진행하겠습니까? Zigbee2MQTT 컨테이너가 시작되지 않습니다.
계속 진행하시겠습니까? (y/n)
```

{% endcodeHelper %}


- PC에 여러 시리얼 포트를 사용하는 장치가 있는 경우, 스크립트는 어떤 장치를 사용할지 묻습니다:

{% codeHelper %}

```
이 스크립트는 모든 필요한 리포지토리를 생성하고 Docker 컨테이너를 시작합니다
Zigbee 코디네이터가 설치되어 있습니다
연결된 장치가 여러 개 있습니다. 하나를 선택하십시오
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

이상입니다. 다음 문서로 계속하세요.