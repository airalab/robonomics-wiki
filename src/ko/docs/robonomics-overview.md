---
title: 개요
contributors: [ensrationis]
---

Robonomics는 Polkadot 위에서 동작하는 디바이스용 클라우드입니다. 디바이스에 대한 설명과 현재 상태를 클라우드에 보관하고, 측정값을 기록하고, 명령을 보낼 수 있습니다. 비용은 네트워크 토큰인 XRT로 지불합니다. 이 클라우드를 운영하는 단일 회사는 없습니다. 독립적인 콜레이터가 네트워크를 운영하고, XRT 보유자가 온체인 투표로 거버넌스를 맡습니다.

## 주요 구성 요소

- **디바이스 트리(CPS).** 설비를 설명하는 노드 트리입니다. 건물, 건물 안의 방, 방 안의 디바이스를 표현합니다. 각 노드에는 짧은 설명과 현재 상태가 들어 있습니다. 트리의 어느 부분에 누가 쓸 수 있는지는 소유자가 정합니다. 현재 Robonomics의 핵심 기능입니다. [디바이스 트리(CPS)](/docs/device-tree/)를 참고하세요.
- **XRT.** 네트워크 토큰입니다. 트랜잭션 수수료와 구독료를 XRT로 내고, XRT 보유자는 XRT로 투표합니다. [XRT와 거버넌스](/docs/xrt-and-governance/)를 참고하세요.
- **거버넌스.** 트랙이 두 개인 표준 Polkadot OpenGov입니다. Sudo 키는 없습니다. 런타임 업그레이드를 포함한 모든 특권 변경은 국민투표를 거쳐야 합니다.
- **콜레이터.** 블록을 생성하는 서버입니다. 누구나 XRT를 본딩하면 후보가 될 수 있습니다. [콜레이터 운영](/docs/run-collator/)을 참고하세요.

이전 구성 요소(Datalog, Launch, RWS 구독, Digital Twin, Liability)는 지금도 동작하지만 지원 중단(deprecated) 상태입니다. [레거시 팔레트](/docs/legacy-pallets/)를 참고하세요.

## 네트워크

| | |
|---|---|
| 네트워크 | Polkadot의 Robonomics 파라체인 |
| Para ID | 3388 |
| 토큰 | XRT, 소수점 9자리 |
| 주소 형식 | SS58 prefix 32 (주소가 `4`로 시작) |
| 블록 시간 | 6초 (목표값) |
| 공개 RPC | `wss://polkadot.rpc.robonomics.network/` |
| 블록 탐색기 | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [Robonomics RPC로 열기](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

현재 운영 중인 Robonomics 네트워크는 Polkadot뿐입니다. Kusama의 파라체인은 중단되었습니다. [다른 네트워크의 XRT](/docs/xrt-migration/)를 참고하세요.

## 개발 중인 기능

Robonomics 5.0은 클라우드를 단계적으로 추가합니다. 거버넌스와, Scope 및 접근 권한을 갖춘 디바이스 트리는 이미 운영 중입니다. 구독 기능은 개발 중입니다. 이 기능이 나오면 디바이스가 직접 XRT를 보유하지 않아도 네트워크를 사용할 수 있습니다. 스토리지와 컴퓨팅은 계획 단계이며 아직 코드가 없습니다.

자세한 내용은 블로그 글 [Robonomics 5.0, 1부](https://robonomics.network/blog/robonomics-5-0-runtime-first/)와 [5.0 로드맵](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md)에서 확인하세요.

## 소프트웨어와 관리 주체

Robonomics의 모든 소프트웨어는 오픈 소스입니다.

- [airalab/robonomics](https://github.com/airalab/robonomics): 런타임과 팔레트.
- [airalab/robins](https://github.com/airalab/robins): `cps` 명령줄 도구와 디바이스 게이트웨이를 포함한 도구 모음.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): Python 라이브러리.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): 웹 앱 [robonomics.app](https://robonomics.app).

별도의 Robonomics 노드 프로그램은 없습니다. 콜레이터는 Parity의 범용 `polkadot-omni-node`에 Robonomics 체인 스펙을 넣어 실행합니다.

이 위키를 포함한 Robonomics 웹사이트는 Akagi Engineering Co., Ltd.(일본)가 운영합니다. 뉴스와 릴리스 노트는 [Robonomics 블로그](https://robonomics.network/blog/)에 올라옵니다.
