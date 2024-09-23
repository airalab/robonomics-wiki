---
title: 백업 서비스

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**이 문서에서는 Home Assistant 구성의 백업을 생성하고 필요할 때 복원하는 방법을 배우게 됩니다. 백업을 생성하기 위해 구성 파일을 포함하는 안전한 아카이브를 생성하는 서비스를 호출합니다. 또한 서비스는 존재하는 경우 Mosquitto 브로커 및 Zigbee2MQTT 구성을 백업에 추가합니다. 그런 다음 이 서비스는 아카이브를 IPFS에 추가하고 결과 CID를 Robonomics Digital Twin에 저장합니다.**
## Home Assistant 구성 백업 생성

백업을 생성하면 장애 발생 시 Home Assistant 구성을 쉽게 복원할 수 있습니다.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "주의"}%}구성을 백업하고 복원하려면 Pinata와 같은 **사용자 정의 IPFS 게이트웨이**를 사용해야 합니다. 그렇지 않으면 백업이 로컬 IPFS 노드에만 저장되어 로컬 노드 장애 시 Home Assistant 구성을 복원하는 데 어려움이 있을 수 있습니다.
{% endroboWikiNote %}

1. Home Assistant의 웹 인터페이스에서 `개발자 도구` -> `서비스`로 이동합니다. `Robonomics: Save Backup to Robonomics`를 검색하고 `CALL SERVICE`를 누릅니다.

2. `알림`에서 `Backup was updated in Robonomics` 알림이 표시될 때까지 기다립니다.


{% roboWikiNote {type: "warning", title: "주의"}%} Home Assistant 및 Robonomics 통합을 로드한 후 즉시 백업을 생성하거나 구성을 복원하려고 하지 마십시오. 초기 설정이 완료되도록 **약 5분 정도 기다려주십시오**. {% endroboWikiNote %}

서비스 인수:
- **전체 백업** (기본값: False) - 데이터베이스를 백업에 추가하여 엔티티 상태의 이력도 저장됩니다.
- **모스키토 비밀번호 파일 경로** (기본값: `/etc/mosquitto`) - 홈 어시스턴트 코어 또는 도커 설치 방법을 사용하고 Mosquitto 브로커의 기본 경로가 없는 경우, 이 매개 변수를 변경해야 합니다. *홈 어시스턴트 OS 또는 슈퍼바이저에는 필요하지 않음*.

## 백업에서 홈 어시스턴트 구성 복원

구성을 복원하려면 설치된 홈 어시스턴트와 Robonomics 통합이 필요합니다.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}홈 어시스턴트 코어 및 도커 설치 방법에서 구성을 성공적으로 복원하려면 페이지 맨 아래에 설명된 추가 설정 단계를 수행해야 합니다.
{% endroboWikiNote %}

1. Robonomics 통합이 설치되어 있지 않은 경우 [원하는 설치 방법](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home)에 따라 Robonomics 통합이 설치된 홈 어시스턴트를 설치합니다.

2. 이전 Robonomics 구성에서 사용한 **동일한 시드**를 사용하여 [Robonomics 통합 설정](https://wiki.robonomics.network/docs/robonomics-hass-integration)을 설정합니다. 구독이 만료된 경우 [재활성화](https://wiki.robonomics.network/docs/sub-activate)합니다.

3. 홈 어시스턴트의 웹 인터페이스에서 `개발자 도구` -> `서비스`로 이동합니다. `Robonomics: Robonomics에서 백업 복원`을 검색하고 `CALL SERVICE`를 누릅니다. 백업 상태를 확인하려면 `개요` 페이지로 이동합니다.

4. 복원 후 홈 어시스턴트가 자동으로 다시 시작됩니다. 홈 어시스턴트가 어떤 이유로든 다시 시작되지 않는 경우 `robonomics.backup` 엔티티의 상태를 모니터링하여 복원 상태를 확인할 수 있습니다. 상태가 `restored`인 경우 `설정` > `시스템`으로 이동하여 오른쪽 상단에 있는 `RESTART` 버튼을 클릭하여 홈 어시스턴트를 수동으로 다시 시작해야 합니다.

5. 백업에 Zigbee2MQTT 또는 Mosquitto 구성이 포함된 경우, 새 구성을 활성화하려면 이러한 서비스를 다시 시작해야 합니다. 이를 위해 가능합니다.수동으로 서비스를 개별적으로 다시 시작하거나 Home Assistant 컴퓨터를 단순히 다시 시작하여 모든 서비스가 다시 시작되도록 할 수 있습니다.

서비스 인수:
- **Mosquitto 비밀번호 파일 경로** (기본값: `/etc/mosquitto`) - Home Assistant Core 또는 Docker 설치 방법을 사용하고 Mosquitto 브로커의 기본 경로가 아닌 경우 이 매개변수를 변경해야 합니다. *Home Assistant OS 또는 Superviser에는 필요하지 않음*.
- **Zigbee2MQTT 구성 파일 경로** (기본값: `/opt/zigbee2mqtt`) - Home Assistant Core 또는 Docker 설치 방법을 사용하고 Zigbee2MQTT의 기본 경로가 아닌 경우 이 매개변수를 변경해야 합니다. *Home Assistant OS 또는 Superviser에는 필요하지 않음*.

## Home Assistant Core 설치 방법을 위한 Mosquitto 및 Zigbee2MQTT 구성 복원

백업에 Mosquitto 또는 Zigbee2MQTT 구성이 포함되어 있는 경우 복원 프로세스 중에 해당 구성은 기본 경로에 또는 인수로 지정된 경로에 배치됩니다. 그러나 기존 Home Assistant Core에 Robonomics 통합을 설치한 경우 *(Robonomics 이미지가 아닌 경우)* `homeassistant` 사용자가 이 경로에 액세스할 수 없을 수 있습니다.

따라서 Mosquitto 및 Zigbee2MQTT 구성을 복원하려면 사용자 `homeassistant`에 필요한 읽기 권한을 부여해야 합니다:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Home Assistant Docker 설치 방법을 위한 Mosquitto 및 Zigbee2MQTT 구성 백업

Docker 컨테이너에서 Mosquitto 및 Zigbee2MQTT 구성을 백업하려면 각각의 구성을 위한 볼륨을 생성해야 합니다. 이를 위해 Home Assistant 컨테이너를 추가 인수와 함께 실행하여 이를 달성할 수 있습니다:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

또는 `compose.yaml` 파일에서 변경을 가할 수 있습니다:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"참고"}%}기본 Mosquitto 및 Zigbee2MQTT 구성 경로는 각각 `/etc/mosquitto` 및 `/opt/zigbee2mqtt`입니다. 그러나 이러한 경로는 특정 설정에 따라 다를 수 있습니다.
{% endroboWikiNote %}

## 백업 버튼

백업을 처리하는 서비스를 사용하는 것 외에도 Robonomics 통합에서 `button.create_backup` 및 `button.restore_from_backup` 버튼을 사용하여 프로세스를 간소화할 수 있습니다. 이 버튼들은 각각 기본 매개변수로 해당 서비스를 호출합니다 (백업 버튼은 히스토리 없이 백업을 생성합니다).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

대시보드에 버튼을 추가하려면 다음 단계를 따르세요:

1. 대시보드 오른쪽 상단의 세 개의 점을 클릭합니다.
2. `대시보드 편집`을 선택합니다.
3. 화면 오른쪽 하단의 `카드 추가` 버튼을 클릭합니다.
4. `Entities` 카드를 선택합니다.
5. `Entities` 필드에서 button.create_backup 및 button.restore_from_backup 엔티티를 검색합니다.
6. 엔티티를 카드에 추가하려면 `저장`을 누릅니다.
7. 대시보드 편집을 완료하려면 화면 오른쪽 상단의 `완료` 버튼을 클릭합니다.