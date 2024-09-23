---
title: SDS011 센서 연결 방법

contributors: [tubleronchik]
---

**다음은 센서를 Robonomics 센서 네트워크 및 홈 어시스턴트에 연결하는 방법에 대한 단계별 안내서입니다. 저희 센서는 Robonomics 펌웨어를 사용하며, 이는 sensor.community 펌웨어의 향상된 버전입니다. 추가 센서를 포함하고 있으며 수정된 데이터 전송 메커니즘을 갖추고 있습니다.**

{% roboWikiNote {type: "warning"}%} Robonomics의 모든 장치는 공식 [웹사이트](https://robonomics.network/devices/)에서 구매할 수 있습니다.
{% endroboWikiNote %}


## 설정

1. 센서를 전원에 연결합니다.
2. 보드는 `RobonomicsSensor-xxxxxxxxx`라는 Wi-Fi 네트워크를 생성합니다. 핸드폰이나 컴퓨터에서 해당 네트워크에 연결합니다. 인증 창이 표시됩니다(표시되지 않으면 브라우저를 열고 `192.168.4.1`로 이동합니다).
3. 목록에서 Wi-Fi 네트워크를 선택하고 암호를 입력합니다(목록에 없는 경우 직접 입력합니다).
{% roboWikiNote {type: "warning", title: "INFO"}%} 센서는 2.4GHz Wi-Fi 네트워크에만 연결할 수 있습니다. {% endroboWikiNote %}
{% roboWikiPicture {src:"docs/sds-sensor-wifi.png", alt:"sds-sensor-wifi"} %}{% endroboWikiPicture %}
4. 센서를 설치할 장소의 좌표를 입력합니다. 지도에서 얻거나 [이 링크](https://www.latlong.net/convert-address-to-lat-long.html)를 사용하여 주소에서 얻을 수 있습니다.
{% roboWikiNote {type: "warning", title: "WARNING"}%} 센서 좌표는 공개적으로 사용 가능한 지도에 표시됩니다. 개인 정보를 공개하고 싶지 않다면 정확하지 않게 입력하세요.
{% endroboWikiNote %}
5. `구성 저장 및 재시작`을 클릭합니다. 보드가 재부팅되고 지정된 Wi-Fi 네트워크에 연결됩니다.
6. [Robonomics 센서 지도](https://sensors.robonomics.network/#/)를 열고 센서를 설치한 장소를 찾습니다. 몇 분 후 지도에서 데이터와 함께 센서를 확인할 수 있습니다.
{% roboWikiPicture {src:"docs/sds-sensor-map.png", alt:"sds-sensor-map"} %}ensor-map"} %}{% endroboWikiPicture %}

## 홈 어시스턴트

두 가지 설치 옵션이 있습니다:

### 옵션 1: HACS

로컬 Luftdaten 센서를 추가하는 가장 쉬운 방법은 HACS를 통해 설치하는 것입니다. [여기](https://hacs.xyz/docs/setup/download/)에서 HACS 설정 방법에 대한 간단한 설명을 찾을 수 있습니다.

HACS를 설치한 후에는 HACS -> 통합으로 이동하여 `Local Luftdaten Sensor` 통합을 검색합니다. 다운로드 버튼을 클릭하고 통합이 다운로드되면 Home Assistant를 다시 시작하십시오.
{% roboWikiPicture {src:"docs/sds-hacs.png", alt:"sds-hacs"} %}{% endroboWikiPicture %}

### 옵션 2: 수동 설치

`homeassistant` 사용자로 프로젝트 저장소를 복제합니다:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/lichtteil/local_luftdaten.git
```

{% endcodeHelper %}

</code-helper>

이미 사용자 정의 통합이 있는 경우 `custom_components/local_luftdaten/`를 `custom_components` 디렉토리로 복사합니다. 예를 들어:

{% codeHelper { copy: true}%}

```
cd local_luftdaten
mv custom_components/local_luftdaten ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

사용자 정의 통합이 없는 경우 전체 `custom_components` 디렉토리를 Home Assistant 구성 디렉토리로 복사합니다. 예를 들어:

{% codeHelper { copy: true}%}

 ```
  cd local_luftdaten
  mv custom_components/ ~/.homeassistant/
```

{% endcodeHelper %}

## 구성

`configuration.yaml`에 새로운 센서 항목을 만들고 호스트 이름 또는 IP 주소를 조정합니다. 센서의 로컬 IP 주소를 찾으려면 [Fing 모바일 앱](https://www.fing.com/products) 또는 [nmap CLI 도구](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)를 사용할 수 있습니다. 이름은 아무 것이나 사용할 수 있습니다.

|매개변수              |유형    | 필수 여부    | 설명
|:----------------------|:-------|:------------ |:------------
|`host`                 | string | 필수     | 센서의 IP 주소
|`scan_interval`        | number | 기본값: 180 | 업데이트 사이의 빈도 (초 단위)
|`name`                 | string | 필수    | 센서 이름
|`monitored_conditions` | 목록   | 필수     | 모니터링하는 센서 목록


{% codeHelper { copy: true}%}


  ```yaml
  sensor:
    - platform: local_luftdaten
      host: 192.168.0.100
      scan_interval: 150
      name: 대기질 센서
      monitored_conditions:
        - SDS_P1
        - SDS_P2
        - HTU21D_temperature
        - HTU21D_humidity
        - signal
  ```

{% endcodeHelper %}

> 모든 지원되는 센서 목록은 [저장소](https://github.com/lichtteil/local_luftdaten)에서 확인할 수 있습니다.

홈 어시스턴트를 다시 시작하십시오.
그 후에 대시보드에 센서를 추가할 수 있습니다. 엔티티의 이름은 `configuration.yaml`에 추가한 이름이 될 것입니다.

{% roboWikiPicture {src:"docs/sds-configuration-card.png", alt:"sds-configuration-car"} %}{% endroboWikiPicture %}