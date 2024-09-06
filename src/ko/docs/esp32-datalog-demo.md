---
title: ESP32에서 Extrinsic 보내는 방법

contributors: [LoSk-p]
---

[robonomics-client-cpp](https://github.com/airalab/robonomics-client-cpp)를 사용하여 ESP32에서 Robonomics Network에 Datalog Extrinsic을 보냅니다. 데모 코드는 [여기](https://github.com/LoSk-p/esp32-datalog-demo)에서 찾을 수 있습니다.

### 요구 사항

* Platformio core ([설치 지침](https://docs.platformio.org/en/latest/core/installation/methods/installer-script.html)).
* 해당 OS의 시리얼 클라이언트(`Linux`의 경우 `tio` 사용). 다음 명령어로 `tio`를 설치할 수 있습니다.
```bash
sudo apt install tio
```
### 설치
저장소를 복제합니다:
```bash
git clone https://github.com/LoSk-p/esp32-datalog-demo.git
```
### 구성
`src` 폴더에 `Private.h` 파일을 생성하고 다음 내용을 입력합니다:
```
#pragma once

// 더미 값 대신 실제 키 및 주소 설정
#define PRIV_KEY ""

#define SS58_ADR ""

// WiFi
#ifndef STASSID
#define STASSID ""
#define STAPSK  ""
#endif
```
로보노믹스 계정 및 WiFi 네트워크에 대한 정보를 입력합니다. `PRIV_KEY`는 로보노믹스 계정의 개인 키이며, `SS58_ADR`은 해당 계정의 주소입니다.

{% roboWikiNote {type: "warning"}%} 이 데모는 오직 ED25519 계정에만 작동합니다!
{% endroboWikiNote %}

계정 시드 문구에서 개인 키를 가져오려면 [get-private-key.py](https://github.com/LoSk-p/esp32-datalog-demo/blob/main/get-private-key.py) 스크립트를 사용할 수 있습니다. 실행하고 지시에 따릅니다:
```bash
python3 get-private-key.py
```

### 업로드
USB 케이블을 사용하여 ESP32를 컴퓨터에 연결하고 프로젝트를 빌드합니다:
```bash
cd esp32-datalog-demo
platformio run -t upload
```
이 명령은 esp를 위한 이진 파일을 빌드하고 업로드하므로 최종적으로 다음과 같은 내용이 표시됩니다.
```
Writing at 0x000b9def... (84 %)
Writing at 0x000bf4c2... (87 %)
Writing at 0x000c56bf... (90 %)
Writing at 0x000cc6df... (93 %)
Writing at 0x000d1dec... (96 %)
Writing at 0x000d71b0... (100 %)
Wrote 836160 bytes (538555 compressed) at 0x00010000 in 12.2 seconds (effective 548.7 kbit/s)...
Hash of data verified.

Leaving...
Hard resetting via RTS pin...
=========================== [SUCCESS] Took 24.08 seconds ===========================
```

### 실행

업로드 후 ESP를 다시 컴퓨터에 연결하고 시리얼 클라이언트를 실행합니다(tio를 사용하고 포트는 `/dev/ttyACM0`인 경우):
```bash
tio /dev/ttyACM0
```
그리고 Datalog 레코드 Extrinsic을 작성합니다.

이전 섹션에서 `platformio run -t upload` 명령을 실행한 후 로그에서 포트를 확인할 수 있습니다. 다음과 같은 내용을 찾아보세요:
```
Auto-detected: /dev/ttyACM0
Uploading .pio/build/nodemcu-32s/firmware.bin
esptool.py v4.5.1
Serial port /dev/ttyACM0
Connecting.......
```