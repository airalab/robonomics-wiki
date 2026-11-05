---
title: 레거시 팔레트
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

이전 Robonomics 버전의 팔레트 다섯 개가 아직 런타임에 남아 있습니다. Datalog, Launch, RWS, DigitalTwin, Liability입니다. [노드 README](https://github.com/airalab/robonomics#readme)는 이들을 지원 중단으로 표시하고 있습니다: "following pallets will be removed in near future"(이 팔레트들은 가까운 시일 내에 제거될 예정). 제거 날짜는 아직 발표되지 않았습니다.

지금도 체인에서 동작하며, 일부 앱과 통합 기능이 이 팔레트를 사용합니다. 새 프로젝트는 [디바이스 트리](/docs/device-tree/)로 시작하세요.

| 팔레트 | 기능 | 후속 기능 |
|---|---|---|
| Datalog | 내 계정 아래에 짧은 기록을 저장 | 디바이스 트리, 5.0 스토리지 계획 중 |
| Launch | 디바이스 계정에 서명된 명령을 보냄 | — |
| RWS | 수수료 없는 트랜잭션을 위한 구독 | 5.0 구독(개발 중) |
| DigitalTwin | 디지털 트윈의 토픽을 계정에 매핑 | 디바이스 트리 |
| Liability | 당사자 간 계약, 마지막에 보고서 제출 | — |

## Datalog

Datalog는 내 계정 아래에 짧은 기록을 체인에 보관합니다. 기록마다 타임스탬프가 붙습니다.

- `record(record)`는 최대 512바이트의 기록을 추가합니다.
- `erase()`는 내 기록을 모두 삭제합니다.
- 계정마다 **최근 127개의 기록**이 유지됩니다. 그보다 오래된 기록은 덮어씌워집니다. (윈도에는 슬롯이 128개 있고, 그중 하나는 항상 비워 둡니다.)
- 큰 데이터는 IPFS에 올리고 CID를 기록하세요.
- 읽을 때는 스토리지 쿼리 `datalog.datalogIndex(account)`(첫 슬롯과 마지막 슬롯을 반환)와 `datalog.datalogItem([account, slot])`을 사용합니다. 이벤트는 `NewRecord`입니다.
- 예치금은 없고 일반 수수료만 냅니다. 이 글을 쓰는 시점에 512바이트를 꽉 채운 기록은 약 0.0006 XRT가 듭니다.
- RWS 구독이 있으면 `rws.call`을 통해 수수료 없이 기록을 보낼 수 있습니다.

현재 사용처: Home Assistant용 Robonomics Report Service, sensors.social 연결 에이전트, robonomics.app의 Altruist 및 에너지 모니터 차트.

첫 기록을 남기는 과정은 [시작하기](/docs/getting-started/#4-send-your-first-record)에 있습니다.

## Launch

Launch는 디바이스에 서명된 명령을 보냅니다.

- `launch(robot, param)`: `robot`은 디바이스 계정, `param`은 32바이트입니다. 흔히 IPFS CID의 다이제스트를 여기에 넣습니다.
- 디바이스는 자기 주소가 들어 있는 `NewLaunch(sender, robot, param)` 이벤트를 지켜봅니다.
- 누구나 어떤 주소로든 launch를 보낼 수 있습니다. 보낸 사람이 누구인지는 디바이스가 확인해야 합니다.
- 이 팔레트는 `param`을 전역 값 `Goal` 하나에도 기록하는데, 누가 보내든 launch가 올 때마다 덮어씌워집니다. 이 스토리지 값이 아니라 이벤트를 사용하세요.
- 수수료는 짧은 datalog 기록과 비슷합니다. RWS 구독이 있으면 수수료 없이 보낼 수 있습니다.

robonomics.app은 Launch로 Home Assistant를 제어하고, 예전 ROS 2 래퍼는 Launch로 로봇을 구동했습니다.

<div id="rws-subscriptions"></div>

## RWS 구독

RWS(Robonomics Web Services)는 계정에 수수료 없는 트랜잭션을 제공합니다.

- 종류는 두 가지입니다: `Daily { days }`와 `Lifetime { tps }`.
- 구독에 등록된 디바이스는 `rws.call(subscription_owner, call)`로 호출을 보내며 수수료를 내지 않습니다. 무료 사용량은 시간이 지나면서 쌓입니다. Daily 구독은 10,000 µTPS 속도로 쌓이며, 이는 초당 단순 전송 0.01건에 해당합니다.
- `set_devices(devices)`는 구독을 사용할 수 있는 디바이스 계정을 최대 32개까지 지정합니다. 목록 전체를 교체합니다. 목록에 있는 디바이스만 `rws.call`을 쓸 수 있습니다.
- `transfer(target)`는 구독을 아직 구독이 없는 계정으로 옮깁니다.

### 구독을 얻는 방법

- 구독은 경매로 판매됩니다. `bid(index, amount)`: 첫 입찰은 1 XRT보다 커야 합니다. 입찰 금액은 예약(잠금)됩니다. 입찰이 있는 경매는 10블록마다 마감됩니다. 낙찰 금액은 소각되고 구독이 등록됩니다.
- [robonomics.app](https://robonomics.app)의 **Buy a subscription** 페이지는 트랜잭션 하나로 빈 경매에 입찰하고 내 계정을 디바이스로 추가합니다. 잔액이 가격에 0.01 XRT를 더한 금액보다 많아야 합니다. 빈 경매가 없으면 앱이 요청을 거부합니다.

### 현재 상황

- 새 경매는 Root만 시작할 수 있습니다. Sudo가 없으므로 새 경매 묶음마다 Root 국민투표가 필요합니다. 국민투표가 통과될 때까지 빈 경매가 바닥날 수 있습니다.
- 오라클이 발급하는 구독(예: 2021년 실험이었던 Ethereum의 RWS 토큰 기반 구독)은 연결되어 있지 않습니다. 오라클 계정이 설정되어 있지 않기 때문입니다. 토크노믹스 페이지에 따르면, Kusama의 XRT 잔액이 Polkadot으로 옮겨진 뒤 RWS가 운영 네트워크에 연결되며, sensors.social 같은 비상업 프로젝트가 먼저 대상이 됩니다.
- 후속 기능은 5.0 Subscription입니다. 이 기능이 나오면 디바이스가 직접 XRT를 보유하지 않아도 네트워크를 사용할 수 있습니다. 개발 중이며 아직 런타임에는 없습니다.

## DigitalTwin

디지털 트윈은 토픽 목록이며, 각 토픽은 그 데이터를 제공하는 계정과 연결됩니다.

- `create()`는 트윈을 만듭니다.
- `set_source(id, topic, source)`는 32바이트 토픽을 소스 계정에 연결합니다.
- `remove_source(id)`는 소스를 제거합니다.

[디바이스 트리](/docs/device-tree/)가 이 기능을 대체합니다.

## Liability

Liability는 당사자 간에 서명한 계약을 기록합니다.

- `create(agreement)`는 서명된 계약을 기록합니다. 계약의 기술적인 부분은 IPFS를 가리킵니다.
- `finalize(report)`는 보고서와 함께 계약을 종료합니다.

이 팔레트에는 이런 계약을 위한 간단한 마켓도 들어 있습니다. 후속 기능은 발표되지 않았습니다.
