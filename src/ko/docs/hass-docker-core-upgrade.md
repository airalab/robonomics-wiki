---
title: 홈 어시스턴트 도커 또는 코어를 Unix류 OS로 업그레이드하세요
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**이 문서에는 Robonomics 통합을 사용하여 기존 홈 어시스턴트 도커 또는 코어(Unix류 OS)를 업그레이드하는 지침이 포함되어 있습니다.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"DISCLAIMER", type: "warning"}%}
  1. Docker가 올바르게 설치되었다고 가정합니다.
  2. 홈 어시스턴트 또는 홈 어시스턴트 코어의 기본 Docker 이미지와 컨테이너를 사용한다고 가정합니다.
  3. IPFS 및 Libp2p-ws-proxy가 Docker 컨테이너로 설치될 것입니다.
{% endroboWikiNote %}


## 설치

설치 스크립트를 다운로드하고 터미널에서 실행하세요:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Docker가 올바르게 설치되었는지 확인합니다. 그런 다음 IPFS를 찾아보고 IPFS가 설치되었는지 확인합니다. IPFS가 발견되지 않으면 스크립트가 IPFS와 Libp2p-ws Proxy를 모두 설치하도록 제안합니다. 다음 출력이 표시됩니다:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker installed
$User belongs to the docker group.
Checking if IPFS installed... It may take few minutes. Please wait
<...>
 ✔ Container ipfs-daemon      Started
 ✔ Container lipb2p-ws-proxy  Started
All set up!
``` install_integration_core.sh
```

{% endcodeHelper %}

IPFS가 이미 설치된 경우 다음 출력이 표시됩니다:
```shell
Docker installed
$User belongs to the docker group.
Checking if IPFS installed... It may take few minutes. Please wait
IPFS instance has been found. Make sure that your configuration is set up properly with the following settings:
      - 'Gateway': '/ip4/0.0.0.0/tcp/8080'
      - Ports 4001, 5001, and 8080 are available.
      Also, add the following bootstrap nodes:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Is your config set up properly? [yes/No]:

```
이 경우 IPFS 구성 파일을 조정하고 확인해야 합니다.

{% roboWikiNote {title:"주의!", type: "warning"}%} IPFS의 적절한 구성은 중요합니다. 이 단계를 건너뛰지 마세요!{% endroboWikiNote %}

## Robonomics 통합 다운로드

통합을 설치하기 위해 [HACS](https://hacs.xyz/)를 사용할 것입니다. 홈 어시스턴트에 HACS가 아직 설치되지 않은 경우 먼저 [설치](https://hacs.xyz/docs/setup/download/)해야 합니다.

다음으로 홈 어시스턴트에서 HACS로 이동하여 `Robonomics`를 검색하세요:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

열고 오른쪽 하단의 `다운로드`를 클릭하세요. 리포지토리 다운로드에는 시간이 소요될 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

이것으로 끝났습니다. 다음 문서로 계속하세요.