---
title: 센서 연결

contributors: [LoSk-p, makyul]
---

작업 예시는 동영상에 있습니다:

https://youtu.be/jsaFCVAx2sA

## 요구 사항

* [Aqara 스마트 플러그](https://aqara.ru/product/aqara-smart-plug/?yclid=462434430312045270)
* 라즈베리 파이
* Zigbee 어댑터 [JetHome USB JetStick Z2](https://jhome.ru/catalog/parts/PCBA/293/) (또는 [지원되는](https://www.zigbee2mqtt.io/information/supported_adapters.html) 어댑터 중 하나)

서비스는 라즈베리 파이에서 실행되며 zigbee 프로토콜을 통해 스마트 플러그와 통신합니다.

## Zigbee 스틱

JetHome USB JetStick Z2를 가지고 있다면 이미 필요한 펌웨어가 있으므로 플래시 할 필요가 없습니다. 그러나 다른 어댑터를 가지고 있다면 먼저 zigbee2MQTT 소프트웨어로 플래시해야 합니다. 당신의 장치에 대한 지침은 [여기](https://www.zigbee2mqtt.io/information/supported_adapters.html)에서 찾을 수 있습니다.

어댑터를 연결하고 어댑터 주소를 확인하세요 (또는 `/dev/ttyUSB1`일 수도 있음):
```bash
$ ls -l /dev/ttyUSB0
crw-rw---- 1 root dialout 166, 0 May 16 19:15 /dev/ttyUSB0 
```

먼저 USB 포트에 액세스해야 할 수도 있습니다. 사용자를 `dialout` 그룹에 추가하세요 (ubuntu에서 작동하지만 다른 OS에서는 그룹 이름이 다를 수 있음).
ubuntu의 경우:
```bash
sudo usermod -a -G dialout $USER
```
arch의 경우:
```bash
sudo usermod -a -G uucp $USER
```
그런 다음 로그아웃하고 로그인하거나 컴퓨터를 다시 시작하세요.

## 설치

저장소를 복제하세요:

```
git clone https://github.com/makyul/robonomics-carbon-footprint.git
cd robonomics-carbon-footprint
```

## 구성

`data/configuration.yaml`로 이동하고 `permit_join: true`로 설정하세요:

```
# Home Assistant integration (MQTT discovery)
homeassistant: false

# allow new devices to join
permit_join: true

# MQTT settings
mqtt:
  # MQTT base topic for zigbee2mqtt MQTT messages
  base_topic: zigbee2mqtt
  # MQTT server URL
  server: 'mqtt://172.17.0.1'
  # MQTT server authentication, uncomment if required:
  # user: my_user
  # password: my_password

# Serial settings
serial:
  # Location of CC2531 USB sniffer
  port: /dev/ttyUSB0
```
또한 `server` 필드와 `port` 필드를 해당 정보로 채우고 연결을 설정할 수 있습니다. `server` 필드에서는 `docker0` 브리지의 IP를 사용하세요: 

```bash
$ ip a                                                 127
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

...

5: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 02:42:0d:ff:5f:a3 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:dff:feff:5fa3/64 scope link 
       valid_lft forever preferred_lft forever
```
여기에서 주소는 `172.17.0.1`입니다.

그런 다음 다음 정보를 포함하는 파일 config/config.yaml을 생성하고 위치를 설정하세요 (3자리 ISO 코드에 대한 정보는 https://countrycode.org/에서 찾을 수 있습니다):

```
location: RUS
service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
twin_id: 5
sending_timeout: 3600
broker_address: "172.17.0.1"
broker_port: 1883
```

## 플러그 연결

첫 실행:

```
docker-compose up     
```

플러그의 페어링 모드로 전환하려면 전원 버튼을 길게 눌러 파란색 빠르게 깜박이는 빛이 나타날 때까지 몇 초 동안 누르세요. 

로그에서 이제 플러그가 mqtt로 게시되기 시작한 것을 볼 수 있어야 합니다. 


## 페어링 후

다른 장치가 스틱과 페어링할 수 없도록 하려면 이제 `data/configuration.yaml`로 이동하고 `permit_join: false`로 설정하세요. 서비스를 다시 시작하세요 ('Ctrl+C'를 사용하여 변경  

```bash
docker-compose up     
```
사항을 제출한 후 다시 시작).

## 실행
플러그에 대한 계정이 처음 시작할 때 생성됩니다. 
> 이미 계정이 있는 경우 `config.config.yaml` 파일의 `device_seed` 섹션에 시드를 추가해야 합니다:
>
> ```
> location: RUS
> service_address: 4GdHeLbmio2noKCQM5mfxswXfPoW2PcbpYKKkM4NQiqSqJMd
> twin_id: 5
> sending_timeout: 3600
> broker_address: "172.17.0.1"
> broker_port: 1883
> device_seed: <device_seed>
>```

 계정을 생성한 후 로그에서 주소를 확인할 수 있습니다 (시드는 `config/config.yaml`에 추가됩니다):
```
plug               | Generated account with address: 4GuP82BMAgrbtU8GhnKhgzP827sJEaBXeMX38pZZKPSpcWeT
```
이 계정에 일부 토큰을 이체하여 거래 수수료를 지불해야 합니다. [Robonomics 포털](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/accounts)에서 이를 수행할 수 있습니다. 

서비스는 충분한 토큰이 있는 것을 인식하고 로그에서 다음과 같이 볼 수 있습니다:
```
plug               | Balance is OK
```
서비스는 플러그와 안전한 전력 사용으로부터 MQTT 메시지를 수신합니다. 매 시간마다(`config/config.yaml`의 `sending_timeout` 섹션에서 타임아웃을 변경할 수 있으며, 타임아웃은 초 단위로 설정됩니다) 다음 정보를 포함하는 데이터로그를 생성합니다:
```
{'geo': 'RUS', 'power_usage': 1.021237391233444, 'timestamp': 1644494860.5860083}
```
