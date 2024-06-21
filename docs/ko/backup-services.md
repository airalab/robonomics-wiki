---
title: 백업 서비스

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**이 문서에서는 Home Assistant 구성의 백업을 생성하고 필요할 때 복원하는 방법을 배우게 됩니다. 백업을 생성하기 위해 구성 파일이 포함된 안전한 아카이브를 생성하는 서비스를 호출합니다. 또한 서비스는 Mosquitto 브로커와 Zigbee2MQTT 구성도 백업에 추가합니다(있는 경우). 그런 다음이 서비스는 아카이브를 IPFS에 추가하고 결과 CID를 Robonomics Digital Twin에 저장합니다.**
## Home Assistant 구성의 백업 생성하기

백업을 생성하면 장애 발생 시 Home Assistant 구성을 쉽게 복원할 수 있습니다.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">

구성을 백업하고 복원하려면 **Pinata와 같은 사용자 정의 IPFS 게이트웨이**를 사용해야 합니다. 그렇지 않으면 백업은 로컬 IPFS 노드에만 저장되어 로컬 노드 장애 시 Home Assistant 구성을 복원할 수 없을 수 있습니다.

</robo-wiki-note>

1. Home Assistant의 웹 인터페이스에서 `Developer Tools` -> `Services`로 이동합니다. `Robonomics: Save Backup to Robonomics`를 검색하고 `CALL SERVICE`를 누릅니다.

2. `Notification`에 `Backup was updated in Robonomics`라는 알림이 표시될 때까지 기다립니다.

<robo-wiki-note type="warning" title="WARNING">

Home Assistant 및 Robonomics 통합을 로드 한 직후에는 즉시 백업을 생성하거나 구성을 복원하지 마십시오. 초기 설정이 완료되기까지 약 5 분 정도 기다려야합니다.

</robo-wiki-note>

서비스 인수:
- **전체 백업** (기본값: False) - 데이터베이스를 백업에 추가하여 엔티티 상태의 기록이 저장됩니다.
- **Mosquitto 비밀번호 파일 경로** (기본값: `/etc/mosquitto`) - Home Assistant Core 또는 Docker 설치 방법을 사용하고 기본 Mosquitto 브로커 경로가 없는 경우이 매개 변수를 변경해야합니다. *Home Assistant OS 또는 Superviser에는 필요하지 않음*.

## 백업에서 Home Assistant 구성 복원하기

구성을 복원하려면 설치된 Home Assistant 및 Robonomics 통합이 필요합니다. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">

Home Assistant Core 및 Docker 설치 방법에서 구성을 성공적으로 복원하려면 페이지 맨 아래에 설명 된 추가 설정 단계를 수행해야합니다.

</robo-wiki-note>

1. [원하는 설치 방법](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home)에 대한 기사에서 Home Assisntant와 Robonomics 통합을 설치합니다(아직 설치되지 않은 경우).

2. 이전 Robonomics 구성에서 사용한 **동일한 시드**를 사용하여 [Robonomics 통합 설정](https://wiki.robonomics.network/docs/robonomics-hass-integration)을 수행합니다. 구독이 종료된 경우 [재활성화](https://wiki.robonomics.network/docs/sub-activate)하세요.

3. Home Assistant의 웹 인터페이스에서 `Developer Tools` -> `Services`로 이동합니다. `Robonomics: Restore from the Backup in Robonomics`을 검색하고 'CALL SERVICE'를 누르세요. `Overview` 페이지로 이동하여 백업 상태를 확인하세요.

4. 복원 후, 홈 어시스턴트는 자으로 재시작됩니다. 홈 어시스턴트가 어떤 이유로 인해 재시작되지 않는 경우, `robonomics.backup` 엔티티의 상태를 모니터링하여 복원 상태를 확인할 수 있습니다. 상태가 `restored`인 경우, `Settings` > `System`으로 이동하여 오른쪽 상단에 있는 `RESTART` 버튼을 클릭하여 홈 어시스턴트를 수동으로 재시작해야 합니다.

5. 백업에 Zigbee2MQTT 또는 Mosquitto 구성이 포함된 경우, 새 구성을 활성화하기 위해 이러한 서비스를 재시작해야 합니다. 이를 수동으로 개별적으로 재시작하거나 홈 어시스턴트 컴퓨터 전체를 재시작하여 모든 서비스를 재시작할 수 있습니다.

서비스 인수:
- **Mosquitto 패스워드 파일 경로** (기본값: `/etc/mosquitto`) - Home Assistant Core 또는 Docker 설치 방법을 사용하고 Mosquitto 브로커의 기본 경로가 아닌 경우,이 매개 변수를 변경해야 합니다. *Home Assistant OS 또는 Superviser에는 필요하지 않음*.
- **Zigbee2MQTT 구성 파일 경로** (기본값: `/opt/zigbee2mqtt`) - Home Assistant Core 또는 Docker 설치 방법을 사용하고 Zigbee2MQTT의 기본 경로가 아닌 경우,이 매개 변수를 변경해야 합니다. *Home Assistant OS 또는 Superviser에는 필요하지 않음*.

## Home Assistant Core 치 방법을 위한 Mosquitto 및 Zigbee2MQTT 구성 복원

백업에 Mosquitto 또는 Zigbee2MQTT 구성이 포함된 경우, 복원 프로세스 중에 해당 구성이 기본 경로 또는 인수로 지정된 경로에 배치됩니다. 그러나 Robonomics 통합을 기존의 Home Assistant Core에 설치한 경우 *(미리 설치된 Robonomics 이미지가 아닌 경우)*, `homeassistant` 사용자가이 경로에 액세스 할 수 없을 수 있습니다.

따라서 Mosquitto 및 Zigbee2MQTT 구성을 복원하려면 사용자 `homeassistant`에 필요한 읽기 권한을 부여해야 합니다.
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Home Assistant Docker 설치 방법을 위한 Mosquitto 및 Zigbee2MQTT 구성 백업

Docker 컨테이너에서 Mosquitto 및 Zigbee2MQTT 구성을 백업하려면 각각의 구성을 위한 볼륨을 생성해야 합니다. 이는 Home Assistant 컨테이너를 추가 인수와 함께 실행하여 달성할 수 있습니다:

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

또는 `compose.yaml` 파일에서 변경을 수행할 수 있습니다:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

기본 Mosquitto 및 Zigbee2MQTT 구성 경로는 각각 `/etc/mosquitto` 및 `/opt/zigbee2mqtt`입니다. 그러나 이러한 경로는 특정 설정에 따라 다를 수 있습니다.

</robo-wiki-note>

## 백업 버튼

백업 작업을 위해 서비스를 사용하는 것 외에도 Robonomics 통합에서 `button.create_backup` 및 `button.restore_from_backup` 버튼을 사용하여 프로세스를 간소화할 수 있습니다. 이러한 버튼은 기본 매개 변수 (백업 버튼은 히스토리없이 백업을 생성함)으로 해당 서비스를 호출합니다.

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

대시보드에 버튼을 추가하려면 다음 단계를 따르십시오:

1. 대시보드의 오른쪽 상단에있는 세 개의 점을 클릭하십시오.
2. `Edit Dashboard`을 선택하십시오.
3. 오른쪽 하단에있는 `Add Card` 버튼을 클릭하십시오.
4. `Entities` 카드를 선택하십시오.
5. `Entities` 필드에서 button.create_backup 및 button.restore_from_backup 엔티티를 검색하십시오.
6. 엔티티를 카드에 추가하려면 `Save`을 누르십시오.
7. 완료를 위해 오른쪽 상단에있는 `Done` 버튼을 클릭하여 편집을 마칩니다.