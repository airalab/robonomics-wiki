---
title: Altruist와 sensors.social
contributors: [tubleronchik, LoSk-p, ensrationis]
---

Altruist는 오픈 소스 환경 센서입니다. 측정값은 누구나 [sensors.social](https://sensors.social)에서 볼 수 있는 공개 데이터셋에 들어갑니다.

## 센서

- 실외용(Urban), 실내용(Insight), 그리고 키트가 있습니다.
- 센서는 모든 측정값에 서명하므로 전송 도중 측정값을 위조할 수 없습니다.
- 측정값은 Wi-Fi로 보내거나, Wi-Fi가 없는 곳에서는 LoRa 무선과 Meshtastic 메시 네트워크로 보낼 수 있습니다.
- 소유자는 측정값을 암호화할지 선택할 수 있습니다. 암호화하면 소유자만 자기 키로 sensors.social에서 측정값을 볼 수 있습니다.

Altruist 센서는 Pinout Limited가 만듭니다. [cyberpunks.shop](https://cyberpunks.shop/)과 EU Amazon에서 구입할 수 있습니다. 설정과 지원은 해당 제품 페이지와 [pinout.cloud](https://pinout.cloud)를 참고하세요.

## sensors.social

[sensors.social](https://sensors.social)은 독립적인 대기질 센서 지도입니다. 100개가 넘는 센서의 측정값을 보여 주며, 프로젝트 소식을 전하는 자체 블로그도 있습니다.

로컬 네트워크의 Home Assistant에서 센서를 쓰려면 [Altruist 통합](https://github.com/airalab/altruist-homeassistant-integration)을 사용하세요.

## 소스 코드

- [airalab/altruist-firmware](https://github.com/airalab/altruist-firmware): 펌웨어.
- [airalab/webflasher](https://github.com/airalab/webflasher): 브라우저에서 펌웨어 플래싱.
- [airalab/sensors.social](https://github.com/airalab/sensors.social): 지도.
- [airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity): 측정값을 수집하는 서비스.
