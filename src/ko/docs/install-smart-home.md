---
title: 스마트 홈 설치
contributors: [nakata5321, PaTara43]
tools:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**홈 어시스턴트와 로보노믹스 통합 설치 안내서에 오신 것을 환영합니다. 홈 어시스턴트는 오픈 소스 홈 자동화 시스템으로, 가정 네트워크의 스마트 기기를 제어하는 중앙 허브를 제공합니다. 로보노믹스와 통합함으로써 탈중앙화된 클라우드 서비스를 제공하여 스마트 홈의 기능과 보안을 향상시킬 수 있습니다. 본 문서에서는 홈 어시스턴트와 로보노믹스를 설치하는 방법에 대한 단계별 지침을 제공하여 안전하고 탈중앙화된 솔루션을 사용하여 가정의 다양한 측면을 자동화하고 제어할 수 있는 능력을 제공합니다. 시작해 봅시다!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## 데모

여기스마트 홈 및 로보노믹스 통합 설치의 완벽한 예시입니다. 인터넷 연결에 따라 소요 시간이 다를 수 있습니다.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 설치에 필요한 하드웨어

스마트 홈 설정에 Home Assistant를 아직 통합하지 않았다면, 처음부터 완전한 스마트 홈 시스템을 구축하는 데 필요한 장비를 인지하는 것이 중요합니다. 로보노믹스 팀은 Raspberry Pi 4를 스마트 홈 서버로 사용하는 것을 권장합니다.


{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (최소 2GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD 카드16GB</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
    {% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
     <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> 지그비 스마트 장치(옵션) </b> </a>  {% endroboWikiGrid %}
    {% roboWikiGrid %}     {% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
    <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> 지그비 어댑터(옵션) </b> </a>  {% endroboWikiGrid %}
    
{% endroboWikiGridWrapper %}


## 1. 사전 요구 사항 설치


{% roboWikiNote {type: "warning", title: "중요 정보" }%} 이 모든 단계는 우분투 시스템을 사용하는 Raspberry Pi 4에서 수행되어야 합니다. {% endroboWikiNote %}

Robonomics Docker에는 다음이 포함되어 있습니다:
- 홈 어시스턴트
- IPFS
- MQTT 브로커 및 통합- Zigbee2MQTT
- libp2p 프록시
- Robonomics 통합

먼저 다음 패키지를 설치해야 합니다:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

그런 다음 Raspberry Pi 4에 Docker를 설치해야 합니다. 설치 지침은 [공식 웹사이트](https://docs.docker.com/engine/install/)에서 찾을 수 있습니다.

{% roboWikiNote {type: "warning", title: "중요 정보"}%} 도커 그룹에 사용자를 추가하여 루트 권한 없이 도커 컨테이너를 시작할 수 있습니다. [여기에서 지침을 찾을 수 있습니다](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

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
cp template.env .env
```

{% endcodeHelper %}

그 후 `.env` 파일을 열고 다음과 같은 기본값을 편집할 수 있습니다:
- 모든 구성 폴더가 저장될 리포지토리 경로.
- ["tz 데이터베이스 이름"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. 시작

bash 스크립트를 실행하고 필요한 모든 패키지가 설치될 때까지 기다립니다:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

스크립트는 이전 단계에서 완료된 모든 필수 작업을 확인하고, 잘못된 부분이 있으면 오류 메시지를 표시합니다.

설치 과정 중 다음과 같은 상황이 발생할 수 있습니다:
- Zigbee 코디네이터를 사용하지 않기로 결정한 경우, 설치를 계속할지 확인하는 대화 상자가 표시됩니다:

{% codeHelper %}

```
이 스크립트는 모든 필요한 저장소를 생성하고 도커 컨테이너를 시작합니다.
Zigbee 코디네이터 위치를 찾을 수 없습니다. 삽입하고 스크립트를 다시 실행하십시오. 디렉토리 /dev/serial/by-id/가 존재하지 않습니다.
Zigbee 코디네이터를 사용하지 않으려면 계속 진행하시겠습니까? Zigbee2MQTT 컨테이너가 시작되지 않습니다.
계속 진행하시겠습니까? (Y/n)
```

{% endcodeHelper %}


- Raspberry Pi 4에 시리얼 포트를 사용하는 여러 장치가 있는 경우, 스크립트에서 어떤 장치를 사용할지 물어봅니다:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## 설치 후

모든 것이 시작된 후에는 `update.sh` 스크립트를 사용하여 Docker 패키지의 버전을 업데이트할 수 있습니다:
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
이 스크립트는 새 버전을 다운로드하고 이전 버전의 패키지를 삭제하며 모든 것을 자동으로 다시 시작하여 모든 구성을 저장합니다.

모든 것을 중지하려면 `stop.sh` 스크립트를 사용하십시오:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}

여기까지입니다. 다음 문서로 계속하세요.