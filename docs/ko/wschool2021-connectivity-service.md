---
title: 5과, 연결성
locale: 'ko' 
contributors: [vourhey, arinaml]
translated: true
---

## 다중 파이로 IOT

* 장치 소프트웨어
    * FreeRTOS
    * ESP/Arduino
    * 싱글 보드 컴퓨터 (RPi, LattePanda 등)
* 연결성
    * IoT Hub
    * IoT 매니저
* 분석 서비스
    * AWS
    * Google Cloud IoT Core
    * ThingsBoard

일반적으로 대부분은 센서와 서버에 관심이 없지만 데이터 분석에 관심이 있습니다.
이를 얻으려면 사용할 장치, 작업 방법 및 연결할 위치를 결정해야합니다.

## 장치 소프트웨어

가정용 기상 관측소의 예를 고려하십시오. 대기 오염 (SDS011), 온도 및 습도 (BME)에 대한 데이터 수집이 필요합니다. ESP8266 마이크로 컨트롤러는이 작업을 처리 할 수 있습니다.

요구 사항 :

* 올바르게 센서로부터 데이터를 받기
* 고유 식별자가 있슴
* 알려진 서버로 데이터 전송
* 데이터의 디지털 서명 제공 (선택 사항)

[여기에서](https://github.com/LoSk-p/sensors-software/tree/366b19bf447a5fc19220ef89eab0f2440f8db1c2) 현재 펌웨어를 찾을 수 있습니다.

## 연결성이 무엇인가?

IoT 세계에서 연결이란 다양한 IoT 장치를 인터넷에 연결하여 데이터를 전송하거나 장치를 제어하는 것을 말합니다.

잘 알려진 아키텍처 솔루션은 크게 세 그룹으로 나눌 수 있습니다.

* 분산전산망. 예를 들어, 장치는 메시 네트워크로 연결됩니다. 높은 하드웨어 요구 사항으로 인해 광역 네트워크에 적합하지 않습니다
* 집중형망.예 : AWS. 단일 진입 점 및 연결 용이성을 제공하지만 서버 문제 발생시 장애 위험이 높습니다.
* 하이브리드. 예를 들어, [Robonomics 연결성](https://github.com/airalab/sensors-connectivity) "로컬"네트워크에있는 장치에 대한 주소를 제공하고 분산 된 IPFS 메시지 채널에 데이터를 게시합니다. 

## AWS와 Robonomics 연결성의 비교

| 관리 서비스              | AWS                                  |               Robonomics              	|
|---------------------	|-----------------------------------	|---------------------------------------	|
| 거래 유형               | 기술                                  | 기술 및 경제                             	 |
| 보안                   | IT 회사 클라우드 제어                    | Polkadot 및 Ethereum                     |
| 프로토콜            	 | HTTPS, MQTT                       	 | IPFS, Robonomics                        |
| 생태계             	  | 개인                           	    | 공유                                	   |
| DeFi에  액세스          | 없음                                	| 있음                                   	|
| 소송 비용               | 데이터 푸시-센서 당 $ 1-2                 | 데이터 푸시-$ 0                            |
|                     	| Shadow-월 $ 10                        | 디지털 트윈-거래 당 $ 0,01                  |

## 연결성 ON AIRA 설치하기

https://www.youtube.com/watch?v=JbBNMHAzJKM

### 요구 사항

* [VirtualBox 6.1 이상](https://www.virtualbox.org/wiki/Downloads) and above
* [Aira OS ova 이미지](https://static.aira.life/ova/airaos-21.03_robonomics-winter-school.ova)

[여기에](/docs/aira-installation-on-vb/)설명 된대로 VirtualBox에서 Aira 이미지 가져 오기

[SSH](/docs/aira-connecting-via-ssh/)를 통한 연결 설정 

모든 것이 설정되고 SSH를 통해 성공적으로 로그인되면 메인 패키지를 복제하고 빌드 해 보겠습니다.

```
git clone https://github.com/airalab/sensors-connectivity
cd sensors-connectivity
git checkout v0.9
nix build -f release.nix
```

이제 나중에 사용할 수 있도록 기본 구성 파일의 복사본을 만들어 보겠습니다.
모든 옵션에 대해 알아 보려면[이 기사를](/docs/configuration-options-description/)확인하십시오.
그런 다음 `roslaunch`로 패키지를 시작합니다.

```
cp config/default.json config/my.json
source result/setup.zsh
roslaunch sensors_connectivity agent.launch config:=$PWD/config/my.json
```

## 센서를 연결성에 연결

https://www.youtube.com/watch?v=yxqxBk-6bpI

### 요구 사항

* [Nova SDS011 센서1](https://aqicn.org/sensor/sds011) sensor 
* [Yarn 패키지 매니저](https://yarnpkg.com/getting-started/install)

이제 실제 센서를 연결하고 USB 포트를 가상 머신에 전달하고지도를 설정하고 자체 측정을 살펴 보겠습니다

먼저 Aira OS가 실행 중이면 중지하고 해당 USB 장치를 추가하십시오

![VB USB Forwarding](../images/vb_forward_usb.jpg)

VM을 시작하고 SSH를 통해 연결 한 다음 VM의 USB 장치에 따라 `comstation/port` 옵션을 설정합니다. 또한 `comstation`을 활성화하고 위도와 경도를 설정하십시오. 결국 `config/my.json`은 다음과 같아야합니다.

```
{
   "general":{
      "publish_interval":30
   },
   "comstation":{
      "enable":true,
      "port":"/dev/ttyUSB0",
      "work_period":0,
      "geo":"59.944917,30.294558",
      "public_key":""
   },
   "httpstation":{
      "enable":false,
      "port":8001
   },
   "mqttstation": {
      "enable": false,
      "host": "connectivity.robonomics.network",
      "port": 1883
   },
   "luftdaten":{
      "enable":false
   },
   "robonomics":{
      "enable":true,
      "ipfs_provider":"/ip4/127.0.0.1/tcp/5001/http",
      "ipfs_topic":"airalab.lighthouse.5.robonomics.eth"
   },
   "datalog":{
      "enable":false,
      "path":"",
      "suri":"",
      "remote":"wss://substrate.ipci.io",
      "dump_interval":3600,
      "temporal_username":"",
      "temporal_password":""
   },
   "dev":{
      "sentry":""
   }
}
```

> 실제 센서가없는 경우 `sensors-connectivity/utils/virtual-sensor.py` 스크립트를 사용하여 하나를 에뮬레이션 할 수 있습니다
> 
> 구성 파일을 다음과 같이 변경하여 `HTTPStation`을 활성화하고 `COMStation`을 비활성화합니다 :
> ```
> {
>    "general":{
>       "publish_interval":30
>    },
>    "comstation":{
>       "enable":false,
>       "port":"/dev/ttyUSB0",
>       "work_period":0,
>       "geo":"59.944917,30.294558",
>       "public_key":""
>    },
>    "httpstation":{
>       "enable":true,
>       "port":8001
>    },
>    ...
> }
> ```
>
> VM의 전용 터미널에서 `utils/virtual-sensor.py` 실행

파일을 저장하고`sensors-connectivity` 폴더에서 연결을 시작합니다.

```
source result/setup.zsh
roslaunch sensors_connectivity agent.launch config:=$PWD/config/my.json
```

콘솔 출력에 첫 번째 측정이 표시되어야합니다.

VM에서 IPFS ID를 찾으십시오. 이미지를 부팅 한 직후 또는 `ipfs id` 명령을 통해 나타납니다. 나중에 필요합니다.

이제 맵의 자체 인스턴스를 설정하겠습니다. VM이 아닌 노트북에서이 [저장소를 복제하고](https://github.com/airalab/sensors.robonomics.network) 앱을 빌드합니다.

```
git clone https://github.com/airalab/sensors.robonomics.network
cd sensors.robonomics.network
yarn install
```

`src/agents.json` 파일을 편집하고 IPFS ID를 입력하십시오. 예를 들면

```
[
  "12D3KooWSCFAD3Lpew1HijniE6oFTuo4jsMwHzF87wNnXkpCRYWn"
]
```

map 시작 :

```
yarn serve
```

[http://localhost:8080/](http://localhost:8080/) 또는 yarn이 제공한 주소로 이동하여 센서를 찾으십시오. 

## 연습

### Trajectory 1. 플래시 센서 ESP + SDS011

요구 사항 :

* ESP8266
* 센서 SDS011, BME280, HTU21D 중 하나 이상

[지침을](https://wiki.robonomics.network/docs/connect-sensor-to-robonomics/) 사용하여 센서를 Robonomics Connectivity에 연결합니다.  

센서가 [매프에 ](https://sensors.robonomics.network/#/)나타나는지 확인하십시오.

### Trajectory 2. 연결성 시작

요구 사항 :

* ROS
* Python
* Nix (선택 과목)

[센서 연결 구축 및 실행](https://github.com/airalab/sensors-connectivity#get-a-package-and-build)

> 빌드, [설치](https://wiki.robonomics.network/docs/iot-sensors-connectivity/) 및 [구성하](https://wiki.robonomics.network/docs/configuration-options-description/)는 방법. 

패키지의 일반 계획 :

```
    station1 \                        / feeder1
    station2 -  sensors-connectivity  - feeder2
    station3 /                        \ feeder3
```

예를 들어 난수 생성기와 같은 새로운 스테이션을 구현하거나, 예를 들어 화면에 문자열을 표시하는 새 피더를 구현하기 위해 선택이 제안됩니다.

`IStation` 인터페이스 [여기](https://github.com/airalab/sensors-connectivity/blob/master/src/stations/istation.py#L73).

`IFeeder` 인터페이스 [여기](https://github.com/airalab/sensors-connectivity/blob/master/src/feeders/ifeeder.py#L5)