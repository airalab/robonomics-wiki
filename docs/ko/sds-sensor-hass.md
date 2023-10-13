---
title: 홈 어시스턴트에 SDS011 센서를 추가하는 방법

contributors: [tubleronchik]
---

이 문서에서는 SDS 공기 품질 센서를 [Luftdaten](https://github.com/opendata-stuttgart/sensors-software) 및 [Robonomics](https://github.com/airalab/sensors-software) 펌웨어와 홈 어시스턴트에 연결하는 방법을 설명합니다.

## 설치 
두 가지 설치 옵션이 있습니다.

### 옵션 1: HACS

로컬 Luftdaten 센서를 추가하는 가장 쉬운 방법은 HACS를 통해 설치하는 것입니다. [여기](https://hacs.xyz/docs/setup/download/)에서 HACS를 설정하는 방법에 대한 간단한 설명을 찾을 수 있습니다.

HACS가 설치되면 HACS -> 통합으로 이동하여 `Local Luftdaten Sensor` 통합을 검색합니다. 다운로드 버튼을 클릭하고 통합이 다운로드된 후 Home Assistant를 다시 시작합니다.
<robo-wiki-picture src="sds-hacs.png"/>

### 옵션 2: 수동 설치

homeassistant 사용자로 프로젝트 저장소를 복제합니다.

<code-helper copy>

  ```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
  ```
</code-helper>

이미 사용자 정의 통합이 있는 경우 `custom_components/local_luftdaten/`를 `custom_components` 디렉토리로 복사합니다. 예를 들어,

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
  ```
</code-helper>
사용자 정의 통합이 없는 경우 전체 `custom_components` 디렉토리를 Home Assistant 구성 디렉토리로 복사합니다. 예를 들어,

<code-helper copy>

  ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
  ```
</code-helper>

## 구성

`configuration.yaml`에 새로운 센서 항목을 만들고 호스트 이름 또는 IP 주소를 조정합니다. 센서의 로컬 IP 주소를 찾으려면 [Fing 모바일 앱](https://www.fing.com/products) 또는 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용할 수 있습니다. 이름은 아무거나 지정할 수 있습니다.

|Parameter              |Type    | Necessity    | Description
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | required     | IP address of the sensor
|`scan_interval`        | number | default: 180 | Frequency (in seconds) between updates
|`name`                 | string | required     | Name of the sensor
|`monitored_conditions` | list   | required     | List of the monitored sensors

<code-helper copy>

  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: Air quality sensor
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```
</code-helper>

> 지원되는 모든 센서 록은 [저장소](https://github.com/lichtteil/local_luftdaten)에서 찾을 수 있습니다.

홈 어시스턴트를 다시 시작합니다.
그 후 대시보드에 센서를 추가할 수 있습니다. 엔티티의 이름은 `configuration.yaml`에 추가한 이름이 됩니다.
<robo-wiki-picture src="sds-configuration-card.png"/>