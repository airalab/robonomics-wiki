---
title: 디바이스 연결
contributors: [Fingerling42, nakata5321, ensrationis]
---

디바이스를 Robonomics에 연결하는 방법은 두 가지입니다. Home Assistant를 거치거나, 트랜잭션에 서명하거나 게이트웨이와 통신할 수 있는 디바이스를 직접 연결하는 방법입니다.

완제품 하드웨어와 스마트 홈 설치는 Pinout Limited가 제공합니다. 제품과 서비스는 [pinout.cloud](https://pinout.cloud)를 참고하세요.

## Home Assistant

Home Assistant 통합은 세 가지입니다. 하는 일이 서로 다르고, 최신 상태인 정도도 다릅니다.

| 통합 | 기능 | 상태 |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Home Assistant에서 문제를 감시합니다. 오류 보고서를 암호화해 IPFS에 올리고 CID를 체인에 기록합니다. 보고서는 담당 시공사(인티그레이터)의 지원 티켓이 됩니다. 매일 하트비트도 보냅니다. | 유지 관리 중. 프리릴리스로 배포됩니다. Home Assistant 2026.3.1 이상이 필요하며, HACS에서 사용자 지정 저장소로 설치합니다. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | RWS 구독 아래에서 암호화된 트랜잭션으로 Home Assistant에 원격 접속하고, 사용자와 백업도 관리합니다. | 업데이트가 멈춘 상태. 마지막 릴리스는 2025년 10월의 2.2.1입니다. 예전 `robonomics-interface` 1.6.3을 사용하고, 로컬 IPFS 노드가 필요하며, 기본 엔드포인트가 아직 중단된 Kusama를 가리킵니다. Polkadot 엔드포인트를 선택할 수는 있습니다. 현재 런타임에서 검증되지 않았습니다. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | 로컬 네트워크로 Altruist 센서를 읽습니다. 체인은 사용하지 않습니다. | 작은 통합, 로컬 전용. |

airalab의 Robonomics 통합은 RWS 구독에 의존합니다. 구독의 현재 상황은 [레거시 팔레트](/docs/legacy-pallets/#rws-subscriptions)를 참고하세요.

## 모든 디바이스

직접 만든 디바이스를 연결할 때 필요한 기본 요소입니다.

1. **디바이스에 전용 계정을 줍니다.** 키는 디바이스에 둡니다.
2. **디바이스의 트랜잭션 비용을 냅니다.** 계정에 XRT를 조금 보내거나(이 글을 쓰는 시점에 datalog 기록 하나는 1/1000 XRT에도 못 미칩니다), `rws.set_devices`로 RWS 구독에 추가하고(최대 32개 디바이스) `rws.call`로 트랜잭션을 보냅니다.
3. **디바이스 트리에 설비를 설명합니다.** 사이트 노드와 디바이스 노드를 만듭니다. 디바이스 계정을 해당 노드의 아이덴티티로 연결합니다. 게이트웨이가 디바이스 대신 데이터를 쓴다면 게이트웨이에 `Write` 권한을 줍니다. [디바이스 트리(CPS)](/docs/device-tree/)를 참고하세요.
4. **데이터를 씁니다.** 현재 상태는 노드의 `payload`(최대 8 KiB)에 넣거나, `datalog.record`로 기록합니다(최대 512바이트, [레거시](/docs/legacy-pallets/#datalog)). 큰 데이터는 IPFS에 올리고 CID를 씁니다.
5. **필요하면 명령을 보냅니다.** 레거시 `launch` 호출은 디바이스 계정에 서명된 명령 이벤트를 보냅니다. [Launch](/docs/legacy-pallets/#launch)를 참고하세요.

각 단계에 쓸 수 있는 라이브러리: Python `robonomics-interface`, JavaScript `@polkadot/api`, Rust `libcps`와 `cps` 도구. [클라이언트 라이브러리](/docs/client-libraries/)를 참고하세요.

### 소형 디바이스용 게이트웨이

모든 디바이스가 체인과 통신할 수 있는 것은 아닙니다. 다음 오픈 소스 게이트웨이가 중간에서 연결해 줍니다.

- **edge** ([airalab/robins](https://github.com/airalab/robins)): HTTP와 Meshtastic으로 서명된 메시지를 받아 libp2p GossipSub으로 전달합니다.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): MQTT 메시지를 디바이스 트리 업데이트로 바꿉니다.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): 서명된 센서 측정값을 모아 IPFS pubsub과 파라체인으로 전달합니다. [sensors.social](https://sensors.social)의 센서들이 이 서비스를 사용합니다.

공개 릴레이 노드와 그 상태는 [pubsub.robonomics.network](https://pubsub.robonomics.network)에서 볼 수 있습니다.
